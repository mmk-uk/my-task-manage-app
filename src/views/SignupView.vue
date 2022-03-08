<template>
    <div class="signup-view">


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

             <div class="add-form">
                        <div class="add-form-slide" style="margin-top:10px">
                            <span style="font-size:190%;font-weight: 900;">新規登録</span>
                        </div>

                        <div  class="add-form-slide" style="margin-top:25px;display:flex;">
                            <div style="margin-top:4px;margin-right:5px;">
                                <mdicon  name="email-outline" size="30" />
                            </div>               
                            <el-input placeholder="メールアドレス" v-model="email">
                            </el-input>
                            
                        </div>
                        <p v-if="isInValidEmail" class="error">正しいメールアドレスの形式で入力してください。</p>

                        <div class="add-form-slide" style="margin-top:30px">
                            <span>パスワード(半角英数字1種類以上含む8文字以上)</span>
                        </div>

                        <div  class="add-form-slide" style="margin-top:6px;display:flex;">
                            <div style="margin-top:4px;margin-right:5px;">
                                <mdicon  name="lock-outline" size="30" />
                            </div>               
                            <el-input placeholder="パスワード" v-model="password1"  show-password>
                               
                            </el-input>
                        </div>
                        <p v-if="isInValidPassword" class="error">正しいパスワードの形式で入力してください。</p>

                        <div  class="add-form-slide" style="margin-top:25px;display:flex;">
                            <div style="margin-top:4px;margin-right:5px;">
                                <mdicon  name="lock-outline" size="30" />
                            </div>               
                            <el-input placeholder="確認用パスワード" v-model="password2"  show-password>
                               
                            </el-input>
                        </div>
                        <p v-if="isCheckPassword" class="error">パスワードが異なります</p>


                        <div style="margin-top:40px;text-align:center">
                            <el-button type="primary" class="custom-button" @click="signUp">登録する</el-button>

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
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore"
import { v4 as uuidv4 } from "uuid";

export default{
    data(){
        return{
            email: "",
            password1: "",
            password2: "",
            alertFlag:false,
            alertmessage:""
        }

    },
    methods:{
        signUp() {
            if(!this.isInValidEmail && !this.isInValidPassword && !this.isCheckPassword){
                const auth = getAuth();
                createUserWithEmailAndPassword(auth, this.email, this.password1)
                .then(user => {

                    this.createDB(user.user.uid);

                    // サインイン画面に遷移
                    this.$router.push({name:'signin',params:{sendmail: "登録完了しました。"}});
                })
                .catch(error => {
                    console.log(error);
                    if(error.code == "auth/email-already-in-use"){
                        this.alertmessage = "すでに存在しているメールアドレスです。";
                    }else{
                        console.log(error);
                        this.alertmessage = "エラー！";
                    }    
                    this.alertFlag = true;
                })
            }else{
                this.alertmessage="登録に失敗しました。";
                this.alertFlag = true;
            }

        },       
        toTitleView(){
            this.$router.push('/');
        },
        createDB: async function(userid){
            const db = getFirestore();
            await setDoc(doc(db,'users',userid),{
                email: this.email
            }
            );
            const categoryid = uuidv4();
            const taskid = uuidv4();
            const eventid = uuidv4();
            //var hiduke = new Date();
            //hiduke.setDate(hiduke.getDate() + 3)
            //const kyou = {year:hiduke.getFullYear(),month:hiduke.getMonth()+1,day:hiduke.getDate()}
            await setDoc(doc(db,'users',userid,'categorys',categoryid),{
                id: categoryid,
                title: 'やること',
                order_num: 1
            });
            await setDoc(doc(db,'users',userid,'reminds',taskid),{
                type:'task',
                id: taskid,
                category_id: categoryid,
                title: 'タスク1',
                date: new Date(),
                limit_time_flag : false,
                done_task : false
            });
            await setDoc(doc(db,'users',userid,'reminds',eventid),{
                type:'event',
                id: eventid,
                category_id: categoryid,
                title: 'イベント1',
                date: new Date(),
                end_time_flag : false,
                end_date: new Date()
            });
        }
    },
    computed:{
        isInValidEmail(){//true:だめ,false:OK
              //メールアドレスとして判定される文字列と記号の組み合わせを定数化
            const reg = new RegExp(/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/);
            //指定した組み合わせになっていなかった場合判定を返す。
            return !reg.test(this.email);
        },
        isInValidPassword(){//true:だめ,false:OK
              //メールアドレスとして判定される文字列と記号の組み合わせを定数化
            const reg = new RegExp( /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}$/);
            //指定した組み合わせになっていなかった場合判定を返す。
            return !reg.test(this.password1);
        },
        isCheckPassword(){//true:だめ,false:OK
            if (this.isInValidPassword){
                return false
            }else{
                return !(this.password1 == this.password2)
                
            }
            
        }

    }
}
</script>


<style scoped>

.signup-view{
}

.el-alert {
}

.error{
    color: #F56C6C;
    font-size: 80%;
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