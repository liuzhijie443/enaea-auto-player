// ==UserScript==
// @name         学习公社自动学习看视频(提前查看试卷) 1.0 Test
// @namespace    学习公社 1.0
// @version      0.1
// @description  学习公社自动看视频、自动刷新，未来还有可能添加提前查看试卷，经过测试非常好用
// @author       LZJ
// @match        *study.enaea.edu.cn/viewerforccvideo*
// @match        *study.enaea.edu.cn/circleIndexRedirect*
// @grant        none
// @license		 MIT
// ==/UserScript==
 
(function() {
	var url = window.location.pathname
	if (url == '/viewerforccvideo.do') {
		localStorage.clear();
		var bl_close = false;
 
		function Music_No() {
			setTimeout(function() {
				document.getElementsByClassName("xgplayer-icon-muted")[0].click()
			}, 5000)
		}
 
		function rePlay() {
			setTimeout(function() {
				if (document.getElementsByClassName("cvtb-MCK-CsCt-studyProgress")[0].innerHTML == '100%') {
					for (var i = 1; i < document.getElementsByClassName("cvtb-MCK-CsCt-studyProgress")
						.length; i++) {
						if (document.getElementsByClassName("cvtb-MCK-CsCt-studyProgress")[i].innerHTML !=
							'100%') {
							document.getElementsByClassName("cvtb-MCK-CsCt-studyProgress")[i].click()
							break
						}
					}
				}
			}, 2000)
		}
 
 
		setInterval(function() {
			bl_close = true;
			for (var i = 0; i < document.getElementsByClassName("cvtb-MCK-CsCt-studyProgress")
				.length; i++) {
				if (document.getElementsByClassName("cvtb-MCK-CsCt-studyProgress")[i].innerHTML != '100%') {
					bl_close = false;
					break
				}
			}
			if (document.getElementsByClassName('current')[1].children[0].childNodes[1].innerText ==
				'100%') {
				rePlay()
			}
			if (document.getElementsByClassName("dialog-content")[0].innerText == '学时记录出现异常请检查网络') {
				location.reload()
			}
		}, 5000)
 
		setInterval(function() {
			console.log('未完成')
			if (bl_close == true) {
				window.close()
			}
		}, 30000)
 
		setInterval(function() {
			videoPlay()
		}, 1000)
 
		rePlay()
		Music_No()
	}
	
	if (url == '/circleIndexRedirect.do') {
			var v_title = ""
		
			function playVideo_2(){
				document.getElementsByClassName('customcur-tab-text')[1].click()
				setTimeout(function(){
					if (v_title == document.getElementsByClassName('course-title')[0].innerText){
						console.log("Wait",v_title)
					}else{
						location.reload()
					}
				},1000)
			}
		
			function playVideo_1(){
				document.getElementsByClassName('customcur-tab-text')[1].click()
				setTimeout(function(){
					v_title = document.getElementsByClassName('course-title')[0].innerText
					document.getElementsByClassName('golearn')[0].click()
				},1000)
			}
		
			setTimeout(function(){
				playVideo_1()
			},2000)
		
			setInterval(function(){
				playVideo_2()
			},30000)
		
		    setTimeout(function(){
				location.reload()
			},1000 * 60 * 30)
	}
})();
