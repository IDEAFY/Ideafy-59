/*
 * https://github.com/IDEAFY/Ideafy
 * Proprietary License - All rights reserved
 * Author: Vincent Weyl <vincent@ideafy.com>
 * Copyright (c) 2014 IDEAFY LLC
 */

define(["Amy/Stack-plugin","./wbdefault","./wbmain","./wbpostit","./wbimport","./wbdrawing","Store"],function(e,t,s,i,n,a,o){function r(e,r,c,d){var l=new o([]),u=this;this.selectScreen=function(e,t){var s=u.getStack().get(e);s.reset&&s.reset(t),u.getStack().show(e)},this.exitScreen=function(e){r.getNbItems()?u.getStack().show("main"):u.getStack().show("default"),c.set(e,"inactive")},this.getContent=function(){return l},this.setSessionId=function(e){u.getStack().get("main").setSessionId(e),u.getStack().get("import").setSessionId(e),u.getStack().get("drawing").setSessionId(e)},this.setReadonly=function(e){u.getStack().get("main").setReadonly(e)},this.getStack().add("default",new t(e,d)),this.getStack().add("main",new s(r,c,this.selectScreen)),this.getStack().add("postit",new i(r,this.exitScreen)),this.getStack().add("import",new n(r,this.exitScreen)),this.getStack().add("drawing",new a(r,this.exitScreen)),this.init=function(){u.getStack().get("main").init(e)}}return function(t,s,i,n){return r.prototype=new e,new r(t,s,i,n)}});