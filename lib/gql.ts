import { GraphQLClient } from 'graphql-request';

const endpoint =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.API_URL ||
  'http://localhost:4000/graphql';

export const gql = (token?: string) =>
  new GraphQLClient(endpoint, {
    credentials: 'include',
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });

export const PROJECTS_QUERY = `
  query Projects($locale: String!) {
    projects(locale: $locale, includeHidden: false) {
      id slug order featured color
      i18n { name tagline description longDescription }
      repos { type url label isPublic }
      links { web playStore appStore }
      isMobile tech
      screenshots { url caption }
      thumbnail year visible
    }
  }
`;

export const SITE_QUERY = `
  query Site($locale: String!) {
    siteConfig(locale: $locale) {
      profile { name role bio }
      social { github linkedin youtube email }
      avatar
    }
  }
`;

export const LOGIN_MUTATION = `
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) { token username }
  }
`;
