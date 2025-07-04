# 🎂 Mission: Birthday Surprise

An interactive, story-driven birthday website with a tech theme and blue-black color scheme. This website takes your mama on a "secret agent mission" to unlock birthday surprises through interactive challenges.

## 🚀 Features

- **Interactive Story Experience**: 4 levels of increasing complexity
- **Tech Theme**: Cyberpunk-inspired design with blue-black color scheme
- **Smooth Animations**: Powered by Framer Motion
- **Responsive Design**: Works on desktop and mobile devices
- **Interactive Elements**: Puzzles, memory games, and drag-and-drop challenges

## 🎮 Mission Levels

1. **Welcome Screen**: Mission briefing with typing animation
2. **Level 1 - Sequence Decoder**: Solve a number sequence puzzle
3. **Level 2 - Memory Recovery**: Click to reveal birthday messages
4. **Level 3 - Cake Assembly**: Drag-and-drop birthday cake building
5. **Finale**: Birthday celebration with confetti and heartfelt message

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   - The website will automatically open in your default browser
   - Or navigate to `http://localhost:1234`

### Build for Production

```bash
npm run build
```

## 🎨 Customization

### Personalizing the Content

1. **Change Agent Name**: Edit the `agentName` in `src/App.js` (line 25)
2. **Modify Birthday Messages**: Update the messages in `src/components/Level2.js`
3. **Customize Finale Message**: Edit the birthday message in `src/components/Finale.js`

### Styling

- **Colors**: Modify the color variables in `src/styles/global.css`
- **Fonts**: Change font families in the styled components
- **Animations**: Adjust animation parameters in Framer Motion components

## 📱 Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 🎯 How to Play

1. **Start Mission**: Click "BEGIN MISSION" on the welcome screen
2. **Level 1**: Click on sequence boxes to reveal numbers, then solve the pattern
3. **Level 2**: Click on memory cards to reveal birthday messages
4. **Level 3**: Build a birthday cake by clicking ingredients in the correct order
5. **Celebrate**: Enjoy the finale with confetti and birthday wishes!

## 🎁 Adding Personal Touches

### Photos and Videos
- Add photos by creating an `assets` folder and importing images
- For video messages, add video files and create a video component

### Custom Puzzles
- Modify puzzle logic in each level component
- Add new interactive elements using Framer Motion

### Special Messages
- Personalize birthday messages in each level
- Add family memories or inside jokes

## 🚀 Deployment

### Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify

### Vercel
1. Connect your GitHub repository
2. Vercel will automatically deploy on push

### GitHub Pages
1. Build the project: `npm run build`
2. Push the `dist` folder to a `gh-pages` branch

## 🎉 Enjoy!

This interactive birthday website is designed to create a memorable experience for your mama. The tech theme and story-driven approach make it both fun and engaging, while the heartfelt messages at the end make it truly special.

Happy Birthday! 🎂✨ 