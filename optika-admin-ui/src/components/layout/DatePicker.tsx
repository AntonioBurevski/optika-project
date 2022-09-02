import moment from 'moment';
import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';

import 'react-day-picker/lib/style.css';
import { FieldRenderProps } from 'react-final-form';
import { Form } from 'semantic-ui-react';
import styled from 'styled-components';
import {fromIsoDateString} from "../../utils/dateUtils";

const DayPickerInputStyled = styled(Form.Field)`

  & .DayPickerInput {
    width: 100%;
  }

  & .DayPickerInput-OverlayWrapper .DayPickerInput-Overlay {
    z-index: 99999;
  }
`;

interface DatePickerFieldProps extends FieldRenderProps {
    fieldClassName?: string;
    disabledBefore?: Date;
    disabledAfter?: Date;
    disabled?: boolean;
    emptyDateInput?: boolean;
}

const semanticUiInput = (hasError?: boolean, disabled?: boolean): object => {

    let errorStyle: object = {};
    if (hasError) {
        errorStyle = {
            backgroundColor: "#fff6f6",
            borderColor: "#e0b4b4",
            color: "#9f3a38"
        };
    }

    return {
        style: {
            maxHeight: "30px",
            minHeight: "30px",
            margin: 0,
            maxWidth: '100%',
            flex: '1 0 auto',
            outline: 0,
            WebkitTapHighlightColor: 'rgba(255,255,255,0)',
            textAlign: 'left',
            lineHeight: '1.21428571em',
            fontFamily: "Lato,'Helvetica Neue',Arial,Helvetica,sans-serif",
            padding: '5px',
            background: '#fff',
            border: '1px solid rgba(34,36,38,.15)',
            color: disabled ? 'rgba(0,0,0,.39)' : 'rgba(0,0,0,.87)',
            borderRadius: '.28571429rem',
            WebkitTransition: 'border-color .1s ease,-webkit-box-shadow .1s ease',
            transition: 'box-shadow .1s ease,border-color .1s ease',
            boxShadow: 'none',
            width: '100%',
            ...errorStyle
        }
    }
};

const FORMATS = ['DD.MM.YYYY', 'DDMMYYYY'];
const DEFAULT_FORMAT = FORMATS[0];

interface DateArgs {
    formats: string,
    locale: string
}

function getDateArgs(format?: string, locale?: string): DateArgs {
    return {
        formats: format !== undefined ? format : 'L',
        locale: locale !== undefined ? locale : 'de'
    }
}

function formatDate(date: Date, format?: string, locale?: string) {
    const dateArgs = getDateArgs(format, locale);
    return moment(date).locale(dateArgs.locale).format(dateArgs.formats[0]);
}

function parseDate(str: string, format?: string, locale?: string) {

    const dateArgs = getDateArgs(format, locale);

    for (let format of dateArgs.formats) {
        const m = moment(str, format, dateArgs.locale, true);

        if (m.isValid()) {
            return m.toDate();
        }
    }
    return undefined;
}

const FinalFormDatePicker = (props: DatePickerFieldProps) => {

    const {
        input,
        meta: {
            error,
            touched
        },
        disabled,
        disabledBefore,
        disabledAfter,
        emptyDateInput,
        ...restProps
    } = props;

    let modifiers: any = {
        selected: input.value ? fromIsoDateString(input.value)!.toDate() : null
    };

    if (disabledBefore || disabledAfter) {
        modifiers.disabled = [
            {
                before: disabledBefore,
                after: disabledAfter
            }
        ]
    }

    return <DayPickerInputStyled className={props.fieldClassName}>
        <DayPickerInput
            placeholder={`e.x. ${moment("1985-06-25").format(DEFAULT_FORMAT)}`}
            formatDate={formatDate}
            format={FORMATS}
            {...input}
            parseDate={parseDate}
            value={input.value ? fromIsoDateString(input.value)!.toDate() : ""}
            dayPickerProps={{
                modifiers: modifiers,
                firstDayOfWeek: 1
            }}
            onDayChange={(day: moment.MomentInput) => {
                input.onChange(day
                    ? moment(day).format("YYYY-MM-DD")
                    : (emptyDateInput ? "" : input.value))
            }}
            {...restProps}
            inputProps={{...semanticUiInput(!!(touched && error), disabled), disabled: disabled}}
        />
    </DayPickerInputStyled>;
};

export default FinalFormDatePicker;
