import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from './../helpers/data-helpers';

const baseUrlUpload = environment.base_url_upload;

@Injectable({
  providedIn: 'root',

})
export class UploadService {

  constructor(
    private http: HttpClient,
  ) { }

  private get token(){
    return localStorage.getItem('token') || '';
  }

  private get header(){
    return {
      headers: {
        'token': this.token
      }
    }
  }

  public uploadImageUser = async(image: File) => {

    try {
      
      const url = `${baseUrlUpload}/user`;
      const formData = new FormData();

      formData.append('image', image);

      const resp = await fetch(url, {
        method: 'PUT',
        body: formData,
        headers: {
          'token': this.token,
        }
      });
      const data = await resp.json();
      
      return data;

    } catch (error) {
      console.log(error);
      return false
    }
    // return this.http.post(`${baseUrlUpload}/user`, data, this.header);
  }

  public uploadImageGroup = async(image: File, idGroup: string) => {

    try {
      

      const url = `${baseUrlUpload}/group`;
      const formData = new FormData();

      formData.append('image', image);
      formData.append('idGroup', idGroup);

      const resp = await fetch(url, {
        method: 'PUT',
        body: formData,
        headers: {
          'token': this.token,
        }
      });
      const data = await resp.json();
      
      return data;

    } catch (error) {
      console.log(error);
      return false
    }
    // return this.http.post(`${baseUrlUpload}/user`, data, this.header);
  }

  
}
