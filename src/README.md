# Constitution of India - Civic Education App

A comprehensive React-based civic education application focused on the Indian Constitution with role-based access for Citizens, Educators, Admins, and Legal Experts.

## Features

### 🎨 Design
- Indian flag color scheme (Saffron #FF9933, White #FFFFFF, Green #138808, Blue #000080)
- Mobile-first design optimized for iPhone 14 dimensions (390×844px)
- Responsive layout with Tailwind CSS
- Enhanced with relevant Unsplash images throughout

### 👥 User Roles

#### 1. **Citizen**
- Browse constitutional content (Fundamental Rights, Duties, Directive Principles, Judiciary)
- Take interactive quizzes with timer and animations
- Participate in discussions
- Bookmark articles
- Track reading progress

#### 2. **Educator**
- Create and manage content
- Schedule and conduct live sessions
- Track student progress
- View analytics and stats

#### 3. **Admin**
- Manage users across all roles
- Approve/reject content submissions
- View platform statistics
- Handle reports and moderation

#### 4. **Legal Expert**
- Answer constitutional questions
- Update and create expert content
- Provide legal insights
- Track impact metrics

### 📚 Constitutional Coverage
- **Fundamental Rights** (Articles 12-35)
- **Fundamental Duties** (Article 51A)
- **Directive Principles** (Articles 36-51)
- **Union & State Government structures**
- **Judiciary** (Articles 124-147)
- Each article includes:
  - Detailed explanations
  - Historical context
  - Landmark cases
  - Related articles

### ✨ Key Features
- **Enhanced Onboarding**: Multi-slide introduction with hero images
- **Content Reader**: Advanced reading experience with:
  - Auto-progress tracking
  - Bookmarking capability
  - Audio narration button
  - Historical context sections
  - Landmark cases with links
  - Related articles
- **Quiz System**: 
  - 30-second timer per question
  - Animated transitions
  - Instant feedback with explanations
  - Progress tracking
  - Score analysis
- **Discussion Forum**:
  - Create and participate in discussions
  - Category-based filtering
  - Like and comment functionality
  - Trending topics
  - Search capability

## Running the App in VS Code

### Prerequisites
Make sure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **VS Code** (latest version)

### Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. **Open in Browser**
   - The app will automatically open in your default browser
   - Or manually navigate to: `http://localhost:3000`
   - For mobile view, open Chrome DevTools (F12) and toggle device toolbar (Ctrl+Shift+M)
   - Select "iPhone 14" or custom dimensions (390×844px)

4. **VS Code Setup**
   - Install recommended extensions:
     - ESLint
     - Prettier
     - Tailwind CSS IntelliSense
   - Open the project folder in VS Code
   - Press `Ctrl+~` to open integrated terminal
   - Run the development server from the terminal

### Project Structure
```
/
├── App.tsx                          # Main app component with routing
├── components/
│   ├── Onboarding.tsx              # Welcome slides
│   ├── RoleSelection.tsx           # Choose user role
│   ├── CitizenDashboard.tsx        # Citizen interface
│   ├── EducatorDashboard.tsx       # Educator interface
│   ├── AdminDashboard.tsx          # Admin interface
│   ├── LegalExpertDashboard.tsx    # Legal expert interface
│   ├── ContentReader.tsx           # Article reading experience
│   ├── QuizComponent.tsx           # Interactive quiz
│   └── DiscussionForum.tsx         # Community discussions
├── styles/
│   └── globals.css                 # Global styles and Tailwind config
└── README.md                       # This file
```

## Technology Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **Lucide React** - Icons
- **Motion (Framer Motion)** - Animations
- **Unsplash** - Images

## Usage Guide

### Getting Started
1. Launch the app - you'll see the onboarding screens
2. Choose your role (Citizen, Educator, Admin, or Legal Expert)
3. Explore the role-specific dashboard

### As a Citizen
- **Browse Content**: Navigate through constitutional sections
- **Take Quizzes**: Test your knowledge with timed questions
- **Join Discussions**: Participate in community conversations
- **Track Progress**: See your reading progress and bookmarks

### As an Educator
- Create educational content
- Schedule live sessions
- Monitor student engagement
- View analytics

### As an Admin
- Review and approve content
- Manage user accounts
- Monitor platform activity
- Handle moderation

### As a Legal Expert
- Answer constitutional questions
- Update expert content
- Provide authoritative insights
- Track your impact

## Development

### Adding New Features
1. Create component in `/components` directory
2. Import and use in `App.tsx`
3. Follow existing patterns for state management
4. Use Tailwind classes for styling (avoid font-size, font-weight, line-height classes)

### Styling Guidelines
- Use Indian flag colors for primary elements
- Follow mobile-first approach
- Maintain 390px max-width for mobile view
- Use existing color variables:
  - Saffron: #FF9933
  - Green: #138808
  - Blue: #000080

### State Management
- Local state with `useState` for component-level data
- Props drilling for sharing data between components
- Consider adding Context API for global state if needed

## Future Enhancements
- User authentication and profiles
- Backend integration with Supabase
- Offline support with PWA
- Push notifications
- Advanced analytics
- Video content integration
- Multi-language support

## License
This project is for educational purposes.

## Contributing
Contributions are welcome! Please follow the existing code style and conventions.

---

Made with ❤️ for civic education in India
