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
        descricao: document.getElementById('descricao').value,
        peso: Number(document.getElementById('peso').value),
        volume: Number(document.getElementById('volume').value),
        codigoRastreio: document.getElementById('codigoRastreio').value,
        codMotorista: Number(document.getElementById('codMotorista').value)
    };

    fetch('http://localhost:3000/carga', {
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
            console.error('Erro ao cadastrar carga:', err);
            resposta.innerHTML = '<p>Erro ao tentar conectar com o servidor.</p>';
        });
});
