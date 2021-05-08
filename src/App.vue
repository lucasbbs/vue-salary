<template>
  <div id="app">
    <div class="container card">
      <h4 class="center-align">Vue Salário</h4>
      <div class="row">
        <div class="input-field col s6">
          <i class="material-icons prefix"> attach_money </i>
          <labeled-input
            :onInputChange="updateSalario"
            customId="inputSalarioBruto"
            label="Salário bruto:"
          />
        </div>
        <div class="input-field col s6">
          <i class="material-icons prefix"> face </i>
          <labeled-input
            :onInputChange="updateDependentes"
            customId="inputDependentes"
            label="Dependentes:"
          />
        </div>
      </div>
      <div class="row" style="margin-top: 80px">
        <div class="input-field col s3">
          <labeled-input :value="salario.baseINSS" currency label="Base INSS:" disabled />
        </div>
        <div class="input-field col s2">
          <labeled-input :value="salario.descontoINSS" currency label="Desconto INSS:" disabled />
        </div>
        <div class="input-field col s3">
          <labeled-input
            :value="salario.descontoDependentes"
            currency
            label="Desconto Dependedentes:"
            disabled
          />
        </div>
        <div class="input-field col s2">
          <labeled-input :value="salario.baseIRPF" currency label="Base IRPF:" disabled />
        </div>
        <div class="input-field col s2">
          <labeled-input :value="salario.descontoIRPF" currency label="Desconto IRPF:" disabled />
        </div>
      </div>
      <div class="row" style="margin-top: 80px">
        <div class="input-field col s2">
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
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
    'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.default-flex-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

.padding {
  padding: 10px;
}

.card {
  margin: 0 auto !important;
  height: 450px;
}
</style>
