<template>
    <div class="container-fluid">
    <!--page header start -->
        <div class="page-header">
            <div class="row align-items-end">
                <div class="col-lg-8">
                    <div class="page-header-title">
                        <i class="ik ik-globe bg-blue"></i>
                        <div class="d-inline">
                            <h5>Themes</h5>
                            <span>Liste des thèmes</span>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <nav class="breadcrumb-container" aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                                 <router-link to="/home">
                                   <i class="ik ik-home"></i><span> Accueil</span>
                                 </router-link>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">Thèmes</li>
                        </ol>
                    </nav>
                </div>
            </div>    
        </div>
        <!--page header end -->
        <div class="row">
            <div class="col-md-12">
                <div class="mb-2 clearfix">
                    <a class="btn pt-0 pl-0 d-md-none d-lg-none" data-toggle="collapse" href="#displayOptions" role="button" aria-expanded="true" aria-controls="displayOptions">
                        Display Options
                        <i class="ik ik-chevron-down align-middle"></i>
                    </a>
                    <div class="collapse d-md-block display-options" id="displayOptions">
                    
                        <div class="d-block d-md-inline-block">
                        </div>
                    </div>
                </div>
                <div class="separator mb-20"></div>
            <div class="row layout-wrap" id="layout-wrap" style="width:99%"  ref="themeCont">
               <div class="col-xl-3 col-lg-4 col-12 col-sm-6 mb-4 list-item list-item-grid" v-for="theme in this.themes" :key="theme.idTheme">
                    <div class="card d-flex flex-row mb-3">
                        <a class="d-flex card-img" @click.prevent="showDetails(theme)"   
                            href="#themeDetailLayout"
                            data-toggle="modal"
                            data-target="#themeDetailLayout">
          
                        </a>
                        <div class="d-flex flex-grow-1 min-width-zero card-content">
                            <div class="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                                <a class="list-item-heading mb-1 truncate w-40 w-xs-100" href="#editLayoutItem" data-toggle="modal" data-target="#editLayoutItem" style="font-weight: bold; text-transform:uppercase;">
                                   {{ theme.libelle }}
                                </a>
                            </div>
                            <div class="list-actions">
                                <a @click.prevent="showDetails(theme)" href="#"><i class="ik ik-eye"></i></a>
                                <!-- <a href="layout-edit-item.html"><i class="ik ik-edit-2"></i></a> -->
                            </div>
                            <div class="custom-control custom-checkbox pl-1 align-self-center">
                                <label class="custom-control custom-checkbox mb-0">
                                    <input type="checkbox" class="custom-control-input">
                                    <span class="custom-control-label"></span>
                                </label>
                            </div>
                            
                        </div>
                    </div>
                    
                </div>
                 
            </div>
            </div>
        </div>
        <theme-details v-if="showDetailTheme" v-bind:theme="selectedTheme"/>
    </div>
</template>
<script>
import ThemeDetails from '@/views/themes/ThemeDetails.vue'
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
    name:"theme",
    components: {
        ThemeDetails
    },
    data:()=>({
        showDetailTheme:false,
        selectedTheme:null,
        themes:[],
        theme:{
            libelle: "",
            illustration:""
        },
        loader:"dots"

    }),

    methods: {
        showDetails(theme) {
            this.showDetailTheme = true;
            this.selectedTheme = theme;
            $('#themeDetailLayout').modal('show')
            console.log("theme",this.selectedTheme)
           
        },
        getThemes(){
            let homeCont = this.$refs.themeCont;
            let loader = this.$loading.show({
                container: homeCont,
                loader: "dots",
                color: "black",
            });
            axios.get('/themes').then(response => {
                this.themes = response.result})
                loader.hide();
            //    console.log("themes",this.themes)
        }
    },
    beforeCreate() {
	  let homeCont = this.$refs.themeCont;
            let loader = this.$loading.show({
                container: homeCont,
                loader: "dots",
                color: "black",
            });
            axios.get('/themes').then(response => {
                this.themes = response.result
                loader.hide();
                })
                
	//   this.$root.$on('new-theme-added', () => {
	// 	  this.getThemes()
	//   })
  }
    
}
</script>