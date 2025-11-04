import sys
from os import path
import builtins

PROJECT_ROOT = path.abspath(path.dirname(__file__))
if PROJECT_ROOT not in sys.path:
    sys.path.insert(0, PROJECT_ROOT)

try:
    from src.utils.bd import ConexaoBD
    print('OK: ConexaoBD importada ->', ConexaoBD, flush=True)
except Exception as e:
    print('ERRO IMPORT:', type(e).__name__, e, flush=True)
