<template>
    <div id="app" class="wrapper">
        <app-header />
        <div class="page-wrap">
            <sidebar />
            <div class="main-content">
                <slot/>
            </div>
            <full-features />
            <AppFooter />
        </div>
    </div>
</template>

<script>
import AppHeader from '@/components/templates/Header.vue'
import Sidebar from '@/components/templates/Sidebar.vue'
import AppFooter from '@/components/templates/Footer.vue'
import FullFeatures from '@/components/templates/FullFeatures.vue'

export default {
    name: 'DefaultLayout',
    components: {
        AppHeader, 
        Sidebar,
        AppFooter,
        FullFeatures
    }
}
</script>