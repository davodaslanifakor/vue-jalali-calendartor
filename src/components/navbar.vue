<template>
	<div class="navbarnav navbar-fix">
		<div class="overwrapper" :class="{'open':isNavbar}" @click="toggle('isNavbar')"></div>
		<div class="overwrapperavatar" :class="{'open':isAvatar}" @click="toggle('isAvatar')"></div>
		<div @click="toggle('isNavbar')">
			<button type="button" class="tcon tcon-menu--arrow tcon-menu--arrowleft" :class="{'tcon-transform':isNavbar}">
				<span class="tcon-menu__lines" aria-hidden="true"></span>
				<span class="tcon-visuallyhidden">toggle menu</span>
			</button>
		</div>
		<div class="container">
			<div class="row">
				<div class="col-sm-12">
					<nuxt-link to="/" class="logo">
						<!-- <img src="~/static/img/Logo1.png"  alt="طبینجا | Tebinja  | سامانه جامع پزشکی و سلامت"> -->
					</nuxt-link>
					<ul  class="navigation" :class="{open:isNavbar}">
						<li v-for="item in listNavbar">	
							<nuxt-link :to="item.path">{{item.text}}</nuxt-link>
						</li>
					</ul>
					<!-- v-if="!login" -->
					<div class="action_login" v-if="false">
						<span><a href="/app/login" class=""><i class="mdi mdi-account-outline"></i> <span>ثبت نام / ورود</span></a></span>
					</div>	
					<!-- v-if="login" -->
					<div  class="avatar" :class="{open:isAvatar}" >
						<nuxt-link to="/">
							<span>fullname</span>
							<figure>
								<!-- <img src="~/static/img/pattient.png" class="img-circle"> -->
							</figure>
						</nuxt-link>
						<i class="mdi mdi-chevron-down" @click="toggle('isAvatar')"></i>
						<div class="list-menu" :class="{open:isAvatar}">
							<ul>
								<li v-for="(item , i) in listAvatar" :class="{divider:item.divider}" @click="toggle('isAvatar')">
									<nuxt-link :to="item.path" exact>
										<i class="mdi" :class="item.icon"></i>
										{{item.text}}
									</nuxt-link>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>
<script>
export default {
	name: 'navbar',
	computed: {
		listNavbar () {
			return this.$store.state.navbar.listNavbar
		},
		listAvatar () {
			return this.$store.state.navbar.listAvatar
		},
		
	},
	data () {
		return {
			isNavbar:false,
			isAvatar:false
		}
	},
	methods:{
		toggle(param){
			this[param] = !this[param]
		}
	}
}
</script>

