window.onload = () => {
    fetchPosts();
};

async function fetchPosts() {
    try {
        const response = await fetch('/api/posts');
        const posts = await response.json();
        
        const container = document.getElementById('postsContainer');
        container.innerHTML = '';

        if(posts.length === 0) {
            container.innerHTML = '<h3 style="color: white; text-align: center; width: 100%;">कहानियाँ लोड हो रही हैं... कृपया पेज रिफ्रेश करें।</h3>';
            return;
        }

        posts.forEach(post => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <span class="tag">${post.category}</span>
                <h3 class="story-title">${post.title}</h3>
                <p class="story-excerpt">${post.content}</p>
                <button class="btn btn-theme">पूरी कहानी पढ़ें</button>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
}