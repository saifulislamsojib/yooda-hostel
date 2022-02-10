import axios, { AxiosResponse } from "axios";

const baseURL = "https://yoodahostelbd.herokuapp.com";

const instance = axios.create({
  baseURL,
  timeout: 150000,
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: <T extends object>(url: string): Promise<T> =>
    instance.get(url).then(responseBody),
  post: <T extends object>(url: string, body: object): Promise<T> =>
    instance.post(url, body).then(responseBody),
  patch: <T extends object>(url: string, body: object): Promise<T> =>
    instance.patch(url, body).then(responseBody),
  delete: <T extends object>(url: string): Promise<T> =>
    instance.delete(url).then(responseBody),
};

export default requests;
