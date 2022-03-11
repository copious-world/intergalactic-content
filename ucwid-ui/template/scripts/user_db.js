
// ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
// ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

// // // 
function get_known_users() {
    //
    let transaction = g_galactic_db.transaction(PROMAIL_USERID_STORE, "readwrite");
    let userStore = transaction.objectStore(PROMAIL_USERID_STORE);
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
        let request = window.indexedDB.open(CONTACT_DB_NAME, DB_VERSION);
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
                let userStore = db.createObjectStore(PROMAIL_USERID_STORE, { autoIncrement : false, keyPath: 'name_key' });  // supposed to be just one
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
    let transaction = g_galactic_db.transaction(PROMAIL_USERID_STORE, "readwrite");
    let userStore = transaction.objectStore(PROMAIL_USERID_STORE);
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
    let transaction = g_galactic_db.transaction(PROMAIL_USERID_STORE, "readwrite");
    let userStore = transaction.objectStore(PROMAIL_USERID_STORE);
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


async function restore_identity(identity) {
    try {
        let transaction = g_galactic_db.transaction(PROMAIL_USERID_STORE, "readwrite");
        let userStore = transaction.objectStore(PROMAIL_USERID_STORE);
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
    let transaction = g_galactic_db.transaction(PROMAIL_USERID_STORE, "readwrite");
    let userStore = transaction.objectStore(PROMAIL_USERID_STORE);
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


async function add_user_locally(user_data) {
    //
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
