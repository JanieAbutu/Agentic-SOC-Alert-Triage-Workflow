# SOC Automation Pipeline (n8n + VirusTotal + Ollama + PostgreSQL)

## Overview

This project implements a lightweight SOC (Security Operations Center) automation pipeline using **n8n**. It simulates a SOAR-style workflow that ingests security alerts, enriches them with threat intelligence, applies rule-based decisioning, uses AI for analysis, and stores structured incident data for auditing.

---

## Architecture

```text
Alert Generator (Python / Webhook)
        ↓
n8n Webhook Trigger
        ↓
VirusTotal Enrichment (HTTP Request)
        ↓
Rule-Based Risk Engine (Code Node)
        ↓
AI Analysis (Ollama LLM)
        ↓
Data Merge & Formatting (Code Node)
        ↓
PostgreSQL Storage

##  Workflow Components

### 1. Alert Ingestion

Security alerts are generated using a Python script and sent to an n8n webhook endpoint.

Each alert contains:

- Alert ID  
- Source IP  
- Destination IP  
- Process name  
- Timestamp  
- Basic severity hint  

---

### 2. Threat Intelligence Enrichment (VirusTotal)

The destination IP or domain is analyzed using the VirusTotal API.

This step enriches the alert with:

- Malicious detection count  
- Suspicious detection count  
- Reputation signals from security vendors  

---

### 3. Rule-Based Risk Engine

A JavaScript Code node evaluates enrichment data and assigns deterministic risk values:

- Severity: `low`, `medium`, `high`  
- Action: `close`, `investigate`, `escalate`  
- Confidence score based on threat level  

Example logic:

```text id="fixmd2"
if malicious >= 15 → HIGH → ESCALATE
if malicious >= 5  → MEDIUM → INVESTIGATE
else               → LOW → CLOSE

## 4. AI Analysis (Ollama)

The LLM is used strictly for contextual analysis, not decision-making.

It generates:

- Concise SOC analyst summary  
- Relevant MITRE ATT&CK technique mappings  

>  Severity and action are NOT determined by the model (rule-based only).

---

## 5. Data Aggregation Layer

A final Code node merges:

- Raw alert data  
- VirusTotal enrichment  
- Rule-based decisions  
- AI-generated insights  

into a single structured SOC incident object.

---

## 6. Storage Layer (PostgreSQL)

All processed incidents are stored in PostgreSQL for:

- Audit trails  
- Incident tracking  
- Historical analysis  
- Reporting and dashboards  

---

## Example Output

```json id="mdfixjson"
{
  "alert_id": "ALT-4444",
  "alert_name": "Suspicious Outbound Connection",
  "source_ip": "192.168.1.38",
  "destination_ip": "185.220.101.176",
  "process": "wscript.exe",
  "vt_malicious_votes": 16,
  "vt_suspicious_votes": 2,
  "severity": "high",
  "action": "escalate",
  "confidence": 95,
  "llm_summary": "Outbound connection to a known malicious IP from a script-based process suggests potential malware execution.",
  "mitre_techniques": ["T1059", "T1071"],
  "automated_decision": "ESCALATE TO TIER 2"
}

## Tech Stack

- n8n – Workflow orchestration  
- VirusTotal API – Threat intelligence enrichment  
- Ollama (LLM) – AI-based SOC analysis  
- PostgreSQL – Incident storage  
- Python – Alert simulation generator  
- JavaScript (n8n Code Node) – Risk engine & data fusion  

---

## Key Design Principles

- Deterministic security decisions (rule-based severity & action)  
- AI used for explanation, not decision-making  
- Fully auditable incident pipeline  
- Separation of enrichment, logic, and analysis layers  

---

## Security Value

This project demonstrates how modern SOC pipelines:

- Reduce analyst workload through automation  
- Improve response consistency using rule engines  
- Enhance visibility with AI-generated context  
- Maintain auditability through structured storage  

---

## Future Enhancements

- Integration with SIEM tools (Splunk / Wazuh)  
- Real-time streaming ingestion (Kafka / Syslog)  
- Risk scoring engine (weighted asset criticality)  
- Case management dashboard  
- MITRE ATT&CK enrichment via knowledge base lookup  
- Slack / Teams incident notifications  

---

## Project Status

- **Status:** Functional Prototype (SOC Simulation)  
- **Stage:** Early SOAR-style automation system  
- **Use Case:** Security engineering / SOC portfolio project  

---

## Author

SOC automation project demonstrating practical security engineering, SOAR workflows, and AI-assisted threat analysis using n8n.