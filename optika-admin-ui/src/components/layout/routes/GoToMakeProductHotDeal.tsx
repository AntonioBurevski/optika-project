import React from "react";
import {Route} from "react-router";
import {Button, Icon} from "semantic-ui-react";

const GoToMakeProductHotDeal = (props: any) => (
    <Route render={({history}) => (
        <Icon.Group
            size='large'
            style={{cursor: 'pointer'}}
            onClick={() => {
                history.push(`/product/make-hot-deal/${props.productId}`)
            }}
        >
            <Icon name='fire' color='red' style={{marginLeft: "0.5rem"}}/>
            <Icon corner='top right' name='add' color='green'/>
        </Icon.Group>
    )}/>
)

export default GoToMakeProductHotDeal