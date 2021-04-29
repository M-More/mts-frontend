import React from 'react';
import { Modal } from 'antd';
import './DataContent.scss';
import getSensitiveWord from "../../../services/request/data/getSensitiveWord";
import {Divider} from "antd/es";
import Lodash from "lodash";
import criteria from "../MultiFilter/criteria";

class DataContent extends React.Component {
  constructor() {
    super();
    this.state = {
      contentSlice: [],
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.record !== this.props.record) this.getSensitiveWord();
  }

  getSensitiveWord = async () => {
    const { content } = this.props.record || {};
    const result = await getSensitiveWord(content);
    const contentSlice = [];
    let prevEnd = 0;
    result.forEach(item => {
      if (item.st !== prevEnd) {
        contentSlice.push({
          sensitive: false,
          slice: content.slice(prevEnd, item.st),
        });
      }
      prevEnd = item.st;
      contentSlice.push({
        sensitive: true,
        slice: content.slice(item.st, item.ed),
      });
    });
    contentSlice.push({
      sensitive: false,
      slice: content.slice(prevEnd),
    });
    this.setState({ contentSlice });
  };

  renderSource = (text) => {
    const options = Lodash.find(criteria, { name: 'source' })?.options || [];
    return Lodash.find(options, { value: text })?.label || '';
  };

  renderSensi = (text) => {
    const options = Lodash.find(criteria, { name: 'sensi' })?.options || [];
    return Lodash.find(options, { value: text })?.label || '';
  };

  render() {
    const { record, visible, handleModalCancel } = this.props;
    const { title, content, url, addr, source, sensi, publishedDay } = record || {};
    const { contentSlice } = this.state;
    return (
      <Modal
        title={title}
        visible={visible}
        onCancel={handleModalCancel}
        wrapClassName="mts-data-list"
      >
        <div className="attr">
          <span className="title">地址： </span>
          <span className="value">{url}</span>
        </div>
        <div className="attr">
          <span className="title">来源： </span>
          <span className="value">{this.renderSource(source)} {addr}</span>
        </div>
        <div className="attr">
          <span className="title">敏感度： </span>
          <span className="value">{this.renderSensi(sensi)}</span>
        </div>
        <div className="attr">
          <span className="title">发布时间： </span>
          <span className="value">{publishedDay}</span>
        </div>
        <Divider />
        {
          contentSlice.map((item) =>
            item.sensitive ?
              <span className="sensitive">{item.slice}</span> :
              <span>{item.slice}</span>
          )
        }
      </Modal>
    );
  }
}

export default DataContent;
