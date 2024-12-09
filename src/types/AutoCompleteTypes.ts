export interface Option {
  id: number;
  label: string;
}

export interface CountryResponse {
  name: {
    common: string;
    official: string;
    nativeName?: {
      [key: string]: {
        official: string;
        common: string;
      };
    };
  };
  capital?: string[];
  region: string;
  postalCode?: {
    format: string;
    regex?: string;
  };
}
