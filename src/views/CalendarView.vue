<template>
    <div class="scroll-display"  :id="'scrollList'+slideNum">
    <div class="list-display">
        <div class="category-label">
            <el-row>
                <el-col :span="20" class="flexbox3">
                    <span style="font-size:190%;font-weight: 900;margin-top:0px;margin-left:5px">
                        {{categorytitle}}
                    </span>

                    
                </el-col>
                <el-col :span="4" style="text-align: right;">

                </el-col>
            </el-row>
        </div>

        <div class="list-view">

           <FullCalendar :options="calendarOptions" />

        </div>



        

    </div>
    </div>
</template>

<script>
import '@fullcalendar/core/vdom' // solves problem with Vite
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction';


export default {

     props: ["slideNum","categorytitle","myreminds"],
    components: {
         FullCalendar // make the <FullCalendar> tag available

    },
    data(){
        return{
            calendarOptions: {
                plugins:[ dayGridPlugin,interactionPlugin ],
                initialView: 'dayGridMonth',
                events: this.calenderEvent(this.myreminds)
            }
        }
    },
    methods:{
        calenderEvent(reminds){
            const events = []

            reminds.forEach(remind => {
                events.push({title:remind.title,date:remind.date})
            });

            return events
        }
    }
}

</script>




<style scoped>

.scroll-display{
    height: 100vh;
    
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
}

.list-display{
    width: 96%;
    
    margin-left: 10px;
    margin-right: 5px;
    margin-top: 150px;

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


.month-label{
    margin-top: 35px;
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
  margin-top: 13px;
}
.flexbox3{
  display: flex;
  flex-direction: column;
  text-align: left;
}

.my-button{
    background-color: rgba(0,0,0,0);;
    border:none;
    padding:3px 5px 0px 0px;
}



</style>

<style>
.fc-media-screen{
    height:calc(100vh - 330px);
}

</style>