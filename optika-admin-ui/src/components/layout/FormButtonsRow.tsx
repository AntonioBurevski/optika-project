import React from "react"
import styled from 'styled-components';

const FormButtonsRowSc = styled.div`
  flex: 0 0 auto;
  margin: 2rem 0 0;

  & .button {
      margin-left: 5px;
  }
  & .button:first-child {
     margin-left: 0;
  }
`;

interface DivWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
    // [key: string]: any
}

export class FormButtonsRow extends React.Component<DivWrapperProps> {
    render() {
        const {children, ...rest} = this.props;
        return <FormButtonsRowSc {...rest}>
            {children}
        </FormButtonsRowSc>;
    }
}

export default FormButtonsRow;
