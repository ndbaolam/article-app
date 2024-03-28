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
    createArticle: async (_, args) => {
        const { article } = args;

        const record = new Article(article);
        await record.save();

        return record;
    },

    deleteArticle: async(_, args) => {
      const { id } = args;
      await Article.updateOne({
        _id: id
      }, {
        deleted: true,
        deletedAt: new Date()
      });

      return "Deleted article";
    },

    updateArticle: async(_, args) => {
      const { id, article } = args;
      await Article.updateOne({
        _id: id
      }, {
        title: article.title,
        avatar: article.avatar,
        description: article.description
      });

      const newRecord = await Article.findOne({
        _id: id
      });

      return newRecord;
    },
  }
}