<template>
    <div ref="learnerCont">
    <!--page header start -->
        <div class="page-header">
            <div class="row align-items-end">
                <div class="col-lg-8">
                    <div class="page-header-title">
                        <i class="ik ik-file-text bg-blue"></i>
                        <div class="d-inline">
                            <h5>Apprenants</h5>
                            <span>Liste des apprenants</span>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <nav class="breadcrumb-container" aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">

                                 <router-link to="/home">
                                   <i class="ik ik-home"></i><span> Accueil</span>
                                 </router-link>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">Apprenants</li>
                        </ol>
                    </nav>
                </div>
            </div>    
        </div>
        <div id="vue-app" class="lobby-container">
            <div @click="cancelSearch" v-if="searchKey || countrySelected || grapesSelected" class="cancel">
                <h5>Annuler recherche</h5>
                <i class="fas fa-times"></i>
            </div>
            <ul>
                <li v-on:click="searchInput('name')" class="name">
                <i class="fas fa-search"></i>
                <input v-if="inputType == 'name'" v-model="searchKey" type="search" class="search" placeholder="Entrez le nom d'un enfant...">
                </li>

                <li v-on:click="searchInput('country');" class="country">
                <i class="fas fa-globe-africa"></i>
                <select v-show="inputType == 'country'" v-model="countrySelected">
                    <option value="">Choisissez un pays</option>
                    <option v-for="option in countryOption" :key="option.id" :value="option.id">{{option.name}}</option>
                </select>
                </li>

                <li v-on:click="searchInput('grapes')" class="grapes">
                <i class="fa fa-mars-double"></i>
                <div class="radio-container" v-if="inputType == 'grapes'">
                    <div v-for="grape in grapesRadio" :key="grape.name" class="radio">
                    <label :for="grape.name">{{grape.name}}</label>
                    <input v-model="grapesSelected" :id="grape.name" :value="grape.name" type="radio" class="radio-button">
                    </div>
                </div>
                </li>
            </ul>

            <h1 v-if="inputType == ''" class="title">Liste des Enfants</h1>
            <h3 v-if="search.length == 0">Aucun résultat</h3>

            <transition-group name="item-anim" tag="div" class="list-container">
                <div v-for="(learner) in search" :key="learner.idEnfant" class="wine-list">
                <div class="wine-card">
                    <div class="card-header">
                    <h2>{{learner.prenom}}</h2>
                    <!--<i @click="removeItem(id)" class="fas fa-times"></i>-->
                    </div>
                    <div class="container">
                    <div class="text-container">
                        <div class="buttons">
                            <h4>{{learner.age}} ans</h4>
                            <h4 v-if="learner.sexe =='m'">garçon</h4>
                            <h4 v-if="learner.sexe =='f'">fille</h4>
                            <h4>{{learner.langue}}</h4>
                        </div>
                        <div class="location">
                        <i class="fas fa-map-marker-alt"></i>
                        <span> {{learner.parent.pays}}</span>
                        </div>
                        <p>{{learner.parent.ville}}</p>
                    </div>
                    <img :src="getImgUrl(learner.avatar)" alt="photo-avatar">
                    </div>
                </div>
                </div>
            </transition-group>
 
        </div>
        <b-pagination
            v-model="page"
            :total-rows="count"
            :per-page="pageSize"
            prev-text="Prev"
            next-text="Next"
            @change="handlePageChange"
        ></b-pagination>
    </div>
   
