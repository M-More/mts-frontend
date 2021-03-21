import React from 'react';
import { Form, Input, Button } from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from '../../../redux/actions';
import '../Authority.scss';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.layout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };
    this.tailLayout = {
      wrapperCol: { offset: 6, span: 16 },
    };
  }

  handleSubmit = (data) => {
    console.log(data);
  };

  handleReject = () => {};

  render() {
    return (
      <Form
        className="login-form"
        {...this.layout}
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
          rules={[
            { required: true, message: '请输入密码！' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) { return Promise.resolve(); }
                return Promise.reject(new Error('两次输入的密码必须一致！'));
              },
            }),
          ]}
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
          {...this.tailLayout}
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

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {
  onAuthChange: actions.onAuthChange,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Register));
