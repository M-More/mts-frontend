import React from 'react';
import Mock from 'mockjs';
import EChart from 'echarts/lib/echarts';
import genRules from './rules';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';

class Doughnut extends React.Component {
  constructor() {
    super();
    this.state = {
      guid: Mock.Random.guid(),
    };
  }

  componentDidUpdate() {
    const { title, results } = this.props;
    const { guid } = this.state;
    const myChart = EChart.init(document.getElementById(`doughnut-${guid}`));
    myChart.setOption(genRules(title, results));
  }

  render() {
    const { results } = this.props;
    const { guid } = this.state;
    console.log(results);
    return (
      <div id={`doughnut-${guid}`} style={{ width: 400, height: 400 }} />
    );
  }
}

export default Doughnut;
