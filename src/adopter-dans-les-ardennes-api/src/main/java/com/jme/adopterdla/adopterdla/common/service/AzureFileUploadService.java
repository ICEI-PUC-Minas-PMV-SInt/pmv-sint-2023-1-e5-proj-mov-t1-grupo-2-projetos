package com.jme.adopterdla.adopterdla.common.service;

import com.azure.storage.blob.BlobContainerClient;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Paths;

/**
 * Service class for uploading files to Azure Blob Storage.
 */
@Service
@AllArgsConstructor
@Log4j2
public class AzureFileUploadService {

    private final BlobContainerClient blobContainerClient;

    /**
     * Uploads the file at the given filepath to Azure Blob Storage and returns its public URL.
     *
     * @param filepath the path of the file to upload
     * @return the public URL of the uploaded file
     */
    public String uploadImageAndGetPublicUrl(String filepath) {

        // get a client for the specific blob (i.e., file) to upload
        var blobClient = blobContainerClient.getBlobClient(Paths.get(filepath).getFileName().toString());

        // upload the file to Azure Blob Storage
        blobClient.uploadFromFile(filepath);

        // return the public URL of the uploaded file
        return blobClient.getBlobUrl();
    }

    /**
     * Deletes an image file from Azure Blob Storage using the public URL of the image.
     *
     * @param publicUrl the public URL of the image to delete
     * @return a Mono<Void> instance indicating the completion of the deletion operation
     */
    public Mono<Void> deleteImage(String publicUrl) {
        try {
            // Decode the public URL to obtain the actual URL of the image file
            String decodedUrl = URLDecoder.decode(publicUrl, StandardCharsets.UTF_8);

            // Extract the file name from the URL
            String blobName = decodedUrl.substring(decodedUrl.lastIndexOf("/") + 1);

            // Get a reference to the BlobClient instance for the image file
            var blobClient = blobContainerClient.getBlobClient(blobName);

            // Delete the image file
            blobClient.delete();

            // Return an empty Mono instance to indicate successful deletion
            return Mono.empty();
        } catch (Exception e) {
            // If an exception occurs, log an error message and return an error Mono instance
            log.error("Error deleting image from Azure Blob Storage", e);
            return Mono.error(e);
        }
    }
}

