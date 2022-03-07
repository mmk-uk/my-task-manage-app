<template>
  <div class="add-view">
     

          <!-- ヘッダー -->
            <el-header height="100px">
                <el-row style="height: 60px;">
                    <el-col :span="4" style="text-align: left; height: 80px; line-height: 135px;"> 

                    </el-col>
                    <el-col :span="16" style="text-align: center; height: 60px; line-height: 135px;"> 
                        <span style="font-size:110%;">タスク・イベント追加</span>
                    </el-col>
                    <el-col :span="4" style="text-align: right; height: 60px; line-height: 135px;"> 

                    </el-col>

                </el-row>
            </el-header>


         <!-- メイン -->   
         <div class="my-main">
             <div class="add-form">

                 <el-tabs v-model="activeType" @tab-click="handleClick"  type="card" tab-position="top" :stretch="true">
                     <el-tab-pane name="task">
                        <span slot="label" class="select-tab">タスク</span>
                     </el-tab-pane>
                     <el-tab-pane name="event">
                        <span slot="label">イベント</span>
                     </el-tab-pane>
                 </el-tabs>

                <swiper
                    class="main-swiper"
                    :slides-per-view="1"
                    :space-between="10"
                    ref="swiperAdd"
                    @slideChange="onSwipe"
                >
                    <swiper-slide>
                        <!-- 新規タスク -->  
                        <div class="add-form-slide" style="margin-top:10px">
                            <span style="font-size:190%;font-weight: 900;">新規タスク</span>
                        </div>
                        <div  class="add-form-slide" style="margin-top:2px">
                            <span>カテゴリ：{{$store.state.categorys[$store.state.ListNum-1].title}}</span>
                        </div>
                        <div  class="add-form-slide" style="margin-top:15px;display:flex;">
                            <div style="margin-top:4px;margin-right:5px;">
                                <mdicon  name="calendar-check-outline" size="30" />
                            </div>               
                            <el-input placeholder="やること" v-model="tasktitle">
                               
                            </el-input>
                        </div>
                        <div  class="add-form-slide" style="margin-top:15px;display:flex;">
                            <div style="margin-top:4px;margin-right:5px;">
                                <mdicon  name="calendar-outline" size="30" />
                            </div>      
                            <date-picker
                                placeholder="締切日"
                                v-model="taskdate"
                                name="datepick"
                                format="yyyy-MM-dd"
                                :language="ja"
                            >
                            </date-picker>         
                        </div>
                        <div  class="add-form-slide" style="margin-top:15px;display:flex;">
                            <div style="margin-top:4px;margin-right:5px;">
                                <mdicon  name="clock-outline" size="30" />
                            </div>      
                            <div style="margin:7px;">
                                <el-switch v-model="tasktimeset">
                                </el-switch>   
                            </div>
                        </div>
                        <div  class="add-form-slide" style="margin-top:15px;display:flex;">
                            <div style="width:30px;margin-top:4px;margin-right:5px;">
                            </div>       
                            <vue-timepicker
                                v-if="tasktimeset"
                                v-model="tasktime"
                                placeholder="締切時間"
                            >   
                            </vue-timepicker>
                        </div>

                        <div style="margin-top:30px;text-align:center">
                            <el-button type="primary" @click="addTask">追加する</el-button>

                        </div>
                    </swiper-slide>


                    <swiper-slide>
                        <!-- 新規イベント -->  
                        <div class="add-form-slide" style="margin-top:10px">
                            <span style="font-size:190%;font-weight: 900;">新規イベント</span>
                        </div>
                        <div  class="add-form-slide" style="margin-top:2px">
                            <span>カテゴリ：生活</span>
                        </div>
                        <div  class="add-form-slide" style="margin-top:15px;display:flex;">
                            <div style="margin-top:4px;margin-right:5px;">
                                <mdicon  name="calendar-check-outline" size="30" />
                            </div>               
                            <el-input placeholder="やること" v-model="eventtitle">
                               
                            </el-input>
                        </div>
                        <div  class="add-form-slide" style="margin-top:15px;display:flex;">
                            <div style="margin-top:4px;margin-right:5px;">
                                <mdicon  name="calendar-outline" size="30" />
                            </div>               
                            <date-picker
                                placeholder="予定日"
                                v-model="eventdate"
                                format="yyyy-MM-dd"
                                name="datepick"
                                :language="ja"
                            >
                            </date-picker>   
                        </div>
                        <div  class="add-form-slide" style="margin-top:15px;display:flex;">
                            <div style="margin-top:4px;margin-right:5px;">
                                <mdicon  name="clock-outline" size="30" />
                            </div>      
                            <vue-timepicker
                                v-model="eventstarttime"
                                placeholder="開始時間"
                            >   
                            </vue-timepicker>   
                        </div>
                        <div  class="add-form-slide" style="margin-top:15px;display:flex;">
                            <div style="margin-top:4px;margin-right:5px;">
                                <mdicon  name="arrow-down-thin" size="30" />
                            </div>      
                            <div style="margin:7px;">
                                <el-switch v-model="eventtimeend">
                                </el-switch>   
                            </div>
                        </div>
                        <div v-if="eventtimeend" class="add-form-slide" style="margin-top:15px;display:flex;">
                            <div style="margin-top:4px;margin-right:5px;">
                                <mdicon  name="clock-outline" size="30" />
                            </div>      
                            <vue-timepicker
                                v-model="eventendtime"
                                placeholder="終了時間"
                            >   
                            </vue-timepicker>     
                        </div>

                        <div style="margin-top:30px;text-align:center">
                            <el-button type="primary"  @click="addEvent">追加する</el-button>

                        </div>
                    </swiper-slide>
                </swiper>


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
import VueTimepicker from 'vue2-timepicker/src/vue-timepicker.vue'
import 'vue2-timepicker/dist/VueTimepicker.css'
import Datepicker from 'vuejs-datepicker';
import {ja} from 'vuejs-datepicker/dist/locale';
import { v4 as uuidv4 } from "uuid";

