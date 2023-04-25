$(function(){
	let vh = window.innerHeight * 0.01
	document.documentElement.style.setProperty('--vh', vh + 'px')
	$(window).resize(function(){
		let vh = window.innerHeight * 0.01
		document.documentElement.style.setProperty('--vh', vh + 'px')
	});
	
	$(document).on("click", ".inp_field .btn_del", function (e) {
		$(this).parents('div').find('input').val('');//2030425 수정
		$(this).hide();
		$(this).parents('div').removeClass('alert');//2030425 수정
		$('.txt_alert').hide();
	});

	$(document).on("click", ".sel_box > a", function (e) {
		$(this).parent('.sel_box').siblings('.sel_box').removeClass('on');
		$(this).parent('.sel_box').toggleClass('on');
	});

	$(document).on("click", ".pop_data .menu a.all", function (e){
		$('.menu .list_depth2').slideDown();
	});

	$(document).on("click", ".pop_data .menu .list_depth1 > li > a", function (e) {
		$(this).next('.list_depth2').slideToggle();
	});
	

	//파일선택(이미지)
	$(".file_box").not('.audio').find("input[type='file']").on('change',function(){ //20230425 audio 아니면 선택으로 수정
		console.log('this', $(this));
		var fileName = $(this).val();
		var file = $(this).prop("files")[0];
		console.log('file',file);
		var blobURL = window.URL.createObjectURL(file);

		if(fileName != ""){
			var ext = fileName.split('.').pop().toLowerCase();
			if($.inArray(ext, ['jpg','jpeg','gif','png', 'svg']) == -1) {
				alert('이미지 파일만 업로드 할 수 있습니다.');
				return;
			}else{
				if($(this).next('.btn_preview').length < 1){
					$(this).after('<a href="'+blobURL+'" class="btn_preview" target="_blank" onfocus="blur();">파일 미리보기</a>');
					$('.btn_preview').after('<div class="preview"><img src = "'+blobURL+'"></div>');
				}else{
					$(this).next('.btn_preview').attr('href', blobURL);
					$('.btn_preview').after('<div class="preview"><img src = "'+blobURL+'"></div>');
				}
			}
		}
	});

	//파일선택(음원) 20230425
	$(".file_box.audio input[type='file']").on('change',function(){
		//console.log('this', $(this));
		var fileName = $(this).val();
		var file = $(this).prop("files")[0];
		var blobURL = window.URL.createObjectURL(file);
		var thisId = $(this).attr('id');

		if(fileName != ""){
			var ext = fileName.split('.').pop().toLowerCase();
			if($.inArray(ext, ['mp3']) == -1) {
				alert('음원(mp4) 만 첨부 가능합니다');
				return;
			}else{
				/*if($(this).next('.btn_audio').length < 1){
					$(this).after('<a href="'+blobURL+'" class="btn_audio" target="_blank" onfocus="blur();">음원 듣기</a>');
				}else{
					$(this).next('.btn_audio').attr('href', blobURL);
				}*/

				$(this).after('<audio id="q_'+thisId+'" src="'+blobURL+'" style="display:none"></audio>');
				$(this).after('<a href="javascript:qAudioPlay('+blobURL+')" class="btn_audio">음원 듣기</a>');
			}
		}
	});
/*
	$(".btn_audio").click(function(){
		//var audio2 = new Audio("sound2.mp3");
		console.log('1');
		$(this).siblings('audio').play();
	});*/

});

function qAudioPlay(blobURL){
	/*let audioFile = new Audio(blobURL);
	//$('#q_'+id).play();
	cnosole.log(audioFile);
	audioFile.play();*/
}

//팝업 열기
function openPop(id) {
	$('body').css('overflow','hidden');
	$('.dim').show();
	$('.pop_wrap').hide();
	$('#'+ id).show();
}
//팝업 닫기
function closePop(id) {
	$('body').css('overflow','visible');
	$('.dim').hide();
	$('#'+ id).hide();
}

//운영섭카피
function GetTodayDate(format)
{
	if (format == "yyyyMMdd")
	{
		var today = new Date();
		var year = today.getFullYear();
		var month = ('0' + (today.getMonth() + 1)).slice(-2);
		var day = ('0' + today.getDate()).slice(-2);
		var todayStr = year + month + day;
		return todayStr;
	}
	else
	{
		var today = new Date();
		var year = today.getFullYear();
		var month = ('0' + (today.getMonth() + 1)).slice(-2);
		var day = ('0' + today.getDate()).slice(-2);
		var todayStr = year + '-' + month + '-' + day;
		return todayStr;
	}
}
function AddDays(date, addDays)
{
	var date = new Date(date);
	date.setDate(date.getDate() + addDays);
	var year = date.getFullYear();
	var month = ('0' + (date.getMonth() + 1)).slice(-2);
	var day = ('0' + date.getDate()).slice(-2);
	var dateStr = year + '-' + month + '-' + day;
	return dateStr;
}