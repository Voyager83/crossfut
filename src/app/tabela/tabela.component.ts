import { Component, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ElementDialogComponent } from '../shared/element-dialog/element-dialog.component';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

export function dataNascimentoValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  const dataNascimento = control.value;
  const hoje = new Date();

  if (dataNascimento > hoje) {
    return { dataFutura: true };
  }

  return null;
}
@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.css'],
})
export class TabelaComponent {
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.formCrossfut = fb.group({
      nome: ['', Validators.required],
      dataNascimento: [[new Date()], [Validators.required]],
      turno: [''],
      tipoContato: [''],
      telefone: ['', [Validators.required]], //this.validatePhoneNumber]],
      rg: [''],
      objetivos: [''],
    });
    this.formCrossfut.get('tipoContato')?.valueChanges.subscribe((value) => {
      const telefoneControl = this.formCrossfut.get('telefone');
      if (value === 'celular') {
        telefoneControl?.setValidators([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(11),
        ]);
      } else if (value === 'telefone') {
        telefoneControl?.setValidators([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(9),
        ]);
      }
      telefoneControl?.updateValueAndValidity();
    });
    this.formCrossfut
      .get('dataNascimento')
      ?.setValidators(dataNascimentoValidator);
  }
  validatePhoneNumber(control: AbstractControl): { [key: string]: any } | null {
    const phoneNumberPattern = /^\d+$/; // Expressão regular para aceitar apenas números
    const valid = phoneNumberPattern.test(control.value); // Verifique se o valor contém apenas números
    return valid ? null : { invalidPhoneNumber: true }; // Retorne um objeto de erro se o valor não for válido
  }
  editarCrossfuter(crossfuter: Crossfuter): void {
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      width: '250px',
      data: { crossfuter },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  title = 'crossfutreturns';
  displayedColumns: string[] = [
    'id',
    'nome',
    'turno',
    'dataNascimento',
    'telefone',
    'rg',
    'actions',
  ];
  excluirCrossfuter(id: number) {
    const index = this.crossfuters.findIndex((c) => c.id === id);
    if (index !== -1) {
      this.crossfuters.splice(index, 1);
      this.table.renderRows(); // Atualiza a exibição da tabela
    }
  }

  formCrossfut: FormGroup;
  crossfuters: Crossfuter[] = [];

  @ViewChild('table') table: any;
  showFiller: any;
  mostrarTabela: boolean | undefined;

  public onIncluirCrossfuter() {
    if (this.formCrossfut.invalid) {
      console.log('Por favor, preencha todos os campos');
      return;
    }
    let crossfuter: Crossfuter = {} as Crossfuter;
    // Verificar se o RG já existe
    const rg = this.formCrossfut.get('rg')?.value;
    const rgExists = this.crossfuters.some((c) => c.rg === rg);

    if (rgExists) {
      this.formCrossfut.get('rg')?.setErrors({ duplicate: true });
      return; // Abortar a adição se o RG já existe
    }

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
  abrirTabela() {
    this.mostrarTabela = true;
  }
  limparCampos() {
    this.formCrossfut.reset();
  }
}
export interface Crossfuter {
  nome: string;
  dataNascimento: Date;
  id: number;
  turno: string;
  telefone: number;
  rg: number;
  objetivos: string;
}
