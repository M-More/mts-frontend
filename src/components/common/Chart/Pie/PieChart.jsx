import React from 'react';
import Mock from 'mockjs';
import EChart from 'echarts/lib/echarts';
import rules from './rules';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import './PieChart.scss';

class PieChart extends React.Component {
  constructor() {
    super();
    this.state = {
      guid: Mock.Random.guid(),
    };
  }

  componentDidUpdate() {
    const { title, data } = this.props;
    const { guid } = this.state;
    const myChart = EChart.init(document.getElementById(`pie-${guid}`));
    myChart.setOption(rules(title, data));
  }

  render() {
    const { guid, title } = this.state;
    return (
      <div id={`pie-${guid}`} className="common-chart-pie">
        {title} 当前无图表展示
      </div>
    );
  }
}

export default PieChart;
