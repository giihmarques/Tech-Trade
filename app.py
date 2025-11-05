from flask import Flask

from produto import rotas_produto

app = Flask(__name__)
app.register_blueprint(rotas_produto)


if __name__ == "__main__":
    app.run(debug=True)
