

import * as actionCreators from '../actionCreators'
import { postService } from '../../services';
import { Post } from '../../models/Post';

function getUnpopularPosts (offset?: number) {
  return async (dispatch: any) => {

    dispatch(actionCreators.getPopularPosts());

    const result = await postService.getUnpopularPosts(offset);

    if (result.isLeft()) {
      const error: string = result.value;
      dispatch(actionCreators.getUnpopularPostsFailure(error))
    } else {
      const posts: Post[] = result.value.getValue();
      dispatch(actionCreators.getUnpopularPostsSuccess(posts));
    }
  };
}

export { getUnpopularPosts};
