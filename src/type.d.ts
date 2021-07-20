type Resolver = (root: any, arg: [any], cxt: any, info: any) => {};

export type Resolvers = {
  [key: String]: {
    [key: String]: Resolver;
  };
};
