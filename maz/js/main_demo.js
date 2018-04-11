$("body").vegas({
    delay:30000,
    transition: ["blur","zoomOut","fade2"],
    //animationDuration: "",
    loop:true,
    shuffle:true,
    transitionDuration:"2000",
    timer:false,
    //animations:"",
    slides:[
       /*{ src:"src/img/ruta_artesanos.png",
         video: {
           src:["src/vid/test.mp4"],
           loop:false,
           mute:true
         },
         slide:"fade"
       },*/
       //{src:"src/img/carrusel2.jpg"}         

       {src:"src/img/carrusel/fondo1.jpg"},
       {src:"src/img/carrusel/fondo2.png"},
       {src:"src/img/carrusel/fondo3.jpg"},
       {src:"src/img/carrusel/fondo4.jpg"}
    ]
    //,overlay: "vegas/overlays/02.png"
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
        
        var rnd = Math.floor(Math.random() * 2);

        var tojson = JSON.parse(this.response); 
        if(tojson['code'] == 0)
        {
          clearInterval(interval);
          //$("#vid").pause();
          $(".stop-info").show(1000);
          

          if(tojson['position'] < 1000) //AJUSTAR FORMATO DE PARADAS
          {
            //PONER LA SUGERENCIA DONDE VA EL LOGO
            if(rnd == 1)
              $("#logo").attr("src","src/img/logo_help.png");

            //OBTENER NOMBRE Y RECURSO DESDE JSON
            $("#parada").html("PRÓXIMA PARADA");
            $("#parada").attr("class","line1");
            //$("#parada").html("PARADA");
            //$("#parada").attr("class","line0");          
          
            $("#nombre_parada").html(tojson['name']); 

            //NOMBRE DE LA CLASE PARA ATRIBUTOS DE PARADA DESDE JSON
            $("#nombre_parada").attr("class","paradaTroncal");      
          
            if(rnd == 1)
              $("#sitran").attr("src","src/img/stops/icons/parada_help.png");
            else
              //$("#sitran").attr("src","src/img/SitranTroncal.png");
              $("#sitran").attr("src","src/img/stops/icons/"+tojson['imgsrc']);	   

	    $("#currentstop").attr("src","src/img/stops/"+tojson["mapsrc"]);
            $("#currentstop").attr("class","img-responsive");            
    
	    $("#audio").attr("autoplay","true");
            $("#audio").attr("src","src/audio/"+tojson["audiosrc"]);
          
            //var derrotero = "Derrotero"+tojson['dir'].substr(0,tojson['dir'].indexOf('_'))+".jpg";
            //$("#horario").attr("src", "src/img/"+derrotero);
          
            //$("#stopSlide").vegas('play');
          }
          else //AJUSTAR FORMATO PARA ANUNCIO GENERAL
          {
            //OBTENER NOMBRE Y RECURSO DESDE JSON
            $("#parada").html("");
            $("#parada").attr("class","line1");
            
            $("#nombre_parada").html("");

            //NOMBRE DE LA CLASE PARA ATRIBUTOS DE PARADA DESDE JSON
            //$("#nombre_parada").attr("class","paradaTroncal");

            //$("#sitran").attr("src","src/img/SitranTroncal.png");
            //$("#sitran").attr("src","src/img/stops/icons/"+tojson['imgsrc']);

            $("#currentstop").attr("src","src/img/"+tojson["mapsrc"]);
            $("#currentstop").attr("class","img-responsive");

            $("#audio").attr("autoplay","true");
            $("#audio").attr("src","src/audio/"+tojson["audiosrc"]);

            //var derrotero = "Derrotero"+tojson['dir'].substr(0,tojson['dir'].indexOf('_'))+".jpg";
            //$("#horario").attr("src", "src/img/"+derrotero);
          }
	  
          if(tojson['position'] == 12 || tojson['position'] == 19 || tojson['position'] == 1008 || tojson['position'] == 1004 ) //28 SEGUNDOS PARA MOSTRAR ANUNCIO
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
              $("#currentstop").attr("class",""); 
              //$("#vid").play();
          
              //interval = setInterval( getpos,2000);
              interval = setInterval( getpos,4000);
            },10000);
          else //20 SEGUNDOS PARA MOSTRAR ANUNCIO 
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
              $("#currentstop").attr("class",""); 
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
    ajax.open("POST","../cgi-bin/DEMO/demopos.cgi", true);
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
