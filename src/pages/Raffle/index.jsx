import React, { useState } from "react";
import { InputNumber, Button, Row, Col, Space, Card, Spin } from "antd";
import { useEffect } from "react";

let usedNumbers = [];

const Raffle = () => {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(10);
  const [minValue2, setMinValue2] = useState(0);
  const [maxValue2, setMaxValue2] = useState(10);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [randomNumbers, setRandomNumbers] = useState([]);

  const handleMinValueChange = (value) => {
    setMinValue(value);
    usedNumbers = [];
  };

  const handleMaxValueChange = (value) => {
    setMaxValue(value);
    usedNumbers = [];
  };

  const handleQuantityChange = (value) => {
    setQuantity(value);
    usedNumbers = [];
  };

  const handleGenerateClick = () => {
    setLoading(true);
    const numbers = [];
    while (numbers.length < quantity) {
      const randomNumber = [
        Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue2,
        Math.floor(Math.random() * (maxValue2 - minValue2 + 1)) + minValue2,
      ];
      console.log(randomNumber);
      // Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
      //   if (
      //     !numbers.includes(randomNumber)
      //     // !usedNumbers.includes(randomNumber)
      //   ) {
      //     numbers.push(randomNumber);
      //     // usedNumbers.push(randomNumber);
      //   }
      numbers.push(randomNumber);
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
        backgroundImage: `url(https://www.helloimg.com/images/2023/05/24/oJtP6P.jpg)`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <Row justify="center" style={{ height: "100vh" }}>
        <Col>
          <Row justify="center">
            <Col>
              <div style={{ padding: 40, fontSize: 48, fontWeight: "bold", color: '#fff' }}>
              525音乐故事会暖场抽奖
              </div>
            </Col>
          </Row>
          <Space direction="vertical" size="large" style={{ display: "flex" }}>
            <Card style={{ opacity: 0.99 }} size="small">
              <Row justify="center" align="middle" gutter={[16, 16]}>
                <Col>
                  <Row>
                    排：
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
                      </Space>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: 12 }}>
                    号：
                    <Col>
                      <Space>
                        <InputNumber
                          value={minValue2}
                          onChange={handleMinValueChange}
                          min={0}
                          max={maxValue2}
                        />
                        <span>~</span>
                      </Space>
                    </Col>
                    <Col>
                      <Space>
                        <InputNumber
                          value={maxValue2}
                          onChange={handleMaxValueChange}
                          min={minValue2}
                        />
                      </Space>
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <span>x</span>
                </Col>
                <Col>
                  <InputNumber
                    value={quantity}
                    onChange={handleQuantityChange}
                    min={1}
                  />
                </Col>
              </Row>
              <Row justify="center" style={{ marginTop: 16 }}>
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
                  {randomNumbers.map((numbers, index) => (
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
                          {numbers[0]} 排 {numbers[1]} 号
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
