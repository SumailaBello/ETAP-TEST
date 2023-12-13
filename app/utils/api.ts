import axios, { AxiosRequestConfig } from 'axios';

const timeoutDuration: number = 120000;
const timeoutMessage: string = 'Connection timed out';

const requestConfig: AxiosRequestConfig = {
  timeout: timeoutDuration,
  timeoutErrorMessage: timeoutMessage,
} 

export const getNearbyPlaces = async (lat: string, lng: string)=> {
  const res = await axios.get(`${process.env.EXPO_PUBLIC_URL}?location=${lat},${lng}&radius=5000&type=point_of_interest&key=${process.env.EXPO_PUBLIC_API_KEY}`, requestConfig);
  return res
}
