// import ApolloClient from 'apollo-boost'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import fetch from 'isomorphic-fetch'
import { gql } from 'apollo-boost'

const httpLink = createHttpLink({
  uri: 'https://dev-andersen-andersen.myshopify.com/api/2019-07/graphql',
  // headers: {
  //   'X-Shopify-Storefront-Access-Token': 'c32046ff1022ad412f712aaf3d3432f5',
  //   Accept: 'application/json',
  // },
})

const authLink = setContext((_, { headers }) => {
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      'X-Shopify-Storefront-Access-Token': 'c32046ff1022ad412f712aaf3d3432f5',
      // Accept: 'application/json',
    },
  }
})

const cache = new InMemoryCache()

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  fetch,
})

// export const client = new ApolloClient({
//   uri: 'https://dev-andersen-andersen.myshopify.com/api/2019-07/graphql',
//   headers: {
//     'X-Shopify-Storefront-Access-Token': 'c32046ff1022ad412f712aaf3d3432f5',
//     Accept: 'application/json',
//   },
//   // fetch,
// })

console.log('IM THE CLIENT', client)

client
  .query({
    query: gql`
      {
        shop {
          name
        }
      }
    `,
  })
  .then(res => console.log('res', res))
const query = `query Articles {
  articles(first: 10) {
    edges {
      node {
        blog {
          title
          handle
        }
        handle
        title
        url
        contentHtml
      }
    }
  }
}

`
