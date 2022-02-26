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
