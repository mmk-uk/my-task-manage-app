<template>
    <div class="event-box">
        <div class="box-card">
            <div class="flexbox1">
                <span v-if="boxevent.end_time_flag" style="margin-top: 12px;">{{formatDate(boxevent.date, 'HH:mm')}}</span>
                <span v-if="boxevent.end_time_flag" style="margin-top: 2px;font-size:70%">{{formatDate(boxevent.end_date, 'HH:mm')}}</span>
                <span v-if="!boxevent.end_time_flag" style="margin-top: 18px;">{{formatDate(boxevent.date, 'HH:mm')}}</span>
            </div>
            <div class="line" v-bind:style="{background:eventColor(leftdays)}"></div>
            <div v-if="slideNum == 0" class="flexbox2">
                <span style="margin-top: 10px;">{{boxevent.title}}</span>
                <span style="margin-top: 2px;font-size:70%;opacity: 0.7">{{$store.state.categorys.find(c => c.id == boxevent.category_id).title}}</span>
            </div>
            <div v-else class="flexbox2">
                <span style="margin-top: 15px;">{{boxevent.title}}</span>
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
  props:["slideNum","boxevent","leftdays","archivemode"],
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
    eventColor(leftdays){
        if(leftdays <= 1){
          return "#F38BA0";
        }else if(leftdays <= 7){
          return "#FFBCBC";
        }else{
          return "#303133";
        }
    },
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
  text-align: center;
  margin-left: 7px;
  margin-right: 7px;
  width:60px;
}

.line{
    margin:0 1px;
    margin-top: 7px;
    height: 46px;
    width: 4px;
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