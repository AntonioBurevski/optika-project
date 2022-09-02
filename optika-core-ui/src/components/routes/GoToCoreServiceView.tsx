import {Route} from "react-router";
import React from "react";
import {Button} from "semantic-ui-react";

const GoToCoreServiceView = () => (
    <Route render={({history}) => (
        <Button
        onClick={() => history.push('/services')}
        >
            View All Services
        </Button>
    )}/>
)

export default GoToCoreServiceView