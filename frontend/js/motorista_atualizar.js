const btn_atualizar = document.getElementById('btn_atualizar');
const resposta = document.getElementById('resposta');

btn_atualizar.addEventListener('click', (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    if (!token) {
        resposta.innerHTML = '<p>Você precisa fazer login primeiro.</p>';
        return;
    }

    const id = document.getElementById('codMotorista').value;
    const valores = {};

    if (document.getElementById('nome').value) valores.nome = document.getElementById('nome').value;
    if (document.getElementById('cnh').value) valores.cnh = document.getElementById('cnh').value;
    if (document.getElementById('cpf').value) valores.cpf = document.getElementById('cpf').value;
    if (document.getElementById('telefone').value) valores.telefone = document.getElementById('telefone').value;

    fetch(`http://localhost:3000/motorista/${id}`, {
        method: 'PUT',
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
            console.error('Erro ao atualizar motorista:', err);
            resposta.innerHTML = '<p>Erro ao tentar conectar com o servidor.</p>';
        });
});
