import axios from "axios";
import { TokenResponse } from "../models/interface";

const CLIENT_ID = "56e2cc61a9084bee95ec2572d136d791";
const CLIENT_SECRET = "4cc1736f02af40e9a5f6f13a5be0e7b3";

const getToken = async () => {
  try {
    const response = await axios.post<TokenResponse>(
      "https://accounts.spotify.com/api/token",
      "grant_type=client_credentials",
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
        },
      }
    );
    const expiresInMilliseconds = response.data.expires_in * 1000;
    const refreshTimeout = expiresInMilliseconds - 60000; // Refresh 1 minute before expiration
    setTimeout(getToken, refreshTimeout);
    localStorage.setItem('token', response.data.access_token)
  } catch (error) {
    console.error("Error fetching access token:", error);
  }
};
export default getToken;
