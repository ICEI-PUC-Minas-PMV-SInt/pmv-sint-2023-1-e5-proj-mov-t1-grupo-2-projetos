# Adopter dans les Ardennes

## Description
Adopter dans les Ardennes is a Spring Boot application for managing adopter information.

## Technologies Used
- Java 17
- Spring Boot 3.0.4
- Spring WebFlux
- R2DBC
- PostgreSQL
- Azure Application Insights
- Azure Blob Storage

## Running the Application Locally
To run the application locally, you need to have Java and Spring Boot installed on your machine.

1. Clone the project from the GitHub repository:
 ```bash
   git clone https://github.com/juanmarques/Adopter-dans-les-Ardennes.git
````

2. Import the project into IntelliJ IDEA:
- Open IntelliJ IDEA.
- Click on **File** -> **New** -> **Project from Existing Sources**.
- Navigate to the directory where you cloned the project.
- Select the directory and click **OK**.
- In the next window, select **Import project from external model** and choose **Maven** or **Gradle** based on your project structure, then click **Next** and follow the instructions.

3. Run the application within IntelliJ IDEA:
- Right-click on the `AdopterDlaApplication.java` file located in `src/main/java/com/jme/adopterdla/adopterdla/`.
- Select **Run AdopterDlaApplication**.

## Endpoints

### AdopterController
- `GET /api/adopters`: Get all adopters
- `GET /api/adopters/{id}`: Get an adopter by ID
- `POST /api/adopters`: Create a new adopter

### AnimalController
- `GET /api/animals/names-ids`: Get available animal names and IDs
- `GET /api/animals/available`: Get all animals by availability
- `GET /api/animals/{id}`: Get an animal by ID
- `DELETE /api/animals/{id}`: Delete an animal
- `GET /api/animals`: Get all animals
- `POST /api/animals`: Create a new animal

### AuthController
- `POST /api/auth/refresh`: Refresh the authentication token
- `POST /api/auth/login`: Login with credentials

### AdoptionProcessController
- `GET /api/adoption-processes/{id}`: Get an adoption process by ID
- `GET /api/adoption-processes`: Get all adoption processes
- `PUT /api/adoption-processes/{id}`: Update an adoption process
- `POST /api/adoption-processes`: Create a new adoption process

### UserController
- `POST /api/user/change-password`: Change the user password

### ShelterVisitController
- `POST /api/shelter-visits`: Create a new shelter visit
- `PUT /api/shelter-visits/{id}`: Update a shelter visit
- `DELETE /api/shelter-visits/{id}`: Delete a shelter visit
- `GET /api/shelter-visits/{id}`: Get a shelter visit by ID
- `GET /api/shelter-visits`: Get all shelter visits

### VolunteerController
- `GET /api/volunteers/{id}`: Get a volunteer by ID
- `POST /api/volunteers`: Create a new volunteer
- `GET /api/volunteers`: Get all volunteers
- `DELETE /api/volunteers/{id}`: Delete a volunteer

## Environment Properties
Configure the following environment properties in your local environment or deployment environment:

```properties
# PostgreSQL R2DBC configuration
spring.r2dbc.url=${DB_URL:r2dbc:postgresql://localhost:5432/postgres}
spring.r2dbc.username=${DB_USERNAME:postgres}
spring.r2dbc.password=${DB_PASSWORD:postgres}
r2dbc.migrate.resources-paths=classpath:/db/changelog/*.sql

# Azure Storage configuration
azure.storage.account-name=${AZURE_STORAGE_ACCOUNT_NAME}
azure.storage.account-key=${AZURE_STORAGE_ACCOUNT_KEY}
azure.storage.container-name=${AZURE_STORAGE_CONTAINER_NAME}

# JWT configuration
jwt.secret=${JWT_SECRET}
jwt.expiration.minutes=${JWT_EXPIRATION_MINUTES:30}

logging.level.org.springframework.web=TRACE

springdoc.show-actuator=true

spring.codec.max-in-memory-size=5048576
```

## Deployment on Azure
The application is designed to be deployed on Azure. Ensure you have the following setup:

- Azure PostgreSQL instance
- Azure Storage account
  Configure the environment properties mentioned above with the appropriate values for your Azure services.

Please note that you need to replace the placeholders with the actual values relevant to your environment.
- ${DB_URL}
- ${DB_USERNAME}
- ${DB_PASSWORD}
- ${AZURE_STORAGE_ACCOUNT_NAME}
- ${AZURE_STORAGE_ACCOUNT_KEY}
- ${AZURE_STORAGE_CONTAINER_NAME}
- ${JWT_SECRET}
- ${JWT_EXPIRATION_MINUTES:30} 
