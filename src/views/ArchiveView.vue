<template>
  <div class="archive-view">
     

          <!-- ヘッダー -->
            <el-header height="100px">
                <el-row style="height: 60px;">
                    <el-col :span="4" style="text-align: left; height: 60px; line-height: 135px;"> 

                    </el-col>
                    <el-col :span="16" style="text-align: center; height: 60px; line-height: 135px;"> 
                        <span style="font-size:110%;">経過・達成済み</span>
                    </el-col>
                    <el-col :span="4" style="text-align: right; height: 60px; line-height: 135px;"> 

                    </el-col>

                </el-row>
            </el-header>


         <!-- メイン -->   
        


            <div class="my-main">

             <div class="list-display">
                    <div class="category-label">
                        <el-row>
                            <el-col :span="24" class="flexbox3">
                                <div style="margin-top:15px">
                                    <mdicon name="check-circle-outline" size="35" />
                                </div>
                                <span style="font-size:190%;font-weight: 900;margin-top:10px;margin-left:5px">
                                    {{categorytitle}}
                                </span>
                            </el-col>
                        </el-row>
                    </div>
            
            
            <div v-if="myreminds.filter(firstRemindfilter).length > 0">
                <span style="font-weight: bold;font-size:110%">{{myreminds.filter(firstRemindfilter).reverse()[0].date.getMonth()+1}}月 </span><span style="font-size:60%">{{myreminds.filter(firstRemindfilter).reverse()[0].date.getFullYear()}}年</span>
                <el-divider ></el-divider>
            </div>
            

            <div v-for="(remind,i) in myreminds.filter(firstRemindfilter).reverse()" :key="remind.id">

                <template v-if="remind.type == 'task'">
                <template  v-if="i != 0" >
                        <div v-if="remind.date.getMonth() != myreminds.filter(firstRemindfilter).reverse()[i-1].date.getMonth()" class="month-label">
                            <span style="font-weight: bold;font-size:110%">{{remind.date.getMonth()+1}}月 </span><span style="font-size:60%">{{remind.date.getFullYear()}}年</span>
                            <el-divider ></el-divider>
                        </div>
                </template>
                <div class="list-box">
                    <el-row style="height: 75px; margin-bottom: 8px;">
                        <el-col :span="2" style="height: 75px;">
                            <template  v-if="i != 0">
                                <div v-if="!(remind.date.getFullYear() == myreminds.filter(firstRemindfilter).reverse()[i-1].date.getFullYear() && remind.date.getMonth() == myreminds.filter(firstRemindfilter).reverse()[i-1].date.getMonth() && remind.date.getDate() == myreminds.filter(firstRemindfilter).reverse()[i-1].date.getDate())" class="flexbox1">
                                    <span style="font-weight: bold">{{remind.date.getDate()}}</span>
                                    <span style="font-size:70%">({{dateT[remind.date.getDay()]}})</span>
                                </div>
                            </template>
                            <template v-else>
                                <div  class="flexbox1">
                                    <span style="font-weight: bold">{{remind.date.getDate()}}</span>
                                    <span style="font-size:70%">({{dateT[remind.date.getDay()]}})</span>
                                </div>
                            </template>

                        </el-col>

                        <el-col :span="22" style="height: 75px;">
                            <TaskBox :slideNum="slideNum" :boxtask="remind" :leftdays="calcLeftdays(remind)" :archivemode="true"></TaskBox>  
                        </el-col>
                    </el-row>
                </div>
                </template>   
                
                
                <div v-if="remind.type == 'event'" class="list-box">
                <template  v-if="i != 0">
                        <div v-if="remind.date.getMonth() != myreminds.filter(firstRemindfilter).reverse()[i-1].date.getMonth()" class="month-label">
                            <span style="font-weight: bold;font-size:110%">{{remind.date.getMonth()+1}}月 </span><span style="font-size:60%">{{remind.date.getFullYear()}}年</span>
                            <el-divider ></el-divider>
                        </div>
                </template>
                    <el-row style="height: 60px; margin-bottom: 8px;">
                        <el-col :span="2" style="height: 60px;">
                            <template  v-if="i != 0">
                                <div v-if="!(remind.date.getFullYear() == myreminds.filter(firstRemindfilter).reverse()[i-1].date.getFullYear() && remind.date.getMonth() == myreminds.filter(firstRemindfilter).reverse()[i-1].date.getMonth() && remind.date.getDate() == myreminds.filter(firstRemindfilter).reverse()[i-1].date.getDate())" class="flexbox2">
                                    <span style="font-weight: bold">{{remind.date.getDate()}}</span>
                                    <span style="font-size:70%">({{dateT[remind.date.getDay()]}})</span>
                                </div>
                            </template>
                            <template v-else>
                                <div  class="flexbox2">
                                    <span style="font-weight: bold">{{remind.date.getDate()}}</span>
                                    <span style="font-size:70%">({{dateT[remind.date.getDay()]}})</span>  
                                </div>
                            </template>


                        </el-col>
                        <el-col :span="22" style="height: 60px;">
                            <EventBox :slideNum="slideNum" :boxevent="remind" :archivemode="true" ></EventBox> 
                        </el-col>
                    </el-row>
                </div>     
                   

            </div>    



                    
                </div>
            </div>
            

            <div style="height: 100vh;;width:100%;">
                <!-- 戻るボタン -->
                <div class="bottom-left">
                    <el-button type="primary" circle class="back-button" @click="toMainView">
                        <mdicon name="chevron-left" size="40" />
                    </el-button>
                </div>
            </div>


                      
  </div>
