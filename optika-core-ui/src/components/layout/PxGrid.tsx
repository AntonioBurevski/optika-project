import React, { Component } from 'react';
import { Grid, GridProps } from 'semantic-ui-react';
import styled from 'styled-components';

const GridSc = styled(Grid)`
  &.ui.grid {
    margin: 0;
  }

  &.ui.grid > *{
     padding-top: 0.5rem !important;
     padding-bottom: 0.5rem !important;
  }
  
  &.ui.grid > .row {
    min-height: 50px;
  }
  
  @media only screen and (max-width: 767px) {
    &.ui.grid .ui.stackable.grid,
    &.ui.segment:not(.vertical) .ui.stackable.page.grid {
      margin: 0;
    }
    
    &.ui.grid>.stackable.stackable.row>.column,
    &.ui.stackable.grid>.column.grid>.column,
    &.ui.stackable.grid>.column.row>.column,
    &.ui.stackable.grid>.column:not(.row),
    &.ui.stackable.grid>.row>.column, 
    &.ui.stackable.grid>.row>.wide.column,
    &.ui.stackable.grid>.wide.column {    
      padding: 0 !important;
      margin: 0 !important;
    }
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