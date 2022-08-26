import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SimplemodalDataInterface } from 'src/app/interfaces/extraInterfaces';

@Component({
  selector: 'app-simple-modal',
  templateUrl: './simple-modal.component.html',
  styleUrls: ['./simple-modal.component.scss']
})
export class SimpleModalComponent {

  constructor(
    public dialogRef: MatDialogRef<SimpleModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SimplemodalDataInterface
  ) { }

}
