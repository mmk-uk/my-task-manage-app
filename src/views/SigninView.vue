<template>
    <div class="signin-view">
         <!-- メイン -->   
         <div class="my-main">
                    <!-- アラート -->
                    <el-alert
                        v-if="alertFlag"
                        title="エラー"
                        :description="alertmessage"
                        type="error"
                        show-icon
                        @close="alertFlag=false">
                    </el-alert>

                    <el-alert
                        v-if="alertFlag2"
                        title="完了"
                        :description="sendmail"
                        type="success"
                        show-icon
                        @close="alertFlag2 = false">
                    </el-alert>

                    <div class="add-form">
                        <!-- 新規タスク -->  
                        <div class="add-form-slide" style="margin-top:10px">
                            <span style="font-size:190%;font-weight: 900;">ログイン</span>
                        </div>

                        <div  class="add-form-slide" style="margin-top:25px;display:flex;">
                            <div style="margin-top:4px;margin-right:5px;">
                                <mdicon  name="email-outline" size="30" />
                            </div>               
                            <el-input placeholder="メールアドレス" v-model="email">
                               
                            </el-input>
                        </div>

                        <div  class="add-form-slide" style="margin-top:25px;display:flex;">
                            <div style="margin-top:4px;margin-right:5px;">
                                <mdicon  name="lock-outline" size="30" />
                            </div>               
                            <el-input placeholder="パスワード" v-model="password"  show-password>
                               
                            </el-input>
                        </div>

                        


                        <div style="margin-top:40px;text-align:center">
                            <el-button type="primary" class="custom-button"  @click="signIn">ログイン</el-button>

                        </div>

                        <div style="margin-top:60px;text-align:center">
                            <el-button style="border:none;" @click="toResetView">パスワードを忘れた</el-button>
                        </div>
                   


             </div>
         </div>

        <div style="height: 100vh;;width:100%;">
            <!-- 戻るボタン -->
                <div class="bottom-left">
                    <el-button type="primary" circle class="back-button" @click="toTitleView">
                        <mdicon name="chevron-left" size="40" />
                    </el-button>
                </div>
        </div>


    </div>
</template>


<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default{
    props:['sendmail'],
    data(){
        return{
            email: "",
            password: "",
            alertFlag:false,
            alertFlag2:false,
            alertmessage:""
        }

    },
    created(){
        if(this.sendmail){
            this.alertFlag2=true
            
        }
    },
    methods:{
        signIn(){
            const auth = getAuth();
            signInWithEmailAndPassword(auth, this.email, this.password)
            .then(user => {
                console.log(user);
                localStorage.setItem('userinfo',JSON.stringify({userid: user.user.uid}));
                this.$store.commit('setUserID',user.user.uid);
                this.$router.push('/main');
            })
            .catch(error => {
                if(error.code == "auth/invalid-email"){
                    this.alertmessage = "メールアドレスが間違っています。"
                }else if(error.code == "auth/wrong-password"){
                    this.alertmessage = "パスワードが間違っています。"
                }else{
                    this.alertmessage = "エラー！"
                }
                this.alertFlag = true;
            })
        }
        ,
        toTitleView(){
            this.$router.push('/');
        },
        toResetView(){
            this.$router.push('/reset');
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

.custom-button{
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