import React from 'react';

import { commentsPerLoad } from '../../constants';
import { itemUrl } from '../../api/endpoints';
import Post from '../../Component/Story/Post';
import Comment from '../../Component/Comment';
import withLoading from '../../hoc/withLoading';
import { handleError } from '../../api/helpers';

const EnhancedStory = withLoading(Post);

class Detail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      isLoading: true,
      activeComments: [],
      allCommentsLoaded: false,
      error: false
    }
  }

  componentDidMount() {
    this.getStory();
  }

  getStory = () => {
    fetch(itemUrl(this.props.match.params.storyId))
      .then(handleError)
      .then(response => response.json())
      .then(data => {
        this.setState({
          data: { ...data },
          isLoading: false,
        }, () => {
          if (this.state.data.kids) {
            this.loadComments()
          } else {
            this.setState({ allCommentsLoaded: true });
          }
        });
      })
      .catch(error => {
        this.setState({
          error: true
        });
      });
  }

  loadComments = () => {
    const endIndex = this.state.activeComments.length + commentsPerLoad;

    this.setState({
      activeComments: [...this.state.data.kids.slice(0, endIndex)]
    }, () => {

      if (this.state.data.kids.length === this.state.activeComments.length) {
        this.setState({
          allCommentsLoaded: true
        });

      }
    });
  }

  render() {
    return (
      <div>
        <EnhancedStory
          error={this.state.error}
          isLoading={this.state.isLoading}
          data={this.state.data}
          type="story"
        />

        {this.state.activeComments.map(id => <Comment id={id} key={id} />)}

        {!this.state.error &&
          <div className="detail-actions">
            <button
              className="btn"
              onClick={this.loadComments}
              disabled={this.state.allCommentsLoaded}>
              {this.state.allCommentsLoaded ? 'No More Comments' : 'More Comments'}
            </button>
          </div>
        }
      </div>
    )
  }
}

export default Detail;