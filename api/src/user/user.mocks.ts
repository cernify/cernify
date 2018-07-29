import { MockList } from "apollo-server-express";
import * as faker from "faker";

const __DEFAULT_USER_LIMIT__ = 20;
const __DEFAULT_POST_LIMIT__ = 20;

export const mocks = {
  User: () => ({
    id: faker.random.number(),
    avatar: faker.image.avatar(),
    bio: faker.lorem.paragraphs(),
    email: faker.internet.email(),
    fullName: faker.name.findName(),
    guid: faker.random.uuid(),
    username: faker.internet.userName(),
    posts: (root: any, args: any, context: any, info: any) =>
      new MockList(args.limit || __DEFAULT_POST_LIMIT__),
    drafts: (root: any, args: any, context: any, info: any) =>
      new MockList(args.limit || __DEFAULT_POST_LIMIT__),
    followers: (root: any, args: any, context: any, info: any) =>
      new MockList(args.limit || 3),
    following: (root: any, args: any, context: any, info: any) =>
      new MockList(args.limit || 3)
  }),
  Query: () => ({
    users: (root: any, args: any, context: any, info: any) =>
      new MockList(args.limit || __DEFAULT_USER_LIMIT__)
  })
};
