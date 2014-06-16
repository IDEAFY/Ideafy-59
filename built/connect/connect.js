/*
 * https://github.com/IDEAFY/Ideafy
 * Proprietary License - All rights reserved
 * Author: Vincent Weyl <vincent@ideafy.com>
 * Copyright (c) 2014 IDEAFY LLC
 */

define(["OObject","service/map","Amy/Stack-plugin","service/submenu","./contacts/contacts","./messages/messages","./twocents/mytwocents","service/config"],function(e,t,s,i,n,a,o,r){return function(){var c,d=new e,l=new s,u=r.get("observer"),p=function(e){l.getStack().show(e)},g=new a,m=new n,v=new o;return d.plugins.add("connectstack",l),d.template='<div id="connect"><div id="connect-menu"></div><div class="stack" data-connectstack="destination"></div></div>',d.place(t.get("connect")),d.showMenu=function(){c.toggleActive(!0)},d.hideMenu=function(){c.toggleActive(!1)},d.reset=function(){c.reset(),m.reset(),g.reset(),v.reset(),l.getStack().show("#messages")},c=new i(d.dom.querySelector("#connect-menu"),p),c.toggleActive(!1),g.init(),m.init(),l.getStack().add("#messages",g),l.getStack().add("#contacts",m),l.getStack().add("#twocents",v),l.getStack().show("#messages"),u.watch("display-message",function(){c.setWidget("#messages")}),u.watch("display-twoq",function(){c.setWidget("#twocents")}),u.watch("display-twoc",function(){c.setWidget("#twocents")}),u.watch("message-contact",function(){c.setWidget("#messages")}),d}});