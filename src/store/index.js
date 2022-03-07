import Vue from 'vue'
import Vuex from 'vuex'
import { getFirestore, collection, getDocs,doc,updateDoc,setDoc,query,orderBy, deleteDoc } from "firebase/firestore";
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
    addReminds (state,remind){
      state.reminds.push(remind)
    }
  },

  actions: {
    async getCategorys({ commit, state }){
      if(state.categorys.length === 0){
        commit('initCategorys')
        const db = getFirestore();
        const categorysRef = collection(db,'users',state.userid,'categorys');
        const categoryQuery = query(categorysRef,orderBy('order_num'))
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
    async chengetitleCategory({ commit, state }, {category,newcategorytitle}){
      //if(newcategorys != state.categorys){
        const db = getFirestore();
        const newcategory = {title:newcategorytitle,id:category.id,order_num:category.order_num};
        commit('editCategory',newcategory);
        await updateDoc(doc(db,'users',state.userid,'categorys', category.id),{title:newcategorytitle});
      //}
    },
    async deleteCategory({ commit, state }, category){
      //if(newcategorys != state.categorys){
        const db = getFirestore();
        commit('removeCategory',category);
        await deleteDoc(doc(db,'users',state.userid,'categorys', category.id));
        await Promise.all(
          state.categorys.map(
            async category => 
              await updateDoc(doc(db,'users',state.userid,'categorys', category.id),{order_num:category.order_num})
            )
        )
      //}
    }


  },
  modules: {
  }
})
