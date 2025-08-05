import axios, { AxiosInstance } from "axios";
import { getSession } from "next-auth/react";


export const api : AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
      "Content-Type": 'application/json'
    }
});


api.interceptors.request.use( async(config) =>  {
    const session = await getSession();
    // console.log('sessionfromapi',session)
    if(session && session.accessToken) {
        const token = session.accessToken;
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, function (error) {
    console.log('Err:', error)
    return Promise.reject(error);
  });

// Add a response interceptor
api.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    console.log("Err:", error)
    return Promise.reject(error);
  });