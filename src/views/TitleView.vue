<template>
    <div class="title-view">
        <div class="my-main">
            <div>
                <el-image
                :src="require('../assets/AppLogo2.jpg')"
                style="width:75vw;max-width:300px"
                :fit="'contain'"
                >
                </el-image>
            </div>
            <div>
                <h1>タスク管理アプリ</h1>
            </div>
            <div style="margin-top:5vh;text-align:center">

                    <div style="display: flex;width:250px;margin:auto;justify-content: space-between;">

                        <el-button type="primary" class="custom-button" @click="toSignupView">新規登録</el-button>

                        <el-button type="primary" class="custom-button" @click="toSigninView">ログイン</el-button>
    
                    </div>
            </div>
        </div>
    </div>
</template>

<script>

export default{
    methods:{
        toSignupView(){
            this.$router.push('/signup');
        },
        toSigninView(){
            this.$router.push({name:'signin',params:{sendmail: ""}})
        }
    }
}

</script>

<style scoped>
.title-view{
    text-align: center;
}
.my-main{
    width: 100%;
    position:fixed;
    top:100px;

}

.custom-button{
    background-color: #2E4C6D;
    border:none;
}

</style>
