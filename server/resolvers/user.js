import bcrypt from "bcrypt";
import _ from "lodash";

const formatErrors = (e, models) => {
  if (e instanceof models.Sequelize.ValidationError) {
    return e.errors.map(x => _.pick(x, ["path", "message"]));
  }
  return [{ path: "name", message: " something went wrong" }];
};

export default {
  Query: {
    getUser: (parent, { id }, { models }) =>
      models.user.findOne({ where: { id } }),
    allUsers: (parent, args, { models }) => models.user.findAll()
  },
  Mutation: {
    register: async (parent, { password, ...otherArgs }, { models }) => {
      try {
        if (password.length < 5 || password.length > 100) {
          return {
            ok: false,
            errors: [
              {
                path: "password",
                message:
                  "The password needs to be between 5 to 100 characters long"
              }
            ]
          };
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await models.user.create({
          password: hashedPassword,
          ...otherArgs
        });
        return {
          ok: true,
          user
        };
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models)
        };
      }
    }
  }
};
