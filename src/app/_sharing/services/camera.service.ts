import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import * as global from '../global';
import { Video } from '../models';
import { Observable } from 'rxjs';
import * as RecordRTC from 'node_modules/recordrtc'


@Injectable({
  providedIn: 'root'
})

export class CameraService {
  
  private _apiUrl = `${global._api}${global._video}`
  private stream: MediaStream;
  private recordRTC: any;
  private video

  constructor(
    private _http: HttpClient
  ) {}
  

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
    recordRTC.getDataURL(function (dataURL) { });
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
  
}