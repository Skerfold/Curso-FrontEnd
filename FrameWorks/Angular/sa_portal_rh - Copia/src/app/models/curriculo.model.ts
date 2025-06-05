export class Curriculo {
  public get formacao(): string {
    return this._formacao
  }
  public set formacao(value: string) {
    this._formacao = value
  }
  public get experiencia(): string {
    return this._experiencia
  }
  public set experiencia(value: string) {
    this._experiencia = value
  }
  public get descricao(): string {
    return this._descricao
  }
  public set descricao(value: string) {
    this._descricao = value
  }
  public get foto(): string {
    return this._foto
  }
  public set foto(value: string) {
    this._foto = value
  }
  public get nome(): string {
    return this._nome
  }
  public set nome(value: string) {
    this._nome = value
  }
  public get cpf(): number {
    return this._cpf
  }
  public set cpf(value: number) {
    this._cpf = value
  }
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
    private _cpf: number,
    private _nome: string,
    private _foto: string,
    private _descricao: string,
    private _experiencia: string,
    private _formacao: string,
  ) {}

  // ^ forma encurtada de criação de classe

  // getter and setter -> quando os atributos forem privados (encapsulamento)
  // getId():number{
  //   return this.id;
  // }
  // setId(id:number): void{
  //   this.id = id
  // }

  //toMap Obj -> Api
  toMap(): {[key:string]:any} {
    return{
      id: this.cpf, 
      nome: this.nome,
      foto: this.foto,
      descricao: this.descricao,
      experiencia: this.experiencia,
      formacao: this.formacao
    }
  }

  //fromMap API -> OBJ
 fromMap(map:any):Curriculo{
    return new Curriculo(
      map.id,
      map.nome,
      map.foto,
      map.descricao,
      map.experiencia,
      map.formacao,

    )
  }


}
