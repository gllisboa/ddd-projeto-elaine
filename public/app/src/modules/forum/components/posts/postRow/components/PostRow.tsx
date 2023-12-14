
import React from 'react';
import "../styles/PostRow.sass"
import { Post } from '../../../../models/Post';
import { Points } from '../../points';
import PostMeta from '../../post/components/PostMeta';
import PostMetaPopular from '../../post/components/PostMetaPopular';

interface PostRowProps extends Post {
  onUpvoteClicked: () => void;
  onDownvoteClicked: () => void;
  isLoggedIn: boolean;
  filterType: string;
}

const PostRow: React.FC<PostRowProps> = (props) => (
  <div className="post-row">
    <Points
      onUpvoteClicked={() => props.onUpvoteClicked()}
      onDownvoteClicked={() => props.onDownvoteClicked()}
      points={props.points}
      isLoggedIn={props.isLoggedIn}
    />
    {props.filterType !== "POPULAR" ? <PostMeta {...props} /> : <PostMetaPopular {...props} />}
  </div>
)

export default PostRow;