const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.static("public"));
app.use(cors());

const API_KEY = "ac9e4295760764a224f70c1e09c9f5ba";

//Rota padrão:
app.get("/", (req, res) => {
    res.send("Servidor rodando!")
})

//Rota principal:
app.get("/clima/:cidade", (req, res) => {
    const cidade = req.params.cidade;

    if (!cidade) {
        return res.status(400).send("A cidade não foi informada!");
        //status(400) = bad request // pedido errado - lado do cliente;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${API_KEY}&units=metric&lang=pt_br`;

    fetch(url)
        .then(resposta => {
            if (!resposta.ok) {
                res.status(404).send("Cidade não encontrada");
                return null;
                //status(404) = not found // não achou o que foi pedido;
            }
            return resposta.json();
        })
        .then(dados => {
            if (dados === null) return;
            res.json({
                cidade: dados.name,
                temperatura: dados.main.temp,
                descricao: dados.weather[0].description,
                umidade: dados.main.humidity,
                pais: dados.sys.country,
            })
        })
        .catch(err => {
            console.log(err);
           res.status(500).send("Erro ao buscar dados do clima! " + err);
        })
})

//servidor:
app.listen(3000, "0.0.0.0", () => {
    console.log("Servidor rodando para rede!");
})