const btn_listar = document.getElementById('btn_listar');
const resposta = document.getElementById('resposta');
const lista = document.getElementById('lista_motoristas');

btn_listar.addEventListener('click', (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    if (!token) {
        resposta.innerHTML = '<p>Você precisa fazer login primeiro.</p>';
        return;
    }

    fetch('http://localhost:3000/motorista', {
        method: 'GET',
        headers: {
            'Authorization': token
        }
    })
        .then(res => res.json())
        .then(dados => {
            lista.innerHTML = '';
            if (!dados.length) {
                resposta.innerHTML = '<p>Nenhum motorista encontrado.</p>';
                return;
            }

            resposta.innerHTML = '';
            dados.forEach((motorista) => {
                const item = document.createElement('div');
                item.className = 'item_motorista';
                item.innerHTML = `
                    <strong>Nome:</strong> ${motorista.nome}<br>
                    <strong>CPF:</strong> ${motorista.cpf}<br>
                    <strong>CNH:</strong> ${motorista.cnh}<br>
                    <strong>Telefone:</strong> ${motorista.telefone}
                `;
                lista.appendChild(item);
            });
        })
        .catch(err => {
            console.error('Erro ao listar motoristas:', err);
            resposta.innerHTML = '<p>Erro ao tentar conectar com o servidor.</p>';
        });
});
