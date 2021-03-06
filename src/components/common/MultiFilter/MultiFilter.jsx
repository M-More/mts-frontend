import React from 'react';
import { Radio, Input, Form, Divider, DatePicker } from 'antd';
import criteria from './criteria';
import './MultiFilter.scss';

class MultiFilter extends React.Component {
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
    const { current } = this.props;
    return (
      <div className="mts-multi-filter-container">
        <Input.Search
          className="mts-multi-filter-input"
          enterButton
          size="large"
          onSearch={this.handleSearch}
        />
        <Form
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 999 }}
        >
          {criteria.map((item) => (
            <div key={item.name}>
              <Form.Item label={item.label}>
                <Radio.Group
                  className="mts-multi-filter-radios"
                  value={current[item.name]}
                  onChange={(event) => this.handleSelect(event, item.name)}
                >
                  {item.options.map((option) => (
                    <Radio
                      value={option.value}
                      key={option.value}
                    >
                      {option.label}
                    </Radio>
                  ))}
                </Radio.Group>
                {item.name === 'dateRange' && current[item.name] === -1 && (
                  <DatePicker.RangePicker
                    className="mts-multi-filter-date-picker"
                    onChange={this.handleDateChange}
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

export default MultiFilter;