<style lang="less">
@import (reference) "../static/css/variable.less";
.navbarnav {
	display: block;
	height: 60px;
	background: @green;
	position: fixed;
	top: 0;
	right: 0;
	left: 0;
	z-index: 9999999999;
	transition: all .4s cubic-bezier(0, -0.22, 0.18, 1.06);
	-webkit-transition: all .4s cubic-bezier(0, -0.22, 0.18, 1.06);
	-moz-transition: all .4s cubic-bezier(0, -0.22, 0.18, 1.06);
	-ms-transition: all .4s cubic-bezier(0, -0.22, 0.18, 1.06);
	-o-transition: all .4s cubic-bezier(0, -0.22, 0.18, 1.06);
	&:before {
		content: "";
		position: absolute;
		z-index: -1;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: #fff;
		-webkit-transform: scaleY(0);
		transform: scaleY(0);
		-webkit-transform-origin: 50% 0;
		transform-origin: 50% 0;
		-webkit-transition-property: transform;
		transition-property: transform;
		-webkit-transition-duration: 0.5s;
		transition-duration: 0.5s;
		-webkit-transition-timing-function: ease-out;
		transition-timing-function: ease-out;

	}
	.navigation {
		text-align: right;
		li {
			display: block;
			margin-left: 25px;
			float: right;
			a {
				line-height: 60px;
				height: 60px;
				display: block;
				padding: 0px 25px;
				color: #000;
				font-size: 14px;font-weight: bold;
				position: relative;
				transition: all .4s linear;
				-webkit-transition: all .4s linear;
				-moz-transition: all .4s linear;
				-ms-transition: all .4s linear;
				-o-transition: all .4s linear;
				&::before {
					box-sizing: inherit;
					content: '';
					position: absolute;
					width: 100%;
					height: 100%;

				}

				&:hover {
					color: #444;

				}

				&::before {
					top: 0;
					left: 0;
					height: 100%;
					width: 100%;
					transform-origin: center;

				}

				&::before {
					border-bottom: 2px solid @green;
					transform: scale3d(0, 1, 1);

				}

				&:hover::before {
					transform: scale3d(1, 1, 1);
					transition: transform 0.5s;

				}

			}
		}
		.nuxt-link-active {
			&:before {
				transform: scale3d(1, 1, 1);
				transition: transform 0.5s;
			}
			color: #444444;
		}
	}
	.list-menu {
		position: absolute;
		right: 0;
		left: 0;
		background: #fff;
		border: 1px solid #fff;
		top: 100%;
		z-index: 9999;
		box-shadow: 0 0 5px 0 rgba(50, 50, 50, .2);
		visibility: hidden;
		opacity: .4;
		transition: all .3s ease-in-out;
		transition: all .3s ease-in;;
		ul {
			display: block;
			li {
				width: 100%;
				background: #fff;
				text-align: center;
				position: relative;
				display: block;
				-webkit-transform-origin: 50% 0;
				transform-origin: 50% 0;
				-webkit-transform: scaleY(0);
				transform: scaleY(0);
				opacity: 0;
				transition: opacity .4s, transform .6s, max-height .6s;
				i{
					float: right;
					font-size: 12px;
					color: #000;
					cursor: pointer;
					height: 40px;
					line-height: 40px;
					transition: color .4s;
				}
				&:before {
					content: "";
					position: absolute;
					bottom: 0;
					height: 2px;
					left: 100%;
					right: 100%;
					display: block;
					background: @green;
					visibility: hidden;
					opacity: .3;
					transition: all .3s ease-in-out;
					transition: all .3s ease-in;
				}
				a {
					padding-right:7px; 
					display: inline-block;
					width: 100%;
					font-size: 13px;
					color: #000;
					cursor: pointer;
					height: 40px;
					line-height: 40px;
					transition: color .4s;
				}
				&:hover {
					a , i{
						color: @green;
					}
					&:before {
						left: 0;
						opacity: 1;
						right: 0;
						visibility: visible;
					}
				}
				&:last-child {
					border-bottom: none;
				}
			}
			.divider{
				border-bottom: 1px solid #c9c9c9;
			}
		}
	}
	.open.list-menu {
		visibility: visible;
		opacity: 1;
		ul {
			visibility: visible;
			opacity: 9;
			li {
				opacity: 9;
				-webkit-transform: none;
				transform: none;

			}

		}

	}
	.logo {

		transition: all .4s linear;

		-webkit-transition: all .4s linear;

		-moz-transition: all .4s linear;

		-ms-transition: all .4s linear;

		-o-transition: all .4s linear;

		display: block;

		float: right;

		line-height: 100px;

		padding: 0;

		line-height: 80px;

		img {

			width: 100%;

		}

	}
	.action_login {
		text-align: center;
		float: left;
		>span {
			display: inline-block;
			text-align: center;
			text-decoration: none;
			height: 40px;
			line-height: 40px;
			margin: 10px auto;
			border-radius: 4px;
			-webkit-border-radius: 4px;
			-ms-border-radius: 4px;
			-moz-border-radius: 4px;
			-o-border-radius: 4px;
			transition: all .4s ease-in-out;
			-o-transition: all .4s ease-in-out;
			-moz-transition: all .4s ease-in-out;
			-webkit-transition: all .4s ease-in-out;
			-ms-transition: all .4s ease-in-out;
			a {
				color: #000;
				font-size: 14px;
				font-weight: inherit;
				display: block;
			}
		}
		i {
			margin-left: 5px;
		}

	}
	.recharge{
		float: left; 
		width: 45px;
		position: relative;
		cursor: pointer;
		.list-menu{
			width: 200px;
			right: inherit;
		}
		.mdi-credit-card{
			text-align: left;
			color: #000;
			line-height: 60px;
			font-size: 20px;
			display: block;
			.transition(all, 0.3s, ease-in)
		}
	}
	.avatar {
		float: left;
		width: 195px;
		position: relative;
		cursor: pointer;
		.mdi-chevron-down{
			color: #000;
			line-height: 60px;
			position: absolute;
			left: 0;
			top: 0;
			bottom: 0;
			font-size: 20px;
			display: block;
			z-index: 5;
			.transition(all, 0.3s, ease-in)
		}

		figure {
			float: left;
			margin-left: 15px;
			width: 46px;
			margin-top: 6px;
			img {
				width: 100%;
				border: 2px solid #fff;

			}

		}

		span {
			float: left;
			display: block;
			line-height: 60px;
			font-size: 13px;
			color: #000;
			width: 124px;
			padding-left: 37px;
			.elips;
		}
	}

}




.avatar.open {
	.mdi-chevron-down{
		transform:scale(1,-1)
	}
}

.navbar-fix {
	position: fixed;
	right: 0;
	left: 0;
	top: 0;
	height: 60px;
	-webkit-box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.2);
	-moz-box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.2);
	box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.2);
	&:before {
		-webkit-transform: scaleY(1);
		transform: scaleY(1);
		-webkit-transition-timing-function: cubic-bezier(0.52, 1.64, 0.37, 0.66);
		transition-timing-function: cubic-bezier(0.52, 1.64, 0.37, 0.66);
	}
	.navigation {
		.box-clear;
		float: right;
		li {
			a {
				color: #000;
			}
		}
	}
	.logo {
		line-height: 0;
		padding: 0
	}
}



