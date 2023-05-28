package com.jme.adopterdla.adopterdla.configs;

import com.azure.storage.blob.BlobContainerClient;
import com.azure.storage.blob.BlobContainerClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AzureBlobStorageConfig {

    @Value("${azure.storage.account-name}")
    private String accountName;

    @Value("${azure.storage.account-key}")
    private String accountKey;

    @Value("${azure.storage.container-name}")
    private String containerName;

    @Bean
    public BlobContainerClient blobContainerClient() {
        return new BlobContainerClientBuilder()
                .connectionString("DefaultEndpointsProtocol=https;AccountName=" + accountName + ";AccountKey=" + accountKey)
                .containerName(containerName)
                .buildClient();
    }
}
