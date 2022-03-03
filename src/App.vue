<!--
 * @Description:
 * @Author: longxq
 * @Date: 2022-02-23 16:44:56
 * @LastEditTime: 2022-03-03 12:21:04
 * @LastEditors: longxq
 * @Reference:
-->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
:root {
  /**
    背景
  */
  --bgcolorDark: #000;
  --bgcolorDay: #fff;
  --color1: #00c5cd;
  --color2: #7fffd4;
  --color3: #00ff00;
  --color4: #caff70;
  --color5: #5daaf0;
}
* {
  padding: 0;
  margin: 0;
  user-select: none;
}
#app {
  height: 100vh;
  width: 100vw;
  background: var(--bgcolorday);
}
</style>
