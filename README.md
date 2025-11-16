# 🎬 CritiCast

**CritiCast** is a modern, cross-platform movie and series review application built with React Native and Expo. It provides a rich user experience for browsing, searching, and rating films, powered by The Movie Database (TMDB) API and a custom backend.

![CritiCast Banner](https://via.placeholder.com/1200x400.png?text=CritiCast+App+Banner)
*(Replace this with a cool banner for your app!)*

---

## ✨ Key Features

-   **Dynamic Movie Browsing:** Explore lists of popular, top-rated, now playing, and upcoming movies, with data fetched in real-time.
-   **Full User Authentication:** Secure user registration and login flow.
-   **Community Reviews & Ratings:** Users can create, read, update, and delete their own movie reviews and ratings.
-   **Advanced Filtering & Searching:** A powerful search and filter system to find movies by name, genre, rating, and more.
-   **Detailed Movie Information:** View comprehensive details for each movie, including synopsis, cast, budget, genres, and both TMDB and user ratings.
-   **Personalized User Profiles:** Users can manage their profile, including updating their username.
-   **Modern & Animated UI:** A smooth, beautifully designed user interface with animations and a custom dark theme.

---

## 📱 Screenshots

*(Replace these placeholders with actual screenshots of your app!)*

| Home Screen                                       | Movie Details                                     | Profile Drawer                                    |
| ------------------------------------------------- | ------------------------------------------------- | ------------------------------------------------- |
| ![Home Screen](https://via.placeholder.com/300x600.png?text=Home+Screen) | ![Movie Details](https://via.placeholder.com/300x600.png?text=Movie+Details) | ![Profile Drawer](https://via.placeholder.com/300x600.png?text=Profile+Drawer) |

---

## 🛠️ Tech Stack

The application is built with a modern and robust stack, separating concerns between the frontend and backend.

### 🚀 Frontend (React Native)

-   **Framework:** [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Routing:** [Expo Router](https://docs.expo.dev/router/introduction/) (File-based)
-   **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)
-   **Data Fetching & Caching:** [TanStack Query](https://tanstack.com/query/latest) (React Query)
-   **Styling:** [NativeWind](https://www.nativewind.dev/) (Tailwind CSS for React Native)
-   **UI Components:** [React Native Paper](https://reactnativepaper.com/)

### 🔧 Backend

-   **Framework:** [Node.js](https://nodejs.org/) with [Express.js](https://expressjs.com/)
-   **Database:** [PostgreSQL](https://www.postgresql.org/) (hosted on Neon)
-   **ORM:** [Prisma](https://www.prisma.io/)
-   **Authentication:** JWT (JSON Web Tokens)

---

## 🚀 Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   [Node.js](https://nodejs.org/) (LTS version recommended)
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
-   [Git](https://git-scm.com/)
-   An Android Emulator or a physical device with the Expo Go app.

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/JeJaMel/CritiCast-app.git
    cd CritiCast-app
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    Create a `.env` file in the root of the project by copying the example file:
    ```bash
    cp .env.example .env
    ```
    Now, open the `.env` file and fill in your own credentials and local backend URL.

    **.env.example:**
    ```env
    # The Movie Database (TMDB) API Key
    EXPO_PUBLIC_MOVIE_DB_KEY="YOUR_TMDB_API_KEY_HERE"

    # Stage can be 'dev' or 'prod'
    EXPO_PUBLIC_STAGE=dev

    # Your backend's local URL. Change the IP if needed.
    EXPO_PUBLIC_API_URL=http://localhost:4000
    EXPO_PUBLIC_API_URL_IOS=http://localhost:4000
    EXPO_PUBLIC_API_URL_ANDROID=http://192.168.1.100:4000 #<-- Change this to your PC's local IP
    ```
    **⚠️ Important:** Never commit your `.env` file to version control.

4.  **Start the development server:**
    ```bash
    npx expo start
    ```
    This will open the Expo development server. You can now open the app in an emulator, on a physical device via the Expo Go app, or in a development build.

---

## 📂 Project Structure

The project follows a feature-sliced design approach to keep the code organized and scalable.