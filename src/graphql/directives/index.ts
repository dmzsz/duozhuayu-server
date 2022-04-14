import { upperDirectiveTransformer } from './upper'

export function directives(schema) {
    let graphQLSchema
    graphQLSchema = upperDirectiveTransformer(schema, 'upper')
    return graphQLSchema
}
