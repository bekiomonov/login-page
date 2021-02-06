import {AUTH_TOKEN} from "../constants";

export const getToken = () => localStorage.getItem(AUTH_TOKEN) || sessionStorage.getItem(AUTH_TOKEN)
