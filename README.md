# Text to Image Generator

A simple web-based tool that converts text input into downloadable images. Perfect for creating social media quotes, text-based graphics, or simple visual content.

## Features

- **Live Preview**: See your text rendered in real-time as you type
- **Customizable Text**: Add both title and body text
- **High-Quality Output**: Generates high-resolution PNG images
- **Easy Download**: One-click download of generated images
- **Responsive Design**: Works on both desktop and mobile devices

## How to Use

1. Open `index.html` in your web browser
2. Enter your desired title in the "Title" field
3. Add your body text in the "Body Text" area
4. Watch the preview update automatically as you type
5. Click "Generate & Download Image" to save your creation as a PNG file

## Technical Details

- Built with vanilla JavaScript, HTML, and CSS
- Uses `html2canvas` library for image generation
- Generates images at 2x scale for better quality
- Supports line breaks in body text
- Automatically handles text overflow

## Project Structure

- `index.html` - Main HTML structure
- `style.css` - Styling and layout
- `script.js` - JavaScript functionality
- Uses `html2canvas` (v1.4.1) from CDN

## Getting Started

1. Clone this repository
2. Open `index.html` in a web browser
3. No build process or installation required!

## Browser Compatibility

Works in all modern browsers that support:
- ES6 JavaScript
- HTML5 Canvas
- Modern CSS features

## License

This project is open source and available under the MIT License.