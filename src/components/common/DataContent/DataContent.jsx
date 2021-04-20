import React from 'react';
import { Modal } from 'antd';
import './DataContent.scss';
import getSensitiveWord from "../../../services/request/data/getSensitiveWord";

class DataContent extends React.Component {
  constructor() {
    super();
    this.state = {
      contentSlice: [],
    };
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.content !== this.props.content) this.getSensitiveWord();
  };

  getSensitiveWord = async () => {
    const { content } = this.props;
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

  render() {
    const { title, visible, handleModalCancel } = this.props;
    const { contentSlice } = this.state;
    return (
      <Modal
        title={title}
        visible={visible}
        onCancel={handleModalCancel}
        wrapClassName="mts-data-list"
      >
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
