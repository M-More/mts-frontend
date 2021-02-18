import React from 'react';
import {Layout, Form, Input, Button, Tabs, Checkbox} from 'antd';
import '../../../pages/Login/Login.scss';

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSubmit = () => {

  };

  handleReject = () => {

  };

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
          rules={[{ required: true, message: '请输入用户名!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: '请输入密码!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="确认密码"
          name="confirm"
          rules={[{ required: true, message: '两次密码输入不一致!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="电话"
          name="phone"
          rules={[{ required: true, message: '请输入电话号码!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="电子邮箱"
          name="email"
          rules={[{ required: true, message: '请输入电子邮箱!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          {...this.props.tailLayout}
          valuePropName="checked"
          name="role"
        >
          <Checkbox>以管理员身份注册</Checkbox>
        </Form.Item>
        <Form.Item
          {...this.props.tailLayout}
        >
          <Button
            type="primary"
            htmlType="submit"
          >
            注册
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
export default RegisterForm;
