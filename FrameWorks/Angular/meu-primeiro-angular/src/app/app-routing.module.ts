import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ProdutosComponent } from './pages/produtos/produtos.component';
import { ContatoComponent } from './pages/contato/contato.component';

const routes: Routes = [ // cria as rotas de navegação 
  {path: "", component: InicioComponent}, // rota padrão
  {path: "produtos", component: ProdutosComponent}, // rota para produtos
  {path: "contato", component: ContatoComponent}, // rota para contato  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
