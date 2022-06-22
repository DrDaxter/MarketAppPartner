import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { resolve } from 'dns';
import { map, Observable, startWith } from 'rxjs';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { FirebaseStorageService } from 'src/app/services/forebaseStorage/firebase-storage.service';
import {ProductsClass,categories} from '../../../models/products';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss']
})
export class ManageProductComponent implements OnInit {
  
  productsForm!: FormGroup;
  pCategories:categories[] = [];

  filteredOptions!: Observable<categories[]>;
  value:string = "Clear me"
  view:string = "";
  productUid:string = "";
  selectedFile:any = null;
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

    this.activateRoute.queryParams.subscribe((res:any) => {
      if(res && res.special){
        const data = JSON.parse(res.special);
        this.view = data.screenView;
      }
    })
  }

  ngOnInit(){
    this.loadCategories();
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

  saveProduct(productForm:any){
    let products:ProductsClass = productForm;
    products.category = productForm.category.category_name;
    
    console.log(products);
    this.firestoreService.addElement("product",products).then((resolve) => {
      console.log(resolve);
      if(this.selectedFile != null){
        this.firebaseStorageService.uploadImage(this.selectedFile,resolve as string).then(res => {
          console.log(res);
        });
      }else{
        console.log("No picture");
      }
    });
  }

  loadCategories(){
    this.firestoreService.getAll("categories").subscribe((result:categories[]) =>{
      this.pCategories = result;
      console.log(result);
      this.filteredOptions = this.productsForm.valueChanges.pipe(
        startWith(''),
        map(value => (typeof value === 'string' ? value : value.category_name)),
        map(name => (name ? this._filter(name) : this.pCategories.slice())),
      );
    });
  }
}

export interface User {
  name: string;
}
