export class Products{
    public name: string = "";
    public position: number = 0;
    public weight: number = 0;
    public symbol: string = "";
}

export class ProductsClass{
    public category_uid:string = "";
    public commerce_uid:string = "";
    public image:string = "";
    public isSale:boolean = false;
    public name:string = "";
    public description:string = "";
    public uid:string = "";
    public price:number = 0;
    public timestamp:Date = new Date();
    //public category:string = "";
}

export interface categories{
    uid:string;
    category_name:string;
}