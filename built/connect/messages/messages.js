/**
 * https://github.com/IDEAFY/Ideafy
 * Proprietary License - All rights reserved
 * Author: Vincent Weyl <vincent@ideafy.com>
 * Copyright (c) 2014 IDEAFY LLC
 */

define(["OObject","service/map","Bind.plugin","Event.plugin","Amy/Control-plugin","Amy/Stack-plugin","Store","service/config","service/avatar","service/utils","./message-detail","./newmessage","service/actionbar","Promise"],function(e,t,s,n,a,o,c,r,d,u,p,g,m,v){return function(){var h=new e,b=new a(h),f=new o,w=function(e){f.getStack().show(e)},y="#defaultPage",L=new e,k=new p(w),S=new g(w),T=new c([{name:"all",label:"allbtn",selected:!0},{name:"messages",label:"msgbtn",selected:!1},{name:"notifications",label:"notifbtn",selected:!1},{name:"unread",label:"unreadbtn",selected:!1}]),x=0,M=new c([]),q=r.get("labels"),C=null,A=r.get("user"),H=r.get("observer"),I=function(e){var t,s=T.get(e).name,i=A.get("notifications"),n=i.length,a=[];switch(s){case"messages":for(t=0;n>t;t++)"MSG"===i[t].type&&a.push(i[t]);break;case"notifications":for(t=0;n>t;t++)"MSG"!==i[t].type&&a.push(i[t]);break;case"unread":for(t=0;n>t;t++)"unread"===i[t].status&&a.push(i[t]);break;default:a=i}return a},D=function(e){var t=[],s=[];if(t=A.get("notifications").concat(),""===e)s=t,T.update(0,"selected",!0),x=0;else for(i=0,l=t.length;l>i;i++)JSON.stringify(t[i]).toLowerCase().search(e.toLowerCase())>-1&&s.push(t[i]);return s};return h.plugins.addAll({label:new s(q),sort:new s(T,{setLabel:function(e){this.innerHTML=q.get(e)},setSelected:function(e){e?this.classList.add("pressed"):this.classList.remove("pressed")}}),msg:new s(M,{setObject:function(e){var t=this.getAttribute("data-msg_id");switch(e){case"INV":this.innerHTML=M.get(t).username+q.get("INVObject");break;case"CXR":this.innerHTML=M.get(t).username+q.get("CXRobject");break;case"CXRaccept":this.innerHTML=M.get(t).username+q.get("acceptedCXR");break;case"CXRreject":this.innerHTML=M.get(t).username+q.get("rejectedCXR");break;case"CXCancel":this.innerHTML=M.get(t).username+q.get("canceledCX");break;case"DOC":this.innerHTML=M.get(t).username+q.get("sentdocmsg");break;case"2Q+":this.innerHTML=M.get(t).username+q.get("askednew");break;case"2C+":this.innerHTML=M.get(t).username+q.get("senttc");break;case"REF":this.innerHTML=M.get(t).username+q.get("joinedideafy");break;default:this.innerHTML=M.get(t).object}},date:function N(N){var e=new Date;if(N&&N[0]===e.getFullYear()&&N[1]===e.getMonth()&&N[2]===e.getDate()){var t=N[3],s=N[4],i=N[5];10>t&&(t="0"+t),10>s&&(s="0"+s),10>i&&(i="0"+i),this.innerHTML=t+":"+s+":"+i}else this.innerHTML=u.formatDate(N)},highlight:function(e){e&&"unread"===e?this.classList.add("unread"):this.classList.remove("unread")},setAvatar:function(e){var t,s;e&&(t=document.createDocumentFragment(),s=new d([e]),s.place(t),this.hasChildNodes()?this.replaceChild(t,this.firstChild):this.appendChild(t))}}),msglistevent:new n(h),msglistcontrol:b,msgdetailstack:f}),h.template='<div id="connect-messages"><div class="messages"><div class="header blue-light"><span data-label="bind: innerHTML, msglistheadertitle">My Messages</span><div class="option right" data-msglistevent="listen: mousedown, plus"></div></div><ul class="selectors" data-sort = "foreach"><li class="sort-button" data-sort="bind: setLabel, label; bind:setSelected, selected, bind: name, name" data-msglistevent="listen:mousedown, displaySort"></li></ul><input class="search" type="text" data-label="bind: placeholder, searchmsgplaceholder" data-msglistevent="listen: keypress, search"><div class="msglist overflow" data-msglistcontrol="radio:li,selected,mouseup,selectMsg"><ul data-msg="foreach"><li class="msg list-item" data-msglistevent="listen:mousedown, setStart; listen:dblclick, showActionBar"><div data-msg="bind:setAvatar, author"></div><p class="msg-author unread" data-msg="bind:highlight, status; bind:innerHTML, username">Author</p><div class="select-msg"></div><span class="date" data-msg="bind: date, date"></span><p class="msg-subject unread" data-msg="bind:highlight, status; bind:setObject, type">Subject</p></li></ul></div></div><div id="msg-detail" class="details" data-msgdetailstack="destination"></div></div>',h.place(t.get("connect-messages")),h.plus=function(){f.getStack().get("#newmsg").reset(),f.getStack().show("#newmsg")},h.displaySort=function(e,t){var s=t.getAttribute("data-sort_id");M.reset([]),f.getStack().show("#defaultPage"),x>-1&&T.update(x,"selected",!1),T.update(s,"selected",!0),x=s,M.reset(I(s))},h.search=function(e,t){13===e.keyCode&&(T.update(x,"selected",!1),x=-1,M.reset(D(t.value)))},h.selectMsg=function(e){var t=e.target.getAttribute("data-msg_id"),s=A.get("notifications");if("unread"===M.get(t).status){for(i=0,l=s.length;l>i;i++)if(JSON.stringify(s[i])===JSON.stringify(M.get(t))){index=i;break}M.update(t,"status","read"),s[index]=M.get(t),A.set("notifications",s),A.upload()}f.getStack().show("#msgdetail"),k.reset(M.get(t)),y="#msgdetail"},h.init=function(){M.reset(A.get("notifications")),h.cleanOld()},h.reset=function(){T.reset([{name:"all",label:"allbtn",selected:!0},{name:"messages",label:"msgbtn",selected:!1},{name:"notifications",label:"notifbtn",selected:!1},{name:"unread",label:"unreadbtn",selected:!1}]),h.init(),f.getStack().show("#defaultPage"),display=!1},h.getSelectedmsg=function(){var e=document.querySelector(".msg.selected"),t=-1;return e&&(t=e.getAttribute("data-msg_id")),t},h.cleanOld=function(){var e,t,s=new v,n=new Date,a=!1,o=A.get("notifications")||[],c=A.get("sentMessages")||[];for(i=o.length-1;i>=0;i--)e=new Date(o[i].date[0],o[i].date[1],o[i].date[2],o[i].date[3],o[i].date[4],o[i].date[5]),n.getTime()-e.getTime()>2592e6&&(o.pop(),a=!0);for(i=c.length-1;i>=0;i--)t=new Date(c[i].date[0],c[i].date[1],c[i].date[2],c[i].date[3],c[i].date[4],c[i].date[5]),n.getTime()-t.getTime()>2592e6&&(c.pop(),a=!0);return a?(A.set("notifications",o),A.set("sentMessages",c),A.upload().then(function(){s.fulfill()})):s.fulfill(),s},h.setStart=function(){C&&C.hide()},h.showActionBar=function(e,t){var s,i=t.getAttribute("data-msg_id"),n=!1;C&&C.getParent()===t&&(n=!0),n||(C=new m("message",t,M.get(i)),s=document.createDocumentFragment(),C.place(s),t.appendChild(s),n=!0)},L.template='<div class="msgsplash"><div class="header blue-dark"><span>'+r.get("labels").get("messageview")+'</span></div><div class="innersplash" data-labels="bind: innerHTML, messagecenter"></div></div>',L.plugins.add("labels",new s(q)),h.init(),f.getStack().add("#defaultPage",L),f.getStack().add("#msgdetail",k),f.getStack().add("#newmsg",S),f.getStack().show("#defaultPage"),A.watchValue("notifications",function(){var e,t=[];M.reset([]),t=I(x),M.reset(t),"#msgdetail"===f.getStack().getCurrentName()&&(e=h.getSelectedmsg(),e>-1?k.reset(M.get(e)):f.getStack().show("#defaultPage"))}),H.watch("display-message",function(e){var t=A.get("notifications");T.update(x,"selected",!1),"MSG"===t[e].type?(T.update(1,"selected",!0),x=1):(T.update(2,"selected",!0),x=2),t[e].status="read",A.set("notifications",t),A.upload(),M.reset([t[e]]),document.querySelector('li[data-msg_id="0"]').classList.add("selected"),b.init(document.querySelector('li[data-msg_id="0"]')),f.getStack().show("#msgdetail"),k.reset(t[e]),y="#msgdetail"}),H.watch("message-contact",function(e){S.reset(e),f.getStack().show("#newmsg")}),A.watchValue("lang",function(){var e;T.loop(function(t,s){t.selected&&(e=s)}),T.reset([{name:"all",label:"allbtn",selected:!0},{name:"messages",label:"msgbtn",selected:!1},{name:"notifications",label:"notifbtn",selected:!1},{name:"unread",label:"unreadbtn",selected:!1}]),T.update(e,"selected",!0)}),h}});