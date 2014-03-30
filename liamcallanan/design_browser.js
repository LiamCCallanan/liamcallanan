
window.onload = load;

var names = [];
function load() {

	var thumbnails = [
	'Graphdes_Gallery_Banner.png',
	'lfm.jpg',
	'4297928_orig.jpg',
	'Graphdes_Propaganda2.png',
	'897319_orig.png',
	'g_penpal.png',
	'SteveJobsTypePortrait.png',
	'Website_logotimeline.png']
	
	var names = [
	'Design Gallery Banner',
	'"Evolve" Photo Montage',
	'Self Portrait',
	'TRON Propaganda Poster',
	'Senior Project T-shirt Design',
	'"Pen Pal" (Fake) Company Logo',
	'Steve Jobs Type Portrait',
	'Logo Timeline']

	var browserLength = 0;
	
	for(var x= 0; x<thumbnails.length; x++){
		var icon = $(document.createElement('div'));
		icon.addClass('thumbnail');
		var url = 'url(./design/' + thumbnails[x] + ')';
		icon.css('background-image', url);
		$('#browserContent').append(icon);
	}

	browserLength = "" + (200*x);
	$('#browserContent').css('width', browserLength);

	$(".thumbnail").on("click" , function(e){
	var name = $(this).css('background-image').split('design')[1];
	var name = name.substring(1,name.length-1);
	var index = 0;
	var j = 0;
	
		for(j = 0; j<names.length; j++){
			if(thumbnails[j] == name){
				index = j;
				break;
			}
		}
		//console.log(j);
		document.getElementById('collectionTitle').innerHTML = '';
		document.getElementById('collectionTitle').innerHTML = names[index];
		


		var viewRL = $(this).css('background-image').split('design')[0] + 'design/fullrez' + $(this).css('background-image').split('design')[1];//lol you see what I did there
		$('#photo').css('background-image', viewRL);

	});
}