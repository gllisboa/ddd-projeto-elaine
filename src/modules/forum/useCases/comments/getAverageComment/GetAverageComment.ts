import { UseCase } from "../../../../../shared/core/UseCase";
import { Either, Result, left, right } from "../../../../../shared/core/Result";
import { AppError } from "../../../../../shared/core/AppError";
import { GetAverageCommentErrors } from "./GetAverageCommentErrors";
import { CommentDetails } from "../../../domain/commentDetails";
import { GetAverageCommentRequestDTO } from "./GetAverageCommentRequestDTO";
import { ICommentRepo } from "../../../repos/commentRepo";
import { IMemberRepo } from "../../../repos/memberRepo";
import { get } from "lodash";

type Response = Either<
  GetAverageCommentErrors.CommentNotFoundError |
  AppError.UnexpectedError,
  Result<number> // Alterado para Result<number> para representar a média de comentários por membro
>;

export class GetAverageComment implements UseCase<any, Promise<Response>> {
  private commentRepo: ICommentRepo;
  private memberRepo: IMemberRepo;
  models: any;

  constructor(commentRepo: ICommentRepo, memberRepo: IMemberRepo) {
    this.commentRepo = commentRepo;
    this.memberRepo = memberRepo;
  }

  public async execute(req: GetAverageCommentRequestDTO): Promise<Response> {
    let averageComments: number;
    const { specificDate } = req; 
    console.info('specificDate', specificDate);
    try {
      
      try {
        averageComments = await this.commentRepo.getAverageCommentsPerMemberOnDate(specificDate);
        console.info('averageComments', averageComments);
      } catch (err) {
        return left(new AppError.UnexpectedError(err));
      }

      return right(Result.ok<number>(averageComments));

    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
        
  }

  
