import argparse
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


LAB = Path(__file__).resolve().parent.parent
REDACTOR = LAB.parent / "screenshot-redactor"


class PreviewHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(LAB), **kwargs)

    def translate_path(self, path):
        local_path = Path(super().translate_path(path))
        parts = local_path.relative_to(LAB).parts
        if parts and parts[0] == "screenshot-redactor":
            return str(REDACTOR.joinpath(*parts[1:]))
        return str(local_path)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Preview the home site and its screenshot editor.")
    parser.add_argument("--port", type=int, default=8785)
    args = parser.parse_args()
    if not (REDACTOR / "index.html").is_file():
        parser.error("The screenshot-redactor checkout must be beside this repository.")
    with ThreadingHTTPServer(("127.0.0.1", args.port), PreviewHandler) as server:
        print(f"http://127.0.0.1:{server.server_port}/", flush=True)
        server.serve_forever()
