import React, { Component } from 'react';
import { Form, Input, Button,Radio,Space } from 'antd';
import {
    QuestionCircleFilled,
  } from '@ant-design/icons';
import '../../common/InfoList/InfoList.scss';

const layout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 4,
      span: 16,
    },
  };
  const radioLayout = {
    labelCol: {
        offset: 4,
        //span: 4,
      },
    wrapperCol: {
      span: 4,
    },
  };
  const radioLayout1     = {
    labelCol: {
        offset: 4,
        //span: 4,
      },
    wrapperCol: {
      span: 8,
    },
  };
class Modify extends Component {
     onFinish = (values) => {
        console.log('Success:', values);
      };
    
       onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
  render() {
    return (
      <div>
       <Form
      {...layout}
      name="basic"
      
      onFinish={this.onFinish}
      onFinishFailed={this.onFinishFailed}
    >
        <Form.Item
        label={
            <Space>
            方案名称
            </Space>}
        name="fangname"
        rules={[
          {
            //required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input id="fangname"/>
      </Form.Item>
      <Form.Item  name="radio-group1" label="匹配方式" {...radioLayout1}>
        <Radio.Group>
          <Radio value="p1">只匹配标题</Radio>
          <Radio value="p2">只匹配正文</Radio>
          <Radio value="p3">匹配标题或正文</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        label={
            <Space>
            <QuestionCircleFilled />
            地域关键词
            </Space>}
        name="diname"
        rules={[
          {
            //required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item name="radio-group2" label="地域关系" {...radioLayout}>
        <Radio.Group>
          <Radio value="a">或</Radio>
          <Radio value="b">与</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        label={
            <Space>
            <QuestionCircleFilled />
            人物关键词
            </Space>}
        name="renname"
        rules={[
          {
            //required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item name="radio-group3" label="人物关系" {...radioLayout}>
        <Radio.Group>
          <Radio value="r1">或</Radio>
          <Radio value="r2">与</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        label={
            <Space>
            <QuestionCircleFilled />
            事件关键词
            </Space>}
        name="shiname"
        rules={[
          {
            //required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item name="radio-group" label="事件关系" {...radioLayout}>
        <Radio.Group>
          <Radio value="s1">或</Radio>
          <Radio value="s2">与</Radio>
        </Radio.Group>
      </Form.Item>    
        <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
        Submit
        </Button>
        </Form.Item>  
    </Form>
    
      </div>
    )
  }
}

export default Modify;