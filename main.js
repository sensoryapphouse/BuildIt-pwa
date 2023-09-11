window.onload = () => {
    'use strict';

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('./sw.js');
    }
    camStart();
}

var settings;
var panel;
var switchSetting = 1;
var currentSwitch = 1;
var targetCount = 0;
var posX = 5;
var posY = 5;
var height;
var width;

var target;
var b4;
var b3;
var animatingIt;

function loadFile(str, h, x, y) {
    try {
        target.remove();
    } catch (e) {}
    target = snap.image(str, 100, 100);
    //setTimeout(myTimeout1, 20);
    //	b3 = snap.image("2.gif", 200, 200);
    b4 = snap.image("2.svg", 100, 100);

    //	function myTimeout1() {
    //		target.attr({
    //			display: ""
    //		});
    //	}
}

var svgContainer;

// Override the function with all the posibilities
navigator.getUserMedia ||
    (navigator.getUserMedia = navigator.mozGetUserMedia ||
        navigator.webkitGetUserMedia || navigator.msGetUserMedia);

var xmlDoc;
var Activities;
var activityNo;
var Steps;
var currentStep;
var stepNo;
var currentActivity;

function getXMLInfo(vr, s, no) {
    //var s1 = vr.getElementsByTagName(s)[no].childNodes[0].nodeValue;
    //s1 = s1.replace(/ /g, '%20');
    return vr.getElementsByTagName(s)[no].childNodes[0].nodeValue;
}
var svgs = [];
var imgBB = [];
var background;
var foreground;
var backName = "";

function waitforimagestoload() {
    for (i = 0; i < Steps; i++) {
        if (getXMLInfo(currentActivity, "Image", i) != 'nil') {
            var centreX = parseFloat(getXMLInfo(currentActivity, "CentreX", i));
            var centreY = parseFloat(getXMLInfo(currentActivity, "CentreY", i));
            var h = parseFloat(getXMLInfo(currentActivity, "Height", i));
            imgBB[i] = svgs[i].getBBox();
            if (h == 100) {
                svgs[i].attr({
                    display: "none",
                    height: window.innerHeight,
                    width: window.innerWidth,
                    x: 0,
                    y: 0
                });
            } else
                svgs[i].attr({
                    display: "none",
                    height: h * window.innerHeight / 100,
                    width: (imgBB[i].width / imgBB[i].height) * h * window.innerHeight / 100,
                    x: -(imgBB[i].width / imgBB[i].height) * h * window.innerHeight / 200 + (centreX * window.innerWidth) / 100,
                    y: -h * window.innerHeight / 200 + (centreY * window.innerHeight) / 100,
                });
        }
    }
    //        setTimeout(waittodostep, 200);
    //
    //        function waittodostep() {
    DoStep();
    //        }
}

function FirstStep() {
    var oldbackname = backName;
    backName = "resources/" + getXMLInfo(currentActivity, "Background", 0);
    for (j = 0; j < svgs.length; j++)
        svgs[j].remove();
    if (backName != oldbackname) {
        if (background != undefined)
            background.remove();
        background = snap.image(backName, 0, 0, window.innerWidth, window.innerHeight);
    }
    setTimeout(LoadImages, 100);

    function LoadImages() {
        for (i = 0; i < Steps; i++) {
            var img = getXMLInfo(currentActivity, "Image", i);
            if (img != 'nil') {
                svgs[i] = snap.image("resources/" + img, 0, 0);
                svgs[i].attr({
                    display: "none"
                });
            }
        }
        setTimeout(LoadForeground, 200);

        function LoadForeground() {
            var fore = "resources/" + getXMLInfo(currentActivity, "Foreground", 0);
            if (foreground != undefined)
                foreground.remove();
            if (fore === "resources/nil")
                fore = 'resources/blank.png';
            else
                foreground = snap.image(fore, 0, 0, window.innerWidth, window.innerHeight);
            setTimeout(waitforimagestoload, 100);

        }
    }
}


var duration;
var stopAnimation;
var stillAnimating = false;

function ShowPress() {
    if (currentSwitch == 1)
        ibuttonm.hidden = false;
    else
        ibuttonmr.hidden = false;
}

function HidePress() {
    ibuttonm.hidden = true;
    ibuttonmr.hidden = true;
}

