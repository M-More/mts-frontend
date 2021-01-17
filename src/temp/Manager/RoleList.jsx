import React, { Component } from 'react';
import { Space, Input, Button, Table } from 'antd';
import {
    PlusOutlined
  } from '@ant-design/icons';
//import './UserList.css'

class RoleList extends Component {
    constructor () {
        super();
        this.state = {
        };
      }
      assign() {
        this.setState({})
      }
      modify() {
        this.setState({})
      }
      delete() {
        this.setState({})
      }
  render () {
    const columnRender = [
        {
          title: '角色名称',
          dataIndex: 'rolename',
        },
        {
          title: '英文名称',
          dataIndex: 'Ename',
        },
        {
          title: '数据范围',
          dataIndex: 'datarange',
        },
        {
            title: '系统数据',
            dataIndex: 'isSystemData',
            render: text => <span>{text===1?"是":"否"}</span>,
          },
       
        {
            title: '操作',
            dataIndex: 'operation',
            render: () => (
              <Space size="middle">
                <a onClick={ this.assign.bind(this) }>分配 </a>
                <a onClick={ this.modify.bind(this) }>修改 </a>
                <a onClick={ this.delete.bind(this) }>删除</a>
              </Space>
              ),
        },
      ];
      const data = [
        {
          key: '1',
          rolename: 'service provider',
          Ename: 'otrp_sp',
          datarange: '仅本人数据',
          isSystemData:1,
        },
        {
            key: '2',
            rolename: 'guesthj',
            Ename: 'guesthj',
            datarange: '仅本人数据',
            isSystemData:1,
        },
        {
            key: '3',
            rolename: 'test20',
            Ename: 'test20',
            datarange: '所有数据',
            isSystemData:1,
        },
    ];
    return (
      <div>
          <div>
          <div id="newButton">
            <Button type="primary" icon={<PlusOutlined />}>
              添加角色
            </Button>
          </div>
        </div>
        <div id="tableWrapper">
          <Table
          columns={ columns }
          dataSource={ data }
          />
        </div>
      </div>
    )
  }
}

export default RoleList