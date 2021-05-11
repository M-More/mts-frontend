import React from 'react';
import { Layout, Menu } from 'antd';
import { connect } from 'react-redux';
import Specific from '../Specific/Specific';
import Origin from '../Origin/Origin';
import Config from '../Config/Config';
import View from '../View/View';
import { actions } from '../../../redux/actions';
import './Content.scss'
import AutofitWrap from "../../common/AutofitWrap/AutofitWrap";

class Content extends React.Component {
  constructor() {
    super();
    this.state = {
      curTabPage: 'info',
    };
  }

  handleTabPageSelect = (e) => {
    this.setState({
      curTabPage: e.key,
    });
  };

  render() {
    const { curTabPage } = this.state;
    const { curProgramme } = this.props;
    return (
      <Layout.Content>
        <Menu
          theme="light"
          defaultSelectedKeys={curTabPage}
          mode="horizontal"
          onClick={this.handleTabPageSelect}
          className="mts-programme-content-menu"
        >
          <Menu.Item key="info">信息列表</Menu.Item>
          <Menu.Item key="warning">研判预警</Menu.Item>
          <Menu.Item key="config">方案配置</Menu.Item>
          <Menu.Item key="origin">定向监测</Menu.Item>
          <Menu.Item key="view">事件分析</Menu.Item>
        </Menu>
        <Layout.Content className="site-layout-background">
          {curTabPage === 'info' && curProgramme && <Specific />}
          {curTabPage === 'view' && curProgramme && <View />}
          {curTabPage === 'config' && curProgramme && <Config />}
          {curTabPage === 'warning' && curProgramme && <AutofitWrap
            padding={200}
            minHeight={550}
            className="view-wrap"
          >研判預警</AutofitWrap>}
          {curTabPage === 'origin' && curProgramme && <Origin />}
        </Layout.Content>
      </Layout.Content>
    );
  }
}

const mapStateToProps = (state) => ({
  curProgramme: state.curProgramme,
});
const mapDispatchToProps = {
  onProgrammeChange: actions.onProgrammeChange,
};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Content);
