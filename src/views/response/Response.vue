<template>
    <div class="form-group">
        <div v-for="(item, index) in names" :key="index">
            <input type="checkbox" :id="item.libelle" v-model="item.isAnswer" @click="checkPropositions">
            <label :for="item.libelle" id="decalage">{{ item.libelle }}</label>
        </div>
    </div>

    
</template>
<script>
export default {
    name:"response",
    props: ["propositions"],
    data:()=>({
        names: []
    }),
    // computed: {
    //     checkedNames() {
    //         return this.names.filter(item => item.checked).map(name => name.libelle)
    //     }
    // },
    methods: {
         setCheckbox: function() {
             let phrase=""
             for(let i=0;i<this.propositions.length;i++){
                 phrase +="essai {"+this.propositions[i].libelle+"} ,"
             }
            var regExp = /{([^}]*)}/g;

            var matches = phrase.match(regExp);
            var arrCheckbox = [];

			console.log(matches);
            for (var i = 0; i < matches.length; i++) {
                var str = matches[i].replace(/{(.*)}/, '$1');
                this.names.push({libelle: str, isAnswer: false});
            }
        },
        checkPropositions(){
            this.$emit('response', this.names)
        }

    },
    mounted() {
        this.setCheckbox();
    }
}
</script>
