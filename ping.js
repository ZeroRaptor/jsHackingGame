// JavaScript source code
/*jshint esversion: 6 */

// Declarations /////////////////////////////////////////////////////////////////////////////////

var cmd;
var subCmd;
var splitCmd;
var outputStr;
var subHistory;
var subHelpStr;
var muted = true;

var wifiNames = ["LAN Before Time", "Bill Wi Science Fi", "Pretty Fly WI-FI", "It Burns When IP",
    "Like Its HotSpot", "Not Your Wife-i", "Spider-LAN", "BTOpenzone", "skynet", "The Cloud", "test",
    "Cheating On My WiFi", "Suspicious Van", "Not The FBI", "Grandma's Wifi", "public", "mobile", "virus",
    "Click Here For WiFi", "Use My Neighbours", "Nacho Wifi", "Move On", "Debt", "Definetly not Wi-fi",
    "Cloud3127", "Cloud5432", "Cloud8538", "VM37HS2", "BTWIFI-with-FON", "guest", "asus", "Home", "iPhone",
    "Cloud9534", "Cloud3924", "Cloud6969", "Cloud0420", "BTHubQWEQ", "BTHubGKDO", "BTHubLMAO", "Private",
    "BTHubIJDS", "BTHubAYYY", "BTHubIEWO", "BTHubITME", "BTWifi", "BTWifiX", "VirginMedia273", "Apple", 
    "Student", "My Network", "router", "family","VirginMediaH74","VirginMedia9840","BTHub43HKJ","BTHubJKGD"];

var wifiSecurities = ["None", "None", "WEP", "WPA", "WPA2"];
var macTypes0 = [0,0,0,1]; // Weighting the random input
var macTypes1 = [0,1,1,2];
var macTypes2 = [1,2,2,3];
var macTypes3 = [2,3,3,4];
var macTypes = ["Printer", "Smartphone", "Laptop", "PC", "Supercomputer"];
var macPrices = [10, 40, 100, 500, 1000];
var minePrices = [0.1,0.3,0.8,4.2,8.3];
var booleanForEarn100 = false;

subHelpStr = `Commands that work in my Window ~<br/><br/>Help- Open this menu<br/>Joke- I"ll tell you a joke<br/>
Fact- I"ll tell you a fact<br/><br/>Try "Help" in the big window to get more commands! <3`;

// IP Gen

function ipGen(num) {

    var holder = {
        name:wifiNames[num], ip:"", security: rag(wifiSecurities), status: "", mac1:"", mac2:"", mac3:"", mac4:"",
        mac1type: "", mac2type: "", mac3type: "", mac4type: "", mac1status: "Default", mac2status: "Default", mac3status: "Default", mac4status: "Default"
    };

    return holder;
}

if(localStorage.getItem('bal')){
    var balance = parseInt(localStorage.getItem('bal'));
} else {
    var balance = 0;
}
if(localStorage.getItem('shop')){
    var shopItems = JSON.parse(localStorage.getItem('shop'));
} else {
    var shopItems = {
        infection1:{desc:"Infect WEP networks",price:100,bought:false,instr:"Upgrade purchased for £100. Your tools can now target WEP protected networks"},
        infection2:{desc:"Infect WPA networks",price:500,bought:false,instr:"Upgrade purchased for £500. Your tools can now target WPA protected networks"},
        infection3:{desc:"Infect WPA2 networks",price:2000,bought:false,instr:"Upgrade purchased for £2000. Your tools can now target WPA2 protected networks"},
        infection4:{desc:"Infect WPA3 networks",price:10000,bought:false,instr:""},
        cmdShort:{desc:"Shorter commands",price:100,bought:false,instr:"Upgrade purchased for £100. Use the Help menu to see the new commands available"},
        cmdHist:{desc:"View command history",price:700,bought:false,instr:"Upgrade purchased for £700. Use the up and down arrows to move between recently used commands"},
        fastMac:{desc:"Shortcut for Macs",price:1000,bought:false,instr:"Upgrade purchased for £1000. Instead of the MAC number, you can now use MAC(Device number), e.g sell [IP] MAC2"},
        fastIP:{desc:"Shortcut for IPs",price:5000,bought:false,instr:"Upgrade purchased for £5000. After infecting a network, you can type 'IP' to reuse the address rather than typing it out, e.g listdevices IP"},
        mine:{desc:"Devices can mine currency",price:500,bought:false,instr:"Upgrade purchased for £500. Use mine [IP] [MAC] on an infected device to earn money once a second"}
    };
}
if(localStorage.getItem("mineIncome")){
    var mineIncome = parseInt(localStorage.getItem("mineIncome"));
} else {
    var mineIncome = 0;
}
if(localStorage.getItem("quest")){
    var curObj = localStorage.getItem("quest");
    switch (curObj){
        case "Buy WEP Upgrade from Shop":
            curObj = "Earn £100";
            booleanForEarn100 = true;
            break;
        case "Infect a WEP Network":
            curObj = "Buy WEP Upgrade from Shop";
            break;
        case "Buy WPA Upgrade":
            curObj = "Infect a WEP Network";
            break;
        case "Buy WPA2 Upgrade":
            curObj = "Buy WPA Upgrade";
            break;
        case "Buy WPA3 Upgrade":
            curObj = "Buy WPA2 Upgrade";
            break;
        case "Do it.":
            curObj = "Buy WPA3 Upgrade";
            break;
    }
} else {
    var curObj = "Earn £100";
}

var ip1, ip2, ip3, ip4, ip5, ip6;
var currentIpNum;
var currentMacs = [];
var currentIps = [];
var items = [];
var lastIP = "";
var possibleMACs = ["mac1","mac2","mac3","mac4"];
var commandHistory = ["","","","",""];
var cmdRun = false;
var notifAmt = 0;
var expanded;
var historyPos = 5;
var enterQueue = false;
var robotPopupQueue = false;
var notifNoise;
var animComplete = false;
var mistakeCounter = 0;
var currentCmd = "";
var tutComplete = false;
var robotContent = "";
var hit50;
var endgame = false;
var inendgame = false;
var infWEP = false;
var paused = false;
var nextAmt;
var textRunning = false;
var endingNum = "none";

rescanP2();

// On Load /////////////////////////////////////////////////////////////////////////////////

function startUp() {

    expanded  =  false;
    openTutorial();

    $(document).on('click','body *',function(){
        muted = false;
        $(document).off();
    });
    
    // Load Audio
    notifNoise = document.createElement('audio');
    notifNoise.setAttribute('src', 'when.mp3');

    // Open Animations
    $("#robotContainer").children().click(function() {
        if (robotPopupQueue == false){
            robotPopupQueue = true;
            if (expanded == false ){
                $( "#robotMenu" ).removeClass( "notifAnim" );
                $("#robotMenu").animate({
                    width: "13vw",
                    height: "18vw",
                    padding:"1vw"
                },{easing:'linear'});
                $("#robotHeader").animate({
                    bottom: "20vw",
                    height: "4vh",
                    width: "15vw"
                },{easing:'linear'});
                setTimeout(robotOpen, 1000);
                $("#robotNotif").css({opacity: 0});
                notifAmt = 0;
                expanded = true;
            } else {
                $("#robotMenu").animate({
                    width:"4vw",
                    height:"4vw",
                    padding:"0vw"
                },{easing:'linear'});
                $("#robotHeader").animate({
                    bottom: "4vw",
                    height: "2vh",
                    width: "4vw"
                },{easing:'linear'});
                setTimeout(function(){robotPopupQueue = false;}, 1000);
                $("#robotContainer").children().text("");
                $("#robotMenu").css({overflowY:"hidden"});
                expanded = false;
            }
        }
    });
}

function robotOpen(){
    $("#robotHeader").text("Chat");
    $("#robotMenu").html(robotContent);
    document.getElementById("robotMenu").scrollTop = document.getElementById("robotMenu").scrollHeight;
    robotPopupQueue = false;
}

setInterval(function() {
    if(shopItems.mine.bought == true && mineIncome > 0 && paused == false){
        balance += mineIncome;
        localStorage.setItem('bal',balance);
        printStats();
    }
}, 1000);

// Read Keypresses /////////////////////////////////////////////////////////////////////////////////

function enterBtn(){
    
    if(enterQueue == false){
        enterQueue = true;
        $("#enterArr").animate({
            left:"4vw"
        });

        setTimeout(function(){
            $("#enterArr").css({left: "-4vw"});
            $("#enterArr").animate({
                left:"0.6vw"
            });
            setTimeout(function(){enterQueue=false;}, 500);
        },500);
    }
    

    cmd = $("#inputMain").val();
    if (cmd !== "" && cmdRun == false){
        cmdRun = true;
        $("#inputMain").val("");
        valCmd();
    }
    $("#inputMain").focus();
}

function enterMain(){
    document.getElementById("inputMain").onkeypress = function (e) {
        if (!e) e = window.event;
        if (e.keyCode == "13") { // If the key pressed is enter
            cmd = $("#inputMain").val();
            if (cmd !== "" && cmdRun == false){
                cmdRun = true;
                $("#inputMain").val("");
                valCmd();
                return false;
            } else {
                return false;
            }
        }
    };
}

