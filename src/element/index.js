import {
  Button,
  Checkbox,
  Form,
  FormItem,
  Input,
  MessageBox,
  Message,
  Loading,
  Container,
  Header,
  Aside,
  Main,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Breadcrumb,
  BreadcrumbItem
} from 'element-ui'

const element = {
  // eslint-disable-next-line space-before-function-paren
  install: function(Vue) {
    Vue.use(Button)
    Vue.use(Form)
    Vue.use(FormItem)
    Vue.use(Input)
    Vue.use(Checkbox)
    Vue.use(Container)
    Vue.use(Header)
    Vue.use(Aside)
    Vue.use(Main)
    Vue.use(Menu)
    Vue.use(Submenu)
    Vue.use(MenuItem)
    Vue.use(MenuItemGroup)
    Vue.use(Dropdown)
    Vue.use(DropdownMenu)
    Vue.use(DropdownItem)
    Vue.use(Breadcrumb)
    Vue.use(BreadcrumbItem)
    Vue.use(Loading.directive)
    Vue.prototype.$confirm = MessageBox.confirm
    Vue.prototype.$alert = MessageBox.alert
    Vue.prototype.$msgbox = MessageBox
    Vue.prototype.$loading = Loading.service
    Vue.prototype.$message = Message
  }
}
export default element
