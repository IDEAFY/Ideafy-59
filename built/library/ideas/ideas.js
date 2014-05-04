/**
 * https://github.com/IDEAFY/Ideafy
 * Proprietary License - All rights reserved
 * Author: Vincent Weyl <vincent@ideafy.com>
 * Copyright (c) 2014 IDEAFY LLC
 */

define(["OObject","Amy/Control-plugin","Bind.plugin","Place.plugin","Amy/Delegate-plugin","Store","service/map","service/config","./idea-stack","./lists/idealist","Amy/Stack-plugin","lib/spin.min"],function(e,t,n,i,s,a,o,r,c,l,d,u){return function(){var p,g,h,m,f,v,b=new e,w=new a({search:""}),y=r.get("db"),L=r.get("observer"),k=new t(b),S=new c,T=r.get("user"),M=r.get("labels"),x=T.get("lang").substring(0,2),A=new a([{name:"#list-fav",css:"byfav",pushed:!1,lang:null},{name:"#list-date",css:"bydate",pushed:!0,lang:null},{name:"#list-rating",css:"byrating",pushed:!1,lang:null},{name:"#lang",css:"bylang",pushed:!1,lang:x}]),C=new a([{name:"*"}]),q=r.get("userLanguages"),H=new d,_=new u({color:"#808080",lines:10,length:12,width:6,radius:10,top:328}).spin();return q.forEach(function(e){C.alter("push",e)}),b.template='<div id = "ideas"><div id="idea-list" class="list"><div class="header blue-light"><div class="option left" data-ideascontrol="toggle:.option.left,mosaic,mousedown,mosaic"></div><span data-label="bind: innerHTML, idealistheadertitle">My Ideas</span><div class="option right" data-ideasevent="listen: mousedown, plus"></div></div><div data-idealiststack="destination" data-ideascontrol="radio:li.list-item,selected,mousedown,selectStart"><div class="tools"><input class="search" type="text" data-search="bind: value, search" data-label="bind: placeholder, searchprivateplaceholder" data-ideasevent="listen: keypress, search"><ul class="listbtns" data-listbtns="foreach"><li class="tools-button" data-listbtns="bind:setName, name; bind:setClass, css; bind:setPushed, pushed; bind:setLang, lang" data-ideasevent="listen:mouseup,show"></li></ul><ul class="langlist invisible" data-select="foreach"><li data-select="bind: setBg, name" data-ideasevent="listen: mousedown, setLang; listen:touchend, mouseup"></li></ul></div></div></div><div id="ideas-detail" class="details" data-ideaplace="place:details"></div></div>',b.plugins.addAll({idealiststack:H,listbtns:new n(A,{setPushed:function(e){e?this.classList.add("pushed"):this.classList.remove("pushed")},setLang:function(e){e&&"*"!==e&&(this.setAttribute("style","background-image:url('img/flags/"+e+".png');"),this.innerHTML=""),"*"===e&&(this.setAttribute("style","background-image: none;"),this.innerHTML="*")},setClass:function(e){e&&this.classList.add(e)},setName:function(e){e&&this.setAttribute("name",e)}}),select:new n(C,{setBg:function(e){"*"===e?(this.setAttribute("style","background-image: none;background: whitesmoke;"),this.innerHTML="*"):this.setAttribute("style","background-image:url('img/flags/"+e+".png');")}}),label:new n(M),search:new n(w),ideasevent:new s(b),ideaplace:new i({details:S}),ideascontrol:k}),b.place(o.get("ideas")),b.selectStart=function(e){var t=H.getStack().getCurrentScreen().getModel(),n=e.target.getAttribute("data-listideas_id");S.reset(t,n),w.set("search","")},b.displayHighlightedIdea=function(){var e,t=H.getStack().getCurrentScreen(),n=t.dom.querySelector(".list-item.selected")||t.dom.querySelector("li[data-listideas_id='0']");n?(e=n.getAttribute("data-listideas_id"),n.classList.add("selected"),n.scrollIntoView(),k.init(n),S.reset(t.getModel(),e)):S.displayEmpty(H.getStack().getCurrentName())},b.show=function(e,t){var n=parseInt(t.getAttribute("data-listbtns_id"),10),i=A.get(n).name,s=H.getStack();"#lang"===i?b.dom.querySelector(".langlist").classList.remove("invisible"):(A.loop(function(e,t){t===n?A.update(t,"pushed",!0):A.update(t,"pushed",!1)}),i!==s.getCurrentName&&(s.show(i),s.get(i).getModel().getNbItems()?b.displayHighlightedIdea():S.displayEmpty(i)))},b.setLang=function(e,t){var n,i;e.stopPropagation(),e.preventDefault(),n=t.getAttribute("data-select_id"),i=C.get(n).name,x=i,_.spin(b.dom.querySelector("#idea-list")),A.loop(function(e,t){"#lang"===e.name&&A.update(t,"lang",i)}),b.dom.querySelector(".langlist").classList.add("invisible"),["#list-rating","#list-fav","#list-date"].forEach(function(e){var t=H.getStack();t.get(e).setLang(i).then(function(){_.stop(),t.getCurrentName()===e&&0===t.get(e).getModel().getNbItems()?S.displayEmpty(e):b.displayHighlightedIdea()})})},b.stopPropagation=function(e){e.stopPropagation(),e.preventDefault()},b.mosaic=function(){var e=document.getElementById("ideas-detail");b.dom.classList.toggle("mosaic"),e.classList.contains("invisible")&&(e.classList.remove("invisible"),S.reset(p.getModel(),0))},b.plus=function(){o.get("newidea-popup").classList.add("appear"),o.get("cache").classList.add("appear")},b.search=function(e,t){var n;13===e.keyCode&&(""===t.value?(b.dom.querySelector(".listbtns").classList.remove("invisible"),H.getStack().show("#list-date"),A.loop(function(e,t){"#list-date"===e.name?A.update(t,"pushed",!0):A.update(t,"pushed",!1)}),b.displayHighlightedIdea()):(n=T.get("_id").replace(/@/,"at"),b.searchIdea("users:"+n+" AND "+t.value)),t.blur())},b.searchIdea=function(e){b.dom.querySelector(".listbtns").classList.add("invisible"),h.resetQuery({q:e,sort:"\\creation_date<date>",include_docs:!0}).then(function(){H.getStack().show("#list-search"),h.getModel().getNbItems()>0?(w.set("search",h.getModel().get(0).doc.title),b.dom.querySelector(".noresult").classList.add("invisible"),b.displayHighlightedIdea()):b.dom.querySelector(".noresult").classList.remove("invisible")})},b.reset=function(){w.set("search",""),h.resetQuery({q:"init_listSearch_UI",sort:"\\creation_date<date>",limit:30,include_docs:!0}),g.resetQuery({startkey:'["'+r.get("user").get("_id")+'",{}]',endkey:'["'+r.get("user").get("_id")+'"]',descending:!0,include_docs:!0}),p.resetQuery({key:'"'+T.get("_id")+'"',descending:!0,include_docs:!0}).then(function(){H.getStack().show("#list-date"),b.displayHighlightedIdea()})},x=T.get("settings").contentLang?T.get("settings").contentLang:T.get("lang").substring(0,2),"all"===x&&(x="*"),A.loop(function(e,t){"#lang"===e.name&&A.update(t,"lang",x)}),"*"===x?(f={key:'"'+T.get("_id")+'"',descending:!0},v={endkey:'[0,"'+T.get("_id")+'"]',startkey:'[0,"'+T.get("_id")+'",{},{}]',descending:!0}):(f={key:'[0,"'+T.get("_id")+'","'+x+'"]',descending:!0},v={endkey:'[1,"'+T.get("_id")+'","'+x+'"]',startkey:'[1,"'+T.get("_id")+'","'+x+'",{},{}]',descending:!0}),p=new l(y,"library","_view/ideas",f),h=new l("_fti/local/"+y,"indexedideas","userbyname",{q:"init_listSearch_UI",sort:"\\creation_date<date>",limit:30,include_docs:!0}),g=new l(y,"ideas","_view/privatebyvotes",v),m=new l(y,"library","_view/allideas","fav"),H.getStack().add("#list-date",p),H.getStack().add("#list-rating",g),H.getStack().add("#list-search",h),H.getStack().add("#list-fav",m),p.init(x).then(function(){return H.getStack().show("#list-date"),p.getModel().getNbItems()?b.displayHighlightedIdea():S.displayEmpty("#list-date"),m.setLang(x)}).then(function(){T.watchValue("library-favorites",function(e){e.length!==m.getModel().getNbItems()&&m.resetQuery(x).then(function(){"#list-fav"===H.getStack().getCurrentName()&&(m.getModel().getNbItems()?b.displayHighlightedIdea():S.displayEmpty("#list-fav"))})}),T.watchValue("settings",function(e){var t=e.contentLang;"all"===t&&(t="*"),t&&t!==x&&(x=t,A.loop(function(e,t){"#lang"===e.name&&A.update(t,"lang",x)}),["#list-date","#list-rating","#list-fav"].forEach(function(e){H.getStack().get(e).setLang(x)}))})}),g.init(x),["#list-date","#list-rating","#list-fav"].forEach(function(e){var t=H.getStack().get(e);t.getModel()}),L.watch("NewIdea",function(e){["#list-date","#list-rating","#list-fav","#list-search"].forEach(function(t){var n,i,s,a=H.getStack().get(t),o=a.getModel();t===H.getStack().getCurrentName()&&(_.spin(document.getElementById("idea-list")),o.watch("added",function(){o.loop(function(t,n){t.id===e&&(i=n)}),n=a.dom.querySelector(".list-item.selected"),n&&n.classList.remove("selected"),s=a.dom.querySelector("li[data-listideas_id='"+i+"']"),s.classList.add("selected"),k.init(i),s.scrollIntoView(),S.reset(o,i),_.stop()}))})}),b}});