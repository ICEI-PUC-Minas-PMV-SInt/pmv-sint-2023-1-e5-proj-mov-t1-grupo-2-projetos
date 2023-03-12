# Especificações do Projeto

<span style="color:red">Pré-requisitos: <a href="1-Documentação de Contexto.md"> Documentação de Contexto</a></span>

Definição do problema e ideia de solução a partir da perspectiva do usuário. É composta pela definição do  diagrama de personas, histórias de usuários, requisitos funcionais e não funcionais além das restrições do projeto.

Apresente uma visão geral do que será abordado nesta parte do documento, enumerando as técnicas e/ou ferramentas utilizadas para realizar a especificações do projeto

## Personas
### Sarah Lahaye - Coordenadora

- **Nome:** Sarah Lahaye
- **Idade:** 35 anos
- **Profissão:** Veterinária / Coordenadora da ONG
- **Conhecimentos prévios:** Vasta experiência em cuidados com animais, conhecimentos técnicos sobre adoção responsável.
- **Relação com a tecnologia:** Utiliza diariamente o computador e softwares especializados em veterinária, tem conhecimento intermediário de tecnologia.
- **Motivações:** Busca agilizar e tornar mais eficiente o processo de adoção de animais, auxiliar os voluntários na gestão de informações.
- **Frustrações:** Enfrenta dificuldades para lidar com a falta de organização na gestão de informações sobre os animais e adotantes, além de ter que lidar com processos manuais e burocráticos que consomem muito tempo e energia. Também fica frustrada com a falta de engajamento de alguns voluntários em relação às atividades da ONG e às orientações sobre cuidados com animais.

### Marie Leclerc - Gerente de cuidado animal

- **Nome:** Marie Leclerc
- **Idade:** 28 anos
- **Profissão:** Bióloga
- **Conhecimentos prévios:** Vasta experiência em cuidados com animais, conhecimentos técnicos sobre a saúde animal e adoção responsável.
- **Relação com a tecnologia:** Utiliza diariamente o computador e softwares especializados em biologia.
- **Motivações:** Garantir o bem-estar dos animais e a adoção responsável.
- **Frustrações:** Falta de recursos e apoio para fornecer cuidados adequados aos animais, dificuldade em encontrar lares responsáveis para os animais sob cuidado da ONG.

### Olivier Martin - Secretário / Tesoureiro

- **Nome:** Olivier Martin
- **Idade:** 45 anos
- **Profissão:** Contador
- **Conhecimentos prévios:** Conhecimento em gestão financeira e trabalho voluntário.
- **Relação com a tecnologia:** Utiliza diariamente o computador e softwares especializados em contabilidade.
- **Motivações:** Garantir que a ONG tenha uma gestão financeira eficiente e transparente.
- **Frustrações:** Dificuldade em conciliar as responsabilidades financeiras da ONG com sua vida pessoal e profissional, falta de transparência e responsabilidade por parte dos outros membros da diretoria.

### Antoine Rousseau - Veterinário

- **Nome:** Antoine Rousseau
- **Idade:** 37 anos
- **Profissão:** Veterinário
- **Conhecimentos prévios:** Vasta experiência em cuidados com animais e conhecimentos técnicos sobre a saúde animal.
- **Relação com a tecnologia:** Utiliza diariamente o computador e softwares especializados em veterinária.
- **Motivações:** Garantir o bem-estar dos animais e a adoção responsável.
- **Frustrações:** Falta de recursos e apoio para fornecer cuidados adequados aos animais, falta de comprometimento por parte dos voluntários da ONG.

## Histórias de Usuários

Com base na análise das personas forma identificadas as seguintes histórias de usuários:

