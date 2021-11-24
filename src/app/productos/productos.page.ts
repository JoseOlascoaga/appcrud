import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup,Validator, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { CategoriasService } from '../servicios/categorias.service';
import { MarcasService } from '../servicios/marcas.service';
import { ProductosService } from '../servicios/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {

  myform: FormGroup;
  id_editar:number=0;
  constructor(public alertController: AlertController,private _builder:FormBuilder,public productos: ProductosService,public categorias: CategoriasService,public marcas: MarcasService) {
    this.myform=this._builder.group({
      codproducto: ['', [Validators.required, Validators.maxLength(50)]]  ,
      idcateg: ['', [Validators.required]] ,
      idmrc: ['', [Validators.required]] ,
      descripcion: ['', [Validators.required, Validators.maxLength(100)]] ,
      precio: ['', [Validators.required]] 
    })
  }  

  lista_productos: any;
  lista_categorias: any;
  lista_marcas: any;

  nuevoproducto={
    codproducto:null,
    idcateg:null,
    idmrc:null,
    descripcion:null,
    precio:null
  }

  ngOnInit() {
    this.mostrarproductos();
    this.mostrarcategorias();
    this.mostrarmarcas();
  }

  mostrarproductos() {
    this.productos.mostrarproductos().subscribe(result => this.lista_productos = result);
  }

  mostrarcategorias() {
    this.categorias.mostrarcategorias().subscribe(result => this.lista_categorias = result);
  }

  mostrarmarcas() {
    this.marcas.mostrarmarcas().subscribe(result => this.lista_marcas = result);
  }

  insertarproducto(value:any) {
    this.nuevoproducto={
      codproducto:value.codproducto,
      idcateg:value.idcateg,
      idmrc:value.idmrc,
      descripcion:value.descripcion,
      precio:value.precio
    }
    this.productos.insertarproducto(this.nuevoproducto).subscribe(datos => {
      console.log(datos)
      this.myform.reset()
      this.showAlert()
     });
  } 

  showAlert() {

    this.alertController.create({
      header: 'Informacion',
      subHeader: 'Gestion de Productos',
      message: 'Producto agregado',
      buttons: ['OK']
    }).then(res => {

      res.present();

    });
  }

  editarproducto(value:any) {
    this.nuevoproducto={
      codproducto:value.codproducto,
      idcateg:value.idcateg,
      idmrc:value.idmrc,
      descripcion:value.descripcion,
      precio:value.precio
    }
    this.productos.editarproducto(this.nuevoproducto,this.id_editar).subscribe(datos => {
      console.log(datos)
      this.myform.reset()
      this.mostrarproductos()
      this.showAlertAct()
    });    
  }

  showAlertAct() {
    this.alertController.create({
      message: 'Producto Actualizado',
      buttons: ['OK']
    }).then(res => {
  
      res.present();
  
    });
  }

  eliminarproducto(idproductos:number) {
    this.productos.eliminarproducto(idproductos).subscribe(datos => {
      console.log(datos)
      this.Eliminado()
      this.myform.reset()
      this.mostrarproductos()
    }); 
}
Eliminado() {
  this.alertController.create({
    message: 'Producto eliminada',
    buttons: ['OK']
  }).then(res => {

    res.present();

  });
}

seleccionar(id_edi:any) {
  this.id_editar=id_edi['idproductos'];
  this.myform.setValue({
  codproducto:id_edi['codproducto'],
  idcateg:id_edi['idcateg'],
  idmrc:id_edi['idmrc'],
  descripcion:id_edi['descripcion'],
  precio:id_edi['precio']
 })
 }





}
