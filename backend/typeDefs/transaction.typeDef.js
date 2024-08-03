const transactionTypeDef = `#graphql
    type Transaction{
        _id: ID!
        userId: ID!
        description: String!
        paymentType: String!
        category: String!
        date: String!
        amount: Float!
        location: String
    }

    type Query{
        transactions: [Transaction!]
        Transaction(transactionId:ID!): Transaction
    }

    type Mutation{
        createTransaction(input: CreateTransactionInput!): Transaction!
        updateTransaction(input: UpdateTransactionInput!): Transaction!
        deleteTransaction(transactionId:ID!):Transaction!
    }

    input CreateTransactionInput{
        description: String!
        paymentType: String!
        category: String!
        date: String!
        amount: Float!
        location: String
    }

    input UpdateTransactionInput{
        description: String
        paymentType: String
        category: String
        date: String
        amount: Float
        location: String
    }
`;

export default transactionTypeDef;
