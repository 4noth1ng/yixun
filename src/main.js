// import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from '@/router'
import store from '@/store/index'
import ProjectSearch from '@/pages/Home/ProjectSearch'
// import { Backtop,Tag,Pagination,Button,Icon,RadioGroup,Radio,CheckboxGroup,Checkbox,Input,DatePicker,Upload, Message,MessageBox,Tooltip,Row,Col,Container} from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css';
import '@/plugins/htmlToPdf'


// Vue.use(Backtop)
// Vue.use(Tag)
// Vue.use(Pagination)
// Vue.use(Button)
// Vue.use(Icon)
// Vue.use(RadioGroup)
// Vue.use(Radio)
// Vue.use(CheckboxGroup)
// Vue.use(Checkbox)
// Vue.use(Input)
// Vue.use(DatePicker)
// Vue.use(Upload)
// Vue.use(Tooltip)
// Vue.use(Row)
// Vue.use(Col)
// Vue.use(Container)
// Vue.prototype.$message = Message;
// Vue.prototype.$confirm = MessageBox.confirm;

// Vue.config.productionTip = false
// Vue.prototype.$axios = axios
// Vue.use(VueAxios, axios);
Vue.component(ProjectSearch.name, ProjectSearch);

new Vue({
  axios,
  router,
  store,
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this
  }
}).$mount('#app')
