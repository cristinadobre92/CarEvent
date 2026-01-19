# CarEvent App

A cross-platform mobile application built with React Native and Expo for discovering and tracking motorsports events from premier racing venues across Europe, including Autodrom Most (Czech Republic) and Nürburgring (Germany).

## Features

- **Event Discovery**: Browse 57+ racing events from top European circuits
- **Smart Filtering**: Filter events by date and location
- **Favorites**: Save your favorite events for quick access
- **Interactive Calendar**: Visual date picker for finding events
- **Event Details**: Complete event information with direct links to official pages
- **Cross-Platform**: Runs on iOS, Android, and Web
- **Modern UI**: Clean, minimalist interface with smooth interactions

## Prerequisites

Before installing the project, ensure you have the following installed:

- **Node.js**: v18.0.0 or higher ([Download](https://nodejs.org/))
- **npm**: v9.0.0 or higher (comes with Node.js)
- **Expo CLI**: Install globally with `npm install -g expo-cli`
- **Git**: For cloning the repository

### Platform-Specific Requirements

#### iOS Development
- macOS with Xcode 14.0 or higher
- iOS Simulator or physical iOS device
- CocoaPods: `sudo gem install cocoapods`

#### Android Development
- Android Studio with Android SDK
- Android Emulator or physical Android device
- Java Development Kit (JDK) 11 or higher

#### Web Development
- Modern web browser (Chrome, Firefox, Safari, Edge)

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd CarEventApp
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required dependencies including:
- React Native and Expo framework
- Navigation libraries
- State management (Zustand)
- Calendar components
- TypeScript support

### 3. Verify Installation

```bash
npm start
```

If the Metro bundler starts successfully, your installation is complete.

## Running the Project

### Development Mode

Start the Expo development server:

```bash
npm start
```

This will open the Expo Developer Tools in your browser with a QR code.

### Platform-Specific Commands

#### iOS (macOS only)
```bash
npm run ios
```

#### Android
```bash
npm run android
```

#### Web Browser
```bash
npm run web
```

### Running on Physical Devices

1. Install the **Expo Go** app on your device:
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. Scan the QR code from the terminal with:
   - **iOS**: Camera app
   - **Android**: Expo Go app

## Project Structure

```
CarEventApp/
├── App.tsx                      # Root component
├── src/
│   ├── components/              # Reusable components
│   │   ├── events/
│   │   │   └── EventCard.tsx    # Event card component
│   │   └── navigation/
│   │       └── Header.tsx       # Navigation header
│   ├── navigation/
│   │   └── TabNavigator.tsx     # Bottom tab navigation
│   ├── screens/
│   │   ├── EventsScreen.tsx     # Main events list with filters
│   │   └── FavoritesScreen.tsx  # Saved favorites screen
│   ├── store/
│   │   └── favoritesStore.ts    # Zustand state management
│   ├── theme/
│   │   └── colors.ts            # Color palette
│   ├── types/
│   │   └── event.ts             # TypeScript interfaces
│   └── utils/
│       └── mockData.ts          # Events data
├── package.json                 # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
└── README.md                   # This file
```

## Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| Start | `npm start` | Start Expo development server |
| iOS | `npm run ios` | Run on iOS simulator |
| Android | `npm run android` | Run on Android emulator |
| Web | `npm run web` | Run in web browser |

## Technologies Used

### Core Framework
- **React Native**: v0.81.5 - Cross-platform mobile framework
- **Expo**: v54.0.25 - Development platform and toolchain
- **TypeScript**: v5.9.2 - Type-safe JavaScript

### Navigation
- **React Navigation**: v7.1.22 - Routing and navigation
- **Bottom Tabs Navigator**: v7.8.8 - Tab-based navigation

### State Management
- **Zustand**: v5.0.9 - Lightweight state management
- **AsyncStorage**: v2.2.0 - Persistent storage for favorites

### UI Components
- **React Native Calendars**: v1.1313.0 - Calendar components
- **Safe Area Context**: v5.6.0 - Handle device safe areas

### Development
- **React**: v19.1.0 - UI library
- **React Native Web**: v0.21.0 - Web support

## Data Sources

Events are currently scraped from official racing venue websites:

1. **Autodrom Most** (Czech Republic)
   - URL: https://www.autodrom-most.cz/kalendar-zavodu-c1423/
   - Events: 30 racing events for 2026

2. **Nürburgring** (Germany)
   - URL: https://nuerburgring.de/events?locale=en
   - Events: 27 motorsports and entertainment events for 2026-2027

### Event Data Structure

Each event includes:
- **id**: Unique identifier
- **title**: Event name
- **description**: Event details
- **date**: ISO date string (YYYY-MM-DD)
- **location**: Venue location
- **url**: Link to official event page
- **category**: sports, concert, conference, workshop, or other

## Maintenance

### Updating Event Data

Event data is stored in `src/utils/mockData.ts`. To update events:

1. **Scrape New Events**: Use web scraping tools to extract updated event data
2. **Update mockData.ts**: Add/modify events in the `mockEvents` array
3. **Maintain Data Structure**: Ensure all required fields are present
4. **Update IDs**: Assign unique sequential IDs to new events
5. **Verify URLs**: Test event URLs to ensure they're valid

#### Example: Adding a New Event

```typescript
{
  id: '58',
  title: 'New Racing Event',
  description: 'Description of the event',
  date: '2026-12-15',
  location: 'Circuit Name, Country',
  url: 'https://example.com/event',
  category: 'sports',
}
```

### Updating Dependencies

Check for outdated dependencies:

```bash
npm outdated
```

Update all dependencies:

```bash
npm update
```

Update specific dependency:

```bash
npm install package-name@latest
```

### Adding New Venues

To add events from new racing venues:

1. Scrape events from the venue's website
2. Add events to `src/utils/mockData.ts`
3. Ensure location names are consistent
4. Test the location filter functionality

### Code Maintenance Best Practices

#### Regular Tasks
- **Weekly**: Check for dependency updates
- **Monthly**: Review and update event data
- **Quarterly**: Remove past events from the database
- **As Needed**: Add new venues and events

#### Code Quality
- Run TypeScript type checking: `npx tsc --noEmit`
- Follow existing code patterns and naming conventions
- Test on multiple platforms (iOS, Android, Web)
- Verify all event URLs are working

#### Performance Optimization
- Monitor app bundle size: `npx expo export --dump-sourcemap`
- Optimize images if added in future updates
- Profile rendering performance using React DevTools
- Keep event list sorted by date for better UX

### Troubleshooting

#### Metro Bundler Issues
```bash
# Clear cache and restart
npx expo start -c
```

#### iOS Build Issues
```bash
cd ios && pod install && cd ..
npm run ios
```

#### Android Build Issues
```bash
cd android && ./gradlew clean && cd ..
npm run android
```

#### Dependency Issues
```bash
# Remove and reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Testing Before Deployment

Before deploying updates:

1. Test on iOS simulator/device
2. Test on Android emulator/device
3. Test on web browser
4. Verify all filters work correctly
5. Test favorites functionality
6. Verify all external links open correctly
7. Check that past events are removed
8. Confirm new events are properly formatted

## Event Categories

The app supports the following event categories:

- **sports**: Motorsports and racing events
- **concert**: Music festivals and performances
- **conference**: Tech and business conferences
- **workshop**: Educational workshops
- **other**: Entertainment and miscellaneous events

## Future Enhancements

Potential features for future development:

- Push notifications for upcoming events
- User authentication and cloud sync
- Event search functionality
- Map view of event locations
- Social sharing capabilities
- Event reminders
- Ticket purchasing integration
- Real-time event updates via API
- More racing venues across Europe

## Support

For issues, questions, or contributions:

1. Check existing documentation
2. Review troubleshooting section
3. Open an issue in the repository
4. Contact the development team

## License

[Add your license information here]

## Contributors

[Add contributor information here]

---

**Last Updated**: January 2026
**Version**: 1.0.0
**Maintained By**: [Add maintainer information]
