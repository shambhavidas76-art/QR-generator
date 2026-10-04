# QR✦POP Studio — QR Code Generator & Designer

A browser-based QR code generator where you can pick a QR type, enter your details, style the code, preview it live, and download it. Everything runs in the browser, with no backend and no data sent to a server.

Built for the **GDG on Campus, SRM — Technical Recruitments 2026-27** (Frontend Task 1: QR Code Generator & Designer).

**Live demo:** https://qr-generator-rust-psi.vercel.app/

---

## Features

**QR types**
- URL
- Plain Text
- Email (address, subject, body)
- Phone Number
- Wi-Fi (network name, password, encryption: WPA / WEP / None)

Each type shows its own input fields, and the correct data format is generated automatically.

**Customization**
- Foreground and background colors
- Dot styles
- QR size
- Error correction level (L / M / Q / H)
- Margin / padding
- Ready-made color presets that can still be edited afterward
- All changes update the preview immediately

**Output**
- Download as **PNG** (matches the preview)
- Download as **SVG**
- Copy the encoded payload to the clipboard
- "Try Example" button to fill in sample data

**Other**
- Dark / Lime theme toggle
- Input validation with clear error messages
- Warnings for color choices that can make a QR hard to scan
- Recent QR codes saved in the browser (`localStorage`) and kept after a refresh
- Responsive layout for desktop and mobile

---

## How each QR type is encoded

| Type | Encoded format |
|---|---|
| URL | `https://example.com` |
| Plain Text | the text as entered |
| Email | `mailto:hello@example.com?subject=...&body=...` |
| Phone | `tel:+15551234567` |
| Wi-Fi | `WIFI:T:WPA;S:NetworkName;P:Password;;` (special characters `\ ; , : "` are escaped) |

The data-string logic lives in `src/utils/qrHelper.js`.

---

## Tech stack

- **React** (Vite)
- **JavaScript**, HTML, CSS
- **[qr-code-styling](https://github.com/kozakdenys/qr-code-styling)** for QR rendering, styling and export
- **Vercel** for deployment

---

## Getting started

Requirements: Node.js 18 or newer.

```bash
# 1. Clone the repository
git clone https://github.com/shambhavidas76-art/QR-generator.git
cd QR-generator

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Then open the local URL shown in the terminal (usually `http://localhost:5173`).

To create a production build:

```bash
npm run build
npm run preview
```

---

## Project structure

```
src/
├── components/
│   ├── TypeSelector.jsx    # QR type tabs (URL, Text, Email, Phone, Wi-Fi)
│   ├── InputForm.jsx       # Inputs and validation for the selected type
│   ├── QRStylePicker.jsx   # Colors, dot styles, presets and other settings
│   ├── QRPreview.jsx       # Live preview, download and copy actions
│   └── ThemeToggle.jsx     # Dark / Lime theme switch
├── utils/
│   └── qrHelper.js         # Data-string builders, presets and sample data
├── App.jsx                 # App state and layout
├── App.css
└── index.css
```

---

## How it works

1. The user picks a QR type, and `InputForm` shows the fields for it.
2. `qrHelper.js` turns the inputs into the correct QR data string.
3. `App.jsx` keeps the input and style settings in state and passes them to `QRPreview`.
4. `QRPreview` updates a `qr-code-styling` instance whenever anything changes, so the preview is always live.
5. Downloads use the same instance, so the exported PNG or SVG matches what's on screen.

---

## Testing checklist

- [x] Every QR type generates a correct code and scans with a phone camera
- [x] Size, colors, error correction and margin update the preview immediately
- [x] Presets apply and can be modified afterward
- [x] Downloaded PNG matches the preview
- [x] Invalid input shows an error (bad URL, bad email, missing Wi-Fi name)
- [x] Recent QR codes persist after a page refresh
- [x] Layout works on desktop and mobile widths

---

## Deployment

The app is deployed on Vercel. Every push to `main` triggers a new deployment.

- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`

---
