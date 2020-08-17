import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Search } from './Component/search';
import { Table } from './Component/table';
import * as Default from './default';

import Home from './pages/Home/Home';
import Detail from './pages/Detail/Detail';
import withContainer from './hoc/withContainer';
import PropTypes from 'prop-types';
import { Button } from './Component/button';


const EnhancedHome = withContainer(Home);
const EnhancedDetail = withContainer(Detail);
class App extends Component{
  
  constructor (props) {
    super(props);

    this.state = {
      results: null,
      searchKey: '',
      searchTerm: Default.DEFAULT_QUERY,
      page: Default.DEFAULT_PAGE
    };

    this.needToSearchTopStories = this.needToSearchTopStories.bind(this);
    //this.setSearchTopstories = this.setSearchTopstories.bind(this);
    this.fetchSearchTopstories = this.fetchSearchTopstories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
   
  }


 // setSearchTopstories (result) {
 //   const {hits, page} = result;
 //   const {results, searchKey} = this.state;

 //   const oldHits = (results && results[searchKey]) ? results[searchKey].hits : [];
 //   const updatedHits = [
 //     ...oldHits,
 //     ...hits
 //   ];

  //  this.setState({results: {
  //    ...results,
  //    [searchKey]: {hits: updatedHits, page}
  //  }});
 // }

  fetchSearchTopstories (searchTerm, page) {
    
    fetch(`${Default.PATH_BASE}${Default.PATH_SEARCH}?${Default.PARAM_SEARCH}${searchTerm}&${Default.PARAM_PAGE}${page}`)
    .then(response => response.json())
    .then(result => this.setSearchTopstories(result))
    .catch(e => e);
    this.setState({page});
    
  }

  componentDidMount () {
    const searchTerm = this.state.searchTerm;
    this.setState({searchKey: searchTerm});
    this.fetchSearchTopstories(searchTerm, Default.DEFAULT_PAGE);
  }

  onSearchChange (event) {
    this.setState({ searchTerm: event.target.value });
  }

  

  onSearchSubmit (event) {
    const {searchTerm} = this.state;

    if (!this.needToSearchTopStories(searchTerm)) {
      this.fetchSearchTopstories(this.state.searchTerm, Default.DEFAULT_PAGE);
    }

    this.setState({searchKey: searchTerm});
    event.preventDefault();
  }
  

  needToSearchTopStories (searchTerm) {
    return this.state.results.hasOwnProperty(searchTerm);
  }

  render () {
    const { searchTerm, searchKey, results } = this.state;
    const page = (results && results[searchKey] && results[searchKey].page) || 0;
    const list = (results && results[searchKey] && results[searchKey].hits) || [];

    return(
      
        
      <div className='page'>
        <div className='interactions'>
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
            >
            <strong></strong>
          </Search>
        </div>
        
        <Table
          list={list}
          onDismiss={this.onDismiss}
          />
        <div className='interactions'>
          {(page > 0)
  ? <Button onClick={() => this.fetchSearchTopstories(searchKey, page - 1)}>
  </Button>

  
    : null }
    <Router basename={process.env.PUBLIC_URL}>
          <Route exact path="/" component={EnhancedHome} />
          <Route exact path="/:storyId" component={EnhancedDetail} />
        </Router>
        </div>
            
      </div>


      
  
    );
  }
}

Table.propTypes = {
  onDismiss: PropTypes.func,
  list: PropTypes.array
};

Search.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  children: PropTypes.node
};

Button.propTypes = {
  onClick: PropTypes.func
};





export default App;