|EU COMO... `PERSONA`| QUERO/PRECISO ... `FUNCIONALIDADE` |PARA ... `MOTIVO/VALOR`                 |
|--------------------|------------------------------------|----------------------------------------|
|Marie Leclerc       | Plataforma de gestão animal         | Monitorar saúde, nutrição e comportamento|
|                    |                                    | dos animais sob cuidados da ONG         |
|Olivier Martin      | Plataforma de gestão financeira     | Rastrear transações, gerar relatórios    |
|                    |                                    | precisos e garantir transparência       |
|                    |                                    | nas finanças da organização             |
|Antoine Rousseau    | Plataforma de comunicação           | Acompanhar histórico médico de cada animal|
|                    |                                    | e garantir tratamento e medicamentos    |
|                    |                                    | necessários para os animais da ONG      |
|Sarah Lahaye        | Plataforma de comunicação eficiente | Monitorar progresso de cada adoção e    |
|                    | entre voluntários, adotantes e      | garantir um lar amoroso para todos os   |
|                    | coordenadores da ONG                | animais sob cuidados da ONG             |


## Modelagem do Processo de Negócio 

### Análise da Situação Atual

Após a identificação das atividades realizadas pela ONG, foi feita uma análise das informações coletadas por meio de entrevistas com voluntários e coordenadores. Essa análise permitiu a identificação de pontos fortes e pontos fracos do processo atual de adoção de animais.

Os pontos fortes identificados foram:
- Os voluntários são dedicados e comprometidos com a causa;
- A ONG possui um grande número de animais disponíveis para adoção;
- Os voluntários realizam feiras de adoção regularmente.

Já os pontos fracos foram:
- O processo de adoção é manual e demorado;
- A ONG não possui um sistema de gerenciamento de dados para animais e adotantes;
- A comunicação com os potenciais adotantes é feita de forma precária;
- A falta de transparência nas informações disponibilizadas pela ONG para potenciais adotantes pode gerar desconfiança.

Com base na análise realizada, pode-se concluir que a ONG precisa modernizar e informatizar seus processos, buscando maior eficiência e transparência na gestão de adoção de animais. Além disso, é importante investir em comunicação efetiva com os potenciais adotantes, a fim de proporcionar um processo mais ágil e transparente, facilitando a adoção responsável de animais.



### Descrição Geral da Proposta

A proposta consiste em desenvolver e implementar uma solução que abrange aprimoramentos na interface e segurança de armazenamento de dados, além de otimizações no processo de adoção de animais da ONG. A solução tem como objetivo facilitar o trabalho dos voluntários e coordenadores da ONG, bem como proporcionar uma maior transparência e eficiência na gestão de adoção.
Os limites da proposta estão diretamente ligados à capacidade de implementação da solução dentro dos recursos disponíveis pela ONG. É importante destacar que a proposta não visa substituir o trabalho dos voluntários e coordenadores da ONG, mas sim proporcionar ferramentas e processos mais eficientes que auxiliem no desenvolvimento das atividades já existentes.

A proposta está alinhada com as estratégias e objetivos da ONG, que visam promover o bem-estar e proteção dos animais, além de estimular a conscientização e engajamento da sociedade em relação às causas dos animais abandonados.

As oportunidades de melhorias apresentadas pela proposta são diversas. A interface amigável e intuitiva vai permitir que os voluntários e coordenadores trabalhem com maior facilidade e agilidade, evitando retrabalho e aumentando a produtividade. Além disso, o sistema de armazenamento seguro e confidencial de dados vai garantir a proteção das informações dos animais e potenciais adotantes, evitando perdas ou vazamentos de dados sensíveis.

Já a otimização do processo de adoção de animais, com a utilização de ferramentas e processos mais eficientes, vai reduzir o tempo de espera dos adotantes e agilizar a aprovação dos candidatos, proporcionando uma maior transparência e eficiência na gestão de adoção.

Em resumo, a proposta apresenta oportunidades de melhorias significativas para a ONG, com o fornecimento de um aplicativo movél e segurança de armazenamento de dados, além de otimizações no processo de adoção de animais.


### Processo 1 – Processo de Adoção de Animais

