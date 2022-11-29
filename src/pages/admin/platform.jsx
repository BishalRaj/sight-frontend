import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap";

import { useNavigate } from "react-router-dom";

import authService from "../../services/auth.service";
import productService from "../../services/product.service";
import charts from "./chart";

import "./style/style.css";

const Platform = () => {
  const [show, setShow] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [url, setUrl] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [trackingData, setTrackingData] = useState([]);
  const [showReview, setshowReview] = useState(false);
  const [showRating, setshowRating] = useState(false);
  const [showSales, setshowSales] = useState(false);
  const [isSearchLoading, setisSearchLoading] = useState(false);
  const [isExportLoading, setisExportLoading] = useState(false);

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
    // console.log(data);
    setTrackingData(data);
  };

  let handleShow = () => {
    setShow(!show);
    setSearchData(null);
  };

  let handleSubmit = () => {
    setisSearchLoading(true);

    productService.singleSearch(url).then((response) => {
      response.pid ? setSearchData(response) : alert("Someting went wrong!");
      setisSearchLoading(false);
    });
  };

  let handleChange = (e) => {
    setUrl(e.target.value);
    setDisabled(false);
  };

  let handleTrackData = async () => {
    try {
      // if (
      //   !trackingData ||
      //   trackingData.length <= 0 ||
      //   trackingData === null ||
      //   trackingData === []
      // ) {
      //   setTrackingData((prevData) => [...prevData, { item: searchData }]);
      // } else if (trackingData.msj) {
      //   alert(trackingData.msj);
      //   navigate("/");
      // } else {
      //   var isAlreadyAvailable = trackingData.filter((item) =>
      //     item.item.pid.includes(searchData.pid)
      //   );

      //   if (!isAlreadyAvailable || isAlreadyAvailable.length <= 0) {
      //     setTrackingData((prevData) => [...prevData, { item: searchData }]);
      //     // save data
      //     let response = await productService.saveTracking(searchData.pid);
      //     if (response.msj) alert(response.msj);
      //   } else {
      //     alert("Data already available");
      //   }
      // }
      // console.log(trackingData);
      var isAlreadyAvailable = trackingData.filter((item) =>
        item.item.pid.includes(searchData.pid)
      );
      if (
        !isAlreadyAvailable ||
        isAlreadyAvailable.length <= 0 ||
        isAlreadyAvailable.length === undefined
      ) {
        setTrackingData((prevData) => [
          ...prevData,
          { item: searchData, micro: [searchData] },
        ]);
        // save data
        let response = await productService.saveTracking(searchData.pid);
        if (response.msj) alert(response.msj);
      } else {
        alert("Data already available");
      }
    } catch (error) {
      console.log(error);
      // return;
    }

    handleShow();
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
      if (
        trackingData[index].micro === null ||
        trackingData[index].micro === undefined
      ) {
        return;
      }

      for (let y = 0; y < trackingData[index].micro.length; y++) {
        // console.log(trackingData[index].micro[y]);

        data.push(trackingData[index].micro[y]);
      }
    }

    return data;
  };

  const handleExport = async (format) => {
    let data = [];
    await trackingData.forEach((element) => {
      return element.micro.forEach((item) => {
        delete item.id;
        data.push({
          ...item,
          name: element.item.name,
          url: element.item.url,
          img: element.item.img,
        });
      });
    });

    setisExportLoading(true);
    await productService.exportToExcel(data, "Sheet1", format);
    setisExportLoading(false);
  };

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
              {isSearchLoading ? (
                <Spinner animation="border" variant="danger" className="mx-3" />
              ) : (
                "Search"
              )}
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
      <Row className="d-flex align-items-center justify-content-center shadow-sm py-3 ">
        <Col lg={12} className="overflow-hidden">
          {/* Dashboard Chart */}
          <h5>Summary</h5>
          <charts.Dashboard micro={getMicroData()} />
        </Col>
      </Row>

      <Row>
        <Col
          sm={12}
          md={12}
          lg={12}
          className="d-flex justify-content-between py-3 mt-3"
        >
          <h5>Tracking List</h5>
          <div className="d-flex">
            <div className="form-check form-switch mx-2">
              <input
                className="form-check-input"
                type="checkbox"
                checked
                disabled
              />
              <label
                className="form-check-label"
                htmlFor="flexSwitchCheckDefault"
              >
                Price
              </label>
            </div>
            <div className="form-check form-switch mx-2">
              <input
                className="form-check-input"
                type="checkbox"
                onChange={() => setshowReview(!showReview)}
                style={{ border: "none", backgroundColor: "#ff7300" }}
              />
              <label
                className="form-check-label"
                htmlFor="flexSwitchCheckDefault"
              >
                Review
              </label>
            </div>
            <div className="form-check form-switch mx-2">
              <input
                className="form-check-input"
                type="checkbox"
                onChange={() => setshowSales(!showSales)}
                style={{ border: "none", backgroundColor: "#28DEC0" }}
              />
              <label
                className="form-check-label"
                htmlFor="flexSwitchCheckDefault"
              >
                Sales
              </label>
            </div>
            <div className="form-check form-switch mx-2">
              <input
                className="form-check-input"
                type="checkbox"
                onChange={() => setshowRating(!showRating)}
                style={{ border: "none", backgroundColor: "red" }}
              />
              <label
                className="form-check-label"
                htmlFor="flexSwitchCheckDefault"
              >
                Rating
              </label>
            </div>
          </div>
          <Button variant="success" onClick={() => handleShow()}>
            Add
          </Button>

          {trackingData.length > 0 ? (
            <div>
              <Button
                variant="success"
                onClick={() => handleExport("csv")}
                className="mx-1"
              >
                Export as csv
              </Button>
              <Button
                variant="success"
                onClick={() => handleExport("xlsx")}
                className="mx-1"
              >
                Export as xlsx
              </Button>
            </div>
          ) : (
            ""
          )}
        </Col>

        {trackingData && trackingData.length > 0 ? (
          trackingData.map((res, index) => {
            return (
              <Row className="shadow my-2">
                <Col sm={6} md={4} lg={3} className="my-2" key={index}>
                  <Card
                    style={{ width: "100%", border: "none" }}
                    className="shadow-lg"
                  >
                    <Card.Img
                      variant="top"
                      height={"250px"}
                      src={res.item.img}
                      className="card_img"
                    />
                    <Card.Body>
                      {/* <Card.Title>{res.item.pid}</Card.Title> */}
                      <Card.Title
                        style={{ maxHeight: "50px", overflow: "hidden" }}
                      >
                        {res.item.name}
                      </Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        Price: £ {res.item.price}
                      </Card.Subtitle>
                      <Card.Text>Sales: {res.item.sales}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col
                  sm={6}
                  md={8}
                  lg={9}
                  className="d-flex align-items-center justify-content-center"
                >
                  {res.micro != null || res.micro != undefined ? (
                    <charts.Individual
                      micro={res.micro}
                      showRating={showRating}
                      showReview={showReview}
                      showSales={showSales}
                    />
                  ) : (
                    ""
                  )}
                </Col>
              </Row>
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
