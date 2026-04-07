package com.evproject.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.evproject.model.User;
import com.evproject.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository repo;

    // SIGNUP
    public User registerUser(User user) {
        return repo.save(user);
    }

    // LOGIN
    public User loginUser(String email, String password) {

        User user = repo.findByEmail(email);

        if (user != null && user.getPassword().equals(password)) {
            return user;
        }

        return null;
    }
}