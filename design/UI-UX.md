# Living Cover — UI / UX design

Status: design. No code. Companion to [DESIGN.md](DESIGN.md) (§7 demo, §5 autonomy). Fictional people and figures.

## 1. Concept in one line

**A small 3D world where the Tan family lives through life stages, and a visible agent team works
around them, with human leads stepping in at named moments.**

The diorama tells the story; the panels prove it. Both read from one sim clock and one data set.

## 2. Framework decision

**React + React Three Fiber (R3F) + drei**, on Vite + TypeScript.

| Option | Mini figures | Story control | Agent UI (chat, cards, ledger) | Verdict |
| --- | --- | --- | --- | --- |
| **React + R3F + drei** | Low-poly 3D figures with walk / idle / react clips | Camera move per act; scrub-able timeline | React panels overlay the canvas (`<Html>` anchors + DOM) | **Chosen** — strongest "little world" effect, panels stay plain React |
| React + PixiJS | 2D isometric sprites | Good | React | Lighter fallback; flatter |
| React + Rive | Expressive 2D state-machine characters | Good | React | Needs bespoke character art |
| Phaser | Game engine | Strong | UI fights the canvas | Overkill |
| Spline embed | Fast to design | Weak | None | Prototype only |

Axis optimized: story impact per build effort, with the agent UI kept as ordinary, testable React.

### Stack

| Concern | Choice | Why |
| --- | --- | --- |
| App shell | React + Vite + TypeScript | Panels, routing, i18n, tests |
| 3D scene | `@react-three/fiber` | Declarative Three.js inside React |
| Helpers | `@react-three/drei` | `useGLTF`, `useAnimations`, `CameraControls`, `Html`, `ContactShadows`, `Environment`, `Billboard` |
| Act timelines | GSAP timeline | Deterministic, scrub-able beats per act |
| 2D motion | Motion (Framer Motion) | Card, meter and ledger transitions |
| State | Zustand store | One store shared by scene and panels; selectors keep re-renders narrow |
| Figures | Kenney "Mini Characters" / Quaternius animated packs (CC0 glTF) | Free, consistent low-poly style, walk/idle clips included |
| Buildings | Kenney city / furniture kits (CC0) | Same art style as figures |

Asset licences recorded in `assets/LICENSES.md` at build time.

## 3. Screen layout

```text
+----------------------------------------------------------------------------+
| Header: Living Cover · act chips [1 Discover][2 Commit][3 Live][3b Lead][4 Pay] · sim date |
+-------------------------------------------------+--------------------------+
|                                                 |  Lens panel (tabbed)     |
|             3D diorama ("life lane")            |  Client · Advisor ·      |
|   house · hospital · advisor office · insurer HQ|  Insurer · Agent Ops     |
|   figures walk, agent drones fly, gates pause   |  (DESIGN §7 four views)  |
|                                                 |                          |
+-------------------------------------------------+--------------------------+
| Action Ledger strip: agent · action · evidence · level · human lead · time |
+----------------------------------------------------------------------------+
| Timeline scrubber: life events on the sim clock · play / pause / step      |
+----------------------------------------------------------------------------+
```

- Diorama ~65% width; lens panel ~35%. Lens auto-switches to the view that owns the current beat;
  presenter can override.
- Phone-frame Client view floats over the diorama in Acts 1 and 4 (Mia's and Ben's messages).
- Fictional-world notice shown once, dismissible.

## 4. The diorama

### Places (left → right along the life lane)

| Place | Who is there | Used in |
| --- | --- | --- |
| Tan home | Mia, Ben, later the baby | Acts 1, 3, 4 |
| Bank / mortgage office | — (data source, lights up) | Act 3 refinance |
| Hospital / GP clinic | Doctors (non-speaking) | Acts 3 (birth), 4 (diagnosis) |
| Advisor office | Raj Iyer | Acts 1, 3 |
| Kestrel Life HQ | Sam Okafor, Lena Ward, Priya Shah | Acts 2, 3b, 4 |
| Agent hub (floating platform above HQ) | Agent team as drones | All acts |

### Characters

| Kind | Representation | Behaviour |
| --- | --- | --- |
| Humans (client, partner, baby, human leads) | Low-poly mini figures, name tag on hover | Walk between places, idle, react (cheer, worry, wave) |
| Agents (Case Lead + six specialists) | Small glowing drones, one colour + icon each | Fly between places carrying a "packet" for each action |
| Guardian | Translucent dome over the agent hub | Flashes; shows a red shield when it blocks |
| Data sources | Glowing doors on buildings | Light up only when consented and read (Consent Wallet mirror) |

### Visual grammar

| Meaning | Visual |
| --- | --- |
| Agent action (level A) | Drone flies, packet delivered, ledger row slides in |
| Agent proposal (level B) | Drone hovers by a human lead; figure raises hand; scene pauses until approve |
| Human only (level C) | Drone drops a pack on the lead's desk and dims; human figure acts |
| Guardian block | Red shield pulse, drone bounces back, ledger row in red |
| Consent read | Source door glows; Consent Wallet row shows "last used by" |
| Life event | Speech bubble over the figure + timeline pin drops |
| Protection gap | Floating bar over the home: need vs held, closes as cover lands |
| Money moved | Coin arc from HQ to home (Act 4 payout) |

Agent colours and icons are defined once in a theme file and reused in panels and ledger.

