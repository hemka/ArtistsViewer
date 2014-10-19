<?php

include ('../class/artist.class.php');

		// recupération de l'artiste
        $artist = json_encode($_POST);
		$artist = json_decode($artist);
		// appel de la classe pour insertion en base de données
		$oArtist = new Artist();
		$oArtist->insert($artist);
        echo( json_encode($artist) );
?>