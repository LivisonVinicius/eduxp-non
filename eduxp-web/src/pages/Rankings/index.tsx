import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { api } from "../../services/api";
import "./ranking.css";

type RankingUser = {
  id: string;
  name: string;
  score: number;
};

export default function Rankings() {
  const [ranking, setRanking] = useState<RankingUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRanking() {
      try {
        const res = await api.get("/ranking");
        setRanking(res.data);
      } catch (err) {
        console.error("Failed to load ranking", err);
      } finally {
        setLoading(false);
      }
    }

    loadRanking();
  }, []);

  return (
    <>
      <Header />

      <div className="rankings-page">
        <h1>🏆 Rankings</h1>

        {loading && <p>Loading ranking...</p>}

        {!loading && ranking.length === 0 && <p>No ranking data available.</p>}

        <div className="ranking-list">
          {ranking.map((user, index) => (
            <div
              className="ranking-item"
              key={user.id}
            >
              <span className="ranking-position">{index + 1}</span>

              <span className="ranking-name">{user.name}</span>

              <span className="ranking-score">{user.score} XP</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
