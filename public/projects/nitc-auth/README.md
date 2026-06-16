# NITC Auth

A premium, modern Flutter application for seamless authentication on the NIT Calicut network.

## ✨ Features

- **🚀 Smart Authentication**: Automatically detects and handles login for both **Hostel** and **Academic** zones.
- **💎 Premium UI**: A sleek, unified dark theme with neon accents (`#00FF94`) and ambient "frosted glass" effects.
- **⚡ Quick Settings Tile**: Connect or disconnect directly from your Android Quick Settings panel without opening the app.
- **🔄 Roaming Mode**: Automatically checks and retries connection every 5 seconds—perfect for walking between WiFi zones.
- **🔒 Secure**: Credentials are stored securely on your device using `SharedPreferences`.
- **💾 Session Persistence**: Remembers your active session to ensure reliable logout capability.

## 📱 Screenshots

| Home (Connected) | Home (Disconnected) | Quick Tile |
|:---:|:---:|:---:|
| *(Add screenshot)* | *(Add screenshot)* | *(Add screenshot)* |

## 🛠️ Installation

### Prerequisites
- Flutter SDK (v3.10 or later)
- Android Studio / VS Code
- Android Device (Min SDK 21)

### Build Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/nitc_auth.git
   cd nitc_auth/nitc_auth_app
   ```

2. **Install dependencies:**
   ```bash
   flutter pub get
   ```

3. **Run on device:**
   ```bash
   flutter run
   ```

4. **Build Release APK:**
   ```bash
   flutter build apk --release
   ```

## 📖 Usage

### Initial Setup
1. Launch the app.
2. Tap the **Settings** (Gear) icon in the top right.
3. Enter your **NITC ID** (e.g., `user_b24xxxxcs`) and **Password**.
4. Tap **Save** and return to the Home screen.

### Connection
- **Connect**: Tap the large "CONNECT NOW" button. The status pill will glow neon green when connected.
- **Roam**: Toggle "Roaming Mode" if you are moving between locations. The app will autonomously retry connections.
- **Disconnect**: Tap "DISCONNECT" to logout.

### Quick Settings Tile Setup (Android)
1. Swipe down twice to open the Quick Settings panel.
2. Tap the **Edit** (Pencil) icon.
3. Scroll down to find the **NITC Auth** tile.
4. Drag it to your active tiles section.
5. **Tap to Toggle**: Single tap to connect/disconnect instantly!

## 🏗️ Architecture

- **Frontend**: Flutter (Dart)
- **Native Integration**: Kotlin (`TileService` for Quick Settings)
- **Communication**: `MethodChannel` (`com.example.nitc_auth_app/tile`) handles intent-based communication between the native tile and the Flutter engine.
- **Networking**: `http` package with custom retry logic and robust redirect handling.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).