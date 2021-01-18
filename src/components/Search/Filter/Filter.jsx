import React from 'react';
import { Radio, Input, Button, Form, Divider, DatePicker } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';
import './Filter.scss';

class Filter extends React.Component {
  handleSelect = (event, type) => {
    if (this.props.onSelect) {
      this.props.onSelect(type, event.target.value);
    }
  };

  handleSearch = (keyword) => {
    if (this.props.onSearch) {
      this.props.onSearch(keyword);
    }
  };

  handleDateChange = (moments) => {
    if (this.props.onDateChange) {
      this.props.onDateChange(moments);
    }
  };

  render() {
    const { criteria, DateRange, current } = this.props;
    return (
      <div className="mts-search-filter-container">
        <Input.Search
          className="mts-search-filter-input"
          enterButton
          size="large"
          onSearch={this.handleSearch}
        />
        <Form
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 999 }}
        >
          {criteria && criteria.map((criterion) => (
            <div key={criterion.name}>
              <Form.Item
                label={criterion.label}
              >
                <Radio.Group
                  className="mts-search-filter-radios"
                  value={current[criterion.name]}
                  onChange={(event) => this.handleSelect(event, criterion.name)}
                >
                  {criterion.options.map((option) => (
                    <Radio
                      value={option.value}
                      key={option.value}
                    >
                      {option.label}
                    </Radio>
                  ))}
                </Radio.Group>
                {criterion.type === 'datePicker' && current[criterion.name] === -1 && (
                  <DatePicker.RangePicker
                    className="mts-search-filter-date-picker"
                    onChange={this.handleDatePicked}
                  />
                )}
              </Form.Item>
              <Divider className="divider" />
            </div>
          ))}
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Filter);
