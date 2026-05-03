# Device Ownership Security Tests

Fecha: 2026-05-03  
Proyecto: MyTinerary / Vivero_Uno backend  
Objetivo: validar que la seguridad multiusuario para devices funciona antes de avanzar hacia soporte formal de hasta 4 devices por usuario.

---

## Contexto

Device principal probado:

```text
deviceId: esp32_01
name: ESP32 Vivero
owner: Usuario A


Usuarios usados:
Usuario A: pilo@pilo.com
Usuario B: cle@cle.com

1. Usuario A ve sus devices
Prueba

Usuario A hace login y ejecuta:

GET /api/devices

Resultado esperado

Debe ver esp32_01.

Resultado obtenido

OK.

esp32_01 | ESP32 Vivero | online: true


2. Usuario B no ve devices de Usuario A
Prueba

Usuario B hace login y ejecuta:

GET /api/devices
Resultado esperado

No debe aparecer esp32_01.

Resultado obtenido

OK.

Usuario B no tiene devices asociados y no ve esp32_01.

3. Usuario B no puede controlar device de Usuario A
Prueba

Usuario B intenta:

POST /api/devices/esp32_01/relays/1

Body:

{
  "state": "ON"
}
Resultado esperado

Debe fallar.

Resultado obtenido

OK.

{
  "success": false,
  "error": "Device no encontrado o no autorizado"
}

El relé no debe moverse.

4. Usuario B no puede reclamar device ya reclamado
Prueba

Usuario B intenta reclamar:

POST /api/devices/claim

Body:

{
  "deviceId": "esp32_01",
  "claimCode": "cualquier-codigo",
  "name": "Intento Cle"
}


Resultado esperado

Debe fallar porque el device ya tiene owner.

Resultado obtenido

OK.

{
  "success": false,
  "error": "Ese device ya está reclamado"
}

5. Snapshot sin deviceToken debe fallar
Prueba

Se intenta enviar snapshot sin header Authorization.

POST /api/devices/esp32_01/snapshot

Body:

{
  "deviceId": "esp32_01",
  "model": "Vivero_Uno",
  "firmwareVersion": "test",
  "tempLocal": 22,
  "humLocal": 55
}


Resultado esperado

Debe fallar.

Resultado obtenido

OK.

{
  "success": false,
  "error": "device token requerido"
}

6. Snapshot con deviceToken inválido debe fallar
Prueba

Se intenta enviar snapshot con:

Authorization: Bearer token-falso
Resultado esperado

Debe fallar.

Resultado obtenido

OK.

{
  "success": false,
  "error": "device token inválido"
}
7. Heartbeat de device inexistente no debe crear device
Prueba

Se publica por MQTT:

devices/device_fake_999/heartbeat

Payload:

{
  "source": "manual-test-fake",
  "uptimeMs": 12345
}
Resultado esperado

El backend debe ignorarlo de forma segura.

No debe:

crear un device nuevo
crashear
afectar esp32_01
Resultado obtenido

OK.

Log observado:

[MQTT] mensaje recibido topic=devices/device_fake_999/heartbeat payload={"source":"manual-test-fake","uptimeMs":12345}
[MQTT] heartbeat de device no encontrado en DB: device_fake_999
Resultado general

Las pruebas básicas de ownership y device token fueron satisfactorias.

Validado:

Usuario A ve solo sus devices.
Usuario B no ve devices de Usuario A.
Usuario B no puede controlar devices de Usuario A.
Usuario B no puede reclamar devices ya reclamados.
Snapshots requieren deviceToken.
Snapshots con token inválido son rechazados.
Heartbeats de devices inexistentes no crean registros nuevos.




