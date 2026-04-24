# Device Platform Architecture

## Proyecto
ESP32 vivero / incubadora / automatización ambiental

## Estado actual

- Firmware autónomo local
- Modo local por teclado
- RTC + NTP + timezone SD
- WiFi opcional
- MQTT para relés remotos
- Backend existente
- UI con login usuario/password

## Objetivo

Escalar a múltiples usuarios y múltiples placas.

## Principios

1. La placa funciona offline
2. La nube agrega valor, no dependencia total
3. Cada placa tiene deviceId único
4. El usuario reclama placas
5. Backend autoriza comandos
6. Snapshot de estado estándar

## Entidades futuras

- User
- Device
- Snapshot
- Event
- Command
- Ownership

## Próximos pasos

1. Snapshot estable
2. Ownership de placas
3. Tokens por dispositivo
4. UI multi-dispositivo
5. Logs y eventos