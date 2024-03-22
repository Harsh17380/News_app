const apiKey = 'da9267af14bc41849db48d573d21784f';
const container = document.getElementById("container");
const searchF = document.getElementById("search")
const btn = document.getElementById("search-btn")

async function RandomNews() {
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${apiKey}`;
        const res = await fetch(apiUrl);
        const data = await res.json();
        return data.articles;
    } catch (err) {
        console.log("Error fetching random news", err);
        return [];
    }
}

async function fetchNewsQuery(query) {
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apiKey}`;
        const res = await fetch(apiUrl);
        const data = await res.json();
        return data.articles;
    } catch (err) {
        console.log("Error fetching random news", err);
        return [];
    }
}

btn.addEventListener("click", async () => {
    const query = searchF.value.trim()
    if (query !== "") {
        try {
            const articles = await fetchNewsQuery(query);
            display(articles)
        } catch (e) {
            console.log("Error fetching random news", e);
        }
    }
})

function display(articles) {
    container.innerHTML = "";
    articles.forEach((article) => {
        const bCard = document.createElement("div");
        bCard.classList.add("card");

        const img = document.createElement("img");
        img.src = article.urlToImage;
        img.alt = article.title;

        const title = document.createElement("h2");
        const truncatedTitle = article.title.length > 30 ? article.title.slice(0, 30) + "..." : article.title;
        title.textContent = truncatedTitle;

        const desc = document.createElement("p");
        const truncatedDesc = article.description ? (article.description.length > 60 ? article.description.slice(0, 60) + "..." : article.description) : "No description available";
        desc.textContent = truncatedDesc;

        bCard.appendChild(img);
        bCard.appendChild(title);
        bCard.appendChild(desc);
        container.appendChild(bCard);

        bCard.addEventListener('click', () => {
            window.open(article.url, "_blank");
        });
    });
}

(async () => {
    try {
        const articles = await RandomNews();
        display(articles);
    } catch (e) {
        console.log("Error fetching random news", e);
    }
})();