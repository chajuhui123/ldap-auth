import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:9000",
  withCredentials: false,
});

client.interceptors.response.use(
  (res: any) => {
    return res;
  },
  async (error: any) => {
    return Promise.reject(error);
  }
);

export default client;