export default {
    components:{
        'vue-timepicker': VueTimepicker,
        'date-picker':Datepicker,
    },
    created(){
        console.log(this.$store.state.ListNum)
    },
    data(){
        return{
            activeType: 'task',
            radio: 'タスク',
            ja: ja,
            
            tasktimeset: false,
            eventtimeend:false,
            tasktitle:'',
            taskdate:null,
            tasktime:null,
            eventtitle:'',
            eventdate:null,
            eventstarttime:null,
            eventendtime:null
            
        }
    },
    methods:{
        handleClick(tab) {
            if(tab.name==="task"){
                this.$refs.swiperAdd.$swiper.slideTo(0);
            }else{
                this.$refs.swiperAdd.$swiper.slideTo(1);
            }
        },
        onSwipe() {
            if(this.$refs.swiperAdd.$swiper.activeIndex === 0){
                this.activeType = "task"
            }else{
                this.activeType = "event"
            }

        },
        toMainView(){
            this.$router.push('/main');
        },
        addTask(){
            if (this.tasktimeset) {
                if(this.tasktitle.length>0 && this.taskdate && this.tasktime){     
                    var limitdate1 = new Date(this.taskdate.getFullYear(),this.taskdate.getMonth(),this.taskdate.getDate(),Number(this.tasktime.HH),Number(this.tasktime.mm),0);
                    const newtask = {
                        type : "task",
                        id : uuidv4(),
                        category_id : this.$store.state.categorys[this.$store.state.ListNum-1].id,
                        title : this.tasktitle,
                        date : limitdate1,
                        limit_time_flag : true,
                        done_task : false
                    }
                    this.$store.dispatch('addTasks',newtask);
                    this.$router.push('/main');
                }
            }else{
                if(this.tasktitle.length>0 && this.taskdate ){     
                    var limitdate2 = new Date(this.taskdate.getFullYear(),this.taskdate.getMonth(),this.taskdate.getDate(),23,59,59);
                    const newtask = {
                        type : "task",
                        id : uuidv4(),
                        category_id : this.$store.state.categorys[this.$store.state.ListNum-1].id,
                        title : this.tasktitle,
                        date : limitdate2,
                        limit_time_flag : false,
                        done_task : false
                    }
                    this.$store.dispatch('addTasks',newtask);
                    this.$router.push('/main');
                }
            }
        },
        addEvent(){
            if (this.eventtimeend) {
                if(this.eventtitle.length>0 && this.eventdate && this.eventstarttime && this.eventendtime){     
                    var limitdate1 = new Date(this.eventdate.getFullYear(),this.eventdate.getMonth(),this.eventdate.getDate(),Number(this.eventstarttime.HH),Number(this.eventstarttime.mm),59);
                    var limitdate2 = new Date(this.eventdate.getFullYear(),this.eventdate.getMonth(),this.eventdate.getDate(),Number(this.eventendtime.HH),Number(this.eventendtime.mm),59);

                    const newevent = {
                        type : "event",
                        id : uuidv4(),
                        category_id : this.$store.state.categorys[this.$store.state.ListNum-1].id,
                        title : this.eventtitle,
                        date : limitdate1,
                        end_date : limitdate2,
                        end_time_flag : true
                    }
                    this.$store.dispatch('addEvents',newevent);
                    this.$router.push('/main');
                }
            }else{
                if(this.eventtitle.length>0 && this.eventdate && this.eventstarttime ){     
                    var limitdate3 = new Date(this.eventdate.getFullYear(),this.eventdate.getMonth(),this.eventdate.getDate(),Number(this.eventstarttime.HH),Number(this.eventstarttime.mm),0);
                    var limitdate4 = new Date(this.eventdate.getFullYear(),this.eventdate.getMonth(),this.eventdate.getDate(),23,59,59);

                    const newevent = {
                        type : "event",
                        id : uuidv4(),
                        category_id : this.$store.state.categorys[this.$store.state.ListNum-1].id,
                        title : this.eventtitle,
                        date : limitdate3,
                        end_date : limitdate4,
                        end_time_flag : false
                    }
                    this.$store.dispatch('addEvents',newevent);
                    this.$router.push('/main');
                }
            }
        }
        
        
    }
}

