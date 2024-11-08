import axios from "axios";

export const fetchAnilist = axios.create({
    baseURL: "https://graphql.anilist.co",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
});

export const isNumber = (arg: string): boolean => {
    const regex = /^(0|[1-9]\d*)$/;
    return regex.test(arg);
}

export const formatStatus = (status: string): string => {
    switch (status) {
        case "RELEASING":
            return "Releasing";
        case "FINISHED":
            return "Finished";
        case "CANCELLED":
            return "Cancelled";
        case "NOT_YET_RELEASED":
            return "Not Yet Released";
        default:
            return "Unknown";
    }
}

export const formatRating = (rating: number): number | null => {
    return rating ? rating / 10 : rating
}

export const getNextSeasonAndYear = (): { season: string, year: number } => {
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    let season: string;
    let year: number;

    switch (true) {
        case (currentMonth === 12 || currentMonth <= 2):
            season = "SPRING";
            year = currentYear + 1;
            break;
        case (currentMonth >= 3 && currentMonth <= 5):
            season = "SUMMER";
            year = currentYear;
            break;
        case (currentMonth >= 6 && currentMonth <= 8):
            season = "FALL";
            year = currentYear;
            break;
        case (currentMonth >= 9 && currentMonth <= 11):
            season = "WINTER";
            year = currentYear + 1;
            break;
        default:
            season = "UNKNOWN";
            year = currentYear;
    }

    return { season, year }
}