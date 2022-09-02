import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { Checkbox, CheckboxProps } from 'semantic-ui-react';
import styled from 'styled-components';

export const CheckboxSc = styled(Checkbox)`
  margin: 5px;
  margin-left: 0;

  &.ui.checkbox label,
  &.ui.checkbox+label {
    padding-left: 1.65714em;
  }

  &.ui.toggle.checkbox .box,
  &.ui.toggle.checkbox label {
    padding-left: 4.2rem;
  }
`;

interface CheckBoxProps extends FieldRenderProps {
    disabled?: boolean;
    disabledWhenFalse?: boolean;
    toggle?: boolean;
    label?: String;
}

const FinalFormCheckbox = (
    {
        input,
        disabledWhenFalse,
        disabled,
        ...restProps
    }: CheckBoxProps
) => {

    return (
        <CheckboxSc
            label={restProps.label}
            toggle={restProps.toggle}
            checked={!!input.value}
            disabled={disabledWhenFalse && !input.value || disabled}
            {...input}
            {...restProps}
            onChange={(param : React.FormEvent<HTMLInputElement>, data: CheckboxProps) => input.onChange(data.checked)}
            value={(!!input.value) ? 'true' : 'false'}
        />
    );
};

export default FinalFormCheckbox;
