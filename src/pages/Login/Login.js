import React from 'react';
import { Layout, Form, Input, Button, Tabs } from 'antd';
import LoginForm from '../../components/Login/Form/LoginForm';
import RegisterForm from '../../components/Login/Form/RegisterForm';
import './Login.scss';

class Login extends React.Component {
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

  render() {
    const { layout, tailLayout } = this;
    return (
      <Layout className="login-wrap">
        <Tabs className="login-tabs" type="card">
          <Tabs.TabPane tab="login" key="login">
            <LoginForm layout={layout} tailLayout={tailLayout} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="register" key="register">
            <RegisterForm layout={layout} tailLayout={tailLayout} />
          </Tabs.TabPane>
        </Tabs>
      </Layout>
    );
  }
}
export default Login;
