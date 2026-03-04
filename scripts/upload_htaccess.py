"""
Envia o .htaccess correto para a RAIZ / do FTP (que é a pasta do m2midias.com.br).
"""
import ftplib
import io

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

# .htaccess para a RAIZ / — onde m2midias.com.br aponta
HTACCESS_ROOT = """\
Options -Indexes
Options -MultiViews
RewriteEngine On

# Não reescrever pastas de backend
RewriteRule ^api/ - [L]
RewriteRule ^cms/ - [L]
RewriteRule ^m2-cms/ - [L]

# Serve arquivos e pastas existentes normalmente
RewriteCond %{REQUEST_FILENAME} -f [OR]
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^ - [L]

# Tudo mais vai para o index.html (React SPA)
RewriteRule ^ /index.html [L]
"""

# .htaccess para /public_html/ — onde m2flex.com.br aponta
HTACCESS_PUBLIC_HTML = """\
Options -Indexes
Options -MultiViews
RewriteEngine On

# Não reescrever pastas de backend
RewriteRule ^api/ - [L]
RewriteRule ^cms/ - [L]
RewriteRule ^m2-cms/ - [L]

# Serve arquivos e pastas existentes normalmente
RewriteCond %{REQUEST_FILENAME} -f [OR]
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^ - [L]

# Tudo mais vai para o index.html (React SPA)
RewriteRule ^ /index.html [L]
"""

print(f"Conectando em {HOST}:{PORT}...")
try:
    ftp = ftplib.FTP_TLS(timeout=30)
    ftp.connect(HOST, PORT)
    ftp.auth()
    ftp.login(USER, PASS)
    ftp.prot_p()
    ftp.set_pasv(True)
    print("Autenticado com FTPS!")
except Exception as e:
    print(f"FTPS falhou ({e}). Tentando FTP simples...")
    ftp = ftplib.FTP(timeout=30)
    ftp.connect(HOST, PORT)
    ftp.login(USER, PASS)
    ftp.set_pasv(True)
    print("Autenticado com FTP simples!")

# 1. Envia .htaccess para a RAIZ (m2midias.com.br)
content = HTACCESS_ROOT.encode("utf-8")
ftp.storbinary("STOR /.htaccess", io.BytesIO(content))
print("[OK] /.htaccess enviado (m2midias.com.br)")

# 2. Envia .htaccess para /public_html/ (m2flex.com.br)
content2 = HTACCESS_PUBLIC_HTML.encode("utf-8")
ftp.storbinary("STOR /public_html/.htaccess", io.BytesIO(content2))
print("[OK] /public_html/.htaccess enviado (m2flex.com.br)")

ftp.quit()
print("\nPronto! Teste agora os dois domínios:")
print("  https://m2flex.com.br")
print("  https://m2midias.com.br")
print("  https://www.m2midias.com.br")
