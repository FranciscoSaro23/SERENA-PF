SERENA: Francisco Sarobe - Lola Grille - Eugenia Lucero

cd SERENA
npm i
npm i -g expo
npm i expo@latest
npm install --global @expo/ngrok@^4.1.0
npx expo start --tunnel

Correr EAS:
Instalá EAS CLI globalmente con npm:

"npm install -g eas-cli"

🔑 Iniciá sesión en Expo

"eas login"

- UserName: "Fran.Sarobe"
- Pass: "24957579"

🚀 Probar build

"eas build -p android --clear-cache"

DALE TODO QUE SI.

PROBLEMAS:

✖ Check Expo config (app.json/ app.config.js) schema
Errors validating asset fields in /home/expo/workingdir/build/SERENA/app.json:
 Field: icon - image should be square, but the file at './assets/icon.png' has dimensions 2000x2092.
Advice:
Resolve schema errors in your app config. Learn more: https://docs.expo.dev/workflow/configuration/

✖ Check that required peer dependencies are installed
Missing peer dependency: expo-font
Required by: @expo/vector-icons
Advice:
Install missing required peer dependency with "npx expo install expo-font"
Your app may crash outside of Expo Go without this dependency. Native module peer dependencies must be installed directly.

✖ Check for app config fields that may not be synced in a non-CNG project
This project contains native project folders but also has native configuration properties in app.json, indicating it is configured to use Prebuild. When the android/ios folders are present, EAS Build will not sync the following properties: orientation, icon, userInterfaceStyle, splash, ios, android. 
Advice:
Add '/android' to your .gitignore file if you intend to use CNG / Prebuild. Learn more: https://docs.expo.dev/workflow/prebuild/#usage-with-eas-build

✖ Validate packages against React Native Directory package metadata
The following issues were found when validating your dependencies against React Native Directory:
  Untested on New Architecture: react-native-splash-screen
  Unmaintained: react-native-splash-screen
  No metadata available: lucide-react, react-native-color-picker, react-native-color-picker-wheel, react-native-websocket
Advice:
Use libraries that are actively maintained and support the New Architecture. Find alternative libraries with https://reactnative.directory.
Add packages to expo.doctor.reactNativeDirectoryCheck.exclude in package.json to selectively skip validations, if the warning is not relevant.
Update React Native Directory to include metadata for unknown packages. Alternatively, set expo.doctor.reactNativeDirectoryCheck.listUnknownPackages in package.json to false to skip warnings about packages with no metadata, if the warning is not relevant.
