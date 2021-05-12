import React from 'react';
import moment from 'moment';
import Lodash from 'lodash';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import getOverallData from '../../../services/request/data/getOverallData';
import getProgrammeData from '../../../services/request/data/getProgrammeData';
import MultiFilter from '../../common/MultiFilter/MultiFilter';
import DataList from '../../common/DataList/DataList';
import './Specific.scss';
import { actions } from '../../../redux/actions';
import getContentTag from '../../../services/request/data/getContentTag';

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
      startPublishedDay: '',
      endPublishedDay: '',
      sensi: null,
      dateRange: null,
      loading: false,
      timeOrder: 0,
      dataSize: 0,
      data: [],
    };
  }

  componentDidMount() {
    this.handleSearch();
  }

  shouldComponentUpdate(prevProps, prevState, snapshot) {
    if (prevProps.curProgramme?.fid !== this.props.curProgramme?.fid) {
      this.handleSearch();
      return false;
    }
    return true;
  }

  handleSearch = async () => {
    this.setState({ loading: true });
    const { curProgramme } = this.props;
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
    const { pageId } = this.state;
    this.setState(prevState => {
      if (this.props.curProgramme !== curProgramme || prevState.pageId !== pageId) {
        console.log('请求超时, 用户切换项目');
        return { loading: false };
      }
      return {
        loading: false,
        data: result.data,
        dataSize: result.dataSize,
      };
    });
    this.getContentTag();
  };

  getContentTag = async () => {
    const contents = this.state.data.map((item) => item.content);
    const { pageId } = this.state;
    const tagResult = await getContentTag(contents, pageId);
    this.setState(prevState => {
      if (prevState.pageId !== pageId) {
        console.log('请求超时：用户翻页');
        return {};
      }
      const newData = [...prevState.data];
      const tags = tagResult.result;
      newData.forEach((item, index) => {
        const tag = tags[index.toString()];
        item.tag = tag || '无';
      });
      return {
        data: newData,
      };
    });
  };

  handleDateChange = (moments) => {
    if (!moments) {
      this.setState({
        startPublishedDay: '',
        endPublishedDay: '',
      });
      return;
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

  handlePageSizeChange = (current, pageSize) => {
    this.setState({ pageSize, pageId: 0 }, () => {
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
    const { data, dataSize, pageSize, loading } = this.state;
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
          loading={loading}
          onPageChange={this.handlePageChange}
          onPageSizeChange={this.handlePageSizeChange}
        />
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  userName: state.userName,
  curProgramme: state.curProgramme,
});
const mapDispatchToProps = {
  onProgrammeChange: actions.onProgrammeChange,
};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Specific);