function showAndAnimate(i, anim, showbutton) {
    HidePress();
    svgs[i].attr({
        display: ''
    });
    var centreX = parseFloat(getXMLInfo(currentActivity, "CentreX", i));
    var centreY = parseFloat(getXMLInfo(currentActivity, "CentreY", i));
    var h = parseFloat(getXMLInfo(currentActivity, "Height", i));
    h = h * window.innerHeight / 100;
    duration = anim.replace(/[^0-9&.]/g, '');
    if (duration == "")
        duration = 1;
    else if (duration == 0) {
        ShowPress();
        stillAnimating = false;
    } else
        duration = 1000 * parseFloat(duration);
    if (!stillAnimating) {
        stillAnimating = true;
        animatingIt = setTimeout(endAnimating, duration);
    }

    function endAnimating() {
        stillAnimating = false;
        if (duration > 10 && showbutton)
            setTimeout(ShowPress, 10);
    }

    var animMina = mina.linear;
    if (anim.indexOf("elastic") > 0)
        animMina = mina.elastic;
    else if (anim.indexOf("easeinout") > 0)
        animMina = mina.easeinout;
    else if (anim.indexOf("easeout") > 0)
        animMina = mina.easeout;
    else if (anim.indexOf("easein") > 0)
        animMina = mina.easin;
    else if (anim.indexOf("backin") > 0)
        animMina = mina.backin;
    else if (anim.indexOf("backout") > 0)
        animMina = mina.backout;
    else if (anim.indexOf("bounce") > 0)
        animMina = mina.bounce;
    var paren = anim.indexOf("(");
    if (paren > 0)
        anim = anim.substring(0, paren);
    switch (anim) {
        case "Hide":
            svgs[i].attr({
                opacity: '0'
            });
            break;
        case "Outline":
            svgs[i].attr({
                filter: snap.filter(Snap.filter.brightness(0))
            });
            break;
        case "N":
            Snap.animate(svgs[i].attr("y"), -h, function (val) {
                svgs[i].attr({
                    y: val
                });
            }, duration, animMina);
            break;
        case "S":
            Snap.animate(svgs[i].attr("y"), window.innerHeight, function (val) {
                svgs[i].attr({
                    y: val
                });
            }, duration, animMina);
            break;
        case "E":
            Snap.animate(svgs[i].attr("x"), window.innerWidth, function (val) {
                svgs[i].attr({
                    x: val
                });
            }, duration, animMina);
            break;
        case "W":
            Snap.animate(svgs[i].attr("x"), -svgs[i].attr("x"), function (val) {
                svgs[i].attr({
                    x: val
                });
            }, duration, animMina);
            break;
        case "NE":
            var x1 = parseFloat(svgs[i].attr("x"));
            var y1 = parseFloat(svgs[i].attr("y"));
            Snap.animate(svgs[i].attr("y"), -h, function (val) {
                svgs[i].attr({
                    y: val,
                    x: x1 - val + y1
                });
            }, duration, animMina);
            break;
        case "NW":
            var x1 = parseFloat(svgs[i].attr("x"));
            var y1 = parseFloat(svgs[i].attr("y"));
            Snap.animate(svgs[i].attr("y"), -h, function (val) {
                svgs[i].attr({
                    y: val,
                    x: x1 + val - y1
                });
            }, duration, animMina);
            break;
        case "SE":
            var x1 = parseFloat(svgs[i].attr("x"));
            var y1 = parseFloat(svgs[i].attr("y"));
            Snap.animate(svgs[i].attr("y"), window.innerHeight, function (val) {
                svgs[i].attr({
                    y: val,
                    x: x1 + val - y1
                });
            }, duration, animMina);
            break;
        case "SW":
            var x1 = pars - Float(svgs[i].attr("x"));
            var y1 = parseFloat(svgs[i].attr("y"));
            Snap.animate(svgs[i].attr("y"), window.innerHeight, function (val) {
                svgs[i].attr({
                    y: val,
                    x: x1 - val + y1
                });
            }, duration, animMina);
            break;
        case "JumpAroundSmall":
            var count = 0;
            stopAnimation = false;
            setTimeout(JumpAroundSmall, 100);

            function JumpAroundSmall() {
                var x1 = parseFloat(svgs[i].attr("x"));
                var y1 = parseFloat(svgs[i].attr("y"));
                count++;
                if (count > duration / 100)
                    return;
                if (stopAnimation)
                    return;
                svgs[i].attr({
                    x: x1 + (Math.random() - 0.5) * h / 6,
                    y: y1 + (Math.random() - 0.5) * h / 6
                });
                setTimeout(JumpAroundSmall, 100);
            }
            break;
        case "JumpAroundMedium":
            var count = 0;
            var x1 = parseFloat(svgs[i].attr("x"));
            var y1 = parseFloat(svgs[i].attr("y"));
            stopAnimation = false;
            setTimeout(JumpAroundMedium, 100);

            function JumpAroundMedium() {
                count++;
                if (count > duration / 100)
                    return;
                if (stopAnimation)
                    return;
                svgs[i].attr({
                    x: x1 + (Math.random() - 0.5) * h / 3,
                    y: y1 + (Math.random() - 0.5) * h / 3
                });
                setTimeout(JumpAroundMedium, 100);
            }
            break;
        case "JumpAroundLarge":
            var count = 0;
            var x1 = parseFloat(svgs[i].attr("x"));
            var y1 = parseFloat(svgs[i].attr("y"));
            stopAnimation = false;
            setTimeout(JumpAroundLarge, 100);

            function JumpAroundLarge() {
                count++;
                if (count > duration / 100)
                    return;
                if (stopAnimation)
                    return;
                svgs[i].attr({
                    x: x1 + (Math.random() - 0.5) * h,
                    y: y1 + (Math.random() - 0.5) * h
                });
                setTimeout(JumpAroundLarge, 100);
            }
            break;
        case "JumpAround":
            var count = 0;
            var x1 = parseFloat(svgs[i].attr("x"));
            var y1 = parseFloat(svgs[i].attr("y"));
            stopAnimation = false;
            setTimeout(JumpAround, 100);

            function JumpAround() {
                count++;
                if (count > duration / 100)
                    return;
                if (stopAnimation)
                    return;
                svgs[i].attr({
                    x: x1 + (Math.random() - 0.5) * (window.innerWidth - h),
                    y: y1 + (Math.random() - 0.5) * (window.innerHeight - h)
                });
                setTimeout(JumpAround, 100);
            }
            break;
        case "Rock":
            Snap.animate(0, 20, function (val) {
                svgs[i].attr({
                    transform: 'r' + Math.sin(val) * 20
                });
            }, duration, animMina);
            break;
        case "JustFlipH":
            svgs[i].attr({
                transform: 's(-1,1)'
            });
            break;
        case "JustFlipBack":
            svgs[i].attr({
                transform: 's(1,1)'
            });
            break;
        case "FlipV":
            Snap.animate(1, -1, function (val) {
                svgs[i].attr({
                    transform: 's(1,' + val + ')'
                });
            }, duration, animMina);
            break;
        case "FlipH":
            Snap.animate(-1, 1, function (val) {
                svgs[i].attr({
                    transform: 's(' + val + ', 1)'
                });
            }, duration, animMina);
            break;
        case "Shrink":
            Snap.animate(1, .1, function (val) {
                svgs[i].attr({
                    transform: 's' + val
                });
            }, duration, animMina);
            break;
        case "ShrinkSpin":
            Snap.animate(1, .1, function (val) {
                svgs[i].attr({
                    transform: 's' + val + 'r' + val * 360
                });
            }, duration, animMina);
            break;
        case "TopIn":
            Snap.animate(-h, svgs[i].attr("y"), function (val) {
                svgs[i].attr({
                    y: val
                });
            }, duration, animMina);
            break;
        case "BottomIn":
            Snap.animate(window.innerHeight, svgs[i].attr("y"), function (val) {
                svgs[i].attr({
                    y: val
                });
            }, duration, animMina);
            break;
        case "RightIn":
            Snap.animate(window.innerWidth, svgs[i].attr("x"), function (val) {
                svgs[i].attr({
                    x: val
                });
            }, duration, animMina);
            break;
        case "LeftIn":
            Snap.animate(-((imgBB[i].width / imgBB[i].height) * h), svgs[i].attr("x"), function (val) {
                svgs[i].attr({
                    x: val
                });
            }, duration, animMina);
            break;
        case "FadeIn":
            Snap.animate(0, 1, function (val) {
                svgs[i].attr({
                    opacity: val
                });
            }, duration, animMina);
            break;
        case "Saturate":
            Snap.animate(1, 0, function (val) {
                svgs[i].attr({
                    filter: snap.filter(Snap.filter.saturate(val))
                });
            }, duration, animMina);
            break;
        case "WideToNormal":
            Snap.animate(2, 1, function (val) {
                svgs[i].attr({
                    transform: 's(' + val + ', 1)'
                });
            }, duration, animMina);
            break;
        case "TallToNormal":
            Snap.animate(2, 1, function (val) {
                svgs[i].attr({
                    transform: 's(1,' + val + ')'
                });
            }, duration, animMina);
            break;
        case "ThinToWide":
            Snap.animate(0, 1, function (val) {
                svgs[i].attr({
                    transform: 's(' + val + ', 1)'
                });
            }, duration, animMina);
            break;
        case "ShortToTall":
            Snap.animate(0, 1, function (val) {
                svgs[i].attr({
                    transform: 's(1,' + val + ')'
                });
            }, duration, animMina);
            break;
        case "FlipInH":
            Snap.animate(-1, 1, function (val) {
                svgs[i].attr({
                    transform: 's(' + val + ', 1)'
                });
            }, duration, animMina);
            break;
        case "FlipInV":
            Snap.animate(0, 1, function (val) {
                svgs[i].attr({
                    transform: 's(1,' + val + ')'
                });
            }, duration, animMina);
            break;
        case "GrowSpin":
            Snap.animate(0, 1, function (val) {
                svgs[i].attr({
                    transform: 's' + val + 'r' + val * 360
                });
            }, duration, animMina);
            break;
        case "Spin":
            Snap.animate(0, 1, function (val) {
                svgs[i].attr({
                    transform: 'r' + val * 360
                });
            }, duration, animMina);
            break;
        case "SpinA":
            Snap.animate(0, 1, function (val) {
                svgs[i].attr({
                    transform: 'r' + val * 720
                });
            }, duration, animMina);
            break;
        case "SpinB":
            Snap.animate(0, 1, function (val) {
                svgs[i].attr({
                    transform: 'r' + val * 1080
                });
            }, duration, animMina);
            break;
        case "Grow":
            Snap.animate(0, 1, function (val) {
                svgs[i].attr({
                    transform: 's' + val
                });
            }, duration, animMina);
            break;
        case "HueSpin":
            Snap.animate(0, 360, function (val) { // animate hue shift
                svgs[i].attr({
                    filter: snap.filter(Snap.filter.hueRotate(val))
                });
            }, duration, animMina);
            break;
        case "HueSpinA":
            Snap.animate(0, 720, function (val) { // animate hue shift
                svgs[i].attr({
                    filter: snap.filter(Snap.filter.hueRotate(val))
                });
            }, duration, animMina);
            break;
        case "HueSpinB":
            Snap.animate(0, 1080, function (val) { // animate hue shift
                svgs[i].attr({
                    filter: snap.filter(Snap.filter.hueRotate(val))
                });
            }, duration, animMina);
            break;
        case "Blur":
            Snap.animate(10, 1, function (val) { // animate hue shift
                svgs[i].attr({
                    filter: snap.filter(Snap.filter.blur(val))
                });
            }, duration, animMina);
            break;
        case "Brighten":
            svgs[i].attr({
                filter: snap.filter(Snap.filter.brightness(1))
            });
            break;
            //            Snap.animate(0, 1, function (val) { // animate hue shift
            //                svgs[i].attr({
            //                    filter: snap.filter(Snap.filter.brightness(val))
            //                });
            //            }, duration, animMina);
            //            break;
        case "Contrast":
            Snap.animate(0, 1, function (val) { // animate hue shift
                svgs[i].attr({
                    filter: snap.filter(Snap.filter.contrast(val))
                });
            }, duration, animMina);
            break;
        case "Invert":
            Snap.animate(1, 0, function (val) { // animate hue shift
                svgs[i].attr({
                    filter: snap.filter(Snap.filter.invert(val))
                });
            }, duration, animMina, anim1);
            break;
        case "LoopTest":
            var anim2 = function () {
                Snap.animate(1, .95, function (val) { // animated flip
                    svgs[i].attr({
                        transform: 's' + val
                    });
                }, 1000, mina.easeinout, anim1);
            }
            var anim1 = function () {
                Snap.animate(.95, 1., function (val) { // animated flip
                    svgs[i].attr({
                        transform: 's' + val
                    });
                }, 1000, mina.easeinout, anim2);
            }
            Snap.animate(0, 1, function (val) {
                svgs[i].attr({
                    transform: 's' + val
                });
            }, duration, animMina, anim1);
            break;
        case "Jiggle":
            var y1 = parseFloat(svgs[i].attr("y"));
            Snap.animate(0, 1, function (val) {
                var x1 = parseFloat(svgs[i].attr("x")) + (Math.random() - .5) * h / 20;
                var y1 = parseFloat(svgs[i].attr("y")) + (Math.random() - .5) * h / 20;
                svgs[i].attr({
                    x: x1,
                    y: y1
                });
            }, duration, animMina);
            break;
        case "Wobble":
            Snap.animate(0, 1, function (val) {
                var x1 = parseFloat(svgs[i].attr("height")) + (Math.random() - .5) * h / 5;
                var y1 = parseFloat(svgs[i].attr("width")) + (Math.random() - .5) * h / 5;
                svgs[i].attr({
                    height: x1,
                    width: y1
                });
            }, duration, animMina);
            break;
    }
}

