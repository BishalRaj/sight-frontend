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
  var card = [];
  // const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [url, setUrl] = useState("");
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    if (url === "") {
      setDisabled(true);
    }
  }, [url]);

  let handleShow = () => {
    setShow(!show);
  };

  let handleClick = async () => {
    productService.singleSearch(url);
  };

  let handleChange = (e) => {
    setUrl(e.target.value);
    setDisabled(false);
  };

  for (let index = 0; index < 4; index++) {
    card.push(
      <Col>
        <Card style={{ width: "100%", border: "none" }} className="shadow-lg">
          <Card.Img
            variant="top"
            src="https://images.pexels.com/photos/794494/pexels-photo-794494.jpeg?cs=srgb&dl=pexels-anthony-%29-794494.jpg&fm=jpg"
          />
          <Card.Body>
            <Card.Title>{props.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Card Subtitle
            </Card.Subtitle>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    );
  }

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
                >
                  etsy
                </a>
              </Form.Text>
            </Form.Group>

            <Button variant="primary" onClick={handleClick} disabled={disabled}>
              Search
            </Button>
          </Form>
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
            Add more
          </Button>
        </Col>

        {card}
      </Row>
    </Container>
  );
};

export default Platform;