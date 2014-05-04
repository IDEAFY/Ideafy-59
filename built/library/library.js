/**
 * https://github.com/IDEAFY/Ideafy
 * Proprietary License - All rights reserved
 * Author: Vincent Weyl <vincent@ideafy.com>
 * Copyright (c) 2014 IDEAFY LLC
 */

define(["OObject","Amy/Stack-plugin","service/map","service/submenu","./ideas/ideas","./sessions/sessions","./decks/decks","service/config"],function(e,t,n,i,s,a,o,r){return function(){var c,l,d,u,p=new e,g=new t,h=r.get("observer"),m=function(e){g.getStack().show(e)};return p.plugins.add("librarystack",g),p.template='<div id="library"><div class="cache"></div><div id="library-menu"></div><div class="stack" data-librarystack="destination"></div></div>',p.place(n.get("library")),p.showMenu=function(){u.toggleActive(!0)},p.hideMenu=function(){u.toggleActive(!1)},p.reset=function(){c.reset(),d.reset(),l.reset(),u.reset(),g.getStack().show("#ideas")},u=new i(p.dom.querySelector("#library-menu"),m),u.toggleActive(!1),c=new s,l=new a,d=new o,g.getStack().add("#ideas",c),g.getStack().add("#sessions",l),g.getStack().add("#decks",d),g.getStack().show("#ideas"),h.watch("display-doc",function(e,t){switch(t){case 6:var n=g.getStack().get("#ideas");n.searchIdea(e.substr(2)),g.getStack().getCurrentScreen()!==n&&g.getStack().show("#ideas");break;case 9:g.getStack().show("#decks")}}),p}});