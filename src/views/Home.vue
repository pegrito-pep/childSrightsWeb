<template>
    <div class="container-fluid">
        <div class="page-header">
            <div class="row align-items-end">
                <div class="col-lg-8">
                    <div class="page-header-title">
                        <i class="ik ik-layers bg-blue"></i>
                        <div class="d-inline">
                            <h5>Statistiques</h5>
                            <span>Ici vous pouvez voir toutes vos stats</span>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <nav class="breadcrumb-container" aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                                <a href="../index.html"><i class="ik ik-home"></i></a>
                            </li>
                            <li class="breadcrumb-item">
                                <a href="#">Statictics</a>
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>
        <div class="row">
            <childs-stats v-bind:childsStats="childsStats" />
             <quiz-stats />
            <childs-detail-stat v-bind:childsDetailsStats="childsDetailsStats" v-bind:ageStats="ageStats" v-bind:nbrPays="nbrPays"/>
           <langue-stats v-bind:langStats="langStats" />
        </div>
    </div>
</template>

<script>
    import ChildsStats from '@/views/stats/ChildsStats.vue'
    import QuizStats from '@/views/stats/QuizStat.vue'
    import ChildsDetailStat from '@/views/stats/ChildsDetailStat.vue'
    import LangueStats from '@/views/stats/LangueStats.vue'  
export default {
    name: 'Home',
    components:{
        ChildsStats,
        QuizStats,
        ChildsDetailStat,
        LangueStats
    },
    data:()=>({
        childsStats:{
            total:"",
            nbInscritsMois:"",
            nbInscritsSemaine:"",
            nbInscritsActifs:"",
            ratio:"",
        },
        childsDetailsStats:{
            nbInscritsG:"",
            nbInscritsF:"",
            ratioGarcons:"",
            ratioFilles:""
        },
        ageStats:{
            nbZeroCinq: 0,
            nbCinqDix: 0,
            nbDixQuinze: 0,
            nbQuinzeDixHuit: 0
        },
        langStats:{
            nbInscritsFr:0,
            nbInscritsEn:0,
            nbInscritsFf:0,
            nbInscritsMa:0
        },
        nbrPays:[]

    }),
    beforeCreate() {
axios.get("/stats/enfants").then(response => {
         //console.log("result",response.result)
                    //childStats
                this.childsStats.total = response.result.total;
                //this.childsStats.ratio= this.nbInscritsActifs/this.stats.total? typeof this.nbInscritsActifs !== 'undefined' :0
                this.childsStats.ratio=0;
                this.childsStats.nbInscritsMois = response.result.mois;
                this.childsStats.nbInscritsSemaine=response.result.semaine
                    //childsDetailsStats
                this.childsDetailsStats.nbInscritsG = response.result.garcons;
                this.childsDetailsStats.nbInscritsF = response.result.filles;
                this.childsDetailsStats.ratioGarcons=parseFloat((response.result.garcons/response.result.total)*100).toFixed(2);
                this.childsDetailsStats.ratioFilles=parseFloat((response.result.filles/response.result.total)*100).toFixed(2);
                this.nbrPays = response.result.nbrPays;
                
                this.ageStats.nbZeroCinq=response.result.ages[0];
                this.ageStats.nbCinqDix=response.result.ages[1];
                this.ageStats.nbDixQuinze=response.result.ages[2];
                this.ageStats.nbQuinzeDixHuit=response.result.ages[3];
              
                    //langStats
                this.langStats.nbInscritsFr = response.result.fr;
                this.langStats.nbInscritsEn = response.result.en;
                this.langStats.nbInscritsFf = response.result.ff;
                this.langStats.nbInscritsMa = response.result.ma;
                  console.log("langStats",this.langStats)

               
    });
  
    },
    mounted() {
    
    }
}
</script>