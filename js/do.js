$(document).ready(function(){
        $(function() {
            $("#menu-toggle").click(function(e) {
                e.preventDefault();
               $("#wrapper").toggleClass("toggled");

            });

            $(window).resize(function(e) {
                if ($(window).width() <= 768) {
                    $("#wrapper").removeClass("toggled");
                } else {
                    $("#wrapper").addClass("toggled");
                }
            });
        });
        $( ".nav .nav-link" ).click(function() {
          let title;
           switch ($(this).attr('id')) {
              case "v-pills-home-tab":
                title = "صفحه اصلی";
                break;
              case "v-pills-tag-tab":
                title = "برچسب زنی";
                break;
              case "v-pills-about-tab":
                title = "درباره ما";
                break;
              case "v-pills-contact-tab":
                title = "تماس با ما";
                break;
            }
            $("#content-title").html(title);
        });
        $( "#contact-clear" ).click(function() {
            $("#c-name").val("");
            $("#c-last-name").val("");
            $("#c-email").val("");
            $("#c-message").val("");
         });


        $( "#go-to-register" ).click(function() {
            $( "#close-login" ).click();
        });
        $( "#go-to-login" ).click(function() {
            $( "#close-registration" ).click();
        });
        $("#customSwitch1").click(function() {
             $('#part-speech').toggle('slow');

        });


/*======================Start**functions**=================================*/
// $.fn.numberWords = function(str){ //number of word in statment
//     $("#number-vocabulary").text(str.split(" ").length);
// }

// var aaaa = "این جمله اول پیکره بیجنخان است.";
// $.fn.numberWords(aaaa);


$.fn.getId = function(){ //get id statement
   return $("#present-statement").data("id");

}

 //console.log($.fn.getId());

$.fn.insertId = function(id){ //insert id statement
    $('#present-statement').attr('data-id', id);
    $( "#number-statement" ).text(id);

}

// var idd_s = 123;
// $.fn.insertId(idd_s);
// alert($("#present-statement").data("id"));

$.fn.insertStatement = function(statement){ //insert statement
   $("#present-statement").text(statement);
   $("#number-vocabulary").text(statement.split(" ").length);
}


 //var statement = "این دومین جمله است.";
 //$.fn.insertStatement(statement);



/****************start function selectbox******************/

$.fn.selectList = function(){

	var defaultselectbox = $('#cusSelectbox');
	var numOfOptions = $('#cusSelectbox').children('option').length;

	// hide select tag
	defaultselectbox.addClass('s-hidden');

	// wrapping default selectbox into custom select block
	defaultselectbox.wrap('<div class="cusSelBlock"></div>');

	// creating custom select div
	defaultselectbox.after('<div class="selectLabel"></div>');

	// getting default select box selected value
	$('.selectLabel').text(defaultselectbox.children('option').eq(0).text());

	// appending options to custom un-ordered list tag
	var cusList = $('<ul/>', { 'class': 'options'} ).insertAfter($('.selectLabel'));

	// generating custom list items
	for(var i=0; i< numOfOptions; i++) {
		$('<li/>', {
		text: defaultselectbox.children('option').eq(i).text(),
		rel: defaultselectbox.children('option').eq(i).val()
		}).appendTo(cusList);
	}

	// open-list and close-list items functions
	function openList() {
		for(var i=0; i< numOfOptions; i++) {
			$('.options').children('li').eq(i).attr('tabindex', i).css(
				'transform', 'translateY('+(i*100+100)+'%)').css(
				'transition-delay', i*30+'ms');
		}
	}

	function closeList() {
		for(var i=0; i< numOfOptions; i++) {
			$('.options').children('li').eq(i).css(
				'transform', 'translateY('+i*0+'px)').css('transition-delay', i*0+'ms');
		}
		$('.options').children('li').eq(1).css('transform', 'translateY('+2+'px)');
		$('.options').children('li').eq(2).css('transform', 'translateY('+4+'px)');

	}

	// click event functions
	$('.selectLabel').click(function () {
		$(this).toggleClass('active');
		if( $(this).hasClass('active') ) {
			openList();
			$.fn.focusItems();
		}
		else {
			closeList();
		}
	});

	$(".options li").on('keypress click', function(e) {
		e.preventDefault();
		$('.options li').siblings().removeClass();
		closeList();
		$('.selectLabel').removeClass('active');
		$('.selectLabel').text($(this).text());
		defaultselectbox.val($(this).text());
		$('.selected-item p span').text($('.selectLabel').text());
	    meanSelected = $(this).text();
	});

};

$.fn.focusItems = function(){

	$('.options').on('focus', 'li', function() {
		$this = $(this);
		$this.addClass('active').siblings().removeClass();
	}).on('keydown', 'li', function(e) {
		$this = $(this);
		if (e.keyCode == 40) {
			$this.next().focus();
			return false;
		} else if (e.keyCode == 38) {
			$this.prev().focus();
			return false;
		}
	}).find('li').first().focus();

}
/****************end function selectbox******************/

$.fn.insertmean = function(str){ //insert mean
   // let array =str.split(",");
    let optionTag;
    for (const element of str.split(",")) {
        optionTag +="<option value='"+element+"'>"+element+"</option>" ;
    }
     $("#cusSelectbox").html("<option value='Select'>انتخاب کنید.</option>"+optionTag);
     $.fn.selectList();
}

// var  str = "2,3,4,5,6,7";
// $.fn.insertmean(str);

/*======================End**functions**=================================*/


$("#first-name,#last-name,#c-name,#c-last-name").keyup(function(e) {
    this.value = this.value.replace(/[^ ابپتثجچ‌حخدذرزژسشصضطظعغفقکگلمنوهیءآاًهٔة]+/, '');
});
$("#username,#l-username").keyup(function(e) {
    this.value = this.value.replace(/[^ a-z A-Z _ 0-9]+/, '');
});





$( "#password" ).change(function() {
  pass = $(this).val();
  if(pass.length < 8){
     $(this).removeClass("border-success").addClass("border-danger");
  }else{
     $(this).removeClass("border-danger").addClass("border-success");
  }
});
$( "#confirm-password" ).change(function() {
  if(pass != $(this).val()){
      $(this).val("");
      $("#confirm-password , #password").removeClass("border-success").addClass("border-danger");
  }else{
      $("#confirm-password , #password").removeClass("border-danger").addClass("border-success");
  }

});









$( "#registration" ).submit(function(event) {
    event.preventDefault();
    let data = new FormData();
    data.append("firstName", $("#first-name").val());
    data.append("lastName", $("#last-name").val());
    data.append("userName", $("#username").val());
    data.append("email", $("#email").val());
    data.append("password", pass);

    $("#register").prop("disabled", true);

    $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        url: "/ajax.php?a=registration",
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 800000,
        success: function (data) {
            $("#registration > div input").removeClass("border-success").val("");
            $("#close-registration").click();

        },
        error: function (e) {

            alert(e.responseText);
            console.log("ERROR : ", e);
            $("#register").prop("disabled", false);

        }
    });

});



