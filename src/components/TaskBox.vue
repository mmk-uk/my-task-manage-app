<template>
    <div class="task">
        <div class="box-card" v-bind:style="{background:taskColor(leftdays)}" ref="boxcolor">

            <div v-if="leftdays < 0" class="flexbox1">
                
                <span style="margin-top: 16px;font-size:105%">{{Math.abs(leftdays)}}日</span>
                <span style="margin-top: 2px;;font-size:70%">経過</span>
            </div>
            <div v-else class="flexbox1">
                <span style="margin-top: 16px;;font-size:70%">あと</span>
                <span style="margin-top: 0px;font-size:105%">{{leftdays}}日</span>
            </div>
            
            <div v-if="slideNum == 0" class="flexbox2">
                <span v-if="mytask.limit_time_flag" style="margin-top: 3px;font-size:50%">〜{{formatDate(mytask.date, 'HH:mm')}}</span>
                <span v-if="mytask.limit_time_flag" style="margin-top: 3px;font-size:110%">{{mytask.title}}</span>
                <span v-if="!mytask.limit_time_flag" style="margin-top: 15px;font-size:110%">{{mytask.title}}</span>
                <span  style="margin-top: 1px;font-size:80%;opacity: 0.7">{{$store.state.categorys.find(c => c.id == mytask.category_id).title}}</span>
            </div>

            <div v-else class="flexbox2">
                <span v-if="mytask.limit_time_flag" style="margin-top: 5px;font-size:50%">〜{{formatDate(mytask.date, 'HH:mm')}}</span>
                <span v-if="mytask.limit_time_flag" style="margin-top: 9px;font-size:110%">{{mytask.title}}</span>
                <span v-if="!mytask.limit_time_flag" style="margin-top: 23px;font-size:110%">{{mytask.title}}</span>
            </div>       
            <div class="flexbox3">
                <div style="margin-top: 5px;">
                  <el-button v-if="!mytask.done_task" circle  size="mini" class="my-button" @click="changeDone()">
                    <mdicon name="checkbox-blank-outline" size="25" />
                  </el-button>
                  <el-button v-if="mytask.done_task" circle  size="mini" class="my-button" @click="changeDone()">
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
      mytask:this.boxtask
    }
  },
  created(){
      //const today = new Date(this.$store.state.today.getFullYear(),this.$store.state.today.getMonth(),this.$store.state.today.getDate(),0,0,0);
      //const limitday = new Date(this.boxtask.date.getFullYear(),this.boxtask.date.getMonth(),this.boxtask.date.getDate(),0,0,0);
      //this.leftdays = parseInt((limitday - today)/ 1000 / 60 / 60 / 24);
  },
  methods:{
     formatDate (date, format) {
        format = format.replace(/yyyy/g, date.getFullYear());
        format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
        format = format.replace(/dd/g, ('0' + date.getDate()).slice(-2));
        format = format.replace(/HH/g, ('0' + date.getHours()).slice(-2));
        format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
        format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
        format = format.replace(/SSS/g, ('00' + date.getMilliseconds()).slice(-3));
        return format;
    },
    changeDone(){
      this.$store.dispatch('changeDoneTask',this.mytask.id);
      /*
      if(this.boxtask.done_task){
        this.$refs.boxcolor.style.background = "#AAAAAA";
      }else{
        if(leftdays <= 1){
          this.$refs.boxcolor.style.background = "#F38BA0";
        }else if(leftdays <= 7){
          this.$refs.boxcolor.style.background = "#FFBCBC";
        }else{
          this.$refs.boxcolor.style.background = "#CDF0EA";
        }
      }
      */

      //this.$store.dispatch('changeDoneTask',task.id);
      //task.done_task = !task.done_task
    },
    taskColor(leftdays){
      if(this.mytask.done_task){
        return "#AAAAAA";
      }else{
        if(leftdays <= 1){
          return "#F38BA0";
        }else if(leftdays <= 7){
          return "#FFBCBC";
        }else{
          return "#CDF0EA";
        }
      }
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