// import {
// 	SchemaDirectiveVisitor,
// 	AuthenticationError
// } from 'apollo-server-core'
// import { defaultFieldResolver, GraphQLField } from 'graphql'

// class AuthDirective extends SchemaDirectiveVisitor {
// 	visitFieldDefinition(field: GraphQLField<any, any>) {
// 		const { resolve = defaultFieldResolver } = field

// 		field.resolve = function (...args) {
// 			const { currentCustomer } = args[2]

// 			if (!currentCustomer) {
// 				throw new AuthenticationError(
// 					'Authentication token is invalid, please try again.'
// 				)
// 			}

// 			return resolve.apply(this, args)
// 		}
// 	}
// }

// export default AuthDirective
