<template>
  <div class="main">
     

          <!-- ヘッダー -->
            <el-header height="100px">
                <el-row style="height: 60px;">
                    <el-col :span="4" style="text-align: left; height: 60px; line-height: 135px;"> 
                        <el-button type="primary" circle class="my-button" @click="toConfigView">
                            <mdicon name="menu" size="30" />
                        </el-button>
                    </el-col>
                    <el-col :span="16" style="text-align: center; height: 60px; line-height: 135px;"> 
                        <span style="font-size:110%;">2022年2月24日</span>
                    </el-col>
                    <el-col :span="4" style="text-align: right; height: 60px; line-height: 135px;"> 
                        <el-button type="primary" circle class="my-button" @click="toCategoryView">
                            <mdicon name="tab" size="30" />
                        </el-button>
                    </el-col>

                </el-row>
            </el-header>

         <!-- タブ -->
            <div class="tab-area">
                <el-row style="height: 40px;">
                    <el-col :span="6" style="height: 40px;">
                        
                        <div class="all-tab" v-bind:class="[{'selected_all': selectedIndex === 0},{'not_selected_all':selectedIndex > 0}]">
                        <el-button  type="text" v-on:click="ClickAllTab" style="padding-top: 18px;">
                            <span class="all-title">
                                        全て
                            </span>
                        </el-button>
                        </div>
                    </el-col>
                    <el-col :span="18" style="height: 40px;">
                        <swiper
                            :options="swiperOptionThumbs" 
                            class="thumbs-swiper gallery-thumbs" 
                            ref="swiperThumbs"
                            @clickSlide="onSwiperClickSlide"
                        >
                            <swiper-slide>

                            </swiper-slide>
                            <swiper-slide v-for="(slide) in slides" :key="slide[1]" v-bind:class="{'selected_slide': slide[1] === selectedIndex}">
                                <span class="category-title">
                                    {{slide[0]}}
                                </span>
                            </swiper-slide>
                        </swiper>

                    </el-col>
                </el-row>


            </div>

         <!-- メイン -->   
            <swiper
                class="main-swiper"
                :options="swiperOptionTop"
                ref="swiperTop"
                @swiper="onSwipe"
                @slideChange="onSwipe"
                @touchStart="swipeStart"
                @touchMove="swipeBackAll"
            >
                <swiper-slide>
                        <ListDisplay :categorytitle="'全て'"></ListDisplay>
                </swiper-slide>
                <swiper-slide v-for="(slide) in slides" :key="slide[1]">
                        <ListDisplay :categorytitle="slide[0]"></ListDisplay>
                </swiper-slide>
            </swiper>

        <!-- 追加ボタン -->
            <div class="bottom-right">
                <el-button type="primary" circle class="add-button" @click="toAddView">
                    <mdicon name="plus" size="40" />
                </el-button>
            </div>
                      
  </div>
</template>

<script>
import ListDisplay from "@/components/ListDisplay";

