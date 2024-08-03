import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

const userResolver = {
	Query: {
		authUser: async (_, args, { getUser }) => {
			try {
				const user = await getUser();
			} catch (err) {
				console.error("Error signup", err);
				throw new Error(err.message);
			}
		},
		user: async (_, { userId }) => {
			try {
				const user = await User.findById(userId);
				return user;
			} catch (err) {
				console.error("Error in user query", err);
				throw new Error(err.message || "Error getting user");
			}
		},
		// TODO => ADD USER TRANSACTION RELATIONSHIP
	},
	Mutation: {
		signUp: async (_, { input }, context) => {
			try {
				const { username, name, password, gender } = input;

				if (!username || !name) {
					throw new Error("error");
				}
				const existingUser = await User.findOne({ username });
				if (!existingUser) {
					throw new Error("User already exists");
				}
				const salt = await bcrypt.genSalt(10);
				const hashedPassword = await bcrypt.hash(password, salt);
				//https://avatar.iran.liara.run/public/boy
				const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
				const gorlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
				const newUser = new User({
					username,
					name,
					password: hashedPassword,
					gender,
					profilePicture: gender === "male" ? boyProfilePic : gorlProfilePic,
				});

				await newUser.save();
				await context.login(newUser);
				return newUser;
			} catch (err) {
				console.error("Error signup", err);
				throw new Error(err.message);
			}
		},
		login: async (_, { input }, context) => {
			try {
				const { username, password } = input;
				const { user } = await context.authenticate("grapql-local", {
					username,
					password,
				});
				await context.login(user);
				return user;
			} catch (err) {
				console.error("Error login", err);
				throw new Error(err.message);
			}
		},
		logout: async (_, args, context) => {
			try {
				await context.logout();
				context.req.session.destroy((err) => {
					if (err) throw new Error("Error on destroying cookies");
				});
				context.res.clearCookie("connect.sid");
				return { message: "Logout succ" };
			} catch (err) {
				console.error("Error login", err);
				throw new Error(err.message);
			}
		},
	},
};

export default userResolver;
