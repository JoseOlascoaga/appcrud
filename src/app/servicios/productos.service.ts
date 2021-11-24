import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  url='http://127.0.0.1:3000/'; 

  constructor(private http: HttpClient) { }

  mostrarproductos() {
    return this.http.get(`${this.url}getAllproductos`);
  }

  insertarproducto(productos:any):Observable<any> {
    return this.http.post(`${this.url}add_producto`, productos);    
  }

  editarproducto(productos:any, idproductos:number) {
    return this.http.put(`${this.url}/updateproducto/`+idproductos, productos);
  }
  
  eliminarproducto(codigo:number) {
    return this.http.delete(`${this.url}deleteproducto/${codigo}`);
  }













}
