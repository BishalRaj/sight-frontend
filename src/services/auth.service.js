import axios from "axios";
import { base_url } from "../static";

const login = (form_data) => {
  return axios.post(`${base_url}/user/login`, form_data).then((response) => {
    if (response.data.access_token != null)
      localStorage.setItem("user", response.data.access_token.access_token);
    return response.data;
  });
};

const authService = {
  login,
};

export default authService;
