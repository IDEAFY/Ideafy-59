/**
 * https://github.com/IDEAFY/Ideafy
 * Proprietary License - All rights reserved
 * Author: Vincent Weyl <vincent@ideafy.com>
 * Copyright (c) 2014 IDEAFY LLC
 */

define(["OObject","service/config","Bind.plugin"],function(e,t,s){return function(i,n){var a=new e,o="",d=t.get("labels"),r="quick";return a.plugins.add("labels",new s(d)),r=n?n:"quick",o="scenario"===i?r+"scenariohelp":r+"ideahelp",a.template='<div id="whiteboard-default" class="defaultcontent"><div class="doctor-deedee"></div><div class="help" data-labels="bind:innerHTML,'+o+'"></div></div>',a}});