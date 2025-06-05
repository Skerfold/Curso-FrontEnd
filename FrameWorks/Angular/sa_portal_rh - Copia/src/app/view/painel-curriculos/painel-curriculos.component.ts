import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Curriculo } from 'src/app/models/curriculo.model';
import { CurriculosService } from 'src/app/services/curriculos.service';

@Component({
  selector: 'app-painel-curriculos',
  templateUrl: './painel-curriculos.component.html',
  styleUrls: ['./painel-curriculos.component.scss'],
})
export class PainelCurriculosComponent implements OnInit {
  public curriculoForm: FormGroup;
  public curriculos: Curriculo[] = [];

  constructor(
    public curriculo: Curriculo,
    private _curriculosService: CurriculosService,
    private fb: FormBuilder
  ) {
    this.curriculoForm = this.fb.group({
      cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      nome: ['', Validators.required],
      foto: [''],
      descricao: ['', Validators.required],
      experiencia: ['', Validators.required],
      formacao: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.listarCurriculos();
  }

  listarCurriculos() {
    this._curriculosService.getCurriculos().subscribe((retornaCurriculo) => {
      this.curriculos = retornaCurriculo.map((item: any) => {
        return new Curriculo(
          item.id,
          item.cpf,
          item.nome,
          item.foto,
          item.descricao,
          item.experiencia,
          item.formacao
        );
      });
    });
  }

  cadastrar() {
    if (this.curriculoForm.invalid) {
      alert('Por favor, preencha todos os campos obrigatórios corretamente.');
      return;
    }
    const curriculo = this.curriculoForm.value;
    this._curriculosService.cadastrarCurriculos(curriculo).subscribe(
      () => {
        this.curriculoForm.reset();
        this.listarCurriculos();
        alert('Currículo cadastrado com sucesso!');
      },
      (err) => {
        console.error('Exception: ', err);
      }
    );
  }

  atualizar(id: any) {
    if (this.curriculoForm.invalid) {
      alert('Por favor, preencha todos os campos obrigatórios corretamente.');
      return;
    }
    const curriculo = this.curriculoForm.value;
    this._curriculosService.atualizarCurriculos(id, curriculo).subscribe(
      () => {
        this.curriculoForm.reset();
        this.listarCurriculos();
        alert('Currículo atualizado com sucesso!');
      },
      (err) => {
        console.error('Exception: ', err);
      }
    );
  }

  listarCurriculoUnico(curriculo: Curriculo) {
    this.curriculoForm.patchValue(curriculo);
  }

  remover(curriculo: Curriculo) {
  const id = curriculo.cpf; // agora o id será igual ao cpf
  this._curriculosService.removerCurriculos(id).subscribe(
    () => {
      this.listarCurriculos();
      alert('Currículo deletado com sucesso!');
    },
    (err) => {
      console.error('Exception: ', err);
    }
  );
}
}
