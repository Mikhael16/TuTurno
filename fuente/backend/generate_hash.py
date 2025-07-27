from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
 
if __name__ == "__main__":
    password = input("Ingresa la contraseña a hashear: ")
    print("Hash generado:")
    print(pwd_context.hash(password)) 