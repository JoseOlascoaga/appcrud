import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  url='http://127.0.0.1:3000/'; 

  constructor(private http: HttpClient) { }

  mostrarcategorias() {
    return this.http.get(`${this.url}getAllcategoria`);
  }

  insertarcategoria(categorias:any):Observable<any> {
    return this.http.post(`${this.url}add_categoria`, categorias);    
  }

  editarcategoria(categorias:any, idcategoria:number) {
    return this.http.put(`${this.url}/updatecategoria/`+idcategoria, categorias);
  }
  
  eliminarcategoria(codigo:number) {
    return this.http.delete(`${this.url}deletecategoria/${codigo}`);
  }
  







}
