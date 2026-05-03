# Device provisioning

Este documento describe el flujo inicial de provisioning de devices para Vivero_Uno / MyTinerary.

El objetivo del provisioning es crear un device en MongoDB antes de entregarlo a un cliente, separando claramente:

- los datos secretos que van a la placa/SD;
- los datos que recibe el cliente para reclamar el device;
- los hashes que quedan guardados en MongoDB.

## Flujo general

```txt
Tecnico/fabrica
  -> ejecuta script de provisioning
  -> se crea Device en Mongo con owner null
  -> se genera archivo secreto para placa/SD
  -> se genera archivo de claim para cliente

Cliente
  -> inicia sesion en la app
  -> entra a Devices
  -> ingresa deviceId + claimCode
  -> opcionalmente asigna un nombre
  -> el device queda asociado a su usuario

Script

El script esta en:

scripts/provision-device.mjs

Ejemplo de uso:

node scripts/provision-device.mjs --model Vivero_Uno --hardware HW-1 --firmware 1.0.0

Opcionalmente se pueden pasar otros datos:

node scripts/provision-device.mjs --model Vivero_Uno --hardware HW-1 --firmware 1.0.0 --name "Mi dispositivo" --timezone Europe/Berlin
Datos generados

El script genera:

deviceId: identificador unico del device.
claimCode: codigo para que el cliente pueda reclamar el device.
deviceToken: secreto usado por el firmware para autenticarse contra el backend.
claimCodeHash: hash bcrypt del claimCode.
deviceTokenHash: hash bcrypt del deviceToken.
Documento creado en MongoDB

El script crea un documento Device similar a este:

{
  owner: null,
  name: "Mi dispositivo",
  deviceId: "vu_20260503_1d5efc",
  claimCodeHash: "...bcrypt hash...",
  deviceTokenHash: "...bcrypt hash...",
  claimedAt: null,
  relayStates: {},
  type: "vivero",
  model: "Vivero_Uno",
  firmwareVersion: "1.0.0",
  hardwareVersion: "HW-1",
  timezone: "",
  online: false,
  lastSeen: null,
  lastHeartbeatAt: null,
  lastHeartbeat: null,
  lastSnapshot: null
}

Importante:

MongoDB nunca guarda el claimCode en texto plano.
MongoDB nunca guarda el deviceToken en texto plano.
Solo se guardan hashes bcrypt.
Archivos generados

El script genera archivos dentro de:

out/provisioned-devices/<deviceId>/

Ejemplo:

out/
  provisioned-devices/
    vu_20260503_1d5efc/
      device.json
      claim.json
      claim.txt

La carpeta out esta ignorada por Git y no debe commitearse.

Archivo para placa/SD

Archivo:

device.json

Uso:

Va a la placa o a la tarjeta SD.
Contiene el deviceToken secreto.
No se entrega al cliente.
No se sube al repositorio.

Ejemplo:

{
  "deviceId": "vu_20260503_1d5efc",
  "deviceToken": "TOKEN_SECRETO_LARGO",
  "apiBaseUrl": "https://mytinerary-2s20.onrender.com",
  "model": "Vivero_Uno",
  "hardwareVersion": "HW-1",
  "firmwareVersion": "1.0.0",
  "timezone": ""
}
Archivo para cliente

Archivos:

claim.json
claim.txt

Uso:

Se entrega al cliente.
Contiene deviceId y claimCode.
No contiene deviceToken.

Ejemplo:

Device ID: vu_20260503_1d5efc
Claim Code: LDWAX4TJ

El cliente usa esos datos en la UI de Devices.

Claim desde la app

El cliente debe:

iniciar sesion;
ir a la pagina Devices;
ingresar deviceId;
ingresar claimCode;
opcionalmente asignar un nombre al device;
confirmar el claim.

Despues del claim:

owner deja de ser null;
claimedAt recibe una fecha;
el device queda asociado al usuario autenticado;
GET /api/devices devuelve el device para ese usuario.
Seguridad

Reglas importantes:

El deviceToken es secreto de la placa.
El cliente no debe recibir el deviceToken.
El cliente solo recibe deviceId y claimCode.
Los archivos de out/ no deben subirse a Git.
.env no debe subirse a Git.
MongoDB guarda hashes, no secretos reales.
Un device no puede ser reclamado si ya tiene owner.
El backend mantiene el limite actual de devices por usuario.
Las operaciones de relay siguen exigiendo ownership.
Verificaciones despues de provisionar

Despues de ejecutar el script:

node scripts/provision-device.mjs --model Vivero_Uno --hardware HW-1 --firmware 1.0.0

Verificar que se generaron los archivos:

dir out/provisioned-devices

Verificar que out/ no aparece en Git:

git status

Esperado:

out/ no debe aparecer
Verificacion funcional
Ejecutar el script.
Copiar deviceId y claimCode desde claim.txt.
Iniciar sesion en la UI.
Reclamar el device desde /devices.
Confirmar que aparece en la lista.
Confirmar que muestra modelo, firmware y hardware.
Confirmar que aparece OFFLINE si no hay placa real reportando.

Ejemplo validado:

MySecondDeviceByPilo — vu_20260503_1d5efc
Estado: OFFLINE
Modelo: Vivero_Uno | FW: 1.0.0 | HW: HW-1
Estado esperado antes de conectar una placa real

Si el device fue reclamado pero la placa todavia no reporta heartbeat/snapshot:

Estado: OFFLINE
lastSeen: null o sin reporte reciente
lastHeartbeatAt: null
lastSnapshot: null

Eso es correcto.

El device pasara a ONLINE cuando el backend reciba heartbeat reciente o snapshot, segun la logica vigente del backend.

Pendiente futuro

Posibles mejoras futuras:

generar QR para claim;
agregar expiracion o rotacion de claimCode;
agregar script para limpiar devices de prueba;
permitir dry-run;
leer device.json desde firmware usando SD/NVS;
usar deviceToken tambien en mas canales de comunicacion;
documentar proceso de entrega fisica al cliente;
mejorar UI con contador de devices disponibles sobre el limite maximo.