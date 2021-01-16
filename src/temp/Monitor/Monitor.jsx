import React, { Component } from 'react';
import { Layout, Menu, Button, Input, Divider, Modal, Cascader, Select } from 'antd';
import Modify from './Modify/Modify';
import Warning from './Warning/Warning';
import InfoList from '../common/InfoList/InfoList';
import Direction from './Direction/Direction';
import payload from './payload';
import './Monitor.scss';
import { actionCreator } from '../../redux/actionCreator';
import { connect } from 'react-redux';

const { Content, Sider } = Layout;

class Monitor extends Component {
  constructor() {
    super();
    this.state = {
      menu: [],
      results: [],
      currentForm: null,
      currentMenu: null,
      currentSubMenu: null,
      addMenuModalVisible: false,
      addSubmenuModalVisible: false,
    };
  }

  loadResults = () => {
    this.setState((prevState) => ({
      results: payload.results,
    }));
  }

  loadMenu = () => {
    this.setState((prevState) => ({
      menu: payload.menu,
    }));
  }

  componentDidMount() {
    setTimeout(() => {
      const { results, menu } = payload;
      this.setState({
        results,
        menu,
        currentForm: 'info',
        currentMenu: results[0]?.value,
        currentSubMenu: results[0]?.subMenu[0]?.value,
      });
    }, 0);
  }

  handleSearch = (value) => {
    this.props.resetFilter();
    console.log(value);
    const [ subMenu, menu ] = value.split('_');
    this.setState({
      currentSubMenu: subMenu,
      currentMenu: menu,
    });
  }

  handleClick = (type, value) => {
    switch (type) {
      case 'categoryMenu':
      {
        const [subMenu, menu] = value.keyPath;
        this.props.resetFilter();
        this.setState({
          currentMenu: menu,
          currentSubMenu: subMenu,
        });
        break;
      }
      case 'formMenu':
      {
        this.setState({ currentForm: value.key });
        break;
      }
      case 'addMenu':
      {
        this.setState({ addMenuModalVisible: true });
        break;
      }
      case 'addSubmenu':
      {
        this.setState({ addSubmenuModalVisible: true });
        break;
      }
      default:
        break;
    }
  }

  handleCancel = (type) => {
    this.setState({ addSubmenuModalVisible: false, addMenuModalVisible: false });
  }

  handleOk = (type) => {
    this.setState({ addSubmenuModalVisible: false, addMenuModalVisible: false });
    switch (type) {
      case 'submenu':
        this.addMenu(this.submenuInputValue);
        break;
      case 'menu':
        this.addSubmenu(this.menuInputValue);
        break;
      default:
        break;
    }
  }

  addMenu = (value) => {
    new Promise(() => {

    }).then(() => {
      this.loadMenu();
    });
  }

  addSubmenu = (value) => {
    new Promise(() => {

    }).then(() => {
      this.loadMenu();
    });
  }

  render() {
    const { currentMenu, currentSubMenu, currentForm, menu, results, addMenuModalVisible, addSubmenuModalVisible } = this.state;
    const currentItem = results.filter((item) => item.value === currentMenu).pop();
    const currentSubItem = currentItem?.subMenu.filter((item) => item.value === currentSubMenu).pop();
    console.log(currentMenu, currentSubMenu);
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider>
          <div className="side-bar">
            <Button
              className="side-bar-btn"
              onClick={() => this.handleClick('addMenu')}
            >
              添加分类
            </Button>
            <Modal
              title="Basic Modal"
              visible={addMenuModalVisible}
              onCancel={e => this.handleCancel('menu')}
              onOk={e => this.handleOk('menu')}
            >
              <span>添加分类</span>
              <Input
                ref={r => this.menuInput = r}
                onChange={e => this.menuInputValue = e.target.value}
              />
            </Modal>
            <Button
              className="side-bar-btn"
              onClick={() => this.handleClick('addSubmenu')}
            >
              添加方案
            </Button>
            <Modal
              title="Basic Modal"
              visible={addSubmenuModalVisible}
              onCancel={e => this.handleCancel('submenu')}
              onOk={e => this.handleOk('submenu')}
            >
              <span>添加方案</span>
              <Input
                ref={r => this.submenuInput = r}
                onChange={e => this.submenuInputValue = e.target.value}
              />
            </Modal>
            <Select
              showSearch
              placeholder="Select by label"
              optionFilterProp="children"
              style={{ width: '100%' }}
              onChange={value => this.handleSearch(value)}
            >
              {menu.map((menuItem) => (
                <>
                  {menuItem.subMenu.map((subMenuItem) => (
                    <Select value={`${subMenuItem.value}_${menuItem.value}`}>{subMenuItem.label}</Select>
                  ))}
                </>
              ))}
            </Select>
            <Divider />
            <Menu
              onClick={(value) => this.handleClick('categoryMenu', value)}
              mode="inline"
              selectedKeys={[currentSubMenu]}
            >
              {menu.map((item) => (
                <Menu.SubMenu
                  // eslint-disable-next-line react/no-array-index-key
                  key={item.value}
                  title={item.label}
                >
                  {item.subMenu.map((subItem) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <Menu.Item
                      key={subItem.value}
                    >
                      {subItem.label}
                    </Menu.Item>
                  ))}
                </Menu.SubMenu>
              ))}
            </Menu>
          </div>
        </Sider>
        <Layout className="content">
          <div className="sub-menu-title">
            <a>{`${currentItem?.label} > ${currentSubItem?.label}`}</a>
          </div>
          <Menu
            theme="light"
            defaultSelectedKeys={['1']}
            mode="horizontal"
            onClick={(value) => this.handleClick('formMenu', value)}
          >
            <Menu.Item key="info">信息列表</Menu.Item>
            <Menu.Item key="track">定向监测</Menu.Item>
            <Menu.Item key="alert">预警设置</Menu.Item>
            <Menu.Item key="modify">修改方案</Menu.Item>
          </Menu>
          <Content className="site-layout-background">
            {currentForm === 'info' && (
              <InfoList
                currentItem={currentItem}
                currentSubItem={currentSubItem}
                data={currentSubItem.articles}
              />
            )}
            {currentForm === 'track' && (<Direction />)}
            {currentForm === 'alert' && (<Warning />)}
            {currentForm === 'modify' && (<Modify />)}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
  resetFilter: actionCreator.resetFilter,
};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Monitor);
