const btn_cadastrar = document.getElementById('btn_cadastrar');
const resposta = document.getElementById('resposta');

btn_cadastrar.addEventListener('click', (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    if (!token) {
        resposta.innerHTML = '<p>Você precisa fazer login primeiro.</p>';
        return;
    }

    const valores = {
        codEntrega: Number(document.getElementById('codEntrega').value),
        destino: document.getElementById('destino').value,
        status: document.getElementById('status').value,
        data: document.getElementById('data').value,
        hora: document.getElementById('hora').value,
        codCarga: Number(document.getElementById('codCarga').value)
    };

    fetch('http://localhost:3000/entrega', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(valores)
    })
        .then(res => res.json())
        .then(dados => {
            resposta.innerHTML = `<p>${dados.message}</p>`;
            document.querySelector('form').reset();
        })
        .catch(err => {
            console.error('Erro ao cadastrar entrega:', err);
            resposta.innerHTML = '<p>Erro ao tentar conectar com o servidor.</p>';
        });
});
