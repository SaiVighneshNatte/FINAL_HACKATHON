# Developer Guide

Complete guide for developing and extending the Constitution of India app.

## 🏗️ Architecture Overview

### Component Hierarchy

```
App (Root)
├── Onboarding
├── RoleSelection
├── CitizenDashboard
│   ├── Quick Actions
│   ├── Constitutional Sections
│   └── Featured Articles
├── EducatorDashboard
│   ├── Stats Grid
│   ├── Content Management
│   └── Session Scheduling
├── AdminDashboard
│   ├── User Management
│   ├── Content Approval
│   └── Platform Analytics
├── LegalExpertDashboard
│   ├── Question Queue
│   ├── Content Updates
│   └── Impact Metrics
├── ContentReader
│   ├── Progress Tracking
│   ├── Bookmark System
│   └── Related Content
├── QuizComponent
│   ├── Timer System
│   ├── Question Flow
│   └── Score Calculation
└── DiscussionForum
    ├── Discussion List
    ├── Category Filter
    └── Create Discussion
```

### State Management

#### Global State (App.tsx)
```typescript
// Navigation
currentScreen: Screen              // Current view
userRole: UserRole                 // Selected role

// Features
bookmarkedArticles: string[]       // Bookmarked article IDs
readProgress: Record<string, number> // Article reading progress
selectedArticle: Article | null    // Currently viewed article
```

#### Local Component State
Each component manages its own UI state:
- Form inputs
- Modal visibility
- Loading states
- Error states
- Filter selections
- Search queries

## 🎨 Design Patterns

### 1. Container/Presenter Pattern

**Container Component** (Smart Component):
```typescript
// CitizenDashboard.tsx
export const CitizenDashboard: React.FC<Props> = ({ 
  onNavigate, 
  bookmarkedArticles,
  readProgress 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('explore');
  
  // Business logic here
  const filteredArticles = articles.filter(/* ... */);
  
  return <UI data={filteredArticles} />;
};
```

**Presenter Component** (Dumb Component):
```typescript
// ArticleCard.tsx
interface ArticleCardProps {
  article: Article;
  onClick: () => void;
  isBookmarked: boolean;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onClick,
  isBookmarked
}) => {
  return (
    <button onClick={onClick}>
      {/* Pure UI rendering */}
    </button>
  );
};
```

### 2. Compound Components

Group related components:
```typescript
// QuizQuestion.tsx
export const QuizQuestion = ({ children }) => {
  return <div className="quiz-question">{children}</div>;
};

QuizQuestion.Timer = ({ timeLeft }) => (
  <div className="timer">{timeLeft}s</div>
);

QuizQuestion.Options = ({ options, onSelect }) => (
  <div className="options">
    {options.map(opt => <button onClick={() => onSelect(opt)} />)}
  </div>
);

// Usage
<QuizQuestion>
  <QuizQuestion.Timer timeLeft={30} />
  <QuizQuestion.Options options={opts} onSelect={handleSelect} />
</QuizQuestion>
```

### 3. Custom Hooks

Extract reusable logic:
```typescript
// useTimer.ts
export const useTimer = (initialTime: number, onComplete: () => void) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  
  useEffect(() => {
    if (timeLeft === 0) {
      onComplete();
      return;
    }
    
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, onComplete]);
  
  return { timeLeft, reset: () => setTimeLeft(initialTime) };
};

// Usage in QuizComponent
const { timeLeft, reset } = useTimer(30, handleTimeUp);
```

```typescript
// useBookmarks.ts
export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  
  const toggle = (id: string) => {
    setBookmarks(prev => 
      prev.includes(id) 
        ? prev.filter(b => b !== id)
        : [...prev, id]
    );
  };
  
  const isBookmarked = (id: string) => bookmarks.includes(id);
  
  return { bookmarks, toggle, isBookmarked };
};
```

### 4. Render Props Pattern

Share logic between components:
```typescript
// WithAuth.tsx
interface WithAuthProps {
  children: (user: User | null) => React.ReactNode;
}

export const WithAuth: React.FC<WithAuthProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  
  // Auth logic here
  
  return <>{children(user)}</>;
};

// Usage
<WithAuth>
  {user => user ? <Dashboard /> : <Login />}
</WithAuth>
```

