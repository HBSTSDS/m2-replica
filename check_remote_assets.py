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

def check_assets():
    print(f"Connecting to {HOST}...")
    try:
        ftp = ftplib.FTP(timeout=30)
        ftp.connect(HOST, PORT)
        ftp.login(USER, PASS)
        
        print("Root directory contents:")
        files = ftp.nlst()
        for f in files:
            print(f" - '{f}'")
            
        if "public_html" in files:
            print("\nContents of /public_html:")
            ftp.cwd("/public_html")
            public_files = ftp.nlst()
            for f in public_files:
                print(f" - '{f}'")
                
            if "assets_externos" in public_files:
                print("\nContents of /public_html/assets_externos:")
                ftp.cwd("assets_externos")
                ext_files = ftp.nlst()
                for f in ext_files:
                    print(f" - '{f}'")
                
                if "assets" in ext_files:
                    print("\nContents of /public_html/assets_externos/assets:")
                    ftp.cwd("assets")
                    assets_files = ftp.nlst()
                    for f in assets_files:
                        print(f" - '{f}'")
                        
                    if "envelopamento" in assets_files:
                        print("\nContents of /public_html/assets_externos/assets/envelopamento:")
                        ftp.cwd("envelopamento")
                        env_files = ftp.nlst()
                        for f in env_files:
                            print(f" - '{f}'")
        
        ftp.quit()
    except Exception as e:
        print(f"Failed: {e}")

if __name__ == "__main__":
    check_assets()
