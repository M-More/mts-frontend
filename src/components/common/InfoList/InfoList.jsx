import React from 'react';
import { Button, Input, Table, Checkbox, Modal } from 'antd';
import { HeartOutlined, TagsOutlined, SearchOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import './InfoList.scss';

class InfoList extends React.Component {
  constructor() {
    super();
    this.state = {
      content: '',
      title: '',
      loading: false,
      modalVisible: false,
    };
    this.rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(selectedRowKeys, selectedRows);
      },
      getCheckboxProps: (record) => ({}),
    };
    this.columnsRender = [
      {
        width: 300,
        title: '标题',
        dataIndex: 'title',
        key: 'title',
        render: (text, record, index) => (
          <a onClick={() => this.handleTitleClicked(record)}>{text}</a>
        ),
      },
      {
        width: 300,
        title: '地址',
        dataIndex: 'webpageUrl',
        key: 'webpageUrl',
        render: (text, record, index) => (<a href={text}>{text}</a>),
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

  renderFooter = () => (
    <div className="mts-info-list-footer">
      <span>批量操作：</span>
      <div className="mts-info-list-icon-button">
        <Button primary icon={<TagsOutlined />} onClick={(e) => this.handleMaterial(e)} />
      </div>
      <div className="mts-info-list-icon-button">
        <Button primary icon={<HeartOutlined />} onClick={(e) => this.handleCollect(e)} />
      </div>
    </div>
  );

  handlePageTurned = (pagination, filters, sorter) => {
    console.log(pagination);
    if (this.props.handleSearch) {
      this.props.handleSearch({
        page: pagination.current,
      });
    }
  };

  handleTitleClicked = (record) => {
    this.setState({
      modalVisible: true,
      content: record.content,
      title: record.title,
    });
  };

  handleModalConfirm = () => {
    this.setState({ modalVisible: false });
  };

  handleModalCancel = () => {
    this.setState({ modalVisible: false });
  };

  render() {
    const data = this.props.data || [];
    const { loading, modalVisible, content, title } = this.state;
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
              total: this.props.hitNumber,
            }}
            footer={this.renderFooter}
            loading={loading}
            onChange={this.handlePageTurned}
          />
        </div>
        <Modal title={title} visible={modalVisible} onOk={this.handleModalConfirm} onCancel={this.handleModalCancel}>
          {content}
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(InfoList);
