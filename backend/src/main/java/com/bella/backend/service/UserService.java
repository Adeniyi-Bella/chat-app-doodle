package com.bella.backend.service;

import com.bella.backend.model.User;
import com.bella.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    public void addUserMessage(String name, String message) {
        User user = userRepository.findByName(name);
        if (user == null) {
            user = new User(name);
        }
        user.addMessage(message);
        userRepository.save(user);
    }
}

