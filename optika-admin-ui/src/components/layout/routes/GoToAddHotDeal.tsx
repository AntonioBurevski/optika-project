import {Route} from "react-router";
import React from "react";
import {Icon} from "semantic-ui-react";

const GoToAddHotDeal = (props: any) => (
    <Route render={({history}) => (
        <span
            style={{cursor: 'pointer', display: 'inline-flex'}}
            onClick={() => {
                history.push(`/add-hot-deal`)
            }}
        >
            <div
                style={{fontSize: 'large', color: '#2185d0'}}
            >
                <strong>Add Hot Deal</strong>
            </div>
            <Icon
                size='small'
                color='green'
                name='add'
            />
        </span>
    )}/>
)

export default GoToAddHotDeal