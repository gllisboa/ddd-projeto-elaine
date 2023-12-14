
import React from 'react'
import moment from 'moment';
import { Link } from "react-router-dom";
import { Post } from '../../../../models/Post'
import "../styles/PostMetaPopular.sass"

interface PostMetaProps extends Post {
  includeLink?: boolean;
}

const PostMeta: React.FC<PostMetaProps> = (props) => (

  <div className="post-row-content">    
    {props.includeLink === false ? '' : <Link to={`/discuss/${props.slug}`} className="title">"{props.title}" {props.link ? <span className="link">[link]</span> : ''}</Link>}
    <div className="post-row-meta">
      {moment().diff(moment(props.createdAt), 'days') > 5 ? <span className="link-red">{moment(props.createdAt).fromNow()}</span> : <span className="">{moment(props.createdAt).fromNow()}</span> }
      | {`by `} <Link to={`/member/${props.postAuthor}`}>{props.postAuthor}</Link> | {`${props.numComments} comments`}
    </div>
  </div>
)

export default PostMeta;