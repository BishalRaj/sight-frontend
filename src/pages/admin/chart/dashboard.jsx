import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useWindowDimensions from "../../../services/window.service";

const Dashboard = (props) => {
  // eslint-disable-next-line
  const { height, width } = useWindowDimensions();

  // console.log(props.micro);

  // const data = [
  //   {
  //     name: "Page A",
  //     price: 4000,
  //     pv: 2400,
  //     amt: 2400,
  //   },
  //   {
  //     name: "Page B",
  //     price: 3000,
  //     pv: 1398,
  //     amt: 2210,
  //   },
  //   {
  //     name: "Page C",
  //     price: 2000,
  //     pv: 9800,
  //     amt: 2290,
  //   },
  //   {
  //     name: "Page D",
  //     price: 2780,
  //     pv: 3908,
  //     amt: 2000,
  //   },
  //   {
  //     name: "Page E",
  //     price: 1890,
  //     pv: 4800,
  //     amt: 2181,
  //   },
  //   {
  //     name: "Page F",
  //     price: 2390,
  //     pv: 3800,
  //     amt: 2500,
  //   },
  //   {
  //     name: "Page G",
  //     price: 3490,
  //     pv: 4300,
  //     amt: 2100,
  //   },
  // ];

  const data = props.micro;
  return (
    <LineChart
      width={0.8 * width}
      height={300}
      data={data}
      margin={{
        top: 20,
        right: 20,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="price"
        stroke="#82ca9d"
        activeDot={{ r: 5 }}
      />
      <Line
        type="monotone"
        dataKey="review"
        stroke="#8884d8"
        activeDot={{ r: 5 }}
      />
      <Line
        type="monotone"
        dataKey="rating"
        stroke="#FF0000"
        activeDot={{ r: 5 }}
      />
    </LineChart>
  );
};

export default Dashboard;
