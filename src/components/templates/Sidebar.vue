<template>
    <div class="app-sidebar colored">
        <div class="sidebar-header">
            <a class="header-brand" href="index.html">
                <div class="logo-img mr-2">
                    <img src="/img/caysti-logo.png" class="header-brand-img" alt="lavalite" style="height: 1.5em; width: 1.5em"> 
                </div>
                <span class="text">ChildsRights</span>
            </a>
            <button type="button" class="nav-toggle"><i data-toggle="expanded" class="ik ik-toggle-right toggle-icon"></i></button>
            <button id="sidebarClose" class="nav-close"><i class="ik ik-x"></i></button>
        </div>
        
        <div class="sidebar-content">
            <div class="nav-container">
                <nav id="main-menu-navigation" class="navigation-main">
                    <div class="nav-lavel">Navigation</div>
                    <div class="nav-item active" @click="manageActiveClass()">
                        <router-link to="/home">
                            <i class="ik ik-bar-chart-2"></i><span>Dashboard</span>
                        </router-link>
                    </div>
                     <div class="nav-item" @click="manageActiveClass()">
                        <router-link to="/learners"><i class="fas fa-child"></i><span>Gestion des apprenants</span></router-link>
                    </div>
                    <div class="nav-item">
                        <router-link to="/quizzes"><i class="fa fa-question-circle"></i><span>Gestion des quiz</span></router-link>
                    </div>
                    <div class="nav-item">
                        <router-link to="/questions"><i class="fa fa-question"></i><span>Gestion des questions</span></router-link>
                    </div>
                    <div class="nav-item">
                         <router-link to="/themes"><i class="ik ik-globe"></i><span>Thèmes</span></router-link>
                    </div>
                    
                    <!-- <div class="nav-item">
                         <router-link to="/languages"><i class="fa fa-language"></i><span>Gestion des langues</span></router-link>
                    </div> -->
                    <div class="nav-lavel">Support</div>
                    <div class="nav-item">
                        <a href="javascript:void(0)"><i class="ik ik-monitor"></i><span>Documentation</span></a>
                    </div>
                    
                </nav>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Sidebar',
    methods: {
       manageActiveClass(event){ 
            console.log("target",event)
       }
    }
}
</script>