<template>
     <div class="auth-wrapper">
        <div class="container-fluid h-100">
            <b-row class="flex-row h-100 bg-white">
                <div class="col-xl-7 col-lg-6 col-md-5 p-0 d-md-block d-lg-block d-sm-none d-none">
                    <div class="lavalite-bg" style="background-image: url('/img/childsRights4.jpg')">
                        <!--<div class="lavalite-overlay"></div>-->
                    </div>
                </div>
                <div class="col-xl-5 col-lg-6 col-md-7 my-auto p-0">
                    <div class="authentication-form mx-auto" style="width: 90%">
                        <div class="mt-n5 mb-4 d-flex justify-content-center align-items-center flex-column">
                            <b-link :to="{name: 'home'}"><b-img src="/img/caysti-logo.png" style="width: 4em; height: 4em"/></b-link>
                            <h3 class="text-center mt-2 mb-0">Welcome, please kindly fill in your information</h3>
                        </div>
                        
                        <form action="" @submit.prevent="sendForm">
                            <div class="mb-5">
                                <b-row>
                                    <b-col><div class="form-group">
                                        <input type="text" class="form-control" placeholder="Nom de famille" required="" v-model="nom">
                                        <i class="ik ik-user"></i>
                                    </div></b-col>
                                    <b-col><div class="form-group">
                                        <input type="text" class="form-control" placeholder="Prenom" v-model="prenom">
                                        <i class="ik ik-user"></i>
                                    </div></b-col>
                                </b-row>
                                <b-row>
                                    <b-col><div class="form-group">
                                        <input type="tel" class="form-control" placeholder="Téléphone" required="" v-model="tel">
                                        <i class="ik ik-phone"></i>
                                    </div></b-col>
                                    <b-col><div class="form-group">
                                        <input type="email" class="form-control" placeholder="Email" v-model="email">
                                        <i class="ik ik-mail"></i>
                                    </div></b-col>
                                </b-row>
                                <div class="form-group">
                                    <input type="password" class="form-control" placeholder="Password" required="" v-model="mdp">
                                    <i class="ik ik-lock"></i>
                                </div>
                                <hr>
                            </div>
                            <div class="row">
                            </div>
                            <div class="sign-btn text-center">
                                <button type="submit" :disabled="submitted" class="btn btn-primary btn-lg"  style="background-color: #da624a !important; border-color:#da624a !important;">Create Account <b-spinner v-if="submitted" small></b-spinner></button>
                            </div>
                        </form>
                        <div class="register">
                            <p>Already have an account? <b-link :to="{name: 'login'}" style="color: #da624a !important;">Sign In</b-link></p>
                        </div>
                    </div>
                </div>
            </b-row>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Register',
    data: () => ({
        submitted: false,
        nom: null, 
        prenom: null, 
        tel: null, 
        email: null, 
        genre: null, 
        mdp: null,
    }), 
    methods: {
        sendForm() {
            this.submitted = true
            const data = {
                nom: this.nom,
                prenom: this.prenom,
                tel: this.tel,
                email: this.email,
                genre: this.genre,
                mdp: this.mdp,
            }
            axios.post('signup', data).then(response => {
                App.notifySuccess(response.message)
                storage.set('user-email', this.email)
                this.$router.push({name: 'confirm'})
            }).catch(error => {
                this.submitted = false
                App.notifyError(error.message)
            })
        }
    }
}
</script>