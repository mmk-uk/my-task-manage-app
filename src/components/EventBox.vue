<template>
    <div class="event-box">
        <div class="box-card">
            <div class="flexbox1">
                <span style="margin-top: 12px;">12:00</span>
                <span style="margin-top: 2px;font-size:70%">13:00</span>
            </div>
            <div class="line"></div>
            <div class="flexbox2">
                <span style="margin-top: 10px;">{{boxevent.title}}</span>
                <span style="margin-top: 2px;font-size:70%;opacity: 0.7">生活</span>
            </div>
            <div class="flexbox3">
                <el-button circle  size="mini" class="my-button" @click="toEditEvent">
                  <mdicon name="dots-horizontal" size="25" />
                </el-button>
            </div>    

        </div>
    </div>
</template>

<script>
export default{
  props:["boxevent","archivemode"],
  methods:{
    toEditEvent(){
      this.$router.push({name:'editevent',params:{boxevent:this.boxevent,archivemode:this.archivemode}});
    }
  }
}

</script>

<style scoped>
.event-box {
 padding: 5px;
}

.box-card {
  height:60px; 
  padding:0px; 
  background-color:#F2F6FC; 
  border-style:none;
  border-radius: 5px;
  display: flex;
}

.flexbox1{
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 7px;
  margin-right: 7px;
  width:60px;
}

.line{
    margin:0 1px;
    margin-top: 7px;
    height: 46px;
    width: 4px;
    background-color: #000;
    border-radius: 2px;
    
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
  margin-top: 16px;
  
}

.my-button{
    background-color: rgba(0,0,0,0);;
    border:none;
    color: #303133;
    padding: 0px;
}

</style>