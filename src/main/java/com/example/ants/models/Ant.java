package com.example.ants.models;

import com.example.ants.helpers.PositionGenerator;

public class Ant {
    private int posX;
    private int posY;
    private Memory memory;

    public int getPosX() {
        return posX;
    }

    public int getPosY() {
        return posY;
    }

    public Memory getMemory() {return memory;}

    public void setMemory(int X, int Y) {
        memory = new Memory(X, Y);
    }

    public void setMemory(Memory memory) {
        this.memory = memory;
    }

    public Ant() {
        int[] position = PositionGenerator.get();
        this.posX = position[0];
        this.posY = position[1];
    }

    public void changePosition() {
        int[] newPos = PositionGenerator.moveRandomly(posX, posY);
        posX = newPos[0];
        posY = newPos[1];
    }

}

