/**
 * https://github.com/IDEAFY/Ideafy
 * Proprietary License - All rights reserved
 * Author: Vincent Weyl <vincent@ideafy.com>
 * Copyright (c) 2014 IDEAFY LLC
 */

define(["OObject","service/map","Bind.plugin","Event.plugin","service/config","Store","lib/spin.min"],function(e,t,s,i,n,a,o){return function(){var l,d=new e,r=n.get("labels"),c=new a,u=n.get("user"),p=null,m=!1;return d.plugins.addAll({label:new s(r),model:new s(c,{setVisible:function(e){e?this.classList.remove("invisible"):this.classList.add("invisible")},setButton:function(e){e?this.setAttribute("style","display: inline-block;"):this.setAttribute("style","display:none;")},displayVote:function(e){var t=this.getAttribute("name"),s=c.get(t+"Votes"),i=this.querySelector(".yesvote"),n=this.querySelector(".novote");e?s.indexOf(u.get("_id"))>-1?n.classList.add("invisible"):i.classList.add("invisible"):(i.classList.remove("invisible"),n.classList.remove("invisible"))},setResult:function(e){this.innerHTML=e?r.get(e):""}}),event:new i(d)}),d.template='<div class = "confirm invisible"><legend><span data-label="bind:innerHTML, decidemsg"></span><span class="unanimity" data-label="bind: innerHTML, unanimity"></span></legend><div class="votingitem invisible" name="public" data-model="bind:setVisible,public; bind: displayVote, publicVote"><div class="sessionquestion" data-label="bind:innerHTML,setpublic"></div><div class = "votingbuttons" name="public"><span class="yesvote" data-label="bind:innerHTML, yeslbl" data-event="listen: mousedown, push; listen: mouseup, vote">Yes</span><span class="novote" data-label="bind:innerHTML, nolbl" data-event="listen: mousedown, push; listen: mouseup, vote">No</span></div><div class="votingresult" data-model="bind: setResult, publicResult"></div></div><div class="votingitem invisible" name = "replay" data-model="bind:setVisible,replay; bind: displayVote, replayVote"><div class="sessionquestion" data-label="bind:innerHTML,enablereplay"></div><div class = "votingbuttons" name="replay"><span class="yesvote" data-label="bind:innerHTML, yeslbl" data-event="listen: mousedown, push; listen: mouseup, vote">Yes</span><span class="novote" data-label="bind:innerHTML, nolbl" data-event="listen: mousedown, push; listen: mouseup, vote">No</span></div><div class="votingresult" data-model="bind: setResult, replayResult"></div></div><div id="muvotespinner"></div><div class="option left votebutton" data-event="listen:mousedown, press; listen:mouseup, submit" data-model="bind:setButton, submit" data-label="bind: innerHTML, submitlbl">Submit</div><div class="option right votebutton" data-event="listen:mousedown, press; listen:mouseup, skip" data-model="bind:setButton, skip" data-label="bind:innerHTML, skiplbl">Skip</div></div>',d.press=function(e,t){e.stopPropagation(),t.classList.add("pressed")},d.push=function(e,t){var s=t.parentNode,i=s.getAttribute("name");c.get(i+"Vote")||c.get(i+"Result")||t.setAttribute("style","-webkit-box-shadow: 0px 0px 2px #657B99;")},d.vote=function(e,t){var s=t.parentNode,i=s.getAttribute("name");if(t.setAttribute("style","-webkit-box-shadow: none;"),c.get("leader"))t.classList.toggle("voted"),t.classList.contains("yesvote")?t.classList.contains("voted")?(c.set(i+"Votes",[u.get("_id")]),s.querySelector(".novote").classList.remove("voted")):c.set(i+"Votes",[]):(s.querySelector(".yesvote").classList.remove("voted"),c.set(i+"Votes",[])),c.get("publicVotes").length||c.get("replayVotes").length?c.set("submit",!0):c.set("submit",!1);else if(!c.get(i+"Vote")){var n=c.get(i+"Votes");t.classList.contains("novote")?("public"===i&&c.set("publicResult","rejected"),"replay"===i&&c.set("replayResult","rejected")):(n.push(u.get("_id")),c.set(i+"Votes",n),n.length===p.get("participants").length+1&&("public"===i&&c.set("publicResult","accepted"),"replay"===i&&c.set("replayResult","accepted"))),t.classList.add("voted"),c.set(i+"Vote",!0),m?setTimeout(d.uploadVote,3e3):d.uploadVote()}},d.uploadVote=function(){var e;c.get("leader")||(e=p.get("vote"),m=!0,e.public&&(e.publicVotes=c.get("publicVotes"),e.publicResult=c.get("publicResult")),e.replay&&(e.replayVotes=c.get("replayVotes"),e.replayResult=c.get("replayResult")),p.set("vote",e),p.upload().then(function(){m=!1},function(e){console.log(e)}))},d.submit=function(e,t){var s={};t.classList.remove("pressed"),c.set("skip",!1),c.set("submit",!1),["public","replay"].forEach(function(e){c.get(e+"Votes").length?(s[e]=!0,s[e+"Votes"]=[u.get("_id")]):c.get(e+"Vote")?c.set(e+"Result","rejected"):c.set(e,!1),c.set(e+"Vote",!0)}),p.set("vote",s),p.upload().then(function(){console.log("VOTE : leader upload successful")},function(e){console.log(e)})},d.skip=function(e,t){t&&t.classList.remove("pressed"),d.close(),l({visibility:"private",replay:!1})},d.close=function(){t.get("cache").classList.remove("votingcache"),d.dom.classList.add("invisible"),p=null},d.isActive=function(){return!(null===p)},d.show=function(){t.get("cache").classList.add("votingcache"),d.dom.classList.remove("invisible")},d.reset=function(e,s){var i;p=e,l=s,c.reset({}),p.get("vote")&&c.reset(p.get("vote")),p.get("initiator").id===u.get("_id")?(c.set("leader",!0),c.set("submit",!1),c.set("skip",!0),["public","replay"].forEach(function(e){c.set(e,!0),c.set(e+"Vote",!1),c.set(e+"Votes",[]),c.set(e+"Result","")})):(c.set("leader",!1),c.set("submit",!1),c.set("skip",!1)),c.set("publicVote",!1),c.set("replayVote",!1),d.show(),i=p.watchValue("vote",function(e){var s={},n=new o({lines:10,length:8,width:4,radius:8,top:10});exitVote=function(){p.unwatch(i),n.spin(d.dom.querySelector("#muvotespinner")),setTimeout(function(){n.stop(),t.get("cache").classList.remove("votingcache"),l&&l(s)},5e3)},e&&e.public&&e.replay?(c.set("publicResult",e.publicResult),c.set("replayResult",e.replayResult),e.publicResult&&e.replayResult&&(s.visibility="accepted"===e.publicResult?"public":"private",s.replay="accepted"===e.replayResult?!0:!1,exitVote())):e&&e.public?(c.set("publicResult",e.publicResult),s.replay=!1,e.publicResult&&(s.visibility="accepted"===e.publicResult?"public":"private",s.replay=!1,exitVote())):e&&e.replay&&(c.set("replayResult",e.replayResult),s.visibility="private",e.replayResult&&(s.replay="accepted"===e.replayResult?!0:!1,exitVote()))})},d}});