/**
 * https://github.com/IDEAFY/Ideafy
 * Proprietary License - All rights reserved
 * Author: Vincent Weyl <vincent@ideafy.com>
 * Copyright (c) 2014 IDEAFY LLC
 */

define(["OObject","service/map","service/submenu","Amy/Stack-plugin","./profile/profile","./settings/settings","./about/about","service/config"],function(e,t,s,i,n,a,o,c){return function(){var r,l,d,u,p=new e,g=new i,m=c.get("user"),v=(c.get("observer"),function(e){g.getStack().show(e)});return p.plugins.add("dashboardstack",g),p.template='<div id="dashboard"><div id="dashboard-menu"></div><div class="stack" data-dashboardstack="destination"></div></div>',p.place(t.get("dashboard")),p.showMenu=function(){u.toggleActive(!0)},p.hideMenu=function(){u.toggleActive(!1)},p.reset=function(){u.reset(),r.reset(),l.reset()},u=new s(p.dom.querySelector("#dashboard-menu"),v),u.toggleActive(!1),r=new n,l=new a,d=new o,g.getStack().add("#profile",r),g.getStack().add("#settings",l),g.getStack().add("#about",d),m.get("resetPWD")?g.getStack().show("#settings"):g.getStack().show("#profile"),c.get("observer").watch("display-tutorials",function(){u.setWidget("#about"),g.getStack().get("#about").show("#tutorials")}),c.get("observer").watch("show-about",function(){u.setWidget("#about"),g.getStack().get("#about").show("#userguide")}),p}});