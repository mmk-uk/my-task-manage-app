<template>
    <div class="edittask-view">

        <!-- ヘッダー -->
        <el-header height="100px">
            <el-row style="height: 60px;">
                <el-col :span="4" style="text-align: left; height: 80px; line-height: 135px;"> 

                </el-col>
                <el-col :span="16" style="text-align: center; height: 60px; line-height: 135px;"> 
                    <span style="font-size:110%;">タスク編集</span>
                </el-col>
                <el-col :span="4" style="text-align: right; height: 60px; line-height: 135px;"> 

                </el-col>

            </el-row>
        </el-header>

        <!-- ダイアログ --> 
        <!-- タスクの削除 --> 
        <modal name="delete-task-modal" width="90%" height="200px">
            <div class="modal-header">
                <span style="font-weight:bold;font-size:130%">タスクの削除</span>
            </div>
            <div class="modal-body">
                <div style="height:100%;margin-top:20px;text-align:center">
                    <span>本当に削除しますか？</span>
                </div>
            </div>  
            <div class="modal-footer">
                <div style="text-align:left;width:100%">
                    <el-button @click="hideDeleteTaskModal">キャンセル</el-button>
                </div>
                <div style="text-align:right">
                    <el-button type="danger" @click="deleteTask">削除する</el-button>
                </div>
            </div>
        </modal>

         <!-- メイン -->   
        <div class="my-main">
            <div style="padding:10px">
                <div class="add-form-slide" style="margin-top:10px">
                    <span style="font-size:190%;font-weight: 900;">タスクの編集</span>
                </div>
                <div  class="add-form-slide" style="margin-top:2px">
                    <span>カテゴリ：{{$store.state.categorys.find(c => c.id === boxtask.category_id).title}}</span>
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

                <div style="margin-top:30px; display: flex;">
                    <div style="text-align:left;width:100%;margin-left:35px">
                        <el-button type="danger" @click="showDeleteTaskModal">削除する</el-button>
                    </div>
                    <div style="text-align:right;margin-right:5px">
                        <el-button type="primary" @click="updateTask">更新する</el-button>
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
import VueTimepicker from 'vue2-timepicker/src/vue-timepicker.vue'
import 'vue2-timepicker/dist/VueTimepicker.css'
import Datepicker from 'vuejs-datepicker';
import {ja} from 'vuejs-datepicker/dist/locale';


export default {
    props:["boxtask"],
    components:{
        'vue-timepicker': VueTimepicker,
        'date-picker':Datepicker,
    },
    data(){
        return{
            ja: ja,
            tasktimeset: false,
            tasktitle:'',
            taskdate:null,
            tasktime:null,
        }
    },
    created(){
        this.tasktitle = this.boxtask.title
        this.taskdate = this.boxtask.date
        if (this.boxtask.limit_time_flag){
            this.tasktimeset = this.boxtask.limit_time_flag
            this.tasktime = ((this.boxtask.date.getHours() < 10)? "0"+this.boxtask.date.getHours() : this.boxtask.date.getHours()) + ":" + ((this.boxtask.date.getMinutes() < 10)? "0"+this.boxtask.date.getMinutes() : this.boxtask.date.getMinutes()) 
            
        }
    },
    methods:{
        updateTask(){
            //console.log(this.tasktime)
            //console.log(((this.boxtask.date.getHours() < 10)? "0"+this.boxtask.date.getHours() : this.boxtask.date.getHours()) + ":" + ((this.boxtask.date.getMinutes() < 10)? "0"+this.boxtask.date.getMinutes() : this.boxtask.date.getMinutes()))
            //console.log(this.tasktime != ((this.boxtask.date.getHours() < 10)? "0"+this.boxtask.date.getHours() : this.boxtask.date.getHours()) + ":" + ((this.boxtask.date.getMinutes() < 10)? "0"+this.boxtask.date.getMinutes() : this.boxtask.date.getMinutes()))
            if(this.tasktimeset){
                if(this.tasktitle.length>0 && this.taskdate && this.tasktime){
                    if((this.tasktitle != this.boxtask.title) || (this.taskdate != this.boxtask.date) || (this.tasktime != ((this.boxtask.date.getHours() < 10)? "0"+this.boxtask.date.getHours() : this.boxtask.date.getHours()) + ":" + ((this.boxtask.date.getMinutes() < 10)? "0"+this.boxtask.date.getMinutes() : this.boxtask.date.getMinutes()) )){
                        var limitdate1 = new Date(  this.taskdate.getFullYear(),this.taskdate.getMonth(),this.taskdate.getDate(),Number(this.tasktime.split(':')[0]),Number(this.tasktime.split(':')[1]),0);
                        const newtask = {
                            type : "task",
                            id : this.boxtask.id,
                            category_id : this.boxtask.category_id,
                            title : this.tasktitle,
                            date : limitdate1,
                            limit_time_flag : true,
                            done_task : this.boxtask.done_task
                        }
                        this.$store.dispatch('updateTasks',newtask);
                        this.$router.push('/main');
                    }else{
                        this.$router.push('/main');
                    }
                }
            }else{
                if(this.tasktitle.length>0 && this.taskdate ){  
                    if((this.tasktitle != this.boxtask.title) || (this.taskdate != this.boxtask.date)){
                        var limitdate2 = new Date(this.taskdate.getFullYear(),this.taskdate.getMonth(),this.taskdate.getDate(),23,59,59);
                        const newtask = {
                            type : "task",
                            id : this.boxtask.id,
                            category_id : this.boxtask.category_id,
                            title : this.tasktitle,
                            date : limitdate2,
                            limit_time_flag : false,
                            done_task : this.boxtask.done_task
                        }
                        this.$store.dispatch('updateTasks',newtask);
                        this.$router.push('/main');
                    }else{
                        this.$router.push('/main');
                    }
                }
            }
        },
        showDeleteTaskModal(){
            this.$modal.show('delete-task-modal');
        },
        hideDeleteTaskModal(){
            this.$modal.hide('delete-task-modal');
        },
        deleteTask(){
            this.$store.dispatch('deleteTask',this.boxtask.id);
            this.$modal.hide('delete-task-modal');
            this.$router.push('/main');
        },
        toMainView(){
            this.$router.push('/main');
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


.vm--container{
    width: 100vw;
}

.vm--modal{
    margin: 10px;
    width: 100vw;
}

.modal-header{
    margin-top: 20px;
    margin-left: 10px;
    margin-right: 10px;
    text-align: center;
}
.modal-body {
  height: 50px;
  margin-left: 10px;
  margin-right: 10px;
}
.modal-footer{

    display: flex;
    margin-top: 20px;
    margin-left: 10px;
    margin-right: 10px;
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