import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss']
})
export class ManageProductComponent implements OnInit {
  myForm = new FormControl();
  options: User[] = [{name: 'Mary'}, {name: 'Shelley'}, {name: 'Igor'}];
  filteredOptions!: Observable<User[]>;
  value:string = "Clear me"
  view:string = "";
  productUid:string = "";
  selectedFile:any = null;
  constructor(
    private activateRoute: ActivatedRoute,
  ) { 
    this.activateRoute.queryParams.subscribe((res:any) => {
      if(res && res.special){
        const data = JSON.parse(res.special);
        this.view = data.screenView;
      }
    })
  }

  ngOnInit(): void {
    this.filteredOptions = this.myForm.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filter(name) : this.options.slice())),
    );
  }

  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;
  }
}

export interface User {
  name: string;
}
