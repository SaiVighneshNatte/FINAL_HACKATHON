# Quick Start Guide - Constitution of India App

## 🚀 Running in VS Code

This React application is now fully converted and ready to run in VS Code!

### Step 1: Open Project in VS Code
```bash
# Navigate to your project directory
cd /path/to/constitution-app

# Open in VS Code
code .
```

### Step 2: Install Dependencies
Open the integrated terminal in VS Code (`` Ctrl+` `` or `View > Terminal`) and run:
```bash
npm install
```

This will install all required packages:
- React 18
- TypeScript
- Tailwind CSS
- Lucide React (icons)
- Motion/React (animations)

### Step 3: Start Development Server
```bash
npm run dev
```

The app will start on `http://localhost:3000` (or another available port).

### Step 4: View in Mobile Mode
1. Open Chrome DevTools (F12)
2. Click the device toggle button (Ctrl+Shift+M)
3. Select "iPhone 14" or set custom dimensions: **390 × 844px**

## 📱 App Flow

### 1. **Onboarding** (3 screens)
- Welcome screen with constitution imagery
- Interactive learning features
- Expert guidance information
- Swipe through or skip to role selection

### 2. **Role Selection**
Choose from 4 roles:
- 🧑 **Citizen** - Learn about constitution, take quizzes
- 👨‍🏫 **Educator** - Create content, manage sessions
- 🛡️ **Admin** - Manage users, approve content
- ⚖️ **Legal Expert** - Answer questions, update content

### 3. **Role-Specific Dashboard**
Each role has a unique dashboard with relevant features:

#### Citizen Dashboard
- **Quick Actions**: Quiz, Discussions
- **Continue Reading**: Resume articles with progress bars
- **Constitutional Sections**: Browse by category
- **Featured Articles**: Curated content
- **Bookmarks Tab**: Access saved articles

#### Educator Dashboard
- **Stats**: Students, content, sessions, scores
- **Quick Actions**: Create content, start live session
- **Content Management**: Track published/draft content
- **Session Scheduling**: Upcoming sessions with enrollment

#### Admin Dashboard
- **Overview**: User stats, pending content, reports
- **User Management**: View and manage all users
- **Content Approval**: Review and approve submissions
- **Platform Analytics**: Growth metrics

#### Legal Expert Dashboard
- **Question Queue**: Answer pending questions
- **Content Updates**: Update constitutional articles
- **Impact Metrics**: Track helpful votes and reach
- **Trending Topics**: Popular discussion areas

### 4. **Content Reader**
Rich article reading experience:
- ✅ Progress tracking (auto-updates as you read)
- 🔖 Bookmark articles
- 🔊 Audio narration button
- 📜 Historical context (expandable)
- ⚖️ Landmark cases (expandable)
- 🔗 Related articles

### 5. **Quiz System**
Interactive constitutional quiz:
- ⏱️ 30-second timer per question
- 🎯 5 questions covering different topics
- ✨ Smooth animations and transitions
- 📊 Instant feedback with explanations
- 🏆 Score breakdown and review

### 6. **Discussion Forum**
Community engagement:
- 💬 Create new discussions
- 🏷️ Category-based filtering
- 👍 Like and reply to posts
- 🔥 Trending topics
- 🔍 Search discussions

## 🎨 Color Scheme

The app uses the **Indian flag colors**:
- **Saffron**: `#FF9933` - Primary actions, highlights
- **White**: `#FFFFFF` - Backgrounds, clean spaces
- **Green**: `#138808` - Success, educator elements
- **Blue**: `#000080` - Admin, authority elements

## 🔧 Development Tips

### VS Code Extensions (Recommended)
1. **ES7+ React/Redux/React-Native snippets** - Quick component creation
2. **Tailwind CSS IntelliSense** - Autocomplete for Tailwind classes
3. **Prettier** - Code formatting
4. **ESLint** - Code quality

### Project Structure
```
src/
├── App.tsx                      # Main app with routing logic
└── components/
    ├── Onboarding.tsx          # 3-slide welcome flow
    ├── RoleSelection.tsx       # 4 role cards with images
    ├── CitizenDashboard.tsx    # Main citizen interface
    ├── EducatorDashboard.tsx   # Educator tools
    ├── AdminDashboard.tsx      # Admin panel
    ├── LegalExpertDashboard.tsx # Expert portal
    ├── ContentReader.tsx       # Article viewer
    ├── QuizComponent.tsx       # Quiz interface
    └── DiscussionForum.tsx     # Community forum
```

### State Management
The app uses **React hooks** for state:
- `useState` - Component state
- `useEffect` - Side effects (timers, progress tracking)
- Props - Parent-child data flow

**Key state in App.tsx**:
- `currentScreen` - Navigation between views
- `userRole` - Selected user role
- `bookmarkedArticles` - Saved articles
- `readProgress` - Reading completion tracking

### Customizing Content

#### Add More Articles
Edit the `sampleArticles` array in `CitizenDashboard.tsx`:
```typescript
{
  id: 'art-new',
  number: 'Article XX',
  title: 'Your Title',
  content: 'Article content...',
  category: 'Fundamental Rights',
  historicalContext: 'Historical background...',
  landmarkCases: ['Case 1', 'Case 2']
}
```

#### Add Quiz Questions
Edit the `questions` array in `QuizComponent.tsx`:
```typescript
{
  id: 6,
  question: 'Your question?',
  options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
  correctAnswer: 0, // Index of correct option
  explanation: 'Why this is correct...',
  category: 'Category Name'
}
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use a different port
npm run dev -- --port 3001
```

### Module Not Found
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Styles Not Loading
1. Check `styles/globals.css` is imported in your entry file
2. Ensure Tailwind is configured correctly
3. Clear browser cache (Ctrl+Shift+R)

### Images Not Loading
- Check internet connection (images are from Unsplash)
- Images load via CDN, may take a moment on first load

## 📚 Learn More

### React Resources
- [React Documentation](https://react.dev)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

### Tailwind CSS
- [Tailwind Documentation](https://tailwindcss.com/docs)
- [Tailwind UI Components](https://tailwindui.com/)

### Motion (Framer Motion)
- [Motion Documentation](https://motion.dev)
- [Animation Examples](https://motion.dev/docs)

## 🎯 Next Steps

1. ✅ Run the app and explore all 4 user roles
2. ✅ Take the constitutional quiz
3. ✅ Try bookmarking articles
4. ✅ Create a discussion post
5. ✅ Test all navigation flows

## 💡 Feature Ideas

Want to extend the app? Try adding:
- User authentication
- Database integration (Supabase)
- More quiz questions
- Video content
- Certificate generation
- Leaderboards
- Push notifications
- Dark mode
- Multi-language support

---

**Need Help?** Check the main README.md for detailed documentation.

Happy coding! 🚀
