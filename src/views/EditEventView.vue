<template>
    <div class="editevent-view">

        <!-- ヘッダー -->
        <el-header height="100px">
            <el-row style="height: 60px;">
                <el-col :span="4" style="text-align: left; height: 80px; line-height: 135px;"> 

                </el-col>
                <el-col :span="16" style="text-align: center; height: 60px; line-height: 135px;"> 
                    <span style="font-size:110%;">イベント編集</span>
                </el-col>
                <el-col :span="4" style="text-align: right; height: 60px; line-height: 135px;"> 

                </el-col>

            </el-row>
        </el-header>

        <!-- ダイアログ --> 
        <!-- タスクの削除 --> 
        <modal name="delete-event-modal" width="90%" height="200px">
            <div class="modal-header">
                <span style="font-weight:bold;font-size:130%">イベントの削除</span>
            </div>
            <div class="modal-body">
                <div style="height:100%;margin-top:20px;text-align:center">
                    <span>本当に削除しますか？</span>
                </div>
            </div>  
            <div class="modal-footer">
                <div style="text-align:left;width:100%">
                    <el-button @click="hideDeleteEventModal">キャンセル</el-button>
                </div>
                <div style="text-align:right">
                    <el-button type="danger" @click="deleteEvent">削除する</el-button>
                </div>
            </div>
        </modal>

         <!-- メイン -->   
        <div class="my-main">
            <div style="padding:10px">
                <div class="add-form-slide" style="margin-top:10px">
                    <span style="font-size:190%;font-weight: 900;">イベントの編集</span>
                </div>
                <div  class="add-form-slide" style="margin-top:2px">
                <span>カテゴリ：{{$store.state.categorys.find(c => c.id === boxevent.category_id).title}}</span>
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
                        :highlighted="highlighted"
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

                <div style="margin-top:30px; display: flex;">
                    <div style="text-align:left;width:100%;margin-left:35px">
                        <el-button type="danger" @click="showDeleteEventModal">削除する</el-button>
                    </div>
                    <div style="text-align:right;margin-right:5px">
                        <el-button type="primary" @click="updateEvent">更新する</el-button>
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
    props:["boxevent","archivemode"],
    components:{
        'vue-timepicker': VueTimepicker,
        'date-picker':Datepicker,
    },
    data(){
        return{
            ja: ja,
            eventtimeend:false,
            eventtitle:'',
            eventdate:null,
            eventstarttime:null,
            eventendtime:null,
            highlighted:{
                dates:[this.$store.state.today]
            }
        }
    },
    created(){
        this.eventtitle = this.boxevent.title
        this.eventdate = this.boxevent.date
        this.eventstarttime = ((this.boxevent.date.getHours() < 10)? "0"+this.boxevent.date.getHours() : this.boxevent.date.getHours()) + ":" + ((this.boxevent.date.getMinutes() < 10)? "0"+this.boxevent.date.getMinutes() : this.boxevent.date.getMinutes()) 
        if (this.boxevent.end_time_flag){
            this.eventtimeend = this.boxevent.end_time_flag
            this.eventendtime = ((this.boxevent.end_date.getHours() < 10)? "0"+this.boxevent.end_date.getHours() : this.boxevent.end_date.getHours()) + ":" + ((this.boxevent.end_date.getMinutes() < 10)? "0"+this.boxevent.end_date.getMinutes() : this.boxevent.end_date.getMinutes()) 
        }
    },
    methods:{
        updateEvent(){
            if(this.eventtimeend){
                if(this.eventtitle.length>0 && this.eventdate && this.eventstarttime && this.eventendtime){   
                    const newstarttime = ((this.boxevent.date.getHours() < 10)? "0"+this.boxevent.date.getHours() : this.boxevent.date.getHours()) + ":" + ((this.boxevent.date.getMinutes() < 10)? "0"+this.boxevent.date.getMinutes() : this.boxevent.date.getMinutes());
                    const newendtime = ((this.boxevent.end_date.getHours() < 10)? "0"+this.boxevent.end_date.getHours() : this.boxevent.end_date.getHours()) + ":" + ((this.boxevent.end_date.getMinutes() < 10)? "0"+this.boxevent.end_date.getMinutes() : this.boxevent.end_date.getMinutes());
                    if((this.eventtitle != this.boxevent.title) || (this.eventdate != this.boxevent.date) || (this.eventstarttime != newstarttime) || (this.eventendtime != newendtime)){
                        console.log(this.eventstarttime,this.eventendtime)
                        var limitdate1 = new Date(this.eventdate.getFullYear(),this.eventdate.getMonth(),this.eventdate.getDate(),Number(this.eventstarttime.split(':')[0]),Number(this.eventstarttime.split(':')[1]),59);
                        var limitdate2 = new Date(this.eventdate.getFullYear(),this.eventdate.getMonth(),this.eventdate.getDate(),Number(this.eventendtime.HH),Number(this.eventendtime.mm),59);

                        const newevent = {
                            type : "event",
                            id : this.boxevent.id,
                            category_id : this.boxevent.category_id,
                            title : this.eventtitle,
                            date : limitdate1,
                            end_date : limitdate2,
                            end_time_flag : true
                        }
                        this.$store.dispatch('updateReminds',newevent);
                        this.$router.push('/main');
                    }else{
                        this.$router.push('/main');
                    }
                }
            }else{
                if(this.eventtitle.length>0 && this.eventdate && this.eventstarttime ){    
                    const newstarttime = ((this.boxevent.date.getHours() < 10)? "0"+this.boxevent.date.getHours() : this.boxevent.date.getHours()) + ":" + ((this.boxevent.date.getMinutes() < 10)? "0"+this.boxevent.date.getMinutes() : this.boxevent.date.getMinutes());
                    if((this.eventtitle != this.boxevent.title) || (this.eventdate != this.boxevent.date) || (this.eventstarttime != newstarttime)){
                        console.log(this.eventstarttime,this.eventendtime)
                        var limitdate3 = new Date(this.eventdate.getFullYear(),this.eventdate.getMonth(),this.eventdate.getDate(),Number(this.eventstarttime.split(':')[0]),Number(this.eventstarttime.split(':')[1]),59);
                        var limitdate4 = new Date(this.eventdate.getFullYear(),this.eventdate.getMonth(),this.eventdate.getDate(),23,59,59);

                        const newevent = {
                            type : "event",
                            id : this.boxevent.id,
                            category_id : this.boxevent.category_id,
                            title : this.eventtitle,
                            date : limitdate3,
                            end_date : limitdate4,
                            end_time_flag : false
                        }
                        this.$store.dispatch('updateReminds',newevent);
                        this.$router.push('/main');
                    }else{
                        this.$router.push('/main');
                    }
                }
            }
        },
        showDeleteEventModal(){
            this.$modal.show('delete-event-modal');
        },
        hideDeleteEventModal(){
            this.$modal.hide('delete-event-modal');
        },
        deleteEvent(){
            this.$store.dispatch('deleteRemind',this.boxevent.id);
            this.$modal.hide('delete-event-modal');
            if(this.archivemode){
                this.$router.push({name:'archive',params:{slideNum:this.$store.state.ListNum,categorytitle:this.$store.state.categorys[this.$store.state.ListNum - 1].title,myreminds:this.$store.state.reminds.filter(v => v.category_id == this.$store.state.categorys[this.$store.state.ListNum - 1].id).sort(this.compareDate)}});
            }else{
                this.$router.push('/main');
            }
        },
        toMainView(){
            if(this.archivemode){
                this.$router.push({name:'archive',params:{slideNum:this.$store.state.ListNum,categorytitle:this.$store.state.categorys[this.$store.state.ListNum - 1].title,myreminds:this.$store.state.reminds.filter(v => v.category_id == this.$store.state.categorys[this.$store.state.ListNum - 1].id).sort(this.compareDate)}});
            }else{
                this.$router.push('/main');
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