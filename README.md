<!--
 * @Description: 
 * @Author: longxq
 * @Date: 2022-02-23 16:44:56
 * @LastEditTime: 2022-03-03 10:14:57
 * @LastEditors: longxq
 * @Reference: 
-->
# yun

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 项目难点
    项目难点：
    1.在对部门管理的树形控件进行操作的时候，为了实现体验更好,实现重复添加与删除功能可以直接删除，而不用删除一个之后再去刷新整个页面,让树形控件折叠。
    添加的时候，获取父级元素的属性判断，是否为父组件，将父组件判断改为是,然后去将要添加内容添加到父元素的children数组中，同时这里改变又引起后面删除需要去将判断改回来。但是当重复操作的时候，父组件本身子组件就不是数组，而是null，此时就需要去判断父组件是否children是否为null,以及渲染组件是否为空。再重新进行设置和循环；
