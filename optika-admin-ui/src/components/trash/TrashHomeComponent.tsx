import React, {Component} from "react";
import styled from "styled-components";
import GoToProductsTrash from "../layout/routes/home-routes/GoToProductsTrash";
import GoToHotDealsTrash from "../layout/routes/home-routes/GoToHotDealsTrash";
import GoToArchiveTrash from "../layout/routes/home-routes/GoToArchiveTrash";
import {Icon} from "semantic-ui-react";
import GoToCustomerContactTrash from "../layout/routes/home-routes/GoToCustomerContactTrash";

const StyledDiv = styled.div`
  padding-top: 10rem;
}
`;

const FieldDiv = styled.div`
  padding-right: 2rem;  
}
`;

const StyledSpan = styled.span`
  display: inline-flex;
  margin-top: 5rem;
`

interface Props {
}

interface State {
}

class TrashHomeComponent extends Component <Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {}

    }

    render(): React.ReactNode {

        return (
            <StyledDiv>
                <h1 style={{fontSize: 'x-large'}}>Trash</h1>
                <h2>Choose an option:</h2>
                <StyledSpan>
                    <FieldDiv><GoToProductsTrash/></FieldDiv>
                    <FieldDiv><GoToHotDealsTrash/></FieldDiv>
                    <FieldDiv><GoToArchiveTrash/></FieldDiv>
                    <FieldDiv><GoToCustomerContactTrash/></FieldDiv>
                </StyledSpan>
            </StyledDiv>
        );
    }
}

export default TrashHomeComponent