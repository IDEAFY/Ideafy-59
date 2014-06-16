/*
 * https://github.com/IDEAFY/Ideafy
 * Proprietary License - All rights reserved
 * Author: Vincent Weyl <vincent@ideafy.com>
 * Copyright (c) 2014 IDEAFY LLC
 */

define(["OObject","service/config","Bind.plugin","Store"],function(e,t,s,i){return function(){var n=new e,a=t.get("labels"),o=new i([{name:a.get("solene"),contrib:a.get("contribsolene")},{name:a.get("oliviers"),contrib:a.get("contribscherrer")},{name:a.get("vincent"),contrib:a.get("contribvincent")}]);return n.plugins.addAll({labels:new s(a),credits:new s(o)}),n.template='<div class="aboutcontent"><legend data-labels="bind:innerHTML, aboutlbl"></legend><p data-labels="bind:innerHTML, ideafydesc"></p><legend data-labels="bind:innerHTML, about-taiaut"></legend><p data-labels="bind:innerHTML, taiautdesc"></p><legend data-labels="bind: innerHTML, credits"></legend><p><ul data-credits="foreach"><li><span class="contributor" data-credits="bind:innerHTML, name"></span><span class="contribution" data-credits="bind:innerHTML, contrib"></span></li></ul></p></div>',n}});