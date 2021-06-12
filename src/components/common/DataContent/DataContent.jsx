import React from 'react';
import { Modal } from 'antd';
import './DataContent.scss';
import { Divider } from 'antd/es';
import Lodash from 'lodash';
import getSensitiveWord from '../../../services/request/data/getSensitiveWord';
import criteria from '../MultiFilter/criteria';

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
    let contentSlice = [{
      sensitive: false,
      slice: content,
    }];
    const sensitiveWord = result.map((item) => item.sw);
    sensitiveWord.forEach((word) => {
      const newContentSlice = [];
      contentSlice.forEach((item) => {
        if (item.sensitive === true) newContentSlice.push(item);
        else if (item.slice.includes(word) === false) newContentSlice.push(item);
        else {
          item.slice.split(word).forEach((slice, index, array) => {
            newContentSlice.push({
              sensitive: false,
              slice,
            });
            if (index !== array.length - 1) {
              newContentSlice.push({
                sensitive: true,
                slice: word,
              });
            }
          });
        }
      });
      contentSlice = newContentSlice;
    });
    this.setState({contentSlice});
    /* let prevEnd = 0;
    result.forEach(item => {
      if (item.st !== prevEnd) {
        contentSlice.push({
          sensitive: false,
          slice: content.slice(prevEnd, item.st),
        });
      }
      prevEnd = item.ed;
      contentSlice.push({
        sensitive: true,
        slice: content.slice(item.st, item.ed),
      });
    });
    contentSlice.push({
      sensitive: false,
      slice: content.slice(prevEnd),
    });
    this.setState({ contentSlice }); */
  };

  renderSource = (text) => {
    const options = Lodash.find(criteria, { name: 'source' })?.options || [];
    return Lodash.find(options, { value: text })?.label || '';
  };

  renderSensi = (text) => {
    if (text === '1') return '敏感';
    return "非敏感"
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
        className="mts-content-modal"
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
        <div className="content">
          {
          contentSlice.map((item) => (item.sensitive ?
            <span className="sensitive">{item.slice.replace(/\\n/g, '')}</span> :
            <span>{item.slice.replace(/\\n/g, '')}</span>))
        }
        </div>
      </Modal>
    );
  }
}

export default DataContent;
