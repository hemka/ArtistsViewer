<?php

	require ('../db/config.php');
	
	// classe artiste
	class Artist{
		
		private $bdd;
		private $id;
		private $name;
		private $link;
		private $likes;
		
		// constructeur
		function __construct()
		{
			$this->id = 0;
			$this->name = '';
			$this->link = '';
			$this->likes = 0;
			// connection à la BDD
			$this->bdd 	 = new PDO('mysql:host='.HOST.';dbname='.DBNAME, USER, PWD);
		}
		
		// insertion en BDD
		public function insert($data)
		{
			if( ! $this->exists( $data->id ) )
			{
				$insert = $this->bdd->prepare("INSERT INTO  artist (page_id, name, link, likes) VALUES(:page_id,:name,:link,:likes)");
				$insert->bindParam(':page_id', $data->id);
				$insert->bindParam(':name', $data->name);
				$insert->bindParam(':link', $data->link);
				$insert->bindParam(':likes', $data->likes);
				$insert->execute();
			}
		}
		
		// permet de voir si un artiste existe déjà en base selon un page_id donné
		public function exists( $page_id )
		{
			$select = $this->bdd->prepare("SELECT count(*) as nb FROM artist WHERE page_id = :page_id");
			$select->bindParam(':page_id', $page_id);
			$select->execute();
			$data = $select->fetch();
			if( $data['nb'] > 0)
				return true;
			return false;
		}
		
	}
?>