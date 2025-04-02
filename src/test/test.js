window.addEventListener('DOMContentLoaded',function(){
    const tl = gsap.timeline({
        scrollTrigger:{
        trigger:'.message',
        start:'center center',
    }});
    tl
    .fromTo('.message__content > *',{autoAlpha:0,y:20},{autoAlpha:1,y:0,stagger:.3})
    .fromTo('.gradient-circle-container',{rotate:'-120deg',x:'-50%',y:'-50%'},{duration:1.5,rotate:'0deg',x:'-50%',y:'-50%'},'<')
    .fromTo('.gradient-stroke-circle',{autoAlpha:0,'stroke-dasharray':'0 1413'},{autoAlpha:1,'stroke-dasharray':'1060 1413',duration:1},'<')
})
