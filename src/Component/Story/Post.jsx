import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiUser, FiMessageSquare, FiLink, FiClock } from 'react-icons/fi';


function Post({ data, ...props }) {

  const { storyId } = useParams();
  const headingElement = storyId ?
    <h1 className="story__title"><Link to={`/${data.id}`}>{data.title}</Link></h1> :
    <h2 className="story__title"><Link to={`/${data.id}`}>{data.title}</Link></h2>

  return (
    <div>
      {headingElement}
      <div className="description story__description">
        <span className="description__by"><FiUser /> <strong>{data.by}</strong></span>
        <span className="description__comments"><FiMessageSquare /> {data.kids ? data.kids.length : '0'}</span>
        <span className="description__time"><FiClock /> {new Date(data.time * 1000).toLocaleString()}</span>
        <span className="description__permalink"><a href={data.url} target="_new" title={data.title}><FiLink /></a></span>
      </div>
    </div>
  )
}

export default Post;