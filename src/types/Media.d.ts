interface Id {
  id: string;
  theme?: {
    title?: string;
  };
}

export interface MovieType extends Id {
  type: 'movie' | 'short' | 'special';
}

export interface ShowType extends Id {
  type: 'tv';
  season: number;
  epiStart: number;
  epiEnd: number;
}

export type MediaType = MovieType | ShowType;
export type MediaUiType = 'movie' | 'show' | 'short' | 'special';
