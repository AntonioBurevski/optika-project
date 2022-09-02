import styled from 'styled-components';

export const HotDealContainer = styled.div`
  /* width: 100vw; */
  min-height: 100vh;
  padding: 5rem calc((100vw - 1300px) / 2);
  background: #whitesmoke;
  color: #000;
`;

export const HotDealWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto;
`;

export const HotDealCard = styled.div`
  margin: 0 4rem;
  line-height: 2;
  width: 300px;
`;

export const HotDealImg = styled.img`
  height: 300px;
  min-width: 300px;
  max-width: 100%;
  box-shadow: 8px 8px 5px 0px #fdc500;
`;

export const HotDealHeading = styled.h1`
  font-size: clamp(2rem, 2.5vw, 3rem);
  text-align: center;
  margin-bottom: 5rem;
`;

export const HotDealTitle = styled.h2`
  font-weight: 400;
  font-size: 1.5rem;
`;

export const HotDealInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  text-align: center;
`;

export const HotDealDesc = styled.p`
  margin-bottom: 1rem;
`;

export const HotDealPrice = styled.p`
  display: flex;
  margin-bottom: 1rem;
  font-size: 2rem;
`;

export const HotDealDate = styled.p`
  display: flex;
  margin-bottom: 1rem;
  font-size: 1.3rem;
  font-weight: 600;
`;

export const HotDealButton = styled.button`
  font-size: 1rem;
  padding: 1rem 4rem;
  border: none;
  background: #2185D0;
  color: #fff;
  transition: 0.2 ease-out;
  &:hover {
    background: #ffc500;
    transition: 0.2s ease-out;
    cursor: pointer;
    color: #000;
  }
`;