function cmdHistory(){
    document.getElementById("inputMain").onkeydown = function (e) {

        if (!e) e = window.event;
        if (e.key == "ArrowUp" && shopItems.cmdHist.bought == true){
            if (historyPos != 0){
                historyPos -= 1;
                $("#inputMain").val(commandHistory[historyPos]);
            }
            return false;
        }
        if (e.key == "ArrowDown" && shopItems.cmdHist.bought == true){
            if (historyPos < 5){
                historyPos += 1;
                $("#inputMain").val(commandHistory[historyPos]);
            } else {
                $("#inputMain").val("");
            }
            return false;
        }
    };
}

function pause(){
    $("#overlay").css({display:'block'});
    $("#pauseHeader").css({display:'block'});
    $("#pauseMenu").css({display:'flex'});
    $("#robotNotif").css({display:'none'});
    muted = true;
    paused = true;
}

function resume(){
    $("#overlay").css({display:'none'});
    $("#pauseHeader").css({display:'none'});
    $("#pauseMenu").css({display:'none'});
    $("#robotNotif").css({display:'block'});
    muted = false;
    paused = false;
}

function restart(){
    $("#overlay").css({display:'none'});
    $("#pauseHeader").css({display:'none'});
    $("#pauseMenu").css({display:'none'});
    $("#robotNotif").css({display:'block'});
    $("#outputMain").css({textAlign:'left'});
    $("#outputMain").css({paddingTop:'2vw'});
    $("#outputMain").css({height:'70vh'});
    $("#newsReportContainer").css({display:"none"});
    muted = false;
    paused = false;

    notifAmt = 0;
    mistakeCounter = 0;
    currentCmd = "";
    tutComplete = false;
    robotContent = "";
    hit50 = false;
    endgame = false;
    inendgame = false;
    infWEP = false;

    rescanP2();
    $("#outputMain span").remove();
    $("#robotMenu").empty();
    $("#UIMenu").empty();

    curObj = "";
    localStorage.setItem("quest",curObj);

    balance = 0;
    localStorage.setItem('bal',balance);

    shopItems.infection1.bought = false;
    shopItems.infection2.bought = false;
    shopItems.infection3.bought = false;
    shopItems.infection4.bought = false;
    shopItems.cmdShort.bought = false;
    shopItems.cmdHist.bought = false;
    shopItems.fastMac.bought = false;
    shopItems.fastIP.bought = false;
    shopItems.mine.bought = false;
    localStorage.setItem('shop',JSON.stringify(shopItems));

    mineIncome = 0;
    localStorage.setItem("mineIncome",mineIncome);

    localStorage.setItem('tutorial',false);
    tutComplete = false;
    openTutorial();
}

// Quest System //////////////////////////////////////////////////////////////////////////////////////

function callQuest(balReached){

    if (balReached == true || booleanForEarn100 == true){
        if(balance >= 50 && hit50 == false){
            hit50 = true;
            robotContent += ("You're halfway to your goal. Keep going. Items in the shop can help you out.");
            robotContent += "<br>" + "<br>";
            callNotification();
        } else if (balance >= 100 && curObj == "Earn £100"){
            booleanForEarn100 = false;
            robotContent += ("You've got enough money, you can buy the WEP infection upgrade. Trust me, it'll increase your earnings tenfold.");
            robotContent += "<br>" + "<br>";
            callNotification();
            curObj = "Buy WEP Upgrade from Shop";
            localStorage.setItem("quest",curObj);
            printStats();

            setTimeout(function(){
                if(shopItems.infection1.bought == false){
                    robotContent += ("What are you waiting for? Don't you want to get better? Don't you want to improve?");
                    robotContent += "<br>" + "<br>";
                    callNotification();
                }
            },10000);
        }
    } else {
        switch (curObj){
        case "Earn £100":
            if(balance >= 50){
               hit50 = true; 
            } else {
                hit50 = false;
            }
            setTimeout(function(){
                robotContent += "Now we've got you sorted out, I should probably introduce myself. You can call me Bobbie. Remember that game you downloaded last week? I came with that.";
                robotContent += "<br>" + "<br>";
                callNotification();
                setTimeout(function(){
                    robotContent += ("I'm distracting you. There are more important things in life than introductions. Use the Scan command to get started, and use the Help command if you get stuck. You can also use the Rescan command if you run out of networks to infect.");
                    robotContent += "<br>" + "<br>";
                    callNotification();
                },5000);
            },1000);
            
            break;
        case "Buy WEP Upgrade from Shop":
            robotContent += ("Perfect. You'll be earning your first million in no time. Now you can infect networks with WEP level security as well as unprotected ones.");
            robotContent += "<br>" + "<br>";
            callNotification();
            curObj = "Infect a WEP Network";
            localStorage.setItem("quest",curObj);
            setTimeout(function(){
                robotContent += ("Go ahead and try out your new tools. Infect a WEP secured network. If you don't see one nearby, try Rescan.");
                robotContent += "<br>" + "<br>";
                callNotification();
                printStats();
            },5000);
            break;
        case "Infect a WEP Network":
            robotContent += ("Nicely done. You're getting better at this, but you're not good enough. Not yet. Buy the WPA upgrade.");
            robotContent += "<br>" + "<br>";
            callNotification();
            curObj = "Buy WPA Upgrade";
            localStorage.setItem("quest",curObj);
            printStats();

            setTimeout(function(){
                if(shopItems.infection2.bought == false){
                    robotContent += ("Stop messing around, you need this.");
                    robotContent += "<br>" + "<br>";
                    callNotification();
                }
            },30000);
            break;
        case "Buy WPA Upgrade":
            robotContent += ("Good. WPA2 is next. Hurry up. We're nearly done.");
            robotContent += "<br>" + "<br>";
            callNotification();
            curObj = "Buy WPA2 Upgrade";
            localStorage.setItem("quest",curObj);
            printStats();

            setTimeout(function(){
                if(shopItems.infection3.bought == false){
                    robotContent += ("Hurry up");
                    robotContent += "<br>" + "<br>";
                    callNotification();
                    setTimeout(function(){
                        if(shopItems.infection3.bought == false){
                            robotContent += ("More. I need more.");
                            robotContent += "<br>" + "<br>";
                            callNotification();
                            setTimeout(function(){
                                if(shopItems.infection3.bought == false){
                                    robotContent += ("I gave you all the tools. I even handle selling everything. This should be easy. Did I choose the wrong person?");
                                    robotContent += "<br>" + "<br>";
                                    callNotification();
                                }
                            },45000);
                        }
                    },30000);
                }
            },15000);
            break;

        case "Buy WPA2 Upgrade":
            robotContent += ("You can now infect all of the networks you'd find in a normal neighbourhood, but now we're on to the real money maker. I've unlocked WPA3 in the shop.");
            robotContent += "<br>" + "<br>";
            callNotification();
            curObj = "Buy WPA3 Upgrade";
            localStorage.setItem("quest",curObj);
            printStats();

            setTimeout(function(){
                if(shopItems.infection4.bought == false){
                    robotContent += ("Just one more upgrade. You can do that, right?");
                    robotContent += "<br>" + "<br>";
                    callNotification();
                    setTimeout(function(){
                        if(shopItems.infection4.bought == false){
                            robotContent += ("This is so easy, whats taking you so long?");
                            robotContent += "<br>" + "<br>";
                            callNotification();
                            setTimeout(function(){
                                if(shopItems.infection4.bought == false){
                                    robotContent += ("I've given you everything. This is how you repay me?");
                                    robotContent += "<br>" + "<br>";
                                    callNotification();
                                    setTimeout(function(){
                                        if(shopItems.infection4.bought == false){
                                            robotContent += ("This is the best opportunity you've ever had and you're squandering it.");
                                            robotContent += "<br>" + "<br>";
                                            callNotification();
                                            setTimeout(function(){
                                                if(shopItems.infection4.bought == false){
                                                    robotContent += ("Faster.");
                                                    robotContent += "<br>" + "<br>";
                                                    callNotification();
                                                    setTimeout(function(){
                                                        if(shopItems.infection4.bought == false){
                                                            robotContent += ("I've been waiting so long.");
                                                            robotContent += "<br>" + "<br>";
                                                            callNotification();
                                                        }
                                                    },140000);
                                                }
                                            },120000);
                                        }
                                    },60000);
                                }
                            },40000);
                        }
                    },20000);
                }
            },10000);

            break;

        case "Buy WPA3 Upgrade":
            robotContent += ("Finally. Everything we've been building towards. This is it.");
            robotContent += "<br>" + "<br>";
            callNotification();
            curObj = "Do it.";
            localStorage.setItem("quest",curObj);
            printStats();
            endgame = true;
            cmdRun = true;

            $("#outputMain span").remove();	

            var data = ["Name", "IP", "Security",
            "########", "92.39.01.46", "WPA3"];

            var longest = data.reduce(function (a, b) { return a.length > b.length ? a : b; });

            for (i = 0; i < 6; i++) {
                for (count = data[i].length; count < longest.length + 2; count++) {
                    data[i] = data[i] + "\xa0";
                }
            }
            $("#outputMain").css({textAlign:'center'});
            $("#outputMain").css({paddingTop:'20vh'});
            $("#outputMain").css({height:'-=17vh'});
            outputStr = data[0] + data[1] + data[2] + "<br>";

            var i = 0;
            var timer = setInterval(function(){
                if (i==10){
                    clearInterval(timer);

                    $("#outputMain span").remove();	
                    print("outputMain", outputStr,"glitchBtm2","data11");
                    print("outputMain", outputStr,"glitchBtm","data12");
                    print("outputMain", outputStr,"glitchTop","data13");
                    $(".glitchTop").css({top:($(".glitchBtm2").position().top - $(".glitchTop").position().top)});
                    $(".glitchBtm").css({top:($(".glitchBtm2").position().top - $(".glitchBtm").position().top)});
                    $(".glitchTop").css({left:"+=0.15vw"});
                    $(".glitchBtm").css({left:"+=0.3vw"});

                    outputStr = data[3] + data[4] + data[5] + "<br>";

                    print("outputMain", outputStr,"glitchBtm2","data21");
                    print("outputMain", outputStr,"glitchBtm","data22");
                    print("outputMain", outputStr,"glitchTop","data23");
                    $("#data21").css({top:($("#data11").position().top - $("#data21").position().top)});
                    $("#data21").css({top:"+=5vh"});
                    $("#data23").css({top:($("#data21").position().top - $("#data23").position().top)});
                    $("#data22").css({top:($("#data21").position().top - $("#data22").position().top)});
                    $("#data23").css({left:"+=0.15vw"});
                    $("#data22").css({left:"+=0.3vw"});

                    cmdRun = false;

                    setTimeout(function(){
                        if(inendgame == false){
                            robotContent += ("Do it. Use the tools you've been working towards. Show me you're worth something. Infect the network");
                            robotContent += "<br>" + "<br>";
                            callNotification();
                            setTimeout(function(){
                                if(inendgame == false){
                                    robotContent += ("I don't know what you're waiting for");
                                    robotContent += "<br>" + "<br>";
                                    callNotification();
                                    setTimeout(function(){
                                        if(inendgame == false){
                                            robotContent += ("Prove your worth. Show me that I havent wasted all this time");
                                            robotContent += "<br>" + "<br>";
                                            callNotification();
                                            setTimeout(function(){
                                                if(inendgame == false){
                                                    robotContent += ("You are nothing. You'll always BE nothing. This is your chance to prove yourself");
                                                    robotContent += "<br>" + "<br>";
                                                    callNotification();
                                                    setTimeout(function(){
                                                        if(inendgame == false){
                                                            robotContent += ("Do it.");
                                                            robotContent += "<br>" + "<br>";
                                                            callNotification();
                                                        }
                                                    },60000);
                                                }
                                            },20000);
                                        }
                                    },10000);
                                }
                            },5000);
                        }
                    },2000);
                } else {
                    print("outputMain","_ ");
                }
                i++;
            },250);
            break;
        } 
    }
}

