import requests

try:
    # Probar el endpoint
    response = requests.get('http://localhost:8000/api/prerequisitos-curso/BMA02?carrera=i1')
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
except Exception as e:
    print(f"Error: {e}") 