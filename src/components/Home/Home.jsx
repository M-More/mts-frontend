import React from 'react';
import '../../utils/tagCanvas';
import './Home.scss';
import requests from '../../services/requests';
import constant from '../../config/constant';
import { Carousel, Card } from "antd";

const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      tags: [],
    };
  }

  componentDidMount() {
    this.handleRefresh();
  }

  handleRefresh = () => {
    fetch(requests.getTopics.url, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((result) => {
        new Promise((resolve) => {
          this.setState({ tags: result.tags });
          resolve();
        })
          .then(() => {
            try {
              window.TagCanvas.Start('canvas', 'tags', {
                textColour: '#1890ff',
                outlineColour: '#1890ff',
                reverse: true,
                depth: 0.8,
                dragControl: true,
                decel: 0.95,
                maxSpeed: 0.05,
                initial: [-0.2, 0],
              });
            } catch (e) { console.error('Load word cloud error, result =', result); }
          });
      });
  };

  handleTitleClick = (e) => {
    e.preventDefault();
    // console.log(e.target.innerHTML);
  };

  render() {
    const { tags } = this.state;
    return (
      <div className="home-wrap">
        <div className="title">舆情监测系统</div>
        <Card title="敏感信息列表" className="home-card">
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
        <Card title="最新舆情" className="home-card" >
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      </div>
    );
  }
}

export default Home;
