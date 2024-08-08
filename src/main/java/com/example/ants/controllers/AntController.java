package com.example.ants.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/ants")
public class AntController {

    public AntController() {
    }

    @GetMapping("")
    public String getAnts() {
        return "Hello";
    }
}