@keyframes header-anim {

	from {

		opacity: .5;

		-webkit-transform: translateY(-150px);

		-ms-transform: translateY(-150px);

		transform: translateY(-150px);

	}

	to {

		opacity: 1;

		-webkit-transform: translateY(0);

		-ms-transform: translateY(0);

		transform: translateY(0);

	}

}



	// btn svg
	
	.tcon {

		border: none;

		height: 40px;

		width: 30px;

		float: right;

		position: relative;

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

		display: none;

		margin: 8px 10px 0 7px;

		z-index: 99999;


	}
	
	
	
	.tcon>* {

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

		width: 30px;

		border-radius: 2.85714px;

		transition: 0.3s;

		background: #999;

		position: relative;

	}
	
	
	
	.tcon-menu__lines::before,
	
	.tcon-menu__lines::after {

		display: inline-block;

		height: 2px;

		width: 30px;

		border-radius: 2.85714px;

		transition: 0.3s;

		background: #999;

		content: '';

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
	
	
	
	.overwrapper {

		position: fixed;

		// background: var(--colorText);

		background: rgba(53, 63, 70, 0.5);

		right: -1000px;

		left: 0;

		bottom: 0;

		top: 0;

		visibility: hidden;

		opacity: 0.1;

		transition: all .4s cubic-bezier(0, -0.22, 0.18, 1.06);

		-webkit-transition: all .4s cubic-bezier(0, -0.22, 0.18, 1.06);

		-moz-transition: all .4s cubic-bezier(0, -0.22, 0.18, 1.06);

		-ms-transition: all .4s cubic-bezier(0, -0.22, 0.18, 1.06);

		-o-transition: all .4s cubic-bezier(0, -0.22, 0.18, 1.06);

		z-index: 6;

	}
	
	
	
	.overwrapperavatar {

		position: fixed;

		// background: var(--colorText);

		// background: rgba(53, 63, 70, 0.5);

		right: -1000px;

		left: 0;

		bottom: 0;

		top: 0;

		visibility: hidden;

		opacity: 0.1;
		z-index: 4;

		transition: all .4s cubic-bezier(0, -0.22, 0.18, 1.06);

		-webkit-transition: all .4s cubic-bezier(0, -0.22, 0.18, 1.06);

		-moz-transition: all .4s cubic-bezier(0, -0.22, 0.18, 1.06);

		-ms-transition: all .4s cubic-bezier(0, -0.22, 0.18, 1.06);

		-o-transition: all .4s cubic-bezier(0, -0.22, 0.18, 1.06);

	}
	
	
	
	.overwrapper.open,
	
	.overwrapperavatar.open {

		right: 0;

		visibility: visible;

		opacity: 0.5;

	}
	
	
	
	.backtoTop {

		background: #fff;

		color: #000;

		border: none;

		border-radius: 50%;

		position: fixed;

		bottom: 40px;

		right: 40px;

		width: 40px;

		height: 40px;

		z-index: 9999999999;

		-webkit-box-shadow: 0px 4px 6px 0px rgba(204, 204, 204, 0.2);

		-moz-box-shadow: 0px 4px 6px 0px rgba(204, 204, 204, 0.2);

		box-shadow: 0px 4px 6px 0px rgba(204, 204, 204, 0.2);

	}
	
	
	
	///////////
	
	@media screen and (max-width: 1200px) {
		.navbarnav .navigation li a{
			padding:0px 15px; 
		}
	}
	@media screen and (max-width: 992px) {

		// .navbarnav .avatar{

		// 	// width: auto;

		// }

		.tcon {

			display: block;

		}

		.navbarnav {

			height: 60px;

			.avatar a{

				figure {

					float: left;

					margin-left: 25px;

				}

				>span {

					display: none;

				}

			}

			.navigation {

				padding-top: 60px;

				text-align: center;

				background: #fff;

				position: fixed;

				right: -230px;

				top: 0;

				bottom: 0;
				
				transition: all .4s cubic-bezier(0, -0.22, 0.18, 1.06);

				-webkit-transition: all .4s cubic-bezier(0, -0.22, 0.18, 1.06);

				-moz-transition: all .4s cubic-bezier(0, -0.22, 0.18, 1.06);

				-ms-transition: all .4s cubic-bezier(0, -0.22, 0.18, 1.06);

				-o-transition: all .4s cubic-bezier(0, -0.22, 0.18, 1.06);


				box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);

				li {

					display: block;

					margin-left: 0;

					float: none;

					margin-bottom: 5px;

					a {

						color: #515f67;

						display: block;

						line-height: 60px;

						height: 60px;

						width: 200px;

						padding: 0 25px;

						&:after {

							display: none;

						}

						&:before {

							border-top: none;

						}

					}

					.active {

						box-shadow: inset 0px -2px 0px 0px #0f4880;

					}

				}

			}

			.logo {

				line-height: 47px;

				padding-left: 0px;
				
				padding-top: 7px;
				img {

					width: 70%;

				}

			}

		}

		.navigation.open {

			right: 0;

			z-index: 999;

		}

		.navbar-fix {

			padding: 0;

		}

	}
	@media screen and (max-width: 768px){
		.navbarnav .avatar{
			width: 175px;
		}
	}
	@media screen and (max-width: 593px){
		.navbarnav .avatar{
			width: 150px;
		}
	}
	</style>