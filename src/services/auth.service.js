import axios from "axios";
import { base_url } from "../static";

const login = (form_data) => {
  return axios.post(`${base_url}/user/login`, form_data).then((response) => {
    if (response.data.access_token != null)
      localStorage.setItem("user", response.data.access_token.access_token);
    return response.data;
  });
};

const isActive = () => {
  return axios
    .get(`${base_url}/user/details/${localStorage.getItem("user")}`)
    .then((response) => {
      // console.log(response.data);
      return response.data;
    });
};
const register = (data) => {
  // `email: ${data.email}  pwd: ${data.password} `
  return axios
    .post(`${base_url}/user/register`, {
      name: data.name,
      username: data.email,
      password: data.password,
    })
    .then((response) => {
      // console.log(response.data);
      return response.data;
    });
};

const authService = {
  login,
  isActive,
  register,
};

export default authService;
