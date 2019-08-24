import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FsApiService {

  private static readonly STATIC_API_URL = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  public ls(path: string) {
    path = encodeURIComponent(path);
    return this.http.get(`${FsApiService.STATIC_API_URL}/ls?path=${path}`);
  }

}
