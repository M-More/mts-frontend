import React from 'react';
import Mock from 'mockjs';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts';
import china from '../../../utils/map/json/china';
import defaultPie from './getRules/defaultPie';
import areaLine from './getRules/areaLine';
import doughnutPie from './getRules/doughnutPie';
import horizontalBar from './getRules/horizontalBar';
import chinaMap from './getRules/chinaMap';
import './Echart.scss';
import defaultTree from './getRules/defaultTree';
import circleTree from './getRules/circleTree';

class Echart extends React.Component {
  constructor() {
    super();
    this.state = {
      guid: Mock.Random.guid(),
    };
    this.defaultWidth = '400px';
    this.defaultHeight = '250px';
    echarts.registerMap('china', china);
  }

  render() {
    const { title, data, type } = this.props;
    let getRules;
    switch (type) {
      case 'defaultPie': getRules = defaultPie; break;
      case 'areaLine': getRules = areaLine; break;
      case 'doughnutPie': getRules = doughnutPie; break;
      case 'horizontalBar': getRules = horizontalBar; break;
      case 'chinaMap': getRules = chinaMap; break;
      case 'defaultTree': getRules = defaultTree; break;
      case 'circleTree': getRules = circleTree; break;
      default: break;
    }
    const option = data ? getRules(data, title) : {};
    const { guid } = this.state;
    const width = this.props.width || this.defaultWidth;
    const height = this.props.height || this.defaultHeight;
    return (
      <div
        className="common-chart"
        style={{ width, height }}
        id={`echart-${guid}`}
      >
        <ReactEcharts
          option={option}
          theme="dark"
        />
      </div>
    );
  }
}

export default Echart;