</template>
<script>
import Vue from 'vue'
import VueMoment from 'vue-moment'
import moment from 'moment-timezone'
Vue.use(VueMoment, {
    moment,
})
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
// define the plugin and pass object for config
Vue.use(Loading, {
    color: '#000000',
    width: 64,
    height: 64,
    backgroundColor: '#ffffff',
    opacity: 0.5,
    zIndex: 999
});
import AllLearnersDetails from '@/views/learners/AllLearnersDetails.vue'
export default {
    name:'AllLearners2',
    data: () => {
    return {
      page:1,
      count:0,
      pageSize:6,
      totalItems:0,
      learners: [],
      countryList: [],
      inputType: "",
      searchKey: "",
      countryOption: [],
      countrySelected: "",
      grapesRadio: [
        { name: "M" },
        { name: "F" },
      ],
      grapesSelected: "",
    };
  },
  computed: {
    search() {
      return this.learners.filter((learner) => {
        return (
          learner.prenom.toLowerCase().includes(this.searchKey.toLowerCase()) &&
          learner.parent.pays
            .toLowerCase()
            .includes(this.countrySelected.toLowerCase()) &&
          learner.sexe.toLowerCase().includes(this.grapesSelected.toLowerCase())
        );
      });
    },
  },
  methods: {
     getRequestParams(page, pageSize){
      let params={};
      if(page){
        params["page"]= page -1
      }
      if(pageSize){
        params["size"]=pageSize
      }
      return params;
    },
    handlePageChange(value){
      this.page=value;
      this.retrieveLearners();
    },
     //recherche de quiz par son Libelle
    retrieveLearners(){
      let homeCont = this.$refs.learnerCont;
        let loader = this.$loading.show({
          container: homeCont,
          loader: "spinner",
          color: "black",
        });
      const params=this.getRequestParams(
        this.page,
        this.pageSize
      );
      axios.get("/enfants",{ params }).then(response => {
        console.log(response)
        const { learners, totalItems } = response.result;
      this.totalItems=response.result.totalItems;
        this.learners = response.result.data;
        this.count=response.result.totalItems;
        loader.hide();
      })
      .catch((error) => {
        console.log(error)
      });
    },
    getImgUrl(pic) {
      //return "/img/avatars/"+pic;
      return pic;
    },
    searchInput(arg) {
      this.inputType = arg;
    },
    removeItem(id) {
      this.$delete(this.learners, id);
    },
    cancelSearch() {
      this.searchKey = "";
      this.countrySelected = "";
      this.grapesSelected = "";
    },
  },
  async mounted() {
    await this.retrieveLearners();
  },

  
}
</script>
<style scoped>
@font-face {
  font-family: "font-1";
   src:  url(/fonts/SourceSansPro-Bold.ttf);
}
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  list-style-type: none;
}

a, a:visited {
  color: #eee;
  text-decoration: none;
}

input, select {
  outline: none;
  background: #B01735;
  border: none;
}

body {
  font-family: "font-1", sans-serif;
  background: #B01735;
  color: #eee;
}

#root {
  transition: 0.3s;
}

i {
  cursor: pointer;
}

