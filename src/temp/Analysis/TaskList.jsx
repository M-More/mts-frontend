import React, { Component } from 'react';
import { Space, Input, Button, Table } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

class TaskList extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  assign() {
    this.setState({});
  }

  modify() {
    this.setState({});
  }

  delete() {
    this.setState({});
  }

  render() {
    const columns = [
      {
        title: '编号',
        dataIndex: 'number',
      },
      {
        title: '任务名称',
        dataIndex: 'taskname',
      },
      {
        title: '事件关键词',
        dataIndex: 'keyword',
      },
      {
        title: '任务时间段',
        dataIndex: 'taskTime',
      },
      {
        title: '状态',
        dataIndex: 'state',
        render: (text) => <span>{text === 1 ? '已完成' : '否'}</span>,
      },

      {
        title: '操作',
        dataIndex: 'operation',
        render: () => (
          <Space size="middle">
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
        taskname: '测试',
        keyword: '政府',
        taskTime: '2020-07-31至2020-07-31',
        state: 1,
      },
      {
        key: '2',
        number: 20191126,
        taskname: '政策法规',
        keyword: '政策',
        taskTime: '2020-07-31至2020-07-31',
        state: 1,
      },
      {
        key: '3',
        number: 20190813,
        taskname: '银行农行测试',
        keyword: '银行|农行',
        taskTime: '2020-07-31至2020-07-31',
        state: 1,
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

export default TaskList;
