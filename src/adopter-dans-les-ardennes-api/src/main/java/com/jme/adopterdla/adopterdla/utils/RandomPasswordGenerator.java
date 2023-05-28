package com.jme.adopterdla.adopterdla.utils;

import java.util.random.RandomGenerator;
import java.util.random.RandomGeneratorFactory;

public class RandomPasswordGenerator {
    // Set of characters to be used in the random password
    private static final String PASSWORD_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+";

    // Desired length of the random password
    private static final int PASSWORD_LENGTH = 10;

    /**
     * Generates a random password using the specified character set and length.
     *
     * @return A randomly generated password
     */
    public static String generateRandomPassword() {
        // Create a RandomGenerator instance using the RandomGeneratorFactory from Java 17
        RandomGeneratorFactory<RandomGenerator> factory = RandomGeneratorFactory.of("L32X64MixRandom");
        RandomGenerator random = factory.create(17);

        // Initialize a StringBuilder with the desired password length
        StringBuilder password = new StringBuilder(PASSWORD_LENGTH);

        // Loop through and generate random characters for the password
        for (int i = 0; i < PASSWORD_LENGTH; i++) {
            // Generate a random index within the range of available characters
            int randomIndex = random.nextInt(PASSWORD_CHARS.length());

            // Get the character at the random index
            char randomChar = PASSWORD_CHARS.charAt(randomIndex);

            // Append the random character to the password
            password.append(randomChar);
        }

        // Return the generated random password as a string
        return password.toString();
    }
}
