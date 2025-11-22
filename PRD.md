# 🎯 Product Requirements Document (PRD)
## Math Snake - Educational Snake Game MVP

**Version**: 1.0 (Initial MVP)  
**Target**: Kids ages 6-8  
**Timeline**: Build first playable version FAST, iterate later  

---

## 🎪 The One-Sentence Pitch

"Classic snake game where kids practice addition by eating numbers that solve math problems."

---

## 🚫 What We're NOT Building (Yet)

To keep this simple:
- ❌ No user accounts / login
- ❌ No parent dashboard (v2)
- ❌ No adaptive difficulty (v2)
- ❌ No progression system / levels (v2)
- ❌ No achievements / badges (v2)
- ❌ No sound effects (if time allows, add later)
- ❌ No mobile app (browser only)

---

## ✅ What We ARE Building (MVP)

### **Core Experience:**

A single-page web game where:
1. Snake moves around the screen
2. Math problem appears at top (e.g., "5 + 3 = ?")
3. Numbers (0-20) appear as "food" on the board
4. Kid guides snake to eat the CORRECT answer
5. Snake grows, new problem appears
6. Wrong answer = game over
7. Track score (how many correct answers)

**That's it.** Simple, focused, achievable.

---

## 👤 User Stories

### Story #1: The Kid Playing
```
As a 6-8 year old kid,
I want to play a fun snake game,
So that I can have fun while practicing my math skills.
```

**Acceptance Criteria:**
- ✅ Game loads in browser instantly (< 2 sec)
- ✅ Controls are simple (arrow keys or WASD)
- ✅ Graphics are colorful and kid-friendly
- ✅ I can immediately understand what to do
- ✅ Game gives me instant feedback (correct/wrong)

### Story #2: The Parent Watching
```
As a parent,
I want my kid to play educational games,
So that screen time contributes to their learning.
```

**Acceptance Criteria:**
- ✅ Game is clearly educational (math problems visible)
- ✅ No inappropriate content
- ✅ No ads or sketchy links
- ✅ I can see their score at the end

---

## 🎨 Feature Specifications

