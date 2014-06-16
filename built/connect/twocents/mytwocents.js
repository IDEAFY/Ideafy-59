/*
 * https://github.com/IDEAFY/Ideafy
 * Proprietary License - All rights reserved
 * Author: Vincent Weyl <vincent@ideafy.com>
 * Copyright (c) 2014 IDEAFY LLC
 */

define(["OObject","service/map","service/config","Bind.plugin","Place.plugin","Amy/Delegate-plugin","Amy/Stack-plugin","Amy/Control-plugin","./mtc-stack","./twoqlist","Store","service/new2q"],function(e,t,s,n,a,o,c,r,d,u,p,g){return function(){var m,v,b=new e,h=new c,f=new r(b),w=new d,y=[{name:"#mytwoq",active:!0},{name:"#contacttwoq",active:!1},{name:"#mytwoc",active:!1}],L=new p(y),k=new p({view:"#mytwoq"}),S=new p([]),T=s.get("user"),q=T.get("connections"),M=s.get("labels"),x=s.get("db");for(b.plugins.addAll({labels:new n(M),twoqbuttons:new n(L,{setBg:function(e){switch(e){case"#mytwoq":this.classList.add("mytwoq");break;case"#contacttwoq":this.classList.add("contacttwoq");break;case"#mytwoc":this.classList.add("mytwoc")}},setActive:function(e){e?this.classList.add("pushed"):this.classList.remove("pushed")}}),mtctools:new n(k,{setVisible:function(e){this.getAttribute("name")===e?this.classList.remove("invisible"):this.classList.add("invisible")},setLegend:function(e){switch(e){case"#mytwoq":this.innerHTML=M.get("mytwoquestions");break;case"#contacttwoq":this.classList.add("contacttwoq");break;case"#mytwoc":this.innerHTML=M.get("mytwocents")}},updateLegend:function(e){e&&"#contacttwoq"===k.get("view")&&(this.innerHTML=M.get("twoqprefix")+e+M.get("twoqsuffix"))}}),auto:new n(S),mtcliststack:h,mtcdetails:new a({mtcDetails:w}),mtccontrol:f,mtcevent:new o(b)}),b.template='<div id="connect-tc"><div id="mtc-list"><div class="header blue-light"><span data-labels="bind: innerHTML, mtcheadertitle"></span><div class="option right" data-mtcevent="listen: mousedown, plus"></div></div><ul class="twoqbuttons" data-twoqbuttons="foreach"><li data-twoqbuttons="bind: setBg,name; bind:setActive, active" data-mtcevent="listen:mousedown, selectView; listen: mouseup, showView"></li></ul><div class="selectcontact" name = "#contacttwoq" data-mtctools="bind:setVisible, view"><legend>Select a contact</legend><input class="search" data-mtcevent="listen:mousedown, updateAutoContact; listen:keyup, updateAutoContact" data-labels="bind:placeholder, tocontactlbl" data-mtctools = "bind:value, contact"><div class="rightcaret" data-mtcevent="listen: mousedown, updateAutoContact"></div><div class = "autocontact invisible"><ul data-auto="foreach"><li data-auto="bind:innerHTML, contact.username; bind:highlight, selected" data-mtcevent="listen:mousedown, highlightContact; listen:mouseup, selectContact"></li></ul></div></div><legend data-mtctools="bind:setLegend, view; bind: updateLegend, contact"></legend><input name="#mytwoq" class="search" type="text" data-mtctools="bind:setVisible, view" data-labels="bind: placeholder, searchmsgplaceholder" data-mtcevent="listen: input, search"><input name="#contacttwoq" class="search" type="text" data-mtctools="bind:setVisible, view" data-labels="bind: placeholder, searchmsgplaceholder" data-mtcevent="listen: keypress, search"><input name="#mytwoc" class="search" type="text" data-mtctools="bind:setVisible, view" data-labels="bind: placeholder, searchmsgplaceholder" data-mtcevent="listen: keypress, search"><div data-mtcliststack="destination" data-mtccontrol="radio:li,selected,mousedown,selectStart"></div></div><div id="mtc-detail" data-mtcdetails="place:mtcDetails" class="details"></div></div>',b.place(t.get("connect-twocents")),b.plus=function(){g.reset()},b.selectView=function(e,t){var s=t.getAttribute("data-twoqbuttons_id");L.loop(function(e,t){t===parseInt(s)?L.update(t,"active",!0):L.update(t,"active",!1)}),k.set("view",L.get(s).name)},b.showView=function(e,t){var s=t.getAttribute("data-twoqbuttons_id");switch(L.get(s).name){case"#mytwoq":h.getStack().show("#mytwoq"),w.setView("#defaultPage");break;case"#contacttwoq":h.getStack().show("#contacttwoq"),w.setView("#defaultPage");break;case"#mytwoc":h.getStack().show("#blank"),w.setView("2C")}},b.updateAutoContact=function(e,t){var s,n,a=JSON.parse(S.toJSON()),o=document.getElementById("mtc-list"),c=o.querySelector(".autocontact");if(c.classList.contains("invisible")&&c.classList.remove("invisible"),8===e.keyCode&&(t.value=""),t.value&&""!==t.value){for(n=t.value.toLowerCase(),i=a.length-1;i>=0;i--)s=a[i].contact.username.toLowerCase(),0!==s.search(n)&&a.splice(i,1);S.reset(a)}else{for(a=[],i=0,l=q.length;l>i;i++)"user"===q[i].type&&a.push({contact:q[i]});S.reset(a)}13===e.keyCode&&(""===t.value?(h.getStack().show("#blank"),w.getStack().show("defaultPage")):S.getNbItems()?(k.set("contact",S.get(0).contact.username),v.resetQuery({key:'"'+S.get(0).contact.userid+'"',descending:!0}).then(function(){var e,t=v.getModel();t.getNbItems()?(h.getStack().show("#contacttwoq"),w.reset("2Q",t.get(0)),e=v.dom.querySelector("li[data-twoqlist_id='0']"),f.init(e),e.classList.add("selected"),w.reset("2Q",t.get(0))):(h.getStack().show("#blank"),w.reset("default"))})):(h.getStack().show("#blank"),w.reset("default")))},b.highlightContact=function(e,t){t.classList.add("highlighted")},b.selectContact=function(e,t){var s=t.getAttribute("data-auto_id"),i=document.getElementById("mtc-list"),n=i.querySelector(".autocontact");t.classList.remove("highlighted"),k.set("contact",S.get(s).contact.username),n.classList.add("invisible"),v.resetQuery({key:'"'+S.get(s).contact.userid+'"',descending:!0}).then(function(){var e,t=v.getModel();t.getNbItems()?(h.getStack().show("#contacttwoq"),w.reset("2Q",t.get(0)),e=v.dom.querySelector("li[data-twoqlist_id='0']"),f.init(e),e.classList.add("selected"),w.reset("2Q",t.get(0))):(h.getStack().show("#blank"),w.reset("default"))})},b.selectStart=function(e){var t,s=h.getStack().getCurrentScreen().getModel();("#mytwoq"===k.get("view")||"#contacttwoq"===k.get("view"))&&(t=e.target.getAttribute("data-twoqlist_id")||e.target.getAttribute("data-twoqsearch_id"),w.reset("2Q",s.get(t)))},b.search=function(e,t){h.getStack().getCurrentScreen().search(t.value)},b.reset=function(){var e;for(L.reset(y),k.set("view","#mytwoq"),S.reset([]),q=T.get("connections"),e=0,l=q.length;l>e;e++)"user"===q[e].type&&S.alter("push",{contact:q[e],selected:!1});m.resetQuery({key:'"'+T.get("_id")+'"',descending:!0}).then(function(){h.getStack().show("#mytwoq"),w.reset("default")})},s.get("observer").watch("display-twoq",function(e,t){v.resetQuery({key:'"'+t+'"',descending:!0}).then(function(){var t,s,i=v.getModel();h.getStack().show("#contacttwoq"),k.set("view","#contacttwoq"),L.loop(function(e,t){"#contacttwoq"===e.name?L.update(t,"active",!0):L.update(t,"active",!1)}),i.loop(function(s,i){s.id===e&&(t=i,k.set("contact",s.value.username))}),s=v.dom.querySelector("li[data-twoqlist_id='"+t+"']"),f.init(s),s.classList.add("selected"),w.reset("2Q",i.get(t))})}),s.get("observer").watch("display-twoc",function(){h.getStack().show("#blank"),k.set("view","#mytwoc"),L.loop(function(e,t){"#mytwoc"===e.name?L.update(t,"active",!0):L.update(t,"active",!1)}),w.setView("2C")}),i=0,l=q.length;l>i;i++)"user"===q[i].type&&S.alter("push",{contact:q[i],selected:!1});return m=new u("user",x,"questions","_view/questionsbyauthor",{key:'"'+T.get("_id")+'"',descending:!0}),v=new u("contact",x,"questions","_view/questionsbyauthor",{key:'"Blank_List"',descending:!0}),blank=new u("user",x,"questions","_view/questionsbyauthor",{key:'"Blank_List"',descending:!0}),h.getStack().add("#mytwoq",m),h.getStack().add("#contacttwoq",v),h.getStack().add("#blank",blank),v.init(),blank.init(),m.init().then(function(){h.getStack().show("#mytwoq"),w.init("default")}),b}});