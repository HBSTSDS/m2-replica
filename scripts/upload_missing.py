"""
Script para fazer upload APENAS dos arquivos faltantes após a primeira execução falhar.
"""
import ftplib
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

LOCAL_ASSETS = os.path.join(os.path.dirname(__file__), "src", "assets")
REMOTE_BASE = "/public_html/assets"

# Apenas as pastas que falharam
FAILED_DIRS = ["sinalizacao", "supermercados", "sustetabilidade", "trabalheComAgente", "vitrinismos"]

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
            pass

def upload_file(ftp, local_path, remote_path):
    make_dirs(ftp, os.path.dirname(remote_path).replace("\\", "/"))
    with open(local_path, "rb") as f:
        ftp.storbinary(f"STOR {remote_path}", f)
    print(f"  [OK] {remote_path}")

def connect():
    print(f"Conectando em {HOST}:{PORT}...")
    ftp = ftplib.FTP_TLS(timeout=30)
    ftp.connect(HOST, PORT)
    ftp.auth()
    ftp.login(USER, PASS)
    ftp.prot_p()
    ftp.set_pasv(True)
    print("Autenticado!")
    return ftp

ftp = connect()
count = 0
errors = []

for failed_dir in FAILED_DIRS:
    local_dir = os.path.join(LOCAL_ASSETS, failed_dir)
    if not os.path.isdir(local_dir):
        continue
    for filename in os.listdir(local_dir):
        local_file = os.path.join(local_dir, filename)
        if not os.path.isfile(local_file):
            continue
        remote_file = f"{REMOTE_BASE}/{failed_dir}/{filename}"
        try:
            upload_file(ftp, local_file, remote_file)
            count += 1
        except Exception as e:
            print(f"  [ERRO] {remote_file}: {e} - Reconectando...")
            errors.append(remote_file)
            try:
                ftp = connect()
                upload_file(ftp, local_file, remote_file)
                errors.pop()
                count += 1
                print(f"  [RETRY OK] {remote_file}")
            except Exception as e2:
                print(f"  [FALHA DEFINITIVA] {remote_file}: {e2}")

# Upload index.html do dist
dist_index = os.path.join(os.path.dirname(__file__), "dist", "index.html")
# Reconecta para garantir
try:
    ftp.quit()
except:
    pass
ftp = connect()
try:
    with open(dist_index, "rb") as f:
        ftp.storbinary("STOR /public_html/index.html", f)
    print("[OK] /public_html/index.html")
    count += 1
except Exception as e:
    print(f"[ERRO] index.html: {e}")
    errors.append("index.html")

try:
    ftp.quit()
except:
    pass

print(f"\nConcluído! {count} arquivos enviados. {len(errors)} erros.")
if errors:
    for e in errors:
        print(f"  {e}")
