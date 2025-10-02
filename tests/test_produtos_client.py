import sys
import os

# garante que o diretório do projeto esteja no path
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
if ROOT not in sys.path:
    sys.path.insert(0, ROOT)

from produto import app

with app.test_client() as c:
    resp = c.get('/produtos')
    print('status:', resp.status_code)
    data = resp.get_data(as_text=True)
    snippet = data[:2000]
    print(snippet)
