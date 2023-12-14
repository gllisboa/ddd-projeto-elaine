import { Logger } from "tslog";
import ConfigHandler from "./config/configHandler";
import Users from "./endpoints/Users";
import Posts from "./endpoints/Posts";
import Comment from "./endpoints/Comments";

const config = ConfigHandler.getInstance();
const log = new Logger({
  minLevel: config.environmnetConfig.log_level,
  dateTimeTimezone:
    config.environmnetConfig.time_zone ||
    Intl.DateTimeFormat().resolvedOptions().timeZone,
});

let posts: Posts;
let comment: Comment;
let users: Users;
let accessToken: string;
let refreshToken: string;

/**
 * Teste de API para o endpoint /comment(average)
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

  // Descrição dos testes para a funcionalidade de média de comentários por dia
  describe("Average Comments per Day Tests", () => {
    // Inicializações antes dos testes
    beforeAll(async () => {
      posts = new Posts();
      users = new Users();
      comment = new Comment();
    });

    // Teste para verificar se a API retorna a média de comentários para um dia específico
    it("Get Average Comments for a Specific Day", async () => {
      log.debug("Authorization: " + accessToken);
      const specificDate = "2023-11-10"; // Data específica para a qual queremos a média de comentários
      const response = await comment.getAverageComment(
        accessToken,
        specificDate
      );

      expect(response.status).toBe(200);
      expect(response.data.averageComment).toBeDefined();
    });

    it("Get average comment for a different specific date", async (): Promise<void> => {
      const specificDate = "2023-12-15"; // Outra data para teste
      const response = await comment.getAverageComment(
        accessToken,
        specificDate
      );

      expect(response.status).toBe(200);
      expect(response.data.averageComments).toBeDefined();
      // Verifique se a resposta inclui a média de comentários para a data específica
    });

    it("Attempt to get average comment for an invalid date", async (): Promise<void> => {
      const invalidDate = "InvalidDate"; // Data inválida
      const response = await comment.getAverageComment(
        accessToken,
        invalidDate
      );

      expect(response.status).toBe(400);
    });

    it("Attempt to get average comment without access token", async (): Promise<void> => {
      const specificDate = "2023-12-01"; // Data para teste
      const response = await comment.getAverageComment("", specificDate);

      expect(response.status).toBe(401);
    });
  });
});
