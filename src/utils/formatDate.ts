export const formatDate = (date: string) => {
    const toFormatDate = new Date(date);
    const formattedDate = toFormatDate.toISOString().split("T")[0]
    return formattedDate;
}