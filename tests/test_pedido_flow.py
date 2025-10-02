import sys, os
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
if ROOT not in sys.path:
    sys.path.insert(0, ROOT)

from produto import app

with app.test_client() as c:
    # simula submissão do formulário
    resp = c.post('/pedido_finalizado', data={
        'nome': 'Giova',
        'endereco': 'Rua Teste, 123',
        'pagamento': 'PIX',
        'product_title': 'Iphone 13 - Usado',
        'product_price': '670'
    })
    print('status:', resp.status_code)
    print(resp.get_data(as_text=True)[:1000])
