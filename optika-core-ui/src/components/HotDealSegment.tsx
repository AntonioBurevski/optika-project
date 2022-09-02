import React from "react";
import {ProductCoreDto} from "../ts-types/api.types";
import styled from "styled-components";
import moment from "moment";
import {
    HotDealButton,
    HotDealCard,
    HotDealContainer, HotDealDate, HotDealDesc,
    HotDealHeading,
    HotDealImg,
    HotDealInfo, HotDealPrice, HotDealTitle,
    HotDealWrapper
} from "./layout/HotDealElements";

const PxDiv = styled.div`
    margin-right: 1rem;
    margin-left: 1rem;
`

interface Props {
    hotDealsToDisplay?: ProductCoreDto[]
}

const HotDealSegment = (props: Props) => {
    const data = props.hotDealsToDisplay;
    return (
        <HotDealContainer>
            <HotDealHeading>
                Hot Deals!
            </HotDealHeading>
            <HotDealWrapper>
                {data &&
                data.map((product, index) => {
                    return (
                        <HotDealCard key={index}>
                            <HotDealImg src={`data:image/*;base64,${product.image}`} alt={'img'}/>
                            <HotDealInfo>
                                <HotDealTitle><strong>{product.brand} {product.code}</strong></HotDealTitle>
                                <HotDealPrice>
                                    <s style={{color: 'red'}}>{`${product.price}€`}</s>
                                    <PxDiv> /</PxDiv>
                                    <strong style={{color: 'green'}}>{`${product.newPrice}€`}</strong>
                                </HotDealPrice>
                                <HotDealDate>
                                    {moment(product.fromDate).format("MMM, DD YYYY")}
                                    <PxDiv>-</PxDiv>
                                    {moment(product.toDate).format("MMM, DD YYYY")}
                                </HotDealDate>
                            </HotDealInfo>
                        </HotDealCard>
                    );
                })}
            </HotDealWrapper>
        </HotDealContainer>
    );
};

export default HotDealSegment;