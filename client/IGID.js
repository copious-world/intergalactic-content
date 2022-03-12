import UCWID from "ucwid/lib/UCWID";
import crypto_wraps from "crypto-wraps"



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



function user_data_normalizer(user_data_str_json) {
    let normed_data = user_data_str_json


    return normed_data
}


export async function create_ID(user_data,wrapper_key) {

    let ucwid_service = new UCWID({ "normalizer" : user_data_normalizer, "_wrapper_key" : wrapper_key })
 
    if ( await ucwid_service.wait_for_key() ) {
        let data_as_str = JSON.stringify(user_data)
        let ucwid = await ucwid_service.ucwid(data_as_str)
        return [ucwid.ucwid_packet.crypto_cwid,ucwid]
    }

    return []

}


export async function user_keys(user_data,store_info) {
    let keys = await crypto_wraps.gen_public_key(user_data,store_info)
    let wrapper_key = keys.pk_str
    let key_id_pair = await create_ID(user_data,wrapper_key)
    let operational_user_info = {
        "user" : user_data,
        "keys" : keys,
        "original_cwid" : key_id_pair[0],
        "ucwid" :  key_id_pair[1]
    }
    return operational_user_info
}
