# Drivelah Frontend Assignment

A responsive web application for car listing management built with React, TypeScript, Redux Toolkit, and SASS. This application allows users to manage their car listings through a multi-step form process with data persistence using browser's local storage.

## 🚀 Features

- **Responsive Design**: Fully responsive UI that adapts seamlessly between desktop and mobile layouts
- **State Management**: Redux Toolkit for centralized state management
- **Data Persistence**: All data automatically saved to browser's local storage
- **Multi-step Form**: Intuitive navigation through different listing steps
- **Subscription Plans**: Three-tier subscription plan selection (Free, Good, Best)
- **TypeScript**: Full type safety throughout the application
- **Modern Styling**: SCSS with variables, mixins, and mobile-first approach

## 📋 Technical Requirements Met

✅ **Framework**: React 19 with TypeScript  
✅ **State Management**: Redux Toolkit  
✅ **Styling**: SASS/SCSS without external UI libraries  
✅ **Responsive**: Mobile and desktop layouts  
✅ **Data Storage**: Local storage implementation  
✅ **Routing**: React Router for navigation  

## 🛠️ Tech Stack

- **React** 19.2.0 - UI framework
- **TypeScript** 5.9.3 - Type safety
- **Redux Toolkit** - State management
- **React Router DOM** - Client-side routing
- **SASS** - CSS preprocessing
- **Vite** - Build tool and dev server

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd frontend-assignment
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5174
```

## 🏗️ Project Structure

```
frontend-assignment/
├── src/
│   ├── components/
│   │   ├── common/          # Reusable common components
│   │   ├── features/        # Feature-specific components
│   │   └── layout/          # Layout components
│   │       ├── Header.tsx
│   │       ├── Sidebar.tsx
│   │       └── MainLayout.tsx
│   ├── pages/
│   │   ├── SubscriptionPlan.tsx
│   │   └── PlaceholderPage.tsx
│   ├── store/
│   │   ├── index.ts         # Redux store configuration
│   │   ├── hooks.ts         # Typed Redux hooks
│   │   └── slices/
│   │       └── listingSlice.ts
│   ├── styles/
│   │   ├── _variables.scss  # SCSS variables
│   │   ├── _mixins.scss     # SCSS mixins
│   │   └── globals.scss     # Global styles
│   ├── utils/
│   │   └── localStorage.ts  # Local storage utilities
│   ├── App.tsx              # Main app component
│   └── main.tsx             # Entry point
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🎨 Design Implementation

The application implements the provided XD designs with:

### Desktop Layout
- Fixed header with branding and navigation
- Left sidebar navigation showing all form steps
- Main content area displaying the current step
- Responsive grid layout for subscription plans

### Mobile Layout
- Collapsible navigation
- Vertical scrolling sidebar
- Single-column subscription plan cards
- Touch-friendly interactions

## 💾 Data Storage

All form data is automatically persisted to browser's local storage:

- **Automatic Save**: Data saves on every Redux state change
- **Automatic Load**: Data loads when app initializes
- **No Form Submit**: State is managed and stored automatically
- **Storage Key**: `drivelah_listing_data`

### Storage Structure

```typescript
{
  location: { address, city, country },
  about: { carModel, year, description },
  features: string[],
  rules: string[],
  pricing: { dailyRate, weeklyDiscount, monthlyDiscount },
  promotion: { enabled, discountPercentage },
  pictures: string[],
  insurance: { type, coverage },
  subscription: { plan: 'free' | 'good' | 'best' },
  device: { deviceType },
  easyAccess: { enabled }
}
```

## 🎯 Key Features

### Subscription Plan Selection

Three subscription tiers:

1. **Just mates** (Free)
   - Bring your own GPS
   - Manual mileage reporting
   - In-person key handover

2. **Good mates** ($10/month)
   - Primary GPS included
   - Automated mileage calculations
   - In-person key handover

3. **Best mates** ($30/month)
   - Keyless access technology
   - Automated mileage calculations
   - Remote handover

### Navigation

- Step-by-step navigation with visual progress indicators
- Completed steps marked with checkmarks
- Active step highlighted
- Persistent state across navigation

## 📱 Responsive Breakpoints

```scss
Mobile:  < 768px
Tablet:  768px - 1023px
Desktop: ≥ 1024px
Wide:    ≥ 1280px
```

## 🎨 Color Scheme

```scss
Primary:    #1dbab4 (Teal)
Text:       #2c3e50 (Dark Blue)
Secondary:  #7f8c8d (Gray)
Background: #f8f9fa (Light Gray)
Accent:     #f4d35e (Yellow)
```

## 📝 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🔧 Development

### Adding New Pages

1. Create component in `src/pages/`
2. Add route in `src/App.tsx`
3. Update sidebar navigation in `src/components/layout/Sidebar.tsx`

### Redux State Management

```typescript
// Using typed hooks
import { useAppDispatch, useAppSelector } from './store/hooks';

const dispatch = useAppDispatch();
const plan = useAppSelector(state => state.listing.subscription.plan);

// Dispatching actions
dispatch(updateSubscription('best'));
```

### Styling Guidelines

- Use SCSS variables from `_variables.scss`
- Leverage mixins from `_mixins.scss`
- Follow BEM naming convention
- Mobile-first responsive design

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is created for assignment purposes.

## 👥 Author

Frontend Assignment Project

---

Built with ❤️ using React, TypeScript, and modern web technologies
