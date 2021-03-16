import React from 'react';
import moment from 'moment';
import './View.scss';
import Echart from '../../common/Echart/Echart';
import getAmountTrend from '../../../services/request/data/getAmountTrend';
import getSensiLayout from '../../../services/request/data/getSensiLayout';
import getSourceLayout from '../../../services/request/data/getSourceLayout';
import getRegionLayout from '../../../services/request/data/getRegionLayout';
import getTraceTree from "../../../services/request/data/getTraceTree";

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

class View extends React.Component {
  constructor() {
    super();
    this.state = {
      dateRange: 0,
      startPublishedDay: moment().format(DATE_FORMAT),
      endPublishedDay: moment().startOf('day').format(DATE_FORMAT),
      sensiLayout: undefined,
      sourceLayout: undefined,
      totalAmountTrend: undefined,
      sourceAmountTrend: undefined,
      regionLayout: undefined,
      traceTree: undefined,
    };
  }

  componentDidMount() {
    this.handleSearch();
    this.clk = setInterval(() => {
      this.handleSearch();
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.clk);
  }

  handleSearch = () => {
    this.getAmountTrend();
    this.getSensiLayout();
    this.getSourceLayout();
    this.getRegionLayout();
    this.getTraceTree();
  };

  getTraceTree = async () => {
    const keyword = '';
    const { startPublishedDay, endPublishedDay } = this.state;
    const traceTree = await getTraceTree(keyword, startPublishedDay, endPublishedDay);
    this.setState({ traceTree });
  };

  getRegionLayout = async () => {
    const keyword = '';
    const { startPublishedDay, endPublishedDay } = this.state;
    const regionLayout = await getRegionLayout(keyword, startPublishedDay, endPublishedDay);
    this.setState({ regionLayout });
  };

  getSourceLayout = async () => {
    const keyword = '';
    const { startPublishedDay, endPublishedDay } = this.state;
    const sourceLayout = await getSourceLayout(keyword, startPublishedDay, endPublishedDay);
    this.setState({ sourceLayout });
  };

  getSensiLayout = async () => {
    const keyword = '';
    const { startPublishedDay, endPublishedDay } = this.state;
    const sensiLayout = await getSensiLayout(keyword, startPublishedDay, endPublishedDay);
    this.setState({ sensiLayout });
  };

  getAmountTrend = async () => {
    const keyword = '';
    const { startPublishedDay, endPublishedDay } = this.state;
    const [totalAmountTrend, sourceAmountTrend] =
      await getAmountTrend(keyword, startPublishedDay, endPublishedDay);
    this.setState({
      totalAmountTrend, sourceAmountTrend,
    });
  };

  handleDateChange = (moments) => {
    if (!moments) {
      this.setState({
        startPublishedDay: null,
        endPublishedDay: null,
      });
    }
    const [startMoment, endMoment] = moments;
    this.setState({
      startPublishedDay: startMoment.format(DATE_FORMAT),
      endPublishedDay: endMoment.format(DATE_FORMAT),
    });
  };

  handleSelect = (name, value) => {
    const newState = {};
    newState[name] = value;
    this.setState(newState);
    const current = '2020-07-18 12:00:00';
    if (name === 'dateRange') {
      switch (value) {
        case 0:
          this.handleDateChange([
            moment(current),
            moment(current).startOf('day'),
          ]);
          break;
        case -1:
        case null:
          this.handleDateChange();
          break;
        default:
          this.handleDateChange([
            moment(current),
            moment(current).subtract(value, 'days'),
          ]);
          break;
      }
    }
  };

  render() {
    const { sensiLayout, regionLayout, sourceLayout, totalAmountTrend, sourceAmountTrend, traceTree } = this.state;
    return (
      <div className="view-wrap">
        <Echart
          title="敏感度分布"
          type="doughnutPie"
          data={sensiLayout}
        />
        <Echart
          title="来源分部"
          type="defaultPie"
          data={sourceLayout}
        />
        <Echart
          title="总量趋势"
          type="areaLine"
          data={totalAmountTrend}
        />
        <Echart
          title="来源趋势"
          type="horizontalBar"
          height="500px"
          width="800px"
          data={sourceAmountTrend}
        />
        <Echart
          title="来源趋势"
          type="chinaMap"
          data={regionLayout}
        />
        <Echart
          title="话题溯源"
          type="defaultTree"
          height="1000px"
          width="1600px"
          data={traceTree}
        />
        <Echart
          title="话题溯源"
          type="circleTree"
          height="1000px"
          width="1600px"
          data={traceTree}
        />
      </div>
    );
  }
}

export default View;
