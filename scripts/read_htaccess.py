"""
Lê o conteúdo do .htaccess atual do servidor e lista pastas ocultas/extras.
"""
import ftplib
import io

HOST = "m2flex.com.br"
PORT = 21
USER = "marketing@m2flex.com.br"
PASS = "Mkt#2026"

print(f"Conectando...")
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

print(f"FTP root: {ftp.pwd()}\n")

# Lê o .htaccess da raiz
for path in ["/.htaccess", "/public_html/.htaccess"]:
    try:
        buf = io.BytesIO()
        ftp.retrbinary(f"RETR {path}", buf.write)
        content = buf.getvalue().decode("utf-8", errors="ignore")
        # Sanitize for console printing
        clean_content = "".join(c for c in content if ord(c) < 128)
        print(clean_content)
        print()
    except Exception as e:
        print(f"[ERRO] {path}: {e}\n")

# Lista TUDO na raiz com detalhes (incluindo pastas ocultas)
print("=== Listagem completa com detalhes da raiz / ===")
lines = []
ftp.dir("/", lines.append)
for l in lines:
    print(l)

# Lista subpastas de public_html
print("\n=== Subpastas de /public_html/ ===")
lines2 = []
ftp.dir("/public_html/", lines2.append)
for l in lines2:
    print(l)

ftp.quit()
