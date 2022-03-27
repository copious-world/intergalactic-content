<!-- https://eugenkiss.github.io/7guis/tasks#crud -->
<script>
	//	GOAL : create_intergalactic_id
	//		 :		allow user interaction, local DB fucntion, etc. to allow *create_intergalactic_id*
	//	SUPPORT ACTION : 		use a service to create a web page at the URL for the user...
	//
	import Tab, { Label } from '@smui/tab';
	import TabBar from '@smui/tab-bar';
	import { onMount } from 'svelte';
	//
	import * as utils from './utilities.js'
	import * as igid from "../public/copious/IGID.js"

	let active_profile_image = ""; //"/favicon.png" ; // "/brent-fox-jane-18-b.jpg"
	let active_profile_biometric = ""

	let profile_image_el
	let biometric_data_el

	//
	let src_1_name = "Drop a picture here"
	let src_biometric_instruct = "Drop binary biometric file here"
	//
	let active_cwid = ""
	let clear_cwid = ""
	let dir_view = false

	let signup_status = "OK"
	//
	let start_of_messages = 0
	let messages_per_page = 100

	let prefix = '';
	let man_prefix = '';
	let i = 0;
	let c_i = 0;
	let i_i = 0;
	let p_i = 0;
	let form_index = 0


	let name = ''
	let DOB = ''
	let place_of_origin = ''
	let cool_public_info = ''
	let business = false
	let biometric_blob = ''

	let c_name = ''
	let c_DOB = ''
	let c_place_of_origin = ''
	let c_cool_public_info = ''
	let c_business = false
	let c_public_key = "testesttesttest"
	let c_signer_public_key = "testesttesttest"
	let c_cwid = "testesttesttest"
	let c_answer_message = ''
	let c_biometric_blob = ''

	let c_empty_fields = false

	let today = (new Date()).toUTCString()

	let active_user = false
	let active_identity = false
	let known_users = [false]
	let known_identities = [false]
  	let u_index = 0

	let adding_new = false
	
	let manifest_selected_entry = false
	let manifest_selected_form = false
	let manifest_contact_form_list = [false]
	//
	let manifest_obj = {}
	let manifest_index = 0
	let man_title = ''
	let man_cwid = ''
	let man_wrapped_key = ''
	let man_html = ''
	let man_max_preference = 1.0
	let man_preference = 1.0
	//
	let man_sel_not_customized = true
	let man_contact_is_default = false

	//
	let man_encrypted = false

	let active = 'Identify';
	let prev_active = active
	let first_message = 0

	let green = false     // an indicator telling if this user ID is set
	let todays_date = (new Date()).toLocaleString()

	let filtered_cc_list = []

	let message_op_category = "read"
	let source_category = "messages"
	let processed_category = "Use Op to Select"

	// This is just a default... It will be used until the user picks something else 
	// when editing the manifest.
	let selected_form_link_types = {
		"business" : {
			"link" : "latest-contact",
			"from_cwid" : "QmTfD2LyTy8WGgdUkKE1Z1vAfb6HwNgmZA5kMaFAiy4fuz"
		},
		"profile" : {
			"link" : "latest-contact",
			"from_cwid" : "QmTfD2LyTy8WGgdUkKE1Z1vAfb6HwNgmZA5kMaFAiy4fuz"
		}
	}

	let selected_form_link = selected_form_link_types["profile"]
	

	//
	let individuals = [
		{ "name": 'Hans Solo', "DOB" : "1000", "place_of_origin" : "alpha centauri", "cool_public_info" : "He is a Master Jedi", "business" : false, "public_key" : "testesttesttest", "signer_public_key" : "ha ha ha ha ha ha ha ", "cwid" : "4504385938", "answer_message" : "", "biometric" : "53535" }
	];

	let cwid_individuals_map = {}

	let selected = individuals[0]

	let inbound_solicitation_messages = [ { "name": 'Darth Vadar', "user_cwid" : "869968609", "subject" : "Hans Solo is Mean", "date" : todays_date, "readers" : "luke,martha,chewy", "business" : false, "public_key" : false, "message" : "this is a message 4" , "reply_with" : "default"} ]
	let inbound_contact_messages = [
		{ "name": 'Hans Solo', "user_cwid" : "4504385938", "subject" : "Darth Vadier Attacks", "date" : todays_date, "readers" : "joe,jane,harry", "business" : false, "public_key" : false, "message" : "this is a message 1" }
	]


	let processed_messages = []

	let message_selected = { "name": 'Admin', "subject" : "Hello From copious.world", "date" : today, "readers" : "you", "business" : false, "public_key" : false }



	let message_edit_list_name = ""
	let message_edit_list = []
	let message_edit_source = false

	function reinitialize_user_context() {
		active_cwid = ""
		clear_cwid = ""
		dir_view = false
		signup_status = "OK"
	//
		start_of_messages = 0
		messages_per_page = 100
		//
		active_profile_image = ""
		//
		prefix = '';
		man_prefix = '';
		i = 0;
		c_i = 0;
		i_i = 0;
		p_i = 0;
		form_index = 0
		//
		c_name = ''
		c_DOB = ''
		c_place_of_origin = ''
		c_cool_public_info = ''
		c_business = false
		c_public_key = "testesttesttest"
		c_signer_public_key = "testesttesttest"
		c_cwid = "testesttesttest"
		c_answer_message = ''
		c_empty_fields = false
		//
		today = (new Date()).toUTCString()
		adding_new = false

		green = false     // an indicator telling if this user ID is set
		todays_date = (new Date()).toLocaleString()
		individuals = [
			{ "name": 'Hans Solo', "DOB" : "1000", "place_of_origin" : "alpha centauri", "cool_public_info" : "He is a Master Jedi", "business" : false, "public_key" : "testesttesttest", "signer_public_key" : "ha ha ha ha ha ha ha ", "cwid" : "4504385938", "answer_message" : "", "biometric" : "53535" }
		];
		cwid_individuals_map = {}
		inbound_solicitation_messages = [ { 
			"name": 'Darth Vadar', 
			"user_cwid" : "869968609", 
			"subject" : "Hans Solo is Mean", 
			"date" : todays_date, 
			"readers" : "luke,martha,chewy", 
			"business" : false, 
			"public_key" : false, 
			"message" : "this is a message 4",
			"reply_with" : "default" } ]
		inbound_contact_messages = [
			{ "name": 'Hans Solo', "user_cwid" : "4504385938", "subject" : "Darth Vadier Attacks", "date" : todays_date, "readers" : "joe,jane,harry", "business" : false, "public_key" : false, "message" : "this is a message 1" }
		]

		processed_messages = []

		message_selected = { "name": 'Admin', "subject" : "Hello From copious.world", "date" : today, "readers" : "you", "business" : false, "public_key" : false }
	}

	/*
      "wrapped_key" : false,
      "encoding" : "uri",
	  "when"  ... whereas"date" is a human readable string...
	*/

	//
	class Contact {
		//
		constructor() {
			this.empty_identity = {
				"name": '',
				"DOB" : "",
				"place_of_origin" : "", 
				"cool_public_info" : "", 
				"business" : false, 
				"public_key" : false,
				"signer_public_key" : false,
				"biometric" : false
			}
			this.data = this.empty_identity
		}
		//
		set(name,DOB,place_of_origin,cool_public_info,business,public_key,signer_public_key,biometric_blob) {
			let user_data = {
				"name": name,
				"DOB" : DOB,
				"place_of_origin" : place_of_origin, 
				"cool_public_info" : cool_public_info, 
				"business" : (business === undefined) ? false : business, 
				"public_key" : public_key,
				"signer_public_key" : signer_public_key,
				"biometric" : biometric_blob
			}
			this.data = user_data
		}

		copy(contact_info) {
			let data = {}
			for ( let ky in this.empty_identity ) {
				data[ky] = contact_info[ky]
			}
			this.data = data
		}

		match(contact_info) {
			let f_match = true
			f_match = f_match && ( this.data.name === contact_info.name )
			f_match = f_match && ( this.data.DOB === contact_info.DOB )
			f_match = f_match && ( this.data.place_of_origin === contact_info.place_of_origin )
			f_match = f_match && ( this.data.cool_public_info === contact_info.cool_public_info )
			f_match = f_match && ( this.data.business === contact_info.business )
			return f_match
		}
		
		extend_contact(field,value) {
			this.data[field] = value;
		}

		get_field(field) {
			return this.data[field]
		}

		identity() {
			let id_obj = Object.assign(this.empty_identity,this.data)
			return id_obj
		}

		clear_identity() {
			let id_obj = {
				"name": this.data.name,
				"DOB" : this.data.DOB,
				"place_of_origin" : this.data.place_of_origin, 
				"cool_public_info" : this.data.cool_public_info, 
				"business" : this.data.business, 
			}
			return id_obj
		}

	}

	let empty_identity = new Contact()

	//


	// ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

	$: filteredIndviduals = prefix
		? individuals.filter(individual => {
			const name = `${individual.name}`;
			return name.toLowerCase().startsWith(prefix.toLowerCase());
		})
		: individuals;

	$: selected = (i >= 0) ? filteredIndviduals[i] : empty_identity.identity()

	$: reset_inputs(selected)

	$: if ( active_identity ) {
		filtered_cc_list = individuals.filter(ident => {
			if ( ident.cwid !== active_identity.cwid ) {
				return true
			}
			return false
		})
	}

	//
	//
	$: active_user = known_users[u_index]
	$: active_identity = known_identities[u_index]
	$: green = ( active_identity ) ? active_identity.stored_externally : false
	$: {
		if ( active_user ) {
			window.set_user_title(active_user.name)
		}
	}

	let current_index = -1


	$: {
		if ( (active_user !== undefined) && active_user ) {
			name = active_user.name
			DOB = active_user.DOB
			place_of_origin = active_user.place_of_origin
			cool_public_info = active_user.cool_public_info
			business = active_user.business
			adding_new = false
		}
	}

	$: {
		if ( current_index !== u_index ) {
			current_index = u_index
			reinitialize_user_context()
		}
		if ( active_identity ) {
			load_user_info(active_identity)
		}
	}

	$: filtered_manifest_contact_form_list = man_prefix
		? manifest_contact_form_list.filter(man_contact => {
			const name = `${man_contact.name}`;
			return name.toLowerCase().startsWith(man_prefix.toLowerCase());
		})
		: manifest_contact_form_list;

	$: {
		manifest_selected_entry = filtered_manifest_contact_form_list[manifest_index]
		if ( (manifest_selected_entry !== undefined) && manifest_selected_entry ) {
			manifest_selected_form = manifest_selected_entry.html
			man_title = manifest_selected_entry.info
			man_max_preference = manifest_obj.max_preference
			man_preference = manifest_selected_entry.preference
			man_cwid = manifest_selected_entry.cwid

			man_contact_is_default = ( man_cwid === manifest_obj.default_contact_form)
		}
	}

	$: c_empty_fields = ((!c_name || (c_name.length == 0) ) 
						|| (!c_DOB || (c_DOB.length == 0) ) 
						|| (!c_place_of_origin 
						|| (c_place_of_origin.length == 0) )
						|| (c_cool_public_info.length == 0))
						

	$: {
		if ( prev_active !== active ) {
			message_edit_list = []
			message_edit_source = false
			if ( active == "Introductions" ) {
				message_op_category = "intros"
			} else if ( active == "Messages" ) {
				message_op_category = "messages"
			}
		}
		prev_active = active
	}
	// ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
 
	let creator_disabled = false
	let creation_to_do = false
	$: {
		creation_to_do = ( (u_index === false) || (active_user && (active_user.biometric === undefined)) )
		if ( (typeof active_cwid === "string") && (active_cwid.length === 0) ) {
			creation_to_do = true
		}
		creator_disabled = !creation_to_do
		console.log(active_cwid)
	}

	let window_scale = { "w" : 0.4, "h" : 0.8 }
	let edit_popup_scale = { "w" : 0.45, "h" : 0.3}

	let all_window_scales = []
	all_window_scales.push(window_scale)
	all_window_scales.push(window_scale)
	all_window_scales.push(edit_popup_scale)


	function popup_size() {
		let smallest_w = 200   // smallest and bigget willing to accomodate
		let biggest_w = 3000

		let smallest_h = 600
		let biggest_h = 1000

		// bounded window width
		let w = Math.max(smallest_w,window.innerWidth)
		w = Math.min(biggest_w,w)

		// bounded window height
		let h = Math.max(smallest_h,window.innerHeight)
		h = Math.min(biggest_h,h)

		let p_range
		let P
		//	percentage h range 
		let h_p_max = 0.96
		let h_p_min = 0.75
		p_range = h_p_max - h_p_min
		P = (biggest_h - h)/(biggest_h - smallest_h)
		//console.log("P h: " + P)
		let h_scale = P*(p_range) + h_p_min

		//	percentage w range 
		let w_p_max = 0.96
		let w_p_min = 0.20
		p_range = w_p_max - w_p_min
		P = (biggest_w - w)/(biggest_w - smallest_w)
		//console.log("P w: " + P)
		let w_scale = P*(p_range) + w_p_min

		// Setting the current height & width 
		// to the elements 

		return { "w" : w_scale, "h" : h_scale }
	}

	//
	window_scale = popup_size()
	all_window_scales[0] = window_scale
	all_window_scales[1] = window_scale

	//
	onMount(async () => {
		//
		window.addEventListener("resize", (e) => {
			//
			let scale = popup_size()
			//
			window_scale.h = scale.h; 
			window_scale.w = scale.w;
			all_window_scales[0] = window_scale
			all_window_scales[1] = window_scale
			//
		})

		await startup()
			// initialize
		await get_active_users()  // updates login page and initializes the view of this user.
	})


