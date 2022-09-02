/* tslint:disable */
// Generated using typescript-generator version 2.12.476 on 2022-07-21 20:41:04.

export interface ArchiveDto {
    id: number;
    productId: number;
    productCode: string;
    price: number;
    archivedDateTime: string;
    remarks: string;
    hotDeal: boolean;
    deleted: boolean;
}

export interface UpsertArchiveDto {
    productId: number;
    productCode: string;
    archivedDate: string;
    archivedTime: string;
    remarks: string;
}

export interface CustomerContactDto {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    message: string;
    timestamp: string;
}

export interface HotDealDto {
    id: number;
    productId: number;
    productCode: string;
    oldPrice: number;
    newPrice: number;
    fromDate: string;
    toDate: string;
    active: boolean;
    deleted: boolean;
}

export interface HotDealSearchDto {
    active: boolean;
    searchTerm: string;
}

export interface UpsertHotDealDto {
    productId: number;
    productCode: string;
    oldPrice: number;
    newPrice: number;
    fromDate: string;
    toDate: string;
    active: boolean;
}

export interface ProductDto {
    id: number;
    code: string;
    brand: string;
    price: number;
    type: ProductType;
    category: Category;
    image: any;
    imageName: string;
    inStock: boolean;
    description: string;
    polarized: boolean;
    photoGray: boolean;
    hotDeal: boolean;
    hotDealPrice: number;
    deleted: boolean;
}

export interface ProductSearchDto {
    productSearchTerm: string;
    inStock: boolean;
}

export interface UpsertProductDto {
    code: string;
    brand: string;
    price: number;
    type: ProductType;
    category: Category;
    file: File;
    imageName: string;
    inStock: boolean;
    description: string;
    polarized: boolean;
    photoGray: boolean;
    hotDeal: boolean;
    hotDealPrice: number;
}

export type ProductType = "FRAMES" | "SUNGLASSES" | "CONTACT_LENSES" | "CLEAN_AND_MAINTENANCE" | "OTHER";

export type Category = "MEN" | "WOMEN" | "UNISEX" | "KIDS";
