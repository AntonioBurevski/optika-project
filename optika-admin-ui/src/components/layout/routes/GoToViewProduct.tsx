import {Route} from "react-router";
import React from "react";
import {Icon} from "semantic-ui-react";

const GoToViewProduct = (props: any) => (
    <Route render={({ history}) => (
        <Icon
            name='info circle'
            color='teal'
            size='large'
            style={{cursor: 'pointer'}}
            onClick={() => { history.push(`/view-product/${props.productId}`) }}
        />
    )} />
)

export default GoToViewProduct