// 1. Webhook (original alert)
const alert = $node["Webhook"].json.body;

// 2. VirusTotal enrichment
const vtStats =
  $node["Enrichment_node"].json.data.attributes.last_analysis_stats;

// 3. Ollama output (summary + mitre only)
const llmRaw =
  $node["Ollama_Agent"].json.message.content;

// Clean markdown if Ollama wraps JSON
let cleaned = llmRaw.replace(/```json|```/g, "").trim();

let llmResult;

try {
  llmResult = JSON.parse(cleaned);
} catch (e) {
  llmResult = {
    summary: cleaned,
    mitre_techniques: []
  };
}

// 4. Rule-based severity engine (ENTERPRISE LOGIC)
let severity;
let action;
let confidence;

if (vtStats.malicious >= 15) {
  severity = "high";
  action = "escalate";
  confidence = 95;
} else if (vtStats.malicious >= 5) {
  severity = "medium";
  action = "investigate";
  confidence = 80;
} else {
  severity = "low";
  action = "close";
  confidence = 60;
}

// 5. Final SOC record
return [
  {
    json: {
      // --- alert data ---
      alert_id: alert.alert_id,
      alert_name: alert.alert_name,
      source_ip: alert.source_ip,
      destination_ip: alert.destination_ip,
      process: alert.process,
      timestamp: new Date().toISOString(),

      // --- enrichment ---
      vt_malicious_votes: vtStats.malicious,
      vt_suspicious_votes: vtStats.suspicious,

      // --- rule engine output ---
      severity,
      action,
      confidence,

      // --- AI output (context only) ---
      llm_summary: llmResult.summary,
      mitre_techniques: llmResult.mitre_techniques || [],

      // --- SOC decision ---
      automated_decision:
        severity === "high"
          ? "ESCALATE TO TIER 2"
          : severity === "medium"
          ? "INVESTIGATE"
          : "CLOSE"
    }
  }
];