## 🔧 Common Tasks

### Adding a New Article Category

1. **Update data structure**:
```typescript
// CitizenDashboard.tsx
const constitutionalSections = [
  // ... existing sections
  {
    id: 'new-category',
    title: 'New Category',
    description: 'Articles XX-YY',
    icon: '🆕',
    color: '#FF9933',
    articles: 10,
    image: 'https://images.unsplash.com/...'
  }
];
```

2. **Add to category colors**:
```typescript
// ContentReader.tsx
const categoryColors: Record<string, string> = {
  // ... existing categories
  'New Category': '#FF9933'
};
```

3. **Add sample articles**:
```typescript
const sampleArticles: Article[] = [
  // ... existing articles
  {
    id: 'art-new',
    number: 'Article XX',
    title: 'New Article Title',
    content: 'Article content...',
    category: 'New Category',
    historicalContext: 'Historical background...',
    landmarkCases: ['Case 1', 'Case 2']
  }
];
```

### Adding Quiz Questions

```typescript
// QuizComponent.tsx
const questions: Question[] = [
  // ... existing questions
  {
    id: questions.length + 1,
    question: 'Your new question?',
    options: [
      'Option A',
      'Option B',
      'Option C',
      'Option D'
    ],
    correctAnswer: 0, // Index of correct option (0-3)
    explanation: 'Detailed explanation of why this answer is correct...',
    category: 'Category Name'
  }
];
```

### Creating a New Role

1. **Update type definitions**:
```typescript
// App.tsx
export type UserRole = 'citizen' | 'educator' | 'admin' | 'legal-expert' | 'new-role';
```

2. **Add to role selection**:
```typescript
// RoleSelection.tsx
const roles = [
  // ... existing roles
  {
    id: 'new-role' as UserRole,
    title: 'New Role',
    description: 'What this role can do',
    icon: IconComponent,
    color: '#FF9933',
    image: 'unsplash-url'
  }
];
```

3. **Create new dashboard**:
```typescript
// components/NewRoleDashboard.tsx
export const NewRoleDashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  return (
    <div>
      {/* Dashboard content */}
    </div>
  );
};
```

4. **Add to App.tsx routing**:
```typescript
{currentScreen === 'dashboard' && userRole === 'new-role' && (
  <NewRoleDashboard onNavigate={handleNavigate} />
)}
```

### Adding Animations

Using Motion (Framer Motion):

```typescript
import { motion, AnimatePresence } from 'motion/react';

// Fade in
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
>
  Content
</motion.div>

// Slide in
<motion.div
  initial={{ x: -100 }}
  animate={{ x: 0 }}
  transition={{ type: 'spring' }}
>
  Content
</motion.div>

// Scale on mount
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Click me
</motion.button>

// List animations
<AnimatePresence>
  {items.map((item, index) => (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ delay: index * 0.1 }}
    >
      {item.content}
    </motion.div>
  ))}
</AnimatePresence>
```

## 🎯 Best Practices

### 1. Component Organization

```typescript
// Good structure
import React, { useState, useEffect } from 'react';
import { Icon } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

// Types
interface ComponentProps {
  prop1: string;
  prop2: number;
}

// Constants
const CONSTANTS = {
  MAX_ITEMS: 10,
  COLORS: ['#FF9933', '#138808']
};

// Component
export const Component: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  // State
  const [state, setState] = useState<Type>(initialValue);
  
  // Effects
  useEffect(() => {
    // Effect logic
  }, [dependencies]);
  
  // Handlers
  const handleClick = () => {
    // Handler logic
  };
  
  // Render helpers
  const renderItem = (item: Item) => (
    <div>{item.name}</div>
  );
  
  // Return
  return (
    <div>
      {/* JSX */}
    </div>
  );
};
```

### 2. Naming Conventions

