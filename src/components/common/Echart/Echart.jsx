import React from 'react';
import Mock from 'mockjs';
import echart from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/chart/map';
import 'echarts/map/js/china';
import defaultPie from './getRules/defaultPie';
import areaLine from './getRules/areaLine';
import doughnutPie from './getRules/doughnutPie';
import horizontalBar from './getRules/horizontalBar';
import chinaMap from './getRules/chinaMap';
import './Echart.scss';

class Echart extends React.Component {
  constructor() {
    super();
    this.state = {
      guid: Mock.Random.guid(),
    };
    this.defaultWidth = '400px';
    this.defaultHeight = '250px';
  }

  componentDidUpdate() {
    const { title, data, type } = this.props;
    let rules;
    switch (type) {
      case 'defaultPie': rules = defaultPie; break;
      case 'areaLine': rules = areaLine; break;
      case 'doughnutPie': rules = doughnutPie; break;
      case 'horizontalBar': rules = horizontalBar; break;
      case 'chinaMap': rules = chinaMap; break;
      default: break;
    }
    const { guid } = this.state;
    const myChart = echart.init(document.getElementById(`echart-${guid}`), 'dark');
    if (data) myChart.setOption(rules(data, title));
  }

  render() {
    const { guid } = this.state;
    const width = this.props.width || this.defaultWidth;
    const height = this.props.height || this.defaultHeight;
    return (
      <div
        style={{ width, height }}
        id={`echart-${guid}`}
        className="common-chart"
      />
    );
  }
}

export default Echart;
