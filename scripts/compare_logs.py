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

def read_log(ftp, log_path):
    print(f"\n--- Reading {log_path} ---")
    try:
        lines = []
        ftp.retrlines(f"RETR {log_path}", lines.append)
        for line in lines[-20:]: # Last 20 lines
            print(line)
    except Exception as e:
        print(f"Error reading log {log_path}: {e}")

def main():
    ftp = connect()
    read_log(ftp, "/api/mail_log.txt")
    read_log(ftp, "/public_html/api/mail_log.txt")
    ftp.quit()

if __name__ == "__main__":
    main()