function DoStep() {
    for (i = 0; i < Steps; i++) {
        if (getXMLInfo(currentActivity, "StepNo", i) == stepNo.toString()) {
            var snd = "resources/" + getXMLInfo(currentActivity, "Sound", i);
            PlaySound(snd);
            var animation = getXMLInfo(currentActivity, "Animation", i);
            if (svgs[i] != 'undefined' && animation != 'nil') {
                if (animation.indexOf('*') > 0) { // two animations for same item
                    showAndAnimate(i, animation.substr(0, animation.indexOf('*')), true);
                    showAndAnimate(i, animation.substr(animation.indexOf('*') + 1), true);
                } else
                    showAndAnimate(i, animation, true);
            }
            if (animation == 'nil') {
                svgs[i].attr({
                    display: ''
                });
                ShowPress();
            }
            if (i == Steps - 1) { // final animation
                snd = "";
            }
            break;
        }
    }
    if (stepNo == Steps - 1) {
        HidePress();
        clearTimeout(animatingIt);
        stillAnimating = false;
        var action = currentActivity.getElementsByTagName("Action")[0].childNodes[0].nodeValue;
        var stepAni = currentActivity.getElementsByTagName("StepAni")[0].childNodes[0].nodeValue;
        var autoNext = currentActivity.getElementsByTagName("NextAfterReward")[0].childNodes[0].nodeValue;
        //		var i2 = parseInt(stepAni.substr(0, 1));
        if (action != 'nil') {
            if (action.indexOf('+') > 0) { // animate 2 seperately
                showAndAnimate(parseInt(stepAni.substr(0, 1)), action.substr(0, action.indexOf('+')), false);
                showAndAnimate(parseInt(stepAni.substr(1, 1)), action.substr(action.indexOf('+') + 1), false);
            } else if (action.indexOf('*') > 0) { // two animations for same item
                showAndAnimate(parseInt(stepAni.substr(0, 1)), action.substr(0, action.indexOf('*')), false);
                showAndAnimate(parseInt(stepAni.substr(0, 1)), action.substr(action.indexOf('*') + 1), false);
            } else
                for (j = 0; j < stepAni.length; j++) {
                    showAndAnimate(parseInt(stepAni.substr(j, 1)), action, false);
                }
            if (autoNext == 'true') {
                setTimeout(waitForEnd, duration + 500);

                function waitForEnd() {
                    StopAnimation = true;
                    SwitchPressed(-1);
                }
            }

            //		var rewards = currentActivity.getElementsByTagName("Rewards")[0].childNodes[0].nodeValue;
        }
    }
}

