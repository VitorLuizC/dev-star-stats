import type { GraphQLResolveInfo } from "graphql";

import type { IFieldResolver } from "apollo-server-cloud-functions";
import type IContext from "./IContext";

export type Args = {
  [arg: string]: unknown;
};

export default function createResolver<R, A extends Args = Args>(
  fn: (parameters: {
    args: A;
    info: GraphQLResolveInfo;
    parent: unknown; // TODO: Adicionar tipo correto do parent.
    context: IContext;
  }) => Promise<R> | R,
): IFieldResolver<unknown, IContext> {
  return (parent, variables, context, info): R | Promise<R> =>
    fn({
      info,
      parent,
      context,
      args: variables as A,
    });
}
