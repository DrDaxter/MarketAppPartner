import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { Products,ProductsInterface } from 'src/app/models/products';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  dataSource:any;
  displayedColumns: string[] = ['image', 'name', 'price','edit'];
  elementData: ProductsInterface[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private firestore: FirestoreService,
    private route:Router,
  ) {
    
   }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.firestore.getAll().subscribe((res:any) => {
      console.log(res);
      this.elementData = res;
      this.dataSource = new MatTableDataSource<ProductsInterface>(this.elementData);
    });
  }

  manageProduct(uid:string,view:string){
    const params = {
      productUid: uid,
      screenView: view
    }
    let navigationExtra:NavigationExtras = {queryParams: {special: JSON.stringify(params)}}
    this.route.navigate(['manageProductComponent'],navigationExtra);
  }

}