function LoadActivity(no) {
    activityNo = no;
    currentActivity = xmlDoc.getElementsByTagName("Build")[no];
    Steps = currentActivity.getElementsByTagName("Step").length;
    stepNo = 0;
    FirstStep();
    var sndArray = currentActivity.getElementsByTagName("Sound"); // get array
}

function SwitchPressed(i) {
    if (i > 0) {
        if (switchSetting > 1 && i != currentSwitch)
            return;
        HidePress();
    }
    if (stillAnimating)
        return;
    //	if (audio != undefined && i > 0)
    //		if (!audio.ended)
    //			return;
    for (j = 0; j < Steps; j++) {
        try {
            svgs[j].stop();
        } catch (e) {}
    }

    stopAnimation = true;
    stepNo++;
    if (stepNo >= Steps) { // next activity
        activityNo++;
        if (activityNo >= Activities)
            activityNo = 0;
        HidePress();
        LoadActivity(activityNo);
        HidePress();
    } else
        DoStep();
    HidePress();
    if (i > 0)
        switch (switchSetting) {
            case 1:
                currentSwitch = 1;
                break;
            case 2:
                currentSwitch = 3 - currentSwitch;
                break;
            case 3:
                if (Math.random() < 0.5)
                    currentSwitch = 1;
                else
                    currentSwitch = 2;
                break;
        }
}