![XP91Ri8m44NtFiKiuGgmA2oenAvYqVrWJ-X8ZYUo7QHMtAQBhZX5BjQ94q6W5UoYyN__Vq-yIXbZRcjlCcTFy1R5Kae2Zc3jfFlfleVlm3LoCkQq3TtPifnC8SrYHvRs5269PyiPBmYE-D8itYbonHOZE4wD1DwpPuSgSWBOM_kbuGfc9SQFgkvy9FyoX_n10MQVbEO6OB4-K73gTEIaQSj-](https://user-images.githubusercontent.com/4424108/224519920-5d2d6bea-32d2-4fe5-8f89-fe7897a3a150.svg)


## Indicadores de Desempenho
<table>
   <thead>
      <tr>
         <th>Indicador</th>
         <th>Objetivos</th>
         <th>Descrição</th>
         <th>Cálculo</th>
         <th>Fonte de dados</th>
         <th>Perspectiva</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td>Número de adoções</td>
         <td>Aperfeiçoar o processo de adoção de animais</td>
         <td>Mede o número total de animais adotados em um determinado período de tempo</td>
         <td>Total de adoções realizadas</td>
         <td>Sistema interno da ONG</td>
         <td>Processo interno</td>
      </tr>
      <tr>
         <td>Satisfação dos voluntários</td>
         <td>Desenvolver uma interface amigável e intuitiva para facilitar o trabalho dos voluntários e coordenadores da ONG</td>
         <td>Mede a satisfação dos voluntários em relação à interface do sistema</td>
         <td>Pesquisa de satisfação com os voluntários</td>
         <td>Sistema interno da ONG</td>
         <td>Processo interno</td>
      </tr>
      <tr>
         <td>Tempo médio de atendimento aos adotantes</td>
         <td>Agilizar os trâmites e proporcionar maior transparência e eficiência na gestão do processo de adoção</td>
         <td>Mede o tempo médio que o adotante leva desde o primeiro contato com a ONG até a finalização do processo de adoção</td>
         <td>Tempo total de atendimento aos adotantes / Número de adoções realizadas</td>
         <td>Sistema interno da ONG</td>
         <td>Processo interno</td>
      </tr>
      <tr>
         <td>Taxa de abandono</td>
         <td>Melhorar o acompanhamento dos animais adotados e garantir que eles não sejam abandonados novamente</td>
         <td>Mede a porcentagem de animais que são devolvidos ou abandonados pelos adotantes</td>
         <td>Número de animais devolvidos ou abandonados / Número total de adoções realizadas</td>
         <td>Sistema interno da ONG</td>
         <td>Clientes</td>
      </tr>
      <tr>
         <td>Índice de efetividade do sistema de armazenamento de dados</td>
         <td>Implementar um sistema de armazenamento seguro e confidencial de dados</td>
         <td>Mede a efetividade do sistema de armazenamento de dados em garantir a segurança e confidencialidade das informações dos animais e adotantes</td>
         <td>Número de violações de segurança de dados / Número total de registros armazenados</td>
         <td>Sistema interno da ONG</td>
         <td>Processo interno</td>
      </tr>
   </tbody>
</table>

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto. Para determinar a prioridade de requisitos, aplicar uma técnica de priorização de requisitos e detalhar como a técnica foi aplicada.

### Requisitos Funcionais

<table>
  <thead>
    <tr>
      <th>ID</th>
      <th>Descrição do Requisito</th>
      <th>Prioridade</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>RF01</td>
      <td>Cadastro de animais: O sistema deve permitir o cadastro de animais, contendo as informações necessárias para sua identificação, como nome, idade, raça, sexo, porte, estado de saúde, entre outras.</td>
      <td>ALTA</td>
    </tr>
    <tr>
      <td>RF02</td>
      <td>Cadastro de adotantes: O sistema deve permitir o cadastro de adotantes interessados em adotar um animal, contendo informações básicas, como nome, endereço, telefone, e-mail, entre outras.</td>
      <td>ALTA</td>
    </tr>
    <tr>
      <td>RF03</td>
      <td>Adoção de animais: O sistema deve permitir o processo de adoção de animais, incluindo o registro do processo de adoção e as informações do adotante.</td>
      <td>ALTA</td>
    </tr>
    <tr>
      <td>RF04</td>
      <td>Agendamento de visitas: O sistema deve permitir o agendamento de visitas para conhecer os animais disponíveis para adoção.</td>
      <td>MÉDIA</td>
    </tr>
    <tr>
      <td>RF05</td>
      <td>Relatório de animais adotados: O sistema deve permitir a emissão de relatórios com informações sobre os animais adotados.</td>
      <td>MÉDIA</td>
    </tr>
    <tr>
      <td>RF06</td>
      <td>Gerenciamento de doações: O sistema deve permitir o gerenciamento das doações recebidas pela ONG, registrando informações como data, valor, doador, entre outras.</td>
      <td>ALTA</td>
    </tr>
    <tr>
      <td>RF07</td>
      <td>Acessibilidade: Sistema deve possuir recursos de acessibilidade para usuários com deficiência visual.</td>
      <td>ALTA</td>
    </tr>
    <tr>
      <td>RF08</td>
      <td>A interface deve ser responsiva, adaptando-se a diferentes tamanhos de tela, como tablet e smartphone.</td>
      <td>ALTA</td>
    </tr>
  </tbody>
</table>

### Requisitos não Funcionais

<table>
  <tr>
    <th>ID</th>
    <th>Descrição do Requisito</th>
    <th>Prioridade</th>
  </tr>
  <tr>
    <td>RNF01</td>
    <td>Segurança: O sistema deve garantir a segurança das informações dos animais e adotantes cadastrados, evitando possíveis vazamentos de informações.</td>
    <td>ALTA</td>
  </tr>
  <tr>
    <td>RNF02</td>
    <td>Usabilidade: O sistema deve ser fácil de usar e intuitivo, para que voluntários e coordenadores possam realizar suas atividades de maneira eficiente.</td>
    <td>MÉDIA</td>
  </tr>
  <tr>
    <td>RNF03</td>
    <td>Confiabilidade: O sistema deve ser confiável e disponível para uso, garantindo que as informações estejam sempre acessíveis e atualizadas.</td>
    <td>ALTA</td>
  </tr>
  <tr>
    <td>RNF04</td>
    <td>Performance: O sistema deve ter um desempenho satisfatório, evitando lentidão ou falhas durante o uso.</td>
    <td>MÉDIA</td>
  </tr>
  <tr>
    <td>RNF05</td>
    <td>Manutenibilidade: O sistema deve ser facilmente mantido e atualizado, para que possíveis correções e melhorias possam ser implementadas com eficiência.</td>
    <td>BAIXA</td>
  </tr>
</table>

## Restrições

<table><thead><tr><th>ID</th><th>Restrição</th></tr></thead><tbody><tr><td>01</td><td>Restrição de acesso: o sistema deve permitir o acesso apenas a usuários autorizados, como voluntários e coordenadores da ONG, evitando acesso não autorizado de terceiros.</td></tr><tr><td>02</td><td>Restrição de cadastro: o cadastro de animais e adotantes deve ser restrito aos usuários autorizados, com acesso limitado apenas às informações necessárias para a realização das atividades da ONG.</td></tr><tr><td>03</td><td>Restrição de edição: as informações cadastradas no sistema devem ter restrição de edição, garantindo a integridade das informações e evitando possíveis erros ou fraudes.</td></tr><tr><td>04</td><td>Restrição de exclusão: o sistema deve permitir a exclusão de informações apenas por usuários autorizados e mediante justificativa, para evitar a perda de informações importantes ou maliciosas.</td></tr><tr><td>05</td><td>Restrição de visibilidade: algumas informações cadastradas no sistema, como dados de saúde dos animais, devem ter sua visibilidade restrita apenas aos usuários autorizados, garantindo a privacidade dos dados sensíveis.</td></tr><tr><td>06</td><td>Restrição de exportação: o sistema deve ter restrição para exportação de dados, evitando possíveis vazamentos de informações e garantindo a segurança das informações cadastradas.</td></tr></tbody></table>

## Diagrama de Casos de Uso

![image](https://user-images.githubusercontent.com/4424108/224515855-f98e4a79-be61-48cf-9a9d-04ddc46a465b.png)

# Matriz de Rastreabilidade

<table><thead><tr><th>Requisito</th><th>RF01</th><th>RF02</th><th>RF03</th><th>RF04</th><th>RF05</th><th>RF06</th><th>RF07</th><th>RF08</th></tr></thead><tbody><tr><td>RNF01</td><td>X</td><td>X</td><td>X</td><td></td><td>X</td><td>X</td><td>X</td><td>X</td></tr><tr><td>RNF02</td><td></td><td></td><td></td><td>X</td><td></td><td></td><td></td><td></td></tr><tr><td>RNF03</td><td>X</td><td>X</td><td>X</td><td></td><td>X</td><td></td><td></td><td></td></tr><tr><td>RNF04</td><td></td><td></td><td></td><td></td><td>X</td><td></td><td></td><td></td></tr><tr><td>RNF05</td><td></td><td></td><td></td><td>X</td><td></td><td>X</td><td></td><td></td></tr></tbody></table>

A matriz de rastreabilidade mostra que o requisito RNF01 está relacionado com todos os requisitos funcionais, exceto RF04. Já o requisito RNF02 está relacionado apenas com RF04. O requisito RNF03 está relacionado com todos os requisitos funcionais, exceto RF04 e RF06. O requisito RNF04 está relacionado apenas com RF05. Por fim, o requisito RNF05 está relacionado com RF04 e RF06.

# Gerenciamento de Projeto

De acordo com o PMBoK v6 as dez áreas que constituem os pilares para gerenciar projetos, e que caracterizam a multidisciplinaridade envolvida, são: Integração, Escopo, Cronograma (Tempo), Custos, Qualidade, Recursos, Comunicações, Riscos, Aquisições, Partes Interessadas. Para desenvolver projetos um profissional deve se preocupar em gerenciar todas essas dez áreas. Elas se complementam e se relacionam, de tal forma que não se deve apenas examinar uma área de forma estanque. É preciso considerar, por exemplo, que as áreas de Escopo, Cronograma e Custos estão muito relacionadas. Assim, se eu amplio o escopo de um projeto eu posso afetar seu cronograma e seus custos.

## Gerenciamento de Tempo

![image](https://user-images.githubusercontent.com/4424108/224517602-0213de96-649e-4b57-a614-ce36275f1b33.png)


## Gerenciamento de Equipe

<table><thead><tr><th>Etapa</th><th>Descrição</th><th>Início</th><th>Fim</th><th>Duração (dias)</th><th>Responsável</th></tr></thead><tbody><tr><td>Análise de requisitos e design do sistema</td><td>Levantamento de requisitos e elaboração do design do sistema</td><td>16/02/2023</td><td>02/03/2023</td><td>14</td><td>Juan</td></tr><tr><td>Desenvolvimento do banco de dados e protótipo</td><td>Criação do banco de dados e protótipo do sistema</td><td>03/03/2023</td><td>12/03/2023</td><td>10</td><td>Erika</td></tr><tr><td>Desenvolvimento do módulo de cadastro de animais</td><td>Desenvolvimento do módulo de cadastro de animais</td><td>13/03/2023</td><td>27/03/2023</td><td>15</td><td>Juan</td></tr><tr><td>Desenvolvimento do módulo de cadastro de adotantes</td><td>Desenvolvimento do módulo de cadastro de adotantes</td><td>13/03/2023</td><td>27/03/2023</td><td>15</td><td>Erika</td></tr><tr><td>Desenvolvimento do módulo de adoção de animais</td><td>Desenvolvimento do módulo de adoção de animais</td><td>28/03/2023</td><td>11/04/2023</td><td>15</td><td>Erika</td></tr><tr><td>Desenvolvimento do módulo de agendamento de visitas</td><td>Desenvolvimento do módulo de agendamento de visitas</td><td>28/03/2023</td><td>11/04/2023</td><td>15</td><td>Juan</td></tr><tr><td>Desenvolvimento do módulo de gerenciamento de doações</td><td>Desenvolvimento do módulo de gerenciamento de doações</td><td>12/04/2023</td><td>26/04/2023</td><td>15</td><td>Juan</td></tr><tr><td>Testes de integração e validação do sistema</td><td>Testes de integração e validação do sistema</td><td>27/04/2023</td><td>05/05/2023</td><td>9</td><td>Juan e Erika</td></tr><tr><td>Implantação do sistema</td><td>Implantação do sistema</td><td>06/05/2023</td><td>09/05/2023</td><td>4</td><td>Juan e Erika</td></tr></tbody></table>

## Gestão de Orçamento

<table><thead><tr><th>Etapa</th><th>Descrição</th><th>Início</th><th>Fim</th><th>Duração (dias)</th><th>Custo Estimado (R$)</th></tr></thead><tbody><tr><td>Análise de requisitos e design do sistema</td><td>Levantamento de requisitos e elaboração do design do sistema</td><td>16/02/2023</td><td>02/03/2023</td><td>14</td><td>10.000</td></tr><tr><td>Desenvolvimento do banco de dados e protótipo</td><td>Criação do banco de dados e protótipo do sistema</td><td>03/03/2023</td><td>12/03/2023</td><td>10</td><td>15.000</td></tr><tr><td>Desenvolvimento do módulo de cadastro de animais</td><td>Desenvolvimento do módulo de cadastro de animais</td><td>13/03/2023</td><td>27/03/2023</td><td>15</td><td>20.000</td></tr><tr><td>Desenvolvimento do módulo de cadastro de adotantes</td><td>Desenvolvimento do módulo de cadastro de adotantes</td><td>13/03/2023</td><td>27/03/2023</td><td>15</td><td>20.000</td></tr><tr><td>Desenvolvimento do módulo de adoção de animais</td><td>Desenvolvimento do módulo de adoção de animais</td><td>28/03/2023</td><td>11/04/2023</td><td>15</td><td>25.000</td></tr><tr><td>Desenvolvimento do módulo de agendamento de visitas</td><td>Desenvolvimento do módulo de agendamento de visitas</td><td>28/03/2023</td><td>11/04/2023</td><td>15</td><td>25.000</td></tr><tr><td>Desenvolvimento do módulo de gerenciamento de doações</td><td>Desenvolvimento do módulo de gerenciamento de doações</td><td>12/04/2023</td><td>26/04/2023</td><td>15</td><td>20.000</td></tr><tr><td>Testes de integração e validação do sistema</td><td>Testes de integração e validação do sistema</td><td>27/04/2023</td><td>05/05/2023</td><td>9</td><td>10.000</td></tr><tr><td>Implantação do sistema</td><td>Implantação do sistema</td><td>06/05/2023</td><td>09/05/2023</td><td>4</td><td>5.000</td></tr><tr><td>Treinamento dos usuários</td><td>Treinamento dos usuários</td><td>10/05/2023</td><td>12/05/2023</td><td>3</td><td>5.000</td></tr><tr><td>Sustentação do sistema</td><td>Sustentação do sistema após a implantação (1 ano)</td><td>13/05/2023</td><td>12/05/2024</td><td>365</td><td>50.000</td></tr><tr><td><strong>Total</strong></td><td></td><td></td><td></td><td><strong>461</strong></td><td><strong>200.000</strong></td></tr></tbody></table>
