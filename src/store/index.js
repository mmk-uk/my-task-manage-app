import Vue from 'vue'
import Vuex from 'vuex'
import { getFirestore, collection, getDocs,doc,updateDoc,setDoc,query,orderBy, deleteDoc ,Timestamp} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userid:"",
    ListNum:0,
    categorys:[],
    reminds:[]
  },
  getters: {

  },

  mutations: {
    setUserID(state,id){
      state.userid = id;
    },
    changeListNum(state, newListNum){
      state.ListNum = newListNum;
    },

    //カテゴリ操作
    initCategorys (state) {
      state.categorys = []
    },
    setCategorys (state,categorys){
      state.categorys = categorys
    },
    newCategorys (state, newcategory){
      state.categorys.push(newcategory);
    },
    editCategory (state,newcategory){
      const index = state.categorys.findIndex((v) => v.id === newcategory.id);
      state.categorys[index].title = newcategory.title
    },
    removeCategory(state,selectedcategory){
      const index = state.categorys.findIndex((v) => v.id === selectedcategory.id);
      state.categorys.splice(index,1);
      state.categorys.forEach((category,i) => {
        category.order_num = i+1;
      });
    },
    

    //リマインド操作
    initReminds (state) {
      state.reminds = []
    },
    newReminds (state,remind){
      state.reminds.push(remind)
    },
    changeReminds (state,remind){
      const index = state.reminds.findIndex((v) => v.id === remind.id)
      state.reminds[index] = remind
    },
    removeReminds (state,remind_id){
      const index = state.reminds.findIndex((v) => v.id === remind_id)
      state.reminds.splice(index,1);
    },
    changeDone(state,remind_id){
      const index = state.reminds.findIndex((v) => v.id === remind_id)
      state.reminds[index].done_task = !state.reminds[index].done_task
    }

  },

  actions: {
    //カテゴリ操作
    async getCategorys({ commit, state }){
      if(state.categorys.length === 0){
        commit('initCategorys')
        const db = getFirestore();
        const categorysRef = collection(db,'users',state.userid,'categorys');
        const categoryQuery = query(categorysRef,orderBy('order_num'));
        const querySnapshot = await getDocs(categoryQuery);
        querySnapshot.forEach((doc) => {
            commit('newCategorys',{id: doc.data().id, title:doc.data().title, order_num:doc.data().order_num})
        });
      }
    },
    async addCategorys({ commit, state }, newcategorytitle){
      const db = getFirestore();
      const newcategory_id = uuidv4();
      const newcategory = {title:newcategorytitle,id:newcategory_id,order_num:state.categorys.length+1};
      commit('newCategorys',newcategory);
      const categoryRef = doc(db,'users',state.userid,'categorys', newcategory_id);
      await setDoc(categoryRef,newcategory);
    },
    async updateCategorys({ commit, state }, newcategorys){
      //if(newcategorys != state.categorys){
        console.log(newcategorys)
        const db = getFirestore();
        commit('setCategorys',newcategorys)
        await Promise.all(
          newcategorys.map(
            async category => 
              await updateDoc(doc(db,'users',state.userid,'categorys', category.id),{order_num:category.order_num})
            )
        )
      //}
    },
    async changetitleCategory({ commit, state }, {category,newcategorytitle}){
        const db = getFirestore();
        const newcategory = {title:newcategorytitle,id:category.id,order_num:category.order_num};
        commit('editCategory',newcategory);
        await updateDoc(doc(db,'users',state.userid,'categorys', category.id),{title:newcategorytitle});
    },
    async deleteCategory({ commit, state }, category){
        const db = getFirestore();
        commit('removeCategory',category);
        await deleteDoc(doc(db,'users',state.userid,'categorys', category.id));
        await Promise.all(
          state.categorys.map(
            async category => 
              await updateDoc(doc(db,'users',state.userid,'categorys', category.id),{order_num:category.order_num})
            )
        )
    },
    //リマインズ操作
    async getReminds({ commit, state }){
      if(state.reminds.length === 0){
        commit('initReminds')
        const db = getFirestore();
        const eventsRef = collection(db,'users',state.userid,'events');
        const queryEventsSnapshot = await getDocs(eventsRef);
        queryEventsSnapshot.forEach((doc) => {
            const tmpevent = {
              type : "event",
              id : doc.data().id,
              category_id : doc.data().category_id,
              title : doc.data().title,
              date : doc.data().date.toDate(),
              end_time_flag : doc.data().end_time_flag,
              end_date :doc.data().end_date.toDate()
            }
            commit('newReminds',tmpevent)
        });
        const tasksRef = collection(db,'users',state.userid,'tasks');
        const queryTasksSnapshot = await getDocs(tasksRef);
        queryTasksSnapshot.forEach((doc) => {
            const tmptask = {
              type : "task",
              id : doc.data().id,
              category_id : doc.data().category_id,
              title : doc.data().title,
              date : doc.data().date.toDate(),
              limit_time_flag : doc.data().limit_time_flag,
              done_task :doc.data().done_task
            }
            commit('newReminds',tmptask)
        });


      }
    },
    async addTasks({ commit, state }, newtask){
      const db = getFirestore();
      commit('newReminds',newtask);
      const addnewtask = {
        id : newtask.id,
        category_id : newtask.category_id,
        title :  newtask.title,
        date :  Timestamp.fromDate(newtask.date),
        limit_time_flag : newtask.limit_time_flag,
        done_task : newtask.done_task
      }
      const taskRef = doc(db,'users',state.userid,'tasks', newtask.id);
      await setDoc(taskRef,addnewtask);
    }, 
    async addEvents({ commit, state }, newevent){
      const db = getFirestore();
      commit('newReminds',newevent);
      const addnewevent = {
        id : newevent.id,
        category_id : newevent.category_id,
        title :  newevent.title,
        date :  Timestamp.fromDate(newevent.date),
        end_date : Timestamp.fromDate(newevent.end_date),
        end_time_flag : newevent.end_time_flag
      }
      const eventRef = doc(db,'users',state.userid,'events', newevent.id);
      await setDoc(eventRef,addnewevent);
    },
    async updateTasks({ commit, state }, newtask){
      const db = getFirestore();
      commit('changeReminds',newtask);
      //console.log(typeof(newtask.date))
      //console.log(newtask.date)
      const changenewtask = {
        title :  newtask.title,
        date :  Timestamp.fromDate(newtask.date),
        limit_time_flag : newtask.limit_time_flag
      }
      const taskRef = doc(db,'users',state.userid,'tasks', newtask.id);
      await updateDoc(taskRef,changenewtask);
    }, 
    async updateEvents({ commit, state }, newevent){
      const db = getFirestore();
      commit('changeReminds',newevent);
      const changenewevent = {
        title :  newevent.title,
        date :  Timestamp.fromDate(newevent.date),
        end_date : Timestamp.fromDate(newevent.end_date),
        end_time_flag : newevent.end_time_flag
      }
      const eventRef = doc(db,'users',state.userid,'events', newevent.id);
      await updateDoc(eventRef,changenewevent);
    },
    async deleteTask({ commit, state }, task_id){
        const db = getFirestore();
        commit('removeReminds',task_id);
        await deleteDoc(doc(db,'users',state.userid,'tasks', task_id));
    },
    async deleteEvent({ commit, state }, event_id){
        const db = getFirestore();
        commit('removeReminds',event_id);
        await deleteDoc(doc(db,'users',state.userid,'events', event_id));
    },
    async changeDoneTask({ commit, state }, task_id){
      const db = getFirestore();
      commit('changeDone',task_id);
      const index = state.reminds.findIndex((v) => v.id === task_id)
      const taskRef = doc(db,'users',state.userid,'tasks', task_id);
      await updateDoc(taskRef,{done_task:state.reminds[index].done_task});
    }


  },
  modules: {
  }
})
