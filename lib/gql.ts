import { GraphQLClient } from 'graphql-request';

// On the server (SSR/RSC), use the internal Docker hostname so we don't depend
// on public DNS / TLS resolution from inside the container. On the browser,
// always use the public URL.
const isServer = typeof window === 'undefined';
const publicEndpoint =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/graphql';
const serverEndpoint =
  process.env.INTERNAL_API_URL || publicEndpoint;

export const gql = (token?: string) =>
  new GraphQLClient(isServer ? serverEndpoint : publicEndpoint, {
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
      workingOn { title name proposalId }
    }
  }
`;

export const LOGIN_MUTATION = `
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) { token username }
  }
`;
