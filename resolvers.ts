import Article from "./models/article.model";

export const resolvers = {
  Query: { //Lay ra data
    hello: () => {
      return "Hello World!";
    },
      
    //FrontEnd viet Query goi vao ham getListArticles va lay ra Fields can thiet
    //=>GraphQL chay vao Query co ham getListArticles => khop voi ben resolvers co ham getListArticles => return
    getListArticles: async () => {
      const articles = await Article.find({
        deleted: false
      });

      return articles;
    },
  },

  Mutation: {
    //args: object inputs
    createArticle: (_, args) => {
        console.log(args);
    }
  }
}