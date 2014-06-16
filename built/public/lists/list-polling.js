/*
 * https://github.com/IDEAFY/Ideafy
 * Proprietary License - All rights reserved
 * Author: Vincent Weyl <vincent@ideafy.com>
 * Copyright (c) 2014 IDEAFY LLC
 */

define(["OObject","CouchDBView","Store","service/config","Bind.plugin","Event.plugin","service/utils","service/avatar","service/actionbar","Promise"],function(e,t,i,n,s,a,o,r,l,c){function d(e,r,d,u){var p,g=new t([]),h=new i,m=n.get("labels"),v=null,f=n.get("user"),b={db:e,view:d,design:r,query:{descending:!0,limit:50}},w=this;u&&(b.query=u),this.template="<div><div class='noresult date invisible' data-labels='bind:innerHTML,noresult' ></div><ul class='idea-list' data-listideas='foreach'><li class='list-item' data-listevent='listen:mousedown, setStart; listen:dblclick, showActionBar'><div class='item-header'><div class='avatar' data-listideas='bind:setAvatar,value.doc.authors'></div><h2 data-listideas='bind:innerHTML,value.doc.authornames' data-display='bind:setAuthornames, mosaic'></h2><span class='date' data-listideas='bind:date,value.doc.creation_date'></span></div><div class='item-body'><h3 data-listideas='bind:innerHTML,value.doc.title'>Idea title</h3><p data-listideas='bind:setDesc,value.doc.description'></p></div><div class='item-footer'><a class='idea-type'></a><a class='item-acorn'></a><span class='rating' data-listideas='bind:setRating, value.rating'></span> </div></li></ul></div>",this.plugins.addAll({labels:new s(m),listideas:new s(g,{date:function(e){this.innerHTML=o.formatDate(e)},setDesc:function(e){this.innerHTML=e.replace(/\n/g,"<br>")},setRating:function(e){if(void 0===e){var t=this.getAttribute("data-listideas_id"),i=g.get(t).doc.votes||[];this.innerHTML=0===i.length?"":Math.round(100*(i.reduce(function(e,t){return e+t})/i.length))/100}else this.innerHTML=e},setAvatar:function(){}}),display:new s(h,{setAuthornames:function(e){var t=this.getAttribute("data-listideas_id"),i=g.get(t).value.doc.authornames,n=g.get(t).value.doc.authors;this.innerHTML=e&&n.length>1?i.split(",")[0]+m.get("andothers"):i}}),listevent:new a(this)}),this.getModel=function(){return g},w.resetQuery=function(e){var i=new c,s=f.get("settings").polling_interval||n.get("polling_interval"),a=new t,o=w.dom.querySelector(".noresult");return e&&(b.query=e),clearInterval(p),a.setTransport(n.get("transport")),a.sync(b.db,b.design,b.view,b.query).then(function(){v&&v.hide(),g.reset(JSON.parse(a.toJSON())),g.getNbItems()?o.classList.add("invisible"):o.classList.remove("invisible"),a.unsync(),p=setInterval(function(){a.reset([]),a.sync(b.db,b.design,b.view,b.query).then(function(){v&&v.hide(),g.reset(JSON.parse(a.toJSON())),g.getNbItems()?o.classList.add("invisible"):o.classList.remove("invisible"),a.unsync()})},s),i.fulfill()}),i},this.setLang=function(e){return"*"===e?w.resetQuery({startkey:"[0,{}]",endkey:"[0]",descending:!0,limit:50}):w.resetQuery({key:'[1,"'+e+'"]',descending:!0,limit:50})},this.setMosaic=function(e){e?h.set("mosaic",!0):h.set("mosaic",!1)},this.setStart=function(e,t){var i=document.getElementById("public");v&&(v.hide(),v=null),i.classList.contains("mosaic")&&(i.classList.remove("mosaic"),t.scrollIntoView())},this.showActionBar=function(e,t){var i,n=t.getAttribute("data-listideas_id"),s=!1,a=document.getElementById("public");v&&v.getParent()===t&&(s=!0),a.classList.contains("mosaic")||s||(v=new l("idea",t,g.get(n).id),i=document.createDocumentFragment(),v.place(i),t.appendChild(i))},this.init=function(){var e=new c,i=f.get("settings").polling_interval||n.get("polling_interval"),s=new t,a=w.dom.querySelector(".noresult");return s.setTransport(n.get("transport")),s.sync(b.db,b.design,b.view,b.query).then(function(){g.reset(JSON.parse(s.toJSON())),g.getNbItems()?a.classList.add("invisible"):a.classList.remove("invisible"),s.unsync(),p=setInterval(function(){s.reset([]),s.sync(b.db,b.design,b.view,b.query).then(function(){g.reset(JSON.parse(s.toJSON())),g.getNbItems()?a.classList.add("invisible"):a.classList.remove("invisible"),s.unsync()})},i),e.fulfill()}),e},f.watchValue("settings",function(){var e,i=new t,s=w.dom.querySelector(".noresult");f.get("settings").polling_interval!==n.get("polling_interval")&&(n.set("polling_interval",f.get("settings").polling_interval),e=n.get("polling_interval"),clearInterval(p),i.setTransport(n.get("transport")),p=setInterval(function(){i.reset(),i.sync(b.db,b.design,b.view,b.query).then(function(){v&&v.hide(),g.reset(JSON.parse(i.toJSON())),g.getNbItems()?s.classList.add("invisible"):s.classList.remove("invisible"),i.unsync()})},e))}),n.get("observer").watch("update-polling",function(){w.resetQuery()})}return function(t,i,n,s){return d.prototype=new e,new d(t,i,n,s)}});