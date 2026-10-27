const btn_apagar = document.getElementById('btn_apagar');
const resposta = document.getElementById('resposta');

btn_apagar.addEventListener('click', (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    if (!token) {
        resposta.innerHTML = '<p>Você precisa fazer login primeiro.</p>';
        return;
    }

    const id = document.getElementById('codMotorista').value;

    fetch(`http://localhost:3000/motorista/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': token
        }
    })
        .then(res => res.json())
        .then(dados => {
            resposta.innerHTML = `<p>${dados.message}</p>`;
            document.querySelector('form').reset();
        })
        .catch(err => {
            console.error('Erro ao apagar motorista:', err);
            resposta.innerHTML = '<p>Erro ao tentar conectar com o servidor.</p>';
        });
});
