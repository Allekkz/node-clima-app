function buscar() {
    const cidadeInput = document.getElementById("cidadeInput");
    const city = cidadeInput.value.trim().toLowerCase();

    if (cidadeInput.value !== "" && cidadeInput.value.length > 3) {
        fetch(`http://localhost:3000/clima/${encodeURIComponent(city)}`)
            .then(resposta => resposta.json())
            .then(dados => {
                const cidade = document.getElementById("cidade");
                cidade.textContent = dados.cidade;
                const pais = document.getElementById("pais");
                pais.textContent = dados.pais;

                const temperatura = document.getElementById("temperatura");
                temperatura.textContent = Math.round(dados.temperatura) + "°";

                const umidade = document.getElementById("umidade");
                umidade.textContent = dados.umidade + "%";

                const center = document.getElementById("center");
                const result = document.getElementById("result");
                const stats = document.getElementById("stats");

                if(dados.temperatura > 23) {
                    document.getElementById("headerStats").textContent = "Neste momento, está fazendo calor em " + dados.cidade + "!";
                    document.getElementById("icone").textContent = "local_fire_department";
                }
                else {
                    document.getElementById("headerStats").textContent = "Neste momento, está fazendo frio em " + dados.cidade + "!";
                    document.getElementById("icone").textContent = "ac_unit";
                }

                result.classList.remove("hidden");
                stats.classList.remove("hidden");
                center.classList.remove("mt-60");
                center.classList.add("mt-20");

            })
            .catch(err => {
                alert("Erro no servidor: " + err.message);
            })

        cidadeInput.value = "";
    }
    else {
        alert("Por favor, informe uma cidade!")
    }
}