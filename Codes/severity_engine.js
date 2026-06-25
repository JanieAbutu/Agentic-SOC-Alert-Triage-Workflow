const vt = $node["Enrichment_node"].json.data.attributes.last_analysis_stats;

let severity;
let action;
let confidence;

if (vt.malicious >= 15) {
  severity = "high";
  action = "escalate";
  confidence = 95;
} else if (vt.malicious >= 5) {
  severity = "medium";
  action = "investigate";
  confidence = 80;
} else {
  severity = "low";
  action = "close";
  confidence = 60;
}

return [{
  json: {
    vt_malicious: vt.malicious,
    vt_suspicious: vt.suspicious,
    severity,
    action,
    confidence
  }
}];