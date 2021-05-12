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
import AutofitWrap from "../../common/AutofitWrap/AutofitWrap";
import getProgrammeSensiLayout from "../../../services/request/programme/getProgrammeSensiLayout";
import getProgrammeSourceLayout from "../../../services/request/programme/getProgrammeSourceLayout";
import getProgrammeAmountTrend from "../../../services/request/programme/getProgrammeAmountTrend";
import getProgrammeRegionLayout from "../../../services/request/programme/getProgrammeRegionLayout";

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

const contentStyle = {
  color: '#fff',
  background: '#364d79',
};

// 临时数据

const emotionLayout = [
  { name: '积极', label: '积极', value: 76 },
  { name: '愤怒', label: '愤怒', value: 91 },
  { name: '悲伤', label: '悲伤', value: 61 },
  { name: '恐惧', label: '恐惧', value: 66 },
  { name: '惊奇', label: '惊奇', value: 57 },
  { name: '无情绪', label: '无情绪', value: 41 },
];
const emotionTrendLayout = {
  'yAxis': ['1993-', '1980-', '2003-', '1981-', '1984-', '2007-'],
  'xAxis': [
    { 'name': '积极', 'label': '积极', 'value': [14, 10, 6, 12, 13, 9] },
    { 'name': '愤怒', 'label': '愤怒', 'value': [16, 7, 14, 11, 6, 19] },
    { 'name': '悲伤', 'label': '悲伤', 'value': [15, 4, 12, 14, 15, 9] },
    { 'name': '恐惧', 'label': '恐惧', 'value': [6, 14, 8, 11, 3, 3] },
    { 'name': '惊奇', 'label': '惊奇', 'value': [7, 15, 12, 19, 3, 2] },
    { 'name': '无情绪', 'label': '无情绪', 'value': [9, 5, 17, 6, 16, 14] }],
};
const getEventTree = () => {
  const rawData = {
    'clusterNum': 0,
    'time': 'null',
    'summary': 'Rootnode',
    'childList': [
      {
        'clusterNum': 1,
        'time': '2020-03-10',
        'summary': null,
        'childList': [
          {
            'clusterNum': 2,
            'time': '2020-04-24',
            'summary': null,
            'childList': [
              {
                'clusterNum': 3,
                'time': '2020-04-28',
                'summary': null,
                'childList': [],
              },
              {
                'clusterNum': 4,
                'time': '2020-05-05',
                'summary': null,
                'childList': [],
              },
            ],
          },
          {
            'clusterNum': 5,
            'time': '2020-05-14',
            'summary': null,
            'childList': [],
          },
          {
            'clusterNum': 6,
            'time': '2020-05-21',
            'summary': null,
            'childList': [
              {
                'clusterNum': 7,
                'time': '2020-06-10',
                'summary': null,
                'childList': [],
              },
              {
                'clusterNum': 8,
                'time': '2020-07-02',
                'summary': null,
                'childList': [
                  {
                    'clusterNum': 9,
                    'time': '2020-07-13',
                    'summary': null,
                    'childList': [
                      {
                        'clusterNum': 10,
                        'time': '2020-07-21',
                        'summary': null,
                        'childList': [],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };
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
    head.children.forEach((item) => {
      list.push(item);
    });
  }
  return rawData;
  /* rawData.level = 0;
  const list = [rawData];
  const nodes = [];
  const links = [];
  let top = 0;
  let curLevel = 0;
  while (list.length) {
    const head = list.shift();
    if (curLevel !== head.level) {
      top = 0;
      curLevel = head.level;
    }
    nodes.push({
      id: head.clusterNum.toString(),
      category: 0,
      name: `${head.clusterNum}\n${head.time}`,
      symbolSize: 40,
      time: head.time,
      summary: head.summary,
      x: curLevel * 100,
      y: top,
      show: true,
    });
    top -= 100;
    head.childList.forEach(child => {
      links.push({
        source: head.clusterNum.toString(),
        target: child.clusterNum.toString(),
        name: '',
      });
      child.level = head.level + 1;
      list.push(child);
    });
  }
  const categories = [{ name: '事件' }];
  const data = { nodes, links, categories };
  return data; */
};

class View extends React.Component {
  constructor() {
    super();
    this.state = {
      dateRange: 0,
      endPublishedDay: moment().format(DATE_FORMAT),
      startPublishedDay: moment().startOf('year').format(DATE_FORMAT),
      sensiLayout: undefined,
      sourceLayout: undefined,
      totalAmountTrend: undefined,
      sourceAmountTrend: undefined,
      regionLayout: undefined,
      traceTree: undefined,
      keywordsCloud: undefined,
      traceTreeFormat: 'defaultTree',
      data: undefined,
    };
  }

  changeTraceTreeFormat = () => {
    const traceTreeFormat = this.state.traceTreeFormat === 'defaultTree' ? 'circleTree' : 'defaultTree';
    this.setState({ traceTreeFormat });
  };

  shouldComponentUpdate(prevProps, prevState, snapshot) {
    if (this.props.curProgramme.fid !== prevProps.curProgramme.fid) {
      this.setState({
        sensiLayout: undefined,
        sourceLayout: undefined,
        totalAmountTrend: undefined,
        sourceAmountTrend: undefined,
        regionLayout: undefined,
        traceTree: undefined,
        keywordsCloud: undefined,
      }, () => {
        this.carousel.goTo(0)
        this.handleCarouselChange(0);
      });
      return false
      // this.handleSearch();
    }
    return true
  }

  componentDidMount() {
    // this.handleSearch();
    // this.clk = setInterval(() => {
    //   this.handleSearch();
    // }, 5000);
    this.handleCarouselChange(0);
    this.mouseWheel = (e) => {
      if (e.deltaY > 0) this.carousel.next();
      else this.carousel.prev();
    };
    window.addEventListener('mousewheel', this.mouseWheel);
  }

  componentWillUnmount() {
    // clearInterval(this.clk);
    window.removeEventListener('mousewheel', this.mouseWheel);
  }

  handleCarouselChange = (current) => {
    switch (current) {
      case 0: if (!this.state.keywordsCloud) this.getKeywordsCloud(); break;
      case 2: if (!this.state.sensiLayout) this.getSensiLayout(); break;
      case 3: if (!this.state.sourceLayout) this.getSourceLayout(); break;
      case 4: if (!this.state.totalAmountTrend) this.getAmountTrend(); break;
      case 5: if (!this.state.sourceAmountTrend) this.getAmountTrend(); break;
      case 6: if (!this.state.regionLayout) this.getRegionLayout(); break;
      case 1: if (!this.state.data) this.getLatestInfo(); break;
      case 7: break; // 情感分布
      case 8: break; // 情感趋势
      case 9: break; // 事件溯源
      case 10: break; // 话题溯源1
      case 11: break; // 话题溯源2
      default: break;
    }
  };

  handleSearch = () => {
    this.getAmountTrend();
    this.getSensiLayout();
    this.getSourceLayout();
    this.getRegionLayout();
    this.getTraceTree();
    this.getKeywordsCloud();
    this.getLatestInfo();
  };

  getLatestInfo = async () => {
    const PAGE_SIZE = 10;
    const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';
    const params = [
      this.props.curProgramme.fid,
      '', // keyword
      null, // source
      '', // startPublishDay
      '', // endPublishDay
      null, // sensitiveFlag
      1, // timeOrder
      PAGE_SIZE, // pageSize
      0, // pageId
    ];
    const result = await getProgrammeData(...params);
    this.setState({
      data: result.data,
    });
  };

  getKeywordsCloud = async () => {
    const keyword = '';
    const { startPublishedDay, endPublishedDay } = this.state;
    const { fid } = this.props.curProgramme;
    const wordNumber = 50;
    const keywordsCloud = await getKeywordsCloud(fid, startPublishedDay, endPublishedDay, wordNumber);
    this.setState({ keywordsCloud });
  };

  getTraceTree = async () => {
    const keyword = '';
    const { fid } = this.props.curProgramme;
    const { startPublishedDay, endPublishedDay } = this.state;
    const traceTree = await getTraceTree(keyword, startPublishedDay, endPublishedDay);
    this.setState({ traceTree });
  };

  getRegionLayout = async () => {
    const { fid } = this.props.curProgramme;
    const { startPublishedDay, endPublishedDay } = this.state;
    const regionLayout = await getProgrammeRegionLayout(fid, startPublishedDay, endPublishedDay);
    console.log(regionLayout);
    this.setState({ regionLayout });
  };

  getSourceLayout = async () => {
    const { fid } = this.props.curProgramme;
    const { startPublishedDay, endPublishedDay } = this.state;
    const sourceLayout = await getProgrammeSourceLayout(fid, startPublishedDay, endPublishedDay);
    this.setState({ sourceLayout });
  };

  getSensiLayout = async () => {
    const { fid } = this.props.curProgramme;
    const { startPublishedDay, endPublishedDay } = this.state;
    const sensiLayout = await getProgrammeSensiLayout(fid, startPublishedDay, endPublishedDay);
    this.setState({ sensiLayout });
  };

  getAmountTrend = async () => {
    const { fid } = this.props.curProgramme;
    const { startPublishedDay, endPublishedDay } = this.state;
    const [totalAmountTrend, sourceAmountTrend] =
      await getProgrammeAmountTrend(fid, startPublishedDay, endPublishedDay);
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
    const { data, sensiLayout, regionLayout, sourceLayout, totalAmountTrend, sourceAmountTrend, traceTree, keywordsCloud, traceTreeFormat } = this.state;
    return (
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
              option={keywordsCloud}
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
              {data && data.slice(0, 8).map((item) => (
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
              data={sensiLayout}
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
              data={sourceLayout}
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
              data={totalAmountTrend}
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
              data={sourceAmountTrend}
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
              data={regionLayout}
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
              data={emotionLayout}
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
              data={emotionTrendLayout}
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
              data={getEventTree()}
            />
          </AutofitWrap>
        </div>
        {/*
        <
        <div>
          <div
            className="carousel-item"
            style={{ width, height }}
          >

          </div>
        </div>
        <div>
          <div
            className="carousel-item"
            style={{ width, height }}
          >
            <Echart
              title="话题溯源"
              type="circleTree"
              data={traceTree}
            />
          </div>
        </div>
        <div>
          <div
            className="carousel-item"
            style={{ width, height }}
          >
            <Echart
              title="话题溯源"
              type="defaultTree"
              data={traceTree}
            />
          </div>
        </div>
        <div>
          <div
            className="carousel-item"
            style={{ width, height }}
          >

          </div>
        </div>
        <div>
          <div
            className="carousel-item"
            style={{ width, height }}
          >
            <Echart
              title="情感趋势图"
              type="horizontalBar"
              data={emotionTrendLayout}
            />
          </div>
        </div>
        <div>
          <div
            className="carousel-item"
            style={{ width, height }}
          >
            <div
              className="carousel-item"
              style={{ width, height }}
            >
              <Echart
                title="事件溯源"
                type="connGraph"
                data={getEventTree()}
              />
            </div>
          </div>
        </div>*/}
      </Carousel>
    );
  }
}

const mapStateToProps = (state) => ({
  curProgramme: state.curProgramme,
});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(View);
