import {
  Button,
  Checkbox,
  Form,
  FormItem,
  Input,
  MessageBox
} from 'element-ui'

const element = {
  // eslint-disable-next-line space-before-function-paren
  install: function(Vue) {
    Vue.use(Button)
    Vue.use(Form)
    Vue.use(FormItem)
    Vue.use(Input)
    Vue.use(Checkbox)
    Vue.prototype.$confirm = MessageBox.confirm
    Vue.prototype.$alert = MessageBox.alert
    Vue.prototype.$msgbox = MessageBox
  }
}
export default element
