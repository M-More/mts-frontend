import React from 'react';
import moment from 'moment';
import Lodash from 'lodash';
import { Layout } from 'antd';
import getOverallData from '../../../services/request/data/getOverallData';
import getProgrammeData from "../../../services/request/data/getProgrammeData";
import MultiFilter from '../../common/MultiFilter/MultiFilter';
import DataList from '../../common/DataList/DataList';
import './Specific.scss';
import {actions} from "../../../redux/actions";
import {connect} from "react-redux";
import getContentTag from "../../../services/request/data/getContentTag";

const PAGE_SIZE = 10;
const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

class Specific extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageId: 0,
      pageSize: PAGE_SIZE,
      keyword: '',
      source: null,
      startPublishedDay: null,
      endPublishedDay: null,
      sensi: null,
      dateRange: null,
      timeOrder: 0,
      dataSize: 0,
      data: [],
    };
  }

  componentDidMount() {
    this.handleSearch();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.curProgramme?.fid !== this.props.curProgramme?.fid) this.handleSearch();
  }

  handleSearch = async () => {
    const params = [
      this.props.curProgramme.fid,
      this.state.keyword,
      this.state.source,
      this.state.startPublishedDay,
      this.state.endPublishedDay,
      this.state.sensi,
      this.state.timeOrder,
      this.state.pageSize,
      this.state.pageId,
    ];
    const result = await getProgrammeData(...params);
    this.setState({
      data: result.data,
      dataSize: result.dataSize,
    });
    const { pageId } = this.state;
    const contents = result.data.map((item) => item.content);
    const tagResult = await getContentTag(contents, pageId);
    console.log(tagResult);
    this.setState(prevState => {
      if (prevState.pageId !== pageId) {
        console.log('请求超时：用户翻页');
        return {};
      }
      const newData = [...prevState.data];
      const tags = tagResult.result;
      newData.forEach((item, index) => {
        const tag = tags[index.toString()];
        console.log(item, '分类为', tag);
        item.tag = tag || '无';
      });
      return { data: newData };
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

  handlePageChange = (pageId) => {
    this.setState({ pageId }, () => {
      this.handleSearch();
    });
  };

  handleKeywordChange = (keyword) => {
    this.setState({ keyword }, () => {
      this.handleSearch();
    });
  };

  render() {
    const params = ['sensi', 'source', 'timeOrder', 'dateRange', 'startPublishedDay', 'endPublishedDay'];
    const current = Lodash.pick(this.state, params);
    const { curProgramme } = this.props;
    const { data, dataSize, pageSize } = this.state;
    return (
      <Layout className="programme-specific-wrap">
        <MultiFilter
          current={current}
          onSelect={this.handleSelect}
          onSearch={this.handleKeywordChange}
          onDateChange={this.handleDateChange}
        />
        <DataList
          data={data}
          dataSize={dataSize}
          pageSize={pageSize}
          onPageChange={this.handlePageChange}
        />
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  userName: state.userName,
  curProgramme: state.curProgramme
});
const mapDispatchToProps = {
  onProgrammeChange: actions.onProgrammeChange,
};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Specific);

