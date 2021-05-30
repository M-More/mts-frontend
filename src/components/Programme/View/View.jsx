import React from 'react';
import moment from 'moment';
import './View.scss';
import { connect } from 'react-redux';
import { Button, Carousel } from 'antd';
import Echart from '../../common/Echart/Echart';
import getAmountTrend from '../../../services/request/data/getAmountTrend';
import getSensiLayout from '../../../services/request/data/getSensiLayout';
import getSourceLayout from '../../../services/request/data/getSourceLayout';
import getRegionLayout from '../../../services/request/data/getRegionLayout';
import getTraceTree from '../../../services/request/data/getTraceTree';
import WordCloud from '../../common/WordCloud/WordCloud';
import getKeywordsCloud from '../../../services/request/data/getKeywordsCloud';
import getProgrammeData from '../../../services/request/data/getProgrammeData';
import AutofitWrap from '../../common/AutofitWrap/AutofitWrap';
import getProgrammeSensiLayout from '../../../services/request/programme/getProgrammeSensiLayout';
import getProgrammeSourceLayout from '../../../services/request/programme/getProgrammeSourceLayout';
import getProgrammeAmountTrend from '../../../services/request/programme/getProgrammeAmountTrend';
import getProgrammeRegionLayout from '../../../services/request/programme/getProgrammeRegionLayout';
import getEventTree from '../../../services/request/data/getEventTree';
import getProgrammeSentimentLayout from '../../../services/request/programme/getProgrammeSentimentLayout';
import getProgrammeSentimentTrend from "../../../services/request/programme/getProgrammeSentimentTrend";

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

class View extends React.Component {
  constructor() {
    super();
    this.state = {
      dateRange: 0,
      endPublishedDay: moment().format(DATE_FORMAT),
      startPublishedDay: moment().startOf('year').format(DATE_FORMAT),
      sensiLayout: {},
      sourceLayout: {},
      totalAmountTrend: {},
      sourceAmountTrend: {},
      regionLayout: {},
      traceTree: {},
      keywordsCloud: {},
      emotionLayout: {},
      eventTree: {},
      emotionTrend: {},
      data: {},
    };
  }

  getCriteria = () => {
    const fid = this.props.curProgramme?.fid;
    const { startPublishedDay, endPublishedDay } = this.state;
    const criteria = { fid, startPublishedDay, endPublishedDay };
    return JSON.stringify(criteria);
  };

