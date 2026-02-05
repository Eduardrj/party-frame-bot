#!/usr/bin/env bash
# openclaw-ssh-tunnel-watchdog.sh
# Run on WSL as the same user that runs the ssh tunnel service.
# Checks that the remote port on the VPS is reachable and restarts the local ssh tunnel service if not.

set -euo pipefail

VPS_LOCAL_PORT=10092         # remote port on VPS mapped by the tunnel
LOCAL_TUNNEL_SERVICE=openclaw-ssh-tunnel.service
LOGFILE="$HOME/.openclaw/ssh-tunnel-watchdog.log"

timestamp(){ date -u +"%Y-%m-%dT%H:%M:%SZ"; }

echo "$(timestamp) watchdog: checking tunnel (VPS localhost:$VPS_LOCAL_PORT)" >> "$LOGFILE"

# Try to connect from the WSL machine to the VPS local port via loopback on VPS from the VPS side.
# We can't nc to VPS:10092 from WSL to test the reverse endpoint directly; instead, we check the local ssh process is present
# and that the ssh process has an established connection to the VPS. Then we verify from VPS (optional) or rely on local checks.

# 1) Check local ssh process with -R 10092 present
if pgrep -af "ssh .* -R $VPS_LOCAL_PORT:localhost:18793" >/dev/null; then
  echo "$(timestamp) watchdog: ssh process with -R present" >> "$LOGFILE"
else
  echo "$(timestamp) watchdog: ssh process not found — restarting service $LOCAL_TUNNEL_SERVICE" >> "$LOGFILE"
  systemctl --user restart "$LOCAL_TUNNEL_SERVICE" || true
  exit 0
fi

# 2) Check that the ssh process is in a running state (not stopped/traced)
# Find PID and state
pid=$(pgrep -af "ssh .* -R $VPS_LOCAL_PORT:localhost:18793" | awk '{print $1}' | head -n1 || true)
if [ -n "$pid" ]; then
  state=$(ps -o stat= -p "$pid" | tr -d '[:space:]' || true)
  if [[ "$state" == T* ]]; then
    echo "$(timestamp) watchdog: ssh pid $pid in state $state (stopped) — restarting service" >> "$LOGFILE"
    systemctl --user restart "$LOCAL_TUNNEL_SERVICE" || true
    exit 0
  fi
else
  echo "$(timestamp) watchdog: no pid found after earlier check — restarting service" >> "$LOGFILE"
  systemctl --user restart "$LOCAL_TUNNEL_SERVICE" || true
  exit 0
fi

# 3) Optional: probe remote endpoint from VPS via ssh to the VPS and run nc there. This requires key-based SSH available.
# We'll attempt a quick remote check using ssh (non-interactive). If that fails, it's not fatal — rely on local restart behavior.

VPS_SSH="root@104.131.110.134"
ssh -o BatchMode=yes -o ConnectTimeout=8 "$VPS_SSH" "nc -vz 127.0.0.1 $VPS_LOCAL_PORT -w 3 >/dev/null 2>&1 && echo OK || echo FAIL" >/tmp/ocwd-check-$$ 2>/dev/null || true
if grep -q OK /tmp/ocwd-check-$$ 2>/dev/null; then
  echo "$(timestamp) watchdog: remote probe OK" >> "$LOGFILE"
  rm -f /tmp/ocwd-check-$$
  exit 0
else
  echo "$(timestamp) watchdog: remote probe failed — restarting service" >> "$LOGFILE"
  rm -f /tmp/ocwd-check-$$
  systemctl --user restart "$LOCAL_TUNNEL_SERVICE" || true
  exit 0
fi
