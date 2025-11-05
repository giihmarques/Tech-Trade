from flask import Blueprint, jsonify, render_template, request, abort
from datetime import datetime
from src.utils.bd import ConexaoBD

rotas_produto = Blueprint("produto", __name__)

# ------------------- RENDERIZAÇÃO DE PÁGINAS -------------------

@rotas_produto.get("/produtos")
def renderizar_produtos():
    """Renderiza a página de listagem de produtos"""
    print ("Renderizando página de produtos...")
    try:
        return render_template("produtos.html")
    except Exception as err:
        print(f"Erro ao renderizar produtos: {err}")
        abort(404)

# ------------------- CONSULTAS AO BANCO -------------------

@rotas_produto.get("/categorias")
def consultar_categorias_produtos():
    """Retorna as categorias dos produtos"""
    try:
        conexao = ConexaoBD()
        categorias = conexao.select("SELECT id_categoria, nome FROM categorias_produtos_tt")
        conexao.close()
        return jsonify(categorias)
    except Exception as err:
        erro = str(err).replace("'", '"')
        return jsonify({"erro": erro}), 500


@rotas_produto.get("/produtos/registros")
def consultar_produtos():
    """Retorna a lista de produtos"""
    try:
        conexao_bd = ConexaoBD()
        retorno_bd = conexao_bd.select("""
            SELECT 
                p.id_produto,
                p.nome,
                c.nome AS categoria,
                p.preco,
                p.estoque,
                p.criado_em,
                p.criado_por
            FROM produtos_tt p
            LEFT JOIN categorias_produtos_tt c ON p.categoria_id = c.id_categoria
            ORDER BY p.id_produto DESC
        """)
        conexao_bd.close()

        def formata_data(data):
            if isinstance(data, datetime):
                return data.strftime('%d/%m/%Y')
            return str(data) if data else ""

        def safe_float(x):
            try:
                return float(x) if x is not None else 0.0
            except (TypeError, ValueError):
                return 0.0

        def safe_int(x):
            try:
                return int(x) if x is not None else 0
            except (TypeError, ValueError):
                try:
                    return int(float(x))
                except Exception:
                    return 0

        json_produtos = []
        for p in retorno_bd:
            row = tuple(p)
            preco_val = safe_float(row[3])
            estoque_val = safe_int(row[4])
            criado = row[5]

            json_produtos.append({
                "id_produto": row[0],
                "nome": row[1] or "",
                "categoria": row[2] or "",
                "preco": round(preco_val, 2),
                "preco_formatado": f"{preco_val:,.2f}".replace(',', 'X').replace('.', ',').replace('X', '.'),
                "estoque": estoque_val,
                "disponivel": estoque_val > 0,
                "criado_em": formata_data(criado),
                "criado_em_iso": criado.isoformat() if isinstance(criado, datetime) else (str(criado) if criado else ""),
                "criado_por": row[6] or ""
            })

        return jsonify({"json_produtos": json_produtos})

    except Exception as err:
        erro = str(err).replace("'", '"')
        return jsonify({"erro": erro}), 500
    
# ------------------- CADASTRO DE VENDEDORES -------------------

@rotas_produto.route('/api/vendedores', methods=['POST'])
def cadastrar_vendedor():
    try:
        dados = request.get_json()

        nome = dados.get('nome')
        email = dados.get('email')
        senha = dados.get('senha')
        meio_comunicacao = dados.get('meio_comunicacao')

        # --- Validação básica ---
        if not nome or not email or not senha or not meio_comunicacao:
            return jsonify({"erro": "Campos obrigatórios faltando"}), 400

        # --- Inserir no banco de dados ---
        conexao = ConexaoBD()
        sql = """
            INSERT INTO vendedores_tt (nome, email, senha, meio_comunicacao, criado_em)
            VALUES (%s, %s, %s, %s, NOW())
        """
        conexao.insert(sql, (nome, email, senha, meio_comunicacao))
        conexao.close()

        print(f"✅ Novo vendedor cadastrado: {nome} ({meio_comunicacao})")

        return jsonify({"mensagem": "Vendedor cadastrado com sucesso!"}), 201

    except Exception as e:
        return jsonify({"erro": str(e)}), 500

    