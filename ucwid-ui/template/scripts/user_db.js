
// ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
// ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
// MODULE: USER DB   (windowized)
//

const WAPP_DB_NAME = "wapp_contacts"
const WAPP_USERID_STORE = 'wapp_users'
const DB_VERSION = 1
//
var g_galactic_db = null


/*
// user_data
{
    "name_key" : name_key,
    "name": '',
    "DOB" : "",
    "place_of_origin" : "", 
    "cool_public_info" : "", 
    "business" : false, 
    "public_key" : false,
    "signer_public_key" : false,
    "biometric" : false
}
*/



//$>>	get_user_public_wrapper_key
async function get_user_public_wrapper_key(name_key) {
	//
	let transaction = g_galactic_db.transaction(PROMAIL_USERID_STORE, "readwrite");
	let userStore = transaction.objectStore(PROMAIL_USERID_STORE);

	let p = new Promise((resolve,reject) => {
		let nameIndex = userStore.index('name_key');
		nameIndex.openCursor().onsuccess = (event) => {
			let keyRangeValue = IDBKeyRange.only(name_key);
			nameIndex.openCursor(keyRangeValue).onsuccess = (event) => {
				var cursor = event.target.result;
				if ( cursor ) {
					let idObj = cursor.value
					let pkey = idObj.user_info.public_key;
				}
			}
		}
	})
	//
	return p
}



//$>>	get_user_public_signer_key
async function get_user_public_signer_key(name_key) {
	//
	let transaction = g_galactic_db.transaction(PROMAIL_USERID_STORE, "readwrite");
	let userStore = transaction.objectStore(PROMAIL_USERID_STORE);

	let p = new Promise((resolve,reject) => {
		let nameIndex = userStore.index('name_key');
		nameIndex.openCursor().onsuccess = (event) => {
			let keyRangeValue = IDBKeyRange.only(name_key);
			nameIndex.openCursor(keyRangeValue).onsuccess = (event) => {
				var cursor = event.target.result;
				if ( cursor ) {
					let idObj = cursor.value
					let pkey = idObj.user_info.signer_public_key;
				}
			}
		}
	})
	//
	return p
}



// ---- ---- ---- ---- ---- ---- ---- ----
// ---- ---- ---- ---- ---- ---- ---- ----

//$>>	user_decryption
// user_decryption
async function user_decryption(identity,asset) {
	//
	if ( identity.asset_keys === undefined ) {
		identity.asset_keys = {}
		for ( let asset of ['contacts','manifest','topics'] ) {
			identity.asset_keys[asset] = {}
			identity.asset_keys[asset].key = false
			identity.asset_keys[asset].nonce = false
		}
	}
	//
	switch ( asset ) {
		case 'contacts': {
			let {key,nonce} = identity.asset_keys[asset]
			if ( key ) {
				key = await aes_from_str(key)
				// decryptor fn
				let decryptor = async (decodable) => {
					let buffer = buffer_from_cvs_array(decodable)
					try {
						let aes_key = key 
						let iv_nonce = buffer_from_b64_csv(nonce)
						return await aes_decipher_message(buffer,aes_key,iv_nonce)
					} catch(e) {
						return false
					}
				}
				return decryptor
			} else {
				return identity_fn
			}
			break;
		}
		case 'manifest': {
			let {key,nonce} = identity.asset_keys[asset]
			if ( key ) {
				key = await aes_from_str(key)
				// decryptor fn
				let decryptor = async (decodable) => {
					let buffer = buffer_from_cvs_array(decodable)
					try {
						let aes_key = key 
						let iv_nonce = buffer_from_b64_csv(nonce)
						return await aes_decipher_message(buffer,aes_key,iv_nonce)
					} catch(e) {
						return false
					}
				}
				return decryptor
			} else {
				return identity_fn
			}
			break;
		}
		case 'topics': {
			let {key,nonce} = identity.asset_keys[asset]
			if ( key ) {
				key = await aes_from_str(key)
				// decryptor fn
				let decryptor = async (decodable) => {
					let buffer = buffer_from_cvs_array(decodable)
					try {
						let aes_key = key
						let iv_nonce = buffer_from_b64_csv(nonce)
						return await aes_decipher_message(buffer,aes_key,iv_nonce)
					} catch(e) {
						return false
					}
				}
				return decryptor
			} else {
				return identity_fn
			}
			break;
		}
		default: {
			break;
		}
	}
	//
	return identity_fn
}



