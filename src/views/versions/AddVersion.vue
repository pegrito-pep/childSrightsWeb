<template>
     <div class="modal fade" id="versionModal" tabindex="-1" role="dialog" aria-labelledby="demoModalLabel" style="display: none;" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="demoModalLabel">Ajout d'une version</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                </div>
                <div class="modal-body">
                <form class="forms-sample" id="test" @submit.prevent="sendVersionForm">
                    <div class="form-group">
                        <label for="exampleInputUsername1">langue</label>
                        <b-form-select v-model="version.langue" :options="options" required></b-form-select>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputUsername1">libelle</label>
                        <input type="text" class="form-control" id="libelle" placeholder="libelle de la version" required v-model="version.libelle">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputUsername1">consigne</label>
                        <input type="text" class="form-control" id="consigne" placeholder="consigne de la version" required v-model="version.consigne">
                    </div>
                </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
                    <button type="submit" class="btn btn-primary" form="test" value="Submit">Enregistrer</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import notif from "@/plugins/notif.js";
//import AddQuestion from "@/views/questions/AddQuestion.vue";
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
    name: 'add-quiz',
    props:["quiz"],
    components:{
        //AddQuestion
    },
    data:()=>({
        ckecked:false,
        questionCommande:0,
        version:{
            langue:"",
            libelle:"",
            consigne:""
        },
        options: [
          { value: 'fr', text: 'Francais' },
          { value: 'en', text: 'Anglais' },
          { value: 'ff', text: 'Fufulbé' },
          { value: 'ma', text: 'Makak' },
        ]
    }),
    methods:{

        sendVersionForm(){
            let data={ langue:this.version.langue, libelle: this.version.libelle, consigne:this.version.consigne};
            const idQuiz=this.quiz.idQuiz
            let url="quiz/"+idQuiz+"/versions"
            axios.post(url, data).then(response =>{
                 notif.success(response.message);
                 $('#versionModal').modal('hide');
                this.$root.$emit("new-version-added", response.result);
            })
            .catch(error => {
                notif.error(error.message);
             });
             this.version.langue=null;
             this.version.libelle=null;
             this.version.consigne=null;
        }
    }
}
</script>