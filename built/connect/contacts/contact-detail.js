/**
 * https://github.com/IDEAFY/Ideafy
 * Proprietary License - All rights reserved
 * Author: Vincent Weyl <vincent@ideafy.com>
 * Copyright (c) 2014 IDEAFY LLC
 */

define(["OObject","service/config","service/map","Store","Bind.plugin","Event.plugin","service/avatar","service/utils"],function(e,t,s,n,a,o,c,r){return function(){var d=new e,l=new n,u=new n,p=new n([]),g=new n([]),m=t.get("labels"),v=t.get("user");return t.get("transport"),d.plugins.addAll({label:new a(m),basicinfo:new a(u,{setAvatar:function(e){var t=document.createDocumentFragment(),s=new c([e]);s.place(t),this.hasChildNodes()?this.replaceChild(t,this.firstChild):this.appendChild(t)}}),ctdetails:new a(l),grades:new a(p,{showBadge:function(e){this.setAttribute("style","background: url('img/profile/"+e+"') no-repeat center center; background-size: cover;")}}),achievements:new a(g,{showBadge:function(e){this.setAttribute("style","background: url('img/profile/"+e+"') no-repeat center center; background-size: cover;")}}),ctdetailsevent:new o(d)}),d.template='<div id = "contactdetails"><div class="header blue-dark"><span class="subjectlbl" data-details="bind:innerHTML, username"></span></div><div class = "detail-contents"><div class = "contactessentials"><div class="avatar" data-basicinfo="bind:setAvatar, userid"></div><div class="basicinfo"><h2 data-basicinfo="bind:innerHTML,username"></h2><p data-basicinfo="bind:innerHTML, intro"></p></div><div class="contactdashboard"><div class="contactstats"><legend data-label="bind:innerHTML, stats"></legend><div class="userscore"><span class="ip" data-ctdetails="bind:innerHTML, ip"></span><span data-label="bind:innerHTML, ideafypoints"></span></div><table><tr class ="myids"><th data-label="bind:innerHTML, ideaslbl"></th><td data-ctdetails="bind: innerHTML, ideas_count"></td></tr><tr class ="myss"><th data-label="bind:innerHTML, sessionslbl"></th><td data-ctdetails="bind: innerHTML, sessions"></td></tr><tr class="myctcts"><th data-label="bind:innerHTML, contactslbl"></th><td data-ctdetails="bind: innerHTML, contacts"></td></tr><tr class="my2q"><th data-label="bind:innerHTML, toquestionslbl"></th><td data-ctdetails="bind: innerHTML, twoquestions_count"></td></tr></table></div><div class="contactbadges"><legend data-label="bind:innerHTML, achievements"></legend><p class="grade" data-stats="bind:innerHTML, title"></p><ul class="badges" data-grades="foreach"><li class="contactbadge"><div data-grades="bind:showBadge, badge"></div><label data-grades="bind:innerHTML, title"></label></li></ul><ul class="badges" data-achievements="foreach"><li class="contactbadge"><div data-achievements="bind:showBadge, badge"></div><label data-achievements="bind:innerHTML, label"></label></li></ul></div></div></div></div><div class = "contactnotes"><legend data-label="bind: innerHTML, mynotes"></legend><div id = "cancelnotes" class="invisible" data-ctdetailsevent="listen:mousedown, push; listen:mouseup, cancelNotes"></div><div id = "uploadnotes" class="invisible" data-ctdetailsevent="listen:mousedown, push;listen:mouseup, uploadNotes"></div><textarea id="ctnotes" class = "input" data-label="bind:placeholder,writesomething" data-basicinfo="bind: value, notes" data-ctdetailsevent="listen:input, displayNoteBtns"></textarea></div></div></div>',d.place(s.get("contactdetails")),d.updateContact=function(e){var t,s,i,n=v.get("connections"),a=n.length;for(t=0;a>t;t++)if(n[t].userid===e._id&&(n[t].username=e.username,n[t].firstname=e.firstname,n[t].lastname=e.lastname,n[t].intro=e.intro),"group"===n[t].type){for(s=n[t].contacts,i=0;i<s.length;i++)s[i].userid===e._id&&(s[i].username=e.username,s[i].firstname=e.firstname,s[i].lastname=e.lastname,s[i].intro=e.intro);n[t].contacts=s}v.set("connections",n),v.upload()},d.getUserInfo=function(e){r.getUserDetails(e,function(e){(e.username!==u.get("username")||e.firstname!==u.get("firstname")||e.lastname!==u.get("lastname")||e.intro!==u.get("intro"))&&d.updateContact(e),l.reset(e),l.set("sessions",l.get("su_sessions_count")+l.get("mu_sessions_count")),r.getGrade(e.ip,function(e){p.alter("push",e.grade),e.distinction&&p.alter("push",e.distinction)}),g.reset(e.achievements)})},d.reset=function(e){u.reset(e),p.reset([]),g.reset([]),u.get("notes")||u.set("notes",""),d.getUserInfo(e.userid)},d.displayNoteBtns=function(){document.getElementById("uploadnotes").classList.remove("invisible"),document.getElementById("cancelnotes").classList.remove("invisible")},d.hideNoteBtns=function(){document.getElementById("uploadnotes").classList.add("invisible"),document.getElementById("cancelnotes").classList.add("invisible")},d.push=function(e,t){t.classList.add("pushed")},d.uploadNotes=function(e,t){var s,i,n,a=v.get("connections"),o=a.length;for(document.getElementById("uploadnotes"),document.getElementById("cancelnotes"),s=0;o>s;s++)if(a[s].userid===u.get("userid")&&(a[s].notes=u.get("notes")),"group"===a[s].type){for(i=a[s].contacts,n=0;n<i.length;n++)i[n].userid===u.get("userid")&&(i[n].notes=u.get("notes"));a[s].contacts=i}v.set("connections",a),v.upload().then(function(){t.classList.remove("pushed"),d.hideNoteBtns()})},d.cancelNotes=function(e,t){var s=v.get("connections"),n=s.length;for(i=0;n>i;i++)s[i].userid===u.get("userid")&&u.set("notes",s[i].notes);t.classList.add("pushed"),d.hideNoteBtns()},d}});