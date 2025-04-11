// 1 -

class Produto {
  constructor(nome, preco, estoque) {
    this.nome = nome;
    this.preco = preco;
    this.estoque = estoque;
  }

  vender(quantidade) {
    if (quantidade <= this.estoque) {
      this.estoque -= quantidade;
    } else {
      console.log("Estoque insuficiente.");
    }
  }

  repor(quantidade) {
    this.estoque += quantidade;
  }

  exibirInfo() {
    console.log(
      `Produto: ${this.nome}, Preço: R$${this.preco}, Estoque: ${this.estoque}`
    );
  }
}

// Teste
let p1 = new Produto("Notebook", 3000, 10);
p1.vender(2);
p1.repor(5);
p1.exibirInfo();

// 2 -

class Veiculo {
    constructor(marca, modelo, ano) {
      this.marca = marca;
      this.modelo = modelo;
      this.ano = ano;
    }
  
    exibirInfo() {
      console.log(`Marca: ${this.marca}, Modelo: ${this.modelo}, Ano: ${this.ano}`);
    }
  }
  
  class Carro extends Veiculo {
    constructor(marca, modelo, ano, quantidadePortas) {
      super(marca, modelo, ano);
      this.quantidadePortas = quantidadePortas;
    }
  
    exibirInfo() {
      super.exibirInfo();
      console.log(`Portas: ${this.quantidadePortas}`);
    }
  }
  
  // Teste
  let carro = new Carro("Fiat", "Uno", 2022, 4);
  carro.exibirInfo();
  
// 3 -

class ContaBancaria {
    constructor(titular, saldo) {
      this.titular = titular;
      this.saldo = saldo;
    }
  
    depositar(valor) {
      this.saldo += valor;
    }
  
    sacar(valor) {
      if (valor <= this.saldo) {
        this.saldo -= valor;
      } else {
        console.log("Saldo insuficiente.");
      }
    }
  
    exibirSaldo() {
      console.log(`Titular: ${this.titular}, Saldo: R$${this.saldo}`);
    }
  }
  
  // Teste
  let conta = new ContaBancaria("João", 1000);
  conta.depositar(500);
  conta.sacar(200);
  conta.exibirSaldo();

// 4 -

class Funcionario {
    constructor(nome, salario, cargo) {
      this.nome = nome;
      this.salario = salario;
      this.cargo = cargo;
    }
  
    aumentarSalario(percentual) {
      this.salario += this.salario * (percentual / 100);
    }
  
    exibirInfo() {
      console.log(`Nome: ${this.nome}, Cargo: ${this.cargo}, Salário: R$${this.salario.toFixed(2)}`);
    }
  }
  
  // Teste
  let f1 = new Funcionario("Ana", 2500, "Analista");
  f1.aumentarSalario(10);
  f1.exibirInfo();
  