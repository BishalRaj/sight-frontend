import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import Chart from "react-apexcharts";

const Home = () => {
  var card = [];

  for (let index = 0; index < 4; index++) {
    card.push(
      <Col>
        <Card style={{ width: "100%" }} className="shadow">
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Card Subtitle
            </Card.Subtitle>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Card.Link href="#">Card Link</Card.Link>
            <Card.Link href="#">Another Link</Card.Link>
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
    <Container className="mx-auto shadow rounded my-3 py-3">
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

      <Row className="">{card}</Row>
    </Container>
  );
};

export default Home;
