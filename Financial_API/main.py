import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from pathlib import Path
from dotenv import load_dotenv
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
from controllers import router

app = FastAPI(debug=True)
app.include_router(router)

# Configuração do CORS
origins = [
    "http://localhost:3000",  # Servidor de desenvolvimento do React
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]
)


load_dotenv()
# Verificar se estamos em modo de desenvolvimento ou produção
is_development = os.getenv('ENVIRONMENT') == 'development'

if not is_development:
    # Caminho para o diretório build do React
    frontend_build_path = Path(__file__).parent.parent / "React" / "build"

    app.mount("/static", StaticFiles(directory=frontend_build_path / "static"), name="static")

    @app.get("/", response_class=HTMLResponse)
    async def serve_index():
        # Retorna o arquivo index.html gerado pelo build do React
        index_file_path = frontend_build_path / "index.html"
        with open(index_file_path, "r") as file:
            return HTMLResponse(content=file.read())
else:
    @app.get("/", response_class=HTMLResponse)
    async def serve_index():
        # Durante o desenvolvimento, retorna um simples OK
        return JSONResponse(content={"message": "API is running"})