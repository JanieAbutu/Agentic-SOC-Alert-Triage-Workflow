# Agentic SOC Alert Triage Workflow

## What This Does
Simulates an agentic SOC pipeline that automatically triages 
security alerts without human intervention:

1. Receives alert from SIEM via webhook
2. Enriches destination IP with VirusTotal threat intelligence
3. Passes enriched alert to local LLM (Ollama/llama3.2) for 
   severity classification and triage recommendation
4. Outputs structured triage decision to audit log

## Architecture

## 🖼️ Architecture Screenshot

![SOC Pipeline](/Screenshots/1_Full_executed_workflow.png)

Webhook → VirusTotal Enrichment → Severity Engine → LLM Analysis (Ollama) → Orchestrator → PostgreSQL Audit Log

---

## Workflow Components

### Alert Trigger (Webhook)
Receives incoming security alert data from a SIEM system.

---

### Severity Engine
The severity engine assigns a risk level (low, medium, or high) and a response action based on VirusTotal threat intelligence scores.

---

### VirusTotal Enrichment
Queries the VirusTotal API to check the reputation of the destination IP.

---

### LLM Analysis (Ollama)
Sends enriched alert data to a local LLM (llama3.2) to generate:

- Security summary  
- Suggested investigation context  

---

### Triage Orchestrator
Combines all outputs into a structured incident report.

---

### Audit Log (PostgreSQL)
Stores all triage decisions for auditing and historical analysis.

## Why On-Premise LLM
This project uses Ollama to run the AI model locally instead of a cloud API.

This reflects real SOC environments where:
- Sensitive security data must remain internal  
- Cloud exposure is avoided for compliance and security reasons  

---

## Tools
- n8n (workflow automation)
- Ollama + llama3.2 (local LLM)
- VirusTotal API (threat intelligence)
- PostgreSQL (audit logging)
- Docker (containerised deployment)

## Sample Output
See `screenshots/` folder for example results.

## How to Run
1. Install Docker and Ollama  
2. Run n8n using Docker  
3. Pull the `llama3.2` model via Ollama  
4. Import workflow from `/workflow/`  
5. Add your VirusTotal API key in the HTTP Request node  
6. Trigger a test alert using the provided curl command  or use alert generator

## Impact

This project demonstrates how modern Security Operations can be automated using a combination of workflow orchestration, threat intelligence, and AI.

- It reduces manual SOC workload by automatically triaging incoming alerts, enriching them with external threat data, and generating structured incident reports in real time.

- The system improves response speed, consistency, and auditability by ensuring every alert is processed using the same deterministic logic and logged for future investigation.

- It also shows how local AI models can be safely integrated into security workflows without exposing sensitive data to external cloud services.