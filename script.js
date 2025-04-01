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
    previewTitle.textContent = titleText || "Your Title Here"; // Default text

    // Update body text, handle line breaks, use placeholder if empty
    const bodyText = bodyInput.value.trim();
    // Replace newline characters with <br> tags for HTML rendering if needed,
    // but 'white-space: pre-wrap;' in CSS handles this better for textContent.
    previewBody.textContent = bodyText || "Your body text will appear here. \nEnter text above to see it update."; // Default text
}

// --- Function to generate and download the image ---
function generateImage() {
    console.log("Generating image..."); // Log start

    // Options for html2canvas (optional, but can improve quality)
    const options = {
        scale: 2, // Increase scale for higher resolution
        useCORS: true, // If you were loading external images/fonts
        backgroundColor: '#ffffff', // Ensure white background
        logging: true // Show logs from html2canvas for debugging
    };

    html2canvas(imagePreviewDiv, options).then(canvas => {
        console.log("Canvas created successfully"); // Log success

        // Convert canvas to image data URL (PNG format)
        const imageDataUrl = canvas.toDataURL('image/png');

        // Create a temporary link element for download
        const downloadLink = document.createElement('a');
        downloadLink.href = imageDataUrl;
        downloadLink.download = 'generated-image.png'; // Set the filename for download

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