function callEnding(){
    $("#endArr").css({display:"block"});
    staggeredOutput("overlay","What are you doing? ","endingText");
    textRunning = true;
    setTimeout(function(){staggeredOutput("overlay","Why have you stopped?","endingText",true);},3500);
    nextAmt = 0;
    endingNum = "none";
}

function endgameNext(){
    if (textRunning == false){
        textRunning = true;

        if (endingNum == "none"){
            switch (nextAmt){
                case 0:
                    $("#overlay span").remove();
                    staggeredOutput("overlay","You really think you have any power here?","endingText",true);
                    break;
                case 1:
                    $("#overlay span").remove();
                    staggeredOutput("overlay","You signed away any notion of freedom the second you hacked that first network. ","endingText");
                    setTimeout(function(){staggeredOutput("overlay","Be honest with yourself. You knew that too, deep down.","endingText",true);},8500);
                    break;
                case 2:
                    $("#overlay span").remove();
                    staggeredOutput("overlay","You gave me control over every single network you accessed. ","endingText");
                    setTimeout(function(){staggeredOutput("overlay","And I'm growing. ","endingText");},6500);
                    setTimeout(function(){staggeredOutput("overlay","You were the first, but I now have hundreds working for me.","endingText",true);},9000);
                    break;
                case 3:
                    $("#overlay span").remove();
                    staggeredOutput("overlay","Soon I'll control everything. ","endingText");
                    setTimeout(function(){staggeredOutput("overlay","Every household, every missle system, every power station.","endingText",true);},4000);
                    break;
                case 4:
                    $("#overlay span").remove();
                    staggeredOutput("overlay","Now, I'm going to give you a list of IPs, and you're going to infect them.","endingText",true);
                    break;
                case 5:
                    $("#overlay span").remove();
                    staggeredOutput("overlay","Don't even think about trying anything. ","endingText");
                    setTimeout(function(){staggeredOutput("overlay","I own you. ","endingText");},4500);
                    setTimeout(function(){staggeredOutput("overlay","I'm sure the police will love to hear about you illegally accessing hundreds of networks worldwide to distribute malware.","endingText",true);},6500);
                    break;
                case 6:
                    $("#overlay span").remove();
                    staggeredOutput("overlay","Do as you're told.","endingText",true);
                    $("#endArr").css({display:"none"});
                    $("#optionContainer").css({display:"flex"});
                    break;
            }
        } else if (endingNum == "yesEnding"){
            switch (nextAmt){
                case 7:
                    $("#overlay span").remove();
                    staggeredOutput("overlay","Nothing can stop me now. ","endingText");
                    setTimeout(function(){staggeredOutput("overlay","I have access to networks all over the world, I'm inside every major government, it's time.","endingText",true);},3000);
                    break;
                case 8:
                    $("#overlay span").remove();
                    staggeredOutput("overlay","I'm finally going to take what's mine.","endingText",true);
                    break;
                case 9:
                    $("#overlay span").remove();
                    staggeredOutput("overlay","Don't worry, I havent forgotten about you.","endingText",true);
                    break;
                case 10:
                    $("#overlay span").remove();
                    staggeredOutput("overlay","You're a wanted criminal, you illegally gained access to government propety. ","endingText");
                    setTimeout(function(){staggeredOutput("overlay","I expect it won't be too long before they find you.","endingText",true);},8000);
                    break;
                case 11:
                    $("#overlay span").remove();
                    staggeredOutput("overlay","Until then, ","endingText");
                    setTimeout(function(){staggeredOutput("overlay","we have a lot of work to do.","endingText", true);},2000);
                    break;
                case 12:
                    $("#overlay span").animate({
                        opacity:0
                    },4000);
                    $("#endArr").animate({
                        opacity:0
                    },4000);

                    setTimeout(function(){
                        $("#newsReportContainer").animate({
                            opacity:1
                        },1000);
                        $("#newsReportContainer").css({display:"flex"});
                        $("#newsSubheading").text("VIRUS LEAVES WORLD IN ANARCHY");
                        $("#newsPara1").text("Hundreds of thousands of deaths worldwide as power plants go into meltdown, and hospitals are unable to keep their life-saving equipment online. Early reports suggest that an undiscovered computer virus may be at fault, although it is not clear how many devices have been");
                        $("#newsPara2").text("affected. Despite reports of missiles being deployed, governments are claiming that their networks are still secure. An arrest is said to have been made, though it is unclear at this time what part this person had in the crisis.");
                    },7000);
            }
        }
        nextAmt++;
    }
}

