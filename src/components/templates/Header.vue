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

export default {
    name: 'Header',
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