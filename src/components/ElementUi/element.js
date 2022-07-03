import Vue from 'vue';
import { Loading } from 'element-ui';


Vue.use(Loading);    // 使用服务方式的话，只安装Loading即可
Vue.use(Loading.directive);  //  指令方式(v-loading)的话这两行都得有
