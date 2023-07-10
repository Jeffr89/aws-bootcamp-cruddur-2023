-- this file was manually created
INSERT INTO public.users (display_name, email, handle, cognito_user_id)
VALUES
  ('Gian', 'g.schianchi@hotmail.it', 'gschianchi','MOCK'),
  ('Gian2', 'bayko@exampro.co', 'gschianchi2' ,'MOCK');

INSERT INTO public.activities (user_uuid, message, expires_at)
VALUES
  (
    (SELECT uuid from public.users WHERE users.handle = 'gschianchi' LIMIT 1),
    'This was imported as seed data!',
    current_timestamp + interval '10 day'
  )