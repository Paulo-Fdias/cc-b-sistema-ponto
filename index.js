const diaSemana = document.getElementById('diaSemana');
const diaMesAno = document.getElementById('diaMesAno');
const horaMinSeg = document.getElementById('horaMinSeg');
const botaoPonto = document.getElementById('botaoPonto');
const modalEscolha = document.getElementById('modalEscolha');
const modalPonto = document.getElementById('modalPonto');
const closeEscolha = document.getElementById('closeEscolha');
const closeModal = document.getElementById('closeModal');
const botaoEntrada = document.getElementById('botaoEntrada');
const botaoSaida = document.getElementById('botaoSaida');
const botaoIntervalo = document.getElementById('botaoIntervalo');
const botaoVoltaIntervalo = document.getElementById('botaoVoltaIntervalo');
const confirmarPonto = document.getElementById('confirmarPonto');
const modalInfo = document.getElementById('modalInfo');
let timeoutInatividade;

function getCurrentDate() {
    const data = new Date();
    return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
}

function getCurrentHour() {
    const data = new Date();
    return `${data.getHours().toString().padStart(2, '0')}:${data.getMinutes().toString().padStart(2, '0')}:${data.getSeconds().toString().padStart(2, '0')}`;
}

function getWeekDay() {
    const data = new Date();
    const dias = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    return dias[data.getDay()];
}

function atualizarDataHora() {
    diaSemana.textContent = getWeekDay();
    diaMesAno.textContent = getCurrentDate();
    horaMinSeg.textContent = getCurrentHour();
}

function atualizarModalInfo() {
    const dataHora = `${getWeekDay()}, ${getCurrentDate()} ${getCurrentHour()}`;
    modalInfo.textContent = dataHora;
}

function mostrarModalEscolha() {
    atualizarModalInfo();
    modalEscolha.style.display = "block";
}

function fecharModalEscolha() {
    modalEscolha.style.display = "none";
}

function mostrarModalPonto(tipo) {
    modalEscolha.style.display = "none";
    modalPonto.style.display = "block";
    document.querySelector('#modalPonto h2').textContent = `Bater Ponto - ${tipo}`;
    timeoutInatividade = setTimeout(fecharModalPonto, 300000); 
}

function fecharModalPonto() {
    modalPonto.style.display = "none";
    clearTimeout(timeoutInatividade);
}

function registrarPonto(tipo) {
    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;

    if (nome && cpf) {
        const registros = document.getElementById('registros');
        const dataHora = `${getCurrentDate()} ${getCurrentHour()}`;
        registros.innerHTML += `<p>${dataHora} - ${tipo} - ${nome} - CPF: ${cpf}</p>`;
        fecharModalPonto();
    } else {
        alert("Por favor, preencha todos os campos!");
    }
}

botaoPonto.addEventListener('click', mostrarModalEscolha);
closeEscolha.addEventListener('click', fecharModalEscolha);
closeModal.addEventListener('click', fecharModalPonto);

botaoEntrada.addEventListener('click', () => mostrarModalPonto("Entrada"));
botaoSaida.addEventListener('click', () => mostrarModalPonto("Saída"));
botaoIntervalo.addEventListener('click', () => mostrarModalPonto("Intervalo"));
botaoVoltaIntervalo.addEventListener('click', () => mostrarModalPonto("Volta Intervalo"));
confirmarPonto.addEventListener('click', () => registrarPonto(document.querySelector('#modalPonto h2').textContent.split(" - ")[1]));

window.addEventListener('click', function(event) {
    if (event.target == modalEscolha) {
        fecharModalEscolha();
    }
    if (event.target == modalPonto) {
        fecharModalPonto();
    }
});

setInterval(atualizarDataHora, 1000);
atualizarDataHora(); 