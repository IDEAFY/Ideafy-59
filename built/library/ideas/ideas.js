/**
 * https://github.com/IDEAFY/Ideafy
 * Proprietary License - All rights reserved
 * Author: Vincent Weyl <vincent@ideafy.com>
 * Copyright (c) 2014 IDEAFY LLC
 */

define(["OObject","Amy/Control-plugin","Bind.plugin","Place.plugin","Amy/Delegate-plugin","Store","service/map","service/config","./idea-stack","./lists/idealist","Amy/Stack-plugin","lib/spin.min","service/newidea"],function(e,t,n,i,s,a,o,r,c,l,d,u,p){return function(){var g,h,m,f,v,b,w=new e,y=new a({search:""}),L=r.get("db"),k=r.get("observer"),S=new t(w),T=new c,M=r.get("user"),x=r.get("labels"),A=M.get("lang").substring(0,2),C=new a([{name:"#list-fav",css:"byfav",pushed:!1,lang:null},{name:"#list-date",css:"bydate",pushed:!0,lang:null},{name:"#list-rating",css:"byrating",pushed:!1,lang:null},{name:"#lang",css:"bylang",pushed:!1,lang:A}]),q=new a([{name:"*"}]),H=r.get("userLanguages"),_=new d,I=new u({color:"#808080",lines:10,length:12,width:6,radius:10,top:328}).spin();return H.forEach(function(e){q.alter("push",e)}),w.template='<div id = "ideas"><div id="idea-list" class="list"><div class="header blue-light"><div class="option left" data-ideascontrol="toggle:.option.left,mosaic,mousedown,mosaic"></div><span data-label="bind: innerHTML, idealistheadertitle">My Ideas</span><div class="option right" data-ideasevent="listen: mousedown, plus"></div></div><div data-idealiststack="destination" data-ideascontrol="radio:li.list-item,selected,mousedown,selectStart"><div class="tools"><input class="search" type="text" data-search="bind: value, search" data-label="bind: placeholder, searchprivateplaceholder" data-ideasevent="listen: keypress, search"><ul class="listbtns" data-listbtns="foreach"><li class="tools-button" data-listbtns="bind:setName, name; bind:setClass, css; bind:setPushed, pushed; bind:setLang, lang" data-ideasevent="listen:mouseup,show"></li></ul><ul class="langlist invisible" data-select="foreach"><li data-select="bind: setBg, name" data-ideasevent="listen: mousedown, setLang; listen:touchend, mouseup"></li></ul></div></div></div><div id="ideas-detail" class="details" data-ideaplace="place:details"></div></div>',w.plugins.addAll({idealiststack:_,listbtns:new n(C,{setPushed:function(e){e?this.classList.add("pushed"):this.classList.remove("pushed")},setLang:function(e){e&&"*"!==e&&(this.setAttribute("style","background-image:url('img/flags/"+e+".png');"),this.innerHTML=""),"*"===e&&(this.setAttribute("style","background-image: none;"),this.innerHTML="*")},setClass:function(e){e&&this.classList.add(e)},setName:function(e){e&&this.setAttribute("name",e)}}),select:new n(q,{setBg:function(e){"*"===e?(this.setAttribute("style","background-image: none;background: whitesmoke;"),this.innerHTML="*"):this.setAttribute("style","background-image:url('img/flags/"+e+".png');")}}),label:new n(x),search:new n(y),ideasevent:new s(w),ideaplace:new i({details:T}),ideascontrol:S}),w.place(o.get("ideas")),w.selectStart=function(e){var t=_.getStack().getCurrentScreen().getModel(),n=e.target.getAttribute("data-listideas_id");T.reset(t,n),y.set("search","")},w.displayHighlightedIdea=function(){var e,t=_.getStack().getCurrentScreen(),n=t.dom.querySelector(".list-item.selected")||t.dom.querySelector("li[data-listideas_id='0']");n?(e=n.getAttribute("data-listideas_id"),n.classList.add("selected"),n.scrollIntoView(),S.init(n),T.reset(t.getModel(),e)):T.displayEmpty(_.getStack().getCurrentName())},w.show=function(e,t){var n=parseInt(t.getAttribute("data-listbtns_id"),10),i=C.get(n).name,s=_.getStack();"#lang"===i?w.dom.querySelector(".langlist").classList.remove("invisible"):(C.loop(function(e,t){t===n?C.update(t,"pushed",!0):C.update(t,"pushed",!1)}),i!==s.getCurrentName&&(s.show(i),s.get(i).getModel().getNbItems()?w.displayHighlightedIdea():T.displayEmpty(i)))},w.setLang=function(e,t){var n,i;e.stopPropagation(),e.preventDefault(),n=t.getAttribute("data-select_id"),i=q.get(n).name,A=i,I.spin(w.dom.querySelector("#idea-list")),C.loop(function(e,t){"#lang"===e.name&&C.update(t,"lang",i)}),w.dom.querySelector(".langlist").classList.add("invisible"),["#list-rating","#list-fav","#list-date"].forEach(function(e){var t=_.getStack();t.get(e).setLang(i).then(function(){I.stop(),t.getCurrentName()===e&&0===t.get(e).getModel().getNbItems()?T.displayEmpty(e):w.displayHighlightedIdea()})})},w.stopPropagation=function(e){e.stopPropagation(),e.preventDefault()},w.mosaic=function(){var e=document.getElementById("ideas-detail");w.dom.classList.toggle("mosaic"),e.classList.contains("invisible")&&(e.classList.remove("invisible"),T.reset(g.getModel(),0))},w.plus=function(){p.reset()},w.search=function(e,t){var n;13===e.keyCode&&(""===t.value?(w.dom.querySelector(".listbtns").classList.remove("invisible"),_.getStack().show("#list-date"),C.loop(function(e,t){"#list-date"===e.name?C.update(t,"pushed",!0):C.update(t,"pushed",!1)}),w.displayHighlightedIdea()):(n=M.get("_id").replace(/@/,"at"),w.searchIdea("users:"+n+" AND "+t.value)),t.blur())},w.searchIdea=function(e){w.dom.querySelector(".listbtns").classList.add("invisible"),m.resetQuery({q:e,sort:"\\creation_date<date>",include_docs:!0}).then(function(){_.getStack().show("#list-search"),m.getModel().getNbItems()>0?(y.set("search",m.getModel().get(0).doc.title),w.dom.querySelector(".noresult").classList.add("invisible"),w.displayHighlightedIdea()):w.dom.querySelector(".noresult").classList.remove("invisible")})},w.reset=function(){y.set("search",""),m.resetQuery({q:"init_listSearch_UI",sort:"\\creation_date<date>",limit:30,include_docs:!0}),h.resetQuery({startkey:'["'+r.get("user").get("_id")+'",{}]',endkey:'["'+r.get("user").get("_id")+'"]',descending:!0,include_docs:!0}),g.resetQuery({key:'"'+M.get("_id")+'"',descending:!0,include_docs:!0}).then(function(){_.getStack().show("#list-date"),w.displayHighlightedIdea()})},A=M.get("settings").contentLang?M.get("settings").contentLang:M.get("lang").substring(0,2),"all"===A&&(A="*"),C.loop(function(e,t){"#lang"===e.name&&C.update(t,"lang",A)}),"*"===A?(v={key:'"'+M.get("_id")+'"',descending:!0},b={endkey:'[0,"'+M.get("_id")+'"]',startkey:'[0,"'+M.get("_id")+'",{},{}]',descending:!0}):(v={key:'[0,"'+M.get("_id")+'","'+A+'"]',descending:!0},b={endkey:'[1,"'+M.get("_id")+'","'+A+'"]',startkey:'[1,"'+M.get("_id")+'","'+A+'",{},{}]',descending:!0}),g=new l(L,"library","_view/ideas",v),m=new l("_fti/local/"+L,"indexedideas","userbyname",{q:"init_listSearch_UI",sort:"\\creation_date<date>",limit:30,include_docs:!0}),h=new l(L,"ideas","_view/privatebyvotes",b),f=new l(L,"library","_view/allideas","fav"),_.getStack().add("#list-date",g),_.getStack().add("#list-rating",h),_.getStack().add("#list-search",m),_.getStack().add("#list-fav",f),g.init(A).then(function(){return _.getStack().show("#list-date"),g.getModel().getNbItems()?w.displayHighlightedIdea():T.displayEmpty("#list-date"),f.setLang(A)}).then(function(){M.watchValue("library-favorites",function(e){e.length!==f.getModel().getNbItems()&&f.resetQuery(A).then(function(){"#list-fav"===_.getStack().getCurrentName()&&(f.getModel().getNbItems()?w.displayHighlightedIdea():T.displayEmpty("#list-fav"))})}),M.watchValue("settings",function(e){var t=e.contentLang;"all"===t&&(t="*"),t&&t!==A&&(A=t,C.loop(function(e,t){"#lang"===e.name&&C.update(t,"lang",A)}),["#list-date","#list-rating","#list-fav"].forEach(function(e){_.getStack().get(e).setLang(A)}))})}),h.init(A),["#list-date","#list-rating","#list-fav"].forEach(function(e){var t=_.getStack().get(e);t.getModel()}),k.watch("NewIdea",function(e){["#list-date","#list-rating","#list-fav","#list-search"].forEach(function(t){var n,i,s,a=_.getStack().get(t),o=a.getModel();t===_.getStack().getCurrentName()&&(I.spin(document.getElementById("idea-list")),o.watch("added",function(){o.loop(function(t,n){t.id===e&&(i=n)}),n=a.dom.querySelector(".list-item.selected"),n&&n.classList.remove("selected"),s=a.dom.querySelector("li[data-listideas_id='"+i+"']"),s.classList.add("selected"),S.init(i),s.scrollIntoView(),T.reset(o,i),I.stop()}))})}),w}});