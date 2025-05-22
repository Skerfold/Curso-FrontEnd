export class Vaga {
  //atributos
  // id: number = 0;
  // nome: string = "";
  // foto: string = "";
  // descricao: string = "";
  // salario: number = 0;

  // constructor(id:number, nome:string, foto:string, descricao: string, salario:number){
  //   this.id = id,
  //   this.nome = nome;
  //   this.foto = foto;
  //   this.descricao = descricao
  //   this.salario = salario
  // }

  // ^ forma classica de criação de classe

  constructor(
    public id: number,
    public nome: string,
    public foto: string,
    public descricao: string,
    public salario: number
  ) {}

  // ^ forma encurtada de criação de classe

  // getter and setter -> quando os atributos forem privados (encapsulamento)
  // getId():number{
  //   return this.id;
  // }
  // setId(id:number): void{
  //   this.id = id
  // }
}
// ^ getters and setters são métodos que permitem acessar e modificar os atributos privados de uma classe
// ^ getters são métodos que retornam o valor de um atributo privado
// ^ setters são métodos que permitem modificar o valor de um atributo privado