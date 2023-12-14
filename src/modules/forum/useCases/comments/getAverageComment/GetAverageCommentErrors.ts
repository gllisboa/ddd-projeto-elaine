import { Result } from "../../../../../shared/core/Result";
import { UseCaseError } from "../../../../../shared/core/UseCaseError"; 

export namespace GetAverageCommentErrors {
  export class CommentNotFoundError extends Result<UseCaseError> {
    constructor(commentID: string) {
      super(false, {
        message: `Couldn't find a comment by ID {${commentID}}.`,
      } as UseCaseError);
    }
  }
}
