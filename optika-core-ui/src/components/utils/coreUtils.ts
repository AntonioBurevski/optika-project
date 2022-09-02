import {useLayoutEffect, useState} from "react";

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

export const noop = () => {
};

export const keyCodes: any = {
    enter: 13,
    delete: 46,
    pageUp: 33,
    pageDown: 34,
    arrowUp: 38,
    arrowDown: 40
};

const _isKey = (event: any, keyCode: any) => function () {
    return event.keyCode === keyCode
};

export const isKeyCheck = (event: any) => {
    const check = {};
    for (let [keyName, keyCode] of Object.entries(keyCodes)) {
        Object.defineProperty(
            check, keyName, {get: _isKey(event, keyCode)});
    }
    return check;
};

export function useAfterFirstRender(func: any) {
    const [retFunc, setFunct] = useState(() => ()=>{});
    useLayoutEffect(() => {
        setFunct(() => func);
    }, []);
    return retFunc;
}

export interface DropdownOption {
    key: string | number,
    text: string | number,
    value: any
}
