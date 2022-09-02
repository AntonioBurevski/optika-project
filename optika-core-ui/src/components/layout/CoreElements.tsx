import styled from "styled-components";
import EyeTestImgImport from '../../images/services-eye-test.jpg';
import EyeTestImg2Import from '../../images/services-eye-test-2.jpg';
import EyeTestMachineImgImport from '../../images/services-eye-test-machine.jpg';
import ContactLensesImgImport from '../../images/contact-lenses-img.jpg';
import LuxotticaLogoImport from '../../images/luxottica-logo.png';
import GlassesStockImgImport from '../../images/glasses-stock-img.jpg';
import BrandLogosImgImport from '../../images/frames-glasses-brands.png';
import RepairImgImport from '../../images/services-repair-img.png';
import RepairImg2Import from '../../images/services-repair-img-2.jpg';
import RepairImg3Import from '../../images/services-repair-img-3.jpg';
import BrandsImg from "../../images/frames-glasses-brands.png";

export const OptContent = styled.div`
  height: calc(100vh - 80px);
  max-height: 100%;
  padding: 0rem calc((100vw - 1300px) / 2);
`;

export const ProductContainer = styled.div`
  /* width: 100vw; */
  min-height: 100vh;
  padding: 5rem calc((100vw - 1300px) / 2);
  background: #whitesmoke;
  color: #000;
`;

export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  text-align: center;
`;

export const ProductWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto;
`;

export const ProductCard = styled.div`
  margin: 0 4rem;
  line-height: 2;
  width: 300px;
`;

export const ProductTitle = styled.h2`
  font-weight: 400;
  font-size: 1.5rem;
`;

export const ProductDesc = styled.p`
  margin-bottom: 1rem;
`;

export const ProductOutOfStock = styled.p`
  margin-bottom: 1rem;
  color: red;
`;

export const ProductPrice = styled.p`
  display: flex;
  margin-bottom: 1rem;
  font-size: 2rem;
`;

export const ProductImg = styled.img`
  height: 300px;
  min-width: 350px;
  max-width: 100%;
  box-shadow: 8px 8px 8px 0px #fdc500;
`;

export const ProductDetailsImg = styled.img`
  height: 300px;
  min-width: 300px;
  max-width: 100%;
`;

export const FoundProductsHeading = styled.h1`
  font-size: clamp(2rem, 2.5vw, 3rem);
  text-align: center;
  margin-bottom: 5rem;
`;

export const ViewButton = styled.button`
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

export const OptH2 = styled.h2`
  padding-top: 2rem;
  font-size: clamp(2.5rem, 6vw, 3rem);
  margin-bottom: 1rem;
  box-shadow: 3px 5px #e9ba23;
  letter-spacing: 3px;
`;

export const OptH2Custom = styled.h2`
  padding-top: 2rem;
  font-size: clamp(2.5rem, 6vw, 3rem);
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  box-shadow: 0px 5px #2185d0;
  letter-spacing: 3px;
`;

export const EyeTestImg = styled.div`
    background: linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.1)),
        url(${EyeTestImgImport});
    height: 55vh;
    background-size: contain;
    margin: 2rem 5rem 0rem 5rem;
`

export const EyeTestImg2 = styled.div`
    background: linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.1)),
        url(${EyeTestImg2Import});
    background-size: contain;
    height: 30vh;
    margin: 2rem 5rem 0rem 5rem;
`

export const EyeTestMachineImg = styled.div`
    background: linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.1)),
        url(${EyeTestMachineImgImport});
    background-size: contain;
    height: 45vh;
    margin: 2rem 5rem 0rem 5rem;
`

export const ContactLensesImg = styled.div`
    background: linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.1)),
        url(${ContactLensesImgImport});
    height: 45vh;
`

export const LuxotticaLogo = styled.div`
    background: linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.1)),
        url(${LuxotticaLogoImport});
    height: 45vh;
    margin: 1rem;
    background-size: contain;
`

export const GlassesStockImg = styled.div`
    background: linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.1)),
        url(${GlassesStockImgImport});
    height: 45vh;
    margin: 1rem 0rem 1rem 0rem;
    background-size: contain;
`

export const BrandsLogosImg = styled.div`
    background: linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.1)),
        url(${BrandLogosImgImport});
    height: 45vh;
    margin: 1rem;
    background-size: contain;
`

export const RepairImg = styled.div`
    background: linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.1)),
        url(${RepairImgImport});
    height: 50vh;
    margin: 1rem;
    margin-left: 9rem;
    background-size: contain;
`

export const RepairImg2 = styled.div`
    background: linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.1)),
        url(${RepairImg2Import});
    height: 50vh;
    margin: 1rem;
    margin-left: 9rem;
    background-size: contain;
`

export const RepairImg3 = styled.div`
    background: linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.1)),
        url(${RepairImg3Import});
    height: 50vh;
    margin: 1rem;
    margin-left: 9rem;
    background-size: contain;
`

export const BrandsContainer = styled.div`
  background: linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.1)),
    url(${BrandsImg});
  height: 30vh;
  background-position: center;
  background-size: cover;
`;