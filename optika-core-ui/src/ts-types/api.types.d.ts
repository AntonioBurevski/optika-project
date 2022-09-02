/* tslint:disable */
// Generated using typescript-generator version 2.12.476 on 2022-07-21 20:41:14.

export interface CoreSearchRequest {
    searchKey: string;
    type: ProductType;
    orderBy: ProductOrderBy;
    category: Category;
    inStock: boolean;
    hotDeal: boolean;
}

export interface CustomerContactCoreDto {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    message: string;
    timestamp: string;
}

export interface HotDealCoreDto {
    id: number;
    productId: number;
    productCode: string;
    oldPrice: number;
    newPrice: number;
    fromDate: string;
    toDate: string;
}

export interface ProductCoreDto {
    id: number;
    code: string;
    brand: string;
    price: number;
    type: ProductType;
    category: Category;
    image: any;
    inStock: boolean;
    description: string;
    polarized: boolean;
    photoGray: boolean;
    hotDeal: boolean;
    newPrice: number;
    fromDate: string;
    toDate: string;
}

export type ProductType = "FRAMES" | "SUNGLASSES" | "CONTACT_LENSES" | "CLEAN_AND_MAINTENANCE" | "OTHER";

export type ProductOrderBy = "PRICE_ASCENDING" | "PRICE_DESCENDING";

export type Category = "MEN" | "WOMEN" | "UNISEX" | "KIDS";
