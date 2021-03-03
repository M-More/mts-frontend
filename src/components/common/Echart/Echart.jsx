import React from 'react';
import Mock from 'mockjs';
import echart from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import pie from './rules/pie';
import area from './rules/area';
import doughnut from './rules/doughnut';
import './Echart.scss';

class Echart extends React.Component {
  constructor() {
    super();
    this.state = {
      guid: Mock.Random.guid(),
    };
  }

  componentDidUpdate() {
    const { title, data, type } = this.props;
    let rules;
    switch (type) {
      case 'pie': rules = pie; break;
      case 'area': rules = area; break;
      case 'doughnut': rules = doughnut; break;
      default: break;
    };
    const { guid } = this.state;
    const myChart = echart.init(document.getElementById(`echart-${guid}`));
    if (data) myChart.setOption(rules(title, data));
  }

  render() {
    const { guid, title } = this.state;
    return (
      <div id={`echart-${guid}`} className="common-chart">
        {title} 当前无图表展示
      </div>
    );
  }
}

export default Echart;
