import ftplib
import os

try:
    from config_local import FTP_HOST, FTP_PORT, FTP_USER, FTP_PASS
except ImportError:
    print("Error: config_local.py not found.")
    exit(1)

def connect():
    ftp = ftplib.FTP(timeout=30)
    ftp.connect(FTP_HOST, FTP_PORT)
    ftp.login(FTP_USER, FTP_PASS)
    ftp.set_pasv(True)
    return ftp

def main():
    ftp = connect()
    paths = ["/public_html/api/", "/api/"]
    for p in paths:
        print(f"--- Listing {p} ---")
        try:
            print(ftp.nlst(p))
        except Exception as e:
            print(f"Error listing {p}: {e}")
    ftp.quit()

if __name__ == "__main__":
    main()
