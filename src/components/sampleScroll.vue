<template>
    <div class="sample-scroll">
        <swiper :options="swiperOption">
            <swiper-slide class="text">
            <div class="content">
                <h4 class="title">乌合之众</h4>
                <p>あああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ</p>
                <p>あああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ</p>
                <p>あああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ</p>
                <p>あああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ</p>
                <p>あああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ</p>
                <p>あああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ</p>
                <p>あああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ</p>
                <p>あああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ</p>
                <p>あああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ</p>
                <p>あああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ</p>
                <p>あああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ</p>
                <p>あああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ</p>
                <p>あああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ</p>

            </div>
            </swiper-slide>
            <div class="swiper-scrollbar" slot="scrollbar"></div>
        </swiper>

    </div>
</template>

<script>
  export default {
    data() {
      return {
        swiperOption: {
          scrollbar: '.swiper-scrollbar',
          slidesPerView: 'auto',
          mousewheelControl: true,
          freeMode: true
        }
      }
    }
  }
</script>


<style lang="scss">
  .swiper-slide.text {
    font-size: 18px!important;
    text-align: left!important;
    height: auto;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 30px;
    > .content {
      > .title {
        margin: 0;
        text-align: center;
        margin-bottom: .75em;
      }
      > p,
      blockquote {
        line-height: 2;
        text-indent: 2em;
      }
      blockquote {
        background-color: #ddd;
        margin-left: 2em;
      }
    }
  }
</style>