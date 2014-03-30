
window.onload = load;

var names = [];
function load() {

	var thumbnails = [
	'Light_1',
	'Light_2',
	'Light_3',
	'Light_4',
	'Light_5',
	'Graveyard_1',
	'Graveyard_2',
	'Graveyard_3',
	'Graveyard_4',
	'Graveyard_5',
	'Graveyard_6',
	'Graveyard_7',
	'Motion_1',
	'Motion_2',
	'Motion_3',
	'Beach_1']

	var browserLength = 0;
	
	for(var x= 0; x<thumbnails.length; x++){
		var icon = $(document.createElement('div'));
		icon.addClass('thumbnail');
		var url = 'url(./pictures/' + thumbnails[x] + '.JPG)';
		icon.css('background-image', url);
		$('#browserContent').append(icon);
	}

	browserLength = "" + (200*x);
	$('#browserContent').css('width', browserLength);


	$(".thumbnail").on("click" , function(e){

		var collection = $(this).css('background-image').split('/pictures/')[1].substring(0,5);

		document.getElementById('collectionTitle').innerHTML = '';
		if(collection == "Grave"){
			document.getElementById('collectionTitle').innerHTML = 'Afternoon in the Graveyard';
		}
		if(collection == "Light"){
			document.getElementById('collectionTitle').innerHTML = 'Light Experimentation';
		}
		if(collection == "Motio"){
			document.getElementById('collectionTitle').innerHTML = 'Motion Tests';
		}
		if(collection == "Beach"){
			document.getElementById('collectionTitle').innerHTML = 'Light and Texture at the Beach';
		}


		var viewRL = $(this).css('background-image').split('pictures')[0] + 'pictures/fullrez' + $(this).css('background-image').split('pictures')[1];//lol you see what I did there
		$('#photo').css('background-image', viewRL);

	});
}