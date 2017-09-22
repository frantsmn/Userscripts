// ==UserScript==
// @name         Daroo - Content-blocks
// @namespace    Content-blocks
// @version      1.5
// @include      *daroo*.*/manager/*
// @description  Удобные формы для добавления основных контент-блоков
// @updateURL    https://openuserjs.org/install/frantsmn/Daroo_-_Content-blocks.meta.js
// @author       Frants Mitskun
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// ==/UserScript==

//GM_deleteValue("settings");

//Координаты панелек на странице
var settings = GM_getValue("settings") ? GM_getValue("settings") :
{
	offset: {
		svPanel : {top: 200, left: 350},
		pvPanel : {top: 200, left: 350},
		sePanel : {top: 200, left: 350},
		hPanel  : {top: 200, left: 350},
		dkPanel : {top: 200, left: 350}
	}
};

//ФУНКЦИЯ ОТОБРАЖАЕТ ПОЛЕ ДЛЯ ВСТАВКИ КОДА ЕСЛИ ОНО ЗАКРЫТО
function show_textarea(){
	if($("#product_block_translations_ru_contents").css('display') == 'none')
		$("a.re-icon.re-html").click();
	if($("#product_price_block_translations_ru_contents").css('display') == 'none')
		$("a.re-icon.re-html").click();
}

//ФУНКЦИЯ ПРОВЕРЯЕТ ЯЗЫК АКТИВНОЙ ВКЛАДКИ
function tab_lang(str){
	var lang;
	$("ul.a2lix_translationsLocales").find("a.language-change-button").each(function(){
		if ($(this).parent().hasClass("active"))
		{
			lang = $(this).data('locale');
		}
	});
	return str===lang;
}

//ФУНКЦИЯ ОТКРЫВАЕТ НЕОБХОДИМЫЙ КОНТЕНТ-БЛОК ВЫБИРАЕМЫЙ ИЗ ВЫПАДАЙКИ
function select_block(by, ru, ua){
	if(location.host === "daroo.by")
	{
		$("select#product_block_content").val(by).change();
		$("select#price_block_content").val(by).change();
		$("select#supplier_block_content").val(by).change();
	}
	else
		if(location.host === "daroo.ru")
		{
			$("select#product_block_content").val(ru).change();
			$("select#price_block_content").val(ru).change();
			$("select#supplier_block_content").val(ru).change();
		}
	else
		if(location.host === "daroo.ua")
		{
			$("select#product_block_content").val(ua).change();
			$("select#price_block_content").val(ua).change();
			$("select#supplier_block_content").val(ua).change();
		}
}

//СТИЛИ
$("body").append("<style>@keyframes fade-in { 0% {opacity: 0;} 100% {opacity: 0.93;} } .content-block-panel { animation: fade-in .3s ease; } .content-block-panel { height: auto; max-height: 500px; max-width: 900px; overflow: auto; background: white; position: fixed; border: solid 1px lightgray; box-shadow: 0px 0px 17px -1px rgba(0, 0, 0, 0.5); border-radius: 5px; padding: 10px; z-index: 9999 !important; opacity: 0.93; } .hideSave { float: right; } .closePanel, .clearPanel { float: left; margin-right: 4px; } #content-block-menu .dropdown-toggle:hover { color: red !important; } .content-block-panel .form-control { margin-bottom: 4px; } .content-block-panel textarea { padding: 10px; } </style>");

//МЕНЮ
$("ul.top-nav").prepend("<li id=\"content-block-menu\" class=\"dropdown-toggle\"" +
						"data-toggle=\"dropdown\" role=\"button\">"+
						"<a class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-expanded=\"false\" style=\"color:#999; font-size:14px; font-family:Helvetica,Arial,sans-serif\">" +
						"Контент-блоки <span class=\"caret\"></span></a>"+
						"<ul class=\"dropdown-menu\" style=\"cursor: pointer !important;\" role=\"menu\">" +
						" <li id=\"dk-sh\"><a>Две колонки</a></li>"+
						" <li id=\"h-sh\"><a>Характеристики (шахматный)</a></li>"+
						" <li id=\"se-sh\"><a>Структура/Этапы (последовательный)</a></li>"+
						" <li id=\"pv-sh\"><a>Преимущества (буллиты)</a></li>"+
						" <li id=\"sv-sh\"><a>Сервисные возможности</a></li>"+
						"</ul></li>");

//▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
//ДВЕ КОЛОНКИ

$("body").prepend("<div id='dkPanel' class='content-block-panel'><table><tr><td colspan='2' align='center'><input type='text' id='dkTitle' class='form-control' placeholder='Заголовок' style='width:180px; text-align:center;'></td></tr><tr><td><input type='text' id='dkSubtitle1' class='form-control' placeholder='Подзаголовок' style='width:180px;'><textarea id='dkText1' class='form-control' cols='20' rows='5' placeholder='Текст'></textarea></td><td><input type='text' id='dkSubtitle2' class='form-control' placeholder='Подзаголовок' style='width:180px;'><textarea id='dkText2' class='form-control' cols='20' rows='5' placeholder='Текст'></textarea></td></tr><tr><td colspan='2'><button class='closePanel btn btn-default'>Закрыть</button><button class='clearPanel btn btn-default'>Очистить</button><button class='hideSave btn btn-primary'>Сохранить и закрыть</button></td></tr></table></div>");
$( "#dkPanel" ).draggable();

$("#dk-sh").click(function() {
	$(".content-block-panel").hide();
	$("#dkPanel").show();
	show_textarea();
	select_block('5000246', '4000022', '268');
});

//Собираем разметку
$('#dkPanel').keyup(function( event ){
	var strings = [
		"<div class=\"detail-school-desc\"><h2>" + $( "input[id='dkTitle']" ).val() + "</h2><ul>",
		"<li><h3>" + $( "input[id='dkSubtitle1']" ).val() + "</h3>" + $( "textarea[id='dkText1']" ).val() + "</li>",
		"<li><h3>" + $( "input[id='dkSubtitle2']" ).val() + "</h3>" + $( "textarea[id='dkText2']" ).val() + "</li>",
		"</ul></div>"
	];
	var dkText = strings[0] + strings[1] + strings[2] + strings[3];

	if (tab_lang("ru")){
		$("textarea#product_block_translations_ru_contents").val(dkText);
		$("textarea#product_price_block_translations_ru_contents").val(dkText);
	}
	if (tab_lang("ua")){
		$("textarea#product_block_translations_ua_contents").val(dkText);
		$("textarea#product_price_block_translations_ua_contents").val(dkText);
	}
});

//▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
//ХАРАКТЕРИСТИКИ (шахматный)

$( "body" ).prepend("<div id='hPanel' class='content-block-panel ui-draggable ui-draggable-handle'><table id='hTable' style='width:340px;'><tr><td><input type='text' class='form-control' id='hTitle' placeholder='Заголовок' style='width:200px;'></td></tr><tr class='h_right h_tr'><td align='right'><input type='text' class='form-control' style='width:200px;' id='hSubtitle' placeholder='Подзаголовок'><textarea id='hDescText' class='form-control' style='width:200px;' rows='5' placeholder='Текст'></textarea></td></tr></table><div style='position:sticky; bottom: 0px;'><button class='closePanel btn btn-default'>Закрыть</button><button class='clearPanel btn btn-default'>Очистить</button><button class='hideSave btn btn-primary'>Сохранить и закрыть</button></div></div>");
$( "#hPanel" ).draggable();
var h_right_block = "<tr class='h_right h_tr added-h-block'><td align='right'><input type='text' class='form-control' style='width:200px;' id='hSubtitle' placeholder='Подзаголовок'><textarea id='hDescText' class='form-control' style='width:200px;' rows='5' placeholder='Текст'></textarea></td></tr>";
var h_left_block = "<tr class='h_left h_tr added-h-block'><td align='left'><input type='text' class='form-control' style='width:200px;' id='hSubtitle' placeholder='Подзаголовок'><textarea id='hDescText' class='form-control' style='width:200px;' rows='5' placeholder='Текст'></textarea></td></tr>";

$("#h-sh").click(function() {
	$(".content-block-panel").hide();
	$("#hPanel").show();
	show_textarea();
	select_block('5000250', '4000026', '276');
});

