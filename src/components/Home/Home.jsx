import React from 'react';
import '../../utils/tagCanvas';
import './Home.scss';
import { Carousel, Card, Table } from 'antd';
import requests from '../../services/requests';
import constant from '../../config/constant';
import DataContent from '../common/DataContent/DataContent';
import getOverallData from '../../services/request/data/getOverallData';
import moment from "moment";
import AutofitWrap from "../common/AutofitWrap/AutofitWrap";
import Loading from "../common/Loading/Loading";
import {LoadingOutlined} from "@ant-design/icons";

const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      curRecord: undefined,
      visible: false,
      tags: [],
      sensitiveInfo: undefined,
      latestInfo: undefined,
      sensitiveLoading: false,
      latestLoading: false,
    };
  }

  componentDidMount() {
    // this.handleRefresh();
    this.handleSearch();
  }

  handleSearch = () => {
    this.getSensitiveInfo();
    this.getLatestInfo();
  };

  getSensitiveInfo = async () => {
    this.setState({ sensitiveLoading: true })
    const PAGE_SIZE = 10;
    const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';
    const params = [
      '', // keyword
      null, // source
      '', // startPublishDay
      '', // endPublishDay
      1, // sensitiveFlag
      1, // timeOrder
      PAGE_SIZE, // pageSize
      0, // pageId
    ];
    const result = await getOverallData(...params);
    this.setState({
      sensitiveInfo: result.data,
      sensitiveLoading: false,
    });
  };

  getLatestInfo = async () => {
    this.setState({ latestLoading: true })
    const PAGE_SIZE = 10;
    const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';
    const params = [
      '', // keyword
      null, // source
      '', // startPublishDay
      '', // endPublishDay
      null, // sensitiveFlag
      1, // timeOrder
      PAGE_SIZE, // pageSize
      0, // pageId
    ];
    const result = await getOverallData(...params);
    this.setState({
      latestLoading: false,
      latestInfo: result.data,
    });
  };

  handleRefresh = () => {
    fetch(requests.getTopics.url, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((result) => {
        new Promise((resolve) => {
          this.setState({ tags: result.tags });
          resolve();
        })
          .then(() => {
            try {
              window.TagCanvas.Start('canvas', 'tags', {
                textColour: '#1890ff',
                outlineColour: '#1890ff',
                reverse: true,
                depth: 0.8,
                dragControl: true,
                decel: 0.95,
                maxSpeed: 0.05,
                initial: [-0.2, 0],
              });
            } catch (e) { console.error('Load word cloud error, result =', result); }
          });
      });
  };

  handleTitleClick = (item) => {
    // e.preventDefault();
    // console.log(e.target.innerHTML);
    this.setState({
      visible: true,
      curRecord: item,
    });
  };

  handleModalCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { tags, curRecord, visible, sensitiveInfo, latestInfo, sensitiveLoading, latestLoading } = this.state;
    return (
      <AutofitWrap
        minHeight={600}
        padding={150}
        className="home-wrap"
      >
        <Card
          title="敏感信息列表"
          className="home-card"
          loading={sensitiveLoading}
        >
          {sensitiveInfo ?
            sensitiveInfo.map((item) => (
              <p
                className="item"
                onClick={e => this.handleTitleClick(item)}
              >
                {item.title}
                <span className="addr">[{moment(item.publishedDay).month()}/{moment(item.publishedDay).date()}]</span>
              </p>
            )) :
            <Loading />
          }
        </Card>
        <Card
          title="最新舆情"
          className="home-card"
          loading={latestLoading}
        >
          {latestInfo ?
            latestInfo.map((item) => (
              <p
                className="item"
                onClick={e => this.handleTitleClick(item)}
              >
                {item.title}
                <span className="addr">[{moment(item.publishedDay).month()}/{moment(item.publishedDay).date()}]</span>
              </p>
            )) :
            <Loading />
          }
        </Card>
        <DataContent
          record={curRecord}
          visible={visible}
          handleModalCancel={this.handleModalCancel}
        />
      </AutofitWrap>
    );
  }
}

export default Home;