</script>


<style scoped>

.add-view{
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
    position:fixed;
    top:100px;

}

.add-form{
    padding: 10px;
}


.main-swiper{
    min-height: calc(100vh - 200px);
}

.add-form-slide{
    width: 100%;
    height: 100%;
    text-align: left;
}


.bottom-left{
     z-index: 9999;

    position: fixed;
    bottom: 15px;
    left: 15px;
}

.back-button{
    z-index: 9000;
    background-color: #2E4C6D;
    border:none;

}



</style>

<style>

.el-tabs__nav{
    border-color: #2E4C6D;
}

.el-tabs__item{
    font-size: 120%;
    
}


.el-tabs__item {
        color: #b3b3b3;
    }

    .el-tabs__item.is-active{
        color:#2E4C6D;
        font-weight: bold;
        background-color:white;
       
    }

    .el-tabs__active-bar{
        
    }

.el-input__inner{
    width: 85vw;
    border-color:#303d4e;
    border-width: 2px;
    padding-left: 10px;
}

.el-input__inner::-webkit-input-placeholder {
        color: #757575;
    }

.el-picker-panel{
    font-family: 'DotGothic16', sans-serif;
}

.el-time-panel{
    font-family: 'DotGothic16', sans-serif;
}

.vdp-datepicker{
    width: 85vw  !important;;
    height: 40px;
    

}
.vdp-datepicker div:first-of-type input{
    width: 85vw  !important;
    height: 40px !important;
    border-color:#303d4e  !important;
    border-width: 2px  !important;
    border-radius: 4px  !important;
    font-size: 85% !important;
    padding-left: 10px !important;
}

.mx-input{
    height: 40px;
    border-color:#303d4e;
    border-width: 2px;
}

.mx-icon-calendar{
    color: rgba(0,0,0,0);
}

.time-picker{
    width: 85vw  !important;;
    height: 40px;

}
.display-time{
    width: 85vw  !important;
    height: 40px !important;
    border-color:#303d4e  !important;
    border-width: 2px  !important;
    border-radius: 4px  !important;
    font-size: 85% !important;
    padding-left: 10px !important;
}




</style>