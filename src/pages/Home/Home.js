import React from 'react';

import { topStoriesUrl } from '../../api/endpoints';
import { storiesPerLoad } from '../../constants';
import withLoading from '../../hoc/withLoading';
import { handleError } from '../../api/helpers';
import List from '../../Component/List';

const EnchancedList = withLoading(List);
class Home extends React.Component {

  constructor() {
    super();

    this.state = {
      activeStories: [],
      allLoaded: false,
      isLoading: true,
      error: false
    }

    this.storiesList = [];
  }

  componentDidMount() {
    this.getTopStories();
  }

  getTopStories = () => {
    fetch(topStoriesUrl)
      .then(handleError)
      .then(response => response.json())
      .then(data => {
        this.storiesList = [...data];
        this.loadStories();
        this.setState({
          isLoading: false
        });
      })
      .catch(error => {
        this.setState({
          error: true
        });
      });
  }

  loadStories = () => {
    const endIndex = this.state.activeStories.length + storiesPerLoad;

    this.setState({
      activeStories: [...this.storiesList.slice(0, endIndex)]
    });

    if (this.storiesList.length === this.state.activeStories.length) {
      this.setState({
        allLoaded: true
      })
    }
  }

  render() {
    return (
      <EnchancedList
        type="story"
        isLoading={this.state.isLoading}
        error={this.state.error}
        list={this.state.activeStories}
        loadStories={this.loadStories}
        allLoaded={this.state.allLoaded}
      />
    )
  }
}

export default Home;