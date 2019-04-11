<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
</script>

<style>
.date-time-input input {
  text-align: center;
}
.d-date-time-contain {
  border-radius: 10px;
  overflow: hidden;
}
.accurateSearch .el-collapse-item > div > div {
  transition: all 1s;
  padding: 0 4%;
}
.fuzzySearch .el-pagination button {
  background: none !important;
}
.fuzzySearch .el-pager li {
  background: none !important;
}
.fuzzySearch tbody > tr:last-child > td {
  border-bottom: none;
}
.fuzzySearch .el-table .warning-row {
  background: #fafafa;
  color: #aaa;
}
.fuzzySearch .warning-row .el-table__expand-column .el-table__expand-icon {
  display: none;
}

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
html a {
  color: #409eff;
  text-decoration: none;
  cursor: pointer;
}
a:hover {
  color: #67c23a;
  text-decoration-line: underline;
}
.el-input__inner {
  border-color: #e6e6e6 !important;
  transition: all 0.5s !important;
}
body input::-webkit-input-placeholder {
  font-size: 13px;
}

.date-time-input .el-input__inner {
  padding: 0;
}
.el-input__inner:focus {
  border-color: #ddd !important;
  box-shadow: 0 0 10px #dfdfdf;
}

@media (min-width: 768px) {
  ::-webkit-scrollbar {
    display: none;
  }
}
@media (max-width: 767px) {
  .fuzzySearch .el-collapse-item__arrow {
    margin: 0 !important;
    float: right;
  }
  .fuzzySearch .el-collapse-item__header {
    color: #666 !important;
    border-bottom: none !important;
    height: 20px !important;
    line-height: 20px !important;
    display: block !important;
  }
  .fuzzySearch .el-collapse-item__header i {
    line-height: 20px;
  }
  .fuzzySearch .el-collapse {
    border-bottom: none !important;
    padding-top: 5px;
  }
  .fuzzySearch .accurateSearch.el-collapse {
    padding-top: 0;
  }
}
.mobileFuzzy .demo-table-expand {
  padding: 5% 2%;
  font-size: 0;
}
.mobileFuzzy .demo-table-expand label {
  color: #99a9bf;
}
.mobileFuzzy .demo-table-expand .el-form-item {
  padding-top: 5px;
  padding-bottom: 5px;
  display: block;
  margin-right: 0;
  margin-bottom: 0;
}
.mobileFuzzy .demo-table-expand .el-form-item span {
  color: #999;
}
.mobileFuzzy .el-form-item__label {
  line-height: 20px;
  text-align: center;
  width: 40%;
  font-size: 13px;
  padding: 0;
  float: left !important;
  min-width: 70px;
}
.fuzzySearch .el-collapse-item__content {
  padding-bottom: 5px !important;
}

.mobileFuzzy .el-form-item__content {
  text-align: left;
  line-height: 20px;
  width: 55%;
  font-size: 13px;
  min-width: 10px;
  float: left !important;
}
</style>
