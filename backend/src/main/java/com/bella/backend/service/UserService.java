package com.bella.backend.service;

import com.bella.backend.model.User;
import com.bella.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;
    // Constructor injection of UserRepository
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    // Retrieve a list of all users from the DB

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    // Add a message to a user or create a new user if not found
    public void addUserMessage(String name, String message) {
        User user = userRepository.findByName(name);
        // Create a new user if not found
        if (user == null) {
            user = new User(name);
        }
        // Add the message and date to the user
        user.addMessage(message);
        // Save the user to the DB
        userRepository.save(user);
    }
}

