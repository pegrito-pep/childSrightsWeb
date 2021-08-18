<template>
     <div class="modal fade" id="demoModal" tabindex="-1" role="dialog" aria-labelledby="demoModalLabel" style="display: none;" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="demoModalLabel">Ajout d'un quiz</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                </div>
                <div class="modal-body">
                <form class="forms-sample" id="test" @submit.prevent="sendQuizForm" novalidate>
                    <div class="form-group">
                        <label for="exampleInputUsername1">Domaine</label>
                        <input type="text" class="form-control" id="libelle" required placeholder="domaine du quiz" v-model="quiz.domaine">
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
export default {
    name: 'add-quiz',
    components:{
        //AddQuestion
    },
    data:()=>({
        ckecked:false,
        questionCommande:0,
        quiz:{
            domaine:""
        }
    }),
    methods:{
        /*addQuestion(event){
            if(this.ckecked){
                this.questionCommande=1
            }
            if(!this.ckecked){
                this.questionCommande=0
            }

        },*/
        sendQuizForm(){
            let data={
                domaine: this.quiz.domaine
            };
            axios.post("quiz", data).then(response =>{
                console.log("data",data)
                notif.success(response.message);
                 this.quiz.domaine=null;
                $('#demoModal').modal('hide');
                // setTimeout(function() {$('#demoModal').modal('hide');}, 1000);
                this.$root.$emit("new-quiz-added", response.result);
               
            })
            .catch(error => {
                notif.error(error.message);
             });
        }
    }
}
</script>