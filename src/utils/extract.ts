export const extractIdFromActionUrl = (url: string) => {
    return url.match(/\/([A-Za-z0-9]*)\.html/)[1]
}