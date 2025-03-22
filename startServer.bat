@echo off
echo Iniciando o servidor de desenvolvimento do React...

REM Caminho relativo para a pasta do frontend
cd React

REM Iniciar o servidor de desenvolvimento do React em uma nova janela
start npm start

cd ..

REM Iniciar o servidor FastAPI em uma nova janela
echo Iniciando o servidor FastAPI...
cd Financial_API
start python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
cd ..


REM .\startServer.bat