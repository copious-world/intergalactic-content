
// MODULE: USER WINDOW_APP (windowized)
//

// temporarily using pc_ prefix. There is a wv_ in a file "recorder.html"  that is for wave. This is for profile contacts.
// Later, these all should be wrapped in a class that handles generic use cases..
// Currently, this improper usage is contained in this file...


function hide_thankyou_box(theBox) {
	theBox.style.visibility = "hidden"
	theBox.style.display = "none";
	theBox.style.zIndex = 0
}

function show_thankyou_box(msg) {
	let theBox = document.querySelector("#thankyou_box")
	if ( theBox ) {
		if ( msg ) {
			let mbox = document.querySelector("#thankyou_box-message")
			if ( mbox ) mbox.innerHTML = msg

		}
		theBox.style.display = "block";
		theBox.style.visibility = "visible"
		theBox.style.zIndex = 2000
	}
}

//  === ---------------------------------------  === ---------------------------------------  === --------------------------------------- 

hide_box('error-box')
hide_box('success-box')

//  === ---------------------------------------  === ---------------------------------------  === --------------------------------------- 

// // // ----------------- // // // ----------------- // // // -----------------
// // // ----------------- // // // ----------------- // // // -----------------

// initial validation application is contact
g_CurContainer = null // will be initilialized within the finalizers

// EXTRA STUFF for some gracefull clicing
var the_thankyou_box = document.getElementById("thankyou_box");

// Get the <span> element that closes the modal
function setupCaptchaClose() {
	let closerList = document.getElementsByClassName("close");
	let n = closerList.length
	for ( let i = 0; i < n; i++ ) {
		let span = closerList[i]
		span.onclick = function() {
			if ( g_CurContainer ) g_CurContainer.switchCaptchaDisplay(false)
			if ( g_captaFinalResolution ) g_captaFinalResolution(3)
		}
	}
}


async function startup() {
	await pc_init_database()
	not_https_switch()
}
