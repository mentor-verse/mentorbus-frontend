export const GOOGLE_SIGNUP_URL = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&scope=openid%20email&client_id=${
  import.meta.env.PUBLIC_GOOGLE_CLIENT_ID
}&redirect_uri=${import.meta.env.UBLIC_GOOGLE_SIGNUP_REDIRECT_URI}`;

export const GOOGLE_LOGIN_URL = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&scope=openid%20email&client_id=${
  import.meta.env.PUBLIC_GOOGLE_CLIENT_ID
}&redirect_uri=${
  import.meta.env.PUBLIC_GOOGLE_LOGIN_REDIRECT_URI
}&prompt=consent`;
