import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb,Button ,Row, Col,Divider,Input,Table,Checkbox} from 'antd';
import {
    HeartOutlined,
    PlusOutlined,
    SearchOutlined,
  } from '@ant-design/icons';
import '../../common/InfoList/InfoList.scss';
const { Content, Sider } = Layout;
class Direction extends Component {
    constructor() {
        super();
        this.state = {
          menuSelectedKey: '1'
        };
      }
    
      menuHandleClick = (e) => {
        this.setState({ menuSelectedKey: e.key })
      }
  render() {
    return (
      <div>
        <h1 > 定向监测 </h1>
        <div id="Dhead" style={{textAlign:"left"}}>
          <div id="input">
            <Input placeholder="输入网站名称" />
          </div>
          <div id="input">
            <Input placeholder="输入网站链接，例如：www.sina.com" />
          </div>
          
          <div id="searchButton">
            <Button type="primary" icon={<SearchOutlined />}>
              添加
            </Button>
          </div>
          <div id="newButton">
            <Button type="primary" icon={<PlusOutlined />}>
              清空
            </Button>
          </div>
        </div>
        <div>
        <Layout style={ { minHeight: '100vh' } }>
        <Sider className="sider">
          <div className="logo" />
          <Menu theme="light" defaultSelectedKeys={ [ '1' ] } mode="inline">
            
              <Menu.Item key="1"  onClick={ this.menuHandleClick }>普通网站</Menu.Item>
              <Menu.Item key="2"  onClick={ this.menuHandleClick }>微博用户</Menu.Item>
          </Menu>
        </Sider>
        <Layout className="content">
         <Content className="site-layout-background">
            {this.state.menuSelectedKey === '1' && (<h1>111</h1>)}
            {this.state.menuSelectedKey === '2' && (<h1>222</h1>)}
          </Content>
        
        </Layout>
        </Layout>
        
        </div>
      </div>
    )
  }
}

export default Direction;