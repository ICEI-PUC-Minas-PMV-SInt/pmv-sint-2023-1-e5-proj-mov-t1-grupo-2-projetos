package com.jme.adopterdla.adopterdla.common.utils;

import com.jme.adopterdla.adopterdla.common.service.AzureFileUploadService;
import lombok.AllArgsConstructor;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.core.io.buffer.DataBufferUtils;
import org.springframework.core.io.buffer.DefaultDataBufferFactory;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import java.util.Base64;
import java.util.Optional;
import java.util.UUID;

@AllArgsConstructor
@Service
public class AzurePersistImageUtils {

    private final AzureFileUploadService azureFileUploadService;


    public Mono<String> saveImageData(String base64ImageData) {
        byte[] decodedImageData = Base64.getDecoder().decode(base64ImageData);
        DataBuffer dataBuffer = new DefaultDataBufferFactory().wrap(decodedImageData);
        Flux<DataBuffer> imageDataFlux = Flux.just(dataBuffer);
        return saveImageData(imageDataFlux, "jpeg");
    }

    /**
     * Saves the given image data to a file and returns a Mono that emits the public URL of the saved image.
     *
     * @param imageData  The image data to save.
     * @param extension  The file extension to use for the saved image.
     * @return A Mono<String> that emits the public URL of the saved image.
     */
    public Mono<String> saveImageData(Flux<DataBuffer> imageData, String extension) {
        return Mono.fromCallable(() -> createTempFile(extension))
                .publishOn(Schedulers.boundedElastic())
                .flatMap(tempFilePath -> {
                    var writeMono = DataBufferUtils.write(imageData, tempFilePath, StandardOpenOption.CREATE);
                    var uploadMono = Mono.fromCallable(() -> azureFileUploadService.uploadImageAndGetPublicUrl(tempFilePath.toString()));
                    var deleteMono = Mono.fromCallable(() -> deleteTempFile(tempFilePath))
                            .subscribeOn(Schedulers.boundedElastic()).then();
                    return writeMono.then(uploadMono)
                            .publishOn(Schedulers.boundedElastic())
                            .doFinally(signalType -> deleteMono.subscribe());
                });
    }


    /**
     * Creates a temporary file with a given filename and a default ".jpeg" extension if the filename does not have an extension.
     *
     * @param extension the extension from filename for the temporary file
     * @return a Path object representing the path to the newly created temporary file
     * @throws IOException if an I/O error occurs while creating the temporary file
     */
    private Path createTempFile(String extension) throws IOException {
        return Files.createTempFile(UUID.randomUUID().toString(), "." + extension);
    }

    /**
     * Returns the file extension of a given filename using string handling.
     *
     * @param filename the filename from which to extract the extension
     * @return an Optional containing the extension of the file, or an empty Optional if the input filename is null or has no extension
     */
    public Optional<String> getExtensionByStringHandling(String filename) {
        return Optional.ofNullable(filename) // Wrap the input filename in an Optional to handle null values
                .filter(f -> f.contains(".")) // Filter out filenames that don't contain a dot character (i.e., don't have an extension)
                .map(f -> f.substring(filename.lastIndexOf(".") + 1)); // Extract the extension from the filename
    }

    /**
     * Deletes the given temporary file.
     *
     * @param tempFilePath a {@link Path} representing the path to the file to be deleted
     * @return true if the file was successfully deleted, false otherwise
     * @throws IOException if an I/O error occurs while deleting the file
     */
    private boolean deleteTempFile(Path tempFilePath) throws IOException {
        return Files.deleteIfExists(tempFilePath);
    }
}
