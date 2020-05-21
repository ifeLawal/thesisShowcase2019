import $ from 'jquery.js'

$(document).ready(function(){
	$('#nav-icon1,#nav-icon2,#nav-icon3,#nav-icon4').click(function(){
		$(this).toggleClass('open');
	});
});


</h1>
<div id="nav-icon2" onClick={this.toggleHamburger} className={this.state.hamburgerClick ? 'open': null}>
  <span>About</span>
  <span>Others</span>
  <span>Menu</span>
  <span></span>
  <span></span>
  <span></span>
</div>
</div>
