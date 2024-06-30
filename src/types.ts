export type TFilm = {
    id: number;
    name: string;
    year: number;
    rating: {
        kp: number;
    };
    poster: {
        url: string;
        previewUrl: string;
    };
};

export type TCard = TFilm & {
    description: string;
    genres: Array<{}>;
};

export type TGenres = {
    name: string;
    slug: string;
};
