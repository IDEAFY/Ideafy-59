/*
 * https://github.com/IDEAFY/Ideafy
 * Proprietary License - All rights reserved
 * Author: Vincent Weyl <vincent@ideafy.com>
 * Copyright (c) 2014 IDEAFY LLC
 */

define(["OObject","service/config","Bind.plugin","Event.plugin","Store","service/avatar"],function(e,t,s,n,a,o){return function(){var c,r=new e,d=new a,u=new a([]),p=[{color:"#4D4D4D",icon:"graygroup.png",selected:!1},{color:"#657B99",icon:"bluegroup.png",selected:!1},{color:"#9AC9CD",icon:"azurgroup.png",selected:!1},{color:"#5F8F28",icon:"greengroup.png",selected:!1},{color:"#F2E520",icon:"yellowgroup.png",selected:!1},{color:"#F27B3D",icon:"orangegroup.png",selected:!1},{color:"#BD262C",icon:"redgroup.png",selected:!1}],g=new a(p),m=new a([]),v=new a({error:""}),h=t.get("user"),b=t.get("labels");return r.template='<div id="groupdetails"><div class="header blue-dark"><span class="newfolderlbl" data-group="bind:innerHTML, username"></span></div><div class = "detail-contents"><div class="folderpic" data-group="bind: setColor, color"></div><form><p><input type="text" class="input" data-group="bind:value, username" data-label="bind:placeholder, groupnamelbl"></p><p><textarea class="input" data-group="bind:value, intro" data-label="bind:placeholder, groupdesclbl"></textarea></p><legend data-label="bind:innerHTML, colortouch"></legend><ul class="groupcolors" data-color="foreach"><li data-color="bind:setColor, color; bind:setSelected, selected" data-grpdetailsevent="listen: mousedown, selectColor"></li></ul></form><div class = "grpcontactlist" data-group="bind: setVisible, contacts"><legend name="list" data-label="bind:innerHTML, grpcontacts" data-grpdetailsevent="listen: mousedown, toggleHide"></legend><ul class="contactlistdetail" data-grpcontacts="foreach"><li class = "contact list-item" data-grpdetailsevent="listen:mousedown, discardContact"><div data-grpcontacts="bind:setAvatar, userid"></div><p class="contact-name" data-grpcontacts="bind:innerHTML, username"></p><div class="remove-contact"></div><p class="contact-intro" data-grpcontacts="bind:innerHTML, intro"></p></li></ul></div><p class="update"><label class="cancelmail" data-label="bind:innerHTML, cancellbl" data-grpdetailsevent="listen: mousedown, press; listen:mouseup, cancel">Cancel</label><label class="sendmail" data-label="bind:innerHTML, updatelbl" data-grpdetailsevent="listen:mousedown, press; listen:mouseup, updateGroup"></label><label class="editerror" data-error="bind:innerHTML, error"></label><div class="addgrpcontacts"><legend name="add" data-label="bind:innerHTML, addgrpcontacts" data-grpdetailsevent="listen: mousedown, toggleHide"></legend><div class="addgrpcontactdetails"><input class="search" data-grpdetailsevent="listen:keyup, updateAutoContact" data-label="bind:placeholder, tocontactlbl"><div class = "autocontact"><ul data-auto="foreach"><li data-auto="bind:innerHTML, contact.username; bind:highlight, selected" data-grpdetailsevent="listen:mouseup, select"></li></ul></div></div></div></div>',r.plugins.addAll({label:new s(b),error:new s(v),color:new s(g,{setColor:function(e){this.setAttribute("style","background:"+e+";")},setSelected:function(e){this.innerHTML=e?"&#10003;":""}}),group:new s(d,{setColor:function(e){this.setAttribute("style","background: url('img/connect/"+e+"') no-repeat top left; background-size: contain;")},setStyle:function(e){e?this.setAttribute("style","color: #5F8F28;"):this.setAttribute("style","color: #F27B3D;")},setVisible:function(e){e.length?this.classList.remove("invisible"):this.classList.add("invisible")}}),grpcontacts:new s(u,{setAvatar:function(e){e&&(_frag=document.createDocumentFragment(),_ui=new o([e]),_ui.place(_frag),this.hasChildNodes()?this.replaceChild(_frag,this.firstChild):this.appendChild(_frag))},setSelected:function(e){this.innerHTML=e?"&#10003;":""}}),auto:new s(m,{highlight:function(e){e?this.classList.add("selected"):this.classList.remove("selected")}}),grpdetailsevent:new n(r)}),r.selectColor=function(e,t){var s=t.getAttribute("data-color_id");g.loop(function(e,t){g.update(t,"selected",!1)}),g.update(s,"selected",!0),d.set("color",g.get(s).icon)},r.toggleHide=function(e,t){var s=t.getAttribute("name");t.classList.contains("hide")?(t.classList.remove("hide"),"add"===s?document.querySelector(".addgrpcontactdetails").classList.remove("invisible"):document.querySelector(".contactlistdetail").classList.remove("invisible")):(t.classList.add("hide"),"add"===s?document.querySelector(".addgrpcontactdetails").classList.add("invisible"):document.querySelector(".contactlistdetail").classList.add("invisible"))},r.select=function(e,t){var s=t.getAttribute("data-auto_id");m.get(s).selected?(r.removeContact(s),setTimeout(function(){m.update(s,"selected",!1)},200)):(r.addContact(s),setTimeout(function(){m.update(s,"selected",!0)},200))},r.addContact=function(e){var t=JSON.parse(u.toJSON()),s=m.get(e).contact,n=0;if(u.toJSON().search(s.userid)<0){for(i=0,l=t.length;l>i;i++)s.lastname>t[i].lastname?n++:s.lastname===t[i].lastname&&s.username>t[i].username&&n++;t.splice(n,0,s),u.reset(t),d.set("contacts",t)}},r.removeContact=function(e){var t=JSON.parse(u.toJSON());for(i=t.length-1;i>=0;i--)t[i].userid===m.get(e).contact.userid&&t.splice(i,1);u.reset(t),d.set("contacts",t)},r.updateAutoContact=function(e,t){var s=JSON.parse(m.toJSON()),n=h.get("connections");if(""===t.value)for(s=[],i=0,l=n.length;l>i;i++)"user"===n[i].type&&s.push({contact:n[i],selected:!1});else if(8===e.keyCode||46===e.keyCode){for(s=[],i=0,l=n.length;l>i;i++)"user"===n[i].type&&s.push({contact:n[i],selected:!1});for(i=s.length-1;i>=0;i--)0!==s[i].contact.username.search(t.value)&&s.splice(i,1)}else for(i=s.length-1;i>=0;i--)0!==s[i].contact.username.search(t.value)&&s.splice(i,1);m.reset(s),m.loop(function(e,t){u.toJSON().search(e.contact.userid)>-1&&m.update(t,"selected",!0)})},r.discardContact=function(e,t){var s=t.getAttribute("data-grpcontacts_id"),i=u.get(s).userid;u.alter("splice",s,1),m.loop(function(e,t){e.contact.userid===i&&setTimeout(function(){m.update(t,"selected",!1)},200)}),d.set("contacts",JSON.parse(u.toJSON()))},r.press=function(e,t){t.classList.add("pressed")},r.cancel=function(e,t){t.classList.remove("pressed"),r.reset(c),document.querySelector("#groupdetails input.search").value=""},r.updateGroup=function(e,t){var s,i=h.get("connections"),n=JSON.parse(d.toJSON());if(t.classList.remove("pressed"),v.set("error",""),""===n.username)v.set("error",b.get("nogrpname"));else if(""===n.intro)v.set("error",b.get("nogrpintro"));else if(n.contacts.length)for(s=i.length-1;s>=0;s--)"group"===i[s].type&&i[s].username===c.username&&(v.get("error")||(i.splice(s,1,n),h.set("connections",i),h.upload().then(function(){r.reset(n),v.set("error",b.get("groupupdated"))})));else v.set("error",b.get("nocontactselected"))},r.reset=function(e){g.reset(p),g.loop(function(t,s){t.icon===e.color?g.update(s,"selected",!0):g.update(s,"selected",!1)}),d.reset(e),c=e,u.reset(e.contacts),m.reset([]),v.reset({error:""}),h.get("connections").forEach(function(e){"user"===e.type&&m.alter("push",{contact:e,selected:!1})}),m.loop(function(e,t){u.toJSON().search(e.contact.userid)>-1&&m.update(t,"selected",!0)})},r.init=function(){h.get("connections").forEach(function(e){"user"===e.type&&m.alter("push",{contact:e,selected:!1})})},r}});