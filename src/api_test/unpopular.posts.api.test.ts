import { Logger } from "tslog";
import ConfigHandler from "./config/configHandler";
import Users from "./endpoints/Users";
import Posts from "./endpoints/Posts";
import  Constants  from "./config/constants";

const config = ConfigHandler.getInstance();
const log = new Logger({
  minLevel: config.environmnetConfig.log_level,
  dateTimeTimezone:
    config.environmnetConfig.time_zone ||
    Intl.DateTimeFormat().resolvedOptions().timeZone,
});

let posts: Posts;
let users: Users;
let accessToken: string;
let refreshToken: string;


/**
 * Teste de API para o endpoint /posts(unpopular)
 */
describe("Create a post", () => {
  beforeAll(async () => {
    posts = new Posts();
    users = new Users();

    log.debug("1. Posts Base url: " + posts.getBaseUrl());
  });

  
  /**
   * Faz login do usuário e obtém o token de acesso
   */
  it("Login", async () => {
    const response = await users.postLogin("Cristina", "cristina");
    expect(response.status).toBe(200);
    expect(response.data.accessToken).toBeDefined();
    expect(response.data.refreshToken).toBeDefined();
    accessToken = response.data.accessToken;
    refreshToken = response.data.refreshToken;
  });

  /**
   * Obtém os posts menos votados para obter os slugs dos posts
   */
  it("Get Unpopular Posts", async (): Promise<void> => {
    const response = await posts.getUnpopularPosts();
    expect(response.status).toBe(200);
    expect(response.data.posts).toBeDefined();
    expect(response.data.posts).toBeDefined();
    for (const post of response.data.posts) {
      expect(post.slug).toBeDefined();
    }
  });

  /**
   * Cria um post (testa o endpoint /posts)
   */
  it("Create Post 1", async () => {
    const response = await posts.createPost(
      accessToken,
      "US001 Unpopular Post",
      "text",
      "US01 Post text",
      ""
    );
    expect(response.status).toBe(200);
  });

  it("Create Post 2", async () => {
    const response = await posts.createPost(
      accessToken,
      "US002 Unpopular Post",
      "text",
      "US02 Post text",
      ""
    );
    expect(response.status).toBe(200);
  });

  it("Create Post 3", async () => {
    const response = await posts.createPost(
      accessToken,
      "US003 Unpopular Post",
      "text",
      "US03 Post text",
      ""
    );
    expect(response.status).toBe(200);
  });

  it("Create Post 4", async () => {
    const response = await posts.createPost(
      accessToken,
      "US004 Unpopular Post",
      "text",
      "US04 Post text",
      ""
    );
    expect(response.status).toBe(200);
  });

  it("Get unpopular posts as a visitor (no access token)", async (): Promise<void> => {
    const response = await posts.getUnpopularPosts(null, "");
    
    console.log(JSON.stringify(response.data));
    expect(response.status).toBe(200);
    expect(response.data.posts).toBeDefined();
    expect(response.data.posts.length).toBeGreaterThan(0);

    const postsArray = response.data.posts;
    for (let i = 0; i < postsArray.length - 1; i++) {
      expect(postsArray[i].points).toBeLessThanOrEqual(postsArray[i + 1].points);
    }
  });

  /**
   * Descreve o endpoint de classificação - Get Unpopular Posts
   */
  describe("Sort Endpoint - Unpopular Posts", (): void => {
    beforeAll(async (): Promise<void> => {
      posts = new Posts();
      users = new Users();

      log.debug("1. Posts Base url: " + posts.getBaseUrl());
    });

    /**
     * Obtém os posts menos votados como um usuário com token de acesso correto
     */
    it("Get unpopular posts as a user with correct access token", async (): Promise<void> => {
      log.debug("Authorization: " + accessToken);
      const response = await posts.getUnpopularPosts(null, accessToken);

      expect(response.status).toBe(200);
      expect(response.data.posts.length).toBeGreaterThan(0);
      expect(response.data.posts).toBeDefined();

      for (const post of response.data.posts) {
        expect(post.slug).toBeDefined();
        expect(post.title).toBeDefined();
        expect(post.text).toBeDefined();
        expect(post.createdAt).toBeDefined();
        expect(post.memberPostedBy).toBeDefined();
        expect(post.memberPostedBy.reputation).toBeDefined();
        expect(post.memberPostedBy.user).toBeDefined();
        expect(post.memberPostedBy.user.username).toBeDefined();
        expect(post.numComments).toBeDefined();
        expect(post.points).toBeDefined();
        expect(post.link).toBeDefined();
        expect(post.type).toBeDefined();
        expect(post.wasUpvotedByMe).toBeDefined();
        expect(post.wasDownvotedByMe).toBeDefined();
      }

      console.log(JSON.stringify(response.data));
    });

    /**
     * Obtém os posts menos votados como um usuário sem token de acesso
     */
    it("Get unpopular posts as a user with incorrect access token", async (): Promise<void> => {
      const response = await posts.getUnpopularPosts(null, "");

      expect(response.status).toBe(200);
    });

    /**
     * Obtém os posts menos votados como um usuário com token de acesso expirado
     */
    it("Get unpopular posts as a user with expired access token", async (): Promise<void> => {
      log.debug("Authorization: " + accessToken);
      const response = await posts.getUnpopularPosts(null, Constants.EXPIREDTOKEN);

      log.debug("Message: " + response.data.message);
      expect(response.status).toBe(403);
      expect(response.data.message).toBeDefined();
      expect(response.data.message).toContain("Token signature expired");
    });

    /**
     * Obtém os posts menos votados como um usuário (offset = 0)
     */
    it("Get unpopular posts as a user (offset = 0)", async (): Promise<void> => {
      log.debug("Authorization: " + accessToken);
      const response = await posts.getUnpopularPosts(-99);

      log.debug("Message: " + response.data.message);
      expect(response.status).toBe(500);
      expect(response.data.message).toBeDefined();
      expect(response.data.message).toContain("An unexpected error occurred");
    });

    /**
     * Obtém os posts menos votados como um usuário (offset = -1)
     */
    it("Get unpopular posts as a user (offset = -1)", async (): Promise<void> => {
      log.debug("Authorization: " + accessToken);
      const response = await posts.getUnpopularPosts(-1);

      log.debug("Message: " + response.data.message);
      expect(response.status).toBe(500);
      expect(response.data.message).toBeDefined();
      expect(response.data.message).toContain("An unexpected error occurred");
    });

    /**
     * Verifica se os posts estão classificados por pontos em ordem crescente.
     */
    it("Check if posts are sorted by points (ascending order)", async (): Promise<void> => {
      log.debug("Authorization: " + accessToken);
      const response = await posts.getUnpopularPosts(null, accessToken);

      expect(response.status).toBe(200);
      expect(response.data.posts).toBeDefined();

      const postsArray = response.data.posts;
      for (let i = 0; i < postsArray.length - 1; i++) {
        expect(postsArray[i].points).toBeLessThanOrEqual(postsArray[i + 1].points);
      }
    });

    /**
     * Verifica a classificação dos posts com um grande número de posts
     */
    it(
      "Get Unpopular Posts with Large Number of Posts - Part 1",
      async () => {
        // Crie um grande número de posts
        const numberOfPosts = 100; // Altere conforme necessário
        for (let i = 0; i < numberOfPosts; i++) {
          const response = await posts.createPost(
            accessToken,
            `Post ${i}`,
            "text",
            `Post ${i} text`,
            ""
          );
          expect(response.status).toBe(200);
        }
      },
      20000 // Tempo limite definido como 20 segundos (em milissegundos) para esta parte
    );
    
    it(
      "Get Unpopular Posts with Large Number of Posts - Part 2",
      async () => {
        // Obtenha os posts impopulares e verifique
        const response = await posts.getUnpopularPosts();
        expect(response.status).toBe(200);
        // Valide se a resposta é adequada com um grande volume de posts
      },
      20000 // Tempo limite definido como 20 segundos (em milissegundos) para esta parte
    );
  });
});


