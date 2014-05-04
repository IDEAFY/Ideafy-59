/**
 * https://github.com/IDEAFY/Ideafy
 * Proprietary License - All rights reserved
 * Author: Vincent Weyl <vincent@ideafy.com>
 * Copyright (c) 2014 IDEAFY LLC
 */

define(["OObject","service/config","Bind.plugin","CouchDBDocument","Store"],function(e,t,s,i,n){return function(){var a=new e,o=t.get("user"),c=new n;return a.plugins.add("eula",new s(c)),a.template='<div class="aboutcontent"><h4 data-eula = "bind:innerHTML, title"></h4><div data-eula="bind:innerHTML, body"></div></div>',a.fetch=function(e){var s=new i;s.setTransport(t.get("transport")),s.sync(t.get("db"),"EULA-PC").then(function(){s.get("default_lang")!==e&&s.get("translations")[e]?(c.set("title",s.get("translations")[e].title),c.set("body",s.get("translations")[e].body)):(c.set("title",s.get("title")),c.set("body",s.get("body"))),s.unsync()})},a.fetch(o.get("lang")),o.watchValue("lang",function(){a.fetch(o.get("lang"))}),a}});