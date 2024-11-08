export const TrendingQuery = (page: number, per: number) => `
query {
    Page(page: ${page}, perPage: ${per}) {
        pageInfo {
            currentPage
            hasNextPage
        }
        media(type: ANIME, sort: TRENDING_DESC) {
            id
            title {
                romaji
            }
            coverImage {
                extraLarge
            }
            status
            format
            season
            seasonYear
            averageScore
            episodes
            genres
        }
    }
}`;

export const PopularQuery = (page: number, per: number) => `
query {
    Page(page: ${page}, perPage: ${per}) {
        pageInfo {
            currentPage
            hasNextPage
        }
        media(type: ANIME, sort: POPULARITY_DESC) {
            id
            title {
                romaji
            }
            coverImage {
                extraLarge
            }
            status
            format
            season
            seasonYear
            averageScore
            episodes
            genres
        }
    }
}`;

export const UpcomingQuery = (page: number, per: number, season: string, year: number) => `
query {
    Page(page: ${page}, perPage: ${per}) {
        pageInfo {
            currentPage
            hasNextPage
        }
        media(type: ANIME, sort: POPULARITY_DESC, season: ${season}, seasonYear: ${year}) {
            id
            title {
                romaji
            }
            coverImage {
                extraLarge
            }
            status
            format
            season
            seasonYear
            averageScore
            episodes
            genres
        }
    }
}`;