// PROFILE  PROFILE  PROFILE  PROFILE  PROFILE  PROFILE  PROFILE 
// PROFILE  PROFILE  PROFILE  PROFILE  PROFILE  PROFILE  PROFILE 

	let g_required_user_fields = [ "name", "DOB", "place_of_origin", "cool_public_info", "biometric" ]
	let g_renamed_user_fields = {
		"DOB" : "Year of inception",
		"place_of_origin" : "Main Office",
	}
	let g_last_inspected_field = false
	function check_required_fields(object,required_fields) {
		g_last_inspected_field = false
		for ( let field of required_fields ) {
			let value = object[field]
			g_last_inspected_field = field
			if (( value === undefined) || (value.length === 0) ) return false
		}
		return true
	}

	function missing_fields(activity,app_rename,do_rename) {
		let l_field = g_last_inspected_field
		// 
		if ( do_rename ) {
			let r_field = app_rename[l_field]
			if ( r_field ) {
				l_field = r_field
			}
		}
		let message = `Missing field: ${l_field},  when ${activity}`
		return(message);
	}




	//   create_intergalactic_id
	//								BUTTON ACTION
	//   							CREATE THE INTERGALACTIC ID
	async function create_intergalactic_id() {
		///
		// USER DATA STRUCTURE
		let contact = new Contact()		// contact of self... Stores the same info as a contact plus some special fields for local db
		contact.set(name,DOB,place_of_origin,cool_public_info,business,false,false,biometric_blob)
		//
		selected_form_link = selected_form_link_types[ (business ? "business" : "profile") ]
		contact.extend_contact("form_link",selected_form_link)
		contact.extend_contact("answer_message","")
		//
		let user_data = contact.identity()		// user data structure complete
		//
		// CHECK THAT THE FIELDS ARE FILLED -- make the picture part of this requirement (temporary store needed)
		signup_status = "OK"
		if ( !check_required_fields(user_data,g_required_user_fields) ) {
			signup_status = missing_fields("creating contact page",g_renamed_user_fields,business)
			return;
		}

		// DB ACTION - store the user record with the keys that will be used by associated services
		//
		try {
			let id_packet = igid.user_keys(user_data,window.public_store_user)
			let human_window = await inialize_user_resources(id_packet)
			green = await window.add_user_to_human_url(human_window,id_packet)  // will fetch the key (it is not riding along yet.)
			await window.add_public_user(window.opener_window,id_packet.publc_info)
		} catch (e) {
		}
		//
		// DB ACTION ACCESS AFTER STORE -- also keep the display of local users (those who share the device)
		await get_active_users()  // updates login page and initializes the view of this user.
		u_index = (known_users.length - 1)	// user was added to the end...
		//

	}


	async function load_user_info(identity) {
		active_cwid = identity.cwid			// changes to a ucwid
		clear_cwid = identity.clear_cwid
		//
		await fix_keys(identity)
		//
		if ( identity.profile_image ) {
			let img_cwid = identity.profile_image
			active_profile_image = await window.load_blob_as_url(img_cwid)
		}
	}

	async function get_active_users() {
		try {
			let known_user_lists = await window.get_known_users()
			known_users = known_user_lists[0]
			known_identities = known_user_lists[1]
		} catch (e) {}
	}


	function clear_identify_form() {
		name = ''
		DOB = ''
		place_of_origin = ''
		cool_public_info = ''
		biometric_blob = ''
		business = false
		active_user = false
		active_identity = false
		u_index = false
		adding_new = true
	}

	async function remove_identify_seen_in_form() {
		let identity = active_identity
		const index = known_users.indexOf(active_user);
		if ( index >= 0 ) {
			known_users = [...known_users.slice(0, index), ...known_users.slice(index + 1)];
			u_index = Math.min(u_index, known_users.length - 1);
			await window.unstore_user(identity)
		}
	}

	async function drop_picture(ev) {
		ev.preventDefault();
		try {
			let files = ev.dataTransfer.files ? ev.dataTransfer.files : false
			let items = ev.dataTransfer.items ? ev.dataTransfer.items : false
			let [fname,blob64] = await utils.drop(items,files)
			//
			fname = `images/contact`
			let identity = active_identity
			if ( identity ) {
				active_profile_image = blob64
				//
				//				use window injected methods to store images in th IndexedDB record of the user
				let fcwid = await user_info_add_picture(fname,blob64)
				if ( fcwid ) {
					identity.profile_image = fcwid
					await update_identity(identity)
				}
			}
		} catch (e) {
			console.log(e)
		}
	}

	async function drop_biometric(ev) {
		ev.preventDefault();
		try {
			let files = ev.dataTransfer.files ? ev.dataTransfer.files : false
			let items = ev.dataTransfer.items ? ev.dataTransfer.items : false
			let [fname,blob64] = await utils.drop(items,files)
			biometric_blob = blob64
			src_biometric_instruct = "Biometric has been dropped."
			//
		} catch (e) {
			console.log(e)
		}
	}

	function dragover_picture(ev) {
		ev.preventDefault();
	}


