# Arquitetura da Solução

<span style="color:red">Pré-requisitos: <a href="3-Projeto de Interface.md"> Projeto de Interface</a></span>

Definição de como o software é estruturado em termos dos componentes que fazem parte da solução e do ambiente de hospedagem da aplicação.

![Arquitetura da Solução](img/02-mob-arch.png)

## Diagrama de Classes

![Adopter-dans-les-Ardennes](https://user-images.githubusercontent.com/4424108/232324842-e3c3062f-9081-4d88-ad34-342f2b1a9fbd.png)

## Esquema Relacional &  Modelo ER

![ERD](https://user-images.githubusercontent.com/4424108/232324835-b6ac3638-8f2a-47d5-9587-6cc54654c00a.png)


## Modelo Físico

O modelo está localizado em src/main/resources/db/changelog ( devido a utilização de software de migração de banco de dados )

## Tecnologias Utilizadas

A aplicação é baseada no framework Spring Boot e adota uma arquitetura baseada em microserviços. A seguir estão as principais tecnologias utilizadas:

- Linguagem de Programação: Java 17
- Framework: Spring Boot 3.0.4
- Banco de Dados: PostgreSQL (com suporte R2DBC para acesso reativo aos dados)
- API: Spring Webflux para a criação de APIs reativas e não bloqueantes
- Autenticação e Autorização: Spring Security e JSON Web Tokens (JWT)
- Documentação de API: Springdoc OpenAPI UI
- Monitoramento e Telemetria: Spring Boot Actuator, Application Insights e Micrometer (com integração ao Brave Tracing)
- Integração com Azure: Spring Cloud Azure (com suporte para Azure Key Vault, Azure Storage e PostgreSQL no Azure)
- Mapeamento de objetos: MapStruct
- Migração de Banco de Dados: R2DBC Migrate
- Testes: JUnit, Testcontainers, Reactor Test, Spring Restdocs e Rest Assured
- Lombok: Para simplificar a escrita do código Java
- Asciidoctor: Para a geração de documentação

O projeto é organizado em camadas, incluindo camadas de apresentação, negócios e acesso a dados. Essas camadas interagem entre si através de serviços e APIs.

A camada de apresentação é responsável por expor APIs RESTful para os clientes. A camada de negócios lida com a lógica do aplicativo e a camada de acesso a dados gerencia a persistência e a recuperação de dados no banco de dados PostgreSQL.

O projeto também utiliza Docker como uma ferramenta para o gerenciamento de ambientes de desenvolvimento.

<pre>
+----------------+    +---------------------+    +----------------+    +-----------------+
| Interface do   |    | Camada de           |    | Camada de      |    | Camada de       |
| Cliente        +--->+ Apresentação (API)  +--->+ Negócios       +--->+ Acesso a Dados |
+----------------+    +---------------------+    +----------------+    +-----------------+
                             ^                         ^                      ^
                             |                         |                      |
                             v                         v                      v
                    +----------------+       +----------------+     +----------------+
                    | Spring Security|       |Monitoramento e |     |   PostgreSQL   |
                    |       &        |       | Telemetria     |     +----------------+
                    |      JWT       |       +----------------+
                    +----------------+ 
                             ^
                             |
                             v
                    +----------------+
                    | Spring Cloud   |
                    |     Azure      |
                    +----------------+
</pre>

## Hospedagem

O projeto foi hospedado e implantado na nuvem usando a plataforma Azure da Microsoft, especificamente o serviço Azure Web App. A escolha do Azure foi motivada pelo uso do Spring Cloud Azure, que facilita a integração com os serviços do Azure, incluindo o Azure Storage e o PostgreSQL no Azure.

### Passos para hospedagem e lançamento:

1. **Preparação do ambiente do Azure**: Foi necessário configurar uma conta no Azure e criar os recursos necessários para a hospedagem, como grupos de recursos, planos de serviço de aplicativo e instâncias de banco de dados PostgreSQL.

2. **Preparação do aplicativo**: O aplicativo foi empacotado como um arquivo JAR autocontido usando o Maven, incluindo todas as dependências necessárias para executar o aplicativo na plataforma do Azure.

3. **Configuração do GitHub Actions**: Foi criado um workflow no GitHub Actions para automatizar o processo de Integração Contínua (CI) e Implantação Contínua (CD). O workflow foi configurado para compilar o aplicativo, executar testes e implantar o aplicativo no Azure Web App sempre que houvesse uma alteração no repositório do GitHub.

4. **Implantação no Azure**: O aplicativo foi implantado usando o serviço Azure Web App, configurado para executar aplicativos Java.

5. **Monitoramento e telemetria**: O monitoramento e a telemetria do aplicativo foram habilitados usando o Application Insights e o Micrometer, permitindo que a equipe acompanhasse o desempenho do aplicativo e identificasse problemas em tempo real.

## Qualidade de Software

Com base na norma ISO/IEC 25010 e no contexto do seu projeto, escolhemos as seguintes subcaracterísticas de qualidade para nortear o desenvolvimento do software.

### Eficiência de desempenho
Garantir que o software tenha um bom desempenho e baixo consumo de recursos, mesmo com um grande número de usuários simultâneos.

- Métricas: Tempo de resposta, utilização de recursos, taxa de transferência.

### Compatibilidade
Assegurar que o software seja compatível com os sistemas, dispositivos e navegadores mais comuns utilizados pelos usuários.

- Métricas: Porcentagem de dispositivos e navegadores compatíveis, tempo de suporte para novas versões.

### Usabilidade
Fornecer uma interface intuitiva e fácil de usar, tornando o software acessível e eficiente para os usuários.

- Métricas: Taxa de sucesso de tarefas, tempo médio para concluir uma tarefa, satisfação do usuário.

### Confiabilidade
Garantir que o software seja robusto e funcione corretamente sob condições normais e excepcionais.

- Métricas: Tempo médio entre falhas, taxa de recuperação após falhas, disponibilidade do sistema.

### Segurança
Proteger o software contra ameaças e garantir a privacidade e integridade dos dados dos usuários.

- Métricas: Número de vulnerabilidades de segurança identificadas e corrigidas, tempo médio para correção de vulnerabilidades, taxa de incidentes de segurança.

### Manutenibilidade
Facilitar a manutenção e evolução do software, permitindo que ele seja atualizado e melhorado ao longo do tempo.

- Métricas: Complexidade do código, tempo médio para correção de bugs, taxa de reutilização de código.

### Portabilidade
Possibilitar que o software seja facilmente transferido e instalado em diferentes ambientes e plataformas.

- Métricas: Número de plataformas suportadas, tempo médio para adaptação a uma nova plataforma.

### Testabilidade
Assegurar que o software possa ser facilmente testado e validado, garantindo sua qualidade e funcionamento correto.

- Métricas: Cobertura de testes, taxa de defeitos encontrados durante os testes, tempo médio para execução de testes.

Estas subcaracterísticas foram escolhidas com base nas necessidades específicas do projeto e no objetivo de fornecer um produto de software de alta qualidade. As métricas associadas a cada subcaracterística permitirão à equipe avaliar o desempenho do software em relação a esses critérios e fazer ajustes conforme necessário durante o desenvolvimento.
