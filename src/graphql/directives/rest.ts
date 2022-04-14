
import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils'
import { defaultFieldResolver, GraphQLSchema } from 'graphql'
import fetch from 'node-fetch'

export function deprecatedDirectiveTransformer(
    schema: GraphQLSchema,
    directiveName: string,
) {
    return mapSchema(schema, {
        [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
            const restDirective = getDirective(schema, fieldConfig, directiveName)?.[0]
            if (restDirective) {
                const { url } = restDirective
                fieldConfig.resolve = () => fetch(url)
                return fieldConfig
            }
        }
    })
}