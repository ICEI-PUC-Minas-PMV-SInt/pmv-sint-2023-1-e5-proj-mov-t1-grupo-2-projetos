# Metodologia

A metodologia de trabalho do grupo foi baseada em práticas ágeis, utilizando o Agile como guia para gerenciar e organizar as atividades do projeto. O trabalho foi dividido em etapas iterativas e incrementais, permitindo uma entrega contínua de valor e aprimoramento do software.

## Relação de Ambientes de Trabalho

As ferramentas e plataformas utilizadas neste projeto incluem:

- **Ambiente**: Desenvolvimento
- **Plataforma**: IntelliJ IDEA
- **Link de Acesso**: [https://www.jetbrains.com/idea/](https://www.jetbrains.com/idea/)

- **Ambiente**: Contêinerização
- **Plataforma**: Docker
- **Link de Acesso**: [https://www.docker.com/](https://www.docker.com/)

## Controle de Versão

A ferramenta de controle de versão adotada no projeto foi o [Git](https://git-scm.com/), sendo que o [Github](https://github.com) foi utilizado para hospedagem do repositório.

A configuração do projeto na ferramenta de versionamento escolhida foi feita seguindo boas práticas de gerência de tags, merges, commits e branches. As branches são criadas associadas aos tickets do Azure DevOps, por exemplo, `#42`. 

Quanto à gerência de issues, o projeto adota o [Azure DevOps](https://azure.microsoft.com/en-us/services/devops/) como ferramenta de gerenciamento e a seguinte convenção para etiquetas:

- `feature`: uma nova funcionalidade precisa ser introduzida
- `task`: uma tarefa relacionada a uma funcionalidade existente

## Gerenciamento de Projeto

### Divisão de Papéis

A equipe é composta pelos seguintes membros:

- Juan
- Erika

Ambos os membros são responsáveis pelo desenvolvimento e gerenciamento do projeto, dividindo tarefas e responsabilidades de acordo com suas habilidades e experiências.

### Processo

O grupo segue a metodologia Agile para o desenvolvimento do projeto, permitindo uma rápida adaptação às mudanças e melhorias contínuas no software. O gerenciamento das atividades é realizado por meio do Azure DevOps, onde são criados tickets para rastrear e organizar as tarefas e funcionalidades.

## Estratégia de Teste

A equipe adota uma abordagem sistemática e contínua para garantir a qualidade do software. Isso inclui a realização de testes unitários, de integração e de aceitação durante todo o processo de desenvolvimento. As seguintes ferramentas e práticas são utilizadas para auxiliar na implementação da estratégia de teste:

- Testes unitários são escritos usando o [JUnit](https://junit.org/junit5/) e [Testcontainers](https://www.testcontainers.org/) para garantir que cada componente individual funcione conforme esperado e esteja devidamente isolado.
- Testes de integração são realizados para verificar a correta interação entre os componentes do sistema.
- Testes de aceitação são conduzidos com base em cenários do mundo real e casos de uso para garantir que o software atenda aos requisitos do usuário e funcione corretamente no ambiente de produção.
- A integração contínua é implementada usando [GitHub Actions](https://github.com/features/actions), que automatizam a compilação, teste e implantação do software a cada novo commit no repositório.

Ao adotar essa abordagem abrangente para testes, a equipe garante que o software seja confiável, robusto e atenda às expectativas dos usuários.

### Ferramentas

As ferramentas empregadas no projeto são:

- **Editor de código**: IntelliJ IDEA
- **Controle de Versão**: Git e Github
- **Gerenciamento de Projeto**: Azure DevOps

O IntelliJ IDEA foi escolhido como editor de código por ser uma ferramenta poderosa e amplamente utilizada no desenvolvimento de aplicações Java, além de possuir integração com o Git. O Git e o Github foram escolhidos para o controle de versão e hospedagem do repositório, respectivamente, devido à sua popularidade e facilidade de uso. Por fim, o Azure DevOps foi escolhido como a plataforma de gerenciamento de projeto, pois permite uma maior integração com o Git e o Github, além de fornecer recursos úteis para rastrear e organizar as atividades do projeto.
