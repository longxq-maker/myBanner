/*
 * @Description:
 * @Author: longxq
 * @Date: 2022-02-24 10:09:42
 * @LastEditTime: 2022-03-06 23:42:59
 * @LastEditors: longxq
 * @Reference:
 */
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
  BreadcrumbItem,
  Tabs,
  TabPane,
  Icon,
  Table,
  TableColumn,
  Row,
  Dialog,
  Tag,
  Select,
  Option,
  OptionGroup,
  Footer,
  Pagination,
  Switch,
  Collapse,
  CollapseItem,
  Tree,
  Card,
  Col,
  Radio,
  DatePicker,
  RadioGroup,
  Upload
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
    Vue.use(Tabs)
    Vue.use(TabPane)
    Vue.use(Icon)
    Vue.use(Table)
    Vue.use(TableColumn)
    Vue.use(Row)
    Vue.use(Dialog)
    Vue.use(Tag)
    Vue.use(Select)
    Vue.use(Option)
    Vue.use(OptionGroup)
    Vue.use(Footer)
    Vue.use(Pagination)
    Vue.use(Switch)
    Vue.use(Collapse)
    Vue.use(CollapseItem)
    Vue.use(Tree)
    Vue.use(Card)
    Vue.use(Row)
    Vue.use(Col)
    Vue.use(Radio)
    Vue.use(RadioGroup)
    Vue.use(DatePicker)
    Vue.use(Upload)
    Vue.prototype.$confirm = MessageBox.confirm
    Vue.prototype.$alert = MessageBox.alert
    Vue.prototype.$msgbox = MessageBox
    Vue.prototype.$loading = Loading.service
    Vue.prototype.$message = Message
    Vue.prototype.$prompt = MessageBox.prompt
  }
}
export default element
