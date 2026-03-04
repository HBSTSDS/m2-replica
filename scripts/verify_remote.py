import ftplib
import os

HOST = "m2flex.com.br"
USER = "marketing@m2flex.com.br"
PASS = "Mkt#2026"

def list_recursive(ftp, path):
    print(f"\nListing {path}:")
    try:
        files = ftp.nlst(path)
        for f in files:
            print(f"  {f}")
    except Exception as e:
        print(f"  Error: {e}")

def main():
    ftp = ftplib.FTP(HOST)
    ftp.login(USER, PASS)
    
    print("--- ROOT ---")
    list_recursive(ftp, "")
    
    print("\n--- public_html ---")
    list_recursive(ftp, "/public_html")
    
    print("\n--- public_html/api ---")
    list_recursive(ftp, "/public_html/api")
    
    ftp.quit()

if __name__ == "__main__":
    main()
