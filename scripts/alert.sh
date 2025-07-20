#!/bin/bash
CPU=$(top -bn1 | grep "Cpu(s)" | awk '{print $2 + $4}')
if (( $(echo "$CPU > 80" | bc -l) )); then
  echo "High CPU usage alert! Current: $CPU%"
else
  echo "CPU usage normal."
fi
