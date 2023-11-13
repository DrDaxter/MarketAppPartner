import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { FirebaseStorageService } from 'src/app/services/forebaseStorage/firebase-storage.service';
import {ProductsClass,categories} from '../../../models/products';
import { Products } from 'src/app/interfaces/poduct/ProductInterface';

enum ActionOptions {
  EDIT = 'edit',
  CREATE = 'create'
}
@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss']
})
export class ManageProductComponent implements OnInit {
  products = new ProductsClass();
  actionView?:ActionOptions;
  productsForm!: UntypedFormGroup;
  pCategories:categories[] = [];
  category_selected?:categories[];

  filteredOptions!: Observable<categories[]>;
  value:string = "Clear me"
  view:string = "";
  productUid:string = "";
  imagPath: string = ''
  selectedFile:any = null;
  showLoader:boolean = false;
  validationMessage = {
    name: [
      {type: "required", message: "Product name is required"},
    ],
    price: [
      {type: "required", message: "Product price is required"},
    ],
    category:[
      {type: "required", message: "Category is required"},
    ]
  };

  constructor(
    private activateRoute: ActivatedRoute,
    private formBuilder: UntypedFormBuilder,
    private firestoreService:FirestoreService,
    private firebaseStorageService: FirebaseStorageService,
    private router:Router
  ) {
    this.productsForm = this.formBuilder.group({
      picture: new UntypedFormControl("",Validators.compose([])),
      name: new UntypedFormControl("",Validators.compose([
        Validators.required
      ])),
      category: new UntypedFormControl("",Validators.compose([
        Validators.required
      ])),
      price: new UntypedFormControl("",Validators.compose([
        Validators.required
      ])),
      description: new UntypedFormControl("",Validators.compose([]))
    })

    this.activateRoute.queryParams.subscribe((params:any) => {
      if(params && params.special){
        this.actionView = ActionOptions.EDIT;
        this.loadProducts(params.special);
      }else{
        this.actionView = ActionOptions.CREATE;
        this.loadCategories();
      }
    })
  }

  ngOnInit(){

  }

  displayFn(category: categories): string {
    return category && category.category_name ? category.category_name : '';
  }

  private _filter(name: string): categories[] {
    const filterValue = name.toLowerCase();

    return this.pCategories.filter(option => option.category_name.toLowerCase().includes(filterValue));
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;

    if(this.selectedFile === null){
      return
    }else{
      const img = (<HTMLInputElement>document.getElementById("img-product"))!;
      const objectURL = URL.createObjectURL(this.selectedFile);

      img.src = objectURL;
    }

  }

  manageProduct(productForm:any){
    this.showLoader = true;
    this.products.category_uid = productForm.category.uid;
    this.products.name = productForm.name;
    this.products.description = productForm.description;
    this.products.price = productForm.price;
    this.products.commerce_uid = "cSb4yeU6BwCsGgNthPV2";

    switch (this.actionView) {
      case ActionOptions.CREATE:
        this.addProduct({...this.products})
      break;
      case ActionOptions.EDIT:
        this.editProduct({...this.products});
      break;
      default:
        console.log("No actions passed")
        break;
    }
  }

  async addProduct(products:Products){
    const fireId = this.firestoreService.manualId();
    const imgPath = await this.setImgProduct(fireId);
    const productData:Products = {
      ...products,
      image: imgPath
    }
    await this.firestoreService.addDocument("product", productData,fireId)
    this.showLoader = false
    this.productsForm.reset();
    this.selectedFile = null;

  }

  async setImgProduct(prodId:string):Promise<string|null>{
    if(this.selectedFile != null){
      const uploadResult = await this.firebaseStorageService.uploadImage(this.selectedFile,prodId);
      return uploadResult.metadata.fullPath;
    }
    return null;
  }

  editProduct(products:ProductsClass){
    let {category_uid} = products;
    products.category_uid = category_uid === undefined
      ? this.category_selected![0].uid : category_uid

    this.firestoreService.update('product',products.uid,{...products}).then(res => {
      console.log("Se edito")
      this.showLoader = false
    }).catch(error => {
      this.showLoader = false
      console.log(error)
    })
  }

  loadCategories(): Promise<categories[]>{
    return new Promise((resolve,reject) => {
      this.firestoreService.getAll<categories>("categories").subscribe((result:categories[]) =>{
        if(result){
          resolve(result);
          this.setFilter(result);
        }else{
          reject("No data")
        }
      });
    })
  }

  setFilter(categories:categories[]){
    this.pCategories = categories;
    this.filteredOptions = this.productsForm.valueChanges.pipe(
      startWith<string | categories>(''),
      map(value => (typeof value === 'string' ? value : value.category_name)),
      map(name => (name ? this._filter(name) : this.pCategories.slice())),
    );
  }

  loadProducts(uid:string){
    this.firestoreService.getWhere2<ProductsClass>('product','uid',uid).subscribe(async res => {
      if(res[0]){
        this.products = res[0];
        this.productsForm.get('name')?.setValue(this.products.name);
        this.productsForm.get('price')?.setValue(this.products.price);
        this.productsForm.get('description')?.setValue(this.products.description);
        this.prodImgValidation(this.products.image)
        this.pCategories = await this.loadCategories();
        try{
          this.category_selected = this.pCategories.filter(item => item.uid === this.products.category_uid);
          this.productsForm.get('category')?.setValue({category_name:this.category_selected[0].category_name});
        }catch(error){console.log(error)}
      }else{

      }
    })
  }

  prodImgValidation(imgUrl:string){
    this.selectedFile = imgUrl
    if(this.selectedFile){
      const img = (<HTMLInputElement>document.getElementById("img-product"))!
      img.src = this.selectedFile
    }else{
      console.log("NO IMAGE")
      this.selectedFile = null
    }
  }

  goBack(){
    this.router.navigate(['product']);
  }

}
