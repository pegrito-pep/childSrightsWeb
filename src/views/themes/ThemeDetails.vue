<template>
    <div class="modal fade edit-layout-modal" id="editLayoutItem" tabindex="-1" role="dialog" aria-labelledby="editLayoutItemLabel" style="display: none;" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editLayoutItemLabel">Liste des droits du thème {{ theme.libelle }}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                    </div>
                    <div class="modal-body">
                       <transition-group name="item-anim" tag="div" class="list-container">
                            <div v-for="droit in theme.droits" :key="droit.idDroit" class="wine-list">
                                <div class="wine-card">
                                    
                                    <div class="container-theme">
                                          <div class="container-left">
                                            <div class="container-header">
                                              <p>{{ droit.numero }}</p> 
                                            </div>
                                            <div class="container-central">
                                                <img :src="getImgUrl(droit.image)" alt="photo-avatar">
                                            </div>
                                          </div>
                                          <div class="container-right">
                                              <h6>{{droit.titre}}</h6>
                                          </div>
                                    </div>
                                </div>
                            </div>
                        </transition-group>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
</template>
<script>
export default {
    name: 'ThemeDetails',
    props: ["theme"],
    methods: {
        getImgUrl(pic) {
            return "/img/avatarsDroits/" + pic;
        }
    }  
}
</script>

<style scoped>
.text-container{
  display: flex;
}
.text-container h4{
  padding-right: 4px!important;
}

@font-face {
  font-family: "font-1";
   src:  url(/fonts/Comic_Neue/ComicNeue-BoldItalic.ttf);
}
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  list-style-type: none;
}

a, a:visited {
  color: #eee;
  text-decoration: none;
}

input, select {
  outline: none;
  background: #B01735;
  border: none;
}

body {
  font-family: "font-1", sans-serif;
  background: #B01735;
  color: #eee;
}

#root {
  transition: 0.3s;
}

i {
  cursor: pointer;
}

.lobby-container {
  background: #3E0018;
  height: 100%;
  min-height: 90vh;
  border-radius: 56px 56px 20px 20px;
  margin: 54px auto 20px;
  padding-bottom: 20px;
  max-width: 1150px;
}
.lobby-container .cancel {
  display: flex;
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  border: 2px solid #eee;
  border-radius: 25px;
  padding: 10px 16px;
  cursor: pointer;
  transition: 0.2s;
}
.lobby-container .cancel i {
  transform: translate(4px, 2px);
  font-size: 0.8rem;
}
.lobby-container .cancel:hover {
  background: #eee;
  color: #3E0018;
}
.lobby-container ul {
  display: flex;
  justify-content: space-around;
  font-size: 2.5rem;
  width: 95%;
  margin: 0 auto 0;
  position: relative;
  color: #3E0018;
}
.lobby-container ul li {
  background: #EAE0DA;
  padding: 10px 18px;
  width: 70px;
  text-align: center;
  border-radius: 50%;
  margin-top: -34px;
  box-shadow: 0 0 4px #333;
  cursor: pointer;
  transition: 0.3s;
}
.lobby-container ul .search,
.lobby-container ul select,
.lobby-container ul .radio-container {
  border-radius: 40px;
  height: 60px;
  position: absolute;
  top: 45px;
  padding: 0 20px;
  color: #3E0018;
  max-width: 550px;
}
.lobby-container ul .name input {
  left: 0px;
  width: 90%;
  transform-origin: left;
  transform: scaleX(0);
  animation: animInput 0.5s ease forwards;
  font-family: "font-1", sans-serif;
}
.lobby-container ul .name input::placeholder {
  font-size: 1.3rem;
  color: #3E0018;
  transform: translateY(2px);
}
@keyframes animInput {
  to {
    transform: scaleX(1);
  }
}


@keyframes animInput2 {
  to {
    transform: scaleX(1) translateX(-50%);
  }
}

@media screen and (max-width: 650px) {
  .lobby-container ul .grapes .radio-container {
    width: 100%;
  }
}

@media screen and (max-width: 650px) {
  .lobby-container ul .grapes .radio-container .radio label {
    font-size: 0.8rem;
    margin-right: 1px;
  }
}

