export type Repo = { type: string; url: string; label?: string; isPublic: boolean };
export type Links = { web?: string; playStore?: string; appStore?: string };
export type Screenshot = { url: string; caption?: string };

export type Project = {
  id: string;
  slug: string;
  order: number;
  featured: boolean;
  color: string;
  i18n: { name: string; tagline: string; description: string; longDescription: string };
  repos: Repo[];
  links: Links;
  isMobile: boolean;
  tech: string[];
  screenshots: Screenshot[];
  thumbnail?: string;
  year?: number;
  visible: boolean;
};

export type SiteConfig = {
  profile: { name: string; role: string; bio: string };
  social: { github?: string; linkedin?: string; youtube?: string; email?: string };
  avatar?: string;
};
