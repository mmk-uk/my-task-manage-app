<template>
    <div class="scroll-display"  :id="'scrollList'+slideNum">
    <div class="list-display">
        <div class="category-label">
            <el-row>
                <el-col :span="20" class="flexbox3">
                    <span style="font-size:190%;font-weight: 900;margin-top:0px;margin-left:5px">
                        {{categorytitle}}
                    </span>
                    <!--
                    <span style="font-size:80%">タスク: 3 イベント: 2</span>
                    -->
                    
                </el-col>
                <el-col :span="4" style="text-align: right;">
                    <el-button circle class="my-button" @click="toArchiveView" v-if="slideNum != 0">
                        <mdicon name="archive-check-outline" size="40" />
                    </el-button>
                </el-col>
            </el-row>
        </div>

        <div class="list-view">

            
            <div v-if="myreminds.filter(firstRemindfilter).length > 0">
                <span style="font-weight: bold;font-size:140%">{{myreminds.filter(firstRemindfilter)[0].date.getMonth()+1}}月 </span><span style="font-size:70%"></span>
                <el-divider ></el-divider>
            </div>
            

            <div v-for="(remind,i) in myreminds.filter(firstRemindfilter)" :key="remind.id">
            <!--
            <template v-if="calcLeftdays(remind) >= 0 || remind.done_task == false" >
-->



                <template v-if="remind.type == 'task' ">
                    <template  v-if="i != 0">
                            <div v-if="remind.date.getMonth() != myreminds.filter(firstRemindfilter)[i-1].date.getMonth()" class="month-label">
                                <span style="font-weight: bold;font-size:150%">{{remind.date.getMonth()+1}}月 </span><span style="font-size:70%"></span>
                                <el-divider ></el-divider>
                            </div>
                    </template>
                    
                    <div class="list-box">
                        <el-row style="height: 75px; margin-bottom: 8px;">
                            <el-col :span="2" style="height: 75px;">
                                <template  v-if="i != 0">
                                    <div v-if="!(remind.date.getFullYear() == myreminds.filter(firstRemindfilter)[i-1].date.getFullYear() && remind.date.getMonth() == myreminds.filter(firstRemindfilter)[i-1].date.getMonth() && remind.date.getDate() == myreminds.filter(firstRemindfilter)[i-1].date.getDate())"  class="flexbox1" v-bind:style="{color:donichiColor(remind.date.getDay())}">
                                        <span style="font-weight: bold;font-size:120%">{{remind.date.getDate()}}</span>
                                        <span style="font-size:80%">({{dateT[remind.date.getDay()]}})</span>
                                    </div>
                                </template>
                                <template v-else>
                                    <div  class="flexbox1" v-bind:style="{color:donichiColor(remind.date.getDay())}" >
                                        <span style="font-weight: bold;font-size:120%">{{remind.date.getDate()}}</span>
                                        <span style="font-size:80%">({{dateT[remind.date.getDay()]}})</span>
                                    </div>
                                </template>

                            </el-col>

                            <el-col :span="22" style="height: 75px;">
                                <TaskBox :slideNum="slideNum" :boxtask="remind" :leftdays="calcLeftdays(remind)" :archivemode="false"></TaskBox>  
                            </el-col>
                        </el-row>
                    </div>
                </template>
                
                
                <div v-if="remind.type == 'event'" class="list-box">
                    <template  v-if="i != 0">
                            <div v-if="remind.date.getMonth() != myreminds.filter(firstRemindfilter)[i-1].date.getMonth()" class="month-label">
                                <span style="font-weight: bold;font-size:150%">{{remind.date.getMonth()+1}}月 </span><span style="font-size:70%"></span>
                                <el-divider ></el-divider>
                            </div>
                    </template>
                    <el-row style="height: 60px; margin-bottom: 8px;">
                        <el-col :span="2" style="height: 60px;">
                            <template  v-if="i != 0">
                                <div v-if="!(remind.date.getFullYear() == myreminds.filter(firstRemindfilter)[i-1].date.getFullYear() && remind.date.getMonth() == myreminds.filter(firstRemindfilter)[i-1].date.getMonth() && remind.date.getDate() == myreminds.filter(firstRemindfilter)[i-1].date.getDate())" class="flexbox2" v-bind:style="{color:donichiColor(remind.date.getDay())}">
                                    <span style="font-weight: bold;font-size:120%">{{remind.date.getDate()}}</span>
                                    <span style="font-size:80%">({{dateT[remind.date.getDay()]}})</span>
                                </div>
                            </template>
                            <template v-else>
                                <div  class="flexbox2" v-bind:style="{color:donichiColor(remind.date.getDay())}">
                                    <span style="font-weight: bold;font-size:120%">{{remind.date.getDate()}}</span>
                                    <span style="font-size:80%">({{dateT[remind.date.getDay()]}})</span>  
                                </div>
                            </template>


                        </el-col>
                        <el-col :span="22" style="height: 60px;">
                            <EventBox :slideNum="slideNum" :boxevent="remind" :leftdays="calcLeftdays(remind)" :archivemode="false"></EventBox> 
                        </el-col>
                    </el-row>
                </div>    
            <!-- 
            </template>      
            -->    

            </div>         
        </div>



        

    </div>
    </div>
