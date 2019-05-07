import { Component, OnInit } from '@angular/core';
import { UploadService } from 'src/app/_sharing/services';
import { Video } from 'src/app/_sharing/models';


@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  videos: Video[]

  constructor(
    private _uploadService: UploadService
  ) { }

  ngOnInit() {
    this._uploadService.getVideos()
      .subscribe(
        _ => {
          this.videos = _
        }
      )
  }

}
