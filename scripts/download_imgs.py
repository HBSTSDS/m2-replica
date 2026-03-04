import os
import urllib.request

base_url = "https://flaviobrick.com.br/assets_externos/assets/supermercados/"
local_dir = r"c:\Users\m2flex\Desktop\m2-replica\src\assets\supermercados"

files = [
    "1-mercado.jpeg",
    "2-mercado.jpeg",
    "3-mercado.jpeg",
    "4-mercado.jpg",
    "5-mercado.jpeg",
    "6-mercado.jpeg",
    "7-mercado.jpeg",
    "8-mercado.jpeg",
    "foto-site-mercado.png",
    "header.png"
]

if not os.path.exists(local_dir):
    os.makedirs(local_dir)

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}

for f in files:
    url = base_url + f
    dst = os.path.join(local_dir, f)
    print(f"Downloading {url} to {dst}...", flush=True)
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as response, open(dst, 'wb') as out_file:
            out_file.write(response.read())
        print("Done.", flush=True)
    except Exception as e:
        print(f"Error downloading {f}: {e}", flush=True)
