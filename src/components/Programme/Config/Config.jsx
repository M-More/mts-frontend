import React from 'react';
import { Form, Input, Button, Radio, Layout, Switch, Modal } from 'antd';
import { QuestionCircleFilled } from '@ant-design/icons';
import './Config.scss';
import modifyProgramme from "../../../services/request/programme/modifyProgamme";
import delProgramme from "../../../services/request/programme/delProgramme";
import { connect } from "react-redux";
import { actions } from "../../../redux/actions";
import getProgrammes from "../../../services/request/programme/getProgrammes";
import sampleKeywordAnalysis from "../../../services/request/programme/sampleKeywordAnalysis";

class Config extends React.Component {
  constructor() {
    super();
    this.layout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 999 }
    };
    this.subLayout = { wrapperCol: { offset: 6, span: 999 }};
    this.radioLayout = {};
    this.state = {
      sampleVisible: false,
      sampleText: '',
    }
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
    const result = await modifyProgramme(data);
    if (result.modifyProgramme !== 1) { alert('提交失败！'); }
    else {
      alert('提交成功！');
      await this.getProgrammes();
      const { programmes } = this.props;
      const curProgramme = programmes.find((item) => item.fid === this.props.curProgramme.fid)
      this.props.onProgrammeChange({ curProgramme })
    }
  }

  getProgrammes = async () => {
    const programmes = await getProgrammes(this.props.userName);
    console.log(programmes);
    const { curProgramme } = this.props;
    await this.props.onProgrammesChange({
      programmes,
      curProgramme: curProgramme || programmes[programmes.length - 1],
    });
  };


  delProgramme = async () => {
    const { userName } = this.props;
    const { fid } = this.props.curProgramme;
    const result = await delProgramme(fid, userName);
    if (result.delProgramme !== 1) { alert('删除失败！'); }
    else {
      alert('删除成功！');
      this.props.onProgrammeChange({ curProgramme: this.props.programmes[0] || undefined });
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

  handleSampleChange = (e) => {
    this.setState({
      sampleText: e.target.value,
    })
  }

  handleSampleSubmit = async (e) => {
    const { sampleText } = this.state;
    const fid = this.props.curProgramme.fid;
    const result = await sampleKeywordAnalysis(fid, sampleText);
    if (result.autoaddEkeyword !== 1) { alert('分析失败'); }
    else {
      alert('分析成功！');
      await this.getProgrammes();
      const { programmes } = this.props;
      const curProgramme = programmes.find((item) => item.fid === this.props.curProgramme.fid)
      this.props.onProgrammeChange({ curProgramme })
    }
    this.setState({
      sampleText: '',
      sampleVisible: false,
    })
  }

  handleSampleCancel = (e) => {
    this.setState({
      sampleText: '',
      sampleVisible: false,
    })
  }

  openSample = (e) => {
    this.setState({
      sampleVisible: true,
    })
  }

  render() {
    const { layout, subLayout } = this;
    const { sampleVisible, sampleText } = this.state;
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
            <Input.TextArea
              rows={5}
            />
          </Form.Item>
          <Form.Item
            name="regionMatch"
            label="地域关系"
            rules={[{ required: true, message: '请选择匹配方式' }]}
          >
            <Radio.Group size="small">
              <Radio value="or">或</Radio>
              <Radio value="and">与</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="人物关键词"
            name="roleKeywords"
          >
            <Input.TextArea
              rows={5}
            />
          </Form.Item>
          <Form.Item
            name="roleMatch"
            label="人物关系"
            rules={[{ required: true, message: '请选择匹配方式' }]}
          >
            <Radio.Group size="small">
              <Radio value="or">或</Radio>
              <Radio value="and">与</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="事件关键词"
            name="eventKeywords"
          >
            <Input.TextArea
              rows={5}
            />
          </Form.Item>
          <Form.Item
            name="eventMatch"
            label="事件关系"
            rules={[{ required: true, message: '请选择匹配方式' }]}
          >
            <Radio.Group>
              <Radio value="and">或</Radio>
              <Radio value="or">与</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="sensitiveWord"
            label="方案敏感词"
          >
            <Input.TextArea
              rows={5}
            />
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
                type="primary"
                onClick={this.openSample}
              >
                样例分析
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
        <Modal
          title="根据样例文档分析关键词"
          visible={sampleVisible}
          onOk={this.handleSampleSubmit}
          onCancel={this.handleSampleCancel}
        >
          <Input.TextArea
            rows={5}
            value={sampleText}
            onChange={this.handleSampleChange}
          />
        </Modal>
      </Layout>
    )
  }
}


const mapStateToProps = (state) => ({
  userName: state.userName,
  curProgramme: state.curProgramme,
  programmes: state.programmes,
});
const mapDispatchToProps = {
  onProgrammeChange: actions.onProgrammeChange,
  onProgrammesChange: actions.onProgrammesChange,
};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Config);
