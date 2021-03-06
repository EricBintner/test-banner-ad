
// add d=.. path attr to svg <path>s
var rPath = document.getElementsByClassName("addPath")
var path;
for (path = 0; path < rPath.length; path++) {
    rPath[path].setAttribute("d", "M150-126.4V125L97.7-120.9L150-126.4z M2.2-78.4L150,125L47.8-104.6L2.2-78.4z M-67.7-0.7L150,125L-36.8-43.2L-67.7-0.7zM-100,98.7L150,125L-89,47.3L-100,98.7z M-89.1,202.7L150,125l-250,26.3L-89.1,202.7z M-36.8,293.2L150,125L-67.7,250.7L-36.8,293.2z M47.8,354.6L150,125L2.2,328.4L47.8,354.6z M150,376.4V125L97.7,370.9L150,376.4z M252.3,354.6L150,125l52.3,245.9L252.3,354.6z M336.8,293.2L150,125l147.8,203.4L336.8,293.2z M389.1,202.7L150,125l217.7,125.7L389.1,202.7z M400,98.7L150,125l250,26.3V98.7z M367.7-0.7L150,125l239-77.7L367.7-0.7z M297.8-78.4L150,125L336.8-43.2L297.8-78.4z M202.3-120.9L150,125l102.2-229.6L202.3-120.9z");
}