//$>>	user_encryption
async function user_encryption(identity,asset) {
	if ( identity.asset_keys === undefined ) {
		identity.asset_keys = {}
	}
	switch ( asset ) {
		case 'message': {	// key stays in messages
			let encryptor = async (encodable,aes_key,nonce) => {
				let iv_nonce = buffer_from_b64_csv(nonce)
				let encoded = await aes_encryptor(encodable,aes_key,iv_nonce)
				let int_rep_enc = new Uint8Array(encoded)
				return int_rep_enc.toString()
			}
			return encryptor
			break;
		}
		case 'contacts': {
			let aes_key = await gen_cipher_key()
			let nonce = gen_nonce()
			let storable_key = await aes_to_str(aes_key) // sometimes it's tricky getting indexedDB to take types, likely not this one, but then...
			identity.asset_keys['contacts'] = {
				"key" : storable_key,
				"nonce" : nonce
			}
			// encryptor fn
			let encryptor = async (encodable) => {
				let iv_nonce = buffer_from_b64_csv(nonce)
				let encoded = await aes_encryptor(encodable,aes_key,iv_nonce)
				let int_rep_enc = new Uint8Array(encoded)
				return int_rep_enc.toString()
			}
			return encryptor
		}
		case 'manifest': {
			let aes_key = await gen_cipher_key()
			let nonce = gen_nonce()
			let storable_key = await aes_to_str(aes_key) // sometimes it's tricky getting indexedDB to take types, likely not this one, but then...
			identity.asset_keys['contacts'] = {
				"key" : storable_key,
				"nonce" : nonce
			}
			// encryptor fn
			let encryptor = async (encodable) => {
				let iv_nonce = buffer_from_b64_csv(nonce)
				let encoded = await aes_encryptor(encodable,aes_key,iv_nonce)
				let int_rep_enc = new Uint8Array(encoded)
				return int_rep_enc.toString()
			}
			return encryptor
		}
		case 'topics': {
			let aes_key = await gen_cipher_key()
			let nonce = gen_nonce()
			let storable_key = await aes_to_str(aes_key) // sometimes it's tricky getting indexedDB to take types, likely not this one, but then...
			identity.asset_keys['contacts'] = {
				"key" : storable_key,
				"nonce" : nonce
			}
			// encryptor fn
			let encryptor = async (encodable) => {
				let iv_nonce = buffer_from_b64_csv(nonce)
				let encoded = await aes_encryptor(encodable,aes_key,iv_nonce)
				let int_rep_enc = new Uint8Array(encoded)
				return int_rep_enc.toString()
			}
			return encryptor
		}
		default: {
			break;
		}
	}
	return identity_fn
}




//$>>	fix_keys
async function fix_keys(identity) {
	let u_info = identity.user_info
	if ( !u_info ) return // can't fix it
	if ( ( identity.priv_key === undefined) || ( identity.signer_priv_key === undefined ) || ( u_info.signer_public_key === undefined ) ) {
		try {
			let storage_obj = await identity_from_user(u_info)
			if ( identity.priv_key === undefined ) {
				let keypair = await pc_wrapper_keypair_promise()
				// ---- ---- ---- ----
				let pub_key = keypair.publicKey
				let priv_key = keypair.privateKey
				let exported = await g_crypto.exportKey("jwk",pub_key);
				let pub_key_str = JSON.stringify(exported)

				let priv_exported = await g_crypto.exportKey("jwk",priv_key);
				let priv_key_str =  JSON.stringify(priv_exported);
				//
				storage_obj.priv_key = priv_key_str
				u_info.public_key = pub_key_str
			}
			//
			if ( ( identity.signer_priv_key === undefined ) || ( u_info.signer_public_key === undefined ) ) {
				let signer_pair = await pc_keypair_promise()
				//
				let signer_pub_key = signer_pair.publicKey
				let signer_priv_key = signer_pair.privateKey

				let sign_exported = await g_crypto.exportKey("jwk",signer_pub_key);
				let sign_pub_key_str = JSON.stringify(sign_exported)

				let sign_priv_exported = await g_crypto.exportKey("jwk",signer_priv_key);
				let sign_priv_key_str = JSON.stringify(sign_priv_exported);
				//
				storage_obj.signer_priv_key = sign_priv_key_str					
				u_info.signer_public_key = sign_pub_key_str
			}
			let transaction = g_galactic_db.transaction(PROMAIL_USERID_STORE, "readwrite");
			let userStore = transaction.objectStore(PROMAIL_USERID_STORE);
			//
			let p = new Promise((resolve,reject) => {
				const updateUserRequest =  userStore.put(storage_obj)           // information create by 
				updateUserRequest.onsuccess = () => {
					resolve(true)
				};
			})
			return p
		} catch (e) {
		}
	}
}






