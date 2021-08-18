<template>
  <div id="app">
    <div class="Qhead">
      <h1>Liste de toutes les questions</h1>
      <button
        type="button"
        class="btn btn-primary"
        data-toggle="modal"
        data-target="#globalQuestionModal"
      >Ajouter une question</button>
    </div>
    <div class="user" v-for="question in questions" :key="question.idQuestion">
      <div class="user-avatar">
        <img src="/img/question.jpg" />
      </div>
      <div class="user-details">
        <h2 class="user-name">{{ question.libelle }}</h2>
        <ul>
          <li v-for="proposition in question.propositions" :key="proposition.idProposition">
            {{ proposition.libelle }}
            <span v-if="proposition.isAnswer">
              <img src="/img/trueAnswer.png" class="resize" />
            </span>
          </li>
        </ul>
      </div>
    </div>
    <global-question-add :quizzes="quizzes" />
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
import GlobalQuestionAdd from "@/views/questions/GlobalQuestionAdd.vue";
import Vue from 'vue'

export default {
  name: "listQuestions",
  components: {
    GlobalQuestionAdd
  },
  data: () => ({
    disable:false,
    page:1,
    count:0,
    pageSize:10,
    totalItems:0,
    questions: [],
    quizzes: []
  }),
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
    //gestion de la pagination
    handlePageChange(value){
      this.page=value;
      this.retrieveQuestions();
    },
     retrieveQuestions(){
      const params=this.getRequestParams(
        this.page,
        this.pageSize
      );
      axios.get("/questions",{ params }).then(response => {
        console.log(response)
        const { questions, totalItems } = response.result;
      this.totalItems=response.result.totalItems;
        this.questions = response.result.data;
        this.count=response.result.totalItems;

        // response.result.data.length > this.pageSize && (this.disable = false)
      })
      .catch((error) => {
        console.log(error)
      });
    },
    async getQuizzes() {

      this.quizzes = await axios.get("quiz?filter=all").then(response => response.result);
    },

  },
   watch: {
    page (value) {
      this.disable = value > 10
    }
  },
  async beforeMount() {
    await this.getQuizzes();
    await this.retrieveQuestions();
  },
  async mounted() {
    this.$root.$on("new-question-added", newQuestion => {
      this.questions.unshift(newQuestion);
    });
  }
};
</script>
<style scoped>
.Qhead {
  width: 60%;
  display: flex;
  justify-content: space-between;
}
.Qhead h1 {
  width: 60%;
}
.Qhead button {
  width: 60%;
  margin-top: 16px;
}
.resize {
  width: 2em;
}
.user {
  display: flex;
  background: #ccc;
  border-radius: 1em;
  margin: 1em auto;
}

.user-avatar {
  padding: 1em;
}

.user-avatar img {
  display: block;
  width: 5em;
  min-width: 64px;
  height: auto;
  border-radius: 50%;
}

.user-details {
  padding: 1em;
}

.user-name {
  margin: 0;
  padding: 0;
  font-size: 1rem;
  font-weight: 900;
}
</style>