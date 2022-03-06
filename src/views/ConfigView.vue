<template>
  <div class="config-view">
     
          <!-- ヘッダー -->
            <el-header height="100px">
                <el-row style="height: 60px;">
                    <el-col :span="4" style="text-align: left; height: 80px; line-height: 135px;"> 

                    </el-col>
                    <el-col :span="16" style="text-align: center; height: 60px; line-height: 135px;"> 
                        <span style="font-size:110%;">設定</span>
                    </el-col>
                    <el-col :span="4" style="text-align: right; height: 60px; line-height: 135px;"> 

                    </el-col>

                </el-row>
            </el-header>


         <!-- メイン -->   
         <div class="my-main">
             <div class="add-form" style="text-align:center">

                 <div style="height:100px">

                 </div>

                 <el-button type="danger" @click="Logout">ログアウト</el-button>

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
import { getAuth } from "firebase/auth";

export default {
    components:{
    },
    data(){
        return{
            activeType: 'task',
            radio: 'タスク',
            tasktimeset: false,
            eventtimeend:false,
            tasktitle:'',
            taskdate:'',
            tasktime:'',
            eventtitle:'',
            eventdate:'',
            eventstarttime:'',
            eventendtime:''
            
            
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
        Logout(){
            const auth = getAuth();
            auth.signOut();
            localStorage.clear('userinfo');
            this.$router.push("/");
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
    height: calc(100vh - 100px);

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

.mx-datepicker{
    width: 85vw;
    height: 40px;
    

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