import ftplib
import os
try:
    from config_local import FTP_HOST, FTP_PORT, FTP_USER, FTP_PASS
    print(f"Connecting to {FTP_HOST}...")
    ftp = ftplib.FTP(timeout=10)
    ftp.connect(FTP_HOST, FTP_PORT)
    ftp.login(FTP_USER, FTP_PASS)
    print("Logged in!")
    print(ftp.nlst())
    ftp.quit()
    print("Success!")
except Exception as e:
    print(f"Error: {e}")
