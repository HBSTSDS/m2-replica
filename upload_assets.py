"""
Script para fazer upload da pasta src/assets para /public_html/assets/ no servidor m2flex.com.br
Usa FTPS (FTP explícito com TLS) em modo passivo.
"""
import ftplib
import os
import ssl
import sys

HOST = "m2flex.com.br"
PORT = 21
USER = ""
PASS = ""

try:
    from config_local import FTP_HOST, FTP_PORT, FTP_USER, FTP_PASS
    HOST = FTP_HOST
    PORT = FTP_PORT
    USER = FTP_USER
    PASS = FTP_PASS
except ImportError:
    pass

LOCAL_ASSETS = os.path.join(os.path.dirname(__file__), "src", "assets")
REMOTE_BASE = "/public_html/assets"

SKIP_DIRS = {"360Mobile", "Equipamentos", "avalieM2", "blog", "icons", "react.svg", "vite.svg"}

def make_dirs(ftp, path):
    parts = path.split("/")
    current = ""
    for part in parts:
        if not part:
            continue
        current += "/" + part
        try:
            ftp.mkd(current)
            print(f"  [MKDIR] {current}")
        except ftplib.error_perm:
            pass  # already exists

def upload_file(ftp, local_path, remote_path):
    make_dirs(ftp, os.path.dirname(remote_path).replace("\\", "/"))
    with open(local_path, "rb") as f:
        ftp.storbinary(f"STOR {remote_path}", f)
    print(f"  [OK] {remote_path}")

class ImplicitFTP_TLS(ftplib.FTP_TLS):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._sock = None

    def connect(self, host='', port=0, timeout=-999, source_address=None):
        if timeout != -999:
            self.timeout = timeout
        if host:
            self.host = host
        if port:
            self.port = port
        self.af = None
        self.sock = None
        self.file = None
        self.welcome = None
        self.passiveserver = 1
        return ftplib.FTP.connect(self, host, port, timeout, source_address)

print(f"Conectando em {HOST}:{PORT}...")
try:
    ftp = ftplib.FTP_TLS(timeout=30)
    ftp.connect(HOST, PORT)
    print("Conexão TCP OK. Enviando AUTH TLS...")
    ftp.auth()
    ftp.login(USER, PASS)
    ftp.prot_p()
    ftp.set_pasv(True)
    print("Autenticado com FTPS!")
except Exception as e:
    print(f"FTPS falhou: {e}")
    print("Tentando FTP simples...")
    ftp = ftplib.FTP(timeout=30)
    ftp.connect(HOST, PORT)
    ftp.login(USER, PASS)
    ftp.set_pasv(True)
    print("Autenticado com FTP simples!")

print(f"Diretório atual: {ftp.pwd()}")

# Garante que /public_html/assets existe
make_dirs(ftp, REMOTE_BASE)

count = 0
errors = []

for root, dirs, files in os.walk(LOCAL_ASSETS):
    # Pular diretórios desnecessários para não demorar demais
    dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
    
    for filename in files:
        local_file = os.path.join(root, filename)
        rel = os.path.relpath(local_file, LOCAL_ASSETS).replace("\\", "/")
        remote_file = f"{REMOTE_BASE}/{rel}"
        
        try:
            upload_file(ftp, local_file, remote_file)
            count += 1
        except Exception as e:
            print(f"  [ERRO] {remote_file}: {e}")
            errors.append(remote_file)

# Upload index.html do dist também
dist_index = os.path.join(os.path.dirname(__file__), "dist", "index.html")
try:
    with open(dist_index, "rb") as f:
        ftp.storbinary("STOR /public_html/index.html", f)
    print("[OK] /public_html/index.html")
except Exception as e:
    print(f"[ERRO] index.html: {e}")

ftp.quit()
print(f"\nConcluído! {count} arquivos enviados. {len(errors)} erros.")
if errors:
    print("Erros:")
    for e in errors:
        print(f"  {e}")
