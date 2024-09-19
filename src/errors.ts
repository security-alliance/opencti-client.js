import { GraphQLFormattedError } from "graphql";

export class GraphQLError {
    public readonly operation: string;
    public readonly errors: readonly GraphQLFormattedError[];

    constructor(operation: string, errors: readonly GraphQLFormattedError[]) {
        this.operation = operation;
        this.errors = errors;
    }
}