.lobby-container {
  background: #3E0018;
  height: 100%;
  min-height: 90vh;
  border-radius: 56px 56px 20px 20px;
  margin: 54px auto 20px;
  padding-bottom: 20px;
  max-width: 1150px;
}
.lobby-container .cancel {
  display: flex;
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  border: 2px solid #eee;
  border-radius: 25px;
  padding: 10px 16px;
  cursor: pointer;
  transition: 0.2s;
}
.lobby-container .cancel i {
  transform: translate(4px, 2px);
  font-size: 0.8rem;
}
.lobby-container .cancel:hover {
  background: #eee;
  color: #3E0018;
}
.lobby-container ul {
  display: flex;
  justify-content: space-around;
  font-size: 2.5rem;
  width: 95%;
  margin: 0 auto 0;
  position: relative;
  color: #3E0018;
}
.lobby-container ul li {
  background: #EAE0DA;
  padding: 10px 18px;
  width: 70px;
  text-align: center;
  border-radius: 50%;
  margin-top: -34px;
  box-shadow: 0 0 4px #333;
  cursor: pointer;
  transition: 0.3s;
}
.lobby-container ul .search,
.lobby-container ul select,
.lobby-container ul .radio-container {
  border-radius: 40px;
  height: 60px;
  position: absolute;
  top: 45px;
  padding: 0 20px;
  color: #3E0018;
  max-width: 550px;
}
.lobby-container ul .name input {
  left: 0px;
  width: 90%;
  transform-origin: left;
  transform: scaleX(0);
  animation: animInput 0.5s ease forwards;
  font-family: "font-1", sans-serif;
}
.lobby-container ul .name input::placeholder {
  font-size: 1.3rem;
  color: #3E0018;
  transform: translateY(2px);
}
@keyframes animInput {
  to {
    transform: scaleX(1);
  }
}
.lobby-container ul .name i {
  transform: translateX(-2px);
}
.lobby-container ul .country i {
  transform: translate(-1px, 1px);
}
.lobby-container ul .country select {
  left: 50%;
  transform: translateX(-50%);
  width: 320px;
  animation: animInput2 0.4s ease forwards;
  transform: scaleX(0);
  transform-origin: left;
  background: #B01735;
  border: none;
  outline: none;
  z-index: 2;
  font-size: 1.3rem;
  text-align: center;
  color: #3E0018;
  font-family: "font-1", sans-serif;
}
@keyframes animInput2 {
  to {
    transform: scaleX(1) translateX(-50%);
  }
}
.lobby-container ul .grapes .radio-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  right: 0;
  width: 20%;
  background: #B01735;
  transform-origin: right;
  transform: scaleX(0);
  animation: animInput 0.5s ease forwards;
}
@media screen and (max-width: 650px) {
  .lobby-container ul .grapes .radio-container {
    width: 100%;
  }
}
.lobby-container ul .grapes .radio-container .radio {
  display: flex;
  align-items: center;
}
.lobby-container ul .grapes .radio-container .radio label {
  font-size: 0.8rem;
  text-transform: uppercase;
  margin-right: 10px;
  font-size: 1.05rem;
}
@media screen and (max-width: 650px) {
  .lobby-container ul .grapes .radio-container .radio label {
    font-size: 0.8rem;
    margin-right: 1px;
  }
}
.lobby-container ul .grapes .radio-container .radio input {
  padding: 0 10px;
  background: none;
}
.lobby-container .title {
  position: absolute;
  font-size: 2rem;
  letter-spacing: 2px;
  left: 50%;
  transform: translate(-50%, 18px);
  width: 450px;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-align: center;
  color: #EAE0DA;
}
.lobby-container h3 {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 130px;
}
.lobby-container .list-container {
  display: flex;
  flex-wrap: wrap;
  margin: 72px auto 0;
}
@media screen and (min-width: 850px) {
  .lobby-container .list-container .wine-list {
    width: 50%;
  }
}
.lobby-container .list-container .wine-card {
  background: #EAE0DA;
  border-radius: 25px;
  padding: 20px;
  overflow: hidden;
  position: relative;
  height: 440px;
  box-shadow: 1px 1px 5px rgba(226, 226, 226, 0.178);
  margin: 14px auto 0;
}
.lobby-container .list-container .wine-card:nth-child(1), .lobby-container .list-container .wine-card:nth-child(2) {
  margin-top: 14px;
}
@media screen and (min-width: 850px) {
  .lobby-container .list-container .wine-card {
    width: 98%;
  }
}
@media screen and (max-width: 550px) {
  .lobby-container .list-container .wine-card {
    height: 340px;
  }
}
.lobby-container .list-container .wine-card:before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100px;
  background: url("/img/background3.jpg") center 75%/cover;
  top: 0;
  left: 0;
  opacity: 0.55;
  border-radius: 0 0 120px 45%/60px;
}
.lobby-container .list-container .wine-card .card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px 20px 42px;
}
.lobby-container .list-container .wine-card .card-header h2 {
  padding: 0;
  z-index: 20;
  font-size: 1.8rem;
  color: #681313;
}
@media screen and (max-width: 550px) {
  .lobby-container .list-container .wine-card .card-header h2 {
    font-size: 1.3rem;
  }
}
.lobby-container .list-container .wine-card .card-header i {
  margin-right: 6px;
  font-size: 1.3rem;
  z-index: 20;
}
.lobby-container .list-container .container {
  display: grid;
  grid-template-columns: 52% 48%;
}
.lobby-container .list-container .container .text-container .buttons {
  display: flex;
  margin: 24px 0 20px;
  width: 100%;
  justify-content: space-between;
}
.lobby-container .list-container .container .text-container .buttons h4 {
  background: #3E0018;
  border-radius: 20px;
  padding: 10px 10px;
  box-shadow: 0 0 4px #333;
}
@media screen and (max-width: 550px) {
  .lobby-container .list-container .container .text-container .buttons h4 {
    font-size: 0.8rem;
  }
}
.lobby-container .list-container .container .text-container .location {
  margin: 20px 0 20px;
  color: #3E0018;
}
.lobby-container .list-container .container .text-container .location i {
  color: #B01735;
  font-size: 1.4rem;
  margin-right: 6px;
}
.lobby-container .list-container .container .text-container .location span {
  font-size: 1.3rem;
}
.lobby-container .list-container .container .text-container p {
  font-weight: 100;
  text-align: justify;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 8;
  overflow: hidden;
  color: #3E0018;
}
@media screen and (max-width: 550px) {
  .lobby-container .list-container .container .text-container p {
    -webkit-line-clamp: 4;
  }
}
.lobby-container .list-container .container img {
  margin: 0 auto;
  padding: 20px 0 0 20px;
  max-height: 300px;
}
@media screen and (max-width: 550px) {
  .lobby-container .list-container .container img {
    height: 200px;
  }
}

.item-anim-enter-active, .item-anim-leave-active {
  opacity: 1;
  transition: 0.8s;
}
.item-anim-enter, .item-anim-leave-to {
  opacity: 0;
  transition: 0.1s;
}

nav {
  display: flex;
  justify-content: space-between;
  margin: 20px auto 0;
  max-width: 1150px;
  position: relative;
}
nav img {
  width: 60%;
  cursor: pointer;
  margin-left: 10px;
}
nav ul {
  position: relative;
}
nav ul .fas {
  font-size: 2rem;
  margin: 18px 25px 0 0;
  color: #EAE0DA;
}
.buttons h4{
    color: #EAE0DA
}

</style>