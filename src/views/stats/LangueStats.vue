<template>
    <div class="d-flex" style="width:100%">
        <div class="col-xl-3 col-md-6">
            <div class="card social-card">
                <div class="card-body text-center">
                    <h2 class="text-facebook police mb-20">Francais</h2>
                    <h3 class="text-facebook  fw-700">{{ this.langStats.nbInscritsFr }}</h3>
                    <p>inscrits</p>
                    <p class="mb-0 mt-15">Depuis le {{ new Date().toISOString().substr(0, 10) }}</p>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-md-6">
            <div class="card social-card">
                <div class="card-body text-center">
                    <h2 class="text-twitter police mb-20">Anglais</h2>
                    <h3 class="text-twitter fw-700">{{ this.langStats.nbInscritsEn }}</h3>
                    <p>inscrits</p>
                    <p class="mb-0 mt-15">Depuis le {{ new Date().toISOString().substr(0, 10) }}</p>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-md-6">
            <div class="card social-card">
                <div class="card-body text-center">
                    <h2 class="text-dribbble police mb-20">Fufulbe</h2>
                    <h3 class="text-dribbble fw-700">{{ this.langStats.nbInscritsFf }}</h3>
                    <p>inscrits</p>
                    <p class="mb-0 mt-15">Depuis le {{ new Date().toISOString().substr(0, 10) }}</p>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-md-6">
            <div class="card social-card">
                <div class="card-body text-center">
                    <h2 class="text-linkedin police mb-20">Makak</h2>
                    <h3 class="text-linkedin fw-700">{{ this.langStats.nbInscritsMa }}</h3>
                    <p>inscrits</p>
                    <p class="mb-0 mt-15">Depuis le {{ new Date().toISOString().substr(0, 10) }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'LangueStats',
    props:["langStats"],
    data: () =>({
     
    }),
    methods: {

  },
   async mounted() {


  }
}
</script>
<style scoped>
@font-face {
    font-family: "Comic_Neue";
  src: local("Comic_Neue"), url("/fonts/Comic_Neue/ComicNeue-LightItalic.ttf") format("ttf");
}
.police {
    font-family: "Comic_Neue";
}
</style>