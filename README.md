# Hush

Ambient sound mixer for sleep and focus. A single-file PWA — no build step, no dependencies, no audio files: every sound is synthesized live in the browser with the Web Audio API.

**Live: [akshanshkmr.github.io/hush](https://akshanshkmr.github.io/hush/)**

## Features

- **16 synthesized sounds** — rain, wind, thunder, ocean, fire, stream, fan, drone, heartbeat, crickets, birds, café, train, and pink/brown/white noise. Each has its own color identity; the background wash blends the hues of whatever's playing.
- **Mix and match** — tap a tile to toggle a sound, drag sideways to set its level. Layer as many as you like over a master volume.
- **Saved mixes** — name a mix while it plays, reopen the app to it. Swipe a mix card left for Share/Delete (iOS-style). The app restores your last session on launch.
- **Share links** — a mix serializes into the URL hash (`#rain=60&fire=40`), so a link recreates it on any device.
- **Sleep timer** — one tap (15 min – 1.5 h), fades out gently, survives a page reload.
- **Breathing pacer** — a calm 5.5 s in/out circle for winding down.
- **Background playback** — keeps playing with the screen locked; lock-screen shows the mix name and artwork with play/pause controls.
- **Installable + offline** — service worker caches the app shell; install it from the download icon in the nav (one tap on Android/Chromium, Add-to-Home-Screen instructions on iOS).

## Development

It's one HTML file. Open `index.html` in a browser, or serve it locally (service worker and install require HTTP):

```sh
python3 -m http.server 8000
```

Deployed via GitHub Pages from `main`.

## How the sound works

There are no samples. Three noise buffers (white/pink/brown) are generated at startup, and each sound is a small synthesis graph over them — filters, LFOs, and scheduled one-shots (thunder strikes, fire crackles, bird motifs, train clacks). See the `ENGINES` map in `index.html`.
