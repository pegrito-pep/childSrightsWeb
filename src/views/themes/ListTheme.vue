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
                                <a href="../index.html"><i class="ik ik-home"></i></a>
                            </li>
                            <li class="breadcrumb-item">
                                <a href="#">Home</a>
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
                            <!-- <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#demoModal">Ajouter un thème</button> -->
                            <!-- <div class="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                                <form action="" class="">
                                    <input type="text" class="form-control" placeholder="Search.." required="">
                                    <button type="submit" class="btn btn-icon"><i class="ik ik-search"></i></button>
                                    <button type="button" id="adv_wrap_toggler" class="adv-btn ik ik-chevron-down dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
                                    <div class="adv-search-wrap dropdown-menu dropdown-menu-right" aria-labelledby="adv_wrap_toggler" x-placement="bottom-end" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(196px, 30px, 0px);">
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="libelle">
                                        </div>
                                        <button class="btn btn-theme">Search</button>
                                    </div>
                                </form>
                            </div> -->
                        </div>
                    </div>
                </div>
                <div class="separator mb-20"></div>
            <div class="row layout-wrap" id="layout-wrap" style="width:99%">
               <div class="col-xl-3 col-lg-4 col-12 col-sm-6 mb-4 list-item list-item-grid" v-for="theme in this.themes" :key="theme.idTheme">
                    <div class="card d-flex flex-row mb-3">
                        <a class="d-flex card-img" @click.prevent="showDetails(theme)" href="#editLayoutItem" data-toggle="modal" data-target="#editLayoutItem">
                            <!-- <b-img :src="theme.image" class="list-thumbnail responsive border-0" style="height:18em"/> -->
                   
                            <!-- <span class="badge badge-pill badge-primary position-absolute badge-top-left">pas encore synchronisé</span>
                            <span class="badge badge-pill badge-secondary position-absolute badge-top-left-2">synchronisé</span> -->
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
        <theme-details v-bind:theme="selectedTheme"/>
    </div>
</template>
<script>
import ThemeDetails from '@/views/themes/ThemeDetails.vue'


export default {
    name:"theme",
    components: {
        ThemeDetails
    },
    data:()=>({
        selectedTheme:null,
        themes:[],
        theme:{
            libelle: "",
            illustration:""
        }

    }),

    methods: {
        showDetails(theme) {
            this.selectedTheme = theme;
            console.log("theme",this.selectedTheme)
            $('#editLayoutItem').modal('show')
        },
        getThemes(){
            axios.get('/themes').then(response => {
             
			this.themes = response.result	
               console.log("themes",this.themes)
	        })
        }
    },
    mounted() {
	  this.getThemes()
	  this.$root.$on('new-theme-added', () => {
		  this.getThemes()
	  })
  }
    
}
</script>