// // // 
function get_known_users() {
    //
    let transaction = g_galactic_db.transaction(WAPP_USERID_STORE, "readwrite");
    let userStore = transaction.objectStore(WAPP_USERID_STORE);
    let user_list = []
    let identity_list = []
    let p = new Promise((resolve,reject) => {
        let nameIndex = userStore.index('name_key');
        nameIndex.openCursor().onsuccess = (event) => {
            let cursor = event.target.result;
            if ( cursor ) {
                let identity = cursor.value
                identity_list.push(identity)
                user_list.push(identity.user_info)
                cursor.continue();
            } else {
                resolve([user_list,identity_list])
            }
        };
    })
    //
    return p
}



function identity_fn(data) {
    return data
}

let g_contacts = {}
function set_contact_map(contacts_map) {
    g_contacts = contacts_map
}

function contact_from_ucwid(user_ucwid) {
    let c = g_contacts[user_ucwid]
    return c
}


// DATABASE
async function pc_init_database() {
    // request an open of DB
    let p = new Promise((resolve,reject) => {
        //
        let request = window.indexedDB.open(WAPP_DB_NAME, DB_VERSION);
        //
        request.onerror = (event) => {
            alert("This web app will not store recorded audio without the use of computer storage.")
        };
        request.onsuccess = (event) => {
            //
            let db = event.target.result;
            db.onerror = (event) => {
                console.log("Database error: " + event.target.error);
                reject(event.target.error)
            };
            //
            g_galactic_db = db;
            resolve(db)
        }

        request.onupgradeneeded = (event) => {
            let db = event.target.result;
            //
            try {
                let userStore = db.createObjectStore(WAPP_USERID_STORE, { autoIncrement : false, keyPath: 'name_key' });  // supposed to be just one
                userStore.createIndex("name_key", "name_key", { unique: true });
            } catch (e) {
            }
            //
        };
    })
    //
    return p
};



// store_user_key
//    called when the user info is created by user_keys ... see pc_ask_create_user
//



function name_key_of(user_info) {
    if ( (user_info.name === undefined) || (user_info.DOB === undefined) ) {
        return false
    }
    let name_key = `${user_info.name}-${user_info.DOB}`
    return name_key
}

function value_fallback(value) {
    let vv = value ? value : ""
    return vv
}


function unstore_user(identity) {
    let name_key = identity.name_key
    if ( !name_key ) return(false)
    let transaction = g_galactic_db.transaction(WAPP_USERID_STORE, "readwrite");
    let userStore = transaction.objectStore(WAPP_USERID_STORE);
    let p = new Promise((resolve,reject) => {
        let nameIndex = userStore.index('name_key');
        nameIndex.openCursor().onsuccess = (event) => {
            let keyRangeValue = IDBKeyRange.only(name_key);
            nameIndex.openCursor(keyRangeValue).onsuccess = (event) => {
                var cursor = event.target.result;
                if ( cursor ) {
                    const request = cursor.delete();
                    request.onsuccess = () => {
                        resolve(true)
                    };
                }
            }
        }
    })
    //
    return p
}


function store_user(user_information,privates) {
    //
    let name_key = name_key_of(user_information)
    if ( !name_key ) return(false)
    //
    let transaction = g_galactic_db.transaction(WAPP_USERID_STORE, "readwrite");
    let userStore = transaction.objectStore(WAPP_USERID_STORE);
    //
    let store_u_i = Object.assign({},user_information)
    //
    let storage_obj = {		// prepare a data structure to store data made by this app's ipfs gateway
        "name_key" : name_key,
        "user_info" : store_u_i,
        "ucwid" : '',
        "dirs" :  '',
        "files" :  '',
        "stored_externally" : false
    }
    //
    if ( privates.priv_key ) {
        storage_obj.priv_key = privates.priv_key
    }
    //
    if ( privates.signer_priv_key ) {
        storage_obj.signer_priv_key = privates.signer_priv_key
    }
    //
    if ( privates.signature_protect ) {
        storage_obj.signature_protect = privates.signature_protect
    }
    //
    userStore.put(storage_obj)           // information create by 
    return(true)
}

