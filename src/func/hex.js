

String.prototype.hexEncode = function(){
    let hex, i;

    let result = "";
    for (i=0; i<this.length; i++) {
        hex = this.charCodeAt(i).toString(16);
	result += hex;
    }
    return "0x" + result
}

String.prototype.hexDecode = function(){
    let j;
    let hexes = this.slice(2).match(/.{2}/g) || [];
    let back = "";
    for(j = 0; j<hexes.length; j++) {
        back += String.fromCharCode(parseInt(hexes[j], 16));
    }

    return back;
}


// let string = "string"
// let hex = ""
// hex = string.hexEncode()
// string = hex.hexDecode()
//
// console.log(hex)
//
// console.log(string)
