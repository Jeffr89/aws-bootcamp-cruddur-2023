# Week 0 — Billing and Architecture

## Created a Conceptual Diagram

https://lucid.app/lucidchart/af595713-5c14-4315-89f9-6bfe940e97d3/edit?viewport_loc=-648%2C-353%2C1952%2C1597%2C0_0&invitationId=inv_1b8741fd-4c9a-4b3e-9370-675d2002a7c9

## Created a Logical Diagram

Due to free tier limitation I couldn't sketch the Image Processing part

https://lucid.app/lucidchart/af595713-5c14-4315-89f9-6bfe940e97d3/edit?viewport_loc=-165%2C-429%2C3271%2C2677%2Cx4PwKTzElMBm&invitationId=inv_1b8741fd-4c9a-4b3e-9370-675d2002a7c9

## AWS Budget

Created an AWS Budget via AWS Web Portal using the standard monthly template with 10€ threshold.
Creadet an AWS Budget via CLI too. Deleted after checked the correctness. 

## Not root user
Created a new User via IAM User Console.
Added MFA and an access key to be able to use AWS CLI with it.
Added the new user credentials as gitpod enviroment variables via CLI command gp env.

## AWS CLI
Installed the AWS CLI manually and than updated the .gitpod.yml file to include it.

## SNS Topic
Created an SNS topic via AWS CLI
Created a subscription via AWS CLI using my aws account email and confirmed the subscription.
Tested the SNS and the subscription pubblishing manually a message via AWS GUI.

## Billing Alarm
Created a billing Alarm using AWS CLI.
Changed the __Missing data treatment__ to fix the alarm notification status.

## Billing
Enabled the Receive Billing Alerts option using the ROOT account.