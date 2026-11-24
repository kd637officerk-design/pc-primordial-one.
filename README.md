# ADV-001 — Windows Media Deck

ADV-001 packages the standalone Hyper-Realistic Media Deck HTML as a Windows desktop application using Electron.

## Included
- The complete standalone media-deck HTML and its embedded artwork / wallpaper collection.
- The uploaded character artwork as the Windows application icon and in-app header cover.
- Existing media, wallpaper, theme and DIY features from the supplied HTML.
- Windows file and folder import through native Chromium file/folder pickers.
- A built-in countdown timer and stopwatch.
- Keyboard shortcut: `Ctrl+O` to add local audio/video files.
- Menu: **File → Scan a Windows folder…** to choose a folder and import its supported media.

## Build the Windows installer on GitHub
1. Create a new **public or private** GitHub repository.
2. Extract this ZIP and upload the contents of this folder to the repository root (so `package.json`, `main.js`, `index.html`, and `.github/` are at the top level).
3. Commit to the `main` branch, or open **Actions → Build ADV-001 for Windows → Run workflow**.
4. When the workflow finishes, open its run and download the **ADV-001-Windows-Installer** artifact.
5. Extract the artifact ZIP and run the `ADV-001 Setup 1.0.0.exe` installer on Windows.

## Local development
Install Node.js 22 or newer, then run:

```bash
npm install
npm start
```

To build the installer locally on Windows:

```bash
npm run dist
```

The installer will be written to `dist/`.

## Access to Windows files
ADV-001 does not silently scan the entire drive. Use **File → Add music / video files…** or **File → Scan a Windows folder…** and choose the files/folder you want the app to read. The browser's native file picker grants access to the selected files. The app imports selected media into its own local media library/storage.

## Notes
- This repository contains source code; GitHub Actions builds the Windows `.exe`. The `.exe` is downloaded from the workflow artifact after the build completes.
- The app is an offline-first desktop wrapper. Features requiring an external service or internet connection remain subject to that service's availability.
