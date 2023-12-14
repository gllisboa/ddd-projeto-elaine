import * as actionCreators from '../actionCreators';
import { commentService } from '../../services';

function getAverageComment (specificDate?: string) {
return async (dispatch: any) => {

    dispatch(actionCreators.gettingAverageComment());

    const result = await commentService.getAverageComment(specificDate || '');

    if (result.isLeft()) {
        const error: string = result.value;
        dispatch(actionCreators.gettingAverageCommentFailure(error))
    } else {
        const averageComment = result.value.getValue();

        dispatch(actionCreators.gettingAverageCommentSuccess(averageComment));
        return averageComment;
    }

};
}

export { getAverageComment };