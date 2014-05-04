/**
 * https://github.com/IDEAFY/Ideafy
 * Proprietary License - All rights reserved
 * Author: Vincent Weyl <vincent@ideafy.com>
 * Copyright (c) 2014 IDEAFY LLC
 */

define(["OObject","service/map","service/config","Bind.plugin","Place.plugin","Amy/Delegate-plugin","Amy/Stack-plugin","Amy/Control-plugin","./mtc-stack","./twoqlist","Store"],function(e,t,s,n,a,o,c,r,d,u,p){return function(){var g,m,v=new e,b=new c,h=new r(v),f=new d,w=[{name:"#mytwoq",active:!0},{name:"#contacttwoq",active:!1},{name:"#mytwoc",active:!1}],y=new p(w),L=new p({view:"#mytwoq"}),k=new p([]),S=s.get("user"),T=S.get("connections"),q=s.get("labels"),x=s.get("db");for(v.plugins.addAll({labels:new n(q),twoqbuttons:new n(y,{setBg:function(e){switch(e){case"#mytwoq":this.classList.add("mytwoq");break;case"#contacttwoq":this.classList.add("contacttwoq");break;case"#mytwoc":this.classList.add("mytwoc")}},setActive:function(e){e?this.classList.add("pushed"):this.classList.remove("pushed")}}),mtctools:new n(L,{setVisible:function(e){this.getAttribute("name")===e?this.classList.remove("invisible"):this.classList.add("invisible")},setLegend:function(e){switch(e){case"#mytwoq":this.innerHTML=q.get("mytwoquestions");break;case"#contacttwoq":this.classList.add("contacttwoq");break;case"#mytwoc":this.innerHTML=q.get("mytwocents")}},updateLegend:function(e){e&&"#contacttwoq"===L.get("view")&&(this.innerHTML=q.get("twoqprefix")+e+q.get("twoqsuffix"))}}),auto:new n(k),mtcliststack:b,mtcdetails:new a({mtcDetails:f}),mtccontrol:h,mtcevent:new o(v)}),v.template='<div id="connect-tc"><div id="mtc-list"><div class="header blue-light"><span data-labels="bind: innerHTML, mtcheadertitle"></span><div class="option right" data-mtcevent="listen: mousedown, plus"></div></div><ul class="twoqbuttons" data-twoqbuttons="foreach"><li data-twoqbuttons="bind: setBg,name; bind:setActive, active" data-mtcevent="listen:mousedown, selectView; listen: mouseup, showView"></li></ul><div class="selectcontact" name = "#contacttwoq" data-mtctools="bind:setVisible, view"><legend>Select a contact</legend><input class="search" data-mtcevent="listen:mousedown, updateAutoContact; listen:keyup, updateAutoContact" data-labels="bind:placeholder, tocontactlbl" data-mtctools = "bind:value, contact"><div class="rightcaret" data-mtcevent="listen: mousedown, updateAutoContact"></div><div class = "autocontact invisible"><ul data-auto="foreach"><li data-auto="bind:innerHTML, contact.username; bind:highlight, selected" data-mtcevent="listen:mousedown, highlightContact; listen:mouseup, selectContact"></li></ul></div></div><legend data-mtctools="bind:setLegend, view; bind: updateLegend, contact"></legend><input name="#mytwoq" class="search" type="text" data-mtctools="bind:setVisible, view" data-labels="bind: placeholder, searchmsgplaceholder" data-mtcevent="listen: input, search"><input name="#contacttwoq" class="search" type="text" data-mtctools="bind:setVisible, view" data-labels="bind: placeholder, searchmsgplaceholder" data-mtcevent="listen: keypress, search"><input name="#mytwoc" class="search" type="text" data-mtctools="bind:setVisible, view" data-labels="bind: placeholder, searchmsgplaceholder" data-mtcevent="listen: keypress, search"><div data-mtcliststack="destination" data-mtccontrol="radio:li,selected,mousedown,selectStart"></div></div><div id="mtc-detail" data-mtcdetails="place:mtcDetails" class="details"></div></div>',v.place(t.get("connect-twocents")),v.plus=function(){t.get("new2q-popup").classList.add("appear"),t.get("cache").classList.add("appear")},v.selectView=function(e,t){var s=t.getAttribute("data-twoqbuttons_id");y.loop(function(e,t){t===parseInt(s)?y.update(t,"active",!0):y.update(t,"active",!1)}),L.set("view",y.get(s).name)},v.showView=function(e,t){var s=t.getAttribute("data-twoqbuttons_id");switch(y.get(s).name){case"#mytwoq":b.getStack().show("#mytwoq"),f.setView("#defaultPage");break;case"#contacttwoq":b.getStack().show("#contacttwoq"),f.setView("#defaultPage");break;case"#mytwoc":b.getStack().show("#blank"),f.setView("2C")}},v.updateAutoContact=function(e,t){var s,n,a=JSON.parse(k.toJSON()),o=document.getElementById("mtc-list"),c=o.querySelector(".autocontact");if(c.classList.contains("invisible")&&c.classList.remove("invisible"),8===e.keyCode&&(t.value=""),t.value&&""!==t.value){for(n=t.value.toLowerCase(),i=a.length-1;i>=0;i--)s=a[i].contact.username.toLowerCase(),0!==s.search(n)&&a.splice(i,1);k.reset(a)}else{for(a=[],i=0,l=T.length;l>i;i++)"user"===T[i].type&&a.push({contact:T[i]});k.reset(a)}13===e.keyCode&&(""===t.value?(b.getStack().show("#blank"),f.getStack().show("defaultPage")):k.getNbItems()?(L.set("contact",k.get(0).contact.username),m.resetQuery({key:'"'+k.get(0).contact.userid+'"',descending:!0}).then(function(){var e,t=m.getModel();t.getNbItems()?(b.getStack().show("#contacttwoq"),f.reset("2Q",t.get(0)),e=m.dom.querySelector("li[data-twoqlist_id='0']"),h.init(e),e.classList.add("selected"),f.reset("2Q",t.get(0))):(b.getStack().show("#blank"),f.reset("default"))})):(b.getStack().show("#blank"),f.reset("default")))},v.highlightContact=function(e,t){t.classList.add("highlighted")},v.selectContact=function(e,t){var s=t.getAttribute("data-auto_id"),i=document.getElementById("mtc-list"),n=i.querySelector(".autocontact");t.classList.remove("highlighted"),L.set("contact",k.get(s).contact.username),n.classList.add("invisible"),m.resetQuery({key:'"'+k.get(s).contact.userid+'"',descending:!0}).then(function(){var e,t=m.getModel();t.getNbItems()?(b.getStack().show("#contacttwoq"),f.reset("2Q",t.get(0)),e=m.dom.querySelector("li[data-twoqlist_id='0']"),h.init(e),e.classList.add("selected"),f.reset("2Q",t.get(0))):(b.getStack().show("#blank"),f.reset("default"))})},v.selectStart=function(e){var t,s=b.getStack().getCurrentScreen().getModel();("#mytwoq"===L.get("view")||"#contacttwoq"===L.get("view"))&&(t=e.target.getAttribute("data-twoqlist_id")||e.target.getAttribute("data-twoqsearch_id"),f.reset("2Q",s.get(t)))},v.search=function(e,t){b.getStack().getCurrentScreen().search(t.value)},v.reset=function(){var e;for(y.reset(w),L.set("view","#mytwoq"),k.reset([]),T=S.get("connections"),e=0,l=T.length;l>e;e++)"user"===T[e].type&&k.alter("push",{contact:T[e],selected:!1});g.resetQuery({key:'"'+S.get("_id")+'"',descending:!0}).then(function(){b.getStack().show("#mytwoq"),f.reset("default")})},s.get("observer").watch("display-twoq",function(e,t){m.resetQuery({key:'"'+t+'"',descending:!0}).then(function(){var t,s,i=m.getModel();b.getStack().show("#contacttwoq"),L.set("view","#contacttwoq"),y.loop(function(e,t){"#contacttwoq"===e.name?y.update(t,"active",!0):y.update(t,"active",!1)}),i.loop(function(s,i){s.id===e&&(t=i,L.set("contact",s.value.username))}),s=m.dom.querySelector("li[data-twoqlist_id='"+t+"']"),h.init(s),s.classList.add("selected"),f.reset("2Q",i.get(t))})}),s.get("observer").watch("display-twoc",function(){b.getStack().show("#blank"),L.set("view","#mytwoc"),y.loop(function(e,t){"#mytwoc"===e.name?y.update(t,"active",!0):y.update(t,"active",!1)}),f.setView("2C")}),i=0,l=T.length;l>i;i++)"user"===T[i].type&&k.alter("push",{contact:T[i],selected:!1});return g=new u("user",x,"questions","_view/questionsbyauthor",{key:'"'+S.get("_id")+'"',descending:!0}),m=new u("contact",x,"questions","_view/questionsbyauthor",{key:'"Blank_List"',descending:!0}),blank=new u("user",x,"questions","_view/questionsbyauthor",{key:'"Blank_List"',descending:!0}),b.getStack().add("#mytwoq",g),b.getStack().add("#contacttwoq",m),b.getStack().add("#blank",blank),m.init(),blank.init(),g.init().then(function(){b.getStack().show("#mytwoq"),f.init("default")}),v}});