<template>
    <div class="list-display">
        <div class="category-label">
            <el-row>
                <el-col :span="20" class="flexbox3">
                    <span style="font-size:190%;font-weight: 900;">
                        {{categorytitle}}
                    </span>
                    <span style="font-size:80%">タスク: 3 イベント: 2</span>
                    
                </el-col>
                <el-col :span="4" style="text-align: right;">
                    <el-button circle class="my-button" @click="toArchiveView">
                        <mdicon name="archive-check-outline" size="40" />
                    </el-button>
                </el-col>
            </el-row>
        </div>

        <div class="list-view">


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
         
        </div>



        

    </div>
</template>

<script>
import TaskBox from "@/components/TaskBox";
import EventBox from "@/components/EventBox";

export default {
     props: ["categorytitle"],
    components: {
      TaskBox,
      EventBox
    },data(){
        return{
            swiperOptionScroll:{   
                direction: 'vertical',
                mousewheel:true,
                scrollContainer:true,
                freeMode:true,
                iOSEdgeSwipeDetection:true

            }
        }
    },
    methods:{
        toArchiveView(){
            this.$router.push('/archive');
        }
    }
}

</script>

<style scoped>
.list-display{
    width: 96%;
    height: 100%;
    margin-left: 10px;
    margin-right: 5px;
    margin-top: 180px;

}
.category-label{
    margin-top: 15px;
    margin-bottom: 10px;
    margin-left: 0px;
    text-align: left;
    background-color: white;
}

.list-view{
     z-index: 9998;
    text-align: left;
    height: 70%;
    margin-bottom: 100px;


}

.list-box{
}

.scroll-content {
    z-index: 9999;
  height:100%;

}

.swiperList{
    height: 100%;
}

.swiperList .swiper-wrapper{
    height: 100%;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
}

.swiperList .swiper-wrapper .swiper-slide{
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    
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
  flex-direction: column;
  text-align: left;
}

.my-button{
    background-color: rgba(0,0,0,0);;
    border:none;
}



</style>