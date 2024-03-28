import Article from "./models/article.model";
import Category from "./models/categories.model";

export const resolvers = {
  Query: { //Lay ra data
    //FrontEnd viet Query goi vao ham getListArticles va lay ra Fields can thiet
    //=>GraphQL chay vao Query co ham getListArticles => khop voi ben resolvers co ham getListArticles => return
    getListArticles: async () => {
      const articles = await Article.find({
        deleted: false
      });

      return articles;
    },

    getListCategories: async () => {
      const categories = await Category.find({
        deleted: false
      });

      return categories;
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
      }, article);

      const newRecord = await Article.findOne({
        _id: id
      });

      return newRecord;
    },

    createCategory: async(_, args) => {
        const { category } = args;

        const record = new Category(category);
        await record.save();

        return record;
    },

    deleteCategory: async(_, args) => {
      const { id } = args;
      await Category.updateOne({
        _id: id
      }, {
        deleted: true,
        deletedAt: new Date()
      });

      return "Delete category";
    },

    updateCategory: async(_, args) => {
      const { id, category } = args;
      await Category.updateOne({
        _id: id
      }, category);

      const newRecord = await Category.findOne({
        _id: id
      });

      return newRecord;
    }
  }
}