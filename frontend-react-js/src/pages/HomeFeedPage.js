import './HomeFeedPage.css';
import React, { useEffect } from 'react';
import { Auth } from 'aws-amplify';
import DesktopNavigation  from '../components/DesktopNavigation';
import DesktopSidebar     from '../components/DesktopSidebar';
import ActivityFeed from '../components/ActivityFeed';
import ActivityForm from '../components/ActivityForm';
import ReplyForm from '../components/ReplyForm';

import axios from 'axios';

// [TODO] Authenication
import Cookies from 'js-cookie'

import { trace, context, } from '@opentelemetry/api';

async function signInWithFacebook(code, redirectUri) {
  try {
    const user = await Auth.federatedSignIn(
      'facebook',
      {
        code,
        redirectUri
      },
      {
        // Additional user attributes if needed
      }
    );
    console.log('User signed in:', user);
  } catch (error) {
    console.error('Error signing in:', error);
  }
}


export default function HomeFeedPage() {
  const [activities, setActivities] = React.useState([]);
  const [popped, setPopped] = React.useState(false);
  const [poppedReply, setPoppedReply] = React.useState(false);
  const [replyActivity, setReplyActivity] = React.useState({});
  const [user, setUser] = React.useState(null);
  const dataFetchedRef = React.useRef(false);

  const tracer = trace.getTracer();
  const span = tracer.startSpan("getActivitiesHome");
  span.setAttribute('user', "test id");

  const loadData = async () => {
    try {
      const backend_url = `${process.env.REACT_APP_BACKEND_URL}/api/activities/home`
      const res = await fetch(backend_url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`
        },
        method: "GET"
      });
      let resJson = await res.json();
      if (res.status === 200) {
        setActivities(resJson)
      } else {
        console.log(res)
      }
    } catch (err) {
      span.addEvent("Failed the backend call");
      console.log(err);
      span.end();
    }
    span.addEvent("fetched homefeed");
    span.end();
  };

  const FacebookLogin =  async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      console.log("TEST");
  
      if (code) {
        signInWithFacebook(code, 'https://3000-jeffr89-awsbootcampcrud-sti34fwn23h.ws-eu93.gitpod.io')
        // exchangeCodeForTokens(code);
      }
    };
  
    const exchangeCodeForTokens = async (code) => {
      const clientId = process.env.REACT_APP_CLIENT_ID ;
      const redirectUri = 'https://3000-jeffr89-awsbootcampcrud-sti34fwn23h.ws-eu93.gitpod.io';
      const url = `https://cruddur.auth.eu-central-1.amazoncognito.com/oauth2/token`;
      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
      };
      
      const data = new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: clientId,
        redirect_uri: redirectUri,
        code: code,
      });
      console.log(clientId)
      try {
        const response = await axios.post(url, data.toString(), { headers });
        const accessToken = response.data.access_token;
        const idToken = response.data.id_token;
  
        console.log('Access Token:', accessToken);
        console.log('ID Token:', idToken);
      } catch (error) {
        console.error('Error exchanging code for tokens:', error);
      }
    };
  
    

  const checkAuth = async () => {
    Auth.currentAuthenticatedUser({
      // Optional, By default is false. 
      // If set to true, this call will send a 
      // request to Cognito to get the latest user data
      bypassCache: false 
    })
    .then((user) => {
      console.log('user',user);
      return Auth.currentAuthenticatedUser()
    }).then((cognito_user) => {
        setUser({
          display_name: cognito_user.attributes.name,
          handle: cognito_user.attributes.preferred_username
        })
    })
    .catch((err) => console.log(err));
  };

  React.useEffect(()=>{
    //prevents double call
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    loadData();
    checkAuth();
    FacebookLogin();
  }, [])

  return (
    <article>
      <DesktopNavigation user={user} active={'home'} setPopped={setPopped} />
      <div className='content'>
        <ActivityForm  
          popped={popped}
          setPopped={setPopped} 
          setActivities={setActivities} 
        />
        <ReplyForm 
          activity={replyActivity} 
          popped={poppedReply} 
          setPopped={setPoppedReply} 
          setActivities={setActivities} 
          activities={activities} 
        />
        <ActivityFeed 
          title="Home" 
          setReplyActivity={setReplyActivity} 
          setPopped={setPoppedReply} 
          activities={activities} 
        />
      </div>
      <DesktopSidebar user={user} />
    </article>
  );
}