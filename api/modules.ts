import type { IBase, IInfo, IPagination } from "./types";
import {
    TrendingQuery,
    PopularQuery,
    UpcomingQuery,
    InfoQuery
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

const getMediaList = (data: any[]): IBase[] => {
    return data.map((i, index): IBase => ({
        id: i.id,
        title: i.title.romaji,
        cover: i.coverImage.extraLarge,
        status: formatStatus(i.status),
        format: formatFormat(i.format),
        season: formatSeason(i.season),
        year: i.seasonYear,
        rating: formatRating(i.averageScore),
        episodes: i.episodes,
        genres: i.genres
    }));
}

const getMediaRecommendationsList = (data: any[]): IBase[] => {
    return data.map((i, index): IBase => ({
        id: i.mediaRecommendation.id,
        title: i.mediaRecommendation.title.romaji,
        cover: i.mediaRecommendation.coverImage.extraLarge,
        status: formatStatus(i.mediaRecommendation.status),
        format: formatFormat(i.mediaRecommendation.format),
        season: formatSeason(i.mediaRecommendation.season),
        year: i.mediaRecommendation.seasonYear,
        rating: formatRating(i.mediaRecommendation.averageScore),
        episodes: i.mediaRecommendation.episodes,
        genres: i.mediaRecommendation.genres
    }));
}

const getMedia = (data: any): IInfo => {
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
        genres: data.genres,
        synopsis: data.description,
        nsfw: data.isAdult,
        trailer: data.trailer ? `https://youtu.be/${data.trailer.id}` : null,
        studio: data.studios.nodes.length > 0
            ? data.studios.nodes[0].name : null,
        recommendations: data.recommendations.nodes.length > 0
            ? getMediaRecommendationsList(data.recommendations.nodes) : null
    }
}

export const getTrending = async (page: number, per: number) => {
    try {
        const query = TrendingQuery(page, per);
        const { data } = await fetchAnilist.post("", { query });
        const pagination: IPagination = getPagination(data);
        const result: IBase[] = getMediaList(data.data.Page.media);
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
        const result: IBase[] = getMediaList(data.data.Page.media);
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
        const result: IBase[] = getMediaList(data.data.Page.media);
        return { pagination, result }
    } catch (error) {
        if (error instanceof Error)
            console.error(error.stack);
        throw new ErrorHandler(500, "Internal Server Error");
    }
}

export const getInfo = async (id: number) => {
    try {
        const query = InfoQuery(id);
        const { data } = await fetchAnilist.post("", { query });
        const result: IInfo = getMedia(data.data.Media);
        return result
    } catch (error) {
        if (error instanceof Error)
            console.error(error.stack);
        throw new ErrorHandler(500, "Internal Server Error");
    }
}