package com.example.ants.models;

public class Memory {
    private int foodPosX;
    private int foodPosY;

    public Memory(int foodPosX, int foodPosY) {
        this.foodPosX = foodPosX;
        this.foodPosY = foodPosY;
    }

    public int getFoodPosX() {
        return foodPosX;
    }

    public int getFoodPosY() {
        return foodPosY;
    }
}