</template>

<script>
import TaskBox from "@/components/TaskBox";
import EventBox from "@/components/EventBox";

export default {
    props:["slideNum","categorytitle","myreminds"],
    data(){
        return{
            dateT : ["日","月","火","水","木","金","土"],
        }
    },
    created(){
    },
    components: {
      TaskBox,
      EventBox
    },
    methods:{
        calcLeftdays(remind){
            const today = new Date(this.$store.state.today.getFullYear(),this.$store.state.today.getMonth(),this.$store.state.today.getDate(),0,0,0);
            const limitday = new Date(remind.date.getFullYear(),remind.date.getMonth(),remind.date.getDate(),0,0,0);
            const leftdays = parseInt((limitday - today)/ 1000 / 60 / 60 / 24);
            return leftdays
            
        },
        toMainView(){
            this.$router.push('/main');
        },
        firstRemindfilter(remind){
            if(remind.type == 'task'){
                return this.calcLeftdays(remind) < 0 && remind.done_task == true
            }
            if(remind.type == 'event'){
                return this.calcLeftdays(remind) < 0 
            }
        }
    }
}

</script>


<style scoped>

.archive-view{
}

.el-header {
  z-index: 9000;
  width: 100%;
  padding: 10px 5px;
  position: fixed;
  top: 0;
  
}
.my-button{
    background-color: rgba(0,0,0,0);;
    border:none;
}

.my-main{
    width: 100%;
    position:absolute;
    top:100px;
}


.list-display{

    padding: 10px;
    text-align: left;
    padding-bottom: 90px;
}

.category-label{
    margin-top: 0px;
    margin-bottom: 20px;
    margin-left: 0px;
    text-align: left;
    background-color: white;
}

.list-view{
    z-index: 9998;
    text-align: left;
    height: 150vh;
    margin-bottom: 100px;

}

.month-label{
    margin-top: 35px;
}


.el-divider{
    margin-top: 0px;
    margin-bottom: 2px;
}

.flexbox1{
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-top: 23px;
}
.flexbox2{
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-top: 15px;
}
.flexbox3{
  display: flex;
  text-align: left;
}

.bottom-left{

    position: fixed;
    bottom: 15px;
    left: 15px;
}

.back-button{
    background-color: #2E4C6D;
    border:none;

}





</style>