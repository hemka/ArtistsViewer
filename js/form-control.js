// vérification du formulaire
function isEmpty()
{
	if( $('#acesstoken').val() == "" || $('#page_id').val() == "" )
	{
		$('#error').append('Veuillez saisir tous les champs');
		$('#error').show();
		return true;
	}
	$('#error').empty();
	$('#error').show();
	return false;
}