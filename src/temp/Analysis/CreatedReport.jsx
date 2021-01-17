import React, { Component } from 'react';
import { Space, Input, Button, Table } from 'antd';
import {
  DeleteOutlined,
  EyeOutlined
} from '@ant-design/icons';

class CreatedReport extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  lookup() {
    this.setState({});
  }

  modify() {
    this.setState({});
  }

  delete() {
    this.setState({});
  }

  render() {
    const columnRender = [
      {
        title: '编号',
        dataIndex: 'number',
      },
      {
        title: '报告名称',
        dataIndex: 'reportname',
      },
      {
        title: '涉及关键词',
        dataIndex: 'keyword',
      },
      {
        title: '生成时间',
        dataIndex: 'createdTime',
      },
      {
        title: '备注信息',
        dataIndex: 'remark',
      },

      {
        title: '操作',
        dataIndex: 'operation',
        render: () => (
          <Space size="middle">
            <a onClick={this.lookup.bind(this)}>
              <EyeOutlined />
            </a>
            <a onClick={this.delete.bind(this)}>
              <DeleteOutlined />
            </a>
          </Space>
        ),
      },
    ];
    const data = [
      {
        key: '1',
        number: 20200729,
        reportname: '测试',
        keyword: '政府',
        createdTime: '2020-07-31',
        remark: '',
      },
      {
        key: '2',
        number: 20191126,
        reportname: '政策法规',
        keyword: '政策',
        createdTime: '2020-07-31',
        remark: '',
      },
      {
        key: '3',
        number: 20200729,
        reportname: '银行农行测试',
        keyword: '银行|农行',
        createdTime: '2020-07-31',
        remark: '',
      },
    ];
    return (
      <div>
        <div id="tableWrapper">
          <Table
            rowSelection
            bordered
            columns={columns}
            dataSource={data}
            pagination={false}
          />
        </div>
      </div>
    );
  }
}

export default CreatedReport;
