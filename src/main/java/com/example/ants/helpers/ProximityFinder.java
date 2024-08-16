package com.example.ants.helpers;

import com.example.ants.models.Ant;
import com.example.ants.models.Memory;

import java.util.List;

public class ProximityFinder {
    public static boolean inProximity(List<Ant> ant) {
        boolean proximity = false;
        for (int i = 0; i < ant.size(); i++) {
            int posX = ant.get(i).getPosX();
            int posY = ant.get(i).getPosY();
            for (int j = 0; j < ant.size(); j++) {
                if (ant.get(i) == ant.get(j)) {
                    continue;
                }
                int posX2 = ant.get(j).getPosX();
                int posY2 = ant.get(j).getPosY();
                int differenceX = posX2 - posX;
                int differenceY = posY2 - posY;
                if (differenceX >= -10 && differenceX <= 10 && differenceY >= -10 && differenceY <= 10) {
                    proximity = true;
                    System.out.println("Ants are talking to each other");
                    Ant ant1 = ant.get(i);
                    Ant ant2 = ant.get(j);
                    Memory memory1 = ant1.getMemory();
                    Memory memory2 = ant2.getMemory();
                    if (memory1 == null && memory2 != null) {
                        ant1.setMemory(memory2);
                    }
                    if (memory1 != null && memory2 == null) {
                        ant2.setMemory(memory1);
                    }
                    if (memory1 != null && memory2 != null) {
                        System.out.println("Both have memories");
                    }

                }
                return proximity;
            }
        }
        return proximity;
    }

    public static void nearFood(List<Ant> ant, List<Memory> food) {
        boolean proximity = false;
        for (int i = 0; i < ant.size(); i++) {
            int posX = ant.get(i).getPosX();
            int posY = ant.get(i).getPosY();
            for (int j = 0; j < food.size(); j++) {
                int posX2 = food.get(j).getFoodPosX();
                int posY2 = food.get(j).getFoodPosY();
                int differenceX = posX2 - posX;
                int differenceY = posY2 - posY;
                if (differenceX >= -10 && differenceX <= 10 && differenceY >= -10 && differenceY <= 10) {
                    proximity = true;
                    ant.get(i).setMemory(food.get(j).getFoodPosX(), food.get(j).getFoodPosY());
                    System.out.println("An ant is close to food");
                }
            }
        }


    }

}