// MESSAGES MESSAGES MESSAGES MESSAGES MESSAGES MESSAGES MESSAGES MESSAGES MESSAGES MESSAGES
// MESSAGES MESSAGES MESSAGES MESSAGES MESSAGES MESSAGES MESSAGES MESSAGES MESSAGES MESSAGES

	// ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
	//

	function reset_inputs(individual) {
		c_name = individual ? individual.name : '';
		c_DOB = individual ? individual.DOB : '';
		c_place_of_origin = individual ? individual.place_of_origin : '';
		c_cool_public_info = individual ? individual.cool_public_info : '';
		c_business = individual ? individual.business : '';
		c_public_key = individual ? individual.public_key : '';
		c_signer_public_key = individual ? individual.signer_public_key : '';
		c_answer_message = individual ? individual.answer_message : '';
		c_cwid = individual ? individual.cwid : '';
	}


	async function app_upload_identity() {
		await upload_identity()
		await get_active_users()  // updates login page and initializes the view of this user.
		u_index = (known_users.length - 1)	// user was added to the end...
	}

	async function app_download_identity() {
		if ( active_identity ) {
			let user_info = active_identity.user_info
			await download_identity(user_info,false)
		}
	}



	function navigate_to_user(e) {
		active = 'User'
	}

</script>

