<template>
		<footer>
			<div class="social">
				<div class="container">
					<div class="row">
						<div class="col-md-12">
							<ul>
								<li>
									<a href="#" class="mdi mdi-instagram"></a>
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
									<a href="#" class="mdi mdi-telegram"></a>
								</li>
							</ul>
					 	</div>
					</div>
				</div>
			</div>
		</footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {};
  }
};
</script>

<style lang="less">
@import (reference) "../assets/css/variable.less";
footer {
  position: relative;
  .stoper_sidebar {
    position: absolute;
    top: 0;
  }
  .logo-footer {
    margin-bottom: 15px;
    display: block;
  }
  .phonenumber {
    direction: ltr;
  }
  .social {
    text-align: center;
    background: @green;
    ul {
      li {
        padding: 10px 0;
        display: inline-block;
        margin: 0 5px;
        a {
          display: block;
          width: 20px;
          height: 20px;
          border-radius: 4px;
          -o-border-radius: 4px;
          -moz-border-radius: 4px;
          -webkit-border-radius: 4px;
          -ms-border-radius: 4px;
          color: #fff;
          line-height: 20px;
          font-size: 12px;
          &:before {
            transform: scale(2) !important;
          }
          &:hover {
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
