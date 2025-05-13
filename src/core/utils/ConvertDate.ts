import moment from "moment";
import "moment/locale/es";

export const formatDateShow = (date?: string | Date | null) => {
    if (!date) return "";
    return moment(date instanceof Date ? date.toISOString() : date).format("DD-MM-YYYY");
};
export const formatDateSave = (date?: string | Date | null) => {
    if (!date) return "";
    return moment(date instanceof Date ? date.toISOString() : date, "DD-MM-YYYY").format("YYYY-MM-DD");
};
export const isActionValid = (date: string | Date | null): boolean => {
    if (!date) return false;

    const FORMAT = "DD-MM-YYYY";
    const formattedDate = moment(date, FORMAT, true).startOf("day");
    const tomorrow = moment().add(1, "days").startOf("day");

    return formattedDate.isSameOrAfter(tomorrow);
};

export const defaultMonthAndYear = () => {
    const today = new Date();
    const defaultMonth = today.getMonth() === 0 ? 11 : today.getMonth() -1;
    const defaultYear = today.getMonth() === 0 ? today.getFullYear() - 1 : today.getFullYear();

    return { defaultMonth, defaultYear };
}

export const getFirstDayOfMonth = (mes: number): string => {
    const now = new Date();
    const year = now.getFullYear();
    const date = new Date(year, mes - 1, 1);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `${day}-${month}-${year}`;
};

export const getMonthDefault = () => {
    const today = new Date();
    return today.getMonth() === 0 ? 10 : today.getMonth() - 1;
}

export const getYearDefault = () => {
    const today = new Date();
    return today.getMonth() === 0 ? today.getFullYear() - 1 : today.getFullYear();
}