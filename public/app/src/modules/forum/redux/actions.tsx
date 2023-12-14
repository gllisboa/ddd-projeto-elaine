
export type ForumActionType = 
  'SUBMITTING_POST' |
  'SUBMITTING_POST_SUCCESS' |
  'SUBMITTING_POST_FAILURE' |
  
  'GETTING_RECENT_POSTS' |
  'GETTING_RECENT_POSTS_SUCCESS' |
  'GETTING_RECENT_POSTS_FAILURE' |
  
  'GETTING_POST_BY_SLUG' |
  'GETTING_POST_BY_SLUG_SUCCESS' |
  'GETTING_POST_BY_SLUG_FAILURE' |
  
  'CREATING_REPLY_TO_POST' |
  'CREATING_REPLY_TO_POST_SUCCESS' |
  'CREATING_REPLY_TO_POST_FAILURE' |
  
  'GETTING_COMMENTS' |
  'GETTING_COMMENTS_SUCCESS' | 
  'GETTING_COMMENTS_FAILURE' |
  
  'GETTING_POPULAR_POSTS' |
  'GETTING_POPULAR_POSTS_SUCCESS' | 
  'GETTING_POPULAR_POSTS_FAILURE' |

  'GETTING_UNPOPULAR_POSTS' |
  'GETTING_UNPOPULAR_POSTS_SUCCESS' | 
  'GETTING_UNPOPULAR_POSTS_FAILURE' |
  
  'GETTING_COMMENT_BY_COMMENT_ID' |
  'GETTING_COMMENT_BY_COMMENT_ID_SUCCESS' |
  'GETTING_COMMENT_BY_COMMENT_ID_FAILURE' |

  'GETTING_AVERAGE_COMMENT' |
  'GETTING_AVERAGE_COMMENT_SUCCESS' |
  'GETTING_AVERAGE_COMMENT_FAILURE' |
  
  'CREATING_REPLY_TO_COMMENT' |
  'CREATING_REPLY_TO_COMMENT_SUCCESS' |
  'CREATING_REPLY_TO_COMMENT_FAILURE' |
  
  'UPVOTING_POST' |
  'UPVOTING_POST_SUCCESS' |
  'UPVOTING_POST_FAILURE' |
  
  'DOWNVOTING_POST' |
  'DOWNVOTING_POST_SUCCESS' |
  'DOWNVOTING_POST_FAILURE' |
  
  'UPVOTING_COMMENT' |
  'UPVOTING_COMMENT_SUCCESS' |
  'UPVOTING_COMMENT_FAILURE' |
  
  'DOWNVOTING_COMMENT' |
  'DOWNVOTING_COMMENT_SUCCESS' |
  'DOWNVOTING_COMMENT_FAILURE';

const SUBMITTING_POST: ForumActionType = 'SUBMITTING_POST';
const SUBMITTING_POST_SUCCESS: ForumActionType = 'SUBMITTING_POST_SUCCESS';
const SUBMITTING_POST_FAILURE: ForumActionType = 'SUBMITTING_POST_FAILURE';

const GETTING_RECENT_POSTS: ForumActionType = 'GETTING_RECENT_POSTS';
const GETTING_RECENT_POSTS_SUCCESS: ForumActionType = 'GETTING_RECENT_POSTS_SUCCESS';
const GETTING_RECENT_POSTS_FAILURE: ForumActionType = 'GETTING_RECENT_POSTS_FAILURE';

const GETTING_POST_BY_SLUG: ForumActionType = 'GETTING_POST_BY_SLUG';
const GETTING_POST_BY_SLUG_SUCCESS: ForumActionType = 'GETTING_POST_BY_SLUG_SUCCESS';
const GETTING_POST_BY_SLUG_FAILURE: ForumActionType = 'GETTING_POST_BY_SLUG_FAILURE';

const CREATING_REPLY_TO_POST: ForumActionType = 'CREATING_REPLY_TO_POST';
const CREATING_REPLY_TO_POST_SUCCESS: ForumActionType = 'CREATING_REPLY_TO_POST_SUCCESS';
const CREATING_REPLY_TO_POST_FAILURE: ForumActionType = 'CREATING_REPLY_TO_POST_FAILURE';

const GETTING_COMMENTS: ForumActionType = 'GETTING_COMMENTS';
const GETTING_COMMENTS_SUCCESS: ForumActionType = 'GETTING_COMMENTS_SUCCESS';
const GETTING_COMMENTS_FAILURE: ForumActionType = 'GETTING_COMMENTS_FAILURE';

const GETTING_POPULAR_POSTS: ForumActionType = 'GETTING_POPULAR_POSTS';
const GETTING_POPULAR_POSTS_SUCCESS: ForumActionType = 'GETTING_POPULAR_POSTS_SUCCESS';
const GETTING_POPULAR_POSTS_FAILURE: ForumActionType = 'GETTING_POPULAR_POSTS_FAILURE';

const GETTING_UNPOPULAR_POSTS: ForumActionType = 'GETTING_UNPOPULAR_POSTS';
const GETTING_UNPOPULAR_POSTS_SUCCESS: ForumActionType = 'GETTING_UNPOPULAR_POSTS_SUCCESS';
const GETTING_UNPOPULAR_POSTS_FAILURE: ForumActionType = 'GETTING_UNPOPULAR_POSTS_FAILURE';

