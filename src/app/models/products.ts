export class Products{
    public name: string = "";
    public position: number = 0;
    public weight: number = 0;
    public symbol: string = "";
}

export interface ProductsInterface{
    category_uid:string;
    commerce_uid:string;
    image:string;
    isSale:boolean;
    name:string;
    uid:string;
    price:number
}