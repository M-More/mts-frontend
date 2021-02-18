import React from 'react';
import { Button, Input, Table, Checkbox, Modal } from 'antd';
import { HeartOutlined, TagsOutlined, SearchOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import Lodash from 'lodash';
import criteria from '../../../common/enums/criteria';
import './InfoList.scss';

class InfoList extends React.Component {
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
        title: '标题',
        dataIndex: 'title',
        key: 'title',
        render: this.renderTitle,
      },
      {
        title: '地址',
        dataIndex: 'webpageUrl',
        key: 'webpageUrl',
        render: this.renderAddr,
      },
      {
        title: '站点',
        dataIndex: 'resource',
        key: 'resource',
      },
      {
        title: '来源',
        dataIndex: 'fromType',
        key: 'fromType',
        render: this.renderFromType,
      },
      {
        title: '敏感度',
        dataIndex: 'cflag',
        key: 'cflag',
        render: this.renderCflag,
      },
      {
        title: '发布时间',
        dataIndex: 'publishedDay',
        key: 'publishedDay',
      },
    ];
  }

  renderFromType = (text) => {
    const options = Lodash.find(criteria, { name: 'fromType' })?.options || [];
    return Lodash.find(options, { value: text })?.label || '';
  };

  renderCflag = (text) => {
    const options = Lodash.find(criteria, { name: 'cflag' })?.options || [];
    return Lodash.find(options, { value: text })?.label || '';
  };

  renderTitle = (text, record) => (
    <a
      className="mts-search-results-title"
      onClick={() => this.handleTitleClicked(record)}
    >
      {text}
    </a>
  );

  renderAddr = (text) => (
    <a
      className="mts-search-results-addr"
      href={text}
    >
      {text}
    </a>
  );

  renderFooter = () => (
    <div className="mts-search-results-footer">
      <span>批量操作：</span>
      <div className="mts-search-results-icon-button">
        <Button primary="true" icon={<TagsOutlined />} onClick={(e) => this.handleMaterial(e)} />
      </div>
      <div className="mts-search-results-icon-button">
        <Button primary="true" icon={<HeartOutlined />} onClick={(e) => this.handleCollect(e)} />
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
    const results = this.props.results || [];
    const { loading, visible, content, title } = this.state;
    const { hitNumber, pageSize } = this.props;
    return (
      <div className="mts-search-results">
        <div id="table">
          <Table
            rowKey={(record) => record.id}
            rowSelection={this.rowSelection}
            columns={this.columnsRender}
            dataSource={results}
            pagination={{
              position: ['none', 'bottomRight'],
              total: hitNumber,
            }}
            footer={this.renderFooter}
            onChange={this.handlePageTurned}
            loading={loading}
          />
        </div>
        <Modal
          title={title}
          visible={visible}
          onCancel={this.handleModalCancel}
          clsssName="mts-search-results-modal"
          wrapClassName="mts-search-results"
        >
          {content}
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(InfoList);
