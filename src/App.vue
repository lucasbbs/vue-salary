<template>
  <div id="app">
    <div class="row">
      <h3>Cálculo de salário com Vue.js</h3>
    </div>
    <br />
    <br />

    <div class="content">
      <div class="mainContent">
        <h3>Cálculo em tempo real</h3>

        <labeled-input
          :onInputChange="updateSalario"
          customId="inputSalarioBruto"
          label="Salário bruto:"
        />
        <labeled-input
          :onInputChange="updateDependentes"
          customId="inputDependentes"
          label="Dependentes:"
        />
        <labeled-input :value="salario.baseINSS" currency label="Base INSS:" disabled />

        <labeled-input :value="salario.descontoINSS" currency label="Desconto INSS:" disabled />
        <labeled-input
          :value="salario.descontoDependentes"
          currency
          label="Desconto Dependedentes:"
          disabled
        />

        <labeled-input :value="salario.baseIRPF" currency label="Base IRPF:" disabled />

        <labeled-input :value="salario.descontoIRPF" currency label="Desconto IRPF:" disabled />

        <labeled-input
          :value="salario.salarioLiquido"
          currency
          label="Salário líquido:"
          customId="inputSalarioLiquido"
          disabled
        />
      </div>
    </div>
  </div>
</template>

<script>
import { interval, timer, Observable } from 'rxjs';
import { takeUntil, map, filter } from 'rxjs/operators';

var salario = 0;
var dependentes = 0;
import { Salario } from './Salario';
import LabeledInput from './components/shared/LabeledInput.vue';

export default {
  name: 'App',
  components: {
    'labeled-input': LabeledInput,
  },

  data() {
    return {
      /**
       * Objeto da classe salário
       */
      salario: new Salario(0),
    };
  },

  methods: {
    updateSalario: function (event) {
      salario = +event.target.value;
      this._internalUpdateSalario(salario, dependentes);
    },

    updateDependentes: function (event) {
      dependentes = +event.target.value;
      this._internalUpdateSalario(salario, dependentes);
    },

    _internalUpdateSalario: function (newSalario, dependentes) {
      this.salario = new Salario(+newSalario, dependentes);
    },

    updateSalarioLiquidoDesejado: function (event) {
      this.salarioLiquidoDesejado = event.target.value;
    },
  },
};
</script>

<style>
body {
  font-family: Arial, Helvetica, sans-serif;
}

.row {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

.content {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.mainContent {
  border: 1px solid gray;
  padding: 10px;
  margin-right: 30px;
  width: 50%;
}

.sideContent {
  border: 1px solid gray;
  padding: 10px;
  margin-right: 30px;
  width: 50%;
}
</style>