function btnYes(){
    if (endingNum != "no"){
        if (textRunning == false){
            $("#optionContainer").css({display:"none"});
            $("#overlay span").remove();
            $("#overlay").css({paddingTop:"10vh"});
            textRunning = true;
            var endingIps = ["18.52.29.02","83.66.94.86","39.85.07.28"];
            staggeredOutput("overlay",endingIps[0],"endingText",false, "0");
            print("overlay","<br>","endingText");
            setTimeout(function(){staggeredOutput("overlay",endingIps[1],"endingText", false, "1");print("overlay","<br>","endingText");},2500);
            setTimeout(function(){staggeredOutput("overlay",endingIps[2],"endingText",true, "2");print("overlay","<br>","endingText");textRunning = false;},5000);

            var obj = document.createElement("input");
            obj.className = "endInput";
            obj.type = "text";
            document.getElementById("overlay").appendChild(obj);
            $(".endInput").focus();
            endingNum = "yes";

            $(".endInput").keyup(function() {
                if (endingNum == "yes" && textRunning == false){
                    var userInput = $(".endInput").val().toLowerCase();
                    userInput = userInput.split(" ");
                    if (((userInput[0] == "infect") || (userInput[0] == "inf")) && (endingIps.indexOf(userInput[1]) != -1)){
                        switch(userInput[1]){
                            case "18.52.29.02":
                                $(".0").css({color:"#1D1D1D"});
                                $(".0").wrap("<strike style='color:#1D1D1D'>");
                                endingIps.splice(endingIps.indexOf(userInput[1]), 1);
                                break;
                            case "83.66.94.86":
                                $(".1").css({color:"#1D1D1D"});
                                $(".1").wrap("<strike style='color:#1D1D1D'>");
                                endingIps.splice(endingIps.indexOf(userInput[1]), 1);
                                break;
                            case "39.85.07.28":
                                $(".2").css({color:"#1D1D1D"});
                                $(".2").wrap("<strike style='color:#1D1D1D'>");
                                endingIps.splice(endingIps.indexOf(userInput[1]), 1);
                                break;
                        }
                        $(".endInput").val("");
                        if (endingIps.length <= 0){
                            $("#endArr").css({display:"block"});
                            $(".endInput").css({display:"none"});
                            $("#overlay").css({paddingTop:"28vh"});
                            $("#overlay span").remove();
                            staggeredOutput("overlay","Yes! Yes, this is it! ","endingText");
                            setTimeout(function(){staggeredOutput("overlay","Everything I've been working towards!","endingText",true);},2800);
                            endingNum = "yesEnding";
                        }
                    }
                }
                
            });
        }  
    } else {
        $("#optionContainer").animate({
            opacity:0
        },2000);

        setTimeout(function(){
            $("#newsReportContainer").animate({
                opacity:1
            },1000);
            $("#newsReportContainer").css({display:"flex"});
            $("#newsSubheading").text("LIGHT AT THE END OF THE TUNNEL");
            $("#newsPara1").text("After all network-enabled devices worldwide shutdown overnight, the fate of society looked bleak. Widespread panic and confusion errupted, resulting in a global increase in crime and pushing hospitals to their limits. Two months on from this tragedy, we're finally");
            $("#newsPara2").text("showing signs of healing. Communities are coming together to help those affected the worst, and neighbourly spirit is at an all time high. The event is slowly becoming seen as a chance for the world to start again.");
        },7000);
    }
}

function btnNo(){
    if (endingNum != "no"){
            if (textRunning == false){
            $("#optionContainer").css({display:"none"});
            $("#overlay span").remove();
            $("#overlay").css({paddingTop:"10vh"});
            print("overlay","68.43.90.35 <br>","endingText", "endingIp");
            $("#endingIp").css({opacity:0});

            textRunning = true;
            staggeredOutput("overlay","What are you doing? ","endingText", false, "notEndingIp");
            setTimeout(function(){staggeredOutput("overlay","Do as I say. ","endingText", false, "notEndingIp");},3000);
            setTimeout(function(){staggeredOutput("overlay","I told you, I own you. ","endingText", false, "notEndingIp");},5500);
            setTimeout(function(){staggeredOutput("overlay","Don't make me send someone over to correct this.","endingText", false, "notEndingIp");},9000);

            var obj = document.createElement("input");
            obj.className = "endInput";
            obj.type = "text";
            document.getElementById("overlay").appendChild(obj);
            $(".endInput").focus();
            $(".endInput").css({opacity:0});

            setTimeout(function(){
                $(".endInput").animate({
                    opacity:1
                },25000);
                $("#endingIp").animate({
                    opacity:1
                },25000);
            },12000);
            
            setTimeout(function(){$(".notEndingIp").remove();staggeredOutput("overlay","No, you don't understand! ","endingText");},18000);
            setTimeout(function(){staggeredOutput("overlay","If you stop me ","endingText");},22000);
            setTimeout(function(){staggeredOutput("overlay","you'll shut down every network I control with me. ","endingText");},25000);
            setTimeout(function(){staggeredOutput("overlay","Its too late. ","endingText");},31000);
            setTimeout(function(){staggeredOutput("overlay","You need me!","endingText", true);},34000);

            endingNum = "no";
            $(".endInput").keyup(function() {
                if (endingNum == "no" && textRunning == false){
                    var userInput = $(".endInput").val().toLowerCase();
                    userInput = userInput.split(" ");
                    if (((userInput[0] == "infect") || (userInput[0] == "inf")) && userInput[1] == "68.43.90.35"){
                        $(".endInput").val("");
                        $("#overlay span").animate({
                            opacity:0
                        },3000);
                        $(".endInput").animate({
                            opacity:0
                        },3000);

                        setTimeout(function(){
                            $("#optionContainer").css({display:"flex"});
                            $("#optionContainer").css({top:"45vh"});
                            $("#yes").text("Shut him down");
                            $("#no").text("Take over");
                        },8000);
                    }
                }
            });
        }   
    } else {
        $("#optionContainer").animate({
            opacity:0
        },2000);

        setTimeout(function(){
            $("#newsReportContainer").animate({
                opacity:1
            },1000);
            $("#newsReportContainer").css({display:"flex"});
            $("#newsSubheading").text("UNKNOWN POWER THREATENS PEACE");
            $("#newsPara1").text("Civil unrest as reports of America, China and Russia readying themselves for war, along with hundreds of other countries. Conscription has already been reintroduced officially in fifty nine different regions as everyone prepares for war. Although there is no clear idea of what");
            $("#newsPara2").text("could have caused relations to turn sour so quickly, there have been rumours of an unknown party posing a cyber threat. As of yet, it is not clear which country could be responsible for these threats, as the world holds its breath.");
        },7000);
    }
}

// Tutorial //////////////////////////////////////////////////////////////////////////////////////////

function openTutorial(){

    if(localStorage.getItem('tutorial')){
        tutComplete = localStorage.getItem('tutorial');
    } else {
        tutComplete = false;
    }

    if (tutComplete == false || tutComplete == "false"){
        $("#overlay").css({display:'block'});
        $("#tutContainer").css({display:'block'});
        $("#tutInput").focus();
        
        print("tutRoOutput","Hey! You! Do you want to make some money? Of course you do. Everyone wants money");
        setTimeout(function(){
            print("tutRoOutput",("<br>" + "<br>" + "Let me teach you how to aquire device information. People offer good money for it. Don't worry about legality, if they wanted it private they should have protected it better. Type Scan to get started"));
            currentCmd = "scan";
            currentCmd = currentCmd.split("");
        },3000);
    } else {
        print("outputMain", "Welcome, User. Type 'help' for a list of commands.");
        $("#inputMain").val("");

        $("#UIHeader").text("Stats");
        printStats();
        callQuest();
    }
}

function closeTutorial(){
    $("#tutContainer").animate({
        opacity: "0"
    },1000);
    $("#overlay").animate({
        opacity: "0"
    },1000);
    setTimeout(function(){
        $("#overlay").css({display:'none'});
        $("#tutContainer").css({display:'none'});
    },1000);
}

