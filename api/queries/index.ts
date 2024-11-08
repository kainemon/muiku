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
            averageScore
            episodes
            genres
        }
    }
}`;