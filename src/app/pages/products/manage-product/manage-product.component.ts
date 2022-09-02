import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { resolve } from 'dns';
import { map, Observable, startWith } from 'rxjs';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { FirebaseStorageService } from 'src/app/services/forebaseStorage/firebase-storage.service';
import {ProductsClass,categories} from '../../../models/products';

type actionOptions = {type:'edit'} | {type:'create'}
@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss']
})
export class ManageProductComponent implements OnInit {
  products = new ProductsClass();
  actionView?:actionOptions;
  productsForm!: FormGroup;
  pCategories:categories[] = [];

  filteredOptions!: Observable<categories[]>;
  value:string = "Clear me"
  view:string = "";
  productUid:string = "";
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
    private formBuilder: FormBuilder,
    private firestoreService:FirestoreService,
    private firebaseStorageService: FirebaseStorageService,
  ) { 
    this.productsForm = this.formBuilder.group({
      picture: new FormControl("",Validators.compose([])),
      name: new FormControl("",Validators.compose([
        Validators.required
      ])),
      category: new FormControl("",Validators.compose([
        Validators.required
      ])),
      price: new FormControl("",Validators.compose([
        Validators.required
      ])),
      description: new FormControl("",Validators.compose([]))
    }) 

    this.activateRoute.queryParams.subscribe((params:any) => {
      if(params && params.special){
        this.actionView = {type: 'edit'}
        this.loadProducts(params.special);
      }else{
        this.actionView = {type:'create'};
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
    
    switch (this.actionView?.type) {
      case 'create':
        this.addProduct({...this.products})
      break;
      case 'edit':
        this.editProduct({...this.products});
      break;
      default:
        console.log("No actions passed")
        break;
    }
  }

  addProduct(products:ProductsClass){
    this.firestoreService.addElement("product",{...products}).then((resolve) => {
      console.log(resolve);
      if(this.selectedFile != null){
        this.firebaseStorageService.uploadImage(this.selectedFile,resolve as string).then(res => {
          this.showLoader = false;
          console.log(res);
        });
      }else{
        console.log("No picture");
        this.showLoader = false; 
      }
      this.productsForm.reset();
      this.selectedFile = null;
    });
  }

  editProduct(products:ProductsClass){
    console.log(products);
    //this.firestoreService
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
          const category_selected = this.pCategories.filter(item => item.uid === this.products.category_uid);
          this.productsForm.get('category')?.setValue({category_name:category_selected[0].category_name});
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

}
