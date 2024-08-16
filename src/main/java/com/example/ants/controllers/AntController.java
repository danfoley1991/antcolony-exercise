package com.example.ants.controllers;

import com.example.ants.helpers.Position;
import com.example.ants.helpers.PositionGenerator;
import com.example.ants.helpers.ProximityFinder;
import com.example.ants.models.Ant;
import com.example.ants.models.Memory;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/ants")
public class AntController {
    public List<Ant> ant = new ArrayList<>();
    List<Memory> food = new ArrayList<>();
    List<Memory> nests = new ArrayList<>();

    public AntController() {
        for (int i = 0; i < 100; i++) {
            Ant a = new Ant();
            ant.add(a);
        }
    }


    @GetMapping("")
    public List<Ant> getAnts() {
        for (Ant a : ant) {
            a.changePosition();
        }
        ProximityFinder.inProximity(ant);
        ProximityFinder.nearFood(ant, food);
        return ant;
    }

    @PostMapping("/food")
    public void food(@RequestBody Position position) {
        int x = position.getX();
        int y = position.getY();
        food.add(new Memory(x, y));
    }

    @PostMapping("/nest")
    public void nests(@RequestBody Position position) {
        int x = position.getX();
        int y = position.getY();
        nests.add(new Memory(x, y));
    }

}

