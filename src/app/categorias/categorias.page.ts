import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup,Validator, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { CategoriasService } from '../servicios/categorias.service';


@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {
  
  myform: FormGroup;
  id_editar:number=0;
  constructor(public alertController: AlertController,private _builder:FormBuilder,private categorias: CategoriasService) {
    this.myform=this._builder.group({
      codcategoria: ['', [Validators.required, Validators.maxLength(50)]]  ,
      categoria: ['', [Validators.required, Validators.maxLength(50)]]  
    })
  }  

  lista_categorias: any;

  nuevacategoria={
    codcategoria:null,
    categoria:null
  }

  ngOnInit() {
    this.mostrarcategorias();
  }

  mostrarcategorias() {
    this.categorias.mostrarcategorias().subscribe(result => this.lista_categorias = result);
  }

  insertarcategoria(value:any) {
    this.nuevacategoria={
      codcategoria:value.codcategoria,
      categoria:value.categoria
    }
    this.categorias.insertarcategoria(this.nuevacategoria).subscribe(datos => {
      console.log(datos)
      this.myform.reset()
      this.showAlert()
     });
  } 

  showAlert() {

    this.alertController.create({
      header: 'Informacion',
      subHeader: 'Gestion de Categorias',
      message: 'Categoria agregada',
      buttons: ['OK']
    }).then(res => {

      res.present();

    });
  }

  editarcategoria(value:any) {
    this.nuevacategoria={
      codcategoria:value.codcategoria,
      categoria:value.categoria
    }
    this.categorias.editarcategoria(this.nuevacategoria,this.id_editar).subscribe(datos => {
      console.log(datos)
      this.myform.reset()
      this.mostrarcategorias()
      this.showAlertAct()
    });    
  }

  showAlertAct() {
    this.alertController.create({
      message: 'Categoria Actualizado',
      buttons: ['OK']
    }).then(res => {
  
      res.present();
  
    });
  }

  eliminarcategoria(idcategoria:number) {
      this.categorias.eliminarcategoria(idcategoria).subscribe(datos => {
        console.log(datos)
        this.Eliminado()
        this.myform.reset()
        this.mostrarcategorias()
      }); 
  }
  Eliminado() {
    this.alertController.create({
      message: 'Categoria eliminada',
      buttons: ['OK']
    }).then(res => {

      res.present();

    });
  }

  seleccionar(id_edi:any) {
    this.id_editar=id_edi['idcategoria'];
    this.myform.setValue({
    codcategoria:id_edi['codcategoria'],
    categoria:id_edi['categoria']
   })
   }


}
