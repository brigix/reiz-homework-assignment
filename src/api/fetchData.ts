import React from "react";
import axios, {AxiosResponse} from "axios";
import { API_URL, query } from "../constants/constants";

export const fetchData = async <T>(): Promise<AxiosResponse<T>> => {
	return axios.get(`${API_URL}${query}`);
};