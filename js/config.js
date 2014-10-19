//initialisation API facebook
window.fbAsyncInit = function() {
      window.fbAsyncInit = function() {
          FB.init({
            appId      : '821437851241211',
            xfbml      : true,
            version    : 'v2.1'
          });
        };

	
    };
	
// chargement du SDK
  (function(d){
     var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement('script'); js.id = id; js.async = true;
     js.src = "//connect.facebook.net/en_US/all.js";
     ref.parentNode.insertBefore(js, ref);
   }(document));