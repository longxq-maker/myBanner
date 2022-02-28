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
