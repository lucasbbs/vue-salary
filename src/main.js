import Vue from 'vue';
import App from './App.vue';

import 'materialize-css/dist/css/materialize.min.css';
// import 'material-design-icons/iconfont/material-icons.css';

// import './index.css';

/**
 * Criando uma instância global de Vue,
 * associando ao id #app no HTML e renderizando
 * a classe App (principal)
 */
new Vue({
  el: '#app',
  render: h => h(App),
});
