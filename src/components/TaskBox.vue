<template>
    <div class="task">
        <div class="box-card">

            <div class="flexbox1">
                <span style="margin-top: 16px;;font-size:70%">あと</span>
                <span style="margin-top: 0px;font-size:105%">2日</span>
            </div>
            
            <div class="flexbox2">
                <span style="margin-top: 2px;font-size:50%">~11:00</span>
                <span style="margin-top: 3px;font-size:110%">タスク</span>
                <span style="margin-top: 3px;font-size:80%;opacity: 0.7">生活</span>
            </div>      
            <div class="flexbox3">
                <div style="margin-top: 5px;">
                    <mdicon name="checkbox-blank-outline" size="25" />
                </div>
                <div style="margin-top: 8px;">
                    <mdicon name="dots-horizontal" size="25" />
                </div>
            </div>    

            

        </div>

    </div>

</template>

<script>


</script>



<style scoped>
.task {
 padding: 5px;
}

.box-card {
  height:75px; 
  padding:0px; 
  background-color:#FFBCBC; 
  border-style:none;
  border-radius: 5px;
  display: flex;
}

.flexbox1{
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 15px;
  margin-right: 7px;
  width:40px;
}
.flexbox2{
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 7px;
  width: 100%;
}

.flexbox3{
  display: flex;
  flex-direction: column;
  text-align: right;
  margin-right: 7px;
  margin-top: 5px;
  
}
</style>