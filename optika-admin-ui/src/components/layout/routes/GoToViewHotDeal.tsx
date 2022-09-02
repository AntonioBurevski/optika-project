import {Route} from "react-router";
import React from "react";
import {Icon} from "semantic-ui-react";

const GoToViewHotDeal = (props: any) => (
    <Route render={({ history}) => (
        <Icon
            name='info circle'
            color='teal'
            size='large'
            style={{cursor: 'pointer'}}
            onClick={() => { history.push(`/view-hot-deal/${props.hotDealId}`) }}
        />
    )} />
)

export default GoToViewHotDeal