//Собираем разметку
$("#hPanel").keyup(function( event ){

	var hText = "<div class=\"full-desc\">"; 		    //Стартовая строка
	if($(this).find("#hTitle").val() !== "")  			//Если есть заголовок, то херачим его в кучу
	{
		hText += "<div class=\"desc\"><h2>" + $( "input[id='hTitle']" ).val() + "</h2></div><ul class=\"detail-list\">";
	}
	else
	{													//Если загловка нет
		hText += "<ul class=\"detail-list\">";
	}

	$("tr.h_tr").each(function( index ){ 					//Перебираем все поля (блоки), проверям их и добавляем соответствующую разметку
		var hSubtitle = $(this).find("#hSubtitle").val(); 						//Заголовок блока
		var hDescText = $(this).find("textarea#hDescText").val();				//Текст блока

		if($(this).hasClass("h_left") && hSubtitle !== "" && hDescText !== "")
		{
			hText += "<li><div class=\"article\"><div><h3>" + hSubtitle + "</h3>" + hDescText + "</div></div><figure><img src=\"http://images.daroo.gift/daroo.by/gallery/editor/2016/08/24/57bd618120fc9.jpg\"></figure></li>";
		}
		if($(this).hasClass("h_left") && hSubtitle === "" && hDescText !== "")
		{
			hText += "<li><div class=\"article\"><div>" + hDescText + "</div></div><figure><img src=\"http://images.daroo.gift/daroo.by/gallery/editor/2016/08/24/57bd618120fc9.jpg\"></figure></li>";
		}

		if($(this).hasClass("h_right") && hSubtitle !== "" && hDescText !== "")
		{
			hText += "<li><figure><img src=\"http://images.daroo.gift/daroo.by/gallery/editor/2016/08/24/57bd615ccb044.jpg\"></figure><div class=\"article\"><div><h3>" + hSubtitle + "</h3>" + hDescText + "</div></div></li>";
		}
		if($(this).hasClass("h_right") && hSubtitle === "" && hDescText !== "")
		{
			hText += "<li><figure><img src=\"http://images.daroo.gift/daroo.by/gallery/editor/2016/08/24/57bd615ccb044.jpg\"></figure><div class=\"article\"><div>" + hDescText + "</div></div></li>";
		}
	});

	hText += "</ul></div>"; //Финальная строка

	if (tab_lang("ru")){
		$("textarea#product_block_translations_ru_contents").val(hText);
		$("textarea#product_price_block_translations_ru_contents").val(hText);
	}
	else
		if (tab_lang("ua")){
			$("textarea#product_block_translations_ua_contents").val(hText);
			$("textarea#product_price_block_translations_ua_contents").val(hText);
		}

	addBlock(); //Добавялем на всякий еще один текстовый блок
});

//Добавляет еще один текстовый блок, если последний был заполнен
function addBlock(){
	if($( "textarea[id='hDescText']" ).last().val() !== "")
	{
		if ($("tr.h_tr").last().hasClass("h_left") === true)
		{
			$("#hTable").append(h_right_block).focus();
			$("#hPanel").scrollTop($("#hTable").height());
		}
		else
			if ($(".h_tr").last().hasClass("h_right") === true)
			{
				$("#hTable").append(h_left_block);
				$("#hPanel").scrollTop($("#hTable").height());
			}
	}
}

//▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
//СТРУКТУРА/ЭТАПЫ (последовательный)

$( "body" ).prepend("<div id='sePanel' class='content-block-panel'><table id='seTable' style='width:340px;'><tr><td><input type='text' id='seTitle' class='form-control' placeholder='Заголовок' style='width:200px;'></td></tr><tr class='se_tr'><td align='right'><input type='text' id='seSubtitle' class='form-control' style='width:200px;' placeholder='Подзаголовок'><textarea id='seDescText' class='form-control' style='width:200px;' rows='5' placeholder='Текст'></textarea></td></tr></table><div style='position:sticky; bottom: 0px;'><button class='closePanel btn btn-default'>Закрыть</button><button class='clearPanel btn btn-default'>Очистить</button><button class='hideSave btn btn-primary'>Сохранить и закрыть</button></div></div>");
$( "#sePanel" ).draggable();

var se_block = "<tr class='se_tr added-se-block'><td align='right'><input type='text' id='seSubtitle' class='form-control' style='width:200px;' placeholder='Подзаголовок'><textarea id='seDescText' class='form-control' style='width:200px;' rows='5' placeholder='Текст'></textarea></td></tr>";