## 5. Story beats by act

Dates, people and figures come from [DESIGN.md §7](DESIGN.md#7-demo-one-family-one-timeline); the build reads
them from generated data, never from this table.

| Act | Camera | Diorama beat | Lens panel | Human gate interaction |
| --- | --- | --- | --- | --- |
| 1 Discover | Close on home | Mia says "we're having a baby"; Companion drone glows; Evidence Gatherer opens bank + super doors; gap bar shows large red gap | Client: chat + gap meter + Consent Wallet → Advisor: Needs Planner draft, 3 options | Raj raises hand → presenter clicks **Sign advice** |
| 2 Commit | Pan to HQ | Underwriter drone stamps Mia's card green; Ben's card goes to Sam's desk | Insurer: decision cards, referral queue with reason codes | Sam (level C exclusion) → **Accept with exclusion** |
| 3 Live | Wide, time-lapse | Baby figure appears; bank door glows (refinance); Steward proposes +cover; gap bar re-closes | Client: proposed-change card; Advisor: beneficiary draft; life timeline | Raj approves beneficiary; Mia taps **Accept** |
| 3b Lead | Up to agent hub | Case Lead shows 200/200 agreement chart; autonomy dial turns B → A | Agent Ops: autonomy board with evidence | Priya → **Promote to A** |
| 4 Pay | Hospital → HQ → home | Ben's message; Claims Concierge opens claim; evidence checklist ticks as doctor doors glow; coin arc to home | Client: claim tracker; Insurer: assessment pack | Lena → **Approve payment**; then Steward offers family re-plan |

Each act 60–90 s at play speed. Scene pauses at every human gate until the control is clicked.

## 6. Interaction model

| Control | Effect |
| --- | --- |
| Act chips | Jump to the start of an act (world recomputed from sim time) |
| Play / pause / step | Step = next beat; play runs beats at presenter speed |
| Timeline scrubber | Seek sim time; diorama, panels and ledger all follow |
| Click a figure | Open that person's lens (e.g. Raj → Advisor desk) |
| Click a drone | Agent card: identity, owner, permissions, current autonomy, last 5 ledger rows |
| Click a glowing door | Consent Wallet entry for that source; toggle to revoke and see the agent refuse |
| Approve / override buttons | Human-gate decision; written to the ledger; story continues |
| Ledger row | Highlights the drone and place that produced it |

Try-it moment: revoking a consent before Act 4 makes Evidence Gatherer stop and Guardian show a block,
proving consent is live (DESIGN principle 3).

## 7. One clock, one store

- **Sim clock** (`state/clock.ts`): single source of time. Scene, panels, ledger and timeline read it.
- **World = f(sim time, approvals)**: a pure selector over generated data; seeking replays deterministically.
- **Store** (Zustand): `simTime`, `approvals`, `activeLens`, `selectedEntity`, `consents`.
- **Scene** subscribes via narrow selectors; per-frame motion in `useFrame` reads refs, not React state.
- **GSAP** timelines own choreography only (camera, drone paths); they never own facts.

## 8. Folder sketch

```text
app/
  src/
    scene/        Diorama.tsx, Place.tsx, Figure.tsx, AgentDrone.tsx, GuardianDome.tsx, GapBar.tsx, CameraRig.tsx
    lenses/       ClientPhone/, AdvisorDesk/, InsurerDesk/, AgentOps/
    shared/       ActionLedger.tsx, Timeline.tsx, DecisionCard.tsx, ConsentWallet.tsx, GapMeter.tsx, ClaimTracker.tsx, AutonomyBoard.tsx
    story/        acts.ts (beats → camera + choreography), gates.ts
    state/        clock.ts, store.ts, world.ts
    content/en/   all visible strings
    theme/        tokens, agent colours + icons
  public/models/  glTF figures + buildings (CC0)
data/             generated per DESIGN §8
```

## 9. Look and feel

- Soft, toy-like low-poly; warm daylight; contact shadows; no realism.
- Muted world, saturated agents: agents are the only bright moving things.
- Panels: clean, light, card-based; agent colours repeated as chips.
- Motion: purposeful and short (≤ 600 ms for UI, act-paced for scene); respects `prefers-reduced-motion`
  (scene cuts instead of flies).

## 10. Performance and accessibility

| Concern | Rule |
| --- | --- |
| Frame budget | 60 fps on a presenter laptop; instanced props, baked lighting, ≤ ~30 draw-call groups (target, to be measured) |
| Asset size | Compressed glTF (Draco/Meshopt), total target < 15 MB (to be measured) |
| Fallback | No-WebGL: 2D act cards + panels still tell the full story |
| Keyboard | Space play/pause, ←/→ step, 1–5 act jump; every gate button focusable |
| Screen readers | Each beat emits a live-region caption; ledger is a real table |

## 11. Replay now, Live later

- **Replay** (first): beats and agent outputs are scripted from generated data; presenter drives.
- **Live** (later): same scene and panels; agent actions arrive from Foundry-hosted agents over an event
  stream; drones animate from incoming ledger events instead of the script. Decision tracked in
  [DESIGN.md §11](DESIGN.md#11-open-decision).

## 12. Open questions

- Single page with lens tabs vs split screen per view on a second monitor.
- Voice for Companion (TTS) in Act 1 and 4, or text only.
- Exact character pack (Kenney vs Quaternius) after a style test.
