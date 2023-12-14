import { BaseController } from "../../../../../shared/infra/http/models/BaseController";
import { GetAverageComment } from "./GetAverageComment";
import { GetAverageCommentRequestDTO } from "./GetAverageCommentRequestDTO";
import { GetAverageCommentResponseDTO } from "./GetAverageCommentResponseDTO";
import { GetAverageCommentErrors } from "./GetAverageCommentErrors";
import { CommentDetails } from "../../../domain/commentDetails";
import { DecodedExpressRequest } from "../../../../users/infra/http/models/decodedRequest";
import * as express from "express";
import { CommentDetailsMap } from "../../../mappers/commentDetailsMap";

export class GetAverageCommentController extends BaseController {
  private useCase: GetAverageComment;

  constructor(useCase: GetAverageComment) {
    super();
    this.useCase = useCase;
  }

  private badRequest(res: express.Response, message: string): any {
    return res.status(400).json({ message: message });
  }

  async executeImpl(
    req: DecodedExpressRequest,
    res: express.Response
  ): Promise<any> {
    const dto: GetAverageCommentRequestDTO = {
      specificDate: req.params.specificDate as string,
      offset: parseInt(req.query.offset as string),
      userId: req.decoded ? req.decoded.userId : null,
    };

    try {
      const result = await this.useCase.execute(dto);
      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case GetAverageCommentErrors.CommentNotFoundError:
            return this.notFound(res, error.getErrorValue().message);
          default:
            return this.fail(res, error.getErrorValue().message);
        }
      } else {
        console.info("result.value", result.value);
        console.info("result.value.getValue", result.value.getValue());
        const commentDetails = result.value.getValue();

        /*if (!Array.isArray(commentDetails) || commentDetails.length === 0) {
                    return this.notFound(res, 'Nenhum comentário encontrado para calcular a média.');
                }*/

        const specificDate = req.query.specificDate as string;
        //const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(specificDate);

        //if (isValidDate) {
        try {
          //const average = await this.useCase.getAverageCommentsPerMemberOnDate(specificDate);

          const responseDTO: GetAverageCommentResponseDTO = {
            average: commentDetails,
          };
          return this.ok<GetAverageCommentResponseDTO>(res, responseDTO);
        } catch (error) {
          return this.badRequest(res, "Erro ao processar a data fornecida.");
        }
        /*} else {
                    return this.badRequest(res, 'Formato de data inválido. Use o formato YYYY-MM-DD.');
                }*/
      }
    } catch (err) {
      return this.fail(res, err);
    }
  }
}
