/**
 * https://github.com/IDEAFY/Ideafy
 * Proprietary License - All rights reserved
 * Author: Vincent Weyl <vincent@ideafy.com>
 * Copyright (c) 2014 IDEAFY LLC
 */

define(["Store","SocketIOTransport","CouchDBDocument","Observable"],function(e,t,i,n){var s,a,o,r,l,c=new e,d="",u=[];return this.reset=function(){s="http://ideafy59.ideafy.com:5959",d="1.2.4",l=io.connect(s),a=new t(l),o=new i,r=new n,u=["bus","mkt","notes","arch","spec","planning"],_catColors=["#9ac9cd","#f27b3d","#bd262c","#5f8f28","#657b99","#a000a1"],o.setTransport(a),c.reset({location:s,version:d,socket:l,transport:a,db:"ideafy",user:o,observer:r,cat:u,catColors:_catColors,polling_interval:6e4,userTemplate:{lastname:"",firstname:"",address:{street1:"",street2:"",zip:null,state:"",city:"",country:""},gender:1,lang:"en-us",birthdate:[],connections:[],taiaut_decks:["INT"],custom_decks:[],categories:[],calendar:[],active_deck:"INT",occupation:{situation:"",job:"",organization:""},family:{couple:null,children:null},leisure_activities:[{name:"",comment:""},{name:"",comment:""},{name:"",comment:""}],interests:[{name:"",comment:""},{name:"",comment:""},{name:"",comment:""}],type:7,notifications:[],sentMessages:[],facebook:"",twitter:"",gplus:"",linkedin:"",username:"",sessionInProgress:{},organization:"",rated:[],rated_ideas:[],favorites:[],ip:0,picture_file:"img/avatars/deedee0.png",intro:"Ideafyer",title:null,achievements:[],ideas_count:0,su_sessions_count:0,mu_sessions_count:0,twocents_count:0,twoquestions_count:0,tutorial_complete:!1,profile_complete:!1,news:[],twocents:[],twoquestions:[],"public-favorites":[],"library-favorites":[],settings:{notifyPopup:!0,useascharacter:!1,ccme:!1,privacy_lvl:0,showTips:!0,startupScreen:"#public",listSize:null,polling_interval:6e4,contentLang:""},online:!1},ideaTemplate:{title:"",sessionId:"",sessionReplay:!1,authors:[],description:"",solution:"",creation_date:[],character:"",problem:"",lang:"en-us",context:"",techno:[],type:6,sharedwith:[],modification_date:[],inspired_by:"",visibility:"private",votes:[],rating:"",authornames:"",twocents:[],attachments:[]},TQTemplate:{author:[],question:"",creation_date:[],lang:"en-us",type:10,modification_date:[],votes:[],rating:"",username:"",twocents:[]},sessionTemplate:{title:"",description:"",initiator:{id:"",username:"",picture_file:""},participants:[],date:[],startTime:null,resumeTime:null,duration:null,elapsedTime:0,elapsedTimers:{},mode:"",type:8,deck:"",status:"in progress",step:"",lang:"en-us",characters:[],contexts:[],problems:[],scenarioWB:[],scenario:[],techno:[[]],ideaWB:[],idea:[],score:0,sessionReplay:!1},avatars:new e({}),avatar:null,defaultLabels:{language:"en-us",outdated:"Your version is outdated and some features may not work properly. Please update Ideafy",emailplaceholder:"Email",passwordplaceholder:"Password",repeatpasswordplaceholder:"Confirm password",loginbutton:"Log in",newuserbutton:"New user",invalidlogin:"Invalid username or password",missingloginparam:"Please enter both username and password or register",signupmissingemail:"Please enter your email address in the field above",signupmissingpwd:"A password is required",signupmissingpwdok:"Please confirm your password",signupmissingfn:"Please enter your first name",signupmisingln:"Please enter your last name",signupinvalidemail:"Invalid email address",signuppwdnomatch:"Passwords do not match",signupwelcomeobject:"Welcome to Ideafy",signupwelcomebody:"Thank you for trying Ideafy. We hope you'll enjoy it. We designed it so you can manage ideas that matter to you or just play around. But don't keep what you're doing to yourself.",signupbutton:"Sign up",Initialization:"Initializing user data. Please wait ...",firstnameplaceholder:"First name",lastnameplaceholder:"Last name",createidealbl:"Enter a new idea",createdecklbl:"Create a new deck",ideatitleplaceholder:"Enter a title for your idea",ideadescplaceholder:"Enter a description of your idea in non technical terms",decktitleplaceholder:"Enter a title for your deck",deckdescplaceholder:"Enter a description of your deck",ideasolplaceholder:"Describe how your idea would work, what components, products, services or technologies you would  use",privatelbl:"Private",publiclbl:"Public",ideavisiblelbl:"Your idea is :",setideavisiblelbl:"Change status :",ideafyreplaylbl:"Ideafy Replay is :",ideafysetreplaylbl:"Change Ideafy Replay status :",enabledreplaylbl:"Enabled",disabledreplaylbl:"Disabled",enablereplaylbl:"Enable",disablereplaylbl:"Disable",oklbl:"Ok",continuelbl:"Continue",setpublicquestion:"Warning, every Ideafy user will be able to view your idea. This operation is irreversible. Do you want to proceed?",publicideasheadertitle:"Public Ideas",publicdetailsheadertitle:"Idea overview",searchpublicplaceholder:"Search public ideas...",ideadetailsheadertitle:"Idea Overview",idealistheadertitle:"My Ideas",searchprivateplaceholder:"Search your ideas...",modifyidealbl:"Modify your idea",sendidealbl:"Email your idea",sharedwith:"Shared with ",ideafyer:" Ideafyer",ideafyers:" Ideafyers",votebuttonlbl:"Vote",novotesyet:"No vote yet",onevote:"1 vote",votes:"votes",ideawrotelbl:" wrote : ",twocentcommentlbl:"commented :",youwrotelbl:"wrote :",theywrotelbl:"wrote :",youcommentedlbl:"commented :",youlbl:"You",hidetwocentreplies:"Hide replies",showonetcreply:"Reply",showtcrepliesbefore:"",showtcrepliesafter:" Replies",twocentreplycommentlbl:"replied :",yourepliedlbl:"replied :",addtwocentplaceholder:"Add your two cents",addtwocentreplyplaceholder:"Respond to this comment",twocentcreationdate:"Creation date: ",twocentmodificationdate:"Last modified: ",cancellbl:"Cancel",publishlbl:"Publish",savelbl:"Save",titlefield:"Title field",descriptionfield:"Description field",solutionfield:"Solution field",emptyfielderror:" cannot be left empty",somethingwrong:"Something went wrong, please try again later",thankyou:"Thank you",loadingmessage:"Application loading, please wait...",maintenancemessage:"We're sorry. The server is currently unavailable. Please come back later.","library-ideas":"My Ideas","library-sessions":"My Ideafy Sessions",sbytitle:"Session title",sbydate:"Date",sbyidea:"Idea title",sbyscore:"Score",searchsessions:"Search previous sessions...",foundlbl:"Found",matchingsessions:"matching session(s)",noideayet:"---",completed:"completed",inprogress:"in progress",noscore:"no score yet",deletereplay:"This session has the Ideafy replay feature enabled. Are you sure you want to delete it?","library-decks":"My Ideafy decks",brainstormheadertitle:"Brainstorm",brainstormchoosemode:"Choose your Ideafy mode",continuesession:"Continue last session",quickbmode:"Quick mode session",quickstart:"Describe your session",quickstarthelp:"<h2>Why is this step important?</h2><p>Giving your session a name and other background information will make it easier to retrieve later on from your library. Besides, it's always interesting to keep track of the particular context in which ideas or other contents were generated. If you are setting up a multi-user session, this will provide important context information to invitees and may persuade them to join.</p>",mustarthelp:"<h2>Multi-user housekeeping rules</h2><p>The session leader sets the objectives of a session and facilitates the session. He/she needs to set the pace of the brainstorming and be a good coach, listening to participant inputs and not imposing his/her views. Fostering good teamwork and having fun is as important for the leader as being creative.</p><p>Remember : if the session leader exits or if all participants leave the session before it is over (in the summary step) the session will end and all the current work will be lost.</p>",quickstarttitle:"Name your session",quickstarttitleplaceholderpre:"",quickstarttitleplaceholderpost:"'s session",quickstartdesc:"Enter a description of your session",quickstartdescplaceholder:"Date, context, purpose, ...",nextbutton:"Next",finishbutton:"Ready",quicksetup:"Set up a situation",quicksetuphelp:"<h2>Setting the stage</h2><p>This step lets you setup a random situation. Draw and select one card of each of the following categories: character, context, problem. They will be the starting point of your session. You can zoom in on each card to get additional information, select a different one by clicking on the deck icon at the top or accept it (thumbs-up button).</p><p>Which is it going to be ? Will you let fortune decide what situation you are going to deal with or will you work the stacks until you get one you are comfortable with? Ideafy encourages you to pick random situations because they force you to think outside the box.</p><p>Note that when you start a <i>Custom session</i> you can specify one or more of your starting cards to address specific situations.</p>",musetuphelp:"<h2>Setting the stage</h2><p>It is up to the session leader to draw cards of each type and to validate the selected cards by pushing the thumbs-up button.</p><p>Participants are able to view each card that is drawn and use the chat interface to provide feedback.</p><p>Select cards that are inspiring or that you can tie to the objectives of your session. Remember these cards can set your thoughts in the right direction to formulate problems or use cases and ultimately come up with an original idea.</p>",credits:"Credits : ",source:"Source : ",dyknow:"Did you know ?",agelbl:" years old",hobbieslbl:"Leisure activities",interestslbl:"Centers of interest",commentslbl:"Comments",singlelbl:"single",marriedlbl:"married",divorcedlbl:"divorced",widowlbl:"widow",nochildlbl:"no children",onechildlbl:" child",childrenlbl:" children",siblingslbl:" siblings",onesiblinglbl:" sibling",quickscenario:"Write your story",quickscenariohelp:"<p>This is your <strong>whiteboard.</strong></p><p>Now is the time to show your creativity and imagination. The cards you just picked give you a scope, a set of directions to project your thoughts. Use them as hints but do not feel overly constrained: they are here to help you <strong>write your own story and describe your own use case</strong>.</p><p>Finding the problem to solve is often the most important step of an innovation. So get started and use the tools below to <strong>post any thought, drawing or picture that will help you focus on a story.</strong></p><br><p>When you are done, click on the <strong>ready</strong> button at the bottom to write up your story.</p>",muscenariohelp:"<p>This is your shared whiteboard. Each participant may add new notes, pictures or drawing in relation to the scope defined by the cards drawn during the previous phase.</p><p>Once the leader feels there is enough material to start writing up a story, he/she may push the finish button only he/she can see at the bottom of the toolbar. Only the leader can fill the scenario template. Other participants will be able to see what the leader types and to help out by making suggestions in the chat window. Once the scenario is complete the leader can press net to proceed to the next step.</p>",choosecolorlbl:"Choose a color",importlbl:"Choose a picture",importpiclbl:"Choose a picture",importcameralbl:"Take a picture",pencilsizelbl:"Size",pencilcolorlbl:"Color",drawbgcolorlbl:"Background",cleardrawinglbl:"Clear",storytitleplaceholder:"Enter the title of your story",storydescplaceholder:"Tell your story, describe the problem your character is facing",storysolplaceholder:"How would you plan to fix this problem ?",quicktech:"Assign technologies",quicktechhelp:"<h2>Draw technologies</h2><p>The next phase of your session consists in finding a way to implement your solution using state of the art technologies. In this step you will draw three technology cards that you will try to include in your design.</p>",mutechhelp:"<h2>Draw technologies</h2><p>As in the setup phase it is up to the leader to draw technology cards and validate those selected by the team for this session. Remember :  finding a way to integrate random technologies in your solution forces you to think outside the box and come up with original and innovative designs.</p>",tech1lbl:"Techno 1",tech2lbl:"Techno 2",tech3lbl:"Techno 3",scenariolbl:"Scenario",storytitlelbl:"Your Story",cdtitlelbl:"Title : &nbsp",scenariodesclbl:"Scenario description",soldesclbl:"Solution description",quickidea:"Describe your idea",quickideahelp:"<p>Welcome back to your <strong>whiteboard.</strong></p><p>Your goal now is to try to apply the technologies that you just picked to design a solution to the use case described in your scenario.</p><p>Again do not feel too constrained: at this stage you can either alter your scenario to accomodate a technology, add additional technologies to the ones you have drawn to complete your solution or skip some of these if they do not fit in your design.</p><p>You are almost done: at the end of this step you will be able to refine your use case and turn it into an <strong>idea</strong>. You will be asked to provide a description in layman terms and also to describe how you would implement it with your chosen technologies.</p><br><p>When you are done, clik on the <strong>ready</strong> button at the bottom to write up your story.</p>",muideahelp:"<p>Welcome back to your <strong>whiteboard.</strong></p><p>Your goal now is to try to apply the technologies that you just picked to design a solution to the use case described in your scenario.</p><p>Do not feel too constrained: at this stage you can either alter your scenario to accomodate a technology, add additional technologies to the ones you have drawn to complete your solution or skip some of these if they do not fit in your design.</p><p>You are almost done: at the end of this step you will be able to refine your use case and turn it into an <strong>idea</strong>. As in the scenario phase it is up to the leader to display and complete the idea template.</p><br><p>When the leader clicks on the next button he can have the team vote on making the idea public and/or on enabling viewers (other than the participants) to view the session details via Ideafy replay. In both cases all of the participants need to agree. One negative vote and the proposal is rejected.</p>",quickwrapup:"Summary",quickstepstart:"Session description",quickstepsetup:"Setup",quickstepscenario:"Scenario",quicksteptech:"Technologies",quickstepidea:"Solution",quickstepwrapup:"Summary",congratulations:"Congratulations !",sessioncompleted:"You successfully completed your Ideafy session",ideatitlelbl:"Your Idea",scenarioheader:"Scenario",scenariosolution:"Solution",ideadescription:"Idea description",ideaimplementation:"Technical implementation",yourtime:"Your time",yourscore:"Your score",musession:"Multi-user session",customsession:"Custom session",ideafytutorial:"ideafy tutorial","connect-contacts":"Contacts","connect-messages":"Messages","connect-twocents":"Two cents","dashboard-profile":"My profile","dashboard-settings":"Settings","dashboard-about":"About Ideafy",tolbl:"To : ",subjectlbl:"Subject : ",yourmessage:"Your message to ",sentok:" has been sent.",sentdocmsg:" sent you an Ideafy document",notavalidaddress:" is not a valid email address",norecipient:"No email address specified",sendlbl:"Send",sharelbl:"Share",msglistheadertitle:"My Messages",notificationlbl:"Notifications",allbtn:"View all",msgbtn:"Messages",notifbtn:"Notifications",unreadbtn:"Unread",searchmsgplaceholder:"Search ...",messageview:"Message panel",replyalllbl:"Reply all",forwardlbl:"Forward",deletelbl:"Delete",newmsg:"New message",cclbl:"Cc :",tocontactlbl:"Contact :",entersubjectlbl:"Please enter a subject",notavalidcontact:" is not a contact",messagesentok:"Your message has been sent",on:"On ",contactview:"Contact panel",contactlistheadertitle:"My Contacts",usrbtn:"Users",grpbtn:"Groups",newcontactlbl:"New contact",addcontactnow:"Add your contact now",lookup:"Or look up the Ideafy database",beforecount:"The <strong>Ideafy community</strong> now counts <strong>",aftercount:" <strong>users </strong> merrily crafting and exchanging ideas.<br>Look up your acquaintances and friends in the community and connect.",addcontactrightintro:"Building up your address book is the best and fastest way to increase exposure of your ideas and thoughts, but also to get access to a much broader content.",searchcontactplaceholder:"Enter email address of the person you wish to connect with ...",clearemailfirst:"Please clear the email field first",needbothfnln:"Both first and last names are required",selectcontact:"Select contact and press + to invite",noentryfound:"No matching entry in the database",cannotaddself:"You cannot add a connection to yourself",alreadyconnected:" is already a contact",alreadysentCXR:"You already sent a connection request to ",CXRobject:" wants to be a connection",CXRsent:"Your connection request has been sent",addamessage:"Add a message",accept:"Accept",reject:"Reject",acceptedCXR:" has accepted your connection request",rejectedCXR:" has declined your connection request",CXRaccepted:"Request accepted, ",CXRrejected:"Contact request rejected",isnowacontact:" is now a contact",isnolongeracontact:" is no longer a contact",canceledCX:" has canceled your connection",newfolderlbl:"New group",groupnamelbl:"Group name",groupdesclbl:"Group description",colortouch:"A colorful touch is always nice","char":"Character",context:"Context",problem:"Problem",techno:"Technology",grpcontacts:"Group contacts",addgrpcontacts:"Add contacts",nogrpname:"Please enter a group name",nogrpintro:"Please provide a group description",grpnameexists:"A group with this name already exists",nocontactselected:"Please add at least one contact to your group",profilelbl:"My Profile",aboutlbl:"About Ideafy",settingslbl:"Application parameters",completionprefix:"Your profile is ",completionsuffix:"% complete",info:"information",leaderboard:"leaderboard",enterbirthdate:"Provide your date of birth",entergender:"Indicate your gender",enterfamily:"Complete your family status",enteraddress:"Specify your address",enterintro:"Change your introduction",enteroccupation:"Describe your occupation",enterleisure:"Provide at least two leisure activities",enterinterest:"Provide at least two areas of interest",entersocialnw:"Add a social network",enterownpic:"Customize your avatar",completeprofile:"<i>Complete your profile</i>",mystatslbl:"My Stats",ideaslbl:"Public Ideas",sessionslbl:"Sessions",contactslbl:"Contacts",toquestionslbl:"Twoquestions",recentactivitylbl:"Recent Activity",enterednewidea:"You entered a new idea: ",reachedrank:"Congratulations ! You made a new rank :",gotaward:"You received an award : ",posted2q:"You posted a TwoQuestion :",commentedon:"You commented on : ",by:" by ",profileintro:"Profile introduction",shortprofiledesc:"Short profile description",day:"Day",dob:"Date of birth",jan:"January",feb:"February",mar:"March",apr:"April",may:"May",jun:"June",jul:"July",aug:"August",sep:"September",oct:"October",nov:"November",dec:"December",year:"Year",mailaddress:"My Address",street:"Street",city:"City",state:"State",zip:"ZIP code",country:"Country",myfamily:"My Family",single:"Single",married:"Married",divorced:"Divorced",widow:"Widow",relation:"In a couple",children:"Children",myoccupation:"My Occupation",student:"Student",active:"Active",retired:"Retired",unemployed:"Unemployed",stayathome:"Stay at home parent",jobtitle:"Job title",organization:"Organization",name:"Name",comment:"Comment",field:"Field",updatelbl:"Update",selectavatar:"Or select an avatar",uploadcomplete:"Upload complete",mynotes:"My Notes",writesomething:"Write something",stats:"Stats",achievements:"Achievements",decklistheadertitle:"My Decks",ideafypoints:" Ideafy Points",version:"Version : ",groupupdated:"Group updated",socialnwlbl:"Social networks",designedby:"Designed by : ",mtcheadertitle:"My Two Cents Wall",userpref:"User Preferences",publicwallsettings:"Public wall settings",brainstormsettings:"Brainstorm Settings",aboutIdeafy:"About Ideafy",faq:"FAQ",tutorials:"Tutorials",userguide:"User Guide",support:"Support",eula:"View License Agreement",page:"Page ",supportlegend:"A question or an issue?",supportplaceholder:"Enter your text and send",requestsent:"Thank you ! Your request has been sent",createquestion:"New TwoQuestion",questionplaceholder:"Enter your question",noquestion:"Please enter a question",lengthexceeded:"Maximum question length reached",characters:" characters",publicidealbl:"Public Idea",privateidealbl:"Private Idea",publicwarning:"<b>WARNING :</b> publishing your idea as a public one is irreversible. Visit Ideafy's dashboard to learn more.",uploadinprogress:"Upload in progress",notifyingcontacts:" Notifying contacts",askednew:" has asked a new TwoQuestion",melbl:"Me",nowconnected:" are now connected with ",noreplyyet:"No reply yet",mytwoquestions:"My TwoQuestions",mytwocents:"My Twocents",twoqprefix:"",twoqsuffix:"'s TwoQuestions",notwoqyet:"This Ideafyer has not posted any TwoQuestion yet",mytqdetailheader:"My TwoQuestion",tqheaderprefix:"",tqheadersuffix:"'s TwoQuestion",selecttq:"Select a contact to diplay TwoQuestions",mytwocentwall:"My Twocent Wall",sendtcprefix:"Send a Twocent to ",sendtcsuffix:"",twocentplaceholder:"Write your two cents",nomessage:"Please enter a message",sendinginprogress:"Sending in progress",senttc:" wrote you a new Twocent",selectall:"Select all",shareok:"Document shared successfully",signaturelbl:"Signature",sharing:"Sharing : ",messagecenter:"Message Center",twocentview:"Twocent Center",twocentcenter:"TwoQuestions & Twocents","about-taiaut":"About Taiaut",ideafydesc:"Look at Ideafy as your personal accelerator of ideas. You need ideas? Browse the database of ideas shared by other Ideafyers, ask your network or craft new ones using the embedded brainstorming engine. You have creative ideas? Ideafy makes it easy to share them with your network or to expose them to a community of innovative minds. Start discussions, ask questions or just give your two cents. Your Ideafyer friends want to find out what is on your mind. Ideation is fun. Get started and earn as many Ideafy Points and achievements as you can. Will you be the King of Ideas?",taiautdesc:"Ideafy was founded in February 2014. The aim of the company is to empower individuals and businesses to make the most of their innovation potential. Ideafy takes advantage of leading edge communication technologies to advance creative ideas and best innovation practices globally. The company is headquartered in Fresno, California",solene:"Solène Troussé",oliviers:"Olivier Scherrer",olivierw:"Olivier Wietrich",vincent:"Vincent Weyl",contribsolene:"User interface design",contribscherrer:"Framework design and development",contribwietrich:"User Interface development and software packaging",contribvincent:"Application conception & lead developer","public":"Public wall",library:"My Library",brainstorm:"Brainstorming center",connect:"Communication Center",dashboard:"Dashboard",notips:"Do not show tips at startup",showtips:"Show tips at startup",shownotif:"Show notification popup",setlang:"Choose your language",choosestartup:"Choose your startup screen",usechar:"Allow my profile to be used as an Ideafy character (my name will not be shown)",changepwd:"Change password",changelbl:"Change",brainstormtutorial:"Brainstorming tutorial",twoway:"Support is a two-way street",supportusintro:"Ideafy is a free application and we intend to keep it that way. We are committed to bringing you the best experience. Here are a few things you can do to help us support you better:",asanideafyer:"As an Ideafyer",asanexec:"As a business executive",asadev:"As a developer",asaninvest:"As an investor",ideafyerhelp:"Tell us how you feel by rating the application. If you encounter an issue please use the form above and we will try to fix it speedily. All your feedback is welcome and really helps us improve Ideafy.",exechelp:'If you feel like your business could become even more innovative by using such a platform internally or with your partners, we do propose standalone deployments or dedicated instances. This will not be free but we offer ultra competitive conditions. Contact us with the form above or via our <a onclick=\'window.open("http://www.taiaut.com", "_system");\'>website</a>',devhelp:'Ideafy exists thanks to three javascript libraries written by the company partners. They are released under MIT licenses and are available here : <a onclick=\'window.open("http://github.com/flams/emily", "_system");\'>emily</a>, <a onclick=\'window.open("http://github.com/flams/olives", "_system");\'>olives</a> and <a onclick=\'window.open("http://http://github.com/flams/CouchDB-emily-tools", "_system");\'>couchdb-emily-tools</a>. Check them out and if you are up for it help us make them even better.',investhelp:"We have plenty of ideas to expand the Ideafy service and we are constantly looking for funding opportunities. If you are interested, want to find out about our future and be part of it please contact us.",toc:"Table of contents",backtotop:"Back to top",choosepolling:"Poll new public ideas",everymin:"Every minute",everyfive:"Every 5 minutes",everyfifteen:"Every 15 minutes",never:"Disabled",nointernet:"Your device is not connected: please check your Internet access and try again.",schedmaintenance:"Scheduled maintenance",nextmaintenance:"The next maintenance will take place on : ",startnewmub:"Start a new session",joinmub:"Join a session",selectmode:"Select mode",roulette:"Roulette",campfire:"Campfire",boardroom:"Boardroom",rouletteinfo:"Any other Ideafyer may join this session",campfireinfo:"Anyone from your contact list may join this session (no notification)",boardroominfo:"Invitation only: invited contacts are notified and may join this session",clear:"Clear",create:"Create",nofriendtoinvite:"No contact to invite: please add contacts to your list or select an other mode",inviteatleastone:"You must select at least one contact to invite",providesessioninfo:"You must enter a meaningful title and description",sendinginvites:"Sending invitations...",invitesent:"Invitations sent",INVObject:" invited you to an Ideafy session",nolongerjoin:"You can no longer join this session : it is already underway or completed.",clicktojoin:"Push the button below to join session.",selectsession:"Select a session",participantleave:"Are you sure you want to leave? You will not be able to re-join nor will you get credited for any outcome  of the session",leaderleave:"Are you sure you want to cancel this session? This will end it for all participants.",canceledbyleader:"Session canceled by leader: ending now",participantsleft:"All participants have left: the session is canceled",waitingroomlbl:"Waiting room",joinedsession:"<i>You joined this session.</i>",deletingsession:"Deleting session : ",participants:"Participants",startbutton:"Start",joinbutton:"Join",nosessionfound:"No session found",allmodes:"All modes",all:"All",mode:"Mode",lang:"Lang",title:"Title",leader:"Session leader",sessionfull:"The session is full",sessionstarted:"This session is already started",sessiondeleted:"This session has been canceled",chatmsg0:" has initiated the session",chatmsg1:" has joined the session",chatmsg2:" has left the session",chatmsg3:" has canceled the session",chatmsg4:"Your session is starting now",chatmsg5:"Beginning new step : ",chatmsg6:"This concludes the current step. Moving on to the next screen...",chatmsg7:"Session completed",typemsg:"Enter your text",said:" said :",noresult:"No result found",clicktoview:"Press the button below or visit your library to view",skiplbl:"Skip",submitlbl:"Submit",decidemsg:"Decide how you want to share your work",unanimity:"(unanimity is required)",setpublic:"Make the idea public",enablereplay:"Enable session replay",yeslbl:"Yes",nolbl:"No",accepted:"ACCEPTED",rejected:"REJECTED",post:"Post","import":"Import",draw:"Draw",invitesyou:" invites you to join the Ideafy community",invitebody:"<p style='background: whitesmoke; font-family=helvetica; font-size=24px; text-align=justify;'><b>Take advantage of this invitation! Get Ideafy now and join the fast growing online community of Ideafyers. Compete for best idea, most creative mind and many other exciting challenges. Collaborate with your friends, colleagues or family to desgin and share ground-breaking ideas or simple suggestions to make your daily life better. Give your imagination and your ideas a new life: innovate!</b><br><br>Check out <a href='http://app.ideafy.com'>Ideafy</a> now or get the app on your iPad </p><p><a href='https://itunes.apple.com/us/app/ideafy/id605681593?mt=8&uo=4' target='itunes_store'style='display:inline-block;overflow:hidden;background:url(http://linkmaker.itunes.apple.com/htmlResources/assets/images/web/linkmaker/badge_appstore-lrg.png) no-repeat;width:135px;height:40px;@media only screen{background-image:url(http://linkmaker.itunes.apple.com/htmlResources/assets/images/web/linkmaker/badge_appstore-lrg.svg);}'></p>",joinedideafy:" has joined Ideafy",referral:"You earned 200 Ideafy Points for referring this person. You can now add him/her to your contacts.",invitationsent:"Your invitation has been sent",alreadyinvited:"You already invited this person",cardeditor:"Card editor",createnew:"Add a new card",importcard:"Import ...",orlbl:"or",cardtitle:"Choose a title",picturecredit:"Picture origin",enterdyknow:"Add explanations, facts and figures",dyknowsources:"Provide sources if applicable",age:"Age",countrystate:"Country or state",desc:"Description",titlerequired:"A title is required",addcomment:"Additional information",setdeck:"Set brainstorming deck",setdecklogo:"Select an icon",importfrom:"Select deck to import from",remsel:"Remove selection<br><<<",impsel:"Import selection<br>>>>",seldeck:"Selected deck",workdeck:"Working deck",selall:"Select all",clearsel:"Clear selection",delcardwarning:"Removing the following cards from your deck will delete them from the database :<br>",deldeckwarning:"Deleting this deck will definitively remove it from your library. If you are its author, it will also be removed from the database as well as any card you created that is only attached to this deck. Are you sure you want to proceed ?",cannotdelactivedeck:"You cannot remove your active deck.  Please review your settings.",cannotremovecard:"You cannot remove this card from your active deck.  An active deck requires at leat one character card, one context card, one problem card and three technology cards.",alreadyshared:"This has already been shared with intended recipients",addedfav:"This idea has been added to your favorites",removedfav:"This idea has been removed from your favorites",maxfavsize:"Your list of favorites has reached the maximum size. Remove some ideas before trying to add this one.",noideafound:"No idea found",tryotherview:"Change view, modify language filters or add ideas to your favorites. To leave the search view, erase the content of the search field and press the return key.",solution:"Solution",principle:"Principle",defaultlangfilter:"Default language filter : ",pwdchange:"Ideafy password change",pwdchangebody:"You successfully changed your Ideafy password to : ",pwdupdate:"Password change",forgotpwd:"Forgot your password ?",temppwd:"A temporary password has been sent to ",failedpwdreset:"A temporary password has already been sent to you. Check your mailbox or contact ",alegend:"Add attachments",attachments:"Attachments",filelbl:"File",imagelbl:"Image",drawinglbl:"Drawing",choosecat:"Choose category",bus:"Business model",mkt:"Marketing",notes:"Notes",arch:"Architecture",spec:"Specifications",planning:"Planning",other:"Other",noaname:"Missing attachment name",noacat:"Missing attachment category",contrib:"Contributed by: ",rateit:"Rate it!",deleteattachment:"Are you sure you want to delete this attachment ?",attachdescplaceholder:"Enter a description of your attachment",EULArejected:"You must accept the license agreement prior to using the application"},lang:"en-us",userLanguages:[{name:"en"},{name:"zh"},{name:"es"},{name:"ja"},{name:"pt"},{name:"de"},{name:"ar"},{name:"fr"},{name:"ru"}],labels:new e({})})},this.reset(),c});