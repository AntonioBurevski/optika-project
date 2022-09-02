import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { Form, Input } from 'semantic-ui-react';
import styled from 'styled-components';

export const StyledInput = styled(Input)`

  &.ui.input > input {
    padding: 5px 5px;
    max-height: 29px;
    min-height: 29px;
  }

  &.ui.mini.input > input {
    font-size: 1rem;
  }
`;

interface ExtendedFieldRenderProps extends FieldRenderProps {
    autoComplete?: "on" | "off" | "nope",
    className?: string,
    hiddenInput?: boolean,
    onPaste?: (evt: any) => void,
    onDrop?: (evt: any) => void,
}

const FinalFormInput = (props: ExtendedFieldRenderProps) => {

    const {
        input,
        meta: {touched, error},
        autoComplete = "nope",
        hiddenInput,
        ...restProps
    } = props;

    return (
        <Form.Field>
            <StyledInput error={!!(touched && error)}
                         className={props.className}
                         {...input}
                         {...restProps}
                         autoComplete={autoComplete}
                         size="mini"
            />
        </Form.Field>
    );
};

export default FinalFormInput;
