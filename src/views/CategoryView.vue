<template>
  <div class="category-view">
     

          <!-- ヘッダー -->
            <el-header height="120px">
                <el-row style="height: 80px;">
                    <el-col :span="4" style="text-align: left; height: 80px; line-height: 170px;"> 
                        <el-button type="primary" circle style="border:none;background-color: rgba(0,0,0,0);" @click="toMainView">
                            <mdicon name="chevron-left" size="30" />
                        </el-button>
                    </el-col>
                    <el-col :span="16" style="text-align: center; height: 80px; line-height: 170px;"> 
                        <span style="font-size:110%;">カテゴリの管理</span>
                    </el-col>
                    <el-col :span="4" style="text-align: right; height: 80px; line-height: 170px;"> 
                        <el-button type="primary" circle style="border:none;background-color: rgba(0,0,0,0);" @click="addCategoryDialog = true">
                            <mdicon name="plus" size="30" />
                        </el-button>
                    </el-col>

                </el-row>
            </el-header>
        
        <el-dialog
            title="新規カテゴリ"
            :visible.sync="addCategoryDialog"
            width="80vw">
            <span>This is a message</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addCategoryDialog = false">Cancel</el-button>
                <el-button type="primary" @click="addCategoryDialog = false">Confirm</el-button>
            </span>
            </el-dialog>


         <!-- メイン -->   

        <div class="my-main">
            <!--
            <div style="padding: 10px;">
                <el-table
                    :show-header="false"
                    :data="categoryData"
                    style="width: 100%;"
                >
                    <el-table-column prop="title" label="タイトル" width="180"></el-table-column>
                    <el-tabel-column label="操作">
                        <el-button circle class="my-button">
                            <mdicon name="delete-outline" size="30" />
                        </el-button>
                    </el-tabel-column>
                </el-table>
            </div>
            -->
            <div class="category-list">
                <draggable v-model="categoryData" :options="{handle: '.item-handle'}">
                    <div v-for="(category,i) in categoryData" :key="i" class="category-box"> 
                        <div style="width: 100%;margin-top: 14px;margin-left:7px;text-align: left;">
                            <span style=" font-size: 130%;">{{category.title}}</span>
                        </div>
                        <div style="margin-top: 14px;margin-right: 7px;" >
                            <el-button circle class="my-button" >
                                <mdicon name="delete-outline" size="30" />
                            </el-button>
                        </div>
                        <div style="margin-top: 14px;margin-right: 7px;" >
                            <mdicon name="drag-horizontal-variant" size="30"  class="item-handle" />
                        </div>
                        
                    </div>
                </draggable>
            </div>
        </div>



                      
  </div>
</template>

<script>
import draggable from 'vuedraggable'


export default {
    components:{
         draggable,
    },
    data(){
        return{
            addCategoryDialog:false,
            categoryData: [{title:"カテゴリ1"},{title:"カテゴリ2"},{title:"カテゴリ3"},{title:"カテゴリ4"}]
        }
    },
    methods:{
        toMainView(){
            this.$router.push('/');
        },
        addCategory(){

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

.my-main{
    height: 85vh;
    position: fixed;
    width: 100%;
    margin-top: 120px;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;

}

.category-list{
    padding: 10px;
}

.my-button{
    background-color: rgba(0,0,0,0);;
    border:none;
    color: #303133;
    padding: 0px;
}

.category-box{
    height: 60px;
    margin: 10px;
    border: 2px solid #303133;
    border-radius: 7px;
    background-color: rgb(255, 255, 255);
    display: flex;

}

.el-dialog{
    margin-top: 30vh;
    border-radius: 21px;
}

</style>