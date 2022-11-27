import React from "react";
import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  Scatter,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import useWindowDimensions from "../../../services/window.service";

const Individual = (props) => {
  // eslint-disable-next-line
  const { height, width } = useWindowDimensions();

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + "-" + dd + "-" + yyyy;

  const data = props.micro
    ? props.micro.map((res) => {
        return {
          date: res.date ? res.date.toString() : today,
          review: res.review ? parseInt(res.review) : 0,
          price:
            Math.round(res.price * 1.0 * Math.random(Math.random * 1) * 100) /
            100,
          sales: res.sales
            ? Math.round(
                parseInt(res.sales)
                // * Math.random(Math.random * 11)
              )
            : 0,
          rating:
            Math.round(res.rating * 1.0 * Math.random(Math.random * 1) * 100) /
            100,
        };
      })
    : [];
  return (
    <ComposedChart
      width={width ? 0.6 * width : 500}
      height={300}
      data={data}
      margin={{
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
      }}
    >
      <CartesianGrid stroke="#f5f5f5" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="price" barSize={20} fill="#413ea0" />
      {props.showSales ? (
        <Area type="monotone" dataKey="sales" fill="#28DEC0" stroke="#157347" />
      ) : (
        ""
      )}

      {props.showReview ? (
        <Line type="monotone" dataKey="review" stroke="#ff7300" />
      ) : (
        ""
      )}
      {props.showRating ? <Scatter dataKey="rating" fill="red" /> : ""}
    </ComposedChart>
  );
};

export default Individual;
