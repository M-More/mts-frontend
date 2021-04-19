import React from 'react';
import '../../utils/tagCanvas';
import './Home.scss';
import requests from '../../services/requests';
import constant from '../../config/constant';

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
        <canvas className="canvas" width="600" height="600" id="canvas" />
        <div id="tags" style={{ textAlign: 'center' }}>
          {tags.map((item) => (
            <a onClick={this.handleTitleClick}>{ item }</a>
          ))}
        </div>
      </div>
    );
  }
}

export default Home;
