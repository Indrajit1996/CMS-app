const app = document.getElementById('app');

function renderHome() {
  app.innerHTML = '<h2>Welcome to the Joke App!</h2>';
}

async function renderJokes() {
  const res = await fetch('/api/jokes');
  const data = await res.json();
  app.innerHTML = '<h2>Jokes</h2>' + data.docs.map(j => `
    <div>
      <h3>${j.title}</h3>
      <p>${j.body}</p>
    </div>
  `).join('');
}

root('/', renderHome);
root('/jokes', renderJokes);