<style>
	* {
		font-family: inherit;
		font-size: inherit;
	}

	.splash-if-you-will {
		font-size: 140%;
		text-align: center;
		line-height: 180%;
		font-weight: 700;
		color:rgb(81, 107, 131);
		font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
	}

	.splash-if-you-will span {
		color:rgb(27, 78, 31);
		font-weight: 900;
		font-size: 140%;
		background-color: rgb(255, 254, 238);
		padding: 12px;
		border-radius: 25px;
		font-family: 'Times New Roman', Times, serif;
	}


	.front-page-explain {
		padding: 8px;
		margin-top: 30px;
		color: orangered;
		font-size: 85%;
		font-weight: 500;
		border: solid 1px rgb(45, 99, 45);
		font-family:Georgia, 'Times New Roman', Times, serif;
	}

	blockquote {
		font: 14px/22px normal helvetica, sans-serif;
		margin-top: 10px;
		margin-bottom: 10px;
		margin-left: 50px;
		padding-left: 15px;
		border-left: 3px solid rgb(221, 219, 219);
  	}


	input {
		display: block;
		margin: 0 0 0.5em 0;
	}

	select {
		margin: 0 1em 1em 0;
		width: 14em;
	}

	option {
		cursor: pointer;
	}

	.buttons {
		clear: both;
	}

	.buttons button:disabled {
		color:slategrey;
		border-bottom-color: rgb(233, 237, 240);
		cursor:not-allowed;
	}

	.buttons button {
		background-color:rgb(255, 249, 240);
		font-size:small;
		border-bottom-color: rgb(236, 250, 226);
		border-radius: 6px;
		font-weight: 580;
		font-style: oblique;
	}

	.buttons button:disabled:hover {
		background-color:inherit;
		font-size:small;
		border-bottom-color: rgb(228, 240, 247);
		border-radius: 6px;
		font-weight: 580;
		font-style: oblique;
		cursor:not-allowed;
	}


	.header-button {
		max-width:min-content;
		border-radius: 6px;
		padding: 1px;
		background-color:rgb(248, 250, 248);
	}

	.header-button:hover {
		background-color:rgb(51, 65, 28);
		color:yellow;
	}

	.classy-small {
		background-color:inherit;
		font-size:small;
		border-bottom-color: chartreuse;
		border-radius: 6px;
		font-weight: 580;
		font-style: oblique;
	}


	.long_button {
		width:40%;
	}

	.long_button:disabled {
		color:beige;
	}

	.long_button:disabled:hover{
		color:beige;
		background-color:blanchedalmond;
		cursor:not-allowed;
	}

	.button-header {
		color:rgb(104, 51, 14);
	}

	.button-header:hover {
		color:rgb(15, 92, 34);
		background-color: rgba(242, 242, 210, 0.3);
	}


	.inner_div {
		padding-left: 2px;
		padding-top: 4px;
		border-bottom: 1px lightgray solid;
		min-height: 40px;
	}

	.inner_div label {
		font-size:smaller;
	}


	.top-of-contact {
		margin-bottom: 4px;
		background-color: rgb(252, 249, 240);
		border: cornsilk solid 1px;
		text-align:right;
	}

	.nice_message {
		width: 85%;
		font-size: small;
		font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
		color:rgb(54, 81, 99);
		font-weight:600;
		background: -webkit-linear-gradient(to right, white ,rgb(252, 251, 248));
		background: linear-gradient(to right, white, rgb(252, 251, 248) );
	}

	.add-profile-div {
		margin-top:8px;
		border: 1px solid rgb(165, 161, 190);
		padding: 2px;
		background: -webkit-linear-gradient(to right, rgb(252, 251, 240) ,rgb(249, 252, 248));
		background: linear-gradient(to right, rgb(252, 251, 240), rgb(249, 252, 248) );
	}

	.top_instructions {
		padding: 2px;
		color:rgb(66, 33, 13);
		border-bottom: sienna 1px solid;
		font: 0.9em sans-serif;
		font-weight: 600;
		font-style: oblique;
	}


	.team_message {
		background-color: rgb(254, 252, 245);
		border: solid 1px darkblue;
		padding:4px;
		color:rgb(12, 12, 100);
		font-size: 110%;
		height: calc(100vh - 280px);
		overflow: scroll;
	}

	.team_message blockquote {
		width: 85%;
		line-height: 200%;
	}

	.items {
		display: flex;
		flex-wrap: wrap;
		margin-left: 2px;
		margin-top: -10px;
	}

	.items .item {
		flex: 1 0 300px;
		box-sizing: border-box;
		background: -webkit-linear-gradient(to right, rgba(242, 242, 210, 0.3), white);
		background: linear-gradient(to right, rgba(242, 242, 210, 0.3), white );
		color: #171e42;
		padding: 10px;
		margin-left: 2px;
		margin-top: 0px;
	}

	.items {
		padding-left: 5px;
		padding-bottom: 4px;
		padding-right: 12px;
		font-size: 110%;
		font-family: sans-serif;
	}
	
	td, th {
		border : 1px solid rgb(47, 79, 49);
		border-right: none;
		padding : 2px;
		margin : 0px;
	}

	th {
		color :rgb(47, 79, 49);
		font-weight: bolder;
		background-color: seashell;
	}

	table {
		border-right: solid 1px darkslategray;
	}

	.subject {
		font-weight: bold;
	}

	.sender {
		background-color: rgb(255, 255, 255);
		font-weight: 600;
		color:rgb(27, 78, 31);
		padding-left: 4px;
	}


	.tableFixHead {
		overflow-y: auto;
		height: calc(100vh - 200px);
	}
	.tableFixHead thead th {
		position: sticky;
		top: 0;
	}
	table {
		border-collapse: collapse;
		width: 100%;
	}
	th, td {
		padding: 8px 16px;
		border: 1px solid #ccc;
	}
	th {
		background: #eee;
	}

	tr {
		cursor: pointer;
	}

	.tableFixHead option {
		cursor: pointer;
	}


	.user-options {
		background-color: rgb(252, 252, 249);
	}

	.user-options option {
		cursor: pointer;
	}

	.selected_form_link-display {
		margin-top:4px;
		margin-bottom:4px;
		border: solid 1px rgb(13, 48, 20);
		padding:4px;
		background-color: white;
		height:200px;
		overflow:auto;
	}

	#man_cwid {
		font-size:smaller;
		min-width:100%;
		font-weight:bold;
	}

	.signup-status {
		color: black;
		background-color: rgb(254, 252, 245);
		font-weight: bold;
		border: solid 1px rgb(13, 48, 20);
		padding:4px;
		height: 60px;
		overflow: auto;
	} 
	.good-status {
		color: green;
	}
	.bad-status {
		color: red;
	}

	.contact_form_list {
		margin-top:4px;
		margin-bottom:4px;
		border: solid 1px navy;
		padding:4px;
		color: darkgreen;
		background-color: rgb(253, 249, 242);
		text-align: center;
	}

	.signup-grid-container {
		display: grid;
		grid-column-gap: 2px;
		grid-row-gap: 2px;
		grid-template-columns: 65% auto;
		background-color: rgb(250, 250, 242);
		padding: 4px;
	}

	.signerupper {
		background-color: rgb(252, 251, 248);
		border: solid 1px rgb(0, 0, 117);
		padding:6px;
	}

	.picture-drop {
		width:90px;
		min-height:90px;
		border: 1px solid navy;
		background-color:rgb(225, 230, 236);
		display:inline-block;
		margin: 2px;
		text-align:center;
		vertical-align: middle;
		cursor:pointer;
	}

	.picture-drop:hover {
		border: 2px dotted rgb(180, 8, 31);
		background-color:rgb(151, 197, 114);
	}

	.picture-drop > .capture_image {
		position:absolute; 
		top:0px; 
		left:0px; 
		z-index:100; 
		width: auto; 
		height: inherit; 
		border:none;
		cursor:pointer;
	}

	.contact_controls {
		width: calc(32vw - 96px);
		margin: 2px;
		border: 1px solid navy;
		display:inline-block;
		background-color: white;
	}

	.contact_controls button {
		border-radius: 8px;
	}

	.manifest-grid-container {
		display: grid;
		grid-column-gap: 2px;
		grid-row-gap: 2px;
		grid-template-columns: 40% auto;
		background-color: rgb(250, 250, 242);
		padding: 4px;
	}

	.manifester {
		background-color: rgb(244, 248, 244);
		border: solid 1px darkblue;
		padding:4px;
	}
	
	.active-tab {
		color: rgb(40, 122, 19);
		background-color: rgb(255, 255, 255);
		font-weight: bolder;
	}

	.plain-tab {
		color: rgb(1, 10, 1);
	}

	.manifest-contact-entry-instruct {
		font-weight: 540;
		font-style:oblique;
		padding-right:3px;
		color:tomato;
		background-color: rgba(235, 225, 235, 0.61);
	}

	.man-default-selected {
		color:rgb(56, 156, 81);
		background-color:rgb(231, 243, 231);
		font-weight: bold;
		border: 1x solid rgb(7, 78, 7);
	}
	.man-default-not-selected {
		color:navy;
	}

	.cwid-grabber {
		font-weight:bolder;
		color:navy;
	}

	.cwid-grabber-label {
		font-weight:600;
		color:rgb(50, 148, 50);
		font-style: oblique;
	}

	.instructor {
		padding: 3px;
		margin-bottom: 4px;
	}