$("#se-sh").click(function() {
	$(".content-block-panel").hide();
	$("#sePanel").show();
	show_textarea();
	select_block('5000252', '4000031', '274');
});

//Собираем разметку
$("#sePanel").keyup(function( event ){

	var seText = '<div class="full-desc full-left">'; 				//Стартовая строка
	if($(this).find("#seTitle").val() !== "")  			//Если есть заголовок
	{
		seText += '<div class="desc"><h2>' + $( "input[id='seTitle']" ).val() + '</h2></div><ul class="detail-list">';
	}
	else
	{
		seText += '<ul class="detail-list">';
	}

	$("tr.se_tr").each(function( index ){ 						//Перебираем все поля (блоки), проверям их
		var seSubtitle = $(this).find("#seSubtitle").val(); 					//Заголовок блока
		var seDescText = $(this).find("textarea#seDescText").val();				//Текст блока

		if(seSubtitle !== "" && seDescText !== "")
		{
			seText += "<li><figure><img src=\"http://images.daroo.gift/daroo.by/gallery/editor/2016/08/24/57bd615ccb044.jpg\"></figure><div class=\"article\"><div><h3>" + seSubtitle + "</h3>" + seDescText + "</div></div></li>";
		}
		if(seSubtitle === "" && seDescText !== "")
		{
			seText += "<li><figure><img src=\"http://images.daroo.gift/daroo.by/gallery/editor/2016/08/24/57bd615ccb044.jpg\"></figure><div class=\"article\"><div>" + seDescText + "</div></div></li>";
		}
	});

	seText += '</ul></div>'; //Финальная строка

	if (tab_lang("ru")){
		$("textarea#product_block_translations_ru_contents").val(seText);
		$("textarea#product_price_block_translations_ru_contents").val(seText);
	}else
		if (tab_lang("ua")){
			$("textarea#product_block_translations_ua_contents").val(seText);
			$("textarea#product_price_block_translations_ua_contents").val(seText);
		}

	addBlockSe(); //Добавялем на всякий еще один текстовый блок
});

//Добавляет еще один, если последний был заполнен
function addBlockSe(){
	if($("textarea[id='seDescText']").last().val() !== "")
	{
		$("#seTable").append(se_block);
		$("#sePanel").scrollTop($("#seTable").height());
	}
}

//▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
//ПРЕИМУЩЕСТВА/ВОЗМОЖНОСТИ (буллиты)

$("body").prepend("<div id='pvPanel' class='content-block-panel'><table><tr><td colspan='4' align='center'><input type='text' id='pvTitle' class='form-control' placeholder='Заголовок' style='width:240px; text-align:center;'></td></tr><tr><td><input type='text' id='pvSubtitle1' class='form-control' placeholder='Подзаголовок'><textarea id='pvText1' class='form-control' rows='4' placeholder='Описание'></textarea></td><td><input type='text' id='pvSubtitle2' class='form-control' placeholder='Подзаголовок'><textarea id='pvText2' class='form-control' rows='4' placeholder='Описание'></textarea></td><td><input type='text' id='pvSubtitle3' class='form-control' placeholder='Подзаголовок'><textarea id='pvText3' class='form-control' rows='4' placeholder='Описание'></textarea></td><td><input type='text' id='pvSubtitle4' class='form-control' placeholder='Подзаголовок'><textarea id='pvText4' class='form-control' rows='4' placeholder='Описание'></textarea></td></tr></table><button class='closePanel btn btn-default'>Закрыть</button><button class='clearPanel btn btn-default'>Очистить</button><button class='hideSave btn btn-primary'>Сохранить и закрыть</button></div>");
$( "#pvPanel" ).draggable();

//Отображаем и прячем форму
$("#pv-sh").click(function() {
	$(".content-block-panel").hide();
	$("#pvPanel").show();
	show_textarea();
	select_block('5000248', '4000024', '270');
});

