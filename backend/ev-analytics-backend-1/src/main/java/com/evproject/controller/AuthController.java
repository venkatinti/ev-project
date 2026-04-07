package com.evproject.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.evproject.model.User;
import com.evproject.service.UserService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")  // allow React connection
public class AuthController {

    @Autowired
    private UserService service;

    // SIGNUP
    @PostMapping("/signup")
    public User signup(@RequestBody User user) {
        return service.registerUser(user);
    }

    // LOGIN
    @PostMapping("/login")
    public User login(@RequestBody User user) {
        return service.loginUser(user.getEmail(), user.getPassword());
    }
}