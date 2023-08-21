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
                <h3>${title}</h3>
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

// Populate snippets dynamically
//populateSnippet(snippetsContainer, "image-url1.jpg", "Title 1", "Description 1", 25);
//populateSnippet(snippetsContainer, "image-url2.jpg", "Title 2", "Description 2", 50);

// Simulate download progress for snippet 1
const snippet1 = snippetsContainer.querySelector(".snippet:nth-child(1)");
let progress1 = 0;
const progressInterval1 = setInterval(() => {
    progress1 += 10;
    if (progress1 > 100) {
        clearInterval(progressInterval1);
    } else {
        updateProgress(progress1, snippet1);
    }
}, 1000);

// Simulate download progress for snippet 2
const snippet2 = snippetsContainer.querySelector(".snippet:nth-child(2)");
let progress2 = 0;
const progressInterval2 = setInterval(() => {
    progress2 += 5;
    if (progress2 > 100) {
        clearInterval(progressInterval2);
    } else {
        updateProgress(progress2, snippet2);
    }
}, 500);
