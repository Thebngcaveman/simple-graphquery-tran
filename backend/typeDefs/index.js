import { mergeTypeDefs } from "@graphql-tools/merge";

import userTypeDef from "./user.typeDef.js";
import transactionTypeDef from "./transaction.typeDef.js";

const mergedTypes = mergeTypeDefs([userTypeDef, transactionTypeDef]);

export default mergedTypes;