  formatEventTree = (rawData) => {
    const list = [rawData];
    while (list.length) {
      const head = list.shift();
      head.name = `事件${head.clusterNum}: \n${head.time}`;
      head.children = head.childList;
      head.data = {
        clusterNum: head.clusterNum,
        time: head.time,
        summary: head.summary,
      };
      head.children && head.children.forEach((item) => {
        list.push(item);
      });
    }
    return rawData;
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.curProgramme?.fid !== this.props.curProgramme?.fid) {
      this.carousel.goTo(0);
      this.handleCarouselChange(0);
    }
  }

  componentDidMount() {
    this.handleCarouselChange(0);
    this.mouseWheel = (e) => {
      e.preventDefault()
      e.stopPropagation()
      if (e.deltaY > 0) this.carousel.next();
      else this.carousel.prev();
    };
    this.carouselWrap.addEventListener('mousewheel', this.mouseWheel);
  }

  componentWillUnmount() {
    this.carouselWrap.removeEventListener('mousewheel', this.mouseWheel);
  }

  handleCarouselChange = (current) => {
    const criteria = this.getCriteria();
    switch (current) {
      case 0: if (!this.state.keywordsCloud[criteria]) this.getKeywordsCloud(); break;
      case 2: if (!this.state.sensiLayout[criteria]) this.getSensiLayout(); break;
      case 3: if (!this.state.sourceLayout[criteria]) this.getSourceLayout(); break;
      case 4: if (!this.state.totalAmountTrend[criteria]) this.getAmountTrend(); break;
      case 5: if (!this.state.sourceAmountTrend[criteria]) this.getAmountTrend(); break;
      case 6: if (!this.state.regionLayout[criteria]) this.getRegionLayout(); break;
      case 1: if (!this.state.data[criteria]) this.getLatestInfo(); break;
      case 7: if (!this.state.emotionLayout[criteria]) this.getEmotionLayout(); break; // 情感分布
      case 8: if (!this.state.emotionTrend[criteria]) this.getEmotionTrend(); break; // 情感趋势
      case 9: if (!this.state.eventTree[criteria]) this.getEventTree(); break; // 事件溯源
      case 10: if (!this.state.traceTree[criteria]) this.getTraceTree(); break; // 话题溯源1
      case 11: if (!this.state.traceTree[criteria]) this.getTraceTree(); break; // 话题溯源2
      default: break;
    }
  };

  getLatestInfo = async () => {
    const PAGE_SIZE = 10;
    const params = [
      this.props.curProgramme.fid,
      '', // keyword
      null, // source
      '', // startPublishDay
      '', // endPublishDay
      null, // sensitiveFlag
      0, // timeOrder
      PAGE_SIZE, // pageSize
      0, // pageId
    ];
    const result = await getProgrammeData(...params);
    const criteria = this.getCriteria();
    const newData = { ...this.state.data };
    newData[criteria] = result.data;
    this.setState({ data: newData });
  };

  getEmotionTrend = async () => {
    const { startPublishedDay, endPublishedDay } = this.state;
    const { fid } = this.props.curProgramme;
    const emotionTrend = await getProgrammeSentimentTrend(fid, startPublishedDay, endPublishedDay);
    const criteria = this.getCriteria();
    const newData = { ...this.state.emotionTrend };
    newData[criteria] = emotionTrend;
    this.setState({ emotionTrend: newData });
  };

  getEmotionLayout = async () => {
    const { startPublishedDay, endPublishedDay } = this.state;
    const { fid } = this.props.curProgramme;
    const emotionLayout = await getProgrammeSentimentLayout(fid, startPublishedDay, endPublishedDay);
    const criteria = this.getCriteria();
    const newData = { ...this.state.emotionLayout };
    newData[criteria] = emotionLayout;
    this.setState({ emotionLayout: newData });
  };

  getKeywordsCloud = async () => {
    const { startPublishedDay, endPublishedDay } = this.state;
    const { fid } = this.props.curProgramme;
    const wordNumber = 50;
    const keywordsCloud = await getKeywordsCloud(fid, startPublishedDay, endPublishedDay, wordNumber);
    const criteria = this.getCriteria();
    const newData = { ...this.state.keywordsCloud };
    newData[criteria] = keywordsCloud;
    this.setState({ keywordsCloud: newData });
  };

  getTraceTree = async () => {
    const { fid } = this.props.curProgramme;
    const { startPublishedDay, endPublishedDay } = this.state;
    const traceTree = await getTraceTree(fid, startPublishedDay, endPublishedDay);
    if (traceTree.children && !traceTree.children.length) traceTree.children = [{ name: '无信息' }];
    // if (traceTree.children && traceTree.children.length > 50) traceTree.children = traceTree.children.slice(0, 50);
    if (traceTree.children && traceTree.children.length > 20) {
      const withChildren = traceTree.children.filter(item => item.children.length);
      const noChildren = traceTree.children.filter(item => !item.children.length);
      if (withChildren.length > 20) traceTree.children = withChildren.slice(0, 20);
      else traceTree.children = withChildren.concat(noChildren.slice(0, 20 - withChildren.length));
    }
    const criteria = this.getCriteria();
    const newData = { ...this.state.traceTree };
    newData[criteria] = traceTree;
    this.setState({ traceTree: newData });
  };

  getRegionLayout = async () => {
    const { fid } = this.props.curProgramme;
    const { startPublishedDay, endPublishedDay } = this.state;
    const regionLayout = await getProgrammeRegionLayout(fid, startPublishedDay, endPublishedDay);
    const criteria = this.getCriteria();
    const newData = { ...this.state.regionLayout };
    newData[criteria] = regionLayout;
    this.setState({ regionLayout: newData });
  };

  getSourceLayout = async () => {
    const { fid } = this.props.curProgramme;
    const { startPublishedDay, endPublishedDay } = this.state;
    const sourceLayout = await getProgrammeSourceLayout(fid, startPublishedDay, endPublishedDay);
    const criteria = this.getCriteria();
    const newData = { ...this.state.sourceLayout };
    newData[criteria] = sourceLayout;
    this.setState({ sourceLayout: newData });
  };

  getSensiLayout = async () => {
    const { fid } = this.props.curProgramme;
    const { startPublishedDay, endPublishedDay } = this.state;
    const sensiLayout = await getProgrammeSensiLayout(fid, startPublishedDay, endPublishedDay);
    const criteria = this.getCriteria();
    const newData = { ...this.state.sensiLayout };
    newData[criteria] = sensiLayout;
    this.setState({ sensiLayout: newData });
  };

  getAmountTrend = async () => {
    const { fid } = this.props.curProgramme;
    const { startPublishedDay, endPublishedDay } = this.state;
    const [totalAmountTrend, sourceAmountTrend] =
      await getProgrammeAmountTrend(fid, startPublishedDay, endPublishedDay);
    const criteria = this.getCriteria();
    const newData1 = { ...this.state.totalAmountTrend };
    newData1[criteria] = totalAmountTrend;
    const newData2 = { ...this.state.sourceAmountTrend };
    newData2[criteria] = sourceAmountTrend;
    this.setState({ sourceAmountTrend: newData2, totalAmountTrend: newData1 });
  };

  getEventTree = async () => {
    const { fid } = this.props.curProgramme;
    const { startPublishedDay, endPublishedDay } = this.state;
    const eventTree = await getEventTree(fid, startPublishedDay, endPublishedDay);
    const formatedEventTree = this.formatEventTree(eventTree);
    const criteria = this.getCriteria();
    const newData = { ...this.state.eventTree };
    newData[criteria] = formatedEventTree;
    this.setState({ eventTree: newData });
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
    const { data, emotionTrend, emotionLayout, eventTree, sensiLayout, regionLayout, sourceLayout, totalAmountTrend, sourceAmountTrend, traceTree, keywordsCloud, traceTreeFormat } = this.state;
    const criteria = this.getCriteria();
    return (
      <div ref={r => this.carouselWrap = r}>
        <Carousel
          ref={r => this.carousel = r}
          dotPosition="left"
          dots={{ className: 'dots' }}
          afterChange={this.handleCarouselChange}
          className="view-wrap"
        >
          <div className="carousel-item">
            <AutofitWrap
              minHeight={550}
              padding={200}
            >
              <WordCloud
                option={keywordsCloud[criteria]}
              />
            </AutofitWrap>
          </div>
          <div className="carousel-item">
            <AutofitWrap
              minHeight={550}
              padding={200}
            >
              <div className="latest-info">
                <div className="theme">最新舆情</div>
                {data[criteria] && data[criteria].map((item) => (
                  <div className="latest-info-item">
                    <span className="title">{item.title}</span>
                    <span className="content">{item.content}</span>
                  </div>
                ))}
              </div>
            </AutofitWrap>
          </div>
          <div className="carousel-item">
            <AutofitWrap
              minHeight={550}
              padding={200}
            >
              <Echart
                title="敏感度分布"
                type="doughnutPie"
                data={sensiLayout[criteria]}
              />
            </AutofitWrap>
          </div>
          <div className="carousel-item">
            <AutofitWrap
              minHeight={550}
              padding={200}
            >
              <Echart
                title="来源分部"
                type="defaultPie"
                data={sourceLayout[criteria]}
              />
            </AutofitWrap>
          </div>
          <div className="carousel-item">
            <AutofitWrap
              minHeight={550}
              padding={200}
            >
              <Echart
                title="总量趋势"
                type="areaLine"
                data={totalAmountTrend[criteria]}
              />
            </AutofitWrap>
          </div>
          <div className="carousel-item">
            <AutofitWrap
              minHeight={550}
              padding={200}
            >
              <Echart
                title="来源趋势"
                type="horizontalBar"
                data={sourceAmountTrend[criteria]}
              />
            </AutofitWrap>
          </div>
          <div className="carousel-item">
            <AutofitWrap
              minHeight={550}
              padding={200}
            >
              <Echart
                title="地域分布"
                type="chinaMap"
                data={regionLayout[criteria]}
              />
            </AutofitWrap>
          </div>

          <div className="carousel-item">
            <AutofitWrap
              minHeight={550}
              padding={200}
            >
              <Echart
                title="情感分析"
                type="defaultPie"
                data={emotionLayout[criteria]}
              />
            </AutofitWrap>
          </div>
          <div className="carousel-item">
            <AutofitWrap
              minHeight={550}
              padding={200}
            >
              <Echart
                title="情感趋势图"
                type="horizontalBar"
                data={emotionTrend[criteria]}
              />
            </AutofitWrap>
          </div>
          <div className="carousel-item">
            <AutofitWrap
              minHeight={550}
              padding={200}
            >
              <Echart
                title="事件溯源"
                type="connGraph"
                data={eventTree[criteria]}
              />
            </AutofitWrap>
          </div>
          <div className="carousel-item">
            <AutofitWrap
              minHeight={550}
              padding={200}
            >
              <Echart
                title="话题溯源"
                type="defaultTree"
                data={traceTree[criteria]}
              />
            </AutofitWrap>
          </div>
          <div className="carousel-item">
            <AutofitWrap
              minHeight={550}
              padding={200}
            >
              <Echart
                title="话题溯源"
                type="circleTree"
                data={traceTree[criteria]}
              />
            </AutofitWrap>
          </div>
        </Carousel>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  curProgramme: state.curProgramme,
});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(View);
