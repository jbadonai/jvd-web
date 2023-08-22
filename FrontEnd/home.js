document.addEventListener('DOMContentLoaded', function() {
    const downloadButton = document.getElementById('downloadButton');
    const videoUrlInput = document.getElementById('videoUrl');
    const downloadLink = document.getElementById('downloadLink');
    const videoDownloadLink = document.getElementById('videoDownloadLink');
    const loadingSpinner = document.querySelector('.loading-spinner');
    const topSectionId = document.getElementById('top-section');
    const generalOverlay = document.getElementById('general-overlay');

    downloadButton.addEventListener('click', async function() {
        const videoUrl = videoUrlInput.value;
        if (!videoUrl) {
            alert('Please enter a valid video URL');
            return;
        }

        try {
            // topSection.classList.toggle('collapsed');
            // Show the loading spinner
            loadingSpinner.style.display = 'block';
            topSectionId.disabled=true;

            // disable the top section
            topSectionId.style.pointerEvents = 'none';
            topSectionId.style.opacity = '1';
            generalOverlay.style.display = "flex";

            const response = await fetch('http://127.0.0.1:5000/download', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ video_url: videoUrl })
            });

            const data = await response.json();

            if (data.video_path) {
                downloadButton.disabled = true;
                topSection.classList.toggle('collapsed');
                generalOverlay.style.display = "none";


                const videoFilename = data.video_path.split('\\').pop(); // Extract the file name from the path
                const fileSize = data.file_size
                const serverAddress = 'http://127.0.0.1:5000'; // Update with your actual server address
                const videoUrl = `${serverAddress}/${data.video_path.replace(/\\/g, '/')}`;

                // Construct the URL for the download route on your server
                var downloadUrl = "http://127.0.0.1:5000/downloader/" + videoFilename;

                // Replace 'filename.mp4' with the actual filename you want to download
                var filename = videoFilename;
                var filenameSize = videoFilename + ':::' + fileSize;

                populateSnippet(snippetsContainer, "image-url1.jpg", filename, "Downloading...", 25);

                var xhr = new XMLHttpRequest();
                xhr.open('GET', 'http://127.0.0.1:5000/downloader/' + encodeURIComponent(filenameSize), true);
                xhr.responseType = 'blob'; // Set the response type to blob
                xhr.onload = function() {
                    if (xhr.status === 200) {
                        // Create a download link and trigger a click event
                        var blob = xhr.response;
                        var link = document.createElement('a');
                        link.href = window.URL.createObjectURL(blob);
                        link.download = filename;
                        document.body.appendChild(link);
                        link.click();


                    }
                };
                xhr.send();
                downloadButton.disabled = false;
                loadingSpinner.style.display = 'none';
                // re enable the top section
                topSectionId.style.pointerEvents = 'auto';
                topSectionId.style.opacity = 1;
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });


});

// --------------------------------------
// SNIPPET
// --------------------------------------

// JavaScript function to populate a snippet
function populateSnippet(container, imageUrl, title, description, percentage) {
    const snippet = document.createElement("div");
    snippet.className = "snippet";

    snippet.innerHTML = `
        <div class="left-section">
            <img src="${imageUrl}" alt="Image">
        </div>
        <div class="middle-section">
            <div>
                <h4>${title}</h4>
                <p>${description}</p>
            </div>
        </div>
        <div class="right-section">
            ${percentage}% Done
        </div>
    `;

    container.appendChild(snippet);
}

// Simulate download progress for a snippet
function updateProgress(percentage, snippet) {
    const rightSection = snippet.querySelector(".right-section");
    rightSection.textContent = `${percentage}% Done`;
}


// Example usage
const snippetsContainer = document.getElementById("snippets-container");

//------------------------
//DOWNLOAD MENU BUTTON
//------------------------
 const downloadMenuButton = document.getElementById('download-menu-button');
        const topSection = document.querySelector('.top-section');

        downloadMenuButton.addEventListener('click', () => {
            topSection.classList.toggle('collapsed');
        });



//---------------------------------------------
// LOGIN
//---------------------------------------------
const showLoginBtn = document.getElementById("show-login");
const loginOverlay = document.getElementById("login-overlay");
const closeLoginBtn = document.getElementById("close-login");
const showRegisterFromLoginBtn = document.getElementById("show_register_from_login")

showLoginBtn.addEventListener("click", () => {
    loginOverlay.style.display = "flex"; // Use flex display to center the content
});

closeLoginBtn.addEventListener("click", () => {
    loginOverlay.style.display = "none";
});

showRegisterFromLoginBtn.addEventListener("click", () => {
    loginOverlay.style.display = "none";
    registerOverlay.style.display = "flex";
});

//---------------------------------
// REGISTER
//---------------------------------
const showRegisterBtn = document.getElementById("show-register");
const registerOverlay = document.getElementById("register-overlay");
const closeRegisterBtn = document.getElementById("close-register");
const showLoginFromRegisterBtn = document.getElementById("show-login-from-register");

showRegisterBtn.addEventListener("click", () => {
    registerOverlay.style.display = "flex";
});

closeRegisterBtn.addEventListener("click", () => {
    registerOverlay.style.display = "none";
});

showLoginFromRegisterBtn.addEventListener("click", () => {
    registerOverlay.style.display = "none";
    loginOverlay.style.display = "flex"; // Show the login popup
});


//--------------------------------
//ABOUT
//-----------------------------------

const aboutCloseButton = document.getElementById('close-about');
const aboutUsButton =document.getElementById('about-us');
const aboutUsOverlay = document.getElementById('about-overlay');


aboutUsButton.addEventListener("click", () =>{
    aboutUsOverlay.style.display = 'flex';
});

aboutCloseButton.addEventListener("click", () => {
    aboutUsOverlay.style.display = "none";
});

