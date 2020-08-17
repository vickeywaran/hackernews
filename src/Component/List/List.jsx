import React from 'react';

import Story from '../Story';

function List({ list, ...props }) {
  return (
    <div>
      <div className="stories-list">
        {list.map(id => <Story id={id} key={id} />)}
      </div>

      <button className="btn stories-list__btn"
        onClick={props.loadStories}
        disabled={props.allLoaded}>
        {props.allLoaded ? 'No More Stories' : 'More Stories'}
      </button>

    </div>
  )
}

export default List;