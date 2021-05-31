import React from 'react';
import { connect } from 'react-redux';
import { Input, Card } from 'antd';
import AutofitWrap from '../../common/AutofitWrap/AutofitWrap';
import { actions } from '../../../redux/actions';
import DataList from '../../common/DataList/DataList';
import './Trace.scss';
import getWeiboUserData from '../../../services/request/data/getWeiboUserData';
import getActiveWeiboUser from '../../../services/request/data/getAcitveWeiboUser';
import getOverallData from '../../../services/request/data/getOverallData';
import getSensitiveData from '../../../services/request/programme/getSensitiveData';
import { LoadingOutlined } from "@ant-design/icons";

const PAGE_SIZE = 10;

class Trace extends React.Component {
  constructor() {
    super();
    this.state = {
      prevUsername: '',
      username: '',
      data: {},
      pageSize: PAGE_SIZE,
      loading: false,
      pageId: 0,
      activeWeiboUser: {},
      sensiWeiboUser: {},
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.curProgramme?.fid !== this.props.curProgramme?.fid) {
      this.handleSearch();
      this.getActiveWeiboUser();
      this.getSensiWeiboUser();
    }
  }

  componentDidMount() {
    this.handleSearch();
    this.getActiveWeiboUser();
    this.getSensiWeiboUser();
  }

  getSensiWeiboUser = async () => {
    const fid = this.props.curProgramme?.fid;
    const sensitiveData = await getSensitiveData(fid);
    const sensiList = [
      ...sensitiveData['政治敏感'],
      ...sensitiveData['低俗信息'],
      ...sensitiveData['广告营销'],
      ...sensitiveData['人身攻击'],
    ];
    let userMap = [];
    sensiList.forEach(item => {
      const user = userMap.find((target) => target.username = item.title)
      if (user) user.number += 1;
      else userMap.push({
        username: item.title,
        number: 1,
      });
    });
    userMap = userMap.sort((a, b) => - a.number + b.number);
    const newData = { ...this.state.sensiWeiboUser };
    newData[fid] = userMap;
    this.setState({
      sensiWeiboUser: newData,
    });
  };

  handleInputChange = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  getActiveWeiboUser = async () => {
    const { fid } = this.props.curProgramme;
    const result = await getActiveWeiboUser(fid);
    const newData = { ...this.state.activeWeiboUser };
    newData[fid] = result;
    this.setState({
      activeWeiboUser: newData,
    });
  };

  getCriteria = () => {
    const { fid } = this.props.curProgramme;
    const { prevUsername, pageSize, pageId } = this.state;
    const criteria = { fid, prevUsername, pageSize, pageId };
    return JSON.stringify(criteria);
  };

  handleSearch = async () => {
    await this.setState({
      loading: true,
      prevUsername: this.state.username,
    });
    const { fid } = this.props.curProgramme;
    const { username, pageSize, pageId, data } = this.state;
    const result = await getWeiboUserData(fid, username, pageSize, pageId);
    const newData = { ...data };
    newData[this.getCriteria()] = result;
    this.setState({
      loading: false,
      data: newData,
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

  handleUserClick = (username) => {
    this.setState({ username }, () => {
      this.handleSearch();
    });
  };

  render() {
    const { username, loading, activeWeiboUser, sensiWeiboUser } = this.state;
    const criteria = this.getCriteria();
    const data = this.state.data[criteria]?.data || [];
    const { fid } = this.props.curProgramme;
    const dataSize = this.state.data[criteria]?.dataSize || 0;
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
              disableEmotion
            />
          </div>
          <Card
            title="活跃用户列表"
            className="activate-users-list"
          >
            { activeWeiboUser[fid] && Object.keys(activeWeiboUser[fid]).map((key, index, array) => (
              <li><a onClick={e => this.handleUserClick(key)}>{key}</a>包含{activeWeiboUser[fid][key]}条微博</li>
            ))}
          </Card>
          <Card
            title="敏感用户列表"
            className="activate-users-list"
          >
            {
              sensiWeiboUser[fid] ? sensiWeiboUser[fid].map((item, index, array) => (
                <li><a onClick={e => this.handleUserClick(item.username)}>{item.username}</a>包含{item.number}条敏感信息</li>
              )):<LoadingOutlined />
            }
          </Card>
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
