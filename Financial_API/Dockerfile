# Use uma imagem base com Python
FROM python:3.9-slim

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copie o arquivo requirements.txt para instalar as dependências
COPY requirements.txt /app/

# Instala as dependências do backend
RUN pip install --no-cache-dir -r requirements.txt

# Copie o código do backend para dentro do container
COPY . /app/

# Expõe a porta do FastAPI
EXPOSE 8000

# Comando para rodar o FastAPI
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]