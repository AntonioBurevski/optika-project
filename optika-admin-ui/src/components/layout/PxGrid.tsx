import styled from "styled-components";
import {Grid, GridProps} from "semantic-ui-react";
import {Component} from "react";
import React from "react";

const GridSc = styled(Grid)`
  &.ui.grid {
    margin: 0;
  }

  &.ui.grid > *{
     padding-top: 0.5rem !important;
     padding-bottom: 0.5rem !important;
  }
`;

class PxGrid extends Component<GridProps> {

    render(): React.ReactNode {
        const {children, ...rest} = this.props;
        return (
            <GridSc {...rest}>
                {children}
            </GridSc>
        )
    }

}

export default PxGrid;