import React, { Component } from 'react';
import requestList from '../../utils/enums/requestList';
import SearchMenu from '../../components/common/SearchPanel/SearchPanel';
import InfoList from '../../components/common/InfoList/InfoList';
import searchCriteria from '../../utils/enums/searchCriteria';
import './Search.scss';

const PAGE_SIZE = 10;

class Search extends Component {
  constructor() {
    super();
    this.prevCriteria = {
      keyword: '',
      startPublishedDay: null,
      endPublishedDay: null,
      page: 0,
      pageSize: PAGE_SIZE,
    };
    searchCriteria.forEach(criterion => {
      this.prevCriteria[criterion.name] = criterion.defaultValue;
    });
    this.state = {
      hitNumber: 0,
      data: [],
    };
  }

  componentDidMount() {
    const { search } = requestList;
    this.handleSearch({});
  }

  handleSearch = (newCriteria) => {
    const { search } = requestList;
    this.prevCriteria = {
      ...this.prevCriteria,
      ...newCriteria,
    };
    const { prevCriteria } = this;
    let url = `${search.url}?`;
    Object.keys(prevCriteria).forEach((criterion) => {
      if (criterion === 'timeRange') return;
      if (criterion === 'keyword' && prevCriteria[criterion] === '') url = url.concat(`${criterion}=&`);
      else if (prevCriteria[criterion] === null) url = url.concat(`${criterion}=&`);
      else url = url.concat(`${criterion}=${prevCriteria[criterion]}&`);
    });
    if (url.slice(-1) === '&') url = url.slice(0, -1);
    url = encodeURI(url);
    console.log(prevCriteria);
    console.log(url);
    fetch(url, { method: search.method })
      .then((response) => response.json())
      .then((response) => {
        console.log(response.results);
        this.setState({
          data: response.dataContent,
          hitNumber: response.hitNumber,
        });
      })
      .catch((error) => console.error(error));
  };

  render() {
    const { data, hitNumber } = this.state;
    return (
      <div className="mts-search-container">
        <SearchMenu
          handleSearch={this.handleSearch}
          searchCriteria={searchCriteria}
        />
        <InfoList
          data={data}
          hitNumber={hitNumber}
          pageSize={PAGE_SIZE}
          handleSearch={this.handleSearch}
        />
      </div>
    );
  }
}

export default Search;