function loadXML(s) {
    //    var xmlhttp = new XMLHttpRequest();
    //    xmlhttp.onreadystatechange = function () {
    //        if (this.readyState == XMLHttpRequest.DONE) {
    //            var status = xmlhttp.status;
    //            if (status === 0 || (status >= 200 && status < 400)) {
    //                // The request has been completed successfully
    //                console.log(xmlhttp.responseText);
    //                xmlDoc = xmlhttp.responseXML;
    //                Activities = xmlDoc.getElementsByTagName("Build").length;
    //                LoadActivity(0);
    //            } else {
    //                // Oh no! There has been an error with the request!
    //            }
    //        }
    //    };
    //    xmlhttp.open("GET", s, true);
    //    xmlhttp.send();
    //    let reader = new FileReader();
    //    reader.addEventListener('load', function (e) {
    //        let xmlDoc = e.target.result;
    //    });
    //    reader.readAsText(s);
}


var canvas;

var Sound1 = 1.0;
var Sound2 = 1.0;
var Sound3 = 1.0;
var Sound4 = 1.0;
var mouseX = 0.5;
var mouseY = 0.5;
var keyState1 = 0;
var keyState2 = 0;
var keyState3 = 0;
var keyState4 = 0;
var keyStatel = 0;
var keyStater = 0;
var firstTime = false;
var fricative = false;
var settings;
var panel;
var panelvisible = false;
var progress;
var vol1;
var vol2;
var inMenu = true;
var menuItem = 0;
var drawContext = null;
var setNo = 1;
var activityNo = 1;
var imgNo = 1;
var backgroundNo = 1;
var ts;

var colorList = [];
var doingRainbow = "1";;

function webGLStart() {
    canvas = document.getElementById("webgl-canvas");
    canvas.width = 1024;
    canvas.height = 1024;

    return;
}

function Action(i) {
    switch (i) {
        case 2:
            break;
        case 3: // size (also used to initialise first display of image)
            break;
        case 4: // next background
            break;
        case 5: // previous image
            break;
        case 6: // next image
            break;
        case 7: // toggle buttons
            toggleButtons();
            break;
    }
}

function toggleButtons() {
    ibuttonl.hidden = !ibuttonl.hidden;
}


function MonitorKeyDown(e) { // stop autorepeat of keys with KeyState1-4 flags
    if (!e) e = window.event;
    if (e.keyCode == 32 || e.keyCode == 49) {
        if (keyState1 == 0)
            SwitchPressed(1);
        keystate1 = 1;
    } else if (e.keyCode == 50) {
        if (keyState2 == 0)
            SwitchPressed(2);
        keyState2 = 1;
    } else if (e.keyCode == 51 || e.keyCode == 13) {
        if (keyState3 == 0)
            SwitchPressed(2);
        keyState3 = 1;
    } else if (e.keyCode == 52) {
        if (keyState4 == 0)
            SwitchPressed(2);
        keyState4 = 1;
    } else if (e.keyCode == 53) {
        toggleButtons();
    } else if (e.keyCode == 189) { // -
        if (keyStatel == 0)
            Action(5); //buttonl
    } else if (e.keyCode == 187) { // +
        if (keyStater == 0)
            Action(6);
    } else if (e.keycode == 27) {
        showMenu();
    }

    return false;
}

function MonitorKeyUp(e) {
    if (!e) e = window.event;
    if (e.keyCode == 32 || e.keyCode == 49) {
        keyState1 = 0;
    } else if (e.keyCode == 50) {
        keyState2 = 0;
    } else if (e.keyCode == 51 || e.keyCode == 13) {
        keyState3 = 0;
    } else if (e.keyCode == 52) {
        keyState4 = 0;
    } else if (e.keyCode == 189) {
        keyStatel = 0;
    } else if (e.keyCode == 187) {
        keyStater = 0;
    }
    return false;
}

