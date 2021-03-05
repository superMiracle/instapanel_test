import React, { useState, useEffect } from "react";
import { Layout, Row, Col, notification } from "antd";
import { BeerTable, BeerChart } from "../../components";

import { getBeers, getTotalNumOfBeers } from "../../services";
import { Beer } from "../../types";
import "./index.css";

const { Content } = Layout;

const Main: React.FC = () => {
  const [beers, setBeers] = useState<Beer[]>([]);
  const [total, setTotal] = useState<number>(0);

  const paginate = (page: number, size: number) => {
    getBeers(page, size)
      .then((result) => {
        setBeers(result);
      })
      .catch((error) => {
        notification.open({
          message: "Error",
          description: error,
        });
      });
  };

  useEffect(() => {
    setTotal(getTotalNumOfBeers());

    getBeers(1, 10)
      .then((result) => {
        // console.log(result);
        setBeers(result);
      })
      .catch((error) => {
        notification.open({
          message: "Error",
          description: error,
        });
      });
  }, []);

  console.log("result", beers);
  return (
    <Content style={{ padding: "50px" }}>
      <Row className='row'>
        <Col
          md={{ span: 20, offset: 2 }}
          lg={{ span: 12, offset: 6 }}
          className='gutter-row'
        >
          <BeerChart beers={beers} />
        </Col>
      </Row>

      <Row className='row'>
        <Col
          md={{ span: 22, offset: 1 }}
          lg={{ span: 16, offset: 4 }}
          className='gutter-row'
        >
          <BeerTable data={beers} total={total} paginate={paginate} />
        </Col>
      </Row>
    </Content>
  );
};

export default Main;
