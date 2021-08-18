<template>
  <div
    class="modal fade"
    id="globalQuestionModal"
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
          <span v-for="(e,i) in errors" :key="i">{{ e }}</span>
          <section v-if="step ==1">
            <h3>Choisir le quiz</h3>
            <b-form-select
              v-model="selectedQuiz"
              :options="quizzes.data"
              value-field="idQuiz"
              text-field="domaine"
              required
              @change="chooseQuiz"
            ></b-form-select>
          </section>
          <section v-if="step ==2">
            <h3>Choisir la version</h3>
            <b-form-select
              v-model="selectedVersion"
              :options="versions"
              value-field="idVersion"
              text-field="libelle"
              required
              @change="saveUrl"
            ></b-form-select>
          </section>
          <section v-if="step ==3">
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
                placeholder="explication réponse"
                class="form-control"
                id="exampleTextarea1"
                rows="2"
                v-model="question.explication"
              ></textarea>
            </div>
          </section>
          <section v-if="step ==4">
            <div class="form-group">
              <label for="input">Propositions</label>
              <input
                type="text"
                class="form-control"
                v-model="question.proposition1"
                placeholder="proposition 0"
              />
              <div class="border" v-for="(field,i) in fields" :key="i">
                <input
                  type="text"
                  class="form-control mt-2"
                  v-model="field.last"
                  :placeholder="'proposition'+ (i+1)"
                />
              </div>
              <button
                data-repeater-create
                type="button"
                class="btn btn-success btn-icon ml-2 mb-2"
                @click="AddField"
              >
                <i class="ik ik-plus"></i>
              </button>
            </div>
          </section>
          <section v-if="step ==5">
          <h3>spécifier la ou les réponses justes</h3>
            <div class="form-group">
              <div v-for="(item, index) in names" :key="index">
                <input
                  type="checkbox"
                  :id="item.libelle"
                  v-model="item.isAnswer"
                  @click="checkPropositions"
                />
                <label :for="item.libelle" id="decalage">{{ item.libelle }}</label>
              </div>
            </div>
          </section>
          <section v-if="step ==6">
            <!--<div class="col-xl-4 col-md-6">-->
            <div class="card latest-update-card">
              <div class="card-header">
                <h3>Récapitulatif Question</h3>
                <div class="card-header-right"></div>
              </div>
              <div class="card-block">
                <div class="scroll-widget">
                  <div class="latest-update-box">
                    <div class="row pt-20 pb-30">
                      <div class="col-auto text-right update-meta pr-0">
                        <i class="b-primary update-icon ring"></i>
                      </div>
                      <div class="col pl-5">
                        <a href="#!">
                          <h6>Quiz</h6>
                        </a>
                        <p class="text-muted mb-0">{{ domaineQuiz }}</p>
                      </div>
                    </div>
                    <div class="row pb-30">
                      <div class="col-auto text-right update-meta pr-0">
                        <i class="b-primary update-icon ring"></i>
                      </div>
                      <div class="col pl-5">
                        <a href="#!">
                          <h6>Version</h6>
                        </a>
                        <p class="text-muted mb-0">{{ selectedVersion }}</p>
                      </div>
                    </div>
                    <div class="row pb-30">
                      <div class="col-auto text-right update-meta pr-0">
                        <i class="b-success update-icon ring"></i>
                      </div>
                      <div class="col pl-5">
                        <a href="#!">
                          <h6>Question</h6>
                        </a>
                        <p class="text-muted mb-0">{{ question.libelle }}</p>
                      </div>
                    </div>
                    <div class="row pb-30">
                      <div class="col-auto text-right update-meta pr-0">
                        <i class="b-primary update-icon ring"></i>
                      </div>
                      <div class="col pl-5">
                        <a href="#!">
                          <h6>Propositions</h6>
                        </a>
                        <div class="card-block" v-for="(p,q) in names" :key="q">
                          <div class="align-middle mb-5">
                            <div class="d-inline-block">
                              <p class="text-muted mb-0">
                                {{ p.libelle }}
                                <img
                                  v-if="p.isAnswer"
                                  src="/img/trueAnswer.png"
                                  alt="user image"
                                  class="rounded-circle img-40 mr-15"
                                />
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--</div>-->
          </section>
          <button v-if="step !=1" @click.prevent="prevStep" class="btn btn-warning mt-2">Précédent</button>
          <button v-if="step !=totalstep" @click.prevent="nextStep" class="btn btn-primary mt-2 ml-2">Suivant</button>
          <button v-if="step ==6" @click.prevent="sendEnquiry" class="btn btn-success ml-2  mt-2" ><i class="ik ik-check-circle"></i>Valider</button>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import notif from "@/plugins/notif.js";
