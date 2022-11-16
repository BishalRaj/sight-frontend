import axios from "axios";
import { base_url } from "../static";

const singleSearch = (url) => {
  return axios
    .post(`${base_url}/scrape/etzy/single`, { url: url })
    .then((response) => {
      console.log(response);
      return response.data;
    });
};

const productService = {
  singleSearch,
};

export default productService;
