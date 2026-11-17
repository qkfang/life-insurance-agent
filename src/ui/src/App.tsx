import { people, places, scenes, message, type PlaceId } from "./story";
import { Stage } from "./Stage";
import { useEffect, useState } from "react";

const agents = people.filter((p) => p.kind === "agent");
const placeOrder: PlaceId[] = ["home", "office", "hq", "clinic"];

export function App() {
  const [i, setI] = useState(0);
  const scene = scenes[i];
  const last = i === scenes.length - 1;
  const go = (n: number) => setI(Math.max(0, Math.min(scenes.length - 1, n)));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") go(i + 1);
      if (e.key === "ArrowLeft") go(i - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [i]);

  return (
    <div className="app">
      <header>
        <h1>Living Cover</h1>
        <span>One family, one city, one claim</span>
      </header>

      <nav className="map" aria-label="Places">
        {placeOrder.map((id) => (
          <div key={id} className={`place ${scene.place === id ? "active" : ""}`}>
            <strong>{places[id].name}</strong>
            <small>{places[id].who}</small>
          </div>
        ))}
      </nav>

      <main>
        <div className="frame">
          <Stage scene={scene} />
          {scene.bubble && (
            <div className="bubble">
              <small>{scene.speaker}</small>
              “{scene.bubble}”
            </div>
          )}
        </div>
        <section className="caption" aria-live="polite">
          <span className="count">Scene {i + 1} of {scenes.length}</span>
          <h2>{scene.title}</h2>
          <p>{scene.text}</p>
          {last && <p className="message">{message}</p>}
        </section>
      </main>

      <section className="team" aria-label="Agent team">
        {agents.map((a) => (
          <article
            key={a.id}
            className={`agent ${scene.cast.includes(a.id) ? "on" : ""}`}
            style={{ borderColor: a.color }}
          >
            <h3 style={{ background: a.color }}>{a.name}</h3>
            <b>{a.department}</b>
            <p>{a.job}</p>
            <small>Human lead: {a.lead}</small>
          </article>
        ))}
      </section>

      <footer>
        <button onClick={() => go(i - 1)} disabled={i === 0}>← Back</button>
        <div className="dots">
          {scenes.map((s, n) => (
            <button
              key={s.title}
              className={n === i ? "dot on" : "dot"}
              onClick={() => go(n)}
              aria-label={`Scene ${n + 1}: ${s.title}`}
            />
          ))}
        </div>
        <button onClick={() => go(i + 1)} disabled={last}>Next →</button>
      </footer>
    </div>
  );
}
