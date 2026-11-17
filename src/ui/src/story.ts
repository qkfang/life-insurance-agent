export type PlaceId = "home" | "office" | "hq" | "clinic";

export interface Person {
  id: string;
  name: string;
  role: string;
  color: string;
  kind: "human" | "agent";
  department?: string;
  job?: string;
  lead?: string;
}

export const places: Record<PlaceId, { name: string; who: string }> = {
  home: { name: "Tan home", who: "Mia and Ben" },
  office: { name: "Advisor office", who: "James Carter, independent financial adviser" },
  hq: { name: "Kestrel Life HQ", who: "The agent team and human leads" },
  clinic: { name: "Doctor's clinic", who: "Ben's doctor" },
};

export const people: Person[] = [
  { id: "mia", name: "Mia", role: "Policyholder", color: "#e8845c", kind: "human" },
  { id: "ben", name: "Ben", role: "Mia's partner", color: "#5c8fe8", kind: "human" },
  { id: "james", name: "James", role: "Financial adviser", color: "#8a6ad9", kind: "human" },
  { id: "lena", name: "Lena Ward", role: "Claims assessor", color: "#3f9e8f", kind: "human" },
  {
    id: "cara", name: "Cara", role: "Agent", kind: "agent", color: "#f2a93b",
    department: "Customer Service",
    job: "Front door for calls and messages; answers questions and gives status in plain words.",
    lead: "Service team leader",
  },
  {
    id: "nora", name: "Nora", role: "Agent", kind: "agent", color: "#e0587a",
    department: "New Business",
    job: "Receives the application, checks identity (KYC/AML) and chases missing forms.",
    lead: "New business manager",
  },
  {
    id: "uma", name: "Uma", role: "Agent", kind: "agent", color: "#7a5ce0",
    department: "Underwriting",
    job: "Assesses health and lifestyle risk; auto-accepts clear cases, refers the rest.",
    lead: "Underwriter",
  },
  {
    id: "polly", name: "Polly", role: "Agent", kind: "agent", color: "#3fb27f",
    department: "Policy Administration",
    job: "Issues the policy, collects premiums, handles changes over time.",
    lead: "Policy admin manager",
  },
  {
    id: "clara", name: "Clara", role: "Agent", kind: "agent", color: "#2fa6d6",
    department: "Claims",
    job: "Opens the claim, requests medical evidence and builds the assessment pack.",
    lead: "Claims assessor, Lena Ward",
  },
  {
    id: "penny", name: "Penny", role: "Agent", kind: "agent", color: "#c9a227",
    department: "Payments",
    job: "Pays approved claims to the right account.",
    lead: "Finance officer",
  },
  {
    id: "cole", name: "Cole", role: "Agent", kind: "agent", color: "#6b7a8f",
    department: "Compliance",
    job: "Checks every action for consent, fairness and rules; keeps the audit log.",
    lead: "Compliance officer",
  },
];

export interface Scene {
  title: string;
  place: PlaceId;
  text: string;
  cast: string[];
  bubble?: string;
  speaker?: string;
  humanCall?: boolean;
  money?: boolean;
}

export const scenes: Scene[] = [
  {
    title: "Home",
    place: "home",
    text: "Mia and Ben live a busy, ordinary life in the city.",
    cast: ["mia", "ben"],
  },
  {
    title: "The trigger",
    place: "home",
    text: "A life moment. Who would cover the family if something happened?",
    cast: ["mia", "ben"],
    bubble: "We're having a baby.",
    speaker: "Mia",
  },
  {
    title: "The call",
    place: "office",
    text: "Mia calls James at the advisor office.",
    cast: ["james"],
    bubble: "Hi James, we need cover.",
    speaker: "Mia (on the phone)",
  },
  {
    title: "The compare",
    place: "office",
    text: "James compares life insurers side by side and recommends Kestrel Life.",
    cast: ["james"],
    bubble: "Kestrel Life fits you best.",
    speaker: "James",
  },
  {
    title: "Apply",
    place: "hq",
    text: "Mia uploads her documents. Nora checks identity. Uma assesses the health answers and accepts. Cole checks each step.",
    cast: ["nora", "uma", "cole"],
  },
  {
    title: "Covered",
    place: "home",
    text: "Polly issues the policy and sets up premiums. Life goes on.",
    cast: ["mia", "ben", "polly"],
  },
  {
    title: "The event",
    place: "clinic",
    text: "Months later, Ben gets bad news from the doctor. They need to claim.",
    cast: ["ben"],
  },
  {
    title: "The claim",
    place: "home",
    text: "Mia sends one message. Cara answers and hands it to Clara.",
    cast: ["mia", "cara", "clara"],
    bubble: "We need to make a claim.",
    speaker: "Mia",
  },
  {
    title: "More documents",
    place: "home",
    text: "Clara asks for a doctor's report. Mia uploads it from her phone.",
    cast: ["mia", "clara"],
    bubble: "Report uploaded.",
    speaker: "Mia",
  },
  {
    title: "The agents work",
    place: "hq",
    text: "Clara checks the policy with Polly, gathers medical evidence and builds the assessment pack. Cole checks each step.",
    cast: ["clara", "polly", "cole"],
  },
  {
    title: "The human call",
    place: "hq",
    text: "Clara sends the pack to Lena, the claims assessor. She reviews it and approves.",
    cast: ["clara", "lena"],
    bubble: "Approved.",
    speaker: "Lena",
    humanCall: true,
  },
  {
    title: "Sorted",
    place: "home",
    text: "Penny pays. Money arrives at home. Cara tells Mia \"Claim paid\" with every step explained.",
    cast: ["mia", "ben", "penny", "cara"],
    bubble: "Claim paid.",
    speaker: "Cara",
    money: true,
  },
  {
    title: "Happy life",
    place: "home",
    text: "Polly checks the family still has the right cover. The family gets back to living.",
    cast: ["mia", "ben", "polly"],
  },
];

export const message = "Agents do the legwork. Humans make the calls that matter. The family just lives.";
