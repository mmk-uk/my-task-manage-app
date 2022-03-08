<template>
    <div class="task">
        <div class="box-card">

            <div class="flexbox1">
                <span style="margin-top: 16px;;font-size:70%">あと</span>
                <span style="margin-top: 0px;font-size:105%">{{leftdays}}日</span>
            </div>
            
            <div class="flexbox2">
                <span style="margin-top: 2px;font-size:50%">~11:00</span>
                <span style="margin-top: 3px;font-size:110%">{{boxtask.title}}</span>
                <span style="margin-top: 3px;font-size:80%;opacity: 0.7">生活</span>
            </div>      
            <div class="flexbox3">
                <div style="margin-top: 5px;">
                  <el-button v-if="!boxtask.done_task" circle  size="mini" class="my-button" @click="changeDone">
                    <mdicon name="checkbox-blank-outline" size="25" />
                  </el-button>
                  <el-button v-if="boxtask.done_task" circle  size="mini" class="my-button" @click="changeDone">
                    <mdicon name="checkbox-marked-outline" size="25" />
                  </el-button>
                </div>
                <div style="margin-top: 8px;">
                  <el-button circle  size="mini" class="my-button" @click="toEditTask">
                    <mdicon name="dots-horizontal" size="25" />
                  </el-button>
                </div>
            </div>    

            

        </div>

    </div>

</template>

<script>
export default{
  props:["slideNum","boxtask","leftdays","archivemode"],
  data(){
    return{
    }
  },
  created(){
      //const today = new Date(this.$store.state.today.getFullYear(),this.$store.state.today.getMonth(),this.$store.state.today.getDate(),0,0,0);
      //const limitday = new Date(this.boxtask.date.getFullYear(),this.boxtask.date.getMonth(),this.boxtask.date.getDate(),0,0,0);
      //this.leftdays = parseInt((limitday - today)/ 1000 / 60 / 60 / 24);
  },
  methods:{
    changeDone(){
      this.$store.dispatch('changeDoneTask',this.boxtask.id);
    },
    toEditTask(){
      this.$router.push({name:'edittask',params:{boxtask:this.boxtask,archivemode:this.archivemode}});
    }
  }
}

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
  text-align: center;
  margin-left: 10px;
  margin-right: 4px;
  width:55px;
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

.my-button{
    background-color: rgba(0,0,0,0);;
    border:none;
    color: #303133;
    padding: 0px;
}
</style>