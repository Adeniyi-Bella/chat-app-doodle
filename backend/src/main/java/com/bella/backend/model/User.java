package com.bella.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "user")
public class User {
    @Id
    private String id;
    private String name;
    private List<UserMessage> messages = new ArrayList<>();

    // Constructors, getters, setters, and other methods

    public User() {
    }

    public User(String name) {
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public List<UserMessage> getMessages() {
        return messages;
    }

    public void addMessage(String messageText) {
        UserMessage userMessage = new UserMessage(messageText, LocalDateTime.now());
        messages.add(userMessage);
    }

    public static class UserMessage {
        private String message;
        private LocalDateTime date;

        public UserMessage(String message, LocalDateTime date) {
            this.message = message;
            this.date = date;
        }

        public String getMessage() {
            return message;
        }

        public LocalDateTime getDate() {
            return date;
        }
    }
}
