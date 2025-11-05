from flask import Blueprint, render_template

rotas_teste = Blueprint("teste", __name__)

@rotas_teste.get("/techtrade/teste")
def renderizar_teste():
    return render_template("techtrade/teste.html")