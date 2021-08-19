<template>
  <div class="container-fluid" ref="homeCont">
    <!--page header start -->
    <div class="page-header">
      <div class="row align-items-end">
        <div class="col-lg-8">
          <div class="page-header-title">
            <i class="fa fa-question-circle bg-blue"></i>
            <div class="d-inline">
              <h5>Quizzes</h5>
              <span>Liste des quiz</span>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <nav class="breadcrumb-container" aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <a href="../index.html">
                  <i class="ik ik-home"></i>
                </a>
              </li>
              <li class="breadcrumb-item">
                <a href="#">Home</a>
              </li>
              <li class="breadcrumb-item active" aria-current="page">Quizzes</li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
    <!--page header end -->
    <div class="row">
      <div class="col-md-12">
        <div class="mb-2 clearfix">
          <a
            class="btn pt-0 pl-0 d-md-none d-lg-none"
            data-toggle="collapse"
            href="#displayOptions"
            role="button"
            aria-expanded="true"
            aria-controls="displayOptions"
          >
            Display Options
            <i class="ik ik-chevron-down align-middle"></i>
          </a>
          <div class="collapse d-md-block display-options" id="displayOptions">
            <div class="d-block d-md-inline-block">
              <button
                type="button"
                class="btn btn-primary"
                data-toggle="modal"
                data-target="#demoModal"
              >Ajouter un quiz</button>
              <div class="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                <div class="input-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Search by domaine"
                    v-model="domaine"
                  />
                  <div class="input-group-append">
                    <button
                      class="btn btn-outline-secondary"
                      type="button"
                      @click="page = 1; retrieveQuizzes();"
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="float-md-right">
                <span class="text-muted text-small mr-2">Displaying 1-{{ pageSize }} of {{ this.totalItems }} items </span>
                <b-form-select v-model="pageSize"  class="" style="width: 5em; height:2em;" @change="handlePageSizeChange($event)">
                  <option v-for="size in pageSizes" :key="size" :value="size">{{ size }}</option>
                </b-form-select>
            </div>
          </div>
        </div>
        <div class="separator mb-20"></div>
        <div class="row layout-wrap" id="layout-wrap" style="width:99%">
          <div
            class="col-xl-3 col-lg-4 col-12 col-sm-6 mb-4 list-item list-item-grid"
            v-for="quiz in this.quizzes"
            :key="quiz.idQuiz"
          >
            <div class="card d-flex flex-row mb-3">
              <a
                class="d-flex card-img"
                @click.prevent="showDetails(quiz)"
                href="#editLayoutItem"
                data-toggle="modal"
                data-target="#editLayoutItem"
              >
                <b-img
                  src="/img/quiz3.jpg"
                  class="list-thumbnail responsive border-0"
                  style="height:18em"
                />

                <span
                  class="badge badge-pill badge-primary position-absolute badge-top-left"
                >pas encore synchronisé</span>
                <span
                  class="badge badge-pill badge-secondary position-absolute badge-top-left-2"
                >synchronisé</span>
              </a>
              <div class="d-flex flex-grow-1 min-width-zero card-content">
                <div
                  class="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center"
                >
                  <a
                    class="list-item-heading mb-1 truncate w-40 w-xs-100"
                    href="#editLayoutItem"
                    data-toggle="modal"
                    data-target="#editLayoutItem"
                    style="font-weight: bold; text-transform:uppercase;"
                  >{{ quiz.domaine }}</a>
                  <!-- <p class="mb-1 text-muted text-small date w-15 w-xs-100">{{ quiz.domaine }}</p> -->
                </div>
                <div class="list-actions">
                  <a @click.prevent="showDetails(quiz)" href="#">
                    <i class="ik ik-eye"></i>
                  </a>
                  <!-- <a href="layout-edit-item.html">
                    <i class="ik ik-edit-2"></i>
                  </a> -->
                  <a href="#" class="list-delete" @click.prevent="deleteQuiz('')">
                    <i class="ik ik-trash-2"></i>
                  </a>
                </div>
                <div class="custom-control custom-checkbox pl-1 align-self-center">
                  <label class="custom-control custom-checkbox mb-0">
                    <input type="checkbox" class="custom-control-input" />
                    <span class="custom-control-label"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <b-pagination align="center" v-model="currentPage" :total-rows="rows" :per-page="perPage"></b-pagination> -->
        <b-pagination
            v-model="page"
            :total-rows="count"
            :per-page="pageSize"
            prev-text="Prev"
            next-text="Next"
            @change="handlePageChange"
        ></b-pagination>
      </div>
    </div>
    <quiz-details v-bind:quiz="selectedQuiz"/>
    <add-quiz /> 
  </div>
</template>
<script>
import QuizDetails from "@/views/quizzes/QuizDetail.vue";
import AddQuiz from "@/views/quizzes/AddQuiz.vue";

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import Vue from 'vue';
// define the plugin and pass object for config
Vue.use(Loading, {
    color: '#000000',
    width: 64,
    height: 64,
    backgroundColor: '#ffffff',
    opacity: 0.5,
    zIndex: 999
});

export default {
  name: "quiz",
  components: {
    QuizDetails,
    AddQuiz
  },
  data: () => ({
    domaine:"",
    page:1,
    count:0,
    pageSize:8,
    pageSizes:[2,4,6,8],
    quizzes: [],
    selectedQuiz: null,
    selected2: "Order By",
    selected: 10,
    totalItems:0,
    loader: "dots",
  }),

  methods: {
    getRequestParams(domaine,page, pageSize){
      let params={};
       if(domaine){
         params["q"]=domaine;
       }
      if(page){
        params["page"]= page -1
      }
      if(pageSize){
        params["size"]=pageSize
      }
      return params;
    },
    //gestion de la pagination
    handlePageChange(value){
      this.page=value;
      this.retrieveQuizzes();
    },
    //gestion du select
    handlePageSizeChange(event){
      console.log("event",event.target)
      this.pageSize=event;
      this.page=1;
      this.retrieveQuizzes();
    },
    //recherche de quiz par son Libelle
    retrieveQuizzes(){
      let homeCont = this.$refs.homeCont;
        let loader = this.$loading.show({
          container: homeCont,
          loader: "spinner",
          color: "black",
        });


      const params=this.getRequestParams(
        this.domaine,
        this.page,
        this.pageSize
      );
      axios.get("/quiz",{ params }).then(response => {
        console.log(response)
        const { quizzes, totalItems } = response.result;
      this.totalItems=response.result.totalItems;
        this.quizzes = response.result.data;
        this.count=response.result.totalItems;
        loader.hide();
      })
      .catch((error) => {
        console.log(error)
      });
    },
    showDetails(quiz) {
      this.selectedQuiz = quiz;
      $('#editLayoutItem').modal('show')
    },
    editQuiz(quiz) {
      console.log("domaine",quiz.domaine);
    },
    deleteQuiz() {
      swal({
        title: "Are you sure?",
        text: "Do you really want to delete this item?",
        icon: "warning",
        buttons: ["Cancel", "Delete Now"],
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          swal({
            title: "Deleted",
            text: "The list item has been deleted!",
            icon: "success"
          });
        } else {
          swal("The item is not deleted!");
        }
      });
     }

    
  },
  async mounted() {
    await this.retrieveQuizzes();
    this.$root.$on('new-quiz-added', (newQuiz) => {
            this.quizzes.unshift(newQuiz)
     }) 
  }
};
</script>