import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { Products } from 'src/app/interfaces/poduct/ProductInterface';
import { NavigationExtras, Router } from '@angular/router';
import { FirebaseStorageService } from 'src/app/services/forebaseStorage/firebase-storage.service';
import { BehaviorSubject, Observable, Subject, concatMap, map, switchMap, takeUntil } from 'rxjs';

interface UrlsInterface {
  imgRef:string|null,
  url:string|null
}
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  dataSource!:MatTableDataSource<Products>
  displayedColumns: string[] = ['image', 'name', 'price','edit'];
  urls:UrlsInterface[] = [];
  unsubscribe$ = new Subject<void>();
  productUrlArr:string[] = [];

  //elementData: ProductsClass[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private firestore: FirestoreService,
    private route:Router,
    private cloudStorage: FirebaseStorageService,
  ) {

   }

  ngOnInit() {
    this.firestore.getWhere1<Products>()
    .pipe(
      takeUntil(this.unsubscribe$),
      map(item => {
        item.map(product => {
          if(product.image){
            this.cloudStorage.getMetadata(product.image).subscribe(url => {
              this.urls.push({
                imgRef:product.image,
                url:url
              });
            });
          }
        })
        return item;
      })
    )
    .subscribe({
      next: (response) => {
        if(response){
          this.dataSource = new MatTableDataSource<Products>(response);
          this.dataSource.paginator = this.paginator;
        }else{
          this.dataSource = new MatTableDataSource<Products>([]);
        }
      },
      error: (err) => {
        this.dataSource = new MatTableDataSource<Products>([]);
      }
    });

  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  returnUrl(imgRef:string,from:string):string|null{
    const productUrl = this.urls.filter((item) => item.imgRef === imgRef);
    if(productUrl[0]){
      console.log("from: "+from+" render -> ", productUrl[0])
      return productUrl[0].url;
    }else{
      return null;
    }
  }

  manageProduct(uid:string){
    let navigationExtra:NavigationExtras = {queryParams: {special: uid}}
    this.route.navigate(['manageProductComponent'],navigationExtra);
  }

}
