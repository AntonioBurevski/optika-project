import {CategoryEx, ProductOrderBy, ProductTypeEx} from "../../ts-types/api.enums";

export type ProductCoreSearchRequest = {
    searchKey: string,
    type: ProductTypeEx,
    orderBy: ProductOrderBy,
    category: CategoryEx,
    inStock: boolean,
    hotDeal: boolean
}

export type ProductCoreSearchResult = {
    id: number,
    code: string,
    brand: string,
    price: number,
    type: ProductTypeEx,
    category: CategoryEx,
    image: any,
    imageName: string,
    inStock: boolean,
    description: string,
    photoGray: boolean,
    polarized: boolean,
    hotDeal: boolean,
    newPrice: number,
    fromDate: string,
    toDate: string
}