$( "#f-login" ).submit(function(event) {
    event.preventDefault();
    let data = new FormData();
    data.append("userName", $("#l-username").val());
    data.append("password", $("#l-password").val());


    $("#l-login").prop("disabled", true);

    $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        url: "/ajax.php?a=login",
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 800000,
        success: function (data) {
            $("#f-login > div input").val("");
            $("#close-login").click();


        },
        error: function (e) {

            alert(e.responseText);
            console.log("ERROR : ", e);
            $("#l-login").prop("disabled", false);

        }
    });

});


$( "#contact-us" ).submit(function(event) {
	event.preventDefault();
	let data = new FormData();
	data.append("name", $("#c-name").val());
	data.append("lastName", $("#c-last-name").val());
	data.append("email", $("#c-email").val());
	data.append("message", $("#c-message").val());


	$("#send-contact-us").prop("disabled", true);

	$.ajax({
		type: "POST",
		enctype: 'multipart/form-data',
		url: "/ajax.php?a=contactUs",
		data: data,
		processData: false,
		contentType: false,
		cache: false,
		timeout: 800000,
		success: function (data) {
			$("#contact-us > div input,textarea").val("");
			$("#contact-clear").click();


		},
		error: function (e) {
			alert(e.responseText);

			$("#send-contact-us").prop("disabled", false);

		}
	});

});




$("#reload").click(function() {
    let data = new FormData();
    data.append("idStatment", $.fn.getId());

	$.ajax({
		type: "POST",
		enctype: 'multipart/form-data',
		url: "/ajax.php?a=reload",
		data: data,
		processData: false,
		contentType: false,
		cache: false,
		timeout: 800000,
		success: function (data) {
            $.fn.insertStatement(data);//input function  (String) statement
			$.fn.insertId(data) //input function id statement


		},
		error: function (e) {
			alert(e.responseText);

		}
	});


});



$( "#next-statement" ).click(function() {

    let data = new FormData();
    data.append("idStatment", $.fn.getId());

	$.ajax({
		type: "POST",
		enctype: 'multipart/form-data',
		url: "/ajax.php?a=nextStatement",
		data: data,
		processData: false,
		contentType: false,
		cache: false,
		timeout: 800000,
		success: function (data) {
            $.fn.insertStatement(data);//input function  (String) statement
			$.fn.insertId(data) //input function id statement

		},
		error: function (e) {
			alert(e.responseText);

		}
	});


});





$("#saveMean").click(function() {
    let data = new FormData();
    data.append("idStatement", $.fn.getId());
    data.append("word", word);
    data.append("mean", meanSelected);

	$.ajax({
		type: "POST",
		enctype: 'multipart/form-data',
		url: "/ajax.php?a=saveMean",
		data: data,
		processData: false,
		contentType: false,
		cache: false,
		timeout: 800000,
		success: function (data) {
            $("#wrap-info-word").hide('slow');


		},
		error: function (e) {
			alert(e.responseText);

		}
	});




});




});


compareWord = "";
function selectWord(){
    word = window.getSelection().toString();
    let data = new FormData();
    data.append("word", word);
    if(word != compareWord){
    	$.ajax({
    		type: "POST",
    		enctype: 'multipart/form-data',
    		url: "/ajax.php?a=getMeans",
    		data: data,
    		processData: false,
    		contentType: false,
    		cache: false,
    		timeout: 800000,
    		success: function (data) {
            compareWord = word;
                                         var  str = "معنای ۱,معنای ۲,معنای ۳,معنای ۴"; //************just for tex ***********************
            $.fn.insertmean(str); //create select box
            $("#wrap-info-word").show('slow');
    		$("#infooo").text("لطفا معنی کلمه ( "  + word +  " ) را انتخاب کنید.");

    		},
    		error: function (e) {
    			alert(e.responseText);

    		}
    	});
     }



}
