import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup,Validator, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { MarcasService } from '../servicios/marcas.service';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.page.html',
  styleUrls: ['./marcas.page.scss'],
})
export class MarcasPage implements OnInit {

  myform: FormGroup;
  id_editar:number=0;
  constructor(public alertController: AlertController,private _builder:FormBuilder,private marcas: MarcasService) {
    this.myform=this._builder.group({
      codmarca: ['', [Validators.required, Validators.maxLength(50)]]  ,
      marca: ['', [Validators.required, Validators.maxLength(50)]]  
    })
  }

  lista_marcas: any;

  nuevamarca={
    codmarca:null,
    marca:null
  }

  ngOnInit() {
    this.mostrarmarcas();
  }

  mostrarmarcas() {
    this.marcas.mostrarmarcas().subscribe(result => this.lista_marcas = result);
  }

  insertarmarca(value:any) {
    this.nuevamarca={
      codmarca:value.codmarca,
      marca:value.marca
    }
    this.marcas.insertarmarca(this.nuevamarca).subscribe(datos => {
      console.log(datos)
      this.myform.reset()
      this.showAlert()
     });
  } 

  showAlert() {

    this.alertController.create({
      header: 'Informacion',
      subHeader: 'Gestion de Marcas',
      message: 'Marca agregada',
      buttons: ['OK']
    }).then(res => {

      res.present();

    });
  }

  editarmarca(value:any) {
    this.nuevamarca={
      codmarca:value.codmarca,
      marca:value.marca
    }
    this.marcas.editarmarca(this.nuevamarca,this.id_editar).subscribe(datos => {
      console.log(datos)
      this.myform.reset()
      this.mostrarmarcas()
      this.showAlertAct()
    });    
  }

  showAlertAct() {
    this.alertController.create({
      message: 'Marca Actualizado',
      buttons: ['OK']
    }).then(res => {
  
      res.present();
  
    });
  }

  eliminarmarca(idmarca:number) {
    this.marcas.eliminarmarca(idmarca).subscribe(datos => {
      console.log(datos)
      this.Eliminado()
      this.myform.reset()
      this.mostrarmarcas()
    }); 
}

Eliminado() {
  this.alertController.create({
    message: 'Marca eliminada',
    buttons: ['OK']
  }).then(res => {

    res.present();

  });
}

seleccionar(id_edi:any) {
  this.id_editar=id_edi['idmarca'];
  this.myform.setValue({
  codmarca:id_edi['codmarca'],
  marca:id_edi['marca']
 })
 }


}
