import React from "react";
import {Button} from "semantic-ui-react";

interface Props {
    onBack: () => void
}

const BackButton = (props: Props) => {
    return (
        <Button color={"red"} compact onClick={props.onBack}
                style={{marginLeft: "10px"}}>Back
        </Button>
    )
}

export default BackButton;
