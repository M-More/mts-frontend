import React from 'react';
import { connect } from 'react-redux';
import { Input, Card } from 'antd';
import AutofitWrap from '../../common/AutofitWrap/AutofitWrap';
import { actions } from '../../../redux/actions';
import DataList from '../../common/DataList/DataList';
import './Trace.scss';
import getWeiboUserData from '../../../services/request/data/getWeiboUserData';

const PAGE_SIZE = 10;

class Trace extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      data: [],
      dataSize: 0,
      pageSize: PAGE_SIZE,
      loading: false,
      pageId: 0,
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.curProgramme?.fid !== this.props.curProgramme?.fid) {
      this.handleSearch();
    }
  }

  componentDidMount() {
    this.handleSearch();
  }

  handleInputChange = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  handleSearch = async () => {
    this.setState({ loading: true });
    const { username, pageId, pageSize } = this.state;
    const { fid } = this.props.curProgramme;
    const result = await getWeiboUserData(fid, username, pageSize, pageId);
    this.setState((prevState) => {
      if (prevState.pageId !== pageId && fid !== this.props.curProgramme?.fid) {
        console.log('请求超时：用户翻页', fid);
        return { loading: false };
      }
      return {
        loading: false,
        data: result.data,
        dataSize: result.dataSize,
      };
    });
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

  render() {
    const { username, data, loading, dataSize } = this.state;

    return (
      <AutofitWrap
        padding={200}
        minHeight={550}
        className="trace-wrap"
      >
        <div className="trace-container">
          <div className="result">
            <div className="input-wrap">
              <Input.Search
                className="mts-multi-filter-input"
                enterButton="搜素用户"
                size="large"
                onSearch={this.handleSearch}
                onChange={this.handleInputChange}
                value={username}
              />
            </div>
            <DataList
              data={data}
              dataSize={dataSize}
              loading={loading}
              onPageChange={this.handlePageChange}
              onPageSizeChange={this.handlePageSizeChange}
              disableTag
              disableSource
            />
          </div>
          <Card
            title="活跃用户列表"
            className="activate-users-list"
          />
        </div>
      </AutofitWrap>
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

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Trace);