// finalize_user_identity
// Once the application gets its user ucwid's, it calls finalize_user_identity 
// and this function stores the user values in the identity object in indexedDB.
//
async function finalize_user_identity(u_info,identity_files) {
    //
// "id" : ucwid with key,
// "clear_id" : ucwid without key,
// "dir_data" : user directory structure
    //
    let storage_obj = await identity_from_user(u_info)
    //
    let ucwid = value_fallback(identity_files.id)
    storage_obj.ucwid = ucwid
    storage_obj.dirs = value_fallback(value_fallback(identity_files.dir_data).dirs)
    storage_obj.files = value_fallback(value_fallback(identity_files.dir_data).files)
    storage_obj.stored_externally =  (ucwid.length > 0)
    //
    let transaction = g_galactic_db.transaction(WAPP_USERID_STORE, "readwrite");
    let userStore = transaction.objectStore(WAPP_USERID_STORE);
    //
    let p = new Promise((resolve,reject) => {
        const updateUserRequest =  userStore.put(storage_obj)           // information create by 
        updateUserRequest.onsuccess = () => {
            resolve(true)
        };
    })
    return p
}




async function add_user_locally(id_packet) {
    //
/*
    let id_packet = {
        "user" : user_data,
        "keys" : keys,
        "original_cwid" : key_id_pair[0],
        "ucwid" :  key_id_pair[1]
    }
*/
    //
    return true
}




// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
//		update_identity
//
async function update_identity(identity) {
    try {
        let u_info = identity.user_info
        let storage_obj = await identity_from_user(u_info)
        for ( let ky in storage_obj ) {
            if ( (ky == "dirs") || (ky === "files") ) {
                storage_obj[ky] = identity[ky]
            }
        }
        if ( identity.profile_image ) {
            storage_obj.profile_image = identity.profile_image
        }
        if ( identity.asset_keys ) {
            storage_obj.asset_keys = Object.assign({},identity.asset_keys)
        }
        if ( identity.introductions ) {
            storage_obj.introductions = identity.introductions
        }
        if ( identity.messages ) {
            storage_obj.messages = identity.messages
        }
        let transaction = g_galactic_db.transaction(WAPP_USERID_STORE, "readwrite");
        let userStore = transaction.objectStore(WAPP_USERID_STORE);
        //
        let p = new Promise((resolve,reject) => {
            const updateUserRequest =  userStore.put(storage_obj)           // information create by 
            updateUserRequest.onsuccess = () => {
                resolve(true)
            };
        })
        return p
    } catch (e) {
    }
}


async function restore_identity(identity) {
    try {
        let transaction = g_galactic_db.transaction(WAPP_USERID_STORE, "readwrite");
        let userStore = transaction.objectStore(WAPP_USERID_STORE);
        //
        let p = new Promise((resolve,reject) => {
            const updateUserRequest =  userStore.put(identity)           // information create by 
            updateUserRequest.onsuccess = () => {
                resolve(true)
            };
        })
        return p
    } catch (e) {
    }
}

function identity_from_user(user_info) {
    let name_key = name_key_of(user_info)
    if ( !name_key ) return(false)
    //
    let transaction = g_galactic_db.transaction(WAPP_USERID_STORE, "readwrite");
    let userStore = transaction.objectStore(WAPP_USERID_STORE);
    //
    let p = new Promise((resolve,reject) => {
        let nameIndex = userStore.index('name_key');
        nameIndex.openCursor().onsuccess = (event) => {
            let keyRangeValue = IDBKeyRange.only(name_key);
            nameIndex.openCursor(keyRangeValue).onsuccess = (event) => {
                var cursor = event.target.result;
                if ( cursor ) {
                    resolve(cursor.value)
                }
            }
        }
    })
    //
    return p
}



var downloader_url = null
async function download_identity(user_info,remove) {
    //
    let downloadlink = document.getElementById("identity-download-link")
    if ( !(downloadlink) ) return false
    try {
        //
        let identity = await identity_from_user(user_info)
        let download_str = JSON.stringify(identity,null,4)

        let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(download_str);

        let ext = ".json"
        let fname = identity.name_key

        downloadlink.setAttribute("href",     dataStr     );
        downloadlink.setAttribute("download", (fname + ext) );
        downloadlink.click();
        //
        if ( remove ) {
            await unstore_user(identity)
        }
    } catch (e) {}
}




async function upload_identity() {
    let identity_str = await get_file()
    let identity = JSON.parse(identity_str)
    await restore_identity(identity)
    return identity
}


function get_file() {
    get_file_from_file_element(`drop-click-file_loader`)
}



async function user_info_add_picture(fname,blob64) {
    // 
}

async function load_blob_as_url(img_ucwid) {
    //
}
