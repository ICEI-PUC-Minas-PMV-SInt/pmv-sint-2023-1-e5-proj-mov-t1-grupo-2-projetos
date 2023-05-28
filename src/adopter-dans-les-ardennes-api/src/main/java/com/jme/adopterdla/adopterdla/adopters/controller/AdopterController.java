package com.jme.adopterdla.adopterdla.adopters.controller;

import com.jme.adopterdla.adopterdla.adopters.dto.AdopterDTO;
import com.jme.adopterdla.adopterdla.adopters.service.AdopterService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("api/adopters")
@RequiredArgsConstructor
@Tag(name = "Adopter", description = "API for Adopter operations")
public class AdopterController {

    private final AdopterService adopterService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Create a new adopter")
    @ApiResponse(responseCode = "201", description = "Adopter created", content = @Content(schema = @Schema(implementation = AdopterDTO.class)))
    public Mono<AdopterDTO> createAdopter(@RequestPart("imageData") FilePart imageData, @RequestPart("data") AdopterDTO adopterDTO) {
        return adopterService.createAdopter(adopterDTO,imageData);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get an adopter by ID")
    @ApiResponse(responseCode = "200", description = "Adopter found", content = @Content(schema = @Schema(implementation = AdopterDTO.class)))
    @ApiResponse(responseCode = "404", description = "Adopter not found")
    public Mono<AdopterDTO> getAdopter(@Parameter(description = "Adopter ID") @PathVariable Long id) {
        return adopterService.getAdopter(id);
    }

    @GetMapping
    @Operation(summary = "Get all adopters")
    @ApiResponse(responseCode = "200", description = "List of adopters", content = @Content(array = @ArraySchema(schema = @Schema(implementation = AdopterDTO.class))))
    public Flux<AdopterDTO> getAllAdopters() {
        return adopterService.getAllAdopters();
    }
}
