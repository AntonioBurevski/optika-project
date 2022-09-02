import {HeroBtn, HeroContainer, HeroContent, HeroH1, HeroItems, HeroP} from "./layout/HeroElements";
import React from "react";

interface Props {
    showModal: () => void;
}

const OptikaHeroSegment = (props: Props) => {

    return (
        <HeroContainer>
            <HeroContent>
                <HeroItems>
                    <HeroH1>Love what you see</HeroH1>
                    <HeroP>Pathway to clear vision</HeroP>
                    <HeroBtn onClick={() => props.showModal()}>Contact us</HeroBtn>
                </HeroItems>
            </HeroContent>
        </HeroContainer>
    );
};

export default OptikaHeroSegment;