function MonitorMouseDown(e) {
    if (!e) e = window.event;
    if (e.button == 0)
        SwitchPressed(1);
    else
        SwitchPressed(2);
    //var c = document.getElementById("container");
    //c.style.filter = "sepia(1) hue-rotate(230deg) saturate(2)";
    //toggleButtons();
    return false;
}

function MonitorMouseUp(e) {
    if (!e) e = window.event;
    return false;
}

var splash;
var button;
var button1;
var button2;
var button3;
var button4;
var button5;
var button6;
var button7;
var ibuttonl;
var ibuttonm;
var ibuttonmr;

function hideMenu() {
    splash.hidden = true;
    button.hidden = true;
    button1.hidden = true;
    button2.hidden = true;
    button3.hidden = true;
    button4.hidden = true;
    button5.hidden = true;
    button6.hidden = true;
    button6.hidden = true;
    button7.hidden = true;
    settings.hidden = true;
    panel.hidden = true;
    ibuttonl.hidden = false;
    ibuttonm.hidden = true;
    ibuttonmr.hidden = true;
    crosshairs.hidden = true;
    inMenu = false;
}

function showMenu() {
    for (i = 0; i < Steps; i++) {
        try {
            svgs[i].stop();
        } catch (e) {}
    }
    audio.pause();
    splash.hidden = false;
    button.hidden = false;
    button1.hidden = false;
    button2.hidden = false;
    button3.hidden = false;
    button4.hidden = false;
    button5.hidden = false;
    button6.hidden = false;
    button6.hidden = false;
    button7.hidden = false;
    settings.hidden = false;
    panel.hidden = false;
    //ibutton.hidden = true;
    ibuttonl.hidden = true;
    ibuttonmr.hidden = true;
    inMenu = true;
    crosshairs.hidden = true;
    //clearTimers();
}

function Highlight() {
    button.style.opacity = .7;
    button1.style.opacity = .7;
    button2.style.opacity = .7;
    button3.style.opacity = .7;
    button4.style.opacity = .7;
    button5.style.opacity = .7;
    button6.style.opacity = .7;
    button7.style.opacity = .7;
    switch (menuItem) {
        case 0:
            button.style.opacity = 1.;
            break;
        case 1:
            button1.style.opacity = 1.;
            break;
        case 2:
            button2.style.opacity = 1.;
            break;
        case 3:
            button3.style.opacity = 1.;
            break;
        case 4:
            button4.style.opacity = 1.;
            break;
        case 5:
            button5.style.opacity = 1.;
            break;
        case 6:
            button6.style.opacity = 1.;
            break;
        case 7:
            button7.style.opacity = 1.;
            break;
    }
}

function ChooseSet(i) {
    button4.style.backgroundImage = "url(images/" + i + "1.jpg)";
    button5.style.backgroundImage = "url(images/" + i + "2.jpg)";
    button6.style.backgroundImage = "url(images/" + i + "3.jpg)";
    button7.style.backgroundImage = "url(images/" + i + "4.jpg)";
    setNo = i;
    button.style.border = "none";
    button.style.borderRadius = "0px";
    button1.style.border = "none";
    button1.style.borderRadius = "0px";
    button2.style.border = "none";
    button2.style.borderRadius = "0px";
    button3.style.border = "none";
    button3.style.borderRadius = "0px";
    switch (setNo) {
        case 1:
            button.style.border = "2px solid #FFFFFF";
            button.style.borderRadius = "5vw";
            break;
        case 2:
            button1.style.border = "2px solid #FFFFFF";
            button1.style.borderRadius = "5vw";
            break;
        case 3:
            button2.style.border = "2px solid #FFFFFF";
            button2.style.borderRadius = "5vw";
            break;
        case 4:
            button3.style.border = "2px solid #FFFFFF";
            button3.style.borderRadius = "5vw";
            break;
    }
}

var moveTimer;

function wiggle() {
    target.attr({ // move it
        x: targetLeft + getRndInteger(1, 10),
        y: targetTop + getRndInteger(1, 10)
    });
}

function Go(i) {
    index = i - 1;
    activityNo = i
    if (firstTime) {
        firstTime = false;
        if (document.body.requestFullscreen) {
            document.body.requestFullscreen();
        } else if (document.body.msRequestFullscreen) {
            document.body.msRequestFullscreen();
        } else if (document.body.mozRequestFullScreen) {
            document.body.mozRequestFullScreen();
        } else if (document.body.webkitRequestFullscreen) {
            document.body.webkitRequestFullscreen();
        }
    }

    hideMenu();
    //loadXML(setNo.toString() + activityNo.toString() + ".xml");
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(files[(setNo - 1) * 4 + activityNo - 1], "text/xml");
    Activities = xmlDoc.getElementsByTagName("Build").length;
    LoadActivity(0);
}

function slideTo(el, left) {
    var steps = 10;
    var timer = 25;
    var elLeft = parseInt(el.style.left) || 0;
    var diff = left - elLeft;
    var stepSize = diff / steps;
    console.log(stepSize, ", ", steps);

    function step() {
        elLeft += stepSize;
        el.style.left = elLeft + "vw";
        if (--steps) {
            setTimeout(step, timer);
        }
    }
    step();
}

StoreValue = function (key, value) {
    if (window.localStorage) {
        window.localStorage.setItem(key, value);
    }
};

