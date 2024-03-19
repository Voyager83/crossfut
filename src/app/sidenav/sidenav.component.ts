import { Component } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
})
export class SidenavComponent {
  mostrarTabela: boolean | undefined;
  showFiller: any;
  abrirTabela() {
    this.mostrarTabela = true;
  }
}
