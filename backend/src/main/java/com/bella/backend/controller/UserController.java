package com.bella.backend.controller;

// Import necessary annotations and classes
import com.bella.backend.model.User;
import com.bella.backend.model.UserMessageRequest;
import com.bella.backend.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000") // Allow cross-origin requests from specified URL

public class UserController {
    private final UserService userService;

    // Constructor injection of UserService
    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Handle GET request to retrieve all users
    @GetMapping("/getUsers")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
    // Handle POST request to add a new message for a user
    @PostMapping("/addMessage")
    public void addMessage(@RequestBody UserMessageRequest request) {
        userService.addUserMessage(request.getName(), request.getMessage());
    }
}

