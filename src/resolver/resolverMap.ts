import { IResolvers } from 'graphql-tools';
import { User } from '../model/User';
import * as ResolverFunctions from './resolver'

const resolverMap: IResolvers = {
    Query: {
        user(_: void, args: { username: string }): User {
            return ResolverFunctions.getUser(args.username);
        },
        mostSearched(_: void, args: { limit: number }): User[] {
            return ResolverFunctions.getMostSearched(args.limit);
        }
    },
    Mutation: {
        mostPopular(_: void) {
            ResolverFunctions.resetSearchedCounters();
            return true
        }
    }
};

export default resolverMap
