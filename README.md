Key Features:

#### 1. **User Authentication**

* Secure login and registration (username, email, password, social media logins)
* Multi-factor authentication (MFA) for enhanced security
* User profiles with profile pictures, bios, and preferences
* Forgot password & account recovery options

#### 2. **Home Feed**

* Dynamic content (text, images, videos) from friends, pages, and public profiles
* Infinite scroll or pagination for easy content browsing

#### 3. **Post Creation & Sharing**

* Create and share text posts, images and videos
* Tagging system for people, locations, and topics
* Add hashtags to posts for increased discoverability

#### 4. **Interactions & Engagement**

* Like, comment, and share posts
* Emoji support for richer interactions

#### 5. **Notifications**

* Push notifications for new likes, comments, messages, and friend requests
* Real-time alerts for tagged posts and mentions
* Activity and event reminders
* Customizable notification preferences

#### 6. **Performance & Optimization**

* Smooth scrolling and media loading with lazy loading
* Optimized video and image compression for fast loading times
* App optimized for both Android and iOS devices
* Offline support for reading posts, comments, and messages

#### 7. **Backend Integration**

* Real-time database and cloud storage for media (Firebase, AWS, etc.)
* REST API integration for connecting to external services
* WebSocket or MQTT for real-time messaging and notifications
* Scalable backend architecture using Node.js, Python, or similar frameworks

Techs Used:

#### 1. **Frontend Framework & Libraries**

* **React Native** (`react-native: 0.81.5`)

  * Cross-platform framework for building mobile applications (iOS & Android).
* **React** (`react: 19.1.0`)

  * A JavaScript library for building user interfaces.
* **React DOM** (`react-dom: 19.1.0`)

  * Enables React to be used for web applications alongside React Native.
* **React Native Web** (`react-native-web: 0.21.0`)

  * Allows React Native components and APIs to be used on the web.
* **Expo** (`expo: 54.0.22`)

  * A framework for building React Native applications with managed workflows and built-in APIs.

#### 2. **Navigation & Routing**

* **React Navigation**:

  * **Bottom Tabs** (`@react-navigation/bottom-tabs: 7.3.10`): For creating tab-based navigation.
  * **Native** (`@react-navigation/native: 7.1.6`): Core library for React Navigation.
  * **Elements** (`@react-navigation/elements: 2.3.8`): Component library for React Navigation.
  * **Expo Router** (`expo-router: 6.0.14`): Enables file-based routing within Expo projects for easier navigation management.

#### 3. **UI Components & Design**

* **RNE UI** (`@rneui/themed: 4.0.0-rc.8`)

  * A customizable UI component library, optimized for React Native.
* **Expo-AV** (`expo-av: 16.0.7`)

  * For handling audio and video playback in Expo apps.
* **Expo-Image** (`expo-image: 3.0.10`)

  * Provides optimized image loading with caching and performance improvements.
* **Expo-Blur** (`expo-blur: 15.0.7`)

  * Adds a blur effect to components (backgrounds, overlays, etc.) to improve UI aesthetics.
* **React Native SVG** (`react-native-svg: 15.12.1`)

  * For rendering scalable vector graphics (SVG) in React Native applications.

#### 4. **State Management & Async Storage**

* **Async Storage** (`@react-native-async-storage/async-storage: 2.2.0`)

  * Provides an asynchronous, persistent storage solution for simple data (like user preferences).

#### 5. **Backend Integration**

* **Supabase** (`@supabase/supabase-js: 2.54.0`)

  * An open-source alternative to Firebase for building real-time applications, providing authentication, databases, and storage.
* **Base64 ArrayBuffer** (`base64-arraybuffer: 1.0.2`)

  * Used for encoding/decoding binary data to/from base64 in array buffer format.

#### 6. **User Experience Enhancements**

* **Expo-Haptics** (`expo-haptics: 15.0.7`)

  * Adds haptic feedback capabilities (vibration) to enhance the user experience.
* **Expo-Splash-Screen** (`expo-splash-screen: 31.0.10`)

  * Customizable splash screen for applications, displayed during the app load.
* **Expo-Status-Bar** (`expo-status-bar: 3.0.8`)

  * Controls the appearance of the device’s status bar for better UI control.
* **Expo-System-UI** (`expo-system-ui: 6.0.8`)

  * Offers methods to manipulate system-level UI elements like the status bar and notch.

#### 7. **Web & Mobile Features**

* **React Native WebView** (`react-native-webview: 13.15.0`)

  * Embeds web content within the mobile application using a web view.
* **React Native Gesture Handler** (`react-native-gesture-handler: 2.28.0`)

  * Provides a gesture handling system for React Native apps, enabling native-like touch interactions.
* **React Native Reanimated** (`react-native-reanimated: 4.1.1`)

  * A powerful library for creating complex animations and transitions in React Native.

#### 8. **Multimedia & Content Handling**

* **Expo-File-System** (`expo-file-system: 19.0.17`)

  * Provides an API for file system access, allowing reading and writing files to the device.
* **Expo-Image-Picker** (`expo-image-picker: 17.0.8`)

  * A cross-platform image picker for selecting images from the device gallery or camera.
* **Moment.js** (`moment: 2.30.1`)

  * Library for working with dates and times in JavaScript, used for formatting and manipulating date objects.

#### 9. **Text and Rich Content Editing**

* **React Native Pell Rich Editor** (`react-native-pell-rich-editor: 1.10.0`)

  * A rich text editor for React Native, allowing users to create styled text content with various formatting options.
* **React Native Render HTML** (`react-native-render-html: 6.3.4`)

  * Renders HTML content in React Native applications, useful for displaying rich media or web content inside the app.

#### 10. **Networking & Polyfills**

* **React Native URL Polyfill** (`react-native-url-polyfill: 2.0.0`)

  * Provides the URL API (for working with URLs) in environments where it's not available natively.

#### 11. **Build Tools & Development Utilities**

* **Babel** (`@babel/core: 7.25.2`)

  * JavaScript compiler used to transform modern JavaScript syntax into code that works in older environments.
* **ESLint** (`eslint: 9.25.0`)

  * Linter for JavaScript and TypeScript to identify and fix potential issues in the codebase.
* **TypeScript** (`typescript: 5.9.2`)

  * A typed superset of JavaScript that helps prevent bugs and improves the development experience.

#### 12. **Type Definitions**

* **@types/react** (`@types/react: ~19.1.10`)

  * TypeScript type definitions for React, ensuring better type safety in React applications.

Screenshots:

   ![Image](https://github.com/user-attachments/assets/3c127dab-57cd-4b58-acd0-9a227ae21251)
