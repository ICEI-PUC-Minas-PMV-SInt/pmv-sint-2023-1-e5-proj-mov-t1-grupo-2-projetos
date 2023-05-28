package com.jme.adopterdla.adopterdla.adopters;

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
public class AdopterControllerTest extends AbstractUtilsBaseTest {

    private static final String BASE_URI = "http://localhost:8080/api/adopters";

    @Test
    @Order(1)
    public void testCreateAdopter() throws FileNotFoundException {

        File file = Paths.get("src/test/resources/adopters/adopter-1.png").toFile();

        given()
                .header("Authorization", "Bearer " + getAdminToken())
                .multiPart(new MultiPartSpecBuilder(new FileInputStream(file)).fileName("adopter_test_image.jpeg")
                        .controlName("imageData")
                        .mimeType("image/png")
                        .build())
                .multiPart("data", """
                        {
                          "name": "John Smith",
                          "imageUrl": "",
                          "address": "123 Main St",
                          "phone": "123-456-7890",
                          "email": "john.smith@example.com",
                          "processNumber": "1234"
                        }""", "application/json")
                .when()
                .post(BASE_URI)
                .then()
                .statusCode(201)
                .contentType(ContentType.JSON)
                .body("name", equalTo("John Smith"))
                .body("address", equalTo("123 Main St"))
                .body("phone", equalTo("123-456-7890"))
                .body("email", equalTo("john.smith@example.com"))
                .body("processNumber", equalTo("1234"));
    }

    @Test
    @Order(2)
    public void testGetAdopter() {

        given()
                .header("Authorization", "Bearer " + getAdminToken())
                .pathParam("id", 1)
                .when()
                .get(BASE_URI + "/{id}")
                .then()
                .statusCode(200)
                .contentType(ContentType.JSON)
                .body("name", equalTo("John Smith"))
                .body("address", equalTo("123 Main St"))
                .body("phone", equalTo("123-456-7890"))
                .body("email", equalTo("john.smith@example.com"))
                .body("processNumber", equalTo("1234"))
                .body("imageUrl", notNullValue());
    }

    @Test
    @Order(3)
    public void testGetAllAdopters() {
        given()
                .header("Authorization", "Bearer " + getAdminToken())
                .when()
                .get(BASE_URI)
                .then()
                .statusCode(200)
                .contentType(ContentType.JSON)
                .body("$.size()", greaterThan(0));
    }
}