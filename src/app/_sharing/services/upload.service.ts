import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import * as global from '../global';
import { Video } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UploadService {
  
  private _apiUrl = `${global._api}${global._video}`


  constructor(
    private _http: HttpClient
  ) {}
  
  public sendVideo(video: FormData) {
    return this._http.post<Video>(this._apiUrl, video)
  }

  public getVideos(): Observable<Video[]> {
    return this._http.get<Video[]>(this._apiUrl)
  }
  
}