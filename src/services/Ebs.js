import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

import { BipQuery } from './graphql'

const httpLink = createHttpLink({
  uri: 'https://guzman.codes/api',
})

export const initClient = (token) => {
  const authLink = setContext((_, { headers }) => ({
    headers: {
      ...headers,
      'x-extension-jwt': token,
    },
  }))

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  })
}

export const queryPanelInformation = (client) => {
  const response = client
    .query({ query: BipQuery })

  return response;
}
