import React from 'react';
import { Layout, Form, Input, Button, Tabs, Checkbox } from 'antd';
import '../../../pages/Login/Login.scss';
import requests from '../../../common/enums/requests';
import Lodash from "lodash";
import criteria from "../../../common/enums/criteria";

class LoginForm extends React.Component {
  handleSubmit = (data) => {
    const request = requests.login;
    const params = Object.keys(data).map((key) => (`${key}=${data[key]}`)).join('&');
    const url = encodeURI(`${request.url}?${params}`);
    console.log(url);
    fetch(url, { method: request.method })
      .then((response) => response.json())
      .then((results) => {
        console.log(results);
      })
      .catch((error) => console.error(error));
  };

  handleReject = () => {};

  render() {
    return (
      <Form
        className="login-form"
        {...this.props.layout}
        onFinish={this.handleSubmit}
        onFinishFailed={this.handleReject}
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: '请输入用户名!' }, {
            validator: (rule, value, callback) => {
              const regExp = /^[a-zA-Z0-9_]*$/g;
              if (!regExp.test(value)) callback('用户名格式错误');
              else callback();
            },
          }]}
        >
          <Input maxLength={20} />
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: '请输入密码!' }]}
        >
          <Input.Password maxLength={20} />
        </Form.Item>
        <Form.Item
          {...this.props.tailLayout}
          valuePropName="checked"
          name="role"
        >
          <Checkbox>以管理员身份登录</Checkbox>
        </Form.Item>
        <Form.Item {...this.props.tailLayout}>
          <Button
            type="primary"
            htmlType="submit"
          >
            登录
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
export default LoginForm;
