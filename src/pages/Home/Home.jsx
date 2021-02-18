import React from 'react';
import '../../common/utils/tagcanvas';
import './Home.scss';
import requests from '../../common/enums/requests';
import constant from '../../common/constant';

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
    fetch(requests.getTags.url, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
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
    console.log(e.target.innerHTML);
  };

  render() {
    const { tags } = this.state;
    console.log(tags);
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
