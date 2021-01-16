import React, { Component } from 'react';
import { Space, Input, Button, Table } from 'antd';
import {
    PlusOutlined
  } from '@ant-design/icons';
//import './UserList.css'

class OrganizationList extends Component {
    constructor () {
        super();
        this.state = {
        };
      }
      addsub() {
        this.setState({})
      }
      modify() {
        this.setState({})
      }
      delete() {
        this.setState({})
      }
  render () {
    const columns = [
        {
          title: '机构名称',
          dataIndex: 'OrganizationName',
        },
        {
          title: '机构级别',
          dataIndex: 'rank',
        },
        {
          title: '机构编码',
          dataIndex: 'coding',
        },
        {
            title: '机构类型',
            dataIndex: 'type',
            render: text => <span>{text===1?"公司":"部门"}</span>,
        },
        {
            title: '备注',
            dataIndex: 'remark',
            
        },
       
        {
            title: '操作',
            dataIndex: 'operation',
            render: () => (
              <Space size="middle">
                <a onClick={ this.modify.bind(this) }>修改 </a>
                <a onClick={ this.delete.bind(this) }>删除</a>
                <a onClick={ this.addsub.bind(this) }>添加下级机构 </a>
              </Space>
              ),
        },
      ];
      const data = [
        {
            key: '1',
            OrganizationName: 'Trustkernel',
            rank: 1,
            coding: 100000,
            type:1,
            remark:'',
          },
        {
          key: '2',
          OrganizationName: '研发部',
          rank: 2,
          coding: 100005,
          type:2,
          remark:'',
        },
        {
          key: '3',
          OrganizationName: 'tk_test',
          rank: 1,
          coding: 6100541,
          type:1,
          remark:'',
        },
        {
            key: '4',
            OrganizationName: '开发部',
            rank: 2,
            coding: '',
            type:2,
            remark:'',
          },
        
    ];
    return (
      <div>
          <div>
          <div id="newButton">
            <Button type="primary" icon={<PlusOutlined />}>
              添加机构
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

export default OrganizationList