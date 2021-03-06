import React from 'react';
import moment from 'moment';
import './View.scss';
import Echart from '../common/Echart/Echart';
import getAmountTrend from '../../services/data/getAmountTrend';
import getSensiLayout from '../../services/data/getSensiLayout';
import getSourceLayout from '../../services/data/getSourceLayout';
import getRegionLayout from '../../services/data/getRegionLayout';

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
    };
  }

  componentDidMount() {
    this.handleSearch();
    setInterval(() => {
      this.handleSearch();
    }, 5000);
  }

  handleSearch = () => {
    this.getAmountTrend();
    this.getSensiLayout();
    this.getSourceLayout();
    this.getRegionLayout();
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
    const { sensiLayout, regionLayout, sourceLayout, totalAmountTrend, sourceAmountTrend } = this.state;
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
      </div>
    );
  }
}

export default View;
