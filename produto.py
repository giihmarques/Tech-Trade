import os
import sqlite3
from flask import Flask, render_template, g, request

# Se for usar MySQL, precisa instalar mysql-connector-python
try:
    import mysql.connector as mysql_connector
    from mysql.connector import errorcode as mysql_errorcode
except ImportError:
    mysql_connector = None

# Configuração do Flask
app = Flask(__name__, static_folder='.', static_url_path='')

# Configurações de DB
MYSQL_HOST = os.environ.get('MYSQL_HOST')
MYSQL_PORT = int(os.environ.get('MYSQL_PORT', 3306)) if os.environ.get('MYSQL_PORT') else 3306
MYSQL_USER = os.environ.get('MYSQL_USER')
MYSQL_PASSWORD = os.environ.get('MYSQL_PASSWORD')
MYSQL_DB = os.environ.get('MYSQL_DB')

USE_MYSQL = bool(MYSQL_HOST and MYSQL_USER and MYSQL_DB and mysql_connector)

SQLITE_FILENAME = os.path.join(app.root_path, 'tech_trade.db')


def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        if USE_MYSQL:
            db = g._database = mysql_connector.connect(
                host=MYSQL_HOST,
                port=MYSQL_PORT,
                user=MYSQL_USER,
                password=MYSQL_PASSWORD,
                database=MYSQL_DB,
                autocommit=True
            )
        else:
            db = g._database = sqlite3.connect(SQLITE_FILENAME)
            db.row_factory = sqlite3.Row
    return db


def init_db():
    """Inicializa o DB e cria a tabela products com dados de exemplo se estiver vazia."""
    if USE_MYSQL:
        # Cria database se não existir
        try:
            tmp = mysql_connector.connect(host=MYSQL_HOST, port=MYSQL_PORT, user=MYSQL_USER, password=MYSQL_PASSWORD)
            tmp_cursor = tmp.cursor()
            tmp_cursor.execute(f"CREATE DATABASE IF NOT EXISTS `{MYSQL_DB}` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci")
            tmp.close()
        except mysql_connector.Error as err:
            print("Erro ao criar/verificar database:", err)
            return

        conn = mysql_connector.connect(host=MYSQL_HOST, port=MYSQL_PORT, user=MYSQL_USER, password=MYSQL_PASSWORD, database=MYSQL_DB, autocommit=True)
        cur = conn.cursor(dictionary=True)
        cur.execute('''
            CREATE TABLE IF NOT EXISTS products (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                image VARCHAR(255),
                old_price DECIMAL(10,2),
                price DECIMAL(10,2),
                location VARCHAR(255),
                installments VARCHAR(50),
                stock INT DEFAULT 0
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        ''')
        cur.execute('SELECT COUNT(1) AS cnt FROM products')
        row = cur.fetchone()
        if row and row.get('cnt', 0) == 0:
            sample = [
                ("Iphone 13 - Usado", "tech_trade_imagens/iphone_venda1.jpg", 800, 670, "S. Bernardo do Campo", "6x", 1),
                ("Iphone 11 - Usado", "tech_trade_imagens/iphone_venda2.jpeg", 600, 580, "São Caetano do Sul", "6x", 2),
                ("Iphone 15 - Semi Novo", "tech_trade_imagens/iphone_venda3.jpeg", 980, 890, "Santo André", "6x", 1),
            ]
            cur.executemany('INSERT INTO products (title, image, old_price, price, location, installments, stock) VALUES (%s, %s, %s, %s, %s, %s, %s)', sample)
        cur.close()
        conn.close()
    else:
        need_seed = not os.path.exists(SQLITE_FILENAME)
        conn = sqlite3.connect(SQLITE_FILENAME)
        cur = conn.cursor()
        cur.execute('''
            CREATE TABLE IF NOT EXISTS products (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                image TEXT,
                old_price REAL,
                price REAL,
                location TEXT,
                installments TEXT,
                stock INTEGER DEFAULT 0
            )
        ''')
        conn.commit()
        if need_seed:
            sample = [
                ("Iphone 13 - Usado", "tech_trade_imagens/iphone_venda1.jpg", 800, 670, "S. Bernardo do Campo", "6x", 1),
                ("Iphone 11 - Usado", "tech_trade_imagens/iphone_venda2.jpeg", 600, 580, "São Caetano do Sul", "6x", 2),
                ("Iphone 15 - Semi Novo", "tech_trade_imagens/iphone_venda3.jpeg", 980, 890, "Santo André", "6x", 1),
            ]
            cur.executemany('INSERT INTO products (title, image, old_price, price, location, installments, stock) VALUES (?, ?, ?, ?, ?, ?, ?)', sample)
            conn.commit()
        cur.close()
        conn.close()


@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        try:
            db.close()
        except Exception:
            pass


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/login")
def login():
    return render_template("login.html")


@app.route("/produtos")
def produtos():
    try:
        init_db()
        db = get_db()
        if USE_MYSQL:
            cur = db.cursor(dictionary=True)
            cur.execute('SELECT id, title, image, old_price, price, location, installments, stock FROM products')
            rows = cur.fetchall()
            products = [dict(r) for r in rows]
        else:
            cur = db.execute('SELECT id, title, image, old_price, price, location, installments, stock FROM products')
            rows = cur.fetchall()
            products = [dict(row) for row in rows]
    except Exception as e:
        print('Aviso: não foi possível obter produtos do DB, usando dados de exemplo. Erro:', e)
        products = [
            {'id': 1, 'title': 'Iphone 13 - Usado', 'image': 'tech_trade_imagens/iphone_venda1.jpg', 'old_price': 800, 'price': 670, 'location': 'S. Bernardo do Campo', 'installments': '6x', 'stock': 1},
        ]

    for p in products:
        if p.get('image') and not p['image'].startswith('/'):
            p['image_url'] = '/' + p['image']
        else:
            p['image_url'] = p.get('image') or '/tech_trade_imagens/placeholder.jpg'
    return render_template("produtos.html", products=products)


@app.route("/confirmar_compra")
def confirmar_compra():
    return render_template("confirmar_compra.html")


@app.route("/pedido_finalizado", methods=['GET', 'POST'])
def pedido_finalizado():
    if request.method == 'POST' or request.form:
        nome = request.form.get('nome', 'cliente')
        endereco = request.form.get('endereco', '')
        pagamento = request.form.get('pagamento', '')
        product_title = request.form.get('product_title', 'Produto')
        product_price = request.form.get('product_price', '')
        return render_template('pedido_finalizado.html', cliente_nome=nome, endereco=endereco, pagamento=pagamento, product_title=product_title, product_price=product_price)
    return render_template("pedido_finalizado.html")


if __name__ == "__main__":
    init_db()
    app.run(debug=True)
