export interface IPagination {
    currentPage: number;
    hasNextPage: boolean;
}

export interface IBase {
    id: number;
    title: string;
    cover: string;
    status: string;
    format: string;
    season: string;
    year: number | null;
    rating: number | null;
    episodes: number;
    genres: string[];
}

export interface IInfo extends IBase {
    synopsis: string;
    nsfw: boolean;
    trailer: string | null;
    studio: string | null;
    recommendations: IBase[] | null;
}