RetrieveValue = function (key, defaultValue) {
    var got;
    try {
        if (window.localStorage) {
            got = window.localStorage.getItem(key);
            if (got == 0) {
                return got;
            }
            if (got == "") {
                return got;
            }
            if (got) {
                return got;
            }
            return defaultValue;
        }
        return defaultValue;
    } catch (e) {
        return defaultValue;
    }
};

var c = document.getElementById("body");

var snap;
var fname;
var aspectRatio = 1;
var targetWidth;
var targetHeight;
var targetLeft = 500;
var targetTop = 500;


function getRndInteger(min, max) {
    var i = Math.floor(Math.random() * (max - min + 1)) + min;
    if (i > max)
        i = max;
    return i;
}

var audio;

function PlaySound(s) {
    if (audio != undefined)
        audio.pause();
    try {
        audio = new Audio(s);
        audio.play();
        console.log('Sound: ' + s);
        /*       var sound = new Howl({
                   src: [s]
               });
               sound.play(); */
    } catch {};
}

function PlayApplause() {
    var s = "resources/Applause/" + getRndInteger(1, 8) + '.mp3';
    try {
        audio = new Audio(s);
        audio.play();
        console.log('Sound: ' + s);
        /*       var sound = new Howl({
                   src: [s]
               });
               sound.play(); */
    } catch {};
}


