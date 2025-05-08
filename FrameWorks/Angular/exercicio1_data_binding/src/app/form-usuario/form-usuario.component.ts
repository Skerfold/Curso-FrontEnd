import { Component } from '@angular/core';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: ['./form-usuario.component.css']
})
export class FormUsuarioComponent {
  nome: string = "";
  email: string = "";
  telefone: string = "";
  genero: string = "";
  data_nascimento: number | null = null;
  profissao: string = "";

  limparCampos() {
    this.nome = "";
    this.email = "";
    this.telefone = "";
    this.genero = "";
    this.data_nascimento = null;
    this.profissao = "";
  }

  enviarFormulario() {
    if (
      !this.nome ||
      !this.email ||
      !this.telefone ||
      !this.genero ||
      !this.data_nascimento ||
      !this.profissao
    ) {
      alert('Por favor, preencha todos os campos antes de enviar.');
    } else {
      alert('Formulário enviado com sucesso!');
      // Aqui você pode adicionar lógica para enviar os dados, como uma requisição HTTP
    }
  }
}
