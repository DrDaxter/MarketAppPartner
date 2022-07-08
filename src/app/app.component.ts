import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  buttonClickedSuscription!:Subscription;
  @ViewChild('sidenav') sidenav!:MatSidenav;
  showNavbar:boolean = true;
  temporaryDisabled: boolean = false;
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

  constructor(
    private authService: AuthService,
    private cdRef:ChangeDetectorRef
  ){
    this.default_margin = "200px";
  }

  ngOnInit(){
    this.buttonClickedSuscription = this.authService.getEventClicked().subscribe((resolve:boolean) => {
      console.log(resolve);
      this.fullMenu = resolve;
      this.showNavbar = resolve;
      this.cdRef.detectChanges();
    });
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

