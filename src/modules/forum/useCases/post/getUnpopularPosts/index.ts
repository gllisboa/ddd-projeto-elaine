
import { GetUnpopularPosts } from "./GetUnpopularPosts";
import { postRepo } from "../../../repos";
import { GetUnpopularPostsController } from "./GetUnpopularPostsController";

const getUnpopularPosts = new GetUnpopularPosts(postRepo);

const getUnpopularPostsController = new GetUnpopularPostsController(
  getUnpopularPosts
)

export {
  getUnpopularPosts,
  getUnpopularPostsController
}

