
import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils'
import { defaultFieldResolver, GraphQLSchema, GraphQLString } from 'graphql'
import formatDate from 'dateformat'

export function formattableDateDirectiveTransformer(
    schema: GraphQLSchema,
    directiveName: string
) {
    return mapSchema(schema, {
        [MapperKind.OBJECT_FIELD]: fieldConfig => {
            const dateDirective = getDirective(schema, fieldConfig, directiveName)?.[0]
            if (dateDirective) {
                const { resolve = defaultFieldResolver } = fieldConfig
                const { defaultFormat } = dateDirective

                if (!fieldConfig.args) {
                    throw new Error('Unexpected Error. args should be defined.')
                }

                fieldConfig.args['format'] = {
                    type: GraphQLString
                }

                fieldConfig.type = GraphQLString
                fieldConfig.resolve = async (source, { format, ...args }, context, info) => {
                    const date = await resolve(source, args, context, info)
                    return formatDate(date, format || defaultFormat, true)
                }
                return fieldConfig
            }
        }
    })
}