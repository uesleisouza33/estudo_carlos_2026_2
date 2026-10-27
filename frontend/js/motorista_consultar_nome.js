const btn_consultar = document.getElementById('btn_consultar');
const resposta = document.getElementById('resposta');

btn_consultar.addEventListener('click', (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    if (!token) {
        resposta.innerHTML = '<p>Você precisa fazer login primeiro.</p>';
        return;
    }

    const nome = document.getElementById('nome').value;

    fetch(`http://localhost:3000/motorista/nome/${encodeURIComponent(nome)}`, {
        method: 'GET',
        headers: {
            'Authorization': token
        }
    })
        .then(res => res.json())
        .then(dados => {
            if (dados.message) {
                resposta.innerHTML = `<p>${dados.message}</p>`;
                return;
            }

            resposta.innerHTML = `
                <p><strong>Código:</strong> ${dados.codMotorista}</p>
                <p><strong>Nome:</strong> ${dados.nome}</p>
                <p><strong>CPF:</strong> ${dados.cpf}</p>
                <p><strong>CNH:</strong> ${dados.cnh}</p>
                <p><strong>Telefone:</strong> ${dados.telefone}</p>
            `;
        })
        .catch(err => {
            console.error('Erro ao consultar motorista por nome:', err);
            resposta.innerHTML = '<p>Erro ao tentar conectar com o servidor.</p>';
        });
});
