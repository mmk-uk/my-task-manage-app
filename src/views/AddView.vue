<template>
  <div class="add-view">
     

          <!-- ヘッダー -->
            <el-header height="120px">
                <el-row style="height: 80px;">
                    <el-col :span="4" style="text-align: left; height: 80px; line-height: 170px;"> 
                        <el-button type="primary" circle class="my-button" @click="toMainView">
                            <mdicon  name="chevron-left" size="30" />
                        </el-button>
                    </el-col>
                    <el-col :span="16" style="text-align: center; height: 80px; line-height: 170px;"> 
                        <span style="font-size:110%;">タスク・イベント追加</span>
                    </el-col>
                    <el-col :span="4" style="text-align: right; height: 80px; line-height: 170px;"> 

                    </el-col>

                </el-row>
            </el-header>


         <!-- メイン -->   


                      
  </div>
</template>

<script>
export default {
    methods:{
        toMainView(){
            this.$router.push('/');
        }
    }
}

</script>


<style scoped>

.el-header {
  z-index: 9000;
  width: 100%;
  padding: 10px 5px;
  position: fixed;
}
.my-button{
    background-color: rgba(0,0,0,0);;
    border:none;
}


</style>