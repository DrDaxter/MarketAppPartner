import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showFiller = false;
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  pages = [
    { title: 'Home', url:'home', icon: 'home'},
    { title: 'Products', url: 'product', icon: ''}
  ];

  title = 'myFoodPartner';



}

