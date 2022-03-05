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
                     <!-- カテゴリ名 -->  
                    <div class="category-label">
                        <el-row>
                            <el-col :span="20" class="flexbox3">
                                <div style="margin-top:13px">
                                    <mdicon name="check-circle-outline" size="35" />
                                </div>
                                <span style="font-size:190%;font-weight: 900;margin-top:10px;margin-left:5px">
                                    カテゴリタイトル
                                </span>
                                
                            </el-col>
                            <el-col :span="4" style="text-align: right;">

                            </el-col>
                        </el-row>
                    </div>


                    <!-- タスク・イベント表示 -->    
                    <div class="month-label">
                        <span style="font-weight: bold;font-size:110%">3月 </span><span style="font-size:60%">2022年</span>
                        <el-divider ></el-divider>
                    </div>

                    <div class="list-box">
                        <el-row style="height: 75px; margin-bottom: 8px;">
                            <el-col :span="2" style="height: 75px;">
                                <div class="flexbox1">
                                    <span style="font-weight: bold">2</span>
                                    <span style="font-size:70%">(水)</span>
                                </div>

                            </el-col>
                            <el-col :span="22" style="height: 75px;">
                                <TaskBox></TaskBox>  
                            </el-col>
                        </el-row>
                    </div>

                    <div class="list-box">
                        <el-row style="height: 60px; margin-bottom: 8px;">
                            <el-col :span="2" style="height: 60px;">
                                <div class="flexbox2">
                                    <span style="font-weight: bold">2</span>
                                    <span style="font-size:70%">(水)</span>
                                </div>

                            </el-col>
                            <el-col :span="22" style="height: 60px;">
                                <EventBox></EventBox> 
                            </el-col>
                        </el-row>
                    </div>






                    <div class="list-box">
                        <el-row style="height: 60px; margin-bottom: 8px;">
                            <el-col :span="2" style="height: 60px;">
                                <div class="flexbox2">
                                    <span style="font-weight: bold">2</span>
                                    <span style="font-size:70%">(水)</span>
                                </div>

                            </el-col>
                            <el-col :span="22" style="height: 60px;">
                                <EventBox></EventBox> 
                            </el-col>
                        </el-row>
                    </div>

                                        <div class="list-box">
                        <el-row style="height: 60px; margin-bottom: 8px;">
                            <el-col :span="2" style="height: 60px;">
                                <div class="flexbox2">
                                    <span style="font-weight: bold">2</span>
                                    <span style="font-size:70%">(水)</span>
                                </div>

                            </el-col>
                            <el-col :span="22" style="height: 60px;">
                                <EventBox></EventBox> 
                            </el-col>
                        </el-row>
                    </div>                    <div class="list-box">
                        <el-row style="height: 60px; margin-bottom: 8px;">
                            <el-col :span="2" style="height: 60px;">
                                <div class="flexbox2">
                                    <span style="font-weight: bold">2</span>
                                    <span style="font-size:70%">(水)</span>
                                </div>

                            </el-col>
                            <el-col :span="22" style="height: 60px;">
                                <EventBox></EventBox> 
                            </el-col>
                        </el-row>
                    </div>                    <div class="list-box">
                        <el-row style="height: 60px; margin-bottom: 8px;">
                            <el-col :span="2" style="height: 60px;">
                                <div class="flexbox2">
                                    <span style="font-weight: bold">2</span>
                                    <span style="font-size:70%">(水)</span>
                                </div>

                            </el-col>
                            <el-col :span="22" style="height: 60px;">
                                <EventBox></EventBox> 
                            </el-col>
                        </el-row>
                    </div>                    <div class="list-box">
                        <el-row style="height: 60px; margin-bottom: 8px;">
                            <el-col :span="2" style="height: 60px;">
                                <div class="flexbox2">
                                    <span style="font-weight: bold">2</span>
                                    <span style="font-size:70%">(水)</span>
                                </div>

                            </el-col>
                            <el-col :span="22" style="height: 60px;">
                                <EventBox></EventBox> 
                            </el-col>
                        </el-row>
                    </div>                    <div class="list-box">
                        <el-row style="height: 60px; margin-bottom: 8px;">
                            <el-col :span="2" style="height: 60px;">
                                <div class="flexbox2">
                                    <span style="font-weight: bold">2</span>
                                    <span style="font-size:70%">(水)</span>
                                </div>

                            </el-col>
                            <el-col :span="22" style="height: 60px;">
                                <EventBox></EventBox> 
                            </el-col>
                        </el-row>
                    </div>                    <div class="list-box">
                        <el-row style="height: 60px; margin-bottom: 8px;">
                            <el-col :span="2" style="height: 60px;">
                                <div class="flexbox2">
                                    <span style="font-weight: bold">2</span>
                                    <span style="font-size:70%">(水)</span>
                                </div>

                            </el-col>
                            <el-col :span="22" style="height: 60px;">
                                <EventBox></EventBox> 
                            </el-col>
                        </el-row>
                    </div>                    <div class="list-box">
                        <el-row style="height: 60px; margin-bottom: 8px;">
                            <el-col :span="2" style="height: 60px;">
                                <div class="flexbox2">
                                    <span style="font-weight: bold">2</span>
                                    <span style="font-size:70%">(水)</span>
                                </div>

                            </el-col>
                            <el-col :span="22" style="height: 60px;">
                                <EventBox></EventBox> 
                            </el-col>
                        </el-row>
                    </div>                    <div class="list-box">
                        <el-row style="height: 60px; margin-bottom: 8px;">
                            <el-col :span="2" style="height: 60px;">
                                <div class="flexbox2">
                                    <span style="font-weight: bold">2</span>
                                    <span style="font-size:70%">(水)</span>
                                </div>

                            </el-col>
                            <el-col :span="22" style="height: 60px;">
                                <EventBox></EventBox> 
                            </el-col>
                        </el-row>
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
    components: {
      TaskBox,
      EventBox
    },
    methods:{
        toMainView(){
            this.$router.push('/main');
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

.list-box{
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