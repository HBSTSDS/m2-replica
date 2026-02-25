"""
Lista a estrutura de pastas do servidor via FTP para achar onde m2midias.com.br aponta.
"""
import ftplib

HOST = "m2flex.com.br"
PORT = 21
USER = ""
PASS = ""

try:
    from config_local import FTP_HOST, FTP_USER, FTP_PASS
    HOST = FTP_HOST
    USER = FTP_USER
    PASS = FTP_PASS
except ImportError:
    pass

print(f"Conectando em {HOST}:{PORT}...")
try:
    ftp = ftplib.FTP_TLS(timeout=30)
    ftp.connect(HOST, PORT)
    ftp.auth()
    ftp.login(USER, PASS)
    ftp.prot_p()
    ftp.set_pasv(True)
    print("Autenticado com FTPS!\n")
except Exception as e:
    print(f"FTPS falhou: {e} — tentando FTP simples...")
    ftp = ftplib.FTP(timeout=30)
    ftp.connect(HOST, PORT)
    ftp.login(USER, PASS)
    ftp.set_pasv(True)
    print("Autenticado com FTP simples!\n")

print(f"Pasta raiz do FTP: {ftp.pwd()}\n")

def list_recursive(ftp, path, depth=0, max_depth=3):
    if depth > max_depth:
        return
    try:
        items = ftp.nlst(path)
    except Exception:
        return
    for item in items:
        name = item.split("/")[-1] if "/" in item else item
        if name in (".", ".."):
            continue
        print("  " * depth + f"[{name}]  →  {item}")
        # Tenta listar como pasta
        try:
            ftp.cwd(item)
            list_recursive(ftp, item, depth + 1, max_depth)
            ftp.cwd("..")
        except Exception:
            pass  # é arquivo

# Lista apenas o primeiro nível para ter uma visão geral
print("=== Estrutura do servidor ===")
try:
    ftp.cwd("/")
    print("Listando /:")
    lines = []
    ftp.dir("/", lines.append)
    for l in lines:
        print(" ", l)
except Exception as e:
    print(f"Erro ao listar /: {e}")

# Tenta listar a home do usuário
print("\nTentando listar caminhos comuns de addon domain:")
paths_to_try = [
    "/public_html",
    "/home",
    "/",
]
for p in paths_to_try:
    try:
        ftp.cwd(p)
        lines = []
        ftp.dir(lines.append)
        print(f"\n  [{p}]:")
        for l in lines:
            print(f"    {l}")
    except Exception as e:
        print(f"  [{p}]: sem acesso ({e})")

ftp.quit()
