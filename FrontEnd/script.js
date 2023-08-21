

document.addEventListener('DOMContentLoaded', function() {
    const downloadButton = document.getElementById('downloadButton');
    const videoUrlInput = document.getElementById('videoUrl');
    const downloadLink = document.getElementById('downloadLink');
    const videoDownloadLink = document.getElementById('videoDownloadLink');

    downloadButton.addEventListener('click', async function() {
        const videoUrl = videoUrlInput.value;
        if (!videoUrl) {
            alert('Please enter a valid video URL');
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:5000/download', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ video_url: videoUrl })
            });

            const data = await response.json();

            if (data.video_path) {
                const videoFilename = data.video_path.split('\\').pop(); // Extract the file name from the path
                const fileSize = data.file_size
                const serverAddress = 'http://127.0.0.1:5000'; // Update with your actual server address
                const videoUrl = `${serverAddress}/${data.video_path.replace(/\\/g, '/')}`;
//                alert(videoFilename);

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

//                        videoDownloadLink.href = link.href;
//                        videoDownloadLink.textContent = 'Your download will start shortly...';
//                        videoDownloadLink.style.display = 'block';
//                        downloadLink.style.display = 'block';


                        document.body.appendChild(link);
                        link.click();
//                        alert("download commence please wait.")

                    }
                };
                xhr.send();
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

//
//    downloadButton.addEventListener('click', async function() {
//        const videoUrl = videoUrlInput.value;
//        if (!videoUrl) {
//            alert('Please enter a valid video URL');
//            return;
//        }
//
//        try {
//            const response = await fetch('http://127.0.0.1:5000/download', {
//                method: 'POST',
//                headers: {
//                    'Content-Type': 'application/json'
//                },
//                body: JSON.stringify({ video_url: videoUrl })
//            });
//
//            const data = await response.json();
////            if (data.video_path) {
////                videoDownloadLink.href = data.video_path;
////                videoDownloadLink.style.display = 'block';
////                videoDownloadLink.click(); // Automatically trigger the download
////            }
//            if (data.video_path) {
//                const videoFilename = data.video_path.split('\\').pop(); // Extract the file name from the path
//                const serverAddress = 'http://127.0.0.1:5000'; // Update with your actual server address
//                const videoUrl = `${serverAddress}/${data.video_path.replace(/\\/g, '/')}`;
//                alert(videoFilename);
//
//                // Construct the URL for the download route on your server
//                var downloadUrl = "http://127.0.0.1:5000/downloader/" + videoFilename;
//
//                const response = await fetch(downloadUrl, {
//                method: 'GET'
//                });
//                alert("OK");
//
//
//                // Create an anchor element to trigger the download
//                var link = document.createElement("a");
//                link.href = downloadUrl;
//                link.download = fname;
//
//                // Programmatically click the anchor element to initiate the download
//                document.body.appendChild(link);
//                link.click();
//                document.body.removeChild(link);
//
//
////                videoDownloadLink.href = videoUrl;
////                videoDownloadLink.setAttribute('download', videoFilename); // Set the file name for the download
////                videoDownloadLink.style.display = 'block';
//                videoDownloadLink.click(); // Automatically trigger the download
//            }else{
//                alert("video_path not found!");
//            }
//        } catch (error) {
//            console.error('Error:', error);
//        }
//    });
//
//

});

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

