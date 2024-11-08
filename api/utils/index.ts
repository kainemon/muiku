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