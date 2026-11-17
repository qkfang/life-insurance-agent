import { PlaceId, Person, Scene, people } from "./story";

const W = 800;
const H = 380;
const GROUND = 300;

function Backdrop({ place }: { place: PlaceId }) {
  switch (place) {
    case "home":
      return (
        <g>
          <rect x="250" y="130" width="300" height="170" rx="6" fill="#f6dcc0" />
          <polygon points="230,135 400,50 570,135" fill="#c8704a" />
          <rect x="370" y="210" width="60" height="90" rx="4" fill="#9c5b3b" />
          <rect x="285" y="170" width="55" height="50" rx="4" fill="#bfe3f5" />
          <rect x="460" y="170" width="55" height="50" rx="4" fill="#bfe3f5" />
        </g>
      );
    case "office":
      return (
        <g>
          <rect x="260" y="80" width="280" height="220" rx="6" fill="#d9d4f0" />
          {[0, 1, 2].flatMap((r) =>
            [0, 1, 2, 3].map((c) => (
              <rect key={`${r}${c}`} x={285 + c * 62} y={105 + r * 55} width="40" height="35" rx="3" fill="#f4f2ff" />
            )),
          )}
          <rect x="370" y="250" width="60" height="50" rx="4" fill="#7a68b8" />
        </g>
      );
    case "hq":
      return (
        <g>
          <rect x="230" y="70" width="340" height="230" rx="6" fill="#cfe0ea" />
          <rect x="270" y="30" width="260" height="40" rx="6" fill="#9db8c8" />
          {[0, 1, 2].flatMap((r) =>
            [0, 1, 2, 3, 4].map((c) => (
              <rect key={`${r}${c}`} x={255 + c * 62} y={95 + r * 55} width="40" height="35" rx="3" fill="#eef6fb" />
            )),
          )}
          <rect x="375" y="255" width="50" height="45" rx="4" fill="#6b8a9c" />
        </g>
      );
    case "clinic":
      return (
        <g>
          <rect x="260" y="100" width="280" height="200" rx="6" fill="#e6f2ee" />
          <rect x="385" y="120" width="30" height="80" fill="#e25b5b" />
          <rect x="360" y="145" width="80" height="30" fill="#e25b5b" />
          <rect x="370" y="250" width="60" height="50" rx="4" fill="#7fb5a6" />
        </g>
      );
  }
}

function Human({ p, x }: { p: Person; x: number }) {
  return (
    <g transform={`translate(${x} ${GROUND})`}>
      <ellipse cx="0" cy="4" rx="26" ry="7" fill="#0002" />
      <rect x="-20" y="-70" width="40" height="70" rx="18" fill={p.color} />
      <circle cx="0" cy="-92" r="20" fill="#f3d2b3" />
      <text y="22" textAnchor="middle" className="name">{p.name}</text>
    </g>
  );
}

function Drone({ p, x, index }: { p: Person; x: number; index: number }) {
  return (
    <g transform={`translate(${x} ${GROUND - 120})`}>
      <g className="hover" style={{ animationDelay: `${index * 0.3}s` }}>
        <circle r="38" fill={p.color} opacity="0.22" />
        <rect x="-26" y="-14" width="52" height="28" rx="14" fill={p.color} />
        <rect x="-40" y="-22" width="22" height="5" rx="2" fill={p.color} />
        <rect x="18" y="-22" width="22" height="5" rx="2" fill={p.color} />
        <circle cx="-8" cy="0" r="4" fill="#fff" />
        <circle cx="8" cy="0" r="4" fill="#fff" />
        <text y="42" textAnchor="middle" className="name">{p.name}</text>
      </g>
    </g>
  );
}

export function Stage({ scene }: { scene: Scene }) {
  const cast = scene.cast.map((id) => people.find((p) => p.id === id)!);
  const step = W / (cast.length + 1);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="stage" role="img" aria-label={scene.text}>
      <rect width={W} height={H} fill="#cdeafc" />
      <circle cx="710" cy="70" r="34" fill="#ffe28a" />
      <rect y={GROUND} width={W} height={H - GROUND} fill="#a8d89a" />
      <Backdrop place={scene.place} />
      {cast.map((p, i) =>
        p.kind === "human" ? (
          <Human key={p.id} p={p} x={step * (i + 1)} />
        ) : (
          <Drone key={p.id} p={p} x={step * (i + 1)} index={i} />
        ),
      )}
      {scene.money && (
        <g className="coins">
          {[0, 1, 2, 3].map((i) => (
            <circle key={i} cx={300 + i * 70} cy={120 - (i % 2) * 20} r="11" fill="#f5c542" stroke="#c9a227" strokeWidth="3" />
          ))}
        </g>
      )}
      {scene.humanCall && (
        <text x="400" y="360" textAnchor="middle" className="call">Human call</text>
      )}
    </svg>
  );
}
