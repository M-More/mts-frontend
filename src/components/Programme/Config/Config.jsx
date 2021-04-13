import React from 'react';
import { Form, Input, Button, Radio, Layout, Switch } from 'antd';
import { QuestionCircleFilled } from '@ant-design/icons';
import './Config.scss';
import modifyProgramme from "../../../services/request/programme/modifyProgamme";
import delProgramme from "../../../services/request/programme/delProgramme";
import { connect } from "react-redux";
import { actions } from "../../../redux/actions";

class Config extends React.Component {
  constructor() {
    super();
    this.layout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 999 }
    };
    this.subLayout = { wrapperCol: { offset: 6, span: 999 }};
    this.radioLayout = {};
  }

  handleProgrammeConfig = (type, data) => {
    switch (type) {
      case 'submit':
        this.modifyProgramme(data);
        break;
      case 'reject': break;
      case 'del':
        this.delProgramme();
        break;
    }
  }

  /*
  enableAlert: undefined
  eventKeywords: "1"
  eventMatchMethod: "and"
  keywordMatchMethod: "titleOnly"
  programmeName: "1"
  regionKeywords: "1"
  regionMatchMethod: "or"
  roleKeywords: "1"
  roleMatchMethod: "or"
   */
  modifyProgramme = async (rawData) => {
    const { userName, curProgramme } = this.props;
    const data = {
      fid: this.props.curProgramme.fid,
      userName,
      ...rawData,
    };
    console.log(rawData.name);
    const result = await modifyProgramme(data);
    if (result.modifyProgramme !== 1) { alert('提交失败！'); }
    else {
      this.props.onProgrammeChange({ curProgramme: {
        ...curProgramme,
        name: rawData.name,
      }});
      alert('提交成功！');
    }
  }

  delProgramme = async () => {
    const { userName } = this.props;
    const { fid } = this.props.curProgramme;
    const result = await delProgramme(fid, userName);
    if (result.delProgramme !== 1) { alert('删除失败！'); }
    else {
      alert('删除成功！');
      this.props.onProgrammeChange({ curProgramme: undefined });
    }
  }

  componentDidMount() {
    // console.log(this.form.input.props.value);
    this.resetProgrammeForm();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.resetProgrammeForm();
  }

  resetProgrammeForm = () => {
    this.form.setFieldsValue({
      ...this.props.curProgramme
    })
  }

  render() {
    const { layout, subLayout } = this;
    // console.log(this.props.curProgramme);
    return (
      <Layout className="programme-config-wrap">
        <Form
          {...layout}
          ref = {(r) => {this.form = r}}
          className="config-form"
          onFinish={info => this.handleProgrammeConfig('submit', info)}
          onFinishFailed={err => this.handleProgrammeConfig('reject', err)}
        >
          <Form.Item
            label="方案名称"
            name="name"
            rules={[{ required: true, message: '请输入方案名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="keywordMatch"
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
            name="regionMatch"
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
            name="roleMatch"
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
            name="eventMatch"
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
                type="danger"
                onClick={() => this.handleProgrammeConfig('del')}
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


const mapStateToProps = (state) => ({
  userName: state.userName,
  curProgramme: state.curProgramme,
});
const mapDispatchToProps = {
  onProgrammeChange: actions.onProgrammeChange,
};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Config);