.lobby-container h3 {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 130px;
}
.list-container {
  display: flex;
  justify-content:space-between;
  flex-wrap: wrap;
  margin: 2px auto 0;
}
@media screen and (min-width: 850px) {
 .list-container .wine-list {
    width: 46%;
  }
}
 .list-container .wine-card {
  background: #ACAFAFFA;
  border-radius: 25px;
  padding: 10px;
  overflow: hidden;
  position: relative;
  height: 100%;
  box-shadow: 1px 1px 5px rgba(226, 226, 226, 0.178);
  margin: 14px auto 0;
}
.list-container .wine-card:nth-child(1), .lobby-container .list-container .wine-card:nth-child(2) {
  margin-top: 14px;
}
@media screen and (min-width: 850px) {
  .lobby-container .list-container .wine-card {
    width: 98%;
  }
}
@media screen and (max-width: 550px) {
 .list-container .wine-card {
    height: 340px;
  }
} .list-container .wine-card:before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100px;
  /*background: url("/img/background3.jpg") center 75%/cover;*/
  top: 0;
  left: 0;
  opacity: 0.55;
  border-radius: 0 0 120px 45%/60px;
} 
 .list-container .wine-card .card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px 20px 42px;
}
 .list-container .wine-card .card-header h2 {
  padding: 0;
  z-index: 20;
  font-size: 1.8rem;
  color: #eee;
}
@media screen and (max-width: 550px) {
 .list-container .wine-card .card-header h2 {
    font-size: 1.3rem;
  }
}
 .list-container .wine-card .card-header i {
  margin-right: 6px;
  font-size: 1.3rem;
  z-index: 20;
}
 .list-container .container {
  display: grid;
  width:100%;
  grid-template-columns: 52% 48%;
}
 .list-container .container .text-container .buttons {
  display: flex;
  margin: 24px 0 20px;
  width: 100%;
  justify-content: space-between;
}
 .list-container .container .text-container .buttons h4 {
  background: #3E0018;
  border-radius: 20px;
  padding: 10px 10px;
  box-shadow: 0 0 4px #333;
}
@media screen and (max-width: 550px) {
 .list-container .container .text-container .buttons h4 {
    font-size: 0.8rem;
  }
}
 .list-container .container .text-container .location {
  margin: 20px 0 20px;
  color: #3E0018;
}
 .list-container .container .text-container .location i {
  color: #B01735;
  font-size: 1.4rem;
  margin-right: 6px;
}
 .list-container .container .text-container .location span {
  font-size: 1.3rem;
}
 .list-container .container p {
  font-weight: 100;
  text-align: justify;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 8;
  overflow: hidden;
  color: #3E0018;
}
@media screen and (max-width: 550px) {
 .list-container .container .text-container p {
    -webkit-line-clamp: 4;
  }
}
 .list-container .container img {
  margin: 0 auto;
  padding: 20px 0 0 20px;
  max-height: 300px;
}
@media screen and (max-width: 550px) {
 .list-container .container img {
    height: 200px;
  }
}

.item-anim-enter-active, .item-anim-leave-active {
  opacity: 1;
  transition: 0.8s;
}
.item-anim-enter, .item-anim-leave-to {
  opacity: 0;
  transition: 0.1s;
}

.container-theme{
  position :relative;
  display:flex;
}
.container-central{
    max-width: 100px;
    max-height: 100px;
}
.container-left{
  width: 40%;
  position:relative;
}
.container-right{
  width: 60%;
  padding-top:2px;
  font-weight: 700;
}
.container-right h6{
    font-family: "font-1";
    font-size: 2em;
}
.container-central img{
  width:150%;
  position:absolute;
  top:1px;
}
.container-theme .container-header p{
  font-size: 2em;
  font-family:cursive;
  font-weight: 700;
  color: white;
}
@font-face {
    font-family: "Comic_Neue";
  src: local("Comic_Neue"), url("/fonts/Comic_Neue/ComicNeue-LightItalic.ttf") format("ttf");
}
.container h6{
  font-size: 2em;
  font-weight: 700;
  font-family:"Comic_Neue", sans-serif;
}

.wine-list{
  padding-bottom: 10px;
}
</style>