import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { SimpleModalComponent } from 'src/app/components/simple-modal/simple-modal.component';
import { SimplemodalDataInterface } from 'src/app/interfaces/extraInterfaces';

@Injectable({
  providedIn: 'root'
})
export class ModalsServiceService {
  constructor(
    private dialog: MatDialog
  ) { }

  showSimpleModal(modalWidth:string,header:string,text1:string,isActiveBtn1:boolean, isActiveBtn2:boolean, 
    textBtn1:string,textBtn2:string = 'Cancel',text2?:string):Observable<boolean> {
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
      width:modalWidth,
      data:{...simplemodalData}
    });

    return dialogRef.afterClosed();/* .subscribe(result => {
      console.log('The dialog was closed');
      response = result;
    }); */
  }
}
