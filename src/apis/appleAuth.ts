// In api/appleAuth.ts
export const appleLoginRedirect = () => {
  const clientId = import.meta.env.VITE_APPLE_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_APPLE_REDIRECT_URI;
  const appleAuthUrl = `https://appleid.apple.com/auth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=email`;
  window.location.href = appleAuthUrl;
};
