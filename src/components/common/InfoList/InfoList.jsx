import React from 'react';
import { Button, Input, Table, Checkbox } from 'antd';
import { HeartOutlined, TagsOutlined, SearchOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import columns from './columns';
import './InfoList.scss';

class InfoList extends React.Component {
  constructor() {
    super();
    this.rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(selectedRowKeys, selectedRows);
      },
      getCheckboxProps: (record) => ({}),
    };
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
      <div className="mts-info-list-filter-input">
        <Input.Search
          placeholder="在结果中搜索，支持单个单词"
          enterButton
        />
      </div>
    </div>
  );

  render() {
    const data = this.props.data || [];
    return (
      <div>
        <div id="table">
          <Table
            rowKey={(record) => record.id}
            rowSelection={this.rowSelection}
            columns={columns}
            dataSource={data}
            pagination={{ position: ['none', 'bottomRight'] }}
            footer={this.renderFooter}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(InfoList);
