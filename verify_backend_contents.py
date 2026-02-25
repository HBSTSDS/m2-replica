import ftplib
import os

HOST = "m2flex.com.br"
PORT = 21
USER = "marketing@m2flex.com.br"
PASS = "Mkt#2026"

def list_dir_contents(ftp, path):
    print(f"\nListing contents of {path}:")
    try:
        lines = []
        ftp.dir(path, lines.append)
        for l in lines:
            print(f"  {l}")
    except Exception as e:
        print(f"  Error: {e}")

try:
    ftp = ftplib.FTP(timeout=30)
    ftp.connect(HOST, PORT)
    ftp.login(USER, PASS)
    ftp.set_pasv(True)
    print("Connected!")
    
    list_dir_contents(ftp, "/public_html/api")
    list_dir_contents(ftp, "/public_html/cms")
    list_dir_contents(ftp, "/public_html/m2-cms")
    
    ftp.quit()
except Exception as e:
    print(f"Connection error: {e}")
