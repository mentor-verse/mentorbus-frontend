import axios from "axios";

export const getGoogleAccessToken = async (code: string) => {
  const response = await axios.post(
    "https://oauth2.googleapis.com/token",
    new URLSearchParams({
      code,
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID || "",
      client_secret: import.meta.env.VITE_GOOGLE_SECRET_KEY || "",
      redirect_uri: import.meta.env.VITE_GOOGLE_REDIRECT_URI || "",
      grant_type: "authorization_code",
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return response.data.id_token;
};
