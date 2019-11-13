import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  readonly baseURL = 'http://localhost:3000/upload/image';

  UploadImage(form: FormData) {
    return this.http.post(this.baseURL, form, {
      reportProgress: true,
      observe: 'events'
    });
  }
}
