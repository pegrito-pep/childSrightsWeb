<template>
    <div ref="versionCont">
        <div v-for="version in this.versions" :key="version.idVersion" class="pilotage">
            <div class="largeur">
                <div class="card text-white" :id="version.langue">
                    <div class="card-block pb-0">
                        <div class="row mb-50">
                            <div class="col">
                                <h6 class="mb-5">libelle</h6>
                                <h5 class="mb-0  fw-700">{{ version.libelle }}</h5>
                            </div>
                            <div class="col-auto text-center">
                                <p class="mb-5">langue</p>
                                <h6 class="mb-0"><h6 class="mb-5 fw-700">{{ version.langue }}</h6></h6>
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
</template>
<script>
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
    name:"listVersions",
    props: ["quiz"],
    data:()=>({
        versions:[],
        loader: "bars",
  
    }),
    methods: {
        viewQuestions(version){
            $('#editLayoutItem').modal('hide');
            console.log("version",version)
              let idVersion = version.idVersion;
             this.$router.push({ name: "/version-details", params: { idVersion } });
        },
        getVersions(idQuiz) {
            let homeCont = this.$refs.versionCont;
            let loader = this.$loading.show({
                container: homeCont,
                loader: "bars",
                color: "red",
            });
            let url='/quiz/'+idQuiz+'/versions?filter=all'
            axios.get(url).then(response => {
                console.log("différentes versions", response.result)
                this.versions = response.result;
                loader.hide();
            });
        }
  },
  async mounted() {
    await this.getVersions(this.quiz.idQuiz)
       //récuperation de la version ajoutée
       this.$root.$on('quiz-change', (quiz) => {
             this.getVersions(quiz.idQuiz)
        }) 
	   this.$root.$on('new-version-added', () => {
		  this.getVersions(this.quiz.idQuiz)
	  })


}
}
</script>
<style scoped>
.largeur{
    max-width:350px;
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
#fr{
    background: url("/img/imgVersions/version1.jpg") center 75%/cover;
}
#en{
    background: url("/img/imgVersions/version2.webp") center 75%/cover;
}
#ff{
    background: url("/img/imgVersions/version3.png") center 75%/cover;
}
#ma{
    background: url("/img/imgVersions/version4.jpg") center 75%/cover;
}
</style>
