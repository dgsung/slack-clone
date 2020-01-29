export default {
  Mutation: {
    createMessage: async (parent, args, { models, user }) => {
      try {
        models.message.create({ ...args, userId: user.id });
        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    }
  }
};
