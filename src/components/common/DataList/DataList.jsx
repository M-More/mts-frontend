import React from 'react';
import { Button, Table, Modal } from 'antd';
import { HeartOutlined, TagsOutlined, LoadingOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import Lodash from 'lodash';
import criteria from '../MultiFilter/criteria';
import './DataList.scss';
import moment from "moment";
import DataContent from '../DataContent/DataContent';

class DataList extends React.Component {
  constructor() {
    super();
    this.state = {
      curRecord: undefined,
      visible: false,
    };
    this.rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(selectedRowKeys, selectedRows);
      },
      getCheckboxProps: (record) => ({}),
    };
    this.columnsRender = [
      {
        title: '内容',
        dataIndex: 'title',
        key: 'title',
        render: this.renderTitle,
      },
      /* {
        title: '站点',
        dataIndex: 'addr',
        key: 'addr',
        width: 100,
      }, */
      {
        title: '站点',
        dataIndex: 'source',
        key: 'source',
        render: this.renderSource,
        width: 100
      },
      {
        title: '敏感度',
        dataIndex: 'sensi',
        key: 'sensi',
        render: this.renderSensi,
        width: 100
      },
      {
        title: '发布时间',
        dataIndex: 'publishedDay',
        key: 'publishedDay',
        render: this.renderMoment,
        width: 100
      },
      {
        title: '分类',
        dataIndex: 'tag',
        key: 'tag',
        render: (text) => text || <LoadingOutlined />,
        width: 100

      },
      {
        title: '操作',
        dataIndex: 'url',
        key: 'url',
        render: this.renderAddr,
        width: 100
      },
    ];
  }


  // eslint-disable-next-line react/no-deprecated
  componentWillMount() {
    const { disableTag, disableSource } = this.props;
    if (disableTag) this.columnsRender = this.columnsRender.filter(item => item.key !== 'tag');
    if (disableSource) this.columnsRender = this.columnsRender.filter(item => item.key !== 'source');
  }

  renderMoment = (text) => (moment(text).format('YYYY-MM-DD hh:mm'))

  renderSource = (text) => {
    const options = Lodash.find(criteria, { name: 'source' })?.options || [];
    return Lodash.find(options, { value: text })?.label || '';
  };

  renderSensi = (text) => {
    if (text === '1') return <span style={{ color: 'red' }}>敏感</span>;
    return <span>非敏感</span>;
  };

  renderTitle = (text, record) => {
    const { content, source } = record;
    let renderTxt = '';
    renderTxt = `${content.slice(0, 100)}`
    return (
      <div
        onClick={() => this.handleTitleClicked(record)}
        className="title-content"
      >
        <a>
          {text}
        </a>
        <div style={{ color: 'gray' }}>{renderTxt}</div>
      </div>

    );
  };

  renderAddr = (text) => (
    <a
      className="mts-data-list-addr"
      href={text}
    >
      点击访问 >
    </a>
  );

  renderFooter = () => (
    <div className="mts-data-list-footer">
      <span>批量操作：</span>
      <div className="mts-data-list-icon-button">
        <Button primary="true" icon={<TagsOutlined />} onClick={(e) => this.handleMaterial(e)} />
      </div>
      <div className="mts-data-list-icon-button">
        <Button primary="true" icon={<HeartOutlined />} onClick={(e) => this.handleCollect(e)} />
      </div>
    </div>
  );

  handlePageTurned = (pagination) => {
    if (this.props.onPageChange) {
      this.props.onPageChange(pagination.current - 1);
    }
  };

  handleTitleClicked = (record) => {
    this.setState({
      visible: true,
      curRecord: record,
    });
  };

  handleModalCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    const data = this.props.data || [];
    const { visible, curRecord } = this.state;
    const { dataSize, pageSize, loading } = this.props;
    return (
      <div className="mts-data-list">
        <div id="table">
          <Table
            rowKey={(record) => record.id}
            rowSelection={this.rowSelection}
            columns={this.columnsRender}
            dataSource={data}
            pagination={{
              position: ['none', 'bottomRight'],
              total: dataSize,
              onShowSizeChange: this.props.onPageSizeChange,
            }}
            onChange={this.handlePageTurned}
            loading={loading}
            style={{ fontSize: '16px' }}
          />
          <DataContent
            record={curRecord}
            visible={visible}
            handleModalCancel={this.handleModalCancel}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(DataList);
