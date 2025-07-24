
const supabaseUrl = "https://your-project.supabase.co";
const supabaseKey = "your-anon-key";
const BOT_ID = "1392227323109183498";

const supabase = supabase.createClient(supabaseUrl, supabaseKey);

document.addEventListener("DOMContentLoaded", async () => {
  const leaderboardEl = document.getElementById("leaderboard") || document.getElementById("tier-list");
  const searchInput = document.getElementById("searchInput");
  const mode = leaderboardEl?.dataset.mode || null;

  async function fetchData() {
    const { data, error } = await supabase.from("tiers").select("*")
    if (error) return console.error(error);

    const players = data.filter(p => !mode || p.tiers[mode]);

    const sorted = players.sort((a, b) => b.points - a.points).slice(0, 20);

    leaderboardEl.innerHTML = "";
    sorted.forEach((player, index) => {
      leaderboardEl.innerHTML += `
        <div class="player-card">
          <img src="${player.character_url}" width="32" />
          <div><strong>${index + 1}. ${player.ign}</strong><br>Region: ${player.region} | Points: ${player.points}</div>
        </div>`;
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", async e => {
      const q = e.target.value.toLowerCase();
      const { data, error } = await supabase.from("tiers").select("*")
      if (error) return;

      const filtered = data.filter(p => p.ign.toLowerCase().includes(q));

      leaderboardEl.innerHTML = "";
      filtered.forEach(player => {
        leaderboardEl.innerHTML += `
          <div class="player-card">
            <img src="${player.character_url}" width="32" />
            <div><strong>${player.ign}</strong><br>Region: ${player.region} | Points: ${player.points}</div>
          </div>`;
      });
    });
  }

  fetchData();
});
