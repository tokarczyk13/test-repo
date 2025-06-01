const fetchArticles = async () => {
  try {
    const response = await fetch(
      'https://iefkmmhmlgfcozwqotgd.supabase.co/rest/v1/article?select=*', {
        headers: {
          apiKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImllZmttbWhtbGdmY296d3FvdGdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2NjAwNzMsImV4cCI6MjA2MzIzNjA3M30.UlnF7cWyDi35FnRcIg_FDCWDbtuO4oZ4ExJbr8QtJVo',
        },
      });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

fetchArticles().then((articles) => {
  const container = document.createElement('div');

  articles.forEach((article) => {
    const articleElement = document.createElement('div');

    articleElement.innerHTML = `
      <h2>${article.title}</h2>
      <h4>${article.subtitle}</h4>
      <p>Autor: ${article.author}</p>
      <p>Data: ${new Date(article.created_at).toLocaleDateString('pl-PL')}</p>
      <p>${article.content}</p>
      <hr>
    `;

    container.appendChild(articleElement);
  });

  document.getElementById('articles-container').appendChild(container);
});

document.getElementById('article-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const f = e.target;
  const article = {
    title: f.title.value,
    subtitle: f.subtitle.value,
    author: f.author.value,
    content: f.content.value,
    created_at: new Date().toISOString()
  };

  await fetch('https://iefkmmhmlgfcozwqotgd.supabase.co/rest/v1/article', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apiKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImllZmttbWhtbGdmY296d3FvdGdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2NjAwNzMsImV4cCI6MjA2MzIzNjA3M30.UlnF7cWyDi35FnRcIg_FDCWDbtuO4oZ4ExJbr8QtJVo'
    },
    body: JSON.stringify(article)
  });

  f.reset();
});
