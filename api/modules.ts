import type { IBase, IPagination } from "./types";
import {
    TrendingQuery,
    PopularQuery,
    UpcomingQuery
} from "./queries";
import {
    fetchAnilist,
    formatStatus,
    formatFormat,
    formatSeason,
    formatRating,
    getNextSeasonAndYear
} from "./utils";
import ErrorHandler from "./handlers/errorHandler";

const getPagination = (data: any): IPagination => {
    return {
        currentPage: data.data.Page.pageInfo.currentPage,
        hasNextPage: data.data.Page.pageInfo.hasNextPage
    }
}

const getMedia = (data: any): IBase => {
    return {
        id: data.id,
        title: data.title.romaji,
        cover: data.coverImage.extraLarge,
        status: formatStatus(data.status),
        format: formatFormat(data.format),
        season: formatSeason(data.season),
        year: data.seasonYear,
        rating: formatRating(data.averageScore),
        episodes: data.episodes,
        genres: data.genres
    }
}

export const getTrending = async (page: number, per: number) => {
    try {
        const query = TrendingQuery(page, per);
        const { data } = await fetchAnilist.post("", { query });
        const pagination: IPagination = getPagination(data);
        const result: IBase[] = data.data.Page.media.map(getMedia);
        return { pagination, result }
    } catch (error) {
        if (error instanceof Error)
            console.error(error.stack);
        throw new ErrorHandler(500, "Internal Server Error");
    }
}

export const getPopular = async (page: number, per: number) => {
    try {
        const query = PopularQuery(page, per);
        const { data } = await fetchAnilist.post("", { query });
        const pagination: IPagination = getPagination(data);
        const result: IBase[] = data.data.Page.media.map(getMedia);
        return { pagination, result }
    } catch (error) {
        if (error instanceof Error)
            console.error(error.stack);
        throw new ErrorHandler(500, "Internal Server Error");
    }
}

export const getUpcoming = async (page: number, per: number) => {
    try {
        const { season, year } = getNextSeasonAndYear();
        const query = UpcomingQuery(page, per, season, year);
        const { data } = await fetchAnilist.post("", { query });
        const pagination: IPagination = getPagination(data);
        const result: IBase[] = data.data.Page.media.map(getMedia);
        return { pagination, result }
    } catch (error) {
        if (error instanceof Error)
            console.error(error.stack);
        throw new ErrorHandler(500, "Internal Server Error");
    }
}