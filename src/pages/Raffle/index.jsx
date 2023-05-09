import React, { useState } from "react";
import { InputNumber, Button, Row, Col, Space, Card, Spin } from "antd";
import { useEffect } from "react";

let usedNumbers = []

const Raffle = () => {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(10);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [randomNumbers, setRandomNumbers] = useState([]);

  const handleMinValueChange = (value) => {
    setMinValue(value);
    usedNumbers=[]
  };

  const handleMaxValueChange = (value) => {
    setMaxValue(value);
    usedNumbers=[]
  };

  const handleQuantityChange = (value) => {
    setQuantity(value);
    usedNumbers=[]
  };

  const handleGenerateClick = () => {
    setLoading(true);
    const numbers = [];
    while (numbers.length < quantity) {
      const randomNumber =
        Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
      if (!numbers.includes(randomNumber) && !usedNumbers.includes(randomNumber)) {
        numbers.push(randomNumber);
        usedNumbers.push(randomNumber)
      }
    }
    setRandomNumbers(numbers);
  };

  useEffect(() => {
    if (loading === true) {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  }, [loading]);

  return (
    <div
      style={{
        backgroundColor: "#fff",
        backgroundImage: `url(https://remote-obj-1313529792.cos.ap-guangzhou.myqcloud.com/cocode/6e5eeeb6-fd57-42aa-8052-6916646d6c2a.jpg)`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <Row justify="center" style={{ height: "100vh" }}>
        <Col>
          <Row justify="center">
            <Col>
              <div style={{ padding: 40, fontSize: 48, fontWeight: "bold" }}>
                木心十周年献礼抽奖
              </div>
            </Col>
          </Row>
          <Space direction="vertical" size="large" style={{ display: "flex" }}>
            <Card style={{ opacity: 0.99 }} size="small">
              <Row justify="center" gutter={16}>
                <Col>
                  <Space>
                    <InputNumber
                      value={minValue}
                      onChange={handleMinValueChange}
                      min={0}
                      max={maxValue}
                    />
                    <span>~</span>
                  </Space>
                </Col>
                <Col>
                  <Space>
                    <InputNumber
                      value={maxValue}
                      onChange={handleMaxValueChange}
                      min={minValue}
                    />
                    <span>x</span>
                  </Space>
                </Col>
                <Col>
                  <InputNumber
                    value={quantity}
                    onChange={handleQuantityChange}
                    min={1}
                  />
                </Col>
                <Col>
                  <Button onClick={handleGenerateClick} type="primary ">
                    开始抽奖
                  </Button>
                </Col>
              </Row>
            </Card>
            {randomNumbers.length > 0 && (
              <Card
                title="中奖号码"
                headStyle={{
                  border: "none",
                  textAlign: "center",
                  fontSize: 32,
                }}
                style={{ opacity: 0.96, minHeight: 480 }}
                size="small"
              >
                <Spin spinning={loading} size="large" tip="抽取号码中...">
                  {randomNumbers.map((number, index) => (
                    <Row
                      key={index}
                      justify="center"
                      style={loading && { visibility: "hidden" }}
                    >
                      <Col>
                        <div
                          style={{
                            fontSize: 32,
                            fontWeight: "bold",
                            color: "#696969",
                          }}
                        >
                          {number}
                        </div>
                      </Col>
                    </Row>
                  ))}
                </Spin>
              </Card>
            )}
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default Raffle;
