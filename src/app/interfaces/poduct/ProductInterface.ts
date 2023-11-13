import { Base } from "../BaseInterface";

export interface Products extends Base{
  category_uid:string;
  commerce_uid:string;
  image:string|null;
  isSale:boolean;
  name:string;
  description:string;
  price:number;
}
