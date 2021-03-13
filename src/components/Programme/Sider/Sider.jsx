import React from 'react';
import { Button, Input, Menu, Modal, Layout } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import getProgrammes from '../../../services/request/data/getProgrammes';
import './Sider.scss';
import { connect } from 'react-redux';

class Sider extends React.Component {
  constructor() {
    super();
    this.state = {
      newProgrammeVisible: false,
      newProgrammeName: '',
      programmes: [],
    };
  }

  componentDidMount() {
    this.getProgrammes();
  }

  getProgrammes = async () => {
    const programmes = await getProgrammes(this.props.userName);
    // console.log(programmes);
    this.setState({ programmes });
    this.props.onProgrammeSelect(programmes[0]);
  };

  handleProgrammeNew = (type, data) => {
    switch (type) {
      case 'open':
        this.setState({ newProgrammeVisible: true });
        break;
      case 'ok':
        this.setState({
          newProgrammeVisible: false,
          newProgrammeName: '',
        });
        break;
      case 'cancel':
        this.setState({
          newProgrammeVisible: false,
          newProgrammeName: '',
        });
        break;
      case 'name':
        this.setState({ newProgrammeName: data.name });
        break;
      default: break;
    }
  };

  handleProgrammeSelect = (e) => {
    const curProgramme = this.state.programmes.find((item) => item.fid === e.key);
    // console.log(curProgramme);
    if (this.props.onProgrammeSelect) {
      this.props.onProgrammeSelect(curProgramme);
    }
  };

  render() {
    const { curProgramme } = this.props;
    console.log(curProgramme);
    const { newProgrammeVisible, newProgrammeName, programmes } = this.state;
    return (
      <Layout.Sider
        theme="light"
        className="programme-sider-wrap"
      >
        <Button
          block="block"
          type="primary"
          className="programme-new-btn"
          onClick={() => this.handleProgrammeNew('open')}
        >
          <PlusOutlined />
          添加分类
        </Button>
        <Modal
          title="Basic Modal"
          visible={newProgrammeVisible}
          onCancel={() => this.handleProgrammeNew('cancel')}
          onOk={() => this.handleProgrammeNew('ok')}
        >
          <span>添加分类</span>
          <Input
            value={newProgrammeName}
            onChange={e => this.handleProgrammeNew('name', { name: e.target.value})}
          />
        </Modal>
        <Menu
          onClick={this.handleProgrammeSelect}
          selectedKeys={[curProgramme?.fid]}
          mode="inline"
        >
          { programmes.map((item) => (
            <Menu.Item key={item.fid}>{item.programmeName}</Menu.Item>
          ))}
        </Menu>
      </Layout.Sider>
    );
  }
}

const mapStateToProps = (state) => ({
  userName: state.userName,
});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Sider);
