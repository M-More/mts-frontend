import React from 'react';
import '../../common/utils/tagcanvas';
import './Home.scss';

class Home extends React.Component {
  componentDidMount() {
    try {
      window.TagCanvas.Start('myCanvas', 'tags', {
        textColour: '#15b6fc',
        outlineColour: '#ffffff00',
        reverse: true,
        depth: 0.8,
        dragControl: true,
        decel: 0.95,
        maxSpeed: 0.05,
        initial: [-0.2, 0],
      });
    } catch (e) {
      console.log('a');
    }
  }

  handleTitleClick(e) {
    e.preventDefault();
    console.log(e.target.innerHTML);
  }

  render() {
    return (
      <div className="home-container">
        <div style={{ textAlign: 'center' }}>
          <canvas width="600" height="200" id="myCanvas" />
          <div id="tags" style={{ display: 'none' }}>
            <a onClick={this.handleTitleClick}>新时代</a>
            <a>新理念</a>
            <a>新发展理念</a>
            <a>新安全观</a>
            <a>新时期</a>
            <a>新思想</a>
            <a>新征程</a>
            <a>新胜利</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
