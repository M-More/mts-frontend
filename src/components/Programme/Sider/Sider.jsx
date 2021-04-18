import React from 'react';
import { Button, Input, Menu, Modal, Layout } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import getProgrammes from '../../../services/request/programme/getProgrammes';
import './Sider.scss';
import { connect } from 'react-redux';
import addProgramme from '../../../services/request/programme/addProgramme';
import { actions } from '../../../redux/actions';

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

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { curProgramme } = this.props;
    // console.log(curProgramme?.fid, prevProps.curProgramme?.fid);
    if (!prevProps.curProgramme || !curProgramme) return;
    if (prevProps.curProgramme.fid !== curProgramme.fid || prevProps.curProgramme.name !== curProgramme.name) {
      this.getProgrammes();
    }
  }

  getProgrammes = async () => {
    const programmes = await getProgrammes(this.props.userName);
    this.setState({ programmes });
    if (!this.props.curProgramme) this.props.onProgrammeChange({ curProgramme: programmes[0] });
  };

  handleProgrammeNew = (type, data) => {
    switch (type) {
      case 'open':
        this.setState({ newProgrammeVisible: true });
        break;
      case 'ok':
        this.addProgramme();
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

  addProgramme = async () => {
    const { userName } = this.props;
    const name = this.state.newProgrammeName;
    const result = await addProgramme({ userName, name });
    if (result.addProgramme !== 1) { alert('添加失败'); } else {
      alert('添加成功');
      this.getProgrammes();
    }
  };

  handleProgrammeSelect = (e) => {
    const curProgramme = this.state.programmes.find((item) => item.fid === parseInt(e.key, 10));
    console.log(curProgramme.fid);
    this.props.onProgrammeChange({ curProgramme });
  };

  render() {
    const { curProgramme } = this.props;
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
          添加方案
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
            onChange={e => this.handleProgrammeNew('name', { name: e.target.value })}
          />
        </Modal>
        <Menu
          onClick={this.handleProgrammeSelect}
          selectedKeys={[curProgramme?.fid.toString()]}
          mode="inline"
        >
          { programmes.map((item) => (
            <Menu.Item key={item.fid.toString()}>{item.name}</Menu.Item>
          ))}
        </Menu>
      </Layout.Sider>
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

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Sider);
