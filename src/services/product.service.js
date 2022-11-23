import axios from "axios";
import { base_url } from "../static";

const singleSearch = (url) => {
  return axios
    .post(`${base_url}/scrape/etzy/single`, { url: url })
    .then((response) => {
      return response.data;
    });
};
const fetchTrackingData = (url) => {
  return axios
    .get(`${base_url}/tracking/all/${localStorage.getItem("user")}`)
    .then((response) => {
      return response.data;
    });
};

const saveTracking = (pid) => {
  return axios
    .post(`${base_url}/scrape/etzy/single/track`, {
      token: localStorage.getItem("user"),
      pid: pid,
    })
    .then((response) => {
      return response.data;
    });
};

const productService = {
  singleSearch,
  saveTracking,
  fetchTrackingData,
};

export default productService;
