export const doesDataNeedRefresh = (
    dateInMilliseconds?: number | string | null
) => {
    if (dateInMilliseconds) {
        const lastUpdated = Number(dateInMilliseconds);
        const diffTime = Math.abs(Date.now() - lastUpdated);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 1;
    }
    return true;
};
