interface Id {
  id: string;
}

export interface MovieType extends Id {
  type: 'movie' | 'misc';
}

export interface ShowType extends Id {
  type: 'tv';
  season: number;
  epiStart: number;
  epiEnd: number;
}

export type MediaType = MovieType | ShowType;
