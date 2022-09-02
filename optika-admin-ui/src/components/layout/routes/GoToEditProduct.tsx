import React from "react";
import {Route} from "react-router";
import {Icon} from "semantic-ui-react";

const GoToEditProduct = (props: any) => (
    <Route render={({ history}) => (
        <Icon
            size='large'
            style={{cursor: 'pointer'}}
            name='pencil'
            onClick={() => { history.push(`/edit-product/${props.productId}`) }}
        />
    )} />
)

export default GoToEditProduct