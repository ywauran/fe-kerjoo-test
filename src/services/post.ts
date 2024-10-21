/* eslint-disable  @typescript-eslint/no-explicit-any */

import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface RequestOptions extends AxiosRequestConfig {
  headers: {
    "Content-Type": string;
  };
}

const baseOptions: RequestOptions = {
  headers: {
    "Content-Type": "application/json",
  },
};

const createRequest = <T>(
  url: string,
  method: AxiosRequestConfig["method"],
  data: any = null
): Promise<AxiosResponse<T>> => {
  const requestOptions: RequestOptions = {
    ...baseOptions,
    method,
    url: API_URL + url,
    data,
  };

  return axios(requestOptions);
};

export const getPostList = () => createRequest<void>("posts", "get");

export const getPostDetail = (id: string) =>
  createRequest<void>(`posts/${id}`, "get");

export const addPost = (
  title: string,
  body: string
): Promise<AxiosResponse<any>> =>
  createRequest<any>("posts", "post", { title, body, userId: 1 });
