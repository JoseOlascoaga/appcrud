import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inicio', url: '/inicio', icon: 'triangle' },
    { title: 'Categorias', url: '/categorias', icon: 'grid' },
    { title: 'Marcas', url: '/marcas', icon: 'receipt' },
    { title: 'Productos', url: '/productos', icon: 'layers' },
  ];
    constructor() {}
}
