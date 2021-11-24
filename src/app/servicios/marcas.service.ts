import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MarcasService {

  url='http://127.0.0.1:3000/'; 

  constructor(private http: HttpClient) { }

  mostrarmarcas() {
    return this.http.get(`${this.url}getAllmarca`);
  }

  insertarmarca(marcas:any):Observable<any> {
    return this.http.post(`${this.url}add_marca`, marcas);    
  }

  editarmarca(marcas:any, idmarca:number) {
    return this.http.put(`${this.url}/updatemarca/`+idmarca, marcas);
  }
  
  eliminarmarca(codigo:number) {
    return this.http.delete(`${this.url}deletemarca/${codigo}`);
  }









}
