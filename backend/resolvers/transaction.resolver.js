import Transaction from "../models/transaction.model.js";

const transactionResolver = {
	Query: {
		transactions: async (_, args, context) => {
			try {
				if (!context.getUser()) throw new Error("Unauth");
				const userId = await context.getUser()._id;

				const transaction = await Transaction.find({ user: userId });
				return transaction;
			} catch (error) {
				console.error("Getting error tran", error);
				throw new Error("Transaction error");
			}
		},
		transaction: async (_, { transactionId }) => {
			try {
				if (!context.getUser()) throw new Error("Unauth");

				const transaction = await Transaction.findById(transactionId);
				return transaction;
			} catch (error) {
				console.error("Getting error tran by ID", error);
				throw new Error("Transaction error");
			}
		},
		// TODO => ADD categoryStatistics query
	},
	Mutation: {
		createTransaction: async (parent, { input }, context) => {
			try {
				if (!context.getUser()) throw new Error("Unauth");

				const newTransaction = new Transaction({
					...input,
					userId: context.getUser()._id,
				});
				await newTransaction.save();
				return newTransaction;
			} catch (error) {
				console.error("Create tran error", error);
				throw new Error("Create Transaction error");
			}
		},
		updateTransaction: async (parent, { input }, context) => {
			try {
				if (!context.getUser()) throw new Error("Unauth");

				const updateTransaction = await Transaction.findByIdAndUpdate(
					input.transactionId,
					input,
					{ new: true }
				);
				return updateTransaction;
			} catch (error) {
				console.error("Update tran error", error);
				throw new Error("Update Transaction error");
			}
		},
		deleteTransaction: async (_, { transactionId }, context) => {
			try {
				if (!context.getUser()) throw new Error("Unauth");

				const deleteTransaction = await Transaction.findByIdAndDelete(
					transactionId
				);
				return deleteTransaction;
			} catch (error) {
				console.error("Delete tran error", error);
				throw new Error("Transaction error");
			}
		},
	},
	// TODO: add all tran
};

export default transactionResolver;
