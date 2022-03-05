<template>
  <div id="app">
      <router-view/>
  </div>    
</template>



<style>
#app {
  background-color: white;
  font-family: 'DotGothic16', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  
}


.main {
  height: 100%;
}

.el-header {
  background-color: #2E4C6D;
  color: white;
  text-align: center;
  padding:0px;

}


.el-footer {
  background-color: #2E4C6D;
  color: white;
  text-align: center;
  line-height: 60px; 
}





</style>