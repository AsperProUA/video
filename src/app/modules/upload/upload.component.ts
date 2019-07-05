import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialogRef, MatTableDataSource } from '@angular/material';
import { UploadService } from 'src/app/_sharing/services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UploadEvent, UploadFile, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import * as RecordRTC from 'node_modules/recordrtc'

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})

export class UploadComponent implements OnInit,AfterViewInit {


  videoForm: FormGroup
  dropFiles: boolean = true
  camera: boolean = true
  uploadForm: boolean = true
  public files: UploadFile[] = [];
  displayedColumns: string[] = ['name', 'action'];
  dataSource: MatTableDataSource<any>

  private stream: MediaStream;
  private recordRTC: any;

  @ViewChild('video') video;

  constructor(
    private _fb: FormBuilder,
    public dialogRef: MatDialogRef<UploadComponent>,
    private _uploadService: UploadService
  ) {}
 
  public dropped(event: UploadEvent) {
    this.files = event.files;
    this.dataSource = new MatTableDataSource(this.files)
    for (const droppedFile of event.files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {       
       });
      } else {
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

  changeFile(item: string) { 
    this.dropFiles = !this.dropFiles
  }

  changeCamera(item: string) { 
    this.camera = !this.camera
  }

  toggleControls() {
    let video: HTMLVideoElement = this.video.nativeElement;
    video.muted = !video.muted;
    video.controls = !video.controls;
    video.autoplay = !video.autoplay;
  }

  successCallback(stream: MediaStream) {

    var options = {
      mimeType: 'video/webm',
      audioBitsPerSecond: 128000,
      videoBitsPerSecond: 128000,
      bitsPerSecond: 128000
    };
    this.stream = stream;
    this.recordRTC = RecordRTC(stream, options);
    this.recordRTC.startRecording();
    let video: HTMLVideoElement = this.video.nativeElement;
    video.srcObject = stream;
    this.toggleControls();
  }

  errorCallback() {
    
  }

  processVideo(audioVideoWebMURL) {
    let video: HTMLVideoElement = this.video.nativeElement;
    let recordRTC = this.recordRTC;
    video.src = audioVideoWebMURL;
    this.toggleControls();
    var recordedBlob = recordRTC.getBlob();
    recordRTC.getDataURL(function (dataURL) {
     });
  }

  startRecording() {
    navigator.mediaDevices
      .getUserMedia({video: true, audio: true})
      .then(this.successCallback.bind(this), this.errorCallback.bind(this));
  }

  stopRecording() {
    let recordRTC = this.recordRTC;
    recordRTC.stopRecording(this.processVideo.bind(this));
    let stream = this.stream;
    stream.getAudioTracks().forEach(track => track.stop());
    stream.getVideoTracks().forEach(track => track.stop());
  }

  download() {
    this.recordRTC.save(`video_${new Date().getTime()}.webm`);
  }

  ngOnInit() {
    this.videoForm = this._fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  ngAfterViewInit() {
    if(this.video != undefined) {
      let video:HTMLVideoElement = this.video.nativeElement;
      video.muted = false;
      video.controls = false;
      video.autoplay = false;
    }
    
  }


}