</template>

<script>
import TaskBox from "@/components/TaskBox";
import EventBox from "@/components/EventBox";

export default {
     props: ["slideNum","categorytitle","myreminds"],
    components: {
      TaskBox,
      EventBox
    },
    data(){
        return{
            dateT : ["日","月","火","水","木","金","土"]
        }
    },
    mounted(){
        /*
         console.log(this.myreminds)
        for(const remind in this.myreminds){
            const today = new Date(this.$store.state.today.getFullYear(),this.$store.state.today.getMonth(),this.$store.state.today.getDate(),0,0,0);
            const limitday = new Date(remind.date.getFullYear(),remind.date.getMonth(),remind.date.getDate(),0,0,0);
            const leftdays = parseInt((limitday - today)/ 1000 / 60 / 60 / 24);
            console.log(leftdays)
            this.leftdaysArray.push(leftdays);
        }

        
        new Date($store.state.today.getFullYear(),$store.state.today.getMonth(),$store.state.today.getDate(),0,0,0)
        parseInt((new Date(remind.date.getFullYear(),remind.date.getMonth(),remind.date.getDate(),0,0,0) - new Date($store.state.today.getFullYear(),$store.state.today.getMonth(),$store.state.today.getDate(),0,0,0))/ 1000 / 60 / 60 / 24);  

        if(this.slideNum == 0){
            this.myreminds = this.$store.state.reminds.sort(this.compareDate);
        }else{
            const my_category_id = this.$store.state.categorys[this.slideNum-1].id;
            this.myreminds = this.$store.state.reminds.filter(v => v.category_id == my_category_id).sort(this.compareDate);
        }
        */
    },
    methods:{
        moveTop(){
            scrollTo(0,0)
        },
        toArchiveView(){
            //console.log(this.myreminds.filter(this.archiveRemindfilter))
            this.$router.push({name:'archive',params:{slideNum:this.slideNum,categorytitle:this.categorytitle,myreminds:this.myreminds}});
        },
        calcLeftdays(remind){
            const today = new Date(this.$store.state.today.getFullYear(),this.$store.state.today.getMonth(),this.$store.state.today.getDate(),0,0,0);
            const limitday = new Date(remind.date.getFullYear(),remind.date.getMonth(),remind.date.getDate(),0,0,0);
            const leftdays = parseInt((limitday - today)/ 1000 / 60 / 60 / 24);
            return leftdays
            
        },
        compareDate(a,b){
            return a.date - b.date;
        },
        firstRemindfilter(remind){
            return this.calcLeftdays(remind) >= 0 || remind.done_task == false
        },
        archiveRemindfilter(remind){
            if(remind.type == 'task'){
                return this.calcLeftdays(remind) < 0 && remind.done_task == true
            }
            if(remind.type == 'event'){
                return this.calcLeftdays(remind) < 0 
            }
        },
        donichiColor(y){
            if(y==0){
                return "#dc143c";
            }else if(y==6){
                return "#4169e1"
            }else{
                return "#303133"
            }
        }
    }
}

</script>

<style scoped>

.scroll-display{
    height: 100vh;
    
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
}

.list-display{
    width: 96%;
    
    margin-left: 10px;
    margin-right: 5px;
    margin-top: 150px;

}
.category-label{
    margin-top: 15px;
    margin-bottom: 10px;
    margin-left: 0px;
    text-align: left;
    background-color: white;
}

.list-view{
     z-index: 9998;
    text-align: left;
    height: 70%;
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
  margin-top: 13px;
}
.flexbox3{
  display: flex;
  flex-direction: column;
  text-align: left;
}

.my-button{
    background-color: rgba(0,0,0,0);;
    border:none;
    padding:3px 5px 0px 0px;
}



</style>