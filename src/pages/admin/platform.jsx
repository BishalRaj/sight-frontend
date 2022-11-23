import React, { useState } from "react";
import { useEffect } from "react";
import Chart from "react-apexcharts";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
} from "react-bootstrap";

import productService from "../../services/product.service";

const Platform = (props) => {
  // var card = [];
  // const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [url, setUrl] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [trackingData, setTrackingData] = useState([]);

  useEffect(() => {
    if (url === "") {
      setDisabled(true);
      setSearchData(null);
    }
    getAllData();
    // fetch tracking data
  }, [url]);

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
    try {
      var isAlreadyAvailable = trackingData.filter((item) =>
        item.pid.includes(searchData.pid)
      );
    } catch (error) {
      console.log(error);
      return;
    }

    if (!isAlreadyAvailable || isAlreadyAvailable.length <= 0) {
      setTrackingData((prevData) => [...prevData, searchData]);
      // save data
      let response = await productService.saveTracking(searchData.pid);
      if (response.msj) alert(response.msj);
      console.log(response);
    } else {
      alert("Data already available");
    }

    handleShow();
  };

  var options = {
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
    },
  };
  var series = [
    {
      name: "series-1",
      data: [30, 40, 45, 50, 49, 60, 70, 91],
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
        <Col>
          <Chart
            options={options}
            series={series}
            type="bar"
            // width="500"
            height={300}
            className={{ width: "100%" }}
          />
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
                  <Card.Img variant="top" src={item.img} />
                  <Card.Body>
                    <Card.Title>{item.pid}</Card.Title>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      Price: {item.price}
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