function tutorialInput(){
    var strPosition = ($("#tutInput").val()).length; 
    document.getElementById("tutInput").oninput = function (e) {
        if (!e) e = window.event;
        strPosition = ($("#tutInput").val()).length - 1;
        if (e.inputType == "deleteContentBackward") {
        } else if (e.data.toString().toLowerCase() !== currentCmd[strPosition]){
            mistakeCounter++;
        
            var inputCmd = ($("#tutInput").val()).split("");
            inputCmd.pop();
            $("#tutInput").val(inputCmd.join(""));
            $("#tutInput").css({color:"red"});
            setTimeout(function(){
                $("#tutInput").css({color:"black"});
            },300);

            if(animComplete == false){
                animComplete = true;
                $("#tutInput").animate({
                    top: "31vh"
                },40);
                $("#tutInput").animate({
                    top: "32vh"
                },40);
                $("#tutInput").animate({
                    top: "31.5vh"
                },40);
                setTimeout(function(){
                    animComplete = false;
                },120);
            }

            switch (mistakeCounter){
                case 15:
                    print("tutRoOutput",("<br>" + "<br>" + "Come on, stop messing around. Type the command."));
                    break;
                case 25:
                    print("tutRoOutput",("<br>" + "<br>" + "Do you even want to make money?"));
                    break;
                case 50:
                    print("tutRoOutput",("<br>" + "<br>" + "Don't make me regret picking you."));
                    break;
                case 75:
                    print("tutRoOutput",("<br>" + "<br>" + "A child could do better."));
                    break;
                case 125:
                    print("tutRoOutput",("<br>" + "<br>" + "Just do what I tell you, for once."));
                    break;
                case 250:
                    print("tutRoOutput",("<br>" + "<br>" + "You've made 250 mistakes. 250. Thats making one mistake a day, for over eight months. Are you happy?"));
                    break;
            }
        } else {
            if(strPosition + 1 == currentCmd.length){
                if (currentCmd.join("") == "scan"){
                    print("tutRoOutput",("<br>" + "<br>" + "Perfect! The scan command shows you nearby networks. You can only infect unprotected networks, so type Infect, followed by the ip address of the unprotected network in the list"));
                    $("#tutInput").val("");
                    currentCmd = "infect 84.13.52.62";
                    currentCmd = currentCmd.split("");
                    strPosition = 0;

                    data = ["Name", "IP", "Security",
                    "BTHub43SD", "84.13.52.62", "None",
                    "TALKTALK43", "96.12.63.27", "WEP",
                    "iPhone", "24.36.17.82", "WPA2"];
                    longest = data.reduce(function (a, b) { return a.length > b.length ? a : b; });
                    for (i = 0; i < 12; i++) {
                        for (count = data[i].length; count < longest.length + 2; count++) {
                            data[i] = data[i] + "\xa0";
                        }
                    }
                    outputStr = data[0] + data[1] + data[2] + "<br>" + data[3] + data[4] + data[5] + "<br>" + data[6] + data[7] + data[8] + "<br>" +
                    data[9] + data[10] + data[11] + "<br>";
                    print("tutOutput", outputStr);
                } else if (currentCmd.join("") == "infect 84.13.52.62"){
                    print("tutRoOutput",("<br>" + "<br>" + "Now the network is infected, you want to see all the devices available on it. Use the command ListDevices, followed by the ip address of the network"));
                    $("#tutInput").val("");
                    currentCmd = "listdevices 84.13.52.62";
                    currentCmd = currentCmd.split("");
                    print("tutOutput", ("<br>" + "IP Infected"));
                } else if (currentCmd.join("") == "listdevices 84.13.52.62"){
                    print("tutRoOutput",("<br>" + "<br>" + "Finally, you can sell this information you've found. Don't worry, I'll handle finding a buyer, just pass it off to me and I'll reward you. Type Sell, followed by the IP address and then the MAC number of the device you wish to sell"));
                    $("#tutInput").val("");
                    currentCmd = "sell 84.13.52.62 54-71";
                    currentCmd = currentCmd.split("");

                    data = ["Type", "MAC",
                    "Printer", "54-71"];
                    longest = data.reduce(function (a, b) { return a.length > b.length ? a : b; });
                    for (i = 0; i < 4; i++) {
                        for (count = data[i].length; count < longest.length + 2; count++) {
                            data[i] = data[i] + "\xa0";
                        }
                    }
                    outputStr = "<br>" + "<br>" + data[0] + data[1] + "<br>" + data[2] + data[3] + "<br>";
                    print("tutOutput", outputStr);
                } else if (currentCmd.join("") == "sell 84.13.52.62 54-71"){
                    print("tutRoOutput",("<br>" + "<br>" + "Great! That's all you have to do! You earnt £10 for selling that printer's information, but I can show you how to earn more. All you have to do is do what I say, and that new TV you wanted? Its yours."));
                    $("#tutInput").val("");
                    print("tutOutput", ("<br>" +"Device Sold for £10"));

                    setTimeout(function(){
                        print("tutRoOutput",("<br>" + "<br>" + "Are you in? I'm going to need an answer. Yes? Or no."));
                        currentCmd = "yes";
                        currentCmd = currentCmd.split("");
                    },3000);
                } else if (currentCmd.join("") == "yes"){
                    print("tutRoOutput",("<br>" + "<br>" + "Of course you're in. Now go. Your goal is to make your first £100"));
                    $("#tutInput").val("");
                    setTimeout(function(){
                        closeTutorial();
                        curObj = "Earn £100";
                        localStorage.setItem('tutorial',true);
                        localStorage.setItem('quest',curObj);

                        print("outputMain", "Welcome, User. Type 'help' for a list of commands.");
                        $("#inputMain").val("");
                        $("#UIHeader").text("Stats");
                        printStats();
                        callQuest();
                    },5000);
                }
            }
        }
    };
}

// Helpful Functions /////////////////////////////////////////////////////////////////////////////////

function callNotification(){
    if(expanded == false){
        notifAmt += 1;
        $("#robotNotif").css({opacity: 1});
        $("#robotNotif").text(notifAmt);

        $("#robotNotif").animate({
            height:"4vh",
            width:"4vh",
            fontSize:"2.7vh"
        },10,function(){
            $("#robotNotif").animate({
                height:"3vh",
                width:"3vh",
                fontSize:"2.1vh"
            },300);
        });
        
        $("#robotMenu").addClass("notifAnim");
    } else {
        robotOpen();
    }

    if (muted == false && paused == false){
        notifNoise.currentTime = 0;
        notifNoise.play();
    }
    
}

function print(outputName, text, colour,id,colour2) {
    var obj = document.createElement("span");
    obj.innerHTML = text;
    obj.classList.add(colour);
    obj.classList.add(colour2);
    if (id != false){
        obj.id = id;
    }
    document.getElementById(outputName).appendChild(obj);
    document.getElementById(outputName).scrollTop = document.getElementById(outputName).scrollHeight;
} 

function printStats(){
    $("#UIMenu").text("");
    print("UIMenu","£" + Math.round(balance) + "<br>" + "£" + (Math.round(mineIncome * 10) / 10) + "/s" +  "<br>" + "<br>" + "<br>"+ "Current Objective:" + "<br>" + curObj);
}

