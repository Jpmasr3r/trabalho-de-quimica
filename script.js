function distribuirEletrons(numeroAtomico) {
    const subniveis = ['1s', '2s', '2p', '3s', '3p', '4s', '3d', '4p', '5s', '4d', '5p', '6s', '4f', '5d', '6p', '7s', '5f', '6d', '7p'];
    const capacidadeSubnivel = {
        's': 2,
        'p': 6,
        'd': 10,
        'f': 14
    };

    let distribuicao = [];
    let camadaValencia = '';
    let eletronsValencia = 0;
    let subnivelMaisEnergetico = '';
    let eletronsNoSubnivelMaisEnergetico = 0;
    let eletronsRestantes = numeroAtomico;

    for (let i = 0; i < subniveis.length && eletronsRestantes > 0; i++) {
        const subnivel = subniveis[i];
        const n = parseInt(subnivel[0]); 
        const l = subnivel[1];            
        const capacidade = capacidadeSubnivel[l];
        const eletronsNoSubnivel = Math.min(capacidade, eletronsRestantes);

        distribuicao.push(`${subnivel}${eletronsNoSubnivel}`);
        eletronsRestantes -= eletronsNoSubnivel;

        if (eletronsRestantes > 0 || i === subniveis.length - 1) {
            subnivelMaisEnergetico = subnivel;
            eletronsNoSubnivelMaisEnergetico = eletronsNoSubnivel;
        }

        if (n > camadaValencia) {
            camadaValencia = n;
            eletronsValencia = eletronsNoSubnivel;
        } else if (n === camadaValencia) {
            eletronsValencia += eletronsNoSubnivel;
        }
    }

    return {
        distribuicaoEletronica: distribuicao.join(' '),
        camadaValencia: camadaValencia,
        eletronsNaCamadaValencia: eletronsValencia,
        subnivelMaisEnergetico: subnivelMaisEnergetico,
        eletronsNoSubnivelMaisEnergetico: eletronsNoSubnivelMaisEnergetico
    };
}

function calcularDistribuicao() {
    const numeroAtomico = parseInt(document.getElementById("numeroAtomico").value);

    if (isNaN(numeroAtomico) || numeroAtomico <= 0 || numeroAtomico > 118) {
        alert("Por favor, insira um número atômico válido (1-118).");
        return;
    }

    const resultado = distribuirEletrons(numeroAtomico);

    document.getElementById("distribuicao").innerText = resultado.distribuicaoEletronica;
    document.getElementById("camadaValencia").innerText = resultado.camadaValencia;
    document.getElementById("eletronsValencia").innerText = resultado.eletronsNaCamadaValencia;
    document.getElementById("subnivelMaisEnergetico").innerText = resultado.subnivelMaisEnergetico;
    document.getElementById("eletronsNoSubnivel").innerText = resultado.eletronsNoSubnivelMaisEnergetico;
}
