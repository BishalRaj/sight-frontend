import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
} from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import authService from "../../services/auth.service";
import productService from "../../services/product.service";
import useWindowDimensions from "../../services/window.service";
import "./style/style.css";

const Platform = () => {
  // eslint-disable-next-line
  const { height, width } = useWindowDimensions();
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

  let handleSubmit = () => {
    productService.singleSearch(url).then((response) => {
      response.pid ? setSearchData(response) : alert("Someting went wrong!");
    });
  };

  let handleChange = (e) => {
    setUrl(e.target.value);
    setDisabled(false);
  };

  let handleTrackData = async () => {
    console.log("trackingData", trackingData);
    try {
      if (
        !trackingData ||
        trackingData.length <= 0 ||
        trackingData === null ||
        trackingData === []
      ) {
        setTrackingData((prevData) => [...prevData, searchData]);
        // return;
      } else if (trackingData.msj) {
        alert(trackingData.msj);
        navigate("/");
      } else {
        var isAlreadyAvailable = trackingData.filter((item) =>
          item.pid.includes(searchData.pid)
        );

        if (!isAlreadyAvailable || isAlreadyAvailable.length <= 0) {
          setTrackingData((prevData) => [...prevData, searchData]);
          // save data
          let response = await productService.saveTracking(searchData.pid);
          if (response.msj) alert(response.msj);
          console.log(response);
        } else {
          alert("Data already available");
        }
      }
    } catch (error) {
      console.log(error);
      // return;
    }

    handleShow();
  };

  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  return (
    <Container className="mx-auto shadow rounded my-3 p-4">
      <Modal show={show} fullscreen="md-down" onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          {/* <Modal.Title>Modal</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Product URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter URL"
                onChange={handleChange}
              />
              <Form.Text className="text-muted">
                Paste URL of your desired item from{" "}
                <a
                  href="https://www.etsy.com"
                  target="_blank"
                  className="text-success"
                  rel="noreferrer"
                  style={{ fontSize: "20px" }}
                >
                  etsy
                </a>
              </Form.Text>
            </Form.Group>

            <Button
              variant="primary"
              onClick={handleSubmit}
              disabled={disabled}
            >
              Search
            </Button>
          </Form>

          {searchData != null ? (
            <Card
              style={{ width: "100%", border: "none" }}
              className="shadow-lg mt-3"
            >
              <Card.Img variant="top" src={searchData.img} />
              <Card.Body>
                <Card.Title>{searchData.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Price: {searchData.price}
                </Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">
                  Rating: {searchData.rating}
                </Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">
                  Reviews: {searchData.review}
                </Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">
                  Sales: {searchData.sales}
                </Card.Subtitle>
                <Button onClick={handleTrackData}>Add to Tracking list</Button>
              </Card.Body>
            </Card>
          ) : null}
        </Modal.Body>
      </Modal>
      <Row>
        <Col lg={12}>
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
              dataKey="pv"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </Col>
      </Row>

      <Row>
        <Col
          sm={12}
          md={12}
          lg={12}
          className="d-flex justify-content-between py-3"
        >
          <h5>Tracking List</h5>

          <Button variant="success" onClick={() => handleShow()}>
            Add
          </Button>
        </Col>

        {trackingData && trackingData.length > 0 ? (
          trackingData.map((item, index) => {
            return (
              <Col sm={6} md={4} lg={3} className="my-2" key={index}>
                <Card
                  style={{ width: "100%", border: "none" }}
                  className="shadow-lg"
                >
                  <Card.Img
                    variant="top"
                    height={"250px"}
                    src={item.img}
                    className="card_img"
                  />
                  <Card.Body>
                    <Card.Title>{item.pid}</Card.Title>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      Price: £ {item.price}
                    </Card.Subtitle>
                    <Card.Text>Sales: {item.sales}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            );
          })
        ) : (
          <p className="text-center w-100 text-muted">Nothing to display !</p>
        )}
      </Row>
    </Container>
  );
};

export default Platform;
