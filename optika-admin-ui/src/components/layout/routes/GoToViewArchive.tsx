import {Route} from "react-router";
import {Icon} from "semantic-ui-react";
import React from "react";

const GoToViewArchive = (props: any) => (
    <Route render={({ history}) => (
        <Icon
            name='info circle'
            color='teal'
            size='large'
            style={{cursor: 'pointer'}}
            onClick={() => { history.push(`/view-archive/${props.archiveId}`) }}
        />
    )} />
)

export default GoToViewArchive