# Reference: the agentic life insurer — operating model

## 1. Agentic operating model

Six layers. People set direction and make judgement calls. Agents run the work end to end across value
streams, reaching the legacy estate through governed APIs and one shared data layer.

| Layer | Name | Contents |
| --- | --- | --- |
| 1 | Experiences — every channel, one brain | Customers (app, web, voice); advisers & brokers; super fund partners; AI-native contact centre; employees in Microsoft 365 Copilot |
| 2 | Humans as agent leaders — judgement, empathy, accountability | Underwriters approve complex risk; claims assessors make sensitive decisions; case managers support vulnerable customers; actuaries & risk own the models; agent ops team runs the agent workforce |
| 3 | Agent workforce — orchestrated by value stream | Eight agents, below |
| 4 | Knowledge & data — one governed source of truth | Unified policy & customer data (Microsoft Fabric / OneLake); product rules & PDS knowledge; Work IQ · Fabric IQ · Foundry IQ; actuarial & experience data |
| 5 | Integration & legacy access — expose the 13 PAS as tools | APIs & MCP tools over each PAS; agents extract data and transactions from legacy screens and documents; event streaming; retire systems as books consolidate |
| 6 | Trust & governance — built in, not bolted on | Agent identity (Entra Agent ID); agent registry & controls (Agent 365); Purview data protection; Defender & Sentinel; CPS 230 · CPS 234 · APRA AI expectations; full audit trail of every agent action |

### Agent workforce

| Stream | Agent | What it does | Where people stay in charge | Expected shift (indicative) |
| --- | --- | --- | --- | --- |
| Distribution | Advice & quote | Needs analysis with customer or adviser; quotes across products and heritage books; pre-fills applications, explains PDS in plain language | Advisers handle complex advice and the relationship | Time to quote: minutes, not days. Adviser admin: much lower. Direct (B2C) reach: new channel |
| New business | Underwriting evidence | Extracts conditions from GP reports and PDFs; applies the underwriting manual consistently across books; requests missing evidence automatically | Underwriters approve complex and borderline risks | Straight-through acceptance: much higher. Evidence chasing: automated. Decision consistency: every case |
| Onboarding | Onboarding & KYC | Verifies identity, runs AML screening; issues policy documents and welcome journeys; sets up premiums and payment methods | Financial crime team reviews flagged cases | Issue time: same day. Manual checks: exceptions only. Errors at issue: fewer |
| Servicing | Policy servicing | Address, beneficiary and cover changes from any channel; transacts in legacy PAS through governed tools; confirms with customer, updates CRM | Service leads handle escalations and vulnerable customers | Long-tail transactions: automated. BPO queue time: eliminated. First-contact resolution: higher |
| Service | Contact centre | Answers policy, claims and payment questions 24/7; hands over to people with full context; spots vulnerability and complaint signals | Customer specialists handle empathy-heavy moments | Calls contained: a large share. Average handle time: lower. Repeat contacts: fewer |
| Claims | Claims triage & assessment | Guides lodgement and collects evidence; builds assessment pack and policy-term analysis; recommends next steps, rehab support and payment | Assessors decide on sensitive and material claims | Time to decision: days, not weeks. Assessor admin: much lower. Claimant updates: proactive |
| Retirement | Retirement guidance | Models retirement income scenarios; explains annuity and account-based options; refers to a qualified adviser when advice is needed | Licensed advisers provide personal advice | Guidance coverage: all members. Cost per interaction: very low. Product uptake: higher |
| Risk & finance | Compliance & finance | Classifies complaints, tracks IDR timeframes; reconciles reinsurance, supports AASB 17; assembles CPS 230 / 234 control evidence continuously | Risk, finance and actuarial own sign-off | Control testing: every case. Close cycle: faster. Regulatory evidence: always ready |

Autonomy is set per decision type and reviewed by the agent ops team.

### Design principles

1. **Automate the long tail.** Agents handle thousands of low-volume transaction types without a separate workflow for each.
2. **Wrap legacy systems, then retire them.** Expose PAS as governed tools now; consolidate books behind the agents without disrupting customers.
3. **Humans own the judgement.** Clear autonomy levels per decision. Agents recommend and prepare; people approve anything material, sensitive or new.
4. **Customer service at the centre.** The contact centre becomes the hub where voice, digital and agent channels share one memory of the customer.
5. **Get more from what you already own.** Build on existing Microsoft 365, CRM and Azure investment instead of new silos.
6. **Governed by design.** Every agent has an identity, an owner, permissions and an audit trail mapped to APRA requirements.

## 2. An income-protection claim, agentic

Steps and timings are illustrative, not measured.
Step type: **H** = human work, **A** = agent work.

| # | Type | Step | Who | Time |
| --- | --- | --- | --- | --- |
| 1 | A | Customer lodges claim in a conversation (voice, app or adviser); policy and cover confirmed instantly | Claims intake agent | Minutes |
| 2 | A | Consent captured; GP, employer and income evidence requested electronically and tracked | Evidence agent | Same day |
| 3 | A | Evidence read, conditions extracted and matched to policy terms across the heritage book | Assessment agent | Hours |
| 4 | H | Assessor reviews prepared assessment pack and decides | Claims assessor | Same day |
| 5 | A | Payment set up and reconciled; rehab plan recommended | Payments agent | Same day |
| 6 | A | Proactive status updates; real-time answers at any hour | Contact centre agent | Continuous |
| 7 | A | Every step logged; complaint signals and CPS 230 controls checked automatically | Compliance agent | Continuous |

Summary: elapsed days, driven by evidence · handoffs 1 (to the human decision-maker) · systems touched by people 1 · assessor time on judgement and care.

## 3. Getting there

Three phases; not strictly linear; value streams move at different speeds.

| Phase | Name | Theme | Moves | Agent autonomy |
| --- | --- | --- | --- | --- |
| 1 | Human with assistant | Every employee gets an AI assistant | Copilot for every underwriter, assessor and service agent; contact-centre agent assist and call summaries; unified data foundation on Fabric; agent governance baseline (identity, Purview, Agent 365) | Low |
| 2 | Human–agent teams | Agents join teams as digital colleagues | Claims intake, underwriting evidence and servicing agents in production; PAS exposed as API and MCP tools; long-tail change requests automated; BPO scope reduced | Medium |
| 3 | Human-led, agent-operated | People direct agents that run whole processes | Straight-through underwriting and claims for simple cases; AI-native retirement guidance and direct (B2C) offering; PAS consolidated and retired; lowest cost to serve in the market | High, with human oversight |

### First 90 days

1. **Choose two value streams.** Claims intake and servicing change requests, where the long tail is largest.
2. **Wrap one PAS.** Prove agents can read and transact against legacy safely.
3. **Stand up agent governance.** Identity, autonomy levels, audit trail, mapping to CPS 230.
4. **Measure value.** Cost per transaction, cycle time, NPS, BPO hours released.
