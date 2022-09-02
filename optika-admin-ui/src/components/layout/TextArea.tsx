import React from 'react';
import { Form, TextArea } from 'semantic-ui-react';
import { FieldRenderProps } from 'react-final-form';
import styled from 'styled-components';
import _ from 'lodash';

export const TextAreaSc = styled(TextArea)`
  width: 100%;
`;

interface ExtendedFieldRenderProps extends FieldRenderProps {
    rows?: number
}

const FinalFormTextArea = (props: ExtendedFieldRenderProps) => {

    const {
        input,
        meta: {touched, error},
        rows = 5,
        ...restProps
    } = props;

    return (
        <Form.Field>
            <div className="ui form">
                <TextAreaSc
                    {...input}
                    {..._.omit(restProps, ["fluid"])}
                    rows={rows}
                />
            </div>
        </Form.Field>
    )

};

export default FinalFormTextArea;
