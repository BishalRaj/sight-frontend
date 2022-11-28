import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import productService from "../../services/product.service";

import "./style/style.css";

const Dataset = () => {
  const [keyword, setkeyword] = useState(null);

  const [isSearchLoading, setisSearchLoading] = useState(false);
  const [isExportLoading, setisExportLoading] = useState(false);
  const [allData, setallData] = useState([]);
  const [viewData, setviewData] = useState([]);

  const handleSubmit = async () => {
    setisSearchLoading(true);
    let data = [];
    let tempData = [];
    try {
      data = await productService.singleSearchByKeyword(keyword);

      setallData(data);

      if (data.length > 10) {
        for (let index = 0; index < 10; index++) {
          tempData.push(data[index]);
        }
        setviewData(tempData);
      } else {
        setviewData(data);
      }
    } catch (error) {
      return;
    }

    setisSearchLoading(false);
  };
  const handleChange = (e) => {
    setkeyword(e.target.value);
  };
  const handleExport = async (format) => {
    setisExportLoading(true);
    await productService.exportToExcel(allData, keyword, format);
    setisExportLoading(false);
  };

  return (
    <Container className="mx-auto shadow rounded my-3 p-4">
      <Row>
        <Col lg={12}>
          <Form className="w-50 float-left">
            <Form.Group className="mb-3" controlId="formBasicKeyword">
              <Form.Label>Keyword</Form.Label>
              <Form.Control
                type="text"
                placeholder="Keyword"
                value={keyword}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
          <div className="d-flex align-items-center justify-content-between">
            {isSearchLoading ? (
              <span className="d-flex">
                <Spinner animation="border" variant="danger" className="mx-3" />{" "}
                Fetching Data..........
              </span>
            ) : (
              <Button
                variant="primary"
                className="float-left"
                onClick={handleSubmit}
              >
                Search
              </Button>
            )}
            {allData.length > 0 ? (
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
          </div>
        </Col>
      </Row>
      <Row className=" my-2">
        {viewData && viewData.length > 0
          ? viewData.map((res, index) => {
              console.log(res);
              return (
                <Col sm={6} md={4} lg={3} className="my-2" key={index}>
                  <Card
                    style={{ width: "100%", border: "none" }}
                    className="shadow-lg"
                  >
                    <Card.Img
                      variant="top"
                      height={"250px"}
                      src={res.img}
                      className="card_img"
                    />
                    <Card.Body>
                      {/* <Card.Title>{res.pid}</Card.Title> */}
                      <Card.Title
                        style={{ maxHeight: "50px", overflow: "hidden" }}
                      >
                        {res.name}
                      </Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        Price: £ {res.price}
                      </Card.Subtitle>
                      <Card.Text>Sales: {res.sales}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })
          : ""}

        {viewData &&
        viewData.length > 0 &&
        allData.length - viewData.length > 0 ? (
          <Card
            style={{ width: "100%", border: "none" }}
            className="shadow-lg "
          >
            <Card.Body>
              {/* <Card.Title>{res.pid}</Card.Title> */}
              <Card.Title
                style={{ maxHeight: "50px", overflow: "hidden" }}
                className="text-center"
              >
                + {allData.length - viewData.length} more
              </Card.Title>
            </Card.Body>
          </Card>
        ) : (
          ""
        )}
      </Row>
    </Container>
  );
};

export default Dataset;
