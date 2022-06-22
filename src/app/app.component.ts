import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  temporaryDisabled: boolean = false;
  @ViewChild('sidenav') sidenav!:MatSidenav;

  toggle:boolean = true;
  iconToggle:boolean = true;
  fullMenu:boolean = true;
  showFiller = false;
  arrowForward:boolean = false;
  default_margin:string = "";
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  pages = [
    { title: 'Home', url:'home', icon: 'home'},
    { title: 'Products', url: 'product', icon: 'list_alt'}
  ];
  title = 'myFoodPartner';

  constructor(){
    this.default_margin = "200px";
  }


  changeArrow(pixel:string){
    this.default_margin = pixel;
    this.toggle = !this.toggle;
    this.temporaryDisabled = true;
    //this.sidenav.toggle();
    setTimeout(() => {
      this.temporaryDisabled = false;
    }, 10);
  }

}

