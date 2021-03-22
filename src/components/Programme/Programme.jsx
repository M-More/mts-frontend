import React from 'react';
import './Programme.scss';
import { Layout, Menu } from 'antd';
import { connect } from 'react-redux';
import Sider from './Sider/Sider';
import Content from './Content/Content';

class Programme extends React.Component {
  render() {
    const { curProgramme } = this.props;
    return (
      <Layout>
        <Sider />
        <Content />
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  curProgramme: state.curProgramme,
});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Programme);