//Собираем разметку
$('#pvPanel').keyup(function( event ){

	var strings = [
		'<div class="detail-desc-features clear"><h2>'+$("input[id='pvTitle']").val()+'</h2><ul>',
		'<li><figure><img src="http://images.daroo.gift/daroo.by/gallery/editor/2016/02/03/56b1e66d2ece6.jpg"><br></figure><h3>'+$("input[id='pvSubtitle1']").val()+'<br></h3>'+$("textarea[id='pvText1']").val()+'</li>',
		'<li><figure><img src="http://images.daroo.gift/daroo.by/gallery/editor/2016/02/03/56b1e66d2ece6.jpg"><br></figure><h3>'+$("input[id='pvSubtitle2']").val()+'<br></h3>'+$("textarea[id='pvText2']").val()+'</li>',
		'<li><figure><img src="http://images.daroo.gift/daroo.by/gallery/editor/2016/02/03/56b1e66d2ece6.jpg"><br></figure><h3>'+$("input[id='pvSubtitle3']").val()+'<br></h3>'+$("textarea[id='pvText3']").val()+'</li>',
		'<li><figure><img src="http://images.daroo.gift/daroo.by/gallery/editor/2016/02/03/56b1e66d2ece6.jpg"><br></figure><h3>'+$("input[id='pvSubtitle4']").val()+'<br></h3>'+$("textarea[id='pvText4']").val()+'</li>',
		'</ul></div>'
	];

	var pvText = strings[0] + strings[1] + strings[2] + strings[3];

	if ($( "input[id='pvSubtitle4']" ).val() !== "" || $( "textarea[id='pvText4']" ).val() !== "") //Если в 4 колонке есть что-нибудь, то
	{
		pvText += strings[4]; //Добавляем строку с содержимым 4 колонки
	}
	pvText += strings[5]; //Добавляем финальную строку

	if (tab_lang("ru")){
		$("textarea#product_block_translations_ru_contents").val(pvText);
		$("textarea#product_price_block_translations_ru_contents").val(pvText);
	}
	else
		if (tab_lang("ua")){
			$("textarea#product_block_translations_ua_contents").val(pvText);
			$("textarea#product_price_block_translations_ua_contents").val(pvText);
		}
});

//▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
//СЕРВИСНЫЕ ВОЗМОЖНОСТИ

//$("body").prepend("<div id='svPanel' class='content-block-panel'><input class='form-control' type='text' tabindex='1' id='check1' placeholder='Что взять с собой?'><input class='form-control' type='text' tabindex='2' id='check2' placeholder='C кем пойти?'><input class='form-control' type='text' tabindex='3' id='check3' placeholder='Сезон'><input class='form-control' type='text' tabindex='4' id='check4' placeholder='Сколько дарить'><input class='form-control' type='text' tabindex='5' id='check5' placeholder='Расписание и время'><input class='form-control' type='text' tabindex='6' id='check6' placeholder='Безопасность'><input class='form-control' type='text' tabindex='7' id='check7' placeholder='Программа'><input class='form-control' type='text' tabindex='8' id='check8' placeholder='Дополнительные возможности'><input class='form-control' type='text' tabindex='9' id='check9' placeholder='Возраст'><button class='closePanel btn btn-default'>Закрыть</button><button class='clearPanel btn btn-default'>Очистить</button><button class='hideSave btn btn-primary'>Сохранить и закрыть</button></div>");
$("body").prepend("<div id='svPanel' class='content-block-panel' style='max-height:505px !important;'><textarea type='text' class='form-control' id='table-check' placeholder='Вставить контент-блок таблицей'></textarea><hr><input class='form-control' type='text' tabindex='1' id='check1' placeholder='Что взять с собой?'><input class='form-control' type='text' tabindex='2' id='check2' placeholder='C кем пойти?'><input class='form-control' type='text' tabindex='3' id='check3' placeholder='Сезон'><input class='form-control' type='text' tabindex='4' id='check4' placeholder='Сколько дарить'><input class='form-control' type='text' tabindex='5' id='check5' placeholder='Расписание и время'><input class='form-control' type='text' tabindex='6' id='check6' placeholder='Безопасность'><input class='form-control' type='text' tabindex='7' id='check7' placeholder='Программа'><input class='form-control' type='text' tabindex='8' id='check8' placeholder='Дополнительные возможности'><input class='form-control' type='text' tabindex='9' id='check9' placeholder='Возраст'><button class='closePanel btn btn-default'>Закрыть</button><button class='clearPanel btn btn-default'>Очистить</button><button class='hideSave btn btn-primary'>Сохранить и закрыть</button></div>");
$( "#svPanel" ).draggable();

