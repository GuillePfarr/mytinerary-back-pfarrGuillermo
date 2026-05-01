# Production Environment Checklist

Checklist para desplegar el backend de MyTinerary / Vivero_Uno en producción sin romper autenticación, email verification ni dispositivos IoT.

---

## 1. Branch y deploy

Antes de tocar producción:

- Trabajar siempre fuera de `main`.
- Probar localmente.
- Mergear a `main` solo cuando esté validado.
- Confirmar que Render desplegó el commit correcto.

Comandos útiles:

```powershell
git status
git branch
git log --oneline -5
```

2. Verificar qué commit se desplegó en Render

Después de hacer push a main, Render debería desplegar automáticamente.

Para confirmar que Render desplegó el commit correcto:

Entrar al dashboard de Render.
Abrir el servicio backend.
Revisar el último deploy en Events o Logs.
Confirmar que el commit mostrado por Render coincide con el último commit local.

Para ver el último commit local:

git log --oneline -1

Ejemplo esperado en Render:

Deploy live for 0f0d8cc: Configure trust proxy for Render rate limiting

Ese código corto, por ejemplo 0f0d8cc, debe coincidir con el commit local.

3. Variables obligatorias en Render
   Estas variables deben existir en el servicio backend de Render:
   DATABASE_URL=PORT=JWT_SECRET=JWT_EXPIRES_IN=1hEMAIL_VERIFICATION_ENABLED=trueEMAIL_MODE=consoleMQTT_URL=MQTT_USER=MQTT_PASS=
   Notas:

EMAIL_VERIFICATION_ENABLED=true es obligatorio para que signup cree usuarios pendientes.

Si falta EMAIL_VERIFICATION_ENABLED, el backend puede crear usuarios sin requerir verificación.

EMAIL_MODE=console imprime códigos de verificación en Render Logs.

EMAIL_MODE=smtp envía emails reales.

4. Variables SMTP para email real
   Cuando se use proveedor SMTP real, por ejemplo Resend:
   EMAIL_MODE=smtpSMTP_HOST=smtp.resend.comSMTP_PORT=465SMTP_SECURE=trueSMTP_USER=resendSMTP_PASS=EMAIL_FROM=no-reply@send.versedyn.de
   Notas:

SMTP_PASS debe ser la API key del proveedor.

Nunca subir SMTP_PASS a GitHub.

En local se puede mantener EMAIL_MODE=console.

Para Resend, el dominio o subdominio debe estar verificado por DNS.

5. Variables locales recomendadas
   En .env local:
   DATABASE_URL=PORT=8080JWT_SECRET=JWT_EXPIRES_IN=1hEMAIL_VERIFICATION_ENABLED=trueEMAIL_MODE=consoleMQTT_URL=MQTT_USER=MQTT_PASS=
   Notas:

El archivo .env real no debe subirse a GitHub.

Mantener .env.example sin secretos reales.

Local puede seguir usando EMAIL_MODE=console aunque producción use EMAIL_MODE=smtp.

6. Render y rate limit
   Render usa proxy y agrega el header X-Forwarded-For.
   El backend debe tener en index.js:
   server.set("trust proxy", 1);
   Esto evita errores de express-rate-limit como:
   ERR_ERL_UNEXPECTED_X_FORWARDED_FOR

7. Prueba post-deploy: auth
   Después de cada deploy backend, probar el flujo de autenticación.
   Signup
   Crear usuario nuevo.
   Resultado esperado:
   { "success": true, "requiresEmailVerification": true}
   En MongoDB, el usuario debe quedar así:
   isEmailVerified: falseemailVerificationCodeHash: "..."emailVerificationExpires: Date
   Login sin verificar
   Debe fallar.
   Resultado esperado:
   { "success": false, "requiresEmailVerification": true}
   Verify email
   Debe aceptar el código correcto y devolver token.
   Forgot password
   Debe generar código de reset y permitir cambiar contraseña.

8. Prueba post-deploy: devices
   Con usuario logueado:
   GET /api/devices
   Debe devolver solo devices propios.
   Sin token:
   { "success": false, "code": "UNAUTHORIZED", "error": "No autorizado"}
   Usuario B no debe controlar devices del Usuario A:
   POST /api/devices/:deviceId/relays/:relayId
   Resultado esperado:
   { "success": false, "error": "Device no encontrado o no autorizado"}

9. Snapshot IoT
   Firmware ESP32 usa deviceToken, no JWT de usuario.
   Endpoint:
   POST /api/devices/:deviceId/snapshot
   Debe incluir:
   Authorization: Bearer <deviceToken>
   Resultados esperados:

Token faltante → 401

Token inválido → 401

Device sin token → 403

Snapshot válido → 200

10. Pendientes conocidos
    Online/offline device status
    La UI puede mostrar:
    Estado: ONLINEÚltimo reporte: hace 50s
    aunque la placa esté desenergizada.
    Pendiente revisar:

lastSeen

online

timeout backend/frontend

posible job o cálculo dinámico para pasar a OFFLINE

11. Seguridad de secretos
    Nunca pegar ni subir a GitHub:
    DATABASE_URL realJWT_SECRETMQTT_PASSSMTP_PASSAPI keysdeviceToken realclaimCode real
    Si un secreto se expone accidentalmente:

Rotarlo en el proveedor correspondiente.

Actualizar Render.

Redeploy.

Verificar logs.

---Después de guardar ese archivo, ejecutá solo esto:```powershellgit status
Y me pegás el resultado.
