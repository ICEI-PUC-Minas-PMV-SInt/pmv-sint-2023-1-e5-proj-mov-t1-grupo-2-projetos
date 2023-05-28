package com.jme.adopterdla.adopterdla.animals.service;

import com.jme.adopterdla.adopterdla.animals.dto.AnimalDTO;
import com.jme.adopterdla.adopterdla.animals.dto.AnimalNameAndIdDTO;
import com.jme.adopterdla.adopterdla.animals.entity.Animal;
import com.jme.adopterdla.adopterdla.animals.mapper.AnimalMapper;
import com.jme.adopterdla.adopterdla.animals.repository.AnimalRepository;
import com.jme.adopterdla.adopterdla.common.utils.AzurePersistImageUtils;
import com.jme.adopterdla.adopterdla.common.service.AzureFileUploadService;
import com.jme.adopterdla.adopterdla.user.entity.User;
import com.jme.adopterdla.adopterdla.utils.RandomPasswordGenerator;
import com.jme.adopterdla.adopterdla.volunteers.entity.Volunteer;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
@Log4j2
public class AnimalService {

    private final AnimalRepository animalRepository;
    private final AnimalMapper animalMapper;
    private final AzureFileUploadService azureFileUploadService;
    private final AzurePersistImageUtils azurePersistImageUtils;

    /**
     * Get an animal by ID
     *
     * @param id the ID of the animal
     *
     * @return the animal with the given ID, or empty if not found
     */
    public Mono<AnimalDTO> getAnimal(Long id) {
        return animalRepository.findById(id)
                .map(animalMapper::toAnimalDTO);
    }

    /**
     * Get all animals
     *
     * @return all animals
     */
    public Flux<AnimalDTO> getAllAnimals() {
        return animalRepository.findAll()
                .map(animalMapper::toAnimalDTO);
    }

    /**
     * Get all animals by availability
     *
     * @param isAvailable the availability status to filter by
     *
     * @return all animals with the given availability status
     */
    public Flux<AnimalDTO> getAllAnimalsByIsAvailable(boolean isAvailable) {
        Flux<Animal> animals = animalRepository.findAllByIsAvailable(isAvailable);
        return animals.map(animalMapper::toAnimalDTO);
    }

    /**
     * Get the names and IDs of all animals by availability
     *
     * @return Flux of AnimalNameAndIdDTO representing the names and IDs of animals with the given availability status
     */
    public Flux<AnimalNameAndIdDTO> getAvailableAnimalNamesAndIds() {
        return animalRepository.findNameAndIdByIsAvailable();
    }

    /**
     * Creates a new animal with the given data and image data.
     *
     * @param animalDTO the data for the animal to be created
     *
     * @return a Mono containing the created AnimalDTO
     */
    public Mono<AnimalDTO> createAnimal(AnimalDTO animalDTO) {

        Mono<String> imageUrlMono = animalDTO.imageBase64() != null
                ? azurePersistImageUtils.saveImageData(animalDTO.imageBase64())
                : Mono.empty();

        return imageUrlMono.defaultIfEmpty("").flatMap(imageUrl -> {
                    if (animalDTO.id() == null) {
                        var animal = animalMapper.toAnimal(animalDTO);
                        animal.setImageUrl(imageUrl);
                        animal.setCode(generateCode());
                        return animalRepository.save(animal);
                    } else {
                        return animalRepository.findById(animalDTO.id())
                                .doOnNext(existingAnimal -> {
                                    if (animalDTO.imageBase64() != null) {
                                        // If an image is being updated, delete the old image and upload the new one.
                                        Mono.fromCallable(() -> azureFileUploadService.deleteImage(existingAnimal.getImageUrl()))
                                                .subscribeOn(Schedulers.boundedElastic())
                                                .subscribe();
                                    }
                                })
                                .doOnNext(existingAnimal -> animalMapper.toAnimalUpdate(animalDTO, existingAnimal))
                                .flatMap(animalRepository::save);
                    }
                }

        ).map(animalMapper::toAnimalDTO);
    }


    /**
     * Delete an animal by ID
     *
     * @param id the ID of the animal to delete
     *
     * @return an empty Mono when the deletion is complete
     */
    public Mono<Void> deleteAnimal(Long id) {
        return animalRepository.findById(id)
                .flatMap(animal -> {
                    Mono<Void> deleteImageMono = Mono.empty();
                    if (animal.getImageUrl() != null) {
                        deleteImageMono = Mono.fromCallable(() -> azureFileUploadService.deleteImage(animal.getImageUrl()).block())
                                .subscribeOn(Schedulers.boundedElastic());
                    }
                    return deleteImageMono.then(animalRepository.deleteById(id));
                });
    }

    public String generateCode() {
        Random random = new Random();
        int codeNumber = random.nextInt(9000) + 1000; // generate a random number between 1000 and 9999
        return Integer.toString(codeNumber);
    }

}
