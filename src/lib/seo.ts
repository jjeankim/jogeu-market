export interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export const defaultSEO: Required<SEOProps> = {
  title: "Jogeu-Market",
  description: "똑똑한 소비의 시작",
  image: "/images/logo_jogeuMarket.svg",
  url: "https://www.jogeumarket.store/",
};

export const buildSEO = (overrides: SEOProps = {}) => {
  return { ...defaultSEO, ...overrides };
};