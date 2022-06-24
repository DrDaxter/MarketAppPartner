import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { ProductsComponent } from './products/products.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
    ManageProductComponent,
    ProductsComponent
  ],
  exports:[
    ManageProductComponent,
    ProductsComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatProgressSpinnerModule
  ],
  providers: [
    MatPaginator
  ],
})
export class ProductsModule { }
