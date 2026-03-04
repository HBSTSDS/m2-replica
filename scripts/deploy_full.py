"""
Script para DEPLOY COMPLETO (Frontend + Backend)
Upload de: 
1. Pasta /php/ (Backend/API) -> /public_html/api/
2. Pasta /dist/ (Build) -> raízes dos dois domínios
"""
import ftplib
import os
import ssl

HOST = "m2flex.com.br"
PORT = 21
USER = ""
PASS = ""

# Tenta carregar credenciais locais para segurança (Git)
try:
    from config_local import FTP_HOST, FTP_PORT, FTP_USER, FTP_PASS
    HOST = FTP_HOST
    PORT = FTP_PORT
    USER = FTP_USER
    PASS = FTP_PASS
except ImportError:
    print("[AVISO] Arquivo config_local.py não encontrado. Usando valores padrão.")

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
DIST_DIR = os.path.join(BASE_DIR, "dist")
PHP_DIR = os.path.join(BASE_DIR, "php")

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

def connect():
    print(f"Conectando em {HOST}...")
    try:
        # Tenta FTPS Explícito
        ftp = ftplib.FTP_TLS(timeout=60)
        ftp.connect(HOST, PORT)
        ftp.auth()
        ftp.login(USER, PASS)
        ftp.prot_p()
        ftp.set_pasv(True)
        print("Autenticado via FTPS!")
        return ftp
    except Exception as e:
        print(f"FTPS falhou ({e}). Tentando FTP simples...")
        try:
            ftp = ftplib.FTP(timeout=60)
            ftp.connect(HOST, PORT)
            ftp.login(USER, PASS)
            ftp.set_pasv(True)
            print("Autenticado via FTP!")
            return ftp
        except Exception as e2:
            print(f"Falha total na conexão: {e2}")
            return None

def upload_file_with_retry(ftp, local_path, remote_path, max_retries=3):
    for attempt in range(max_retries):
        try:
            make_dirs(ftp, os.path.dirname(remote_path).replace("\\", "/"))
            with open(local_path, "rb") as f:
                ftp.storbinary(f"STOR {remote_path}", f)
            print(f"  [OK] {remote_path}")
            return ftp, True
        except Exception as e:
            print(f"  [ERRO] Tentativa {attempt + 1} para {remote_path}: {e}")
            if attempt < max_retries - 1:
                print("  Reconectando...")
                try:
                    ftp.quit()
                except:
                    pass
                ftp = connect()
                if not ftp:
                    return None, False
            else:
                print(f"  [FALHA] Não foi possível enviar {remote_path}")
                return ftp, False
    return ftp, False

def deploy_to_path(ftp, remote_root):
    print(f"Enviando arquivos do Frontend para {remote_root}...")
    if os.path.exists(DIST_DIR):
        for root, dirs, files in os.walk(DIST_DIR):
            for filename in files:
                local_f = os.path.join(root, filename)
                # Pega o caminho relativo a partir de DIST_DIR
                rel = os.path.relpath(local_f, DIST_DIR).replace("\\", "/")
                remote_path = f"{remote_root}/{rel}" if remote_root else f"/{rel}"
                ftp, success = upload_file_with_retry(ftp, local_f, remote_path)
                if not success:
                    return ftp, False
    return ftp, True

def deploy_php(ftp, remote_root):
    print(f"\nEnviando arquivos PHP (Backend) para {remote_root}...")
    if os.path.exists(PHP_DIR):
        for root, dirs, files in os.walk(PHP_DIR):
            for filename in files:
                local_f = os.path.join(root, filename)
                rel = os.path.relpath(local_f, PHP_DIR).replace("\\", "/")
                # No servidor a estrutura esperada segue o caminho relativo da pasta php/
                # Se rel for "api/foo.php", vai para remote_root + "/api/foo.php"
                remote_path = f"{remote_root}/{rel}" if remote_root else f"/{rel}"
                ftp, success = upload_file_with_retry(ftp, local_f, remote_path)
                if not success:
                    return ftp, False
    else:
        print("[ERRO] Pasta /php/ não encontrada localmente.")
    return ftp, True

def main():
    if not os.path.exists(DIST_DIR):
        print("[ERRO] Pasta /dist/ não encontrada. Rode 'npm run build' primeiro!")
        return

    ftp = connect()
    if not ftp:
        return

    try:
        # Deploy para m2flex.com.br (/public_html/)
        print("\n=== DEPLOY PARA m2flex.com.br (/public_html) ===")
        ftp, success = deploy_php(ftp, "/public_html")
        if not success: raise Exception("Falha ao enviar PHP para m2flex")
        ftp, success = deploy_to_path(ftp, "/public_html")
        if not success: raise Exception("Falha ao enviar frontend para m2flex")

        # Deploy para m2midias.com.br (/)
        print("\n=== DEPLOY PARA m2midias.com.br (/) ===")
        ftp, success = deploy_php(ftp, "") # Raiz
        if not success: raise Exception("Falha ao enviar PHP para m2midias")
        ftp, success = deploy_to_path(ftp, "")
        if not success: raise Exception("Falha ao enviar frontend para m2midias")
        
        try:
            ftp.quit()
        except:
            pass
        print("\n>>> DEPLOY CONCLUÍDO COM SUCESSO! <<<")
        print("Por favor, limpe o cache do seu navegador ou teste em aba anônima.")
    except Exception as e:
        print(f"\n[FALHA NO DEPLOY] Erro inesperado: {e}")

if __name__ == "__main__":
    main()
