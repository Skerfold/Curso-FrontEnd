import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurriculosService } from 'src/app/services/curriculos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-curriculo',
  templateUrl: './cadastro-curriculo.component.html',
  styleUrls: ['./cadastro-curriculo.component.scss']
})
export class CadastroCurriculoComponent {
  curriculoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private curriculosService: CurriculosService,
    private router: Router
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

  cadastrar() {
    if (this.curriculoForm.invalid) {
      alert('Preencha todos os campos obrigatórios corretamente.');
      return;
    }
    this.curriculosService.cadastrarCurriculos(this.curriculoForm.value).subscribe(
      () => {
        this.curriculoForm.reset();
        alert('Currículo cadastrado com sucesso!');
        this.router.navigate(['/curriculos']); // Redirect to list after success
      },
      (err) => {
        console.error('Erro ao cadastrar currículo:', err);
      }
    );
  }
}