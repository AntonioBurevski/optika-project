import {Route} from "react-router";
import React from "react";
import {Button} from "semantic-ui-react";

const GoToCoreProductView = () => (
    <Route render={({history}) => (
        <Button
            onClick={() => history.push('/products')}
        >
            View Products
        </Button>
    )}/>
)

export default GoToCoreProductView