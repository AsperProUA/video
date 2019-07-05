import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UploadComponent } from '../upload/upload.component';


@Component({
  selector: 'app-mat-nav',
  templateUrl: './mat-nav.component.html'
})
export class MatNavComponent implements OnInit {
  _uploadService: any;

  constructor(
    public dialog: MatDialog
  ) {}

  openDialog(): void {

    const dialogRef = this.dialog.open(UploadComponent);

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  ngOnInit() {
  }

}
