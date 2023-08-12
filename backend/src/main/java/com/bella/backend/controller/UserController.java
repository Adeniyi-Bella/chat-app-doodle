package com.bella.backend.controller;

import com.bella.backend.model.User;
import com.bella.backend.model.UserMessageRequest;
import com.bella.backend.service.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/getUsers")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("/addMessage")
    public void addMessage(@RequestBody UserMessageRequest request) {
        userService.addUserMessage(request.getName(), request.getMessage());
    }
}

