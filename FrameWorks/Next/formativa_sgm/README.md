# Sistema de Gestão de Manutenções ( Formativa ) 


## Briefing 



## Escopo 

- Objetivos :

- Público-Alvo: 

- Recursos Tecnológicos: 



## Diagramas (Mermaid, Miro, Draw.io, e etc) 

### - Diagrama de Classe : 
```mermaid
classDiagram
    class Usuario {
        +id: int
        +nome: string
        +email: string
        +senha: string
        +perfil: string
        +login()
        +logout()
    }

    class Tecnico {
        +executarOrdemServico()
        +atualizarStatus()
    }

    class Gestor {
        +planejarManutencao()
        +atribuirOrdemServico()
        +gerarRelatorio()
    }

    class Administrador {
        +gerenciarUsuarios()
        +definirPermissoes()
    }

    class Equipamento {
        +id: int
        +nome: string
        +descricao: string
        +status: string
        +cadastrar()
        +atualizar()
    }

    class OrdemServico {
        +id: int
        +tipo: string
        +status: string
        +dataAbertura: Date
        +dataConclusao: Date
        +abrir()
        +atribuir()
        +finalizar()
    }

    class Manutencao {
        +id: int
        +tipo: string
        +dataPrevista: Date
        +dataRealizada: Date
        +descricao: string
        +registrar()
    }

    Usuario <|-- Tecnico
    Usuario <|-- Gestor
    Usuario <|-- Administrador

    Equipamento "1" --> "*" OrdemServico
    OrdemServico "1" --> "1" Manutencao
    Tecnico --> OrdemServico : executa >
    Gestor --> OrdemServico : atribui >
```
 



### - Diagrama de Fluxo : 
```mermaid
    flowchart TD
    A[Início] --> B[Tela de Login]
    B -->|Inserir credenciais| C{Credenciais válidas?}
    C -->|Não| D[Mensagem de Erro]
    D --> B
    C -->|Sim| E[Autenticação no Sistema]
    E --> F{Tipo de Usuário?}
    F -->|Técnico| G[Dashboard Técnico - OS Atribuídas]
    F -->|Gestor| H[Dashboard Gestor - Planejamento e Relatórios]
    F -->|Administrador| I[Dashboard Admin - Gestão de Usuários]
    G --> J[Fim]
    H --> J
    I --> J
```




### - Diagrama de Casos de Uso : 
```mermaid
graph TD
    subgraph Sistema de Gestão de Manutenção (SGM)
        uc1("Fazer Login")
        uc2("Gerenciar Equipamentos (CRUD)")
        uc3("Gerenciar Ordens de Serviço (CRUD)")
        uc4("Visualizar Dashboard")
        uc5("Gerenciar Usuários")
    end

    actor "Técnico de Manutenção" as Tecnico
    actor "Gestor de Manutenção" as Gestor
    actor "Administrador" as Admin

    Tecnico -- uc1
    Tecnico -- uc3
    Tecnico -- uc4

    Gestor -- uc1
    Gestor -- uc2
    Gestor -- uc3
    Gestor -- uc4

    Admin -- uc5
    Admin -- Gestor

    uc3 --|> uc1 : include
    uc2 --|> uc1 : include
    uc4 --|> uc1 : include
    uc5 --|> uc1 : include

```




## Análise de Risco 


## Prototipagem 


## Codificação 