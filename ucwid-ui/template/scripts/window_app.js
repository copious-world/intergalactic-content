
// MODULE: USER WINDOW_APP (windowized)
//


// ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
// ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
// ---- ---- request_human_page
// called by the window app component of the builder app (see template/scripts)
async function request_human_page(human_name,public_identity) {
    if ( human_name ) {
        if ( human_name.length ) {
            let postable = {
                "human_name" : human_name,
                "public_identity" : public_identity
            }
			//
            let srver = '{{of-this-world-host}}'
            // let prot = location.protocol
            // let sp = '//' // ${prot}${sp}
            let data_stem = "intake"
			//
            try {
                let response = await postData(`${srver}/${data_stem}`,postable)
                if ( response.status === "OK" ) {
                    let human_frame_url = response.human_url
                    let [child,uri_of_launch] = await open_app_page_in_human_frame(human_frame_url,"initialize")
                    return [child,uri_of_launch]
                }    
            } catch(e) {}

        } else {
            messages("please enter a value")
        }
    }
    return false
}


async function inialize_user_resources(identity) {
	let public_component = identity.public_component
	//
	let [child_window,human_frame_url] = await request_human_page(public_component.name,public_component)
	identity.public_component.human_frame_url = human_frame_url
	// store this locally
	if ( g_human_user_storage ) await g_human_user_storage.update_user(identity.public_component)
	return [child_window,identity]
}

var g_site_source_page_opener = false
function add_site_page_opener_response() {
	window.addEventListener("message", async (ev) => {
		let mobj = ev.data
		if ( mobj && (mobj.category === "alive") ) {
			if ( mobj.direction === "id-maker-opener" ) {
				g_site_source_page_opener = ev.source
				console.log("User interaction is ready")
			}
		}
	});	
}


async function add_user_to_human_url(id_packet) {
	let message = {
		"category": FRAME_COMPONENT_MANAGE_ID,
		"action" : FAME_ACTION_INSTALL,
		"data" : id_packet

	}
	tell_frame_page(message)
}


// Give the site page what it needs to open the frame window.
// The session will be negotiated by another page.
//
async function add_site_public_user(publc_info) {
	let site_pub_info = Object.assign({},publc_info)
	//
	delete site_pub_info.public_key
	delete site_pub_info.signer_public_key
	delete site_pub_info.axiom_public_key
	//
	let message = {
		"category": FRAME_COMPONENT_MANAGE_ID,
		"action" : FAME_ACTION_INJECT,
		"data" : publc_info
	}
	//
	tell_site_page(message)
}


// ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

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
	setup_window_crypto()
	await db_startup()
	//not_https_switch()
}
