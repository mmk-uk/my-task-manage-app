<template>
  <div class="category-view">
     

          <!-- ヘッダー -->
            <el-header height="100px">
                <el-row style="height: 60px;">
                    <el-col :span="4" style="text-align: left; height: 60px; line-height: 135px;"> 

                    </el-col>
                    <el-col :span="16" style="text-align: center; height: 60px; line-height: 135px;"> 
                        <span style="font-size:110%;">カテゴリの管理</span>
                    </el-col>
                    <el-col :span="4" style="text-align: right; height: 60px; line-height: 135px;"> 
                        <el-button v-if="!dragmode" @click="dragModeChange" type="primary" circle style="background-color: rgba(0,0,0,0); border:none;">
                            <mdicon name="swap-vertical" size="30" />
                        </el-button>
                        <el-button v-if="dragmode"  @click="dragModeChange" type="primary" circle style="background-color: rgba(0,0,0,0); border:none;">
                            <mdicon name="check" size="30" />
                        </el-button>
                    </el-col>

                </el-row>
            </el-header>
 
         <!-- ダイアログ -->   
            <!-- 新規カテゴリ --> 
          <modal name="add-category-modal" width="90%" height="200px">
            <div class="modal-header">
                <span style="font-weight:bold;font-size:130%;">新規カテゴリ</span>
            </div>
            <div class="modal-body">
                <div style="height:100%;margin-top:20px;">
                    <el-input v-model="categorytitle"></el-input>
                </div>
            </div>  
            <div class="modal-footer">
                <div style="text-align:left;width:100%">
                    <el-button @click="hideAddCategoryModal">キャンセル</el-button>
                </div>
                <div style="text-align:right">
                    <el-button type="primary" @click="AddCategory">追加する</el-button>
                </div>
            </div>
        </modal>

            <!-- カテゴリの編集 --> 
        <modal name="edit-category-modal" width="90%" height="200px">
            <div class="modal-header" style="display: flex;">
                <div style="text-align:left;width:100%">
                    <span style="font-weight:bold;font-size:130%;">カテゴリの編集</span>
                </div>
                <div style="text-align:right">
                    <el-button type="danger" @click="showDeleteCategoryModal">削除</el-button>
                </div>
            </div>
            <div class="modal-body">
                <div style="height:100%;margin-top:20px;">
                    <el-input v-model="categorytitle"></el-input>
                </div>
            </div>  
            <div class="modal-footer">
                <div style="text-align:left;width:100%">
                    <el-button @click="hideEditCategoryModal">キャンセル</el-button>
                </div>
                <div style="text-align:right">
                    <el-button type="primary" @click="updateCategory(selectcategory)">更新する</el-button>
                </div>
            </div>
        </modal>
            <!-- カテゴリの削除 --> 
        <modal name="delete-category-modal" width="90%" height="200px">
            <div class="modal-header">
                <span style="font-weight:bold;font-size:130%">カテゴリの削除</span>
            </div>
            <div class="modal-body">
                <div style="height:100%;margin-top:20px;">
                    <span>カテゴリにあるタスクも消えてしまいます。</span>
                    <span>本当に削除しますか？</span>
                </div>
            </div>  
            <div class="modal-footer">
                <div style="text-align:left;width:100%">
                    <el-button @click="hideDeleteCategoryModal">キャンセル</el-button>
                </div>
                <div style="text-align:right">
                    <el-button type="danger" @click="deleteCategory(selectcategory)">削除する</el-button>
                </div>
            </div>
        </modal>



         <!-- メイン -->   

        <div class="my-main">
             <!-- カテゴリ表示リスト -->   
            <div class="category-list">
                <draggable v-model="categoryData" :options="{handle: '.item-handle'}" >
                    <div v-for="(category) in $store.state.categorys" :key="category['order_num']" class="category-box"> 

                        <div style="width: 100%;margin-top: 14px;margin-left:7px;text-align: left;">
                            <span style=" font-size: 130%;">{{category['title']}}</span>
                        </div>
                        <div style="margin-top: 14px;margin-right: 7px;" >
                            <el-button v-if="!dragmode" circle class="my-button" @click="showEditCategoryModal(category)">
                                <mdicon name="pencil-outline" size="30"/>
                            </el-button>
                            <mdicon  v-if="dragmode" name="drag-horizontal-variant" size="30"  class="item-handle" />
                        </div>


                        
                    </div>
                </draggable>
            </div>
        </div>

         <div style="height: 100vh;;width:100%;">
            <!-- 戻るボタン -->
                <div class="bottom-left">
                    <el-button v-if="!dragmode" type="primary" circle class="back-button" @click="toMainView">
                        <mdicon name="chevron-left" size="40" />
                    </el-button>
                </div>

            <!-- 追加ボタン -->
                <div class="bottom-right">
                    <el-button v-if="!dragmode" type="primary" circle class="add-button" @click="showAddCategoryModal">
                        <mdicon name="plus" size="40" />
                    </el-button>
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
            categorytitle:"",
            selectcategory:{},
            addCategoryDialog:false,
            dragmode:false
        }
    },
    computed:{
        categoryData:{
            get() {
                return this.$store.state.categorys
            },
            set(value) {
                var newcategorydata = value;
                newcategorydata.forEach((category,i) => {
                    category.order_num = i+1;
                });
                console.log(newcategorydata);
                this.$store.commit('setCategorys', newcategorydata)
            }
        }
    },
    methods:{
        toMainView(){
            this.$router.push('/main');
        },

        //カテゴリ追加処理
        showAddCategoryModal(){
            this.categorytitle = "";
            this.$modal.show('add-category-modal');
        },
        hideAddCategoryModal(){
            this.$modal.hide('add-category-modal');
        },
        AddCategory(){
            if(this.categorytitle.length>0){
                this.$store.dispatch('addCategorys',this.categorytitle);
                this.$modal.hide('add-category-modal');
            }
        },

        //カテゴリ編集処理
        showEditCategoryModal(category){
            console.log(category.title);
            this.selectcategory = category;
            this.categorytitle = category.title;
            this.$modal.show('edit-category-modal');
        },
        hideEditCategoryModal(){
            this.$modal.hide('edit-category-modal');
        },
        updateCategory(category){
            if(this.categorytitle.length>0){
                this.$store.dispatch('chengetitleCategory',{category:category,newcategorytitle:this.categorytitle});
                this.$modal.hide('edit-category-modal');
            }
        },
        //カテゴリ消去処理
        showDeleteCategoryModal(){
            this.$modal.show('delete-category-modal');
        },
        hideDeleteCategoryModal(){
            this.$modal.hide('delete-category-modal');
        },
        deleteCategory(category){
            this.$store.dispatch('deleteCategory',category);
            this.categorytitle = "";
            this.$modal.hide('edit-category-modal');
            this.$modal.hide('delete-category-modal');
        },
        //カテゴリの順番変更処理
        dragModeChange(){
          if (this.dragmode == true){
            this.dragmode = false;

            this.$store.dispatch('updateCategorys', this.categoryData);
          }else{
            this.dragmode = true;
          }
        }
    }
}

</script>


<style scoped>

.category-view{
}

.el-header {
  z-index: 9000;
  width: 100%;
  padding: 10px 5px;
  position: fixed;
  top: 0;
}

.my-main{
    width: 100%;
    position:absolute;
    top:100px;
    

}

.category-list{
    padding: 10px;
    padding-bottom: 90px;

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

.bottom-left{
     z-index: 9999;

    position:fixed;
    bottom: 15px;
    left: 15px;
}

.back-button{
    z-index: 9000;
    background-color: #2E4C6D;
    border:none;

}

.bottom-right{
     z-index: 9999;

    position:fixed;
    bottom: 15px;
    right: 15px;
}

.add-button{
    z-index: 9000;
    background-color: #2E4C6D;
    border:none;
}



</style>