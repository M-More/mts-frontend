import React from 'react';
import { Table } from "antd";
import {Switch} from "antd/es";

class UserList extends React.Component {
  constructor() {
    super();
    this.columns = [
      {
        title: '用户名',
        dataIndex: 'userName',
        key: 'userName',
      },
      {
        title: '权限',
        dataIndex: 'userType',
        key: 'userType',
        render: (field) => (field === 'admin' ? '管理员' : '普通用户'),
      },
      {
        title: '电话',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: '操作',
        key: 'action',
        render: () => <Switch/>
      },
    ];
  }

  render() {
    const { users } = this.props;
    return (
      <Table
        dataSource={users}
        columns={this.columns}
        pagination={false}
      />
    );
  }
};

export default UserList;