var ruLabels = [
	"",
	"Что взять с собой?",
	"С кем пойти?",
	"Сезон",
	"Сколько дарить",
	"Расписание и время",
	"Безопасность",
	"Программа",
	"Дополнительные возможности",
	"Возраст"
];

var uaLabels = [
	"",
	"Що взяти з собою?",
	"З ким піти?",
	"Коли активувати сертифікат?",
	"Скільки дарувати",
	"Розклад і час",
	"Безпека",
	"Програма",
	"Додаткові можливості",
	"Вік"
];

var langLabels = ruLabels; //По умолчанию русский

//Отображаем и прячем форму
$("#sv-sh").click(function() {
	$(".content-block-panel").hide();
	$("#svPanel").show();
	show_textarea();
	select_block('5000253', '4000029', '275');
});

//Переводим placeholder'ы формы на соотв. язык
$("html").click(function(){
	if (tab_lang("ua"))
	{
		$("#svPanel input").each(function(){
			$(this).attr("placeholder", uaLabels[(($(this).attr('tabindex'))*1)]);
		});
	}
	else
		if (tab_lang("ru"))
		{
			$("#svPanel input").each(function(){
				$(this).attr("placeholder", ruLabels[(($(this).attr('tabindex'))*1)]);
			});
		}
});

//Собираем разметку
$("input").keyup(function(){makeSvBlock();});

function makeSvBlock(){

	if (tab_lang("ua"))
	{
		langLabels = uaLabels;
	}
	else
		if (tab_lang("ru"))
		{
			langLabels = ruLabels;
		}

	var strings=[
		'<br><div class="detail-faq-block infoscroll-content"><div class="row">',
		'<div class="col"><dl><dt><figure><img src="/img/design/desktop/faq-img-01.png"></figure></dt><dd><div class="desc"><h3>'+langLabels[1]+'</h3><p>'+$("input[tabindex='1']").val()+'</p></div></dd></dl></div>',
		'<div class="col"><dl><dt><figure><img src="/img/design/desktop/faq-img-06.png"></figure></dt><dd><div class="desc"><h3>'+langLabels[2]+'</h3><p>'+$("input[tabindex='2']").val()+'</p></div></dd></dl></div>',
		'<div class="col"><dl><dt><figure><img src="/img/design/desktop/faq-img-02.png"></figure></dt><dd><div class="desc"><h3>'+langLabels[3]+'</h3><p>'+$("input[tabindex='3']").val()+'</p></div></dd></dl></div>',
		'<div class="col"><dl><dt><figure><img src="/img/design/desktop/faq-img-07.png"></figure></dt><dd><div class="desc"><h3>'+langLabels[4]+'</h3><p>'+$("input[tabindex='4']").val()+'</p></div></dd></dl></div>',
		'<div class="col"><dl><dt><figure><img src="/img/design/desktop/faq-img-03.png"></figure></dt><dd><div class="desc"><h3>'+langLabels[5]+'</h3><p>'+$("input[tabindex='5']").val()+'</p></div></dd></dl></div>',
		'<div class="col"><dl><dt><figure><img src="/img/design/desktop/faq-img-08.png"></figure></dt><dd><div class="desc"><h3>'+langLabels[6]+'</h3><p>'+$("input[tabindex='6']").val()+'</p></div></dd></dl></div>',
		'<div class="col"><dl><dt><figure><img src="/img/design/desktop/faq-img-04.png"></figure></dt><dd><div class="desc"><h3>'+langLabels[7]+'</h3><p>'+$("input[tabindex='7']").val()+'</p></div></dd></dl></div>',
		'<div class="col"><dl><dt><figure><img src="/img/design/desktop/faq-img-09.png"></figure></dt><dd><div class="desc"><h3>'+langLabels[8]+'</h3><p>'+$("input[tabindex='8']").val()+'</p></div></dd></dl></div>',
		'<div class="col"><dl><dt><figure><img src="/img/design/desktop/faq-img-05.png"></figure></dt><dd><div class="desc"><h3>'+langLabels[9]+'</h3><p>'+$("input[tabindex='9']").val()+'</p></div></dd></dl></div>',
		'</div></div>',
		'</div><div class="row">'
	];

	var counter = 0; //Счетчик пары
	var svText = "";

	svText = svText + strings[0]; //Добавляем стартовую строку
	for (i = 0; i <= 9; i++) {
		$("input").each(function(){
			if ((($(this).attr('tabindex'))*1) === i && $(this).val() !== "") //Ищем наше поле и если оно не пустое то,
			{
				//alert(($(this).attr('tabindex'))*1 + " Номер поля");
				svText = svText + strings[i]; //Добавляем строку с содержимым этого поля
				//alert(strings[i] + " Строка i");
				counter++; //Счетчик для определения пары столбцов
				if (counter === 2) //Если столбец второй то,
				{
					svText = svText + strings[11]; //Добавим теги перехода на следующюю строку
					counter = 0; //И обнулим счетчик
				}
			}
		});
	}
	svText = svText + strings[10]; //Добавляем финальную строку

	if (tab_lang("ru")){
		$("textarea#product_block_translations_ru_contents").val(svText);
		$("textarea#product_price_block_translations_ru_contents").val(svText);
	}
	else
		if (tab_lang("ua")){
			$("textarea#product_block_translations_ua_contents").val(svText);
			$("textarea#product_price_block_translations_ua_contents").val(svText);
		}
}

