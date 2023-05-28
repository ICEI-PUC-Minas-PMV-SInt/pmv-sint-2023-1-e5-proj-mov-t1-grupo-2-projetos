package com.jme.adopterdla.adopterdla.adopters.service;

import com.jme.adopterdla.adopterdla.adopters.dto.AdopterDTO;
import com.jme.adopterdla.adopterdla.adopters.entity.Adopter;
import com.jme.adopterdla.adopterdla.adopters.mapper.AdopterMapper;
import com.jme.adopterdla.adopterdla.adopters.repository.AdopterRepository;
import com.jme.adopterdla.adopterdla.common.utils.AzurePersistImageUtils;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@AllArgsConstructor
@Log4j2
public class AdopterService {

    private final AdopterRepository adopterRepository;
    private final AzurePersistImageUtils azurePersistImageUtils;
    private final AdopterMapper mapper;

    /**
     * Creates a new adopter
     *
     * @param adopterDTO the adopter data to create a new adopter
     * @param imageData the image data of the adopter
     * @return the created adopter DTO
     */
    public Mono<AdopterDTO> createAdopter(AdopterDTO adopterDTO, FilePart imageData) {
        // Save the image data to a storage service and get the public URL of the saved image
        return azurePersistImageUtils.saveImageData(imageData.content(), azurePersistImageUtils.getExtensionByStringHandling(imageData.filename()).orElse("jpeg"))
                .flatMap(publicImageUrl -> {
                    // Create a new animal from the given data and set its image URL to the public URL of the saved image
                    Adopter adopter = mapper.toAdopter(adopterDTO);
                    adopter.setImageUrl(publicImageUrl);
                    // Save the new animal to the database and return its DTO
                    return adopterRepository.save(adopter)
                            .map(mapper::toAdopterDTO);
                });
    }

    /**
     * Retrieves an adopter by ID
     *
     * @param id the ID of the adopter to retrieve
     * @return the adopter DTO
     */
    public Mono<AdopterDTO> getAdopter(Long id) {
        return adopterRepository.findById(id)
                .map(mapper::toAdopterDTO);
    }

    /**
     * Retrieves all adopters
     *
     * @return the list of adopter DTOs
     */
    public Flux<AdopterDTO> getAllAdopters() {
        return adopterRepository.findAll()
                .map(mapper::toAdopterDTO);
    }
}