export default {
    components: {
        ListDisplay
    },
    data(){
        return{
            selectedIndex: 0,
            touchPointX:0,
            slides:[["スライド1",1],["スライド2",2],["スライド3",3],["スライド4",4],["スライド5",5],["スライド6",6],["スライド7",7],["スライド8",8]],
            swiperOptionTop: {
                slidesPerView: 1,
                spaceBetween:10
                
            },
            swiperOptionThumbs: {
                speed:300,
                spaceBetween: 0,
                centeredSlides: true,
                slidesPerView: 5,
                slideToClickedSlide: true,
                freeMode:true,
                initialSlide: 1
            }
        }
    },
    mounted() {
        window.addEventListener("orientationchange", this.changeDirection);
        this.selectedIndex = this.$refs.swiperTop.$swiper.activeIndex;
        //this.$refs.swiperThumbs.$swiper.slideTo(1);
        //this.$nextTick(() => {
			//const swiperTop = this.$refs.swiperTop.$swiper
			//const swiperThumbs = this.$refs.swiperThumbs.$swiper
			//swiperTop.controller.control = swiperThumbs
			//swiperThumbs.controller.control = swiperTop
        //});
    },
    methods:{
        onSwipe() {
            this.selectedIndex = this.$refs.swiperTop.$swiper.activeIndex;

        },
        onSwiperClickSlide(){
            this.$refs.swiperTop.$swiper.slideTo(this.$refs.swiperThumbs.$swiper.activeIndex);
        },
        ClickAllTab(){
            this.$refs.swiperTop.$swiper.slideTo(0);

        },
        swipeStart(event){
            //console.log(event.touches[0].pageX)
            this.touchPointX = event.touches[0].pageX
        },
        swipeBackAll(event){
            if(this.selectedIndex === 1){
                var sliderMovedToLeft = event.touches[0].pageX- this.touchPointX < 0;
                if (sliderMovedToLeft){
                    const swiperTop = this.$refs.swiperTop.$swiper
                    const swiperThumbs = this.$refs.swiperThumbs.$swiper
                    swiperTop.controller.control = swiperThumbs
                }else{
                    const swiperTop = this.$refs.swiperTop.$swiper
                    swiperTop.controller.control = null
                    this.$refs.swiperThumbs.$swiper.slideTo(1);
                }
            }
            

        },
        toCategoryView(){
            this.$router.push('/categorymanage');
        },
        toAddView(){
            this.$router.push('/add');
        },
        toConfigView(){
            this.$router.push('/config');
        },
        changeDirection(){
            //console.log("端末の向きが " + screen.orientation.angle + "になりました。");
            if (Math.abs(screen.orientation.angle) === 90) {
                //console.log("横");
                // 横向きになったときの処理

            } else {
                //console.log("縦");
                // 縦向きになったときの処理

            }
        }
    },
    watch:{
        selectedIndex(){
            if (this.selectedIndex === 0) {
                const swiperTop = this.$refs.swiperTop.$swiper
                swiperTop.controller.control = null
                this.$refs.swiperThumbs.$swiper.slideTo(1);

            }else{
                const swiperTop = this.$refs.swiperTop.$swiper
                const swiperThumbs = this.$refs.swiperThumbs.$swiper
                swiperTop.controller.control = swiperThumbs

            }
        }
    }
}
</script>


<style scoped>

.main{
    z-index: -9999;
    
}
.el-header {
  z-index: 9000;
  width: 100%;
  padding: 10px 5px;
  position: fixed;
}
.el-main {
  
  padding: 100px 5px 5px;
  height: 110%;
  width: 100%;
  position: fixed;

}


.list-area{
    height:100%;
    width: 100%;
    position: fixed;
}

.main-swiper{
    min-height: 100vh;
}


.tab-area {
    z-index: 8900;
     height: 60px;
     position: fixed;
     width: 100%;
     margin-top: 100px;
     margin-left: -5px;
}

.all-tab{
    z-index: 9000;
    height: 40px;
    position: fixed;
    width: 25vw;
    background-color: white;
    
}

.selected_all{
    border-bottom: 4px solid #FFBCBC;
}


.thumbs-swiper {
    height: 40px;
    position: fixed;
    margin-left: -45vw;
    width: 120%;
    background-color: white;


}

.all-title {
    color: #303133;
    width:100px;
    display: inline-block;
    font-size: 17px;

}

.category-title {
    width:100px;
    display: inline-block;
}


.thumbs-swiper .swiper-wrapper{
    margin: 5px;
}

.thumbs-swiper .swiper-wrapper .swiper-slide{
    margin-top:-4px;
    position: relative;
}

.thumbs-swiper .swiper-wrapper .selected_slide {
    
     border-bottom: 4px solid #FFBCBC;

}

.category-title{
    position: absolute;
	bottom: 0;
    left: -5px;
    font-size: 14px;
    
}


.bottom-right{
     z-index: 9999;

    position: fixed;
    bottom: 15px;
    right: 15px;
}
.my-button{
    background-color: rgba(0,0,0,0);;
    border:none;
}
.add-button{
    z-index: 9000;
    background-color: #2E4C6D;
    border:none;
}


</style>