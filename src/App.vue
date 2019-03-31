<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
</script>

<style>
html,
body {
  height: 100%;
  width: 100%;
  background-color: #fafafa;
}
body,
div,
ul,
li,
ol,
h1,
h2,
h3,
h4,
h5,
h6,
input,
textarea,
select,
p,
dl,
dt,
dd,
a,
img,
button,
form,
table,
th,
tr,
td,
tbody,
article,
aside,
details,
figcaption,
figure,
footer,
header,
menu,
nav,
section {
  padding: 0;
  margin: 0;
}
#app {
  height: 100%;
  width: 100%;
}
a {
  color: #409eff;
  text-decoration: none;
}
a:hover {
  color: #67c23a;
  text-decoration-line: underline;
}
.el-input__inner {
  transition: all 1s;
}

.el-input__inner:hover {
  border-color: #ddd !important;
  box-shadow: 0 0 5px #ddd;
}

.el-input__inner:focus {
  border-color: #ddd !important;
  box-shadow: 0 0 5px #ddd;
}
</style>
