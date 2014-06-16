/*
 * https://github.com/IDEAFY/Ideafy
 * Proprietary License - All rights reserved
 * Author: Vincent Weyl <vincent@ideafy.com>
 * Copyright (c) 2014 IDEAFY LLC
 */

define(["OObject","service/map","Bind.plugin","Event.plugin","service/config","Store","service/utils"],function(e,t,s,i,n,a,o){return function(r,d,c,l,u){var p=new e,g=new a,m=new a([]),v=n.get("labels");return p.plugins.addAll({labels:new s(v),wrapup:new s(g,{formatTitle:function(e){e&&(this.innerHTML=e.substring(0,1).toUpperCase()+e.substring(1).toLowerCase())},setScore:function(e){e&&(this.innerHTML=e+" ip")},setTime:function(e){e&&(this.innerHTML=o.formatDuration(e))}}),cards:new s(m,{formatTitle:function(e){var t=this.getAttribute("data-cards_id");e&&(3>t?this.innerHTML=e.substring(0,1).toUpperCase()+e.substring(1).toLowerCase():(this.innerHTML=e.toUpperCase(),this.setAttribute("style","font-family:Helvetica;")))},setPic:function(e){var t=this;e?e.search("img/decks")>-1?this.setAttribute("style","background-image:url('"+e+"');"):(json={dir:"cards",filename:e},n.get("transport").request("GetFile",json,function(e){t.setAttribute("style","background:white; background-image: url('"+e+"'); background-repeat: no-repeat; background-position: center center; background-size:contain;")})):this.setAttribute("style","background-image: none;")}}),quickwrapupevent:new i(p)}),p.template='<div id = "quickwrapup"><div class="previousbutton" data-quickwrapupevent="listen: mousedown, press; listen: mousedown, prev"></div><div class="brainstorm-header header blue-dark" data-labels="bind: innerHTML, quickwrapup" data-quickwrapupevent="listen:mousedown, toggleProgress"></div><div class="congrats"><div class="message"><span class="messagetitle" data-labels="bind:innerHTML, congratulations"></span><span class="sessioncompleted" data-labels="bind:innerHTML, sessioncompleted"></span></div><div class="enddeedee"></div></div><div class="summary"><div class="storysummary"><div class="storyheader" data-labels="bind:innerHTML, storytitlelbl">Your Story</div><div class="storytitle" data-wrapup="bind:formatTitle, scenario.title"></div><div class="storycontent"><p class="summaryheader" data-labels="bind:innerHTML, scenarioheader"></p><p class="content" data-wrapup="bind:innerHTML, scenario.story"></p><p class="summaryheader" data-labels="bind:innerHTML, scenariosolution"></p><p class="content" data-wrapup="bind:innerHTML, scenario.solution">solution content</p></div></div><div class="ideasummary"><div class="ideaheader" data-labels="bind:innerHTML, ideatitlelbl"></div><div class="ideatitle" data-wrapup="bind:formatTitle, idea.title"></div><div class="ideacontent"><p class="summaryheader" data-labels="bind:innerHTML, ideadescription"></p><p class="content" data-wrapup="bind:innerHTML, idea.description"></p><p class="summaryheader" data-labels="bind:innerHTML, ideaimplementation"></p><p class="content" data-wrapup="bind:innerHTML, idea.solution">solution content</p></div></div></div><div class="sessionresults"><div class ="sessiontime"><span data-labels="bind:innerHTML, yourtime"></span><span data-wrapup = "bind: setTime, duration"></span></div><div class="sessionscore"><span data-labels="bind:innerHTML, yourscore"></span><span data-wrapup="bind:setScore, score"></span></div></div><div class="sessioncards" data-quickwrapupevent="listen:mousedown, toggleCards"><legend>Cards used during this session</legend><ul class="cardlist" data-cards="foreach"><li class="card"><div class="cardpicture" data-cards="bind:setPic,pic"></div><div class="cardtitle" data-cards="bind: formatTitle, title"></div></li></ul></div></div>',p.place(t.get("quickwrapup")),p.press=function(e,t){t.classList.add("pressed")},p.next=function(e,t){t.classList.remove("pressed"),l("quickwrapup")},p.prev=function(e,t){t.classList.remove("pressed"),c("quickwrapup")},p.toggleProgress=function(){u()},p.toggleCards=function(e,t){t.classList.contains("expanded")?t.classList.remove("expanded"):t.classList.add("expanded")},p.reset=function(){m.reset([]),g.reset()},d.watchValue("scenario",function(e){g.set("scenario",e)}),d.watchValue("idea",function(e){g.set("idea",e)}),["characters","contexts","problems","techno"].forEach(function(e){d.watchValue(e,function(t){switch(e){case"characters":m.set(0,t);break;case"contexts":m.set(1,t);break;case"problems":m.set(2,t);break;case"techno":t.loop(function(e,t){m.set(t+3,e)})}})}),r.watchValue("score",function(e){g.set("score",e)}),r.watchValue("duration",function(e){g.set("duration",e)}),p}});