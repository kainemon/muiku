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