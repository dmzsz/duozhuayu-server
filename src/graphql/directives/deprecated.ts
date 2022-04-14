
import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils'
import { defaultFieldResolver, GraphQLSchema } from 'graphql'

export function deprecatedDirectiveTransformer(
    schema: GraphQLSchema,
    directiveName: string,
) {
    return mapSchema(schema, {
        [MapperKind.OBJECT_FIELD]: fieldConfig => {
            const deprecatedDirective = getDirective(schema, fieldConfig, directiveName)?.[0]
            if (deprecatedDirective) {
                fieldConfig.deprecationReason = deprecatedDirective['reason']
                return fieldConfig
            }
        },
        [MapperKind.ENUM_VALUE]: enumValueConfig => {
            const deprecatedDirective = getDirective(schema, enumValueConfig, directiveName)?.[0]
            if (deprecatedDirective) {
                enumValueConfig.deprecationReason = deprecatedDirective['reason']
                return enumValueConfig
            }
        }
    })
}