/*
 * https://github.com/IDEAFY/Ideafy
 * Proprietary License - All rights reserved
 * Author: Vincent Weyl <vincent@ideafy.com>
 * Copyright (c) 2014 IDEAFY LLC
 */

define(["OObject","service/map","Bind.plugin","Event.plugin","Amy/Stack-plugin","service/config","Store","./aboutideafy","./faq","./userguide","./tutorials","./support","./eula"],function(e,t,s,i,n,a,o,c,r,l,d,u,p){return function(){var g=new e,m=new n,v=a.get("labels"),h=[{name:"#about",label:v.get("aboutIdeafy"),currentUI:!1},{name:"#faq",label:v.get("faq"),currentUI:!1},{name:"#userguide",label:v.get("userguide"),currentUI:!1},{name:"#tutorials",label:v.get("tutorials"),currentUI:!1},{name:"#support",label:v.get("support"),currentUI:!1},{name:"#eula",label:v.get("eula"),currentUI:!1}],b=new o(h);return g.plugins.addAll({label:new s(v),aboutmenu:new s(b,{setCurrent:function(e){e?this.classList.add("pressed"):this.classList.remove("pressed")}}),aboutstack:m,aboutevent:new i(g)}),g.template='<div id="dashboard-about"><div class="header blue-dark"><span data-label="bind:innerHTML, aboutlbl"></span></div><div class = "progressbar"><ul id = "aboutmenu" class="steplist" data-aboutmenu="foreach"><li class="step" data-aboutmenu="bind: innerHTML, label; bind:setCurrent, currentUI" data-aboutevent="listen: mousedown, changeDisplay"></li></ul></div><div id="aboutstack" data-aboutstack="destination"></div></div>',g.place(t.get("dashboard-about")),g.changeDisplay=function(e,t){var s=t.getAttribute("data-aboutmenu_id");g.show(b.get(s).name,s)},g.show=function(e,t){b.loop(function(e,t){b.update(t,"currentUI",!1)}),b.update(t,"currentUI",!0),"#support"===e&&m.getStack().get(e).refresh(),m.getStack().show(b.get(t).name)},m.getStack().add("#about",new c),m.getStack().add("#faq",new r),m.getStack().add("#userguide",new l),m.getStack().add("#tutorials",new d),m.getStack().add("#support",new u),m.getStack().add("#eula",new p),m.getStack().show("#about"),b.update(0,"currentUI",!0),g}});