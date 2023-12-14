
import { BaseController } from "../../../../../shared/infra/http/models/BaseController";
import { GetUnpopularPostsRequestDTO } from "./GetUnpopularPostsRequestDTO";
import { GetUnpopularPosts } from "./GetUnpopularPosts";
import { GetUnpopularPostsResponseDTO } from "./GetUnpopularPostsResponseDTO";
import { PostDetailsMap } from "../../../mappers/postDetailsMap";
import { DecodedExpressRequest } from "../../../../users/infra/http/models/decodedRequest";
import * as express from 'express'

export class GetUnpopularPostsController extends BaseController {
  private useCase: GetUnpopularPosts;

  constructor (useCase: GetUnpopularPosts) {
    super();
    this.useCase = useCase;
  }

  async executeImpl (req: DecodedExpressRequest, res: express.Response): Promise<any> {

    const dto: GetUnpopularPostsRequestDTO = {
      offset: Number(req.query.offset),
      userId: !!req.decoded === true ? req.decoded.userId : null
    }

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;
  
        switch (error.constructor) {
          default:
            return this.fail(res, error.getErrorValue().message);
        }
        
      } else {
        const postDetails = result.value.getValue();
        return this.ok<GetUnpopularPostsResponseDTO>(res, {
          posts: postDetails.map((d) => PostDetailsMap.toDTO(d))
        });
      }

    } catch (err) {
      return this.fail(res, err)
    }
  }
}