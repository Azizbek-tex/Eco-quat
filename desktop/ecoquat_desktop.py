"""
EcoҚуат — настольная версия для Windows.
Открывает веб-приложение из папки app в отдельном окне (движок Edge WebView2).
Сборка в .exe:  build_exe.bat
"""
import os
import sys
import threading
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

import webview

PORT = 47391          # постоянный порт: данные (localStorage) привязаны к адресу
APP_NAME = "EcoҚуат"


def resource_dir():
    base = getattr(sys, "_MEIPASS", os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    return os.path.join(base, "app")


def data_dir():
    path = os.path.join(os.environ.get("LOCALAPPDATA", os.path.expanduser("~")), "EcoQuat")
    os.makedirs(path, exist_ok=True)
    return path


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass

    def end_headers(self):
        self.send_header("Cache-Control", "no-cache")
        super().end_headers()


def start_server():
    handler = partial(QuietHandler, directory=resource_dir())
    try:
        server = ThreadingHTTPServer(("127.0.0.1", PORT), handler)
    except OSError:
        return None            # порт занят — значит программа уже открыта, используем её сервер
    threading.Thread(target=server.serve_forever, daemon=True).start()
    return server


class Api:
    """Функции, которые вызывает JavaScript (window.pywebview.api.*)."""

    def save_file(self, name, text):
        win = webview.windows[0]
        result = win.create_file_dialog(webview.SAVE_DIALOG, save_filename=name)
        if not result:
            return None
        path = result if isinstance(result, str) else result[0]
        with open(path, "w", encoding="utf-8", newline="") as f:
            f.write(text)
        return path


def main():
    start_server()
    webview.create_window(APP_NAME, f"http://127.0.0.1:{PORT}/index.html", js_api=Api(),
                          width=1360, height=880, min_size=(380, 640), background_color="#070b1a")
    webview.start(private_mode=False, storage_path=data_dir(), icon=os.path.join(resource_dir(), "icons", "app.ico"))


if __name__ == "__main__":
    main()
