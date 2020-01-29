export default {
  Mutation: {
    createChannel: (parent, args, { models }) => {
      try {
        models.channel.create(args);
        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    }
  }
};
