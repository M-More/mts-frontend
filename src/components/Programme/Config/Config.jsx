import React from 'react';
import { Form, Input, Button, Radio, Layout, Switch } from 'antd';
import { QuestionCircleFilled } from '@ant-design/icons';
import './Config.scss'

class Config extends React.Component {
  constructor() {
    super();
    this.layout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 999 }
    };
    this.subLayout = { wrapperCol: { offset: 6, span: 999 }};
    this.radioLayout = {}
  }

  handleProgrammeConfig = (type, data) => {
    switch (type) {
      case 'success': break;
      case 'failed': break;
    }
  }

  render() {
    const { layout, subLayout } = this;
    return (
      <Layout className="programme-config-wrap">
        <Form
          {...layout}
          className="config-form"
          onFinish={info => this.handleProgrammeConfig('success', info)}
          onFinishFailed={err => this.handleProgrammeConfig('failed', err)}
        >
          <Form.Item
            label="方案名称"
            name="programmeName"
            rules={[{ required: true, message: '请输入方案名称' }]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            name="keywordMatchMethod"
            label="匹配方式"
            rules={[{ required: true, message: '请选择匹配方式' }]}
          >
            <Radio.Group>
              <Radio.Button value="titleOnly">只匹配标题</Radio.Button>
              <Radio.Button value="contentOnly">只匹配正文</Radio.Button>
              <Radio.Button value="both">匹配标题或正文</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="地域关键词"
            name="regionKeywords"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="regionMatchMethod"
            label="地域关系"
            rules={[{ required: true, message: '请选择匹配方式' }]}
          >
            <Radio.Group>
              <Radio.Button value="or">或</Radio.Button>
              <Radio.Button value="and">与</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="人物关键词"
            name="roleKeywords"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="roleMatchMethod"
            label="人物关系"
            rules={[{ required: true, message: '请选择匹配方式' }]}
          >
            <Radio.Group>
              <Radio.Button value="or">或</Radio.Button>
              <Radio.Button value="and">与</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="事件关键词"
            name="eventKeywords"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="eventMatchMethod"
            label="事件关系"
            rules={[{ required: true, message: '请选择匹配方式' }]}
          >
            <Radio.Group>
              <Radio.Button value="and">或</Radio.Button>
              <Radio.Button value="or">与</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="启用预警"
            name="enableAlert"
          >
            <Switch />
          </Form.Item>
          <Form.Item>
            <div className="submit-btn-wrap">
              <Button
                className="submit-btn"
                type="primary"
                htmlType="submit"
              >
                提交方案
              </Button>
              <Button
                className="submit-btn"
                type="danger"
                htmlType="submit"
              >
                删除方案
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Layout>
    )
  }
}

export default Config;