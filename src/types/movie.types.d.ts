export interface IMovie {
  id: number;
  _id: string;

  title: string;
  description: string;

  thumbnailUrl: string;

  videoUrl: string;

  trailerKey?: string;

  genre: string;
  duration: string;
  rating: number;
  mood: string;
}

export interface IRecommendedMovie {
  recommendation: IMovie[];
  reason: string;
}
