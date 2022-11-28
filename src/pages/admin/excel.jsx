import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import productService from "../../services/product.service";

import "./style/style.css";
import { base_url } from "../../static";

const Excel = () => {
  const navigate = useNavigate();
  const [keyword, setkeyword] = useState(null);
  const [excelFile, setexcelFile] = useState(null);
  const handleSubmit = async () => {
    await productService.singleSearchByKeyword(keyword).then((blob) => {
      setexcelFile(blob);
      let bllob = new Blob([blob]);
      let file = URL.createObjectURL(bllob);
      let a = document.createElement("a");
      a.download = "etzy.xlsx";
      a.href = file;
      a.click();
    });
  };
  const handleChange = (e) => {
    setkeyword(e.target.value);
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
          <Button
            variant="primary"
            className="float-left"
            onClick={() => handleSubmit()}
          >
            Search
          </Button>
        </Col>
        <Col>
          <a href={excelFile} download>
            Click to download
          </a>
        </Col>
      </Row>
    </Container>
  );
};

export default Excel;
