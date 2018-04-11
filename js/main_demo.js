$("body").vegas({
    delay:30000,
    transition: "",//["blur","zoomOut","swirRight","swirLeft"],
    animationDuration: "",
    loop:true,
    //transitionDuration:"auto",
    timer:false,
    animations:"",
    slides:[
       /*{ src:"src/img/ruta_artesanos.png",
         video: {
           src:["src/vid/test.mp4"],
           loop:false,
           mute:true
         },
         slide:"fade"
       },*/
       {src:"src/img/Derroteros01.png"},
       {src:"src/img/ruta_artesanos2.png"}
       /*{src:"src/img/flow2.jpg"},
       {src:"src/img/sitran.png"},       
       {src:"src/img/flow3.jpg"},
       {src:"src/img/flow4.jpg"}*/         
    ],    
    overlay: "vegas/overlays/02.png"
});

var interval;
var dtinterval;

function getpos()
{
  var ajax;
  if(window.XMLHttpRequest)
     ajax = new XMLHttpRequest();
  else
     ajax = new ActiveXObject("Microsoft.XMLHTTP");
  ajax.onreadystatechange = function()
  {
     if(this.readyState == 4 && this.status == 200)
     {
        var tojson = JSON.parse(this.response); 
        if(tojson['code'] == 0)
        {
          clearInterval(interval);
          //$("#vid").pause();
          $(".stop-info").show(1000);
          //console.log("RECEIVED: "+this.responseText);

          //OBTENER NOMBRE Y RECURSO DESDE JSON
          
          $("#parada").html("PRÓXIMA PARADA");
          $("#parada").attr("class","line1");
          //$("#parada").html("PARADA");
          //$("#parada").attr("class","line0");          
          
          $("#nombre_parada").html(tojson['name']); 
          //$("#nombre_parada").html("San Juan Pablo II");
          //NOMBRE DE LA CLASE PARA ATRIBUTOS DE PARADA DESDE JSON
          var class4name = "";
          try
          {
            if( tojson['dir'].indexOf('A01') >= 0 || tojson['dir'].indexOf('A02') >= 0 )
               class4name = "paradaAlimentadora";
            else if( tojson['dir'].indexOf('T02') >= 0)
               class4name = "paradaTroncal";
          }
          catch(e)
          {
	    class4Name = "paradaTroncal";
          }  

          $("#nombre_parada").attr("class",class4name);      
          
          //$("#sitran").attr("src","src/img/SitranTroncal.png");
          $("#sitran").attr("src","src/img/"+tojson['imgsrc']);	   

	  //$("#currentstop").attr("src","src/img/stops/T02_NS/SanJuanPabloII.jpg");
	  $("#currentstop").attr("src","src/img/stops/"+tojson["mapsrc"]);
          
	  $("#audio").attr("autoplay","true");
          //$("#audio").attr("src","src/audio/sanjuanpablo2.mp3");
          $("#audio").attr("src","src/audio/"+tojson["audiosrc"]);
          //$("#audio").attr("src","src/audio/sanjuanbosco.ogg");

          //$("#horario").attr("src", "src/img/DerroteroT02.jpg");
          var derrotero = "Derrotero"+tojson['dir'].substr(0,tojson['dir'].indexOf('_'))+".jpg";
          $("#horario").attr("src", "src/img/"+derrotero);
          
          //$("#stopSlide").vegas('play');
          setTimeout(function(){
             $(".stop-info").hide(500);
             $("#horario").attr("src","");
             $("#currentstop").attr("src","");
             $("#audio").attr("src","");
             $("#audio").attr("autoplay","false");
             $("#sitran").attr("src","");
             $("#horario").attr("src","");
             $("#parada").html("");
             $("#parada").attr("class",""); 
             //$("#vid").play();
          
             //interval = setInterval( getpos,2000);
             interval = setInterval( getpos,4000);
          },10000);
        }
        else if(tojson['code'] > 0)
        {
          console.log(tojson['msg']);
        } 
     }
     else if(this.readyState == 4 || this.status == 400  || this.status == 300)
     {
        console.log("ERROR: "+this.responseText);
     }
  };
    ajax.open("POST","cgi-bin/DEMO/pos.cgi", true);
    ajax.send();
  }
  
  function showdt()
  {
    var d = new Date($.now());
    var h = d.getHours();
    var m = d.getMinutes();
    var h12 = "";
    if(h == 0)
      h12 = 12;
    else if(h<=12)
      h12 = h<10 ? "0"+h : ""+h;
    else
      h12 = h<22? "0"+(h-12): ""+(h-12);

    $("#currdt").html( h12+":"+(m<10?"0"+m:m)+" "+(h<12?"AM":"PM"));
  }
  
  window.onload = function()
  {
    showdt();
    dtinterval = setInterval(showdt,4000)

    $(".stop-info").hide();
    //interval = setInterval(getpos,2000);    

    interval = setInterval(getpos,5000);
       
    //$("#vid").loop=false;
    //$("#vid").autoplay=true;
    //$("#vid").play();
    //$("#vid").addEventListener("ended",);
  };
