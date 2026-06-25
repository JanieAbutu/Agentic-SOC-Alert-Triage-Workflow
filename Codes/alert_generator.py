import requests
import random
import time
from datetime import datetime

WEBHOOK_URL = "http://localhost:5678/webhook/alert-triage"

processes = [
    "svchost.exe",
    "powershell.exe",
    "cmd.exe",
    "wscript.exe",
    "chrome.exe"
]

domains = [
    "normal-site.com",
    "update-service.com",
    "malicious-c2-domain.ru",
    "login-secure-check.net",
    "cdn-cloudfiles.io"
]

def generate_alert():
    return {
        "alert_id": f"ALT-{random.randint(1000,9999)}",
        "alert_name": "Suspicious Outbound Connection",
        "source_ip": f"192.168.1.{random.randint(2,254)}",
        "destination_ip": f"185.220.101.{random.randint(1,254)}",
        "destination_domain": random.choice(domains),
        "process": random.choice(processes),
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "severity": random.choice(["low", "medium", "high"])
    }

while True:
    alert = generate_alert()

    print(f"[+] Sending alert: {alert['alert_id']} -> {alert['destination_domain']}")

    try:
        r = requests.post(WEBHOOK_URL, json=alert)
        print("Response:", r.status_code)
    except Exception as e:
        print("Error:", e)

    time.sleep(5)