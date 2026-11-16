# Agent build process

Derived from the commit history (Oct–Nov 2026). Each phase lists inputs, steps and outputs. Use synthetic data only.

| Phase | Output location |
| --- | --- |
| 01-design | `docs/` |
| 02-plan | `docs/`, `schema/` |
| 03-infra | `bicep/` |
| 04-data-integration | `setup/`, `schema/`, `src/app_*`, `src/func_*`, `src/logic`, `src/apim` |
| 05-agent | `src/agent_*` |
| 06-app | `src/app_web_ui` |
| 07-deploy | `.github/workflows/` |
| 08-test-eval | `tests/`, `setup/eval/`, `.github/agents/` |
| 09-iterate | all of the above |

## 01-design

Goal: agree what the agent does and does not do.

- Inputs: business problem, users, process pain points.
- Steps: write business requirements, architecture requirements and PoC scope as markdown.
- Capture: objective, in/out of scope, success criteria, open decisions, quality baseline (e.g. 85% quality, escalate below 75% confidence).
- Output: `business-requirements.md`, `architecture-requirements.md`, `poc-scope.md`.

## 02-plan

Goal: turn the design into concrete, buildable decisions.

- Inputs: 01 docs.
- Steps: choose intents, extraction profiles and example counts; define scenario/event rule cards; define data contracts; list Azure resources; fix naming convention and repo layout.
- Capture: intent taxonomy, per-intent fields, human-approval points, identifiers (`intakeId`, `caseId`, `claimNumber`), resource list.
- Output: `azure-res.md`, JSON schemas and samples in `schema/`, README structure table.

## 03-infra

Goal: reproducible Azure environment.

- Inputs: resource list and naming convention.
- Steps: one Bicep module per resource (Foundry/AI services, AI Search, Cosmos DB, Storage, Service Bus, Key Vault, APIM, Function/Web/Logic apps, monitoring, optional Fabric capacity); `main.bicep` plus per-env `.bicepparam`; `deploy.ps1`.
- Capture: RBAC for app and Foundry project identities (for example Azure AI User), project admin principals, policy workarounds (`SecurityControl=Ignore` tag, public access on Search and Storage).
- Output: `bicep/`, deployed resource group.

## 04-data-integration

Goal: everything the agent calls exists and works.

- Inputs: deployed infra, schemas.
- Steps:
  - Database schema and migrations (Cosmos `ClaimWorkstate`), seed with mock data.
  - AI Search index and knowledge source from mock policy documents.
  - Mock claims, legacy claims and document apps; Workstate API.
  - MCP server and APIM routing; Entra app registration for MCP auth.
  - Intake pipeline: Logic App, Service Bus topics, workflow workers.
- Capture: API contracts, auth method, endpoint settings per environment.
- Output: `setup/`, `src/app_*`, `src/func_*`, `src/logic`, `src/apim`.

## 05-agent

Goal: the hosted Foundry agent.

- Inputs: intents, extraction profiles, tools and APIs from 04, model deployment name.
- Steps:
  - Build the orchestrator agent (Agent Framework, Responses protocol).
  - Add sub agents per step (document extraction, business context, intent classification, extraction, quality assessment).
  - Add tools (workstate, integration/MCP, documents, approval) and skills.
  - Put rules and instructions in files (intent rule cards, extraction profiles) rather than code.
  - Add human-in-the-loop approval and progress reporting.
  - Package with `agent.yaml`, `agent.manifest.yaml`, Dockerfile, `.env.template`.
- Capture: model, instructions, tool list, env variables, expected input/output schema.
- Output: `src/agent_*`.

## 06-app

Goal: human review surface.

- Inputs: workstate schema, agent outputs.
- Steps: build review UI (scenarios, workstate list, case detail, agree/disagree, feedback, retry); add sign-in gate; show agent results and evidence.
- Output: `src/app_web_ui`.

## 07-deploy

Goal: repeatable deployment of every component.

- Steps: one numbered GitHub Actions workflow per component (infra 1x, APIM 2x, functions/logic 3x, web 4x, agents 5x); environment defaults to `dev`; retry transient deploy failures.
- Capture: secrets and variables per environment (names only), deploy order.
- Output: `.github/workflows/`.

## 08-test-eval

Goal: prove it works and measure it.

- Inputs: scenario emails and attachments (`src/app_web_ui/Scenarios`), expected results.
- Steps: run scenarios end to end via the intake endpoint; compare to `tests/scenario-expected-results.md`; build evaluation dataset; run evaluation; record quality and running cost; use tester agents in `.github/agents/` for repeatable runs.
- Capture: pass/fail per scenario, evaluator scores, logs and traces for failures.
- Output: `tests/`, `setup/eval/`.

## 09-iterate

Goal: improve from results.

- Steps: fix failing scenarios by updating rule cards, mock data or instructions; version the agent when behaviour changes (v1, v2); add new data sources (for example payment history via Fabric data agent) and reporting (Fabric lakehouse, semantic model, dashboard); re-run 08.
- Output: updated agents, docs and dashboards.
