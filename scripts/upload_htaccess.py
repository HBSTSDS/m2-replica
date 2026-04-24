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

# .htaccess ROBUSTO (M2 Flex & M2 Midias)
HTACCESS_CONTENT = """# ======================================
# CONFIGURAÇÕES GERAIS
# ======================================

Options -MultiViews
DirectoryIndex index.html index.php

RewriteEngine On

# ======================================
# REDIRECIONAMENTOS LEGADOS (MANTÉM COMPATIBILIDADE)
# ======================================

RewriteRule ^php/api/(.*)$ /api/$1 [R=301,L]
RewriteRule ^php/cms/(.*)$ /cms/$1 [R=301,L]

# Força o index.php se acessar a pasta /cms/ pura (evita 403)
RewriteRule ^cms/$ /cms/index.php [L]
RewriteRule ^cms$ /cms/index.php [L]

# ======================================
# REDIRECT WWW → SEM WWW (CANONICAL)
# ======================================

# m2flex www → sem www
RewriteCond %{HTTP_HOST} ^www\\.m2flex\\.com\\.br$ [NC]
RewriteRule ^ https://m2flex.com.br%{REQUEST_URI} [R=301,L]

# m2midias www → sem www
RewriteCond %{HTTP_HOST} ^www\\.m2midias\\.com\\.br$ [NC]
RewriteRule ^ https://m2midias.com.br%{REQUEST_URI} [R=301,L]

# ======================================
# REACT ROUTER → index.html (ROBUSTO)
# ======================================

# Se o arquivo ou diretório existir Fisicamente, não reescreve
RewriteCond %{REQUEST_FILENAME} -f [OR]
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^ - [L]

# Casos específicos para garantir acesso ao backend
RewriteRule ^api/ - [L]
RewriteRule ^cms/ - [L]
RewriteRule ^m2-cms/ - [L]
RewriteRule ^docs/ - [L]

# Caso contrário, roteia para o index.html do React
RewriteRule ^ index.html [L]
"""

def connect():
    print(f"Conectando em {HOST}...")
    try:
        ftp = ftplib.FTP_TLS(timeout=30)
        ftp.connect(HOST, PORT)
        ftp.auth()
        ftp.login(USER, PASS)
        ftp.prot_p()
        ftp.set_pasv(True)
        print("Autenticado via FTPS!")
        return ftp
    except Exception as e:
        print(f"Erro: {e}")
        return None

def main():
    ftp = connect()
    if not ftp: return

    content = HTACCESS_CONTENT.encode("utf-8")
    
    # Upload para /public_html/.htaccess (m2flex.com.br)
    try:
        ftp.storbinary("STOR /public_html/.htaccess", io.BytesIO(content))
        print("[OK] /public_html/.htaccess enviado")
    except Exception as e:
        print(f"[ERRO] /public_html/.htaccess: {e}")

    # Upload para /.htaccess (m2midias.com.br)
    try:
        ftp.storbinary("STOR /.htaccess", io.BytesIO(content))
        print("[OK] /.htaccess enviado (raiz)")
    except Exception as e:
        print(f"[ERRO] /.htaccess (raiz): {e}")

    ftp.quit()
    print("\nConcluído!")

if __name__ == "__main__":
    main()
