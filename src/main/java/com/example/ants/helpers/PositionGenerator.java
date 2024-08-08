package com.example.ants.helpers;

import java.util.Random;

public class PositionGenerator {

    private static final Random random = new Random();
    private static final int antSize = 20;
    private static final int maxWidth = 800 - antSize;
    private static final int maxHeight = 600 - antSize;
    private static final int movementDistance = 5;

    public static int[] get() {
        return new int[]{getX(), getY()};
    }

    public static int[] moveRandomly(int x, int y) {
        int[][] directions = {
            {0, -movementDistance}, // North
            {0, movementDistance},  // South
            {movementDistance, 0},  // East
            {-movementDistance, 0}, // West
            {movementDistance, -movementDistance}, // Northeast
            {movementDistance, movementDistance},  // Southeast
            {-movementDistance, -movementDistance}, // Northwest
            {-movementDistance, movementDistance}  // Southwest
        };

        int[] direction = directions[random.nextInt(directions.length)];

        int newX = x + direction[0];
        int newY = y + direction[1];

        // Calculate the new position
        newX = Math.max(antSize / 2, Math.min(maxWidth - antSize / 2, newX));
        newY = Math.max(antSize / 2, Math.min(maxHeight - antSize / 2, newY));

        return new int[]{newX, newY};
    }

    private static int getX() {
        return generateRandomPosition(maxWidth, antSize);
    }

    private static int getY() {
        return generateRandomPosition(maxHeight, antSize);
    }

    private static int generateRandomPosition(int maxDimension, int antSize) {
        int margin = antSize / 2;
        return random.nextInt(maxDimension - antSize + 1) + margin;
    }
}
