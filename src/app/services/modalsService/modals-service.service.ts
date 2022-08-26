import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SimpleModalComponent } from 'src/app/components/simple-modal/simple-modal.component';
import { SimplemodalDataInterface } from 'src/app/interfaces/extraInterfaces';

@Injectable({
  providedIn: 'root'
})
export class ModalsServiceService {
  constructor(
    private dialog: MatDialog
  ) { }

  showSimpleModal(header:string,text1:string,isActiveBtn1:boolean, isActiveBtn2:boolean, 
    textBtn1:string,textBtn2?:string,text2?:string) {
      let response:any;
    const simplemodalData:SimplemodalDataInterface = {
        header:header,
        text1:text1,
        text2:text2,
        isActiveBtn1:isActiveBtn1,
        isActiveBtn2:isActiveBtn2,
        textBtn1:textBtn1,
        textBtn2:textBtn2
      }
    const dialogRef = this.dialog.open(SimpleModalComponent, {
      width:'250px',
      data:{...simplemodalData}
      /* data:{header:"User has been created",text:"Now you have a new user :D",btn1Active:false,btn} */
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      response = result;
    });
  }
}
