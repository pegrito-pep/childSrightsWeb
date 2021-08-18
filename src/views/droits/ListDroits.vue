<template>
    
    <div class="container-fluid">
    <!--page header start -->
        <div class="page-header">
            <div class="row align-items-end">
                <div class="col-lg-8">
                    <div class="page-header-title">
                        <i class="ik ik-file-text bg-blue"></i>
                        <div class="d-inline">
                            <h5>Droits</h5>
                            <span>Liste des droits</span>
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
                            <li class="breadcrumb-item active" aria-current="page">Droits</li>
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
                            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#demoModal">Ajouter un droit</button>
                            <div class="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
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
                            </div>
                        </div>
                    </div>
                </div>
                <div class="separator mb-20"></div>
            <div class="row layout-wrap" id="layout-wrap" style="width:99%">
               <div class="col-xl-3 col-lg-4 col-12 col-sm-6 mb-4 list-item list-item-grid" v-for="droit in this.droits" :key="droit.idDroit">
                   <div class="card prod-bar-card">
                        <div class="card-header">
                            <h3>{{ droit.titre }}</h3>
                        </div>
                        <div class="card-block">
                            {{ droit.description }}
                        </div>
                    </div>
                    
                </div>
                 
            </div>
            </div>
        </div>
        <add-droit />
    </div>
</template>
<script>

import AddDroit from '@/views/droits/AddDroit.vue'

export default {
    name:"droit",
    components: {
        AddDroit
    },
    data:()=>({
        selectedTheme:null,
        droits:[],
        droit:{
            titre: "",
            description:""
        }

    }),

    methods: {
        getDroits(){
            axios.get('droits').then(response => {
			this.droits = response.result	
	        })
        }
    },
    mounted() {
	  this.getDroits()
	  this.$root.$on('new-droit-added', () => {
		  this.getDroits()
	  })
  }
    
}
</script>