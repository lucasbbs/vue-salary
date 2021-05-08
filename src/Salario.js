const TETO_INSS_2021 = 751.97;

const tabelaINSS_2021 = [
  {
    ate: 1100,
    aliquota: 7.5,
    deducao: 0,
  },
  {
    ate: 2203.48,
    aliquota: 9,
    deducao: 16.5,
  },
  {
    ate: 3305.22,
    aliquota: 12,
    deducao: 82.61,
  },
  {
    ate: 6433.57,
    aliquota: 14,
    deducao: 148.72,
  },
  {
    ate: Number.MAX_SAFE_INTEGER,
    aliquota: 14,
  },
];

const tabelaIRPF_2021 = [
  {
    ate: 1903.98,
    aliquota: 0,
    deducao: 0,
  },
  {
    ate: 2826.65,
    aliquota: 7.5,
    deducao: 142.8,
  },
  {
    ate: 3751.05,
    aliquota: 15.0,
    deducao: 354.8,
  },
  {
    ate: 4664.68,
    aliquota: 22.5,
    deducao: 636.13,
  },
  {
    ate: Number.MAX_SAFE_INTEGER,
    aliquota: 27.5,
    deducao: 869.36,
  },
];

export class Salario {
  constructor(pSalarioBruto, pDependentes) {
    this._salarioBruto = undefined;
    this._baseINSS = undefined;
    this._descontoDependentes = undefined;
    this._descontoINSS = undefined;
    this._baseIRPF = undefined;
    this._descontoIRPF = undefined;
    this._salarioLiquido = undefined;

    this._validarSalarioBruto(pSalarioBruto);
    this._validarDependentes(pDependentes);
    this._realizarCalculos();
    Object.freeze(this);
  }

  _validarSalarioBruto(pSalarioBruto) {
    if (pSalarioBruto === undefined || typeof pSalarioBruto !== 'number' || pSalarioBruto < 0) {
      throw new Error(
        'O parâmetro do salário bruto ' +
          'é obrigatório e deve ser um ' +
          'valor do tipo number maior ou igual a 0!',
      );
    }
    this._salarioBruto = pSalarioBruto;
  }
  _validarDependentes(pDependentes) {
    if (pDependentes === undefined || typeof pDependentes !== 'number' || pDependentes < 0) {
    }
    this._dependentes = pDependentes;
  }

  _realizarCalculos() {
    this._baseINSS = this._salarioBruto;
    this._descontoINSS = this._calcularDescontoINSS();
    this._descontoDependentes = this._calcularDescontoDependentes();
    this._baseDepoisDoDescontoDependentes = this._descontoINSS + this._descontoDependentes;
    this._baseIRPF = this._salarioBruto - this._baseDepoisDoDescontoDependentes;
    this._descontoIRPF = this._calcularDescontoIRPF();
    this._salarioLiquido = this._salarioBruto - this._descontoINSS - this._descontoIRPF;
  }
  _calcularDescontoDependentes() {
    let descontoDependentes = 0;
    if (!this._dependentes) {
      this._dependentes = 0;
    }
    descontoDependentes = 189.59 * this._dependentes;
    return descontoDependentes;
  }
  _calcularDescontoINSS() {
    let descontoINSS = 0;
    for (let item of tabelaINSS_2021) {
      if (this._baseINSS <= item.ate) {
        descontoINSS = (this._baseINSS * item.aliquota) / 100;
        descontoINSS -= descontoINSS >= TETO_INSS_2021 ? 0 : item.deducao;
        descontoINSS = Math.min(TETO_INSS_2021, descontoINSS);
        break;
      }
    }

    return descontoINSS;
  }

  _calcularDescontoIRPF() {
    let descontoIRPF = 0;

    for (let item of tabelaIRPF_2021) {
      if (this._baseIRPF <= item.ate) {
        descontoIRPF = this._baseIRPF * (item.aliquota / 100);
        descontoIRPF -= item.deducao;
        break;
      }
    }

    return descontoIRPF;
  }

  get salarioBruto() {
    return this._salarioBruto.toFixed(2);
  }

  get baseINSS() {
    return this._baseINSS.toFixed(2);
  }

  get descontoINSS() {
    return this._descontoINSS.toFixed(2);
  }

  get baseIRPF() {
    if (this._baseIRPF < 0) {
      return 0;
    }
    return this._baseIRPF.toFixed(2);
  }

  get descontoIRPF() {
    return this._descontoIRPF.toFixed(2);
  }

  get descontoDependentes() {
    return this._descontoDependentes.toFixed(2);
  }

  get totalDescontos() {
    return (this._descontoINSS + this._descontoIRPF).toFixed(2);
  }

  get salarioLiquido() {
    return this._salarioLiquido.toFixed(2);
  }
}
