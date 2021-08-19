<template>
  <div class="modal fade edit-layout-modal show" id="editLayoutItem" tabindex="-1" role="dialog" aria-labelledby="editLayoutItemLabel" style="display: none; padding-left: 17px;">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editLayoutItemLabel">Liste des versions du quiz {{ quiz.domaine }}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                    </div>
                    <div class="modal-body">
                        <div class="d-block d-md-inline-block">
                                    <button
                                        type="button"
                                        class="btn btn-primary"
                                        data-toggle="modal"
                                        data-target="#versionModal"
                                    >Ajouter une version</button>
                            <div class="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                            </div>
                        </div>
                        <!-- <list-mairies-of-super-mairie v-bind:superMairie="superMairie"/> -->
                        <div v-for="version in this.quiz.versions" :key="version.idVersion" class="pilotage">
                            <div class="largeur">
                                <div class="card text-black" :id="version.langue">
                                    <div class="card-block pb-0">
                                        <div class="row mb-50">
                                            <div class="col">
                                                <h6 class="mb-5">libelle</h6>
                                                <h5 class="mb-0  fw-700">{{ version.libelle }}</h5>
                                            </div>
                                            <div class="col-auto text-center">
                                                <p class="mb-5">langue</p>
                                                <h6 v-if="version.langue =='fr'" class="mb-0"><h6 class="mb-5 fw-700">Français</h6></h6>
                                                <h6 v-if="version.langue =='en'" class="mb-0"><h6 class="mb-5 fw-700">Anglais</h6></h6>
                                                <h6 v-if="version.langue =='ff'" class="mb-0"><h6 class="mb-5 fw-700">Fufulbé</h6></h6>
                                                <h6 v-if="version.langue =='ma'" class="mb-0"><h6 class="mb-5 fw-700">Makak</h6></h6>
                                            </div>
                                        </div>
                                        <div class="col-auto text-center">
                                        <p class="mb-5">consigne</p>
                                        <h6 class="mb-0"><h6 class="mb-5">{{ version.consigne }}</h6></h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body template-demo largeur2">
                                <button type="button" class="btn btn-info btn-block" @click="viewQuestions(version)">Voir les questions de cette version</button>
                            </div>
	                      </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
            <add-version v-bind:quiz="quiz"/>
        </div>
</template>
<script>
import AddVersion from '@/views/versions/AddVersion.vue'

export default {
  name: "QuizDetails",
  props: ["quiz"],
  components: {
      AddVersion
  },
  data: () => ({
     selectedQuiz:null 
  }),
  methods: {
    viewQuestions(version){
            $('#editLayoutItem').modal('hide');
              let idVersion = version.idVersion;
             this.$router.push({ name: "/version-details", params: { idVersion } });
    },
    getImgUrl(pic) {
        return "/img/imgVersions/" + pic;
    }
  },
   mounted() {
     this.$root.$on('new-version-added', (newVersion) => {
            this.quiz.versions.unshift(newVersion)
     }) 
  },

};
</script>
<style scoped>
.largeur{
    width:56%;
    margin-top:5px;
}
.largeur2{
  max-width:44%!important;  
}
.pilotage{
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
.pilotage .col-xl-4{
  width: 33.33%!important;
}
/*#fr{
    background: rgb(0, 38, 255) center 75%/cover;
}*/
#en{
    background: rgba(214, 110, 91, 0.959) center 75%/cover;
}
#ff{
    background: rgba(255, 0, 170, 0.219) center 75%/cover;
}
#ma{
    background: rgba(7, 148, 136, 0.876) center 75%/cover;
}
#fr{
    background: url("/img/imgVersions/versionFrxxx.png") center 75%/cover;
}


</style>
