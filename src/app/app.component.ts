import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  toggle:boolean = true;
  iconToggle:boolean = true;
  fullMenu:boolean = true;
  showFiller = false;
  arrowForward:boolean = false;
  default_margin:string = "200px";
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  pages = [
    { title: 'Home', url:'home', icon: 'home'},
    { title: 'Products', url: 'product', icon: 'list_alt'}
  ];

  title = 'myFoodPartner';


  changeArrow(pixel:string){
    this.default_margin = pixel;
    this.toggle = !this.toggle;
  }

}

