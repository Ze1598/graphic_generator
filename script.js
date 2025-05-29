// Get references to HTML elements
const titleInput = document.getElementById('title-input');
const bodyInput = document.getElementById('body-input');
const generateBtn = document.getElementById('generate-btn');
const imagePreviewDiv = document.getElementById('image-preview-outer');
const previewTitle = document.getElementById('preview-title');
const previewBody = document.getElementById('preview-body');

// --- Function to update the preview area ---
function updatePreview() {
    // Update title, use placeholder if empty
    const titleText = titleInput.value.trim();
    // Parse title as markdown
    previewTitle.innerHTML = titleText ? marked.parse(titleText) : "Your Title Here"; // Default text

    // Update body text, parse markdown, use placeholder if empty
    const bodyText = bodyInput.value.trim();
    // Use marked to parse markdown to HTML
    previewBody.innerHTML = bodyText ? marked.parse(bodyText) : "Your body text will appear here. <br>Enter text above to see it update."; // Default text
}

// --- Function to generate and download the image ---
function generateImage() {
    console.log("Generating image..."); // Log start

    // Determine optimal scale based on device width
    // Use higher scale for smaller screens to ensure text remains readable
    const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const optimalScale = viewportWidth < 768 ? 3 : 2; // Higher scale on mobile
    
    // Options for html2canvas (optional, but can improve quality)
    const options = {
        scale: optimalScale, // Dynamic scale based on device
        useCORS: true, // If you were loading external images/fonts
        backgroundColor: '#ffffff', // Ensure white background
        logging: true, // Show logs from html2canvas for debugging
        allowTaint: true, // Allow cross-origin images
        foreignObjectRendering: true // Better handling of CSS
    };

    html2canvas(imagePreviewDiv, options).then(canvas => {
        console.log("Canvas created successfully"); // Log success

        // Convert canvas to image data URL (PNG format)
        const imageDataUrl = canvas.toDataURL('image/png');

        // Create a temporary link element for download
        const downloadLink = document.createElement('a');
        downloadLink.href = imageDataUrl;
        
        // Create filename with date and viewport size info
        const date = new Date();
        const dateStr = date.toISOString().split('T')[0]; // YYYY-MM-DD format
        const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        const viewportHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
        
        // Set the filename with date and viewport info
        downloadLink.download = `markdown-image-${dateStr}-${viewportWidth}x${viewportHeight}.png`;

        // Trigger the download
        document.body.appendChild(downloadLink); // Required for Firefox
        downloadLink.click();
        document.body.removeChild(downloadLink); // Clean up the link

        console.log("Download initiated"); // Log download

    }).catch(error => {
        console.error("Error generating image with html2canvas:", error);
        alert("Sorry, there was an error generating the image."); // Inform user
    });
}

// --- Event Listeners ---

// Update preview dynamically as user types in title or body
titleInput.addEventListener('input', updatePreview);
bodyInput.addEventListener('input', updatePreview);

// Generate image when the button is clicked
generateBtn.addEventListener('click', generateImage);

// --- Initial Setup ---
// Call updatePreview once on load to set initial placeholder text correctly
updatePreview();