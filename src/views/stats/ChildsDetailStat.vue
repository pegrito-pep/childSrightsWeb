<template>
  <div class="d-flex" style="width:100%">
    <div class="col-xl-3 col-md-6 pilote0">
      <div class="card bg-facebook soc-cont-card">
        <div class="card-block">
          <div class="soc-slider">
            <b-carousel
              id="carousel-1"
              :interval="4000"
              img-width="1024"
              img-height="200"
              style="text-shadow: 1px 1px 2px #333;"
            >
              <b-carousel-slide>
                <h3>Garçons : {{ childsDetailsStats.nbInscritsG }}</h3>
              </b-carousel-slide>
              <b-carousel-slide>
                <h3>Filles : {{ childsDetailsStats.nbInscritsF }}</h3>
              </b-carousel-slide>
            </b-carousel>

          </div>
          <i
            class="soc-cont-icon"
            v-bind:class="{ 'fas fa-male': isActive, 'fa fa-female': !isActive }"
          ></i>
        </div>
      </div>
    </div>
    <div class="col-xl-3 col-md-6 pilote1">
      <div class="card bg-twitter soc-cont-card">
        <div class="card-block">
          <div class="soc-slider">
            <b-carousel
              id="carousel-1"
              :interval="4000"
              img-width="1024"
              img-height="200"
              style="text-shadow: 1px 1px 2px #333;"
            >
              <b-carousel-slide>
                <h3>Garçons:{{ this.childsDetailsStats.ratioGarcons }}%</h3>
              </b-carousel-slide>
              <b-carousel-slide>
                <h3>Filles:{{ this.childsDetailsStats.ratioFilles }}%</h3>
              </b-carousel-slide>
            </b-carousel>
             
          </div>
          <i class="ik ik-bar-chart soc-cont-icon"></i>
        </div>
      </div>
    </div>
    <div class="col-xl-3 col-md-6 pilote2">
      <div class="card bg-google soc-cont-card">
        <div class="card-block">
          <div class="soc-slider">
            <b-carousel
              id="carousel-1"
              :interval="4000"
              img-width="1024"
              img-height="200"
              style="text-shadow: 1px 1px 2px #333;"
            >
              <b-carousel-slide>
                <h4>0 à 5 ans: {{ this.ageStats.nbZeroCinq }}</h4>
              </b-carousel-slide>
              <b-carousel-slide>
                 <h4>5 à 10 ans: {{ this.ageStats.nbCinqDix }}</h4>
              </b-carousel-slide>
              <b-carousel-slide>
                <h4>10 à 15 ans: {{ this.ageStats.nbDixQuinze }}</h4>
              </b-carousel-slide>
              <b-carousel-slide>
                <h4>15 à 18 ans: {{ this.ageStats.nbQuinzeDixHuit }}</h4>
              </b-carousel-slide>
            </b-carousel>

          </div>
          <i class="ik ik-bar-chart-2 soc-cont-icon"></i>
        </div>
      </div>
    </div>
    <div class="col-xl-3 col-md-6 pilote3">
      <div class="card bg-green soc-cont-card">
        <div class="card-block">
          <div class="soc-slider">
            <b-carousel
              id="carousel-1"
              :interval="4000"
              img-width="1024"
              img-height="200"
              style="text-shadow: 1px 1px 2px #333;"
            >
              <b-carousel-slide v-for="(item) in nbrPays" :key="item.pays">
                <h4>{{ item.pays }} : {{ item.nbr}}</h4>
              </b-carousel-slide>
            </b-carousel>
          </div>
          <i class="fa fa-flag soc-cont-icon"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ChildsDetailsStats",
  props: ["childsDetailsStats", "ageStats", "nbrPays"],
  data: () => ({
    isActive: true
  }),
  methods: {
    changeIconGender() {
      this.isActive = !this.isActive;
    },

    carousel: function() {
      // Social Slider start
      $("#fb-slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 1,
        autoplay: true,
        nav: false,
        loop: true
      });
      $("#tw-slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 1,
        autoplay: true,
        nav: false,
        loop: true
      });
      $("#gp-slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 1,
        autoplay: true,
        nav: false,
        loop: true
      });

      // Social Slider end
    }
  },
  mounted() {
    console.log(`ff`, this.childsDetailsStats);
    this.carousel();
  },
  created() {
    this.interval = setInterval(() => this.changeIconGender(), 4000);
  }
};
</script>
<style>
#carousel-1 .carousel-caption {
  position: relative !important;
  left: 0% !important;
}
</style>
<style scoped>
.soc-cont-card:after {
  color: black;
  font-weight: bold;
  padding-left: 49px !important;
}
.pilote0 .soc-cont-card:after {
  content: "Nombre d'inscrits" !important;
}
.pilote1 .soc-cont-card:after {
  content: "Taux par sexe" !important;
  /*font-weight: bold;*/
}
.pilote2 .soc-cont-card:after {
  content: "Enfants par tranche d'âge" !important;
  /* font-weight: bold;*/
}
.pilote3 .soc-cont-card:after {
  content: "Enfants par pays" !important;
  /*font-weight: bold;*/
}
.bg-insta {
  background-color: #4fd11c !important;
}
</style>