### Feature 1: Snake Mechanics
**Priority**: MUST HAVE (it's literally a snake game)

**Specs:**
- Snake starts at 3 segments long
- Moves continuously in current direction
- Arrow keys (↑ ↓ ← →) or WASD to change direction
- Cannot move backward into itself
- Speed: Medium pace (not too fast for kids)
- Collision with wall = game over
- Collision with self = game over

**Visual:**
- Snake: Bright green with rounded segments
- Background: Light color grid
- Grid size: ~20x20 cells

---

### Feature 2: Math Problems
**Priority**: MUST HAVE (the educational part)

**Specs:**
- One problem displayed at a time at top of screen
- Addition problems only (for MVP)
- Difficulty: Single digit addition (e.g., 3+4, 7+2, 5+6)
- Range: Answers between 0-20
- New problem appears after each correct answer
- Problems are randomly generated

**Visual:**
- Large, clear font at top center
- Format: "5 + 3 = ?"
- High contrast (dark text on light background)

---

### Feature 3: Number Collection
**Priority**: MUST HAVE (core mechanic)

**Specs:**
- 3-4 numbers appear on board as "food"
- Only ONE number is the correct answer
- Others are random wrong answers (close to correct answer)
- Numbers are clearly visible
- When snake head touches correct number:
  - Snake grows by 1 segment
  - Score increases by 1
  - Number disappears
  - New problem appears
  - New numbers spawn
- When snake touches wrong number:
  - Game over immediately
  - Show final score
  - Option to restart

**Visual:**
- Numbers displayed as circles/squares
- Correct answer: No special indicator (kid must solve)
- Different colors for variety

---

### Feature 4: Score & Game Over
**Priority**: MUST HAVE

**Specs:**
- Score counter shows current correct answers
- Displayed prominently (top right corner)
- Game over shows:
  - Final score
  - Message (e.g., "Great job! You solved 12 problems!")
  - "Play Again" button
  - Clears board and restarts

**Visual:**
- Simple overlay for game over screen
- Kid-friendly encouraging messages

---

### Feature 5: Responsive Design
**Priority**: SHOULD HAVE

**Specs:**
- Works on desktop/laptop browsers
- Works on tablet landscape mode
- Scales to different screen sizes
- (Mobile portrait = optional)

---

## 🎨 Design Guidelines

### Visual Style:
- **Colorful**: Bright, primary colors
- **Simple**: Clean, not cluttered
- **Readable**: Large fonts, high contrast
- **Kid-friendly**: Rounded corners, soft shapes

### Color Palette (Suggestions):
- Background: Light cream/white (#F5F5DC)
- Snake: Bright green (#4CAF50)
- Numbers: Various (red, blue, yellow, orange)
- Text: Dark gray/black (#333333)
- UI Elements: Soft blue (#2196F3)

### Typography:
- Use clear, rounded sans-serif fonts
- Large sizes (16px minimum for kids)
- High contrast

---

## 🛠️ Technical Architecture

### Tech Stack (Keep It Simple):

**Frontend:**
- HTML5 Canvas for game rendering
- Vanilla JavaScript (or React if you prefer)
- CSS for layout

**No Backend Needed:**
- Everything runs client-side
- No data persistence (yet)
- No API calls

### File Structure:
```
/
├── index.html          # Main game page
├── style.css           # Styling
├── game.js             # Game logic
└── README.md           # Setup instructions
```

---

## 📋 Development Tasks (In Order)

### Phase 1: Core Snake Mechanics (Day 1)
- [ ] Set up project structure (HTML/CSS/JS)
- [ ] Implement snake movement (arrow key controls)
- [ ] Implement collision detection (walls, self)
- [ ] Basic rendering on canvas
- [ ] Game over state

### Phase 2: Math Integration (Day 2)
- [ ] Generate random addition problems
- [ ] Display problem at top
- [ ] Spawn numbers on board (1 correct, 2-3 wrong)
- [ ] Check if snake eats correct number
- [ ] Handle correct answer (grow snake, new problem)
- [ ] Handle wrong answer (game over)

### Phase 3: Polish & UX (Day 3)
- [ ] Add score tracking
- [ ] Style the game (colors, fonts)
- [ ] Add game over screen with restart
- [ ] Test with different screen sizes
- [ ] Add instructions (simple overlay on start)
- [ ] Bug fixes

### Optional (If Time):
- [ ] Add simple sound effects (correct/wrong/game over)
- [ ] Add animation when snake eats number
- [ ] Add difficulty toggle (easy/medium/hard)

---

## ✅ Definition of Done (MVP)

The MVP is done when:
1. ✅ A kid can open the game in browser and immediately start playing
2. ✅ Snake moves smoothly with arrow keys
3. ✅ Math problems appear and kid can solve by eating numbers
4. ✅ Correct answers make snake grow and score increase
5. ✅ Wrong answers end the game
6. ✅ Kid can restart after game over
7. ✅ Game looks colorful and kid-friendly
8. ✅ No crashes or major bugs

**Test**: Show to a real 6-8 year old. If they can play without asking "what do I do?", it's done.

---

## 📊 Success Metrics (For MVP Testing)

Don't worry about complex analytics yet. Just observe:

1. **Engagement**: Do kids play more than once?
2. **Comprehension**: Do they understand the mechanic immediately?
3. **Learning**: Are they actually solving problems, or guessing?
4. **Fun**: Do they smile/laugh/ask to play again?

---

## 🚀 Next Steps After MVP

Once MVP is working:
1. Test with 2-3 real kids (friends/family)
2. Get feedback from 1-2 parents
3. Iterate based on feedback
4. Then consider:
   - Adding levels
   - Adding subtraction
   - Creating accounts
   - Parent dashboard
   - Monetization

But for now: **Build the simplest version that works.**

---

## 🎯 Key Decisions Made

| Decision | Rationale |
|----------|-----------|
| **Math = Addition only** | Simplest to implement, clear value |
| **No accounts/login** | Reduces complexity, faster to build |
| **Browser-only** | Easiest to share, test, iterate |
| **Canvas-based** | Best for smooth animations |
| **No levels (yet)** | Keep scope small for v1 |
| **Single-player only** | Avoid multiplayer complexity |

---

## Ready to Build? 🛠️

**Recommended Flow:**
1. Start with **@software-engineer** to build the game
2. After initial version, use **@qa-engineer** to test

Let's ship it! 🚀

