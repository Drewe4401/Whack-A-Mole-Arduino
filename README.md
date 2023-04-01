# Whack-A-Mole Game

A whack-a-mole game created using p5.js, p5.play.js, PDMSerial.js, and Tone.js, with interaction through an Arduino board.

### Description

This project is a whack-a-mole game where users can press buttons connected to an Arduino board to "whack" the mole as it appears in various locations on the screen. The game is built using p5.js, p5.play.js, PDMSerial.js, and Tone.js libraries.

### Dependencies

* p5.js
* p5.play.js
* PDMSerial.js
* Tone.js

### Hardware Requirements

* Arduino board (or compatible microcontroller)
* Bread board

### Code Structure

The game code consists of two main files:

1. Sketch.js: This file contains the game logic, including setting up the game environment, drawing the moles and game elements on the screen, handling user input, and updating the game state.

2. PDMSerial.js: This file contains a class PDMSerial that handles the communication between the game and the connected Arduino board, which receives input from the hardware sensors.

### How to Run

1. Clone the repository or download the source code.
2. Install the necessary dependencies.
3. Connect the Arduino board to your computer.
4. Upload the appropriate Arduino code to the board using Arduino IDE.
5. Open index.html in a web browser.

