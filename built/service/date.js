/**
 * https://github.com/IDEAFY/Ideafy
 * Proprietary License - All rights reserved
 * Author: Vincent Weyl <vincent@ideafy.com>
 * Copyright (c) 2014 IDEAFY LLC
 */

define(["OObject","Bind.plugin","Event.plugin","service/config","Store","service/utils"],function(e,t,n,s,a){function o(){var e=this,o=s.get("labels"),r=new a({day:"",month:"",year:""});e.plugins.addAll({label:new t(o),model:new t(r,{setYear:function(e){var t="",n=(new Date).getFullYear(),s=this;if(!s.firstChild){for(i=0;10>i;i++)t+="<option>"+(n+i)+"</option>";this.innerHTML=t}e&&(this.selectedIndex=e-n)},setMonth:function(e){var t="",i=["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"],n=this;n.firstChild||(i.forEach(function(e){t+="<option>"+o.get(e)+"</option>"}),this.innerHTML=t),e&&(this.selectedIndex=e)},setDays:function(e){var t,n="";for(t=1===e?0===r.get("year")%4?29:28:[3,5,8,10].indexOf(e)>-1?30:31,i=0;t>i;i++)n+=9>i?"<option>0"+(i+1)+"</option>":"<option>"+(i+1)+"</option>";this.innerHTML=n,this.selectedIndex=r.get("day")&&r.get("day")<=t?r.get("day")-1:0},setDay:function(e){e&&(this.selectedIndex=e-1)}}),event:new n(this)}),e.template='<div class = "dateui"><div class="dateicon"></div><select name="day" data-model="bind:setDays, month; bind:setDay, day" data-event="listen: change, setDay"></select><select name="month" data-model="bind:setMonth, month" data-event="listen: change, setMonth"></select><select name="year" data-model="bind:setYear, year" data-event="listen: change, setYear"></select></div>',e.getDate=function(){return[r.get("year"),r.get("month")+1,r.get("day")]},e.getDatestamp=function(){var e;return e=r.get("year")+"/"+(parseInt(r.get("month"),10)+1)+"/"+r.get("day"),new Date(e).getTime()},e.setDate=function(e,t,i){var n=new Date,s=e||n.getFullYear(),a=t||n.getMonth(),o=i||n.getDate();r.set("year",s),r.set("month",a),r.set("day",o)},e.setDay=function(e,t){r.set("day",parseInt(t.value))},e.setMonth=function(e,t){r.set("month",t.selectedIndex)},e.setYear=function(e,t){r.set("year",parseInt(t.value))},e.reset=function(t,i,n){var s=t||null,a=i||null;_d=n||null,e.setDate(s,a,_d)},e.render(),e.reset()}return function(){return o.prototype=new e,new o}});