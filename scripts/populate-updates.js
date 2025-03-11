window.addEventListener('load', () => {
    const scriptTag = document.querySelector('script[src="../scripts/populate-updates.js"]');
    const jsonFilePath = scriptTag.getAttribute('data-url');
  
    loadData(jsonFilePath);
});

function loadData(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("updates");

            data.forEach(item => {
            const div = document.createElement("div");
            div.classList.add("update");

            const date = new Date(item.publish_date * 1000).toLocaleDateString(); // Convert timestamp to a readable date

            div.innerHTML = `
                <div class="update">
                    <div class="update-circle"></div>
                    <div class="update-text">
                        <div class="update-text-header">
                            <h3>${item.title}</h3>
                            <p>${convertDate(item.publish_date)}<p>
                        </div>
                        <p>${item.description}</p>
                        <img src=${item.image} class="update-image">
                        <p>Source: <a href=${item.source_link}>${item.source_name}</a></p>
                    </div>
                </div>
            `;

            container.appendChild(div);
            });
        })
}

function convertDate(epochTimestamp) {
    const date = new Date(epochTimestamp * 1000);

    const dateString = date.toLocaleTimeString("en-US", {
        year: "numeric",
        month: "short", // "short" gives you the abbreviated month (e.g., Jan, Feb, Mar)
        day: "2-digit",
    });
    return dateString
}