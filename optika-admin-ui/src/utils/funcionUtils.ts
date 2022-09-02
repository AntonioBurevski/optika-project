import moment, { Moment } from 'moment';

export const noop = () => {
};

export const isNull = (value: any) => (value === null);

export const  isNotNull = (value: any) => (!isNull(value));

export const isValueValidNumber = (value: string | number): boolean => +value === +value && !value.toString().includes("e");

export const composeValidators = (...validators: any) => (value: any) =>
    validators.reduce((error: any, validator: any) => error || validator(value), undefined);

export const mustBePositiveNumber = (value: any) => {

    if (+value < 0) {
        return "Must be a positive number"
    }
    return undefined;
};

export const mustBeLowerThan = (value: any, value2: any) => {

    if (value > value2) {
        return "Must be a lower value"
    }
    return undefined;
};

export const required = (value: any) => {
    if (typeof value === "string") {
        return value.trim() !== "" ? undefined : "Required";
    } else if (typeof value === "number") {
        return undefined;
    } else if (Array.isArray(value) && !value.length) {
        return "Required";
    } else {
        return value ? undefined : "Required";
    }
};

export const mustBeNumber = (value: any) => {

    if (value) {
        if (!isValueValidNumber(value)) {
            return "Must be a valid number";
        }
    }

    return undefined;
};

export interface DropdownOption {
    key: string | number,
    text: string | number,
    value: any
}