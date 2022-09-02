import {Route} from "react-router";
import React from "react";
import {Icon} from "semantic-ui-react";

const GoToAddProduct = () => (
    <Route render={({history}) => (
        <span
            style={{cursor: 'pointer', display: 'inline-flex'}}
            onClick={() => {
                history.push('/add-product')
            }}
        >
            <div
                style={{fontSize: 'large', color: '#2185d0'}}
            >
                <strong>Add Product</strong>
            </div>
            <Icon
                size='small'
                color='green'
                name='add'
            />
        </span>
    )}/>
)

export default GoToAddProduct