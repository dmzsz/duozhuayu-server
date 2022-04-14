
import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils'
import { defaultFieldResolver, GraphQLSchema, GraphQLString } from 'graphql'
import { AuthenticationError } from 'apollo-server-core'

export function formattableDateDirectiveTransformer(
    schema: GraphQLSchema,
    directiveName: string
) {
    const typeDirectiveArgumentMaps: Record<string, any> = {}
    return mapSchema(schema, {
        [MapperKind.TYPE]: type => {
            const authDirective = getDirective(schema, type, directiveName)?.[0]
            if (authDirective) {
                typeDirectiveArgumentMaps[type.name] = authDirective
            }
            return undefined
        },
        [MapperKind.OBJECT_FIELD]: (fieldConfig, _fieldName, typeName) => {
            const authDirective =
                getDirective(schema, fieldConfig, directiveName)?.[0] ?? typeDirectiveArgumentMaps[typeName]
            if (authDirective) {
                const { requires } = authDirective
                if (requires) {
                    const { resolve = defaultFieldResolver } = fieldConfig
                    fieldConfig.resolve = function (source, args, context, info) {
                        const user = context.req.user
                        if (!user.hasRole(requires)) {
                            throw new AuthenticationError('not authorized')
                        }
                        return resolve(source, args, context, info)
                    }
                    return fieldConfig
                }
            }
        }
    })
}