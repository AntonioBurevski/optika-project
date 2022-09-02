import React, {Component} from "react";
import styled from "styled-components";
import GoToProducts from "./layout/routes/home-routes/GoToProducts";
import GoToHotDeals from "./layout/routes/home-routes/GoToHotDeals";
import GoToArchive from "./layout/routes/home-routes/GoToArchive";
import GoToTrash from "./layout/routes/home-routes/GoToTrash";
import PxGrid from "./layout/PxGrid";
import {Grid} from "semantic-ui-react";
import GoToCustomerContact from "./layout/routes/home-routes/GoToCustomerContact";

const StyledIconDiv = styled.div`
  margin-bottom: 3rem;
`

interface Props {
}

interface State {
}

class HomeComponent extends Component <Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {}

    }

    render(): React.ReactNode {

        return (
            <div>
                <div style={{marginTop: '4rem', fontSize: '3rem'}}><strong>Welcome</strong></div>
                <h2 style={{marginTop: '2.5rem', marginBottom: '5rem'}}>Choose an option:</h2>
                <PxGrid>
                    <Grid.Row>
                        <Grid.Column width={4}></Grid.Column>
                        <Grid.Column width={4}>
                            <StyledIconDiv><GoToProducts/></StyledIconDiv>
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <StyledIconDiv><GoToHotDeals/></StyledIconDiv>
                        </Grid.Column>
                        <Grid.Column width={3}></Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column width={4}></Grid.Column>
                        <Grid.Column width={4}>
                            <StyledIconDiv><GoToArchive/></StyledIconDiv>
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <StyledIconDiv><GoToCustomerContact/></StyledIconDiv>
                        </Grid.Column>
                        <Grid.Column width={3}></Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column width={5}></Grid.Column>
                        <Grid.Column width={5}>
                            <StyledIconDiv><GoToTrash/></StyledIconDiv>
                        </Grid.Column>
                    </Grid.Row>
                </PxGrid>
            </div>
        );
    }
}

export default HomeComponent