/**
 * https://github.com/IDEAFY/Ideafy
 * Proprietary License - All rights reserved
 * Author: Vincent Weyl <vincent@ideafy.com>
 * Copyright (c) 2014 IDEAFY LLC
 */

define(["OObject","service/config","Bind.plugin","Store"],function(e,t,s,i){return function(){var n=new e,a=t.get("labels"),o=[{name:"brainstormtutorial",src:"http://app.ideafy.com:1664/tuto04.m4v"}],c=new i(o);return n.plugins.addAll({labels:new s(a),tuto:new s(c,{setName:function(e){this.innerHTML=a.get(e)}})}),n.template='<div class="aboutcontent"><ul data-tuto="foreach"><li><legend data-tuto="bind: setName, name"></legend><div class="videocontent"><video width = "640" height="480" controls="controls"><source data-tuto="bind:src,src" type="video/mp4" /></video></div></li></ul></div>',n}});