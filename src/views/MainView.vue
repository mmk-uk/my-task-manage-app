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
                        <span style="font-size:110%;font-weight:bold">{{$store.state.today.getFullYear()}}年{{$store.state.today.getMonth()+1}}月{{$store.state.today.getDate()}}日</span>
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
                <el-row style="height: 45px;background-color:white">
                    <el-col :span="6" style="height: 45px;">
                        
                        <div class="all-tab" >
                        <el-button  type="text" v-on:click="ClickAllTab" style="width:100%">
                            <div  style="z-index: 9500;width:100%;padding-top: 0px;padding-bottom:6px;border-radius:0;" v-bind:class="[{'selected_all': selectedIndex === 0},{'not_selected_all':selectedIndex > 0}]">
                            <span class="all-title">
                                        すべて
                            </span>
                            </div>
                        </el-button>
                        </div>
                    </el-col>
                    <el-col :span="18" style="height: 45px;text-align:center">
                        <swiper
                            :options="swiperOptionThumbs" 
                            class="thumbs-swiper gallery-thumbs" 
                            ref="swiperThumbs"
                            @clickSlide="onSwiperClickSlide"
                            @slideChange="swipeTab"
                        >
                            <swiper-slide>

                            </swiper-slide>
                            <swiper-slide v-for="(category) in $store.state.categorys" :key="category['order_num']" v-bind:class="{'selected_slide': category['order_num'] === selectedIndex}">
                                <div style="width:100%;height:100%;text-align:center;padding-top:13px">
                                    <span class="category-title" style="font-size: 15px;">
                                        {{category['title']}}
                                    </span>
                                </div>
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
                @slideNextTransitionEnd="swipeNextEnd"
                @slidePrevTransitionEnd="swipePrevEnd"
            >
                <swiper-slide>
                        <ListDisplay :slideNum=0 :categorytitle="'全て'" :myreminds="myreminds"></ListDisplay>
                </swiper-slide>
                <swiper-slide v-for="(category) in $store.state.categorys" :key="category['order_num']">
                        <ListDisplay :slideNum="category['order_num']" :categorytitle="category['title']" :myreminds="myreminds.filter(v => v.category_id == category.id).sort(compareDate)"></ListDisplay>
                </swiper-slide>
            </swiper>

        <!-- 追加ボタン -->
            <div class="bottom-right" v-if="selectedIndex != 0">
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
            myreminds:[],
            categoryreminds:[],
            selectedIndex: 0,
            touchPointX:0,
            slides:[["スライド1",1],["スライド2",2],["スライド3",3],["スライド4",4],["スライド5",5],["スライド6",6],["スライド7",7],["スライド8",8]],
            swiperOptionTop: {
                slidesPerView: 1,
                spaceBetween:10,
                initialSlide: this.$store.state.ListNum
                
            },
            swiperOptionThumbs: {
                speed:300,
                spaceBetween: 0,
                initialSlide: 1,
                centeredSlides: true,
                slidesPerView: 5,
                slideToClickedSlide: true,
                freeMode:true
            }
        }
    },
    created(){
        const userinfo = JSON.parse(localStorage.getItem('userinfo')) || false;
        //console.log(userinfo)
        if(userinfo){
            this.$store.commit('setUserID',userinfo['userid']);
        }else{
            this.$router.push('/');
        }


        
        if(this.$store.state.categorys.length == 0){
            console.log("カテゴリ読み込み")
            this.$store.dispatch('getCategorys')
        }
        if(this.$store.state.reminds.length == 0){
            console.log("リマインズ読み込み")
            this.$store.dispatch('getReminds')
        }
        
        /*
        this.$nextTick(function() {
            if(this.$store.state.categorys.length == 0){
                console.log("カテゴリ読み込み")
                this.$store.dispatch('getCategorys')
            }
            if(this.$store.state.reminds.length == 0){
                console.log("リマインズ読み込み")
                this.$store.dispatch('getReminds')
            }
         });
         */
        



    },
    mounted() {

        //window.addEventListener("orientationchange", this.changeDirection);
        this.$refs.swiperTop.$swiper.slideTo(this.$store.state.ListNum);
        this.selectedIndex = this.$refs.swiperTop.$swiper.activeIndex;
        this.$store.commit('changeListNum',this.selectedIndex);
        this.$nextTick(function() {
            this.myreminds = this.$store.state.reminds.sort(this.compareDate);
        })

        // window.addEventListener("popstate", this.handlePopstate);


        
    },
    updated(){
        //this.$refs.swiperThumbs.$swiper.slideTo(1);
        //if(this.$store.state.ListNum){
            //this.$refs.swiperTop.$swiper.slideTo(this.$store.state.ListNum);
        //}
    },
    methods:{
        onSwipe() {
            this.selectedIndex = this.$refs.swiperTop.$swiper.activeIndex;
            this.$store.commit('changeListNum',this.selectedIndex)
            //console.log(this.$store.state.ListNum)

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
        swipeNextEnd(){
            //console.log(this.$refs.swiperTop.$swiper.activeIndex -1)
            let num = this.$refs.swiperTop.$swiper.activeIndex -1
            var element = document.getElementById("scrollList"+ num)
            element.scrollTo(0,0)
        },
        swipePrevEnd(){
            //console.log(this.$refs.swiperTop.$swiper.activeIndex +1)
            let num = this.$refs.swiperTop.$swiper.activeIndex + 1
            var element = document.getElementById("scrollList"+ num)
            element.scrollTo(0,0)
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
        },
        swipeTab(){
            //console.log(this.$refs.swiperThumbs.$swiper.activeIndex)
        },
        compareDate(a,b){
            return a.date - b.date;
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
     width: calc(100% + 5px);
     margin-top: 100px;
     margin-left: -5px;
}

.all-tab{
    z-index: 9000;
    height: 45px;
    position: fixed;
    width: 27vw;
    background-color: white;
    text-align: center;
    
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
    width:100%;
    display: inline-block;
    font-size: 15px;
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

<style>

.main-swiper .swiper-wrapper{
   min-height: 100vh;
}

.main-swiper .swiper-wrapper .swiper-slide{
   min-height: 100vh;
}

</style>