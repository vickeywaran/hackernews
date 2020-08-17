import React from 'react';

import { itemUrl } from '../../api/endpoints';
import withLoading from '../../hoc/withLoading';
import Post from './Post';
import { handleError } from '../../api/helpers';

const EnhancedPost = withLoading(Post);

class Story extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: {},
      isLoading: true,
      activeComments: [],
      initialLoad: false,
      showComments: false,
      allCommentsLoaded: false,
      error: false
    }
  }

  componentDidMount() {
    this.getStory();
  }

  getStory = () => {
    fetch(itemUrl(this.props.id))
      .then(handleError)
      .then(response => response.json())
      .then(data => {
        this.setState({
          data: { ...data },
          isLoading: false,
        })
      })
      .catch(error => {
        this.setState({
          error: true
        });
      });
  }

  render() {
    return (
      <div className="story">
        <EnhancedPost
          type="story"
          error={this.state.error}
          isLoading={this.state.isLoading}
          data={this.state.data}
        />
      </div>
    )
  }
}

export default Story;