	<div class="site-footer bg-light">
	  <div class="container">
	    <div class="row justify-content-between">
	      <div class="col-lg-4">
	        <div class="widget">
	          <?php perch_content('Footer'); ?>
	        </div>
	        <div class="widget">
	          <h3>Connect with us</h3>
	          <ul class="social list-unstyled">
	            <li><a href="https://twitter.com/hivechatuk"><span class="icon-twitter"></span></a></li>
	            <li><a href="https://facebook.com/hivechatuk"><span class="icon-facebook"></span></a></li>
	            <li><a href="https://instagram.com/hivechatuk"><span class="icon-instagram"></span></a></li>
	          </ul>
	        </div>
	      </div>
	      <div class="col-lg-6">
	        <div class="row">
	          <div class="col-12">
	            <div class="widget">
	              <h3>Quick Links</h3>
	            </div>
	          </div>
	          <div class="col-6 col-sm-6 col-md-4">
	            <div class="widget">
	              <?php perch_pages_navigation(array(
                  'navgroup' => 'footer-one',
                  'levels' => 2,
                  'template' => 'footer.html'
                )); ?>
	            </div>
	          </div>
	          <div class="col-6 col-sm-6 col-md-4">
	            <div class="widget">
	              <?php perch_pages_navigation(array(
                  'navgroup' => 'footer-two',
                  'levels' => 2,
                  'template' => 'footer.html'
                )); ?>
	            </div>
	          </div>
	          <div class="col-6 col-sm-6 col-md-4">
	            <div class="widget">
	              <?php perch_pages_navigation(array(
                  'navgroup' => 'footer-three',
                  'levels' => 2,
                  'template' => 'footer.html'
                )); ?>
	            </div>
	          </div>
	        </div>
	      </div>
	    </div>

	    <div class="row justify-content-center text-center copyright">
	      <div class="col-md-8">
          <p>
            <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
	          Copyright &copy;2021 All rights reserved | Brereton Lodge Moors Centre Ltd<br />Built by <a href="https://natureslaboratory.co.uk">Nature&rsquo;s Laboratory</a>
	        </p>
          <a href="/terms-and-conditions">Terms and Conditions</a> - <a href="/privacy-policy">Privacy Policy</a>
	      </div>
	    </div>
	  </div>
	</div>


	<div id="overlayer"></div>
	<div class="loader">
	  <div class="spinner-border" role="status">
	    <span class="sr-only">Loading...</span>
	  </div>
	</div>

	<script src="/design/js/jquery-3.4.1.min.js"></script>
	<script src="/design/js/popper.min.js"></script>
	<script src="/design/js/bootstrap.min.js"></script>
	<script src="/design/js/owl.carousel.min.js"></script>
	<script src="/design/js/aos.js"></script>
	<script src="/design/js/jquery.animateNumber.min.js"></script>
	<script src="/design/js/jquery.waypoints.min.js"></script>
	<script src="/design/js/jquery.fancybox.min.js"></script>
	<script src="/design/js/aos.js"></script>
	<script src="/design/js/custom.js"></script>

	<!-- Matomo -->

	<script type="text/javascript">
	var _paq = window._paq = window._paq || [];
	/* tracker methods like "setCustomDimension" should be called before "trackPageView" */
	_paq.push(["setCookieDomain", ".hivechat.co.uk"]);
	_paq.push(['trackPageView']);
	_paq.push(['enableLinkTracking']);
	(function() {
		var u="https://analytics.natureslaboratory.co.uk/";
		_paq.push(['setTrackerUrl', u+'matomo.php']);
		_paq.push(['setSiteId', '11']);
		var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
		g.type='text/javascript'; g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
	})();
	</script>
	<!-- End Matomo Code -->

	</body>

	</html>