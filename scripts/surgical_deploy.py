import ftplib
import os

try:
    from config_local import FTP_HOST, FTP_PORT, FTP_USER, FTP_PASS
except ImportError:
    print("Error: config_local.py not found.")
    exit(1)

BASE_DIR = os.path.dirname(__file__)
DIST_DIR = os.path.join(BASE_DIR, "dist")
PHP_API_FILE = os.path.join(BASE_DIR, "php", "api", "submit-form.php")
PHP_TEST_FILE = os.path.join(BASE_DIR, "php", "api", "test_mail.php")

def connect():
    print(f"Connecting to {FTP_HOST}...", flush=True)
    ftp = ftplib.FTP(timeout=60)
    ftp.connect(FTP_HOST, FTP_PORT)
    ftp.login(FTP_USER, FTP_PASS)
    ftp.set_pasv(True)
    print("Authenticated!", flush=True)
    return ftp

def upload_file(ftp, local_path, remote_path):
    print(f"Uploading {local_path} -> {remote_path}...", flush=True)
    with open(local_path, "rb") as f:
        ftp.storbinary(f"STOR {remote_path}", f)
    print("Done.", flush=True)

def main():
    ftp = connect()
    
    # 1. Update Backend
    upload_file(ftp, PHP_API_FILE, "/api/submit-form.php")
    upload_file(ftp, PHP_TEST_FILE, "/api/test_mail.php")
    
    # 2. Update Frontend (Dist)
    upload_file(ftp, os.path.join(DIST_DIR, "index.html"), "/public_html/index.html")
    upload_file(ftp, os.path.join(DIST_DIR, "assets", "index-DKUA3mSm.js"), "/public_html/assets/index-DKUA3mSm.js")
    upload_file(ftp, os.path.join(DIST_DIR, "assets", "style-DavlGXKM.css"), "/public_html/assets/style-DavlGXKM.css")
    upload_file(ftp, os.path.join(DIST_DIR, "assets", "vendor-DSUsKwux.js"), "/public_html/assets/vendor-DSUsKwux.js")
    
    print("Surgical deploy finished!", flush=True)
    ftp.quit()

if __name__ == "__main__":
    main()
