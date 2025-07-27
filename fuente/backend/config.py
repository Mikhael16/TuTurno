# Configuración para el envío de correos
EMAIL_CONFIG = {
    "smtp_server": "smtp.gmail.com",
    "smtp_port": 587,
    "sender_email": "mikaelgordillo@gmail.com",
    # IMPORTANTE: Reemplazar con la contraseña de aplicación de Gmail
    "sender_password": "uvye yayl ulaa iiuk"
}

# Configuración de seguridad
SECRET_KEY = "tu_clave_secreta_muy_segura"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Configuración de PIN
PIN_EXPIRATION_MINUTES = 10
PIN_LENGTH = 6 