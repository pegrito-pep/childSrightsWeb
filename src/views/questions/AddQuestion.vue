<template>
  <div
    class="modal fade" ref="questAdd"
    id="questionModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="demoModalLabel"
    style="display: none;"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="demoModalLabel">Ajout d'une question</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body">
          <form class="forms-sample" id="test" @submit.prevent="sendQuestionForm">
            <p v-if="errors.length">
              <b>erreurs détectées:</b>
              <ul>
                <li v-for="(error, index) in errors" :key="index"  style="color:red;">{{ error }}</li>
              </ul>
            </p>
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                id="libelle"
                placeholder="libellé de la questions"
                v-model="question.libelle"
              />
            </div>
            <div class="form-group">
              <textarea
                placeholder="explications"
                class="form-control"
                id="exampleTextarea1"
                rows="2"
                v-model="question.explication"
              ></textarea>
            </div>
            <transition leave-active-class="animated zoomOut">
              <div class="form-group" v-if="reponse== 0">
                <label for="input">Propositions</label>
                <input type="text" class="form-control" v-model="question.proposition1" placeholder="proposition 0">
                  <div class="border" v-for="(field,i) in fields" :key="i">
                      <input type="text" class="form-control mt-2" v-model="field.last" :placeholder="'proposition'+ (i+1)">
                  </div>
                  <button data-repeater-create="" type="button" class="btn btn-success btn-icon ml-2 mb-2" @click="AddField"><i class="ik ik-plus"></i>
                  </button>
              </div>
            </transition>
            <button
              v-if="this.commande2==0"
              class="btn btn-primary"
              @click.prevent="setResponse"
            >Spécifier une ou des réponses pour cette question</button>
            <transition enter-active-class="animated zoomIn">
              <div v-if="reponse== 1">
                <response v-bind:propositions="propositions" @response="onReponseSet" />
              </div>
            </transition>
            <button v-if="this.commande2==1" type="submit" class="btn btn-success" ><i class="ik ik-check-circle"></i>Valider</button>
            <button v-if="this.commande2==2" type="submit" class="btn btn-primary" form="test" value="Submit">Enregistrer</button>
        </form>
        </div>
        <div class="modal-footer">
          
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Response from "@/views/response/Response.vue";
import notif from "@/plugins/notif.js";
import Vue from 'vue'
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
export default {
  name: "AddQuestionNew",
  components: {
    Response
  },
  props: ["quizId"],
  data: () => ({
    errors: [],
    reponse: 0,
    commande2:0,
    fields: [{ last: '' }],
    question: {
      libelle: "",
      explication: "",
      proposition1:""
    },
    propositions: [],
    loader: "spinner"
  }),
  methods: {
    //check des champs libelle et explication reponse
    checkForm: function () {
      this.errors = [];
      if (!this.question.libelle) {
        this.errors.push("Libelle Obligatoire.");
      }
      if (!this.question.explication) {
        this.errors.push("Le champ explication est obligatoire.");
      }
       if (!this.question.proposition1) {
        this.errors.push("Vous devez spécifier au moins 2 propositions");
      }
      if (this.fields[0].last.length<1) {
        this.errors.push("Vous devez spécifier au moins 2 propositions");
      }
      if (!this.errors.length) {
        return true;
      }
    },
    onReponseSet(reponse) {
      this.question.propositions = reponse;
    },
     AddField: function () {
      this.fields.push({last: '' });
    },

    setResponse() {
      if(this.checkForm()){
        let prop1={
        libelle:this.question.proposition1,
        isAnswer:false
        };
        this.propositions.push(prop1)
        for(let i=0;i<this.fields.length;i++){
          let prop={
            libelle:this.fields[i].last,
            isAnswer:false
          };
          this.propositions.push(prop)
        }
        if(this.propositions.length>1){
          this.reponse = 1;
          this.commande2=1
        }
      }
    },
    sendQuestionForm() {
      let homeCont = this.$refs.questCont;
        let loader = this.$loading.show({
          container: homeCont,
          loader: "spinner",
          color: "black",
        });
      let data = {
        libelle: this.question.libelle,
        explication: this.question.explication,
        propositions: this.question.propositions
      };
      console.log("data", data);
      const url="versions/"+this.$route.params.idVersion+"/questions"
      console.log("url", url);
       axios.post(url, data).then(response =>{
                this.question.libelle=null; this.question.explication=null; this.question.proposition1=null;this.fields=null; this.question.propositions=[];
                this.reponse = 0;
                this.commande2=0
                 notif.success(response.message);
                 $('#questionModal').modal('hide');
                //  ut(function() {$('#questionModal').modal('hide');}, 2000);
                this.$root.$emit("new-questionVersion-added");
                loader.hide();
        })
        .catch(error => {
            notif.error(error.message);
        });

    }
  }
};
</script>
<style >
#decalage{
 margin-left:2px!important;
 font-size:1em!important;
 font-weight:700!important;
}
</style>