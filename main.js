const supabaseUrl = "https://deogpwfjuqrledlyrnhy.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlb2dwd2ZqdXFybGVkbHlybmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyNzgxMTAsImV4cCI6MjA2ODg1NDExMH0.r64_NWDWS4mV67KrqKVCg0eAwBnRZtoAqb1U2THpK-Y";

const client = supabase.createClient(supabaseUrl, supabaseKey);
const leaderboardContainer = document.getElementById("leaderboard");
const searchInput = document.getElementById("search");

async function loadPlayers() {
  const { data: players } = await client
    .from("players")
    .select("*")
    .order("points", { ascending: false })
    .limit(20);

  displayPlayers(players);
}

function displayPlayers(players) {
  leaderboardContainer.innerHTML = "";
  players.forEach((player, index) => {
    const card = document.createElement("div");
    card.className = "player-card";
    card.innerHTML = `
      <img class="avatar" src="https://minotar.net/avatars/${player.ign}/64" alt="Avatar">
      <h3>#${index + 1} ${player.ign}</h3>
      <p>Region: ${player.region}</p>
      <p>Points: ${player.points}</p>
      <p>Tier: ${player.tier}</p>
    `;
    leaderboardContainer.appendChild(card);
  });
}

searchInput?.addEventListener("input", async (e) => {
  const query = e.target.value.toLowerCase();
  const { data: players } = await client
    .from("players")
    .select("*");

  const filtered = players.filter(player =>
    player.ign.toLowerCase().includes(query)
  );

  displayPlayers(filtered);
});

loadPlayers();
