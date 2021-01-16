import React from 'react';
import { Radio, Input, Button, Form, Divider } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';
import searchCriteria from './searchCriteria';
import './SearchModule.scss';
import { timeRangeOptions } from '../../../temp/constant';

const PAGE_SIZE = 20;

class SearchModule extends React.Component {
  constructor() {
    super();
    this.state = {
      cflag: null,
      fromType: null,
      timeOrder: 0,
      timeRange: null,
      keyword: null,
      page: 0,
      startTime: null,
      endTime: null,
    };
  }

  handleSelect = (event, type) => {
    const newState = {};
    newState[type] = event.target.value;
    this.setState(newState);
  };

  handleSearch = () => {
    console.log(this.state);
  };

  render() {
    const {
      cflag, fromType, timeOrder, timeRange, keyword, page,
    } = this.state;
    return (
      <div className="mts-search-module-container">
        <Input.Search
          className="mts-search-module-input"
          enterButton
          size="large"
          onSearch={this.handleSearch}
        />
        <Form
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 20 }}
        >
          {searchCriteria.map((criteria) => (
            <>
              <Form.Item
                label={criteria.label}
                key={criteria.name}
              >
                <Radio.Group
                  className="mts-search-module-radios"
                  defaultValue={criteria.defaultValue}
                  value={this.state[criteria.name]}
                  onChange={(event) => this.handleSelect(event, criteria.name)}
                >
                  {criteria.options.map((option) => (
                    <Radio
                      value={option.value}
                      key={option.value}
                    >
                      {option.label}
                    </Radio>
                  ))}
                </Radio.Group>
              </Form.Item>
              <Divider className="divider" />
            </>
            /* <>
              <div className="conditionWrapper">
                <span>{criteria.label}</span>
                <ul className="conditionList timeRange">
                  {criteria.options.map((option) => (
                    <li
                      key={option.value}
                      className={this.state[criteria.name] === option.value ? 'active' : ''}
                      onClick={() => this.handleSelect(criteria.name, option.value)}
                    >
                      {option.label}
                    </li>
                  ))}
                </ul>
              </div>
              <Divider className="divider" />
            </> */
          ))}
        </Form>
        {/* <div className="mts-search-module-buttons-wrapper">
          <Button
            className="mts-search-module-button"
            type="primary"
          >
            舆情搜索
          </Button>
          <Button
            className="mts-search-module-button"
            type="primary"
          >
            导出素材
          </Button>
        </div> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(SearchModule);
