# DEVICE PLATFORM ARCHITECTURE
Version: 1.0  
Status: Draft / Active Development

---

# 1. Objective

Build a scalable remote control and telemetry platform based on ESP32 devices.

Initial target:

- Up to 4 users
- Up to 2 devices per user
- Each device with:
  - 4 relays
  - local sensors
  - remote wireless sensors
  - autonomous local logic
  - remote control from web UI

Future target:

- Multi-user production platform
- Many devices per user
- Secure ownership model
- Cloud ready

---

# 2. Core Components

## Frontend UI

Current base:

- MyTinerary UI

Responsibilities:

- Login
- Dashboard
- Device management
- Live status
- Relay control
- Settings

---

## Backend API

Responsibilities:

- Authentication
- Users
- Devices
- Ownership validation
- MQTT authorization
- Historical data
- Alerts
- Configuration persistence

Suggested stack:

- Node.js
- Express
- MongoDB

---

## Firmware (ESP32)

Responsibilities:

- Local autonomous operation
- Sensor reading
- Relay control
- RTC / Time sync
- MQTT communication
- SD local storage
- Fail-safe behavior if cloud offline

---

# 3. Ownership Model

## User

Each user owns one or more devices.

## Device

Each device has unique identity:

- deviceId
- firmwareVersion
- hardwareVersion
- claimedByUser

Example:

VIV-ESP32-001

---

# 4. Communication Model

## Cloud Commands

UI -> Backend -> MQTT -> Device

Examples:

- relay ON/OFF
- mode changes
- threshold updates

## Telemetry

Device -> MQTT / API

Examples:

- temperatures
- humidity
- relay states
- alarms
- uptime

---

# 5. Local First Strategy

Device must continue working even without internet.

Local priorities:

1. Sensor control
2. Safety logic
3. Relay automation
4. RTC timekeeping
5. SD buffering

Cloud adds convenience, not dependency.

---

# 6. Data Storage Strategy

## Cloud (Important only)

- Current status
- Configurations
- Alerts
- Last telemetry snapshot
- Ownership data

## SD Card (Local history)

- Logs
- Detailed sensor history
- Retry queue if offline
- Debug traces

---

# 7. Security Model

## Current

- User login only

## Required next phase

- Device claim token
- User-device ownership validation
- Secure MQTT credentials per device
- Revocable access
- Audit logs

---

# 8. Scalability Path

## Phase 1

4 users / few devices

## Phase 2

20 users / dozens devices

## Phase 3

100+ users

Needs:

- Managed MQTT broker
- Queue workers
- Metrics
- Device fleet tools

---

# 9. Immediate Next Sprint

## Backend

Create Device model:

- ownerUserId
- deviceId
- name
- type
- online
- lastSeen

## Firmware

Send snapshot JSON periodically.

## UI

Dashboard:

- My Devices
- Live values
- Relay buttons

---

# 10. Long-Term Vision

Single platform configurable for:

- Greenhouse
- Incubator
- Irrigation
- Ventilation
- Hydroponics
- Remote automation labs

Same firmware core, different profiles.

---

# 11. Principle

Keep firmware robust.  
Keep backend secure.  
Keep UI simple.  
Scale only when usage requires it.