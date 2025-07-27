# Configuración del Sistema de Reset de Contraseña

## Funcionalidad Implementada

El sistema de "Olvidé mi contraseña" incluye:

1. **Botón en el Login**: "¿Olvidaste tu contraseña?"
2. **Flujo de 3 pasos**:
   - Paso 1: Ingresar email
   - Paso 2: Verificar PIN recibido por correo
   - Paso 3: Establecer nueva contraseña
3. **Envío de correos** con diseño visual atractivo
4. **Seguridad**: PIN de 6 dígitos que expira en 10 minutos

## Configuración Requerida

### 1. Configurar Gmail para envío de correos

**IMPORTANTE**: Para que funcione el envío de correos, necesitas configurar una "Contraseña de aplicación" en Gmail:

1. Ve a tu cuenta de Google
2. Activa la verificación en dos pasos si no está activada
3. Ve a "Seguridad" → "Contraseñas de aplicación"
4. Genera una nueva contraseña para "Correo"
5. Copia la contraseña generada (16 caracteres)

### 2. Actualizar configuración

Edita el archivo `backend/config.py` y reemplaza:

```python
"sender_password": "tu_app_password_aqui"
```

Con la contraseña de aplicación que generaste:

```python
"sender_password": "abcd efgh ijkl mnop"  # Tu contraseña real de 16 caracteres
```

### 3. Verificar configuración

El archivo `backend/config.py` debe verse así:

```python
EMAIL_CONFIG = {
    "smtp_server": "smtp.gmail.com",
    "smtp_port": 587,
    "sender_email": "mikaelgordillo@gmail.com",
    "sender_password": "tu_contraseña_de_aplicación_real"
}
```

## Endpoints del Backend

- `POST /api/solicitar-reset-password`: Solicita envío de PIN
- `POST /api/validar-pin`: Valida el PIN ingresado
- `POST /api/reset-password`: Cambia la contraseña con PIN válido

## Componentes del Frontend

- `ResetPassword.jsx`: Componente principal con stepper de 3 pasos
- Botón agregado en `Login.jsx`
- Ruta agregada en `App.jsx`

## Seguridad

- PIN de 6 dígitos aleatorio
- Expiración automática en 10 minutos
- Invalidación de PINs anteriores
- No revela si el email existe o no
- Contraseñas hasheadas con bcrypt

## Pruebas

1. Ejecuta el backend: `python -m uvicorn main:app --reload`
2. Ejecuta el frontend: `npm run dev`
3. Ve al login y haz clic en "¿Olvidaste tu contraseña?"
4. Ingresa un email que exista en la base de datos
5. Revisa el correo y usa el PIN para restablecer la contraseña

## Notas Importantes

- El correo se envía desde `mikaelgordillo@gmail.com`
- El diseño del correo es responsivo y visualmente atractivo
- El sistema maneja errores de forma segura
- Los PINs expirados se limpian automáticamente 