//Разбираем текст вставленный таблицей на строки
$("#table-check").keyup(function(){
	var arr = $('#table-check').val().split('\n');
	console.log(arr);
	var strings = {
		label : [],
		text : []
	};
	var i = 0;
	arr.forEach(function(){
		if(arr[i].length > 10)
		{
			var ss = arr[i].split('\t');
			strings.label[i] = ss[0];
			strings.text[i] = ss[1];
		}
		i++;
	});

	for(var j=0;j<=strings.label.length;j++)
	{
		switch (strings.label[j]) {
			case "Что взять с собой?":
				$("#check1").val(strings.text[j]);
				break;
			case "С кем пойти?":
				$("#check2").val(strings.text[j]);
				break;
			case "Сезон":
				$("#check3").val(strings.text[j]);
				break;
			case "Сколько дарить":
				$("#check4").val(strings.text[j]);
				break;
			case "Расписание и время":
				$("#check5").val(strings.text[j]);
				break;
			case "Безопасность":
				$("#check6").val(strings.text[j]);
				break;
			case "Программа":
				$("#check7").val(strings.text[j]);
				break;
			case "Дополнительные возможности":
				$("#check8").val(strings.text[j]);
				break;
			case "Возраст":
				$("#check9").val(strings.text[j]);
				break;
		}
	}
	makeSvBlock();
});

//▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
//После того как все панели были добавлены в DOM

//Скрываем все добавленные к body панели
$(".content-block-panel").hide();

//Ратаскиваем их по сохраненным позициям на странице
$("#dkPanel").offset(settings.offset.dkPanel);
$("#hPanel").offset(settings.offset.hPanel);
$("#sePanel").offset(settings.offset.sePanel);
$("#pvPanel").offset(settings.offset.pvPanel);
$("#svPanel").offset(settings.offset.svPanel);

//По кнопке закрываем панель
$("button.closePanel").click(function(){
	$(".content-block-panel").hide();
});

//По кнопке очищаем панель
$("button.clearPanel").click(function(){
	$("tr.added-se-block").remove();
	$("tr.added-h-block").remove();
	$(".content-block-panel input").val("");
	$(".content-block-panel textarea").val("");
});

//По кнопке закрываем панель и сохраняем контент
$("button.hideSave").click(function() {
	$(".content-block-panel").hide();
	$('.btn-primary:first-child').first().click();
});

//После drag'n'drop сохраняем координаты панели в базу
var isDragging = false;
$(".content-block-panel")
	.mousedown(function() {
	isDragging = false;
})
	.mousemove(function() {
	isDragging = true;
})
	.mouseup(function(){
	var wasDragging = isDragging;
	isDragging = false;
	if (wasDragging){
		settings.offset[$(this).attr('id').toString()] = $(this).offset();
		GM_setValue("settings", settings);
		console.log(GM_getValue("settings"));
	}
});
