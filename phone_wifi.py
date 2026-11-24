"""
Открыть EcoҚуат на телефоне через домашний Wi-Fi (для проверки и показа).
Запуск: python phone_wifi.py — затем откройте на телефоне адрес, который напишет программа.
Телефон и компьютер должны быть в одной сети Wi-Fi.
"""
import os
import socket
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

PORT = 8080
APP = os.path.join(os.path.dirname(os.path.abspath(__file__)), "app")


def local_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(("10.255.255.255", 1))
        return s.getsockname()[0]
    except OSError:
        return "127.0.0.1"
    finally:
        s.close()


if __name__ == "__main__":
    server = ThreadingHTTPServer(("0.0.0.0", PORT), partial(SimpleHTTPRequestHandler, directory=APP))
    print("\n  EcoҚуат запущен.")
    print(f"  Откройте на телефоне:  http://{local_ip()}:{PORT}\n")
    print("  Чтобы остановить — закройте это окно (или Ctrl+C).")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
