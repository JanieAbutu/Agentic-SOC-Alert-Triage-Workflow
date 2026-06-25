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

![SOC Pipeline](screenshots/1_Full_executed_workflow.png)

Webhook → VirusTotal Enrichment → LLM Analysis (Ollama) → 
Triage Decision → Google Sheets Audit Log

## Why On-Premise LLM
Uses Ollama to run the LLM locally rather than sending 
alert data to a cloud API — reflecting real SOC constraints 
around data sensitivity and security telemetry confidentiality.

## Tools
- n8n (workflow automation)
- Ollama + llama3.2 (local LLM)
- VirusTotal API (threat intelligence)
- Docker (containerised deployment)

## Sample Output
Seen under screenshots

## How to Run
1. Install Docker and Ollama
2. Run n8n via Docker (see commands below)
3. Pull llama3.2 via Ollama
4. Import workflow JSON from /workflow/
5. Add your VirusTotal API key to the HTTP Request node
6. Send a test alert via curl (see sample_alerts/)