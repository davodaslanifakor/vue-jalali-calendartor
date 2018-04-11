<template>
		<footer>
			<div class="social">
				<div class="container">
					<div class="row">
						<div class="col-md-12">
							<ul>
								<li>
									<a href="https://www.instagram.com/tebinja/" class="mdi mdi-instagram"></a>
								</li>
								<li>
									<a href="#" class="mdi mdi-facebook">
									</a>
								</li>
								<li>
									<a href="#" class="mdi mdi-skype">
									</a>
								</li>
								<li>
									<a href="https://t.me/tebinja" class="mdi mdi-telegram"></a>
								</li>
							</ul>
					 	</div>
					</div>
				</div>
			</div>
			<div class="quick-access"   v-if="false"> 
				<div class="container">
					<div class="row">
					<div class="col-md-12">
						<nuxt-link to="/" class="logo-footer" >
							<!-- <img  itemprop="logo" src="~/static/img/logo-footer.png" alt="طبینجا | Tebinja  | سامانه جامع پزشکی و سلامت" > -->
						</nuxt-link>
					</div>
						<div class="col-sm-12"  >
							<ul>
								<li>
									<nuxt-link to="/about">
										درباره ما
									</nuxt-link>
								</li>
								<li>
									<nuxt-link to="/qualification">
										 شرایط استفاده 
									</nuxt-link>
								</li>
							</ul>	
							<p itemprop="address">آدرس : بلوار آفریقا کوچه مروارید پلاک 8  
							- تلفن :   <a href="tel:021-75046300"  class="phonenumber"  itemprop="telephone">021-75046300</a>
										,<a href="tel:021-71148100"  class="phonenumber" itemprop="telephone">021-71148100</a>
							<p>استفاده از مطالب وب سایت طبینجا فقط برای مقاصد غیر تجاری و با ذکر منبع بلامانع است. کليه حقوق اين سايت متعلق به
							 <a href="http://www.rodween.com"> شرکت گروه رادوین تجارت خاورمیانه </a> می‌باشد.</p>	
						</div>
					</div>
				  </div>
			</div>
		</footer>
</template>

<script>
export default {

  name: 'Footer',

  data () {
    return {

    };
  }
};
</script>

<style lang="less">
@import (reference) "../assets/css/variable.less";

	footer{
		position: relative;
		.stoper_sidebar{
			position: absolute;
			top:0;
		}
		.logo-footer{
			margin-bottom: 15px;
			display: block;
		}
		.phonenumber{
			direction: ltr;
		}
				.social{
						text-align: center;
						background: @blue;
						ul{
							li{
								padding: 10px 0;
								display: inline-block;
								margin: 0 5px;
								a{
									display: block;
									width: 20px;
									height: 20px;
									border-radius: 4px;
									-o-border-radius: 4px;
									-moz-border-radius: 4px;
									-webkit-border-radius: 4px;
									-ms-border-radius: 4px;
									color:#0b1425;
								    line-height: 20px;
									font-size:12px; 
									&:before{
										    transform: scale(2) !important;
									}
									&:hover{
										color:#fff;

									}
								}
							}
						}
				}
				.quick-access{
						text-align: center;
						padding: 10px;
						background-color: #0b1425;
						// background:url('~/static/img/Footer-sprint.jpg') ;
						ul{
							display: block;clear: both;
							margin-bottom: 20px;
							// margin-top: 70px;
							li{
								display: inline-block;
								margin: 0 7px;

								a{
									display: block;
									color:#a3a3a3;
									font-size:16px; 
									&:hover{

										    color: #fff;

									}
								}
							}
						}
						p{
							a{
								display: inline-block;
								color:#428bca;
								
							}
							font-size:14px;
							margin:0 0 15px 0; 
							color:#a3a3a3;

						}
				}
			}
@media only screen and (max-width: 768px) {
	footer .quick-access ul li a{
		font-size:14px; 
	}
}
</style>