</style>

<div>
	<!--
	  Note: tabs must be unique. (They cannot === each other.)
	-->
	<TabBar tabs={['Identify', 'User', 'About Us']} let:tab bind:active>
	  <!-- Note: the `tab` property is required! -->
	  <Tab {tab}>
		<Label><span class={ (tab === active) ? "active-tab" : "plain-tab"}>{tab}</span></Label>
	  </Tab>
	</TabBar>
  <br>

	{#if (active === 'Identify')}
	<div class="splash-if-you-will" style="height:fit-content" >
		{#if (known_users.length > 0) }
		<div style="height:fit-content">
			The current user is <span>{active_user ? active_user.name : "being created" }</span>.
			<br>
			Not you? Select from the list below or Add yourself with the User tab.
			<div class="user-options" style="text-align:center" >
				<select bind:value={u_index} size={10} style="text-align:center;" on:click={navigate_to_user} >
					{#each known_users as maybe_user, u_index }
						<option value={u_index}>{maybe_user.name}</option>
					{/each}
				</select>	
			</div>
		</div>
		{:else}
		<div class="splash-if-you-will" >
			Get started with your Intergalactic Identity.
			<div>
				Click on the <span>User</span> tab.
			</div>
		</div>
		{/if}
		<div class="front-page-explain">
			Make your identity to be kept within the browser. 
			<br>
			Get an Intergalactic identity for use in messaging and running web sessions.
			<br>
			Set up your personal URL and frame page.
			<br>
			Make use of a browser extension to translate your URL into a Web3 style domain.
		</div>
	</div>
  	{:else if (active === 'User')}
	<div class="signup-grid-container">
		<div class="signerupper">
			<br>
			<div class="top_instructions" >
				Please enter Unique Information about yourself which you would be willing to share with anyone:
			</div>
			<br>
			<div class="inner_div" >
				<label for="name"style="
				display:inline" >Name: </label>
				<input id="name" bind:value={name} placeholder="Name" style="display:inline">
				<input bind:checked={business}  type="checkbox" style="display:inline" ><span>Business (if checked)</span>
			</div>
			<div class="inner_div" >
				{#if business }
					<label for="DOB" style="display:inline" >Year of Inception: </label><input id="DOB" bind:value={DOB} placeholder="Year of Inception" style="display:inline" >
				{:else}
					<label for="DOB" style="display:inline" >DOB: </label><input id="DOB" bind:value={DOB} placeholder="Date of Birth" style="display:inline" >
				{/if}
			</div>
			<div class="inner_div" >
				{#if business }
					<label  for="POO" style="display:inline" >Main Office: </label><input id="POO" bind:value={place_of_origin} placeholder="Main Office" style="display:inline" >
				{:else}
					<label for="POO" style="display:inline" >Place of Origin: </label><input id="POO" bind:value={place_of_origin} placeholder="Place of Origin" style="display:inline" >
				{/if}
			</div>
			<div class="inner_div" >
			<label for="self-text">Cool Public Info</label><br>
			<textarea id="self-text" bind:value={cool_public_info} placeholder="Something you would say to anyone about yourself" />
			</div>
			<div class="add-profile-div" style="text-align:center" >
				{#if creation_to_do }
					<div style = { green ? "background-color:rgba(245,255,250,0.9)" : "background-color:rgba(250,250,250,0.3)" } >
						<button class="long_button" on:click={create_intergalactic_id} disabled={creator_disabled}>Create my Intergalactic Identity.</button>
					</div>
				{:else}
					<div style = { green ? "background-color:rgba(245,255,250,0.9)" : "background-color:rgba(250,250,250,0.3)" } >
						<span class="cwid-grabber-label">Your custom id number:</span> <span class="cwid-grabber">{active_cwid}</span>
					</div>
				{/if}
			</div>
			<div class="nice_message">
				<blockquote>
					<div class="instructor" >
						<b>Enter your information above</b> This information will be used to make your Intergalactic identity.
					</div>
					<div class="instructor" >
						When you click on the button, <span style="font-weight:bolder;color:navy">Create my Intergalactic Identity</span>, your information will be stored within 
						your browser under the domain of this page.
						Then, processes on this page will create your identitfier. At the top level, 
						you will have a <i><b>base64 hash</b></i> of an encryption of the data that you entered.
					</div>
					<div class="instructor" >
						The hash will be associated with a JSON structure being stored in your browser within IndexedDB.
						Within the local structure, you will have private and public keys. 
					</div>
				</blockquote>
				<blockquote>
				You will be able to download the identity structure as a JSON obect at any time.
				<b>This JSON structure information will never be sent from the browser by these pages.</b> It will be stored in the bowser database 
				as long as you want.
				</blockquote>
				<blockquote>
				Use the buttons on the right side of the page to create or delete an identity. And, use the <b>Identity</b> buttons,
				with the <i>down</i> triangle ▼ and the <i>up</i> triangle ▲ to download your JSON to disk and to upload your identity, respectively.
					<blockquote>
					For exampe, you may download your identity to a thumb drive for safe keeping. Or you may upload your identity into another
					browser or restore to a browser if it has been previously deleted.
					</blockquote>
				</blockquote>
				<blockquote>
				The information you enter above should be unique. 
					<blockquote>
					For example, I know that my name is shared by at least three other people on the planet,
					all of whom were born in the same year. But, they are from different towns or countries. So, I don't hesitate to enter my place of origin.
					Furthermore, I am willing to share my real place of origin with anyone.
					</blockquote>
				</blockquote>
				<blockquote>
				<span style="color:blue;">Note:</span> no information will be sent to any organization as a result of entering information here.
				All information will be stored locally except for the public information needed to generate your personal frame page. 
				A single page will be generated for your personal frame page at subdomain of the governing URL of this page. 
				Again, this information will be stored within the browser database on your device. 
				You will access your peronal frame page by your peronal URL (such as an <span>of-this.world</span> url.)
				The database record will only be accessible from this URL.
				</blockquote>
			</div>
		</div>
		<div class="signerupper">
			<div class="signup-status">
				status: <span class={signup_status === 'OK' ? "good-status" : "bad-status"}>{signup_status}</span>
			</div>
			<div>
				{#if creation_to_do }
				<div class="picture-drop"  on:drop={drop_biometric} on:dragover={dragover_picture}  >
					<img src={active_profile_biometric} bind:this={biometric_data_el} alt={src_biometric_instruct} />
				</div>
				{/if}
				{#if !creation_to_do }
				<div class="picture-drop"  on:drop={drop_picture} on:dragover={dragover_picture}  >
					<img src={active_profile_image} bind:this={profile_image_el} alt={src_1_name} />
				</div>
				{/if}
				<div>
					<div class="contact_controls">
						<button on:click={clear_identify_form} >∋ new </button>
						<button on:click={remove_identify_seen_in_form} >∌ remove</button>
					</div>	
					<div class="contact_controls">
						<button on:click={app_download_identity} >▼ identity</button>
						<button on:click={app_upload_identity} >▲ identity</button>
					</div>	
				</div>
			</div>
		</div>
	</div>

	{:else if (active === 'About Us') }
	<div  class="team_message" >
		<blockquote>
		This service is free.
		</blockquote>
		<blockquote>
		Use this service to create an identity, and then, use it to create and optionally maintain a personal frame page initially accessible at unique subdomain 
		of <b>of-this.world</b>
		</blockquote>
		<blockquote>
		That is three things made here:
		<ol style="padding-left:4%">
			<li><b>Intergalactic Identity</b> - with locally stored information</li>
			<li><b>A web page</b> - stored on peer 2 peer Web3 style storage free for you to use, access, edit, move, etc.</li>
			<li><b>A subdomain</b> - <b style="color:darkseagreen">your name</b>.of-this.world</li>
		</ol>
		</blockquote>
		<blockquote>
		The frame page makes your personal, human and private, web usage into one in which you command authorization in your relation to services.
		</blockquote>
		<blockquote>
		As the commander of services, you require the service to ask you for authorization.
		</blockquote>
		<blockquote>
		<span style="font-weight: bold;">You require that businesses log into you. You don't have to log into them.</span> 
		</blockquote>
		<blockquote>
		The reason we have asked for information you might tell anyone is that we are asking for information you want to share. This information should identify you,
		but not give away secrets. Given the informtion, programs provided by this page will make an identity for you. This will be your distributable identity.
		</blockquote>
		<blockquote>
		You may user your distributed identity in any website that will take one.
		</blockquote>
	</div>
	{/if}
  </div>

