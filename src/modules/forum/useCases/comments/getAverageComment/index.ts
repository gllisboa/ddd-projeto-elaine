
import { GetAverageComment } from "./GetAverageComment";
import { commentRepo, memberRepo } from "../../../repos";
import { GetAverageCommentController } from "./GetAverageCommentController";    

const getAverageComment = new GetAverageComment(
    commentRepo, memberRepo
)

const getAverageCommentController = new GetAverageCommentController(
    getAverageComment
)

export {
    getAverageComment,
    getAverageCommentController
}