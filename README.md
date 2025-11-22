# 🐍 Math Snake - Educational Game

An educational snake game where kids (ages 6-8) learn addition while having fun!

## 🎮 How to Play

1. **Objective**: Solve addition problems by guiding the snake to eat the correct number
2. **Controls**: Use Arrow Keys (↑ ↓ ← →) or WASD to move the snake
3. **Rules**:
   - Eat the number that solves the math problem shown at the top
   - ✅ Correct answer = Snake grows + 1 point
   - ❌ Wrong answer = Game Over
   - 💀 Hit a wall or yourself = Game Over

## 🚀 Quick Start

### Option 1: Open Directly in Browser

Simply open `index.html` in your web browser. No installation required!

### Option 2: Run with Local Server (Recommended)

```bash
# If you have Python installed:
python -m http.server 8000

# Or with Python 3:
python3 -m http.server 8000

# Or with Node.js (if you have npx):
npx http-server

# Or with VS Code Live Server extension:
Right-click on index.html → "Open with Live Server"
```

Then open your browser to `http://localhost:8000`

## 📁 Project Structure

```
cursorkg/
├── index.html          # Main HTML file with game structure
├── style.css           # Styling (responsive, kid-friendly design)
├── game.js             # Game logic (vanilla JavaScript)
├── README.md           # This file
├── PRD.md              # Product Requirements Document
├── idea.md             # Initial project idea
└── competitive-analysis.md  # Market research
```

## 🎯 Features

### Core Gameplay

- ✅ Classic snake mechanics with smooth movement
- ✅ Randomly generated addition problems (single-digit)
- ✅ 3-4 number options appear on screen (1 correct, 3 wrong)
- ✅ Score tracking
- ✅ Game over detection (walls, self-collision, wrong answer)
- ✅ Restart functionality

### Design

- 🎨 Colorful, kid-friendly interface
- 🎨 Large, readable fonts for easy reading
- 🎨 Bright colors for numbers and snake
- 🎨 Smooth animations
- 📱 Responsive design (works on desktop, tablet)

### Educational

- 📚 Practice addition (0-9 + 0-9)
- 📚 Immediate feedback (correct/wrong)
- 📚 Encouraging messages based on score
- 📚 No pressure - game is fun first, educational second

## 🛠️ Technical Details

### Tech Stack

- **HTML5** - Structure and Canvas API
- **CSS3** - Styling with modern gradients and animations
- **Vanilla JavaScript** - Game logic (no frameworks)

### Browser Compatibility

- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Any modern browser with HTML5 Canvas support

### Performance

- Canvas-based rendering for smooth 60 FPS gameplay
- Lightweight - no external dependencies
- Loads in < 2 seconds

## 📊 Game Specifications

| Specification         | Value                    |
| --------------------- | ------------------------ |
| Grid Size             | 20x20 cells              |
| Cell Size             | 25px                     |
| Canvas Size           | 500x500px                |
| Game Speed            | 150ms per move           |
| Starting Snake Length | 3 segments               |
| Problem Range         | 0-9 + 0-9 (answers 0-18) |
| Number of Food Items  | 4 (1 correct, 3 wrong)   |

## 🎓 Educational Value

### Learning Objectives

- **Primary**: Practice addition facts (0-9)
- **Secondary**: Improve problem-solving speed
- **Tertiary**: Hand-eye coordination, planning ahead

### Age Appropriateness

- **Target Age**: 6-8 years old
- **Grade Level**: Kindergarten - 2nd grade
- **Math Level**: Basic addition

## 🚧 Future Enhancements (v2)

Potential features for future versions:

- [ ] Difficulty levels (Easy/Medium/Hard)
- [ ] Subtraction mode
- [ ] Multiplication mode
- [ ] Progressive levels with increasing speed
- [ ] Sound effects and background music
- [ ] Leaderboard/high scores
- [ ] Parent dashboard with progress tracking
- [ ] Adaptive difficulty based on performance
- [ ] Mobile app version
- [ ] Multiplayer mode

## 🐛 Known Issues

None currently. If you find any bugs, please report them!

## 📝 Testing Checklist

- [x] Snake moves smoothly with arrow keys and WASD
- [x] Math problems generate correctly
- [x] Correct answer makes snake grow and increases score
- [x] Wrong answer triggers game over
- [x] Wall collision triggers game over
- [x] Self-collision triggers game over
- [x] Score tracks correctly
- [x] Game can restart after game over
- [x] Responsive design works on different screen sizes
- [x] Instructions are clear for kids

## 🤝 Contributing

This is an MVP (Minimum Viable Product). Feedback welcome!

To test with kids:

1. Observe if they understand the mechanic immediately
2. Watch if they solve problems or just guess
3. Note if they want to play again
4. Ask parents if they see educational value

## 📄 License

This project is open source and available for educational purposes.

## 🙏 Credits

- **Idea Agent**: Initial concept validation
- **Market Research Agent**: Competitive analysis
- **Product Manager Agent**: PRD and feature specification
- **Software Engineer Agent**: Implementation
- Created as part of CursorKG Hackathon

---

**Made with ❤️ for kids who love learning and playing!** 🐍✨
