import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

import authService from "../../services/auth.service";
import productService from "../../services/product.service";
import charts from "./chart";

import "./style/style.css";

const Home = () => {
  const [show, setShow] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [url, setUrl] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [trackingData, setTrackingData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (
      authService.isActive() === null ||
      localStorage.getItem("user") === null ||
      localStorage.getItem("user") === undefined
    )
      navigate("/");

    if (url === "") {
      setDisabled(true);
      setSearchData(null);
    }
    getAllData();
  }, [url, navigate]);

  let getAllData = async () => {
    var data = await productService.fetchTrackingData();
    setTrackingData(data);
  };

  let handleShow = () => {
    setShow(!show);
    setSearchData(null);
  };

  let getMicroData = () => {
    if (
      trackingData === null ||
      trackingData === undefined ||
      trackingData.length === undefined
    )
      return;
    let data = [];
    for (let index = 0; index < trackingData.length; index++) {
      for (let y = 0; y < trackingData[index].micro.length; y++) {
        // console.log(trackingData[index].micro[y]);
        data.push(trackingData[index].micro[y]);
      }
    }

    return data;
  };

  return (
    <Container className="mx-auto  my-1 p-4">
      <Row className="mb-3">
        <Col lg={3} md={3}>
          <Card
            style={{ height: "200px", backgroundColor: "#0A6C53" }}
            className="shadow  text-light overflow-hidden"
          >
            <div className="mt-3 mx-3">
              <Card.Title>{trackingData.length}</Card.Title>
              <h6>Saved Items</h6>
            </div>
            <Card.Body>
              <charts.StaticChart />
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} md={3}>
          <Card
            style={{ height: "200px", backgroundColor: "#B9CAC4" }}
            className="shadow   text-light overflow-hidden"
          >
            <div className="px-3 py-3">
              <Card.Title>{trackingData.length}</Card.Title>
              <h6>Saved Items</h6>
            </div>
            <Card.Body>
              <charts.StaticChart />
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} md={3}>
          <Card
            style={{ height: "200px", backgroundColor: "#15D997" }}
            className="shadow   text-light overflow-hidden"
          >
            <div className="px-3 py-3">
              <Card.Title>{trackingData.length}</Card.Title>
              <h6>Saved Items</h6>
            </div>
            <Card.Body>
              <charts.StaticChart />
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} md={3}>
          <Card
            style={{ height: "200px", backgroundColor: "#1177DC" }}
            className="shadow  text-light overflow-hidden"
          >
            <div className="px-3 py-3">
              <Card.Title>{trackingData.length}</Card.Title>
              <h6>Saved Items</h6>
            </div>
            <Card.Body>
              <charts.StaticChart />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="d-flex align-items-center justify-content-center shadow-sm p-3 ">
        <Col lg={12} className="overflow-hidden">
          {/* Dashboard Chart */}
          <h5>Tracked Items Analysis</h5>
          <charts.Dashboard micro={getMicroData()} />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
