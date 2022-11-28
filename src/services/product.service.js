import axios from "axios";
import { base_url } from "../static";
import * as xlsx from "xlsx";
import * as FileSaver from "file-saver";
import { type } from "@testing-library/user-event/dist/type";

const singleSearch = (url) => {
  return axios
    .post(`${base_url}/scrape/etzy/single`, { url: url })
    .then((response) => {
      return response.data;
    });
};
const singleSearchByKeyword = (keyword) => {
  return axios
    .get(`${base_url}/scrape/etzy/${keyword}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error(error);
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

const exportToExcel = (data, keyword, format) => {
  // const fileType = "xlsx";
  // const ws = xlsx.utils.json_to_sheet(data);
  // const wb = { Sheets: { data: ws }, SheetNames: ["etzy"] };
  // const excelBuffer = xlsx.write(wb, { bookType: fileType, type: "array" });
  // const excelData = new Blob([excelBuffer], { type: fileType });
  // FileSaver.saveAs(excelData, "etzy." + fileType);

  const worksheet = xlsx.utils.json_to_sheet(data);
  const workbook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(workbook, worksheet, keyword);
  xlsx.writeFile(workbook, "etsz." + format);
};

const productService = {
  singleSearch,
  saveTracking,
  fetchTrackingData,
  singleSearchByKeyword,
  exportToExcel,
};

export default productService;
