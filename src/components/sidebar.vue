<template>
	<aside class="sidebar" :class="{'open':sidebar.isSidebar}">
		<div @click="toggleSidebar(sidebar.isSidebar)">
			<button type="button" class="tcon tcon-menu--arrow tcon-menu--arrowleft" :class="{'tcon-transform':sidebar.isSidebar}" >
				<span class="tcon-menu__lines" aria-hidden="true"></span>
				<span class="tcon-visuallyhidden">toggleSidebar menu</span>
			</button>
		</div>
		<div class="list-sidebar"  v-bar>
			<ul>
				<li v-for="(item,index) in sidebar.sidebarNav" :key="index">
					<router-link :to="item.patch">{{item.name}}</router-link>
				</li>
			</ul>
		</div>
		
	</aside>
</template>
<script>
import { mapState , mapActions } from "vuex";

export default {
  name: "sidebar",

  data() {
    return {};
  },
  computed: {
    ...mapState(["sidebar"])
  },
  methods: {
    ...mapActions(["toggleSidebar"])
    // this[param] = !this[param]
    // this.$store.commit('sidebar/toggelSidebar',this.isSidebar)
  }
};
</script>

<style lang="less">
@import (reference) "../assets/css/variable.less";

.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  right: -350px;
  width: 350px;
  text-align: center;
  background: #fff;
  transition: all 0.4s cubic-bezier(0, -0.22, 0.18, 1.06);
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  z-index: 444;
  .list-sidebar {
    ul {
      padding-top: 60px;
      li {
        display: block;
        // 		transform: rotateX(180deg);
        // 		opacity: 0.3;
        // 		visibility: hidden;
        // 			transition: all .4s cubic-bezier(0, -0.22, 0.18, 1.06);
        // -webkit-transition: all .4s cubic-bezier(0, -0.22, 0.18, 1.06);
        // -moz-transition: all .4s cubic-bezier(0, -0.22, 0.18, 1.06);
        // -ms-transition: all .4s cubic-bezier(0, -0.22, 0.18, 1.06);
        // -o-transition: all .4s cubic-bezier(0, -0.22, 0.18, 1.06);
        a {
          display: block;
          padding: 15px 0;
          background: #fff;
          color: #000;
          position: relative;

          &::before {
            position: absolute;
            content: "";
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            transform-origin: center;
            border-bottom: 2px solid @green;
            transform: scale3d(0, 1, 1);
            transition: all 0.2s cubic-bezier(0, -0.22, 0.18, 1.06);
          }
          &:hover::before {
            transform: scale3d(1, 1, 1);
            transition: transform 0.3s;
          }
        }
      }
    }
    // ul.open{
    // 	li{
    // 		transform:none;
    // 		opacity: 0.9;
    // 		visibility: visible;

    // 	}
    // }
  }

  //***
  // btn svg

  .tcon {
    cursor: pointer;
    border: none;
    height: 40px;
    width: 30px;
    position: fixed;
    top: 5px;
    right: 15px;
    z-index: 999;
    transition: 0.3s;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background: transparent;
    outline: none;
    -webkit-tap-highlight-color: transparent;
    -webkit-tap-highlight-color: transparent;
    // display: none;
    z-index: 99999;
  }
  .tcon > * {
    display: block;
  }
  .tcon:hover,
  .tcon:focus {
    outline: none;
  }
  .tcon::-moz-focus-inner {
    border: 0;
  }
  .tcon-menu__lines {
    display: inline-block;
    height: 2px;
    width: 35px;
    border-radius: 2.85714px;
    transition: 0.3s;
    background: @blue;
    position: relative;
  }
  .tcon-menu__lines::before,
  .tcon-menu__lines::after {
    display: inline-block;
    height: 2px;
    width: 35px;
    border-radius: 2.85714px;
    transition: 0.3s;
    background: @blue;
    content: "";
    position: absolute;
    right: 0;
    transform-origin: 18.85714px center;
    width: 100%;
  }
  .tcon-menu__lines::before {
    top: 10px;
  }
  .tcon-menu__lines::after {
    top: -10px;
  }
  .tcon-transform .tcon-menu__lines {
    transform: scale3d(0.8, 0.8, 0.8);
  }
  .tcon-menu--arrow,
  .tcon-menu--arrowleft {
    width: auto;
  }
  .tcon-menu--arrow.tcon-transform .tcon-menu__lines::before,
  .tcon-transform.tcon-menu--arrowleft .tcon-menu__lines::before,
  .tcon-menu--arrow.tcon-transform .tcon-menu__lines::after,
  .tcon-transform.tcon-menu--arrowleft .tcon-menu__lines::after {
    top: 0;
    width: 20.22222px;
  }
  .tcon-menu--arrow.tcon-transform .tcon-menu__lines::before,
  .tcon-transform.tcon-menu--arrowleft .tcon-menu__lines::before {
    transform: rotate3d(0, 0, 1, 45deg);
  }

  .tcon-menu--arrow.tcon-transform .tcon-menu__lines::after,
  .tcon-transform.tcon-menu--arrowleft .tcon-menu__lines::after {
    transform: rotate3d(0, 0, 1, -45deg);
  }

  .tcon-visuallyhidden {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }

  .tcon-visuallyhidden:active,
  .tcon-visuallyhidden:focus {
    clip: auto;
    height: auto;
    margin: 0;
    overflow: visible;
    position: static;
    width: auto;
  }
}
.sidebar.open {
  right: 0;
}
</style>