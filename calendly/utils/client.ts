import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();

export const calendlyClient = () => {
  const instance = axios.create({
    baseURL: 'https://api.calendly.com/', 
    headers: {
      Authorization: `Bearer ${process.env.CALENDLY_API_KEY}`,
      'Content-Type': 'application/json',
    },
  });

  return instance; 
};
