import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  title = 'crossfutreturns';
  displayedColumns: string[] = ['id', 'nome', 'turno', 'dataNascimento'];

  formCrossfut: FormGroup;
  crossfuters: Crossfuter[] = [];

  @ViewChild('table') table: any;
  showFiller: any;

  constructor(private fb: FormBuilder) {
    this.formCrossfut = fb.group({
      nome: [''],
      dataNascimento: [new Date()],
      turno: [''],
      telefone: [''],
      rg: [''],
      objetivos: [''],
    });
  }
  public onIncluirCrossfuter() {
    let crossfuter: Crossfuter = {} as Crossfuter;
    // NOME DO ALUNO
    crossfuter.nome = this.formCrossfut.get('nome')?.value;

    // DATA DE NASCIMENTO
    crossfuter.dataNascimento = this.formCrossfut
      .get('dataNascimento')
      ?.value.toDateString('DD/MM/yyyy');

    // TURNO
    crossfuter.turno = this.formCrossfut.get('turno')?.value;

    // TELEFONE
    crossfuter.telefone = this.formCrossfut.get('telefone')?.value;

    // RG
    crossfuter.rg = this.formCrossfut.get('rg')?.value;

    crossfuter.objetivos = this.formCrossfut.get('objetivos')?.value;

    crossfuter.id = this.crossfuters.length + 1;

    this.crossfuters.push(crossfuter);

    console.log(this.crossfuters);

    this.table.renderRows();
  }
}
interface Crossfuter {
  nome: string;
  dataNascimento: Date;
  id: number;
  turno: string;
  telefone: number;
  rg: number;
  objetivos: string;
}
