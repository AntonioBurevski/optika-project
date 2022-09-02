import moment, {Moment} from "moment";

const TIME_REGEX = "^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9]$";

export const fromIsoDateString = (isoDate?: string): Moment | undefined => {
    if (!isoDate) {
        return undefined;
    }

    return moment(isoDate, "YYYY-MM-DD");
};

export const timeInputFormat = (value: any) => {
    if (moment(value, "H:mm").isValid()) {
        return moment(value, "H:mm").format('HH:mm');
    } else {
        return moment().format('HH:mm');
    }
};

export const timeFormatOnFocus = (value: any) => {
    if (value === "Invalid date") {
        return "";
    }
};

export const timeValidator = (value: string): string | undefined => {

    if (value) {
        return value.match(TIME_REGEX) ? undefined : "Required";
    }

    return undefined;
};