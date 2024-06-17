import express from "express";
import bodyParser from "body-parser";
import sql from "msnodesqlv8";

const app = express();
app.use(bodyParser.json());
const PORT = 3000;
const connectionString = "server=DSN1191109174;Database=products;Trusted_Connection=Yes;Driver={Sql Server Native Client 11.0}";

// Buscar todos os registros
app.get("/products", (req, res) => {
    sql.query(connectionString, "SELECT * FROM product", (erro, rows) => {
        if (erro) {
            res.status(500).json("Erro Interno de Servidor");
        } else {
            res.status(200).json(rows);
        }
    });
});

// Buscar um registro específico
app.get("/products/:id", (req, res) => {
    const { id } = req.params;
    sql.query(connectionString, `SELECT * FROM product WHERE id = ?`, [id], (erro, rows) => {
        if (erro) {
            res.status(500).json("Erro Interno de Servidor");
        } else {
            res.status(200).json(rows);
        }
    });
});

// Criar um registro
app.post("/products", (req, res) => {
    const { description, cost, price } = req.body;
    sql.query(
        connectionString,
        `INSERT INTO product (description, cost, price) VALUES (?, ?, ?)`,
        [description, cost, price],
        (erro, rows) => {
            if (erro) {
                res.status(500).json("Erro Interno de Servidor");
            } else {
                res.status(201).json("Cadastrado com sucesso!");
            }
        }
    );
});

// Atualizar um registro
app.put("/products/:id", (req, res) => {
    const { id } = req.params;
    const { description, cost, price } = req.body;
    sql.query(
        connectionString, 
        `UPDATE product SET description = ?, cost = ?, price = ? WHERE id = ?`,
        [description, cost, price, id],
        (erro, rows) => {
            if (erro) {
                res.status(500).json("Erro Interno de Servidor");
            } else {
                res.status(200).json("Atualizado com Sucesso");
            }
        }
    );
});

// Deletar um registro
app.delete("/products/:id", (req, res) => {
    const { id } = req.params;
    sql.query(
        connectionString,
        `DELETE FROM product WHERE id = ?`,
        [id],
        (erro, rows) => {
            if (erro) {
                res.status(500).json("Erro Interno de Servidor");
            } else {
                res.status(200).json("Excluído com Sucesso!");
            }
        }
    );
});

app.listen(PORT, () => console.log(`Server rodando na porta ${PORT}`));
