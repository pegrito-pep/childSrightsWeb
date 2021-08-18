<template>
     <div class="modal fade" id="demoModal" tabindex="-1" role="dialog" aria-labelledby="demoModalLabel" style="display: none;" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="demoModalLabel">Ajout d'un quiz</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                </div>
                <div class="modal-body">
                <form class="forms-sample" id="test" @submit.prevent="sendThemeForm">
                    <div class="form-group">
                        <label for="exampleInputUsername1">Libelle</label>
                        <input type="text" class="form-control" id="libelle" placeholder="libellé du quiz" v-model="theme.libelle">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputUsername1">Illustration</label>                                        
                        <label>                  
                            <b-img src="/img/camera.png" style="width: 3em; height: 3em"/>
                            <input type="file"    
                            accept=".png, .jpg, .jpeg"
                            @change="onFileChange" style="display:none">
                        </label>
                    </div>
                    <div id="preview">
                        <img v-if="theme.url" :src="theme.url" />
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

        theme:{
            libelle:"",
            url:null
        },
        image
    }),
    methods:{
         onFileChange(e){
            const file=e.target.files[0];
            this.url=URL.createObjectURL(file)
        },
        sendThemeForm(){
            let data={
                libelle: this.quiz.libelle,
                illustration:this.quiz.consigne
            };
            axios.post("theme", data).then(response =>{
                 notif.success(response.message);
                 setTimeout(function() {$('#demoModal').modal('hide');}, 2000);
                this.$root.$emit("new-theme-added");
               
            })
            .catch(error => {
                notif.error(error.message);
             });
        },
            //method used to upload avatar
        getBase64(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = (error) => reject(error);
            });
        },
        async uploadImage() {
            var mediaFile = document.querySelector("#avatar");
            const [file] = mediaFile.files;
            document.querySelector("#imageProfile").src = URL.createObjectURL(file);
            // conversion en base64
            this.image = await this.getBase64(file);
        },
    }
}
</script>