// import ModalQuestion from "@/views/questions/ModalQuestion.vue";
export default {
  name: "AddQuestionGlobal",
  components: {},
  props: ['quizzes'],
  data: () => ({
    errors: [],
    step: 1,
    totalstep: 6,
    url: null,
    domaineQuiz: "",
    selectedQuiz: null,
    versions: [],
    selectedVersion: null,
    question: {
      libelle: "",
      explication: "",
      proposition1: ""
    },
    fields: [{ last: "" }],
    propositions: [],
    names: []
  }),
  computed: {
    setVersion() {
      console.log("test", this.selectedQuiz.versions);
      return this.selectedQuiz.versions;
    }
  },
  methods: {
    chooseQuiz() {
      for (let i = 0; i < this.quizzes.data.length; i++) {
        if (this.quizzes.data[i].idQuiz == this.selectedQuiz) {
          this.domaineQuiz = this.quizzes.data[i].domaine;
          this.versions = this.quizzes.data[i].versions;
        }
      }
        
    },
    saveUrl() {
      this.url = "/versions/" + this.selectedVersion + "/questions";
      console.log("url", this.url);
    },
    AddField: function() {
      this.fields.push({ last: "" });
    },
    setCheckbox: function(propositions) {
      console.log("propositions", propositions);
      let phrase = "";
      for (let i = 0; i < propositions.length; i++) {
        phrase += "essai {" + propositions[i].libelle + "} ,";
      }
      var regExp = /{([^}]*)}/g;

      var matches = phrase.match(regExp);
      var arrCheckbox = [];

      console.log(matches);
      for (var i = 0; i < matches.length; i++) {
        var str = matches[i].replace(/{(.*)}/, "$1");
        this.names.push({ libelle: str, isAnswer: false });
      }
    },
    checkPropositions() {
      this.$emit("response", this.names);
    },
    nextStep: function() {
      if (this.step == 1) {
        if (!this.selectedQuiz) {
          this.errors = "Veuillez selectionner un quiz";
          return false;
        }
      }
      if (this.step == 2) {
        if (!this.selectedVersion) {
          this.errors = "Veuillez selectionner une version";
          return false;
        }
      }
      if (this.step == 3) {
        if (!this.question.libelle) {
          this.errors = "Veuillez renseigner le libellé";
          return false;
        }
        if (!this.question.explication) {
          this.errors = "Veuillez renseigner une explication de la réponse";
          return false;
        }
      }
      if (this.step == 4) {
        if (!this.question.libelle) {
          this.errors = "Veuillez renseigner le libellé";
          return false;
        }
        if (!this.question.explication) {
          this.errors = "Veuillez renseigner une explication de la réponse";
          return false;
        }
        let prop1 = {
          libelle: this.question.proposition1,
          isAnswer: false
        };
        this.propositions.push(prop1);
        for (let i = 0; i < this.fields.length; i++) {
          let prop = {
            libelle: this.fields[i].last,
            isAnswer: false
          };
          this.propositions.push(prop);
        }

        this.setCheckbox(this.propositions);
      }

      this.step++;
    },
    prevStep: function() {
      this.step--;
    },
    sendEnquiry: function() {
      let data = {
        libelle: this.question.libelle,
        explication: this.question.explication,
        propositions: this.names
      };
      console.log("data", data);
      axios
        .post(this.url, data)
        .then(response => {
          notif.success(response.message);
          $("#globalQuestionModal").modal("hide");
          let addedQuestion={
            idQuestion:response.result.idQuestion,
            libelle:response.result.libelle,
            propositions:this.names
          }
          console.log("added question",addedQuestion)
          this.$root.$emit("new-question-added", addedQuestion);
          this.step=1;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
};
</script>
<style >
</style>