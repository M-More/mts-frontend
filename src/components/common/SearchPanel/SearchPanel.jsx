import React from 'react';
import { Radio, Input, Button, Form, Divider, DatePicker } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';
import './SearchPanel.scss';

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';
class SearchPanel extends React.Component {
  constructor() {
    super();
    this.moments = null;
    this.state = {};
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillMount() {
    const { searchCriteria } = this.props;
    searchCriteria.forEach((criterion) => {
      this.state[criterion.name] = criterion.defaultValue;
    });
    console.log(this.state);
  }

  handleSelect = (event, type) => {
    const newState = {};
    newState[type] = event.target.value;
    this.setState(newState);
  };

  handleDatePicked = (moments) => {
    this.moments = moments;
  };

  handleSearch = (keyword) => {
    const { timeRange } = this.state;
    const { moments } = this;
    // const current = moment();
    const current = moment('2020-07-18 12:00:00');
    let startPublishedDay = null;
    let endPublishedDay = null;
    switch (timeRange) {
      case 0:
        endPublishedDay = current.format(DATE_FORMAT);
        startPublishedDay = current.startOf('day').format(DATE_FORMAT);
        break;
      case -1:
        if (!moments) break;
        startPublishedDay = moments[0]?.format(DATE_FORMAT);
        endPublishedDay = moments[1]?.format(DATE_FORMAT);
        break;
      case null:
        break;
      default:
        endPublishedDay = current.format(DATE_FORMAT);
        startPublishedDay = current.add(-timeRange, 'days').format(DATE_FORMAT);
        break;
    }
    console.log(startPublishedDay, endPublishedDay);
    if (this.props.handleSearch) {
      this.props.handleSearch({
        keyword,
        ...this.state,
        startPublishedDay,
        endPublishedDay,
      });
    }
  };

  render() {
    const { searchCriteria } = this.props;
    const { moments } = this;
    return (
      <div className="mts-search-panel-container">
        <Input.Search
          className="mts-search-panel-input"
          enterButton
          size="large"
          onSearch={this.handleSearch}
        />
        <Form
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 20 }}
        >
          {searchCriteria.map((criterion) => (
            <>
              <Form.Item
                label={criterion.label}
                key={criterion.name}
              >
                <Radio.Group
                  className="mts-search-panel-radios"
                  defaultValue={criterion.defaultValue}
                  value={this.state[criterion.name]}
                  onChange={(event) => this.handleSelect(event, criterion.name)}
                >
                  {criterion.options.map((option) => (
                    <Radio
                      value={option.value}
                      key={option.value}
                    >
                      {option.label}
                      { criterion.name === 'timeRange' && option.value === -1 && this.state.timeRange === -1 && (
                        // self defined date picker
                        <DatePicker.RangePicker
                          className="mts-search-panel-date-picker"
                          onChange={this.handleDatePicked}
                        />
                      )}
                    </Radio>
                  ))}
                </Radio.Group>
              </Form.Item>
              <Divider className="divider" />
            </>
          ))}
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(SearchPanel);
