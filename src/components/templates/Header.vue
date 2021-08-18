<template>
    <header class="header-top" header-theme="light">
        <div class="container-fluid">
            <div class="d-flex justify-content-between">
                <div class="top-menu d-flex align-items-center">
                    <button type="button" class="btn-icon mobile-nav-toggle d-lg-none"><span></span></button>
                    <div class="header-search">
                        <div class="input-group">
                            <span class="input-group-addon search-close"><i class="ik ik-x"></i></span>
                            <input type="text" class="form-control">
                            <span class="input-group-addon search-btn"><i class="ik ik-search"></i></span>
                        </div>
                    </div>
                    <button type="button" id="navbar-fullscreen" class="nav-link"><i class="ik ik-maximize"></i></button>
                </div>
                <div class="top-menu d-flex align-items-center">
                
                        <!--<language-switcher />-->
                    
                  
                    <button type="button" class="nav-link ml-5 mr-5" id="apps_modal_btn" data-toggle="modal" data-target="#appsModal"><i class="ik ik-grid"></i></button>
            

                   <!-- <button type="button" class="nav-link ml-10" id="apps_modal_btn" data-toggle="modal" data-target="#appsModal"><i class="ik ik-grid"></i></button>-->
                    <!-- <button class="nav-link ml-5 mr-5" id="apps_modal_btn" data-toggle="modal" data-target="#appsModal"
                        
                    >
                        <img :src="`/img/flag_${$i18n.locale}.svg`" alt="flag" class="w-8 h-8" >
                        <span class="ml-2">{{ $i18n.locale.toUpperCase() }}</span>
                        <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path class="heroicon-ui" d="M15.3 9.3a1 1 0 0 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 1.4-1.4l3.3 3.29 3.3-3.3z"></path></svg>
                    </button> -->
                    <!--language switcher start-->
                    <!-- <div class="dropdown">
                        <a class="dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img class="avatar" :src="`/img/flag_${$i18n.locale}.svg`" alt="flag"></a>
                        <span class="ml-2">{{ $i18n.locale.toUpperCase() }}</span>
                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                            <language-switcher />
                        </div>
                    </div> -->
                    
                    <!--language switcher end-->

                    <div class="dropdown">
                        <a class="dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img class="avatar" src="/img/profile-picture.jpg" alt=""></a>
                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                            <a class="dropdown-item" href="#" @click.prevent="goToProfile"><i class="ik ik-user dropdown-icon"></i> Profile</a>
                            <a class="dropdown-item" href="#" @click.prevent="logout"><i class="ik ik-power dropdown-icon"></i> Déconnexion</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
    import LanguageSwitcher from '@/components//templates/LanguageSwitcher.vue'
export default {
    name: 'Header',
    components: {
        LanguageSwitcher
    },
    data:() =>({
      
    }),
    methods: {
        logout() {
            storage.clear()
            this.$router.push({name: 'login'})
        },
        goToProfile(){
            this.$router.push({name: 'profile'})
        },
        setLocale(locale) {
            this.$i18n.locale = locale
            this.$router.push({
                params: { lang: locale }
            })
        }
    }
}
</script>