```typescript
// Components: PascalCase
export const UserProfile = () => {};

// Functions: camelCase
const handleSubmit = () => {};
const getUserData = () => {};

// Constants: UPPER_SNAKE_CASE
const API_URL = 'https://api.example.com';
const MAX_RETRY_COUNT = 3;

// Types/Interfaces: PascalCase
interface UserData {}
type UserRole = 'admin' | 'user';

// Props: ComponentNameProps
interface UserProfileProps {}
```

### 3. TypeScript Tips

```typescript
// Use const assertions for arrays
const ROLES = ['citizen', 'educator'] as const;
type Role = typeof ROLES[number]; // 'citizen' | 'educator'

// Use Pick and Omit
type ArticlePreview = Pick<Article, 'id' | 'title'>;
type ArticleWithoutId = Omit<Article, 'id'>;

// Use Record for maps
type ColorMap = Record<string, string>;
const colors: ColorMap = {
  primary: '#FF9933',
  secondary: '#138808'
};

// Use union types for variants
type ButtonVariant = 'primary' | 'secondary' | 'outline';
```

### 4. Error Handling

```typescript
// Component-level error boundary
const [error, setError] = useState<Error | null>(null);

try {
  // Risky operation
} catch (err) {
  setError(err as Error);
}

if (error) {
  return <ErrorDisplay error={error} />;
}
```

### 5. Performance Optimization

```typescript
// Memoize expensive calculations
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data);
}, [data]);

// Memoize callbacks
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);

// Memoize components
const MemoizedComponent = React.memo(Component, (prev, next) => {
  return prev.id === next.id;
});
```

## 🧪 Testing Patterns

### Unit Tests
```typescript
// Component.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Component } from './Component';

describe('Component', () => {
  it('renders correctly', () => {
    render(<Component />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
  
  it('handles click', () => {
    const handleClick = jest.fn();
    render(<Component onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });
});
```

## 🎨 Styling Guidelines

### Tailwind Best Practices

```typescript
// Extract repeated patterns
const cardStyles = 'bg-white rounded-xl shadow-sm border border-gray-100 p-4';
const buttonStyles = 'px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700';

// Use template literals for dynamic classes
<div className={`${baseStyles} ${isActive ? 'bg-orange-500' : 'bg-gray-500'}`} />

// Use cn() utility for conditional classes
import { cn } from './utils';
<div className={cn(
  'base-class',
  isActive && 'active-class',
  variant === 'large' && 'large-class'
)} />
```

### Color System
```typescript
// Use semantic color variables
const colors = {
  saffron: '#FF9933',    // Primary, highlights
  green: '#138808',      // Success, educator
  blue: '#000080',       // Admin, authority
  white: '#FFFFFF',      // Backgrounds
  
  // Grays
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray500: '#6B7280',
  gray900: '#111827'
};
```

## 🚀 Advanced Patterns

### Context API for Global State

```typescript
// context/AppContext.tsx
interface AppContextType {
  user: User | null;
  setUser: (user: User) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  
  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

// Usage in App.tsx
<AppProvider>
  <App />
</AppProvider>
```

### Reducer Pattern for Complex State

```typescript
// useReducer for complex state
type Action = 
  | { type: 'ADD_BOOKMARK'; id: string }
  | { type: 'REMOVE_BOOKMARK'; id: string }
  | { type: 'UPDATE_PROGRESS'; id: string; progress: number };

interface State {
  bookmarks: string[];
  progress: Record<string, number>;
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_BOOKMARK':
      return {
        ...state,
        bookmarks: [...state.bookmarks, action.id]
      };
    case 'REMOVE_BOOKMARK':
      return {
        ...state,
        bookmarks: state.bookmarks.filter(id => id !== action.id)
      };
    case 'UPDATE_PROGRESS':
      return {
        ...state,
        progress: { ...state.progress, [action.id]: action.progress }
      };
    default:
      return state;
  }
};

const [state, dispatch] = useReducer(reducer, initialState);
```

## 📖 Resources

### React
- [React Docs](https://react.dev)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

### Tailwind
- [Tailwind Docs](https://tailwindcss.com/docs)

### Motion
- [Motion Docs](https://motion.dev)

### TypeScript
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

Happy coding! 🎉
