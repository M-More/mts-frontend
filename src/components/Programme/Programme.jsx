import React from 'react';
import './Programme.scss';
import { Layout, Menu } from 'antd';
import Sider from './Sider/Sider';
import Content from './Content/Content';

class Programme extends React.Component {
  constructor() {
    super();
    this.state = {
      curProgramme: undefined,
    };
  }

  handleProgrammeSelect = (newProgramme) => {
    this.setState({ curProgramme: newProgramme });
  };

  render() {
    const { curProgramme } = this.state;
    return (
      <Layout>
        <Sider
          curProgramme={curProgramme}
          onProgrammeSelect={this.handleProgrammeSelect}
        />
        <Content curProgramme={curProgramme} />
      </Layout>
    );
  }
}

export default Programme;
