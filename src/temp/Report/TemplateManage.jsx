import React, { Component } from 'react';
import { Card, Row, Col, Button } from 'antd';
import './TemplateManage.css';

const { Meta } = Card;

class TemplateManage extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <div className="site-card-wrapper">
        <Row gutter={16}>
          <Col span={8}>
            <Card
              hoverable
              style={{ width: 240 }}
              cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
            >
              <Meta title="经典版" description={<Button type="primary" block>预览</Button>} />
            </Card>
          </Col>
          <Col span={8}>
            <Card
              hoverable
              style={{ width: 240 }}
              cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
            >
              <Meta title="摘要版" description={<Button type="primary" block>预览</Button>} />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default TemplateManage;

