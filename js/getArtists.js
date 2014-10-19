// variable globale de compteur
var cpt = 0;

$( document ).ready(function() {
	$('#yesresult').hide();
	$('#findArtists').click(function(){
		cpt = 0;
		if( ! isEmpty() )
		{
			// suppression des lignes du table excépté l'entete
			$("#results").find("tr:gt(0)").remove();
			// récupération des artistes
			getArtistPages( $('#page_id').val() );
		}
	});
	
});


// fonction recursive de recuperation des pages artistes 
/*
	Prend en paramètre un PAGE_ID (page artiste)
	A partir de cet ID, on récupére toutes les pages qui sont en lien avec cet artiste
	A partir de ces pages, on récupère également les pages qui sont en lien avec cette page
	Si la page est de catégorie "musician/band" on incrémente le compteur et on affiche les caractèristiques de la page artiste + insertion en BDD
*/
function getArtistPages(page_id)
{          
	// utilisation de l'API facebook
	FB.api('/'+page_id+'/likes', {access_token : $('#acesstoken').val()},  function(response){
	  
	     for ( i = 0; i < response.data.length; i++ )
	{
	    if( response.data[i].category == "Musician/band" && response.data[i].name != "undefined")
	    {
			// récupération d'une page artiste
	        getPageInfo(response.data[i].id);
			cpt ++;
	    }
	    if( cpt <= 20 ) 
	    {
			// on continue de chercher des pages artistes
			getArtistPages(response.data[i].id);
	    }
	    else {
	        return false;
	    }
	}
	 
	  });
}
 
// fonctio de recupération d'informations concernant une page artiste
function getPageInfo(page_id) {
	    FB.api('/'+page_id, function(response) {
			// appel a l'insertion en BDD
			insertPageInfo(response);
    });
}


// fonction AJAX d'insertion d'artiste en BDD
function insertPageInfo(o_artist){
	$.ajax({
			type: "POST",
			dataType : 'json',
			data: o_artist,
			url: "ajax/saveArtists.php",
			success: function(data){
				appendArtist ( data );
			}

		});
}

// fonction d'affichage d'un artiste dans le table HTML
function appendArtist( data )
{
	$('#noresult').hide();
	$('#yesresult').show();
	var html = '<tr><td>' + data.id + '</td><td>' + data.name + '</td><td>' + data.link + '</td><td>' + data.likes + '</td></tr>';
	$('#results').append(html);
}


