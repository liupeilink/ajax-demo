var oUl = document.getElementById('ul1');
var aLi = document.getElementsByTagName('li');
var cPage = 1;
var flag = true;


getList();

window.onscroll = function(){
	var _shortLiIndex = getShortLi();
	var oLiShort = aLi[_shortLiIndex];
	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	if( getTop(oLiShort) + oLiShort.offsetHeight < document.documentElement.clientHeight + scrollTop){
		if(flag == true){
			flag = false;
			getList();
			
			//console.log(flag);
		}

	}
	
	
};

function getShortLi(){
	var index = 0;
	for(var i=1; i<aLi.length; i++){
		if(aLi[i].offsetHeight < aLi[index].offsetHeight){
			index = i;
		}
	}
	return index;
}

function getTop(element){
	var cur = 0;
	while(element != null){
		cur += element.offsetTop;
		element = element.offsetParent;
	}
	return cur;
}

function getList(){
	ajax('get', 'getPics.php' ,'cpage='+cPage, function(data){
		if(data.length == 0){
			return;
		}
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
		//由于是异步，不能再其他地方将flag设置为true，只有当图片加载完了才能重新接受新的图片
		flag = true;
	
	});
	cPage++;

}