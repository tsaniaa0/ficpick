export interface Review {
  id: string;
  user: string;
  rating: number;
  text: string;
  isSpoiler: boolean;
}

export interface AU {
  id: string;
  title: string;
  author: string;
  fandom: string;
  status: string;
  lastChapter: string;
  coverUrl: string;
  hasNSFW: boolean;
  hint: string;
  linkUrl: string;
  contentSnippet: string;
  isFavorite: boolean;
  hasNewUpdate?: boolean;
  rating?: number;
  createdAt?: number;
  reviews?: Review[];
}