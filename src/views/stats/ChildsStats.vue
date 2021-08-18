<template>
    <div class="d-flex" style="width:100%">
        <div class="col-xl-3 col-md-6">
            <div class="card social-card">
                <div class="card-body text-center">
                    <h2 class="text-facebook mb-20"><i class="ik ik-log-in"></i></h2>
                    <h3 class="text-facebook fw-700">{{ this.childsStats.total }}</h3>
                    <p>inscrits</p>
                    <p class="mb-0 mt-15">Depuis le {{ new Date().toISOString().substr(0, 10) }}</p>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-md-6">
            <div class="card social-card">
                <div class="card-body text-center">
                    <h2 class="text-twitter mb-20"><i class="ik ik-log-in"></i></h2>
                    <h3 class="text-twitter fw-700">{{ this.childsStats.nbInscritsMois }}</h3>
                    <p>inscrits ce mois</p>
                    <p class="mb-0 mt-15"><i class="fas fa-caret-up mr-10 f-18 text-green"></i>{{ this.childsStats.nbInscritsSemaine }} ces 7 derniers jours</p>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-md-6">
            <div class="card social-card">
                <div class="card-body text-center">
                    <h2 class="text-dribbble mb-20"><i class="ik ik-log-in"></i></h2>
                    <h3 class="text-dribbble fw-700">0{{ this.childsStats.nbInscritsActifs }}</h3>
                    <p>Enfants actifs ces 30 derniers jours</p>
                    <p class="mb-0 mt-15"><i class="fas fa-caret-up mr-10 f-18 text-green"></i>"1,150 from last 7 days"</p>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-md-6">
            <div class="card social-card">
                <div class="card-body text-center">
                    <h2 class="text-linkedin mb-20"><i class="ik ik-log-in"></i></h2>
                    <h3 class="text-linkedin fw-700">{{ this.childsStats.ratio }}%</h3>
                    <p> ratio d'enfants actifs</p>
                    <p class="mb-0 mt-15"><i class="fas fa-caret-down mr-10 f-18 text-red"></i>"0.5 from last month"</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// import VueMoment from 'vue-moment'
// import moment from 'moment-timezone'
// Vue.use(VueMoment, {
//     moment,
// })
export default {
    name: 'ChildsStats',
    props:["childsStats"],
    data: () =>({

    }),
    methods: {
  },
  mounted() {

    }
}
</script>