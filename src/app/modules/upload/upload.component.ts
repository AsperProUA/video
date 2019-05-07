import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatTableDataSource } from '@angular/material';
import { UploadService } from 'src/app/_sharing/services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UploadEvent, UploadFile, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  videoForm: FormGroup
  public files: UploadFile[] = [];
  displayedColumns: string[] = ['name', 'action'];
  dataSource: MatTableDataSource<any>

  constructor(
    private _fb: FormBuilder,
    public dialogRef: MatDialogRef<UploadComponent>,
    private _uploadService: UploadService
  ) {}
 
  public dropped(event: UploadEvent) {
    console.log(event.files)
    this.files = event.files;
    this.dataSource = new MatTableDataSource(this.files)
    for (const droppedFile of event.files) {
 
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          // Here you can access the real file
          console.log(file);         
       });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  onUpload() {
    const _fd = new FormData();
    _fd.append('title', this.videoForm.get('title').value)
    _fd.append('description', this.videoForm.get('description').value)
    this._uploadService.sendVideo(_fd)
      .subscribe(
        _ => {
          setTimeout(() => {this.dialogRef.close()}, 2000)
        }
      )
  }

  removeItem(i: number) {
    this.files.splice(i, 1)
    this.dataSource.data = this.files
    console.log(this.dataSource.data, this.files)
  }

  onNoClick(): void {
    this.dialogRef.close()
  }

  ngOnInit() {
    this.videoForm = this._fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

}
