"""
Copia o index.html do dist/ e os assets para a RAIZ / do servidor (m2midias.com.br).
"""
import ftplib
import io
import os

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

BASE_DIR = os.path.dirname(__file__)
DIST_DIR = os.path.join(BASE_DIR, "dist")

print("Conectando...")
try:
    ftp = ftplib.FTP_TLS(timeout=30)
    ftp.connect(HOST, PORT)
    ftp.auth()
    ftp.login(USER, PASS)
    ftp.prot_p()
    ftp.set_pasv(True)
except Exception as e:
    ftp = ftplib.FTP(timeout=30)
    ftp.connect(HOST, PORT)
    ftp.login(USER, PASS)
    ftp.set_pasv(True)
print("Autenticado!\n")

def make_dirs(ftp, path):
    parts = [p for p in path.split("/") if p]
    current = ""
    for part in parts:
        current += "/" + part
        try:
            ftp.mkd(current)
        except ftplib.error_perm:
            pass

def upload_file(ftp, local_path, remote_path):
    make_dirs(ftp, os.path.dirname(remote_path).replace("\\", "/"))
    with open(local_path, "rb") as f:
        ftp.storbinary(f"STOR {remote_path}", f)
    print(f"  [OK] {remote_path}")

# 1. Envia o index.html para a RAIZ /
index_local = os.path.join(DIST_DIR, "index.html")
if os.path.exists(index_local):
    with open(index_local, "rb") as f:
        ftp.storbinary("STOR /index.html", f)
    print("[OK] /index.html enviado")
else:
    print("[ERRO] dist/index.html não encontrado. Rode 'npm run build' primeiro.")

# 2. Envia os assets do dist para / (raiz)
assets_local = os.path.join(DIST_DIR, "assets")
count = 0
errors = []

if os.path.exists(assets_local):
    for root, dirs, files in os.walk(assets_local):
        for filename in files:
            local_file = os.path.join(root, filename)
            rel = os.path.relpath(local_file, DIST_DIR).replace("\\", "/")
            remote_file = f"/{rel}"  # vai para /assets/... na raiz
            try:
                upload_file(ftp, local_file, remote_file)
                count += 1
            except Exception as e:
                print(f"  [ERRO] {remote_file}: {e}")
                errors.append(remote_file)
    print(f"\n{count} assets enviados para a raiz /assets/")
else:
    print("[AVISO] Pasta dist/assets não encontrada — rode 'npm run build' primeiro.")

ftp.quit()
print("\nPronto! Teste: https://m2midias.com.br e https://www.m2midias.com.br")
if errors:
    print("Erros:", errors)
