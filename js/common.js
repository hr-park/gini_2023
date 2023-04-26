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

	//start :: 파일선택(음원) 20230425
	const audioCnt = $(".file_box.audio input[type='file']").length;
	if(audioCnt > 0){
		setPlayer();
		function setPlayer() {
			const wrap = document.getElementsByClassName("wrap")[0];
			for (let i = 0; i < audioCnt; i++) {
				wrap.innerHTML = wrap.innerHTML +
				`
					<audio id="audio_${i+1}" src=""></audio>
				`;
			}
		}
	}

	$(".file_box.audio input[type='file']").on('change',function(){
		var fileName = $(this).val();
		var file = $(this).prop("files")[0];
		var blobURL = window.URL.createObjectURL(file);
		var thisIdx = $(this).attr('data-idx');

		if(fileName != ""){
			var ext = fileName.split('.').pop().toLowerCase();
			if($.inArray(ext, ['mp3']) == -1) {
				alert('음원(mp4) 만 첨부 가능합니다');
				return;
			}else{
				$('#audio_'+thisIdx).attr('src', blobURL);
				if($(this).next('.btn_audio').length < 1){
					$(this).after('<a href="javascript:mp3Play('+thisIdx+');" class="btn_audio">음원 듣기</a>');
				}
			}
		}
	});
	//end :: 파일선택(음원) 20230425
});

//음원 미리듣기 20230426
function mp3Play(idx){
	$('audio').each( function() {
		$(this)[0].pause();
	});
	var myAudio = document.getElementById('audio_'+idx);
	myAudio.play();
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