function init() {

    // colors
    var colorBlack  = '#000000';
    var colorBlue   = '#07a2d4';
    var colorYellow = '#dd8601';
    var colorRed    = '#93121b';

    // init reusable timelines
    var car      = new TimelineLite(),
        car2     = new TimelineLite(),
        carMove  = new TimelineLite(),
        carMove2 = new TimelineLite(),
        carMove3 = new TimelineLite(),
        light1   = new TimelineLite();

    // init sequenced timelines
    var main = new TimelineLite(),
      frame1 = new TimelineLite(),
      frame2 = new TimelineLite(),
      frame3 = new TimelineLite(),
      frame4 = new TimelineLite(),
      frame5 = new TimelineLite();




    // interactive color picker click handlers
    var r_Box   = document.getElementById("colorBoxRed");
    var b_Box   = document.getElementById("colorBoxBlue");
    var y_Box   = document.getElementById("colorBoxYellow");
    var sel     = "selected" ;

    r_Box.addEventListener("click", clickRed);
    function clickRed() {
      r_Box.classList.add(sel);
      b_Box.classList.remove(sel);
      y_Box.classList.remove(sel);
      TweenLite.to(".finalCars .cars_03", 1, {opacity: 1 , ease: Power2.easeOut });
      TweenLite.to(".finalCars .cars_01, .finalCars .cars_02", 0.8, {opacity: 0 , ease: Power3.easeIn });
    }
    b_Box.addEventListener("click", clickBlue);
    function clickBlue() {
      r_Box.classList.remove(sel);
      b_Box.classList.add(sel);
      y_Box.classList.remove(sel);
      TweenLite.to(".finalCars .cars_01", 1, {opacity: 1 , ease: Power2.easeOut });
      TweenLite.to(".finalCars .cars_02, .finalCars .cars_03", 0.8, {opacity: 0 , ease: Power3.easeIn });
    }
    y_Box.addEventListener("click", clickYellow);
    function clickYellow() {
      r_Box.classList.remove(sel);
      b_Box.classList.remove(sel);
      y_Box.classList.add(sel);
      TweenLite.to(".finalCars .cars_02", 1, {opacity: 1 , ease: Power2.easeOut });
      TweenLite.to(".finalCars .cars_01, .finalCars .cars_03", 0.8, {opacity: 0 , ease: Power3.easeIn });
    }



    // simple light effect (right to left atmospheric animation on car movement)
    var lights = "";

    for (i = 0; i < 18; i+=1) { 
        //timeout set so DOM order is random
        setTimeout(function(){

          var top   = Math.floor((50+(250*Math.random()))/1.5)+10;
          var left  = Math.floor(300*Math.random());
          var height= Math.floor(16*Math.random());
          var opacity=(Math.floor(40*Math.random())+2)/40;

          lights = "";
          lights += '  <div class="light"  style="top:'+top+'px; left:'+left+'px; height:'+height+'px; opacity:'+opacity+'">';
          lights += '    <div class="lightObject"></div>';
          lights += '  </div>'; 
          document.getElementById('lightsEffect').innerHTML += lights;

        }, Math.random()*10);
    }




    function carScale(){
      //animate wheels
      TweenLite.to(".rim",  2.2, { rotation: "+=1800", ease: CustomEase.create("custom", "M0,0,C0.082,0.018,0.124,0.034,0.194,0.118,0.264,0.202,0.7,0.814,0.76,0.88,0.832,0.959,0.858,1,1,1"), delay:-0.15 });
      // 'car2' adds subtle bumpy driving effect
      var spd = 0.2;
      car2
        .to(".carPlace",  spd, { scale:1.004 , overwrite:false })
        .to(".carPlace",  spd, { scale:1     , overwrite:false })
        .to(".carPlace",  spd, { scale:1.006 , overwrite:false })
        .to(".carPlace",  spd, { scale:1.003 , overwrite:false })
        .to(".carPlace",  spd, { scale:1.008 , overwrite:false })
        .to(".carPlace",  spd, { scale:1.010 , overwrite:false })
        .to(".carPlace",  spd, { scale:1.002 , overwrite:false })
        .to(".carPlace",  spd, { scale:1.015 , overwrite:false })
        .to(".carPlace",  spd, { scale:1.005 , overwrite:false })
        .to(".carPlace",  spd, { scale:1     , overwrite:false })
      ;
    }

    // car driving motion effect: 1, 2, and 3
    car
    .to(".carPlace",  1, { rotation: 10 }, "-=1.35")
    .to(".carPlace",  0.75, { rotation: 0.75, x:5, y:0.75,  ease: Back.easeOut  }, "=0.25")
    .to(".carPlace .shadow",  0.75, { rotation: -0.75, ease: Back.easeOut  }, "-=0.75")
    .to(".carPlace",  0.35, {  x:0,  ease: Expo.easeOut , overwrite:false   }, "+=0.3")
    .to(".carPlace",  0.35, { rotation: 0, y:0, ease: Bounce.easeOut , overwrite:false   }, "-=0.3")
    .to(".carPlace .shadow",  0.35, { rotation: 0, ease: Bounce.easeOut , overwrite:false   }, "-=0.3")
    ;

    carMove
    .to(".carPlace",  0.35, { rotation: -0.75, y:1, x:-2, ease: Back.easeIn , overwrite:false, delay:4.5   })
    .to(".carPlace .shadow",  0.35, { rotation: 0.75, ease: Back.easeIn , overwrite:false }, "-=0.35")
    .add(carScale) 
    .to(".carPlace",  1,  {  rotation: 0,  x:0, overwrite:false, ease: Power2.easeInOut })
    .to(".carPlace .shadow",  1,  {  rotation: 0,  overwrite:false, ease: Power2.easeInOut }, "-=1")
    .to(".carPlace",  0.7, { rotation: 1, x:5, y:0.75, overwrite:false, ease: Back.easeInOut  })
    .to(".carPlace .shadow",  0.7, { rotation: -1, overwrite:false, ease: Back.easeInOut  }, "-=0.7")
    .to(".carPlace",  0.35, {  x:0,  ease: Expo.easeOut , overwrite:false   }, "+=0.3")
    .to(".carPlace",  0.4, { rotation: 0, y:0, ease: Bounce.easeOut , overwrite:false   }, "-=0.3")
    .to(".carPlace .shadow",  0.4, { rotation: 0, ease: Bounce.easeOut , overwrite:false   }, "-=0.4")
    ;

    carMove2
    .to(".carPlace",  0.35, { rotation: -0.75, y:1, x:-2, ease: Back.easeIn , overwrite:false, delay:8.75   }) 
    .to(".carPlace .shadow",  0.35, { rotation: 0.75, ease: Back.easeIn , overwrite:false }, "-=0.35")
    .add(carScale)
    .to(".carPlace",  1,  {  rotation: 0, x:0, overwrite:false, ease: Power2.easeInOut })
    .to(".carPlace .shadow",  1,  {  rotation: 0,  overwrite:false, ease: Power2.easeInOut }, "-=1")
    .to(".carPlace",  0.7, { rotation: 1, x:5, y:0.75, overwrite:false, ease: Back.easeInOut  })
    .to(".carPlace .shadow",  0.7, { rotation: -1, overwrite:false, ease: Back.easeInOut  }, "-=0.7")
    .to(".carPlace",  0.35, {  x:0,  ease: Expo.easeOut , overwrite:false   }, "+=.3")
    .to(".carPlace",  0.4, { rotation: 0, y:0, ease: Bounce.easeOut , overwrite:false   }, "-=0.3")
    .to(".carPlace .shadow",  0.4, { rotation: 0, ease: Bounce.easeOut , overwrite:false   }, "-=0.4")
    ;

    carMove3
    .to(".carPlace",  0.35, { rotation: -0.75, y:1,  ease: Back.easeIn , overwrite:false, delay:12.5   }) 
    .to(".carPlace .shadow",  0.35, { rotation: 0.75, ease: Back.easeIn , overwrite:false }, "-=0.35")
    .to(".carPlace",  1,  {  rotation: 0, overwrite:false, ease: Power2.easeInOut })
    .to(".carPlace",  0.7, { rotation: 1, y:0.75, overwrite:false, ease: Back.easeInOut  })
    .to(".carPlace .shadow",  0.7, { opacity: 0, overwrite:false }, "-=1")

    ;







    // main timeline     ////    ////    ////    ////



    setTimeout(function(){
      // animation  
      TweenLite.to(".rim",  1.4, { rotation: "+=700", ease: CustomEase.create("custom", "M0,0,C0.082,0.018,0.094,0.058,0.164,0.142,0.234,0.226,0.7,0.814,0.76,0.88,0.832,0.959,0.858,1,1,1") });
      var lightTime = 1.5;
      var lightDelay = 0.0375;

      function lightAnimation(){
        var lightContainer  = document.getElementById('lightsEffect');
        var lightItem = lightContainer.getElementsByClassName('light');
        for (var i = 0; i < lightItem.length; ++i) 
            TweenLite.fromTo('#lightsEffect .light:nth-child('+i+')', lightTime, {x: 350 },{ x: -400, ease: Expo.easeInOut, delay:(0.1+(i/30)) })
        ;
      }
      lightAnimation();
      //light1.staggerFromTo("#lightsEffect .light", lightTime, {x: 350 },{ x: -400, ease: Expo.easeInOut, delay: 0 }, lightDelay )

      frame1   
        // init
        .to(".borderLayer",         0,      { opacity: "1", borderColor: colorBlue, borderWidth: 1 , overwrite:false  }, 0) 
        .to(".background-colors",   0,      { opacity: "1", backgroundColor: colorBlue }, 0) 

        // animate in copy1
        .to("#copy1",               0,      { opacity:1, ease: Expo.easeOut }, 1.25 )
        .to("#copy1a",              1,      { opacity:1 , autoRound:false, letterSpacing: "0", ease: Power3.easeOut})
        .to("#copy1b",              1,      { opacity:1 , autoRound:false, letterSpacing: "0", ease: Power3.easeOut}, "-=0.8")
        
        // slide in logo & CTA
        .to("#cta",                 1.15,   { opacity: 1 }, 0.5)  
        .to(".minilogo:not(.minilogo2)",            0,      { opacity: 1, scale: 1.45, x: -300 }, 0)
        .to(".minilogo:not(.minilogo2) img",        0.3,    { opacity: 1 }, "-=0.5") 
        .to(".minilogo:not(.minilogo2)",            0.8,    { x: 0,     ease: Power2.easeInOut, overwrite:false }, "-=0.5")  
        .to(".minilogo:not(.minilogo2)",            1.5,    { scale: 1.1, ease: Power2.easeOut,  overwrite:false }) 
        .to(".minilogo:not(.minilogo2) .bgBox",     0.3,    { opacity: 0 }, "-=1")

        // car drives in
        .to(".carPlace",            1.25,   { rotationY: 0, ease: Power3.easeOut, overwrite:false }, 0.2) 

        // update layer order so logo is not hidden
        .to(".minilogo:not(.minilogo2)",            0,    {  css:{"z-index":1},  overwrite:false }) 
        
        // force delay at end of timeline
        .to(".contain",             0.5,      { overwrite:false }, "+=0")
      ;
      frame2
        .to(".borderLayer",         0.1,    { borderColor: colorYellow }, 0) 
        .to(".background-colors",    0.1,   { backgroundColor: colorYellow }, 0)        

        // animate car drive
        .add(lightAnimation) 
        .to(".carPlace2 .car",      0.1,    { opacity: 1, ease: Power2.easeInOut }, 0) 
        .to(".carPlace1 .car:not(.lights)", 1.25, {  opacity: 0, ease: Power3.easeOut }, 1) 
        .to(".carPlace1 .car.lights",0.75,  {  opacity: 0, ease: Power2.easeOut}, 1.5) 
        
        // animate in copy2, copy1 out
        .to("#copy1a, #copy1b",     2.3,      { opacity:0, ease: Expo.easeOut, className:"+=blurOutEffect" }, 2 )
        .to("#copy1a, #copy1b",     2,      { x:"-=180", y:"-=50", autoRound:false, letterSpacing: "15", ease: Sine.easeInOut, overwrite:false}, 2.2 )
        .to("#copy2",               0,      { opacity:1, ease: Expo.easeOut }, "-=3" )
        .to("#copy2a",              1,      { opacity:1 , autoRound:false, letterSpacing: "0", ease: Power3.easeOut}, "-=1.5")
        .to("#copy2b",              1,      { opacity:1 , autoRound:false, letterSpacing: "0", ease: Power3.easeOut}, "-=1.3")

      ;
          
      frame3 
        .to(".borderLayer",      0.1,    { borderColor: colorRed }, 0) 
        .to(".background-colors",0.1,    { backgroundColor: colorRed }, 0)

        // animate car drive
        .add(lightAnimation) 
        .to(".carPlace3 .car",   0.1,    { opacity: 1, ease: Power2.easeInOut }, 0) 
        .to(".carPlace2 .car:not(.lights)", 1.25, {  opacity: 0, ease: Power3.easeOut }, 0.75) 
        .to(".carPlace2 .car.lights", 0.75, {  opacity: 0, ease: Power2.easeOut  }, 1.25) 

        // force delay at end of timeline
        .to(".contain",  1,   { overwrite:false }, "+=0")
      ;
         
     frame4
        .to(".contain",               0.1,  { backgroundColor: colorRed, ease: Power2.easeOut }, 0)  

        // animate car drive (drivs off screen)
        .to(".rim",  2.2, { rotation: "+=1000", ease: CustomEase.create("custom", "M0,0,C0.082,0.018,0.124,0.034,0.194,0.118,0.264,0.202,0.7,0.814,0.76,0.88,0.832,0.959,0.858,1,1,1"), delay:0.25 })
        .to(".carPlace", 1,  { x: "+=520px", ease: Power3.easeIn}, 0.5)
        .to(".contain",               1,  { backgroundColor: "#000", ease: Power2.easeOut }, "-=1")  
        .to(".carPlace3 .car.lights", 0.5,  { opacity: 0}, 1)
        .to(".carPlace3 .car:not(.lights)", 1.5, {  opacity: 0, overwrite:false, ease: Power3.easeOut }, 1)
        
        .to(".background-colors",     0.75,    { opacity: 0}, "-=3") 

        // animate copy2 out
        .to("#copy2a, #copy2b ",      2.3, { opacity:0, ease: Expo.easeOut, className:"+=blurOutEffect" }, 0.25 )
        .to("#copy2a, #copy2b ",      2,  { y:"-=80", autoRound:false, letterSpacing: "2", ease: Sine.easeIn, overwrite:false},0.45)
        
        // animate Logo to center
        .to("#cta",                 0.5,    { opacity: 0,  ease: Power2.easeOut }, 0.5)  
        .to(".borderLayer",           1,  { borderColor: colorBlue, borderWidth: 8},1.75) 
        .to(".minilogo:not(.minilogo2)",            0.66,    { opacity: 1, scale: 3.4,  ease: Power2.easeOut,  x: -98,  }, 1.75)
        .to(".minilogo:not(.minilogo2)",            0.66,    { ease: Expo.easeOut,  y:-91 , overwrite:false}, 1.75)
        .to(".minilogo:not(.minilogo2)",     2.25,       { scale: 3.75, ease: Power1.easeOut, overwrite:false} )
          
        // force delay at end of timeline
        .to(".contain",  0,   { overwrite:false }, "+=0.25")
     ;
            
     frame5
        // animate out big logo
        .to(".minilogo:not(.minilogo2)",     2.3,       { opacity:0,  ease: Expo.easeOut, className:"+=blurOutEffect",  overwrite:false })
        .to(".minilogo:not(.minilogo2)",     1,         { y:"-=50", ease: Sine.easeInOut, overwrite:false}, "+=1" )
        
        // animate in small logo
        .to("#cta",               1.15,      { opacity: 1 }, "-=3.5")  
        .to(".minilogo2",            0,      { opacity: 1, scale: 1.35, x: -300, y: 0,  overwrite:false }, "-=4.15")
        .to(".minilogo2 img",        0.3,    { opacity: 1 }, "-=4.15") 
        .to(".minilogo2",            0.8,    { x: 0,     ease: Power2.easeInOut, overwrite:false }, "-=4")  
        .to(".minilogo2",            1.5,    { scale: 1.1, ease: Power2.easeOut,   overwrite:false }, "-=3.15") 

        // final frame in
        .to(".finalCars",            1.5,     { opacity: 1, ease: Power2.easeIn, className:"+=unblur",  overwrite:false }, "-=4") 
        // bgBox: covers buttons with gradient
        .to(".bgBox.bgBox2",          0,     { opacity: 1 }, "-=4")
        .to(".colorSelector",         0,     { opacity: 1 }, "-=4")
         // bgBox: slides gradient away revealing .color selector underneith
        .to(".bgBox.bgBox2",          3,     { x:380,  overwrite:false }, "-=3")

        // fix for z-index and CTA hover events
        .to(".borderLayer",           0,     { css:{"z-index":1} }, "+=1")

        // animation complete
     ;



    // sequence frames
    main.add(frame1)
    main.add(frame2)
    main.add(frame3)
    main.add(frame4)
    main.add(frame4)
    main.add(frame5)

    }, 11);




















}