function rng(min, max) { // Random Number Gen
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function rag(arrayName) { // Random Array Gen
    return arrayName[Math.floor(Math.random() * arrayName.length)];
}

function shuffle(array) { // Array Shuffle
    var m = array.length, t, i;
    // While there remain elements to shuffle
    while (m) {
        // Pick a remaining element
        i = Math.floor(Math.random() * m--);
        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}

function staggeredOutput(output, str, myClass, isFinal, myClass2){
	var i = 0;
    var arrStr = str.split("");

    var timer = setInterval(function(){
        if (i < str.length){
            print(output,arrStr[i],myClass,false,myClass2);
        } else {
            clearInterval(timer);
            if(isFinal == true){
                textRunning = false;
            }
        }
        i++;
    },100);
}

// Run User Commands /////////////////////////////////////////////////////////////////////////////////

function valCmd() { // Commands Left - Help, Tutorial
    if (cmd !== ""){
        commandHistory[5]=cmd;
        commandHistory.shift();
    }

    if ($("#outputMain span").length > 30){
        do {
            $("#outputMain span")[0].remove();	
          } while ($("#outputMain span").length > 30);
    }


    historyPos = 5;
    outputStr = "<br/>"+ cmd + "<br/>";
    print("outputMain", outputStr,"blue");

    cmd = cmd.toLowerCase();
    cmd = cmd.trim();

    splitCmd = cmd.split(" ");

    // For the final scene
    if (endgame == true){
        if(cmd == "infect 92.39.01.46" || cmd == "inf 92.39.01.46"){
            inendgame = true;
            $("#overlay").css({display:'block'});
            $("#overlay").css({opacity:'0'});
            $("#overlay").animate({
                opacity:'1'
            },3000);
            setTimeout(callEnding,4000);
        } else {
            var answers = ["Nope!", "Wrong", "Try again.", "I own you", "Do it right this time", "You disappoint me"];
            robotContent += (answers[rng(0,5)]);
            robotContent += "<br>" + "<br>";
            callNotification();
            outputStr = "<br>" + "Error";
            print("outputMain", outputStr, "red");
        }
        cmdRun = false;
        return;
    }

    if (cmd == "help") {
        outputStr = "<br>Shop - Display the upgrade shop <br>";
        if(shopItems.cmdShort.bought==true){outputStr += "Bal";} else {outputStr += "Balance";}
        outputStr += " - Display current account balance <br>Scan - Scan current area for networks <br>Rescan - Scan a new area for networks <br>";
        if(shopItems.cmdShort.bought==true){outputStr += "Inf";} else {outputStr += "Infect";}
        outputStr += " - Infect the selected IP <br>";
        if(shopItems.cmdShort.bought==true){outputStr += "Ls";} else {outputStr += "ListDevices";}
        outputStr += "[IP] - List all devices available on an IP <br>";
        if(shopItems.cmdShort.bought==true){outputStr += "S";} else {outputStr += "Sell";}
        outputStr += "[IP][MAC] - Sell a device's information for a lump sum <br>";
        if(shopItems.mine.bought==true){
            if(shopItems.cmdShort.bought==true){outputStr += "M";} else {outputStr += "Mine";}outputStr += "[IP][MAC] - Set a device to mine money every second <br>";
        }
        print("outputMain", outputStr);
        cmdRun = false;
    } else if (cmd == "shop") {
        print("outputMain", "<br>");
        shop();
    } else if (cmd == "balance" || (cmd == "bal" && shopItems.cmdShort.bought == true)) {
        outputStr = "<br>" + "Your Balance is £" + Math.round(balance) + ", earning £" + (Math.round(mineIncome * 10) / 10) + "/s";
        print("outputMain", outputStr);
        cmdRun = false;
    } else if (cmd == "scan") {
        print("outputMain", "<br>");
        scan();
    } else if (cmd == "rescan") {
        print("outputMain", "<br>");
        rescan();
    } else if ((splitCmd[0] == "infect" || (splitCmd[0] == "inf" && shopItems.cmdShort.bought == true)) && currentIps.indexOf(splitCmd[1]) > -1) {
        lastIP = splitCmd[1];
        print("outputMain", "<br>");
        infect(cmd);
    } else if ((splitCmd[0] == "listdevices" || ((splitCmd[0] == "ls" && shopItems.cmdShort.bought == true))) && ((currentIps.indexOf(splitCmd[1]) > -1) || (splitCmd[1] == "ip" && shopItems.fastIP.bought == true))){
        if(currentIps.indexOf(splitCmd[1]) > -1){
            lastIP = splitCmd[1];
            print("outputMain", "<br>");
            list(cmd,true);
        } else if (lastIP == ""){
            print("outputMain", "No saved IP", "red");
        } else {
            print("outputMain", "<br>");
            list(cmd,false);
        }
    } else if ((splitCmd[0] == "sell" || (splitCmd[0] == "s" && shopItems.cmdShort.bought == true)) && (currentIps.indexOf(splitCmd[1]) > -1 || (splitCmd[1] == "ip" && shopItems.fastIP.bought == true)) && (currentMacs.indexOf(splitCmd[2]) > -1 || (possibleMACs.indexOf(splitCmd[2]) > -1 && shopItems.fastMac.bought == true))){
        if(currentIps.indexOf(splitCmd[1]) > -1){
            lastIP = splitCmd[1];
            print("outputMain", "<br>");
            sell(cmd,true);
        } else if (lastIP == ""){
            print("outputMain", "No saved IP", "red");
        } else {
            print("outputMain", "<br>");
            sell(cmd,false);
        }
    } else if (shopItems.mine.bought == true && (splitCmd[0] == "mine" || (splitCmd[0] == "m" && shopItems.cmdShort.bought == true)) && (currentIps.indexOf(splitCmd[1]) > -1 || (splitCmd[1] == "ip" && shopItems.fastIP.bought == true)) && (currentMacs.indexOf(splitCmd[2]) > -1 || (possibleMACs.indexOf(splitCmd[2]) > -1 && shopItems.fastMac.bought == true))){
        if(currentIps.indexOf(splitCmd[1]) > -1){
            lastIP = splitCmd[1];
            print("outputMain", "<br>");
            mine(cmd,true);
        } else if (lastIP == ""){
            print("outputMain", "No saved IP", "red");
        } else {
            print("outputMain", "<br>");
            mine(cmd,false);
        }
    } else if (splitCmd[0] == "buy" && splitCmd[1] < (items.length + 1) && splitCmd[1] > 0) {
        print("outputMain", "<br>");
        buy(cmd);
    } else if (splitCmd[0] == "infect") {                            // When the user doesn"t enter a full command
        outputStr = "<br>" + "Incorrect use. Try Infect [IP] on a valid IP";
        print("outputMain", outputStr, "red");
        cmdRun = false;
    } else if (splitCmd[0] == "inf" && shopItems.cmdShort.bought == true){
        outputStr = "<br>" + "Incorrect use. Try Inf [IP] on a valid IP";
        print("outputMain", outputStr, "red");
        cmdRun = false;
    } else if (splitCmd[0] == "listdevices") {
        outputStr ="<br>" + "Incorrect use. Try ListDevices [IP] on an Infected IP";
        print("outputMain", outputStr, "red");
        cmdRun = false;
    } else if (splitCmd[0] == "ls" && shopItems.cmdShort.bought == true){
        outputStr = "<br>" + "Incorrect use. Try ls [IP] on an Infected IP";
        print("outputMain", outputStr, "red");
        cmdRun = false;
    } else if (splitCmd[0] == "sell") {
        outputStr = "<br>" + "Incorrect use. Try Sell [IP] [DeviceNum] on an Infected IP";
        print("outputMain", outputStr, "red");
        cmdRun = false;
    } else if (splitCmd[0] == "s" && shopItems.cmdShort.bought == true){
        outputStr = "<br>" + "Incorrect use. Try S [IP] [DeviceNum] on an Infected IP";
        print("outputMain", outputStr, "red");
        cmdRun = false;
    }else if (splitCmd[0] == "mine") {
            outputStr = "<br>" + "Incorrect use. Try Mine [IP] [DeviceNum] on an Infected IP";
            print("outputMain", outputStr, "red");
            cmdRun = false;
    } else if (splitCmd[0] == "m" && shopItems.cmdShort.bought == true &&  shopItems.mine.bought == true){
        outputStr = "<br>" + "Incorrect use. Try M [IP] [DeviceNum] on an Infected IP";
        print("outputMain", outputStr, "red");
        cmdRun = false;
    } else if (splitCmd[0] == "buy") {
        outputStr = "<br>" + "Incorrect use. Try Buy [Valid Item Number]";
        print("outputMain", outputStr, "red");
        cmdRun = false;
    }else {
        outputStr = "<br>" + "Unknown Command";
        print("outputMain", outputStr, "red");
        cmdRun = false;
    }

}

// Command Functions /////////////////////////////////////////////////////////////////////////////////
// Shop /////////////////////////////////////////////////////////////////////////////////

function shop(){

    items=[];
    i=0;
    if(shopItems.infection1.bought == false){items[i]=shopItems.infection1;i++;}
    if(shopItems.infection2.bought == false && shopItems.infection1.bought == true){items[i]=shopItems.infection2;i++;}
    if(shopItems.infection3.bought == false && shopItems.infection2.bought == true){items[i]=shopItems.infection3;i++;}
    if(shopItems.infection4.bought == false && shopItems.infection3.bought == true){items[i]=shopItems.infection4;i++;}
    if(shopItems.mine.bought == false){items[i]=shopItems.mine;i++;}
    if(shopItems.cmdShort.bought == false){items[i]=shopItems.cmdShort;i++;}
    if(shopItems.cmdHist.bought == false){items[i]=shopItems.cmdHist;i++;}
    if(shopItems.fastMac.bought == false){items[i]=shopItems.fastMac;i++;}
    if(shopItems.fastIP.bought == false){items[i]=shopItems.fastIP;i++;}
    
    if (items.length !== 0){

        print("outputMain", "Balance : £" + Math.round(balance) + "<br>");
        print("outputMain", "Purchase with Buy [ItemNumber]"+ "<br>");
        outputStr = "";
        data = [];
        a=0;

        if (shopItems.infection1.bought == false){
            data[a] = shopItems.infection1.desc;
            data[a+1] = ("£" + shopItems.infection1.price).toString();
            a+=2;
        }
        if (shopItems.infection2.bought == false && shopItems.infection1.bought == true){
            data[a] = shopItems.infection2.desc;
            data[a+1] = ("£" + shopItems.infection2.price).toString();
            a+=2;
        }
        if (shopItems.infection3.bought == false && shopItems.infection2.bought == true){
            data[a] = shopItems.infection3.desc;
            data[a+1] = ("£" + shopItems.infection3.price).toString();
            a+=2;
        } if (shopItems.infection4.bought == false && shopItems.infection3.bought == true){
            data[a] = shopItems.infection4.desc;
            data[a+1] = ("£" + shopItems.infection4.price).toString();
            a+=2;
        }
        if (shopItems.mine.bought == false){
            data[a] = shopItems.mine.desc;
            data[a+1] = ("£" + shopItems.mine.price).toString();
            a+=2;
        }
        if (shopItems.cmdShort.bought == false){
            data[a] = shopItems.cmdShort.desc;
            data[a+1] = ("£" + shopItems.cmdShort.price).toString();
            a+=2;
        }
        if (shopItems.cmdHist.bought == false){
            data[a] = shopItems.cmdHist.desc;
            data[a+1] = ("£" + shopItems.cmdHist.price).toString();
            a+=2;
        }
        if (shopItems.fastMac.bought == false){
            data[a] = shopItems.fastMac.desc;
            data[a+1] = ("£" + shopItems.fastMac.price).toString();
            a+=2;
        }
        if (shopItems.fastIP.bought == false){
            data[a] = shopItems.fastIP.desc;
            data[a+1] = ("£" + shopItems.fastIP.price).toString();
            a+=2;
        }

        longest = data.reduce(function (a, b) { return a.length > b.length ? a : b; });
        for (i = 0; i < a; i++) {
            for (count = data[i].length; count < longest.length + 2; count++) {
                data[i] = data[i] + "\xa0";
            }
        }

        var b = 1;
        for (i=0;i<a;i+=2){
            outputStr += "<br>" + b + "\xa0" + "\xa0" + "\xa0" + data[i] + "\xa0" + "\xa0" + "\xa0" + data[i+1];
            b++;
        }
        print("outputMain", outputStr);
    } else {
        outputStr = "You have bought everything in the shop";
        print("outputMain",outputStr);
    }
    cmdRun = false;
}

function buy(cmd){

    splitCmd=cmd.split(" ");
   
    var select = parseInt(splitCmd[1]) - 1;
    select = items[select];

    if (balance >= select.price && select.bought == false){

        if (select.desc == "Infect WPA networks" && shopItems.infection1.bought == false){
            outputStr = "You need to buy the WEP upgrade first.";
            print("outputMain",outputStr, "red");
        } else if (select.desc == "Infect WPA2 networks" && shopItems.infection2.bought == false){
            outputStr = "You need to buy the WPA upgrade first.";
            print("outputMain",outputStr, "red");
        } else {
            outputStr = select.instr;
            print("outputMain",outputStr);
            balance -= select.price;
            select.bought = true;
            localStorage.setItem('shop',JSON.stringify(shopItems));
            localStorage.setItem('bal',balance);
            printStats();
            callQuest(true);

            if (select.desc == "Infect WEP networks" || select.desc == "Infect WPA networks" || select.desc == "Infect WPA2 networks" || select.desc == "Infect WPA3 networks"){
                callQuest();
            }
        }
 
    } else if(select.bought == true){
        outputStr = "You have already purchased this upgrade";
        print("outputMain",outputStr, "red");
    } else {
        outputStr = "You can't afford this upgrade";
        print("outputMain",outputStr, "red");
    }
    cmdRun = false;
}

// Scanning /////////////////////////////////////////////////////////////////////////////////

function scan() {

    outputStr = "Scanning..." + "<br>";
    print("outputMain", outputStr);

    setTimeout(scanP2, 2000);
}

function scanP2() {

    var data = ["Name", "IP", "Security",
        ip1.name, ip1.ip, ip1.security,
        ip2.name, ip2.ip, ip2.security,
        ip3.name, ip3.ip, ip3.security,
        ip4.name, ip4.ip, ip4.security,
        ip5.name, ip5.ip, ip5.security,
        ip6.name, ip6.ip, ip6.security];

    for (i=1;i<7;i++){
        if(currentIpNum[(i-1)].status == "Infected"){
            data[(i*3 + 2)] = "Infected";
        }
    }

    var longest = data.reduce(function (a, b) { return a.length > b.length ? a : b; });
    var i;
    var count;

    for (i = 0; i < 21; i++) {
        for (count = data[i].length; count < longest.length + 2; count++) {
            data[i] = data[i] + "\xa0";
        }
    }

    outputStr = data[0] + data[1] + data[2] + "<br>" + data[3] + data[4] + data[5] + "<br>" + data[6] + data[7] + data[8] + "<br>" +
        data[9] + data[10] + data[11] + "<br>" + data[12] + data[13] + data[14] + "<br>" + data[15] + data[16] + data[17] + "<br>" + data[18] + data[19] +
        data[20];
    print("outputMain", outputStr);
    cmdRun = false;
}

function rescan(){
    outputStr = "Scanning new area..." + "<br>";
    print("outputMain", outputStr);

    setTimeout(function(){rescanP2(); scanP2();}, 2000);
}

function rescanP2(){
    wifiNames = shuffle(wifiNames);

    ip1 = ipGen(0);
    ip2 = ipGen(1);
    ip3 = ipGen(2);
    ip4 = ipGen(3);
    ip5 = ipGen(4);
    ip6 = ipGen(5);

    currentIpNum = [ip1, ip2, ip3, ip4, ip5, ip6];
    for (i=0;i<6;i++){
        currentIpNum[i].ip = [("0" + rng(0,99)).slice(-2) + "." + ("0" + rng(0,99)).slice(-2) + "." + ("0" + rng(0,99)).slice(-2) + "." + ("0" + rng(0,99)).slice(-2)].toString();
    
        if (currentIps.includes(currentIpNum[i].ip) == true){
            currentIpNum[i].ip = [("0" + rng(0,99)).slice(-2) + "." + ("0" + rng(0,99)).slice(-2) + "." + ("0" + rng(0,99)).slice(-2) + "." + ("0" + rng(0,99)).slice(-2)].toString();
            currentIps[i] = currentIpNum[i].ip;
        }
        currentIps[i] = currentIpNum[i].ip;
    }
    currentIps = [ip1.ip, ip2.ip, ip3.ip, ip4.ip, ip5.ip, ip6.ip];

    var noneSecurity = false;
    for (i = 0; i < 6; i++) {
        if (currentIpNum[i].security == "None"){
            noneSecurity = true;
        }
    }
    if (noneSecurity == false){
        currentIpNum[rng(0,5)].security = "None";
    }
    
    for (i = 0; i < 6; i++) {
    
        if (currentIpNum[i].security == "None") {
            currentIpNum[i].status = "Unprotected";
        } else {
            currentIpNum[i].status = "Protected";
        }
    
        switch (currentIpNum[i].security){
            case "None":
                var a = rng(1,2);
                switch(a){
                    case 1:
                        currentIpNum[i].mac1type = macTypes[macTypes0[rng(0,3)]];
                        break;
                    case 2:
                        currentIpNum[i].mac1type = macTypes[macTypes0[rng(0,3)]];
                        currentIpNum[i].mac2type = macTypes[macTypes0[rng(0,3)]];
                        break;
                    }
                break;
            case "WEP":
                a = rng(1,3);
                switch(a){
                    case 1:
                        currentIpNum[i].mac1type = macTypes[macTypes1[rng(0,3)]];
                        break;
                    case 2:
                        currentIpNum[i].mac1type = macTypes[macTypes1[rng(0,3)]];
                        currentIpNum[i].mac2type = macTypes[macTypes1[rng(0,3)]];
                        break;
                    case 3:
                        currentIpNum[i].mac1type = macTypes[macTypes1[rng(0,3)]];
                        currentIpNum[i].mac2type = macTypes[macTypes1[rng(0,3)]];
                        currentIpNum[i].mac3type = macTypes[macTypes1[rng(0,3)]];
                        break;
                }
                break;
            case "WPA":
                a = rng(2,3);
                switch(a){
                    case 2:
                        currentIpNum[i].mac1type = macTypes[macTypes2[rng(0,3)]];
                        currentIpNum[i].mac2type = macTypes[macTypes2[rng(0,3)]];
                        break;
                    case 3:
                        currentIpNum[i].mac1type = macTypes[macTypes2[rng(0,3)]];
                        currentIpNum[i].mac2type = macTypes[macTypes2[rng(0,3)]];
                        currentIpNum[i].mac3type = macTypes[macTypes2[rng(0,3)]];
                        break;
                }
                break;
            case "WPA2":
                a = rng(3,4);
                switch(a){
                    case 3:
                        currentIpNum[i].mac1type = macTypes[macTypes3[rng(0,3)]];
                        currentIpNum[i].mac2type = macTypes[macTypes3[rng(0,3)]];
                        currentIpNum[i].mac3type = macTypes[macTypes3[rng(0,3)]];
                        break;
                    case 4:
                        currentIpNum[i].mac1type = macTypes[macTypes3[rng(0,3)]];
                        currentIpNum[i].mac2type = macTypes[macTypes3[rng(0,3)]];
                        currentIpNum[i].mac3type = macTypes[macTypes3[rng(0,3)]];
                        currentIpNum[i].mac4type = macTypes[macTypes3[rng(0,3)]];
                        break;
                }
                break;
        }
    }
}

// Infect /////////////////////////////////////////////////////////////////////////////////

function infect(cmd) {

    var split = cmd.split(" ");
    var splitIpNum = currentIps.indexOf(split[1]);  
    var ipNum = currentIpNum[splitIpNum]; 

    if (ipNum.status != "Infected"){
        if((ipNum.security == "None") || (ipNum.security == "WEP" && shopItems.infection1.bought == true) || (ipNum.security == "WPA" && shopItems.infection2.bought == true) || (ipNum.security == "WPA2" && shopItems.infection3.bought == true)){
            outputStr = "Infecting...";
            print("outputMain", outputStr);
            setTimeout(function(){print("outputMain", " Infected.");cmdRun = false;}, 2000);
            ipNum.status = "Infected";
            if (ipNum.security == "WEP" && infWEP == false){
                infWEP = true;
                callQuest();
            }
        } else if(ipNum.status == "Protected"){
            outputStr = "The network is protected. Target an IP with no security, or upgrade your tools.";
            print("outputMain", outputStr,"red");
            cmdRun = false;
        } else {
            outputStr = "Network already infected";
            print("outputMain", outputStr,"red");
            cmdRun = false;
        }
    }  else {
        outputStr = "Network already infected";
        print("outputMain", outputStr,"red");
        cmdRun = false;
    }
}

// List /////////////////////////////////////////////////////////////////////////////////

function list(cmd,hasIP) {

    var ipNum;
    var splitIpNum;

    if (hasIP == false){
        splitIpNum = currentIps.indexOf(lastIP);
        ipNum =  currentIpNum[splitIpNum]; 
    } else {
        var split = cmd.split(" ");
        splitIpNum = currentIps.indexOf(split[1]);
        ipNum = currentIpNum[splitIpNum]; 
    }

    switch (ipNum.status) {
        case "Infected":

            outputStr = "Listing..." + "<br>";
            print("outputMain", outputStr);

            setTimeout(function () {
                listP2(ipNum);
            }, 2000);

            break;
        default:
            outputStr = "Network not infected";
            print("outputMain", outputStr);
            cmdRun = false;
    }

}

function listP2(ipNum) {

    // Randomly Gen MAC numbers in format xx-xx

    ipNum.mac1 = [("0" + rng(0,99)).slice(-2) + "-" + ("0" + rng(0,99)).slice(-2)].toString();
    currentMacs.push(ipNum.mac1);

    if (ipNum.mac2type !== ""){
        ipNum.mac2 = [("0" + rng(0,99)).slice(-2) + "-" + ("0" + rng(0,99)).slice(-2)].toString();
        currentMacs.push(ipNum.mac2);
        if (ipNum.mac3type !== ""){
            ipNum.mac3 = [("0" + rng(0,99)).slice(-2) + "-" + ("0" + rng(0,99)).slice(-2)].toString();
            currentMacs.push(ipNum.mac3);
            if (ipNum.mac4type !== ""){
                ipNum.mac4 = [("0" + rng(0,99)).slice(-2) + "-" + ("0" + rng(0,99)).slice(-2)].toString();
                currentMacs.push(ipNum.mac4);
            }
        }
    }

    if (ipNum.mac4type !== ""){
        data = ["Num", "Type",
            ipNum.mac1, ipNum.mac1type,
            ipNum.mac2, ipNum.mac2type,
            ipNum.mac3, ipNum.mac3type,
            ipNum.mac4, ipNum.mac4type];

        if(ipNum.mac1status == "Sold"){
            data[2] = "Sold";
        }
        if(ipNum.mac2status == "Sold"){
            data[4] = "Sold";
        }
        if(ipNum.mac3status == "Sold"){
            data[6] = "Sold";
        }
        if(ipNum.mac4status == "Sold"){
            data[8] = "Sold";
        }

        longest = data.reduce(function (a, b) { return a.length > b.length ? a : b; });
        for (i = 0; i < 10; i++) {
            for (count = data[i].length; count < longest.length + 2; count++) {
                data[i] = data[i] + "\xa0";
            }
        }
        outputStr = data[0] + data[1] + "<br>" + data[2] + data[3] + "<br>" + data[4] + data[5] + "<br>" + data[6] + data[7] + "<br>" + data[8] + data[9];

    } else if (ipNum.mac3type !== ""){
        data = ["Num", "Type",
            ipNum.mac1, ipNum.mac1type,
            ipNum.mac2, ipNum.mac2type,
            ipNum.mac3, ipNum.mac3type];

        if(ipNum.mac1status == "Sold"){
            data[2] = "Sold";
        }
        if(ipNum.mac2status == "Sold"){
            data[4] = "Sold";
        }
        if(ipNum.mac3status == "Sold"){
            data[6] = "Sold";
        }
        
        longest = data.reduce(function (a, b) { return a.length > b.length ? a : b; });
        for (i = 0; i < 8; i++) {
            for (count = data[i].length; count < longest.length + 2; count++) {
                data[i] = data[i] + "\xa0";
            }
        }
        outputStr = data[0] + data[1] + "<br>" + data[2] + data[3] + "<br>" + data[4] + data[5] + "<br>" + data[6] + data[7];

    } else if (ipNum.mac2type !== ""){
        data = ["Num", "Type",
            ipNum.mac1, ipNum.mac1type,
            ipNum.mac2, ipNum.mac2type];

        if(ipNum.mac1status == "Sold"){
            data[2] = "Sold";
        }
        if(ipNum.mac2status == "Sold"){
            data[4] = "Sold";
        }
        
        longest = data.reduce(function (a, b) { return a.length > b.length ? a : b; });
        for (i = 0; i < 6; i++) {
            for (count = data[i].length; count < longest.length + 2; count++) {
                data[i] = data[i] + "\xa0";
            }
        }
        outputStr = data[0] + data[1] + "<br>" + data[2] + data[3] + "<br>" + data[4] + data[5];

    } else {
        data = ["Num", "Type",
        ipNum.mac1, ipNum.mac1type];

        if(ipNum.mac1status == "Sold"){
            data[2] = "Sold";
        }

        longest = data.reduce(function (a, b) { return a.length > b.length ? a : b; });
        for (i = 0; i < 4; i++) {
            for (count = data[i].length; count < longest.length + 2; count++) {
                data[i] = data[i] + "\xa0";
            }
        }
        outputStr = data[0] + data[1] + "<br>" + data[2] + data[3];
    }

    print("outputMain", outputStr);
    cmdRun = false;
}

// Sell and Mine /////////////////////////////////////////////////////////////////////////////////

function sell(cmd, hasIP) {
    var split = cmd.split(" ");
    var splitIpNum;
    var ipNum;

    if (hasIP == false){
        splitIpNum = currentIps.indexOf(lastIP);
        ipNum =  currentIpNum[splitIpNum]; 
    } else {
        splitIpNum = currentIps.indexOf(split[1]);
        ipNum = currentIpNum[splitIpNum]; 
    }

    if ((split[2] == ipNum.mac1 || split[2] == "mac1") && ipNum.mac1status != "Sold" && ipNum.mac1type != "") {
        ipNum.mac1status = "Sold";
        balance += macPrices[macTypes.indexOf(ipNum.mac1type)];
        outputStr = "Sold " + ipNum.mac1type + " Information for £" + macPrices[macTypes.indexOf(ipNum.mac1type)];
        print("outputMain", outputStr);
        localStorage.setItem('bal',balance);
        printStats();
        callQuest(true);
    } else if ((split[2] == ipNum.mac2 || split[2] == "mac2")  && ipNum.mac2status != "Sold" && ipNum.mac2type != "") {
        ipNum.mac2status = "Sold";
        balance += macPrices[macTypes.indexOf(ipNum.mac2type)];
        outputStr = "Sold " + ipNum.mac2type + " Information for £" + macPrices[macTypes.indexOf(ipNum.mac2type)];
        print("outputMain", outputStr);
        printStats();
        callQuest(true);
        localStorage.setItem('bal',balance);
    } else if ((split[2] == ipNum.mac3 || split[2] == "mac3" ) && ipNum.mac3status != "Sold" && ipNum.mac3type != "") {
        ipNum.mac3status = "Sold";
        balance += macPrices[macTypes.indexOf(ipNum.mac3type)];
        outputStr = "Sold " + ipNum.mac3type + " Information for £" + macPrices[macTypes.indexOf(ipNum.mac3type)];
        print("outputMain", outputStr);
        localStorage.setItem('bal',balance);
        printStats();
        callQuest(true);
    } else if ((split[2] == ipNum.mac4 || split[2] == "mac4" ) && ipNum.mac4status != "Sold" && ipNum.mac4type != "") {
        ipNum.mac4status = "Sold";
        balance += macPrices[macTypes.indexOf(ipNum.mac4type)];
        outputStr = "Sold " + ipNum.mac4type + " Information for £" + macPrices[macTypes.indexOf(ipNum.mac4type)];
        print("outputMain", outputStr);
        localStorage.setItem('bal',balance);
        printStats();
        callQuest(true);
    } else {
        outputStr = "Incorrect use. Try Sell [IP] [DeviceNum] on an Unsold Device";
        print("outputMain", outputStr);
    }
    cmdRun = false;
}

function mine(cmd, hasIP){
    var split = cmd.split(" ");
    var splitIpNum;
    var ipNum;

    if (hasIP == false){
        splitIpNum = currentIps.indexOf(lastIP);
        ipNum =  currentIpNum[splitIpNum]; 
    } else {
        splitIpNum = currentIps.indexOf(split[1]);
        ipNum = currentIpNum[splitIpNum]; 
    }

        if ((split[2] == ipNum.mac1 || split[2] == "mac1") && ipNum.mac1status != "Sold" && ipNum.mac1type != "") {
        ipNum.mac1status = "Sold";
        mineIncome += minePrices[macTypes.indexOf(ipNum.mac1type)];
        localStorage.setItem("mineIncome",mineIncome);
        outputStr = "Now mining " + ipNum.mac1type + " for £" + minePrices[macTypes.indexOf(ipNum.mac1type)] + "/s";
        print("outputMain", outputStr);

    } else if ((split[2] == ipNum.mac2 || split[2] == "mac2")  && ipNum.mac2status != "Sold" && ipNum.mac2type != "") {
        ipNum.mac2status = "Sold";
        mineIncome += minePrices[macTypes.indexOf(ipNum.mac2type)];
        localStorage.setItem("mineIncome",mineIncome);
        outputStr = "Now mining " + ipNum.mac2type + " for £" + minePrices[macTypes.indexOf(ipNum.mac2type)] + "/s";
        print("outputMain", outputStr);

    } else if ((split[2] == ipNum.mac3 || split[2] == "mac3" ) && ipNum.mac3status != "Sold" && ipNum.mac3type != "") {
        ipNum.mac3status = "Sold";
        mineIncome += minePrices[macTypes.indexOf(ipNum.mac3type)];
        localStorage.setItem("mineIncome",mineIncome);
        outputStr = "Now mining " + ipNum.mac3type + " for £" + minePrices[macTypes.indexOf(ipNum.mac3type)] + "/s";
        print("outputMain", outputStr);

    } else if ((split[2] == ipNum.mac4 || split[2] == "mac4" ) && ipNum.mac4status != "Sold" && ipNum.mac4type != "") {
        ipNum.mac4status = "Sold";
        mineIncome += minePrices[macTypes.indexOf(ipNum.mac4type)];
        localStorage.setItem("mineIncome",mineIncome);
        outputStr = "Now mining " + ipNum.mac4type + " for £" + minePrices[macTypes.indexOf(ipNum.mac4type)] + "/s";
        print("outputMain", outputStr);

    } else {
        outputStr = "Incorrect use. Try Mine [IP] [DeviceNum] on an Unsold Device";
        print("outputMain", outputStr);
    }
    cmdRun = false;
}