const GETTING_COMMENT_BY_COMMENT_ID: ForumActionType = 'GETTING_COMMENT_BY_COMMENT_ID';
const GETTING_COMMENT_BY_COMMENT_ID_SUCCESS: ForumActionType = 'GETTING_COMMENT_BY_COMMENT_ID_SUCCESS';
const GETTING_COMMENT_BY_COMMENT_ID_FAILURE: ForumActionType = 'GETTING_COMMENT_BY_COMMENT_ID_FAILURE';

const GETTING_AVERAGE_COMMENT: ForumActionType = 'GETTING_AVERAGE_COMMENT';
const GETTING_AVERAGE_COMMENT_SUCCESS: ForumActionType = 'GETTING_AVERAGE_COMMENT_SUCCESS';
const GETTING_AVERAGE_COMMENT_FAILURE: ForumActionType = 'GETTING_AVERAGE_COMMENT_FAILURE';

const CREATING_REPLY_TO_COMMENT: ForumActionType = 'CREATING_REPLY_TO_COMMENT';
const CREATING_REPLY_TO_COMMENT_SUCCESS: ForumActionType = 'CREATING_REPLY_TO_COMMENT_SUCCESS';
const CREATING_REPLY_TO_COMMENT_FAILURE: ForumActionType = 'CREATING_REPLY_TO_COMMENT_FAILURE';

const UPVOTING_POST: ForumActionType = 'UPVOTING_POST'
const UPVOTING_POST_SUCCESS: ForumActionType = 'UPVOTING_POST_SUCCESS'
const UPVOTING_POST_FAILURE: ForumActionType = 'UPVOTING_POST_FAILURE'

const DOWNVOTING_POST: ForumActionType = 'DOWNVOTING_POST';
const DOWNVOTING_POST_SUCCESS: ForumActionType = 'DOWNVOTING_POST_SUCCESS';
const DOWNVOTING_POST_FAILURE: ForumActionType = 'DOWNVOTING_POST_FAILURE';

const UPVOTING_COMMENT: ForumActionType = 'UPVOTING_COMMENT'
const UPVOTING_COMMENT_SUCCESS: ForumActionType = 'UPVOTING_COMMENT_SUCCESS'
const UPVOTING_COMMENT_FAILURE: ForumActionType = 'UPVOTING_COMMENT_FAILURE'

const DOWNVOTING_COMMENT: ForumActionType = 'DOWNVOTING_COMMENT';
const DOWNVOTING_COMMENT_SUCCESS: ForumActionType = 'DOWNVOTING_COMMENT_SUCCESS';
const DOWNVOTING_COMMENT_FAILURE: ForumActionType = 'DOWNVOTING_COMMENT_FAILURE';


export {
  SUBMITTING_POST,
  SUBMITTING_POST_SUCCESS,
  SUBMITTING_POST_FAILURE,

  GETTING_RECENT_POSTS,
  GETTING_RECENT_POSTS_SUCCESS,
  GETTING_RECENT_POSTS_FAILURE,

  GETTING_POST_BY_SLUG,
  GETTING_POST_BY_SLUG_SUCCESS,
  GETTING_POST_BY_SLUG_FAILURE,

  CREATING_REPLY_TO_POST,
  CREATING_REPLY_TO_POST_SUCCESS,
  CREATING_REPLY_TO_POST_FAILURE,

  GETTING_COMMENTS,
  GETTING_COMMENTS_SUCCESS,
  GETTING_COMMENTS_FAILURE,

  GETTING_POPULAR_POSTS,
  GETTING_POPULAR_POSTS_SUCCESS,
  GETTING_POPULAR_POSTS_FAILURE,
  
  GETTING_UNPOPULAR_POSTS,
  GETTING_UNPOPULAR_POSTS_SUCCESS,
  GETTING_UNPOPULAR_POSTS_FAILURE,

  GETTING_COMMENT_BY_COMMENT_ID,
  GETTING_COMMENT_BY_COMMENT_ID_SUCCESS,
  GETTING_COMMENT_BY_COMMENT_ID_FAILURE,

  GETTING_AVERAGE_COMMENT,
  GETTING_AVERAGE_COMMENT_SUCCESS,
  GETTING_AVERAGE_COMMENT_FAILURE,

  CREATING_REPLY_TO_COMMENT,
  CREATING_REPLY_TO_COMMENT_SUCCESS,
  CREATING_REPLY_TO_COMMENT_FAILURE,

  UPVOTING_POST,
  UPVOTING_POST_SUCCESS,
  UPVOTING_POST_FAILURE,

  DOWNVOTING_POST,
  DOWNVOTING_POST_SUCCESS,
  DOWNVOTING_POST_FAILURE,

  UPVOTING_COMMENT,
  UPVOTING_COMMENT_SUCCESS,
  UPVOTING_COMMENT_FAILURE,

  DOWNVOTING_COMMENT,
  DOWNVOTING_COMMENT_SUCCESS,
  DOWNVOTING_COMMENT_FAILURE,
}