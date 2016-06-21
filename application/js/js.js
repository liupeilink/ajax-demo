var oUl = document.getElementById('ul1');
var aLi = document.getElementsByTagName('li');


ajax('get', 'getPics.php' ,'cpage=2', function(data){
	
	data = JSON.parse(data);
	for(var i=0; i<data.length; i++){
		var _shortLiIndex = getShortLi();
		
		//aLi[_shortLiIndex].innerHTML += '<figure><img src='+data[i].image+'><figcaption><h2>'+data[i].title+'</h2></figcaption></figure>'
		var oFigure = document.createElement('figure');
		var oImg = document.createElement('img');
		oImg.src = data[i].image;
		oImg.style.width = 220 + 'px';
		oImg.style.height = data[i].height * 220 / data[i].width + 'px';
		oFigure.appendChild(oImg);

		var oFC = document.createElement('figcaption');
		var oH2 = document.createElement('h2');
		oH2.innerHTML = data[i].title;
		oFC.appendChild(oH2);
		oFigure.appendChild(oFC);
		aLi[_shortLiIndex].appendChild(oFigure);
		
		oFigure = null;
		oImg = null;
		oFC = null;
		oH2 = null;
	}
	
});

function getShortLi(){
	var index = 0;
	for(var i=1; i<aLi.length; i++){
		if(aLi[i].offsetHeight < aLi[index].offsetHeight){
			index = i;
		}
	}
	return index;
}