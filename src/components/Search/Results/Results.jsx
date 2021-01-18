import React from 'react';
import { Button, Input, Table, Checkbox, Modal } from 'antd';
import { HeartOutlined, TagsOutlined, SearchOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import './Results.scss';

class Results extends React.Component {
  constructor() {
    super();
    this.state = {
      content: '',
      title: '',
      visible: false,
      loading: false,
    };
    this.rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(selectedRowKeys, selectedRows);
      },
      getCheckboxProps: (record) => ({}),
    };
    this.columnsRender = [
      {
        width: 400,
        title: '标题',
        dataIndex: 'title',
        key: 'title',
        render: this.renderTitle,
      },
      {
        width: 100,
        title: '地址',
        dataIndex: 'webpageUrl',
        key: 'webpageUrl',
        render: this.renderAddr,
      },
      {
        title: '来源',
        dataIndex: 'fromType',
        key: 'fromType',
      },
      {
        title: '敏感度',
        dataIndex: 'cflag',
        key: 'cflag',
      },
      {
        title: '发布时间',
        dataIndex: 'publishedDay',
        key: 'publishedDay',
      },
    ];
  }

  renderTitle = (text, record) => (<a onClick={() => this.handleTitleClicked(record)}>{text}</a>);

  renderAddr = (text) => (<a className="mts-search-results-addr" href={text}>{text}</a>);

  renderFooter = () => (
    <div className="mts-search-results-footer">
      <span>批量操作：</span>
      <div className="mts-search-results-icon-button">
        <Button primary icon={<TagsOutlined />} onClick={(e) => this.handleMaterial(e)} />
      </div>
      <div className="mts-search-results-icon-button">
        <Button primary icon={<HeartOutlined />} onClick={(e) => this.handleCollect(e)} />
      </div>
    </div>
  );

  handlePageTurned = (pagination) => {
    if (this.props.onPageChange) {
      this.props.onPageChange(pagination.current);
    }
  };

  handleTitleClicked = (record) => {
    this.setState({
      visible: true,
      content: record.content,
      title: record.title,
    });
  };

  handleModalCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    const data = this.props.data || [];
    const { loading, visible, content, title } = this.state;
    const { hitNumber, pageSize } = this.props;
    console.log(hitNumber, data);
    return (
      <div>
        <div id="table">
          <Table
            rowKey={(record) => record.id}
            rowSelection={this.rowSelection}
            columns={this.columnsRender}
            dataSource={data}
            pagination={{
              position: ['none', 'bottomRight'],
              total: hitNumber,
            }}
            footer={this.renderFooter}
            onChange={this.handlePageTurned}
            loading={loading}
          />
        </div>
        <Modal title={title} visible={visible} onCancel={this.handleModalCancel}>
          {content}
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Results);