function camStart() {
    contn = document.getElementById("container");
    crosshairs = document.querySelector('crosshairs');
    crosshairs.hidden = true;
    splash = document.querySelector('splash');
    panel = document.querySelector('panel');
    settings = document.querySelector('settings');
    button = document.querySelector('button');
    button1 = document.querySelector('button1');
    button2 = document.querySelector('button2');
    button3 = document.querySelector('button3');
    button4 = document.querySelector('button4');
    button5 = document.querySelector('button5');
    button6 = document.querySelector('button6');
    button7 = document.querySelector('button7');
    ibuttonl = document.querySelector('ibuttonl');
    ibuttonm = document.querySelector('ibuttonm');
    ibuttonmr = document.querySelector('ibuttonmr');
    webcam = document.createElement('canvas');
    svgContainer = document.querySelector('svg');
    //getElementById('webcam');
    keyState1 = 0;
    keyState2 = 0;
    keyState3 = 0;
    keyState4 = 0;

    webGLStart();

    panel.style.left = "130vw";
    var x1 = document.createElement("INPUT");
    x1.style.position = "absolute";
    x1.style.height = "3vh";
    x1.style.width = "3vw";
    x1.style.left = "0.3vw";
    x1.style.top = "9.5vh";
    var x2 = document.createElement("INPUT");
    x2.style.position = "absolute";
    x2.style.height = "3vh";
    x2.style.width = "3vw";
    x2.style.left = "0.3vw";
    x2.style.top = "13vh";
    var x3 = document.createElement("INPUT");
    x3.style.position = "absolute";
    x3.style.height = "3vh";
    x3.style.width = "3vw";
    x3.style.left = "0.3vw";
    x3.style.top = "16.5vh";
    x1.setAttribute("type", "radio");
    x2.setAttribute("type", "radio");
    x3.setAttribute("type", "radio");
    x1.checked = true;

    panel.appendChild(x1);
    panel.appendChild(x2);
    panel.appendChild(x3);

    function switchOption(i) {
        x1.checked = false;
        x2.checked = false;
        x3.checked = false;
        switchSetting = i;
        switch (i) {
            case 1:
                x1.checked = true;
                break;
            case 2:
                x2.checked = true;
                break;
            case 3:
                x3.checked = true;
                break;
        }
    }

    x1.onclick = function (e) {
        switchOption(1);
    }
    x2.onclick = function (e) {
        switchOption(2);
    }
    x3.onclick = function (e) {
        switchOption(3);
    }
    slideTo(panel, 180);
    settings.style.left = "92vw";
    settings.onclick = function (e) {
        if (panelvisible) { // save stored values
            slideTo(panel, 150);
            slideTo(settings, 92);
        } else {
            slideTo(panel, 85);
            slideTo(settings, 86);
        }
        // colPick.color.hidePicker();
        panelvisible = !panelvisible;

    }

    snap = Snap("#svg").attr({
        //viewBox: "0 0 1000 1500"
    });
    //snap = Snap("#svg");
    document.onkeydown = MonitorKeyDown;
    document.onkeyup = MonitorKeyUp;

    svgContainer.onmousedown = MonitorMouseDown;
    svgContainer.onmouseup = MonitorMouseUp;

    document.ontouchstart = function (e) {
        if (!inMenu) {
            if (e.touches[0].clientX < window.innerWidth / 2)
                SwitchPressed(1);
            else
                SwitchPressed(2);
        }
    }

    ibuttonl.onclick = function (e) {
        showMenu(); // home
    }
    ibuttonm.onclick = function (e) {
        SwitchPressed(1);
    }
    ibuttonmr.onclick = function (e) {
        SwitchPressed(2);
    }

    button.onmousedown = function (e) {
        ChooseSet(1);
    }
    button1.onmousedown = function (e) {
        ChooseSet(2);
    }
    button2.onmousedown = function (e) {
        ChooseSet(3);
    }
    button3.onmousedown = function (e) {
        ChooseSet(4);
    }
    button4.onmousedown = function (e) {
        Go(1);
    }
    button5.onmousedown = function (e) {
        Go(2);
    }
    button6.onmousedown = function (e) {
        Go(3);
    }
    button7.onmousedown = function (e) {
        Go(4);
    }

    var point = {
        x: -10,
        y: 0
    };

    function MouseClick() {
        if (!inMenu) {
            //			var s;
            //			var elements = document.elementsFromPoint(crosshairs.offsetLeft + (crosshairs.offsetWidth) / 2, crosshairs.offsetTop + (crosshairs.offsetHeight) / 2);
            //			try {
            //				if (elements[0].nodeName == 'image')
            //					targetClicked();
            //				else if (elements[0].nodeName == 'svg')
            //				;
            //				else
            //					elements[0].click();
            //			} catch (e) {
            //				console.log(e);
            //			}
        }
    }

    function MoveMouse(xm, ym) {
        crosshairs.hidden = false;
        try {
            mouseX = crosshairs.offsetLeft + (crosshairs.offsetWidth) / 2;
            mouseY = crosshairs.offsetTop + (crosshairs.offsetHeight) / 2;
            mouseX += xm;
            mouseY += ym;
            if (mouseX < 10)
                mouseX = 10;
            if (mouseY < 10)
                mouseY = 10;
            if (mouseX >= window.innerWidth - 10)
                mouseX = window.innerWidth - 10;
            if (mouseY >= window.innerHeight - 10)
                mouseY = window.innerHeight - 10;
            console.log('MoveTo: ', mouseX, mouseY);
            crosshairs.style.left = mouseX - crosshairs.offsetWidth / 2 + "px";
            crosshairs.style.top = mouseY - crosshairs.offsetHeight / 2 + "px";
            mouseX /= canvas.width;
            mouseY /= canvas.height;
        } catch {}
    }

    function JoystickMoveTo(jy, jx) {
        if (Math.abs(jx) < .1 && Math.abs(jy) < .1) {
            try {
                if (gpad.getButton(14).value > 0) // dpad left
                    MoveMouse(-10, 0);
                if (gpad.getButton(12).value > 0) // dup
                    MoveMouse(0, -7);
                if (gpad.getButton(13).value > 0) // ddown
                    MoveMouse(0, 7);
                if (gpad.getButton(15).value > 0) // dright
                    MoveMouse(10, 0);
            } catch (e) {}
            return;
        }
        MoveMouse(jx * 10, jy * 7);

    }

    function showPressedButton(index) {
        console.log("Press: ", index);
        if (inMenu) {
            switch (index) {
                case 0: // A

                case 1: // B
                case 2: // X
                case 3: // Y
                    if (menuItem < 4)
                        ChooseSet(menuItem + 1)
                    else
                        Go(menuItem - 3);
                    break;
                case 12: // dup
                    if (menuItem > 3)
                        menuItem -= 4;
                    Highlight();
                    break;
                case 13: // ddown
                    if (menuItem < 4)
                        menuItem += 4;
                    Highlight();
                    break;
                case 14: // dleft
                    if (menuItem > 0)
                        menuItem--;
                    Highlight();
                    break;
                case 15: // dright
                    if (menuItem < 7)
                        menuItem++;
                    Highlight();
                    break;
            }
            console.log("Menu: ", menuItem);
        } else switch (index) {
            case 0: // A
            case 2: // X
            case 4: // LT
            case 3: // Y
            case 5: // RT
            case 6:
            case 7:
            case 8:
            case 9:
            case 11:
            case 16:
                SwitchPressed(1)
                break;
            case 1: // B
                SwitchPressed(2)
                break;
            case 10: // XBox
                showMenu();
                break;
            default:
        }
    }

    function removePressedButton(index) {
        console.log("Releasd: ", index);
    }

    function moveJoystick(values, isLeft) {
        if (!inMenu)
            JoystickMoveTo(values[1], values[0]);
    }

    var gpad;

    function getAxes() {
        //       console.log('Axis', gpad.getAxis(0), gpad.getAxis(1), gpad.getButton(14).value);

        if (!inMenu)
            JoystickMoveTo(gpad.getAxis(1), gpad.getAxis(0));
        setTimeout(function () {
            getAxes();
        }, 50);
    }

    gamepads.addEventListener('connect', e => {
        console.log('Gamepad connected:');
        console.log(e.gamepad);
        ChooseSet(1)
        Highlight()
        gpad = e.gamepad;
        e.gamepad.addEventListener('buttonpress', e => showPressedButton(e.index));
        e.gamepad.addEventListener('buttonrelease', e => removePressedButton(e.index));
        //       e.gamepad.addEventListener('joystickmove', e => moveJoystick(e.values, true),
        //            StandardMapping.Axis.JOYSTICK_LEFT);
        //        e.gamepad.addEventListener('joystickmove', e => moveJoystick(e.values, false),
        //            StandardMapping.Axis.JOYSTICK_RIGHT);
        //        setTimeout(function () {
        //            getAxes();
        //        }, 50);
    });

    gamepads.addEventListener('disconnect', e => {
        console.log('Gamepad disconnected:');
        console.log(e.gamepad);
    });

    gamepads.start();

    ChooseSet(1);

}
