# Mytinerary IoT Backend

Backend Node.js + Express + MongoDB para plataforma IoT con dispositivos ESP32 conectados por MQTT y dashboard web React.

## Arquitectura

ESP32 Firmware  
↓ HTTPS Snapshot + MQTT  
Node / Express API  
↓  
MongoDB Atlas  
↓  
React Dashboard

## Funcionalidades

### Devices

- Asociación de dispositivos a usuarios
- Claim mediante código
- Estado online / offline
- lastSeen automático

### Telemetría

- Snapshot de sensores
- Temperatura local/remota
- Humedad local/remota
- Límites configurados
- Estado general del equipo

### Actuadores

- Control remoto de 4 relés
- Persistencia de estado vía MQTT

### Seguridad

- JWT para usuarios
- Device Token para firmware

## Stack

- Node.js
- Express
- MongoDB / Mongoose
- MQTT
- Render

## Release estable

`v1.0.0-backend`

## Estado

Sistema productivo funcionando con hardware real.