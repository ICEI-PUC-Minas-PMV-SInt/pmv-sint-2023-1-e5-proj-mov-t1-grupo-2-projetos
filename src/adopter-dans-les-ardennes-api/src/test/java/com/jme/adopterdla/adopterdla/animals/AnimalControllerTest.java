package com.jme.adopterdla.adopterdla.animals;

import com.jme.adopterdla.adopterdla.AbstractUtilsBaseTest;
import io.restassured.builder.MultiPartSpecBuilder;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.nio.file.Paths;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class AnimalControllerTest extends AbstractUtilsBaseTest {

    private static final String BASE_URI = "http://localhost:8080/api/animals";

    @Test
    @Order(1)
    public void testCreateAnimal() throws FileNotFoundException {

        File file = Paths.get("src/test/resources/animals/image.jpeg").toFile();

        given()
                .header("Authorization", "Bearer " + getAdminToken())
                .multiPart(new MultiPartSpecBuilder(new FileInputStream(file)).fileName("test_image.jpeg")
                        .controlName("imageData")
                        .mimeType("image/png")
                        .build())
                .multiPart("data", """
                        {
                          "name": "Fido57",
                          "breed": "Golden Retriever",
                          "arrivalDate": "2022-03-23",
                          "gender": "MALE",
                          "age": 5,
                          "vaccinated": true,
                          "castrated": false,
                          "wormed": true,
                          "electronicChip": "1234567890",
                          "illness": "None",
                          "notes": "",
                          "isAvailable": true
                        }""", "application/json")
                .when()
                .post(BASE_URI)
                .then()
                .statusCode(201)
                .contentType(ContentType.JSON)
                .body("name", equalTo("Fido57"))
                .body("age", equalTo(5))
                .body("breed", equalTo("Golden Retriever"))
                .body("isAvailable", equalTo(true));
    }

    @Test
    @Order(2)
    public void testGetAnimal() {

        given()
                .header("Authorization", "Bearer " + getAdminToken())
                .pathParam("id", 1)
                .when()
                .get(BASE_URI + "/{id}")
                .then()
                .statusCode(200)
                .contentType(ContentType.JSON)
                .body("name", equalTo("Fido57"))
                .body("age", equalTo(5))
                .body("breed", equalTo("Golden Retriever"))
                .body("isAvailable", equalTo(true));
    }

    @Test
    @Order(3)
    public void testGetAllAnimals() {
        given()
                .header("Authorization", "Bearer " + getAdminToken())
                .when()
                .get(BASE_URI)
                .then()
                .statusCode(200)
                .contentType(ContentType.JSON)
                .body("$.size()", greaterThan(0));
    }

    @Test
    @Order(4)
    public void testGetAllAnimalsByIsAvailable() {
        given()
                .header("Authorization", "Bearer " + getAdminToken())
                .queryParam("isAvailable", true)
                .when()
                .get(BASE_URI + "/available")
                .then()
                .statusCode(200)
                .contentType(ContentType.JSON)
                .body("$.size()", greaterThan(0))
                .body("isAvailable", everyItem(equalTo(true)));
    }

    @Test
    @Order(5)
    public void testUpdateAnimal() {
        given()
                .header("Authorization", "Bearer " + getAdminToken())
                .multiPart("data", "{ \"name\": \"Updated Animal\", \"age\": 3, \"breed\": \"Updated Breed\", \"isAvailable\": false }", "application/json")
                .multiPart("imageData", "animals/updated_image.jpeg", getClass().getResourceAsStream("/animals/updated_image.jpeg"))
                .pathParam("id", 1)
                .when()
                .put(BASE_URI + "/{id}")
                .then()
                .statusCode(200);

        given()
                .header("Authorization", "Bearer " + getAdminToken())
                .pathParam("id", 1)
                .when()
                .get(BASE_URI + "/{id}")
                .then()
                .statusCode(200)
                .contentType(ContentType.JSON)
                .body("name", equalTo("Updated Animal"))
                .body("age", equalTo(3))
                .body("breed", equalTo("Updated Breed"))
                .body("isAvailable", equalTo(false));
    }

    @Test
    @Order(6)
    public void testDeleteAnimal() {
        given()
                .header("Authorization", "Bearer " + getAdminToken())
                .pathParam("id", 1)
                .when()
                .delete(BASE_URI + "/{id}")
                .then()
                .statusCode(204);
    }
}
