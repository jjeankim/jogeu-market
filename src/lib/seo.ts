export interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export const defaultSEO: Required<SEOProps> = {
  title: "Jogeu-Market",
  description: "똑똑한 소비의 시작",
  image: "",
  url: "",
};

export const buildSEO = (overrides: SEOProps = {}) => {
  return { ...defaultSEO, ...overrides };
};