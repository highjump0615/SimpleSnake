
/* ================ md5.js ================= */
/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

/*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
var hexcase = 0;  /* hex output format. 0 - lowercase; 1 - uppercase        */
var b64pad  = ""; /* base-64 pad character. "=" for strict RFC compliance   */
var chrsz   = 8;  /* bits per input character. 8 - ASCII; 16 - Unicode      */

/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
function hex_md5(s){ return binl2hex(core_md5(str2binl(s), s.length * chrsz));}
function b64_md5(s){ return binl2b64(core_md5(str2binl(s), s.length * chrsz));}
function str_md5(s){ return binl2str(core_md5(str2binl(s), s.length * chrsz));}
function hex_hmac_md5(key, data) { return binl2hex(core_hmac_md5(key, data)); }
function b64_hmac_md5(key, data) { return binl2b64(core_hmac_md5(key, data)); }
function str_hmac_md5(key, data) { return binl2str(core_hmac_md5(key, data)); }

/*
 * Perform a simple self-test to see if the VM is working
 */
function md5_vm_test()
{
    return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72";
}

/*
 * Calculate the MD5 of an array of little-endian words, and a bit length
 */
function core_md5(x, len)
{
    /* append padding */
    x[len >> 5] |= 0x80 << ((len) % 32);
    x[(((len + 64) >>> 9) << 4) + 14] = len;

    var a =  1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d =  271733878;

    for(var i = 0; i < x.length; i += 16)
    {
        var olda = a;
        var oldb = b;
        var oldc = c;
        var oldd = d;

        a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
        d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
        c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
        b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
        a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
        d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
        c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
        b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
        a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
        d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
        c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
        b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
        a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
        d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
        c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
        b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);

        a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
        d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
        c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
        b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
        a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
        d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
        c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
        b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
        a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
        d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
        c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
        b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
        a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
        d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
        c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
        b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);

        a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
        d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
        c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
        b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
        a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
        d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
        c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
        b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
        a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
        d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
        c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
        b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
        a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
        d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
        c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
        b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);

        a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
        d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
        c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
        b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
        a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
        d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
        c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
        b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
        a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
        d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
        c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
        b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
        a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
        d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
        c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
        b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);

        a = safe_add(a, olda);
        b = safe_add(b, oldb);
        c = safe_add(c, oldc);
        d = safe_add(d, oldd);
    }
    return Array(a, b, c, d);

}

/*
 * These functions implement the four basic operations the algorithm uses.
 */
function md5_cmn(q, a, b, x, s, t)
{
    return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
}
function md5_ff(a, b, c, d, x, s, t)
{
    return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t)
{
    return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t)
{
    return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t)
{
    return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}

/*
 * Calculate the HMAC-MD5, of a key and some data
 */
function core_hmac_md5(key, data)
{
    var bkey = str2binl(key);
    if(bkey.length > 16) bkey = core_md5(bkey, key.length * chrsz);

    var ipad = Array(16), opad = Array(16);
    for(var i = 0; i < 16; i++)
    {
        ipad[i] = bkey[i] ^ 0x36363636;
        opad[i] = bkey[i] ^ 0x5C5C5C5C;
    }

    var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
    return core_md5(opad.concat(hash), 512 + 128);
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y)
{
    var lsw = (x & 0xFFFF) + (y & 0xFFFF);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function bit_rol(num, cnt)
{
    return (num << cnt) | (num >>> (32 - cnt));
}

/*
 * Convert a string to an array of little-endian words
 * If chrsz is ASCII, characters >255 have their hi-byte silently ignored.
 */
function str2binl(str)
{
    var bin = Array();
    var mask = (1 << chrsz) - 1;
    for(var i = 0; i < str.length * chrsz; i += chrsz)
        bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (i%32);
    return bin;
}

/*
 * Convert an array of little-endian words to a string
 */
function binl2str(bin)
{
    var str = "";
    var mask = (1 << chrsz) - 1;
    for(var i = 0; i < bin.length * 32; i += chrsz)
        str += String.fromCharCode((bin[i>>5] >>> (i % 32)) & mask);
    return str;
}

/*
 * Convert an array of little-endian words to a hex string.
 */
function binl2hex(binarray)
{
    var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
    var str = "";
    for(var i = 0; i < binarray.length * 4; i++)
    {
        str += hex_tab.charAt((binarray[i>>2] >> ((i%4)*8+4)) & 0xF) +
           hex_tab.charAt((binarray[i>>2] >> ((i%4)*8  )) & 0xF);
    }
    return str;
}

/*
 * Convert an array of little-endian words to a base-64 string
 */
function binl2b64(binarray)
{
    var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var str = "";
    for(var i = 0; i < binarray.length * 4; i += 3)
    {
        var triplet = (((binarray[i   >> 2] >> 8 * ( i   %4)) & 0xFF) << 16)
                | (((binarray[i+1 >> 2] >> 8 * ((i+1)%4)) & 0xFF) << 8 )
                |  ((binarray[i+2 >> 2] >> 8 * ((i+2)%4)) & 0xFF);
        for(var j = 0; j < 4; j++)
        {
            if(i * 8 + j * 6 > binarray.length * 32) str += b64pad;
            else str += tab.charAt((triplet >> 6*(3-j)) & 0x3F);
        }
    }
    return str;
}
/* ================ format.js ================= */
//
// format - printf-like string formatting for JavaScript
// github.com/samsonjs/format
// @_sjs
//
// Copyright 2010 - 2013 Sami Samhuri <sami@samhuri.net>
//
// MIT License
// http://sjs.mit-license.org
//

var format = function (fmt){
    var argIndex = 1 // skip initial format argument
        , args = [].slice.call(arguments)
        , i = 0
        , n = fmt.length
        , result = ""
        , c
        , escaped = false
        , arg
        , tmp
        , leadingZero = false
        , precision
        , nextArg = function() { return args[argIndex++]; }
        , slurpNumber = function() {
            var digits = "";
            while (/\d/.test(fmt[i])) {
                digits += fmt[i++];
                c = fmt[i];
            }
            return digits.length > 0 ? parseInt(digits) : null;
        }
      ;
    for (; i < n; ++i) {
        c = fmt[i];
        if (escaped) {
            escaped = false;
            if (c == ".") {
                leadingZero = false;
                c = fmt[++i];
            }
            else if (c == "0" && fmt[i + 1] == ".") {
                leadingZero = true;
                i += 2;
                c = fmt[i];
            }
            else {
                leadingZero = true;
            }
            precision = slurpNumber();
            switch (c) {
            case "b": // number in binary
                result += parseInt(nextArg(), 10).toString(2);
                break;
            case "c": // character
                arg = nextArg();
                if (typeof arg === "string" || arg instanceof String)
                    result += arg;
                else
                    result += String.fromCharCode(parseInt(arg, 10));
                break;
            case "d": // number in decimal
                result += parseInt(nextArg(), 10);
                break;
            case "f": // floating point number
                tmp = String(parseFloat(nextArg()).toFixed(precision || 6));
                result += leadingZero ? tmp : tmp.replace(/^0/, "");
                break;
            case "j": // JSON
                result += JSON.stringify(nextArg());
                break;
            case "o": // number in octal
                result += "0" + parseInt(nextArg(), 10).toString(8);
                break;
            case "s": // string
                result += nextArg();
                break;
            case "x": // lowercase hexadecimal
                result += "0x" + parseInt(nextArg(), 10).toString(16);
                break;
            case "X": // uppercase hexadecimal
                result += "0x" + parseInt(nextArg(), 10).toString(16).toUpperCase();
                break;
            default:
                result += c;
                break;
            }
        } else if (c === "%") {
            escaped = true;
        } else {
            result += c;
        }
    }
    return result;
};
/* ================ matchvsLog.js ================= */
var MatchvsLog = {
    toArray: function (argument) {
        var args = [];
        for (var i = 0; i < argument.length; i++) {
            args.push(argument[i]);
        }
        return args;
    }
};

function getNowFormatDate() {
    var date = new Date();
    var ___ = "-";
    var __ = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    return "[" + date.getFullYear() + ___ + month
        + ___ + strDate + " " + date.getHours() + __
        + date.getMinutes() + __ + date.getSeconds() + "."
        + date.getMilliseconds() + "]";
}

MatchvsLog.openLog = function () {
    console.log("---- open log ----");
    if (typeof (wx) === "undefined") {
        MatchvsLog.logI = console.log.bind(console
            , "[INFO ] " + " ");
        MatchvsLog.logE = console.error.bind(console
            , "[ERROR] " + " ");
    } else {
        MatchvsLog.logI = function () {
            var loc = "";
            try {
                throw new Error();
            } catch (e) {
                var line = e.stack.split(/\n/)[1];
                loc= line.slice(line.lastIndexOf("/")+1,line.lastIndexOf(")"));
            }
            console.info("[INFO ] " + getNowFormatDate() + " " + this.toArray(arguments) + " " + loc);
        };

        MatchvsLog.logE = function () {
            var loc = "";
            try {
                throw new Error();
            } catch (e) {
                var line = e.stack.split(/\n/)[1];
                loc= line.slice(line.lastIndexOf("/")+1,line.lastIndexOf(")"));
            }
            console.error("[ERROR] " + getNowFormatDate() + " " + this.toArray(arguments) + " " + loc);
        };
    }
};

MatchvsLog.closeLog = function () {
    console.log("---- close log ----");
    MatchvsLog.logI = function () {
    };
    MatchvsLog.logE = function () {
    };
};

MatchvsLog.openLog();//default, the log is opening

/* ================ mvsconfig.js ================= */
var HEART_BEAT_INTERVAL = 3000; //心跳间隔时间
var ENGE_STATE = {
    NONE:             0x0000,     //无状态
    INITING :         0x0001,     //正在初始化
    HAVE_INIT :       0x0002,     //初始化
    LOGINING:         0x0004,     //正在登录
    HAVE_LOGIN :      0x0008,     //已登录
    IN_ROOM:          0x0010,     //在房间内
    CREATEROOM:       0x0020,     //创建房间中
    JOIN_ROOMING:     0x0040,     //加入房间中
    LEAVE_ROOMING:    0x0080,     //正在退出房间
    LOGOUTING:        0x0100,     //正在退出登录
    RECONNECTING:     0x0200      //正在重新连接
};

/**
 * 平台配置值
 * @type {{MVS_COMMON: number, MVS_EGRET: number, MVS_WX: number}}
 */
var ENMU_MVS_PTF = {
    MVS_COMMON: 0,
    MVS_EGRET : 1,
    MVS_WX:2
};


var MVSCONFIG ={
    MAXPLAYER_LIMIT : 20,
    MVS_PTF_ADATPER : ENMU_MVS_PTF.MVS_COMMON //如果是白鹭适配就需要填 1
};

var HttpConf = {
    HOST_GATWAY_ADDR:"",
    HOST_HOTEL_ADDR:"",
    GETHOSTLIST_URL:"http://sdk.matchvs.com",
    REGISTER_USER_URL:"",
    CMSNS_URL:"",
    VS_OPEN_URL:"",
    VS_PAY_URL:"",
    VS_PRODUCT_URL:""
};

/* ================ msutil.js ================= */
if (typeof String.prototype.startsWith !== "function") {
    String.prototype.startsWith = function (prefix) {
        return this.slice(0, prefix.length) === prefix;
    };
}
if (typeof String.prototype.endsWith !== "function") {
    String.prototype.endsWith = function (suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };
}

function IncludeJS(fileName) {
    new_element = document.createElement("script");
    new_element.setAttribute("type", "text/javascript");
    new_element.setAttribute("src", fileName);// 在这里引入了a.js
    document.body.appendChild(new_element);
}

// IncludeJS("msutil.js");

function MSExtend(Child, Parent) {
    var p = Parent.prototype;
    var c = Child.prototype;
    for (var i in p) {
        c[i] = p[i];
    }
}

function stringToUtf8ByteArray(a) {
    if (!(a && (typeof a === "string"))) {
        return new Uint8Array(0);
    }
    for (var b = [], c = 0, d = 0; d < a.length; d++) {
        var e = a.charCodeAt(d);
        128 > e ? b[c++] = e : (2048 > e ? b[c++] = e >> 6 | 192 : (55296 == (e & 64512) && d + 1 < a.length && 56320 == (a.charCodeAt(d + 1) & 64512) ? (e = 65536 + ((e & 1023) << 10) + (a.charCodeAt(++d) & 1023), b[c++] = e >> 18 | 240, b[c++] = e >> 12 & 63 | 128) : b[c++] = e >> 12 | 224, b[c++] = e >> 6 & 63 | 128), b[c++] = e & 63 | 128);
    }
    var buf = new Uint8Array(b.length);
    for (var i = 0; i < buf.length; i++) {
        buf[i] = b[i];

    }
    return buf;
}

function utf8ByteArrayToString(a) {
    for (var b = [], c = 0, d = 0; c < a.length;) {
        var e = a[c++];
        if (128 > e) b[d++] = String.fromCharCode(e); else if (191 < e && 224 > e) {
            var f = a[c++];
            b[d++] = String.fromCharCode((e & 31) << 6 | f & 63);
        } else if (239 < e && 365 > e) {
            var f = a[c++], g = a[c++], h = a[c++],
                e = ((e & 7) << 18 | (f & 63) << 12 | (g & 63) << 6 | h & 63) - 65536;
            b[d++] = String.fromCharCode(55296 + (e >> 10));
            b[d++] = String.fromCharCode(56320 + (e & 1023));
        } else f = a[c++], g = a[c++], b[d++] = String.fromCharCode((e & 15) << 12 | (f & 63) << 6 | g & 63);
    }
    return b.join("");
}

function str2u8array(str) {
    if (!(str && (typeof str === "string"))) {
        return str;
    }
    var out = new Uint8Array(str.length * 2);
    for (var i = 0; i < str.length; i++) {
        out[i * 2] = str.charCodeAt(i) >> 8;
        out[i * 2 + 1] = str.charCodeAt(i);
    }
    return out;
}

function u8array2str(u8array) {
    var buf = new Uint16Array(u8array.length / 2);
    for (var i = 0; i < buf.length; i++) {
        buf[i] = u8array[i * 2] << 8 | u8array[i * 2 + 1];

    }
    return String.fromCharCode.apply(null, buf);

}

/**
 * @return {boolean}
 */
function LocalStore_Save(key, value) {
    //存储，IE6~7 cookie 其他浏览器HTML5本地存储
    if (window.localStorage) {
        localStorage.setItem(key, value);
        return true;
    }

    if (MVSCONFIG.MVS_PTF_ADATPER === ENMU_MVS_PTF.MVS_EGRET) {
        return false;
    }

    if (typeof (wx) !== "undefined") {
        wx.setStorageSync(key, value);
        return true;
    } else {
        return false;
        // document.cookie+=(key+"="+value);
    }
}

/**
 * @return {boolean}
 */
function LocalStore_Clear() {
    //存储，IE6~7 cookie 其他浏览器HTML5本地存储
    if (window.localStorage) {
        localStorage.clear();
        return true;
    }
    if (MVSCONFIG.MVS_PTF_ADATPER === ENMU_MVS_PTF.MVS_EGRET) {
        return false;
    }
    if (typeof (wx) !== "undefined") {
        wx.clearStorageSync();
        return true;
    } else {
        return false;
    }
}

/**
 * @return {null}
 */
function LocalStore_Load(key) {
    if (window.localStorage) {
        return localStorage.getItem(key);
    }
    if (MVSCONFIG.MVS_PTF_ADATPER === ENMU_MVS_PTF.MVS_EGRET) {
        return null;
    }

    if (typeof (wx) !== "undefined") {
        return wx.getStorageSync(key);
    } else {
        return null;
    }

}

function isIE() { //ie?
    return !!window.ActiveXObject || "ActiveXObject" in window;
}

/**
 * 同时在SDK加入房间时mvs在bookInfo中会返回hotel的wssProxy
 * 建立连接时用 wss://proxyAddress/proxy?hotel=hotelAddress
 * @param engine {MatchvsEngine}
 * @returns {string} url
 */
function getHotelUrl(engine) {
    return "wss://" + engine.mBookInfo.getWssproxy() + "/proxy?hotel=" + engine.mBookInfo.getHoteladdr();
}

function commEngineStateCheck(engineState, roomLoock, type) {
    if ((engineState & ENGE_STATE.HAVE_INIT) !== ENGE_STATE.HAVE_INIT) return -2;         //未初始化
    if ((engineState & ENGE_STATE.INITING) === ENGE_STATE.INITING) return -3;             //正在初始化
    if ((engineState & ENGE_STATE.HAVE_LOGIN) !== ENGE_STATE.HAVE_LOGIN) return -4;       //未登录
    if ((engineState & ENGE_STATE.LOGINING) === ENGE_STATE.LOGINING) return -5;           //正在登录
    if ((engineState & ENGE_STATE.CREATEROOM) === ENGE_STATE.CREATEROOM) return -7;         //在创建房间
    if ((engineState & ENGE_STATE.JOIN_ROOMING) === ENGE_STATE.JOIN_ROOMING) return -7;     //正在加入房间
    if ((engineState & ENGE_STATE.LOGOUTING) === ENGE_STATE.LOGOUTING) return -11;  // 正在登出
    if (type === 1) {
        if ((engineState & ENGE_STATE.IN_ROOM) !== ENGE_STATE.IN_ROOM) return -6;         //没有进入房间
        if ((engineState & ENGE_STATE.LEAVE_ROOMING) === ENGE_STATE.LEAVE_ROOMING) return -10;//正在离开房间
    } else if (type === 2) {
        if ((engineState & ENGE_STATE.IN_ROOM) === ENGE_STATE.IN_ROOM) return -8;         //已经在房间
        if ((engineState & ENGE_STATE.LEAVE_ROOMING) === ENGE_STATE.LEAVE_ROOMING) return -10;//正在离开房间
    } else if (type === 3) {
        if ((engineState & ENGE_STATE.LEAVE_ROOMING) === ENGE_STATE.LEAVE_ROOMING) return -10;//正在离开房间
    }
    return 0;
}/* ================ mspb.js ================= */
(function e(t, n, r) {
    function s(o, u) {
        if (!n[o]) {
            if (!t[o]) {
                var a = typeof _require == "function" && _require;
                if (!u && a) return a(o, !0);
                if (i) return i(o, !0);
                var f = new Error("Cannot find module '" + o + "'");
                throw f.code = "MODULE_NOT_FOUND", f;
            }
            var l = n[o] = {exports: {}};
            t[o][0].call(l.exports, function (e) {
                var n = t[o][1][e];
                return s(n ? n : e);
            }, l, l.exports, e, t, n, r);
        }
        return n[o].exports;
    }

    var i = typeof _require == "function" && _require;
    for (var o = 0; o < r.length; o++) s(r[o]);
    return s;
})({
    1: [function (_require, module, exports) {
        (function (global) {
            var $jscomp = {
                scope: {}, getGlobal: function (a) {
                    return "undefined" != typeof window && window === a ? a : "undefined" != typeof global ? global : a;
                }
            };
            $jscomp.global = $jscomp.getGlobal(this);
            $jscomp.initSymbol = function () {
                $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol);
                $jscomp.initSymbol = function () {
                };
            };
            $jscomp.symbolCounter_ = 0;
            $jscomp.Symbol = function (a) {
                return "jscomp_symbol_" + a + $jscomp.symbolCounter_++;
            };
            $jscomp.initSymbolIterator = function () {
                $jscomp.initSymbol();
                $jscomp.global.Symbol.iterator || ($jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator"));
                $jscomp.initSymbolIterator = function () {
                };
            };
            $jscomp.makeIterator = function (a) {
                $jscomp.initSymbolIterator();
                $jscomp.initSymbol();
                $jscomp.initSymbolIterator();
                var b = a[Symbol.iterator];
                if (b) return b.call(a);
                var c = 0;
                return {
                    next: function () {
                        return c < a.length ? {done: !1, value: a[c++]} : {done: !0};
                    }
                };
            };
            $jscomp.arrayFromIterator = function (a) {
                for (var b, c = []; !(b = a.next()).done;) c.push(b.value);
                return c;
            };
            $jscomp.arrayFromIterable = function (a) {
                return a instanceof Array ? a : $jscomp.arrayFromIterator($jscomp.makeIterator(a));
            };
            $jscomp.inherits = function (a, b) {
                function c() {
                }

                c.prototype = b.prototype;
                a.prototype = new c;
                a.prototype.constructor = a;
                for (var d in b) if (Object.defineProperties) {
                    var e = Object.getOwnPropertyDescriptor(b, d);
                    e && Object.defineProperty(a, d, e);
                } else a[d] = b[d];
            };
            $jscomp.array = $jscomp.array || {};
            $jscomp.iteratorFromArray = function (a, b) {
                $jscomp.initSymbolIterator();
                a instanceof String && (a += "");
                var c = 0, d = {
                    next: function () {
                        if (c < a.length) {
                            var e = c++;
                            return {value: b(e, a[e]), done: !1};
                        }
                        d.next = function () {
                            return {done: !0, value: void 0};
                        };
                        return d.next();
                    }
                };
                $jscomp.initSymbol();
                $jscomp.initSymbolIterator();
                d[Symbol.iterator] = function () {
                    return d;
                };
                return d;
            };
            $jscomp.findInternal = function (a, b, c) {
                a instanceof String && (a = String(a));
                for (var d = a.length, e = 0; e < d; e++) {
                    var f = a[e];
                    if (b.call(c, f, e, a)) return {i: e, v: f};
                }
                return {i: -1, v: void 0};
            };
            $jscomp.array.from = function (a, b, c) {
                $jscomp.initSymbolIterator();
                b = null != b ? b : function (a) {
                    return a;
                };
                var d = [];
                $jscomp.initSymbol();
                $jscomp.initSymbolIterator();
                var e = a[Symbol.iterator];
                "function" == typeof e && (a = e.call(a));
                if ("function" == typeof a.next) for (; !(e = a.next()).done;) d.push(b.call(c, e.value)); else for (var e = a.length, f = 0; f < e; f++) d.push(b.call(c, a[f]));
                return d;
            };
            $jscomp.array.of = function (a) {
                return $jscomp.array.from(arguments);
            };
            $jscomp.array.entries = function () {
                return $jscomp.iteratorFromArray(this, function (a, b) {
                    return [a, b];
                });
            };
            $jscomp.array.installHelper_ = function (a, b) {
                !Array.prototype[a] && Object.defineProperties && Object.defineProperty && Object.defineProperty(Array.prototype, a, {
                    configurable: !0,
                    enumerable: !1,
                    writable: !0,
                    value: b
                });
            };
            $jscomp.array.entries$install = function () {
                $jscomp.array.installHelper_("entries", $jscomp.array.entries);
            };
            $jscomp.array.keys = function () {
                return $jscomp.iteratorFromArray(this, function (a) {
                    return a;
                });
            };
            $jscomp.array.keys$install = function () {
                $jscomp.array.installHelper_("keys", $jscomp.array.keys);
            };
            $jscomp.array.values = function () {
                return $jscomp.iteratorFromArray(this, function (a, b) {
                    return b;
                });
            };
            $jscomp.array.values$install = function () {
                $jscomp.array.installHelper_("values", $jscomp.array.values);
            };
            $jscomp.array.copyWithin = function (a, b, c) {
                var d = this.length;
                a = Number(a);
                b = Number(b);
                c = Number(null != c ? c : d);
                if (a < b) for (c = Math.min(c, d); b < c;) b in this ? this[a++] = this[b++] : (delete this[a++], b++); else for (c = Math.min(c, d + b - a), a += c - b; c > b;) --c in this ? this[--a] = this[c] : delete this[a];
                return this;
            };
            $jscomp.array.copyWithin$install = function () {
                $jscomp.array.installHelper_("copyWithin", $jscomp.array.copyWithin);
            };
            $jscomp.array.fill = function (a, b, c) {
                var d = this.length || 0;
                0 > b && (b = Math.max(0, d + b));
                if (null == c || c > d) c = d;
                c = Number(c);
                0 > c && (c = Math.max(0, d + c));
                for (b = Number(b || 0); b < c; b++) this[b] = a;
                return this;
            };
            $jscomp.array.fill$install = function () {
                $jscomp.array.installHelper_("fill", $jscomp.array.fill);
            };
            $jscomp.array.find = function (a, b) {
                return $jscomp.findInternal(this, a, b).v;
            };
            $jscomp.array.find$install = function () {
                $jscomp.array.installHelper_("find", $jscomp.array.find);
            };
            $jscomp.array.findIndex = function (a, b) {
                return $jscomp.findInternal(this, a, b).i;
            };
            $jscomp.array.findIndex$install = function () {
                $jscomp.array.installHelper_("findIndex", $jscomp.array.findIndex);
            };
            $jscomp.ASSUME_NO_NATIVE_MAP = !1;
            $jscomp.Map$isConformant = function () {
                if ($jscomp.ASSUME_NO_NATIVE_MAP) return !1;
                var a = $jscomp.global.Map;
                if (!a || !a.prototype.entries || "function" != typeof Object.seal) return !1;
                try {
                    var b = Object.seal({x: 4}), c = new a($jscomp.makeIterator([[b, "s"]]));
                    if ("s" != c.get(b) || 1 != c.size || c.get({x: 4}) || c.set({x: 4}, "t") != c || 2 != c.size) return !1;
                    var d = c.entries(), e = d.next();
                    if (e.done || e.value[0] != b || "s" != e.value[1]) return !1;
                    e = d.next();
                    return e.done || 4 != e.value[0].x || "t" != e.value[1] || !d.next().done ? !1 : !0;
                } catch (f) {
                    return !1;
                }
            };
            $jscomp.Map = function (a) {
                this.data_ = {};
                this.head_ = $jscomp.Map.createHead();
                this.size = 0;
                if (a) {
                    a = $jscomp.makeIterator(a);
                    for (var b; !(b = a.next()).done;) b = b.value, this.set(b[0], b[1]);
                }
            };
            $jscomp.Map.prototype.set = function (a, b) {
                var c = $jscomp.Map.maybeGetEntry(this, a);
                c.list || (c.list = this.data_[c.id] = []);
                c.entry ? c.entry.value = b : (c.entry = {
                    next: this.head_,
                    previous: this.head_.previous,
                    head: this.head_,
                    key: a,
                    value: b
                }, c.list.push(c.entry), this.head_.previous.next = c.entry, this.head_.previous = c.entry, this.size++);
                return this;
            };
            $jscomp.Map.prototype["delete"] = function (a) {
                a = $jscomp.Map.maybeGetEntry(this, a);
                return a.entry && a.list ? (a.list.splice(a.index, 1), a.list.length || delete this.data_[a.id], a.entry.previous.next = a.entry.next, a.entry.next.previous = a.entry.previous, a.entry.head = null, this.size--, !0) : !1;
            };
            $jscomp.Map.prototype.clear = function () {
                this.data_ = {};
                this.head_ = this.head_.previous = $jscomp.Map.createHead();
                this.size = 0;
            };
            $jscomp.Map.prototype.has = function (a) {
                return !!$jscomp.Map.maybeGetEntry(this, a).entry;
            };
            $jscomp.Map.prototype.get = function (a) {
                return (a = $jscomp.Map.maybeGetEntry(this, a).entry) && a.value;
            };
            $jscomp.Map.prototype.entries = function () {
                return $jscomp.Map.makeIterator_(this, function (a) {
                    return [a.key, a.value];
                });
            };
            $jscomp.Map.prototype.keys = function () {
                return $jscomp.Map.makeIterator_(this, function (a) {
                    return a.key;
                });
            };
            $jscomp.Map.prototype.values = function () {
                return $jscomp.Map.makeIterator_(this, function (a) {
                    return a.value;
                });
            };
            $jscomp.Map.prototype.forEach = function (a, b) {
                for (var c = this.entries(), d; !(d = c.next()).done;) d = d.value, a.call(b, d[1], d[0], this);
            };
            $jscomp.Map.maybeGetEntry = function (a, b) {
                var c = $jscomp.Map.getId(b), d = a.data_[c];
                if (d && Object.prototype.hasOwnProperty.call(a.data_, c)) for (var e = 0; e < d.length; e++) {
                    var f = d[e];
                    if (b !== b && f.key !== f.key || b === f.key) return {id: c, list: d, index: e, entry: f};
                }
                return {id: c, list: d, index: -1, entry: void 0};
            };
            $jscomp.Map.makeIterator_ = function (a, b) {
                var c = a.head_, d = {
                    next: function () {
                        if (c) {
                            for (; c.head != a.head_;) c = c.previous;
                            for (; c.next != c.head;) return c = c.next, {done: !1, value: b(c)};
                            c = null;
                        }
                        return {done: !0, value: void 0};
                    }
                };
                $jscomp.initSymbol();
                $jscomp.initSymbolIterator();
                d[Symbol.iterator] = function () {
                    return d;
                };
                return d;
            };
            $jscomp.Map.mapIndex_ = 0;
            $jscomp.Map.createHead = function () {
                var a = {};
                return a.previous = a.next = a.head = a;
            };
            $jscomp.Map.getId = function (a) {
                if (!(a instanceof Object)) return "p_" + a;
                if (!($jscomp.Map.idKey in a)) try {
                    $jscomp.Map.defineProperty(a, $jscomp.Map.idKey, {value: ++$jscomp.Map.mapIndex_});
                } catch (b) {
                }
                return $jscomp.Map.idKey in a ? a[$jscomp.Map.idKey] : "o_ " + a;
            };
            $jscomp.Map.defineProperty = Object.defineProperty ? function (a, b, c) {
                Object.defineProperty(a, b, {value: String(c)});
            } : function (a, b, c) {
                a[b] = String(c);
            };
            $jscomp.Map.Entry = function () {
            };
            $jscomp.Map$install = function () {
                $jscomp.initSymbol();
                $jscomp.initSymbolIterator();
                $jscomp.Map$isConformant() ? $jscomp.Map = $jscomp.global.Map : ($jscomp.initSymbol(), $jscomp.initSymbolIterator(), $jscomp.Map.prototype[Symbol.iterator] = $jscomp.Map.prototype.entries, $jscomp.initSymbol(), $jscomp.Map.idKey = Symbol("map-id-key"), $jscomp.Map$install = function () {
                });
            };
            $jscomp.math = $jscomp.math || {};
            $jscomp.math.clz32 = function (a) {
                a = Number(a) >>> 0;
                if (0 === a) return 32;
                var b = 0;
                0 === (a & 4294901760) && (a <<= 16, b += 16);
                0 === (a & 4278190080) && (a <<= 8, b += 8);
                0 === (a & 4026531840) && (a <<= 4, b += 4);
                0 === (a & 3221225472) && (a <<= 2, b += 2);
                0 === (a & 2147483648) && b++;
                return b;
            };
            $jscomp.math.imul = function (a, b) {
                a = Number(a);
                b = Number(b);
                var c = a & 65535, d = b & 65535;
                return c * d + ((a >>> 16 & 65535) * d + c * (b >>> 16 & 65535) << 16 >>> 0) | 0;
            };
            $jscomp.math.sign = function (a) {
                a = Number(a);
                return 0 === a || isNaN(a) ? a : 0 < a ? 1 : -1;
            };
            $jscomp.math.log10 = function (a) {
                return Math.log(a) / Math.LN10;
            };
            $jscomp.math.log2 = function (a) {
                return Math.log(a) / Math.LN2;
            };
            $jscomp.math.log1p = function (a) {
                a = Number(a);
                if (.25 > a && -.25 < a) {
                    for (var b = a, c = 1, d = a, e = 0, f = 1; e != d;) b *= a, f *= -1, d = (e = d) + f * b / ++c;
                    return d;
                }
                return Math.log(1 + a);
            };
            $jscomp.math.expm1 = function (a) {
                a = Number(a);
                if (.25 > a && -.25 < a) {
                    for (var b = a, c = 1, d = a, e = 0; e != d;) b *= a / ++c, d = (e = d) + b;
                    return d;
                }
                return Math.exp(a) - 1;
            };
            $jscomp.math.cosh = function (a) {
                a = Number(a);
                return (Math.exp(a) + Math.exp(-a)) / 2;
            };
            $jscomp.math.sinh = function (a) {
                a = Number(a);
                return 0 === a ? a : (Math.exp(a) - Math.exp(-a)) / 2;
            };
            $jscomp.math.tanh = function (a) {
                a = Number(a);
                if (0 === a) return a;
                var b = Math.exp(-2 * Math.abs(a)), b = (1 - b) / (1 + b);
                return 0 > a ? -b : b;
            };
            $jscomp.math.acosh = function (a) {
                a = Number(a);
                return Math.log(a + Math.sqrt(a * a - 1));
            };
            $jscomp.math.asinh = function (a) {
                a = Number(a);
                if (0 === a) return a;
                var b = Math.log(Math.abs(a) + Math.sqrt(a * a + 1));
                return 0 > a ? -b : b;
            };
            $jscomp.math.atanh = function (a) {
                a = Number(a);
                return ($jscomp.math.log1p(a) - $jscomp.math.log1p(-a)) / 2;
            };
            $jscomp.math.hypot = function (a, b, c) {
                a = Number(a);
                b = Number(b);
                var d, e, f, g = Math.max(Math.abs(a), Math.abs(b));
                for (d = 2; d < arguments.length; d++) g = Math.max(g, Math.abs(arguments[d]));
                if (1E100 < g || 1E-100 > g) {
                    a /= g;
                    b /= g;
                    f = a * a + b * b;
                    for (d = 2; d < arguments.length; d++) e = Number(arguments[d]) / g, f += e * e;
                    return Math.sqrt(f) * g;
                }
                f = a * a + b * b;
                for (d = 2; d < arguments.length; d++) e = Number(arguments[d]), f += e * e;
                return Math.sqrt(f);
            };
            $jscomp.math.trunc = function (a) {
                a = Number(a);
                if (isNaN(a) || Infinity === a || -Infinity === a || 0 === a) return a;
                var b = Math.floor(Math.abs(a));
                return 0 > a ? -b : b;
            };
            $jscomp.math.cbrt = function (a) {
                if (0 === a) return a;
                a = Number(a);
                var b = Math.pow(Math.abs(a), 1 / 3);
                return 0 > a ? -b : b;
            };
            $jscomp.number = $jscomp.number || {};
            $jscomp.number.isFinite = function (a) {
                return "number" !== typeof a ? !1 : !isNaN(a) && Infinity !== a && -Infinity !== a;
            };
            $jscomp.number.isInteger = function (a) {
                return $jscomp.number.isFinite(a) ? a === Math.floor(a) : !1;
            };
            $jscomp.number.isNaN = function (a) {
                return "number" === typeof a && isNaN(a);
            };
            $jscomp.number.isSafeInteger = function (a) {
                return $jscomp.number.isInteger(a) && Math.abs(a) <= $jscomp.number.MAX_SAFE_INTEGER;
            };
            $jscomp.number.EPSILON = function () {
                return Math.pow(2, -52);
            }();
            $jscomp.number.MAX_SAFE_INTEGER = function () {
                return 9007199254740991;
            }();
            $jscomp.number.MIN_SAFE_INTEGER = function () {
                return -9007199254740991;
            }();
            $jscomp.object = $jscomp.object || {};
            $jscomp.object.assign = function (a, b) {
                for (var c = 1; c < arguments.length; c++) {
                    var d = arguments[c];
                    if (d) for (var e in d) Object.prototype.hasOwnProperty.call(d, e) && (a[e] = d[e]);
                }
                return a;
            };
            $jscomp.object.is = function (a, b) {
                return a === b ? 0 !== a || 1 / a === 1 / b : a !== a && b !== b;
            };
            $jscomp.ASSUME_NO_NATIVE_SET = !1;
            $jscomp.Set$isConformant = function () {
                if ($jscomp.ASSUME_NO_NATIVE_SET) return !1;
                var a = $jscomp.global.Set;
                if (!a || !a.prototype.entries || "function" != typeof Object.seal) return !1;
                try {
                    var b = Object.seal({x: 4}), c = new a($jscomp.makeIterator([b]));
                    if (!c.has(b) || 1 != c.size || c.add(b) != c || 1 != c.size || c.add({x: 4}) != c || 2 != c.size) return !1;
                    var d = c.entries(), e = d.next();
                    if (e.done || e.value[0] != b || e.value[1] != b) return !1;
                    e = d.next();
                    return e.done || e.value[0] == b || 4 != e.value[0].x || e.value[1] != e.value[0] ? !1 : d.next().done;
                } catch (f) {
                    return !1;
                }
            };
            $jscomp.Set = function (a) {
                this.map_ = new $jscomp.Map;
                if (a) {
                    a = $jscomp.makeIterator(a);
                    for (var b; !(b = a.next()).done;) this.add(b.value);
                }
                this.size = this.map_.size;
            };
            $jscomp.Set.prototype.add = function (a) {
                this.map_.set(a, a);
                this.size = this.map_.size;
                return this;
            };
            $jscomp.Set.prototype["delete"] = function (a) {
                a = this.map_["delete"](a);
                this.size = this.map_.size;
                return a;
            };
            $jscomp.Set.prototype.clear = function () {
                this.map_.clear();
                this.size = 0;
            };
            $jscomp.Set.prototype.has = function (a) {
                return this.map_.has(a);
            };
            $jscomp.Set.prototype.entries = function () {
                return this.map_.entries();
            };
            $jscomp.Set.prototype.values = function () {
                return this.map_.values();
            };
            $jscomp.Set.prototype.forEach = function (a, b) {
                var c = this;
                this.map_.forEach(function (d) {
                    return a.call(b, d, d, c);
                });
            };
            $jscomp.Set$install = function () {
                $jscomp.Map$install();
                $jscomp.Set$isConformant() ? $jscomp.Set = $jscomp.global.Set : ($jscomp.initSymbol(), $jscomp.initSymbolIterator(), $jscomp.Set.prototype[Symbol.iterator] = $jscomp.Set.prototype.values, $jscomp.Set$install = function () {
                });
            };
            $jscomp.string = $jscomp.string || {};
            $jscomp.checkStringArgs = function (a, b, c) {
                if (null == a) throw new TypeError("The 'this' value for String.prototype." + c + " must not be null or undefined");
                if (b instanceof RegExp) throw new TypeError("First argument to String.prototype." + c + " must not be a regular expression");
                return a + "";
            };
            $jscomp.string.fromCodePoint = function (a) {
                for (var b = "", c = 0; c < arguments.length; c++) {
                    var d = Number(arguments[c]);
                    if (0 > d || 1114111 < d || d !== Math.floor(d)) throw new RangeError("invalid_code_point " + d);
                    65535 >= d ? b += String.fromCharCode(d) : (d -= 65536, b += String.fromCharCode(d >>> 10 & 1023 | 55296), b += String.fromCharCode(d & 1023 | 56320));
                }
                return b;
            };
            $jscomp.string.repeat = function (a) {
                var b = $jscomp.checkStringArgs(this, null, "repeat");
                if (0 > a || 1342177279 < a) throw new RangeError("Invalid count value");
                a |= 0;
                for (var c = ""; a;) if (a & 1 && (c += b), a >>>= 1) b += b;
                return c;
            };
            $jscomp.string.repeat$install = function () {
                String.prototype.repeat || (String.prototype.repeat = $jscomp.string.repeat);
            };
            $jscomp.string.codePointAt = function (a) {
                var b = $jscomp.checkStringArgs(this, null, "codePointAt"), c = b.length;
                a = Number(a) || 0;
                if (0 <= a && a < c) {
                    a |= 0;
                    var d = b.charCodeAt(a);
                    if (55296 > d || 56319 < d || a + 1 === c) return d;
                    a = b.charCodeAt(a + 1);
                    return 56320 > a || 57343 < a ? d : 1024 * (d - 55296) + a + 9216;
                }
            };
            $jscomp.string.codePointAt$install = function () {
                String.prototype.codePointAt || (String.prototype.codePointAt = $jscomp.string.codePointAt);
            };
            $jscomp.string.includes = function (a, b) {
                return -1 !== $jscomp.checkStringArgs(this, a, "includes").indexOf(a, b || 0);
            };
            $jscomp.string.includes$install = function () {
                String.prototype.includes || (String.prototype.includes = $jscomp.string.includes);
            };
            $jscomp.string.startsWith = function (a, b) {
                var c = $jscomp.checkStringArgs(this, a, "startsWith");
                a += "";
                for (var d = c.length, e = a.length, f = Math.max(0, Math.min(b | 0, c.length)), g = 0; g < e && f < d;) if (c[f++] != a[g++]) return !1;
                return g >= e;
            };
            $jscomp.string.startsWith$install = function () {
                String.prototype.startsWith || (String.prototype.startsWith = $jscomp.string.startsWith);
            };
            $jscomp.string.endsWith = function (a, b) {
                var c = $jscomp.checkStringArgs(this, a, "endsWith");
                a += "";
                void 0 === b && (b = c.length);
                for (var d = Math.max(0, Math.min(b | 0, c.length)), e = a.length; 0 < e && 0 < d;) if (c[--d] != a[--e]) return !1;
                return 0 >= e;
            };
            $jscomp.string.endsWith$install = function () {
                String.prototype.endsWith || (String.prototype.endsWith = $jscomp.string.endsWith);
            };
            var COMPILED = !0, goog = goog || {};
            goog.global = this;
            goog.isDef = function (a) {
                return void 0 !== a;
            };
            goog.exportPath_ = function (a, b, c) {
                a = a.split(".");
                c = c || goog.global;
                a[0] in c || !c.execScript || c.execScript("var " + a[0]);
                for (var d; a.length && (d = a.shift());) !a.length && goog.isDef(b) ? c[d] = b : c = c[d] ? c[d] : c[d] = {};
            };
            goog.define = function (a, b) {
                var c = b;
                COMPILED || (goog.global.CLOSURE_UNCOMPILED_DEFINES && Object.prototype.hasOwnProperty.call(goog.global.CLOSURE_UNCOMPILED_DEFINES, a) ? c = goog.global.CLOSURE_UNCOMPILED_DEFINES[a] : goog.global.CLOSURE_DEFINES && Object.prototype.hasOwnProperty.call(goog.global.CLOSURE_DEFINES, a) && (c = goog.global.CLOSURE_DEFINES[a]));
                goog.exportPath_(a, c);
            };
            goog.DEBUG = !0;
            goog.LOCALE = "en";
            goog.TRUSTED_SITE = !0;
            goog.STRICT_MODE_COMPATIBLE = !1;
            goog.DISALLOW_TEST_ONLY_CODE = COMPILED && !goog.DEBUG;
            goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING = !1;
            goog.provide = function (a) {
                if (!COMPILED && goog.isProvided_(a)) throw Error("Namespace \"" + a + "\" already declared.");
                goog.constructNamespace_(a);
            };
            goog.constructNamespace_ = function (a, b) {
                if (!COMPILED) {
                    delete goog.implicitNamespaces_[a];
                    for (var c = a; (c = c.substring(0, c.lastIndexOf("."))) && !goog.getObjectByName(c);) goog.implicitNamespaces_[c] = !0;
                }
                goog.exportPath_(a, b);
            };
            goog.VALID_MODULE_RE_ = /^[a-zA-Z_$][a-zA-Z0-9._$]*$/;
            goog.module = function (a) {
                if (!goog.isString(a) || !a || -1 == a.search(goog.VALID_MODULE_RE_)) throw Error("Invalid module identifier");
                if (!goog.isInModuleLoader_()) throw Error("Module " + a + " has been loaded incorrectly.");
                if (goog.moduleLoaderState_.moduleName) throw Error("goog.module may only be called once per module.");
                goog.moduleLoaderState_.moduleName = a;
                if (!COMPILED) {
                    if (goog.isProvided_(a)) throw Error("Namespace \"" + a + "\" already declared.");
                    delete goog.implicitNamespaces_[a];
                }
            };
            goog.module.get = function (a) {
                return goog.module.getInternal_(a);
            };
            goog.module.getInternal_ = function (a) {
                if (!COMPILED) return goog.isProvided_(a) ? a in goog.loadedModules_ ? goog.loadedModules_[a] : goog.getObjectByName(a) : null;
            };
            goog.moduleLoaderState_ = null;
            goog.isInModuleLoader_ = function () {
                return null != goog.moduleLoaderState_;
            };
            goog.module.declareLegacyNamespace = function () {
                if (!COMPILED && !goog.isInModuleLoader_()) throw Error("goog.module.declareLegacyNamespace must be called from within a goog.module");
                if (!COMPILED && !goog.moduleLoaderState_.moduleName) throw Error("goog.module must be called prior to goog.module.declareLegacyNamespace.");
                goog.moduleLoaderState_.declareLegacyNamespace = !0;
            };
            goog.setTestOnly = function (a) {
                if (goog.DISALLOW_TEST_ONLY_CODE) throw a = a || "", Error("Importing test-only code into non-debug environment" + (a ? ": " + a : "."));
            };
            goog.forwardDeclare = function (a) {
            };
            COMPILED || (goog.isProvided_ = function (a) {
                return a in goog.loadedModules_ || !goog.implicitNamespaces_[a] && goog.isDefAndNotNull(goog.getObjectByName(a));
            }, goog.implicitNamespaces_ = {"goog.module": !0});
            goog.getObjectByName = function (a, b) {
                for (var c = a.split("."), d = b || goog.global, e; e = c.shift();) if (goog.isDefAndNotNull(d[e])) d = d[e]; else return null;
                return d;
            };
            goog.globalize = function (a, b) {
                var c = b || goog.global, d;
                for (d in a) c[d] = a[d];
            };
            goog.addDependency = function (a, b, c, d) {
                if (goog.DEPENDENCIES_ENABLED) {
                    var e;
                    a = a.replace(/\\/g, "/");
                    for (var f = goog.dependencies_, g = 0; e = b[g]; g++) f.nameToPath[e] = a, f.pathIsModule[a] = !!d;
                    for (d = 0; b = c[d]; d++) a in f._requires || (f._requires[a] = {}), f._requires[a][b] = !0;
                }
            };
            goog.ENABLE_DEBUG_LOADER = !0;
            goog.logToConsole_ = function (a) {
                goog.global.console && goog.global.console.error(a);
            };
            goog._require = function (a) {
                if (!COMPILED) {
                    goog.ENABLE_DEBUG_LOADER && goog.IS_OLD_IE_ && goog.maybeProcessDeferredDep_(a);
                    if (goog.isProvided_(a)) return goog.isInModuleLoader_() ? goog.module.getInternal_(a) : null;
                    if (goog.ENABLE_DEBUG_LOADER) {
                        var b = goog.getPathFromDeps_(a);
                        if (b) return goog.writeScripts_(b), null;
                    }
                    a = "goog._require could not find: " + a;
                    goog.logToConsole_(a);
                    throw Error(a);
                }
            };
            goog.basePath = "";
            goog.nullFunction = function () {
            };
            goog.abstractMethod = function () {
                throw Error("unimplemented abstract method");
            };
            goog.addSingletonGetter = function (a) {
                a.getInstance = function () {
                    if (a.instance_) return a.instance_;
                    goog.DEBUG && (goog.instantiatedSingletons_[goog.instantiatedSingletons_.length] = a);
                    return a.instance_ = new a;
                };
            };
            goog.instantiatedSingletons_ = [];
            goog.LOAD_MODULE_USING_EVAL = !0;
            goog.SEAL_MODULE_EXPORTS = goog.DEBUG;
            goog.loadedModules_ = {};
            goog.DEPENDENCIES_ENABLED = !COMPILED && goog.ENABLE_DEBUG_LOADER;
            goog.DEPENDENCIES_ENABLED && (goog.dependencies_ = {
                pathIsModule: {},
                nameToPath: {},
                _requires: {},
                visited: {},
                written: {},
                deferred: {}
            }, goog.inHtmlDocument_ = function () {
                var a = goog.global.document;
                return null != a && "write" in a;
            }, goog.findBasePath_ = function () {
                if (goog.isDef(goog.global.CLOSURE_BASE_PATH)) goog.basePath = goog.global.CLOSURE_BASE_PATH; else if (goog.inHtmlDocument_()) for (var a = goog.global.document.getElementsByTagName("SCRIPT"), b = a.length - 1; 0 <= b; --b) {
                    var c = a[b].src, d = c.lastIndexOf("?"), d = -1 == d ? c.length :
                        d;
                    if ("base.js" == c.substr(d - 7, 7)) {
                        goog.basePath = c.substr(0, d - 7);
                        break;
                    }
                }
            }, goog.importScript_ = function (a, b) {
                (goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_)(a, b) && (goog.dependencies_.written[a] = !0);
            }, goog.IS_OLD_IE_ = !(goog.global.atob || !goog.global.document || !goog.global.document.all), goog.importModule_ = function (a) {
                goog.importScript_("", "goog.retrieveAndExecModule_(\"" + a + "\");") && (goog.dependencies_.written[a] = !0);
            }, goog.queuedModules_ = [], goog.wrapModule_ = function (a, b) {
                return goog.LOAD_MODULE_USING_EVAL &&
                goog.isDef(goog.global.JSON) ? "goog.loadModule(" + goog.global.JSON.stringify(b + "\n//# sourceURL=" + a + "\n") + ");" : "goog.loadModule(function(exports) {\"use strict\";" + b + "\n;return exports});\n//# sourceURL=" + a + "\n";
            }, goog.loadQueuedModules_ = function () {
                var a = goog.queuedModules_.length;
                if (0 < a) {
                    var b = goog.queuedModules_;
                    goog.queuedModules_ = [];
                    for (var c = 0; c < a; c++) goog.maybeProcessDeferredPath_(b[c]);
                }
            }, goog.maybeProcessDeferredDep_ = function (a) {
                goog.isDeferredModule_(a) && goog.allDepsAreAvailable_(a) && (a = goog.getPathFromDeps_(a),
                goog.maybeProcessDeferredPath_(goog.basePath + a));
            }, goog.isDeferredModule_ = function (a) {
                return (a = goog.getPathFromDeps_(a)) && goog.dependencies_.pathIsModule[a] ? goog.basePath + a in goog.dependencies_.deferred : !1;
            }, goog.allDepsAreAvailable_ = function (a) {
                if ((a = goog.getPathFromDeps_(a)) && a in goog.dependencies_._requires) for (var b in goog.dependencies_._requires[a]) if (!goog.isProvided_(b) && !goog.isDeferredModule_(b)) return !1;
                return !0;
            }, goog.maybeProcessDeferredPath_ = function (a) {
                if (a in goog.dependencies_.deferred) {
                    var b =
                        goog.dependencies_.deferred[a];
                    delete goog.dependencies_.deferred[a];
                    goog.globalEval(b);
                }
            }, goog.loadModuleFromUrl = function (a) {
                goog.retrieveAndExecModule_(a);
            }, goog.loadModule = function (a) {
                var b = goog.moduleLoaderState_;
                try {
                    goog.moduleLoaderState_ = {moduleName: void 0, declareLegacyNamespace: !1};
                    var c;
                    if (goog.isFunction(a)) c = a.call(goog.global, {}); else if (goog.isString(a)) c = goog.loadModuleFromSource_.call(goog.global, a); else throw Error("Invalid module definition");
                    var d = goog.moduleLoaderState_.moduleName;
                    if (!goog.isString(d) || !d) throw Error("Invalid module name \"" + d + "\"");
                    goog.moduleLoaderState_.declareLegacyNamespace ? goog.constructNamespace_(d, c) : goog.SEAL_MODULE_EXPORTS && Object.seal && Object.seal(c);
                    goog.loadedModules_[d] = c;
                } finally {
                    goog.moduleLoaderState_ = b;
                }
            }, goog.loadModuleFromSource_ = function (a) {
                eval(a);
                return {};
            }, goog.writeScriptSrcNode_ = function (a) {
                goog.global.document.write("<script type=\"text/javascript\" src=\"" + a + "\">\x3c/script>");
            }, goog.appendScriptSrcNode_ = function (a) {
                var b = goog.global.document,
                    c = b.createElement("script");
                c.type = "text/javascript";
                c.src = a;
                c.defer = !1;
                c.async = !1;
                b.head.appendChild(c);
            }, goog.writeScriptTag_ = function (a, b) {
                if (goog.inHtmlDocument_()) {
                    var c = goog.global.document;
                    if (!goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING && "complete" == c.readyState) {
                        if (/\bdeps.js$/.test(a)) return !1;
                        throw Error("Cannot write \"" + a + "\" after document load");
                    }
                    var d = goog.IS_OLD_IE_;
                    void 0 === b ? d ? (d = " onreadystatechange='goog.onScriptLoad_(this, " + ++goog.lastNonModuleScriptIndex_ + ")' ", c.write("<script type=\"text/javascript\" src=\"" +
                        a + "\"" + d + ">\x3c/script>")) : goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING ? goog.appendScriptSrcNode_(a) : goog.writeScriptSrcNode_(a) : c.write("<script type=\"text/javascript\">" + b + "\x3c/script>");
                    return !0;
                }
                return !1;
            }, goog.lastNonModuleScriptIndex_ = 0, goog.onScriptLoad_ = function (a, b) {
                "complete" == a.readyState && goog.lastNonModuleScriptIndex_ == b && goog.loadQueuedModules_();
                return !0;
            }, goog.writeScripts_ = function (a) {
                function b(a) {
                    if (!(a in e.written || a in e.visited)) {
                        e.visited[a] = !0;
                        if (a in e._requires) for (var f in e._requires[a]) if (!goog.isProvided_(f)) if (f in
                            e.nameToPath) b(e.nameToPath[f]); else throw Error("Undefined nameToPath for " + f);
                        a in d || (d[a] = !0, c.push(a));
                    }
                }

                var c = [], d = {}, e = goog.dependencies_;
                b(a);
                for (a = 0; a < c.length; a++) {
                    var f = c[a];
                    goog.dependencies_.written[f] = !0;
                }
                var g = goog.moduleLoaderState_;
                goog.moduleLoaderState_ = null;
                for (a = 0; a < c.length; a++) if (f = c[a]) e.pathIsModule[f] ? goog.importModule_(goog.basePath + f) : goog.importScript_(goog.basePath + f); else throw goog.moduleLoaderState_ = g, Error("Undefined script input");
                goog.moduleLoaderState_ = g;
            }, goog.getPathFromDeps_ =
                function (a) {
                    return a in goog.dependencies_.nameToPath ? goog.dependencies_.nameToPath[a] : null;
                }, goog.findBasePath_(), goog.global.CLOSURE_NO_DEPS || goog.importScript_(goog.basePath + "deps.js"));
            goog.normalizePath_ = function (a) {
                a = a.split("/");
                for (var b = 0; b < a.length;) "." == a[b] ? a.splice(b, 1) : b && ".." == a[b] && a[b - 1] && ".." != a[b - 1] ? a.splice(--b, 2) : b++;
                return a.join("/");
            };
            goog.loadFileSync_ = function (a) {
                if (goog.global.CLOSURE_LOAD_FILE_SYNC) return goog.global.CLOSURE_LOAD_FILE_SYNC(a);
                var b = new goog.global.XMLHttpRequest;
                b.open("get", a, !1);
                b.send();
                return b.responseText;
            };
            goog.retrieveAndExecModule_ = function (a) {
                if (!COMPILED) {
                    var b = a;
                    a = goog.normalizePath_(a);
                    var c = goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_, d = goog.loadFileSync_(a);
                    if (null != d) d = goog.wrapModule_(a, d), goog.IS_OLD_IE_ ? (goog.dependencies_.deferred[b] = d, goog.queuedModules_.push(b)) : c(a, d); else throw Error("load of " + a + "failed");
                }
            };
            goog.typeOf = function (a) {
                var b = typeof a;
                if ("object" == b) if (a) {
                    if (a instanceof Array) return "array";
                    if (a instanceof Object) return b;
                    var c = Object.prototype.toString.call(a);
                    if ("[object Window]" == c) return "object";
                    if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) return "array";
                    if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) return "function";
                } else return "null";
                else if ("function" == b && "undefined" == typeof a.call) return "object";
                return b;
            };
            goog.isNull = function (a) {
                return null === a;
            };
            goog.isDefAndNotNull = function (a) {
                return null != a;
            };
            goog.isArray = function (a) {
                return "array" == goog.typeOf(a);
            };
            goog.isArrayLike = function (a) {
                var b = goog.typeOf(a);
                return "array" == b || "object" == b && "number" == typeof a.length;
            };
            goog.isDateLike = function (a) {
                return goog.isObject(a) && "function" == typeof a.getFullYear;
            };
            goog.isString = function (a) {
                return "string" == typeof a;
            };
            goog.isBoolean = function (a) {
                return "boolean" == typeof a;
            };
            goog.isNumber = function (a) {
                return "number" == typeof a;
            };
            goog.isFunction = function (a) {
                return "function" == goog.typeOf(a);
            };
            goog.isObject = function (a) {
                var b = typeof a;
                return "object" == b && null != a || "function" == b;
            };
            goog.getUid = function (a) {
                return a[goog.UID_PROPERTY_] || (a[goog.UID_PROPERTY_] = ++goog.uidCounter_);
            };
            goog.hasUid = function (a) {
                return !!a[goog.UID_PROPERTY_];
            };
            goog.removeUid = function (a) {
                null !== a && "removeAttribute" in a && a.removeAttribute(goog.UID_PROPERTY_);
                try {
                    delete a[goog.UID_PROPERTY_];
                } catch (b) {
                }
            };
            goog.UID_PROPERTY_ = "closure_uid_" + (1E9 * Math.random() >>> 0);
            goog.uidCounter_ = 0;
            goog.getHashCode = goog.getUid;
            goog.removeHashCode = goog.removeUid;
            goog.cloneObject = function (a) {
                var b = goog.typeOf(a);
                if ("object" == b || "array" == b) {
                    if (a.clone) return a.clone();
                    var b = "array" == b ? [] : {}, c;
                    for (c in a) b[c] = goog.cloneObject(a[c]);
                    return b;
                }
                return a;
            };
            goog.bindNative_ = function (a, b, c) {
                return a.call.apply(a.bind, arguments);
            };
            goog.bindJs_ = function (a, b, c) {
                if (!a) throw Error();
                if (2 < arguments.length) {
                    var d = Array.prototype.slice.call(arguments, 2);
                    return function () {
                        var c = Array.prototype.slice.call(arguments);
                        Array.prototype.unshift.apply(c, d);
                        return a.apply(b, c);
                    };
                }
                return function () {
                    return a.apply(b, arguments);
                };
            };
            goog.bind = function (a, b, c) {
                Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? goog.bind = goog.bindNative_ : goog.bind = goog.bindJs_;
                return goog.bind.apply(null, arguments);
            };
            goog.partial = function (a, b) {
                var c = Array.prototype.slice.call(arguments, 1);
                return function () {
                    var b = c.slice();
                    b.push.apply(b, arguments);
                    return a.apply(this, b);
                };
            };
            goog.mixin = function (a, b) {
                for (var c in b) a[c] = b[c];
            };
            goog.now = goog.TRUSTED_SITE && Date.now || function () {
                return +new Date;
            };
            goog.globalEval = function (a) {
                if (goog.global.execScript) goog.global.execScript(a, "JavaScript"); else if (goog.global.eval) {
                    if (null == goog.evalWorksForGlobals_) if (goog.global.eval("var _evalTest_ = 1;"), "undefined" != typeof goog.global._evalTest_) {
                        try {
                            delete goog.global._evalTest_;
                        } catch (d) {
                        }
                        goog.evalWorksForGlobals_ = !0;
                    } else goog.evalWorksForGlobals_ = !1;
                    if (goog.evalWorksForGlobals_) goog.global.eval(a); else {
                        var b = goog.global.document, c = b.createElement("SCRIPT");
                        c.type = "text/javascript";
                        c.defer = !1;
                        c.appendChild(b.createTextNode(a));
                        b.body.appendChild(c);
                        b.body.removeChild(c);
                    }
                } else throw Error("goog.globalEval not available");
            };
            goog.evalWorksForGlobals_ = null;
            goog.getCssName = function (a, b) {
                var c = function (a) {
                        return goog.cssNameMapping_[a] || a;
                    }, d = function (a) {
                        a = a.split("-");
                        for (var b = [], d = 0; d < a.length; d++) b.push(c(a[d]));
                        return b.join("-");
                    }, d = goog.cssNameMapping_ ? "BY_WHOLE" == goog.cssNameMappingStyle_ ? c : d : function (a) {
                        return a;
                    };
                return b ? a + "-" + d(b) : d(a);
            };
            goog.setCssNameMapping = function (a, b) {
                goog.cssNameMapping_ = a;
                goog.cssNameMappingStyle_ = b;
            };
            !COMPILED && goog.global.CLOSURE_CSS_NAME_MAPPING && (goog.cssNameMapping_ = goog.global.CLOSURE_CSS_NAME_MAPPING);
            goog.getMsg = function (a, b) {
                b && (a = a.replace(/\{\$([^}]+)}/g, function (a, d) {
                    return null != b && d in b ? b[d] : a;
                }));
                return a;
            };
            goog.getMsgWithFallback = function (a, b) {
                return a;
            };
            goog.exportSymbol = function (a, b, c) {
                goog.exportPath_(a, b, c);
            };
            goog.exportProperty = function (a, b, c) {
                a[b] = c;
            };
            goog.inherits = function (a, b) {
                function c() {
                }

                c.prototype = b.prototype;
                a.superClass_ = b.prototype;
                a.prototype = new c;
                a.prototype.constructor = a;
                a.base = function (a, c, f) {
                    for (var g = Array(arguments.length - 2), h = 2; h < arguments.length; h++) g[h - 2] = arguments[h];
                    return b.prototype[c].apply(a, g);
                };
            };
            goog.base = function (a, b, c) {
                var d = arguments.callee.caller;
                if (goog.STRICT_MODE_COMPATIBLE || goog.DEBUG && !d) throw Error("arguments.caller not defined.  goog.base() cannot be used with strict mode code. See http://www.ecma-international.org/ecma-262/5.1/#sec-C");
                if (d.superClass_) {
                    for (var e = Array(arguments.length - 1), f = 1; f < arguments.length; f++) e[f - 1] = arguments[f];
                    return d.superClass_.constructor.apply(a, e);
                }
                e = Array(arguments.length - 2);
                for (f = 2; f < arguments.length; f++) e[f - 2] = arguments[f];
                for (var f = !1, g = a.constructor; g; g =
                    g.superClass_ && g.superClass_.constructor) if (g.prototype[b] === d) f = !0; else if (f) return g.prototype[b].apply(a, e);
                if (a[b] === d) return a.constructor.prototype[b].apply(a, e);
                throw Error("goog.base called from a method of one name to a method of a different name");
            };
            goog.scope = function (a) {
                a.call(goog.global);
            };
            COMPILED || (goog.global.COMPILED = COMPILED);
            goog.defineClass = function (a, b) {
                var c = b.constructor, d = b.statics;
                c && c != Object.prototype.constructor || (c = function () {
                    throw Error("cannot instantiate an interface (no constructor defined).");
                });
                c = goog.defineClass.createSealingConstructor_(c, a);
                a && goog.inherits(c, a);
                delete b.constructor;
                delete b.statics;
                goog.defineClass.applyProperties_(c.prototype, b);
                null != d && (d instanceof Function ? d(c) : goog.defineClass.applyProperties_(c, d));
                return c;
            };
            goog.defineClass.SEAL_CLASS_INSTANCES = goog.DEBUG;
            goog.defineClass.createSealingConstructor_ = function (a, b) {
                if (goog.defineClass.SEAL_CLASS_INSTANCES && Object.seal instanceof Function) {
                    if (b && b.prototype && b.prototype[goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_]) return a;
                    var c = function () {
                        var b = a.apply(this, arguments) || this;
                        b[goog.UID_PROPERTY_] = b[goog.UID_PROPERTY_];
                        this.constructor === c && Object.seal(b);
                        return b;
                    };
                    return c;
                }
                return a;
            };
            goog.defineClass.OBJECT_PROTOTYPE_FIELDS_ = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
            goog.defineClass.applyProperties_ = function (a, b) {
                for (var c in b) Object.prototype.hasOwnProperty.call(b, c) && (a[c] = b[c]);
                for (var d = 0; d < goog.defineClass.OBJECT_PROTOTYPE_FIELDS_.length; d++) c = goog.defineClass.OBJECT_PROTOTYPE_FIELDS_[d], Object.prototype.hasOwnProperty.call(b, c) && (a[c] = b[c]);
            };
            goog.tagUnsealableClass = function (a) {
                !COMPILED && goog.defineClass.SEAL_CLASS_INSTANCES && (a.prototype[goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_] = !0);
            };
            goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_ = "goog_defineClass_legacy_unsealable";
            goog.dom = {};
            goog.dom.NodeType = {
                ELEMENT: 1,
                ATTRIBUTE: 2,
                TEXT: 3,
                CDATA_SECTION: 4,
                ENTITY_REFERENCE: 5,
                ENTITY: 6,
                PROCESSING_INSTRUCTION: 7,
                COMMENT: 8,
                DOCUMENT: 9,
                DOCUMENT_TYPE: 10,
                DOCUMENT_FRAGMENT: 11,
                NOTATION: 12
            };
            goog.debug = {};
            goog.debug.Error = function (a) {
                if (Error.captureStackTrace) Error.captureStackTrace(this, goog.debug.Error); else {
                    var b = Error().stack;
                    b && (this.stack = b);
                }
                a && (this.message = String(a));
                this.reportErrorToServer = !0;
            };
            goog.inherits(goog.debug.Error, Error);
            goog.debug.Error.prototype.name = "CustomError";
            goog.string = {};
            goog.string.DETECT_DOUBLE_ESCAPING = !1;
            goog.string.FORCE_NON_DOM_HTML_UNESCAPING = !1;
            goog.string.Unicode = {NBSP: "\u00a0"};
            goog.string.startsWith = function (a, b) {
                return 0 == a.lastIndexOf(b, 0);
            };
            goog.string.endsWith = function (a, b) {
                var c = a.length - b.length;
                return 0 <= c && a.indexOf(b, c) == c;
            };
            goog.string.caseInsensitiveStartsWith = function (a, b) {
                return 0 == goog.string.caseInsensitiveCompare(b, a.substr(0, b.length));
            };
            goog.string.caseInsensitiveEndsWith = function (a, b) {
                return 0 == goog.string.caseInsensitiveCompare(b, a.substr(a.length - b.length, b.length));
            };
            goog.string.caseInsensitiveEquals = function (a, b) {
                return a.toLowerCase() == b.toLowerCase();
            };
            goog.string.subs = function (a, b) {
                for (var c = a.split("%s"), d = "", e = Array.prototype.slice.call(arguments, 1); e.length && 1 < c.length;) d += c.shift() + e.shift();
                return d + c.join("%s");
            };
            goog.string.collapseWhitespace = function (a) {
                return a.replace(/[\s\xa0]+/g, " ").replace(/^\s+|\s+$/g, "");
            };
            goog.string.isEmptyOrWhitespace = function (a) {
                return /^[\s\xa0]*$/.test(a);
            };
            goog.string.isEmptyString = function (a) {
                return 0 == a.length;
            };
            goog.string.isEmpty = goog.string.isEmptyOrWhitespace;
            goog.string.isEmptyOrWhitespaceSafe = function (a) {
                return goog.string.isEmptyOrWhitespace(goog.string.makeSafe(a));
            };
            goog.string.isEmptySafe = goog.string.isEmptyOrWhitespaceSafe;
            goog.string.isBreakingWhitespace = function (a) {
                return !/[^\t\n\r ]/.test(a);
            };
            goog.string.isAlpha = function (a) {
                return !/[^a-zA-Z]/.test(a);
            };
            goog.string.isNumeric = function (a) {
                return !/[^0-9]/.test(a);
            };
            goog.string.isAlphaNumeric = function (a) {
                return !/[^a-zA-Z0-9]/.test(a);
            };
            goog.string.isSpace = function (a) {
                return " " == a;
            };
            goog.string.isUnicodeChar = function (a) {
                return 1 == a.length && " " <= a && "~" >= a || "\u0080" <= a && "\ufffd" >= a;
            };
            goog.string.stripNewlines = function (a) {
                return a.replace(/(\r\n|\r|\n)+/g, " ");
            };
            goog.string.canonicalizeNewlines = function (a) {
                return a.replace(/(\r\n|\r|\n)/g, "\n");
            };
            goog.string.normalizeWhitespace = function (a) {
                return a.replace(/\xa0|\s/g, " ");
            };
            goog.string.normalizeSpaces = function (a) {
                return a.replace(/\xa0|[ \t]+/g, " ");
            };
            goog.string.collapseBreakingSpaces = function (a) {
                return a.replace(/[\t\r\n ]+/g, " ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, "");
            };
            goog.string.trim = goog.TRUSTED_SITE && String.prototype.trim ? function (a) {
                return a.trim();
            } : function (a) {
                return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "");
            };
            goog.string.trimLeft = function (a) {
                return a.replace(/^[\s\xa0]+/, "");
            };
            goog.string.trimRight = function (a) {
                return a.replace(/[\s\xa0]+$/, "");
            };
            goog.string.caseInsensitiveCompare = function (a, b) {
                var c = String(a).toLowerCase(), d = String(b).toLowerCase();
                return c < d ? -1 : c == d ? 0 : 1;
            };
            goog.string.numberAwareCompare_ = function (a, b, c) {
                if (a == b) return 0;
                if (!a) return -1;
                if (!b) return 1;
                for (var d = a.toLowerCase().match(c), e = b.toLowerCase().match(c), f = Math.min(d.length, e.length), g = 0; g < f; g++) {
                    c = d[g];
                    var h = e[g];
                    if (c != h) return a = parseInt(c, 10), !isNaN(a) && (b = parseInt(h, 10), !isNaN(b) && a - b) ? a - b : c < h ? -1 : 1;
                }
                return d.length != e.length ? d.length - e.length : a < b ? -1 : 1;
            };
            goog.string.intAwareCompare = function (a, b) {
                return goog.string.numberAwareCompare_(a, b, /\d+|\D+/g);
            };
            goog.string.floatAwareCompare = function (a, b) {
                return goog.string.numberAwareCompare_(a, b, /\d+|\.\d+|\D+/g);
            };
            goog.string.numerateCompare = goog.string.floatAwareCompare;
            goog.string.urlEncode = function (a) {
                return encodeURIComponent(String(a));
            };
            goog.string.urlDecode = function (a) {
                return decodeURIComponent(a.replace(/\+/g, " "));
            };
            goog.string.newLineToBr = function (a, b) {
                return a.replace(/(\r\n|\r|\n)/g, b ? "<br />" : "<br>");
            };
            goog.string.htmlEscape = function (a, b) {
                if (b) a = a.replace(goog.string.AMP_RE_, "&amp;").replace(goog.string.LT_RE_, "&lt;").replace(goog.string.GT_RE_, "&gt;").replace(goog.string.QUOT_RE_, "&quot;").replace(goog.string.SINGLE_QUOTE_RE_, "&#39;").replace(goog.string.NULL_RE_, "&#0;"), goog.string.DETECT_DOUBLE_ESCAPING && (a = a.replace(goog.string.E_RE_, "&#101;")); else {
                    if (!goog.string.ALL_RE_.test(a)) return a;
                    -1 != a.indexOf("&") && (a = a.replace(goog.string.AMP_RE_, "&amp;"));
                    -1 != a.indexOf("<") && (a = a.replace(goog.string.LT_RE_,
                        "&lt;"));
                    -1 != a.indexOf(">") && (a = a.replace(goog.string.GT_RE_, "&gt;"));
                    -1 != a.indexOf("\"") && (a = a.replace(goog.string.QUOT_RE_, "&quot;"));
                    -1 != a.indexOf("'") && (a = a.replace(goog.string.SINGLE_QUOTE_RE_, "&#39;"));
                    -1 != a.indexOf("\x00") && (a = a.replace(goog.string.NULL_RE_, "&#0;"));
                    goog.string.DETECT_DOUBLE_ESCAPING && -1 != a.indexOf("e") && (a = a.replace(goog.string.E_RE_, "&#101;"));
                }
                return a;
            };
            goog.string.AMP_RE_ = /&/g;
            goog.string.LT_RE_ = /</g;
            goog.string.GT_RE_ = />/g;
            goog.string.QUOT_RE_ = /"/g;
            goog.string.SINGLE_QUOTE_RE_ = /'/g;
            goog.string.NULL_RE_ = /\x00/g;
            goog.string.E_RE_ = /e/g;
            goog.string.ALL_RE_ = goog.string.DETECT_DOUBLE_ESCAPING ? /[\x00&<>"'e]/ : /[\x00&<>"']/;
            goog.string.unescapeEntities = function (a) {
                return goog.string.contains(a, "&") ? !goog.string.FORCE_NON_DOM_HTML_UNESCAPING && "document" in goog.global ? goog.string.unescapeEntitiesUsingDom_(a) : goog.string.unescapePureXmlEntities_(a) : a;
            };
            goog.string.unescapeEntitiesWithDocument = function (a, b) {
                return goog.string.contains(a, "&") ? goog.string.unescapeEntitiesUsingDom_(a, b) : a;
            };
            goog.string.unescapeEntitiesUsingDom_ = function (a, b) {
                var c = {"&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": "\""}, d;
                d = b ? b.createElement("div") : goog.global.document.createElement("div");
                return a.replace(goog.string.HTML_ENTITY_PATTERN_, function (a, b) {
                    var g = c[a];
                    if (g) return g;
                    if ("#" == b.charAt(0)) {
                        var h = Number("0" + b.substr(1));
                        isNaN(h) || (g = String.fromCharCode(h));
                    }
                    g || (d.innerHTML = a + " ", g = d.firstChild.nodeValue.slice(0, -1));
                    return c[a] = g;
                });
            };
            goog.string.unescapePureXmlEntities_ = function (a) {
                return a.replace(/&([^;]+);/g, function (a, c) {
                    switch (c) {
                    case "amp":
                        return "&";
                    case "lt":
                        return "<";
                    case "gt":
                        return ">";
                    case "quot":
                        return "\"";
                    default:
                        if ("#" == c.charAt(0)) {
                            var d = Number("0" + c.substr(1));
                            if (!isNaN(d)) return String.fromCharCode(d);
                        }
                        return a;
                    }
                });
            };
            goog.string.HTML_ENTITY_PATTERN_ = /&([^;\s<&]+);?/g;
            goog.string.whitespaceEscape = function (a, b) {
                return goog.string.newLineToBr(a.replace(/ {2}/g, " &#160;"), b);
            };
            goog.string.preserveSpaces = function (a) {
                return a.replace(/(^|[\n ]) /g, "$1" + goog.string.Unicode.NBSP);
            };
            goog.string.stripQuotes = function (a, b) {
                for (var c = b.length, d = 0; d < c; d++) {
                    var e = 1 == c ? b : b.charAt(d);
                    if (a.charAt(0) == e && a.charAt(a.length - 1) == e) return a.substring(1, a.length - 1);
                }
                return a;
            };
            goog.string.truncate = function (a, b, c) {
                c && (a = goog.string.unescapeEntities(a));
                a.length > b && (a = a.substring(0, b - 3) + "...");
                c && (a = goog.string.htmlEscape(a));
                return a;
            };
            goog.string.truncateMiddle = function (a, b, c, d) {
                c && (a = goog.string.unescapeEntities(a));
                if (d && a.length > b) {
                    d > b && (d = b);
                    var e = a.length - d;
                    a = a.substring(0, b - d) + "..." + a.substring(e);
                } else a.length > b && (d = Math.floor(b / 2), e = a.length - d, a = a.substring(0, d + b % 2) + "..." + a.substring(e));
                c && (a = goog.string.htmlEscape(a));
                return a;
            };
            goog.string.specialEscapeChars_ = {
                "\x00": "\\0",
                "\b": "\\b",
                "\f": "\\f",
                "\n": "\\n",
                "\r": "\\r",
                "\t": "\\t",
                "\x0B": "\\x0B",
                "\"": "\\\"",
                "\\": "\\\\",
                "<": "<"
            };
            goog.string.jsEscapeCache_ = {"'": "\\'"};
            goog.string.quote = function (a) {
                a = String(a);
                for (var b = ["\""], c = 0; c < a.length; c++) {
                    var d = a.charAt(c), e = d.charCodeAt(0);
                    b[c + 1] = goog.string.specialEscapeChars_[d] || (31 < e && 127 > e ? d : goog.string.escapeChar(d));
                }
                b.push("\"");
                return b.join("");
            };
            goog.string.escapeString = function (a) {
                for (var b = [], c = 0; c < a.length; c++) b[c] = goog.string.escapeChar(a.charAt(c));
                return b.join("");
            };
            goog.string.escapeChar = function (a) {
                if (a in goog.string.jsEscapeCache_) return goog.string.jsEscapeCache_[a];
                if (a in goog.string.specialEscapeChars_) return goog.string.jsEscapeCache_[a] = goog.string.specialEscapeChars_[a];
                var b, c = a.charCodeAt(0);
                if (31 < c && 127 > c) b = a; else {
                    if (256 > c) {
                        if (b = "\\x", 16 > c || 256 < c) b += "0";
                    } else b = "\\u", 4096 > c && (b += "0");
                    b += c.toString(16).toUpperCase();
                }
                return goog.string.jsEscapeCache_[a] = b;
            };
            goog.string.contains = function (a, b) {
                return -1 != a.indexOf(b);
            };
            goog.string.caseInsensitiveContains = function (a, b) {
                return goog.string.contains(a.toLowerCase(), b.toLowerCase());
            };
            goog.string.countOf = function (a, b) {
                return a && b ? a.split(b).length - 1 : 0;
            };
            goog.string.removeAt = function (a, b, c) {
                var d = a;
                0 <= b && b < a.length && 0 < c && (d = a.substr(0, b) + a.substr(b + c, a.length - b - c));
                return d;
            };
            goog.string.remove = function (a, b) {
                var c = new RegExp(goog.string.regExpEscape(b), "");
                return a.replace(c, "");
            };
            goog.string.removeAll = function (a, b) {
                var c = new RegExp(goog.string.regExpEscape(b), "g");
                return a.replace(c, "");
            };
            goog.string.regExpEscape = function (a) {
                return String(a).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08");
            };
            goog.string.repeat = String.prototype.repeat ? function (a, b) {
                return a.repeat(b);
            } : function (a, b) {
                return Array(b + 1).join(a);
            };
            goog.string.padNumber = function (a, b, c) {
                a = goog.isDef(c) ? a.toFixed(c) : String(a);
                c = a.indexOf(".");
                -1 == c && (c = a.length);
                return goog.string.repeat("0", Math.max(0, b - c)) + a;
            };
            goog.string.makeSafe = function (a) {
                return null == a ? "" : String(a);
            };
            goog.string.buildString = function (a) {
                return Array.prototype.join.call(arguments, "");
            };
            goog.string.getRandomString = function () {
                return Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ goog.now()).toString(36);
            };
            goog.string.compareVersions = function (a, b) {
                for (var c = 0, d = goog.string.trim(String(a)).split("."), e = goog.string.trim(String(b)).split("."), f = Math.max(d.length, e.length), g = 0; 0 == c && g < f; g++) {
                    var h = d[g] || "", k = e[g] || "", l = RegExp("(\\d*)(\\D*)", "g"),
                        p = RegExp("(\\d*)(\\D*)", "g");
                    do {
                        var m = l.exec(h) || ["", "", ""], n = p.exec(k) || ["", "", ""];
                        if (0 == m[0].length && 0 == n[0].length) break;
                        var c = 0 == m[1].length ? 0 : parseInt(m[1], 10),
                            q = 0 == n[1].length ? 0 : parseInt(n[1], 10),
                            c = goog.string.compareElements_(c, q) || goog.string.compareElements_(0 ==
                                m[2].length, 0 == n[2].length) || goog.string.compareElements_(m[2], n[2]);
                    } while (0 == c);
                }
                return c;
            };
            goog.string.compareElements_ = function (a, b) {
                return a < b ? -1 : a > b ? 1 : 0;
            };
            goog.string.hashCode = function (a) {
                for (var b = 0, c = 0; c < a.length; ++c) b = 31 * b + a.charCodeAt(c) >>> 0;
                return b;
            };
            goog.string.uniqueStringCounter_ = 2147483648 * Math.random() | 0;
            goog.string.createUniqueString = function () {
                return "goog_" + goog.string.uniqueStringCounter_++;
            };
            goog.string.toNumber = function (a) {
                var b = Number(a);
                return 0 == b && goog.string.isEmptyOrWhitespace(a) ? NaN : b;
            };
            goog.string.isLowerCamelCase = function (a) {
                return /^[a-z]+([A-Z][a-z]*)*$/.test(a);
            };
            goog.string.isUpperCamelCase = function (a) {
                return /^([A-Z][a-z]*)+$/.test(a);
            };
            goog.string.toCamelCase = function (a) {
                return String(a).replace(/\-([a-z])/g, function (a, c) {
                    return c.toUpperCase();
                });
            };
            goog.string.toSelectorCase = function (a) {
                return String(a).replace(/([A-Z])/g, "-$1").toLowerCase();
            };
            goog.string.toTitleCase = function (a, b) {
                var c = goog.isString(b) ? goog.string.regExpEscape(b) : "\\s";
                return a.replace(new RegExp("(^" + (c ? "|[" + c + "]+" : "") + ")([a-z])", "g"), function (a, b, c) {
                    return b + c.toUpperCase();
                });
            };
            goog.string.capitalize = function (a) {
                return String(a.charAt(0)).toUpperCase() + String(a.substr(1)).toLowerCase();
            };
            goog.string.parseInt = function (a) {
                isFinite(a) && (a = String(a));
                return goog.isString(a) ? /^\s*-?0x/i.test(a) ? parseInt(a, 16) : parseInt(a, 10) : NaN;
            };
            goog.string.splitLimit = function (a, b, c) {
                a = a.split(b);
                for (var d = []; 0 < c && a.length;) d.push(a.shift()), c--;
                a.length && d.push(a.join(b));
                return d;
            };
            goog.string.editDistance = function (a, b) {
                var c = [], d = [];
                if (a == b) return 0;
                if (!a.length || !b.length) return Math.max(a.length, b.length);
                for (var e = 0; e < b.length + 1; e++) c[e] = e;
                for (e = 0; e < a.length; e++) {
                    d[0] = e + 1;
                    for (var f = 0; f < b.length; f++) d[f + 1] = Math.min(d[f] + 1, c[f + 1] + 1, c[f] + Number(a[e] != b[f]));
                    for (f = 0; f < c.length; f++) c[f] = d[f];
                }
                return d[b.length];
            };
            goog.asserts = {};
            goog.asserts.ENABLE_ASSERTS = goog.DEBUG;
            goog.asserts.AssertionError = function (a, b) {
                b.unshift(a);
                goog.debug.Error.call(this, goog.string.subs.apply(null, b));
                b.shift();
                this.messagePattern = a;
            };
            goog.inherits(goog.asserts.AssertionError, goog.debug.Error);
            goog.asserts.AssertionError.prototype.name = "AssertionError";
            goog.asserts.DEFAULT_ERROR_HANDLER = function (a) {
                throw a;
            };
            goog.asserts.errorHandler_ = goog.asserts.DEFAULT_ERROR_HANDLER;
            goog.asserts.doAssertFailure_ = function (a, b, c, d) {
                var e = "Assertion failed";
                if (c) var e = e + (": " + c), f = d; else a && (e += ": " + a, f = b);
                a = new goog.asserts.AssertionError("" + e, f || []);
                goog.asserts.errorHandler_(a);
            };
            goog.asserts.setErrorHandler = function (a) {
                goog.asserts.ENABLE_ASSERTS && (goog.asserts.errorHandler_ = a);
            };
            goog.asserts.assert = function (a, b, c) {
                goog.asserts.ENABLE_ASSERTS && !a && goog.asserts.doAssertFailure_("", null, b, Array.prototype.slice.call(arguments, 2));
                return a;
            };
            goog.asserts.fail = function (a, b) {
                goog.asserts.ENABLE_ASSERTS && goog.asserts.errorHandler_(new goog.asserts.AssertionError("Failure" + (a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1)));
            };
            goog.asserts.assertNumber = function (a, b, c) {
                goog.asserts.ENABLE_ASSERTS && !goog.isNumber(a) && goog.asserts.doAssertFailure_("Expected number but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
                return a;
            };
            goog.asserts.assertString = function (a, b, c) {
                goog.asserts.ENABLE_ASSERTS && !goog.isString(a) && goog.asserts.doAssertFailure_("Expected string but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
                return a;
            };
            goog.asserts.assertFunction = function (a, b, c) {
                goog.asserts.ENABLE_ASSERTS && !goog.isFunction(a) && goog.asserts.doAssertFailure_("Expected function but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
                return a;
            };
            goog.asserts.assertObject = function (a, b, c) {
                goog.asserts.ENABLE_ASSERTS && !goog.isObject(a) && goog.asserts.doAssertFailure_("Expected object but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
                return a;
            };
            goog.asserts.assertArray = function (a, b, c) {
                goog.asserts.ENABLE_ASSERTS && !goog.isArray(a) && goog.asserts.doAssertFailure_("Expected array but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
                return a;
            };
            goog.asserts.assertBoolean = function (a, b, c) {
                goog.asserts.ENABLE_ASSERTS && !goog.isBoolean(a) && goog.asserts.doAssertFailure_("Expected boolean but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
                return a;
            };
            goog.asserts.assertElement = function (a, b, c) {
                !goog.asserts.ENABLE_ASSERTS || goog.isObject(a) && a.nodeType == goog.dom.NodeType.ELEMENT || goog.asserts.doAssertFailure_("Expected Element but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
                return a;
            };
            goog.asserts.assertInstanceof = function (a, b, c, d) {
                !goog.asserts.ENABLE_ASSERTS || a instanceof b || goog.asserts.doAssertFailure_("Expected instanceof %s but got %s.", [goog.asserts.getType_(b), goog.asserts.getType_(a)], c, Array.prototype.slice.call(arguments, 3));
                return a;
            };
            goog.asserts.assertObjectPrototypeIsIntact = function () {
                for (var a in Object.prototype) goog.asserts.fail(a + " should not be enumerable in Object.prototype.");
            };
            goog.asserts.getType_ = function (a) {
                return a instanceof Function ? a.displayName || a.name || "unknown type name" : a instanceof Object ? a.constructor.displayName || a.constructor.name || Object.prototype.toString.call(a) : null === a ? "null" : typeof a;
            };
            var jspb = {
                Map: function (a, b) {
                    this.arr_ = a;
                    this.valueCtor_ = b;
                    this.map_ = {};
                    this.arrClean = !0;
                    0 < this.arr_.length && this.loadFromArray_();
                }
            };
            jspb.Map.prototype.loadFromArray_ = function () {
                for (var a = 0; a < this.arr_.length; a++) {
                    var b = this.arr_[a], c = b[0];
                    this.map_[c.toString()] = new jspb.Map.Entry_(c, b[1]);
                }
                this.arrClean = !0;
            };
            jspb.Map.prototype.toArray = function () {
                if (this.arrClean) {
                    if (this.valueCtor_) {
                        var a = this.map_, b;
                        for (b in a) if (Object.prototype.hasOwnProperty.call(a, b)) {
                            var c = a[b].valueWrapper;
                            c && c.toArray();
                        }
                    }
                } else {
                    this.arr_.length = 0;
                    a = this.stringKeys_();
                    a.sort();
                    for (b = 0; b < a.length; b++) {
                        var d = this.map_[a[b]];
                        (c = d.valueWrapper) && c.toArray();
                        this.arr_.push([d.key, d.value]);
                    }
                    this.arrClean = !0;
                }
                return this.arr_;
            };
            jspb.Map.prototype.toObject = function (a, b) {
                for (var c = this.toArray(), d = [], e = 0; e < c.length; e++) {
                    var f = this.map_[c[e][0].toString()];
                    this.wrapEntry_(f);
                    var g = f.valueWrapper;
                    g ? (goog.asserts.assert(b), d.push([f.key, b(a, g)])) : d.push([f.key, f.value]);
                }
                return d;
            };
            jspb.Map.fromObject = function (a, b, c) {
                b = new jspb.Map([], b);
                for (var d = 0; d < a.length; d++) {
                    var e = a[d][0], f = c(a[d][1]);
                    b.set(e, f);
                }
                return b;
            };
            jspb.Map.ArrayIteratorIterable_ = function (a) {
                this.idx_ = 0;
                this.arr_ = a;
            };
            jspb.Map.ArrayIteratorIterable_.prototype.next = function () {
                return this.idx_ < this.arr_.length ? {done: !1, value: this.arr_[this.idx_++]} : {
                    done: !0,
                    value: void 0
                };
            };
            $jscomp.initSymbol();
            "undefined" != typeof Symbol && ($jscomp.initSymbol(), $jscomp.initSymbolIterator(), jspb.Map.ArrayIteratorIterable_.prototype[Symbol.iterator] = function () {
                return this;
            });
            jspb.Map.prototype.getLength = function () {
                return this.stringKeys_().length;
            };
            jspb.Map.prototype.clear = function () {
                this.map_ = {};
                this.arrClean = !1;
            };
            jspb.Map.prototype.del = function (a) {
                a = a.toString();
                var b = this.map_.hasOwnProperty(a);
                delete this.map_[a];
                this.arrClean = !1;
                return b;
            };
            jspb.Map.prototype.getEntryList = function () {
                var a = [], b = this.stringKeys_();
                b.sort();
                for (var c = 0; c < b.length; c++) {
                    var d = this.map_[b[c]];
                    a.push([d.key, d.value]);
                }
                return a;
            };
            jspb.Map.prototype.entries = function () {
                var a = [], b = this.stringKeys_();
                b.sort();
                for (var c = 0; c < b.length; c++) {
                    var d = this.map_[b[c]];
                    a.push([d.key, this.wrapEntry_(d)]);
                }
                return new jspb.Map.ArrayIteratorIterable_(a);
            };
            jspb.Map.prototype.keys = function () {
                var a = [], b = this.stringKeys_();
                b.sort();
                for (var c = 0; c < b.length; c++) a.push(this.map_[b[c]].key);
                return new jspb.Map.ArrayIteratorIterable_(a);
            };
            jspb.Map.prototype.values = function () {
                var a = [], b = this.stringKeys_();
                b.sort();
                for (var c = 0; c < b.length; c++) a.push(this.wrapEntry_(this.map_[b[c]]));
                return new jspb.Map.ArrayIteratorIterable_(a);
            };
            jspb.Map.prototype.forEach = function (a, b) {
                var c = this.stringKeys_();
                c.sort();
                for (var d = 0; d < c.length; d++) {
                    var e = this.map_[c[d]];
                    a.call(b, this.wrapEntry_(e), e.key, this);
                }
            };
            jspb.Map.prototype.set = function (a, b) {
                var c = new jspb.Map.Entry_(a);
                this.valueCtor_ ? (c.valueWrapper = b, c.value = b.toArray()) : c.value = b;
                this.map_[a.toString()] = c;
                this.arrClean = !1;
                return this;
            };
            jspb.Map.prototype.wrapEntry_ = function (a) {
                return this.valueCtor_ ? (a.valueWrapper || (a.valueWrapper = new this.valueCtor_(a.value)), a.valueWrapper) : a.value;
            };
            jspb.Map.prototype.get = function (a) {
                if (a = this.map_[a.toString()]) return this.wrapEntry_(a);
            };
            jspb.Map.prototype.has = function (a) {
                return a.toString() in this.map_;
            };
            jspb.Map.prototype.serializeBinary = function (a, b, c, d, e) {
                var f = this.stringKeys_();
                f.sort();
                for (var g = 0; g < f.length; g++) {
                    var h = this.map_[f[g]];
                    b.beginSubMessage(a);
                    c.call(b, 1, h.key);
                    this.valueCtor_ ? d.call(b, 2, this.wrapEntry_(h), e) : d.call(b, 2, h.value);
                    b.endSubMessage();
                }
            };
            jspb.Map.deserializeBinary = function (a, b, c, d, e) {
                for (var f = void 0, g = void 0; b.nextField() && !b.isEndGroup();) {
                    var h = b.getFieldNumber();
                    1 == h ? f = c.call(b) : 2 == h && (a.valueCtor_ ? (g = new a.valueCtor_, d.call(b, g, e)) : g = d.call(b));
                }
                goog.asserts.assert(void 0 != f);
                goog.asserts.assert(void 0 != g);
                a.set(f, g);
            };
            jspb.Map.prototype.stringKeys_ = function () {
                var a = this.map_, b = [], c;
                for (c in a) Object.prototype.hasOwnProperty.call(a, c) && b.push(c);
                return b;
            };
            jspb.Map.Entry_ = function (a, b) {
                this.key = a;
                this.value = b;
                this.valueWrapper = void 0;
            };
            goog.array = {};
            goog.NATIVE_ARRAY_PROTOTYPES = goog.TRUSTED_SITE;
            goog.array.ASSUME_NATIVE_FUNCTIONS = !1;
            goog.array.peek = function (a) {
                return a[a.length - 1];
            };
            goog.array.last = goog.array.peek;
            goog.array.indexOf = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.indexOf) ? function (a, b, c) {
                goog.asserts.assert(null != a.length);
                return Array.prototype.indexOf.call(a, b, c);
            } : function (a, b, c) {
                c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
                if (goog.isString(a)) return goog.isString(b) && 1 == b.length ? a.indexOf(b, c) : -1;
                for (; c < a.length; c++) if (c in a && a[c] === b) return c;
                return -1;
            };
            goog.array.lastIndexOf = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.lastIndexOf) ? function (a, b, c) {
                goog.asserts.assert(null != a.length);
                return Array.prototype.lastIndexOf.call(a, b, null == c ? a.length - 1 : c);
            } : function (a, b, c) {
                c = null == c ? a.length - 1 : c;
                0 > c && (c = Math.max(0, a.length + c));
                if (goog.isString(a)) return goog.isString(b) && 1 == b.length ? a.lastIndexOf(b, c) : -1;
                for (; 0 <= c; c--) if (c in a && a[c] === b) return c;
                return -1;
            };
            goog.array.forEach = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.forEach) ? function (a, b, c) {
                goog.asserts.assert(null != a.length);
                Array.prototype.forEach.call(a, b, c);
            } : function (a, b, c) {
                for (var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0; f < d; f++) f in e && b.call(c, e[f], f, a);
            };
            goog.array.forEachRight = function (a, b, c) {
                for (var d = a.length, e = goog.isString(a) ? a.split("") : a, d = d - 1; 0 <= d; --d) d in e && b.call(c, e[d], d, a);
            };
            goog.array.filter = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.filter) ? function (a, b, c) {
                goog.asserts.assert(null != a.length);
                return Array.prototype.filter.call(a, b, c);
            } : function (a, b, c) {
                for (var d = a.length, e = [], f = 0, g = goog.isString(a) ? a.split("") : a, h = 0; h < d; h++) if (h in g) {
                    var k = g[h];
                    b.call(c, k, h, a) && (e[f++] = k);
                }
                return e;
            };
            goog.array.map = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.map) ? function (a, b, c) {
                goog.asserts.assert(null != a.length);
                return Array.prototype.map.call(a, b, c);
            } : function (a, b, c) {
                for (var d = a.length, e = Array(d), f = goog.isString(a) ? a.split("") : a, g = 0; g < d; g++) g in f && (e[g] = b.call(c, f[g], g, a));
                return e;
            };
            goog.array.reduce = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.reduce) ? function (a, b, c, d) {
                goog.asserts.assert(null != a.length);
                d && (b = goog.bind(b, d));
                return Array.prototype.reduce.call(a, b, c);
            } : function (a, b, c, d) {
                var e = c;
                goog.array.forEach(a, function (c, g) {
                    e = b.call(d, e, c, g, a);
                });
                return e;
            };
            goog.array.reduceRight = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.reduceRight) ? function (a, b, c, d) {
                goog.asserts.assert(null != a.length);
                goog.asserts.assert(null != b);
                d && (b = goog.bind(b, d));
                return Array.prototype.reduceRight.call(a, b, c);
            } : function (a, b, c, d) {
                var e = c;
                goog.array.forEachRight(a, function (c, g) {
                    e = b.call(d, e, c, g, a);
                });
                return e;
            };
            goog.array.some = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.some) ? function (a, b, c) {
                goog.asserts.assert(null != a.length);
                return Array.prototype.some.call(a, b, c);
            } : function (a, b, c) {
                for (var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0; f < d; f++) if (f in e && b.call(c, e[f], f, a)) return !0;
                return !1;
            };
            goog.array.every = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.every) ? function (a, b, c) {
                goog.asserts.assert(null != a.length);
                return Array.prototype.every.call(a, b, c);
            } : function (a, b, c) {
                for (var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0; f < d; f++) if (f in e && !b.call(c, e[f], f, a)) return !1;
                return !0;
            };
            goog.array.count = function (a, b, c) {
                var d = 0;
                goog.array.forEach(a, function (a, f, g) {
                    b.call(c, a, f, g) && ++d;
                }, c);
                return d;
            };
            goog.array.find = function (a, b, c) {
                b = goog.array.findIndex(a, b, c);
                return 0 > b ? null : goog.isString(a) ? a.charAt(b) : a[b];
            };
            goog.array.findIndex = function (a, b, c) {
                for (var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0; f < d; f++) if (f in e && b.call(c, e[f], f, a)) return f;
                return -1;
            };
            goog.array.findRight = function (a, b, c) {
                b = goog.array.findIndexRight(a, b, c);
                return 0 > b ? null : goog.isString(a) ? a.charAt(b) : a[b];
            };
            goog.array.findIndexRight = function (a, b, c) {
                for (var d = a.length, e = goog.isString(a) ? a.split("") : a, d = d - 1; 0 <= d; d--) if (d in e && b.call(c, e[d], d, a)) return d;
                return -1;
            };
            goog.array.contains = function (a, b) {
                return 0 <= goog.array.indexOf(a, b);
            };
            goog.array.isEmpty = function (a) {
                return 0 == a.length;
            };
            goog.array.clear = function (a) {
                if (!goog.isArray(a)) for (var b = a.length - 1; 0 <= b; b--) delete a[b];
                a.length = 0;
            };
            goog.array.insert = function (a, b) {
                goog.array.contains(a, b) || a.push(b);
            };
            goog.array.insertAt = function (a, b, c) {
                goog.array.splice(a, c, 0, b);
            };
            goog.array.insertArrayAt = function (a, b, c) {
                goog.partial(goog.array.splice, a, c, 0).apply(null, b);
            };
            goog.array.insertBefore = function (a, b, c) {
                var d;
                2 == arguments.length || 0 > (d = goog.array.indexOf(a, c)) ? a.push(b) : goog.array.insertAt(a, b, d);
            };
            goog.array.remove = function (a, b) {
                var c = goog.array.indexOf(a, b), d;
                (d = 0 <= c) && goog.array.removeAt(a, c);
                return d;
            };
            goog.array.removeAt = function (a, b) {
                goog.asserts.assert(null != a.length);
                return 1 == Array.prototype.splice.call(a, b, 1).length;
            };
            goog.array.removeIf = function (a, b, c) {
                b = goog.array.findIndex(a, b, c);
                return 0 <= b ? (goog.array.removeAt(a, b), !0) : !1;
            };
            goog.array.removeAllIf = function (a, b, c) {
                var d = 0;
                goog.array.forEachRight(a, function (e, f) {
                    b.call(c, e, f, a) && goog.array.removeAt(a, f) && d++;
                });
                return d;
            };
            goog.array.concat = function (a) {
                return Array.prototype.concat.apply(Array.prototype, arguments);
            };
            goog.array.join = function (a) {
                return Array.prototype.concat.apply(Array.prototype, arguments);
            };
            goog.array.toArray = function (a) {
                var b = a.length;
                if (0 < b) {
                    for (var c = Array(b), d = 0; d < b; d++) c[d] = a[d];
                    return c;
                }
                return [];
            };
            goog.array.clone = goog.array.toArray;
            goog.array.extend = function (a, b) {
                for (var c = 1; c < arguments.length; c++) {
                    var d = arguments[c];
                    if (goog.isArrayLike(d)) {
                        var e = a.length || 0, f = d.length || 0;
                        a.length = e + f;
                        for (var g = 0; g < f; g++) a[e + g] = d[g];
                    } else a.push(d);
                }
            };
            goog.array.splice = function (a, b, c, d) {
                goog.asserts.assert(null != a.length);
                return Array.prototype.splice.apply(a, goog.array.slice(arguments, 1));
            };
            goog.array.slice = function (a, b, c) {
                goog.asserts.assert(null != a.length);
                return 2 >= arguments.length ? Array.prototype.slice.call(a, b) : Array.prototype.slice.call(a, b, c);
            };
            goog.array.removeDuplicates = function (a, b, c) {
                b = b || a;
                var d = function (a) {
                    return goog.isObject(a) ? "o" + goog.getUid(a) : (typeof a).charAt(0) + a;
                };
                c = c || d;
                for (var d = {}, e = 0, f = 0; f < a.length;) {
                    var g = a[f++], h = c(g);
                    Object.prototype.hasOwnProperty.call(d, h) || (d[h] = !0, b[e++] = g);
                }
                b.length = e;
            };
            goog.array.binarySearch = function (a, b, c) {
                return goog.array.binarySearch_(a, c || goog.array.defaultCompare, !1, b);
            };
            goog.array.binarySelect = function (a, b, c) {
                return goog.array.binarySearch_(a, b, !0, void 0, c);
            };
            goog.array.binarySearch_ = function (a, b, c, d, e) {
                for (var f = 0, g = a.length, h; f < g;) {
                    var k = f + g >> 1, l;
                    l = c ? b.call(e, a[k], k, a) : b(d, a[k]);
                    0 < l ? f = k + 1 : (g = k, h = !l);
                }
                return h ? f : ~f;
            };
            goog.array.sort = function (a, b) {
                a.sort(b || goog.array.defaultCompare);
            };
            goog.array.stableSort = function (a, b) {
                for (var c = 0; c < a.length; c++) a[c] = {index: c, value: a[c]};
                var d = b || goog.array.defaultCompare;
                goog.array.sort(a, function (a, b) {
                    return d(a.value, b.value) || a.index - b.index;
                });
                for (c = 0; c < a.length; c++) a[c] = a[c].value;
            };
            goog.array.sortByKey = function (a, b, c) {
                var d = c || goog.array.defaultCompare;
                goog.array.sort(a, function (a, c) {
                    return d(b(a), b(c));
                });
            };
            goog.array.sortObjectsByKey = function (a, b, c) {
                goog.array.sortByKey(a, function (a) {
                    return a[b];
                }, c);
            };
            goog.array.isSorted = function (a, b, c) {
                b = b || goog.array.defaultCompare;
                for (var d = 1; d < a.length; d++) {
                    var e = b(a[d - 1], a[d]);
                    if (0 < e || 0 == e && c) return !1;
                }
                return !0;
            };
            goog.array.equals = function (a, b, c) {
                if (!goog.isArrayLike(a) || !goog.isArrayLike(b) || a.length != b.length) return !1;
                var d = a.length;
                c = c || goog.array.defaultCompareEquality;
                for (var e = 0; e < d; e++) if (!c(a[e], b[e])) return !1;
                return !0;
            };
            goog.array.compare3 = function (a, b, c) {
                c = c || goog.array.defaultCompare;
                for (var d = Math.min(a.length, b.length), e = 0; e < d; e++) {
                    var f = c(a[e], b[e]);
                    if (0 != f) return f;
                }
                return goog.array.defaultCompare(a.length, b.length);
            };
            goog.array.defaultCompare = function (a, b) {
                return a > b ? 1 : a < b ? -1 : 0;
            };
            goog.array.inverseDefaultCompare = function (a, b) {
                return -goog.array.defaultCompare(a, b);
            };
            goog.array.defaultCompareEquality = function (a, b) {
                return a === b;
            };
            goog.array.binaryInsert = function (a, b, c) {
                c = goog.array.binarySearch(a, b, c);
                return 0 > c ? (goog.array.insertAt(a, b, -(c + 1)), !0) : !1;
            };
            goog.array.binaryRemove = function (a, b, c) {
                b = goog.array.binarySearch(a, b, c);
                return 0 <= b ? goog.array.removeAt(a, b) : !1;
            };
            goog.array.bucket = function (a, b, c) {
                for (var d = {}, e = 0; e < a.length; e++) {
                    var f = a[e], g = b.call(c, f, e, a);
                    goog.isDef(g) && (d[g] || (d[g] = [])).push(f);
                }
                return d;
            };
            goog.array.toObject = function (a, b, c) {
                var d = {};
                goog.array.forEach(a, function (e, f) {
                    d[b.call(c, e, f, a)] = e;
                });
                return d;
            };
            goog.array.range = function (a, b, c) {
                var d = [], e = 0, f = a;
                c = c || 1;
                void 0 !== b && (e = a, f = b);
                if (0 > c * (f - e)) return [];
                if (0 < c) for (a = e; a < f; a += c) d.push(a); else for (a = e; a > f; a += c) d.push(a);
                return d;
            };
            goog.array.repeat = function (a, b) {
                for (var c = [], d = 0; d < b; d++) c[d] = a;
                return c;
            };
            goog.array.flatten = function (a) {
                for (var b = [], c = 0; c < arguments.length; c++) {
                    var d = arguments[c];
                    if (goog.isArray(d)) for (var e = 0; e < d.length; e += 8192) for (var f = goog.array.slice(d, e, e + 8192), f = goog.array.flatten.apply(null, f), g = 0; g < f.length; g++) b.push(f[g]); else b.push(d);
                }
                return b;
            };
            goog.array.rotate = function (a, b) {
                goog.asserts.assert(null != a.length);
                a.length && (b %= a.length, 0 < b ? Array.prototype.unshift.apply(a, a.splice(-b, b)) : 0 > b && Array.prototype.push.apply(a, a.splice(0, -b)));
                return a;
            };
            goog.array.moveItem = function (a, b, c) {
                goog.asserts.assert(0 <= b && b < a.length);
                goog.asserts.assert(0 <= c && c < a.length);
                b = Array.prototype.splice.call(a, b, 1);
                Array.prototype.splice.call(a, c, 0, b[0]);
            };
            goog.array.zip = function (a) {
                if (!arguments.length) return [];
                for (var b = [], c = arguments[0].length, d = 1; d < arguments.length; d++) arguments[d].length < c && (c = arguments[d].length);
                for (d = 0; d < c; d++) {
                    for (var e = [], f = 0; f < arguments.length; f++) e.push(arguments[f][d]);
                    b.push(e);
                }
                return b;
            };
            goog.array.shuffle = function (a, b) {
                for (var c = b || Math.random, d = a.length - 1; 0 < d; d--) {
                    var e = Math.floor(c() * (d + 1)), f = a[d];
                    a[d] = a[e];
                    a[e] = f;
                }
            };
            goog.array.copyByIndex = function (a, b) {
                var c = [];
                goog.array.forEach(b, function (b) {
                    c.push(a[b]);
                });
                return c;
            };
            goog.crypt = {};
            goog.crypt.stringToByteArray = function (a) {
                for (var b = [], c = 0, d = 0; d < a.length; d++) {
                    for (var e = a.charCodeAt(d); 255 < e;) b[c++] = e & 255, e >>= 8;
                    b[c++] = e;
                }
                return b;
            };
            goog.crypt.byteArrayToString = function (a) {
                if (8192 >= a.length) return String.fromCharCode.apply(null, a);
                for (var b = "", c = 0; c < a.length; c += 8192) var d = goog.array.slice(a, c, c + 8192), b = b + String.fromCharCode.apply(null, d);
                return b;
            };
            goog.crypt.byteArrayToHex = function (a) {
                return goog.array.map(a, function (a) {
                    a = a.toString(16);
                    return 1 < a.length ? a : "0" + a;
                }).join("");
            };
            goog.crypt.hexToByteArray = function (a) {
                goog.asserts.assert(0 == a.length % 2, "Key string length must be multiple of 2");
                for (var b = [], c = 0; c < a.length; c += 2) b.push(parseInt(a.substring(c, c + 2), 16));
                return b;
            };
            goog.crypt.stringToUtf8ByteArray = function (a) {
                for (var b = [], c = 0, d = 0; d < a.length; d++) {
                    var e = a.charCodeAt(d);
                    128 > e ? b[c++] = e : (2048 > e ? b[c++] = e >> 6 | 192 : (55296 == (e & 64512) && d + 1 < a.length && 56320 == (a.charCodeAt(d + 1) & 64512) ? (e = 65536 + ((e & 1023) << 10) + (a.charCodeAt(++d) & 1023), b[c++] = e >> 18 | 240, b[c++] = e >> 12 & 63 | 128) : b[c++] = e >> 12 | 224, b[c++] = e >> 6 & 63 | 128), b[c++] = e & 63 | 128);
                }
                return b;
            };
            goog.crypt.utf8ByteArrayToString = function (a) {
                for (var b = [], c = 0, d = 0; c < a.length;) {
                    var e = a[c++];
                    if (128 > e) b[d++] = String.fromCharCode(e); else if (191 < e && 224 > e) {
                        var f = a[c++];
                        b[d++] = String.fromCharCode((e & 31) << 6 | f & 63);
                    } else if (239 < e && 365 > e) {
                        var f = a[c++], g = a[c++], h = a[c++],
                            e = ((e & 7) << 18 | (f & 63) << 12 | (g & 63) << 6 | h & 63) - 65536;
                        b[d++] = String.fromCharCode(55296 + (e >> 10));
                        b[d++] = String.fromCharCode(56320 + (e & 1023));
                    } else f = a[c++], g = a[c++], b[d++] = String.fromCharCode((e & 15) << 12 | (f & 63) << 6 | g & 63);
                }
                return b.join("");
            };
            goog.crypt.xorByteArray = function (a, b) {
                goog.asserts.assert(a.length == b.length, "XOR array lengths must match");
                for (var c = [], d = 0; d < a.length; d++) c.push(a[d] ^ b[d]);
                return c;
            };
            goog.labs = {};
            goog.labs.userAgent = {};
            goog.labs.userAgent.util = {};
            goog.labs.userAgent.util.getNativeUserAgentString_ = function () {
                var a = goog.labs.userAgent.util.getNavigator_();
                return a && (a = a.userAgent) ? a : "";
            };
            goog.labs.userAgent.util.getNavigator_ = function () {
                return goog.global.navigator;
            };
            goog.labs.userAgent.util.userAgent_ = goog.labs.userAgent.util.getNativeUserAgentString_();
            goog.labs.userAgent.util.setUserAgent = function (a) {
                goog.labs.userAgent.util.userAgent_ = a || goog.labs.userAgent.util.getNativeUserAgentString_();
            };
            goog.labs.userAgent.util.getUserAgent = function () {
                return goog.labs.userAgent.util.userAgent_;
            };
            goog.labs.userAgent.util.matchUserAgent = function (a) {
                var b = goog.labs.userAgent.util.getUserAgent();
                return goog.string.contains(b, a);
            };
            goog.labs.userAgent.util.matchUserAgentIgnoreCase = function (a) {
                var b = goog.labs.userAgent.util.getUserAgent();
                return goog.string.caseInsensitiveContains(b, a);
            };
            goog.labs.userAgent.util.extractVersionTuples = function (a) {
                for (var b = RegExp("(\\w[\\w ]+)/([^\\s]+)\\s*(?:\\((.*?)\\))?", "g"), c = [], d; d = b.exec(a);) c.push([d[1], d[2], d[3] || void 0]);
                return c;
            };
            goog.labs.userAgent.platform = {};
            goog.labs.userAgent.platform.isAndroid = function () {
                return goog.labs.userAgent.util.matchUserAgent("Android");
            };
            goog.labs.userAgent.platform.isIpod = function () {
                return goog.labs.userAgent.util.matchUserAgent("iPod");
            };
            goog.labs.userAgent.platform.isIphone = function () {
                return goog.labs.userAgent.util.matchUserAgent("iPhone") && !goog.labs.userAgent.util.matchUserAgent("iPod") && !goog.labs.userAgent.util.matchUserAgent("iPad");
            };
            goog.labs.userAgent.platform.isIpad = function () {
                return goog.labs.userAgent.util.matchUserAgent("iPad");
            };
            goog.labs.userAgent.platform.isIos = function () {
                return goog.labs.userAgent.platform.isIphone() || goog.labs.userAgent.platform.isIpad() || goog.labs.userAgent.platform.isIpod();
            };
            goog.labs.userAgent.platform.isMacintosh = function () {
                return goog.labs.userAgent.util.matchUserAgent("Macintosh");
            };
            goog.labs.userAgent.platform.isLinux = function () {
                return goog.labs.userAgent.util.matchUserAgent("Linux");
            };
            goog.labs.userAgent.platform.isWindows = function () {
                return goog.labs.userAgent.util.matchUserAgent("Windows");
            };
            goog.labs.userAgent.platform.isChromeOS = function () {
                return goog.labs.userAgent.util.matchUserAgent("CrOS");
            };
            goog.labs.userAgent.platform.getVersion = function () {
                var a = goog.labs.userAgent.util.getUserAgent(), b = "";
                goog.labs.userAgent.platform.isWindows() ? (b = /Windows (?:NT|Phone) ([0-9.]+)/, b = (a = b.exec(a)) ? a[1] : "0.0") : goog.labs.userAgent.platform.isIos() ? (b = /(?:iPhone|iPod|iPad|CPU)\s+OS\s+(\S+)/, b = (a = b.exec(a)) && a[1].replace(/_/g, ".")) : goog.labs.userAgent.platform.isMacintosh() ? (b = /Mac OS X ([0-9_.]+)/, b = (a = b.exec(a)) ? a[1].replace(/_/g, ".") : "10") : goog.labs.userAgent.platform.isAndroid() ? (b = /Android\s+([^\);]+)(\)|;)/,
                b = (a = b.exec(a)) && a[1]) : goog.labs.userAgent.platform.isChromeOS() && (b = /(?:CrOS\s+(?:i686|x86_64)\s+([0-9.]+))/, b = (a = b.exec(a)) && a[1]);
                return b || "";
            };
            goog.labs.userAgent.platform.isVersionOrHigher = function (a) {
                return 0 <= goog.string.compareVersions(goog.labs.userAgent.platform.getVersion(), a);
            };
            goog.object = {};
            goog.object.forEach = function (a, b, c) {
                for (var d in a) b.call(c, a[d], d, a);
            };
            goog.object.filter = function (a, b, c) {
                var d = {}, e;
                for (e in a) b.call(c, a[e], e, a) && (d[e] = a[e]);
                return d;
            };
            goog.object.map = function (a, b, c) {
                var d = {}, e;
                for (e in a) d[e] = b.call(c, a[e], e, a);
                return d;
            };
            goog.object.some = function (a, b, c) {
                for (var d in a) if (b.call(c, a[d], d, a)) return !0;
                return !1;
            };
            goog.object.every = function (a, b, c) {
                for (var d in a) if (!b.call(c, a[d], d, a)) return !1;
                return !0;
            };
            goog.object.getCount = function (a) {
                var b = 0, c;
                for (c in a) b++;
                return b;
            };
            goog.object.getAnyKey = function (a) {
                for (var b in a) return b;
            };
            goog.object.getAnyValue = function (a) {
                for (var b in a) return a[b];
            };
            goog.object.contains = function (a, b) {
                return goog.object.containsValue(a, b);
            };
            goog.object.getValues = function (a) {
                var b = [], c = 0, d;
                for (d in a) b[c++] = a[d];
                return b;
            };
            goog.object.getKeys = function (a) {
                var b = [], c = 0, d;
                for (d in a) b[c++] = d;
                return b;
            };
            goog.object.getValueByKeys = function (a, b) {
                for (var c = goog.isArrayLike(b), d = c ? b : arguments, c = c ? 0 : 1; c < d.length && (a = a[d[c]], goog.isDef(a)); c++) ;
                return a;
            };
            goog.object.containsKey = function (a, b) {
                return null !== a && b in a;
            };
            goog.object.containsValue = function (a, b) {
                for (var c in a) if (a[c] == b) return !0;
                return !1;
            };
            goog.object.findKey = function (a, b, c) {
                for (var d in a) if (b.call(c, a[d], d, a)) return d;
            };
            goog.object.findValue = function (a, b, c) {
                return (b = goog.object.findKey(a, b, c)) && a[b];
            };
            goog.object.isEmpty = function (a) {
                for (var b in a) return !1;
                return !0;
            };
            goog.object.clear = function (a) {
                for (var b in a) delete a[b];
            };
            goog.object.remove = function (a, b) {
                var c;
                (c = b in a) && delete a[b];
                return c;
            };
            goog.object.add = function (a, b, c) {
                if (null !== a && b in a) throw Error("The object already contains the key \"" + b + "\"");
                goog.object.set(a, b, c);
            };
            goog.object.get = function (a, b, c) {
                return null !== a && b in a ? a[b] : c;
            };
            goog.object.set = function (a, b, c) {
                a[b] = c;
            };
            goog.object.setIfUndefined = function (a, b, c) {
                return b in a ? a[b] : a[b] = c;
            };
            goog.object.setWithReturnValueIfNotSet = function (a, b, c) {
                if (b in a) return a[b];
                c = c();
                return a[b] = c;
            };
            goog.object.equals = function (a, b) {
                for (var c in a) if (!(c in b) || a[c] !== b[c]) return !1;
                for (c in b) if (!(c in a)) return !1;
                return !0;
            };
            goog.object.clone = function (a) {
                var b = {}, c;
                for (c in a) b[c] = a[c];
                return b;
            };
            goog.object.unsafeClone = function (a) {
                var b = goog.typeOf(a);
                if ("object" == b || "array" == b) {
                    if (goog.isFunction(a.clone)) return a.clone();
                    var b = "array" == b ? [] : {}, c;
                    for (c in a) b[c] = goog.object.unsafeClone(a[c]);
                    return b;
                }
                return a;
            };
            goog.object.transpose = function (a) {
                var b = {}, c;
                for (c in a) b[a[c]] = c;
                return b;
            };
            goog.object.PROTOTYPE_FIELDS_ = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
            goog.object.extend = function (a, b) {
                for (var c, d, e = 1; e < arguments.length; e++) {
                    d = arguments[e];
                    for (c in d) a[c] = d[c];
                    for (var f = 0; f < goog.object.PROTOTYPE_FIELDS_.length; f++) c = goog.object.PROTOTYPE_FIELDS_[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c]);
                }
            };
            goog.object.create = function (a) {
                var b = arguments.length;
                if (1 == b && goog.isArray(arguments[0])) return goog.object.create.apply(null, arguments[0]);
                if (b % 2) throw Error("Uneven number of arguments");
                for (var c = {}, d = 0; d < b; d += 2) c[arguments[d]] = arguments[d + 1];
                return c;
            };
            goog.object.createSet = function (a) {
                var b = arguments.length;
                if (1 == b && goog.isArray(arguments[0])) return goog.object.createSet.apply(null, arguments[0]);
                for (var c = {}, d = 0; d < b; d++) c[arguments[d]] = !0;
                return c;
            };
            goog.object.createImmutableView = function (a) {
                var b = a;
                Object.isFrozen && !Object.isFrozen(a) && (b = Object.create(a), Object.freeze(b));
                return b;
            };
            goog.object.isImmutableView = function (a) {
                return !!Object.isFrozen && Object.isFrozen(a);
            };
            goog.labs.userAgent.browser = {};
            goog.labs.userAgent.browser.matchOpera_ = function () {
                return goog.labs.userAgent.util.matchUserAgent("Opera") || goog.labs.userAgent.util.matchUserAgent("OPR");
            };
            goog.labs.userAgent.browser.matchIE_ = function () {
                return goog.labs.userAgent.util.matchUserAgent("Trident") || goog.labs.userAgent.util.matchUserAgent("MSIE");
            };
            goog.labs.userAgent.browser.matchEdge_ = function () {
                return goog.labs.userAgent.util.matchUserAgent("Edge");
            };
            goog.labs.userAgent.browser.matchFirefox_ = function () {
                return goog.labs.userAgent.util.matchUserAgent("Firefox");
            };
            goog.labs.userAgent.browser.matchSafari_ = function () {
                return goog.labs.userAgent.util.matchUserAgent("Safari") && !(goog.labs.userAgent.browser.matchChrome_() || goog.labs.userAgent.browser.matchCoast_() || goog.labs.userAgent.browser.matchOpera_() || goog.labs.userAgent.browser.matchEdge_() || goog.labs.userAgent.browser.isSilk() || goog.labs.userAgent.util.matchUserAgent("Android"));
            };
            goog.labs.userAgent.browser.matchCoast_ = function () {
                return goog.labs.userAgent.util.matchUserAgent("Coast");
            };
            goog.labs.userAgent.browser.matchIosWebview_ = function () {
                return (goog.labs.userAgent.util.matchUserAgent("iPad") || goog.labs.userAgent.util.matchUserAgent("iPhone")) && !goog.labs.userAgent.browser.matchSafari_() && !goog.labs.userAgent.browser.matchChrome_() && !goog.labs.userAgent.browser.matchCoast_() && goog.labs.userAgent.util.matchUserAgent("AppleWebKit");
            };
            goog.labs.userAgent.browser.matchChrome_ = function () {
                return (goog.labs.userAgent.util.matchUserAgent("Chrome") || goog.labs.userAgent.util.matchUserAgent("CriOS")) && !goog.labs.userAgent.browser.matchOpera_() && !goog.labs.userAgent.browser.matchEdge_();
            };
            goog.labs.userAgent.browser.matchAndroidBrowser_ = function () {
                return goog.labs.userAgent.util.matchUserAgent("Android") && !(goog.labs.userAgent.browser.isChrome() || goog.labs.userAgent.browser.isFirefox() || goog.labs.userAgent.browser.isOpera() || goog.labs.userAgent.browser.isSilk());
            };
            goog.labs.userAgent.browser.isOpera = goog.labs.userAgent.browser.matchOpera_;
            goog.labs.userAgent.browser.isIE = goog.labs.userAgent.browser.matchIE_;
            goog.labs.userAgent.browser.isEdge = goog.labs.userAgent.browser.matchEdge_;
            goog.labs.userAgent.browser.isFirefox = goog.labs.userAgent.browser.matchFirefox_;
            goog.labs.userAgent.browser.isSafari = goog.labs.userAgent.browser.matchSafari_;
            goog.labs.userAgent.browser.isCoast = goog.labs.userAgent.browser.matchCoast_;
            goog.labs.userAgent.browser.isIosWebview = goog.labs.userAgent.browser.matchIosWebview_;
            goog.labs.userAgent.browser.isChrome = goog.labs.userAgent.browser.matchChrome_;
            goog.labs.userAgent.browser.isAndroidBrowser = goog.labs.userAgent.browser.matchAndroidBrowser_;
            goog.labs.userAgent.browser.isSilk = function () {
                return goog.labs.userAgent.util.matchUserAgent("Silk");
            };
            goog.labs.userAgent.browser.getVersion = function () {
                function a(a) {
                    a = goog.array.find(a, d);
                    return c[a] || "";
                }

                var b = goog.labs.userAgent.util.getUserAgent();
                if (goog.labs.userAgent.browser.isIE()) return goog.labs.userAgent.browser.getIEVersion_(b);
                var b = goog.labs.userAgent.util.extractVersionTuples(b), c = {};
                goog.array.forEach(b, function (a) {
                    c[a[0]] = a[1];
                });
                var d = goog.partial(goog.object.containsKey, c);
                return goog.labs.userAgent.browser.isOpera() ? a(["Version", "Opera", "OPR"]) : goog.labs.userAgent.browser.isEdge() ?
                    a(["Edge"]) : goog.labs.userAgent.browser.isChrome() ? a(["Chrome", "CriOS"]) : (b = b[2]) && b[1] || "";
            };
            goog.labs.userAgent.browser.isVersionOrHigher = function (a) {
                return 0 <= goog.string.compareVersions(goog.labs.userAgent.browser.getVersion(), a);
            };
            goog.labs.userAgent.browser.getIEVersion_ = function (a) {
                var b = /rv: *([\d\.]*)/.exec(a);
                if (b && b[1]) return b[1];
                var b = "", c = /MSIE +([\d\.]+)/.exec(a);
                if (c && c[1]) if (a = /Trident\/(\d.\d)/.exec(a), "7.0" == c[1]) if (a && a[1]) switch (a[1]) {
                case "4.0":
                    b = "8.0";
                    break;
                case "5.0":
                    b = "9.0";
                    break;
                case "6.0":
                    b = "10.0";
                    break;
                case "7.0":
                    b = "11.0";
                } else b = "7.0"; else b = c[1];
                return b;
            };
            goog.labs.userAgent.engine = {};
            goog.labs.userAgent.engine.isPresto = function () {
                return goog.labs.userAgent.util.matchUserAgent("Presto");
            };
            goog.labs.userAgent.engine.isTrident = function () {
                return goog.labs.userAgent.util.matchUserAgent("Trident") || goog.labs.userAgent.util.matchUserAgent("MSIE");
            };
            goog.labs.userAgent.engine.isEdge = function () {
                return goog.labs.userAgent.util.matchUserAgent("Edge");
            };
            goog.labs.userAgent.engine.isWebKit = function () {
                return goog.labs.userAgent.util.matchUserAgentIgnoreCase("WebKit") && !goog.labs.userAgent.engine.isEdge();
            };
            goog.labs.userAgent.engine.isGecko = function () {
                return goog.labs.userAgent.util.matchUserAgent("Gecko") && !goog.labs.userAgent.engine.isWebKit() && !goog.labs.userAgent.engine.isTrident() && !goog.labs.userAgent.engine.isEdge();
            };
            goog.labs.userAgent.engine.getVersion = function () {
                var a = goog.labs.userAgent.util.getUserAgent();
                if (a) {
                    var a = goog.labs.userAgent.util.extractVersionTuples(a),
                        b = goog.labs.userAgent.engine.getEngineTuple_(a);
                    if (b) return "Gecko" == b[0] ? goog.labs.userAgent.engine.getVersionForKey_(a, "Firefox") : b[1];
                    var a = a[0], c;
                    if (a && (c = a[2]) && (c = /Trident\/([^\s;]+)/.exec(c))) return c[1];
                }
                return "";
            };
            goog.labs.userAgent.engine.getEngineTuple_ = function (a) {
                if (!goog.labs.userAgent.engine.isEdge()) return a[1];
                for (var b = 0; b < a.length; b++) {
                    var c = a[b];
                    if ("Edge" == c[0]) return c;
                }
            };
            goog.labs.userAgent.engine.isVersionOrHigher = function (a) {
                return 0 <= goog.string.compareVersions(goog.labs.userAgent.engine.getVersion(), a);
            };
            goog.labs.userAgent.engine.getVersionForKey_ = function (a, b) {
                var c = goog.array.find(a, function (a) {
                    return b == a[0];
                });
                return c && c[1] || "";
            };
            goog.userAgent = {};
            goog.userAgent.ASSUME_IE = !1;
            goog.userAgent.ASSUME_EDGE = !1;
            goog.userAgent.ASSUME_GECKO = !1;
            goog.userAgent.ASSUME_WEBKIT = !1;
            goog.userAgent.ASSUME_MOBILE_WEBKIT = !1;
            goog.userAgent.ASSUME_OPERA = !1;
            goog.userAgent.ASSUME_ANY_VERSION = !1;
            goog.userAgent.BROWSER_KNOWN_ = goog.userAgent.ASSUME_IE || goog.userAgent.ASSUME_EDGE || goog.userAgent.ASSUME_GECKO || goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_OPERA;
            goog.userAgent.getUserAgentString = function () {
                return goog.labs.userAgent.util.getUserAgent();
            };
            goog.userAgent.getNavigator = function () {
                return goog.global.navigator || null;
            };
            goog.userAgent.OPERA = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_OPERA : goog.labs.userAgent.browser.isOpera();
            goog.userAgent.IE = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_IE : goog.labs.userAgent.browser.isIE();
            goog.userAgent.EDGE = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_EDGE : goog.labs.userAgent.engine.isEdge();
            goog.userAgent.EDGE_OR_IE = goog.userAgent.EDGE || goog.userAgent.IE;
            goog.userAgent.GECKO = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_GECKO : goog.labs.userAgent.engine.isGecko();
            goog.userAgent.WEBKIT = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_MOBILE_WEBKIT : goog.labs.userAgent.engine.isWebKit();
            goog.userAgent.isMobile_ = function () {
                return goog.userAgent.WEBKIT && goog.labs.userAgent.util.matchUserAgent("Mobile");
            };
            goog.userAgent.MOBILE = goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.isMobile_();
            goog.userAgent.SAFARI = goog.userAgent.WEBKIT;
            goog.userAgent.determinePlatform_ = function () {
                var a = goog.userAgent.getNavigator();
                return a && a.platform || "";
            };
            goog.userAgent.PLATFORM = goog.userAgent.determinePlatform_();
            goog.userAgent.ASSUME_MAC = !1;
            goog.userAgent.ASSUME_WINDOWS = !1;
            goog.userAgent.ASSUME_LINUX = !1;
            goog.userAgent.ASSUME_X11 = !1;
            goog.userAgent.ASSUME_ANDROID = !1;
            goog.userAgent.ASSUME_IPHONE = !1;
            goog.userAgent.ASSUME_IPAD = !1;
            goog.userAgent.PLATFORM_KNOWN_ = goog.userAgent.ASSUME_MAC || goog.userAgent.ASSUME_WINDOWS || goog.userAgent.ASSUME_LINUX || goog.userAgent.ASSUME_X11 || goog.userAgent.ASSUME_ANDROID || goog.userAgent.ASSUME_IPHONE || goog.userAgent.ASSUME_IPAD;
            goog.userAgent.MAC = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_MAC : goog.labs.userAgent.platform.isMacintosh();
            goog.userAgent.WINDOWS = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_WINDOWS : goog.labs.userAgent.platform.isWindows();
            goog.userAgent.isLegacyLinux_ = function () {
                return goog.labs.userAgent.platform.isLinux() || goog.labs.userAgent.platform.isChromeOS();
            };
            goog.userAgent.LINUX = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_LINUX : goog.userAgent.isLegacyLinux_();
            goog.userAgent.isX11_ = function () {
                var a = goog.userAgent.getNavigator();
                return !!a && goog.string.contains(a.appVersion || "", "X11");
            };
            goog.userAgent.X11 = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_X11 : goog.userAgent.isX11_();
            goog.userAgent.ANDROID = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_ANDROID : goog.labs.userAgent.platform.isAndroid();
            goog.userAgent.IPHONE = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPHONE : goog.labs.userAgent.platform.isIphone();
            goog.userAgent.IPAD = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPAD : goog.labs.userAgent.platform.isIpad();
            goog.userAgent.operaVersion_ = function () {
                var a = goog.global.opera.version;
                try {
                    return a();
                } catch (b) {
                    return a;
                }
            };
            goog.userAgent.determineVersion_ = function () {
                if (goog.userAgent.OPERA && goog.global.opera) return goog.userAgent.operaVersion_();
                var a = "", b = goog.userAgent.getVersionRegexResult_();
                b && (a = b ? b[1] : "");
                return goog.userAgent.IE && (b = goog.userAgent.getDocumentMode_(), b > parseFloat(a)) ? String(b) : a;
            };
            goog.userAgent.getVersionRegexResult_ = function () {
                var a = goog.userAgent.getUserAgentString();
                if (goog.userAgent.GECKO) return /rv\:([^\);]+)(\)|;)/.exec(a);
                if (goog.userAgent.EDGE) return /Edge\/([\d\.]+)/.exec(a);
                if (goog.userAgent.IE) return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
                if (goog.userAgent.WEBKIT) return /WebKit\/(\S+)/.exec(a);
            };
            goog.userAgent.getDocumentMode_ = function () {
                var a = goog.global.document;
                return a ? a.documentMode : void 0;
            };
            goog.userAgent.VERSION = goog.userAgent.determineVersion_();
            goog.userAgent.compare = function (a, b) {
                return goog.string.compareVersions(a, b);
            };
            goog.userAgent.isVersionOrHigherCache_ = {};
            goog.userAgent.isVersionOrHigher = function (a) {
                return goog.userAgent.ASSUME_ANY_VERSION || goog.userAgent.isVersionOrHigherCache_[a] || (goog.userAgent.isVersionOrHigherCache_[a] = 0 <= goog.string.compareVersions(goog.userAgent.VERSION, a));
            };
            goog.userAgent.isVersion = goog.userAgent.isVersionOrHigher;
            goog.userAgent.isDocumentModeOrHigher = function (a) {
                return Number(goog.userAgent.DOCUMENT_MODE) >= a;
            };
            goog.userAgent.isDocumentMode = goog.userAgent.isDocumentModeOrHigher;
            goog.userAgent.DOCUMENT_MODE = function () {
                var a = goog.global.document, b = goog.userAgent.getDocumentMode_();
                return a && goog.userAgent.IE ? b || ("CSS1Compat" == a.compatMode ? parseInt(goog.userAgent.VERSION, 10) : 5) : void 0;
            }();
            goog.userAgent.product = {};
            goog.userAgent.product.ASSUME_FIREFOX = !1;
            goog.userAgent.product.ASSUME_IPHONE = !1;
            goog.userAgent.product.ASSUME_IPAD = !1;
            goog.userAgent.product.ASSUME_ANDROID = !1;
            goog.userAgent.product.ASSUME_CHROME = !1;
            goog.userAgent.product.ASSUME_SAFARI = !1;
            goog.userAgent.product.PRODUCT_KNOWN_ = goog.userAgent.ASSUME_IE || goog.userAgent.ASSUME_EDGE || goog.userAgent.ASSUME_OPERA || goog.userAgent.product.ASSUME_FIREFOX || goog.userAgent.product.ASSUME_IPHONE || goog.userAgent.product.ASSUME_IPAD || goog.userAgent.product.ASSUME_ANDROID || goog.userAgent.product.ASSUME_CHROME || goog.userAgent.product.ASSUME_SAFARI;
            goog.userAgent.product.OPERA = goog.userAgent.OPERA;
            goog.userAgent.product.IE = goog.userAgent.IE;
            goog.userAgent.product.EDGE = goog.userAgent.EDGE;
            goog.userAgent.product.FIREFOX = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_FIREFOX : goog.labs.userAgent.browser.isFirefox();
            goog.userAgent.product.isIphoneOrIpod_ = function () {
                return goog.labs.userAgent.platform.isIphone() || goog.labs.userAgent.platform.isIpod();
            };
            goog.userAgent.product.IPHONE = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_IPHONE : goog.userAgent.product.isIphoneOrIpod_();
            goog.userAgent.product.IPAD = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_IPAD : goog.labs.userAgent.platform.isIpad();
            goog.userAgent.product.ANDROID = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_ANDROID : goog.labs.userAgent.browser.isAndroidBrowser();
            goog.userAgent.product.CHROME = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_CHROME : goog.labs.userAgent.browser.isChrome();
            goog.userAgent.product.isSafariDesktop_ = function () {
                return goog.labs.userAgent.browser.isSafari() && !goog.labs.userAgent.platform.isIos();
            };
            goog.userAgent.product.SAFARI = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_SAFARI : goog.userAgent.product.isSafariDesktop_();
            goog.crypt.base64 = {};
            goog.crypt.base64.byteToCharMap_ = null;
            goog.crypt.base64.charToByteMap_ = null;
            goog.crypt.base64.byteToCharMapWebSafe_ = null;
            goog.crypt.base64.ENCODED_VALS_BASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            goog.crypt.base64.ENCODED_VALS = goog.crypt.base64.ENCODED_VALS_BASE + "+/=";
            goog.crypt.base64.ENCODED_VALS_WEBSAFE = goog.crypt.base64.ENCODED_VALS_BASE + "-_.";
            goog.crypt.base64.ASSUME_NATIVE_SUPPORT_ = goog.userAgent.GECKO || goog.userAgent.WEBKIT && !goog.userAgent.product.SAFARI || goog.userAgent.OPERA;
            goog.crypt.base64.HAS_NATIVE_ENCODE_ = goog.crypt.base64.ASSUME_NATIVE_SUPPORT_ || "function" == typeof goog.global.btoa;
            goog.crypt.base64.HAS_NATIVE_DECODE_ = goog.crypt.base64.ASSUME_NATIVE_SUPPORT_ || !goog.userAgent.product.SAFARI && !goog.userAgent.IE && "function" == typeof goog.global.atob;
            goog.crypt.base64.encodeByteArray = function (a, b) {
                goog.asserts.assert(goog.isArrayLike(a), "encodeByteArray takes an array as a parameter");
                goog.crypt.base64.init_();
                for (var c = b ? goog.crypt.base64.byteToCharMapWebSafe_ : goog.crypt.base64.byteToCharMap_, d = [], e = 0; e < a.length; e += 3) {
                    var f = a[e], g = e + 1 < a.length, h = g ? a[e + 1] : 0, k = e + 2 < a.length,
                        l = k ? a[e + 2] : 0, p = f >> 2, f = (f & 3) << 4 | h >> 4, h = (h & 15) << 2 | l >> 6,
                        l = l & 63;
                    k || (l = 64, g || (h = 64));
                    d.push(c[p], c[f], c[h], c[l]);
                }
                return d.join("");
            };
            goog.crypt.base64.encodeString = function (a, b) {
                return goog.crypt.base64.HAS_NATIVE_ENCODE_ && !b ? goog.global.btoa(a) : goog.crypt.base64.encodeByteArray(goog.crypt.stringToByteArray(a), b);
            };
            goog.crypt.base64.decodeString = function (a, b) {
                if (goog.crypt.base64.HAS_NATIVE_DECODE_ && !b) return goog.global.atob(a);
                var c = "";
                goog.crypt.base64.decodeStringInternal_(a, function (a) {
                    c += String.fromCharCode(a);
                });
                return c;
            };
            goog.crypt.base64.decodeStringToByteArray = function (a, b) {
                var c = [];
                goog.crypt.base64.decodeStringInternal_(a, function (a) {
                    c.push(a);
                });
                return c;
            };
            goog.crypt.base64.decodeStringToUint8Array = function (a) {
                goog.asserts.assert(!goog.userAgent.IE || goog.userAgent.isVersionOrHigher("10"), "Browser does not support typed arrays");
                var b = new Uint8Array(Math.ceil(3 * a.length / 4)), c = 0;
                goog.crypt.base64.decodeStringInternal_(a, function (a) {
                    b[c++] = a;
                });
                return b.subarray(0, c);
            };
            goog.crypt.base64.decodeStringInternal_ = function (a, b) {
                function c(b) {
                    for (; d < a.length;) {
                        var c = a.charAt(d++), e = goog.crypt.base64.charToByteMap_[c];
                        if (null != e) return e;
                        if (!goog.string.isEmptyOrWhitespace(c)) throw Error("Unknown base64 encoding at char: " + c);
                    }
                    return b;
                }

                goog.crypt.base64.init_();
                for (var d = 0; ;) {
                    var e = c(-1), f = c(0), g = c(64), h = c(64);
                    if (64 === h && -1 === e) break;
                    b(e << 2 | f >> 4);
                    64 != g && (b(f << 4 & 240 | g >> 2), 64 != h && b(g << 6 & 192 | h));
                }
            };
            goog.crypt.base64.init_ = function () {
                if (!goog.crypt.base64.byteToCharMap_) {
                    goog.crypt.base64.byteToCharMap_ = {};
                    goog.crypt.base64.charToByteMap_ = {};
                    goog.crypt.base64.byteToCharMapWebSafe_ = {};
                    for (var a = 0; a < goog.crypt.base64.ENCODED_VALS.length; a++) goog.crypt.base64.byteToCharMap_[a] = goog.crypt.base64.ENCODED_VALS.charAt(a), goog.crypt.base64.charToByteMap_[goog.crypt.base64.byteToCharMap_[a]] = a, goog.crypt.base64.byteToCharMapWebSafe_[a] = goog.crypt.base64.ENCODED_VALS_WEBSAFE.charAt(a), a >= goog.crypt.base64.ENCODED_VALS_BASE.length &&
                    (goog.crypt.base64.charToByteMap_[goog.crypt.base64.ENCODED_VALS_WEBSAFE.charAt(a)] = a);
                }
            };
            jspb.ExtensionFieldInfo = function (a, b, c, d, e) {
                this.fieldIndex = a;
                this.fieldName = b;
                this.ctor = c;
                this.toObjectFn = d;
                this.isRepeated = e;
            };
            jspb.ExtensionFieldBinaryInfo = function (a, b, c, d, e, f) {
                this.fieldInfo = a;
                this.binaryReaderFn = b;
                this.binaryWriterFn = c;
                this.binaryMessageSerializeFn = d;
                this.binaryMessageDeserializeFn = e;
                this.isPacked = f;
            };
            jspb.ExtensionFieldInfo.prototype.isMessageType = function () {
                return !!this.ctor;
            };
            jspb.Message = function () {
            };
            jspb.Message.GENERATE_TO_OBJECT = !0;
            jspb.Message.GENERATE_FROM_OBJECT = !goog.DISALLOW_TEST_ONLY_CODE;
            jspb.Message.GENERATE_TO_STRING = !0;
            jspb.Message.ASSUME_LOCAL_ARRAYS = !1;
            jspb.Message.MINIMIZE_MEMORY_ALLOCATIONS = COMPILED;
            jspb.Message.SUPPORTS_UINT8ARRAY_ = "function" == typeof Uint8Array;
            jspb.Message.prototype.getJsPbMessageId = function () {
                return this.messageId_;
            };
            jspb.Message.getIndex_ = function (a, b) {
                return b + a.arrayIndexOffset_;
            };
            jspb.Message.initialize = function (a, b, c, d, e, f) {
                a.wrappers_ = jspb.Message.MINIMIZE_MEMORY_ALLOCATIONS ? null : {};
                b || (b = c ? [c] : []);
                a.messageId_ = c ? String(c) : void 0;
                a.arrayIndexOffset_ = 0 === c ? -1 : 0;
                a.array = b;
                jspb.Message.initPivotAndExtensionObject_(a, d);
                a.convertedFloatingPointFields_ = {};
                if (e) for (b = 0; b < e.length; b++) c = e[b], c < a.pivot_ ? (c = jspb.Message.getIndex_(a, c), a.array[c] = a.array[c] || (jspb.Message.MINIMIZE_MEMORY_ALLOCATIONS ? jspb.Message.EMPTY_LIST_SENTINEL_ : [])) : (jspb.Message.maybeInitEmptyExtensionObject_(a),
                a.extensionObject_[c] = a.extensionObject_[c] || (jspb.Message.MINIMIZE_MEMORY_ALLOCATIONS ? jspb.Message.EMPTY_LIST_SENTINEL_ : []));
                f && f.length && goog.array.forEach(f, goog.partial(jspb.Message.computeOneofCase, a));
            };
            jspb.Message.EMPTY_LIST_SENTINEL_ = goog.DEBUG && Object.freeze ? Object.freeze([]) : [];
            jspb.Message.isArray_ = function (a) {
                return jspb.Message.ASSUME_LOCAL_ARRAYS ? a instanceof Array : goog.isArray(a);
            };
            jspb.Message.initPivotAndExtensionObject_ = function (a, b) {
                if (a.array.length) {
                    var c = a.array.length - 1, d = a.array[c];
                    if (d && "object" == typeof d && !jspb.Message.isArray_(d) && !(jspb.Message.SUPPORTS_UINT8ARRAY_ && d instanceof Uint8Array)) {
                        a.pivot_ = c - a.arrayIndexOffset_;
                        a.extensionObject_ = d;
                        return;
                    }
                }
                -1 < b ? (a.pivot_ = b, a.extensionObject_ = null) : a.pivot_ = Number.MAX_VALUE;
            };
            jspb.Message.maybeInitEmptyExtensionObject_ = function (a) {
                var b = jspb.Message.getIndex_(a, a.pivot_);
                a.array[b] || (a.extensionObject_ = a.array[b] = {});
            };
            jspb.Message.toObjectList = function (a, b, c) {
                for (var d = [], e = 0; e < a.length; e++) d[e] = b.call(a[e], c, a[e]);
                return d;
            };
            jspb.Message.toObjectExtension = function (a, b, c, d, e) {
                for (var f in c) {
                    var g = c[f], h = d.call(a, g);
                    if (null != h) {
                        for (var k in g.fieldName) if (g.fieldName.hasOwnProperty(k)) break;
                        b[k] = g.toObjectFn ? g.isRepeated ? jspb.Message.toObjectList(h, g.toObjectFn, e) : g.toObjectFn(e, h) : h;
                    }
                }
            };
            jspb.Message.serializeBinaryExtensions = function (a, b, c, d) {
                for (var e in c) {
                    var f = c[e], g = f.fieldInfo;
                    if (!f.binaryWriterFn) throw Error("Message extension present that was generated without binary serialization support");
                    var h = d.call(a, g);
                    if (null != h) if (g.isMessageType()) if (f.binaryMessageSerializeFn) f.binaryWriterFn.call(b, g.fieldIndex, h, f.binaryMessageSerializeFn); else throw Error("Message extension present holding submessage without binary support enabled, and message is being serialized to binary format");
                    else f.binaryWriterFn.call(b, g.fieldIndex, h);
                }
            };
            jspb.Message.readBinaryExtension = function (a, b, c, d, e) {
                var f = c[b.getFieldNumber()];
                if (f) {
                    c = f.fieldInfo;
                    if (!f.binaryReaderFn) throw Error("Deserializing extension whose generated code does not support binary format");
                    var g;
                    c.isMessageType() ? (g = new c.ctor, f.binaryReaderFn.call(b, g, f.binaryMessageDeserializeFn)) : g = f.binaryReaderFn.call(b);
                    c.isRepeated && !f.isPacked ? (b = d.call(a, c)) ? b.push(g) : e.call(a, c, [g]) : e.call(a, c, g);
                } else b.skipField();
            };
            jspb.Message.getField = function (a, b) {
                if (b < a.pivot_) {
                    var c = jspb.Message.getIndex_(a, b), d = a.array[c];
                    return d === jspb.Message.EMPTY_LIST_SENTINEL_ ? a.array[c] = [] : d;
                }
                if (a.extensionObject_) return d = a.extensionObject_[b], d === jspb.Message.EMPTY_LIST_SENTINEL_ ? a.extensionObject_[b] = [] : d;
            };
            jspb.Message.getRepeatedField = function (a, b) {
                if (b < a.pivot_) {
                    var c = jspb.Message.getIndex_(a, b), d = a.array[c];
                    return d === jspb.Message.EMPTY_LIST_SENTINEL_ ? a.array[c] = [] : d;
                }
                d = a.extensionObject_[b];
                return d === jspb.Message.EMPTY_LIST_SENTINEL_ ? a.extensionObject_[b] = [] : d;
            };
            jspb.Message.getOptionalFloatingPointField = function (a, b) {
                var c = jspb.Message.getField(a, b);
                return null == c ? c : +c;
            };
            jspb.Message.getRepeatedFloatingPointField = function (a, b) {
                var c = jspb.Message.getRepeatedField(a, b);
                a.convertedFloatingPointFields_ || (a.convertedFloatingPointFields_ = {});
                if (!a.convertedFloatingPointFields_[b]) {
                    for (var d = 0; d < c.length; d++) c[d] = +c[d];
                    a.convertedFloatingPointFields_[b] = !0;
                }
                return c;
            };
            jspb.Message.bytesAsB64 = function (a) {
                if (null == a || goog.isString(a)) return a;
                if (jspb.Message.SUPPORTS_UINT8ARRAY_ && a instanceof Uint8Array) return goog.crypt.base64.encodeByteArray(a);
                goog.asserts.fail("Cannot coerce to b64 string: " + goog.typeOf(a));
                return null;
            };
            jspb.Message.bytesAsU8 = function (a) {
                if (null == a || a instanceof Uint8Array) return a;
                if (goog.isString(a)) return goog.crypt.base64.decodeStringToUint8Array(a);
                goog.asserts.fail("Cannot coerce to Uint8Array: " + goog.typeOf(a));
                return null;
            };
            jspb.Message.bytesListAsB64 = function (a) {
                jspb.Message.assertConsistentTypes_(a);
                return !a.length || goog.isString(a[0]) ? a : goog.array.map(a, jspb.Message.bytesAsB64);
            };
            jspb.Message.bytesListAsU8 = function (a) {
                jspb.Message.assertConsistentTypes_(a);
                return !a.length || a[0] instanceof Uint8Array ? a : goog.array.map(a, jspb.Message.bytesAsU8);
            };
            jspb.Message.assertConsistentTypes_ = function (a) {
                if (goog.DEBUG && a && 1 < a.length) {
                    var b = goog.typeOf(a[0]);
                    goog.array.forEach(a, function (a) {
                        goog.typeOf(a) != b && goog.asserts.fail("Inconsistent type in JSPB repeated field array. Got " + goog.typeOf(a) + " expected " + b);
                    });
                }
            };
            jspb.Message.getFieldWithDefault = function (a, b, c) {
                a = jspb.Message.getField(a, b);
                return null == a ? c : a;
            };
            jspb.Message.getFieldProto3 = jspb.Message.getFieldWithDefault;
            jspb.Message.getMapField = function (a, b, c, d) {
                a.wrappers_ || (a.wrappers_ = {});
                if (b in a.wrappers_) return a.wrappers_[b];
                if (!c) return c = jspb.Message.getField(a, b), c || (c = [], jspb.Message.setField(a, b, c)), a.wrappers_[b] = new jspb.Map(c, d);
            };
            jspb.Message.setField = function (a, b, c) {
                b < a.pivot_ ? a.array[jspb.Message.getIndex_(a, b)] = c : (jspb.Message.maybeInitEmptyExtensionObject_(a), a.extensionObject_[b] = c);
            };
            jspb.Message.setProto3IntField = function (a, b, c) {
                jspb.Message.setFieldIgnoringDefault_(a, b, c, 0);
            };
            jspb.Message.setProto3FloatField = function (a, b, c) {
                jspb.Message.setFieldIgnoringDefault_(a, b, c, 0);
            };
            jspb.Message.setProto3BooleanField = function (a, b, c) {
                jspb.Message.setFieldIgnoringDefault_(a, b, c, !1);
            };
            jspb.Message.setProto3StringField = function (a, b, c) {
                jspb.Message.setFieldIgnoringDefault_(a, b, c, "");
            };
            jspb.Message.setProto3StringIntField = function (a, b, c) {
                jspb.Message.setFieldIgnoringDefault_(a, b, c, "");
            };
            jspb.Message.setProto3BytesField = function (a, b, c) {
                jspb.Message.setFieldIgnoringDefault_(a, b, c, "");
            };
            jspb.Message.setProto3EnumField = function (a, b, c) {
                jspb.Message.setFieldIgnoringDefault_(a, b, c, 0);
            };
            jspb.Message.setFieldIgnoringDefault_ = function (a, b, c, d) {
                c != d ? jspb.Message.setField(a, b, c) : a.array[jspb.Message.getIndex_(a, b)] = null;
            };
            jspb.Message.addToRepeatedField = function (a, b, c, d) {
                a = jspb.Message.getRepeatedField(a, b);
                void 0 != d ? a.splice(d, 0, c) : a.push(c);
            };
            jspb.Message.setOneofField = function (a, b, c, d) {
                (c = jspb.Message.computeOneofCase(a, c)) && c !== b && void 0 !== d && (a.wrappers_ && c in a.wrappers_ && (a.wrappers_[c] = void 0), jspb.Message.setField(a, c, void 0));
                jspb.Message.setField(a, b, d);
            };
            jspb.Message.computeOneofCase = function (a, b) {
                var c, d;
                goog.array.forEach(b, function (b) {
                    var f = jspb.Message.getField(a, b);
                    goog.isDefAndNotNull(f) && (c = b, d = f, jspb.Message.setField(a, b, void 0));
                });
                return c ? (jspb.Message.setField(a, c, d), c) : 0;
            };
            jspb.Message.getWrapperField = function (a, b, c, d) {
                a.wrappers_ || (a.wrappers_ = {});
                if (!a.wrappers_[c]) {
                    var e = jspb.Message.getField(a, c);
                    if (d || e) a.wrappers_[c] = new b(e);
                }
                return a.wrappers_[c];
            };
            jspb.Message.getRepeatedWrapperField = function (a, b, c) {
                jspb.Message.wrapRepeatedField_(a, b, c);
                b = a.wrappers_[c];
                b == jspb.Message.EMPTY_LIST_SENTINEL_ && (b = a.wrappers_[c] = []);
                return b;
            };
            jspb.Message.wrapRepeatedField_ = function (a, b, c) {
                a.wrappers_ || (a.wrappers_ = {});
                if (!a.wrappers_[c]) {
                    for (var d = jspb.Message.getRepeatedField(a, c), e = [], f = 0; f < d.length; f++) e[f] = new b(d[f]);
                    a.wrappers_[c] = e;
                }
            };
            jspb.Message.setWrapperField = function (a, b, c) {
                a.wrappers_ || (a.wrappers_ = {});
                var d = c ? c.toArray() : c;
                a.wrappers_[b] = c;
                jspb.Message.setField(a, b, d);
            };
            jspb.Message.setOneofWrapperField = function (a, b, c, d) {
                a.wrappers_ || (a.wrappers_ = {});
                var e = d ? d.toArray() : d;
                a.wrappers_[b] = d;
                jspb.Message.setOneofField(a, b, c, e);
            };
            jspb.Message.setRepeatedWrapperField = function (a, b, c) {
                a.wrappers_ || (a.wrappers_ = {});
                c = c || [];
                for (var d = [], e = 0; e < c.length; e++) d[e] = c[e].toArray();
                a.wrappers_[b] = c;
                jspb.Message.setField(a, b, d);
            };
            jspb.Message.addToRepeatedWrapperField = function (a, b, c, d, e) {
                jspb.Message.wrapRepeatedField_(a, d, b);
                var f = a.wrappers_[b];
                f || (f = a.wrappers_[b] = []);
                c = c ? c : new d;
                a = jspb.Message.getRepeatedField(a, b);
                void 0 != e ? (f.splice(e, 0, c), a.splice(e, 0, c.toArray())) : (f.push(c), a.push(c.toArray()));
                return c;
            };
            jspb.Message.toMap = function (a, b, c, d) {
                for (var e = {}, f = 0; f < a.length; f++) e[b.call(a[f])] = c ? c.call(a[f], d, a[f]) : a[f];
                return e;
            };
            jspb.Message.prototype.syncMapFields_ = function () {
                if (this.wrappers_) for (var a in this.wrappers_) {
                    var b = this.wrappers_[a];
                    if (goog.isArray(b)) for (var c = 0; c < b.length; c++) b[c] && b[c].toArray(); else b && b.toArray();
                }
            };
            jspb.Message.prototype.toArray = function () {
                this.syncMapFields_();
                return this.array;
            };
            jspb.Message.GENERATE_TO_STRING && (jspb.Message.prototype.toString = function () {
                this.syncMapFields_();
                return this.array.toString();
            });
            jspb.Message.prototype.getExtension = function (a) {
                if (this.extensionObject_) {
                    this.wrappers_ || (this.wrappers_ = {});
                    var b = a.fieldIndex;
                    if (a.isRepeated) {
                        if (a.isMessageType()) return this.wrappers_[b] || (this.wrappers_[b] = goog.array.map(this.extensionObject_[b] || [], function (b) {
                            return new a.ctor(b);
                        })), this.wrappers_[b];
                    } else if (a.isMessageType()) return !this.wrappers_[b] && this.extensionObject_[b] && (this.wrappers_[b] = new a.ctor(this.extensionObject_[b])), this.wrappers_[b];
                    return this.extensionObject_[b];
                }
            };
            jspb.Message.prototype.setExtension = function (a, b) {
                this.wrappers_ || (this.wrappers_ = {});
                jspb.Message.maybeInitEmptyExtensionObject_(this);
                var c = a.fieldIndex;
                a.isRepeated ? (b = b || [], a.isMessageType() ? (this.wrappers_[c] = b, this.extensionObject_[c] = goog.array.map(b, function (a) {
                    return a.toArray();
                })) : this.extensionObject_[c] = b) : a.isMessageType() ? (this.wrappers_[c] = b, this.extensionObject_[c] = b ? b.toArray() : b) : this.extensionObject_[c] = b;
                return this;
            };
            jspb.Message.difference = function (a, b) {
                if (!(a instanceof b.constructor)) throw Error("Messages have different types.");
                var c = a.toArray(), d = b.toArray(), e = [], f = 0, g = c.length > d.length ? c.length : d.length;
                a.getJsPbMessageId() && (e[0] = a.getJsPbMessageId(), f = 1);
                for (; f < g; f++) jspb.Message.compareFields(c[f], d[f]) || (e[f] = d[f]);
                return new a.constructor(e);
            };
            jspb.Message.equals = function (a, b) {
                return a == b || !(!a || !b) && a instanceof b.constructor && jspb.Message.compareFields(a.toArray(), b.toArray());
            };
            jspb.Message.compareExtensions = function (a, b) {
                a = a || {};
                b = b || {};
                var c = {}, d;
                for (d in a) c[d] = 0;
                for (d in b) c[d] = 0;
                for (d in c) if (!jspb.Message.compareFields(a[d], b[d])) return !1;
                return !0;
            };
            jspb.Message.compareFields = function (a, b) {
                if (a == b) return !0;
                if (!goog.isObject(a) || !goog.isObject(b) || a.constructor != b.constructor) return !1;
                if (jspb.Message.SUPPORTS_UINT8ARRAY_ && a.constructor === Uint8Array) {
                    if (a.length != b.length) return !1;
                    for (var c = 0; c < a.length; c++) if (a[c] != b[c]) return !1;
                    return !0;
                }
                if (a.constructor === Array) {
                    for (var d = void 0, e = void 0, f = Math.max(a.length, b.length), c = 0; c < f; c++) {
                        var g = a[c], h = b[c];
                        g && g.constructor == Object && (goog.asserts.assert(void 0 === d), goog.asserts.assert(c === a.length - 1),
                        d = g, g = void 0);
                        h && h.constructor == Object && (goog.asserts.assert(void 0 === e), goog.asserts.assert(c === b.length - 1), e = h, h = void 0);
                        if (!jspb.Message.compareFields(g, h)) return !1;
                    }
                    return d || e ? (d = d || {}, e = e || {}, jspb.Message.compareExtensions(d, e)) : !0;
                }
                if (a.constructor === Object) return jspb.Message.compareExtensions(a, b);
                throw Error("Invalid type in JSPB array");
            };
            jspb.Message.prototype.cloneMessage = function () {
                return jspb.Message.cloneMessage(this);
            };
            jspb.Message.prototype.clone = function () {
                return jspb.Message.cloneMessage(this);
            };
            jspb.Message.clone = function (a) {
                return jspb.Message.cloneMessage(a);
            };
            jspb.Message.cloneMessage = function (a) {
                return new a.constructor(jspb.Message.clone_(a.toArray()));
            };
            jspb.Message.copyInto = function (a, b) {
                goog.asserts.assertInstanceof(a, jspb.Message);
                goog.asserts.assertInstanceof(b, jspb.Message);
                goog.asserts.assert(a.constructor == b.constructor, "Copy source and target message should have the same type.");
                for (var c = jspb.Message.clone(a), d = b.toArray(), e = c.toArray(), f = d.length = 0; f < e.length; f++) d[f] = e[f];
                b.wrappers_ = c.wrappers_;
                b.extensionObject_ = c.extensionObject_;
            };
            jspb.Message.clone_ = function (a) {
                var b;
                if (goog.isArray(a)) {
                    for (var c = Array(a.length), d = 0; d < a.length; d++) null != (b = a[d]) && (c[d] = "object" == typeof b ? jspb.Message.clone_(b) : b);
                    return c;
                }
                if (jspb.Message.SUPPORTS_UINT8ARRAY_ && a instanceof Uint8Array) return new Uint8Array(a);
                c = {};
                for (d in a) null != (b = a[d]) && (c[d] = "object" == typeof b ? jspb.Message.clone_(b) : b);
                return c;
            };
            jspb.Message.registerMessageType = function (a, b) {
                jspb.Message.registry_[a] = b;
                b.messageId = a;
            };
            jspb.Message.registry_ = {};
            jspb.Message.messageSetExtensions = {};
            jspb.Message.messageSetExtensionsBinary = {};
            jspb.arith = {};
            jspb.arith.UInt64 = function (a, b) {
                this.lo = a;
                this.hi = b;
            };
            jspb.arith.UInt64.prototype.cmp = function (a) {
                return this.hi < a.hi || this.hi == a.hi && this.lo < a.lo ? -1 : this.hi == a.hi && this.lo == a.lo ? 0 : 1;
            };
            jspb.arith.UInt64.prototype.rightShift = function () {
                return new jspb.arith.UInt64((this.lo >>> 1 | (this.hi & 1) << 31) >>> 0, this.hi >>> 1 >>> 0);
            };
            jspb.arith.UInt64.prototype.leftShift = function () {
                return new jspb.arith.UInt64(this.lo << 1 >>> 0, (this.hi << 1 | this.lo >>> 31) >>> 0);
            };
            jspb.arith.UInt64.prototype.msb = function () {
                return !!(this.hi & 2147483648);
            };
            jspb.arith.UInt64.prototype.lsb = function () {
                return !!(this.lo & 1);
            };
            jspb.arith.UInt64.prototype.zero = function () {
                return 0 == this.lo && 0 == this.hi;
            };
            jspb.arith.UInt64.prototype.add = function (a) {
                return new jspb.arith.UInt64((this.lo + a.lo & 4294967295) >>> 0 >>> 0, ((this.hi + a.hi & 4294967295) >>> 0) + (4294967296 <= this.lo + a.lo ? 1 : 0) >>> 0);
            };
            jspb.arith.UInt64.prototype.sub = function (a) {
                return new jspb.arith.UInt64((this.lo - a.lo & 4294967295) >>> 0 >>> 0, ((this.hi - a.hi & 4294967295) >>> 0) - (0 > this.lo - a.lo ? 1 : 0) >>> 0);
            };
            jspb.arith.UInt64.mul32x32 = function (a, b) {
                for (var c = a & 65535, d = a >>> 16, e = b & 65535, f = b >>> 16, g = c * e + 65536 * (c * f & 65535) + 65536 * (d * e & 65535), c = d * f + (c * f >>> 16) + (d * e >>> 16); 4294967296 <= g;) g -= 4294967296, c += 1;
                return new jspb.arith.UInt64(g >>> 0, c >>> 0);
            };
            jspb.arith.UInt64.prototype.mul = function (a) {
                var b = jspb.arith.UInt64.mul32x32(this.lo, a);
                a = jspb.arith.UInt64.mul32x32(this.hi, a);
                a.hi = a.lo;
                a.lo = 0;
                return b.add(a);
            };
            jspb.arith.UInt64.prototype.div = function (a) {
                if (0 == a) return [];
                var b = new jspb.arith.UInt64(0, 0), c = new jspb.arith.UInt64(this.lo, this.hi);
                a = new jspb.arith.UInt64(a, 0);
                for (var d = new jspb.arith.UInt64(1, 0); !a.msb();) a = a.leftShift(), d = d.leftShift();
                for (; !d.zero();) 0 >= a.cmp(c) && (b = b.add(d), c = c.sub(a)), a = a.rightShift(), d = d.rightShift();
                return [b, c];
            };
            jspb.arith.UInt64.prototype.toString = function () {
                for (var a = "", b = this; !b.zero();) var b = b.div(10), c = b[0], a = b[1].lo + a, b = c;
                "" == a && (a = "0");
                return a;
            };
            jspb.arith.UInt64.fromString = function (a) {
                for (var b = new jspb.arith.UInt64(0, 0), c = new jspb.arith.UInt64(0, 0), d = 0; d < a.length; d++) {
                    if ("0" > a[d] || "9" < a[d]) return null;
                    var e = parseInt(a[d], 10);
                    c.lo = e;
                    b = b.mul(10).add(c);
                }
                return b;
            };
            jspb.arith.UInt64.prototype.clone = function () {
                return new jspb.arith.UInt64(this.lo, this.hi);
            };
            jspb.arith.Int64 = function (a, b) {
                this.lo = a;
                this.hi = b;
            };
            jspb.arith.Int64.prototype.add = function (a) {
                return new jspb.arith.Int64((this.lo + a.lo & 4294967295) >>> 0 >>> 0, ((this.hi + a.hi & 4294967295) >>> 0) + (4294967296 <= this.lo + a.lo ? 1 : 0) >>> 0);
            };
            jspb.arith.Int64.prototype.sub = function (a) {
                return new jspb.arith.Int64((this.lo - a.lo & 4294967295) >>> 0 >>> 0, ((this.hi - a.hi & 4294967295) >>> 0) - (0 > this.lo - a.lo ? 1 : 0) >>> 0);
            };
            jspb.arith.Int64.prototype.clone = function () {
                return new jspb.arith.Int64(this.lo, this.hi);
            };
            jspb.arith.Int64.prototype.toString = function () {
                var a = 0 != (this.hi & 2147483648), b = new jspb.arith.UInt64(this.lo, this.hi);
                a && (b = (new jspb.arith.UInt64(0, 0)).sub(b));
                return (a ? "-" : "") + b.toString();
            };
            jspb.arith.Int64.fromString = function (a) {
                var b = 0 < a.length && "-" == a[0];
                b && (a = a.substring(1));
                a = jspb.arith.UInt64.fromString(a);
                if (null === a) return null;
                b && (a = (new jspb.arith.UInt64(0, 0)).sub(a));
                return new jspb.arith.Int64(a.lo, a.hi);
            };
            jspb.BinaryConstants = {};
            jspb.ConstBinaryMessage = function () {
            };
            jspb.BinaryMessage = function () {
            };
            jspb.BinaryConstants.FieldType = {
                INVALID: -1,
                DOUBLE: 1,
                FLOAT: 2,
                INT64: 3,
                UINT64: 4,
                INT32: 5,
                FIXED64: 6,
                FIXED32: 7,
                BOOL: 8,
                STRING: 9,
                GROUP: 10,
                MESSAGE: 11,
                BYTES: 12,
                UINT32: 13,
                ENUM: 14,
                SFIXED32: 15,
                SFIXED64: 16,
                SINT32: 17,
                SINT64: 18,
                FHASH64: 30,
                VHASH64: 31
            };
            jspb.BinaryConstants.WireType = {
                INVALID: -1,
                VARINT: 0,
                FIXED64: 1,
                DELIMITED: 2,
                START_GROUP: 3,
                END_GROUP: 4,
                FIXED32: 5
            };
            jspb.BinaryConstants.FieldTypeToWireType = function (a) {
                var b = jspb.BinaryConstants.FieldType, c = jspb.BinaryConstants.WireType;
                switch (a) {
                case b.INT32:
                case b.INT64:
                case b.UINT32:
                case b.UINT64:
                case b.SINT32:
                case b.SINT64:
                case b.BOOL:
                case b.ENUM:
                case b.VHASH64:
                    return c.VARINT;
                case b.DOUBLE:
                case b.FIXED64:
                case b.SFIXED64:
                case b.FHASH64:
                    return c.FIXED64;
                case b.STRING:
                case b.MESSAGE:
                case b.BYTES:
                    return c.DELIMITED;
                case b.FLOAT:
                case b.FIXED32:
                case b.SFIXED32:
                    return c.FIXED32;
                default:
                    return c.INVALID;
                }
            };
            jspb.BinaryConstants.INVALID_FIELD_NUMBER = -1;
            jspb.BinaryConstants.FLOAT32_EPS = 1.401298464324817E-45;
            jspb.BinaryConstants.FLOAT32_MIN = 1.1754943508222875E-38;
            jspb.BinaryConstants.FLOAT32_MAX = 3.4028234663852886E38;
            jspb.BinaryConstants.FLOAT64_EPS = 4.9E-324;
            jspb.BinaryConstants.FLOAT64_MIN = 2.2250738585072014E-308;
            jspb.BinaryConstants.FLOAT64_MAX = 1.7976931348623157E308;
            jspb.BinaryConstants.TWO_TO_20 = 1048576;
            jspb.BinaryConstants.TWO_TO_23 = 8388608;
            jspb.BinaryConstants.TWO_TO_31 = 2147483648;
            jspb.BinaryConstants.TWO_TO_32 = 4294967296;
            jspb.BinaryConstants.TWO_TO_52 = 4503599627370496;
            jspb.BinaryConstants.TWO_TO_63 = 0x7fffffffffffffff;
            jspb.BinaryConstants.TWO_TO_64 = 1.8446744073709552E19;
            jspb.BinaryConstants.ZERO_HASH = "\x00\x00\x00\x00\x00\x00\x00\x00";
            jspb.utils = {};
            jspb.utils.split64Low = 0;
            jspb.utils.split64High = 0;
            jspb.utils.splitUint64 = function (a) {
                var b = a >>> 0;
                a = Math.floor((a - b) / jspb.BinaryConstants.TWO_TO_32) >>> 0;
                jspb.utils.split64Low = b;
                jspb.utils.split64High = a;
            };
            jspb.utils.splitInt64 = function (a) {
                var b = 0 > a;
                a = Math.abs(a);
                var c = a >>> 0;
                a = Math.floor((a - c) / jspb.BinaryConstants.TWO_TO_32);
                a >>>= 0;
                b && (a = ~a >>> 0, c = (~c >>> 0) + 1, 4294967295 < c && (c = 0, a++, 4294967295 < a && (a = 0)));
                jspb.utils.split64Low = c;
                jspb.utils.split64High = a;
            };
            jspb.utils.splitZigzag64 = function (a) {
                var b = 0 > a;
                a = 2 * Math.abs(a);
                jspb.utils.splitUint64(a);
                a = jspb.utils.split64Low;
                var c = jspb.utils.split64High;
                b && (0 == a ? 0 == c ? c = a = 4294967295 : (c--, a = 4294967295) : a--);
                jspb.utils.split64Low = a;
                jspb.utils.split64High = c;
            };
            jspb.utils.splitFloat32 = function (a) {
                var b = 0 > a ? 1 : 0;
                a = b ? -a : a;
                var c;
                0 === a ? 0 < 1 / a ? (jspb.utils.split64High = 0, jspb.utils.split64Low = 0) : (jspb.utils.split64High = 0, jspb.utils.split64Low = 2147483648) : isNaN(a) ? (jspb.utils.split64High = 0, jspb.utils.split64Low = 2147483647) : a > jspb.BinaryConstants.FLOAT32_MAX ? (jspb.utils.split64High = 0, jspb.utils.split64Low = (b << 31 | 2139095040) >>> 0) : a < jspb.BinaryConstants.FLOAT32_MIN ? (a = Math.round(a / Math.pow(2, -149)), jspb.utils.split64High = 0, jspb.utils.split64Low = (b << 31 | a) >>> 0) : (c = Math.floor(Math.log(a) /
                    Math.LN2), a *= Math.pow(2, -c), a = Math.round(a * jspb.BinaryConstants.TWO_TO_23) & 8388607, jspb.utils.split64High = 0, jspb.utils.split64Low = (b << 31 | c + 127 << 23 | a) >>> 0);
            };
            jspb.utils.splitFloat64 = function (a) {
                var b = 0 > a ? 1 : 0;
                a = b ? -a : a;
                if (0 === a) jspb.utils.split64High = 0 < 1 / a ? 0 : 2147483648, jspb.utils.split64Low = 0; else if (isNaN(a)) jspb.utils.split64High = 2147483647, jspb.utils.split64Low = 4294967295; else if (a > jspb.BinaryConstants.FLOAT64_MAX) jspb.utils.split64High = (b << 31 | 2146435072) >>> 0, jspb.utils.split64Low = 0; else if (a < jspb.BinaryConstants.FLOAT64_MIN) {
                    var c = a / Math.pow(2, -1074);
                    a = c / jspb.BinaryConstants.TWO_TO_32;
                    jspb.utils.split64High = (b << 31 | a) >>> 0;
                    jspb.utils.split64Low = c >>> 0;
                } else {
                    var d =
                        Math.floor(Math.log(a) / Math.LN2);
                    1024 == d && (d = 1023);
                    c = a * Math.pow(2, -d);
                    a = c * jspb.BinaryConstants.TWO_TO_20 & 1048575;
                    c = c * jspb.BinaryConstants.TWO_TO_52 >>> 0;
                    jspb.utils.split64High = (b << 31 | d + 1023 << 20 | a) >>> 0;
                    jspb.utils.split64Low = c;
                }
            };
            jspb.utils.splitHash64 = function (a) {
                var b = a.charCodeAt(0), c = a.charCodeAt(1), d = a.charCodeAt(2), e = a.charCodeAt(3),
                    f = a.charCodeAt(4), g = a.charCodeAt(5), h = a.charCodeAt(6);
                a = a.charCodeAt(7);
                jspb.utils.split64Low = b + (c << 8) + (d << 16) + (e << 24) >>> 0;
                jspb.utils.split64High = f + (g << 8) + (h << 16) + (a << 24) >>> 0;
            };
            jspb.utils.joinUint64 = function (a, b) {
                return b * jspb.BinaryConstants.TWO_TO_32 + a;
            };
            jspb.utils.joinInt64 = function (a, b) {
                var c = b & 2147483648;
                c && (a = ~a + 1 >>> 0, b = ~b >>> 0, 0 == a && (b = b + 1 >>> 0));
                var d = jspb.utils.joinUint64(a, b);
                return c ? -d : d;
            };
            jspb.utils.joinZigzag64 = function (a, b) {
                var c = a & 1;
                a = (a >>> 1 | b << 31) >>> 0;
                b >>>= 1;
                c && (a = a + 1 >>> 0, 0 == a && (b = b + 1 >>> 0));
                var d = jspb.utils.joinUint64(a, b);
                return c ? -d : d;
            };
            jspb.utils.joinFloat32 = function (a, b) {
                var c = 2 * (a >> 31) + 1, d = a >>> 23 & 255, e = a & 8388607;
                return 255 == d ? e ? NaN : Infinity * c : 0 == d ? c * Math.pow(2, -149) * e : c * Math.pow(2, d - 150) * (e + Math.pow(2, 23));
            };
            jspb.utils.joinFloat64 = function (a, b) {
                var c = 2 * (b >> 31) + 1, d = b >>> 20 & 2047, e = jspb.BinaryConstants.TWO_TO_32 * (b & 1048575) + a;
                return 2047 == d ? e ? NaN : Infinity * c : 0 == d ? c * Math.pow(2, -1074) * e : c * Math.pow(2, d - 1075) * (e + jspb.BinaryConstants.TWO_TO_52);
            };
            jspb.utils.joinHash64 = function (a, b) {
                return String.fromCharCode(a >>> 0 & 255, a >>> 8 & 255, a >>> 16 & 255, a >>> 24 & 255, b >>> 0 & 255, b >>> 8 & 255, b >>> 16 & 255, b >>> 24 & 255);
            };
            jspb.utils.DIGITS = "0123456789abcdef".split("");
            jspb.utils.joinUnsignedDecimalString = function (a, b) {
                function c(a) {
                    for (var b = 1E7, c = 0; 7 > c; c++) {
                        var b = b / 10, d = a / b % 10 >>> 0;
                        if (0 != d || h) h = !0, k += g[d];
                    }
                }

                if (2097151 >= b) return "" + (jspb.BinaryConstants.TWO_TO_32 * b + a);
                var d = (a >>> 24 | b << 8) >>> 0 & 16777215, e = b >> 16 & 65535,
                    f = (a & 16777215) + 6777216 * d + 6710656 * e, d = d + 8147497 * e, e = 2 * e;
                1E7 <= f && (d += Math.floor(f / 1E7), f %= 1E7);
                1E7 <= d && (e += Math.floor(d / 1E7), d %= 1E7);
                var g = jspb.utils.DIGITS, h = !1, k = "";
                (e || h) && c(e);
                (d || h) && c(d);
                (f || h) && c(f);
                return k;
            };
            jspb.utils.joinSignedDecimalString = function (a, b) {
                var c = b & 2147483648;
                c && (a = ~a + 1 >>> 0, b = ~b + (0 == a ? 1 : 0) >>> 0);
                var d = jspb.utils.joinUnsignedDecimalString(a, b);
                return c ? "-" + d : d;
            };
            jspb.utils.hash64ToDecimalString = function (a, b) {
                jspb.utils.splitHash64(a);
                var c = jspb.utils.split64Low, d = jspb.utils.split64High;
                return b ? jspb.utils.joinSignedDecimalString(c, d) : jspb.utils.joinUnsignedDecimalString(c, d);
            };
            jspb.utils.hash64ArrayToDecimalStrings = function (a, b) {
                for (var c = Array(a.length), d = 0; d < a.length; d++) c[d] = jspb.utils.hash64ToDecimalString(a[d], b);
                return c;
            };
            jspb.utils.decimalStringToHash64 = function (a) {
                function b(a, b) {
                    for (var c = 0; 8 > c && (1 !== a || 0 < b); c++) {
                        var d = a * e[c] + b;
                        e[c] = d & 255;
                        b = d >>> 8;
                    }
                }

                function c() {
                    for (var a = 0; 8 > a; a++) e[a] = ~e[a] & 255;
                }

                goog.asserts.assert(0 < a.length);
                var d = !1;
                "-" === a[0] && (d = !0, a = a.slice(1));
                for (var e = [0, 0, 0, 0, 0, 0, 0, 0], f = 0; f < a.length; f++) b(10, jspb.utils.DIGITS.indexOf(a[f]));
                d && (c(), b(1, 1));
                return goog.crypt.byteArrayToString(e);
            };
            jspb.utils.splitDecimalString = function (a) {
                jspb.utils.splitHash64(jspb.utils.decimalStringToHash64(a));
            };
            jspb.utils.hash64ToHexString = function (a) {
                var b = Array(18);
                b[0] = "0";
                b[1] = "x";
                for (var c = 0; 8 > c; c++) {
                    var d = a.charCodeAt(7 - c);
                    b[2 * c + 2] = jspb.utils.DIGITS[d >> 4];
                    b[2 * c + 3] = jspb.utils.DIGITS[d & 15];
                }
                return b.join("");
            };
            jspb.utils.hexStringToHash64 = function (a) {
                a = a.toLowerCase();
                goog.asserts.assert(18 == a.length);
                goog.asserts.assert("0" == a[0]);
                goog.asserts.assert("x" == a[1]);
                for (var b = "", c = 0; 8 > c; c++) var d = jspb.utils.DIGITS.indexOf(a[2 * c + 2]), e = jspb.utils.DIGITS.indexOf(a[2 * c + 3]), b = String.fromCharCode(16 * d + e) + b;
                return b;
            };
            jspb.utils.hash64ToNumber = function (a, b) {
                jspb.utils.splitHash64(a);
                var c = jspb.utils.split64Low, d = jspb.utils.split64High;
                return b ? jspb.utils.joinInt64(c, d) : jspb.utils.joinUint64(c, d);
            };
            jspb.utils.numberToHash64 = function (a) {
                jspb.utils.splitInt64(a);
                return jspb.utils.joinHash64(jspb.utils.split64Low, jspb.utils.split64High);
            };
            jspb.utils.countVarints = function (a, b, c) {
                for (var d = 0, e = b; e < c; e++) d += a[e] >> 7;
                return c - b - d;
            };
            jspb.utils.countVarintFields = function (a, b, c, d) {
                var e = 0;
                d = 8 * d + jspb.BinaryConstants.WireType.VARINT;
                if (128 > d) for (; b < c && a[b++] == d;) for (e++; ;) {
                    var f = a[b++];
                    if (0 == (f & 128)) break;
                } else for (; b < c;) {
                    for (f = d; 128 < f;) {
                        if (a[b] != (f & 127 | 128)) return e;
                        b++;
                        f >>= 7;
                    }
                    if (a[b++] != f) break;
                    for (e++; f = a[b++], 0 != (f & 128);) ;
                }
                return e;
            };
            jspb.utils.countFixedFields_ = function (a, b, c, d, e) {
                var f = 0;
                if (128 > d) for (; b < c && a[b++] == d;) f++, b += e; else for (; b < c;) {
                    for (var g = d; 128 < g;) {
                        if (a[b++] != (g & 127 | 128)) return f;
                        g >>= 7;
                    }
                    if (a[b++] != g) break;
                    f++;
                    b += e;
                }
                return f;
            };
            jspb.utils.countFixed32Fields = function (a, b, c, d) {
                return jspb.utils.countFixedFields_(a, b, c, 8 * d + jspb.BinaryConstants.WireType.FIXED32, 4);
            };
            jspb.utils.countFixed64Fields = function (a, b, c, d) {
                return jspb.utils.countFixedFields_(a, b, c, 8 * d + jspb.BinaryConstants.WireType.FIXED64, 8);
            };
            jspb.utils.countDelimitedFields = function (a, b, c, d) {
                var e = 0;
                for (d = 8 * d + jspb.BinaryConstants.WireType.DELIMITED; b < c;) {
                    for (var f = d; 128 < f;) {
                        if (a[b++] != (f & 127 | 128)) return e;
                        f >>= 7;
                    }
                    if (a[b++] != f) break;
                    e++;
                    for (var g = 0, h = 1; f = a[b++], g += (f & 127) * h, h *= 128, 0 != (f & 128);) ;
                    b += g;
                }
                return e;
            };
            jspb.utils.debugBytesToTextFormat = function (a) {
                var b = "\"";
                if (a) {
                    a = jspb.utils.byteSourceToUint8Array(a);
                    for (var c = 0; c < a.length; c++) b += "\\x", 16 > a[c] && (b += "0"), b += a[c].toString(16);
                }
                return b + "\"";
            };
            jspb.utils.debugScalarToTextFormat = function (a) {
                return goog.isString(a) ? goog.string.quote(a) : a.toString();
            };
            jspb.utils.stringToByteArray = function (a) {
                for (var b = new Uint8Array(a.length), c = 0; c < a.length; c++) {
                    var d = a.charCodeAt(c);
                    if (255 < d) throw Error("Conversion error: string contains codepoint outside of byte range");
                    b[c] = d;
                }
                return b;
            };
            jspb.utils.byteSourceToUint8Array = function (a) {
                if (a.constructor === Uint8Array) return a;
                if (a.constructor === ArrayBuffer || a.constructor === Array) return new Uint8Array(a);
                if (a.constructor === String) return goog.crypt.base64.decodeStringToUint8Array(a);
                goog.asserts.fail("Type not convertible to Uint8Array.");
                return new Uint8Array(0);
            };
            jspb.BinaryEncoder = function () {
                this.buffer_ = [];
            };
            jspb.BinaryEncoder.prototype.length = function () {
                return this.buffer_.length;
            };
            jspb.BinaryEncoder.prototype.end = function () {
                var a = this.buffer_;
                this.buffer_ = [];
                return a;
            };
            jspb.BinaryEncoder.prototype.writeSplitVarint64 = function (a, b) {
                goog.asserts.assert(a == Math.floor(a));
                goog.asserts.assert(b == Math.floor(b));
                goog.asserts.assert(0 <= a && a < jspb.BinaryConstants.TWO_TO_32);
                for (goog.asserts.assert(0 <= b && b < jspb.BinaryConstants.TWO_TO_32); 0 < b || 127 < a;) this.buffer_.push(a & 127 | 128), a = (a >>> 7 | b << 25) >>> 0, b >>>= 7;
                this.buffer_.push(a);
            };
            jspb.BinaryEncoder.prototype.writeSplitFixed64 = function (a, b) {
                goog.asserts.assert(a == Math.floor(a));
                goog.asserts.assert(b == Math.floor(b));
                goog.asserts.assert(0 <= a && a < jspb.BinaryConstants.TWO_TO_32);
                goog.asserts.assert(0 <= b && b < jspb.BinaryConstants.TWO_TO_32);
                this.writeUint32(a);
                this.writeUint32(b);
            };
            jspb.BinaryEncoder.prototype.writeUnsignedVarint32 = function (a) {
                goog.asserts.assert(a == Math.floor(a));
                for (goog.asserts.assert(0 <= a && a < jspb.BinaryConstants.TWO_TO_32); 127 < a;) this.buffer_.push(a & 127 | 128), a >>>= 7;
                this.buffer_.push(a);
            };
            jspb.BinaryEncoder.prototype.writeSignedVarint32 = function (a) {
                goog.asserts.assert(a == Math.floor(a));
                goog.asserts.assert(a >= -jspb.BinaryConstants.TWO_TO_31 && a < jspb.BinaryConstants.TWO_TO_31);
                if (0 <= a) this.writeUnsignedVarint32(a); else {
                    for (var b = 0; 9 > b; b++) this.buffer_.push(a & 127 | 128), a >>= 7;
                    this.buffer_.push(1);
                }
            };
            jspb.BinaryEncoder.prototype.writeUnsignedVarint64 = function (a) {
                goog.asserts.assert(a == Math.floor(a));
                goog.asserts.assert(0 <= a && a < jspb.BinaryConstants.TWO_TO_64);
                jspb.utils.splitInt64(a);
                this.writeSplitVarint64(jspb.utils.split64Low, jspb.utils.split64High);
            };
            jspb.BinaryEncoder.prototype.writeSignedVarint64 = function (a) {
                goog.asserts.assert(a == Math.floor(a));
                goog.asserts.assert(a >= -jspb.BinaryConstants.TWO_TO_63 && a < jspb.BinaryConstants.TWO_TO_63);
                jspb.utils.splitInt64(a);
                this.writeSplitVarint64(jspb.utils.split64Low, jspb.utils.split64High);
            };
            jspb.BinaryEncoder.prototype.writeZigzagVarint32 = function (a) {
                goog.asserts.assert(a == Math.floor(a));
                goog.asserts.assert(a >= -jspb.BinaryConstants.TWO_TO_31 && a < jspb.BinaryConstants.TWO_TO_31);
                this.writeUnsignedVarint32((a << 1 ^ a >> 31) >>> 0);
            };
            jspb.BinaryEncoder.prototype.writeZigzagVarint64 = function (a) {
                goog.asserts.assert(a == Math.floor(a));
                goog.asserts.assert(a >= -jspb.BinaryConstants.TWO_TO_63 && a < jspb.BinaryConstants.TWO_TO_63);
                jspb.utils.splitZigzag64(a);
                this.writeSplitVarint64(jspb.utils.split64Low, jspb.utils.split64High);
            };
            jspb.BinaryEncoder.prototype.writeZigzagVarint64String = function (a) {
                this.writeZigzagVarint64(parseInt(a, 10));
            };
            jspb.BinaryEncoder.prototype.writeUint8 = function (a) {
                goog.asserts.assert(a == Math.floor(a));
                goog.asserts.assert(0 <= a && 256 > a);
                this.buffer_.push(a >>> 0 & 255);
            };
            jspb.BinaryEncoder.prototype.writeUint16 = function (a) {
                goog.asserts.assert(a == Math.floor(a));
                goog.asserts.assert(0 <= a && 65536 > a);
                this.buffer_.push(a >>> 0 & 255);
                this.buffer_.push(a >>> 8 & 255);
            };
            jspb.BinaryEncoder.prototype.writeUint32 = function (a) {
                goog.asserts.assert(a == Math.floor(a));
                goog.asserts.assert(0 <= a && a < jspb.BinaryConstants.TWO_TO_32);
                this.buffer_.push(a >>> 0 & 255);
                this.buffer_.push(a >>> 8 & 255);
                this.buffer_.push(a >>> 16 & 255);
                this.buffer_.push(a >>> 24 & 255);
            };
            jspb.BinaryEncoder.prototype.writeUint64 = function (a) {
                goog.asserts.assert(a == Math.floor(a));
                goog.asserts.assert(0 <= a && a < jspb.BinaryConstants.TWO_TO_64);
                jspb.utils.splitUint64(a);
                this.writeUint32(jspb.utils.split64Low);
                this.writeUint32(jspb.utils.split64High);
            };
            jspb.BinaryEncoder.prototype.writeInt8 = function (a) {
                goog.asserts.assert(a == Math.floor(a));
                goog.asserts.assert(-128 <= a && 128 > a);
                this.buffer_.push(a >>> 0 & 255);
            };
            jspb.BinaryEncoder.prototype.writeInt16 = function (a) {
                goog.asserts.assert(a == Math.floor(a));
                goog.asserts.assert(-32768 <= a && 32768 > a);
                this.buffer_.push(a >>> 0 & 255);
                this.buffer_.push(a >>> 8 & 255);
            };
            jspb.BinaryEncoder.prototype.writeInt32 = function (a) {
                goog.asserts.assert(a == Math.floor(a));
                goog.asserts.assert(a >= -jspb.BinaryConstants.TWO_TO_31 && a < jspb.BinaryConstants.TWO_TO_31);
                this.buffer_.push(a >>> 0 & 255);
                this.buffer_.push(a >>> 8 & 255);
                this.buffer_.push(a >>> 16 & 255);
                this.buffer_.push(a >>> 24 & 255);
            };
            jspb.BinaryEncoder.prototype.writeInt64 = function (a) {
                goog.asserts.assert(a == Math.floor(a));
                goog.asserts.assert(a >= -jspb.BinaryConstants.TWO_TO_63 && a < jspb.BinaryConstants.TWO_TO_63);
                jspb.utils.splitInt64(a);
                this.writeSplitFixed64(jspb.utils.split64Low, jspb.utils.split64High);
            };
            jspb.BinaryEncoder.prototype.writeInt64String = function (a) {
                goog.asserts.assert(a == Math.floor(a));
                goog.asserts.assert(+a >= -jspb.BinaryConstants.TWO_TO_63 && +a < jspb.BinaryConstants.TWO_TO_63);
                jspb.utils.splitHash64(jspb.utils.decimalStringToHash64(a));
                this.writeSplitFixed64(jspb.utils.split64Low, jspb.utils.split64High);
            };
            jspb.BinaryEncoder.prototype.writeFloat = function (a) {
                goog.asserts.assert(a >= -jspb.BinaryConstants.FLOAT32_MAX && a <= jspb.BinaryConstants.FLOAT32_MAX);
                jspb.utils.splitFloat32(a);
                this.writeUint32(jspb.utils.split64Low);
            };
            jspb.BinaryEncoder.prototype.writeDouble = function (a) {
                goog.asserts.assert(a >= -jspb.BinaryConstants.FLOAT64_MAX && a <= jspb.BinaryConstants.FLOAT64_MAX);
                jspb.utils.splitFloat64(a);
                this.writeUint32(jspb.utils.split64Low);
                this.writeUint32(jspb.utils.split64High);
            };
            jspb.BinaryEncoder.prototype.writeBool = function (a) {
                goog.asserts.assert(goog.isBoolean(a) || goog.isNumber(a));
                this.buffer_.push(a ? 1 : 0);
            };
            jspb.BinaryEncoder.prototype.writeEnum = function (a) {
                goog.asserts.assert(a == Math.floor(a));
                goog.asserts.assert(a >= -jspb.BinaryConstants.TWO_TO_31 && a < jspb.BinaryConstants.TWO_TO_31);
                this.writeSignedVarint32(a);
            };
            jspb.BinaryEncoder.prototype.writeBytes = function (a) {
                this.buffer_.push.apply(this.buffer_, a);
            };
            jspb.BinaryEncoder.prototype.writeVarintHash64 = function (a) {
                jspb.utils.splitHash64(a);
                this.writeSplitVarint64(jspb.utils.split64Low, jspb.utils.split64High);
            };
            jspb.BinaryEncoder.prototype.writeFixedHash64 = function (a) {
                jspb.utils.splitHash64(a);
                this.writeUint32(jspb.utils.split64Low);
                this.writeUint32(jspb.utils.split64High);
            };
            jspb.BinaryEncoder.prototype.writeString = function (a) {
                for (var b = this.buffer_.length, c = 0; c < a.length; c++) {
                    var d = a.charCodeAt(c);
                    if (128 > d) this.buffer_.push(d); else if (2048 > d) this.buffer_.push(d >> 6 | 192), this.buffer_.push(d & 63 | 128); else if (65536 > d) if (55296 <= d && 56319 >= d && c + 1 < a.length) {
                        var e = a.charCodeAt(c + 1);
                        56320 <= e && 57343 >= e && (d = 1024 * (d - 55296) + e - 56320 + 65536, this.buffer_.push(d >> 18 | 240), this.buffer_.push(d >> 12 & 63 | 128), this.buffer_.push(d >> 6 & 63 | 128), this.buffer_.push(d & 63 | 128), c++);
                    } else this.buffer_.push(d >>
                        12 | 224), this.buffer_.push(d >> 6 & 63 | 128), this.buffer_.push(d & 63 | 128);
                }
                return this.buffer_.length - b;
            };
            jspb.BinaryWriter = function () {
                this.blocks_ = [];
                this.totalLength_ = 0;
                this.encoder_ = new jspb.BinaryEncoder;
                this.bookmarks_ = [];
            };
            jspb.BinaryWriter.prototype.appendUint8Array_ = function (a) {
                var b = this.encoder_.end();
                this.blocks_.push(b);
                this.blocks_.push(a);
                this.totalLength_ += b.length + a.length;
            };
            jspb.BinaryWriter.prototype.beginDelimited_ = function (a) {
                this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.DELIMITED);
                a = this.encoder_.end();
                this.blocks_.push(a);
                this.totalLength_ += a.length;
                a.push(this.totalLength_);
                return a;
            };
            jspb.BinaryWriter.prototype.endDelimited_ = function (a) {
                var b = a.pop(), b = this.totalLength_ + this.encoder_.length() - b;
                for (goog.asserts.assert(0 <= b); 127 < b;) a.push(b & 127 | 128), b >>>= 7, this.totalLength_++;
                a.push(b);
                this.totalLength_++;
            };
            jspb.BinaryWriter.prototype.writeSerializedMessage = function (a, b, c) {
                this.appendUint8Array_(a.subarray(b, c));
            };
            jspb.BinaryWriter.prototype.maybeWriteSerializedMessage = function (a, b, c) {
                null != a && null != b && null != c && this.writeSerializedMessage(a, b, c);
            };
            jspb.BinaryWriter.prototype.reset = function () {
                this.blocks_ = [];
                this.encoder_.end();
                this.totalLength_ = 0;
                this.bookmarks_ = [];
            };
            jspb.BinaryWriter.prototype.getResultBuffer = function () {
                goog.asserts.assert(0 == this.bookmarks_.length);
                for (var a = new Uint8Array(this.totalLength_ + this.encoder_.length()), b = this.blocks_, c = b.length, d = 0, e = 0; e < c; e++) {
                    var f = b[e];
                    a.set(f, d);
                    d += f.length;
                }
                b = this.encoder_.end();
                a.set(b, d);
                d += b.length;
                goog.asserts.assert(d == a.length);
                this.blocks_ = [a];
                return a;
            };
            jspb.BinaryWriter.prototype.getResultBase64String = function () {
                return goog.crypt.base64.encodeByteArray(this.getResultBuffer());
            };
            jspb.BinaryWriter.prototype.beginSubMessage = function (a) {
                this.bookmarks_.push(this.beginDelimited_(a));
            };
            jspb.BinaryWriter.prototype.endSubMessage = function () {
                goog.asserts.assert(0 <= this.bookmarks_.length);
                this.endDelimited_(this.bookmarks_.pop());
            };
            jspb.BinaryWriter.prototype.writeFieldHeader_ = function (a, b) {
                goog.asserts.assert(1 <= a && a == Math.floor(a));
                this.encoder_.writeUnsignedVarint32(8 * a + b);
            };
            jspb.BinaryWriter.prototype.writeAny = function (a, b, c) {
                var d = jspb.BinaryConstants.FieldType;
                switch (a) {
                case d.DOUBLE:
                    this.writeDouble(b, c);
                    break;
                case d.FLOAT:
                    this.writeFloat(b, c);
                    break;
                case d.INT64:
                    this.writeInt64(b, c);
                    break;
                case d.UINT64:
                    this.writeUint64(b, c);
                    break;
                case d.INT32:
                    this.writeInt32(b, c);
                    break;
                case d.FIXED64:
                    this.writeFixed64(b, c);
                    break;
                case d.FIXED32:
                    this.writeFixed32(b, c);
                    break;
                case d.BOOL:
                    this.writeBool(b, c);
                    break;
                case d.STRING:
                    this.writeString(b, c);
                    break;
                case d.GROUP:
                    goog.asserts.fail("Group field type not supported in writeAny()");
                    break;
                case d.MESSAGE:
                    goog.asserts.fail("Message field type not supported in writeAny()");
                    break;
                case d.BYTES:
                    this.writeBytes(b, c);
                    break;
                case d.UINT32:
                    this.writeUint32(b, c);
                    break;
                case d.ENUM:
                    this.writeEnum(b, c);
                    break;
                case d.SFIXED32:
                    this.writeSfixed32(b, c);
                    break;
                case d.SFIXED64:
                    this.writeSfixed64(b, c);
                    break;
                case d.SINT32:
                    this.writeSint32(b, c);
                    break;
                case d.SINT64:
                    this.writeSint64(b, c);
                    break;
                case d.FHASH64:
                    this.writeFixedHash64(b, c);
                    break;
                case d.VHASH64:
                    this.writeVarintHash64(b, c);
                    break;
                default:
                    goog.asserts.fail("Invalid field type in writeAny()");
                }
            };
            jspb.BinaryWriter.prototype.writeUnsignedVarint32_ = function (a, b) {
                null != b && (this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeUnsignedVarint32(b));
            };
            jspb.BinaryWriter.prototype.writeSignedVarint32_ = function (a, b) {
                null != b && (this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeSignedVarint32(b));
            };
            jspb.BinaryWriter.prototype.writeUnsignedVarint64_ = function (a, b) {
                null != b && (this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeUnsignedVarint64(b));
            };
            jspb.BinaryWriter.prototype.writeSignedVarint64_ = function (a, b) {
                null != b && (this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeSignedVarint64(b));
            };
            jspb.BinaryWriter.prototype.writeZigzagVarint32_ = function (a, b) {
                null != b && (this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeZigzagVarint32(b));
            };
            jspb.BinaryWriter.prototype.writeZigzagVarint64_ = function (a, b) {
                null != b && (this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeZigzagVarint64(b));
            };
            jspb.BinaryWriter.prototype.writeZigzagVarint64String_ = function (a, b) {
                null != b && (this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeZigzagVarint64String(b));
            };
            jspb.BinaryWriter.prototype.writeInt32 = function (a, b) {
                null != b && (goog.asserts.assert(b >= -jspb.BinaryConstants.TWO_TO_31 && b < jspb.BinaryConstants.TWO_TO_31), this.writeSignedVarint32_(a, b));
            };
            jspb.BinaryWriter.prototype.writeInt32String = function (a, b) {
                if (null != b) {
                    var c = parseInt(b, 10);
                    goog.asserts.assert(c >= -jspb.BinaryConstants.TWO_TO_31 && c < jspb.BinaryConstants.TWO_TO_31);
                    this.writeSignedVarint32_(a, c);
                }
            };
            jspb.BinaryWriter.prototype.writeInt64 = function (a, b) {
                null != b && (goog.asserts.assert(b >= -jspb.BinaryConstants.TWO_TO_63 && b < jspb.BinaryConstants.TWO_TO_63), this.writeSignedVarint64_(a, b));
            };
            jspb.BinaryWriter.prototype.writeInt64String = function (a, b) {
                if (null != b) {
                    var c = jspb.arith.Int64.fromString(b);
                    this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.VARINT);
                    this.encoder_.writeSplitVarint64(c.lo, c.hi);
                }
            };
            jspb.BinaryWriter.prototype.writeUint32 = function (a, b) {
                null != b && (goog.asserts.assert(0 <= b && b < jspb.BinaryConstants.TWO_TO_32), this.writeUnsignedVarint32_(a, b));
            };
            jspb.BinaryWriter.prototype.writeUint32String = function (a, b) {
                if (null != b) {
                    var c = parseInt(b, 10);
                    goog.asserts.assert(0 <= c && c < jspb.BinaryConstants.TWO_TO_32);
                    this.writeUnsignedVarint32_(a, c);
                }
            };
            jspb.BinaryWriter.prototype.writeUint64 = function (a, b) {
                null != b && (goog.asserts.assert(0 <= b && b < jspb.BinaryConstants.TWO_TO_64), this.writeUnsignedVarint64_(a, b));
            };
            jspb.BinaryWriter.prototype.writeUint64String = function (a, b) {
                if (null != b) {
                    var c = jspb.arith.UInt64.fromString(b);
                    this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.VARINT);
                    this.encoder_.writeSplitVarint64(c.lo, c.hi);
                }
            };
            jspb.BinaryWriter.prototype.writeSint32 = function (a, b) {
                null != b && (goog.asserts.assert(b >= -jspb.BinaryConstants.TWO_TO_31 && b < jspb.BinaryConstants.TWO_TO_31), this.writeZigzagVarint32_(a, b));
            };
            jspb.BinaryWriter.prototype.writeSint64 = function (a, b) {
                null != b && (goog.asserts.assert(b >= -jspb.BinaryConstants.TWO_TO_63 && b < jspb.BinaryConstants.TWO_TO_63), this.writeZigzagVarint64_(a, b));
            };
            jspb.BinaryWriter.prototype.writeSint64String = function (a, b) {
                null != b && (goog.asserts.assert(+b >= -jspb.BinaryConstants.TWO_TO_63 && +b < jspb.BinaryConstants.TWO_TO_63), this.writeZigzagVarint64String_(a, b));
            };
            jspb.BinaryWriter.prototype.writeFixed32 = function (a, b) {
                null != b && (goog.asserts.assert(0 <= b && b < jspb.BinaryConstants.TWO_TO_32), this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.FIXED32), this.encoder_.writeUint32(b));
            };
            jspb.BinaryWriter.prototype.writeFixed64 = function (a, b) {
                null != b && (goog.asserts.assert(0 <= b && b < jspb.BinaryConstants.TWO_TO_64), this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.FIXED64), this.encoder_.writeUint64(b));
            };
            jspb.BinaryWriter.prototype.writeFixed64String = function (a, b) {
                if (null != b) {
                    var c = jspb.arith.UInt64.fromString(b);
                    this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.FIXED64);
                    this.encoder_.writeSplitFixed64(c.lo, c.hi);
                }
            };
            jspb.BinaryWriter.prototype.writeSfixed32 = function (a, b) {
                null != b && (goog.asserts.assert(b >= -jspb.BinaryConstants.TWO_TO_31 && b < jspb.BinaryConstants.TWO_TO_31), this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.FIXED32), this.encoder_.writeInt32(b));
            };
            jspb.BinaryWriter.prototype.writeSfixed64 = function (a, b) {
                null != b && (goog.asserts.assert(b >= -jspb.BinaryConstants.TWO_TO_63 && b < jspb.BinaryConstants.TWO_TO_63), this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.FIXED64), this.encoder_.writeInt64(b));
            };
            jspb.BinaryWriter.prototype.writeSfixed64String = function (a, b) {
                if (null != b) {
                    var c = jspb.arith.Int64.fromString(b);
                    this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.FIXED64);
                    this.encoder_.writeSplitFixed64(c.lo, c.hi);
                }
            };
            jspb.BinaryWriter.prototype.writeFloat = function (a, b) {
                null != b && (this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.FIXED32), this.encoder_.writeFloat(b));
            };
            jspb.BinaryWriter.prototype.writeDouble = function (a, b) {
                null != b && (this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.FIXED64), this.encoder_.writeDouble(b));
            };
            jspb.BinaryWriter.prototype.writeBool = function (a, b) {
                null != b && (goog.asserts.assert(goog.isBoolean(b) || goog.isNumber(b)), this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeBool(b));
            };
            jspb.BinaryWriter.prototype.writeEnum = function (a, b) {
                null != b && (goog.asserts.assert(b >= -jspb.BinaryConstants.TWO_TO_31 && b < jspb.BinaryConstants.TWO_TO_31), this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeSignedVarint32(b));
            };
            jspb.BinaryWriter.prototype.writeString = function (a, b) {
                if (null != b) {
                    var c = this.beginDelimited_(a);
                    this.encoder_.writeString(b);
                    this.endDelimited_(c);
                }
            };
            jspb.BinaryWriter.prototype.writeBytes = function (a, b) {
                if (null != b) {
                    var c = jspb.utils.byteSourceToUint8Array(b);
                    this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.DELIMITED);
                    this.encoder_.writeUnsignedVarint32(c.length);
                    this.appendUint8Array_(c);
                }
            };
            jspb.BinaryWriter.prototype.writeMessage = function (a, b, c) {
                null != b && (a = this.beginDelimited_(a), c(b, this), this.endDelimited_(a));
            };
            jspb.BinaryWriter.prototype.writeGroup = function (a, b, c) {
                null != b && (this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.START_GROUP), c(b, this), this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.END_GROUP));
            };
            jspb.BinaryWriter.prototype.writeFixedHash64 = function (a, b) {
                null != b && (goog.asserts.assert(8 == b.length), this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.FIXED64), this.encoder_.writeFixedHash64(b));
            };
            jspb.BinaryWriter.prototype.writeVarintHash64 = function (a, b) {
                null != b && (goog.asserts.assert(8 == b.length), this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeVarintHash64(b));
            };
            jspb.BinaryWriter.prototype.writeRepeatedInt32 = function (a, b) {
                if (null != b) for (var c = 0; c < b.length; c++) this.writeSignedVarint32_(a, b[c]);
            };
            jspb.BinaryWriter.prototype.writeRepeatedInt32String = function (a, b) {
                if (null != b) for (var c = 0; c < b.length; c++) this.writeInt32String(a, b[c]);
            };
            jspb.BinaryWriter.prototype.writeRepeatedInt64 = function (a, b) {
                if (null != b) for (var c = 0; c < b.length; c++) this.writeSignedVarint64_(a, b[c]);
            };
            jspb.BinaryWriter.prototype.writeRepeatedInt64String = function (a, b) {
                if (null != b) for (var c = 0; c < b.length; c++) this.writeInt64String(a, b[c]);
            };
            jspb.BinaryWriter.prototype.writeRepeatedUint32 = function (a, b) {
                if (null != b) for (var c = 0; c < b.length; c++) this.writeUnsignedVarint32_(a, b[c]);
            };
            jspb.BinaryWriter.prototype.writeRepeatedUint32String = function (a, b) {
                if (null != b) for (var c = 0; c < b.length; c++) this.writeUint32String(a, b[c]);
            };
            jspb.BinaryWriter.prototype.writeRepeatedUint64 = function (a, b) {
                if (null != b) for (var c = 0; c < b.length; c++) this.writeUnsignedVarint64_(a, b[c]);
            };
            jspb.BinaryWriter.prototype.writeRepeatedUint64String = function (a, b) {
                if (null != b) for (var c = 0; c < b.length; c++) this.writeUint64String(a, b[c]);
            };
            jspb.BinaryWriter.prototype.writeRepeatedSint32 = function (a, b) {
                if (null != b) for (var c = 0; c < b.length; c++) this.writeZigzagVarint32_(a, b[c]);
            };
            jspb.BinaryWriter.prototype.writeRepeatedSint64 = function (a, b) {
                if (null != b) for (var c = 0; c < b.length; c++) this.writeZigzagVarint64_(a, b[c]);
            };
            jspb.BinaryWriter.prototype.writeRepeatedSint64String = function (a, b) {
                if (null != b) for (var c = 0; c < b.length; c++) this.writeZigzagVarint64String_(a, b[c]);
            };
            jspb.BinaryWriter.prototype.writeRepeatedFixed32 = function (a, b) {
                if (null != b) for (var c = 0; c < b.length; c++) this.writeFixed32(a, b[c]);
            };
            jspb.BinaryWriter.prototype.writeRepeatedFixed64 = function (a, b) {
                if (null != b) for (var c = 0; c < b.length; c++) this.writeFixed64(a, b[c]);
            };
            jspb.BinaryWriter.prototype.writeRepeatedFixed64String = function (a, b) {
                if (null != b) for (var c = 0; c < b.length; c++) this.writeFixed64String(a, b[c]);
            };
            jspb.BinaryWriter.prototype.writeRepeatedSfixed32 = function (a, b) {
                if (null != b) for (var c = 0; c < b.length; c++) this.writeSfixed32(a, b[c]);
            };
            jspb.BinaryWriter.prototype.writeRepeatedSfixed64 = function (a, b) {
                if (null != b) for (var c = 0; c < b.length; c++) this.writeSfixed64(a, b[c]);
            };
            jspb.BinaryWriter.prototype.writeRepeatedSfixed64String = function (a, b) {
                if (null != b) for (var c = 0; c < b.length; c++) this.writeSfixed64String(a, b[c]);
            };
            jspb.BinaryWriter.prototype.writeRepeatedFloat = function (a, b) {
                if (null != b) for (var c = 0; c < b.length; c++) this.writeFloat(a, b[c]);
            };
            jspb.BinaryWriter.prototype.writeRepeatedDouble = function (a, b) {
                if (null != b) for (var c = 0; c < b.length; c++) this.writeDouble(a, b[c]);
            };
            jspb.BinaryWriter.prototype.writeRepeatedBool = function (a, b) {
                if (null != b) for (var c = 0; c < b.length; c++) this.writeBool(a, b[c]);
            };
            jspb.BinaryWriter.prototype.writeRepeatedEnum = function (a, b) {
                if (null != b) for (var c = 0; c < b.length; c++) this.writeEnum(a, b[c]);
            };
            jspb.BinaryWriter.prototype.writeRepeatedString = function (a, b) {
                if (null != b) for (var c = 0; c < b.length; c++) this.writeString(a, b[c]);
            };
            jspb.BinaryWriter.prototype.writeRepeatedBytes = function (a, b) {
                if (null != b) for (var c = 0; c < b.length; c++) this.writeBytes(a, b[c]);
            };
            jspb.BinaryWriter.prototype.writeRepeatedMessage = function (a, b, c) {
                if (null != b) for (var d = 0; d < b.length; d++) {
                    var e = this.beginDelimited_(a);
                    c(b[d], this);
                    this.endDelimited_(e);
                }
            };
            jspb.BinaryWriter.prototype.writeRepeatedGroup = function (a, b, c) {
                if (null != b) for (var d = 0; d < b.length; d++) this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.START_GROUP), c(b[d], this), this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.END_GROUP);
            };
            jspb.BinaryWriter.prototype.writeRepeatedFixedHash64 = function (a, b) {
                if (null != b) for (var c = 0; c < b.length; c++) this.writeFixedHash64(a, b[c]);
            };
            jspb.BinaryWriter.prototype.writeRepeatedVarintHash64 = function (a, b) {
                if (null != b) for (var c = 0; c < b.length; c++) this.writeVarintHash64(a, b[c]);
            };
            jspb.BinaryWriter.prototype.writePackedInt32 = function (a, b) {
                if (null != b && b.length) {
                    for (var c = this.beginDelimited_(a), d = 0; d < b.length; d++) this.encoder_.writeSignedVarint32(b[d]);
                    this.endDelimited_(c);
                }
            };
            jspb.BinaryWriter.prototype.writePackedInt32String = function (a, b) {
                if (null != b && b.length) {
                    for (var c = this.beginDelimited_(a), d = 0; d < b.length; d++) this.encoder_.writeSignedVarint32(parseInt(b[d], 10));
                    this.endDelimited_(c);
                }
            };
            jspb.BinaryWriter.prototype.writePackedInt64 = function (a, b) {
                if (null != b && b.length) {
                    for (var c = this.beginDelimited_(a), d = 0; d < b.length; d++) this.encoder_.writeSignedVarint64(b[d]);
                    this.endDelimited_(c);
                }
            };
            jspb.BinaryWriter.prototype.writePackedInt64String = function (a, b) {
                if (null != b && b.length) {
                    for (var c = this.beginDelimited_(a), d = 0; d < b.length; d++) {
                        var e = jspb.arith.Int64.fromString(b[d]);
                        this.encoder_.writeSplitVarint64(e.lo, e.hi);
                    }
                    this.endDelimited_(c);
                }
            };
            jspb.BinaryWriter.prototype.writePackedUint32 = function (a, b) {
                if (null != b && b.length) {
                    for (var c = this.beginDelimited_(a), d = 0; d < b.length; d++) this.encoder_.writeUnsignedVarint32(b[d]);
                    this.endDelimited_(c);
                }
            };
            jspb.BinaryWriter.prototype.writePackedUint32String = function (a, b) {
                if (null != b && b.length) {
                    for (var c = this.beginDelimited_(a), d = 0; d < b.length; d++) this.encoder_.writeUnsignedVarint32(parseInt(b[d], 10));
                    this.endDelimited_(c);
                }
            };
            jspb.BinaryWriter.prototype.writePackedUint64 = function (a, b) {
                if (null != b && b.length) {
                    for (var c = this.beginDelimited_(a), d = 0; d < b.length; d++) this.encoder_.writeUnsignedVarint64(b[d]);
                    this.endDelimited_(c);
                }
            };
            jspb.BinaryWriter.prototype.writePackedUint64String = function (a, b) {
                if (null != b && b.length) {
                    for (var c = this.beginDelimited_(a), d = 0; d < b.length; d++) {
                        var e = jspb.arith.UInt64.fromString(b[d]);
                        this.encoder_.writeSplitVarint64(e.lo, e.hi);
                    }
                    this.endDelimited_(c);
                }
            };
            jspb.BinaryWriter.prototype.writePackedSint32 = function (a, b) {
                if (null != b && b.length) {
                    for (var c = this.beginDelimited_(a), d = 0; d < b.length; d++) this.encoder_.writeZigzagVarint32(b[d]);
                    this.endDelimited_(c);
                }
            };
            jspb.BinaryWriter.prototype.writePackedSint64 = function (a, b) {
                if (null != b && b.length) {
                    for (var c = this.beginDelimited_(a), d = 0; d < b.length; d++) this.encoder_.writeZigzagVarint64(b[d]);
                    this.endDelimited_(c);
                }
            };
            jspb.BinaryWriter.prototype.writePackedSint64String = function (a, b) {
                if (null != b && b.length) {
                    for (var c = this.beginDelimited_(a), d = 0; d < b.length; d++) this.encoder_.writeZigzagVarint64(parseInt(b[d], 10));
                    this.endDelimited_(c);
                }
            };
            jspb.BinaryWriter.prototype.writePackedFixed32 = function (a, b) {
                if (null != b && b.length) {
                    this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.DELIMITED);
                    this.encoder_.writeUnsignedVarint32(4 * b.length);
                    for (var c = 0; c < b.length; c++) this.encoder_.writeUint32(b[c]);
                }
            };
            jspb.BinaryWriter.prototype.writePackedFixed64 = function (a, b) {
                if (null != b && b.length) {
                    this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.DELIMITED);
                    this.encoder_.writeUnsignedVarint32(8 * b.length);
                    for (var c = 0; c < b.length; c++) this.encoder_.writeUint64(b[c]);
                }
            };
            jspb.BinaryWriter.prototype.writePackedFixed64String = function (a, b) {
                if (null != b && b.length) {
                    this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.DELIMITED);
                    this.encoder_.writeUnsignedVarint32(8 * b.length);
                    for (var c = 0; c < b.length; c++) {
                        var d = jspb.arith.UInt64.fromString(b[c]);
                        this.encoder_.writeSplitFixed64(d.lo, d.hi);
                    }
                }
            };
            jspb.BinaryWriter.prototype.writePackedSfixed32 = function (a, b) {
                if (null != b && b.length) {
                    this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.DELIMITED);
                    this.encoder_.writeUnsignedVarint32(4 * b.length);
                    for (var c = 0; c < b.length; c++) this.encoder_.writeInt32(b[c]);
                }
            };
            jspb.BinaryWriter.prototype.writePackedSfixed64 = function (a, b) {
                if (null != b && b.length) {
                    this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.DELIMITED);
                    this.encoder_.writeUnsignedVarint32(8 * b.length);
                    for (var c = 0; c < b.length; c++) this.encoder_.writeInt64(b[c]);
                }
            };
            jspb.BinaryWriter.prototype.writePackedSfixed64String = function (a, b) {
                if (null != b && b.length) {
                    this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.DELIMITED);
                    this.encoder_.writeUnsignedVarint32(8 * b.length);
                    for (var c = 0; c < b.length; c++) this.encoder_.writeInt64String(b[c]);
                }
            };
            jspb.BinaryWriter.prototype.writePackedFloat = function (a, b) {
                if (null != b && b.length) {
                    this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.DELIMITED);
                    this.encoder_.writeUnsignedVarint32(4 * b.length);
                    for (var c = 0; c < b.length; c++) this.encoder_.writeFloat(b[c]);
                }
            };
            jspb.BinaryWriter.prototype.writePackedDouble = function (a, b) {
                if (null != b && b.length) {
                    this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.DELIMITED);
                    this.encoder_.writeUnsignedVarint32(8 * b.length);
                    for (var c = 0; c < b.length; c++) this.encoder_.writeDouble(b[c]);
                }
            };
            jspb.BinaryWriter.prototype.writePackedBool = function (a, b) {
                if (null != b && b.length) {
                    this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.DELIMITED);
                    this.encoder_.writeUnsignedVarint32(b.length);
                    for (var c = 0; c < b.length; c++) this.encoder_.writeBool(b[c]);
                }
            };
            jspb.BinaryWriter.prototype.writePackedEnum = function (a, b) {
                if (null != b && b.length) {
                    for (var c = this.beginDelimited_(a), d = 0; d < b.length; d++) this.encoder_.writeEnum(b[d]);
                    this.endDelimited_(c);
                }
            };
            jspb.BinaryWriter.prototype.writePackedFixedHash64 = function (a, b) {
                if (null != b && b.length) {
                    this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.DELIMITED);
                    this.encoder_.writeUnsignedVarint32(8 * b.length);
                    for (var c = 0; c < b.length; c++) this.encoder_.writeFixedHash64(b[c]);
                }
            };
            jspb.BinaryWriter.prototype.writePackedVarintHash64 = function (a, b) {
                if (null != b && b.length) {
                    for (var c = this.beginDelimited_(a), d = 0; d < b.length; d++) this.encoder_.writeVarintHash64(b[d]);
                    this.endDelimited_(c);
                }
            };
            jspb.BinaryIterator = function (a, b, c) {
                this.elements_ = this.nextMethod_ = this.decoder_ = null;
                this.cursor_ = 0;
                this.nextValue_ = null;
                this.atEnd_ = !0;
                this.init_(a, b, c);
            };
            jspb.BinaryIterator.prototype.init_ = function (a, b, c) {
                a && b && (this.decoder_ = a, this.nextMethod_ = b);
                this.elements_ = c || null;
                this.cursor_ = 0;
                this.nextValue_ = null;
                this.atEnd_ = !this.decoder_ && !this.elements_;
                this.next();
            };
            jspb.BinaryIterator.instanceCache_ = [];
            jspb.BinaryIterator.alloc = function (a, b, c) {
                if (jspb.BinaryIterator.instanceCache_.length) {
                    var d = jspb.BinaryIterator.instanceCache_.pop();
                    d.init_(a, b, c);
                    return d;
                }
                return new jspb.BinaryIterator(a, b, c);
            };
            jspb.BinaryIterator.prototype.free = function () {
                this.clear();
                100 > jspb.BinaryIterator.instanceCache_.length && jspb.BinaryIterator.instanceCache_.push(this);
            };
            jspb.BinaryIterator.prototype.clear = function () {
                this.decoder_ && this.decoder_.free();
                this.elements_ = this.nextMethod_ = this.decoder_ = null;
                this.cursor_ = 0;
                this.nextValue_ = null;
                this.atEnd_ = !0;
            };
            jspb.BinaryIterator.prototype.get = function () {
                return this.nextValue_;
            };
            jspb.BinaryIterator.prototype.atEnd = function () {
                return this.atEnd_;
            };
            jspb.BinaryIterator.prototype.next = function () {
                var a = this.nextValue_;
                this.decoder_ ? this.decoder_.atEnd() ? (this.nextValue_ = null, this.atEnd_ = !0) : this.nextValue_ = this.nextMethod_.call(this.decoder_) : this.elements_ && (this.cursor_ == this.elements_.length ? (this.nextValue_ = null, this.atEnd_ = !0) : this.nextValue_ = this.elements_[this.cursor_++]);
                return a;
            };
            jspb.BinaryDecoder = function (a, b, c) {
                this.bytes_ = null;
                this.tempHigh_ = this.tempLow_ = this.cursor_ = this.end_ = this.start_ = 0;
                this.error_ = !1;
                a && this.setBlock(a, b, c);
            };
            jspb.BinaryDecoder.instanceCache_ = [];
            jspb.BinaryDecoder.alloc = function (a, b, c) {
                if (jspb.BinaryDecoder.instanceCache_.length) {
                    var d = jspb.BinaryDecoder.instanceCache_.pop();
                    a && d.setBlock(a, b, c);
                    return d;
                }
                return new jspb.BinaryDecoder(a, b, c);
            };
            jspb.BinaryDecoder.prototype.free = function () {
                this.clear();
                100 > jspb.BinaryDecoder.instanceCache_.length && jspb.BinaryDecoder.instanceCache_.push(this);
            };
            jspb.BinaryDecoder.prototype.clone = function () {
                return jspb.BinaryDecoder.alloc(this.bytes_, this.start_, this.end_ - this.start_);
            };
            jspb.BinaryDecoder.prototype.clear = function () {
                this.bytes_ = null;
                this.cursor_ = this.end_ = this.start_ = 0;
                this.error_ = !1;
            };
            jspb.BinaryDecoder.prototype.getBuffer = function () {
                return this.bytes_;
            };
            jspb.BinaryDecoder.prototype.setBlock = function (a, b, c) {
                this.bytes_ = jspb.utils.byteSourceToUint8Array(a);
                this.start_ = goog.isDef(b) ? b : 0;
                this.end_ = goog.isDef(c) ? this.start_ + c : this.bytes_.length;
                this.cursor_ = this.start_;
            };
            jspb.BinaryDecoder.prototype.getEnd = function () {
                return this.end_;
            };
            jspb.BinaryDecoder.prototype.setEnd = function (a) {
                this.end_ = a;
            };
            jspb.BinaryDecoder.prototype.reset = function () {
                this.cursor_ = this.start_;
            };
            jspb.BinaryDecoder.prototype.getCursor = function () {
                return this.cursor_;
            };
            jspb.BinaryDecoder.prototype.setCursor = function (a) {
                this.cursor_ = a;
            };
            jspb.BinaryDecoder.prototype.advance = function (a) {
                this.cursor_ += a;
                goog.asserts.assert(this.cursor_ <= this.end_);
            };
            jspb.BinaryDecoder.prototype.atEnd = function () {
                return this.cursor_ == this.end_;
            };
            jspb.BinaryDecoder.prototype.pastEnd = function () {
                return this.cursor_ > this.end_;
            };
            jspb.BinaryDecoder.prototype.getError = function () {
                return this.error_ || 0 > this.cursor_ || this.cursor_ > this.end_;
            };
            jspb.BinaryDecoder.prototype.readSplitVarint64_ = function () {
                for (var a, b = 0, c, d = 0; 4 > d; d++) if (a = this.bytes_[this.cursor_++], b |= (a & 127) << 7 * d, 128 > a) {
                    this.tempLow_ = b >>> 0;
                    this.tempHigh_ = 0;
                    return;
                }
                a = this.bytes_[this.cursor_++];
                b |= (a & 127) << 28;
                c = 0 | (a & 127) >> 4;
                if (128 > a) this.tempLow_ = b >>> 0, this.tempHigh_ = c >>> 0; else {
                    for (d = 0; 5 > d; d++) if (a = this.bytes_[this.cursor_++], c |= (a & 127) << 7 * d + 3, 128 > a) {
                        this.tempLow_ = b >>> 0;
                        this.tempHigh_ = c >>> 0;
                        return;
                    }
                    goog.asserts.fail("Failed to read varint, encoding is invalid.");
                    this.error_ =
                        !0;
                }
            };
            jspb.BinaryDecoder.prototype.skipVarint = function () {
                for (; this.bytes_[this.cursor_] & 128;) this.cursor_++;
                this.cursor_++;
            };
            jspb.BinaryDecoder.prototype.unskipVarint = function (a) {
                for (; 128 < a;) this.cursor_--, a >>>= 7;
                this.cursor_--;
            };
            jspb.BinaryDecoder.prototype.readUnsignedVarint32 = function () {
                var a, b = this.bytes_;
                a = b[this.cursor_ + 0];
                var c = a & 127;
                if (128 > a) return this.cursor_ += 1, goog.asserts.assert(this.cursor_ <= this.end_), c;
                a = b[this.cursor_ + 1];
                c |= (a & 127) << 7;
                if (128 > a) return this.cursor_ += 2, goog.asserts.assert(this.cursor_ <= this.end_), c;
                a = b[this.cursor_ + 2];
                c |= (a & 127) << 14;
                if (128 > a) return this.cursor_ += 3, goog.asserts.assert(this.cursor_ <= this.end_), c;
                a = b[this.cursor_ + 3];
                c |= (a & 127) << 21;
                if (128 > a) return this.cursor_ += 4, goog.asserts.assert(this.cursor_ <=
                    this.end_), c;
                a = b[this.cursor_ + 4];
                c |= (a & 15) << 28;
                if (128 > a) return this.cursor_ += 5, goog.asserts.assert(this.cursor_ <= this.end_), c >>> 0;
                this.cursor_ += 5;
                128 <= b[this.cursor_++] && 128 <= b[this.cursor_++] && 128 <= b[this.cursor_++] && 128 <= b[this.cursor_++] && 128 <= b[this.cursor_++] && goog.asserts.assert(!1);
                goog.asserts.assert(this.cursor_ <= this.end_);
                return c;
            };
            jspb.BinaryDecoder.prototype.readSignedVarint32 = jspb.BinaryDecoder.prototype.readUnsignedVarint32;
            jspb.BinaryDecoder.prototype.readUnsignedVarint32String = function () {
                return this.readUnsignedVarint32().toString();
            };
            jspb.BinaryDecoder.prototype.readSignedVarint32String = function () {
                return this.readSignedVarint32().toString();
            };
            jspb.BinaryDecoder.prototype.readZigzagVarint32 = function () {
                var a = this.readUnsignedVarint32();
                return a >>> 1 ^ -(a & 1);
            };
            jspb.BinaryDecoder.prototype.readUnsignedVarint64 = function () {
                this.readSplitVarint64_();
                return jspb.utils.joinUint64(this.tempLow_, this.tempHigh_);
            };
            jspb.BinaryDecoder.prototype.readUnsignedVarint64String = function () {
                this.readSplitVarint64_();
                return jspb.utils.joinUnsignedDecimalString(this.tempLow_, this.tempHigh_);
            };
            jspb.BinaryDecoder.prototype.readSignedVarint64 = function () {
                this.readSplitVarint64_();
                return jspb.utils.joinInt64(this.tempLow_, this.tempHigh_);
            };
            jspb.BinaryDecoder.prototype.readSignedVarint64String = function () {
                this.readSplitVarint64_();
                return jspb.utils.joinSignedDecimalString(this.tempLow_, this.tempHigh_);
            };
            jspb.BinaryDecoder.prototype.readZigzagVarint64 = function () {
                this.readSplitVarint64_();
                return jspb.utils.joinZigzag64(this.tempLow_, this.tempHigh_);
            };
            jspb.BinaryDecoder.prototype.readZigzagVarint64String = function () {
                return this.readZigzagVarint64().toString();
            };
            jspb.BinaryDecoder.prototype.readUint8 = function () {
                var a = this.bytes_[this.cursor_ + 0];
                this.cursor_ += 1;
                goog.asserts.assert(this.cursor_ <= this.end_);
                return a;
            };
            jspb.BinaryDecoder.prototype.readUint16 = function () {
                var a = this.bytes_[this.cursor_ + 0], b = this.bytes_[this.cursor_ + 1];
                this.cursor_ += 2;
                goog.asserts.assert(this.cursor_ <= this.end_);
                return a << 0 | b << 8;
            };
            jspb.BinaryDecoder.prototype.readUint32 = function () {
                var a = this.bytes_[this.cursor_ + 0], b = this.bytes_[this.cursor_ + 1],
                    c = this.bytes_[this.cursor_ + 2], d = this.bytes_[this.cursor_ + 3];
                this.cursor_ += 4;
                goog.asserts.assert(this.cursor_ <= this.end_);
                return (a << 0 | b << 8 | c << 16 | d << 24) >>> 0;
            };
            jspb.BinaryDecoder.prototype.readUint64 = function () {
                var a = this.readUint32(), b = this.readUint32();
                return jspb.utils.joinUint64(a, b);
            };
            jspb.BinaryDecoder.prototype.readUint64String = function () {
                var a = this.readUint32(), b = this.readUint32();
                return jspb.utils.joinUnsignedDecimalString(a, b);
            };
            jspb.BinaryDecoder.prototype.readInt8 = function () {
                var a = this.bytes_[this.cursor_ + 0];
                this.cursor_ += 1;
                goog.asserts.assert(this.cursor_ <= this.end_);
                return a << 24 >> 24;
            };
            jspb.BinaryDecoder.prototype.readInt16 = function () {
                var a = this.bytes_[this.cursor_ + 0], b = this.bytes_[this.cursor_ + 1];
                this.cursor_ += 2;
                goog.asserts.assert(this.cursor_ <= this.end_);
                return (a << 0 | b << 8) << 16 >> 16;
            };
            jspb.BinaryDecoder.prototype.readInt32 = function () {
                var a = this.bytes_[this.cursor_ + 0], b = this.bytes_[this.cursor_ + 1],
                    c = this.bytes_[this.cursor_ + 2], d = this.bytes_[this.cursor_ + 3];
                this.cursor_ += 4;
                goog.asserts.assert(this.cursor_ <= this.end_);
                return a << 0 | b << 8 | c << 16 | d << 24;
            };
            jspb.BinaryDecoder.prototype.readInt64 = function () {
                var a = this.readUint32(), b = this.readUint32();
                return jspb.utils.joinInt64(a, b);
            };
            jspb.BinaryDecoder.prototype.readInt64String = function () {
                var a = this.readUint32(), b = this.readUint32();
                return jspb.utils.joinSignedDecimalString(a, b);
            };
            jspb.BinaryDecoder.prototype.readFloat = function () {
                var a = this.readUint32();
                return jspb.utils.joinFloat32(a, 0);
            };
            jspb.BinaryDecoder.prototype.readDouble = function () {
                var a = this.readUint32(), b = this.readUint32();
                return jspb.utils.joinFloat64(a, b);
            };
            jspb.BinaryDecoder.prototype.readBool = function () {
                return !!this.bytes_[this.cursor_++];
            };
            jspb.BinaryDecoder.prototype.readEnum = function () {
                return this.readSignedVarint32();
            };
            jspb.BinaryDecoder.prototype.readString = function (a) {
                var b = this.bytes_, c = this.cursor_;
                a = c + a;
                for (var d = [], e = ""; c < a;) {
                    var f = b[c++];
                    if (128 > f) d.push(f); else if (192 > f) continue; else if (224 > f) {
                        var g = b[c++];
                        d.push((f & 31) << 6 | g & 63);
                    } else if (240 > f) {
                        var g = b[c++], h = b[c++];
                        d.push((f & 15) << 12 | (g & 63) << 6 | h & 63);
                    } else if (248 > f) {
                        var g = b[c++], h = b[c++], k = b[c++],
                            f = (f & 7) << 18 | (g & 63) << 12 | (h & 63) << 6 | k & 63, f = f - 65536;
                        d.push((f >> 10 & 1023) + 55296, (f & 1023) + 56320);
                    }
                    8192 <= d.length && (e += String.fromCharCode.apply(null, d), d.length = 0);
                }
                e += goog.crypt.byteArrayToString(d);
                this.cursor_ = c;
                return e;
            };
            jspb.BinaryDecoder.prototype.readStringWithLength = function () {
                var a = this.readUnsignedVarint32();
                return this.readString(a);
            };
            jspb.BinaryDecoder.prototype.readBytes = function (a) {
                if (0 > a || this.cursor_ + a > this.bytes_.length) return this.error_ = !0, goog.asserts.fail("Invalid byte length!"), new Uint8Array(0);
                var b = this.bytes_.subarray(this.cursor_, this.cursor_ + a);
                this.cursor_ += a;
                goog.asserts.assert(this.cursor_ <= this.end_);
                return b;
            };
            jspb.BinaryDecoder.prototype.readVarintHash64 = function () {
                this.readSplitVarint64_();
                return jspb.utils.joinHash64(this.tempLow_, this.tempHigh_);
            };
            jspb.BinaryDecoder.prototype.readFixedHash64 = function () {
                var a = this.bytes_, b = this.cursor_, c = a[b + 0], d = a[b + 1], e = a[b + 2], f = a[b + 3],
                    g = a[b + 4], h = a[b + 5], k = a[b + 6], a = a[b + 7];
                this.cursor_ += 8;
                return String.fromCharCode(c, d, e, f, g, h, k, a);
            };
            jspb.BinaryReader = function (a, b, c) {
                this.decoder_ = jspb.BinaryDecoder.alloc(a, b, c);
                this.fieldCursor_ = this.decoder_.getCursor();
                this.nextField_ = jspb.BinaryConstants.INVALID_FIELD_NUMBER;
                this.nextWireType_ = jspb.BinaryConstants.WireType.INVALID;
                this.error_ = !1;
                this.readCallbacks_ = null;
            };
            jspb.BinaryReader.instanceCache_ = [];
            jspb.BinaryReader.alloc = function (a, b, c) {
                if (jspb.BinaryReader.instanceCache_.length) {
                    var d = jspb.BinaryReader.instanceCache_.pop();
                    a && d.decoder_.setBlock(a, b, c);
                    return d;
                }
                return new jspb.BinaryReader(a, b, c);
            };
            jspb.BinaryReader.prototype.alloc = jspb.BinaryReader.alloc;
            jspb.BinaryReader.prototype.free = function () {
                this.decoder_.clear();
                this.nextField_ = jspb.BinaryConstants.INVALID_FIELD_NUMBER;
                this.nextWireType_ = jspb.BinaryConstants.WireType.INVALID;
                this.error_ = !1;
                this.readCallbacks_ = null;
                100 > jspb.BinaryReader.instanceCache_.length && jspb.BinaryReader.instanceCache_.push(this);
            };
            jspb.BinaryReader.prototype.getFieldCursor = function () {
                return this.fieldCursor_;
            };
            jspb.BinaryReader.prototype.getCursor = function () {
                return this.decoder_.getCursor();
            };
            jspb.BinaryReader.prototype.getBuffer = function () {
                return this.decoder_.getBuffer();
            };
            jspb.BinaryReader.prototype.getFieldNumber = function () {
                return this.nextField_;
            };
            jspb.BinaryReader.prototype.getWireType = function () {
                return this.nextWireType_;
            };
            jspb.BinaryReader.prototype.isEndGroup = function () {
                return this.nextWireType_ == jspb.BinaryConstants.WireType.END_GROUP;
            };
            jspb.BinaryReader.prototype.getError = function () {
                return this.error_ || this.decoder_.getError();
            };
            jspb.BinaryReader.prototype.setBlock = function (a, b, c) {
                this.decoder_.setBlock(a, b, c);
                this.nextField_ = jspb.BinaryConstants.INVALID_FIELD_NUMBER;
                this.nextWireType_ = jspb.BinaryConstants.WireType.INVALID;
            };
            jspb.BinaryReader.prototype.reset = function () {
                this.decoder_.reset();
                this.nextField_ = jspb.BinaryConstants.INVALID_FIELD_NUMBER;
                this.nextWireType_ = jspb.BinaryConstants.WireType.INVALID;
            };
            jspb.BinaryReader.prototype.advance = function (a) {
                this.decoder_.advance(a);
            };
            jspb.BinaryReader.prototype.nextField = function () {
                if (this.decoder_.atEnd()) return !1;
                if (this.getError()) return goog.asserts.fail("Decoder hit an error"), !1;
                this.fieldCursor_ = this.decoder_.getCursor();
                var a = this.decoder_.readUnsignedVarint32(), b = a >>> 3, a = a & 7;
                if (a != jspb.BinaryConstants.WireType.VARINT && a != jspb.BinaryConstants.WireType.FIXED32 && a != jspb.BinaryConstants.WireType.FIXED64 && a != jspb.BinaryConstants.WireType.DELIMITED && a != jspb.BinaryConstants.WireType.START_GROUP && a != jspb.BinaryConstants.WireType.END_GROUP) return goog.asserts.fail("Invalid wire type"),
                this.error_ = !0, !1;
                this.nextField_ = b;
                this.nextWireType_ = a;
                return !0;
            };
            jspb.BinaryReader.prototype.unskipHeader = function () {
                this.decoder_.unskipVarint(this.nextField_ << 3 | this.nextWireType_);
            };
            jspb.BinaryReader.prototype.skipMatchingFields = function () {
                var a = this.nextField_;
                for (this.unskipHeader(); this.nextField() && this.getFieldNumber() == a;) this.skipField();
                this.decoder_.atEnd() || this.unskipHeader();
            };
            jspb.BinaryReader.prototype.skipVarintField = function () {
                this.nextWireType_ != jspb.BinaryConstants.WireType.VARINT ? (goog.asserts.fail("Invalid wire type for skipVarintField"), this.skipField()) : this.decoder_.skipVarint();
            };
            jspb.BinaryReader.prototype.skipDelimitedField = function () {
                if (this.nextWireType_ != jspb.BinaryConstants.WireType.DELIMITED) goog.asserts.fail("Invalid wire type for skipDelimitedField"), this.skipField(); else {
                    var a = this.decoder_.readUnsignedVarint32();
                    this.decoder_.advance(a);
                }
            };
            jspb.BinaryReader.prototype.skipFixed32Field = function () {
                this.nextWireType_ != jspb.BinaryConstants.WireType.FIXED32 ? (goog.asserts.fail("Invalid wire type for skipFixed32Field"), this.skipField()) : this.decoder_.advance(4);
            };
            jspb.BinaryReader.prototype.skipFixed64Field = function () {
                this.nextWireType_ != jspb.BinaryConstants.WireType.FIXED64 ? (goog.asserts.fail("Invalid wire type for skipFixed64Field"), this.skipField()) : this.decoder_.advance(8);
            };
            jspb.BinaryReader.prototype.skipGroup = function () {
                var a = [this.nextField_];
                do {
                    if (!this.nextField()) {
                        goog.asserts.fail("Unmatched start-group tag: stream EOF");
                        this.error_ = !0;
                        break;
                    }
                    if (this.nextWireType_ == jspb.BinaryConstants.WireType.START_GROUP) a.push(this.nextField_); else if (this.nextWireType_ == jspb.BinaryConstants.WireType.END_GROUP && this.nextField_ != a.pop()) {
                        goog.asserts.fail("Unmatched end-group tag");
                        this.error_ = !0;
                        break;
                    }
                } while (0 < a.length);
            };
            jspb.BinaryReader.prototype.skipField = function () {
                switch (this.nextWireType_) {
                case jspb.BinaryConstants.WireType.VARINT:
                    this.skipVarintField();
                    break;
                case jspb.BinaryConstants.WireType.FIXED64:
                    this.skipFixed64Field();
                    break;
                case jspb.BinaryConstants.WireType.DELIMITED:
                    this.skipDelimitedField();
                    break;
                case jspb.BinaryConstants.WireType.FIXED32:
                    this.skipFixed32Field();
                    break;
                case jspb.BinaryConstants.WireType.START_GROUP:
                    this.skipGroup();
                    break;
                default:
                    goog.asserts.fail("Invalid wire encoding for field.");
                }
            };
            jspb.BinaryReader.prototype.registerReadCallback = function (a, b) {
                goog.isNull(this.readCallbacks_) && (this.readCallbacks_ = {});
                goog.asserts.assert(!this.readCallbacks_[a]);
                this.readCallbacks_[a] = b;
            };
            jspb.BinaryReader.prototype.runReadCallback = function (a) {
                goog.asserts.assert(!goog.isNull(this.readCallbacks_));
                a = this.readCallbacks_[a];
                goog.asserts.assert(a);
                return a(this);
            };
            jspb.BinaryReader.prototype.readAny = function (a) {
                this.nextWireType_ = jspb.BinaryConstants.FieldTypeToWireType(a);
                var b = jspb.BinaryConstants.FieldType;
                switch (a) {
                case b.DOUBLE:
                    return this.readDouble();
                case b.FLOAT:
                    return this.readFloat();
                case b.INT64:
                    return this.readInt64();
                case b.UINT64:
                    return this.readUint64();
                case b.INT32:
                    return this.readInt32();
                case b.FIXED64:
                    return this.readFixed64();
                case b.FIXED32:
                    return this.readFixed32();
                case b.BOOL:
                    return this.readBool();
                case b.STRING:
                    return this.readString();
                case b.GROUP:
                    goog.asserts.fail("Group field type not supported in readAny()");
                case b.MESSAGE:
                    goog.asserts.fail("Message field type not supported in readAny()");
                case b.BYTES:
                    return this.readBytes();
                case b.UINT32:
                    return this.readUint32();
                case b.ENUM:
                    return this.readEnum();
                case b.SFIXED32:
                    return this.readSfixed32();
                case b.SFIXED64:
                    return this.readSfixed64();
                case b.SINT32:
                    return this.readSint32();
                case b.SINT64:
                    return this.readSint64();
                case b.FHASH64:
                    return this.readFixedHash64();
                case b.VHASH64:
                    return this.readVarintHash64();
                default:
                    goog.asserts.fail("Invalid field type in readAny()");
                }
                return 0;
            };
            jspb.BinaryReader.prototype.readMessage = function (a, b) {
                goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.DELIMITED);
                var c = this.decoder_.getEnd(), d = this.decoder_.readUnsignedVarint32(),
                    d = this.decoder_.getCursor() + d;
                this.decoder_.setEnd(d);
                b(a, this);
                this.decoder_.setCursor(d);
                this.decoder_.setEnd(c);
            };
            jspb.BinaryReader.prototype.readGroup = function (a, b, c) {
                goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.START_GROUP);
                goog.asserts.assert(this.nextField_ == a);
                c(b, this);
                this.error_ || this.nextWireType_ == jspb.BinaryConstants.WireType.END_GROUP || (goog.asserts.fail("Group submessage did not end with an END_GROUP tag"), this.error_ = !0);
            };
            jspb.BinaryReader.prototype.getFieldDecoder = function () {
                goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.DELIMITED);
                var a = this.decoder_.readUnsignedVarint32(), b = this.decoder_.getCursor(), c = b + a,
                    a = jspb.BinaryDecoder.alloc(this.decoder_.getBuffer(), b, a);
                this.decoder_.setCursor(c);
                return a;
            };
            jspb.BinaryReader.prototype.readInt32 = function () {
                goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
                return this.decoder_.readSignedVarint32();
            };
            jspb.BinaryReader.prototype.readInt32String = function () {
                goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
                return this.decoder_.readSignedVarint32String();
            };
            jspb.BinaryReader.prototype.readInt64 = function () {
                goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
                return this.decoder_.readSignedVarint64();
            };
            jspb.BinaryReader.prototype.readInt64String = function () {
                goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
                return this.decoder_.readSignedVarint64String();
            };
            jspb.BinaryReader.prototype.readUint32 = function () {
                goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
                return this.decoder_.readUnsignedVarint32();
            };
            jspb.BinaryReader.prototype.readUint32String = function () {
                goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
                return this.decoder_.readUnsignedVarint32String();
            };
            jspb.BinaryReader.prototype.readUint64 = function () {
                goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
                return this.decoder_.readUnsignedVarint64();
            };
            jspb.BinaryReader.prototype.readUint64String = function () {
                goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
                return this.decoder_.readUnsignedVarint64String();
            };
            jspb.BinaryReader.prototype.readSint32 = function () {
                goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
                return this.decoder_.readZigzagVarint32();
            };
            jspb.BinaryReader.prototype.readSint64 = function () {
                goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
                return this.decoder_.readZigzagVarint64();
            };
            jspb.BinaryReader.prototype.readSint64String = function () {
                goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
                return this.decoder_.readZigzagVarint64String();
            };
            jspb.BinaryReader.prototype.readFixed32 = function () {
                goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED32);
                return this.decoder_.readUint32();
            };
            jspb.BinaryReader.prototype.readFixed64 = function () {
                goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED64);
                return this.decoder_.readUint64();
            };
            jspb.BinaryReader.prototype.readFixed64String = function () {
                goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED64);
                return this.decoder_.readUint64String();
            };
            jspb.BinaryReader.prototype.readSfixed32 = function () {
                goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED32);
                return this.decoder_.readInt32();
            };
            jspb.BinaryReader.prototype.readSfixed32String = function () {
                goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED32);
                return this.decoder_.readInt32().toString();
            };
            jspb.BinaryReader.prototype.readSfixed64 = function () {
                goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED64);
                return this.decoder_.readInt64();
            };
            jspb.BinaryReader.prototype.readSfixed64String = function () {
                goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED64);
                return this.decoder_.readInt64String();
            };
            jspb.BinaryReader.prototype.readFloat = function () {
                goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED32);
                return this.decoder_.readFloat();
            };
            jspb.BinaryReader.prototype.readDouble = function () {
                goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED64);
                return this.decoder_.readDouble();
            };
            jspb.BinaryReader.prototype.readBool = function () {
                goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
                return !!this.decoder_.readUnsignedVarint32();
            };
            jspb.BinaryReader.prototype.readEnum = function () {
                goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
                return this.decoder_.readSignedVarint64();
            };
            jspb.BinaryReader.prototype.readString = function () {
                goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.DELIMITED);
                var a = this.decoder_.readUnsignedVarint32();
                return this.decoder_.readString(a);
            };
            jspb.BinaryReader.prototype.readBytes = function () {
                goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.DELIMITED);
                var a = this.decoder_.readUnsignedVarint32();
                return this.decoder_.readBytes(a);
            };
            jspb.BinaryReader.prototype.readVarintHash64 = function () {
                goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
                return this.decoder_.readVarintHash64();
            };
            jspb.BinaryReader.prototype.readFixedHash64 = function () {
                goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED64);
                return this.decoder_.readFixedHash64();
            };
            jspb.BinaryReader.prototype.readPackedField_ = function (a) {
                goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.DELIMITED);
                for (var b = this.decoder_.readUnsignedVarint32(), b = this.decoder_.getCursor() + b, c = []; this.decoder_.getCursor() < b;) c.push(a.call(this.decoder_));
                return c;
            };
            jspb.BinaryReader.prototype.readPackedInt32 = function () {
                return this.readPackedField_(this.decoder_.readSignedVarint32);
            };
            jspb.BinaryReader.prototype.readPackedInt32String = function () {
                return this.readPackedField_(this.decoder_.readSignedVarint32String);
            };
            jspb.BinaryReader.prototype.readPackedInt64 = function () {
                return this.readPackedField_(this.decoder_.readSignedVarint64);
            };
            jspb.BinaryReader.prototype.readPackedInt64String = function () {
                return this.readPackedField_(this.decoder_.readSignedVarint64String);
            };
            jspb.BinaryReader.prototype.readPackedUint32 = function () {
                return this.readPackedField_(this.decoder_.readUnsignedVarint32);
            };
            jspb.BinaryReader.prototype.readPackedUint32String = function () {
                return this.readPackedField_(this.decoder_.readUnsignedVarint32String);
            };
            jspb.BinaryReader.prototype.readPackedUint64 = function () {
                return this.readPackedField_(this.decoder_.readUnsignedVarint64);
            };
            jspb.BinaryReader.prototype.readPackedUint64String = function () {
                return this.readPackedField_(this.decoder_.readUnsignedVarint64String);
            };
            jspb.BinaryReader.prototype.readPackedSint32 = function () {
                return this.readPackedField_(this.decoder_.readZigzagVarint32);
            };
            jspb.BinaryReader.prototype.readPackedSint64 = function () {
                return this.readPackedField_(this.decoder_.readZigzagVarint64);
            };
            jspb.BinaryReader.prototype.readPackedSint64String = function () {
                return this.readPackedField_(this.decoder_.readZigzagVarint64String);
            };
            jspb.BinaryReader.prototype.readPackedFixed32 = function () {
                return this.readPackedField_(this.decoder_.readUint32);
            };
            jspb.BinaryReader.prototype.readPackedFixed64 = function () {
                return this.readPackedField_(this.decoder_.readUint64);
            };
            jspb.BinaryReader.prototype.readPackedFixed64String = function () {
                return this.readPackedField_(this.decoder_.readUint64String);
            };
            jspb.BinaryReader.prototype.readPackedSfixed32 = function () {
                return this.readPackedField_(this.decoder_.readInt32);
            };
            jspb.BinaryReader.prototype.readPackedSfixed64 = function () {
                return this.readPackedField_(this.decoder_.readInt64);
            };
            jspb.BinaryReader.prototype.readPackedSfixed64String = function () {
                return this.readPackedField_(this.decoder_.readInt64String);
            };
            jspb.BinaryReader.prototype.readPackedFloat = function () {
                return this.readPackedField_(this.decoder_.readFloat);
            };
            jspb.BinaryReader.prototype.readPackedDouble = function () {
                return this.readPackedField_(this.decoder_.readDouble);
            };
            jspb.BinaryReader.prototype.readPackedBool = function () {
                return this.readPackedField_(this.decoder_.readBool);
            };
            jspb.BinaryReader.prototype.readPackedEnum = function () {
                return this.readPackedField_(this.decoder_.readEnum);
            };
            jspb.BinaryReader.prototype.readPackedVarintHash64 = function () {
                return this.readPackedField_(this.decoder_.readVarintHash64);
            };
            jspb.BinaryReader.prototype.readPackedFixedHash64 = function () {
                return this.readPackedField_(this.decoder_.readFixedHash64);
            };
            jspb.Export = {};
            exports.Map = jspb.Map;
            exports.Message = jspb.Message;
            exports.BinaryReader = jspb.BinaryReader;
            exports.BinaryWriter = jspb.BinaryWriter;
            exports.ExtensionFieldInfo = jspb.ExtensionFieldInfo;
            exports.ExtensionFieldBinaryInfo = jspb.ExtensionFieldBinaryInfo;
            exports.exportSymbol = goog.exportSymbol;
            exports.inherits = goog.inherits;
            exports.object = {extend: goog.object.extend};
            exports.typeOf = goog.typeOf;

        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {}], 2: [function (_require, module, exports) {
        /**
         * @fileoverview
         * @enhanceable
         * @suppress {messageConventions} JS Compiler reports an error if a variable or
         *     field starts with 'MSG_' and isn't a translatable message.
         * @public
         */
        // GENERATED CODE -- DO NOT EDIT!

        var jspb = _require("google-protobuf");
        var goog = jspb;
        var global = window;// var global = Function('return this')();

        goog.exportSymbol("proto.stream.ErrorCode", null, global);
        /**
         * @enum {number}
         */
        proto.stream.ErrorCode = {
            NOERROR: 0,
            OK: 200,
            ACCEPTED: 202,
            NOCONTENT: 204,
            BADREQUEST: 400,
            UNAUTHORIZED: 401,
            SIGNATUREFAILED: 402,
            FORBIDDEN: 403,
            NOTFOUND: 404,
            INTERNALSERVERERROR: 500,
            NOTIMPLEMENTED: 501,
            BADGATEWAY: 502,
            SERVICEUNAVAILABLE: 503
        };

        goog.object.extend(exports, proto.stream);

    }, {"google-protobuf": 1}], 3: [function (_require, module, exports) {
        var myProto = _require("./sdk_pb");
        var myProto1 = _require("./gateway_pb");
        var myProto2 = _require("./errorcode_pb");
        module.exports = {
            DataProto: myProto,
            DataProto: myProto1,
            DataProto: myProto2
        };
    }, {"./errorcode_pb": 2, "./gateway_pb": 4, "./sdk_pb": 5}], 4: [function (_require, module, exports) {
        /**
         * @fileoverview
         * @enhanceable
         * @suppress {messageConventions} JS Compiler reports an error if a variable or
         *     field starts with 'MSG_' and isn't a translatable message.
         * @public
         */
        // GENERATED CODE -- DO NOT EDIT!

        var jspb = _require("google-protobuf");
        var goog = jspb;
        var global = window;// var global = Function('return this')();

        var errorcode_pb = _require("./errorcode_pb.js");
        goog.exportSymbol("proto.stream.BookInfo", null, global);
        goog.exportSymbol("proto.stream.CmdId", null, global);
        goog.exportSymbol("proto.stream.ConnDetailV2", null, global);
        goog.exportSymbol("proto.stream.CreateRoom", null, global);
        goog.exportSymbol("proto.stream.CreateRoomRsp", null, global);
        goog.exportSymbol("proto.stream.DisconnectReq", null, global);
        goog.exportSymbol("proto.stream.DisconnectRsp", null, global);
        goog.exportSymbol("proto.stream.GetRoomDetailReq", null, global);
        goog.exportSymbol("proto.stream.GetRoomDetailRsp", null, global);
        goog.exportSymbol("proto.stream.GetRoomList", null, global);
        goog.exportSymbol("proto.stream.GetRoomListExReq", null, global);
        goog.exportSymbol("proto.stream.GetRoomListExRsp", null, global);
        goog.exportSymbol("proto.stream.GetRoomListRsp", null, global);
        goog.exportSymbol("proto.stream.HeartbeatReq", null, global);
        goog.exportSymbol("proto.stream.HeartbeatRsp", null, global);
        goog.exportSymbol("proto.stream.JoinOpenNotify", null, global);
        goog.exportSymbol("proto.stream.JoinOpenReq", null, global);
        goog.exportSymbol("proto.stream.JoinOpenRsp", null, global);
        goog.exportSymbol("proto.stream.JoinOverNotify", null, global);
        goog.exportSymbol("proto.stream.JoinOverReq", null, global);
        goog.exportSymbol("proto.stream.JoinOverRsp", null, global);
        goog.exportSymbol("proto.stream.JoinRoomReq", null, global);
        goog.exportSymbol("proto.stream.JoinRoomRsp", null, global);
        goog.exportSymbol("proto.stream.JoinRoomType", null, global);
        goog.exportSymbol("proto.stream.KickPlayer", null, global);
        goog.exportSymbol("proto.stream.KickPlayerNotify", null, global);
        goog.exportSymbol("proto.stream.KickPlayerRsp", null, global);
        goog.exportSymbol("proto.stream.LeaveRoomReq", null, global);
        goog.exportSymbol("proto.stream.LeaveRoomRsp", null, global);
        goog.exportSymbol("proto.stream.LoginReq", null, global);
        goog.exportSymbol("proto.stream.LoginRsp", null, global);
        goog.exportSymbol("proto.stream.LogoutRsp", null, global);
        goog.exportSymbol("proto.stream.NetworkStateNotify", null, global);
        goog.exportSymbol("proto.stream.NetworkStateReq", null, global);
        goog.exportSymbol("proto.stream.NetworkStateRsp", null, global);
        goog.exportSymbol("proto.stream.NoticeJoin", null, global);
        goog.exportSymbol("proto.stream.NoticeLeave", null, global);
        goog.exportSymbol("proto.stream.NoticeRoomProperty", null, global);
        goog.exportSymbol("proto.stream.PlayerInfo", null, global);
        goog.exportSymbol("proto.stream.RoomDetail", null, global);
        goog.exportSymbol("proto.stream.RoomFilter", null, global);
        goog.exportSymbol("proto.stream.RoomInfo", null, global);
        goog.exportSymbol("proto.stream.RoomInfoEx", null, global);
        goog.exportSymbol("proto.stream.RoomListSort", null, global);
        goog.exportSymbol("proto.stream.RoomState", null, global);
        goog.exportSymbol("proto.stream.SetRoomPropertyReq", null, global);
        goog.exportSymbol("proto.stream.SetRoomPropertyRsp", null, global);
        goog.exportSymbol("proto.stream.SortOrder", null, global);
        goog.exportSymbol("proto.stream.TcpProtoHeader", null, global);
        goog.exportSymbol("proto.stream.UserV2", null, global);
        goog.exportSymbol("proto.stream.keyValue", null, global);

        /**
         * Generated by JsPbCodeGenerator.
         * @param {Array=} opt_data Optional initial data array, typically from a
         * server response, or constructed directly in Javascript. The array is used
         * in place and becomes part of the constructed object. It is not cloned.
         * If no data is provided, the constructed object will be empty, but still
         * valid.
         * @extends {jspb.Message}
         * @constructor
         */
        proto.stream.LoginReq = function (opt_data) {
            jspb.Message.initialize(this, opt_data, 0, -1, null, null);
        };
        goog.inherits(proto.stream.LoginReq, jspb.Message);
        if (goog.DEBUG && !COMPILED) {
            proto.stream.LoginReq.displayName = "proto.stream.LoginReq";
        }


        if (jspb.Message.GENERATE_TO_OBJECT) {
            /**
             * Creates an object representation of this proto suitable for use in Soy templates.
             * Field names that are reserved in JavaScript and will be renamed to pb_name.
             * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
             * For the list of reserved names please see:
             *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
             * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
             *     for transitional soy proto support: http://goto/soy-param-migration
             * @return {!Object}
             */
            proto.stream.LoginReq.prototype.toObject = function (opt_includeInstance) {
                return proto.stream.LoginReq.toObject(opt_includeInstance, this);
            };


            /**
             * Static version of the {@see toObject} method.
             * @param {boolean|undefined} includeInstance Whether to include the JSPB
             *     instance for transitional soy proto support:
             *     http://goto/soy-param-migration
             * @param {!proto.stream.LoginReq} msg The msg instance to transform.
             * @return {!Object}
             * @suppress {unusedLocalVariables} f is only used for nested messages
             */
            proto.stream.LoginReq.toObject = function (includeInstance, msg) {
                var f, obj = {
                    gameid: jspb.Message.getFieldWithDefault(msg, 1, 0),
                    appkey: jspb.Message.getFieldWithDefault(msg, 2, ""),
                    deviceid: jspb.Message.getFieldWithDefault(msg, 3, ""),
                    sign: jspb.Message.getFieldWithDefault(msg, 4, ""),
                    sdkver: jspb.Message.getFieldWithDefault(msg, 5, ""),
                    vendor: jspb.Message.getFieldWithDefault(msg, 6, 0)
                };

                if (includeInstance) {
                    obj.$jspbMessageInstance = msg;
                }
                return obj;
            };
        }


        /**
         * Deserializes binary data (in protobuf wire format).
         * @param {jspb.ByteSource} bytes The bytes to deserialize.
         * @return {!proto.stream.LoginReq}
         */
        proto.stream.LoginReq.deserializeBinary = function (bytes) {
            var reader = new jspb.BinaryReader(bytes);
            var msg = new proto.stream.LoginReq;
            return proto.stream.LoginReq.deserializeBinaryFromReader(msg, reader);
        };


        /**
         * Deserializes binary data (in protobuf wire format) from the
         * given reader into the given message object.
         * @param {!proto.stream.LoginReq} msg The message object to deserialize into.
         * @param {!jspb.BinaryReader} reader The BinaryReader to use.
         * @return {!proto.stream.LoginReq}
         */
        proto.stream.LoginReq.deserializeBinaryFromReader = function (msg, reader) {
            while (reader.nextField()) {
                if (reader.isEndGroup()) {
                    break;
                }
                var field = reader.getFieldNumber();
                switch (field) {
                case 1:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setGameid(value);
                    break;
                case 2:
                    var value = /** @type {string} */ (reader.readString());
                    msg.setAppkey(value);
                    break;
                case 3:
                    var value = /** @type {string} */ (reader.readString());
                    msg.setDeviceid(value);
                    break;
                case 4:
                    var value = /** @type {string} */ (reader.readString());
                    msg.setSign(value);
                    break;
                case 5:
                    var value = /** @type {string} */ (reader.readString());
                    msg.setSdkver(value);
                    break;
                case 6:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setVendor(value);
                    break;
                default:
                    reader.skipField();
                    break;
                }
            }
            return msg;
        };


        /**
         * Serializes the message to binary data (in protobuf wire format).
         * @return {!Uint8Array}
         */
        proto.stream.LoginReq.prototype.serializeBinary = function () {
            var writer = new jspb.BinaryWriter();
            proto.stream.LoginReq.serializeBinaryToWriter(this, writer);
            return writer.getResultBuffer();
        };


        /**
         * Serializes the given message to binary data (in protobuf wire
         * format), writing to the given BinaryWriter.
         * @param {!proto.stream.LoginReq} message
         * @param {!jspb.BinaryWriter} writer
         * @suppress {unusedLocalVariables} f is only used for nested messages
         */
        proto.stream.LoginReq.serializeBinaryToWriter = function (message, writer) {
            var f = undefined;
            f = message.getGameid();
            if (f !== 0) {
                writer.writeUint32(
                    1,
                    f
                );
            }
            f = message.getAppkey();
            if (f.length > 0) {
                writer.writeString(
                    2,
                    f
                );
            }
            f = message.getDeviceid();
            if (f.length > 0) {
                writer.writeString(
                    3,
                    f
                );
            }
            f = message.getSign();
            if (f.length > 0) {
                writer.writeString(
                    4,
                    f
                );
            }
            f = message.getSdkver();
            if (f.length > 0) {
                writer.writeString(
                    5,
                    f
                );
            }
            f = message.getVendor();
            if (f !== 0) {
                writer.writeUint32(
                    6,
                    f
                );
            }
        };


        /**
         * optional uint32 gameID = 1;
         * @return {number}
         */
        proto.stream.LoginReq.prototype.getGameid = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
        };


        /** @param {number} value */
        proto.stream.LoginReq.prototype.setGameid = function (value) {
            jspb.Message.setProto3IntField(this, 1, value);
        };


        /**
         * optional string appKey = 2;
         * @return {string}
         */
        proto.stream.LoginReq.prototype.getAppkey = function () {
            return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
        };


        /** @param {string} value */
        proto.stream.LoginReq.prototype.setAppkey = function (value) {
            jspb.Message.setProto3StringField(this, 2, value);
        };


        /**
         * optional string deviceID = 3;
         * @return {string}
         */
        proto.stream.LoginReq.prototype.getDeviceid = function () {
            return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
        };


        /** @param {string} value */
        proto.stream.LoginReq.prototype.setDeviceid = function (value) {
            jspb.Message.setProto3StringField(this, 3, value);
        };


        /**
         * optional string sign = 4;
         * @return {string}
         */
        proto.stream.LoginReq.prototype.getSign = function () {
            return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
        };


        /** @param {string} value */
        proto.stream.LoginReq.prototype.setSign = function (value) {
            jspb.Message.setProto3StringField(this, 4, value);
        };


        /**
         * optional string sdkVer = 5;
         * @return {string}
         */
        proto.stream.LoginReq.prototype.getSdkver = function () {
            return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
        };


        /** @param {string} value */
        proto.stream.LoginReq.prototype.setSdkver = function (value) {
            jspb.Message.setProto3StringField(this, 5, value);
        };


        /**
         * optional uint32 vendor = 6;
         * @return {number}
         */
        proto.stream.LoginReq.prototype.getVendor = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
        };


        /** @param {number} value */
        proto.stream.LoginReq.prototype.setVendor = function (value) {
            jspb.Message.setProto3IntField(this, 6, value);
        };


        /**
         * Generated by JsPbCodeGenerator.
         * @param {Array=} opt_data Optional initial data array, typically from a
         * server response, or constructed directly in Javascript. The array is used
         * in place and becomes part of the constructed object. It is not cloned.
         * If no data is provided, the constructed object will be empty, but still
         * valid.
         * @extends {jspb.Message}
         * @constructor
         */
        proto.stream.LoginRsp = function (opt_data) {
            jspb.Message.initialize(this, opt_data, 0, -1, null, null);
        };
        goog.inherits(proto.stream.LoginRsp, jspb.Message);
        if (goog.DEBUG && !COMPILED) {
            proto.stream.LoginRsp.displayName = "proto.stream.LoginRsp";
        }


        if (jspb.Message.GENERATE_TO_OBJECT) {
            /**
             * Creates an object representation of this proto suitable for use in Soy templates.
             * Field names that are reserved in JavaScript and will be renamed to pb_name.
             * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
             * For the list of reserved names please see:
             *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
             * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
             *     for transitional soy proto support: http://goto/soy-param-migration
             * @return {!Object}
             */
            proto.stream.LoginRsp.prototype.toObject = function (opt_includeInstance) {
                return proto.stream.LoginRsp.toObject(opt_includeInstance, this);
            };


            /**
             * Static version of the {@see toObject} method.
             * @param {boolean|undefined} includeInstance Whether to include the JSPB
             *     instance for transitional soy proto support:
             *     http://goto/soy-param-migration
             * @param {!proto.stream.LoginRsp} msg The msg instance to transform.
             * @return {!Object}
             * @suppress {unusedLocalVariables} f is only used for nested messages
             */
            proto.stream.LoginRsp.toObject = function (includeInstance, msg) {
                var f, obj = {
                    status: jspb.Message.getFieldWithDefault(msg, 1, 0),
                    roomid: jspb.Message.getFieldWithDefault(msg, 2, "0")
                };

                if (includeInstance) {
                    obj.$jspbMessageInstance = msg;
                }
                return obj;
            };
        }


        /**
         * Deserializes binary data (in protobuf wire format).
         * @param {jspb.ByteSource} bytes The bytes to deserialize.
         * @return {!proto.stream.LoginRsp}
         */
        proto.stream.LoginRsp.deserializeBinary = function (bytes) {
            var reader = new jspb.BinaryReader(bytes);
            var msg = new proto.stream.LoginRsp;
            return proto.stream.LoginRsp.deserializeBinaryFromReader(msg, reader);
        };


        /**
         * Deserializes binary data (in protobuf wire format) from the
         * given reader into the given message object.
         * @param {!proto.stream.LoginRsp} msg The message object to deserialize into.
         * @param {!jspb.BinaryReader} reader The BinaryReader to use.
         * @return {!proto.stream.LoginRsp}
         */
        proto.stream.LoginRsp.deserializeBinaryFromReader = function (msg, reader) {
            while (reader.nextField()) {
                if (reader.isEndGroup()) {
                    break;
                }
                var field = reader.getFieldNumber();
                switch (field) {
                case 1:
                    var value = /** @type {!proto.stream.ErrorCode} */ (reader.readEnum());
                    msg.setStatus(value);
                    break;
                case 2:
                    var value = /** @type {string} */ (reader.readUint64String());
                    msg.setRoomid(value);
                    break;
                default:
                    reader.skipField();
                    break;
                }
            }
            return msg;
        };


        /**
         * Serializes the message to binary data (in protobuf wire format).
         * @return {!Uint8Array}
         */
        proto.stream.LoginRsp.prototype.serializeBinary = function () {
            var writer = new jspb.BinaryWriter();
            proto.stream.LoginRsp.serializeBinaryToWriter(this, writer);
            return writer.getResultBuffer();
        };


        /**
         * Serializes the given message to binary data (in protobuf wire
         * format), writing to the given BinaryWriter.
         * @param {!proto.stream.LoginRsp} message
         * @param {!jspb.BinaryWriter} writer
         * @suppress {unusedLocalVariables} f is only used for nested messages
         */
        proto.stream.LoginRsp.serializeBinaryToWriter = function (message, writer) {
            var f = undefined;
            f = message.getStatus();
            if (f !== 0.0) {
                writer.writeEnum(
                    1,
                    f
                );
            }
            f = message.getRoomid();
            if (parseInt(f, 10) !== 0) {
                writer.writeUint64String(
                    2,
                    f
                );
            }
        };


        /**
         * optional ErrorCode status = 1;
         * @return {!proto.stream.ErrorCode}
         */
        proto.stream.LoginRsp.prototype.getStatus = function () {
            return /** @type {!proto.stream.ErrorCode} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
        };


        /** @param {!proto.stream.ErrorCode} value */
        proto.stream.LoginRsp.prototype.setStatus = function (value) {
            jspb.Message.setProto3EnumField(this, 1, value);
        };


        /**
         * optional uint64 roomID = 2;
         * @return {string}
         */
        proto.stream.LoginRsp.prototype.getRoomid = function () {
            return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, "0"));
        };


        /** @param {string} value */
        proto.stream.LoginRsp.prototype.setRoomid = function (value) {
            jspb.Message.setProto3StringIntField(this, 2, value);
        };


        /**
         * Generated by JsPbCodeGenerator.
         * @param {Array=} opt_data Optional initial data array, typically from a
         * server response, or constructed directly in Javascript. The array is used
         * in place and becomes part of the constructed object. It is not cloned.
         * If no data is provided, the constructed object will be empty, but still
         * valid.
         * @extends {jspb.Message}
         * @constructor
         */
        proto.stream.HeartbeatReq = function (opt_data) {
            jspb.Message.initialize(this, opt_data, 0, -1, null, null);
        };
        goog.inherits(proto.stream.HeartbeatReq, jspb.Message);
        if (goog.DEBUG && !COMPILED) {
            proto.stream.HeartbeatReq.displayName = "proto.stream.HeartbeatReq";
        }


        if (jspb.Message.GENERATE_TO_OBJECT) {
            /**
             * Creates an object representation of this proto suitable for use in Soy templates.
             * Field names that are reserved in JavaScript and will be renamed to pb_name.
             * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
             * For the list of reserved names please see:
             *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
             * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
             *     for transitional soy proto support: http://goto/soy-param-migration
             * @return {!Object}
             */
            proto.stream.HeartbeatReq.prototype.toObject = function (opt_includeInstance) {
                return proto.stream.HeartbeatReq.toObject(opt_includeInstance, this);
            };


            /**
             * Static version of the {@see toObject} method.
             * @param {boolean|undefined} includeInstance Whether to include the JSPB
             *     instance for transitional soy proto support:
             *     http://goto/soy-param-migration
             * @param {!proto.stream.HeartbeatReq} msg The msg instance to transform.
             * @return {!Object}
             * @suppress {unusedLocalVariables} f is only used for nested messages
             */
            proto.stream.HeartbeatReq.toObject = function (includeInstance, msg) {
                var f, obj = {
                    gameid: jspb.Message.getFieldWithDefault(msg, 1, 0),
                    roomid: jspb.Message.getFieldWithDefault(msg, 2, "0")
                };

                if (includeInstance) {
                    obj.$jspbMessageInstance = msg;
                }
                return obj;
            };
        }


        /**
         * Deserializes binary data (in protobuf wire format).
         * @param {jspb.ByteSource} bytes The bytes to deserialize.
         * @return {!proto.stream.HeartbeatReq}
         */
        proto.stream.HeartbeatReq.deserializeBinary = function (bytes) {
            var reader = new jspb.BinaryReader(bytes);
            var msg = new proto.stream.HeartbeatReq;
            return proto.stream.HeartbeatReq.deserializeBinaryFromReader(msg, reader);
        };


        /**
         * Deserializes binary data (in protobuf wire format) from the
         * given reader into the given message object.
         * @param {!proto.stream.HeartbeatReq} msg The message object to deserialize into.
         * @param {!jspb.BinaryReader} reader The BinaryReader to use.
         * @return {!proto.stream.HeartbeatReq}
         */
        proto.stream.HeartbeatReq.deserializeBinaryFromReader = function (msg, reader) {
            while (reader.nextField()) {
                if (reader.isEndGroup()) {
                    break;
                }
                var field = reader.getFieldNumber();
                switch (field) {
                case 1:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setGameid(value);
                    break;
                case 2:
                    var value = /** @type {string} */ (reader.readUint64String());
                    msg.setRoomid(value);
                    break;
                default:
                    reader.skipField();
                    break;
                }
            }
            return msg;
        };


        /**
         * Serializes the message to binary data (in protobuf wire format).
         * @return {!Uint8Array}
         */
        proto.stream.HeartbeatReq.prototype.serializeBinary = function () {
            var writer = new jspb.BinaryWriter();
            proto.stream.HeartbeatReq.serializeBinaryToWriter(this, writer);
            return writer.getResultBuffer();
        };


        /**
         * Serializes the given message to binary data (in protobuf wire
         * format), writing to the given BinaryWriter.
         * @param {!proto.stream.HeartbeatReq} message
         * @param {!jspb.BinaryWriter} writer
         * @suppress {unusedLocalVariables} f is only used for nested messages
         */
        proto.stream.HeartbeatReq.serializeBinaryToWriter = function (message, writer) {
            var f = undefined;
            f = message.getGameid();
            if (f !== 0) {
                writer.writeUint32(
                    1,
                    f
                );
            }
            f = message.getRoomid();
            if (parseInt(f, 10) !== 0) {
                writer.writeUint64String(
                    2,
                    f
                );
            }
        };


        /**
         * optional uint32 gameID = 1;
         * @return {number}
         */
        proto.stream.HeartbeatReq.prototype.getGameid = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
        };


        /** @param {number} value */
        proto.stream.HeartbeatReq.prototype.setGameid = function (value) {
            jspb.Message.setProto3IntField(this, 1, value);
        };


        /**
         * optional uint64 roomID = 2;
         * @return {string}
         */
        proto.stream.HeartbeatReq.prototype.getRoomid = function () {
            return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, "0"));
        };


        /** @param {string} value */
        proto.stream.HeartbeatReq.prototype.setRoomid = function (value) {
            jspb.Message.setProto3StringIntField(this, 2, value);
        };


        /**
         * Generated by JsPbCodeGenerator.
         * @param {Array=} opt_data Optional initial data array, typically from a
         * server response, or constructed directly in Javascript. The array is used
         * in place and becomes part of the constructed object. It is not cloned.
         * If no data is provided, the constructed object will be empty, but still
         * valid.
         * @extends {jspb.Message}
         * @constructor
         */
        proto.stream.HeartbeatRsp = function (opt_data) {
            jspb.Message.initialize(this, opt_data, 0, -1, null, null);
        };
        goog.inherits(proto.stream.HeartbeatRsp, jspb.Message);
        if (goog.DEBUG && !COMPILED) {
            proto.stream.HeartbeatRsp.displayName = "proto.stream.HeartbeatRsp";
        }


        if (jspb.Message.GENERATE_TO_OBJECT) {
            /**
             * Creates an object representation of this proto suitable for use in Soy templates.
             * Field names that are reserved in JavaScript and will be renamed to pb_name.
             * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
             * For the list of reserved names please see:
             *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
             * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
             *     for transitional soy proto support: http://goto/soy-param-migration
             * @return {!Object}
             */
            proto.stream.HeartbeatRsp.prototype.toObject = function (opt_includeInstance) {
                return proto.stream.HeartbeatRsp.toObject(opt_includeInstance, this);
            };


            /**
             * Static version of the {@see toObject} method.
             * @param {boolean|undefined} includeInstance Whether to include the JSPB
             *     instance for transitional soy proto support:
             *     http://goto/soy-param-migration
             * @param {!proto.stream.HeartbeatRsp} msg The msg instance to transform.
             * @return {!Object}
             * @suppress {unusedLocalVariables} f is only used for nested messages
             */
            proto.stream.HeartbeatRsp.toObject = function (includeInstance, msg) {
                var f, obj = {
                    gameid: jspb.Message.getFieldWithDefault(msg, 1, 0),
                    gsexist: jspb.Message.getFieldWithDefault(msg, 2, 0)
                };

                if (includeInstance) {
                    obj.$jspbMessageInstance = msg;
                }
                return obj;
            };
        }


        /**
         * Deserializes binary data (in protobuf wire format).
         * @param {jspb.ByteSource} bytes The bytes to deserialize.
         * @return {!proto.stream.HeartbeatRsp}
         */
        proto.stream.HeartbeatRsp.deserializeBinary = function (bytes) {
            var reader = new jspb.BinaryReader(bytes);
            var msg = new proto.stream.HeartbeatRsp;
            return proto.stream.HeartbeatRsp.deserializeBinaryFromReader(msg, reader);
        };


        /**
         * Deserializes binary data (in protobuf wire format) from the
         * given reader into the given message object.
         * @param {!proto.stream.HeartbeatRsp} msg The message object to deserialize into.
         * @param {!jspb.BinaryReader} reader The BinaryReader to use.
         * @return {!proto.stream.HeartbeatRsp}
         */
        proto.stream.HeartbeatRsp.deserializeBinaryFromReader = function (msg, reader) {
            while (reader.nextField()) {
                if (reader.isEndGroup()) {
                    break;
                }
                var field = reader.getFieldNumber();
                switch (field) {
                case 1:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setGameid(value);
                    break;
                case 2:
                    var value = /** @type {number} */ (reader.readInt32());
                    msg.setGsexist(value);
                    break;
                default:
                    reader.skipField();
                    break;
                }
            }
            return msg;
        };


        /**
         * Serializes the message to binary data (in protobuf wire format).
         * @return {!Uint8Array}
         */
        proto.stream.HeartbeatRsp.prototype.serializeBinary = function () {
            var writer = new jspb.BinaryWriter();
            proto.stream.HeartbeatRsp.serializeBinaryToWriter(this, writer);
            return writer.getResultBuffer();
        };


        /**
         * Serializes the given message to binary data (in protobuf wire
         * format), writing to the given BinaryWriter.
         * @param {!proto.stream.HeartbeatRsp} message
         * @param {!jspb.BinaryWriter} writer
         * @suppress {unusedLocalVariables} f is only used for nested messages
         */
        proto.stream.HeartbeatRsp.serializeBinaryToWriter = function (message, writer) {
            var f = undefined;
            f = message.getGameid();
            if (f !== 0) {
                writer.writeUint32(
                    1,
                    f
                );
            }
            f = message.getGsexist();
            if (f !== 0) {
                writer.writeInt32(
                    2,
                    f
                );
            }
        };


        /**
         * optional uint32 gameID = 1;
         * @return {number}
         */
        proto.stream.HeartbeatRsp.prototype.getGameid = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
        };


        /** @param {number} value */
        proto.stream.HeartbeatRsp.prototype.setGameid = function (value) {
            jspb.Message.setProto3IntField(this, 1, value);
        };


        /**
         * optional int32 gsExist = 2;
         * @return {number}
         */
        proto.stream.HeartbeatRsp.prototype.getGsexist = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
        };


        /** @param {number} value */
        proto.stream.HeartbeatRsp.prototype.setGsexist = function (value) {
            jspb.Message.setProto3IntField(this, 2, value);
        };


        /**
         * Generated by JsPbCodeGenerator.
         * @param {Array=} opt_data Optional initial data array, typically from a
         * server response, or constructed directly in Javascript. The array is used
         * in place and becomes part of the constructed object. It is not cloned.
         * If no data is provided, the constructed object will be empty, but still
         * valid.
         * @extends {jspb.Message}
         * @constructor
         */
        proto.stream.DisconnectReq = function (opt_data) {
            jspb.Message.initialize(this, opt_data, 0, -1, null, null);
        };
        goog.inherits(proto.stream.DisconnectReq, jspb.Message);
        if (goog.DEBUG && !COMPILED) {
            proto.stream.DisconnectReq.displayName = "proto.stream.DisconnectReq";
        }


        if (jspb.Message.GENERATE_TO_OBJECT) {
            /**
             * Creates an object representation of this proto suitable for use in Soy templates.
             * Field names that are reserved in JavaScript and will be renamed to pb_name.
             * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
             * For the list of reserved names please see:
             *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
             * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
             *     for transitional soy proto support: http://goto/soy-param-migration
             * @return {!Object}
             */
            proto.stream.DisconnectReq.prototype.toObject = function (opt_includeInstance) {
                return proto.stream.DisconnectReq.toObject(opt_includeInstance, this);
            };


            /**
             * Static version of the {@see toObject} method.
             * @param {boolean|undefined} includeInstance Whether to include the JSPB
             *     instance for transitional soy proto support:
             *     http://goto/soy-param-migration
             * @param {!proto.stream.DisconnectReq} msg The msg instance to transform.
             * @return {!Object}
             * @suppress {unusedLocalVariables} f is only used for nested messages
             */
            proto.stream.DisconnectReq.toObject = function (includeInstance, msg) {
                var f, obj = {
                    userid: jspb.Message.getFieldWithDefault(msg, 1, 0),
                    gameid: jspb.Message.getFieldWithDefault(msg, 2, 0),
                    roomid: jspb.Message.getFieldWithDefault(msg, 3, "0")
                };

                if (includeInstance) {
                    obj.$jspbMessageInstance = msg;
                }
                return obj;
            };
        }


        /**
         * Deserializes binary data (in protobuf wire format).
         * @param {jspb.ByteSource} bytes The bytes to deserialize.
         * @return {!proto.stream.DisconnectReq}
         */
        proto.stream.DisconnectReq.deserializeBinary = function (bytes) {
            var reader = new jspb.BinaryReader(bytes);
            var msg = new proto.stream.DisconnectReq;
            return proto.stream.DisconnectReq.deserializeBinaryFromReader(msg, reader);
        };


        /**
         * Deserializes binary data (in protobuf wire format) from the
         * given reader into the given message object.
         * @param {!proto.stream.DisconnectReq} msg The message object to deserialize into.
         * @param {!jspb.BinaryReader} reader The BinaryReader to use.
         * @return {!proto.stream.DisconnectReq}
         */
        proto.stream.DisconnectReq.deserializeBinaryFromReader = function (msg, reader) {
            while (reader.nextField()) {
                if (reader.isEndGroup()) {
                    break;
                }
                var field = reader.getFieldNumber();
                switch (field) {
                case 1:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setUserid(value);
                    break;
                case 2:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setGameid(value);
                    break;
                case 3:
                    var value = /** @type {string} */ (reader.readUint64String());
                    msg.setRoomid(value);
                    break;
                default:
                    reader.skipField();
                    break;
                }
            }
            return msg;
        };


        /**
         * Serializes the message to binary data (in protobuf wire format).
         * @return {!Uint8Array}
         */
        proto.stream.DisconnectReq.prototype.serializeBinary = function () {
            var writer = new jspb.BinaryWriter();
            proto.stream.DisconnectReq.serializeBinaryToWriter(this, writer);
            return writer.getResultBuffer();
        };


        /**
         * Serializes the given message to binary data (in protobuf wire
         * format), writing to the given BinaryWriter.
         * @param {!proto.stream.DisconnectReq} message
         * @param {!jspb.BinaryWriter} writer
         * @suppress {unusedLocalVariables} f is only used for nested messages
         */
        proto.stream.DisconnectReq.serializeBinaryToWriter = function (message, writer) {
            var f = undefined;
            f = message.getUserid();
            if (f !== 0) {
                writer.writeUint32(
                    1,
                    f
                );
            }
            f = message.getGameid();
            if (f !== 0) {
                writer.writeUint32(
                    2,
                    f
                );
            }
            f = message.getRoomid();
            if (parseInt(f, 10) !== 0) {
                writer.writeUint64String(
                    3,
                    f
                );
            }
        };


        /**
         * optional uint32 userID = 1;
         * @return {number}
         */
        proto.stream.DisconnectReq.prototype.getUserid = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
        };


        /** @param {number} value */
        proto.stream.DisconnectReq.prototype.setUserid = function (value) {
            jspb.Message.setProto3IntField(this, 1, value);
        };


        /**
         * optional uint32 gameID = 2;
         * @return {number}
         */
        proto.stream.DisconnectReq.prototype.getGameid = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
        };


        /** @param {number} value */
        proto.stream.DisconnectReq.prototype.setGameid = function (value) {
            jspb.Message.setProto3IntField(this, 2, value);
        };


        /**
         * optional uint64 roomId = 3;
         * @return {string}
         */
        proto.stream.DisconnectReq.prototype.getRoomid = function () {
            return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, "0"));
        };


        /** @param {string} value */
        proto.stream.DisconnectReq.prototype.setRoomid = function (value) {
            jspb.Message.setProto3StringIntField(this, 3, value);
        };


        /**
         * Generated by JsPbCodeGenerator.
         * @param {Array=} opt_data Optional initial data array, typically from a
         * server response, or constructed directly in Javascript. The array is used
         * in place and becomes part of the constructed object. It is not cloned.
         * If no data is provided, the constructed object will be empty, but still
         * valid.
         * @extends {jspb.Message}
         * @constructor
         */
        proto.stream.DisconnectRsp = function (opt_data) {
            jspb.Message.initialize(this, opt_data, 0, -1, null, null);
        };
        goog.inherits(proto.stream.DisconnectRsp, jspb.Message);
        if (goog.DEBUG && !COMPILED) {
            proto.stream.DisconnectRsp.displayName = "proto.stream.DisconnectRsp";
        }


        if (jspb.Message.GENERATE_TO_OBJECT) {
            /**
             * Creates an object representation of this proto suitable for use in Soy templates.
             * Field names that are reserved in JavaScript and will be renamed to pb_name.
             * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
             * For the list of reserved names please see:
             *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
             * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
             *     for transitional soy proto support: http://goto/soy-param-migration
             * @return {!Object}
             */
            proto.stream.DisconnectRsp.prototype.toObject = function (opt_includeInstance) {
                return proto.stream.DisconnectRsp.toObject(opt_includeInstance, this);
            };


            /**
             * Static version of the {@see toObject} method.
             * @param {boolean|undefined} includeInstance Whether to include the JSPB
             *     instance for transitional soy proto support:
             *     http://goto/soy-param-migration
             * @param {!proto.stream.DisconnectRsp} msg The msg instance to transform.
             * @return {!Object}
             * @suppress {unusedLocalVariables} f is only used for nested messages
             */
            proto.stream.DisconnectRsp.toObject = function (includeInstance, msg) {
                var f, obj = {
                    status: jspb.Message.getFieldWithDefault(msg, 1, 0)
                };

                if (includeInstance) {
                    obj.$jspbMessageInstance = msg;
                }
                return obj;
            };
        }


        /**
         * Deserializes binary data (in protobuf wire format).
         * @param {jspb.ByteSource} bytes The bytes to deserialize.
         * @return {!proto.stream.DisconnectRsp}
         */
        proto.stream.DisconnectRsp.deserializeBinary = function (bytes) {
            var reader = new jspb.BinaryReader(bytes);
            var msg = new proto.stream.DisconnectRsp;
            return proto.stream.DisconnectRsp.deserializeBinaryFromReader(msg, reader);
        };


        /**
         * Deserializes binary data (in protobuf wire format) from the
         * given reader into the given message object.
         * @param {!proto.stream.DisconnectRsp} msg The message object to deserialize into.
         * @param {!jspb.BinaryReader} reader The BinaryReader to use.
         * @return {!proto.stream.DisconnectRsp}
         */
        proto.stream.DisconnectRsp.deserializeBinaryFromReader = function (msg, reader) {
            while (reader.nextField()) {
                if (reader.isEndGroup()) {
                    break;
                }
                var field = reader.getFieldNumber();
                switch (field) {
                case 1:
                    var value = /** @type {!proto.stream.ErrorCode} */ (reader.readEnum());
                    msg.setStatus(value);
                    break;
                default:
                    reader.skipField();
                    break;
                }
            }
            return msg;
        };


        /**
         * Serializes the message to binary data (in protobuf wire format).
         * @return {!Uint8Array}
         */
        proto.stream.DisconnectRsp.prototype.serializeBinary = function () {
            var writer = new jspb.BinaryWriter();
            proto.stream.DisconnectRsp.serializeBinaryToWriter(this, writer);
            return writer.getResultBuffer();
        };


        /**
         * Serializes the given message to binary data (in protobuf wire
         * format), writing to the given BinaryWriter.
         * @param {!proto.stream.DisconnectRsp} message
         * @param {!jspb.BinaryWriter} writer
         * @suppress {unusedLocalVariables} f is only used for nested messages
         */
        proto.stream.DisconnectRsp.serializeBinaryToWriter = function (message, writer) {
            var f = undefined;
            f = message.getStatus();
            if (f !== 0.0) {
                writer.writeEnum(
                    1,
                    f
                );
            }
        };


        /**
         * optional ErrorCode status = 1;
         * @return {!proto.stream.ErrorCode}
         */
        proto.stream.DisconnectRsp.prototype.getStatus = function () {
            return /** @type {!proto.stream.ErrorCode} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
        };


        /** @param {!proto.stream.ErrorCode} value */
        proto.stream.DisconnectRsp.prototype.setStatus = function (value) {
            jspb.Message.setProto3EnumField(this, 1, value);
        };


        /**
         * Generated by JsPbCodeGenerator.
         * @param {Array=} opt_data Optional initial data array, typically from a
         * server response, or constructed directly in Javascript. The array is used
         * in place and becomes part of the constructed object. It is not cloned.
         * If no data is provided, the constructed object will be empty, but still
         * valid.
         * @extends {jspb.Message}
         * @constructor
         */
        proto.stream.LogoutRsp = function (opt_data) {
            jspb.Message.initialize(this, opt_data, 0, -1, null, null);
        };
        goog.inherits(proto.stream.LogoutRsp, jspb.Message);
        if (goog.DEBUG && !COMPILED) {
            proto.stream.LogoutRsp.displayName = "proto.stream.LogoutRsp";
        }


        if (jspb.Message.GENERATE_TO_OBJECT) {
            /**
             * Creates an object representation of this proto suitable for use in Soy templates.
             * Field names that are reserved in JavaScript and will be renamed to pb_name.
             * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
             * For the list of reserved names please see:
             *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
             * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
             *     for transitional soy proto support: http://goto/soy-param-migration
             * @return {!Object}
             */
            proto.stream.LogoutRsp.prototype.toObject = function (opt_includeInstance) {
                return proto.stream.LogoutRsp.toObject(opt_includeInstance, this);
            };


            /**
             * Static version of the {@see toObject} method.
             * @param {boolean|undefined} includeInstance Whether to include the JSPB
             *     instance for transitional soy proto support:
             *     http://goto/soy-param-migration
             * @param {!proto.stream.LogoutRsp} msg The msg instance to transform.
             * @return {!Object}
             * @suppress {unusedLocalVariables} f is only used for nested messages
             */
            proto.stream.LogoutRsp.toObject = function (includeInstance, msg) {
                var f, obj = {
                    status: jspb.Message.getFieldWithDefault(msg, 1, 0)
                };

                if (includeInstance) {
                    obj.$jspbMessageInstance = msg;
                }
                return obj;
            };
        }


        /**
         * Deserializes binary data (in protobuf wire format).
         * @param {jspb.ByteSource} bytes The bytes to deserialize.
         * @return {!proto.stream.LogoutRsp}
         */
        proto.stream.LogoutRsp.deserializeBinary = function (bytes) {
            var reader = new jspb.BinaryReader(bytes);
            var msg = new proto.stream.LogoutRsp;
            return proto.stream.LogoutRsp.deserializeBinaryFromReader(msg, reader);
        };


        /**
         * Deserializes binary data (in protobuf wire format) from the
         * given reader into the given message object.
         * @param {!proto.stream.LogoutRsp} msg The message object to deserialize into.
         * @param {!jspb.BinaryReader} reader The BinaryReader to use.
         * @return {!proto.stream.LogoutRsp}
         */
        proto.stream.LogoutRsp.deserializeBinaryFromReader = function (msg, reader) {
            while (reader.nextField()) {
                if (reader.isEndGroup()) {
                    break;
                }
                var field = reader.getFieldNumber();
                switch (field) {
                case 1:
                    var value = /** @type {!proto.stream.ErrorCode} */ (reader.readEnum());
                    msg.setStatus(value);
                    break;
                default:
                    reader.skipField();
                    break;
                }
            }
            return msg;
        };


        /**
         * Serializes the message to binary data (in protobuf wire format).
         * @return {!Uint8Array}
         */
        proto.stream.LogoutRsp.prototype.serializeBinary = function () {
            var writer = new jspb.BinaryWriter();
            proto.stream.LogoutRsp.serializeBinaryToWriter(this, writer);
            return writer.getResultBuffer();
        };


        /**
         * Serializes the given message to binary data (in protobuf wire
         * format), writing to the given BinaryWriter.
         * @param {!proto.stream.LogoutRsp} message
         * @param {!jspb.BinaryWriter} writer
         * @suppress {unusedLocalVariables} f is only used for nested messages
         */
        proto.stream.LogoutRsp.serializeBinaryToWriter = function (message, writer) {
            var f = undefined;
            f = message.getStatus();
            if (f !== 0.0) {
                writer.writeEnum(
                    1,
                    f
                );
            }
        };


        /**
         * optional ErrorCode status = 1;
         * @return {!proto.stream.ErrorCode}
         */
        proto.stream.LogoutRsp.prototype.getStatus = function () {
            return /** @type {!proto.stream.ErrorCode} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
        };


        /** @param {!proto.stream.ErrorCode} value */
        proto.stream.LogoutRsp.prototype.setStatus = function (value) {
            jspb.Message.setProto3EnumField(this, 1, value);
        };


        /**
         * Generated by JsPbCodeGenerator.
         * @param {Array=} opt_data Optional initial data array, typically from a
         * server response, or constructed directly in Javascript. The array is used
         * in place and becomes part of the constructed object. It is not cloned.
         * If no data is provided, the constructed object will be empty, but still
         * valid.
         * @extends {jspb.Message}
         * @constructor
         */
        proto.stream.keyValue = function (opt_data) {
            jspb.Message.initialize(this, opt_data, 0, -1, null, null);
        };
        goog.inherits(proto.stream.keyValue, jspb.Message);
        if (goog.DEBUG && !COMPILED) {
            proto.stream.keyValue.displayName = "proto.stream.keyValue";
        }


        if (jspb.Message.GENERATE_TO_OBJECT) {
            /**
             * Creates an object representation of this proto suitable for use in Soy templates.
             * Field names that are reserved in JavaScript and will be renamed to pb_name.
             * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
             * For the list of reserved names please see:
             *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
             * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
             *     for transitional soy proto support: http://goto/soy-param-migration
             * @return {!Object}
             */
            proto.stream.keyValue.prototype.toObject = function (opt_includeInstance) {
                return proto.stream.keyValue.toObject(opt_includeInstance, this);
            };


            /**
             * Static version of the {@see toObject} method.
             * @param {boolean|undefined} includeInstance Whether to include the JSPB
             *     instance for transitional soy proto support:
             *     http://goto/soy-param-migration
             * @param {!proto.stream.keyValue} msg The msg instance to transform.
             * @return {!Object}
             * @suppress {unusedLocalVariables} f is only used for nested messages
             */
            proto.stream.keyValue.toObject = function (includeInstance, msg) {
                var f, obj = {
                    key: jspb.Message.getFieldWithDefault(msg, 1, ""),
                    value: jspb.Message.getFieldWithDefault(msg, 2, "")
                };

                if (includeInstance) {
                    obj.$jspbMessageInstance = msg;
                }
                return obj;
            };
        }


        /**
         * Deserializes binary data (in protobuf wire format).
         * @param {jspb.ByteSource} bytes The bytes to deserialize.
         * @return {!proto.stream.keyValue}
         */
        proto.stream.keyValue.deserializeBinary = function (bytes) {
            var reader = new jspb.BinaryReader(bytes);
            var msg = new proto.stream.keyValue;
            return proto.stream.keyValue.deserializeBinaryFromReader(msg, reader);
        };


        /**
         * Deserializes binary data (in protobuf wire format) from the
         * given reader into the given message object.
         * @param {!proto.stream.keyValue} msg The message object to deserialize into.
         * @param {!jspb.BinaryReader} reader The BinaryReader to use.
         * @return {!proto.stream.keyValue}
         */
        proto.stream.keyValue.deserializeBinaryFromReader = function (msg, reader) {
            while (reader.nextField()) {
                if (reader.isEndGroup()) {
                    break;
                }
                var field = reader.getFieldNumber();
                switch (field) {
                case 1:
                    var value = /** @type {string} */ (reader.readString());
                    msg.setKey(value);
                    break;
                case 2:
                    var value = /** @type {string} */ (reader.readString());
                    msg.setValue(value);
                    break;
                default:
                    reader.skipField();
                    break;
                }
            }
            return msg;
        };


        /**
         * Serializes the message to binary data (in protobuf wire format).
         * @return {!Uint8Array}
         */
        proto.stream.keyValue.prototype.serializeBinary = function () {
            var writer = new jspb.BinaryWriter();
            proto.stream.keyValue.serializeBinaryToWriter(this, writer);
            return writer.getResultBuffer();
        };


        /**
         * Serializes the given message to binary data (in protobuf wire
         * format), writing to the given BinaryWriter.
         * @param {!proto.stream.keyValue} message
         * @param {!jspb.BinaryWriter} writer
         * @suppress {unusedLocalVariables} f is only used for nested messages
         */
        proto.stream.keyValue.serializeBinaryToWriter = function (message, writer) {
            var f = undefined;
            f = message.getKey();
            if (f.length > 0) {
                writer.writeString(
                    1,
                    f
                );
            }
            f = message.getValue();
            if (f.length > 0) {
                writer.writeString(
                    2,
                    f
                );
            }
        };


        /**
         * optional string key = 1;
         * @return {string}
         */
        proto.stream.keyValue.prototype.getKey = function () {
            return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
        };


        /** @param {string} value */
        proto.stream.keyValue.prototype.setKey = function (value) {
            jspb.Message.setProto3StringField(this, 1, value);
        };


        /**
         * optional string value = 2;
         * @return {string}
         */
        proto.stream.keyValue.prototype.getValue = function () {
            return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
        };


        /** @param {string} value */
        proto.stream.keyValue.prototype.setValue = function (value) {
            jspb.Message.setProto3StringField(this, 2, value);
        };


        /**
         * Generated by JsPbCodeGenerator.
         * @param {Array=} opt_data Optional initial data array, typically from a
         * server response, or constructed directly in Javascript. The array is used
         * in place and becomes part of the constructed object. It is not cloned.
         * If no data is provided, the constructed object will be empty, but still
         * valid.
         * @extends {jspb.Message}
         * @constructor
         */
        proto.stream.PlayerInfo = function (opt_data) {
            jspb.Message.initialize(this, opt_data, 0, -1, null, null);
        };
        goog.inherits(proto.stream.PlayerInfo, jspb.Message);
        if (goog.DEBUG && !COMPILED) {
            proto.stream.PlayerInfo.displayName = "proto.stream.PlayerInfo";
        }


        if (jspb.Message.GENERATE_TO_OBJECT) {
            /**
             * Creates an object representation of this proto suitable for use in Soy templates.
             * Field names that are reserved in JavaScript and will be renamed to pb_name.
             * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
             * For the list of reserved names please see:
             *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
             * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
             *     for transitional soy proto support: http://goto/soy-param-migration
             * @return {!Object}
             */
            proto.stream.PlayerInfo.prototype.toObject = function (opt_includeInstance) {
                return proto.stream.PlayerInfo.toObject(opt_includeInstance, this);
            };


            /**
             * Static version of the {@see toObject} method.
             * @param {boolean|undefined} includeInstance Whether to include the JSPB
             *     instance for transitional soy proto support:
             *     http://goto/soy-param-migration
             * @param {!proto.stream.PlayerInfo} msg The msg instance to transform.
             * @return {!Object}
             * @suppress {unusedLocalVariables} f is only used for nested messages
             */
            proto.stream.PlayerInfo.toObject = function (includeInstance, msg) {
                var f, obj = {
                    userid: jspb.Message.getFieldWithDefault(msg, 1, 0),
                    userprofile: msg.getUserprofile_asB64()
                };

                if (includeInstance) {
                    obj.$jspbMessageInstance = msg;
                }
                return obj;
            };
        }


        /**
         * Deserializes binary data (in protobuf wire format).
         * @param {jspb.ByteSource} bytes The bytes to deserialize.
         * @return {!proto.stream.PlayerInfo}
         */
        proto.stream.PlayerInfo.deserializeBinary = function (bytes) {
            var reader = new jspb.BinaryReader(bytes);
            var msg = new proto.stream.PlayerInfo;
            return proto.stream.PlayerInfo.deserializeBinaryFromReader(msg, reader);
        };


        /**
         * Deserializes binary data (in protobuf wire format) from the
         * given reader into the given message object.
         * @param {!proto.stream.PlayerInfo} msg The message object to deserialize into.
         * @param {!jspb.BinaryReader} reader The BinaryReader to use.
         * @return {!proto.stream.PlayerInfo}
         */
        proto.stream.PlayerInfo.deserializeBinaryFromReader = function (msg, reader) {
            while (reader.nextField()) {
                if (reader.isEndGroup()) {
                    break;
                }
                var field = reader.getFieldNumber();
                switch (field) {
                case 1:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setUserid(value);
                    break;
                case 2:
                    var value = /** @type {!Uint8Array} */ (reader.readBytes());
                    msg.setUserprofile(value);
                    break;
                default:
                    reader.skipField();
                    break;
                }
            }
            return msg;
        };


        /**
         * Serializes the message to binary data (in protobuf wire format).
         * @return {!Uint8Array}
         */
        proto.stream.PlayerInfo.prototype.serializeBinary = function () {
            var writer = new jspb.BinaryWriter();
            proto.stream.PlayerInfo.serializeBinaryToWriter(this, writer);
            return writer.getResultBuffer();
        };


        /**
         * Serializes the given message to binary data (in protobuf wire
         * format), writing to the given BinaryWriter.
         * @param {!proto.stream.PlayerInfo} message
         * @param {!jspb.BinaryWriter} writer
         * @suppress {unusedLocalVariables} f is only used for nested messages
         */
        proto.stream.PlayerInfo.serializeBinaryToWriter = function (message, writer) {
            var f = undefined;
            f = message.getUserid();
            if (f !== 0) {
                writer.writeUint32(
                    1,
                    f
                );
            }
            f = message.getUserprofile_asU8();
            if (f.length > 0) {
                writer.writeBytes(
                    2,
                    f
                );
            }
        };


        /**
         * optional uint32 userID = 1;
         * @return {number}
         */
        proto.stream.PlayerInfo.prototype.getUserid = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
        };


        /** @param {number} value */
        proto.stream.PlayerInfo.prototype.setUserid = function (value) {
            jspb.Message.setProto3IntField(this, 1, value);
        };


        /**
         * optional bytes userProfile = 2;
         * @return {!(string|Uint8Array)}
         */
        proto.stream.PlayerInfo.prototype.getUserprofile = function () {
            return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
        };


        /**
         * optional bytes userProfile = 2;
         * This is a type-conversion wrapper around `getUserprofile()`
         * @return {string}
         */
        proto.stream.PlayerInfo.prototype.getUserprofile_asB64 = function () {
            return /** @type {string} */ (jspb.Message.bytesAsB64(
                this.getUserprofile()));
        };


        /**
         * optional bytes userProfile = 2;
         * Note that Uint8Array is not supported on all browsers.
         * @see http://caniuse.com/Uint8Array
         * This is a type-conversion wrapper around `getUserprofile()`
         * @return {!Uint8Array}
         */
        proto.stream.PlayerInfo.prototype.getUserprofile_asU8 = function () {
            return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
                this.getUserprofile()));
        };


        /** @param {!(string|Uint8Array)} value */
        proto.stream.PlayerInfo.prototype.setUserprofile = function (value) {
            jspb.Message.setProto3BytesField(this, 2, value);
        };


        /**
         * Generated by JsPbCodeGenerator.
         * @param {Array=} opt_data Optional initial data array, typically from a
         * server response, or constructed directly in Javascript. The array is used
         * in place and becomes part of the constructed object. It is not cloned.
         * If no data is provided, the constructed object will be empty, but still
         * valid.
         * @extends {jspb.Message}
         * @constructor
         */
        proto.stream.BookInfo = function (opt_data) {
            jspb.Message.initialize(this, opt_data, 0, -1, null, null);
        };
        goog.inherits(proto.stream.BookInfo, jspb.Message);
        if (goog.DEBUG && !COMPILED) {
            proto.stream.BookInfo.displayName = "proto.stream.BookInfo";
        }


        if (jspb.Message.GENERATE_TO_OBJECT) {
            /**
             * Creates an object representation of this proto suitable for use in Soy templates.
             * Field names that are reserved in JavaScript and will be renamed to pb_name.
             * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
             * For the list of reserved names please see:
             *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
             * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
             *     for transitional soy proto support: http://goto/soy-param-migration
             * @return {!Object}
             */
            proto.stream.BookInfo.prototype.toObject = function (opt_includeInstance) {
                return proto.stream.BookInfo.toObject(opt_includeInstance, this);
            };


            /**
             * Static version of the {@see toObject} method.
             * @param {boolean|undefined} includeInstance Whether to include the JSPB
             *     instance for transitional soy proto support:
             *     http://goto/soy-param-migration
             * @param {!proto.stream.BookInfo} msg The msg instance to transform.
             * @return {!Object}
             * @suppress {unusedLocalVariables} f is only used for nested messages
             */
            proto.stream.BookInfo.toObject = function (includeInstance, msg) {
                var f, obj = {
                    bookid: jspb.Message.getFieldWithDefault(msg, 1, ""),
                    bookkey: jspb.Message.getFieldWithDefault(msg, 2, ""),
                    hoteladdr: jspb.Message.getFieldWithDefault(msg, 3, ""),
                    wssproxy: jspb.Message.getFieldWithDefault(msg, 4, "")
                };

                if (includeInstance) {
                    obj.$jspbMessageInstance = msg;
                }
                return obj;
            };
        }


        /**
         * Deserializes binary data (in protobuf wire format).
         * @param {jspb.ByteSource} bytes The bytes to deserialize.
         * @return {!proto.stream.BookInfo}
         */
        proto.stream.BookInfo.deserializeBinary = function (bytes) {
            var reader = new jspb.BinaryReader(bytes);
            var msg = new proto.stream.BookInfo;
            return proto.stream.BookInfo.deserializeBinaryFromReader(msg, reader);
        };


        /**
         * Deserializes binary data (in protobuf wire format) from the
         * given reader into the given message object.
         * @param {!proto.stream.BookInfo} msg The message object to deserialize into.
         * @param {!jspb.BinaryReader} reader The BinaryReader to use.
         * @return {!proto.stream.BookInfo}
         */
        proto.stream.BookInfo.deserializeBinaryFromReader = function (msg, reader) {
            while (reader.nextField()) {
                if (reader.isEndGroup()) {
                    break;
                }
                var field = reader.getFieldNumber();
                switch (field) {
                case 1:
                    var value = /** @type {string} */ (reader.readString());
                    msg.setBookid(value);
                    break;
                case 2:
                    var value = /** @type {string} */ (reader.readString());
                    msg.setBookkey(value);
                    break;
                case 3:
                    var value = /** @type {string} */ (reader.readString());
                    msg.setHoteladdr(value);
                    break;
                case 4:
                    var value = /** @type {string} */ (reader.readString());
                    msg.setWssproxy(value);
                    break;
                default:
                    reader.skipField();
                    break;
                }
            }
            return msg;
        };


        /**
         * Serializes the message to binary data (in protobuf wire format).
         * @return {!Uint8Array}
         */
        proto.stream.BookInfo.prototype.serializeBinary = function () {
            var writer = new jspb.BinaryWriter();
            proto.stream.BookInfo.serializeBinaryToWriter(this, writer);
            return writer.getResultBuffer();
        };


        /**
         * Serializes the given message to binary data (in protobuf wire
         * format), writing to the given BinaryWriter.
         * @param {!proto.stream.BookInfo} message
         * @param {!jspb.BinaryWriter} writer
         * @suppress {unusedLocalVariables} f is only used for nested messages
         */
        proto.stream.BookInfo.serializeBinaryToWriter = function (message, writer) {
            var f = undefined;
            f = message.getBookid();
            if (f.length > 0) {
                writer.writeString(
                    1,
                    f
                );
            }
            f = message.getBookkey();
            if (f.length > 0) {
                writer.writeString(
                    2,
                    f
                );
            }
            f = message.getHoteladdr();
            if (f.length > 0) {
                writer.writeString(
                    3,
                    f
                );
            }
            f = message.getWssproxy();
            if (f.length > 0) {
                writer.writeString(
                    4,
                    f
                );
            }
        };


        /**
         * optional string bookID = 1;
         * @return {string}
         */
        proto.stream.BookInfo.prototype.getBookid = function () {
            return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
        };


        /** @param {string} value */
        proto.stream.BookInfo.prototype.setBookid = function (value) {
            jspb.Message.setProto3StringField(this, 1, value);
        };


        /**
         * optional string bookKey = 2;
         * @return {string}
         */
        proto.stream.BookInfo.prototype.getBookkey = function () {
            return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
        };


        /** @param {string} value */
        proto.stream.BookInfo.prototype.setBookkey = function (value) {
            jspb.Message.setProto3StringField(this, 2, value);
        };


        /**
         * optional string hotelAddr = 3;
         * @return {string}
         */
        proto.stream.BookInfo.prototype.getHoteladdr = function () {
            return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
        };


        /** @param {string} value */
        proto.stream.BookInfo.prototype.setHoteladdr = function (value) {
            jspb.Message.setProto3StringField(this, 3, value);
        };


        /**
         * optional string wssProxy = 4;
         * @return {string}
         */
        proto.stream.BookInfo.prototype.getWssproxy = function () {
            return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
        };


        /** @param {string} value */
        proto.stream.BookInfo.prototype.setWssproxy = function (value) {
            jspb.Message.setProto3StringField(this, 4, value);
        };


        /**
         * Generated by JsPbCodeGenerator.
         * @param {Array=} opt_data Optional initial data array, typically from a
         * server response, or constructed directly in Javascript. The array is used
         * in place and becomes part of the constructed object. It is not cloned.
         * If no data is provided, the constructed object will be empty, but still
         * valid.
         * @extends {jspb.Message}
         * @constructor
         */
        proto.stream.RoomInfo = function (opt_data) {
            jspb.Message.initialize(this, opt_data, 0, -1, null, null);
        };
        goog.inherits(proto.stream.RoomInfo, jspb.Message);
        if (goog.DEBUG && !COMPILED) {
            proto.stream.RoomInfo.displayName = "proto.stream.RoomInfo";
        }


        if (jspb.Message.GENERATE_TO_OBJECT) {
            /**
             * Creates an object representation of this proto suitable for use in Soy templates.
             * Field names that are reserved in JavaScript and will be renamed to pb_name.
             * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
             * For the list of reserved names please see:
             *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
             * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
             *     for transitional soy proto support: http://goto/soy-param-migration
             * @return {!Object}
             */
            proto.stream.RoomInfo.prototype.toObject = function (opt_includeInstance) {
                return proto.stream.RoomInfo.toObject(opt_includeInstance, this);
            };


            /**
             * Static version of the {@see toObject} method.
             * @param {boolean|undefined} includeInstance Whether to include the JSPB
             *     instance for transitional soy proto support:
             *     http://goto/soy-param-migration
             * @param {!proto.stream.RoomInfo} msg The msg instance to transform.
             * @return {!Object}
             * @suppress {unusedLocalVariables} f is only used for nested messages
             */
            proto.stream.RoomInfo.toObject = function (includeInstance, msg) {
                var f, obj = {
                    roomid: jspb.Message.getFieldWithDefault(msg, 1, "0"),
                    roomname: jspb.Message.getFieldWithDefault(msg, 2, ""),
                    maxplayer: jspb.Message.getFieldWithDefault(msg, 3, 0),
                    mode: jspb.Message.getFieldWithDefault(msg, 4, 0),
                    canwatch: jspb.Message.getFieldWithDefault(msg, 5, 0),
                    visibility: jspb.Message.getFieldWithDefault(msg, 6, 0),
                    roomproperty: msg.getRoomproperty_asB64(),
                    owner: jspb.Message.getFieldWithDefault(msg, 8, 0)
                };

                if (includeInstance) {
                    obj.$jspbMessageInstance = msg;
                }
                return obj;
            };
        }


        /**
         * Deserializes binary data (in protobuf wire format).
         * @param {jspb.ByteSource} bytes The bytes to deserialize.
         * @return {!proto.stream.RoomInfo}
         */
        proto.stream.RoomInfo.deserializeBinary = function (bytes) {
            var reader = new jspb.BinaryReader(bytes);
            var msg = new proto.stream.RoomInfo;
            return proto.stream.RoomInfo.deserializeBinaryFromReader(msg, reader);
        };


        /**
         * Deserializes binary data (in protobuf wire format) from the
         * given reader into the given message object.
         * @param {!proto.stream.RoomInfo} msg The message object to deserialize into.
         * @param {!jspb.BinaryReader} reader The BinaryReader to use.
         * @return {!proto.stream.RoomInfo}
         */
        proto.stream.RoomInfo.deserializeBinaryFromReader = function (msg, reader) {
            while (reader.nextField()) {
                if (reader.isEndGroup()) {
                    break;
                }
                var field = reader.getFieldNumber();
                switch (field) {
                case 1:
                    var value = /** @type {string} */ (reader.readUint64String());
                    msg.setRoomid(value);
                    break;
                case 2:
                    var value = /** @type {string} */ (reader.readString());
                    msg.setRoomname(value);
                    break;
                case 3:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setMaxplayer(value);
                    break;
                case 4:
                    var value = /** @type {number} */ (reader.readInt32());
                    msg.setMode(value);
                    break;
                case 5:
                    var value = /** @type {number} */ (reader.readInt32());
                    msg.setCanwatch(value);
                    break;
                case 6:
                    var value = /** @type {number} */ (reader.readInt32());
                    msg.setVisibility(value);
                    break;
                case 7:
                    var value = /** @type {!Uint8Array} */ (reader.readBytes());
                    msg.setRoomproperty(value);
                    break;
                case 8:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setOwner(value);
                    break;
                default:
                    reader.skipField();
                    break;
                }
            }
            return msg;
        };


        /**
         * Serializes the message to binary data (in protobuf wire format).
         * @return {!Uint8Array}
         */
        proto.stream.RoomInfo.prototype.serializeBinary = function () {
            var writer = new jspb.BinaryWriter();
            proto.stream.RoomInfo.serializeBinaryToWriter(this, writer);
            return writer.getResultBuffer();
        };


        /**
         * Serializes the given message to binary data (in protobuf wire
         * format), writing to the given BinaryWriter.
         * @param {!proto.stream.RoomInfo} message
         * @param {!jspb.BinaryWriter} writer
         * @suppress {unusedLocalVariables} f is only used for nested messages
         */
        proto.stream.RoomInfo.serializeBinaryToWriter = function (message, writer) {
            var f = undefined;
            f = message.getRoomid();
            if (parseInt(f, 10) !== 0) {
                writer.writeUint64String(
                    1,
                    f
                );
            }
            f = message.getRoomname();
            if (f.length > 0) {
                writer.writeString(
                    2,
                    f
                );
            }
            f = message.getMaxplayer();
            if (f !== 0) {
                writer.writeUint32(
                    3,
                    f
                );
            }
            f = message.getMode();
            if (f !== 0) {
                writer.writeInt32(
                    4,
                    f
                );
            }
            f = message.getCanwatch();
            if (f !== 0) {
                writer.writeInt32(
                    5,
                    f
                );
            }
            f = message.getVisibility();
            if (f !== 0) {
                writer.writeInt32(
                    6,
                    f
                );
            }
            f = message.getRoomproperty_asU8();
            if (f.length > 0) {
                writer.writeBytes(
                    7,
                    f
                );
            }
            f = message.getOwner();
            if (f !== 0) {
                writer.writeUint32(
                    8,
                    f
                );
            }
        };


        /**
         * optional uint64 roomID = 1;
         * @return {string}
         */
        proto.stream.RoomInfo.prototype.getRoomid = function () {
            return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, "0"));
        };


        /** @param {string} value */
        proto.stream.RoomInfo.prototype.setRoomid = function (value) {
            jspb.Message.setProto3StringIntField(this, 1, value);
        };


        /**
         * optional string roomName = 2;
         * @return {string}
         */
        proto.stream.RoomInfo.prototype.getRoomname = function () {
            return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
        };


        /** @param {string} value */
        proto.stream.RoomInfo.prototype.setRoomname = function (value) {
            jspb.Message.setProto3StringField(this, 2, value);
        };


        /**
         * optional uint32 maxPlayer = 3;
         * @return {number}
         */
        proto.stream.RoomInfo.prototype.getMaxplayer = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
        };


        /** @param {number} value */
        proto.stream.RoomInfo.prototype.setMaxplayer = function (value) {
            jspb.Message.setProto3IntField(this, 3, value);
        };


        /**
         * optional int32 mode = 4;
         * @return {number}
         */
        proto.stream.RoomInfo.prototype.getMode = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
        };


        /** @param {number} value */
        proto.stream.RoomInfo.prototype.setMode = function (value) {
            jspb.Message.setProto3IntField(this, 4, value);
        };


        /**
         * optional int32 canWatch = 5;
         * @return {number}
         */
        proto.stream.RoomInfo.prototype.getCanwatch = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
        };


        /** @param {number} value */
        proto.stream.RoomInfo.prototype.setCanwatch = function (value) {
            jspb.Message.setProto3IntField(this, 5, value);
        };


        /**
         * optional int32 visibility = 6;
         * @return {number}
         */
        proto.stream.RoomInfo.prototype.getVisibility = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
        };


        /** @param {number} value */
        proto.stream.RoomInfo.prototype.setVisibility = function (value) {
            jspb.Message.setProto3IntField(this, 6, value);
        };


        /**
         * optional bytes roomProperty = 7;
         * @return {!(string|Uint8Array)}
         */
        proto.stream.RoomInfo.prototype.getRoomproperty = function () {
            return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 7, ""));
        };


        /**
         * optional bytes roomProperty = 7;
         * This is a type-conversion wrapper around `getRoomproperty()`
         * @return {string}
         */
        proto.stream.RoomInfo.prototype.getRoomproperty_asB64 = function () {
            return /** @type {string} */ (jspb.Message.bytesAsB64(
                this.getRoomproperty()));
        };


        /**
         * optional bytes roomProperty = 7;
         * Note that Uint8Array is not supported on all browsers.
         * @see http://caniuse.com/Uint8Array
         * This is a type-conversion wrapper around `getRoomproperty()`
         * @return {!Uint8Array}
         */
        proto.stream.RoomInfo.prototype.getRoomproperty_asU8 = function () {
            return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
                this.getRoomproperty()));
        };


        /** @param {!(string|Uint8Array)} value */
        proto.stream.RoomInfo.prototype.setRoomproperty = function (value) {
            jspb.Message.setProto3BytesField(this, 7, value);
        };


        /**
         * optional uint32 owner = 8;
         * @return {number}
         */
        proto.stream.RoomInfo.prototype.getOwner = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 8, 0));
        };


        /** @param {number} value */
        proto.stream.RoomInfo.prototype.setOwner = function (value) {
            jspb.Message.setProto3IntField(this, 8, value);
        };


        /**
         * Generated by JsPbCodeGenerator.
         * @param {Array=} opt_data Optional initial data array, typically from a
         * server response, or constructed directly in Javascript. The array is used
         * in place and becomes part of the constructed object. It is not cloned.
         * If no data is provided, the constructed object will be empty, but still
         * valid.
         * @extends {jspb.Message}
         * @constructor
         */
        proto.stream.JoinRoomReq = function (opt_data) {
            jspb.Message.initialize(this, opt_data, 0, -1, proto.stream.JoinRoomReq.repeatedFields_, null);
        };
        goog.inherits(proto.stream.JoinRoomReq, jspb.Message);
        if (goog.DEBUG && !COMPILED) {
            proto.stream.JoinRoomReq.displayName = "proto.stream.JoinRoomReq";
        }
        /**
         * List of repeated fields within this message type.
         * @private {!Array<number>}
         * @const
         */
        proto.stream.JoinRoomReq.repeatedFields_ = [5];


        if (jspb.Message.GENERATE_TO_OBJECT) {
            /**
             * Creates an object representation of this proto suitable for use in Soy templates.
             * Field names that are reserved in JavaScript and will be renamed to pb_name.
             * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
             * For the list of reserved names please see:
             *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
             * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
             *     for transitional soy proto support: http://goto/soy-param-migration
             * @return {!Object}
             */
            proto.stream.JoinRoomReq.prototype.toObject = function (opt_includeInstance) {
                return proto.stream.JoinRoomReq.toObject(opt_includeInstance, this);
            };


            /**
             * Static version of the {@see toObject} method.
             * @param {boolean|undefined} includeInstance Whether to include the JSPB
             *     instance for transitional soy proto support:
             *     http://goto/soy-param-migration
             * @param {!proto.stream.JoinRoomReq} msg The msg instance to transform.
             * @return {!Object}
             * @suppress {unusedLocalVariables} f is only used for nested messages
             */
            proto.stream.JoinRoomReq.toObject = function (includeInstance, msg) {
                var f, obj = {
                    jointype: jspb.Message.getFieldWithDefault(msg, 1, 0),
                    playerinfo: (f = msg.getPlayerinfo()) && proto.stream.PlayerInfo.toObject(includeInstance, f),
                    gameid: jspb.Message.getFieldWithDefault(msg, 3, 0),
                    roominfo: (f = msg.getRoominfo()) && proto.stream.RoomInfo.toObject(includeInstance, f),
                    tagsList: jspb.Message.toObjectList(msg.getTagsList(),
                        proto.stream.keyValue.toObject, includeInstance),
                    cpproto: msg.getCpproto_asB64()
                };

                if (includeInstance) {
                    obj.$jspbMessageInstance = msg;
                }
                return obj;
            };
        }


        /**
         * Deserializes binary data (in protobuf wire format).
         * @param {jspb.ByteSource} bytes The bytes to deserialize.
         * @return {!proto.stream.JoinRoomReq}
         */
        proto.stream.JoinRoomReq.deserializeBinary = function (bytes) {
            var reader = new jspb.BinaryReader(bytes);
            var msg = new proto.stream.JoinRoomReq;
            return proto.stream.JoinRoomReq.deserializeBinaryFromReader(msg, reader);
        };


        /**
         * Deserializes binary data (in protobuf wire format) from the
         * given reader into the given message object.
         * @param {!proto.stream.JoinRoomReq} msg The message object to deserialize into.
         * @param {!jspb.BinaryReader} reader The BinaryReader to use.
         * @return {!proto.stream.JoinRoomReq}
         */
        proto.stream.JoinRoomReq.deserializeBinaryFromReader = function (msg, reader) {
            while (reader.nextField()) {
                if (reader.isEndGroup()) {
                    break;
                }
                var field = reader.getFieldNumber();
                switch (field) {
                case 1:
                    var value = /** @type {!proto.stream.JoinRoomType} */ (reader.readEnum());
                    msg.setJointype(value);
                    break;
                case 2:
                    var value = new proto.stream.PlayerInfo;
                    reader.readMessage(value, proto.stream.PlayerInfo.deserializeBinaryFromReader);
                    msg.setPlayerinfo(value);
                    break;
                case 3:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setGameid(value);
                    break;
                case 4:
                    var value = new proto.stream.RoomInfo;
                    reader.readMessage(value, proto.stream.RoomInfo.deserializeBinaryFromReader);
                    msg.setRoominfo(value);
                    break;
                case 5:
                    var value = new proto.stream.keyValue;
                    reader.readMessage(value, proto.stream.keyValue.deserializeBinaryFromReader);
                    msg.addTags(value);
                    break;
                case 6:
                    var value = /** @type {!Uint8Array} */ (reader.readBytes());
                    msg.setCpproto(value);
                    break;
                default:
                    reader.skipField();
                    break;
                }
            }
            return msg;
        };


        /**
         * Serializes the message to binary data (in protobuf wire format).
         * @return {!Uint8Array}
         */
        proto.stream.JoinRoomReq.prototype.serializeBinary = function () {
            var writer = new jspb.BinaryWriter();
            proto.stream.JoinRoomReq.serializeBinaryToWriter(this, writer);
            return writer.getResultBuffer();
        };


        /**
         * Serializes the given message to binary data (in protobuf wire
         * format), writing to the given BinaryWriter.
         * @param {!proto.stream.JoinRoomReq} message
         * @param {!jspb.BinaryWriter} writer
         * @suppress {unusedLocalVariables} f is only used for nested messages
         */
        proto.stream.JoinRoomReq.serializeBinaryToWriter = function (message, writer) {
            var f = undefined;
            f = message.getJointype();
            if (f !== 0.0) {
                writer.writeEnum(
                    1,
                    f
                );
            }
            f = message.getPlayerinfo();
            if (f != null) {
                writer.writeMessage(
                    2,
                    f,
                    proto.stream.PlayerInfo.serializeBinaryToWriter
                );
            }
            f = message.getGameid();
            if (f !== 0) {
                writer.writeUint32(
                    3,
                    f
                );
            }
            f = message.getRoominfo();
            if (f != null) {
                writer.writeMessage(
                    4,
                    f,
                    proto.stream.RoomInfo.serializeBinaryToWriter
                );
            }
            f = message.getTagsList();
            if (f.length > 0) {
                writer.writeRepeatedMessage(
                    5,
                    f,
                    proto.stream.keyValue.serializeBinaryToWriter
                );
            }
            f = message.getCpproto_asU8();
            if (f.length > 0) {
                writer.writeBytes(
                    6,
                    f
                );
            }
        };


        /**
         * optional JoinRoomType joinType = 1;
         * @return {!proto.stream.JoinRoomType}
         */
        proto.stream.JoinRoomReq.prototype.getJointype = function () {
            return /** @type {!proto.stream.JoinRoomType} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
        };


        /** @param {!proto.stream.JoinRoomType} value */
        proto.stream.JoinRoomReq.prototype.setJointype = function (value) {
            jspb.Message.setProto3EnumField(this, 1, value);
        };


        /**
         * optional PlayerInfo playerInfo = 2;
         * @return {?proto.stream.PlayerInfo}
         */
        proto.stream.JoinRoomReq.prototype.getPlayerinfo = function () {
            return /** @type{?proto.stream.PlayerInfo} */ (
                jspb.Message.getWrapperField(this, proto.stream.PlayerInfo, 2));
        };


        /** @param {?proto.stream.PlayerInfo|undefined} value */
        proto.stream.JoinRoomReq.prototype.setPlayerinfo = function (value) {
            jspb.Message.setWrapperField(this, 2, value);
        };


        proto.stream.JoinRoomReq.prototype.clearPlayerinfo = function () {
            this.setPlayerinfo(undefined);
        };


        /**
         * Returns whether this field is set.
         * @return {!boolean}
         */
        proto.stream.JoinRoomReq.prototype.hasPlayerinfo = function () {
            return jspb.Message.getField(this, 2) != null;
        };


        /**
         * optional uint32 gameID = 3;
         * @return {number}
         */
        proto.stream.JoinRoomReq.prototype.getGameid = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
        };


        /** @param {number} value */
        proto.stream.JoinRoomReq.prototype.setGameid = function (value) {
            jspb.Message.setProto3IntField(this, 3, value);
        };


        /**
         * optional RoomInfo roomInfo = 4;
         * @return {?proto.stream.RoomInfo}
         */
        proto.stream.JoinRoomReq.prototype.getRoominfo = function () {
            return /** @type{?proto.stream.RoomInfo} */ (
                jspb.Message.getWrapperField(this, proto.stream.RoomInfo, 4));
        };


        /** @param {?proto.stream.RoomInfo|undefined} value */
        proto.stream.JoinRoomReq.prototype.setRoominfo = function (value) {
            jspb.Message.setWrapperField(this, 4, value);
        };


        proto.stream.JoinRoomReq.prototype.clearRoominfo = function () {
            this.setRoominfo(undefined);
        };


        /**
         * Returns whether this field is set.
         * @return {!boolean}
         */
        proto.stream.JoinRoomReq.prototype.hasRoominfo = function () {
            return jspb.Message.getField(this, 4) != null;
        };


        /**
         * repeated keyValue tags = 5;
         * @return {!Array.<!proto.stream.keyValue>}
         */
        proto.stream.JoinRoomReq.prototype.getTagsList = function () {
            return /** @type{!Array.<!proto.stream.keyValue>} */ (
                jspb.Message.getRepeatedWrapperField(this, proto.stream.keyValue, 5));
        };


        /** @param {!Array.<!proto.stream.keyValue>} value */
        proto.stream.JoinRoomReq.prototype.setTagsList = function (value) {
            jspb.Message.setRepeatedWrapperField(this, 5, value);
        };


        /**
         * @param {!proto.stream.keyValue=} opt_value
         * @param {number=} opt_index
         * @return {!proto.stream.keyValue}
         */
        proto.stream.JoinRoomReq.prototype.addTags = function (opt_value, opt_index) {
            return jspb.Message.addToRepeatedWrapperField(this, 5, opt_value, proto.stream.keyValue, opt_index);
        };


        proto.stream.JoinRoomReq.prototype.clearTagsList = function () {
            this.setTagsList([]);
        };


        /**
         * optional bytes cpProto = 6;
         * @return {!(string|Uint8Array)}
         */
        proto.stream.JoinRoomReq.prototype.getCpproto = function () {
            return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
        };


        /**
         * optional bytes cpProto = 6;
         * This is a type-conversion wrapper around `getCpproto()`
         * @return {string}
         */
        proto.stream.JoinRoomReq.prototype.getCpproto_asB64 = function () {
            return /** @type {string} */ (jspb.Message.bytesAsB64(
                this.getCpproto()));
        };


        /**
         * optional bytes cpProto = 6;
         * Note that Uint8Array is not supported on all browsers.
         * @see http://caniuse.com/Uint8Array
         * This is a type-conversion wrapper around `getCpproto()`
         * @return {!Uint8Array}
         */
        proto.stream.JoinRoomReq.prototype.getCpproto_asU8 = function () {
            return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
                this.getCpproto()));
        };


        /** @param {!(string|Uint8Array)} value */
        proto.stream.JoinRoomReq.prototype.setCpproto = function (value) {
            jspb.Message.setProto3BytesField(this, 6, value);
        };


        /**
         * Generated by JsPbCodeGenerator.
         * @param {Array=} opt_data Optional initial data array, typically from a
         * server response, or constructed directly in Javascript. The array is used
         * in place and becomes part of the constructed object. It is not cloned.
         * If no data is provided, the constructed object will be empty, but still
         * valid.
         * @extends {jspb.Message}
         * @constructor
         */
        proto.stream.JoinRoomRsp = function (opt_data) {
            jspb.Message.initialize(this, opt_data, 0, -1, proto.stream.JoinRoomRsp.repeatedFields_, null);
        };
        goog.inherits(proto.stream.JoinRoomRsp, jspb.Message);
        if (goog.DEBUG && !COMPILED) {
            proto.stream.JoinRoomRsp.displayName = "proto.stream.JoinRoomRsp";
        }
        /**
         * List of repeated fields within this message type.
         * @private {!Array<number>}
         * @const
         */
        proto.stream.JoinRoomRsp.repeatedFields_ = [2];


        if (jspb.Message.GENERATE_TO_OBJECT) {
            /**
             * Creates an object representation of this proto suitable for use in Soy templates.
             * Field names that are reserved in JavaScript and will be renamed to pb_name.
             * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
             * For the list of reserved names please see:
             *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
             * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
             *     for transitional soy proto support: http://goto/soy-param-migration
             * @return {!Object}
             */
            proto.stream.JoinRoomRsp.prototype.toObject = function (opt_includeInstance) {
                return proto.stream.JoinRoomRsp.toObject(opt_includeInstance, this);
            };


            /**
             * Static version of the {@see toObject} method.
             * @param {boolean|undefined} includeInstance Whether to include the JSPB
             *     instance for transitional soy proto support:
             *     http://goto/soy-param-migration
             * @param {!proto.stream.JoinRoomRsp} msg The msg instance to transform.
             * @return {!Object}
             * @suppress {unusedLocalVariables} f is only used for nested messages
             */
            proto.stream.JoinRoomRsp.toObject = function (includeInstance, msg) {
                var f, obj = {
                    status: jspb.Message.getFieldWithDefault(msg, 1, 0),
                    usersList: jspb.Message.toObjectList(msg.getUsersList(),
                        proto.stream.PlayerInfo.toObject, includeInstance),
                    roominfo: (f = msg.getRoominfo()) && proto.stream.RoomInfo.toObject(includeInstance, f),
                    bookinfo: (f = msg.getBookinfo()) && proto.stream.BookInfo.toObject(includeInstance, f),
                    cpproto: msg.getCpproto_asB64()
                };

                if (includeInstance) {
                    obj.$jspbMessageInstance = msg;
                }
                return obj;
            };
        }


        /**
         * Deserializes binary data (in protobuf wire format).
         * @param {jspb.ByteSource} bytes The bytes to deserialize.
         * @return {!proto.stream.JoinRoomRsp}
         */
        proto.stream.JoinRoomRsp.deserializeBinary = function (bytes) {
            var reader = new jspb.BinaryReader(bytes);
            var msg = new proto.stream.JoinRoomRsp;
            return proto.stream.JoinRoomRsp.deserializeBinaryFromReader(msg, reader);
        };


        /**
         * Deserializes binary data (in protobuf wire format) from the
         * given reader into the given message object.
         * @param {!proto.stream.JoinRoomRsp} msg The message object to deserialize into.
         * @param {!jspb.BinaryReader} reader The BinaryReader to use.
         * @return {!proto.stream.JoinRoomRsp}
         */
        proto.stream.JoinRoomRsp.deserializeBinaryFromReader = function (msg, reader) {
            while (reader.nextField()) {
                if (reader.isEndGroup()) {
                    break;
                }
                var field = reader.getFieldNumber();
                switch (field) {
                case 1:
                    var value = /** @type {!proto.stream.ErrorCode} */ (reader.readEnum());
                    msg.setStatus(value);
                    break;
                case 2:
                    var value = new proto.stream.PlayerInfo;
                    reader.readMessage(value, proto.stream.PlayerInfo.deserializeBinaryFromReader);
                    msg.addUsers(value);
                    break;
                case 3:
                    var value = new proto.stream.RoomInfo;
                    reader.readMessage(value, proto.stream.RoomInfo.deserializeBinaryFromReader);
                    msg.setRoominfo(value);
                    break;
                case 4:
                    var value = new proto.stream.BookInfo;
                    reader.readMessage(value, proto.stream.BookInfo.deserializeBinaryFromReader);
                    msg.setBookinfo(value);
                    break;
                case 5:
                    var value = /** @type {!Uint8Array} */ (reader.readBytes());
                    msg.setCpproto(value);
                    break;
                default:
                    reader.skipField();
                    break;
                }
            }
            return msg;
        };


        /**
         * Serializes the message to binary data (in protobuf wire format).
         * @return {!Uint8Array}
         */
        proto.stream.JoinRoomRsp.prototype.serializeBinary = function () {
            var writer = new jspb.BinaryWriter();
            proto.stream.JoinRoomRsp.serializeBinaryToWriter(this, writer);
            return writer.getResultBuffer();
        };


        /**
         * Serializes the given message to binary data (in protobuf wire
         * format), writing to the given BinaryWriter.
         * @param {!proto.stream.JoinRoomRsp} message
         * @param {!jspb.BinaryWriter} writer
         * @suppress {unusedLocalVariables} f is only used for nested messages
         */
        proto.stream.JoinRoomRsp.serializeBinaryToWriter = function (message, writer) {
            var f = undefined;
            f = message.getStatus();
            if (f !== 0.0) {
                writer.writeEnum(
                    1,
                    f
                );
            }
            f = message.getUsersList();
            if (f.length > 0) {
                writer.writeRepeatedMessage(
                    2,
                    f,
                    proto.stream.PlayerInfo.serializeBinaryToWriter
                );
            }
            f = message.getRoominfo();
            if (f != null) {
                writer.writeMessage(
                    3,
                    f,
                    proto.stream.RoomInfo.serializeBinaryToWriter
                );
            }
            f = message.getBookinfo();
            if (f != null) {
                writer.writeMessage(
                    4,
                    f,
                    proto.stream.BookInfo.serializeBinaryToWriter
                );
            }
            f = message.getCpproto_asU8();
            if (f.length > 0) {
                writer.writeBytes(
                    5,
                    f
                );
            }
        };


        /**
         * optional ErrorCode status = 1;
         * @return {!proto.stream.ErrorCode}
         */
        proto.stream.JoinRoomRsp.prototype.getStatus = function () {
            return /** @type {!proto.stream.ErrorCode} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
        };


        /** @param {!proto.stream.ErrorCode} value */
        proto.stream.JoinRoomRsp.prototype.setStatus = function (value) {
            jspb.Message.setProto3EnumField(this, 1, value);
        };


        /**
         * repeated PlayerInfo users = 2;
         * @return {!Array.<!proto.stream.PlayerInfo>}
         */
        proto.stream.JoinRoomRsp.prototype.getUsersList = function () {
            return /** @type{!Array.<!proto.stream.PlayerInfo>} */ (
                jspb.Message.getRepeatedWrapperField(this, proto.stream.PlayerInfo, 2));
        };


        /** @param {!Array.<!proto.stream.PlayerInfo>} value */
        proto.stream.JoinRoomRsp.prototype.setUsersList = function (value) {
            jspb.Message.setRepeatedWrapperField(this, 2, value);
        };


        /**
         * @param {!proto.stream.PlayerInfo=} opt_value
         * @param {number=} opt_index
         * @return {!proto.stream.PlayerInfo}
         */
        proto.stream.JoinRoomRsp.prototype.addUsers = function (opt_value, opt_index) {
            return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.stream.PlayerInfo, opt_index);
        };


        proto.stream.JoinRoomRsp.prototype.clearUsersList = function () {
            this.setUsersList([]);
        };


        /**
         * optional RoomInfo roomInfo = 3;
         * @return {?proto.stream.RoomInfo}
         */
        proto.stream.JoinRoomRsp.prototype.getRoominfo = function () {
            return /** @type{?proto.stream.RoomInfo} */ (
                jspb.Message.getWrapperField(this, proto.stream.RoomInfo, 3));
        };


        /** @param {?proto.stream.RoomInfo|undefined} value */
        proto.stream.JoinRoomRsp.prototype.setRoominfo = function (value) {
            jspb.Message.setWrapperField(this, 3, value);
        };


        proto.stream.JoinRoomRsp.prototype.clearRoominfo = function () {
            this.setRoominfo(undefined);
        };


        /**
         * Returns whether this field is set.
         * @return {!boolean}
         */
        proto.stream.JoinRoomRsp.prototype.hasRoominfo = function () {
            return jspb.Message.getField(this, 3) != null;
        };


        /**
         * optional BookInfo bookInfo = 4;
         * @return {?proto.stream.BookInfo}
         */
        proto.stream.JoinRoomRsp.prototype.getBookinfo = function () {
            return /** @type{?proto.stream.BookInfo} */ (
                jspb.Message.getWrapperField(this, proto.stream.BookInfo, 4));
        };


        /** @param {?proto.stream.BookInfo|undefined} value */
        proto.stream.JoinRoomRsp.prototype.setBookinfo = function (value) {
            jspb.Message.setWrapperField(this, 4, value);
        };


        proto.stream.JoinRoomRsp.prototype.clearBookinfo = function () {
            this.setBookinfo(undefined);
        };


        /**
         * Returns whether this field is set.
         * @return {!boolean}
         */
        proto.stream.JoinRoomRsp.prototype.hasBookinfo = function () {
            return jspb.Message.getField(this, 4) != null;
        };


        /**
         * optional bytes cpProto = 5;
         * @return {!(string|Uint8Array)}
         */
        proto.stream.JoinRoomRsp.prototype.getCpproto = function () {
            return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
        };


        /**
         * optional bytes cpProto = 5;
         * This is a type-conversion wrapper around `getCpproto()`
         * @return {string}
         */
        proto.stream.JoinRoomRsp.prototype.getCpproto_asB64 = function () {
            return /** @type {string} */ (jspb.Message.bytesAsB64(
                this.getCpproto()));
        };


        /**
         * optional bytes cpProto = 5;
         * Note that Uint8Array is not supported on all browsers.
         * @see http://caniuse.com/Uint8Array
         * This is a type-conversion wrapper around `getCpproto()`
         * @return {!Uint8Array}
         */
        proto.stream.JoinRoomRsp.prototype.getCpproto_asU8 = function () {
            return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
                this.getCpproto()));
        };


        /** @param {!(string|Uint8Array)} value */
        proto.stream.JoinRoomRsp.prototype.setCpproto = function (value) {
            jspb.Message.setProto3BytesField(this, 5, value);
        };


        /**
         * Generated by JsPbCodeGenerator.
         * @param {Array=} opt_data Optional initial data array, typically from a
         * server response, or constructed directly in Javascript. The array is used
         * in place and becomes part of the constructed object. It is not cloned.
         * If no data is provided, the constructed object will be empty, but still
         * valid.
         * @extends {jspb.Message}
         * @constructor
         */
        proto.stream.NoticeJoin = function (opt_data) {
            jspb.Message.initialize(this, opt_data, 0, -1, null, null);
        };
        goog.inherits(proto.stream.NoticeJoin, jspb.Message);
        if (goog.DEBUG && !COMPILED) {
            proto.stream.NoticeJoin.displayName = "proto.stream.NoticeJoin";
        }


        if (jspb.Message.GENERATE_TO_OBJECT) {
            /**
             * Creates an object representation of this proto suitable for use in Soy templates.
             * Field names that are reserved in JavaScript and will be renamed to pb_name.
             * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
             * For the list of reserved names please see:
             *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
             * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
             *     for transitional soy proto support: http://goto/soy-param-migration
             * @return {!Object}
             */
            proto.stream.NoticeJoin.prototype.toObject = function (opt_includeInstance) {
                return proto.stream.NoticeJoin.toObject(opt_includeInstance, this);
            };


            /**
             * Static version of the {@see toObject} method.
             * @param {boolean|undefined} includeInstance Whether to include the JSPB
             *     instance for transitional soy proto support:
             *     http://goto/soy-param-migration
             * @param {!proto.stream.NoticeJoin} msg The msg instance to transform.
             * @return {!Object}
             * @suppress {unusedLocalVariables} f is only used for nested messages
             */
            proto.stream.NoticeJoin.toObject = function (includeInstance, msg) {
                var f, obj = {
                    user: (f = msg.getUser()) && proto.stream.PlayerInfo.toObject(includeInstance, f)
                };

                if (includeInstance) {
                    obj.$jspbMessageInstance = msg;
                }
                return obj;
            };
        }


        /**
         * Deserializes binary data (in protobuf wire format).
         * @param {jspb.ByteSource} bytes The bytes to deserialize.
         * @return {!proto.stream.NoticeJoin}
         */
        proto.stream.NoticeJoin.deserializeBinary = function (bytes) {
            var reader = new jspb.BinaryReader(bytes);
            var msg = new proto.stream.NoticeJoin;
            return proto.stream.NoticeJoin.deserializeBinaryFromReader(msg, reader);
        };


        /**
         * Deserializes binary data (in protobuf wire format) from the
         * given reader into the given message object.
         * @param {!proto.stream.NoticeJoin} msg The message object to deserialize into.
         * @param {!jspb.BinaryReader} reader The BinaryReader to use.
         * @return {!proto.stream.NoticeJoin}
         */
        proto.stream.NoticeJoin.deserializeBinaryFromReader = function (msg, reader) {
            while (reader.nextField()) {
                if (reader.isEndGroup()) {
                    break;
                }
                var field = reader.getFieldNumber();
                switch (field) {
                case 1:
                    var value = new proto.stream.PlayerInfo;
                    reader.readMessage(value, proto.stream.PlayerInfo.deserializeBinaryFromReader);
                    msg.setUser(value);
                    break;
                default:
                    reader.skipField();
                    break;
                }
            }
            return msg;
        };


        /**
         * Serializes the message to binary data (in protobuf wire format).
         * @return {!Uint8Array}
         */
        proto.stream.NoticeJoin.prototype.serializeBinary = function () {
            var writer = new jspb.BinaryWriter();
            proto.stream.NoticeJoin.serializeBinaryToWriter(this, writer);
            return writer.getResultBuffer();
        };


        /**
         * Serializes the given message to binary data (in protobuf wire
         * format), writing to the given BinaryWriter.
         * @param {!proto.stream.NoticeJoin} message
         * @param {!jspb.BinaryWriter} writer
         * @suppress {unusedLocalVariables} f is only used for nested messages
         */
        proto.stream.NoticeJoin.serializeBinaryToWriter = function (message, writer) {
            var f = undefined;
            f = message.getUser();
            if (f != null) {
                writer.writeMessage(
                    1,
                    f,
                    proto.stream.PlayerInfo.serializeBinaryToWriter
                );
            }
        };


        /**
         * optional PlayerInfo user = 1;
         * @return {?proto.stream.PlayerInfo}
         */
        proto.stream.NoticeJoin.prototype.getUser = function () {
            return /** @type{?proto.stream.PlayerInfo} */ (
                jspb.Message.getWrapperField(this, proto.stream.PlayerInfo, 1));
        };


        /** @param {?proto.stream.PlayerInfo|undefined} value */
        proto.stream.NoticeJoin.prototype.setUser = function (value) {
            jspb.Message.setWrapperField(this, 1, value);
        };


        proto.stream.NoticeJoin.prototype.clearUser = function () {
            this.setUser(undefined);
        };


        /**
         * Returns whether this field is set.
         * @return {!boolean}
         */
        proto.stream.NoticeJoin.prototype.hasUser = function () {
            return jspb.Message.getField(this, 1) != null;
        };


        /**
         * Generated by JsPbCodeGenerator.
         * @param {Array=} opt_data Optional initial data array, typically from a
         * server response, or constructed directly in Javascript. The array is used
         * in place and becomes part of the constructed object. It is not cloned.
         * If no data is provided, the constructed object will be empty, but still
         * valid.
         * @extends {jspb.Message}
         * @constructor
         */
        proto.stream.NoticeLeave = function (opt_data) {
            jspb.Message.initialize(this, opt_data, 0, -1, null, null);
        };
        goog.inherits(proto.stream.NoticeLeave, jspb.Message);
        if (goog.DEBUG && !COMPILED) {
            proto.stream.NoticeLeave.displayName = "proto.stream.NoticeLeave";
        }


        if (jspb.Message.GENERATE_TO_OBJECT) {
            /**
             * Creates an object representation of this proto suitable for use in Soy templates.
             * Field names that are reserved in JavaScript and will be renamed to pb_name.
             * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
             * For the list of reserved names please see:
             *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
             * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
             *     for transitional soy proto support: http://goto/soy-param-migration
             * @return {!Object}
             */
            proto.stream.NoticeLeave.prototype.toObject = function (opt_includeInstance) {
                return proto.stream.NoticeLeave.toObject(opt_includeInstance, this);
            };


            /**
             * Static version of the {@see toObject} method.
             * @param {boolean|undefined} includeInstance Whether to include the JSPB
             *     instance for transitional soy proto support:
             *     http://goto/soy-param-migration
             * @param {!proto.stream.NoticeLeave} msg The msg instance to transform.
             * @return {!Object}
             * @suppress {unusedLocalVariables} f is only used for nested messages
             */
            proto.stream.NoticeLeave.toObject = function (includeInstance, msg) {
                var f, obj = {
                    userid: jspb.Message.getFieldWithDefault(msg, 1, 0),
                    roomid: jspb.Message.getFieldWithDefault(msg, 2, "0"),
                    owner: jspb.Message.getFieldWithDefault(msg, 3, 0),
                    cpproto: msg.getCpproto_asB64()
                };

                if (includeInstance) {
                    obj.$jspbMessageInstance = msg;
                }
                return obj;
            };
        }


        /**
         * Deserializes binary data (in protobuf wire format).
         * @param {jspb.ByteSource} bytes The bytes to deserialize.
         * @return {!proto.stream.NoticeLeave}
         */
        proto.stream.NoticeLeave.deserializeBinary = function (bytes) {
            var reader = new jspb.BinaryReader(bytes);
            var msg = new proto.stream.NoticeLeave;
            return proto.stream.NoticeLeave.deserializeBinaryFromReader(msg, reader);
        };


        /**
         * Deserializes binary data (in protobuf wire format) from the
         * given reader into the given message object.
         * @param {!proto.stream.NoticeLeave} msg The message object to deserialize into.
         * @param {!jspb.BinaryReader} reader The BinaryReader to use.
         * @return {!proto.stream.NoticeLeave}
         */
        proto.stream.NoticeLeave.deserializeBinaryFromReader = function (msg, reader) {
            while (reader.nextField()) {
                if (reader.isEndGroup()) {
                    break;
                }
                var field = reader.getFieldNumber();
                switch (field) {
                case 1:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setUserid(value);
                    break;
                case 2:
                    var value = /** @type {string} */ (reader.readUint64String());
                    msg.setRoomid(value);
                    break;
                case 3:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setOwner(value);
                    break;
                case 4:
                    var value = /** @type {!Uint8Array} */ (reader.readBytes());
                    msg.setCpproto(value);
                    break;
                default:
                    reader.skipField();
                    break;
                }
            }
            return msg;
        };


        /**
         * Serializes the message to binary data (in protobuf wire format).
         * @return {!Uint8Array}
         */
        proto.stream.NoticeLeave.prototype.serializeBinary = function () {
            var writer = new jspb.BinaryWriter();
            proto.stream.NoticeLeave.serializeBinaryToWriter(this, writer);
            return writer.getResultBuffer();
        };


        /**
         * Serializes the given message to binary data (in protobuf wire
         * format), writing to the given BinaryWriter.
         * @param {!proto.stream.NoticeLeave} message
         * @param {!jspb.BinaryWriter} writer
         * @suppress {unusedLocalVariables} f is only used for nested messages
         */
        proto.stream.NoticeLeave.serializeBinaryToWriter = function (message, writer) {
            var f = undefined;
            f = message.getUserid();
            if (f !== 0) {
                writer.writeUint32(
                    1,
                    f
                );
            }
            f = message.getRoomid();
            if (parseInt(f, 10) !== 0) {
                writer.writeUint64String(
                    2,
                    f
                );
            }
            f = message.getOwner();
            if (f !== 0) {
                writer.writeUint32(
                    3,
                    f
                );
            }
            f = message.getCpproto_asU8();
            if (f.length > 0) {
                writer.writeBytes(
                    4,
                    f
                );
            }
        };


        /**
         * optional uint32 userID = 1;
         * @return {number}
         */
        proto.stream.NoticeLeave.prototype.getUserid = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
        };


        /** @param {number} value */
        proto.stream.NoticeLeave.prototype.setUserid = function (value) {
            jspb.Message.setProto3IntField(this, 1, value);
        };


        /**
         * optional uint64 roomID = 2;
         * @return {string}
         */
        proto.stream.NoticeLeave.prototype.getRoomid = function () {
            return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, "0"));
        };


        /** @param {string} value */
        proto.stream.NoticeLeave.prototype.setRoomid = function (value) {
            jspb.Message.setProto3StringIntField(this, 2, value);
        };


        /**
         * optional uint32 owner = 3;
         * @return {number}
         */
        proto.stream.NoticeLeave.prototype.getOwner = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
        };


        /** @param {number} value */
        proto.stream.NoticeLeave.prototype.setOwner = function (value) {
            jspb.Message.setProto3IntField(this, 3, value);
        };


        /**
         * optional bytes cpProto = 4;
         * @return {!(string|Uint8Array)}
         */
        proto.stream.NoticeLeave.prototype.getCpproto = function () {
            return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
        };


        /**
         * optional bytes cpProto = 4;
         * This is a type-conversion wrapper around `getCpproto()`
         * @return {string}
         */
        proto.stream.NoticeLeave.prototype.getCpproto_asB64 = function () {
            return /** @type {string} */ (jspb.Message.bytesAsB64(
                this.getCpproto()));
        };


        /**
         * optional bytes cpProto = 4;
         * Note that Uint8Array is not supported on all browsers.
         * @see http://caniuse.com/Uint8Array
         * This is a type-conversion wrapper around `getCpproto()`
         * @return {!Uint8Array}
         */
        proto.stream.NoticeLeave.prototype.getCpproto_asU8 = function () {
            return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
                this.getCpproto()));
        };


        /** @param {!(string|Uint8Array)} value */
        proto.stream.NoticeLeave.prototype.setCpproto = function (value) {
            jspb.Message.setProto3BytesField(this, 4, value);
        };


        /**
         * Generated by JsPbCodeGenerator.
         * @param {Array=} opt_data Optional initial data array, typically from a
         * server response, or constructed directly in Javascript. The array is used
         * in place and becomes part of the constructed object. It is not cloned.
         * If no data is provided, the constructed object will be empty, but still
         * valid.
         * @extends {jspb.Message}
         * @constructor
         */
        proto.stream.JoinOverReq = function (opt_data) {
            jspb.Message.initialize(this, opt_data, 0, -1, null, null);
        };
        goog.inherits(proto.stream.JoinOverReq, jspb.Message);
        if (goog.DEBUG && !COMPILED) {
            proto.stream.JoinOverReq.displayName = "proto.stream.JoinOverReq";
        }


        if (jspb.Message.GENERATE_TO_OBJECT) {
            /**
             * Creates an object representation of this proto suitable for use in Soy templates.
             * Field names that are reserved in JavaScript and will be renamed to pb_name.
             * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
             * For the list of reserved names please see:
             *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
             * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
             *     for transitional soy proto support: http://goto/soy-param-migration
             * @return {!Object}
             */
            proto.stream.JoinOverReq.prototype.toObject = function (opt_includeInstance) {
                return proto.stream.JoinOverReq.toObject(opt_includeInstance, this);
            };


            /**
             * Static version of the {@see toObject} method.
             * @param {boolean|undefined} includeInstance Whether to include the JSPB
             *     instance for transitional soy proto support:
             *     http://goto/soy-param-migration
             * @param {!proto.stream.JoinOverReq} msg The msg instance to transform.
             * @return {!Object}
             * @suppress {unusedLocalVariables} f is only used for nested messages
             */
            proto.stream.JoinOverReq.toObject = function (includeInstance, msg) {
                var f, obj = {
                    roomid: jspb.Message.getFieldWithDefault(msg, 1, "0"),
                    gameid: jspb.Message.getFieldWithDefault(msg, 2, 0),
                    cpproto: msg.getCpproto_asB64(),
                    userid: jspb.Message.getFieldWithDefault(msg, 4, 0)
                };

                if (includeInstance) {
                    obj.$jspbMessageInstance = msg;
                }
                return obj;
            };
        }


        /**
         * Deserializes binary data (in protobuf wire format).
         * @param {jspb.ByteSource} bytes The bytes to deserialize.
         * @return {!proto.stream.JoinOverReq}
         */
        proto.stream.JoinOverReq.deserializeBinary = function (bytes) {
            var reader = new jspb.BinaryReader(bytes);
            var msg = new proto.stream.JoinOverReq;
            return proto.stream.JoinOverReq.deserializeBinaryFromReader(msg, reader);
        };


        /**
         * Deserializes binary data (in protobuf wire format) from the
         * given reader into the given message object.
         * @param {!proto.stream.JoinOverReq} msg The message object to deserialize into.
         * @param {!jspb.BinaryReader} reader The BinaryReader to use.
         * @return {!proto.stream.JoinOverReq}
         */
        proto.stream.JoinOverReq.deserializeBinaryFromReader = function (msg, reader) {
            while (reader.nextField()) {
                if (reader.isEndGroup()) {
                    break;
                }
                var field = reader.getFieldNumber();
                switch (field) {
                case 1:
                    var value = /** @type {string} */ (reader.readUint64String());
                    msg.setRoomid(value);
                    break;
                case 2:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setGameid(value);
                    break;
                case 3:
                    var value = /** @type {!Uint8Array} */ (reader.readBytes());
                    msg.setCpproto(value);
                    break;
                case 4:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setUserid(value);
                    break;
                default:
                    reader.skipField();
                    break;
                }
            }
            return msg;
        };


        /**
         * Serializes the message to binary data (in protobuf wire format).
         * @return {!Uint8Array}
         */
        proto.stream.JoinOverReq.prototype.serializeBinary = function () {
            var writer = new jspb.BinaryWriter();
            proto.stream.JoinOverReq.serializeBinaryToWriter(this, writer);
            return writer.getResultBuffer();
        };


        /**
         * Serializes the given message to binary data (in protobuf wire
         * format), writing to the given BinaryWriter.
         * @param {!proto.stream.JoinOverReq} message
         * @param {!jspb.BinaryWriter} writer
         * @suppress {unusedLocalVariables} f is only used for nested messages
         */
        proto.stream.JoinOverReq.serializeBinaryToWriter = function (message, writer) {
            var f = undefined;
            f = message.getRoomid();
            if (parseInt(f, 10) !== 0) {
                writer.writeUint64String(
                    1,
                    f
                );
            }
            f = message.getGameid();
            if (f !== 0) {
                writer.writeUint32(
                    2,
                    f
                );
            }
            f = message.getCpproto_asU8();
            if (f.length > 0) {
                writer.writeBytes(
                    3,
                    f
                );
            }
            f = message.getUserid();
            if (f !== 0) {
                writer.writeUint32(
                    4,
                    f
                );
            }
        };


        /**
         * optional uint64 roomID = 1;
         * @return {string}
         */
        proto.stream.JoinOverReq.prototype.getRoomid = function () {
            return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, "0"));
        };


        /** @param {string} value */
        proto.stream.JoinOverReq.prototype.setRoomid = function (value) {
            jspb.Message.setProto3StringIntField(this, 1, value);
        };


        /**
         * optional uint32 gameID = 2;
         * @return {number}
         */
        proto.stream.JoinOverReq.prototype.getGameid = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
        };


        /** @param {number} value */
        proto.stream.JoinOverReq.prototype.setGameid = function (value) {
            jspb.Message.setProto3IntField(this, 2, value);
        };


        /**
         * optional bytes cpProto = 3;
         * @return {!(string|Uint8Array)}
         */
        proto.stream.JoinOverReq.prototype.getCpproto = function () {
            return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
        };


        /**
         * optional bytes cpProto = 3;
         * This is a type-conversion wrapper around `getCpproto()`
         * @return {string}
         */
        proto.stream.JoinOverReq.prototype.getCpproto_asB64 = function () {
            return /** @type {string} */ (jspb.Message.bytesAsB64(
                this.getCpproto()));
        };


        /**
         * optional bytes cpProto = 3;
         * Note that Uint8Array is not supported on all browsers.
         * @see http://caniuse.com/Uint8Array
         * This is a type-conversion wrapper around `getCpproto()`
         * @return {!Uint8Array}
         */
        proto.stream.JoinOverReq.prototype.getCpproto_asU8 = function () {
            return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
                this.getCpproto()));
        };


        /** @param {!(string|Uint8Array)} value */
        proto.stream.JoinOverReq.prototype.setCpproto = function (value) {
            jspb.Message.setProto3BytesField(this, 3, value);
        };


        /**
         * optional uint32 userID = 4;
         * @return {number}
         */
        proto.stream.JoinOverReq.prototype.getUserid = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
        };


        /** @param {number} value */
        proto.stream.JoinOverReq.prototype.setUserid = function (value) {
            jspb.Message.setProto3IntField(this, 4, value);
        };


        /**
         * Generated by JsPbCodeGenerator.
         * @param {Array=} opt_data Optional initial data array, typically from a
         * server response, or constructed directly in Javascript. The array is used
         * in place and becomes part of the constructed object. It is not cloned.
         * If no data is provided, the constructed object will be empty, but still
         * valid.
         * @extends {jspb.Message}
         * @constructor
         */
        proto.stream.JoinOverRsp = function (opt_data) {
            jspb.Message.initialize(this, opt_data, 0, -1, null, null);
        };
        goog.inherits(proto.stream.JoinOverRsp, jspb.Message);
        if (goog.DEBUG && !COMPILED) {
            proto.stream.JoinOverRsp.displayName = "proto.stream.JoinOverRsp";
        }


        if (jspb.Message.GENERATE_TO_OBJECT) {
            /**
             * Creates an object representation of this proto suitable for use in Soy templates.
             * Field names that are reserved in JavaScript and will be renamed to pb_name.
             * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
             * For the list of reserved names please see:
             *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
             * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
             *     for transitional soy proto support: http://goto/soy-param-migration
             * @return {!Object}
             */
            proto.stream.JoinOverRsp.prototype.toObject = function (opt_includeInstance) {
                return proto.stream.JoinOverRsp.toObject(opt_includeInstance, this);
            };


            /**
             * Static version of the {@see toObject} method.
             * @param {boolean|undefined} includeInstance Whether to include the JSPB
             *     instance for transitional soy proto support:
             *     http://goto/soy-param-migration
             * @param {!proto.stream.JoinOverRsp} msg The msg instance to transform.
             * @return {!Object}
             * @suppress {unusedLocalVariables} f is only used for nested messages
             */
            proto.stream.JoinOverRsp.toObject = function (includeInstance, msg) {
                var f, obj = {
                    status: jspb.Message.getFieldWithDefault(msg, 1, 0),
                    cpproto: msg.getCpproto_asB64()
                };

                if (includeInstance) {
                    obj.$jspbMessageInstance = msg;
                }
                return obj;
            };
        }


        /**
         * Deserializes binary data (in protobuf wire format).
         * @param {jspb.ByteSource} bytes The bytes to deserialize.
         * @return {!proto.stream.JoinOverRsp}
         */
        proto.stream.JoinOverRsp.deserializeBinary = function (bytes) {
            var reader = new jspb.BinaryReader(bytes);
            var msg = new proto.stream.JoinOverRsp;
            return proto.stream.JoinOverRsp.deserializeBinaryFromReader(msg, reader);
        };


        /**
         * Deserializes binary data (in protobuf wire format) from the
         * given reader into the given message object.
         * @param {!proto.stream.JoinOverRsp} msg The message object to deserialize into.
         * @param {!jspb.BinaryReader} reader The BinaryReader to use.
         * @return {!proto.stream.JoinOverRsp}
         */
        proto.stream.JoinOverRsp.deserializeBinaryFromReader = function (msg, reader) {
            while (reader.nextField()) {
                if (reader.isEndGroup()) {
                    break;
                }
                var field = reader.getFieldNumber();
                switch (field) {
                case 1:
                    var value = /** @type {!proto.stream.ErrorCode} */ (reader.readEnum());
                    msg.setStatus(value);
                    break;
                case 2:
                    var value = /** @type {!Uint8Array} */ (reader.readBytes());
                    msg.setCpproto(value);
                    break;
                default:
                    reader.skipField();
                    break;
                }
            }
            return msg;
        };


        /**
         * Serializes the message to binary data (in protobuf wire format).
         * @return {!Uint8Array}
         */
        proto.stream.JoinOverRsp.prototype.serializeBinary = function () {
            var writer = new jspb.BinaryWriter();
            proto.stream.JoinOverRsp.serializeBinaryToWriter(this, writer);
            return writer.getResultBuffer();
        };


        /**
         * Serializes the given message to binary data (in protobuf wire
         * format), writing to the given BinaryWriter.
         * @param {!proto.stream.JoinOverRsp} message
         * @param {!jspb.BinaryWriter} writer
         * @suppress {unusedLocalVariables} f is only used for nested messages
         */
        proto.stream.JoinOverRsp.serializeBinaryToWriter = function (message, writer) {
            var f = undefined;
            f = message.getStatus();
            if (f !== 0.0) {
                writer.writeEnum(
                    1,
                    f
                );
            }
            f = message.getCpproto_asU8();
            if (f.length > 0) {
                writer.writeBytes(
                    2,
                    f
                );
            }
        };


        /**
         * optional ErrorCode status = 1;
         * @return {!proto.stream.ErrorCode}
         */
        proto.stream.JoinOverRsp.prototype.getStatus = function () {
            return /** @type {!proto.stream.ErrorCode} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
        };


        /** @param {!proto.stream.ErrorCode} value */
        proto.stream.JoinOverRsp.prototype.setStatus = function (value) {
            jspb.Message.setProto3EnumField(this, 1, value);
        };


        /**
         * optional bytes cpProto = 2;
         * @return {!(string|Uint8Array)}
         */
        proto.stream.JoinOverRsp.prototype.getCpproto = function () {
            return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
        };


        /**
         * optional bytes cpProto = 2;
         * This is a type-conversion wrapper around `getCpproto()`
         * @return {string}
         */
        proto.stream.JoinOverRsp.prototype.getCpproto_asB64 = function () {
            return /** @type {string} */ (jspb.Message.bytesAsB64(
                this.getCpproto()));
        };


        /**
         * optional bytes cpProto = 2;
         * Note that Uint8Array is not supported on all browsers.
         * @see http://caniuse.com/Uint8Array
         * This is a type-conversion wrapper around `getCpproto()`
         * @return {!Uint8Array}
         */
        proto.stream.JoinOverRsp.prototype.getCpproto_asU8 = function () {
            return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
                this.getCpproto()));
        };


        /** @param {!(string|Uint8Array)} value */
        proto.stream.JoinOverRsp.prototype.setCpproto = function (value) {
            jspb.Message.setProto3BytesField(this, 2, value);
        };


        /**
         * Generated by JsPbCodeGenerator.
         * @param {Array=} opt_data Optional initial data array, typically from a
         * server response, or constructed directly in Javascript. The array is used
         * in place and becomes part of the constructed object. It is not cloned.
         * If no data is provided, the constructed object will be empty, but still
         * valid.
         * @extends {jspb.Message}
         * @constructor
         */
        proto.stream.JoinOverNotify = function (opt_data) {
            jspb.Message.initialize(this, opt_data, 0, -1, null, null);
        };
        goog.inherits(proto.stream.JoinOverNotify, jspb.Message);
        if (goog.DEBUG && !COMPILED) {
            proto.stream.JoinOverNotify.displayName = "proto.stream.JoinOverNotify";
        }


        if (jspb.Message.GENERATE_TO_OBJECT) {
            /**
             * Creates an object representation of this proto suitable for use in Soy templates.
             * Field names that are reserved in JavaScript and will be renamed to pb_name.
             * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
             * For the list of reserved names please see:
             *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
             * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
             *     for transitional soy proto support: http://goto/soy-param-migration
             * @return {!Object}
             */
            proto.stream.JoinOverNotify.prototype.toObject = function (opt_includeInstance) {
                return proto.stream.JoinOverNotify.toObject(opt_includeInstance, this);
            };


            /**
             * Static version of the {@see toObject} method.
             * @param {boolean|undefined} includeInstance Whether to include the JSPB
             *     instance for transitional soy proto support:
             *     http://goto/soy-param-migration
             * @param {!proto.stream.JoinOverNotify} msg The msg instance to transform.
             * @return {!Object}
             * @suppress {unusedLocalVariables} f is only used for nested messages
             */
            proto.stream.JoinOverNotify.toObject = function (includeInstance, msg) {
                var f, obj = {
                    srcuserid: jspb.Message.getFieldWithDefault(msg, 1, 0),
                    roomid: jspb.Message.getFieldWithDefault(msg, 2, "0"),
                    cpproto: msg.getCpproto_asB64()
                };

                if (includeInstance) {
                    obj.$jspbMessageInstance = msg;
                }
                return obj;
            };
        }


        /**
         * Deserializes binary data (in protobuf wire format).
         * @param {jspb.ByteSource} bytes The bytes to deserialize.
         * @return {!proto.stream.JoinOverNotify}
         */
        proto.stream.JoinOverNotify.deserializeBinary = function (bytes) {
            var reader = new jspb.BinaryReader(bytes);
            var msg = new proto.stream.JoinOverNotify;
            return proto.stream.JoinOverNotify.deserializeBinaryFromReader(msg, reader);
        };


        /**
         * Deserializes binary data (in protobuf wire format) from the
         * given reader into the given message object.
         * @param {!proto.stream.JoinOverNotify} msg The message object to deserialize into.
         * @param {!jspb.BinaryReader} reader The BinaryReader to use.
         * @return {!proto.stream.JoinOverNotify}
         */
        proto.stream.JoinOverNotify.deserializeBinaryFromReader = function (msg, reader) {
            while (reader.nextField()) {
                if (reader.isEndGroup()) {
                    break;
                }
                var field = reader.getFieldNumber();
                switch (field) {
                case 1:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setSrcuserid(value);
                    break;
                case 2:
                    var value = /** @type {string} */ (reader.readUint64String());
                    msg.setRoomid(value);
                    break;
                case 3:
                    var value = /** @type {!Uint8Array} */ (reader.readBytes());
                    msg.setCpproto(value);
                    break;
                default:
                    reader.skipField();
                    break;
                }
            }
            return msg;
        };


        /**
         * Serializes the message to binary data (in protobuf wire format).
         * @return {!Uint8Array}
         */
        proto.stream.JoinOverNotify.prototype.serializeBinary = function () {
            var writer = new jspb.BinaryWriter();
            proto.stream.JoinOverNotify.serializeBinaryToWriter(this, writer);
            return writer.getResultBuffer();
        };


        /**
         * Serializes the given message to binary data (in protobuf wire
         * format), writing to the given BinaryWriter.
         * @param {!proto.stream.JoinOverNotify} message
         * @param {!jspb.BinaryWriter} writer
         * @suppress {unusedLocalVariables} f is only used for nested messages
         */
        proto.stream.JoinOverNotify.serializeBinaryToWriter = function (message, writer) {
            var f = undefined;
            f = message.getSrcuserid();
            if (f !== 0) {
                writer.writeUint32(
                    1,
                    f
                );
            }
            f = message.getRoomid();
            if (parseInt(f, 10) !== 0) {
                writer.writeUint64String(
                    2,
                    f
                );
            }
            f = message.getCpproto_asU8();
            if (f.length > 0) {
                writer.writeBytes(
                    3,
                    f
                );
            }
        };


        /**
         * optional uint32 srcUserID = 1;
         * @return {number}
         */
        proto.stream.JoinOverNotify.prototype.getSrcuserid = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
        };


        /** @param {number} value */
        proto.stream.JoinOverNotify.prototype.setSrcuserid = function (value) {
            jspb.Message.setProto3IntField(this, 1, value);
        };


        /**
         * optional uint64 roomID = 2;
         * @return {string}
         */
        proto.stream.JoinOverNotify.prototype.getRoomid = function () {
            return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, "0"));
        };


        /** @param {string} value */
        proto.stream.JoinOverNotify.prototype.setRoomid = function (value) {
            jspb.Message.setProto3StringIntField(this, 2, value);
        };


        /**
         * optional bytes cpProto = 3;
         * @return {!(string|Uint8Array)}
         */
        proto.stream.JoinOverNotify.prototype.getCpproto = function () {
            return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
        };


        /**
         * optional bytes cpProto = 3;
         * This is a type-conversion wrapper around `getCpproto()`
         * @return {string}
         */
        proto.stream.JoinOverNotify.prototype.getCpproto_asB64 = function () {
            return /** @type {string} */ (jspb.Message.bytesAsB64(
                this.getCpproto()));
        };


        /**
         * optional bytes cpProto = 3;
         * Note that Uint8Array is not supported on all browsers.
         * @see http://caniuse.com/Uint8Array
         * This is a type-conversion wrapper around `getCpproto()`
         * @return {!Uint8Array}
         */
        proto.stream.JoinOverNotify.prototype.getCpproto_asU8 = function () {
            return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
                this.getCpproto()));
        };


        /** @param {!(string|Uint8Array)} value */
        proto.stream.JoinOverNotify.prototype.setCpproto = function (value) {
            jspb.Message.setProto3BytesField(this, 3, value);
        };


        /**
         * Generated by JsPbCodeGenerator.
         * @param {Array=} opt_data Optional initial data array, typically from a
         * server response, or constructed directly in Javascript. The array is used
         * in place and becomes part of the constructed object. It is not cloned.
         * If no data is provided, the constructed object will be empty, but still
         * valid.
         * @extends {jspb.Message}
         * @constructor
         */
        proto.stream.JoinOpenReq = function (opt_data) {
            jspb.Message.initialize(this, opt_data, 0, -1, null, null);
        };
        goog.inherits(proto.stream.JoinOpenReq, jspb.Message);
        if (goog.DEBUG && !COMPILED) {
            proto.stream.JoinOpenReq.displayName = "proto.stream.JoinOpenReq";
        }


        if (jspb.Message.GENERATE_TO_OBJECT) {
            /**
             * Creates an object representation of this proto suitable for use in Soy templates.
             * Field names that are reserved in JavaScript and will be renamed to pb_name.
             * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
             * For the list of reserved names please see:
             *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
             * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
             *     for transitional soy proto support: http://goto/soy-param-migration
             * @return {!Object}
             */
            proto.stream.JoinOpenReq.prototype.toObject = function (opt_includeInstance) {
                return proto.stream.JoinOpenReq.toObject(opt_includeInstance, this);
            };


            /**
             * Static version of the {@see toObject} method.
             * @param {boolean|undefined} includeInstance Whether to include the JSPB
             *     instance for transitional soy proto support:
             *     http://goto/soy-param-migration
             * @param {!proto.stream.JoinOpenReq} msg The msg instance to transform.
             * @return {!Object}
             * @suppress {unusedLocalVariables} f is only used for nested messages
             */
            proto.stream.JoinOpenReq.toObject = function (includeInstance, msg) {
                var f, obj = {
                    roomid: jspb.Message.getFieldWithDefault(msg, 1, "0"),
                    gameid: jspb.Message.getFieldWithDefault(msg, 2, 0),
                    userid: jspb.Message.getFieldWithDefault(msg, 3, 0),
                    cpproto: msg.getCpproto_asB64()
                };

                if (includeInstance) {
                    obj.$jspbMessageInstance = msg;
                }
                return obj;
            };
        }


        /**
         * Deserializes binary data (in protobuf wire format).
         * @param {jspb.ByteSource} bytes The bytes to deserialize.
         * @return {!proto.stream.JoinOpenReq}
         */
        proto.stream.JoinOpenReq.deserializeBinary = function (bytes) {
            var reader = new jspb.BinaryReader(bytes);
            var msg = new proto.stream.JoinOpenReq;
            return proto.stream.JoinOpenReq.deserializeBinaryFromReader(msg, reader);
        };


        /**
         * Deserializes binary data (in protobuf wire format) from the
         * given reader into the given message object.
         * @param {!proto.stream.JoinOpenReq} msg The message object to deserialize into.
         * @param {!jspb.BinaryReader} reader The BinaryReader to use.
         * @return {!proto.stream.JoinOpenReq}
         */
        proto.stream.JoinOpenReq.deserializeBinaryFromReader = function (msg, reader) {
            while (reader.nextField()) {
                if (reader.isEndGroup()) {
                    break;
                }
                var field = reader.getFieldNumber();
                switch (field) {
                case 1:
                    var value = /** @type {string} */ (reader.readUint64String());
                    msg.setRoomid(value);
                    break;
                case 2:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setGameid(value);
                    break;
                case 3:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setUserid(value);
                    break;
                case 4:
                    var value = /** @type {!Uint8Array} */ (reader.readBytes());
                    msg.setCpproto(value);
                    break;
                default:
                    reader.skipField();
                    break;
                }
            }
            return msg;
        };


        /**
         * Serializes the message to binary data (in protobuf wire format).
         * @return {!Uint8Array}
         */
        proto.stream.JoinOpenReq.prototype.serializeBinary = function () {
            var writer = new jspb.BinaryWriter();
            proto.stream.JoinOpenReq.serializeBinaryToWriter(this, writer);
            return writer.getResultBuffer();
        };


        /**
         * Serializes the given message to binary data (in protobuf wire
         * format), writing to the given BinaryWriter.
         * @param {!proto.stream.JoinOpenReq} message
         * @param {!jspb.BinaryWriter} writer
         * @suppress {unusedLocalVariables} f is only used for nested messages
         */
        proto.stream.JoinOpenReq.serializeBinaryToWriter = function (message, writer) {
            var f = undefined;
            f = message.getRoomid();
            if (parseInt(f, 10) !== 0) {
                writer.writeUint64String(
                    1,
                    f
                );
            }
            f = message.getGameid();
            if (f !== 0) {
                writer.writeUint32(
                    2,
                    f
                );
            }
            f = message.getUserid();
            if (f !== 0) {
                writer.writeUint32(
                    3,
                    f
                );
            }
            f = message.getCpproto_asU8();
            if (f.length > 0) {
                writer.writeBytes(
                    4,
                    f
                );
            }
        };


        /**
         * optional uint64 roomID = 1;
         * @return {string}
         */
        proto.stream.JoinOpenReq.prototype.getRoomid = function () {
            return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, "0"));
        };


        /** @param {string} value */
        proto.stream.JoinOpenReq.prototype.setRoomid = function (value) {
            jspb.Message.setProto3StringIntField(this, 1, value);
        };


        /**
         * optional uint32 gameID = 2;
         * @return {number}
         */
        proto.stream.JoinOpenReq.prototype.getGameid = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
        };


        /** @param {number} value */
        proto.stream.JoinOpenReq.prototype.setGameid = function (value) {
            jspb.Message.setProto3IntField(this, 2, value);
        };


        /**
         * optional uint32 userID = 3;
         * @return {number}
         */
        proto.stream.JoinOpenReq.prototype.getUserid = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
        };


        /** @param {number} value */
        proto.stream.JoinOpenReq.prototype.setUserid = function (value) {
            jspb.Message.setProto3IntField(this, 3, value);
        };


        /**
         * optional bytes cpProto = 4;
         * @return {!(string|Uint8Array)}
         */
        proto.stream.JoinOpenReq.prototype.getCpproto = function () {
            return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
        };


        /**
         * optional bytes cpProto = 4;
         * This is a type-conversion wrapper around `getCpproto()`
         * @return {string}
         */
        proto.stream.JoinOpenReq.prototype.getCpproto_asB64 = function () {
            return /** @type {string} */ (jspb.Message.bytesAsB64(
                this.getCpproto()));
        };


        /**
         * optional bytes cpProto = 4;
         * Note that Uint8Array is not supported on all browsers.
         * @see http://caniuse.com/Uint8Array
         * This is a type-conversion wrapper around `getCpproto()`
         * @return {!Uint8Array}
         */
        proto.stream.JoinOpenReq.prototype.getCpproto_asU8 = function () {
            return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
                this.getCpproto()));
        };


        /** @param {!(string|Uint8Array)} value */
        proto.stream.JoinOpenReq.prototype.setCpproto = function (value) {
            jspb.Message.setProto3BytesField(this, 4, value);
        };


        /**
         * Generated by JsPbCodeGenerator.
         * @param {Array=} opt_data Optional initial data array, typically from a
         * server response, or constructed directly in Javascript. The array is used
         * in place and becomes part of the constructed object. It is not cloned.
         * If no data is provided, the constructed object will be empty, but still
         * valid.
         * @extends {jspb.Message}
         * @constructor
         */
        proto.stream.JoinOpenRsp = function (opt_data) {
            jspb.Message.initialize(this, opt_data, 0, -1, null, null);
        };
        goog.inherits(proto.stream.JoinOpenRsp, jspb.Message);
        if (goog.DEBUG && !COMPILED) {
            proto.stream.JoinOpenRsp.displayName = "proto.stream.JoinOpenRsp";
        }


        if (jspb.Message.GENERATE_TO_OBJECT) {
            /**
             * Creates an object representation of this proto suitable for use in Soy templates.
             * Field names that are reserved in JavaScript and will be renamed to pb_name.
             * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
             * For the list of reserved names please see:
             *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
             * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
             *     for transitional soy proto support: http://goto/soy-param-migration
             * @return {!Object}
             */
            proto.stream.JoinOpenRsp.prototype.toObject = function (opt_includeInstance) {
                return proto.stream.JoinOpenRsp.toObject(opt_includeInstance, this);
            };


            /**
             * Static version of the {@see toObject} method.
             * @param {boolean|undefined} includeInstance Whether to include the JSPB
             *     instance for transitional soy proto support:
             *     http://goto/soy-param-migration
             * @param {!proto.stream.JoinOpenRsp} msg The msg instance to transform.
             * @return {!Object}
             * @suppress {unusedLocalVariables} f is only used for nested messages
             */
            proto.stream.JoinOpenRsp.toObject = function (includeInstance, msg) {
                var f, obj = {
                    status: jspb.Message.getFieldWithDefault(msg, 1, 0),
                    cpproto: msg.getCpproto_asB64()
                };

                if (includeInstance) {
                    obj.$jspbMessageInstance = msg;
                }
                return obj;
            };
        }


        /**
         * Deserializes binary data (in protobuf wire format).
         * @param {jspb.ByteSource} bytes The bytes to deserialize.
         * @return {!proto.stream.JoinOpenRsp}
         */
        proto.stream.JoinOpenRsp.deserializeBinary = function (bytes) {
            var reader = new jspb.BinaryReader(bytes);
            var msg = new proto.stream.JoinOpenRsp;
            return proto.stream.JoinOpenRsp.deserializeBinaryFromReader(msg, reader);
        };


        /**
         * Deserializes binary data (in protobuf wire format) from the
         * given reader into the given message object.
         * @param {!proto.stream.JoinOpenRsp} msg The message object to deserialize into.
         * @param {!jspb.BinaryReader} reader The BinaryReader to use.
         * @return {!proto.stream.JoinOpenRsp}
         */
        proto.stream.JoinOpenRsp.deserializeBinaryFromReader = function (msg, reader) {
            while (reader.nextField()) {
                if (reader.isEndGroup()) {
                    break;
                }
                var field = reader.getFieldNumber();
                switch (field) {
                case 1:
                    var value = /** @type {!proto.stream.ErrorCode} */ (reader.readEnum());
                    msg.setStatus(value);
                    break;
                case 2:
                    var value = /** @type {!Uint8Array} */ (reader.readBytes());
                    msg.setCpproto(value);
                    break;
                default:
                    reader.skipField();
                    break;
                }
            }
            return msg;
        };


        /**
         * Serializes the message to binary data (in protobuf wire format).
         * @return {!Uint8Array}
         */
        proto.stream.JoinOpenRsp.prototype.serializeBinary = function () {
            var writer = new jspb.BinaryWriter();
            proto.stream.JoinOpenRsp.serializeBinaryToWriter(this, writer);
            return writer.getResultBuffer();
        };


        /**
         * Serializes the given message to binary data (in protobuf wire
         * format), writing to the given BinaryWriter.
         * @param {!proto.stream.JoinOpenRsp} message
         * @param {!jspb.BinaryWriter} writer
         * @suppress {unusedLocalVariables} f is only used for nested messages
         */
        proto.stream.JoinOpenRsp.serializeBinaryToWriter = function (message, writer) {
            var f = undefined;
            f = message.getStatus();
            if (f !== 0.0) {
                writer.writeEnum(
                    1,
                    f
                );
            }
            f = message.getCpproto_asU8();
            if (f.length > 0) {
                writer.writeBytes(
                    2,
                    f
                );
            }
        };


        /**
         * optional ErrorCode status = 1;
         * @return {!proto.stream.ErrorCode}
         */
        proto.stream.JoinOpenRsp.prototype.getStatus = function () {
            return /** @type {!proto.stream.ErrorCode} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
        };


        /** @param {!proto.stream.ErrorCode} value */
        proto.stream.JoinOpenRsp.prototype.setStatus = function (value) {
            jspb.Message.setProto3EnumField(this, 1, value);
        };


        /**
         * optional bytes cpProto = 2;
         * @return {!(string|Uint8Array)}
         */
        proto.stream.JoinOpenRsp.prototype.getCpproto = function () {
            return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
        };


        /**
         * optional bytes cpProto = 2;
         * This is a type-conversion wrapper around `getCpproto()`
         * @return {string}
         */
        proto.stream.JoinOpenRsp.prototype.getCpproto_asB64 = function () {
            return /** @type {string} */ (jspb.Message.bytesAsB64(
                this.getCpproto()));
        };


        /**
         * optional bytes cpProto = 2;
         * Note that Uint8Array is not supported on all browsers.
         * @see http://caniuse.com/Uint8Array
         * This is a type-conversion wrapper around `getCpproto()`
         * @return {!Uint8Array}
         */
        proto.stream.JoinOpenRsp.prototype.getCpproto_asU8 = function () {
            return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
                this.getCpproto()));
        };


        /** @param {!(string|Uint8Array)} value */
        proto.stream.JoinOpenRsp.prototype.setCpproto = function (value) {
            jspb.Message.setProto3BytesField(this, 2, value);
        };


        /**
         * Generated by JsPbCodeGenerator.
         * @param {Array=} opt_data Optional initial data array, typically from a
         * server response, or constructed directly in Javascript. The array is used
         * in place and becomes part of the constructed object. It is not cloned.
         * If no data is provided, the constructed object will be empty, but still
         * valid.
         * @extends {jspb.Message}
         * @constructor
         */
        proto.stream.JoinOpenNotify = function (opt_data) {
            jspb.Message.initialize(this, opt_data, 0, -1, null, null);
        };
        goog.inherits(proto.stream.JoinOpenNotify, jspb.Message);
        if (goog.DEBUG && !COMPILED) {
            proto.stream.JoinOpenNotify.displayName = "proto.stream.JoinOpenNotify";
        }


        if (jspb.Message.GENERATE_TO_OBJECT) {
            /**
             * Creates an object representation of this proto suitable for use in Soy templates.
             * Field names that are reserved in JavaScript and will be renamed to pb_name.
             * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
             * For the list of reserved names please see:
             *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
             * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
             *     for transitional soy proto support: http://goto/soy-param-migration
             * @return {!Object}
             */
            proto.stream.JoinOpenNotify.prototype.toObject = function (opt_includeInstance) {
                return proto.stream.JoinOpenNotify.toObject(opt_includeInstance, this);
            };


            /**
             * Static version of the {@see toObject} method.
             * @param {boolean|undefined} includeInstance Whether to include the JSPB
             *     instance for transitional soy proto support:
             *     http://goto/soy-param-migration
             * @param {!proto.stream.JoinOpenNotify} msg The msg instance to transform.
             * @return {!Object}
             * @suppress {unusedLocalVariables} f is only used for nested messages
             */
            proto.stream.JoinOpenNotify.toObject = function (includeInstance, msg) {
                var f, obj = {
                    userid: jspb.Message.getFieldWithDefault(msg, 1, 0),
                    roomid: jspb.Message.getFieldWithDefault(msg, 2, "0"),
                    cpproto: msg.getCpproto_asB64()
                };

                if (includeInstance) {
                    obj.$jspbMessageInstance = msg;
                }
                return obj;
            };
        }


        /**
         * Deserializes binary data (in protobuf wire format).
         * @param {jspb.ByteSource} bytes The bytes to deserialize.
         * @return {!proto.stream.JoinOpenNotify}
         */
        proto.stream.JoinOpenNotify.deserializeBinary = function (bytes) {
            var reader = new jspb.BinaryReader(bytes);
            var msg = new proto.stream.JoinOpenNotify;
            return proto.stream.JoinOpenNotify.deserializeBinaryFromReader(msg, reader);
        };


        /**
         * Deserializes binary data (in protobuf wire format) from the
         * given reader into the given message object.
         * @param {!proto.stream.JoinOpenNotify} msg The message object to deserialize into.
         * @param {!jspb.BinaryReader} reader The BinaryReader to use.
         * @return {!proto.stream.JoinOpenNotify}
         */
        proto.stream.JoinOpenNotify.deserializeBinaryFromReader = function (msg, reader) {
            while (reader.nextField()) {
                if (reader.isEndGroup()) {
                    break;
                }
                var field = reader.getFieldNumber();
                switch (field) {
                case 1:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setUserid(value);
                    break;
                case 2:
                    var value = /** @type {string} */ (reader.readUint64String());
                    msg.setRoomid(value);
                    break;
                case 3:
                    var value = /** @type {!Uint8Array} */ (reader.readBytes());
                    msg.setCpproto(value);
                    break;
                default:
                    reader.skipField();
                    break;
                }
            }
            return msg;
        };


        /**
         * Serializes the message to binary data (in protobuf wire format).
         * @return {!Uint8Array}
         */
        proto.stream.JoinOpenNotify.prototype.serializeBinary = function () {
            var writer = new jspb.BinaryWriter();
            proto.stream.JoinOpenNotify.serializeBinaryToWriter(this, writer);
            return writer.getResultBuffer();
        };


        /**
         * Serializes the given message to binary data (in protobuf wire
         * format), writing to the given BinaryWriter.
         * @param {!proto.stream.JoinOpenNotify} message
         * @param {!jspb.BinaryWriter} writer
         * @suppress {unusedLocalVariables} f is only used for nested messages
         */
        proto.stream.JoinOpenNotify.serializeBinaryToWriter = function (message, writer) {
            var f = undefined;
            f = message.getUserid();
            if (f !== 0) {
                writer.writeUint32(
                    1,
                    f
                );
            }
            f = message.getRoomid();
            if (parseInt(f, 10) !== 0) {
                writer.writeUint64String(
                    2,
                    f
                );
            }
            f = message.getCpproto_asU8();
            if (f.length > 0) {
                writer.writeBytes(
                    3,
                    f
                );
            }
        };


        /**
         * optional uint32 userID = 1;
         * @return {number}
         */
        proto.stream.JoinOpenNotify.prototype.getUserid = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
        };


        /** @param {number} value */
        proto.stream.JoinOpenNotify.prototype.setUserid = function (value) {
            jspb.Message.setProto3IntField(this, 1, value);
        };


        /**
         * optional uint64 roomID = 2;
         * @return {string}
         */
        proto.stream.JoinOpenNotify.prototype.getRoomid = function () {
            return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, "0"));
        };


        /** @param {string} value */
        proto.stream.JoinOpenNotify.prototype.setRoomid = function (value) {
            jspb.Message.setProto3StringIntField(this, 2, value);
        };


        /**
         * optional bytes cpProto = 3;
         * @return {!(string|Uint8Array)}
         */
        proto.stream.JoinOpenNotify.prototype.getCpproto = function () {
            return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
        };


        /**
         * optional bytes cpProto = 3;
         * This is a type-conversion wrapper around `getCpproto()`
         * @return {string}
         */
        proto.stream.JoinOpenNotify.prototype.getCpproto_asB64 = function () {
            return /** @type {string} */ (jspb.Message.bytesAsB64(
                this.getCpproto()));
        };


        /**
         * optional bytes cpProto = 3;
         * Note that Uint8Array is not supported on all browsers.
         * @see http://caniuse.com/Uint8Array
         * This is a type-conversion wrapper around `getCpproto()`
         * @return {!Uint8Array}
         */
        proto.stream.JoinOpenNotify.prototype.getCpproto_asU8 = function () {
            return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
                this.getCpproto()));
        };


        /** @param {!(string|Uint8Array)} value */
        proto.stream.JoinOpenNotify.prototype.setCpproto = function (value) {
            jspb.Message.setProto3BytesField(this, 3, value);
        };


        /**
         * Generated by JsPbCodeGenerator.
         * @param {Array=} opt_data Optional initial data array, typically from a
         * server response, or constructed directly in Javascript. The array is used
         * in place and becomes part of the constructed object. It is not cloned.
         * If no data is provided, the constructed object will be empty, but still
         * valid.
         * @extends {jspb.Message}
         * @constructor
         */
        proto.stream.LeaveRoomReq = function (opt_data) {
            jspb.Message.initialize(this, opt_data, 0, -1, null, null);
        };
        goog.inherits(proto.stream.LeaveRoomReq, jspb.Message);
        if (goog.DEBUG && !COMPILED) {
            proto.stream.LeaveRoomReq.displayName = "proto.stream.LeaveRoomReq";
        }


        if (jspb.Message.GENERATE_TO_OBJECT) {
            /**
             * Creates an object representation of this proto suitable for use in Soy templates.
             * Field names that are reserved in JavaScript and will be renamed to pb_name.
             * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
             * For the list of reserved names please see:
             *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
             * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
             *     for transitional soy proto support: http://goto/soy-param-migration
             * @return {!Object}
             */
            proto.stream.LeaveRoomReq.prototype.toObject = function (opt_includeInstance) {
                return proto.stream.LeaveRoomReq.toObject(opt_includeInstance, this);
            };


            /**
             * Static version of the {@see toObject} method.
             * @param {boolean|undefined} includeInstance Whether to include the JSPB
             *     instance for transitional soy proto support:
             *     http://goto/soy-param-migration
             * @param {!proto.stream.LeaveRoomReq} msg The msg instance to transform.
             * @return {!Object}
             * @suppress {unusedLocalVariables} f is only used for nested messages
             */
            proto.stream.LeaveRoomReq.toObject = function (includeInstance, msg) {
                var f, obj = {
                    userid: jspb.Message.getFieldWithDefault(msg, 1, 0),
                    gameid: jspb.Message.getFieldWithDefault(msg, 2, 0),
                    roomid: jspb.Message.getFieldWithDefault(msg, 3, "0"),
                    cpproto: msg.getCpproto_asB64()
                };

                if (includeInstance) {
                    obj.$jspbMessageInstance = msg;
                }
                return obj;
            };
        }


        /**
         * Deserializes binary data (in protobuf wire format).
         * @param {jspb.ByteSource} bytes The bytes to deserialize.
         * @return {!proto.stream.LeaveRoomReq}
         */
        proto.stream.LeaveRoomReq.deserializeBinary = function (bytes) {
            var reader = new jspb.BinaryReader(bytes);
            var msg = new proto.stream.LeaveRoomReq;
            return proto.stream.LeaveRoomReq.deserializeBinaryFromReader(msg, reader);
        };


        /**
         * Deserializes binary data (in protobuf wire format) from the
         * given reader into the given message object.
         * @param {!proto.stream.LeaveRoomReq} msg The message object to deserialize into.
         * @param {!jspb.BinaryReader} reader The BinaryReader to use.
         * @return {!proto.stream.LeaveRoomReq}
         */
        proto.stream.LeaveRoomReq.deserializeBinaryFromReader = function (msg, reader) {
            while (reader.nextField()) {
                if (reader.isEndGroup()) {
                    break;
                }
                var field = reader.getFieldNumber();
                switch (field) {
                case 1:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setUserid(value);
                    break;
                case 2:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setGameid(value);
                    break;
                case 3:
                    var value = /** @type {string} */ (reader.readUint64String());
                    msg.setRoomid(value);
                    break;
                case 4:
                    var value = /** @type {!Uint8Array} */ (reader.readBytes());
                    msg.setCpproto(value);
                    break;
                default:
                    reader.skipField();
                    break;
                }
            }
            return msg;
        };


        /**
         * Serializes the message to binary data (in protobuf wire format).
         * @return {!Uint8Array}
         */
        proto.stream.LeaveRoomReq.prototype.serializeBinary = function () {
            var writer = new jspb.BinaryWriter();
            proto.stream.LeaveRoomReq.serializeBinaryToWriter(this, writer);
            return writer.getResultBuffer();
        };


        /**
         * Serializes the given message to binary data (in protobuf wire
         * format), writing to the given BinaryWriter.
         * @param {!proto.stream.LeaveRoomReq} message
         * @param {!jspb.BinaryWriter} writer
         * @suppress {unusedLocalVariables} f is only used for nested messages
         */
        proto.stream.LeaveRoomReq.serializeBinaryToWriter = function (message, writer) {
            var f = undefined;
            f = message.getUserid();
            if (f !== 0) {
                writer.writeUint32(
                    1,
                    f
                );
            }
            f = message.getGameid();
            if (f !== 0) {
                writer.writeUint32(
                    2,
                    f
                );
            }
            f = message.getRoomid();
            if (parseInt(f, 10) !== 0) {
                writer.writeUint64String(
                    3,
                    f
                );
            }
            f = message.getCpproto_asU8();
            if (f.length > 0) {
                writer.writeBytes(
                    4,
                    f
                );
            }
        };


        /**
         * optional uint32 userID = 1;
         * @return {number}
         */
        proto.stream.LeaveRoomReq.prototype.getUserid = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
        };


        /** @param {number} value */
        proto.stream.LeaveRoomReq.prototype.setUserid = function (value) {
            jspb.Message.setProto3IntField(this, 1, value);
        };


        /**
         * optional uint32 gameID = 2;
         * @return {number}
         */
        proto.stream.LeaveRoomReq.prototype.getGameid = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
        };


        /** @param {number} value */
        proto.stream.LeaveRoomReq.prototype.setGameid = function (value) {
            jspb.Message.setProto3IntField(this, 2, value);
        };


        /**
         * optional uint64 roomID = 3;
         * @return {string}
         */
        proto.stream.LeaveRoomReq.prototype.getRoomid = function () {
            return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, "0"));
        };


        /** @param {string} value */
        proto.stream.LeaveRoomReq.prototype.setRoomid = function (value) {
            jspb.Message.setProto3StringIntField(this, 3, value);
        };


        /**
         * optional bytes cpProto = 4;
         * @return {!(string|Uint8Array)}
         */
        proto.stream.LeaveRoomReq.prototype.getCpproto = function () {
            return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
        };


        /**
         * optional bytes cpProto = 4;
         * This is a type-conversion wrapper around `getCpproto()`
         * @return {string}
         */
        proto.stream.LeaveRoomReq.prototype.getCpproto_asB64 = function () {
            return /** @type {string} */ (jspb.Message.bytesAsB64(
                this.getCpproto()));
        };


        /**
         * optional bytes cpProto = 4;
         * Note that Uint8Array is not supported on all browsers.
         * @see http://caniuse.com/Uint8Array
         * This is a type-conversion wrapper around `getCpproto()`
         * @return {!Uint8Array}
         */
        proto.stream.LeaveRoomReq.prototype.getCpproto_asU8 = function () {
            return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
                this.getCpproto()));
        };


        /** @param {!(string|Uint8Array)} value */
        proto.stream.LeaveRoomReq.prototype.setCpproto = function (value) {
            jspb.Message.setProto3BytesField(this, 4, value);
        };


        /**
         * Generated by JsPbCodeGenerator.
         * @param {Array=} opt_data Optional initial data array, typically from a
         * server response, or constructed directly in Javascript. The array is used
         * in place and becomes part of the constructed object. It is not cloned.
         * If no data is provided, the constructed object will be empty, but still
         * valid.
         * @extends {jspb.Message}
         * @constructor
         */
        proto.stream.LeaveRoomRsp = function (opt_data) {
            jspb.Message.initialize(this, opt_data, 0, -1, null, null);
        };
        goog.inherits(proto.stream.LeaveRoomRsp, jspb.Message);
        if (goog.DEBUG && !COMPILED) {
            proto.stream.LeaveRoomRsp.displayName = "proto.stream.LeaveRoomRsp";
        }


        if (jspb.Message.GENERATE_TO_OBJECT) {
            /**
             * Creates an object representation of this proto suitable for use in Soy templates.
             * Field names that are reserved in JavaScript and will be renamed to pb_name.
             * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
             * For the list of reserved names please see:
             *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
             * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
             *     for transitional soy proto support: http://goto/soy-param-migration
             * @return {!Object}
             */
            proto.stream.LeaveRoomRsp.prototype.toObject = function (opt_includeInstance) {
                return proto.stream.LeaveRoomRsp.toObject(opt_includeInstance, this);
            };


            /**
             * Static version of the {@see toObject} method.
             * @param {boolean|undefined} includeInstance Whether to include the JSPB
             *     instance for transitional soy proto support:
             *     http://goto/soy-param-migration
             * @param {!proto.stream.LeaveRoomRsp} msg The msg instance to transform.
             * @return {!Object}
             * @suppress {unusedLocalVariables} f is only used for nested messages
             */
            proto.stream.LeaveRoomRsp.toObject = function (includeInstance, msg) {
                var f, obj = {
                    status: jspb.Message.getFieldWithDefault(msg, 1, 0),
                    roomid: jspb.Message.getFieldWithDefault(msg, 2, "0"),
                    userid: jspb.Message.getFieldWithDefault(msg, 3, 0),
                    cpproto: msg.getCpproto_asB64()
                };

                if (includeInstance) {
                    obj.$jspbMessageInstance = msg;
                }
                return obj;
            };
        }


        /**
         * Deserializes binary data (in protobuf wire format).
         * @param {jspb.ByteSource} bytes The bytes to deserialize.
         * @return {!proto.stream.LeaveRoomRsp}
         */
        proto.stream.LeaveRoomRsp.deserializeBinary = function (bytes) {
            var reader = new jspb.BinaryReader(bytes);
            var msg = new proto.stream.LeaveRoomRsp;
            return proto.stream.LeaveRoomRsp.deserializeBinaryFromReader(msg, reader);
        };


        /**
         * Deserializes binary data (in protobuf wire format) from the
         * given reader into the given message object.
         * @param {!proto.stream.LeaveRoomRsp} msg The message object to deserialize into.
         * @param {!jspb.BinaryReader} reader The BinaryReader to use.
         * @return {!proto.stream.LeaveRoomRsp}
         */
        proto.stream.LeaveRoomRsp.deserializeBinaryFromReader = function (msg, reader) {
            while (reader.nextField()) {
                if (reader.isEndGroup()) {
                    break;
                }
                var field = reader.getFieldNumber();
                switch (field) {
                case 1:
                    var value = /** @type {!proto.stream.ErrorCode} */ (reader.readEnum());
                    msg.setStatus(value);
                    break;
                case 2:
                    var value = /** @type {string} */ (reader.readUint64String());
                    msg.setRoomid(value);
                    break;
                case 3:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setUserid(value);
                    break;
                case 4:
                    var value = /** @type {!Uint8Array} */ (reader.readBytes());
                    msg.setCpproto(value);
                    break;
                default:
                    reader.skipField();
                    break;
                }
            }
            return msg;
        };


        /**
         * Serializes the message to binary data (in protobuf wire format).
         * @return {!Uint8Array}
         */
        proto.stream.LeaveRoomRsp.prototype.serializeBinary = function () {
            var writer = new jspb.BinaryWriter();
            proto.stream.LeaveRoomRsp.serializeBinaryToWriter(this, writer);
            return writer.getResultBuffer();
        };


        /**
         * Serializes the given message to binary data (in protobuf wire
         * format), writing to the given BinaryWriter.
         * @param {!proto.stream.LeaveRoomRsp} message
         * @param {!jspb.BinaryWriter} writer
         * @suppress {unusedLocalVariables} f is only used for nested messages
         */
        proto.stream.LeaveRoomRsp.serializeBinaryToWriter = function (message, writer) {
            var f = undefined;
            f = message.getStatus();
            if (f !== 0.0) {
                writer.writeEnum(
                    1,
                    f
                );
            }
            f = message.getRoomid();
            if (parseInt(f, 10) !== 0) {
                writer.writeUint64String(
                    2,
                    f
                );
            }
            f = message.getUserid();
            if (f !== 0) {
                writer.writeUint32(
                    3,
                    f
                );
            }
            f = message.getCpproto_asU8();
            if (f.length > 0) {
                writer.writeBytes(
                    4,
                    f
                );
            }
        };


        /**
         * optional ErrorCode status = 1;
         * @return {!proto.stream.ErrorCode}
         */
        proto.stream.LeaveRoomRsp.prototype.getStatus = function () {
            return /** @type {!proto.stream.ErrorCode} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
        };


        /** @param {!proto.stream.ErrorCode} value */
        proto.stream.LeaveRoomRsp.prototype.setStatus = function (value) {
            jspb.Message.setProto3EnumField(this, 1, value);
        };


        /**
         * optional uint64 roomID = 2;
         * @return {string}
         */
        proto.stream.LeaveRoomRsp.prototype.getRoomid = function () {
            return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, "0"));
        };


        /** @param {string} value */
        proto.stream.LeaveRoomRsp.prototype.setRoomid = function (value) {
            jspb.Message.setProto3StringIntField(this, 2, value);
        };


        /**
         * optional uint32 userID = 3;
         * @return {number}
         */
        proto.stream.LeaveRoomRsp.prototype.getUserid = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
        };


        /** @param {number} value */
        proto.stream.LeaveRoomRsp.prototype.setUserid = function (value) {
            jspb.Message.setProto3IntField(this, 3, value);
        };


        /**
         * optional bytes cpProto = 4;
         * @return {!(string|Uint8Array)}
         */
        proto.stream.LeaveRoomRsp.prototype.getCpproto = function () {
            return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
        };


        /**
         * optional bytes cpProto = 4;
         * This is a type-conversion wrapper around `getCpproto()`
         * @return {string}
         */
        proto.stream.LeaveRoomRsp.prototype.getCpproto_asB64 = function () {
            return /** @type {string} */ (jspb.Message.bytesAsB64(
                this.getCpproto()));
        };


        /**
         * optional bytes cpProto = 4;
         * Note that Uint8Array is not supported on all browsers.
         * @see http://caniuse.com/Uint8Array
         * This is a type-conversion wrapper around `getCpproto()`
         * @return {!Uint8Array}
         */
        proto.stream.LeaveRoomRsp.prototype.getCpproto_asU8 = function () {
            return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
                this.getCpproto()));
        };


        /** @param {!(string|Uint8Array)} value */
        proto.stream.LeaveRoomRsp.prototype.setCpproto = function (value) {
            jspb.Message.setProto3BytesField(this, 4, value);
        };


        /**
         * Generated by JsPbCodeGenerator.
         * @param {Array=} opt_data Optional initial data array, typically from a
         * server response, or constructed directly in Javascript. The array is used
         * in place and becomes part of the constructed object. It is not cloned.
         * If no data is provided, the constructed object will be empty, but still
         * valid.
         * @extends {jspb.Message}
         * @constructor
         */
        proto.stream.TcpProtoHeader = function (opt_data) {
            jspb.Message.initialize(this, opt_data, 0, -1, null, null);
        };
        goog.inherits(proto.stream.TcpProtoHeader, jspb.Message);
        if (goog.DEBUG && !COMPILED) {
            proto.stream.TcpProtoHeader.displayName = "proto.stream.TcpProtoHeader";
        }


        if (jspb.Message.GENERATE_TO_OBJECT) {
            /**
             * Creates an object representation of this proto suitable for use in Soy templates.
             * Field names that are reserved in JavaScript and will be renamed to pb_name.
             * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
             * For the list of reserved names please see:
             *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
             * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
             *     for transitional soy proto support: http://goto/soy-param-migration
             * @return {!Object}
             */
            proto.stream.TcpProtoHeader.prototype.toObject = function (opt_includeInstance) {
                return proto.stream.TcpProtoHeader.toObject(opt_includeInstance, this);
            };


            /**
             * Static version of the {@see toObject} method.
             * @param {boolean|undefined} includeInstance Whether to include the JSPB
             *     instance for transitional soy proto support:
             *     http://goto/soy-param-migration
             * @param {!proto.stream.TcpProtoHeader} msg The msg instance to transform.
             * @return {!Object}
             * @suppress {unusedLocalVariables} f is only used for nested messages
             */
            proto.stream.TcpProtoHeader.toObject = function (includeInstance, msg) {
                var f, obj = {
                    size: jspb.Message.getFieldWithDefault(msg, 1, 0),
                    seq: jspb.Message.getFieldWithDefault(msg, 2, 0),
                    cmd: jspb.Message.getFieldWithDefault(msg, 3, 0),
                    version: jspb.Message.getFieldWithDefault(msg, 4, 0),
                    userid: jspb.Message.getFieldWithDefault(msg, 5, 0)
                };

                if (includeInstance) {
                    obj.$jspbMessageInstance = msg;
                }
                return obj;
            };
        }


        /**
         * Deserializes binary data (in protobuf wire format).
         * @param {jspb.ByteSource} bytes The bytes to deserialize.
         * @return {!proto.stream.TcpProtoHeader}
         */
        proto.stream.TcpProtoHeader.deserializeBinary = function (bytes) {
            var reader = new jspb.BinaryReader(bytes);
            var msg = new proto.stream.TcpProtoHeader;
            return proto.stream.TcpProtoHeader.deserializeBinaryFromReader(msg, reader);
        };


        /**
         * Deserializes binary data (in protobuf wire format) from the
         * given reader into the given message object.
         * @param {!proto.stream.TcpProtoHeader} msg The message object to deserialize into.
         * @param {!jspb.BinaryReader} reader The BinaryReader to use.
         * @return {!proto.stream.TcpProtoHeader}
         */
        proto.stream.TcpProtoHeader.deserializeBinaryFromReader = function (msg, reader) {
            while (reader.nextField()) {
                if (reader.isEndGroup()) {
                    break;
                }
                var field = reader.getFieldNumber();
                switch (field) {
                case 1:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setSize(value);
                    break;
                case 2:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setSeq(value);
                    break;
                case 3:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setCmd(value);
                    break;
                case 4:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setVersion(value);
                    break;
                case 5:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setUserid(value);
                    break;
                default:
                    reader.skipField();
                    break;
                }
            }
            return msg;
        };


        /**
         * Serializes the message to binary data (in protobuf wire format).
         * @return {!Uint8Array}
         */
        proto.stream.TcpProtoHeader.prototype.serializeBinary = function () {
            var writer = new jspb.BinaryWriter();
            proto.stream.TcpProtoHeader.serializeBinaryToWriter(this, writer);
            return writer.getResultBuffer();
        };


        /**
         * Serializes the given message to binary data (in protobuf wire
         * format), writing to the given BinaryWriter.
         * @param {!proto.stream.TcpProtoHeader} message
         * @param {!jspb.BinaryWriter} writer
         * @suppress {unusedLocalVariables} f is only used for nested messages
         */
        proto.stream.TcpProtoHeader.serializeBinaryToWriter = function (message, writer) {
            var f = undefined;
            f = message.getSize();
            if (f !== 0) {
                writer.writeUint32(
                    1,
                    f
                );
            }
            f = message.getSeq();
            if (f !== 0) {
                writer.writeUint32(
                    2,
                    f
                );
            }
            f = message.getCmd();
            if (f !== 0) {
                writer.writeUint32(
                    3,
                    f
                );
            }
            f = message.getVersion();
            if (f !== 0) {
                writer.writeUint32(
                    4,
                    f
                );
            }
            f = message.getUserid();
            if (f !== 0) {
                writer.writeUint32(
                    5,
                    f
                );
            }
        };


        /**
         * optional uint32 size = 1;
         * @return {number}
         */
        proto.stream.TcpProtoHeader.prototype.getSize = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
        };


        /** @param {number} value */
        proto.stream.TcpProtoHeader.prototype.setSize = function (value) {
            jspb.Message.setProto3IntField(this, 1, value);
        };


        /**
         * optional uint32 seq = 2;
         * @return {number}
         */
        proto.stream.TcpProtoHeader.prototype.getSeq = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
        };


        /** @param {number} value */
        proto.stream.TcpProtoHeader.prototype.setSeq = function (value) {
            jspb.Message.setProto3IntField(this, 2, value);
        };


        /**
         * optional uint32 cmd = 3;
         * @return {number}
         */
        proto.stream.TcpProtoHeader.prototype.getCmd = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
        };


        /** @param {number} value */
        proto.stream.TcpProtoHeader.prototype.setCmd = function (value) {
            jspb.Message.setProto3IntField(this, 3, value);
        };


        /**
         * optional uint32 version = 4;
         * @return {number}
         */
        proto.stream.TcpProtoHeader.prototype.getVersion = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
        };


        /** @param {number} value */
        proto.stream.TcpProtoHeader.prototype.setVersion = function (value) {
            jspb.Message.setProto3IntField(this, 4, value);
        };


        /**
         * optional uint32 userID = 5;
         * @return {number}
         */
        proto.stream.TcpProtoHeader.prototype.getUserid = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
        };


        /** @param {number} value */
        proto.stream.TcpProtoHeader.prototype.setUserid = function (value) {
            jspb.Message.setProto3IntField(this, 5, value);
        };


        /**
         * Generated by JsPbCodeGenerator.
         * @param {Array=} opt_data Optional initial data array, typically from a
         * server response, or constructed directly in Javascript. The array is used
         * in place and becomes part of the constructed object. It is not cloned.
         * If no data is provided, the constructed object will be empty, but still
         * valid.
         * @extends {jspb.Message}
         * @constructor
         */
        proto.stream.ConnDetailV2 = function (opt_data) {
            jspb.Message.initialize(this, opt_data, 0, -1, null, null);
        };
        goog.inherits(proto.stream.ConnDetailV2, jspb.Message);
        if (goog.DEBUG && !COMPILED) {
            proto.stream.ConnDetailV2.displayName = "proto.stream.ConnDetailV2";
        }


        if (jspb.Message.GENERATE_TO_OBJECT) {
            /**
             * Creates an object representation of this proto suitable for use in Soy templates.
             * Field names that are reserved in JavaScript and will be renamed to pb_name.
             * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
             * For the list of reserved names please see:
             *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
             * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
             *     for transitional soy proto support: http://goto/soy-param-migration
             * @return {!Object}
             */
            proto.stream.ConnDetailV2.prototype.toObject = function (opt_includeInstance) {
                return proto.stream.ConnDetailV2.toObject(opt_includeInstance, this);
            };


            /**
             * Static version of the {@see toObject} method.
             * @param {boolean|undefined} includeInstance Whether to include the JSPB
             *     instance for transitional soy proto support:
             *     http://goto/soy-param-migration
             * @param {!proto.stream.ConnDetailV2} msg The msg instance to transform.
             * @return {!Object}
             * @suppress {unusedLocalVariables} f is only used for nested messages
             */
            proto.stream.ConnDetailV2.toObject = function (includeInstance, msg) {
                var f, obj = {
                    userid: jspb.Message.getFieldWithDefault(msg, 1, 0),
                    gameid: jspb.Message.getFieldWithDefault(msg, 2, 0),
                    fieldid: jspb.Message.getFieldWithDefault(msg, 3, 0),
                    roomid: jspb.Message.getFieldWithDefault(msg, 4, "0"),
                    heartbeattime: jspb.Message.getFieldWithDefault(msg, 5, "0"),
                    version: jspb.Message.getFieldWithDefault(msg, 6, 0)
                };

                if (includeInstance) {
                    obj.$jspbMessageInstance = msg;
                }
                return obj;
            };
        }


        /**
         * Deserializes binary data (in protobuf wire format).
         * @param {jspb.ByteSource} bytes The bytes to deserialize.
         * @return {!proto.stream.ConnDetailV2}
         */
        proto.stream.ConnDetailV2.deserializeBinary = function (bytes) {
            var reader = new jspb.BinaryReader(bytes);
            var msg = new proto.stream.ConnDetailV2;
            return proto.stream.ConnDetailV2.deserializeBinaryFromReader(msg, reader);
        };


        /**
         * Deserializes binary data (in protobuf wire format) from the
         * given reader into the given message object.
         * @param {!proto.stream.ConnDetailV2} msg The message object to deserialize into.
         * @param {!jspb.BinaryReader} reader The BinaryReader to use.
         * @return {!proto.stream.ConnDetailV2}
         */
        proto.stream.ConnDetailV2.deserializeBinaryFromReader = function (msg, reader) {
            while (reader.nextField()) {
                if (reader.isEndGroup()) {
                    break;
                }
                var field = reader.getFieldNumber();
                switch (field) {
                case 1:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setUserid(value);
                    break;
                case 2:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setGameid(value);
                    break;
                case 3:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setFieldid(value);
                    break;
                case 4:
                    var value = /** @type {string} */ (reader.readUint64String());
                    msg.setRoomid(value);
                    break;
                case 5:
                    var value = /** @type {string} */ (reader.readUint64String());
                    msg.setHeartbeattime(value);
                    break;
                case 6:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setVersion(value);
                    break;
                default:
                    reader.skipField();
                    break;
                }
            }
            return msg;
        };


        /**
         * Serializes the message to binary data (in protobuf wire format).
         * @return {!Uint8Array}
         */
        proto.stream.ConnDetailV2.prototype.serializeBinary = function () {
            var writer = new jspb.BinaryWriter();
            proto.stream.ConnDetailV2.serializeBinaryToWriter(this, writer);
            return writer.getResultBuffer();
        };


        /**
         * Serializes the given message to binary data (in protobuf wire
         * format), writing to the given BinaryWriter.
         * @param {!proto.stream.ConnDetailV2} message
         * @param {!jspb.BinaryWriter} writer
         * @suppress {unusedLocalVariables} f is only used for nested messages
         */
        proto.stream.ConnDetailV2.serializeBinaryToWriter = function (message, writer) {
            var f = undefined;
            f = message.getUserid();
            if (f !== 0) {
                writer.writeUint32(
                    1,
                    f
                );
            }
            f = message.getGameid();
            if (f !== 0) {
                writer.writeUint32(
                    2,
                    f
                );
            }
            f = message.getFieldid();
            if (f !== 0) {
                writer.writeUint32(
                    3,
                    f
                );
            }
            f = message.getRoomid();
            if (parseInt(f, 10) !== 0) {
                writer.writeUint64String(
                    4,
                    f
                );
            }
            f = message.getHeartbeattime();
            if (parseInt(f, 10) !== 0) {
                writer.writeUint64String(
                    5,
                    f
                );
            }
            f = message.getVersion();
            if (f !== 0) {
                writer.writeUint32(
                    6,
                    f
                );
            }
        };


        /**
         * optional uint32 userID = 1;
         * @return {number}
         */
        proto.stream.ConnDetailV2.prototype.getUserid = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
        };


        /** @param {number} value */
        proto.stream.ConnDetailV2.prototype.setUserid = function (value) {
            jspb.Message.setProto3IntField(this, 1, value);
        };


        /**
         * optional uint32 gameID = 2;
         * @return {number}
         */
        proto.stream.ConnDetailV2.prototype.getGameid = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
        };


        /** @param {number} value */
        proto.stream.ConnDetailV2.prototype.setGameid = function (value) {
            jspb.Message.setProto3IntField(this, 2, value);
        };


        /**
         * optional uint32 fieldID = 3;
         * @return {number}
         */
        proto.stream.ConnDetailV2.prototype.getFieldid = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
        };


        /** @param {number} value */
        proto.stream.ConnDetailV2.prototype.setFieldid = function (value) {
            jspb.Message.setProto3IntField(this, 3, value);
        };


        /**
         * optional uint64 roomID = 4;
         * @return {string}
         */
        proto.stream.ConnDetailV2.prototype.getRoomid = function () {
            return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, "0"));
        };


        /** @param {string} value */
        proto.stream.ConnDetailV2.prototype.setRoomid = function (value) {
            jspb.Message.setProto3StringIntField(this, 4, value);
        };


        /**
         * optional uint64 heartBeatTime = 5;
         * @return {string}
         */
        proto.stream.ConnDetailV2.prototype.getHeartbeattime = function () {
            return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, "0"));
        };


        /** @param {string} value */
        proto.stream.ConnDetailV2.prototype.setHeartbeattime = function (value) {
            jspb.Message.setProto3StringIntField(this, 5, value);
        };


        /**
         * optional uint32 version = 6;
         * @return {number}
         */
        proto.stream.ConnDetailV2.prototype.getVersion = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
        };


        /** @param {number} value */
        proto.stream.ConnDetailV2.prototype.setVersion = function (value) {
            jspb.Message.setProto3IntField(this, 6, value);
        };


        /**
         * Generated by JsPbCodeGenerator.
         * @param {Array=} opt_data Optional initial data array, typically from a
         * server response, or constructed directly in Javascript. The array is used
         * in place and becomes part of the constructed object. It is not cloned.
         * If no data is provided, the constructed object will be empty, but still
         * valid.
         * @extends {jspb.Message}
         * @constructor
         */
        proto.stream.UserV2 = function (opt_data) {
            jspb.Message.initialize(this, opt_data, 0, -1, null, null);
        };
        goog.inherits(proto.stream.UserV2, jspb.Message);
        if (goog.DEBUG && !COMPILED) {
            proto.stream.UserV2.displayName = "proto.stream.UserV2";
        }


        if (jspb.Message.GENERATE_TO_OBJECT) {
            /**
             * Creates an object representation of this proto suitable for use in Soy templates.
             * Field names that are reserved in JavaScript and will be renamed to pb_name.
             * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
             * For the list of reserved names please see:
             *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
             * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
             *     for transitional soy proto support: http://goto/soy-param-migration
             * @return {!Object}
             */
            proto.stream.UserV2.prototype.toObject = function (opt_includeInstance) {
                return proto.stream.UserV2.toObject(opt_includeInstance, this);
            };


            /**
             * Static version of the {@see toObject} method.
             * @param {boolean|undefined} includeInstance Whether to include the JSPB
             *     instance for transitional soy proto support:
             *     http://goto/soy-param-migration
             * @param {!proto.stream.UserV2} msg The msg instance to transform.
             * @return {!Object}
             * @suppress {unusedLocalVariables} f is only used for nested messages
             */
            proto.stream.UserV2.toObject = function (includeInstance, msg) {
                var f, obj = {
                    userId: jspb.Message.getFieldWithDefault(msg, 1, 0),
                    gameId: jspb.Message.getFieldWithDefault(msg, 2, 0),
                    versionSdk: jspb.Message.getFieldWithDefault(msg, 3, 0),
                    connectionId: jspb.Message.getFieldWithDefault(msg, 4, "0"),
                    serviceId: jspb.Message.getFieldWithDefault(msg, 5, 0),
                    roomId: jspb.Message.getFieldWithDefault(msg, 6, "0"),
                    deviceId: jspb.Message.getFieldWithDefault(msg, 7, ""),
                    connStatus: jspb.Message.getFieldWithDefault(msg, 8, 0)
                };

                if (includeInstance) {
                    obj.$jspbMessageInstance = msg;
                }
                return obj;
            };
        }


        /**
         * Deserializes binary data (in protobuf wire format).
         * @param {jspb.ByteSource} bytes The bytes to deserialize.
         * @return {!proto.stream.UserV2}
         */
        proto.stream.UserV2.deserializeBinary = function (bytes) {
            var reader = new jspb.BinaryReader(bytes);
            var msg = new proto.stream.UserV2;
            return proto.stream.UserV2.deserializeBinaryFromReader(msg, reader);
        };


        /**
         * Deserializes binary data (in protobuf wire format) from the
         * given reader into the given message object.
         * @param {!proto.stream.UserV2} msg The message object to deserialize into.
         * @param {!jspb.BinaryReader} reader The BinaryReader to use.
         * @return {!proto.stream.UserV2}
         */
        proto.stream.UserV2.deserializeBinaryFromReader = function (msg, reader) {
            while (reader.nextField()) {
                if (reader.isEndGroup()) {
                    break;
                }
                var field = reader.getFieldNumber();
                switch (field) {
                case 1:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setUserId(value);
                    break;
                case 2:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setGameId(value);
                    break;
                case 3:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setVersionSdk(value);
                    break;
                case 4:
                    var value = /** @type {string} */ (reader.readUint64String());
                    msg.setConnectionId(value);
                    break;
                case 5:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setServiceId(value);
                    break;
                case 6:
                    var value = /** @type {string} */ (reader.readUint64String());
                    msg.setRoomId(value);
                    break;
                case 7:
                    var value = /** @type {string} */ (reader.readString());
                    msg.setDeviceId(value);
                    break;
                case 8:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setConnStatus(value);
                    break;
                default:
                    reader.skipField();
                    break;
                }
            }
            return msg;
        };


        /**
         * Serializes the message to binary data (in protobuf wire format).
         * @return {!Uint8Array}
         */
        proto.stream.UserV2.prototype.serializeBinary = function () {
            var writer = new jspb.BinaryWriter();
            proto.stream.UserV2.serializeBinaryToWriter(this, writer);
            return writer.getResultBuffer();
        };


        /**
         * Serializes the given message to binary data (in protobuf wire
         * format), writing to the given BinaryWriter.
         * @param {!proto.stream.UserV2} message
         * @param {!jspb.BinaryWriter} writer
         * @suppress {unusedLocalVariables} f is only used for nested messages
         */
        proto.stream.UserV2.serializeBinaryToWriter = function (message, writer) {
            var f = undefined;
            f = message.getUserId();
            if (f !== 0) {
                writer.writeUint32(
                    1,
                    f
                );
            }
            f = message.getGameId();
            if (f !== 0) {
                writer.writeUint32(
                    2,
                    f
                );
            }
            f = message.getVersionSdk();
            if (f !== 0) {
                writer.writeUint32(
                    3,
                    f
                );
            }
            f = message.getConnectionId();
            if (parseInt(f, 10) !== 0) {
                writer.writeUint64String(
                    4,
                    f
                );
            }
            f = message.getServiceId();
            if (f !== 0) {
                writer.writeUint32(
                    5,
                    f
                );
            }
            f = message.getRoomId();
            if (parseInt(f, 10) !== 0) {
                writer.writeUint64String(
                    6,
                    f
                );
            }
            f = message.getDeviceId();
            if (f.length > 0) {
                writer.writeString(
                    7,
                    f
                );
            }
            f = message.getConnStatus();
            if (f !== 0) {
                writer.writeUint32(
                    8,
                    f
                );
            }
        };


        /**
         * optional uint32 user_id = 1;
         * @return {number}
         */
        proto.stream.UserV2.prototype.getUserId = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
        };


        /** @param {number} value */
        proto.stream.UserV2.prototype.setUserId = function (value) {
            jspb.Message.setProto3IntField(this, 1, value);
        };


        /**
         * optional uint32 game_id = 2;
         * @return {number}
         */
        proto.stream.UserV2.prototype.getGameId = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
        };


        /** @param {number} value */
        proto.stream.UserV2.prototype.setGameId = function (value) {
            jspb.Message.setProto3IntField(this, 2, value);
        };


        /**
         * optional uint32 version_sdk = 3;
         * @return {number}
         */
        proto.stream.UserV2.prototype.getVersionSdk = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
        };


        /** @param {number} value */
        proto.stream.UserV2.prototype.setVersionSdk = function (value) {
            jspb.Message.setProto3IntField(this, 3, value);
        };


        /**
         * optional uint64 connection_id = 4;
         * @return {string}
         */
        proto.stream.UserV2.prototype.getConnectionId = function () {
            return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, "0"));
        };


        /** @param {string} value */
        proto.stream.UserV2.prototype.setConnectionId = function (value) {
            jspb.Message.setProto3StringIntField(this, 4, value);
        };


        /**
         * optional uint32 service_id = 5;
         * @return {number}
         */
        proto.stream.UserV2.prototype.getServiceId = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
        };


        /** @param {number} value */
        proto.stream.UserV2.prototype.setServiceId = function (value) {
            jspb.Message.setProto3IntField(this, 5, value);
        };


        /**
         * optional uint64 room_id = 6;
         * @return {string}
         */
        proto.stream.UserV2.prototype.getRoomId = function () {
            return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, "0"));
        };


        /** @param {string} value */
        proto.stream.UserV2.prototype.setRoomId = function (value) {
            jspb.Message.setProto3StringIntField(this, 6, value);
        };


        /**
         * optional string device_id = 7;
         * @return {string}
         */
        proto.stream.UserV2.prototype.getDeviceId = function () {
            return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 7, ""));
        };


        /** @param {string} value */
        proto.stream.UserV2.prototype.setDeviceId = function (value) {
            jspb.Message.setProto3StringField(this, 7, value);
        };


        /**
         * optional uint32 conn_status = 8;
         * @return {number}
         */
        proto.stream.UserV2.prototype.getConnStatus = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 8, 0));
        };


        /** @param {number} value */
        proto.stream.UserV2.prototype.setConnStatus = function (value) {
            jspb.Message.setProto3IntField(this, 8, value);
        };


        /**
         * Generated by JsPbCodeGenerator.
         * @param {Array=} opt_data Optional initial data array, typically from a
         * server response, or constructed directly in Javascript. The array is used
         * in place and becomes part of the constructed object. It is not cloned.
         * If no data is provided, the constructed object will be empty, but still
         * valid.
         * @extends {jspb.Message}
         * @constructor
         */
        proto.stream.NetworkStateReq = function (opt_data) {
            jspb.Message.initialize(this, opt_data, 0, -1, null, null);
        };
        goog.inherits(proto.stream.NetworkStateReq, jspb.Message);
        if (goog.DEBUG && !COMPILED) {
            proto.stream.NetworkStateReq.displayName = "proto.stream.NetworkStateReq";
        }


        if (jspb.Message.GENERATE_TO_OBJECT) {
            /**
             * Creates an object representation of this proto suitable for use in Soy templates.
             * Field names that are reserved in JavaScript and will be renamed to pb_name.
             * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
             * For the list of reserved names please see:
             *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
             * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
             *     for transitional soy proto support: http://goto/soy-param-migration
             * @return {!Object}
             */
            proto.stream.NetworkStateReq.prototype.toObject = function (opt_includeInstance) {
                return proto.stream.NetworkStateReq.toObject(opt_includeInstance, this);
            };


            /**
             * Static version of the {@see toObject} method.
             * @param {boolean|undefined} includeInstance Whether to include the JSPB
             *     instance for transitional soy proto support:
             *     http://goto/soy-param-migration
             * @param {!proto.stream.NetworkStateReq} msg The msg instance to transform.
             * @return {!Object}
             * @suppress {unusedLocalVariables} f is only used for nested messages
             */
            proto.stream.NetworkStateReq.toObject = function (includeInstance, msg) {
                var f, obj = {
                    gameid: jspb.Message.getFieldWithDefault(msg, 1, 0),
                    roomid: jspb.Message.getFieldWithDefault(msg, 2, "0"),
                    userid: jspb.Message.getFieldWithDefault(msg, 3, 0),
                    state: jspb.Message.getFieldWithDefault(msg, 4, 0)
                };

                if (includeInstance) {
                    obj.$jspbMessageInstance = msg;
                }
                return obj;
            };
        }


        /**
         * Deserializes binary data (in protobuf wire format).
         * @param {jspb.ByteSource} bytes The bytes to deserialize.
         * @return {!proto.stream.NetworkStateReq}
         */
        proto.stream.NetworkStateReq.deserializeBinary = function (bytes) {
            var reader = new jspb.BinaryReader(bytes);
            var msg = new proto.stream.NetworkStateReq;
            return proto.stream.NetworkStateReq.deserializeBinaryFromReader(msg, reader);
        };


        /**
         * Deserializes binary data (in protobuf wire format) from the
         * given reader into the given message object.
         * @param {!proto.stream.NetworkStateReq} msg The message object to deserialize into.
         * @param {!jspb.BinaryReader} reader The BinaryReader to use.
         * @return {!proto.stream.NetworkStateReq}
         */
        proto.stream.NetworkStateReq.deserializeBinaryFromReader = function (msg, reader) {
            while (reader.nextField()) {
                if (reader.isEndGroup()) {
                    break;
                }
                var field = reader.getFieldNumber();
                switch (field) {
                case 1:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setGameid(value);
                    break;
                case 2:
                    var value = /** @type {string} */ (reader.readUint64String());
                    msg.setRoomid(value);
                    break;
                case 3:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setUserid(value);
                    break;
                case 4:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setState(value);
                    break;
                default:
                    reader.skipField();
                    break;
                }
            }
            return msg;
        };


        /**
         * Serializes the message to binary data (in protobuf wire format).
         * @return {!Uint8Array}
         */
        proto.stream.NetworkStateReq.prototype.serializeBinary = function () {
            var writer = new jspb.BinaryWriter();
            proto.stream.NetworkStateReq.serializeBinaryToWriter(this, writer);
            return writer.getResultBuffer();
        };


        /**
         * Serializes the given message to binary data (in protobuf wire
         * format), writing to the given BinaryWriter.
         * @param {!proto.stream.NetworkStateReq} message
         * @param {!jspb.BinaryWriter} writer
         * @suppress {unusedLocalVariables} f is only used for nested messages
         */
        proto.stream.NetworkStateReq.serializeBinaryToWriter = function (message, writer) {
            var f = undefined;
            f = message.getGameid();
            if (f !== 0) {
                writer.writeUint32(
                    1,
                    f
                );
            }
            f = message.getRoomid();
            if (parseInt(f, 10) !== 0) {
                writer.writeUint64String(
                    2,
                    f
                );
            }
            f = message.getUserid();
            if (f !== 0) {
                writer.writeUint32(
                    3,
                    f
                );
            }
            f = message.getState();
            if (f !== 0) {
                writer.writeUint32(
                    4,
                    f
                );
            }
        };


        /**
         * optional uint32 gameID = 1;
         * @return {number}
         */
        proto.stream.NetworkStateReq.prototype.getGameid = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
        };


        /** @param {number} value */
        proto.stream.NetworkStateReq.prototype.setGameid = function (value) {
            jspb.Message.setProto3IntField(this, 1, value);
        };


        /**
         * optional uint64 roomID = 2;
         * @return {string}
         */
        proto.stream.NetworkStateReq.prototype.getRoomid = function () {
            return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, "0"));
        };


        /** @param {string} value */
        proto.stream.NetworkStateReq.prototype.setRoomid = function (value) {
            jspb.Message.setProto3StringIntField(this, 2, value);
        };


        /**
         * optional uint32 UserID = 3;
         * @return {number}
         */
        proto.stream.NetworkStateReq.prototype.getUserid = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
        };


        /** @param {number} value */
        proto.stream.NetworkStateReq.prototype.setUserid = function (value) {
            jspb.Message.setProto3IntField(this, 3, value);
        };


        /**
         * optional uint32 state = 4;
         * @return {number}
         */
        proto.stream.NetworkStateReq.prototype.getState = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
        };


        /** @param {number} value */
        proto.stream.NetworkStateReq.prototype.setState = function (value) {
            jspb.Message.setProto3IntField(this, 4, value);
        };


        /**
         * Generated by JsPbCodeGenerator.
         * @param {Array=} opt_data Optional initial data array, typically from a
         * server response, or constructed directly in Javascript. The array is used
         * in place and becomes part of the constructed object. It is not cloned.
         * If no data is provided, the constructed object will be empty, but still
         * valid.
         * @extends {jspb.Message}
         * @constructor
         */
        proto.stream.NetworkStateRsp = function (opt_data) {
            jspb.Message.initialize(this, opt_data, 0, -1, null, null);
        };
        goog.inherits(proto.stream.NetworkStateRsp, jspb.Message);
        if (goog.DEBUG && !COMPILED) {
            proto.stream.NetworkStateRsp.displayName = "proto.stream.NetworkStateRsp";
        }


        if (jspb.Message.GENERATE_TO_OBJECT) {
            /**
             * Creates an object representation of this proto suitable for use in Soy templates.
             * Field names that are reserved in JavaScript and will be renamed to pb_name.
             * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
             * For the list of reserved names please see:
             *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
             * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
             *     for transitional soy proto support: http://goto/soy-param-migration
             * @return {!Object}
             */
            proto.stream.NetworkStateRsp.prototype.toObject = function (opt_includeInstance) {
                return proto.stream.NetworkStateRsp.toObject(opt_includeInstance, this);
            };


            /**
             * Static version of the {@see toObject} method.
             * @param {boolean|undefined} includeInstance Whether to include the JSPB
             *     instance for transitional soy proto support:
             *     http://goto/soy-param-migration
             * @param {!proto.stream.NetworkStateRsp} msg The msg instance to transform.
             * @return {!Object}
             * @suppress {unusedLocalVariables} f is only used for nested messages
             */
            proto.stream.NetworkStateRsp.toObject = function (includeInstance, msg) {
                var f, obj = {
                    status: jspb.Message.getFieldWithDefault(msg, 1, 0)
                };

                if (includeInstance) {
                    obj.$jspbMessageInstance = msg;
                }
                return obj;
            };
        }


        /**
         * Deserializes binary data (in protobuf wire format).
         * @param {jspb.ByteSource} bytes The bytes to deserialize.
         * @return {!proto.stream.NetworkStateRsp}
         */
        proto.stream.NetworkStateRsp.deserializeBinary = function (bytes) {
            var reader = new jspb.BinaryReader(bytes);
            var msg = new proto.stream.NetworkStateRsp;
            return proto.stream.NetworkStateRsp.deserializeBinaryFromReader(msg, reader);
        };


        /**
         * Deserializes binary data (in protobuf wire format) from the
         * given reader into the given message object.
         * @param {!proto.stream.NetworkStateRsp} msg The message object to deserialize into.
         * @param {!jspb.BinaryReader} reader The BinaryReader to use.
         * @return {!proto.stream.NetworkStateRsp}
         */
        proto.stream.NetworkStateRsp.deserializeBinaryFromReader = function (msg, reader) {
            while (reader.nextField()) {
                if (reader.isEndGroup()) {
                    break;
                }
                var field = reader.getFieldNumber();
                switch (field) {
                case 1:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setStatus(value);
                    break;
                default:
                    reader.skipField();
                    break;
                }
            }
            return msg;
        };


        /**
         * Serializes the message to binary data (in protobuf wire format).
         * @return {!Uint8Array}
         */
        proto.stream.NetworkStateRsp.prototype.serializeBinary = function () {
            var writer = new jspb.BinaryWriter();
            proto.stream.NetworkStateRsp.serializeBinaryToWriter(this, writer);
            return writer.getResultBuffer();
        };


        /**
         * Serializes the given message to binary data (in protobuf wire
         * format), writing to the given BinaryWriter.
         * @param {!proto.stream.NetworkStateRsp} message
         * @param {!jspb.BinaryWriter} writer
         * @suppress {unusedLocalVariables} f is only used for nested messages
         */
        proto.stream.NetworkStateRsp.serializeBinaryToWriter = function (message, writer) {
            var f = undefined;
            f = message.getStatus();
            if (f !== 0) {
                writer.writeUint32(
                    1,
                    f
                );
            }
        };


        /**
         * optional uint32 status = 1;
         * @return {number}
         */
        proto.stream.NetworkStateRsp.prototype.getStatus = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
        };


        /** @param {number} value */
        proto.stream.NetworkStateRsp.prototype.setStatus = function (value) {
            jspb.Message.setProto3IntField(this, 1, value);
        };


        /**
         * Generated by JsPbCodeGenerator.
         * @param {Array=} opt_data Optional initial data array, typically from a
         * server response, or constructed directly in Javascript. The array is used
         * in place and becomes part of the constructed object. It is not cloned.
         * If no data is provided, the constructed object will be empty, but still
         * valid.
         * @extends {jspb.Message}
         * @constructor
         */
        proto.stream.NetworkStateNotify = function (opt_data) {
            jspb.Message.initialize(this, opt_data, 0, -1, null, null);
        };
        goog.inherits(proto.stream.NetworkStateNotify, jspb.Message);
        if (goog.DEBUG && !COMPILED) {
            proto.stream.NetworkStateNotify.displayName = "proto.stream.NetworkStateNotify";
        }


        if (jspb.Message.GENERATE_TO_OBJECT) {
            /**
             * Creates an object representation of this proto suitable for use in Soy templates.
             * Field names that are reserved in JavaScript and will be renamed to pb_name.
             * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
             * For the list of reserved names please see:
             *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
             * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
             *     for transitional soy proto support: http://goto/soy-param-migration
             * @return {!Object}
             */
            proto.stream.NetworkStateNotify.prototype.toObject = function (opt_includeInstance) {
                return proto.stream.NetworkStateNotify.toObject(opt_includeInstance, this);
            };


            /**
             * Static version of the {@see toObject} method.
             * @param {boolean|undefined} includeInstance Whether to include the JSPB
             *     instance for transitional soy proto support:
             *     http://goto/soy-param-migration
             * @param {!proto.stream.NetworkStateNotify} msg The msg instance to transform.
             * @return {!Object}
             * @suppress {unusedLocalVariables} f is only used for nested messages
             */
            proto.stream.NetworkStateNotify.toObject = function (includeInstance, msg) {
                var f, obj = {
                    roomid: jspb.Message.getFieldWithDefault(msg, 1, "0"),
                    userid: jspb.Message.getFieldWithDefault(msg, 2, 0),
                    state: jspb.Message.getFieldWithDefault(msg, 3, 0),
                    owner: jspb.Message.getFieldWithDefault(msg, 4, 0)
                };

                if (includeInstance) {
                    obj.$jspbMessageInstance = msg;
                }
                return obj;
            };
        }


        /**
         * Deserializes binary data (in protobuf wire format).
         * @param {jspb.ByteSource} bytes The bytes to deserialize.
         * @return {!proto.stream.NetworkStateNotify}
         */
        proto.stream.NetworkStateNotify.deserializeBinary = function (bytes) {
            var reader = new jspb.BinaryReader(bytes);
            var msg = new proto.stream.NetworkStateNotify;
            return proto.stream.NetworkStateNotify.deserializeBinaryFromReader(msg, reader);
        };


        /**
         * Deserializes binary data (in protobuf wire format) from the
         * given reader into the given message object.
         * @param {!proto.stream.NetworkStateNotify} msg The message object to deserialize into.
         * @param {!jspb.BinaryReader} reader The BinaryReader to use.
         * @return {!proto.stream.NetworkStateNotify}
         */
        proto.stream.NetworkStateNotify.deserializeBinaryFromReader = function (msg, reader) {
            while (reader.nextField()) {
                if (reader.isEndGroup()) {
                    break;
                }
                var field = reader.getFieldNumber();
                switch (field) {
                case 1:
                    var value = /** @type {string} */ (reader.readUint64String());
                    msg.setRoomid(value);
                    break;
                case 2:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setUserid(value);
                    break;
                case 3:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setState(value);
                    break;
                case 4:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setOwner(value);
                    break;
                default:
                    reader.skipField();
                    break;
                }
            }
            return msg;
        };


        /**
         * Serializes the message to binary data (in protobuf wire format).
         * @return {!Uint8Array}
         */
        proto.stream.NetworkStateNotify.prototype.serializeBinary = function () {
            var writer = new jspb.BinaryWriter();
            proto.stream.NetworkStateNotify.serializeBinaryToWriter(this, writer);
            return writer.getResultBuffer();
        };


        /**
         * Serializes the given message to binary data (in protobuf wire
         * format), writing to the given BinaryWriter.
         * @param {!proto.stream.NetworkStateNotify} message
         * @param {!jspb.BinaryWriter} writer
         * @suppress {unusedLocalVariables} f is only used for nested messages
         */
        proto.stream.NetworkStateNotify.serializeBinaryToWriter = function (message, writer) {
            var f = undefined;
            f = message.getRoomid();
            if (parseInt(f, 10) !== 0) {
                writer.writeUint64String(
                    1,
                    f
                );
            }
            f = message.getUserid();
            if (f !== 0) {
                writer.writeUint32(
                    2,
                    f
                );
            }
            f = message.getState();
            if (f !== 0) {
                writer.writeUint32(
                    3,
                    f
                );
            }
            f = message.getOwner();
            if (f !== 0) {
                writer.writeUint32(
                    4,
                    f
                );
            }
        };


        /**
         * optional uint64 roomID = 1;
         * @return {string}
         */
        proto.stream.NetworkStateNotify.prototype.getRoomid = function () {
            return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, "0"));
        };


        /** @param {string} value */
        proto.stream.NetworkStateNotify.prototype.setRoomid = function (value) {
            jspb.Message.setProto3StringIntField(this, 1, value);
        };


        /**
         * optional uint32 UserID = 2;
         * @return {number}
         */
        proto.stream.NetworkStateNotify.prototype.getUserid = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
        };


        /** @param {number} value */
        proto.stream.NetworkStateNotify.prototype.setUserid = function (value) {
            jspb.Message.setProto3IntField(this, 2, value);
        };


        /**
         * optional uint32 state = 3;
         * @return {number}
         */
        proto.stream.NetworkStateNotify.prototype.getState = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
        };


        /** @param {number} value */
        proto.stream.NetworkStateNotify.prototype.setState = function (value) {
            jspb.Message.setProto3IntField(this, 3, value);
        };


        /**
         * optional uint32 owner = 4;
         * @return {number}
         */
        proto.stream.NetworkStateNotify.prototype.getOwner = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
        };


        /** @param {number} value */
        proto.stream.NetworkStateNotify.prototype.setOwner = function (value) {
            jspb.Message.setProto3IntField(this, 4, value);
        };


        /**
         * Generated by JsPbCodeGenerator.
         * @param {Array=} opt_data Optional initial data array, typically from a
         * server response, or constructed directly in Javascript. The array is used
         * in place and becomes part of the constructed object. It is not cloned.
         * If no data is provided, the constructed object will be empty, but still
         * valid.
         * @extends {jspb.Message}
         * @constructor
         */
        proto.stream.CreateRoom = function (opt_data) {
            jspb.Message.initialize(this, opt_data, 0, -1, null, null);
        };
        goog.inherits(proto.stream.CreateRoom, jspb.Message);
        if (goog.DEBUG && !COMPILED) {
            proto.stream.CreateRoom.displayName = "proto.stream.CreateRoom";
        }


        if (jspb.Message.GENERATE_TO_OBJECT) {
            /**
             * Creates an object representation of this proto suitable for use in Soy templates.
             * Field names that are reserved in JavaScript and will be renamed to pb_name.
             * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
             * For the list of reserved names please see:
             *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
             * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
             *     for transitional soy proto support: http://goto/soy-param-migration
             * @return {!Object}
             */
            proto.stream.CreateRoom.prototype.toObject = function (opt_includeInstance) {
                return proto.stream.CreateRoom.toObject(opt_includeInstance, this);
            };


            /**
             * Static version of the {@see toObject} method.
             * @param {boolean|undefined} includeInstance Whether to include the JSPB
             *     instance for transitional soy proto support:
             *     http://goto/soy-param-migration
             * @param {!proto.stream.CreateRoom} msg The msg instance to transform.
             * @return {!Object}
             * @suppress {unusedLocalVariables} f is only used for nested messages
             */
            proto.stream.CreateRoom.toObject = function (includeInstance, msg) {
                var f, obj = {
                    playerinfo: (f = msg.getPlayerinfo()) && proto.stream.PlayerInfo.toObject(includeInstance, f),
                    gameid: jspb.Message.getFieldWithDefault(msg, 2, 0),
                    roominfo: (f = msg.getRoominfo()) && proto.stream.RoomInfo.toObject(includeInstance, f)
                };

                if (includeInstance) {
                    obj.$jspbMessageInstance = msg;
                }
                return obj;
            };
        }


        /**
         * Deserializes binary data (in protobuf wire format).
         * @param {jspb.ByteSource} bytes The bytes to deserialize.
         * @return {!proto.stream.CreateRoom}
         */
        proto.stream.CreateRoom.deserializeBinary = function (bytes) {
            var reader = new jspb.BinaryReader(bytes);
            var msg = new proto.stream.CreateRoom;
            return proto.stream.CreateRoom.deserializeBinaryFromReader(msg, reader);
        };


        /**
         * Deserializes binary data (in protobuf wire format) from the
         * given reader into the given message object.
         * @param {!proto.stream.CreateRoom} msg The message object to deserialize into.
         * @param {!jspb.BinaryReader} reader The BinaryReader to use.
         * @return {!proto.stream.CreateRoom}
         */
        proto.stream.CreateRoom.deserializeBinaryFromReader = function (msg, reader) {
            while (reader.nextField()) {
                if (reader.isEndGroup()) {
                    break;
                }
                var field = reader.getFieldNumber();
                switch (field) {
                case 1:
                    var value = new proto.stream.PlayerInfo;
                    reader.readMessage(value, proto.stream.PlayerInfo.deserializeBinaryFromReader);
                    msg.setPlayerinfo(value);
                    break;
                case 2:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setGameid(value);
                    break;
                case 3:
                    var value = new proto.stream.RoomInfo;
                    reader.readMessage(value, proto.stream.RoomInfo.deserializeBinaryFromReader);
                    msg.setRoominfo(value);
                    break;
                default:
                    reader.skipField();
                    break;
                }
            }
            return msg;
        };


        /**
         * Serializes the message to binary data (in protobuf wire format).
         * @return {!Uint8Array}
         */
        proto.stream.CreateRoom.prototype.serializeBinary = function () {
            var writer = new jspb.BinaryWriter();
            proto.stream.CreateRoom.serializeBinaryToWriter(this, writer);
            return writer.getResultBuffer();
        };


        /**
         * Serializes the given message to binary data (in protobuf wire
         * format), writing to the given BinaryWriter.
         * @param {!proto.stream.CreateRoom} message
         * @param {!jspb.BinaryWriter} writer
         * @suppress {unusedLocalVariables} f is only used for nested messages
         */
        proto.stream.CreateRoom.serializeBinaryToWriter = function (message, writer) {
            var f = undefined;
            f = message.getPlayerinfo();
            if (f != null) {
                writer.writeMessage(
                    1,
                    f,
                    proto.stream.PlayerInfo.serializeBinaryToWriter
                );
            }
            f = message.getGameid();
            if (f !== 0) {
                writer.writeUint32(
                    2,
                    f
                );
            }
            f = message.getRoominfo();
            if (f != null) {
                writer.writeMessage(
                    3,
                    f,
                    proto.stream.RoomInfo.serializeBinaryToWriter
                );
            }
        };


        /**
         * optional PlayerInfo playerInfo = 1;
         * @return {?proto.stream.PlayerInfo}
         */
        proto.stream.CreateRoom.prototype.getPlayerinfo = function () {
            return /** @type{?proto.stream.PlayerInfo} */ (
                jspb.Message.getWrapperField(this, proto.stream.PlayerInfo, 1));
        };


        /** @param {?proto.stream.PlayerInfo|undefined} value */
        proto.stream.CreateRoom.prototype.setPlayerinfo = function (value) {
            jspb.Message.setWrapperField(this, 1, value);
        };


        proto.stream.CreateRoom.prototype.clearPlayerinfo = function () {
            this.setPlayerinfo(undefined);
        };


        /**
         * Returns whether this field is set.
         * @return {!boolean}
         */
        proto.stream.CreateRoom.prototype.hasPlayerinfo = function () {
            return jspb.Message.getField(this, 1) != null;
        };


        /**
         * optional uint32 gameID = 2;
         * @return {number}
         */
        proto.stream.CreateRoom.prototype.getGameid = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
        };


        /** @param {number} value */
        proto.stream.CreateRoom.prototype.setGameid = function (value) {
            jspb.Message.setProto3IntField(this, 2, value);
        };


        /**
         * optional RoomInfo roomInfo = 3;
         * @return {?proto.stream.RoomInfo}
         */
        proto.stream.CreateRoom.prototype.getRoominfo = function () {
            return /** @type{?proto.stream.RoomInfo} */ (
                jspb.Message.getWrapperField(this, proto.stream.RoomInfo, 3));
        };


        /** @param {?proto.stream.RoomInfo|undefined} value */
        proto.stream.CreateRoom.prototype.setRoominfo = function (value) {
            jspb.Message.setWrapperField(this, 3, value);
        };


        proto.stream.CreateRoom.prototype.clearRoominfo = function () {
            this.setRoominfo(undefined);
        };


        /**
         * Returns whether this field is set.
         * @return {!boolean}
         */
        proto.stream.CreateRoom.prototype.hasRoominfo = function () {
            return jspb.Message.getField(this, 3) != null;
        };


        /**
         * Generated by JsPbCodeGenerator.
         * @param {Array=} opt_data Optional initial data array, typically from a
         * server response, or constructed directly in Javascript. The array is used
         * in place and becomes part of the constructed object. It is not cloned.
         * If no data is provided, the constructed object will be empty, but still
         * valid.
         * @extends {jspb.Message}
         * @constructor
         */
        proto.stream.CreateRoomRsp = function (opt_data) {
            jspb.Message.initialize(this, opt_data, 0, -1, null, null);
        };
        goog.inherits(proto.stream.CreateRoomRsp, jspb.Message);
        if (goog.DEBUG && !COMPILED) {
            proto.stream.CreateRoomRsp.displayName = "proto.stream.CreateRoomRsp";
        }


        if (jspb.Message.GENERATE_TO_OBJECT) {
            /**
             * Creates an object representation of this proto suitable for use in Soy templates.
             * Field names that are reserved in JavaScript and will be renamed to pb_name.
             * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
             * For the list of reserved names please see:
             *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
             * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
             *     for transitional soy proto support: http://goto/soy-param-migration
             * @return {!Object}
             */
            proto.stream.CreateRoomRsp.prototype.toObject = function (opt_includeInstance) {
                return proto.stream.CreateRoomRsp.toObject(opt_includeInstance, this);
            };


            /**
             * Static version of the {@see toObject} method.
             * @param {boolean|undefined} includeInstance Whether to include the JSPB
             *     instance for transitional soy proto support:
             *     http://goto/soy-param-migration
             * @param {!proto.stream.CreateRoomRsp} msg The msg instance to transform.
             * @return {!Object}
             * @suppress {unusedLocalVariables} f is only used for nested messages
             */
            proto.stream.CreateRoomRsp.toObject = function (includeInstance, msg) {
                var f, obj = {
                    status: jspb.Message.getFieldWithDefault(msg, 1, 0),
                    roomid: jspb.Message.getFieldWithDefault(msg, 2, "0"),
                    bookinfo: (f = msg.getBookinfo()) && proto.stream.BookInfo.toObject(includeInstance, f),
                    owner: jspb.Message.getFieldWithDefault(msg, 4, 0)
                };

                if (includeInstance) {
                    obj.$jspbMessageInstance = msg;
                }
                return obj;
            };
        }


        /**
         * Deserializes binary data (in protobuf wire format).
         * @param {jspb.ByteSource} bytes The bytes to deserialize.
         * @return {!proto.stream.CreateRoomRsp}
         */
        proto.stream.CreateRoomRsp.deserializeBinary = function (bytes) {
            var reader = new jspb.BinaryReader(bytes);
            var msg = new proto.stream.CreateRoomRsp;
            return proto.stream.CreateRoomRsp.deserializeBinaryFromReader(msg, reader);
        };


        /**
         * Deserializes binary data (in protobuf wire format) from the
         * given reader into the given message object.
         * @param {!proto.stream.CreateRoomRsp} msg The message object to deserialize into.
         * @param {!jspb.BinaryReader} reader The BinaryReader to use.
         * @return {!proto.stream.CreateRoomRsp}
         */
        proto.stream.CreateRoomRsp.deserializeBinaryFromReader = function (msg, reader) {
            while (reader.nextField()) {
                if (reader.isEndGroup()) {
                    break;
                }
                var field = reader.getFieldNumber();
                switch (field) {
                case 1:
                    var value = /** @type {!proto.stream.ErrorCode} */ (reader.readEnum());
                    msg.setStatus(value);
                    break;
                case 2:
                    var value = /** @type {string} */ (reader.readUint64String());
                    msg.setRoomid(value);
                    break;
                case 3:
                    var value = new proto.stream.BookInfo;
                    reader.readMessage(value, proto.stream.BookInfo.deserializeBinaryFromReader);
                    msg.setBookinfo(value);
                    break;
                case 4:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setOwner(value);
                    break;
                default:
                    reader.skipField();
                    break;
                }
            }
            return msg;
        };


        /**
         * Serializes the message to binary data (in protobuf wire format).
         * @return {!Uint8Array}
         */
        proto.stream.CreateRoomRsp.prototype.serializeBinary = function () {
            var writer = new jspb.BinaryWriter();
            proto.stream.CreateRoomRsp.serializeBinaryToWriter(this, writer);
            return writer.getResultBuffer();
        };


        /**
         * Serializes the given message to binary data (in protobuf wire
         * format), writing to the given BinaryWriter.
         * @param {!proto.stream.CreateRoomRsp} message
         * @param {!jspb.BinaryWriter} writer
         * @suppress {unusedLocalVariables} f is only used for nested messages
         */
        proto.stream.CreateRoomRsp.serializeBinaryToWriter = function (message, writer) {
            var f = undefined;
            f = message.getStatus();
            if (f !== 0.0) {
                writer.writeEnum(
                    1,
                    f
                );
            }
            f = message.getRoomid();
            if (parseInt(f, 10) !== 0) {
                writer.writeUint64String(
                    2,
                    f
                );
            }
            f = message.getBookinfo();
            if (f != null) {
                writer.writeMessage(
                    3,
                    f,
                    proto.stream.BookInfo.serializeBinaryToWriter
                );
            }
            f = message.getOwner();
            if (f !== 0) {
                writer.writeUint32(
                    4,
                    f
                );
            }
        };


        /**
         * optional ErrorCode status = 1;
         * @return {!proto.stream.ErrorCode}
         */
        proto.stream.CreateRoomRsp.prototype.getStatus = function () {
            return /** @type {!proto.stream.ErrorCode} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
        };


        /** @param {!proto.stream.ErrorCode} value */
        proto.stream.CreateRoomRsp.prototype.setStatus = function (value) {
            jspb.Message.setProto3EnumField(this, 1, value);
        };


        /**
         * optional uint64 roomID = 2;
         * @return {string}
         */
        proto.stream.CreateRoomRsp.prototype.getRoomid = function () {
            return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, "0"));
        };


        /** @param {string} value */
        proto.stream.CreateRoomRsp.prototype.setRoomid = function (value) {
            jspb.Message.setProto3StringIntField(this, 2, value);
        };


        /**
         * optional BookInfo bookInfo = 3;
         * @return {?proto.stream.BookInfo}
         */
        proto.stream.CreateRoomRsp.prototype.getBookinfo = function () {
            return /** @type{?proto.stream.BookInfo} */ (
                jspb.Message.getWrapperField(this, proto.stream.BookInfo, 3));
        };


        /** @param {?proto.stream.BookInfo|undefined} value */
        proto.stream.CreateRoomRsp.prototype.setBookinfo = function (value) {
            jspb.Message.setWrapperField(this, 3, value);
        };


        proto.stream.CreateRoomRsp.prototype.clearBookinfo = function () {
            this.setBookinfo(undefined);
        };


        /**
         * Returns whether this field is set.
         * @return {!boolean}
         */
        proto.stream.CreateRoomRsp.prototype.hasBookinfo = function () {
            return jspb.Message.getField(this, 3) != null;
        };


        /**
         * optional uint32 owner = 4;
         * @return {number}
         */
        proto.stream.CreateRoomRsp.prototype.getOwner = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
        };


        /** @param {number} value */
        proto.stream.CreateRoomRsp.prototype.setOwner = function (value) {
            jspb.Message.setProto3IntField(this, 4, value);
        };


        /**
         * Generated by JsPbCodeGenerator.
         * @param {Array=} opt_data Optional initial data array, typically from a
         * server response, or constructed directly in Javascript. The array is used
         * in place and becomes part of the constructed object. It is not cloned.
         * If no data is provided, the constructed object will be empty, but still
         * valid.
         * @extends {jspb.Message}
         * @constructor
         */
        proto.stream.GetRoomList = function (opt_data) {
            jspb.Message.initialize(this, opt_data, 0, -1, null, null);
        };
        goog.inherits(proto.stream.GetRoomList, jspb.Message);
        if (goog.DEBUG && !COMPILED) {
            proto.stream.GetRoomList.displayName = "proto.stream.GetRoomList";
        }


        if (jspb.Message.GENERATE_TO_OBJECT) {
            /**
             * Creates an object representation of this proto suitable for use in Soy templates.
             * Field names that are reserved in JavaScript and will be renamed to pb_name.
             * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
             * For the list of reserved names please see:
             *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
             * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
             *     for transitional soy proto support: http://goto/soy-param-migration
             * @return {!Object}
             */
            proto.stream.GetRoomList.prototype.toObject = function (opt_includeInstance) {
                return proto.stream.GetRoomList.toObject(opt_includeInstance, this);
            };


            /**
             * Static version of the {@see toObject} method.
             * @param {boolean|undefined} includeInstance Whether to include the JSPB
             *     instance for transitional soy proto support:
             *     http://goto/soy-param-migration
             * @param {!proto.stream.GetRoomList} msg The msg instance to transform.
             * @return {!Object}
             * @suppress {unusedLocalVariables} f is only used for nested messages
             */
            proto.stream.GetRoomList.toObject = function (includeInstance, msg) {
                var f, obj = {
                    gameid: jspb.Message.getFieldWithDefault(msg, 1, 0),
                    roomfilter: (f = msg.getRoomfilter()) && proto.stream.RoomFilter.toObject(includeInstance, f)
                };

                if (includeInstance) {
                    obj.$jspbMessageInstance = msg;
                }
                return obj;
            };
        }


        /**
         * Deserializes binary data (in protobuf wire format).
         * @param {jspb.ByteSource} bytes The bytes to deserialize.
         * @return {!proto.stream.GetRoomList}
         */
        proto.stream.GetRoomList.deserializeBinary = function (bytes) {
            var reader = new jspb.BinaryReader(bytes);
            var msg = new proto.stream.GetRoomList;
            return proto.stream.GetRoomList.deserializeBinaryFromReader(msg, reader);
        };


        /**
         * Deserializes binary data (in protobuf wire format) from the
         * given reader into the given message object.
         * @param {!proto.stream.GetRoomList} msg The message object to deserialize into.
         * @param {!jspb.BinaryReader} reader The BinaryReader to use.
         * @return {!proto.stream.GetRoomList}
         */
        proto.stream.GetRoomList.deserializeBinaryFromReader = function (msg, reader) {
            while (reader.nextField()) {
                if (reader.isEndGroup()) {
                    break;
                }
                var field = reader.getFieldNumber();
                switch (field) {
                case 1:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setGameid(value);
                    break;
                case 2:
                    var value = new proto.stream.RoomFilter;
                    reader.readMessage(value, proto.stream.RoomFilter.deserializeBinaryFromReader);
                    msg.setRoomfilter(value);
                    break;
                default:
                    reader.skipField();
                    break;
                }
            }
            return msg;
        };


        /**
         * Serializes the message to binary data (in protobuf wire format).
         * @return {!Uint8Array}
         */
        proto.stream.GetRoomList.prototype.serializeBinary = function () {
            var writer = new jspb.BinaryWriter();
            proto.stream.GetRoomList.serializeBinaryToWriter(this, writer);
            return writer.getResultBuffer();
        };


        /**
         * Serializes the given message to binary data (in protobuf wire
         * format), writing to the given BinaryWriter.
         * @param {!proto.stream.GetRoomList} message
         * @param {!jspb.BinaryWriter} writer
         * @suppress {unusedLocalVariables} f is only used for nested messages
         */
        proto.stream.GetRoomList.serializeBinaryToWriter = function (message, writer) {
            var f = undefined;
            f = message.getGameid();
            if (f !== 0) {
                writer.writeUint32(
                    1,
                    f
                );
            }
            f = message.getRoomfilter();
            if (f != null) {
                writer.writeMessage(
                    2,
                    f,
                    proto.stream.RoomFilter.serializeBinaryToWriter
                );
            }
        };


        /**
         * optional uint32 gameID = 1;
         * @return {number}
         */
        proto.stream.GetRoomList.prototype.getGameid = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
        };


        /** @param {number} value */
        proto.stream.GetRoomList.prototype.setGameid = function (value) {
            jspb.Message.setProto3IntField(this, 1, value);
        };


        /**
         * optional RoomFilter roomFilter = 2;
         * @return {?proto.stream.RoomFilter}
         */
        proto.stream.GetRoomList.prototype.getRoomfilter = function () {
            return /** @type{?proto.stream.RoomFilter} */ (
                jspb.Message.getWrapperField(this, proto.stream.RoomFilter, 2));
        };


        /** @param {?proto.stream.RoomFilter|undefined} value */
        proto.stream.GetRoomList.prototype.setRoomfilter = function (value) {
            jspb.Message.setWrapperField(this, 2, value);
        };


        proto.stream.GetRoomList.prototype.clearRoomfilter = function () {
            this.setRoomfilter(undefined);
        };


        /**
         * Returns whether this field is set.
         * @return {!boolean}
         */
        proto.stream.GetRoomList.prototype.hasRoomfilter = function () {
            return jspb.Message.getField(this, 2) != null;
        };


        /**
         * Generated by JsPbCodeGenerator.
         * @param {Array=} opt_data Optional initial data array, typically from a
         * server response, or constructed directly in Javascript. The array is used
         * in place and becomes part of the constructed object. It is not cloned.
         * If no data is provided, the constructed object will be empty, but still
         * valid.
         * @extends {jspb.Message}
         * @constructor
         */
        proto.stream.RoomFilter = function (opt_data) {
            jspb.Message.initialize(this, opt_data, 0, -1, null, null);
        };
        goog.inherits(proto.stream.RoomFilter, jspb.Message);
        if (goog.DEBUG && !COMPILED) {
            proto.stream.RoomFilter.displayName = "proto.stream.RoomFilter";
        }


        if (jspb.Message.GENERATE_TO_OBJECT) {
            /**
             * Creates an object representation of this proto suitable for use in Soy templates.
             * Field names that are reserved in JavaScript and will be renamed to pb_name.
             * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
             * For the list of reserved names please see:
             *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
             * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
             *     for transitional soy proto support: http://goto/soy-param-migration
             * @return {!Object}
             */
            proto.stream.RoomFilter.prototype.toObject = function (opt_includeInstance) {
                return proto.stream.RoomFilter.toObject(opt_includeInstance, this);
            };


            /**
             * Static version of the {@see toObject} method.
             * @param {boolean|undefined} includeInstance Whether to include the JSPB
             *     instance for transitional soy proto support:
             *     http://goto/soy-param-migration
             * @param {!proto.stream.RoomFilter} msg The msg instance to transform.
             * @return {!Object}
             * @suppress {unusedLocalVariables} f is only used for nested messages
             */
            proto.stream.RoomFilter.toObject = function (includeInstance, msg) {
                var f, obj = {
                    maxplayer: jspb.Message.getFieldWithDefault(msg, 1, 0),
                    mode: jspb.Message.getFieldWithDefault(msg, 2, 0),
                    canwatch: jspb.Message.getFieldWithDefault(msg, 3, 0),
                    roomproperty: msg.getRoomproperty_asB64(),
                    full: jspb.Message.getFieldWithDefault(msg, 5, 0),
                    state: jspb.Message.getFieldWithDefault(msg, 6, 0)
                };

                if (includeInstance) {
                    obj.$jspbMessageInstance = msg;
                }
                return obj;
            };
        }


        /**
         * Deserializes binary data (in protobuf wire format).
         * @param {jspb.ByteSource} bytes The bytes to deserialize.
         * @return {!proto.stream.RoomFilter}
         */
        proto.stream.RoomFilter.deserializeBinary = function (bytes) {
            var reader = new jspb.BinaryReader(bytes);
            var msg = new proto.stream.RoomFilter;
            return proto.stream.RoomFilter.deserializeBinaryFromReader(msg, reader);
        };


        /**
         * Deserializes binary data (in protobuf wire format) from the
         * given reader into the given message object.
         * @param {!proto.stream.RoomFilter} msg The message object to deserialize into.
         * @param {!jspb.BinaryReader} reader The BinaryReader to use.
         * @return {!proto.stream.RoomFilter}
         */
        proto.stream.RoomFilter.deserializeBinaryFromReader = function (msg, reader) {
            while (reader.nextField()) {
                if (reader.isEndGroup()) {
                    break;
                }
                var field = reader.getFieldNumber();
                switch (field) {
                case 1:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setMaxplayer(value);
                    break;
                case 2:
                    var value = /** @type {number} */ (reader.readInt32());
                    msg.setMode(value);
                    break;
                case 3:
                    var value = /** @type {number} */ (reader.readInt32());
                    msg.setCanwatch(value);
                    break;
                case 4:
                    var value = /** @type {!Uint8Array} */ (reader.readBytes());
                    msg.setRoomproperty(value);
                    break;
                case 5:
                    var value = /** @type {number} */ (reader.readInt32());
                    msg.setFull(value);
                    break;
                case 6:
                    var value = /** @type {!proto.stream.RoomState} */ (reader.readEnum());
                    msg.setState(value);
                    break;
                default:
                    reader.skipField();
                    break;
                }
            }
            return msg;
        };


        /**
         * Serializes the message to binary data (in protobuf wire format).
         * @return {!Uint8Array}
         */
        proto.stream.RoomFilter.prototype.serializeBinary = function () {
            var writer = new jspb.BinaryWriter();
            proto.stream.RoomFilter.serializeBinaryToWriter(this, writer);
            return writer.getResultBuffer();
        };


        /**
         * Serializes the given message to binary data (in protobuf wire
         * format), writing to the given BinaryWriter.
         * @param {!proto.stream.RoomFilter} message
         * @param {!jspb.BinaryWriter} writer
         * @suppress {unusedLocalVariables} f is only used for nested messages
         */
        proto.stream.RoomFilter.serializeBinaryToWriter = function (message, writer) {
            var f = undefined;
            f = message.getMaxplayer();
            if (f !== 0) {
                writer.writeUint32(
                    1,
                    f
                );
            }
            f = message.getMode();
            if (f !== 0) {
                writer.writeInt32(
                    2,
                    f
                );
            }
            f = message.getCanwatch();
            if (f !== 0) {
                writer.writeInt32(
                    3,
                    f
                );
            }
            f = message.getRoomproperty_asU8();
            if (f.length > 0) {
                writer.writeBytes(
                    4,
                    f
                );
            }
            f = message.getFull();
            if (f !== 0) {
                writer.writeInt32(
                    5,
                    f
                );
            }
            f = message.getState();
            if (f !== 0.0) {
                writer.writeEnum(
                    6,
                    f
                );
            }
        };


        /**
         * optional uint32 maxPlayer = 1;
         * @return {number}
         */
        proto.stream.RoomFilter.prototype.getMaxplayer = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
        };


        /** @param {number} value */
        proto.stream.RoomFilter.prototype.setMaxplayer = function (value) {
            jspb.Message.setProto3IntField(this, 1, value);
        };


        /**
         * optional int32 mode = 2;
         * @return {number}
         */
        proto.stream.RoomFilter.prototype.getMode = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
        };


        /** @param {number} value */
        proto.stream.RoomFilter.prototype.setMode = function (value) {
            jspb.Message.setProto3IntField(this, 2, value);
        };


        /**
         * optional int32 canWatch = 3;
         * @return {number}
         */
        proto.stream.RoomFilter.prototype.getCanwatch = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
        };


        /** @param {number} value */
        proto.stream.RoomFilter.prototype.setCanwatch = function (value) {
            jspb.Message.setProto3IntField(this, 3, value);
        };


        /**
         * optional bytes roomProperty = 4;
         * @return {!(string|Uint8Array)}
         */
        proto.stream.RoomFilter.prototype.getRoomproperty = function () {
            return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
        };


        /**
         * optional bytes roomProperty = 4;
         * This is a type-conversion wrapper around `getRoomproperty()`
         * @return {string}
         */
        proto.stream.RoomFilter.prototype.getRoomproperty_asB64 = function () {
            return /** @type {string} */ (jspb.Message.bytesAsB64(
                this.getRoomproperty()));
        };


        /**
         * optional bytes roomProperty = 4;
         * Note that Uint8Array is not supported on all browsers.
         * @see http://caniuse.com/Uint8Array
         * This is a type-conversion wrapper around `getRoomproperty()`
         * @return {!Uint8Array}
         */
        proto.stream.RoomFilter.prototype.getRoomproperty_asU8 = function () {
            return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
                this.getRoomproperty()));
        };


        /** @param {!(string|Uint8Array)} value */
        proto.stream.RoomFilter.prototype.setRoomproperty = function (value) {
            jspb.Message.setProto3BytesField(this, 4, value);
        };


        /**
         * optional int32 full = 5;
         * @return {number}
         */
        proto.stream.RoomFilter.prototype.getFull = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
        };


        /** @param {number} value */
        proto.stream.RoomFilter.prototype.setFull = function (value) {
            jspb.Message.setProto3IntField(this, 5, value);
        };


        /**
         * optional RoomState state = 6;
         * @return {!proto.stream.RoomState}
         */
        proto.stream.RoomFilter.prototype.getState = function () {
            return /** @type {!proto.stream.RoomState} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
        };


        /** @param {!proto.stream.RoomState} value */
        proto.stream.RoomFilter.prototype.setState = function (value) {
            jspb.Message.setProto3EnumField(this, 6, value);
        };


        /**
         * Generated by JsPbCodeGenerator.
         * @param {Array=} opt_data Optional initial data array, typically from a
         * server response, or constructed directly in Javascript. The array is used
         * in place and becomes part of the constructed object. It is not cloned.
         * If no data is provided, the constructed object will be empty, but still
         * valid.
         * @extends {jspb.Message}
         * @constructor
         */
        proto.stream.GetRoomListRsp = function (opt_data) {
            jspb.Message.initialize(this, opt_data, 0, -1, proto.stream.GetRoomListRsp.repeatedFields_, null);
        };
        goog.inherits(proto.stream.GetRoomListRsp, jspb.Message);
        if (goog.DEBUG && !COMPILED) {
            proto.stream.GetRoomListRsp.displayName = "proto.stream.GetRoomListRsp";
        }
        /**
         * List of repeated fields within this message type.
         * @private {!Array<number>}
         * @const
         */
        proto.stream.GetRoomListRsp.repeatedFields_ = [2];


        if (jspb.Message.GENERATE_TO_OBJECT) {
            /**
             * Creates an object representation of this proto suitable for use in Soy templates.
             * Field names that are reserved in JavaScript and will be renamed to pb_name.
             * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
             * For the list of reserved names please see:
             *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
             * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
             *     for transitional soy proto support: http://goto/soy-param-migration
             * @return {!Object}
             */
            proto.stream.GetRoomListRsp.prototype.toObject = function (opt_includeInstance) {
                return proto.stream.GetRoomListRsp.toObject(opt_includeInstance, this);
            };


            /**
             * Static version of the {@see toObject} method.
             * @param {boolean|undefined} includeInstance Whether to include the JSPB
             *     instance for transitional soy proto support:
             *     http://goto/soy-param-migration
             * @param {!proto.stream.GetRoomListRsp} msg The msg instance to transform.
             * @return {!Object}
             * @suppress {unusedLocalVariables} f is only used for nested messages
             */
            proto.stream.GetRoomListRsp.toObject = function (includeInstance, msg) {
                var f, obj = {
                    status: jspb.Message.getFieldWithDefault(msg, 1, 0),
                    roominfoList: jspb.Message.toObjectList(msg.getRoominfoList(),
                        proto.stream.RoomInfo.toObject, includeInstance)
                };

                if (includeInstance) {
                    obj.$jspbMessageInstance = msg;
                }
                return obj;
            };
        }


        /**
         * Deserializes binary data (in protobuf wire format).
         * @param {jspb.ByteSource} bytes The bytes to deserialize.
         * @return {!proto.stream.GetRoomListRsp}
         */
        proto.stream.GetRoomListRsp.deserializeBinary = function (bytes) {
            var reader = new jspb.BinaryReader(bytes);
            var msg = new proto.stream.GetRoomListRsp;
            return proto.stream.GetRoomListRsp.deserializeBinaryFromReader(msg, reader);
        };


        /**
         * Deserializes binary data (in protobuf wire format) from the
         * given reader into the given message object.
         * @param {!proto.stream.GetRoomListRsp} msg The message object to deserialize into.
         * @param {!jspb.BinaryReader} reader The BinaryReader to use.
         * @return {!proto.stream.GetRoomListRsp}
         */
        proto.stream.GetRoomListRsp.deserializeBinaryFromReader = function (msg, reader) {
            while (reader.nextField()) {
                if (reader.isEndGroup()) {
                    break;
                }
                var field = reader.getFieldNumber();
                switch (field) {
                case 1:
                    var value = /** @type {!proto.stream.ErrorCode} */ (reader.readEnum());
                    msg.setStatus(value);
                    break;
                case 2:
                    var value = new proto.stream.RoomInfo;
                    reader.readMessage(value, proto.stream.RoomInfo.deserializeBinaryFromReader);
                    msg.addRoominfo(value);
                    break;
                default:
                    reader.skipField();
                    break;
                }
            }
            return msg;
        };


        /**
         * Serializes the message to binary data (in protobuf wire format).
         * @return {!Uint8Array}
         */
        proto.stream.GetRoomListRsp.prototype.serializeBinary = function () {
            var writer = new jspb.BinaryWriter();
            proto.stream.GetRoomListRsp.serializeBinaryToWriter(this, writer);
            return writer.getResultBuffer();
        };


        /**
         * Serializes the given message to binary data (in protobuf wire
         * format), writing to the given BinaryWriter.
         * @param {!proto.stream.GetRoomListRsp} message
         * @param {!jspb.BinaryWriter} writer
         * @suppress {unusedLocalVariables} f is only used for nested messages
         */
        proto.stream.GetRoomListRsp.serializeBinaryToWriter = function (message, writer) {
            var f = undefined;
            f = message.getStatus();
            if (f !== 0.0) {
                writer.writeEnum(
                    1,
                    f
                );
            }
            f = message.getRoominfoList();
            if (f.length > 0) {
                writer.writeRepeatedMessage(
                    2,
                    f,
                    proto.stream.RoomInfo.serializeBinaryToWriter
                );
            }
        };


        /**
         * optional ErrorCode status = 1;
         * @return {!proto.stream.ErrorCode}
         */
        proto.stream.GetRoomListRsp.prototype.getStatus = function () {
            return /** @type {!proto.stream.ErrorCode} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
        };


        /** @param {!proto.stream.ErrorCode} value */
        proto.stream.GetRoomListRsp.prototype.setStatus = function (value) {
            jspb.Message.setProto3EnumField(this, 1, value);
        };


        /**
         * repeated RoomInfo roomInfo = 2;
         * @return {!Array.<!proto.stream.RoomInfo>}
         */
        proto.stream.GetRoomListRsp.prototype.getRoominfoList = function () {
            return /** @type{!Array.<!proto.stream.RoomInfo>} */ (
                jspb.Message.getRepeatedWrapperField(this, proto.stream.RoomInfo, 2));
        };


        /** @param {!Array.<!proto.stream.RoomInfo>} value */
        proto.stream.GetRoomListRsp.prototype.setRoominfoList = function (value) {
            jspb.Message.setRepeatedWrapperField(this, 2, value);
        };


        /**
         * @param {!proto.stream.RoomInfo=} opt_value
         * @param {number=} opt_index
         * @return {!proto.stream.RoomInfo}
         */
        proto.stream.GetRoomListRsp.prototype.addRoominfo = function (opt_value, opt_index) {
            return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.stream.RoomInfo, opt_index);
        };


        proto.stream.GetRoomListRsp.prototype.clearRoominfoList = function () {
            this.setRoominfoList([]);
        };


        /**
         * Generated by JsPbCodeGenerator.
         * @param {Array=} opt_data Optional initial data array, typically from a
         * server response, or constructed directly in Javascript. The array is used
         * in place and becomes part of the constructed object. It is not cloned.
         * If no data is provided, the constructed object will be empty, but still
         * valid.
         * @extends {jspb.Message}
         * @constructor
         */
        proto.stream.GetRoomListExReq = function (opt_data) {
            jspb.Message.initialize(this, opt_data, 0, -1, null, null);
        };
        goog.inherits(proto.stream.GetRoomListExReq, jspb.Message);
        if (goog.DEBUG && !COMPILED) {
            proto.stream.GetRoomListExReq.displayName = "proto.stream.GetRoomListExReq";
        }


        if (jspb.Message.GENERATE_TO_OBJECT) {
            /**
             * Creates an object representation of this proto suitable for use in Soy templates.
             * Field names that are reserved in JavaScript and will be renamed to pb_name.
             * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
             * For the list of reserved names please see:
             *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
             * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
             *     for transitional soy proto support: http://goto/soy-param-migration
             * @return {!Object}
             */
            proto.stream.GetRoomListExReq.prototype.toObject = function (opt_includeInstance) {
                return proto.stream.GetRoomListExReq.toObject(opt_includeInstance, this);
            };


            /**
             * Static version of the {@see toObject} method.
             * @param {boolean|undefined} includeInstance Whether to include the JSPB
             *     instance for transitional soy proto support:
             *     http://goto/soy-param-migration
             * @param {!proto.stream.GetRoomListExReq} msg The msg instance to transform.
             * @return {!Object}
             * @suppress {unusedLocalVariables} f is only used for nested messages
             */
            proto.stream.GetRoomListExReq.toObject = function (includeInstance, msg) {
                var f, obj = {
                    gameid: jspb.Message.getFieldWithDefault(msg, 1, 0),
                    roomfilter: (f = msg.getRoomfilter()) && proto.stream.RoomFilter.toObject(includeInstance, f),
                    sort: jspb.Message.getFieldWithDefault(msg, 3, 0),
                    order: jspb.Message.getFieldWithDefault(msg, 4, 0),
                    pageno: jspb.Message.getFieldWithDefault(msg, 5, 0),
                    pagesize: jspb.Message.getFieldWithDefault(msg, 6, 0)
                };

                if (includeInstance) {
                    obj.$jspbMessageInstance = msg;
                }
                return obj;
            };
        }


        /**
         * Deserializes binary data (in protobuf wire format).
         * @param {jspb.ByteSource} bytes The bytes to deserialize.
         * @return {!proto.stream.GetRoomListExReq}
         */
        proto.stream.GetRoomListExReq.deserializeBinary = function (bytes) {
            var reader = new jspb.BinaryReader(bytes);
            var msg = new proto.stream.GetRoomListExReq;
            return proto.stream.GetRoomListExReq.deserializeBinaryFromReader(msg, reader);
        };


        /**
         * Deserializes binary data (in protobuf wire format) from the
         * given reader into the given message object.
         * @param {!proto.stream.GetRoomListExReq} msg The message object to deserialize into.
         * @param {!jspb.BinaryReader} reader The BinaryReader to use.
         * @return {!proto.stream.GetRoomListExReq}
         */
        proto.stream.GetRoomListExReq.deserializeBinaryFromReader = function (msg, reader) {
            while (reader.nextField()) {
                if (reader.isEndGroup()) {
                    break;
                }
                var field = reader.getFieldNumber();
                switch (field) {
                case 1:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setGameid(value);
                    break;
                case 2:
                    var value = new proto.stream.RoomFilter;
                    reader.readMessage(value, proto.stream.RoomFilter.deserializeBinaryFromReader);
                    msg.setRoomfilter(value);
                    break;
                case 3:
                    var value = /** @type {!proto.stream.RoomListSort} */ (reader.readEnum());
                    msg.setSort(value);
                    break;
                case 4:
                    var value = /** @type {!proto.stream.SortOrder} */ (reader.readEnum());
                    msg.setOrder(value);
                    break;
                case 5:
                    var value = /** @type {number} */ (reader.readInt32());
                    msg.setPageno(value);
                    break;
                case 6:
                    var value = /** @type {number} */ (reader.readInt32());
                    msg.setPagesize(value);
                    break;
                default:
                    reader.skipField();
                    break;
                }
            }
            return msg;
        };


        /**
         * Serializes the message to binary data (in protobuf wire format).
         * @return {!Uint8Array}
         */
        proto.stream.GetRoomListExReq.prototype.serializeBinary = function () {
            var writer = new jspb.BinaryWriter();
            proto.stream.GetRoomListExReq.serializeBinaryToWriter(this, writer);
            return writer.getResultBuffer();
        };


        /**
         * Serializes the given message to binary data (in protobuf wire
         * format), writing to the given BinaryWriter.
         * @param {!proto.stream.GetRoomListExReq} message
         * @param {!jspb.BinaryWriter} writer
         * @suppress {unusedLocalVariables} f is only used for nested messages
         */
        proto.stream.GetRoomListExReq.serializeBinaryToWriter = function (message, writer) {
            var f = undefined;
            f = message.getGameid();
            if (f !== 0) {
                writer.writeUint32(
                    1,
                    f
                );
            }
            f = message.getRoomfilter();
            if (f != null) {
                writer.writeMessage(
                    2,
                    f,
                    proto.stream.RoomFilter.serializeBinaryToWriter
                );
            }
            f = message.getSort();
            if (f !== 0.0) {
                writer.writeEnum(
                    3,
                    f
                );
            }
            f = message.getOrder();
            if (f !== 0.0) {
                writer.writeEnum(
                    4,
                    f
                );
            }
            f = message.getPageno();
            if (f !== 0) {
                writer.writeInt32(
                    5,
                    f
                );
            }
            f = message.getPagesize();
            if (f !== 0) {
                writer.writeInt32(
                    6,
                    f
                );
            }
        };


        /**
         * optional uint32 gameID = 1;
         * @return {number}
         */
        proto.stream.GetRoomListExReq.prototype.getGameid = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
        };


        /** @param {number} value */
        proto.stream.GetRoomListExReq.prototype.setGameid = function (value) {
            jspb.Message.setProto3IntField(this, 1, value);
        };


        /**
         * optional RoomFilter roomFilter = 2;
         * @return {?proto.stream.RoomFilter}
         */
        proto.stream.GetRoomListExReq.prototype.getRoomfilter = function () {
            return /** @type{?proto.stream.RoomFilter} */ (
                jspb.Message.getWrapperField(this, proto.stream.RoomFilter, 2));
        };


        /** @param {?proto.stream.RoomFilter|undefined} value */
        proto.stream.GetRoomListExReq.prototype.setRoomfilter = function (value) {
            jspb.Message.setWrapperField(this, 2, value);
        };


        proto.stream.GetRoomListExReq.prototype.clearRoomfilter = function () {
            this.setRoomfilter(undefined);
        };


        /**
         * Returns whether this field is set.
         * @return {!boolean}
         */
        proto.stream.GetRoomListExReq.prototype.hasRoomfilter = function () {
            return jspb.Message.getField(this, 2) != null;
        };


        /**
         * optional RoomListSort sort = 3;
         * @return {!proto.stream.RoomListSort}
         */
        proto.stream.GetRoomListExReq.prototype.getSort = function () {
            return /** @type {!proto.stream.RoomListSort} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
        };


        /** @param {!proto.stream.RoomListSort} value */
        proto.stream.GetRoomListExReq.prototype.setSort = function (value) {
            jspb.Message.setProto3EnumField(this, 3, value);
        };


        /**
         * optional SortOrder order = 4;
         * @return {!proto.stream.SortOrder}
         */
        proto.stream.GetRoomListExReq.prototype.getOrder = function () {
            return /** @type {!proto.stream.SortOrder} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
        };


        /** @param {!proto.stream.SortOrder} value */
        proto.stream.GetRoomListExReq.prototype.setOrder = function (value) {
            jspb.Message.setProto3EnumField(this, 4, value);
        };


        /**
         * optional int32 pageNo = 5;
         * @return {number}
         */
        proto.stream.GetRoomListExReq.prototype.getPageno = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
        };


        /** @param {number} value */
        proto.stream.GetRoomListExReq.prototype.setPageno = function (value) {
            jspb.Message.setProto3IntField(this, 5, value);
        };


        /**
         * optional int32 pageSize = 6;
         * @return {number}
         */
        proto.stream.GetRoomListExReq.prototype.getPagesize = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
        };


        /** @param {number} value */
        proto.stream.GetRoomListExReq.prototype.setPagesize = function (value) {
            jspb.Message.setProto3IntField(this, 6, value);
        };


        /**
         * Generated by JsPbCodeGenerator.
         * @param {Array=} opt_data Optional initial data array, typically from a
         * server response, or constructed directly in Javascript. The array is used
         * in place and becomes part of the constructed object. It is not cloned.
         * If no data is provided, the constructed object will be empty, but still
         * valid.
         * @extends {jspb.Message}
         * @constructor
         */
        proto.stream.RoomInfoEx = function (opt_data) {
            jspb.Message.initialize(this, opt_data, 0, -1, null, null);
        };
        goog.inherits(proto.stream.RoomInfoEx, jspb.Message);
        if (goog.DEBUG && !COMPILED) {
            proto.stream.RoomInfoEx.displayName = "proto.stream.RoomInfoEx";
        }


        if (jspb.Message.GENERATE_TO_OBJECT) {
            /**
             * Creates an object representation of this proto suitable for use in Soy templates.
             * Field names that are reserved in JavaScript and will be renamed to pb_name.
             * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
             * For the list of reserved names please see:
             *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
             * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
             *     for transitional soy proto support: http://goto/soy-param-migration
             * @return {!Object}
             */
            proto.stream.RoomInfoEx.prototype.toObject = function (opt_includeInstance) {
                return proto.stream.RoomInfoEx.toObject(opt_includeInstance, this);
            };


            /**
             * Static version of the {@see toObject} method.
             * @param {boolean|undefined} includeInstance Whether to include the JSPB
             *     instance for transitional soy proto support:
             *     http://goto/soy-param-migration
             * @param {!proto.stream.RoomInfoEx} msg The msg instance to transform.
             * @return {!Object}
             * @suppress {unusedLocalVariables} f is only used for nested messages
             */
            proto.stream.RoomInfoEx.toObject = function (includeInstance, msg) {
                var f, obj = {
                    roomid: jspb.Message.getFieldWithDefault(msg, 1, "0"),
                    roomname: jspb.Message.getFieldWithDefault(msg, 2, ""),
                    maxplayer: jspb.Message.getFieldWithDefault(msg, 3, 0),
                    gameplayer: jspb.Message.getFieldWithDefault(msg, 4, 0),
                    watchplayer: jspb.Message.getFieldWithDefault(msg, 5, 0),
                    mode: jspb.Message.getFieldWithDefault(msg, 6, 0),
                    canwatch: jspb.Message.getFieldWithDefault(msg, 7, 0),
                    roomproperty: msg.getRoomproperty_asB64(),
                    owner: jspb.Message.getFieldWithDefault(msg, 9, 0),
                    state: jspb.Message.getFieldWithDefault(msg, 10, 0),
                    createtime: jspb.Message.getFieldWithDefault(msg, 11, 0)
                };

                if (includeInstance) {
                    obj.$jspbMessageInstance = msg;
                }
                return obj;
            };
        }


        /**
         * Deserializes binary data (in protobuf wire format).
         * @param {jspb.ByteSource} bytes The bytes to deserialize.
         * @return {!proto.stream.RoomInfoEx}
         */
        proto.stream.RoomInfoEx.deserializeBinary = function (bytes) {
            var reader = new jspb.BinaryReader(bytes);
            var msg = new proto.stream.RoomInfoEx;
            return proto.stream.RoomInfoEx.deserializeBinaryFromReader(msg, reader);
        };


        /**
         * Deserializes binary data (in protobuf wire format) from the
         * given reader into the given message object.
         * @param {!proto.stream.RoomInfoEx} msg The message object to deserialize into.
         * @param {!jspb.BinaryReader} reader The BinaryReader to use.
         * @return {!proto.stream.RoomInfoEx}
         */
        proto.stream.RoomInfoEx.deserializeBinaryFromReader = function (msg, reader) {
            while (reader.nextField()) {
                if (reader.isEndGroup()) {
                    break;
                }
                var field = reader.getFieldNumber();
                switch (field) {
                case 1:
                    var value = /** @type {string} */ (reader.readUint64String());
                    msg.setRoomid(value);
                    break;
                case 2:
                    var value = /** @type {string} */ (reader.readString());
                    msg.setRoomname(value);
                    break;
                case 3:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setMaxplayer(value);
                    break;
                case 4:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setGameplayer(value);
                    break;
                case 5:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setWatchplayer(value);
                    break;
                case 6:
                    var value = /** @type {number} */ (reader.readInt32());
                    msg.setMode(value);
                    break;
                case 7:
                    var value = /** @type {number} */ (reader.readInt32());
                    msg.setCanwatch(value);
                    break;
                case 8:
                    var value = /** @type {!Uint8Array} */ (reader.readBytes());
                    msg.setRoomproperty(value);
                    break;
                case 9:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setOwner(value);
                    break;
                case 10:
                    var value = /** @type {!proto.stream.RoomState} */ (reader.readEnum());
                    msg.setState(value);
                    break;
                case 11:
                    var value = /** @type {number} */ (reader.readUint64());
                    msg.setCreatetime(value);
                    break;
                default:
                    reader.skipField();
                    break;
                }
            }
            return msg;
        };


        /**
         * Serializes the message to binary data (in protobuf wire format).
         * @return {!Uint8Array}
         */
        proto.stream.RoomInfoEx.prototype.serializeBinary = function () {
            var writer = new jspb.BinaryWriter();
            proto.stream.RoomInfoEx.serializeBinaryToWriter(this, writer);
            return writer.getResultBuffer();
        };


        /**
         * Serializes the given message to binary data (in protobuf wire
         * format), writing to the given BinaryWriter.
         * @param {!proto.stream.RoomInfoEx} message
         * @param {!jspb.BinaryWriter} writer
         * @suppress {unusedLocalVariables} f is only used for nested messages
         */
        proto.stream.RoomInfoEx.serializeBinaryToWriter = function (message, writer) {
            var f = undefined;
            f = message.getRoomid();
            if (parseInt(f, 10) !== 0) {
                writer.writeUint64String(
                    1,
                    f
                );
            }
            f = message.getRoomname();
            if (f.length > 0) {
                writer.writeString(
                    2,
                    f
                );
            }
            f = message.getMaxplayer();
            if (f !== 0) {
                writer.writeUint32(
                    3,
                    f
                );
            }
            f = message.getGameplayer();
            if (f !== 0) {
                writer.writeUint32(
                    4,
                    f
                );
            }
            f = message.getWatchplayer();
            if (f !== 0) {
                writer.writeUint32(
                    5,
                    f
                );
            }
            f = message.getMode();
            if (f !== 0) {
                writer.writeInt32(
                    6,
                    f
                );
            }
            f = message.getCanwatch();
            if (f !== 0) {
                writer.writeInt32(
                    7,
                    f
                );
            }
            f = message.getRoomproperty_asU8();
            if (f.length > 0) {
                writer.writeBytes(
                    8,
                    f
                );
            }
            f = message.getOwner();
            if (f !== 0) {
                writer.writeUint32(
                    9,
                    f
                );
            }
            f = message.getState();
            if (f !== 0.0) {
                writer.writeEnum(
                    10,
                    f
                );
            }
            f = message.getCreatetime();
            if (f !== 0) {
                writer.writeUint64(
                    11,
                    f
                );
            }
        };


        /**
         * optional uint64 roomID = 1;
         * @return {string}
         */
        proto.stream.RoomInfoEx.prototype.getRoomid = function () {
            return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, "0"));
        };


        /** @param {string} value */
        proto.stream.RoomInfoEx.prototype.setRoomid = function (value) {
            jspb.Message.setProto3StringIntField(this, 1, value);
        };


        /**
         * optional string roomName = 2;
         * @return {string}
         */
        proto.stream.RoomInfoEx.prototype.getRoomname = function () {
            return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
        };


        /** @param {string} value */
        proto.stream.RoomInfoEx.prototype.setRoomname = function (value) {
            jspb.Message.setProto3StringField(this, 2, value);
        };


        /**
         * optional uint32 maxPlayer = 3;
         * @return {number}
         */
        proto.stream.RoomInfoEx.prototype.getMaxplayer = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
        };


        /** @param {number} value */
        proto.stream.RoomInfoEx.prototype.setMaxplayer = function (value) {
            jspb.Message.setProto3IntField(this, 3, value);
        };


        /**
         * optional uint32 gamePlayer = 4;
         * @return {number}
         */
        proto.stream.RoomInfoEx.prototype.getGameplayer = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
        };


        /** @param {number} value */
        proto.stream.RoomInfoEx.prototype.setGameplayer = function (value) {
            jspb.Message.setProto3IntField(this, 4, value);
        };


        /**
         * optional uint32 watchPlayer = 5;
         * @return {number}
         */
        proto.stream.RoomInfoEx.prototype.getWatchplayer = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
        };


        /** @param {number} value */
        proto.stream.RoomInfoEx.prototype.setWatchplayer = function (value) {
            jspb.Message.setProto3IntField(this, 5, value);
        };


        /**
         * optional int32 mode = 6;
         * @return {number}
         */
        proto.stream.RoomInfoEx.prototype.getMode = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
        };


        /** @param {number} value */
        proto.stream.RoomInfoEx.prototype.setMode = function (value) {
            jspb.Message.setProto3IntField(this, 6, value);
        };


        /**
         * optional int32 canWatch = 7;
         * @return {number}
         */
        proto.stream.RoomInfoEx.prototype.getCanwatch = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 7, 0));
        };


        /** @param {number} value */
        proto.stream.RoomInfoEx.prototype.setCanwatch = function (value) {
            jspb.Message.setProto3IntField(this, 7, value);
        };


        /**
         * optional bytes roomProperty = 8;
         * @return {!(string|Uint8Array)}
         */
        proto.stream.RoomInfoEx.prototype.getRoomproperty = function () {
            return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 8, ""));
        };


        /**
         * optional bytes roomProperty = 8;
         * This is a type-conversion wrapper around `getRoomproperty()`
         * @return {string}
         */
        proto.stream.RoomInfoEx.prototype.getRoomproperty_asB64 = function () {
            return /** @type {string} */ (jspb.Message.bytesAsB64(
                this.getRoomproperty()));
        };


        /**
         * optional bytes roomProperty = 8;
         * Note that Uint8Array is not supported on all browsers.
         * @see http://caniuse.com/Uint8Array
         * This is a type-conversion wrapper around `getRoomproperty()`
         * @return {!Uint8Array}
         */
        proto.stream.RoomInfoEx.prototype.getRoomproperty_asU8 = function () {
            return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
                this.getRoomproperty()));
        };


        /** @param {!(string|Uint8Array)} value */
        proto.stream.RoomInfoEx.prototype.setRoomproperty = function (value) {
            jspb.Message.setProto3BytesField(this, 8, value);
        };


        /**
         * optional uint32 owner = 9;
         * @return {number}
         */
        proto.stream.RoomInfoEx.prototype.getOwner = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 9, 0));
        };


        /** @param {number} value */
        proto.stream.RoomInfoEx.prototype.setOwner = function (value) {
            jspb.Message.setProto3IntField(this, 9, value);
        };


        /**
         * optional RoomState state = 10;
         * @return {!proto.stream.RoomState}
         */
        proto.stream.RoomInfoEx.prototype.getState = function () {
            return /** @type {!proto.stream.RoomState} */ (jspb.Message.getFieldWithDefault(this, 10, 0));
        };


        /** @param {!proto.stream.RoomState} value */
        proto.stream.RoomInfoEx.prototype.setState = function (value) {
            jspb.Message.setProto3EnumField(this, 10, value);
        };


        /**
         * optional uint64 createTime = 11;
         * @return {number}
         */
        proto.stream.RoomInfoEx.prototype.getCreatetime = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 11, 0));
        };


        /** @param {number} value */
        proto.stream.RoomInfoEx.prototype.setCreatetime = function (value) {
            jspb.Message.setProto3IntField(this, 11, value);
        };


        /**
         * Generated by JsPbCodeGenerator.
         * @param {Array=} opt_data Optional initial data array, typically from a
         * server response, or constructed directly in Javascript. The array is used
         * in place and becomes part of the constructed object. It is not cloned.
         * If no data is provided, the constructed object will be empty, but still
         * valid.
         * @extends {jspb.Message}
         * @constructor
         */
        proto.stream.GetRoomListExRsp = function (opt_data) {
            jspb.Message.initialize(this, opt_data, 0, -1, proto.stream.GetRoomListExRsp.repeatedFields_, null);
        };
        goog.inherits(proto.stream.GetRoomListExRsp, jspb.Message);
        if (goog.DEBUG && !COMPILED) {
            proto.stream.GetRoomListExRsp.displayName = "proto.stream.GetRoomListExRsp";
        }
        /**
         * List of repeated fields within this message type.
         * @private {!Array<number>}
         * @const
         */
        proto.stream.GetRoomListExRsp.repeatedFields_ = [3];


        if (jspb.Message.GENERATE_TO_OBJECT) {
            /**
             * Creates an object representation of this proto suitable for use in Soy templates.
             * Field names that are reserved in JavaScript and will be renamed to pb_name.
             * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
             * For the list of reserved names please see:
             *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
             * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
             *     for transitional soy proto support: http://goto/soy-param-migration
             * @return {!Object}
             */
            proto.stream.GetRoomListExRsp.prototype.toObject = function (opt_includeInstance) {
                return proto.stream.GetRoomListExRsp.toObject(opt_includeInstance, this);
            };


            /**
             * Static version of the {@see toObject} method.
             * @param {boolean|undefined} includeInstance Whether to include the JSPB
             *     instance for transitional soy proto support:
             *     http://goto/soy-param-migration
             * @param {!proto.stream.GetRoomListExRsp} msg The msg instance to transform.
             * @return {!Object}
             * @suppress {unusedLocalVariables} f is only used for nested messages
             */
            proto.stream.GetRoomListExRsp.toObject = function (includeInstance, msg) {
                var f, obj = {
                    status: jspb.Message.getFieldWithDefault(msg, 1, 0),
                    total: jspb.Message.getFieldWithDefault(msg, 2, 0),
                    roominfoexList: jspb.Message.toObjectList(msg.getRoominfoexList(),
                        proto.stream.RoomInfoEx.toObject, includeInstance)
                };

                if (includeInstance) {
                    obj.$jspbMessageInstance = msg;
                }
                return obj;
            };
        }


        /**
         * Deserializes binary data (in protobuf wire format).
         * @param {jspb.ByteSource} bytes The bytes to deserialize.
         * @return {!proto.stream.GetRoomListExRsp}
         */
        proto.stream.GetRoomListExRsp.deserializeBinary = function (bytes) {
            var reader = new jspb.BinaryReader(bytes);
            var msg = new proto.stream.GetRoomListExRsp;
            return proto.stream.GetRoomListExRsp.deserializeBinaryFromReader(msg, reader);
        };


        /**
         * Deserializes binary data (in protobuf wire format) from the
         * given reader into the given message object.
         * @param {!proto.stream.GetRoomListExRsp} msg The message object to deserialize into.
         * @param {!jspb.BinaryReader} reader The BinaryReader to use.
         * @return {!proto.stream.GetRoomListExRsp}
         */
        proto.stream.GetRoomListExRsp.deserializeBinaryFromReader = function (msg, reader) {
            while (reader.nextField()) {
                if (reader.isEndGroup()) {
                    break;
                }
                var field = reader.getFieldNumber();
                switch (field) {
                case 1:
                    var value = /** @type {!proto.stream.ErrorCode} */ (reader.readEnum());
                    msg.setStatus(value);
                    break;
                case 2:
                    var value = /** @type {number} */ (reader.readInt32());
                    msg.setTotal(value);
                    break;
                case 3:
                    var value = new proto.stream.RoomInfoEx;
                    reader.readMessage(value, proto.stream.RoomInfoEx.deserializeBinaryFromReader);
                    msg.addRoominfoex(value);
                    break;
                default:
                    reader.skipField();
                    break;
                }
            }
            return msg;
        };


        /**
         * Serializes the message to binary data (in protobuf wire format).
         * @return {!Uint8Array}
         */
        proto.stream.GetRoomListExRsp.prototype.serializeBinary = function () {
            var writer = new jspb.BinaryWriter();
            proto.stream.GetRoomListExRsp.serializeBinaryToWriter(this, writer);
            return writer.getResultBuffer();
        };


        /**
         * Serializes the given message to binary data (in protobuf wire
         * format), writing to the given BinaryWriter.
         * @param {!proto.stream.GetRoomListExRsp} message
         * @param {!jspb.BinaryWriter} writer
         * @suppress {unusedLocalVariables} f is only used for nested messages
         */
        proto.stream.GetRoomListExRsp.serializeBinaryToWriter = function (message, writer) {
            var f = undefined;
            f = message.getStatus();
            if (f !== 0.0) {
                writer.writeEnum(
                    1,
                    f
                );
            }
            f = message.getTotal();
            if (f !== 0) {
                writer.writeInt32(
                    2,
                    f
                );
            }
            f = message.getRoominfoexList();
            if (f.length > 0) {
                writer.writeRepeatedMessage(
                    3,
                    f,
                    proto.stream.RoomInfoEx.serializeBinaryToWriter
                );
            }
        };


        /**
         * optional ErrorCode status = 1;
         * @return {!proto.stream.ErrorCode}
         */
        proto.stream.GetRoomListExRsp.prototype.getStatus = function () {
            return /** @type {!proto.stream.ErrorCode} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
        };


        /** @param {!proto.stream.ErrorCode} value */
        proto.stream.GetRoomListExRsp.prototype.setStatus = function (value) {
            jspb.Message.setProto3EnumField(this, 1, value);
        };


        /**
         * optional int32 total = 2;
         * @return {number}
         */
        proto.stream.GetRoomListExRsp.prototype.getTotal = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
        };


        /** @param {number} value */
        proto.stream.GetRoomListExRsp.prototype.setTotal = function (value) {
            jspb.Message.setProto3IntField(this, 2, value);
        };


        /**
         * repeated RoomInfoEx roomInfoEx = 3;
         * @return {!Array.<!proto.stream.RoomInfoEx>}
         */
        proto.stream.GetRoomListExRsp.prototype.getRoominfoexList = function () {
            return /** @type{!Array.<!proto.stream.RoomInfoEx>} */ (
                jspb.Message.getRepeatedWrapperField(this, proto.stream.RoomInfoEx, 3));
        };


        /** @param {!Array.<!proto.stream.RoomInfoEx>} value */
        proto.stream.GetRoomListExRsp.prototype.setRoominfoexList = function (value) {
            jspb.Message.setRepeatedWrapperField(this, 3, value);
        };


        /**
         * @param {!proto.stream.RoomInfoEx=} opt_value
         * @param {number=} opt_index
         * @return {!proto.stream.RoomInfoEx}
         */
        proto.stream.GetRoomListExRsp.prototype.addRoominfoex = function (opt_value, opt_index) {
            return jspb.Message.addToRepeatedWrapperField(this, 3, opt_value, proto.stream.RoomInfoEx, opt_index);
        };


        proto.stream.GetRoomListExRsp.prototype.clearRoominfoexList = function () {
            this.setRoominfoexList([]);
        };


        /**
         * Generated by JsPbCodeGenerator.
         * @param {Array=} opt_data Optional initial data array, typically from a
         * server response, or constructed directly in Javascript. The array is used
         * in place and becomes part of the constructed object. It is not cloned.
         * If no data is provided, the constructed object will be empty, but still
         * valid.
         * @extends {jspb.Message}
         * @constructor
         */
        proto.stream.GetRoomDetailReq = function (opt_data) {
            jspb.Message.initialize(this, opt_data, 0, -1, null, null);
        };
        goog.inherits(proto.stream.GetRoomDetailReq, jspb.Message);
        if (goog.DEBUG && !COMPILED) {
            proto.stream.GetRoomDetailReq.displayName = "proto.stream.GetRoomDetailReq";
        }


        if (jspb.Message.GENERATE_TO_OBJECT) {
            /**
             * Creates an object representation of this proto suitable for use in Soy templates.
             * Field names that are reserved in JavaScript and will be renamed to pb_name.
             * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
             * For the list of reserved names please see:
             *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
             * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
             *     for transitional soy proto support: http://goto/soy-param-migration
             * @return {!Object}
             */
            proto.stream.GetRoomDetailReq.prototype.toObject = function (opt_includeInstance) {
                return proto.stream.GetRoomDetailReq.toObject(opt_includeInstance, this);
            };


            /**
             * Static version of the {@see toObject} method.
             * @param {boolean|undefined} includeInstance Whether to include the JSPB
             *     instance for transitional soy proto support:
             *     http://goto/soy-param-migration
             * @param {!proto.stream.GetRoomDetailReq} msg The msg instance to transform.
             * @return {!Object}
             * @suppress {unusedLocalVariables} f is only used for nested messages
             */
            proto.stream.GetRoomDetailReq.toObject = function (includeInstance, msg) {
                var f, obj = {
                    gameid: jspb.Message.getFieldWithDefault(msg, 1, 0),
                    roomid: jspb.Message.getFieldWithDefault(msg, 2, "0")
                };

                if (includeInstance) {
                    obj.$jspbMessageInstance = msg;
                }
                return obj;
            };
        }


        /**
         * Deserializes binary data (in protobuf wire format).
         * @param {jspb.ByteSource} bytes The bytes to deserialize.
         * @return {!proto.stream.GetRoomDetailReq}
         */
        proto.stream.GetRoomDetailReq.deserializeBinary = function (bytes) {
            var reader = new jspb.BinaryReader(bytes);
            var msg = new proto.stream.GetRoomDetailReq;
            return proto.stream.GetRoomDetailReq.deserializeBinaryFromReader(msg, reader);
        };


        /**
         * Deserializes binary data (in protobuf wire format) from the
         * given reader into the given message object.
         * @param {!proto.stream.GetRoomDetailReq} msg The message object to deserialize into.
         * @param {!jspb.BinaryReader} reader The BinaryReader to use.
         * @return {!proto.stream.GetRoomDetailReq}
         */
        proto.stream.GetRoomDetailReq.deserializeBinaryFromReader = function (msg, reader) {
            while (reader.nextField()) {
                if (reader.isEndGroup()) {
                    break;
                }
                var field = reader.getFieldNumber();
                switch (field) {
                case 1:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setGameid(value);
                    break;
                case 2:
                    var value = /** @type {string} */ (reader.readUint64String());
                    msg.setRoomid(value);
                    break;
                default:
                    reader.skipField();
                    break;
                }
            }
            return msg;
        };


        /**
         * Serializes the message to binary data (in protobuf wire format).
         * @return {!Uint8Array}
         */
        proto.stream.GetRoomDetailReq.prototype.serializeBinary = function () {
            var writer = new jspb.BinaryWriter();
            proto.stream.GetRoomDetailReq.serializeBinaryToWriter(this, writer);
            return writer.getResultBuffer();
        };


        /**
         * Serializes the given message to binary data (in protobuf wire
         * format), writing to the given BinaryWriter.
         * @param {!proto.stream.GetRoomDetailReq} message
         * @param {!jspb.BinaryWriter} writer
         * @suppress {unusedLocalVariables} f is only used for nested messages
         */
        proto.stream.GetRoomDetailReq.serializeBinaryToWriter = function (message, writer) {
            var f = undefined;
            f = message.getGameid();
            if (f !== 0) {
                writer.writeUint32(
                    1,
                    f
                );
            }
            f = message.getRoomid();
            if (parseInt(f, 10) !== 0) {
                writer.writeUint64String(
                    2,
                    f
                );
            }
        };


        /**
         * optional uint32 gameID = 1;
         * @return {number}
         */
        proto.stream.GetRoomDetailReq.prototype.getGameid = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
        };


        /** @param {number} value */
        proto.stream.GetRoomDetailReq.prototype.setGameid = function (value) {
            jspb.Message.setProto3IntField(this, 1, value);
        };


        /**
         * optional uint64 roomID = 2;
         * @return {string}
         */
        proto.stream.GetRoomDetailReq.prototype.getRoomid = function () {
            return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, "0"));
        };


        /** @param {string} value */
        proto.stream.GetRoomDetailReq.prototype.setRoomid = function (value) {
            jspb.Message.setProto3StringIntField(this, 2, value);
        };


        /**
         * Generated by JsPbCodeGenerator.
         * @param {Array=} opt_data Optional initial data array, typically from a
         * server response, or constructed directly in Javascript. The array is used
         * in place and becomes part of the constructed object. It is not cloned.
         * If no data is provided, the constructed object will be empty, but still
         * valid.
         * @extends {jspb.Message}
         * @constructor
         */
        proto.stream.GetRoomDetailRsp = function (opt_data) {
            jspb.Message.initialize(this, opt_data, 0, -1, null, null);
        };
        goog.inherits(proto.stream.GetRoomDetailRsp, jspb.Message);
        if (goog.DEBUG && !COMPILED) {
            proto.stream.GetRoomDetailRsp.displayName = "proto.stream.GetRoomDetailRsp";
        }


        if (jspb.Message.GENERATE_TO_OBJECT) {
            /**
             * Creates an object representation of this proto suitable for use in Soy templates.
             * Field names that are reserved in JavaScript and will be renamed to pb_name.
             * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
             * For the list of reserved names please see:
             *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
             * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
             *     for transitional soy proto support: http://goto/soy-param-migration
             * @return {!Object}
             */
            proto.stream.GetRoomDetailRsp.prototype.toObject = function (opt_includeInstance) {
                return proto.stream.GetRoomDetailRsp.toObject(opt_includeInstance, this);
            };


            /**
             * Static version of the {@see toObject} method.
             * @param {boolean|undefined} includeInstance Whether to include the JSPB
             *     instance for transitional soy proto support:
             *     http://goto/soy-param-migration
             * @param {!proto.stream.GetRoomDetailRsp} msg The msg instance to transform.
             * @return {!Object}
             * @suppress {unusedLocalVariables} f is only used for nested messages
             */
            proto.stream.GetRoomDetailRsp.toObject = function (includeInstance, msg) {
                var f, obj = {
                    status: jspb.Message.getFieldWithDefault(msg, 1, 0),
                    roomdetail: (f = msg.getRoomdetail()) && proto.stream.RoomDetail.toObject(includeInstance, f)
                };

                if (includeInstance) {
                    obj.$jspbMessageInstance = msg;
                }
                return obj;
            };
        }


        /**
         * Deserializes binary data (in protobuf wire format).
         * @param {jspb.ByteSource} bytes The bytes to deserialize.
         * @return {!proto.stream.GetRoomDetailRsp}
         */
        proto.stream.GetRoomDetailRsp.deserializeBinary = function (bytes) {
            var reader = new jspb.BinaryReader(bytes);
            var msg = new proto.stream.GetRoomDetailRsp;
            return proto.stream.GetRoomDetailRsp.deserializeBinaryFromReader(msg, reader);
        };


        /**
         * Deserializes binary data (in protobuf wire format) from the
         * given reader into the given message object.
         * @param {!proto.stream.GetRoomDetailRsp} msg The message object to deserialize into.
         * @param {!jspb.BinaryReader} reader The BinaryReader to use.
         * @return {!proto.stream.GetRoomDetailRsp}
         */
        proto.stream.GetRoomDetailRsp.deserializeBinaryFromReader = function (msg, reader) {
            while (reader.nextField()) {
                if (reader.isEndGroup()) {
                    break;
                }
                var field = reader.getFieldNumber();
                switch (field) {
                case 1:
                    var value = /** @type {!proto.stream.ErrorCode} */ (reader.readEnum());
                    msg.setStatus(value);
                    break;
                case 2:
                    var value = new proto.stream.RoomDetail;
                    reader.readMessage(value, proto.stream.RoomDetail.deserializeBinaryFromReader);
                    msg.setRoomdetail(value);
                    break;
                default:
                    reader.skipField();
                    break;
                }
            }
            return msg;
        };


        /**
         * Serializes the message to binary data (in protobuf wire format).
         * @return {!Uint8Array}
         */
        proto.stream.GetRoomDetailRsp.prototype.serializeBinary = function () {
            var writer = new jspb.BinaryWriter();
            proto.stream.GetRoomDetailRsp.serializeBinaryToWriter(this, writer);
            return writer.getResultBuffer();
        };


        /**
         * Serializes the given message to binary data (in protobuf wire
         * format), writing to the given BinaryWriter.
         * @param {!proto.stream.GetRoomDetailRsp} message
         * @param {!jspb.BinaryWriter} writer
         * @suppress {unusedLocalVariables} f is only used for nested messages
         */
        proto.stream.GetRoomDetailRsp.serializeBinaryToWriter = function (message, writer) {
            var f = undefined;
            f = message.getStatus();
            if (f !== 0.0) {
                writer.writeEnum(
                    1,
                    f
                );
            }
            f = message.getRoomdetail();
            if (f != null) {
                writer.writeMessage(
                    2,
                    f,
                    proto.stream.RoomDetail.serializeBinaryToWriter
                );
            }
        };


        /**
         * optional ErrorCode status = 1;
         * @return {!proto.stream.ErrorCode}
         */
        proto.stream.GetRoomDetailRsp.prototype.getStatus = function () {
            return /** @type {!proto.stream.ErrorCode} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
        };


        /** @param {!proto.stream.ErrorCode} value */
        proto.stream.GetRoomDetailRsp.prototype.setStatus = function (value) {
            jspb.Message.setProto3EnumField(this, 1, value);
        };


        /**
         * optional RoomDetail roomDetail = 2;
         * @return {?proto.stream.RoomDetail}
         */
        proto.stream.GetRoomDetailRsp.prototype.getRoomdetail = function () {
            return /** @type{?proto.stream.RoomDetail} */ (
                jspb.Message.getWrapperField(this, proto.stream.RoomDetail, 2));
        };


        /** @param {?proto.stream.RoomDetail|undefined} value */
        proto.stream.GetRoomDetailRsp.prototype.setRoomdetail = function (value) {
            jspb.Message.setWrapperField(this, 2, value);
        };


        proto.stream.GetRoomDetailRsp.prototype.clearRoomdetail = function () {
            this.setRoomdetail(undefined);
        };


        /**
         * Returns whether this field is set.
         * @return {!boolean}
         */
        proto.stream.GetRoomDetailRsp.prototype.hasRoomdetail = function () {
            return jspb.Message.getField(this, 2) != null;
        };


        /**
         * Generated by JsPbCodeGenerator.
         * @param {Array=} opt_data Optional initial data array, typically from a
         * server response, or constructed directly in Javascript. The array is used
         * in place and becomes part of the constructed object. It is not cloned.
         * If no data is provided, the constructed object will be empty, but still
         * valid.
         * @extends {jspb.Message}
         * @constructor
         */
        proto.stream.RoomDetail = function (opt_data) {
            jspb.Message.initialize(this, opt_data, 0, -1, proto.stream.RoomDetail.repeatedFields_, null);
        };
        goog.inherits(proto.stream.RoomDetail, jspb.Message);
        if (goog.DEBUG && !COMPILED) {
            proto.stream.RoomDetail.displayName = "proto.stream.RoomDetail";
        }
        /**
         * List of repeated fields within this message type.
         * @private {!Array<number>}
         * @const
         */
        proto.stream.RoomDetail.repeatedFields_ = [9];


        if (jspb.Message.GENERATE_TO_OBJECT) {
            /**
             * Creates an object representation of this proto suitable for use in Soy templates.
             * Field names that are reserved in JavaScript and will be renamed to pb_name.
             * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
             * For the list of reserved names please see:
             *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
             * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
             *     for transitional soy proto support: http://goto/soy-param-migration
             * @return {!Object}
             */
            proto.stream.RoomDetail.prototype.toObject = function (opt_includeInstance) {
                return proto.stream.RoomDetail.toObject(opt_includeInstance, this);
            };


            /**
             * Static version of the {@see toObject} method.
             * @param {boolean|undefined} includeInstance Whether to include the JSPB
             *     instance for transitional soy proto support:
             *     http://goto/soy-param-migration
             * @param {!proto.stream.RoomDetail} msg The msg instance to transform.
             * @return {!Object}
             * @suppress {unusedLocalVariables} f is only used for nested messages
             */
            proto.stream.RoomDetail.toObject = function (includeInstance, msg) {
                var f, obj = {
                    roomid: jspb.Message.getFieldWithDefault(msg, 1, "0"),
                    state: jspb.Message.getFieldWithDefault(msg, 2, 0),
                    maxplayer: jspb.Message.getFieldWithDefault(msg, 3, 0),
                    mode: jspb.Message.getFieldWithDefault(msg, 4, 0),
                    canwatch: jspb.Message.getFieldWithDefault(msg, 5, 0),
                    roomproperty: msg.getRoomproperty_asB64(),
                    owner: jspb.Message.getFieldWithDefault(msg, 7, 0),
                    createflag: jspb.Message.getFieldWithDefault(msg, 8, 0),
                    playerinfosList: jspb.Message.toObjectList(msg.getPlayerinfosList(),
                        proto.stream.PlayerInfo.toObject, includeInstance)
                };

                if (includeInstance) {
                    obj.$jspbMessageInstance = msg;
                }
                return obj;
            };
        }


        /**
         * Deserializes binary data (in protobuf wire format).
         * @param {jspb.ByteSource} bytes The bytes to deserialize.
         * @return {!proto.stream.RoomDetail}
         */
        proto.stream.RoomDetail.deserializeBinary = function (bytes) {
            var reader = new jspb.BinaryReader(bytes);
            var msg = new proto.stream.RoomDetail;
            return proto.stream.RoomDetail.deserializeBinaryFromReader(msg, reader);
        };


        /**
         * Deserializes binary data (in protobuf wire format) from the
         * given reader into the given message object.
         * @param {!proto.stream.RoomDetail} msg The message object to deserialize into.
         * @param {!jspb.BinaryReader} reader The BinaryReader to use.
         * @return {!proto.stream.RoomDetail}
         */
        proto.stream.RoomDetail.deserializeBinaryFromReader = function (msg, reader) {
            while (reader.nextField()) {
                if (reader.isEndGroup()) {
                    break;
                }
                var field = reader.getFieldNumber();
                switch (field) {
                case 1:
                    var value = /** @type {string} */ (reader.readUint64String());
                    msg.setRoomid(value);
                    break;
                case 2:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setState(value);
                    break;
                case 3:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setMaxplayer(value);
                    break;
                case 4:
                    var value = /** @type {number} */ (reader.readInt32());
                    msg.setMode(value);
                    break;
                case 5:
                    var value = /** @type {number} */ (reader.readInt32());
                    msg.setCanwatch(value);
                    break;
                case 6:
                    var value = /** @type {!Uint8Array} */ (reader.readBytes());
                    msg.setRoomproperty(value);
                    break;
                case 7:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setOwner(value);
                    break;
                case 8:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setCreateflag(value);
                    break;
                case 9:
                    var value = new proto.stream.PlayerInfo;
                    reader.readMessage(value, proto.stream.PlayerInfo.deserializeBinaryFromReader);
                    msg.addPlayerinfos(value);
                    break;
                default:
                    reader.skipField();
                    break;
                }
            }
            return msg;
        };


        /**
         * Serializes the message to binary data (in protobuf wire format).
         * @return {!Uint8Array}
         */
        proto.stream.RoomDetail.prototype.serializeBinary = function () {
            var writer = new jspb.BinaryWriter();
            proto.stream.RoomDetail.serializeBinaryToWriter(this, writer);
            return writer.getResultBuffer();
        };


        /**
         * Serializes the given message to binary data (in protobuf wire
         * format), writing to the given BinaryWriter.
         * @param {!proto.stream.RoomDetail} message
         * @param {!jspb.BinaryWriter} writer
         * @suppress {unusedLocalVariables} f is only used for nested messages
         */
        proto.stream.RoomDetail.serializeBinaryToWriter = function (message, writer) {
            var f = undefined;
            f = message.getRoomid();
            if (parseInt(f, 10) !== 0) {
                writer.writeUint64String(
                    1,
                    f
                );
            }
            f = message.getState();
            if (f !== 0) {
                writer.writeUint32(
                    2,
                    f
                );
            }
            f = message.getMaxplayer();
            if (f !== 0) {
                writer.writeUint32(
                    3,
                    f
                );
            }
            f = message.getMode();
            if (f !== 0) {
                writer.writeInt32(
                    4,
                    f
                );
            }
            f = message.getCanwatch();
            if (f !== 0) {
                writer.writeInt32(
                    5,
                    f
                );
            }
            f = message.getRoomproperty_asU8();
            if (f.length > 0) {
                writer.writeBytes(
                    6,
                    f
                );
            }
            f = message.getOwner();
            if (f !== 0) {
                writer.writeUint32(
                    7,
                    f
                );
            }
            f = message.getCreateflag();
            if (f !== 0) {
                writer.writeUint32(
                    8,
                    f
                );
            }
            f = message.getPlayerinfosList();
            if (f.length > 0) {
                writer.writeRepeatedMessage(
                    9,
                    f,
                    proto.stream.PlayerInfo.serializeBinaryToWriter
                );
            }
        };


        /**
         * optional uint64 roomID = 1;
         * @return {string}
         */
        proto.stream.RoomDetail.prototype.getRoomid = function () {
            return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, "0"));
        };


        /** @param {string} value */
        proto.stream.RoomDetail.prototype.setRoomid = function (value) {
            jspb.Message.setProto3StringIntField(this, 1, value);
        };


        /**
         * optional uint32 state = 2;
         * @return {number}
         */
        proto.stream.RoomDetail.prototype.getState = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
        };


        /** @param {number} value */
        proto.stream.RoomDetail.prototype.setState = function (value) {
            jspb.Message.setProto3IntField(this, 2, value);
        };


        /**
         * optional uint32 maxPlayer = 3;
         * @return {number}
         */
        proto.stream.RoomDetail.prototype.getMaxplayer = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
        };


        /** @param {number} value */
        proto.stream.RoomDetail.prototype.setMaxplayer = function (value) {
            jspb.Message.setProto3IntField(this, 3, value);
        };


        /**
         * optional int32 mode = 4;
         * @return {number}
         */
        proto.stream.RoomDetail.prototype.getMode = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
        };


        /** @param {number} value */
        proto.stream.RoomDetail.prototype.setMode = function (value) {
            jspb.Message.setProto3IntField(this, 4, value);
        };


        /**
         * optional int32 canWatch = 5;
         * @return {number}
         */
        proto.stream.RoomDetail.prototype.getCanwatch = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
        };


        /** @param {number} value */
        proto.stream.RoomDetail.prototype.setCanwatch = function (value) {
            jspb.Message.setProto3IntField(this, 5, value);
        };


        /**
         * optional bytes roomProperty = 6;
         * @return {!(string|Uint8Array)}
         */
        proto.stream.RoomDetail.prototype.getRoomproperty = function () {
            return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
        };


        /**
         * optional bytes roomProperty = 6;
         * This is a type-conversion wrapper around `getRoomproperty()`
         * @return {string}
         */
        proto.stream.RoomDetail.prototype.getRoomproperty_asB64 = function () {
            return /** @type {string} */ (jspb.Message.bytesAsB64(
                this.getRoomproperty()));
        };


        /**
         * optional bytes roomProperty = 6;
         * Note that Uint8Array is not supported on all browsers.
         * @see http://caniuse.com/Uint8Array
         * This is a type-conversion wrapper around `getRoomproperty()`
         * @return {!Uint8Array}
         */
        proto.stream.RoomDetail.prototype.getRoomproperty_asU8 = function () {
            return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
                this.getRoomproperty()));
        };


        /** @param {!(string|Uint8Array)} value */
        proto.stream.RoomDetail.prototype.setRoomproperty = function (value) {
            jspb.Message.setProto3BytesField(this, 6, value);
        };


        /**
         * optional uint32 owner = 7;
         * @return {number}
         */
        proto.stream.RoomDetail.prototype.getOwner = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 7, 0));
        };


        /** @param {number} value */
        proto.stream.RoomDetail.prototype.setOwner = function (value) {
            jspb.Message.setProto3IntField(this, 7, value);
        };


        /**
         * optional uint32 createFlag = 8;
         * @return {number}
         */
        proto.stream.RoomDetail.prototype.getCreateflag = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 8, 0));
        };


        /** @param {number} value */
        proto.stream.RoomDetail.prototype.setCreateflag = function (value) {
            jspb.Message.setProto3IntField(this, 8, value);
        };


        /**
         * repeated PlayerInfo playerInfos = 9;
         * @return {!Array.<!proto.stream.PlayerInfo>}
         */
        proto.stream.RoomDetail.prototype.getPlayerinfosList = function () {
            return /** @type{!Array.<!proto.stream.PlayerInfo>} */ (
                jspb.Message.getRepeatedWrapperField(this, proto.stream.PlayerInfo, 9));
        };


        /** @param {!Array.<!proto.stream.PlayerInfo>} value */
        proto.stream.RoomDetail.prototype.setPlayerinfosList = function (value) {
            jspb.Message.setRepeatedWrapperField(this, 9, value);
        };


        /**
         * @param {!proto.stream.PlayerInfo=} opt_value
         * @param {number=} opt_index
         * @return {!proto.stream.PlayerInfo}
         */
        proto.stream.RoomDetail.prototype.addPlayerinfos = function (opt_value, opt_index) {
            return jspb.Message.addToRepeatedWrapperField(this, 9, opt_value, proto.stream.PlayerInfo, opt_index);
        };


        proto.stream.RoomDetail.prototype.clearPlayerinfosList = function () {
            this.setPlayerinfosList([]);
        };


        /**
         * Generated by JsPbCodeGenerator.
         * @param {Array=} opt_data Optional initial data array, typically from a
         * server response, or constructed directly in Javascript. The array is used
         * in place and becomes part of the constructed object. It is not cloned.
         * If no data is provided, the constructed object will be empty, but still
         * valid.
         * @extends {jspb.Message}
         * @constructor
         */
        proto.stream.KickPlayer = function (opt_data) {
            jspb.Message.initialize(this, opt_data, 0, -1, null, null);
        };
        goog.inherits(proto.stream.KickPlayer, jspb.Message);
        if (goog.DEBUG && !COMPILED) {
            proto.stream.KickPlayer.displayName = "proto.stream.KickPlayer";
        }


        if (jspb.Message.GENERATE_TO_OBJECT) {
            /**
             * Creates an object representation of this proto suitable for use in Soy templates.
             * Field names that are reserved in JavaScript and will be renamed to pb_name.
             * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
             * For the list of reserved names please see:
             *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
             * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
             *     for transitional soy proto support: http://goto/soy-param-migration
             * @return {!Object}
             */
            proto.stream.KickPlayer.prototype.toObject = function (opt_includeInstance) {
                return proto.stream.KickPlayer.toObject(opt_includeInstance, this);
            };


            /**
             * Static version of the {@see toObject} method.
             * @param {boolean|undefined} includeInstance Whether to include the JSPB
             *     instance for transitional soy proto support:
             *     http://goto/soy-param-migration
             * @param {!proto.stream.KickPlayer} msg The msg instance to transform.
             * @return {!Object}
             * @suppress {unusedLocalVariables} f is only used for nested messages
             */
            proto.stream.KickPlayer.toObject = function (includeInstance, msg) {
                var f, obj = {
                    roomid: jspb.Message.getFieldWithDefault(msg, 1, "0"),
                    srcuserid: jspb.Message.getFieldWithDefault(msg, 2, 0),
                    userid: jspb.Message.getFieldWithDefault(msg, 3, 0),
                    cpproto: msg.getCpproto_asB64()
                };

                if (includeInstance) {
                    obj.$jspbMessageInstance = msg;
                }
                return obj;
            };
        }


        /**
         * Deserializes binary data (in protobuf wire format).
         * @param {jspb.ByteSource} bytes The bytes to deserialize.
         * @return {!proto.stream.KickPlayer}
         */
        proto.stream.KickPlayer.deserializeBinary = function (bytes) {
            var reader = new jspb.BinaryReader(bytes);
            var msg = new proto.stream.KickPlayer;
            return proto.stream.KickPlayer.deserializeBinaryFromReader(msg, reader);
        };


        /**
         * Deserializes binary data (in protobuf wire format) from the
         * given reader into the given message object.
         * @param {!proto.stream.KickPlayer} msg The message object to deserialize into.
         * @param {!jspb.BinaryReader} reader The BinaryReader to use.
         * @return {!proto.stream.KickPlayer}
         */
        proto.stream.KickPlayer.deserializeBinaryFromReader = function (msg, reader) {
            while (reader.nextField()) {
                if (reader.isEndGroup()) {
                    break;
                }
                var field = reader.getFieldNumber();
                switch (field) {
                case 1:
                    var value = /** @type {string} */ (reader.readUint64String());
                    msg.setRoomid(value);
                    break;
                case 2:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setSrcuserid(value);
                    break;
                case 3:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setUserid(value);
                    break;
                case 4:
                    var value = /** @type {!Uint8Array} */ (reader.readBytes());
                    msg.setCpproto(value);
                    break;
                default:
                    reader.skipField();
                    break;
                }
            }
            return msg;
        };


        /**
         * Serializes the message to binary data (in protobuf wire format).
         * @return {!Uint8Array}
         */
        proto.stream.KickPlayer.prototype.serializeBinary = function () {
            var writer = new jspb.BinaryWriter();
            proto.stream.KickPlayer.serializeBinaryToWriter(this, writer);
            return writer.getResultBuffer();
        };


        /**
         * Serializes the given message to binary data (in protobuf wire
         * format), writing to the given BinaryWriter.
         * @param {!proto.stream.KickPlayer} message
         * @param {!jspb.BinaryWriter} writer
         * @suppress {unusedLocalVariables} f is only used for nested messages
         */
        proto.stream.KickPlayer.serializeBinaryToWriter = function (message, writer) {
            var f = undefined;
            f = message.getRoomid();
            if (parseInt(f, 10) !== 0) {
                writer.writeUint64String(
                    1,
                    f
                );
            }
            f = message.getSrcuserid();
            if (f !== 0) {
                writer.writeUint32(
                    2,
                    f
                );
            }
            f = message.getUserid();
            if (f !== 0) {
                writer.writeUint32(
                    3,
                    f
                );
            }
            f = message.getCpproto_asU8();
            if (f.length > 0) {
                writer.writeBytes(
                    4,
                    f
                );
            }
        };


        /**
         * optional uint64 roomID = 1;
         * @return {string}
         */
        proto.stream.KickPlayer.prototype.getRoomid = function () {
            return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, "0"));
        };


        /** @param {string} value */
        proto.stream.KickPlayer.prototype.setRoomid = function (value) {
            jspb.Message.setProto3StringIntField(this, 1, value);
        };


        /**
         * optional uint32 srcUserID = 2;
         * @return {number}
         */
        proto.stream.KickPlayer.prototype.getSrcuserid = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
        };


        /** @param {number} value */
        proto.stream.KickPlayer.prototype.setSrcuserid = function (value) {
            jspb.Message.setProto3IntField(this, 2, value);
        };


        /**
         * optional uint32 userID = 3;
         * @return {number}
         */
        proto.stream.KickPlayer.prototype.getUserid = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
        };


        /** @param {number} value */
        proto.stream.KickPlayer.prototype.setUserid = function (value) {
            jspb.Message.setProto3IntField(this, 3, value);
        };


        /**
         * optional bytes cpProto = 4;
         * @return {!(string|Uint8Array)}
         */
        proto.stream.KickPlayer.prototype.getCpproto = function () {
            return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
        };


        /**
         * optional bytes cpProto = 4;
         * This is a type-conversion wrapper around `getCpproto()`
         * @return {string}
         */
        proto.stream.KickPlayer.prototype.getCpproto_asB64 = function () {
            return /** @type {string} */ (jspb.Message.bytesAsB64(
                this.getCpproto()));
        };


        /**
         * optional bytes cpProto = 4;
         * Note that Uint8Array is not supported on all browsers.
         * @see http://caniuse.com/Uint8Array
         * This is a type-conversion wrapper around `getCpproto()`
         * @return {!Uint8Array}
         */
        proto.stream.KickPlayer.prototype.getCpproto_asU8 = function () {
            return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
                this.getCpproto()));
        };


        /** @param {!(string|Uint8Array)} value */
        proto.stream.KickPlayer.prototype.setCpproto = function (value) {
            jspb.Message.setProto3BytesField(this, 4, value);
        };


        /**
         * Generated by JsPbCodeGenerator.
         * @param {Array=} opt_data Optional initial data array, typically from a
         * server response, or constructed directly in Javascript. The array is used
         * in place and becomes part of the constructed object. It is not cloned.
         * If no data is provided, the constructed object will be empty, but still
         * valid.
         * @extends {jspb.Message}
         * @constructor
         */
        proto.stream.KickPlayerRsp = function (opt_data) {
            jspb.Message.initialize(this, opt_data, 0, -1, null, null);
        };
        goog.inherits(proto.stream.KickPlayerRsp, jspb.Message);
        if (goog.DEBUG && !COMPILED) {
            proto.stream.KickPlayerRsp.displayName = "proto.stream.KickPlayerRsp";
        }


        if (jspb.Message.GENERATE_TO_OBJECT) {
            /**
             * Creates an object representation of this proto suitable for use in Soy templates.
             * Field names that are reserved in JavaScript and will be renamed to pb_name.
             * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
             * For the list of reserved names please see:
             *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
             * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
             *     for transitional soy proto support: http://goto/soy-param-migration
             * @return {!Object}
             */
            proto.stream.KickPlayerRsp.prototype.toObject = function (opt_includeInstance) {
                return proto.stream.KickPlayerRsp.toObject(opt_includeInstance, this);
            };


            /**
             * Static version of the {@see toObject} method.
             * @param {boolean|undefined} includeInstance Whether to include the JSPB
             *     instance for transitional soy proto support:
             *     http://goto/soy-param-migration
             * @param {!proto.stream.KickPlayerRsp} msg The msg instance to transform.
             * @return {!Object}
             * @suppress {unusedLocalVariables} f is only used for nested messages
             */
            proto.stream.KickPlayerRsp.toObject = function (includeInstance, msg) {
                var f, obj = {
                    status: jspb.Message.getFieldWithDefault(msg, 1, 0),
                    userid: jspb.Message.getFieldWithDefault(msg, 2, 0),
                    roomid: jspb.Message.getFieldWithDefault(msg, 3, "0"),
                    owner: jspb.Message.getFieldWithDefault(msg, 4, 0)
                };

                if (includeInstance) {
                    obj.$jspbMessageInstance = msg;
                }
                return obj;
            };
        }


        /**
         * Deserializes binary data (in protobuf wire format).
         * @param {jspb.ByteSource} bytes The bytes to deserialize.
         * @return {!proto.stream.KickPlayerRsp}
         */
        proto.stream.KickPlayerRsp.deserializeBinary = function (bytes) {
            var reader = new jspb.BinaryReader(bytes);
            var msg = new proto.stream.KickPlayerRsp;
            return proto.stream.KickPlayerRsp.deserializeBinaryFromReader(msg, reader);
        };


        /**
         * Deserializes binary data (in protobuf wire format) from the
         * given reader into the given message object.
         * @param {!proto.stream.KickPlayerRsp} msg The message object to deserialize into.
         * @param {!jspb.BinaryReader} reader The BinaryReader to use.
         * @return {!proto.stream.KickPlayerRsp}
         */
        proto.stream.KickPlayerRsp.deserializeBinaryFromReader = function (msg, reader) {
            while (reader.nextField()) {
                if (reader.isEndGroup()) {
                    break;
                }
                var field = reader.getFieldNumber();
                switch (field) {
                case 1:
                    var value = /** @type {!proto.stream.ErrorCode} */ (reader.readEnum());
                    msg.setStatus(value);
                    break;
                case 2:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setUserid(value);
                    break;
                case 3:
                    var value = /** @type {string} */ (reader.readUint64String());
                    msg.setRoomid(value);
                    break;
                case 4:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setOwner(value);
                    break;
                default:
                    reader.skipField();
                    break;
                }
            }
            return msg;
        };


        /**
         * Serializes the message to binary data (in protobuf wire format).
         * @return {!Uint8Array}
         */
        proto.stream.KickPlayerRsp.prototype.serializeBinary = function () {
            var writer = new jspb.BinaryWriter();
            proto.stream.KickPlayerRsp.serializeBinaryToWriter(this, writer);
            return writer.getResultBuffer();
        };


        /**
         * Serializes the given message to binary data (in protobuf wire
         * format), writing to the given BinaryWriter.
         * @param {!proto.stream.KickPlayerRsp} message
         * @param {!jspb.BinaryWriter} writer
         * @suppress {unusedLocalVariables} f is only used for nested messages
         */
        proto.stream.KickPlayerRsp.serializeBinaryToWriter = function (message, writer) {
            var f = undefined;
            f = message.getStatus();
            if (f !== 0.0) {
                writer.writeEnum(
                    1,
                    f
                );
            }
            f = message.getUserid();
            if (f !== 0) {
                writer.writeUint32(
                    2,
                    f
                );
            }
            f = message.getRoomid();
            if (parseInt(f, 10) !== 0) {
                writer.writeUint64String(
                    3,
                    f
                );
            }
            f = message.getOwner();
            if (f !== 0) {
                writer.writeUint32(
                    4,
                    f
                );
            }
        };


        /**
         * optional ErrorCode status = 1;
         * @return {!proto.stream.ErrorCode}
         */
        proto.stream.KickPlayerRsp.prototype.getStatus = function () {
            return /** @type {!proto.stream.ErrorCode} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
        };


        /** @param {!proto.stream.ErrorCode} value */
        proto.stream.KickPlayerRsp.prototype.setStatus = function (value) {
            jspb.Message.setProto3EnumField(this, 1, value);
        };


        /**
         * optional uint32 userID = 2;
         * @return {number}
         */
        proto.stream.KickPlayerRsp.prototype.getUserid = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
        };


        /** @param {number} value */
        proto.stream.KickPlayerRsp.prototype.setUserid = function (value) {
            jspb.Message.setProto3IntField(this, 2, value);
        };


        /**
         * optional uint64 roomID = 3;
         * @return {string}
         */
        proto.stream.KickPlayerRsp.prototype.getRoomid = function () {
            return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, "0"));
        };


        /** @param {string} value */
        proto.stream.KickPlayerRsp.prototype.setRoomid = function (value) {
            jspb.Message.setProto3StringIntField(this, 3, value);
        };


        /**
         * optional uint32 owner = 4;
         * @return {number}
         */
        proto.stream.KickPlayerRsp.prototype.getOwner = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
        };


        /** @param {number} value */
        proto.stream.KickPlayerRsp.prototype.setOwner = function (value) {
            jspb.Message.setProto3IntField(this, 4, value);
        };


        /**
         * Generated by JsPbCodeGenerator.
         * @param {Array=} opt_data Optional initial data array, typically from a
         * server response, or constructed directly in Javascript. The array is used
         * in place and becomes part of the constructed object. It is not cloned.
         * If no data is provided, the constructed object will be empty, but still
         * valid.
         * @extends {jspb.Message}
         * @constructor
         */
        proto.stream.KickPlayerNotify = function (opt_data) {
            jspb.Message.initialize(this, opt_data, 0, -1, null, null);
        };
        goog.inherits(proto.stream.KickPlayerNotify, jspb.Message);
        if (goog.DEBUG && !COMPILED) {
            proto.stream.KickPlayerNotify.displayName = "proto.stream.KickPlayerNotify";
        }


        if (jspb.Message.GENERATE_TO_OBJECT) {
            /**
             * Creates an object representation of this proto suitable for use in Soy templates.
             * Field names that are reserved in JavaScript and will be renamed to pb_name.
             * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
             * For the list of reserved names please see:
             *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
             * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
             *     for transitional soy proto support: http://goto/soy-param-migration
             * @return {!Object}
             */
            proto.stream.KickPlayerNotify.prototype.toObject = function (opt_includeInstance) {
                return proto.stream.KickPlayerNotify.toObject(opt_includeInstance, this);
            };


            /**
             * Static version of the {@see toObject} method.
             * @param {boolean|undefined} includeInstance Whether to include the JSPB
             *     instance for transitional soy proto support:
             *     http://goto/soy-param-migration
             * @param {!proto.stream.KickPlayerNotify} msg The msg instance to transform.
             * @return {!Object}
             * @suppress {unusedLocalVariables} f is only used for nested messages
             */
            proto.stream.KickPlayerNotify.toObject = function (includeInstance, msg) {
                var f, obj = {
                    srcuserid: jspb.Message.getFieldWithDefault(msg, 1, 0),
                    userid: jspb.Message.getFieldWithDefault(msg, 2, 0),
                    cpproto: msg.getCpproto_asB64(),
                    owner: jspb.Message.getFieldWithDefault(msg, 4, 0)
                };

                if (includeInstance) {
                    obj.$jspbMessageInstance = msg;
                }
                return obj;
            };
        }


        /**
         * Deserializes binary data (in protobuf wire format).
         * @param {jspb.ByteSource} bytes The bytes to deserialize.
         * @return {!proto.stream.KickPlayerNotify}
         */
        proto.stream.KickPlayerNotify.deserializeBinary = function (bytes) {
            var reader = new jspb.BinaryReader(bytes);
            var msg = new proto.stream.KickPlayerNotify;
            return proto.stream.KickPlayerNotify.deserializeBinaryFromReader(msg, reader);
        };


        /**
         * Deserializes binary data (in protobuf wire format) from the
         * given reader into the given message object.
         * @param {!proto.stream.KickPlayerNotify} msg The message object to deserialize into.
         * @param {!jspb.BinaryReader} reader The BinaryReader to use.
         * @return {!proto.stream.KickPlayerNotify}
         */
        proto.stream.KickPlayerNotify.deserializeBinaryFromReader = function (msg, reader) {
            while (reader.nextField()) {
                if (reader.isEndGroup()) {
                    break;
                }
                var field = reader.getFieldNumber();
                switch (field) {
                case 1:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setSrcuserid(value);
                    break;
                case 2:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setUserid(value);
                    break;
                case 3:
                    var value = /** @type {!Uint8Array} */ (reader.readBytes());
                    msg.setCpproto(value);
                    break;
                case 4:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setOwner(value);
                    break;
                default:
                    reader.skipField();
                    break;
                }
            }
            return msg;
        };


        /**
         * Serializes the message to binary data (in protobuf wire format).
         * @return {!Uint8Array}
         */
        proto.stream.KickPlayerNotify.prototype.serializeBinary = function () {
            var writer = new jspb.BinaryWriter();
            proto.stream.KickPlayerNotify.serializeBinaryToWriter(this, writer);
            return writer.getResultBuffer();
        };


        /**
         * Serializes the given message to binary data (in protobuf wire
         * format), writing to the given BinaryWriter.
         * @param {!proto.stream.KickPlayerNotify} message
         * @param {!jspb.BinaryWriter} writer
         * @suppress {unusedLocalVariables} f is only used for nested messages
         */
        proto.stream.KickPlayerNotify.serializeBinaryToWriter = function (message, writer) {
            var f = undefined;
            f = message.getSrcuserid();
            if (f !== 0) {
                writer.writeUint32(
                    1,
                    f
                );
            }
            f = message.getUserid();
            if (f !== 0) {
                writer.writeUint32(
                    2,
                    f
                );
            }
            f = message.getCpproto_asU8();
            if (f.length > 0) {
                writer.writeBytes(
                    3,
                    f
                );
            }
            f = message.getOwner();
            if (f !== 0) {
                writer.writeUint32(
                    4,
                    f
                );
            }
        };


        /**
         * optional uint32 srcUserID = 1;
         * @return {number}
         */
        proto.stream.KickPlayerNotify.prototype.getSrcuserid = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
        };


        /** @param {number} value */
        proto.stream.KickPlayerNotify.prototype.setSrcuserid = function (value) {
            jspb.Message.setProto3IntField(this, 1, value);
        };


        /**
         * optional uint32 userID = 2;
         * @return {number}
         */
        proto.stream.KickPlayerNotify.prototype.getUserid = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
        };


        /** @param {number} value */
        proto.stream.KickPlayerNotify.prototype.setUserid = function (value) {
            jspb.Message.setProto3IntField(this, 2, value);
        };


        /**
         * optional bytes cpProto = 3;
         * @return {!(string|Uint8Array)}
         */
        proto.stream.KickPlayerNotify.prototype.getCpproto = function () {
            return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
        };


        /**
         * optional bytes cpProto = 3;
         * This is a type-conversion wrapper around `getCpproto()`
         * @return {string}
         */
        proto.stream.KickPlayerNotify.prototype.getCpproto_asB64 = function () {
            return /** @type {string} */ (jspb.Message.bytesAsB64(
                this.getCpproto()));
        };


        /**
         * optional bytes cpProto = 3;
         * Note that Uint8Array is not supported on all browsers.
         * @see http://caniuse.com/Uint8Array
         * This is a type-conversion wrapper around `getCpproto()`
         * @return {!Uint8Array}
         */
        proto.stream.KickPlayerNotify.prototype.getCpproto_asU8 = function () {
            return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
                this.getCpproto()));
        };


        /** @param {!(string|Uint8Array)} value */
        proto.stream.KickPlayerNotify.prototype.setCpproto = function (value) {
            jspb.Message.setProto3BytesField(this, 3, value);
        };


        /**
         * optional uint32 owner = 4;
         * @return {number}
         */
        proto.stream.KickPlayerNotify.prototype.getOwner = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
        };


        /** @param {number} value */
        proto.stream.KickPlayerNotify.prototype.setOwner = function (value) {
            jspb.Message.setProto3IntField(this, 4, value);
        };


        /**
         * Generated by JsPbCodeGenerator.
         * @param {Array=} opt_data Optional initial data array, typically from a
         * server response, or constructed directly in Javascript. The array is used
         * in place and becomes part of the constructed object. It is not cloned.
         * If no data is provided, the constructed object will be empty, but still
         * valid.
         * @extends {jspb.Message}
         * @constructor
         */
        proto.stream.SetRoomPropertyReq = function (opt_data) {
            jspb.Message.initialize(this, opt_data, 0, -1, null, null);
        };
        goog.inherits(proto.stream.SetRoomPropertyReq, jspb.Message);
        if (goog.DEBUG && !COMPILED) {
            proto.stream.SetRoomPropertyReq.displayName = "proto.stream.SetRoomPropertyReq";
        }


        if (jspb.Message.GENERATE_TO_OBJECT) {
            /**
             * Creates an object representation of this proto suitable for use in Soy templates.
             * Field names that are reserved in JavaScript and will be renamed to pb_name.
             * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
             * For the list of reserved names please see:
             *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
             * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
             *     for transitional soy proto support: http://goto/soy-param-migration
             * @return {!Object}
             */
            proto.stream.SetRoomPropertyReq.prototype.toObject = function (opt_includeInstance) {
                return proto.stream.SetRoomPropertyReq.toObject(opt_includeInstance, this);
            };


            /**
             * Static version of the {@see toObject} method.
             * @param {boolean|undefined} includeInstance Whether to include the JSPB
             *     instance for transitional soy proto support:
             *     http://goto/soy-param-migration
             * @param {!proto.stream.SetRoomPropertyReq} msg The msg instance to transform.
             * @return {!Object}
             * @suppress {unusedLocalVariables} f is only used for nested messages
             */
            proto.stream.SetRoomPropertyReq.toObject = function (includeInstance, msg) {
                var f, obj = {
                    gameid: jspb.Message.getFieldWithDefault(msg, 1, 0),
                    roomid: jspb.Message.getFieldWithDefault(msg, 2, "0"),
                    userid: jspb.Message.getFieldWithDefault(msg, 3, 0),
                    roomproperty: msg.getRoomproperty_asB64()
                };

                if (includeInstance) {
                    obj.$jspbMessageInstance = msg;
                }
                return obj;
            };
        }


        /**
         * Deserializes binary data (in protobuf wire format).
         * @param {jspb.ByteSource} bytes The bytes to deserialize.
         * @return {!proto.stream.SetRoomPropertyReq}
         */
        proto.stream.SetRoomPropertyReq.deserializeBinary = function (bytes) {
            var reader = new jspb.BinaryReader(bytes);
            var msg = new proto.stream.SetRoomPropertyReq;
            return proto.stream.SetRoomPropertyReq.deserializeBinaryFromReader(msg, reader);
        };


        /**
         * Deserializes binary data (in protobuf wire format) from the
         * given reader into the given message object.
         * @param {!proto.stream.SetRoomPropertyReq} msg The message object to deserialize into.
         * @param {!jspb.BinaryReader} reader The BinaryReader to use.
         * @return {!proto.stream.SetRoomPropertyReq}
         */
        proto.stream.SetRoomPropertyReq.deserializeBinaryFromReader = function (msg, reader) {
            while (reader.nextField()) {
                if (reader.isEndGroup()) {
                    break;
                }
                var field = reader.getFieldNumber();
                switch (field) {
                case 1:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setGameid(value);
                    break;
                case 2:
                    var value = /** @type {string} */ (reader.readUint64String());
                    msg.setRoomid(value);
                    break;
                case 3:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setUserid(value);
                    break;
                case 4:
                    var value = /** @type {!Uint8Array} */ (reader.readBytes());
                    msg.setRoomproperty(value);
                    break;
                default:
                    reader.skipField();
                    break;
                }
            }
            return msg;
        };


        /**
         * Serializes the message to binary data (in protobuf wire format).
         * @return {!Uint8Array}
         */
        proto.stream.SetRoomPropertyReq.prototype.serializeBinary = function () {
            var writer = new jspb.BinaryWriter();
            proto.stream.SetRoomPropertyReq.serializeBinaryToWriter(this, writer);
            return writer.getResultBuffer();
        };


        /**
         * Serializes the given message to binary data (in protobuf wire
         * format), writing to the given BinaryWriter.
         * @param {!proto.stream.SetRoomPropertyReq} message
         * @param {!jspb.BinaryWriter} writer
         * @suppress {unusedLocalVariables} f is only used for nested messages
         */
        proto.stream.SetRoomPropertyReq.serializeBinaryToWriter = function (message, writer) {
            var f = undefined;
            f = message.getGameid();
            if (f !== 0) {
                writer.writeUint32(
                    1,
                    f
                );
            }
            f = message.getRoomid();
            if (parseInt(f, 10) !== 0) {
                writer.writeUint64String(
                    2,
                    f
                );
            }
            f = message.getUserid();
            if (f !== 0) {
                writer.writeUint32(
                    3,
                    f
                );
            }
            f = message.getRoomproperty_asU8();
            if (f.length > 0) {
                writer.writeBytes(
                    4,
                    f
                );
            }
        };


        /**
         * optional uint32 gameID = 1;
         * @return {number}
         */
        proto.stream.SetRoomPropertyReq.prototype.getGameid = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
        };


        /** @param {number} value */
        proto.stream.SetRoomPropertyReq.prototype.setGameid = function (value) {
            jspb.Message.setProto3IntField(this, 1, value);
        };


        /**
         * optional uint64 roomID = 2;
         * @return {string}
         */
        proto.stream.SetRoomPropertyReq.prototype.getRoomid = function () {
            return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, "0"));
        };


        /** @param {string} value */
        proto.stream.SetRoomPropertyReq.prototype.setRoomid = function (value) {
            jspb.Message.setProto3StringIntField(this, 2, value);
        };


        /**
         * optional uint32 userID = 3;
         * @return {number}
         */
        proto.stream.SetRoomPropertyReq.prototype.getUserid = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
        };


        /** @param {number} value */
        proto.stream.SetRoomPropertyReq.prototype.setUserid = function (value) {
            jspb.Message.setProto3IntField(this, 3, value);
        };


        /**
         * optional bytes roomProperty = 4;
         * @return {!(string|Uint8Array)}
         */
        proto.stream.SetRoomPropertyReq.prototype.getRoomproperty = function () {
            return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
        };


        /**
         * optional bytes roomProperty = 4;
         * This is a type-conversion wrapper around `getRoomproperty()`
         * @return {string}
         */
        proto.stream.SetRoomPropertyReq.prototype.getRoomproperty_asB64 = function () {
            return /** @type {string} */ (jspb.Message.bytesAsB64(
                this.getRoomproperty()));
        };


        /**
         * optional bytes roomProperty = 4;
         * Note that Uint8Array is not supported on all browsers.
         * @see http://caniuse.com/Uint8Array
         * This is a type-conversion wrapper around `getRoomproperty()`
         * @return {!Uint8Array}
         */
        proto.stream.SetRoomPropertyReq.prototype.getRoomproperty_asU8 = function () {
            return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
                this.getRoomproperty()));
        };


        /** @param {!(string|Uint8Array)} value */
        proto.stream.SetRoomPropertyReq.prototype.setRoomproperty = function (value) {
            jspb.Message.setProto3BytesField(this, 4, value);
        };


        /**
         * Generated by JsPbCodeGenerator.
         * @param {Array=} opt_data Optional initial data array, typically from a
         * server response, or constructed directly in Javascript. The array is used
         * in place and becomes part of the constructed object. It is not cloned.
         * If no data is provided, the constructed object will be empty, but still
         * valid.
         * @extends {jspb.Message}
         * @constructor
         */
        proto.stream.SetRoomPropertyRsp = function (opt_data) {
            jspb.Message.initialize(this, opt_data, 0, -1, null, null);
        };
        goog.inherits(proto.stream.SetRoomPropertyRsp, jspb.Message);
        if (goog.DEBUG && !COMPILED) {
            proto.stream.SetRoomPropertyRsp.displayName = "proto.stream.SetRoomPropertyRsp";
        }


        if (jspb.Message.GENERATE_TO_OBJECT) {
            /**
             * Creates an object representation of this proto suitable for use in Soy templates.
             * Field names that are reserved in JavaScript and will be renamed to pb_name.
             * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
             * For the list of reserved names please see:
             *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
             * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
             *     for transitional soy proto support: http://goto/soy-param-migration
             * @return {!Object}
             */
            proto.stream.SetRoomPropertyRsp.prototype.toObject = function (opt_includeInstance) {
                return proto.stream.SetRoomPropertyRsp.toObject(opt_includeInstance, this);
            };


            /**
             * Static version of the {@see toObject} method.
             * @param {boolean|undefined} includeInstance Whether to include the JSPB
             *     instance for transitional soy proto support:
             *     http://goto/soy-param-migration
             * @param {!proto.stream.SetRoomPropertyRsp} msg The msg instance to transform.
             * @return {!Object}
             * @suppress {unusedLocalVariables} f is only used for nested messages
             */
            proto.stream.SetRoomPropertyRsp.toObject = function (includeInstance, msg) {
                var f, obj = {
                    status: jspb.Message.getFieldWithDefault(msg, 1, 0),
                    roomid: jspb.Message.getFieldWithDefault(msg, 2, "0"),
                    userid: jspb.Message.getFieldWithDefault(msg, 3, 0),
                    roomproperty: msg.getRoomproperty_asB64()
                };

                if (includeInstance) {
                    obj.$jspbMessageInstance = msg;
                }
                return obj;
            };
        }


        /**
         * Deserializes binary data (in protobuf wire format).
         * @param {jspb.ByteSource} bytes The bytes to deserialize.
         * @return {!proto.stream.SetRoomPropertyRsp}
         */
        proto.stream.SetRoomPropertyRsp.deserializeBinary = function (bytes) {
            var reader = new jspb.BinaryReader(bytes);
            var msg = new proto.stream.SetRoomPropertyRsp;
            return proto.stream.SetRoomPropertyRsp.deserializeBinaryFromReader(msg, reader);
        };


        /**
         * Deserializes binary data (in protobuf wire format) from the
         * given reader into the given message object.
         * @param {!proto.stream.SetRoomPropertyRsp} msg The message object to deserialize into.
         * @param {!jspb.BinaryReader} reader The BinaryReader to use.
         * @return {!proto.stream.SetRoomPropertyRsp}
         */
        proto.stream.SetRoomPropertyRsp.deserializeBinaryFromReader = function (msg, reader) {
            while (reader.nextField()) {
                if (reader.isEndGroup()) {
                    break;
                }
                var field = reader.getFieldNumber();
                switch (field) {
                case 1:
                    var value = /** @type {!proto.stream.ErrorCode} */ (reader.readEnum());
                    msg.setStatus(value);
                    break;
                case 2:
                    var value = /** @type {string} */ (reader.readUint64String());
                    msg.setRoomid(value);
                    break;
                case 3:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setUserid(value);
                    break;
                case 4:
                    var value = /** @type {!Uint8Array} */ (reader.readBytes());
                    msg.setRoomproperty(value);
                    break;
                default:
                    reader.skipField();
                    break;
                }
            }
            return msg;
        };


        /**
         * Serializes the message to binary data (in protobuf wire format).
         * @return {!Uint8Array}
         */
        proto.stream.SetRoomPropertyRsp.prototype.serializeBinary = function () {
            var writer = new jspb.BinaryWriter();
            proto.stream.SetRoomPropertyRsp.serializeBinaryToWriter(this, writer);
            return writer.getResultBuffer();
        };


        /**
         * Serializes the given message to binary data (in protobuf wire
         * format), writing to the given BinaryWriter.
         * @param {!proto.stream.SetRoomPropertyRsp} message
         * @param {!jspb.BinaryWriter} writer
         * @suppress {unusedLocalVariables} f is only used for nested messages
         */
        proto.stream.SetRoomPropertyRsp.serializeBinaryToWriter = function (message, writer) {
            var f = undefined;
            f = message.getStatus();
            if (f !== 0.0) {
                writer.writeEnum(
                    1,
                    f
                );
            }
            f = message.getRoomid();
            if (parseInt(f, 10) !== 0) {
                writer.writeUint64String(
                    2,
                    f
                );
            }
            f = message.getUserid();
            if (f !== 0) {
                writer.writeUint32(
                    3,
                    f
                );
            }
            f = message.getRoomproperty_asU8();
            if (f.length > 0) {
                writer.writeBytes(
                    4,
                    f
                );
            }
        };


        /**
         * optional ErrorCode status = 1;
         * @return {!proto.stream.ErrorCode}
         */
        proto.stream.SetRoomPropertyRsp.prototype.getStatus = function () {
            return /** @type {!proto.stream.ErrorCode} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
        };


        /** @param {!proto.stream.ErrorCode} value */
        proto.stream.SetRoomPropertyRsp.prototype.setStatus = function (value) {
            jspb.Message.setProto3EnumField(this, 1, value);
        };


        /**
         * optional uint64 roomID = 2;
         * @return {string}
         */
        proto.stream.SetRoomPropertyRsp.prototype.getRoomid = function () {
            return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, "0"));
        };


        /** @param {string} value */
        proto.stream.SetRoomPropertyRsp.prototype.setRoomid = function (value) {
            jspb.Message.setProto3StringIntField(this, 2, value);
        };


        /**
         * optional uint32 userID = 3;
         * @return {number}
         */
        proto.stream.SetRoomPropertyRsp.prototype.getUserid = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
        };


        /** @param {number} value */
        proto.stream.SetRoomPropertyRsp.prototype.setUserid = function (value) {
            jspb.Message.setProto3IntField(this, 3, value);
        };


        /**
         * optional bytes roomProperty = 4;
         * @return {!(string|Uint8Array)}
         */
        proto.stream.SetRoomPropertyRsp.prototype.getRoomproperty = function () {
            return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
        };


        /**
         * optional bytes roomProperty = 4;
         * This is a type-conversion wrapper around `getRoomproperty()`
         * @return {string}
         */
        proto.stream.SetRoomPropertyRsp.prototype.getRoomproperty_asB64 = function () {
            return /** @type {string} */ (jspb.Message.bytesAsB64(
                this.getRoomproperty()));
        };


        /**
         * optional bytes roomProperty = 4;
         * Note that Uint8Array is not supported on all browsers.
         * @see http://caniuse.com/Uint8Array
         * This is a type-conversion wrapper around `getRoomproperty()`
         * @return {!Uint8Array}
         */
        proto.stream.SetRoomPropertyRsp.prototype.getRoomproperty_asU8 = function () {
            return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
                this.getRoomproperty()));
        };


        /** @param {!(string|Uint8Array)} value */
        proto.stream.SetRoomPropertyRsp.prototype.setRoomproperty = function (value) {
            jspb.Message.setProto3BytesField(this, 4, value);
        };


        /**
         * Generated by JsPbCodeGenerator.
         * @param {Array=} opt_data Optional initial data array, typically from a
         * server response, or constructed directly in Javascript. The array is used
         * in place and becomes part of the constructed object. It is not cloned.
         * If no data is provided, the constructed object will be empty, but still
         * valid.
         * @extends {jspb.Message}
         * @constructor
         */
        proto.stream.NoticeRoomProperty = function (opt_data) {
            jspb.Message.initialize(this, opt_data, 0, -1, null, null);
        };
        goog.inherits(proto.stream.NoticeRoomProperty, jspb.Message);
        if (goog.DEBUG && !COMPILED) {
            proto.stream.NoticeRoomProperty.displayName = "proto.stream.NoticeRoomProperty";
        }


        if (jspb.Message.GENERATE_TO_OBJECT) {
            /**
             * Creates an object representation of this proto suitable for use in Soy templates.
             * Field names that are reserved in JavaScript and will be renamed to pb_name.
             * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
             * For the list of reserved names please see:
             *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
             * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
             *     for transitional soy proto support: http://goto/soy-param-migration
             * @return {!Object}
             */
            proto.stream.NoticeRoomProperty.prototype.toObject = function (opt_includeInstance) {
                return proto.stream.NoticeRoomProperty.toObject(opt_includeInstance, this);
            };


            /**
             * Static version of the {@see toObject} method.
             * @param {boolean|undefined} includeInstance Whether to include the JSPB
             *     instance for transitional soy proto support:
             *     http://goto/soy-param-migration
             * @param {!proto.stream.NoticeRoomProperty} msg The msg instance to transform.
             * @return {!Object}
             * @suppress {unusedLocalVariables} f is only used for nested messages
             */
            proto.stream.NoticeRoomProperty.toObject = function (includeInstance, msg) {
                var f, obj = {
                    roomid: jspb.Message.getFieldWithDefault(msg, 1, "0"),
                    userid: jspb.Message.getFieldWithDefault(msg, 2, 0),
                    roomproperty: msg.getRoomproperty_asB64()
                };

                if (includeInstance) {
                    obj.$jspbMessageInstance = msg;
                }
                return obj;
            };
        }


        /**
         * Deserializes binary data (in protobuf wire format).
         * @param {jspb.ByteSource} bytes The bytes to deserialize.
         * @return {!proto.stream.NoticeRoomProperty}
         */
        proto.stream.NoticeRoomProperty.deserializeBinary = function (bytes) {
            var reader = new jspb.BinaryReader(bytes);
            var msg = new proto.stream.NoticeRoomProperty;
            return proto.stream.NoticeRoomProperty.deserializeBinaryFromReader(msg, reader);
        };


        /**
         * Deserializes binary data (in protobuf wire format) from the
         * given reader into the given message object.
         * @param {!proto.stream.NoticeRoomProperty} msg The message object to deserialize into.
         * @param {!jspb.BinaryReader} reader The BinaryReader to use.
         * @return {!proto.stream.NoticeRoomProperty}
         */
        proto.stream.NoticeRoomProperty.deserializeBinaryFromReader = function (msg, reader) {
            while (reader.nextField()) {
                if (reader.isEndGroup()) {
                    break;
                }
                var field = reader.getFieldNumber();
                switch (field) {
                case 1:
                    var value = /** @type {string} */ (reader.readUint64String());
                    msg.setRoomid(value);
                    break;
                case 2:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setUserid(value);
                    break;
                case 3:
                    var value = /** @type {!Uint8Array} */ (reader.readBytes());
                    msg.setRoomproperty(value);
                    break;
                default:
                    reader.skipField();
                    break;
                }
            }
            return msg;
        };


        /**
         * Serializes the message to binary data (in protobuf wire format).
         * @return {!Uint8Array}
         */
        proto.stream.NoticeRoomProperty.prototype.serializeBinary = function () {
            var writer = new jspb.BinaryWriter();
            proto.stream.NoticeRoomProperty.serializeBinaryToWriter(this, writer);
            return writer.getResultBuffer();
        };


        /**
         * Serializes the given message to binary data (in protobuf wire
         * format), writing to the given BinaryWriter.
         * @param {!proto.stream.NoticeRoomProperty} message
         * @param {!jspb.BinaryWriter} writer
         * @suppress {unusedLocalVariables} f is only used for nested messages
         */
        proto.stream.NoticeRoomProperty.serializeBinaryToWriter = function (message, writer) {
            var f = undefined;
            f = message.getRoomid();
            if (parseInt(f, 10) !== 0) {
                writer.writeUint64String(
                    1,
                    f
                );
            }
            f = message.getUserid();
            if (f !== 0) {
                writer.writeUint32(
                    2,
                    f
                );
            }
            f = message.getRoomproperty_asU8();
            if (f.length > 0) {
                writer.writeBytes(
                    3,
                    f
                );
            }
        };


        /**
         * optional uint64 roomID = 1;
         * @return {string}
         */
        proto.stream.NoticeRoomProperty.prototype.getRoomid = function () {
            return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, "0"));
        };


        /** @param {string} value */
        proto.stream.NoticeRoomProperty.prototype.setRoomid = function (value) {
            jspb.Message.setProto3StringIntField(this, 1, value);
        };


        /**
         * optional uint32 userID = 2;
         * @return {number}
         */
        proto.stream.NoticeRoomProperty.prototype.getUserid = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
        };


        /** @param {number} value */
        proto.stream.NoticeRoomProperty.prototype.setUserid = function (value) {
            jspb.Message.setProto3IntField(this, 2, value);
        };


        /**
         * optional bytes roomProperty = 3;
         * @return {!(string|Uint8Array)}
         */
        proto.stream.NoticeRoomProperty.prototype.getRoomproperty = function () {
            return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
        };


        /**
         * optional bytes roomProperty = 3;
         * This is a type-conversion wrapper around `getRoomproperty()`
         * @return {string}
         */
        proto.stream.NoticeRoomProperty.prototype.getRoomproperty_asB64 = function () {
            return /** @type {string} */ (jspb.Message.bytesAsB64(
                this.getRoomproperty()));
        };


        /**
         * optional bytes roomProperty = 3;
         * Note that Uint8Array is not supported on all browsers.
         * @see http://caniuse.com/Uint8Array
         * This is a type-conversion wrapper around `getRoomproperty()`
         * @return {!Uint8Array}
         */
        proto.stream.NoticeRoomProperty.prototype.getRoomproperty_asU8 = function () {
            return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
                this.getRoomproperty()));
        };


        /** @param {!(string|Uint8Array)} value */
        proto.stream.NoticeRoomProperty.prototype.setRoomproperty = function (value) {
            jspb.Message.setProto3BytesField(this, 3, value);
        };


        /**
         * @enum {number}
         */
        proto.stream.CmdId = {
            NOCMD: 0,
            LOGINREQ: 1101,
            LOGINRSP: 1102,
            LOGOUTREQ: 1105,
            LOGOUTRSP: 1106,
            HEARTBEATREQ: 1103,
            NETWORKSTATEREQ: 1120,
            NETWORKSTATERSP: 1121,
            NOTICENETWORKSTATEREQ: 1122,
            CREATEROOMREQ: 1203,
            CREATEROOMRSP: 1204,
            GETROOMLISTREQ: 1207,
            GETROOMLISTRSP: 1208,
            ROOMLISTEXREQ: 1215,
            ROOMLISTEXRSP: 1216,
            SETROOMPROPERTYREQ: 1219,
            SETROOMPROPERTYRSP: 1220,
            NOTICEROOMPROPERTY: 1307,
            GETROOMDETAILREQ: 1209,
            GETROOMDETAILRSP: 1210,
            JOINROOMREQ: 1201,
            JOINROOMRSP: 1202,
            NOTICEUSERJOINREQ: 1301,
            LEAVEROOMREQ: 1205,
            LEAVEROOMRSP: 1206,
            NOTICEUSERLEAVEREQ: 1302,
            JOINOVERREQ: 1213,
            JOINOVERRSP: 1214,
            JOINOVERNOTIFY: 1306,
            JOINOPENREQ: 1221,
            JOINOPENRSP: 1222,
            JOINOPENNOTIFY: 1308,
            DISCONNECTREQ: 1107,
            DISCONNECTRSP: 1108,
            KICKPLAYERREQ: 1303,
            KICKPLAYERRSP: 1304,
            KICKPLAYERNOTIFY: 1305
        };

        /**
         * @enum {number}
         */
        proto.stream.JoinRoomType = {
            NOJOIN: 0,
            JOINSPECIALROOM: 1,
            JOINROOMWITHPROPERTY: 2,
            JOINRANDOMROOM: 3
        };

        /**
         * @enum {number}
         */
        proto.stream.RoomState = {
            ROOMSTATENIL: 0,
            ROOMSTATEOPEN: 1,
            ROOMSTATECLOSED: 2
        };

        /**
         * @enum {number}
         */
        proto.stream.RoomListSort = {
            ROOMSORTNIL: 0,
            ROOMSORTCREATETIME: 1,
            ROOMSORTPLAYERNUM: 2,
            ROOMSORTSTATE: 3
        };

        /**
         * @enum {number}
         */
        proto.stream.SortOrder = {
            SORTASC: 0,
            SORTDESC: 1
        };

        goog.object.extend(exports, proto.stream);

    }, {"./errorcode_pb.js": 2, "google-protobuf": 1}], 5: [function (_require, module, exports) {
        /**
         * @fileoverview
         * @enhanceable
         * @suppress {messageConventions} JS Compiler reports an error if a variable or
         *     field starts with 'MSG_' and isn't a translatable message.
         * @public
         */
        // GENERATED CODE -- DO NOT EDIT!

        var jspb = _require("google-protobuf");
        var goog = jspb;
        var global = window;// var global = Function('return this')();

        goog.exportSymbol("proto.stream.Broadcast", null, global);
        goog.exportSymbol("proto.stream.BroadcastAck", null, global);
        goog.exportSymbol("proto.stream.CheckIn", null, global);
        goog.exportSymbol("proto.stream.CheckInAck", null, global);
        goog.exportSymbol("proto.stream.CheckInNotify", null, global);
        goog.exportSymbol("proto.stream.FrameBroadcast", null, global);
        goog.exportSymbol("proto.stream.FrameBroadcastAck", null, global);
        goog.exportSymbol("proto.stream.FrameDataNotify", null, global);
        goog.exportSymbol("proto.stream.FrameSyncNotify", null, global);
        goog.exportSymbol("proto.stream.Heartbeat", null, global);
        goog.exportSymbol("proto.stream.HeartbeatAck", null, global);
        goog.exportSymbol("proto.stream.Notify", null, global);
        goog.exportSymbol("proto.stream.Publish", null, global);
        goog.exportSymbol("proto.stream.PublishAck", null, global);
        goog.exportSymbol("proto.stream.PublishNotify", null, global);
        goog.exportSymbol("proto.stream.SDKHotelCmdID", null, global);
        goog.exportSymbol("proto.stream.SetFrameSyncRate", null, global);
        goog.exportSymbol("proto.stream.SetFrameSyncRateAck", null, global);
        goog.exportSymbol("proto.stream.SetFrameSyncRateNotify", null, global);
        goog.exportSymbol("proto.stream.SetUseTimeStamp", null, global);
        goog.exportSymbol("proto.stream.SetUseTimeStampAck", null, global);
        goog.exportSymbol("proto.stream.Subscribe", null, global);
        goog.exportSymbol("proto.stream.SubscribeAck", null, global);

        /**
         * Generated by JsPbCodeGenerator.
         * @param {Array=} opt_data Optional initial data array, typically from a
         * server response, or constructed directly in Javascript. The array is used
         * in place and becomes part of the constructed object. It is not cloned.
         * If no data is provided, the constructed object will be empty, but still
         * valid.
         * @extends {jspb.Message}
         * @constructor
         */
        proto.stream.CheckIn = function (opt_data) {
            jspb.Message.initialize(this, opt_data, 0, -1, null, null);
        };
        goog.inherits(proto.stream.CheckIn, jspb.Message);
        if (goog.DEBUG && !COMPILED) {
            proto.stream.CheckIn.displayName = "proto.stream.CheckIn";
        }


        if (jspb.Message.GENERATE_TO_OBJECT) {
            /**
             * Creates an object representation of this proto suitable for use in Soy templates.
             * Field names that are reserved in JavaScript and will be renamed to pb_name.
             * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
             * For the list of reserved names please see:
             *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
             * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
             *     for transitional soy proto support: http://goto/soy-param-migration
             * @return {!Object}
             */
            proto.stream.CheckIn.prototype.toObject = function (opt_includeInstance) {
                return proto.stream.CheckIn.toObject(opt_includeInstance, this);
            };


            /**
             * Static version of the {@see toObject} method.
             * @param {boolean|undefined} includeInstance Whether to include the JSPB
             *     instance for transitional soy proto support:
             *     http://goto/soy-param-migration
             * @param {!proto.stream.CheckIn} msg The msg instance to transform.
             * @return {!Object}
             * @suppress {unusedLocalVariables} f is only used for nested messages
             */
            proto.stream.CheckIn.toObject = function (includeInstance, msg) {
                var f, obj = {
                    gameid: jspb.Message.getFieldWithDefault(msg, 1, 0),
                    roomid: jspb.Message.getFieldWithDefault(msg, 2, "0"),
                    userid: jspb.Message.getFieldWithDefault(msg, 3, 0),
                    bookid: jspb.Message.getFieldWithDefault(msg, 4, ""),
                    key: jspb.Message.getFieldWithDefault(msg, 5, "")
                };

                if (includeInstance) {
                    obj.$jspbMessageInstance = msg;
                }
                return obj;
            };
        }


        /**
         * Deserializes binary data (in protobuf wire format).
         * @param {jspb.ByteSource} bytes The bytes to deserialize.
         * @return {!proto.stream.CheckIn}
         */
        proto.stream.CheckIn.deserializeBinary = function (bytes) {
            var reader = new jspb.BinaryReader(bytes);
            var msg = new proto.stream.CheckIn;
            return proto.stream.CheckIn.deserializeBinaryFromReader(msg, reader);
        };


        /**
         * Deserializes binary data (in protobuf wire format) from the
         * given reader into the given message object.
         * @param {!proto.stream.CheckIn} msg The message object to deserialize into.
         * @param {!jspb.BinaryReader} reader The BinaryReader to use.
         * @return {!proto.stream.CheckIn}
         */
        proto.stream.CheckIn.deserializeBinaryFromReader = function (msg, reader) {
            while (reader.nextField()) {
                if (reader.isEndGroup()) {
                    break;
                }
                var field = reader.getFieldNumber();
                switch (field) {
                case 1:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setGameid(value);
                    break;
                case 2:
                    var value = /** @type {string} */ (reader.readUint64String());
                    msg.setRoomid(value);
                    break;
                case 3:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setUserid(value);
                    break;
                case 4:
                    var value = /** @type {string} */ (reader.readString());
                    msg.setBookid(value);
                    break;
                case 5:
                    var value = /** @type {string} */ (reader.readString());
                    msg.setKey(value);
                    break;
                default:
                    reader.skipField();
                    break;
                }
            }
            return msg;
        };


        /**
         * Serializes the message to binary data (in protobuf wire format).
         * @return {!Uint8Array}
         */
        proto.stream.CheckIn.prototype.serializeBinary = function () {
            var writer = new jspb.BinaryWriter();
            proto.stream.CheckIn.serializeBinaryToWriter(this, writer);
            return writer.getResultBuffer();
        };


        /**
         * Serializes the given message to binary data (in protobuf wire
         * format), writing to the given BinaryWriter.
         * @param {!proto.stream.CheckIn} message
         * @param {!jspb.BinaryWriter} writer
         * @suppress {unusedLocalVariables} f is only used for nested messages
         */
        proto.stream.CheckIn.serializeBinaryToWriter = function (message, writer) {
            var f = undefined;
            f = message.getGameid();
            if (f !== 0) {
                writer.writeUint32(
                    1,
                    f
                );
            }
            f = message.getRoomid();
            if (parseInt(f, 10) !== 0) {
                writer.writeUint64String(
                    2,
                    f
                );
            }
            f = message.getUserid();
            if (f !== 0) {
                writer.writeUint32(
                    3,
                    f
                );
            }
            f = message.getBookid();
            if (f.length > 0) {
                writer.writeString(
                    4,
                    f
                );
            }
            f = message.getKey();
            if (f.length > 0) {
                writer.writeString(
                    5,
                    f
                );
            }
        };


        /**
         * optional uint32 gameID = 1;
         * @return {number}
         */
        proto.stream.CheckIn.prototype.getGameid = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
        };


        /** @param {number} value */
        proto.stream.CheckIn.prototype.setGameid = function (value) {
            jspb.Message.setProto3IntField(this, 1, value);
        };


        /**
         * optional uint64 roomID = 2;
         * @return {string}
         */
        proto.stream.CheckIn.prototype.getRoomid = function () {
            return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, "0"));
        };


        /** @param {string} value */
        proto.stream.CheckIn.prototype.setRoomid = function (value) {
            jspb.Message.setProto3StringIntField(this, 2, value);
        };


        /**
         * optional uint32 userID = 3;
         * @return {number}
         */
        proto.stream.CheckIn.prototype.getUserid = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
        };


        /** @param {number} value */
        proto.stream.CheckIn.prototype.setUserid = function (value) {
            jspb.Message.setProto3IntField(this, 3, value);
        };


        /**
         * optional string bookID = 4;
         * @return {string}
         */
        proto.stream.CheckIn.prototype.getBookid = function () {
            return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
        };


        /** @param {string} value */
        proto.stream.CheckIn.prototype.setBookid = function (value) {
            jspb.Message.setProto3StringField(this, 4, value);
        };


        /**
         * optional string key = 5;
         * @return {string}
         */
        proto.stream.CheckIn.prototype.getKey = function () {
            return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
        };


        /** @param {string} value */
        proto.stream.CheckIn.prototype.setKey = function (value) {
            jspb.Message.setProto3StringField(this, 5, value);
        };


        /**
         * Generated by JsPbCodeGenerator.
         * @param {Array=} opt_data Optional initial data array, typically from a
         * server response, or constructed directly in Javascript. The array is used
         * in place and becomes part of the constructed object. It is not cloned.
         * If no data is provided, the constructed object will be empty, but still
         * valid.
         * @extends {jspb.Message}
         * @constructor
         */
        proto.stream.CheckInAck = function (opt_data) {
            jspb.Message.initialize(this, opt_data, 0, -1, proto.stream.CheckInAck.repeatedFields_, null);
        };
        goog.inherits(proto.stream.CheckInAck, jspb.Message);
        if (goog.DEBUG && !COMPILED) {
            proto.stream.CheckInAck.displayName = "proto.stream.CheckInAck";
        }
        /**
         * List of repeated fields within this message type.
         * @private {!Array<number>}
         * @const
         */
        proto.stream.CheckInAck.repeatedFields_ = [3, 4];


        if (jspb.Message.GENERATE_TO_OBJECT) {
            /**
             * Creates an object representation of this proto suitable for use in Soy templates.
             * Field names that are reserved in JavaScript and will be renamed to pb_name.
             * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
             * For the list of reserved names please see:
             *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
             * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
             *     for transitional soy proto support: http://goto/soy-param-migration
             * @return {!Object}
             */
            proto.stream.CheckInAck.prototype.toObject = function (opt_includeInstance) {
                return proto.stream.CheckInAck.toObject(opt_includeInstance, this);
            };


            /**
             * Static version of the {@see toObject} method.
             * @param {boolean|undefined} includeInstance Whether to include the JSPB
             *     instance for transitional soy proto support:
             *     http://goto/soy-param-migration
             * @param {!proto.stream.CheckInAck} msg The msg instance to transform.
             * @return {!Object}
             * @suppress {unusedLocalVariables} f is only used for nested messages
             */
            proto.stream.CheckInAck.toObject = function (includeInstance, msg) {
                var f, obj = {
                    status: jspb.Message.getFieldWithDefault(msg, 1, 0),
                    bookid: jspb.Message.getFieldWithDefault(msg, 2, ""),
                    checkinsList: jspb.Message.getRepeatedField(msg, 3),
                    playersList: jspb.Message.getRepeatedField(msg, 4),
                    maxplayers: jspb.Message.getFieldWithDefault(msg, 5, 0)
                };

                if (includeInstance) {
                    obj.$jspbMessageInstance = msg;
                }
                return obj;
            };
        }


        /**
         * Deserializes binary data (in protobuf wire format).
         * @param {jspb.ByteSource} bytes The bytes to deserialize.
         * @return {!proto.stream.CheckInAck}
         */
        proto.stream.CheckInAck.deserializeBinary = function (bytes) {
            var reader = new jspb.BinaryReader(bytes);
            var msg = new proto.stream.CheckInAck;
            return proto.stream.CheckInAck.deserializeBinaryFromReader(msg, reader);
        };


        /**
         * Deserializes binary data (in protobuf wire format) from the
         * given reader into the given message object.
         * @param {!proto.stream.CheckInAck} msg The message object to deserialize into.
         * @param {!jspb.BinaryReader} reader The BinaryReader to use.
         * @return {!proto.stream.CheckInAck}
         */
        proto.stream.CheckInAck.deserializeBinaryFromReader = function (msg, reader) {
            while (reader.nextField()) {
                if (reader.isEndGroup()) {
                    break;
                }
                var field = reader.getFieldNumber();
                switch (field) {
                case 1:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setStatus(value);
                    break;
                case 2:
                    var value = /** @type {string} */ (reader.readString());
                    msg.setBookid(value);
                    break;
                case 3:
                    var value = /** @type {!Array.<number>} */ (reader.readPackedUint32());
                    msg.setCheckinsList(value);
                    break;
                case 4:
                    var value = /** @type {!Array.<number>} */ (reader.readPackedUint32());
                    msg.setPlayersList(value);
                    break;
                case 5:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setMaxplayers(value);
                    break;
                default:
                    reader.skipField();
                    break;
                }
            }
            return msg;
        };


        /**
         * Serializes the message to binary data (in protobuf wire format).
         * @return {!Uint8Array}
         */
        proto.stream.CheckInAck.prototype.serializeBinary = function () {
            var writer = new jspb.BinaryWriter();
            proto.stream.CheckInAck.serializeBinaryToWriter(this, writer);
            return writer.getResultBuffer();
        };


        /**
         * Serializes the given message to binary data (in protobuf wire
         * format), writing to the given BinaryWriter.
         * @param {!proto.stream.CheckInAck} message
         * @param {!jspb.BinaryWriter} writer
         * @suppress {unusedLocalVariables} f is only used for nested messages
         */
        proto.stream.CheckInAck.serializeBinaryToWriter = function (message, writer) {
            var f = undefined;
            f = message.getStatus();
            if (f !== 0) {
                writer.writeUint32(
                    1,
                    f
                );
            }
            f = message.getBookid();
            if (f.length > 0) {
                writer.writeString(
                    2,
                    f
                );
            }
            f = message.getCheckinsList();
            if (f.length > 0) {
                writer.writePackedUint32(
                    3,
                    f
                );
            }
            f = message.getPlayersList();
            if (f.length > 0) {
                writer.writePackedUint32(
                    4,
                    f
                );
            }
            f = message.getMaxplayers();
            if (f !== 0) {
                writer.writeUint32(
                    5,
                    f
                );
            }
        };


        /**
         * optional uint32 status = 1;
         * @return {number}
         */
        proto.stream.CheckInAck.prototype.getStatus = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
        };


        /** @param {number} value */
        proto.stream.CheckInAck.prototype.setStatus = function (value) {
            jspb.Message.setProto3IntField(this, 1, value);
        };


        /**
         * optional string bookID = 2;
         * @return {string}
         */
        proto.stream.CheckInAck.prototype.getBookid = function () {
            return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
        };


        /** @param {string} value */
        proto.stream.CheckInAck.prototype.setBookid = function (value) {
            jspb.Message.setProto3StringField(this, 2, value);
        };


        /**
         * repeated uint32 checkins = 3;
         * @return {!Array.<number>}
         */
        proto.stream.CheckInAck.prototype.getCheckinsList = function () {
            return /** @type {!Array.<number>} */ (jspb.Message.getRepeatedField(this, 3));
        };


        /** @param {!Array.<number>} value */
        proto.stream.CheckInAck.prototype.setCheckinsList = function (value) {
            jspb.Message.setField(this, 3, value || []);
        };


        /**
         * @param {!number} value
         * @param {number=} opt_index
         */
        proto.stream.CheckInAck.prototype.addCheckins = function (value, opt_index) {
            jspb.Message.addToRepeatedField(this, 3, value, opt_index);
        };


        proto.stream.CheckInAck.prototype.clearCheckinsList = function () {
            this.setCheckinsList([]);
        };


        /**
         * repeated uint32 players = 4;
         * @return {!Array.<number>}
         */
        proto.stream.CheckInAck.prototype.getPlayersList = function () {
            return /** @type {!Array.<number>} */ (jspb.Message.getRepeatedField(this, 4));
        };


        /** @param {!Array.<number>} value */
        proto.stream.CheckInAck.prototype.setPlayersList = function (value) {
            jspb.Message.setField(this, 4, value || []);
        };


        /**
         * @param {!number} value
         * @param {number=} opt_index
         */
        proto.stream.CheckInAck.prototype.addPlayers = function (value, opt_index) {
            jspb.Message.addToRepeatedField(this, 4, value, opt_index);
        };


        proto.stream.CheckInAck.prototype.clearPlayersList = function () {
            this.setPlayersList([]);
        };


        /**
         * optional uint32 maxPlayers = 5;
         * @return {number}
         */
        proto.stream.CheckInAck.prototype.getMaxplayers = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
        };


        /** @param {number} value */
        proto.stream.CheckInAck.prototype.setMaxplayers = function (value) {
            jspb.Message.setProto3IntField(this, 5, value);
        };


        /**
         * Generated by JsPbCodeGenerator.
         * @param {Array=} opt_data Optional initial data array, typically from a
         * server response, or constructed directly in Javascript. The array is used
         * in place and becomes part of the constructed object. It is not cloned.
         * If no data is provided, the constructed object will be empty, but still
         * valid.
         * @extends {jspb.Message}
         * @constructor
         */
        proto.stream.Heartbeat = function (opt_data) {
            jspb.Message.initialize(this, opt_data, 0, -1, null, null);
        };
        goog.inherits(proto.stream.Heartbeat, jspb.Message);
        if (goog.DEBUG && !COMPILED) {
            proto.stream.Heartbeat.displayName = "proto.stream.Heartbeat";
        }


        if (jspb.Message.GENERATE_TO_OBJECT) {
            /**
             * Creates an object representation of this proto suitable for use in Soy templates.
             * Field names that are reserved in JavaScript and will be renamed to pb_name.
             * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
             * For the list of reserved names please see:
             *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
             * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
             *     for transitional soy proto support: http://goto/soy-param-migration
             * @return {!Object}
             */
            proto.stream.Heartbeat.prototype.toObject = function (opt_includeInstance) {
                return proto.stream.Heartbeat.toObject(opt_includeInstance, this);
            };


            /**
             * Static version of the {@see toObject} method.
             * @param {boolean|undefined} includeInstance Whether to include the JSPB
             *     instance for transitional soy proto support:
             *     http://goto/soy-param-migration
             * @param {!proto.stream.Heartbeat} msg The msg instance to transform.
             * @return {!Object}
             * @suppress {unusedLocalVariables} f is only used for nested messages
             */
            proto.stream.Heartbeat.toObject = function (includeInstance, msg) {
                var f, obj = {
                    gameid: jspb.Message.getFieldWithDefault(msg, 1, 0),
                    roomid: jspb.Message.getFieldWithDefault(msg, 2, "0"),
                    userid: jspb.Message.getFieldWithDefault(msg, 3, 0)
                };

                if (includeInstance) {
                    obj.$jspbMessageInstance = msg;
                }
                return obj;
            };
        }


        /**
         * Deserializes binary data (in protobuf wire format).
         * @param {jspb.ByteSource} bytes The bytes to deserialize.
         * @return {!proto.stream.Heartbeat}
         */
        proto.stream.Heartbeat.deserializeBinary = function (bytes) {
            var reader = new jspb.BinaryReader(bytes);
            var msg = new proto.stream.Heartbeat;
            return proto.stream.Heartbeat.deserializeBinaryFromReader(msg, reader);
        };


        /**
         * Deserializes binary data (in protobuf wire format) from the
         * given reader into the given message object.
         * @param {!proto.stream.Heartbeat} msg The message object to deserialize into.
         * @param {!jspb.BinaryReader} reader The BinaryReader to use.
         * @return {!proto.stream.Heartbeat}
         */
        proto.stream.Heartbeat.deserializeBinaryFromReader = function (msg, reader) {
            while (reader.nextField()) {
                if (reader.isEndGroup()) {
                    break;
                }
                var field = reader.getFieldNumber();
                switch (field) {
                case 1:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setGameid(value);
                    break;
                case 2:
                    var value = /** @type {string} */ (reader.readUint64String());
                    msg.setRoomid(value);
                    break;
                case 3:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setUserid(value);
                    break;
                default:
                    reader.skipField();
                    break;
                }
            }
            return msg;
        };


        /**
         * Serializes the message to binary data (in protobuf wire format).
         * @return {!Uint8Array}
         */
        proto.stream.Heartbeat.prototype.serializeBinary = function () {
            var writer = new jspb.BinaryWriter();
            proto.stream.Heartbeat.serializeBinaryToWriter(this, writer);
            return writer.getResultBuffer();
        };


        /**
         * Serializes the given message to binary data (in protobuf wire
         * format), writing to the given BinaryWriter.
         * @param {!proto.stream.Heartbeat} message
         * @param {!jspb.BinaryWriter} writer
         * @suppress {unusedLocalVariables} f is only used for nested messages
         */
        proto.stream.Heartbeat.serializeBinaryToWriter = function (message, writer) {
            var f = undefined;
            f = message.getGameid();
            if (f !== 0) {
                writer.writeUint32(
                    1,
                    f
                );
            }
            f = message.getRoomid();
            if (parseInt(f, 10) !== 0) {
                writer.writeUint64String(
                    2,
                    f
                );
            }
            f = message.getUserid();
            if (f !== 0) {
                writer.writeUint32(
                    3,
                    f
                );
            }
        };


        /**
         * optional uint32 gameID = 1;
         * @return {number}
         */
        proto.stream.Heartbeat.prototype.getGameid = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
        };


        /** @param {number} value */
        proto.stream.Heartbeat.prototype.setGameid = function (value) {
            jspb.Message.setProto3IntField(this, 1, value);
        };


        /**
         * optional uint64 roomID = 2;
         * @return {string}
         */
        proto.stream.Heartbeat.prototype.getRoomid = function () {
            return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, "0"));
        };


        /** @param {string} value */
        proto.stream.Heartbeat.prototype.setRoomid = function (value) {
            jspb.Message.setProto3StringIntField(this, 2, value);
        };


        /**
         * optional uint32 userID = 3;
         * @return {number}
         */
        proto.stream.Heartbeat.prototype.getUserid = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
        };


        /** @param {number} value */
        proto.stream.Heartbeat.prototype.setUserid = function (value) {
            jspb.Message.setProto3IntField(this, 3, value);
        };


        /**
         * Generated by JsPbCodeGenerator.
         * @param {Array=} opt_data Optional initial data array, typically from a
         * server response, or constructed directly in Javascript. The array is used
         * in place and becomes part of the constructed object. It is not cloned.
         * If no data is provided, the constructed object will be empty, but still
         * valid.
         * @extends {jspb.Message}
         * @constructor
         */
        proto.stream.HeartbeatAck = function (opt_data) {
            jspb.Message.initialize(this, opt_data, 0, -1, null, null);
        };
        goog.inherits(proto.stream.HeartbeatAck, jspb.Message);
        if (goog.DEBUG && !COMPILED) {
            proto.stream.HeartbeatAck.displayName = "proto.stream.HeartbeatAck";
        }


        if (jspb.Message.GENERATE_TO_OBJECT) {
            /**
             * Creates an object representation of this proto suitable for use in Soy templates.
             * Field names that are reserved in JavaScript and will be renamed to pb_name.
             * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
             * For the list of reserved names please see:
             *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
             * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
             *     for transitional soy proto support: http://goto/soy-param-migration
             * @return {!Object}
             */
            proto.stream.HeartbeatAck.prototype.toObject = function (opt_includeInstance) {
                return proto.stream.HeartbeatAck.toObject(opt_includeInstance, this);
            };


            /**
             * Static version of the {@see toObject} method.
             * @param {boolean|undefined} includeInstance Whether to include the JSPB
             *     instance for transitional soy proto support:
             *     http://goto/soy-param-migration
             * @param {!proto.stream.HeartbeatAck} msg The msg instance to transform.
             * @return {!Object}
             * @suppress {unusedLocalVariables} f is only used for nested messages
             */
            proto.stream.HeartbeatAck.toObject = function (includeInstance, msg) {
                var f, obj = {
                    status: jspb.Message.getFieldWithDefault(msg, 1, 0)
                };

                if (includeInstance) {
                    obj.$jspbMessageInstance = msg;
                }
                return obj;
            };
        }


        /**
         * Deserializes binary data (in protobuf wire format).
         * @param {jspb.ByteSource} bytes The bytes to deserialize.
         * @return {!proto.stream.HeartbeatAck}
         */
        proto.stream.HeartbeatAck.deserializeBinary = function (bytes) {
            var reader = new jspb.BinaryReader(bytes);
            var msg = new proto.stream.HeartbeatAck;
            return proto.stream.HeartbeatAck.deserializeBinaryFromReader(msg, reader);
        };


        /**
         * Deserializes binary data (in protobuf wire format) from the
         * given reader into the given message object.
         * @param {!proto.stream.HeartbeatAck} msg The message object to deserialize into.
         * @param {!jspb.BinaryReader} reader The BinaryReader to use.
         * @return {!proto.stream.HeartbeatAck}
         */
        proto.stream.HeartbeatAck.deserializeBinaryFromReader = function (msg, reader) {
            while (reader.nextField()) {
                if (reader.isEndGroup()) {
                    break;
                }
                var field = reader.getFieldNumber();
                switch (field) {
                case 1:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setStatus(value);
                    break;
                default:
                    reader.skipField();
                    break;
                }
            }
            return msg;
        };


        /**
         * Serializes the message to binary data (in protobuf wire format).
         * @return {!Uint8Array}
         */
        proto.stream.HeartbeatAck.prototype.serializeBinary = function () {
            var writer = new jspb.BinaryWriter();
            proto.stream.HeartbeatAck.serializeBinaryToWriter(this, writer);
            return writer.getResultBuffer();
        };


        /**
         * Serializes the given message to binary data (in protobuf wire
         * format), writing to the given BinaryWriter.
         * @param {!proto.stream.HeartbeatAck} message
         * @param {!jspb.BinaryWriter} writer
         * @suppress {unusedLocalVariables} f is only used for nested messages
         */
        proto.stream.HeartbeatAck.serializeBinaryToWriter = function (message, writer) {
            var f = undefined;
            f = message.getStatus();
            if (f !== 0) {
                writer.writeUint32(
                    1,
                    f
                );
            }
        };


        /**
         * optional uint32 status = 1;
         * @return {number}
         */
        proto.stream.HeartbeatAck.prototype.getStatus = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
        };


        /** @param {number} value */
        proto.stream.HeartbeatAck.prototype.setStatus = function (value) {
            jspb.Message.setProto3IntField(this, 1, value);
        };


        /**
         * Generated by JsPbCodeGenerator.
         * @param {Array=} opt_data Optional initial data array, typically from a
         * server response, or constructed directly in Javascript. The array is used
         * in place and becomes part of the constructed object. It is not cloned.
         * If no data is provided, the constructed object will be empty, but still
         * valid.
         * @extends {jspb.Message}
         * @constructor
         */
        proto.stream.Broadcast = function (opt_data) {
            jspb.Message.initialize(this, opt_data, 0, -1, proto.stream.Broadcast.repeatedFields_, null);
        };
        goog.inherits(proto.stream.Broadcast, jspb.Message);
        if (goog.DEBUG && !COMPILED) {
            proto.stream.Broadcast.displayName = "proto.stream.Broadcast";
        }
        /**
         * List of repeated fields within this message type.
         * @private {!Array<number>}
         * @const
         */
        proto.stream.Broadcast.repeatedFields_ = [3];


        if (jspb.Message.GENERATE_TO_OBJECT) {
            /**
             * Creates an object representation of this proto suitable for use in Soy templates.
             * Field names that are reserved in JavaScript and will be renamed to pb_name.
             * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
             * For the list of reserved names please see:
             *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
             * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
             *     for transitional soy proto support: http://goto/soy-param-migration
             * @return {!Object}
             */
            proto.stream.Broadcast.prototype.toObject = function (opt_includeInstance) {
                return proto.stream.Broadcast.toObject(opt_includeInstance, this);
            };


            /**
             * Static version of the {@see toObject} method.
             * @param {boolean|undefined} includeInstance Whether to include the JSPB
             *     instance for transitional soy proto support:
             *     http://goto/soy-param-migration
             * @param {!proto.stream.Broadcast} msg The msg instance to transform.
             * @return {!Object}
             * @suppress {unusedLocalVariables} f is only used for nested messages
             */
            proto.stream.Broadcast.toObject = function (includeInstance, msg) {
                var f, obj = {
                    roomid: jspb.Message.getFieldWithDefault(msg, 1, "0"),
                    flag: jspb.Message.getFieldWithDefault(msg, 2, 0),
                    dstuidsList: jspb.Message.getRepeatedField(msg, 3),
                    cpproto: msg.getCpproto_asB64()
                };

                if (includeInstance) {
                    obj.$jspbMessageInstance = msg;
                }
                return obj;
            };
        }


        /**
         * Deserializes binary data (in protobuf wire format).
         * @param {jspb.ByteSource} bytes The bytes to deserialize.
         * @return {!proto.stream.Broadcast}
         */
        proto.stream.Broadcast.deserializeBinary = function (bytes) {
            var reader = new jspb.BinaryReader(bytes);
            var msg = new proto.stream.Broadcast;
            return proto.stream.Broadcast.deserializeBinaryFromReader(msg, reader);
        };


        /**
         * Deserializes binary data (in protobuf wire format) from the
         * given reader into the given message object.
         * @param {!proto.stream.Broadcast} msg The message object to deserialize into.
         * @param {!jspb.BinaryReader} reader The BinaryReader to use.
         * @return {!proto.stream.Broadcast}
         */
        proto.stream.Broadcast.deserializeBinaryFromReader = function (msg, reader) {
            while (reader.nextField()) {
                if (reader.isEndGroup()) {
                    break;
                }
                var field = reader.getFieldNumber();
                switch (field) {
                case 1:
                    var value = /** @type {string} */ (reader.readUint64String());
                    msg.setRoomid(value);
                    break;
                case 2:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setFlag(value);
                    break;
                case 3:
                    var value = /** @type {!Array.<number>} */ (reader.readPackedUint32());
                    msg.setDstuidsList(value);
                    break;
                case 4:
                    var value = /** @type {!Uint8Array} */ (reader.readBytes());
                    msg.setCpproto(value);
                    break;
                default:
                    reader.skipField();
                    break;
                }
            }
            return msg;
        };


        /**
         * Serializes the message to binary data (in protobuf wire format).
         * @return {!Uint8Array}
         */
        proto.stream.Broadcast.prototype.serializeBinary = function () {
            var writer = new jspb.BinaryWriter();
            proto.stream.Broadcast.serializeBinaryToWriter(this, writer);
            return writer.getResultBuffer();
        };


        /**
         * Serializes the given message to binary data (in protobuf wire
         * format), writing to the given BinaryWriter.
         * @param {!proto.stream.Broadcast} message
         * @param {!jspb.BinaryWriter} writer
         * @suppress {unusedLocalVariables} f is only used for nested messages
         */
        proto.stream.Broadcast.serializeBinaryToWriter = function (message, writer) {
            var f = undefined;
            f = message.getRoomid();
            if (parseInt(f, 10) !== 0) {
                writer.writeUint64String(
                    1,
                    f
                );
            }
            f = message.getFlag();
            if (f !== 0) {
                writer.writeUint32(
                    2,
                    f
                );
            }
            f = message.getDstuidsList();
            if (f.length > 0) {
                writer.writePackedUint32(
                    3,
                    f
                );
            }
            f = message.getCpproto_asU8();
            if (f.length > 0) {
                writer.writeBytes(
                    4,
                    f
                );
            }
        };


        /**
         * optional uint64 roomID = 1;
         * @return {string}
         */
        proto.stream.Broadcast.prototype.getRoomid = function () {
            return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, "0"));
        };


        /** @param {string} value */
        proto.stream.Broadcast.prototype.setRoomid = function (value) {
            jspb.Message.setProto3StringIntField(this, 1, value);
        };


        /**
         * optional uint32 flag = 2;
         * @return {number}
         */
        proto.stream.Broadcast.prototype.getFlag = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
        };


        /** @param {number} value */
        proto.stream.Broadcast.prototype.setFlag = function (value) {
            jspb.Message.setProto3IntField(this, 2, value);
        };


        /**
         * repeated uint32 dstUids = 3;
         * @return {!Array.<number>}
         */
        proto.stream.Broadcast.prototype.getDstuidsList = function () {
            return /** @type {!Array.<number>} */ (jspb.Message.getRepeatedField(this, 3));
        };


        /** @param {!Array.<number>} value */
        proto.stream.Broadcast.prototype.setDstuidsList = function (value) {
            jspb.Message.setField(this, 3, value || []);
        };


        /**
         * @param {!number} value
         * @param {number=} opt_index
         */
        proto.stream.Broadcast.prototype.addDstuids = function (value, opt_index) {
            jspb.Message.addToRepeatedField(this, 3, value, opt_index);
        };


        proto.stream.Broadcast.prototype.clearDstuidsList = function () {
            this.setDstuidsList([]);
        };


        /**
         * optional bytes cpProto = 4;
         * @return {!(string|Uint8Array)}
         */
        proto.stream.Broadcast.prototype.getCpproto = function () {
            return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
        };


        /**
         * optional bytes cpProto = 4;
         * This is a type-conversion wrapper around `getCpproto()`
         * @return {string}
         */
        proto.stream.Broadcast.prototype.getCpproto_asB64 = function () {
            return /** @type {string} */ (jspb.Message.bytesAsB64(
                this.getCpproto()));
        };


        /**
         * optional bytes cpProto = 4;
         * Note that Uint8Array is not supported on all browsers.
         * @see http://caniuse.com/Uint8Array
         * This is a type-conversion wrapper around `getCpproto()`
         * @return {!Uint8Array}
         */
        proto.stream.Broadcast.prototype.getCpproto_asU8 = function () {
            return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
                this.getCpproto()));
        };


        /** @param {!(string|Uint8Array)} value */
        proto.stream.Broadcast.prototype.setCpproto = function (value) {
            jspb.Message.setProto3BytesField(this, 4, value);
        };


        /**
         * Generated by JsPbCodeGenerator.
         * @param {Array=} opt_data Optional initial data array, typically from a
         * server response, or constructed directly in Javascript. The array is used
         * in place and becomes part of the constructed object. It is not cloned.
         * If no data is provided, the constructed object will be empty, but still
         * valid.
         * @extends {jspb.Message}
         * @constructor
         */
        proto.stream.BroadcastAck = function (opt_data) {
            jspb.Message.initialize(this, opt_data, 0, -1, null, null);
        };
        goog.inherits(proto.stream.BroadcastAck, jspb.Message);
        if (goog.DEBUG && !COMPILED) {
            proto.stream.BroadcastAck.displayName = "proto.stream.BroadcastAck";
        }


        if (jspb.Message.GENERATE_TO_OBJECT) {
            /**
             * Creates an object representation of this proto suitable for use in Soy templates.
             * Field names that are reserved in JavaScript and will be renamed to pb_name.
             * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
             * For the list of reserved names please see:
             *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
             * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
             *     for transitional soy proto support: http://goto/soy-param-migration
             * @return {!Object}
             */
            proto.stream.BroadcastAck.prototype.toObject = function (opt_includeInstance) {
                return proto.stream.BroadcastAck.toObject(opt_includeInstance, this);
            };


            /**
             * Static version of the {@see toObject} method.
             * @param {boolean|undefined} includeInstance Whether to include the JSPB
             *     instance for transitional soy proto support:
             *     http://goto/soy-param-migration
             * @param {!proto.stream.BroadcastAck} msg The msg instance to transform.
             * @return {!Object}
             * @suppress {unusedLocalVariables} f is only used for nested messages
             */
            proto.stream.BroadcastAck.toObject = function (includeInstance, msg) {
                var f, obj = {
                    status: jspb.Message.getFieldWithDefault(msg, 1, 0)
                };

                if (includeInstance) {
                    obj.$jspbMessageInstance = msg;
                }
                return obj;
            };
        }


        /**
         * Deserializes binary data (in protobuf wire format).
         * @param {jspb.ByteSource} bytes The bytes to deserialize.
         * @return {!proto.stream.BroadcastAck}
         */
        proto.stream.BroadcastAck.deserializeBinary = function (bytes) {
            var reader = new jspb.BinaryReader(bytes);
            var msg = new proto.stream.BroadcastAck;
            return proto.stream.BroadcastAck.deserializeBinaryFromReader(msg, reader);
        };


        /**
         * Deserializes binary data (in protobuf wire format) from the
         * given reader into the given message object.
         * @param {!proto.stream.BroadcastAck} msg The message object to deserialize into.
         * @param {!jspb.BinaryReader} reader The BinaryReader to use.
         * @return {!proto.stream.BroadcastAck}
         */
        proto.stream.BroadcastAck.deserializeBinaryFromReader = function (msg, reader) {
            while (reader.nextField()) {
                if (reader.isEndGroup()) {
                    break;
                }
                var field = reader.getFieldNumber();
                switch (field) {
                case 1:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setStatus(value);
                    break;
                default:
                    reader.skipField();
                    break;
                }
            }
            return msg;
        };


        /**
         * Serializes the message to binary data (in protobuf wire format).
         * @return {!Uint8Array}
         */
        proto.stream.BroadcastAck.prototype.serializeBinary = function () {
            var writer = new jspb.BinaryWriter();
            proto.stream.BroadcastAck.serializeBinaryToWriter(this, writer);
            return writer.getResultBuffer();
        };


        /**
         * Serializes the given message to binary data (in protobuf wire
         * format), writing to the given BinaryWriter.
         * @param {!proto.stream.BroadcastAck} message
         * @param {!jspb.BinaryWriter} writer
         * @suppress {unusedLocalVariables} f is only used for nested messages
         */
        proto.stream.BroadcastAck.serializeBinaryToWriter = function (message, writer) {
            var f = undefined;
            f = message.getStatus();
            if (f !== 0) {
                writer.writeUint32(
                    1,
                    f
                );
            }
        };


        /**
         * optional uint32 status = 1;
         * @return {number}
         */
        proto.stream.BroadcastAck.prototype.getStatus = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
        };


        /** @param {number} value */
        proto.stream.BroadcastAck.prototype.setStatus = function (value) {
            jspb.Message.setProto3IntField(this, 1, value);
        };


        /**
         * Generated by JsPbCodeGenerator.
         * @param {Array=} opt_data Optional initial data array, typically from a
         * server response, or constructed directly in Javascript. The array is used
         * in place and becomes part of the constructed object. It is not cloned.
         * If no data is provided, the constructed object will be empty, but still
         * valid.
         * @extends {jspb.Message}
         * @constructor
         */
        proto.stream.CheckInNotify = function (opt_data) {
            jspb.Message.initialize(this, opt_data, 0, -1, proto.stream.CheckInNotify.repeatedFields_, null);
        };
        goog.inherits(proto.stream.CheckInNotify, jspb.Message);
        if (goog.DEBUG && !COMPILED) {
            proto.stream.CheckInNotify.displayName = "proto.stream.CheckInNotify";
        }
        /**
         * List of repeated fields within this message type.
         * @private {!Array<number>}
         * @const
         */
        proto.stream.CheckInNotify.repeatedFields_ = [3, 4];


        if (jspb.Message.GENERATE_TO_OBJECT) {
            /**
             * Creates an object representation of this proto suitable for use in Soy templates.
             * Field names that are reserved in JavaScript and will be renamed to pb_name.
             * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
             * For the list of reserved names please see:
             *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
             * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
             *     for transitional soy proto support: http://goto/soy-param-migration
             * @return {!Object}
             */
            proto.stream.CheckInNotify.prototype.toObject = function (opt_includeInstance) {
                return proto.stream.CheckInNotify.toObject(opt_includeInstance, this);
            };


            /**
             * Static version of the {@see toObject} method.
             * @param {boolean|undefined} includeInstance Whether to include the JSPB
             *     instance for transitional soy proto support:
             *     http://goto/soy-param-migration
             * @param {!proto.stream.CheckInNotify} msg The msg instance to transform.
             * @return {!Object}
             * @suppress {unusedLocalVariables} f is only used for nested messages
             */
            proto.stream.CheckInNotify.toObject = function (includeInstance, msg) {
                var f, obj = {
                    userid: jspb.Message.getFieldWithDefault(msg, 1, 0),
                    bookid: jspb.Message.getFieldWithDefault(msg, 2, ""),
                    checkinsList: jspb.Message.getRepeatedField(msg, 3),
                    playersList: jspb.Message.getRepeatedField(msg, 4),
                    maxplayers: jspb.Message.getFieldWithDefault(msg, 5, 0)
                };

                if (includeInstance) {
                    obj.$jspbMessageInstance = msg;
                }
                return obj;
            };
        }


        /**
         * Deserializes binary data (in protobuf wire format).
         * @param {jspb.ByteSource} bytes The bytes to deserialize.
         * @return {!proto.stream.CheckInNotify}
         */
        proto.stream.CheckInNotify.deserializeBinary = function (bytes) {
            var reader = new jspb.BinaryReader(bytes);
            var msg = new proto.stream.CheckInNotify;
            return proto.stream.CheckInNotify.deserializeBinaryFromReader(msg, reader);
        };


        /**
         * Deserializes binary data (in protobuf wire format) from the
         * given reader into the given message object.
         * @param {!proto.stream.CheckInNotify} msg The message object to deserialize into.
         * @param {!jspb.BinaryReader} reader The BinaryReader to use.
         * @return {!proto.stream.CheckInNotify}
         */
        proto.stream.CheckInNotify.deserializeBinaryFromReader = function (msg, reader) {
            while (reader.nextField()) {
                if (reader.isEndGroup()) {
                    break;
                }
                var field = reader.getFieldNumber();
                switch (field) {
                case 1:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setUserid(value);
                    break;
                case 2:
                    var value = /** @type {string} */ (reader.readString());
                    msg.setBookid(value);
                    break;
                case 3:
                    var value = /** @type {!Array.<number>} */ (reader.readPackedUint32());
                    msg.setCheckinsList(value);
                    break;
                case 4:
                    var value = /** @type {!Array.<number>} */ (reader.readPackedUint32());
                    msg.setPlayersList(value);
                    break;
                case 5:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setMaxplayers(value);
                    break;
                default:
                    reader.skipField();
                    break;
                }
            }
            return msg;
        };


        /**
         * Serializes the message to binary data (in protobuf wire format).
         * @return {!Uint8Array}
         */
        proto.stream.CheckInNotify.prototype.serializeBinary = function () {
            var writer = new jspb.BinaryWriter();
            proto.stream.CheckInNotify.serializeBinaryToWriter(this, writer);
            return writer.getResultBuffer();
        };


        /**
         * Serializes the given message to binary data (in protobuf wire
         * format), writing to the given BinaryWriter.
         * @param {!proto.stream.CheckInNotify} message
         * @param {!jspb.BinaryWriter} writer
         * @suppress {unusedLocalVariables} f is only used for nested messages
         */
        proto.stream.CheckInNotify.serializeBinaryToWriter = function (message, writer) {
            var f = undefined;
            f = message.getUserid();
            if (f !== 0) {
                writer.writeUint32(
                    1,
                    f
                );
            }
            f = message.getBookid();
            if (f.length > 0) {
                writer.writeString(
                    2,
                    f
                );
            }
            f = message.getCheckinsList();
            if (f.length > 0) {
                writer.writePackedUint32(
                    3,
                    f
                );
            }
            f = message.getPlayersList();
            if (f.length > 0) {
                writer.writePackedUint32(
                    4,
                    f
                );
            }
            f = message.getMaxplayers();
            if (f !== 0) {
                writer.writeUint32(
                    5,
                    f
                );
            }
        };


        /**
         * optional uint32 userID = 1;
         * @return {number}
         */
        proto.stream.CheckInNotify.prototype.getUserid = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
        };


        /** @param {number} value */
        proto.stream.CheckInNotify.prototype.setUserid = function (value) {
            jspb.Message.setProto3IntField(this, 1, value);
        };


        /**
         * optional string bookID = 2;
         * @return {string}
         */
        proto.stream.CheckInNotify.prototype.getBookid = function () {
            return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
        };


        /** @param {string} value */
        proto.stream.CheckInNotify.prototype.setBookid = function (value) {
            jspb.Message.setProto3StringField(this, 2, value);
        };


        /**
         * repeated uint32 checkins = 3;
         * @return {!Array.<number>}
         */
        proto.stream.CheckInNotify.prototype.getCheckinsList = function () {
            return /** @type {!Array.<number>} */ (jspb.Message.getRepeatedField(this, 3));
        };


        /** @param {!Array.<number>} value */
        proto.stream.CheckInNotify.prototype.setCheckinsList = function (value) {
            jspb.Message.setField(this, 3, value || []);
        };


        /**
         * @param {!number} value
         * @param {number=} opt_index
         */
        proto.stream.CheckInNotify.prototype.addCheckins = function (value, opt_index) {
            jspb.Message.addToRepeatedField(this, 3, value, opt_index);
        };


        proto.stream.CheckInNotify.prototype.clearCheckinsList = function () {
            this.setCheckinsList([]);
        };


        /**
         * repeated uint32 players = 4;
         * @return {!Array.<number>}
         */
        proto.stream.CheckInNotify.prototype.getPlayersList = function () {
            return /** @type {!Array.<number>} */ (jspb.Message.getRepeatedField(this, 4));
        };


        /** @param {!Array.<number>} value */
        proto.stream.CheckInNotify.prototype.setPlayersList = function (value) {
            jspb.Message.setField(this, 4, value || []);
        };


        /**
         * @param {!number} value
         * @param {number=} opt_index
         */
        proto.stream.CheckInNotify.prototype.addPlayers = function (value, opt_index) {
            jspb.Message.addToRepeatedField(this, 4, value, opt_index);
        };


        proto.stream.CheckInNotify.prototype.clearPlayersList = function () {
            this.setPlayersList([]);
        };


        /**
         * optional uint32 maxPlayers = 5;
         * @return {number}
         */
        proto.stream.CheckInNotify.prototype.getMaxplayers = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
        };


        /** @param {number} value */
        proto.stream.CheckInNotify.prototype.setMaxplayers = function (value) {
            jspb.Message.setProto3IntField(this, 5, value);
        };


        /**
         * Generated by JsPbCodeGenerator.
         * @param {Array=} opt_data Optional initial data array, typically from a
         * server response, or constructed directly in Javascript. The array is used
         * in place and becomes part of the constructed object. It is not cloned.
         * If no data is provided, the constructed object will be empty, but still
         * valid.
         * @extends {jspb.Message}
         * @constructor
         */
        proto.stream.Notify = function (opt_data) {
            jspb.Message.initialize(this, opt_data, 0, -1, null, null);
        };
        goog.inherits(proto.stream.Notify, jspb.Message);
        if (goog.DEBUG && !COMPILED) {
            proto.stream.Notify.displayName = "proto.stream.Notify";
        }


        if (jspb.Message.GENERATE_TO_OBJECT) {
            /**
             * Creates an object representation of this proto suitable for use in Soy templates.
             * Field names that are reserved in JavaScript and will be renamed to pb_name.
             * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
             * For the list of reserved names please see:
             *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
             * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
             *     for transitional soy proto support: http://goto/soy-param-migration
             * @return {!Object}
             */
            proto.stream.Notify.prototype.toObject = function (opt_includeInstance) {
                return proto.stream.Notify.toObject(opt_includeInstance, this);
            };


            /**
             * Static version of the {@see toObject} method.
             * @param {boolean|undefined} includeInstance Whether to include the JSPB
             *     instance for transitional soy proto support:
             *     http://goto/soy-param-migration
             * @param {!proto.stream.Notify} msg The msg instance to transform.
             * @return {!Object}
             * @suppress {unusedLocalVariables} f is only used for nested messages
             */
            proto.stream.Notify.toObject = function (includeInstance, msg) {
                var f, obj = {
                    srcuid: jspb.Message.getFieldWithDefault(msg, 1, 0),
                    priority: jspb.Message.getFieldWithDefault(msg, 2, 0),
                    cpproto: msg.getCpproto_asB64()
                };

                if (includeInstance) {
                    obj.$jspbMessageInstance = msg;
                }
                return obj;
            };
        }


        /**
         * Deserializes binary data (in protobuf wire format).
         * @param {jspb.ByteSource} bytes The bytes to deserialize.
         * @return {!proto.stream.Notify}
         */
        proto.stream.Notify.deserializeBinary = function (bytes) {
            var reader = new jspb.BinaryReader(bytes);
            var msg = new proto.stream.Notify;
            return proto.stream.Notify.deserializeBinaryFromReader(msg, reader);
        };


        /**
         * Deserializes binary data (in protobuf wire format) from the
         * given reader into the given message object.
         * @param {!proto.stream.Notify} msg The message object to deserialize into.
         * @param {!jspb.BinaryReader} reader The BinaryReader to use.
         * @return {!proto.stream.Notify}
         */
        proto.stream.Notify.deserializeBinaryFromReader = function (msg, reader) {
            while (reader.nextField()) {
                if (reader.isEndGroup()) {
                    break;
                }
                var field = reader.getFieldNumber();
                switch (field) {
                case 1:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setSrcuid(value);
                    break;
                case 2:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setPriority(value);
                    break;
                case 3:
                    var value = /** @type {!Uint8Array} */ (reader.readBytes());
                    msg.setCpproto(value);
                    break;
                default:
                    reader.skipField();
                    break;
                }
            }
            return msg;
        };


        /**
         * Serializes the message to binary data (in protobuf wire format).
         * @return {!Uint8Array}
         */
        proto.stream.Notify.prototype.serializeBinary = function () {
            var writer = new jspb.BinaryWriter();
            proto.stream.Notify.serializeBinaryToWriter(this, writer);
            return writer.getResultBuffer();
        };


        /**
         * Serializes the given message to binary data (in protobuf wire
         * format), writing to the given BinaryWriter.
         * @param {!proto.stream.Notify} message
         * @param {!jspb.BinaryWriter} writer
         * @suppress {unusedLocalVariables} f is only used for nested messages
         */
        proto.stream.Notify.serializeBinaryToWriter = function (message, writer) {
            var f = undefined;
            f = message.getSrcuid();
            if (f !== 0) {
                writer.writeUint32(
                    1,
                    f
                );
            }
            f = message.getPriority();
            if (f !== 0) {
                writer.writeUint32(
                    2,
                    f
                );
            }
            f = message.getCpproto_asU8();
            if (f.length > 0) {
                writer.writeBytes(
                    3,
                    f
                );
            }
        };


        /**
         * optional uint32 srcUid = 1;
         * @return {number}
         */
        proto.stream.Notify.prototype.getSrcuid = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
        };


        /** @param {number} value */
        proto.stream.Notify.prototype.setSrcuid = function (value) {
            jspb.Message.setProto3IntField(this, 1, value);
        };


        /**
         * optional uint32 priority = 2;
         * @return {number}
         */
        proto.stream.Notify.prototype.getPriority = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
        };


        /** @param {number} value */
        proto.stream.Notify.prototype.setPriority = function (value) {
            jspb.Message.setProto3IntField(this, 2, value);
        };


        /**
         * optional bytes cpProto = 3;
         * @return {!(string|Uint8Array)}
         */
        proto.stream.Notify.prototype.getCpproto = function () {
            return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
        };


        /**
         * optional bytes cpProto = 3;
         * This is a type-conversion wrapper around `getCpproto()`
         * @return {string}
         */
        proto.stream.Notify.prototype.getCpproto_asB64 = function () {
            return /** @type {string} */ (jspb.Message.bytesAsB64(
                this.getCpproto()));
        };


        /**
         * optional bytes cpProto = 3;
         * Note that Uint8Array is not supported on all browsers.
         * @see http://caniuse.com/Uint8Array
         * This is a type-conversion wrapper around `getCpproto()`
         * @return {!Uint8Array}
         */
        proto.stream.Notify.prototype.getCpproto_asU8 = function () {
            return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
                this.getCpproto()));
        };


        /** @param {!(string|Uint8Array)} value */
        proto.stream.Notify.prototype.setCpproto = function (value) {
            jspb.Message.setProto3BytesField(this, 3, value);
        };


        /**
         * Generated by JsPbCodeGenerator.
         * @param {Array=} opt_data Optional initial data array, typically from a
         * server response, or constructed directly in Javascript. The array is used
         * in place and becomes part of the constructed object. It is not cloned.
         * If no data is provided, the constructed object will be empty, but still
         * valid.
         * @extends {jspb.Message}
         * @constructor
         */
        proto.stream.Subscribe = function (opt_data) {
            jspb.Message.initialize(this, opt_data, 0, -1, proto.stream.Subscribe.repeatedFields_, null);
        };
        goog.inherits(proto.stream.Subscribe, jspb.Message);
        if (goog.DEBUG && !COMPILED) {
            proto.stream.Subscribe.displayName = "proto.stream.Subscribe";
        }
        /**
         * List of repeated fields within this message type.
         * @private {!Array<number>}
         * @const
         */
        proto.stream.Subscribe.repeatedFields_ = [3, 4];


        if (jspb.Message.GENERATE_TO_OBJECT) {
            /**
             * Creates an object representation of this proto suitable for use in Soy templates.
             * Field names that are reserved in JavaScript and will be renamed to pb_name.
             * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
             * For the list of reserved names please see:
             *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
             * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
             *     for transitional soy proto support: http://goto/soy-param-migration
             * @return {!Object}
             */
            proto.stream.Subscribe.prototype.toObject = function (opt_includeInstance) {
                return proto.stream.Subscribe.toObject(opt_includeInstance, this);
            };


            /**
             * Static version of the {@see toObject} method.
             * @param {boolean|undefined} includeInstance Whether to include the JSPB
             *     instance for transitional soy proto support:
             *     http://goto/soy-param-migration
             * @param {!proto.stream.Subscribe} msg The msg instance to transform.
             * @return {!Object}
             * @suppress {unusedLocalVariables} f is only used for nested messages
             */
            proto.stream.Subscribe.toObject = function (includeInstance, msg) {
                var f, obj = {
                    gameid: jspb.Message.getFieldWithDefault(msg, 1, 0),
                    roomid: jspb.Message.getFieldWithDefault(msg, 2, "0"),
                    confirmsList: jspb.Message.getRepeatedField(msg, 3),
                    cancelsList: jspb.Message.getRepeatedField(msg, 4)
                };

                if (includeInstance) {
                    obj.$jspbMessageInstance = msg;
                }
                return obj;
            };
        }


        /**
         * Deserializes binary data (in protobuf wire format).
         * @param {jspb.ByteSource} bytes The bytes to deserialize.
         * @return {!proto.stream.Subscribe}
         */
        proto.stream.Subscribe.deserializeBinary = function (bytes) {
            var reader = new jspb.BinaryReader(bytes);
            var msg = new proto.stream.Subscribe;
            return proto.stream.Subscribe.deserializeBinaryFromReader(msg, reader);
        };


        /**
         * Deserializes binary data (in protobuf wire format) from the
         * given reader into the given message object.
         * @param {!proto.stream.Subscribe} msg The message object to deserialize into.
         * @param {!jspb.BinaryReader} reader The BinaryReader to use.
         * @return {!proto.stream.Subscribe}
         */
        proto.stream.Subscribe.deserializeBinaryFromReader = function (msg, reader) {
            while (reader.nextField()) {
                if (reader.isEndGroup()) {
                    break;
                }
                var field = reader.getFieldNumber();
                switch (field) {
                case 1:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setGameid(value);
                    break;
                case 2:
                    var value = /** @type {string} */ (reader.readUint64String());
                    msg.setRoomid(value);
                    break;
                case 3:
                    var value = /** @type {string} */ (reader.readString());
                    msg.addConfirms(value);
                    break;
                case 4:
                    var value = /** @type {string} */ (reader.readString());
                    msg.addCancels(value);
                    break;
                default:
                    reader.skipField();
                    break;
                }
            }
            return msg;
        };


        /**
         * Serializes the message to binary data (in protobuf wire format).
         * @return {!Uint8Array}
         */
        proto.stream.Subscribe.prototype.serializeBinary = function () {
            var writer = new jspb.BinaryWriter();
            proto.stream.Subscribe.serializeBinaryToWriter(this, writer);
            return writer.getResultBuffer();
        };


        /**
         * Serializes the given message to binary data (in protobuf wire
         * format), writing to the given BinaryWriter.
         * @param {!proto.stream.Subscribe} message
         * @param {!jspb.BinaryWriter} writer
         * @suppress {unusedLocalVariables} f is only used for nested messages
         */
        proto.stream.Subscribe.serializeBinaryToWriter = function (message, writer) {
            var f = undefined;
            f = message.getGameid();
            if (f !== 0) {
                writer.writeUint32(
                    1,
                    f
                );
            }
            f = message.getRoomid();
            if (parseInt(f, 10) !== 0) {
                writer.writeUint64String(
                    2,
                    f
                );
            }
            f = message.getConfirmsList();
            if (f.length > 0) {
                writer.writeRepeatedString(
                    3,
                    f
                );
            }
            f = message.getCancelsList();
            if (f.length > 0) {
                writer.writeRepeatedString(
                    4,
                    f
                );
            }
        };


        /**
         * optional uint32 gameID = 1;
         * @return {number}
         */
        proto.stream.Subscribe.prototype.getGameid = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
        };


        /** @param {number} value */
        proto.stream.Subscribe.prototype.setGameid = function (value) {
            jspb.Message.setProto3IntField(this, 1, value);
        };


        /**
         * optional uint64 roomID = 2;
         * @return {string}
         */
        proto.stream.Subscribe.prototype.getRoomid = function () {
            return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, "0"));
        };


        /** @param {string} value */
        proto.stream.Subscribe.prototype.setRoomid = function (value) {
            jspb.Message.setProto3StringIntField(this, 2, value);
        };


        /**
         * repeated string confirms = 3;
         * @return {!Array.<string>}
         */
        proto.stream.Subscribe.prototype.getConfirmsList = function () {
            return /** @type {!Array.<string>} */ (jspb.Message.getRepeatedField(this, 3));
        };


        /** @param {!Array.<string>} value */
        proto.stream.Subscribe.prototype.setConfirmsList = function (value) {
            jspb.Message.setField(this, 3, value || []);
        };


        /**
         * @param {!string} value
         * @param {number=} opt_index
         */
        proto.stream.Subscribe.prototype.addConfirms = function (value, opt_index) {
            jspb.Message.addToRepeatedField(this, 3, value, opt_index);
        };


        proto.stream.Subscribe.prototype.clearConfirmsList = function () {
            this.setConfirmsList([]);
        };


        /**
         * repeated string cancels = 4;
         * @return {!Array.<string>}
         */
        proto.stream.Subscribe.prototype.getCancelsList = function () {
            return /** @type {!Array.<string>} */ (jspb.Message.getRepeatedField(this, 4));
        };


        /** @param {!Array.<string>} value */
        proto.stream.Subscribe.prototype.setCancelsList = function (value) {
            jspb.Message.setField(this, 4, value || []);
        };


        /**
         * @param {!string} value
         * @param {number=} opt_index
         */
        proto.stream.Subscribe.prototype.addCancels = function (value, opt_index) {
            jspb.Message.addToRepeatedField(this, 4, value, opt_index);
        };


        proto.stream.Subscribe.prototype.clearCancelsList = function () {
            this.setCancelsList([]);
        };


        /**
         * Generated by JsPbCodeGenerator.
         * @param {Array=} opt_data Optional initial data array, typically from a
         * server response, or constructed directly in Javascript. The array is used
         * in place and becomes part of the constructed object. It is not cloned.
         * If no data is provided, the constructed object will be empty, but still
         * valid.
         * @extends {jspb.Message}
         * @constructor
         */
        proto.stream.SubscribeAck = function (opt_data) {
            jspb.Message.initialize(this, opt_data, 0, -1, proto.stream.SubscribeAck.repeatedFields_, null);
        };
        goog.inherits(proto.stream.SubscribeAck, jspb.Message);
        if (goog.DEBUG && !COMPILED) {
            proto.stream.SubscribeAck.displayName = "proto.stream.SubscribeAck";
        }
        /**
         * List of repeated fields within this message type.
         * @private {!Array<number>}
         * @const
         */
        proto.stream.SubscribeAck.repeatedFields_ = [2];


        if (jspb.Message.GENERATE_TO_OBJECT) {
            /**
             * Creates an object representation of this proto suitable for use in Soy templates.
             * Field names that are reserved in JavaScript and will be renamed to pb_name.
             * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
             * For the list of reserved names please see:
             *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
             * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
             *     for transitional soy proto support: http://goto/soy-param-migration
             * @return {!Object}
             */
            proto.stream.SubscribeAck.prototype.toObject = function (opt_includeInstance) {
                return proto.stream.SubscribeAck.toObject(opt_includeInstance, this);
            };


            /**
             * Static version of the {@see toObject} method.
             * @param {boolean|undefined} includeInstance Whether to include the JSPB
             *     instance for transitional soy proto support:
             *     http://goto/soy-param-migration
             * @param {!proto.stream.SubscribeAck} msg The msg instance to transform.
             * @return {!Object}
             * @suppress {unusedLocalVariables} f is only used for nested messages
             */
            proto.stream.SubscribeAck.toObject = function (includeInstance, msg) {
                var f, obj = {
                    status: jspb.Message.getFieldWithDefault(msg, 1, 0),
                    groupsList: jspb.Message.getRepeatedField(msg, 2)
                };

                if (includeInstance) {
                    obj.$jspbMessageInstance = msg;
                }
                return obj;
            };
        }


        /**
         * Deserializes binary data (in protobuf wire format).
         * @param {jspb.ByteSource} bytes The bytes to deserialize.
         * @return {!proto.stream.SubscribeAck}
         */
        proto.stream.SubscribeAck.deserializeBinary = function (bytes) {
            var reader = new jspb.BinaryReader(bytes);
            var msg = new proto.stream.SubscribeAck;
            return proto.stream.SubscribeAck.deserializeBinaryFromReader(msg, reader);
        };


        /**
         * Deserializes binary data (in protobuf wire format) from the
         * given reader into the given message object.
         * @param {!proto.stream.SubscribeAck} msg The message object to deserialize into.
         * @param {!jspb.BinaryReader} reader The BinaryReader to use.
         * @return {!proto.stream.SubscribeAck}
         */
        proto.stream.SubscribeAck.deserializeBinaryFromReader = function (msg, reader) {
            while (reader.nextField()) {
                if (reader.isEndGroup()) {
                    break;
                }
                var field = reader.getFieldNumber();
                switch (field) {
                case 1:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setStatus(value);
                    break;
                case 2:
                    var value = /** @type {string} */ (reader.readString());
                    msg.addGroups(value);
                    break;
                default:
                    reader.skipField();
                    break;
                }
            }
            return msg;
        };


        /**
         * Serializes the message to binary data (in protobuf wire format).
         * @return {!Uint8Array}
         */
        proto.stream.SubscribeAck.prototype.serializeBinary = function () {
            var writer = new jspb.BinaryWriter();
            proto.stream.SubscribeAck.serializeBinaryToWriter(this, writer);
            return writer.getResultBuffer();
        };


        /**
         * Serializes the given message to binary data (in protobuf wire
         * format), writing to the given BinaryWriter.
         * @param {!proto.stream.SubscribeAck} message
         * @param {!jspb.BinaryWriter} writer
         * @suppress {unusedLocalVariables} f is only used for nested messages
         */
        proto.stream.SubscribeAck.serializeBinaryToWriter = function (message, writer) {
            var f = undefined;
            f = message.getStatus();
            if (f !== 0) {
                writer.writeUint32(
                    1,
                    f
                );
            }
            f = message.getGroupsList();
            if (f.length > 0) {
                writer.writeRepeatedString(
                    2,
                    f
                );
            }
        };


        /**
         * optional uint32 status = 1;
         * @return {number}
         */
        proto.stream.SubscribeAck.prototype.getStatus = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
        };


        /** @param {number} value */
        proto.stream.SubscribeAck.prototype.setStatus = function (value) {
            jspb.Message.setProto3IntField(this, 1, value);
        };


        /**
         * repeated string groups = 2;
         * @return {!Array.<string>}
         */
        proto.stream.SubscribeAck.prototype.getGroupsList = function () {
            return /** @type {!Array.<string>} */ (jspb.Message.getRepeatedField(this, 2));
        };


        /** @param {!Array.<string>} value */
        proto.stream.SubscribeAck.prototype.setGroupsList = function (value) {
            jspb.Message.setField(this, 2, value || []);
        };


        /**
         * @param {!string} value
         * @param {number=} opt_index
         */
        proto.stream.SubscribeAck.prototype.addGroups = function (value, opt_index) {
            jspb.Message.addToRepeatedField(this, 2, value, opt_index);
        };


        proto.stream.SubscribeAck.prototype.clearGroupsList = function () {
            this.setGroupsList([]);
        };


        /**
         * Generated by JsPbCodeGenerator.
         * @param {Array=} opt_data Optional initial data array, typically from a
         * server response, or constructed directly in Javascript. The array is used
         * in place and becomes part of the constructed object. It is not cloned.
         * If no data is provided, the constructed object will be empty, but still
         * valid.
         * @extends {jspb.Message}
         * @constructor
         */
        proto.stream.Publish = function (opt_data) {
            jspb.Message.initialize(this, opt_data, 0, -1, proto.stream.Publish.repeatedFields_, null);
        };
        goog.inherits(proto.stream.Publish, jspb.Message);
        if (goog.DEBUG && !COMPILED) {
            proto.stream.Publish.displayName = "proto.stream.Publish";
        }
        /**
         * List of repeated fields within this message type.
         * @private {!Array<number>}
         * @const
         */
        proto.stream.Publish.repeatedFields_ = [3];


        if (jspb.Message.GENERATE_TO_OBJECT) {
            /**
             * Creates an object representation of this proto suitable for use in Soy templates.
             * Field names that are reserved in JavaScript and will be renamed to pb_name.
             * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
             * For the list of reserved names please see:
             *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
             * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
             *     for transitional soy proto support: http://goto/soy-param-migration
             * @return {!Object}
             */
            proto.stream.Publish.prototype.toObject = function (opt_includeInstance) {
                return proto.stream.Publish.toObject(opt_includeInstance, this);
            };


            /**
             * Static version of the {@see toObject} method.
             * @param {boolean|undefined} includeInstance Whether to include the JSPB
             *     instance for transitional soy proto support:
             *     http://goto/soy-param-migration
             * @param {!proto.stream.Publish} msg The msg instance to transform.
             * @return {!Object}
             * @suppress {unusedLocalVariables} f is only used for nested messages
             */
            proto.stream.Publish.toObject = function (includeInstance, msg) {
                var f, obj = {
                    roomid: jspb.Message.getFieldWithDefault(msg, 1, "0"),
                    priority: jspb.Message.getFieldWithDefault(msg, 2, 0),
                    groupsList: jspb.Message.getRepeatedField(msg, 3),
                    cpproto: msg.getCpproto_asB64()
                };

                if (includeInstance) {
                    obj.$jspbMessageInstance = msg;
                }
                return obj;
            };
        }


        /**
         * Deserializes binary data (in protobuf wire format).
         * @param {jspb.ByteSource} bytes The bytes to deserialize.
         * @return {!proto.stream.Publish}
         */
        proto.stream.Publish.deserializeBinary = function (bytes) {
            var reader = new jspb.BinaryReader(bytes);
            var msg = new proto.stream.Publish;
            return proto.stream.Publish.deserializeBinaryFromReader(msg, reader);
        };


        /**
         * Deserializes binary data (in protobuf wire format) from the
         * given reader into the given message object.
         * @param {!proto.stream.Publish} msg The message object to deserialize into.
         * @param {!jspb.BinaryReader} reader The BinaryReader to use.
         * @return {!proto.stream.Publish}
         */
        proto.stream.Publish.deserializeBinaryFromReader = function (msg, reader) {
            while (reader.nextField()) {
                if (reader.isEndGroup()) {
                    break;
                }
                var field = reader.getFieldNumber();
                switch (field) {
                case 1:
                    var value = /** @type {string} */ (reader.readUint64String());
                    msg.setRoomid(value);
                    break;
                case 2:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setPriority(value);
                    break;
                case 3:
                    var value = /** @type {string} */ (reader.readString());
                    msg.addGroups(value);
                    break;
                case 4:
                    var value = /** @type {!Uint8Array} */ (reader.readBytes());
                    msg.setCpproto(value);
                    break;
                default:
                    reader.skipField();
                    break;
                }
            }
            return msg;
        };


        /**
         * Serializes the message to binary data (in protobuf wire format).
         * @return {!Uint8Array}
         */
        proto.stream.Publish.prototype.serializeBinary = function () {
            var writer = new jspb.BinaryWriter();
            proto.stream.Publish.serializeBinaryToWriter(this, writer);
            return writer.getResultBuffer();
        };


        /**
         * Serializes the given message to binary data (in protobuf wire
         * format), writing to the given BinaryWriter.
         * @param {!proto.stream.Publish} message
         * @param {!jspb.BinaryWriter} writer
         * @suppress {unusedLocalVariables} f is only used for nested messages
         */
        proto.stream.Publish.serializeBinaryToWriter = function (message, writer) {
            var f = undefined;
            f = message.getRoomid();
            if (parseInt(f, 10) !== 0) {
                writer.writeUint64String(
                    1,
                    f
                );
            }
            f = message.getPriority();
            if (f !== 0) {
                writer.writeUint32(
                    2,
                    f
                );
            }
            f = message.getGroupsList();
            if (f.length > 0) {
                writer.writeRepeatedString(
                    3,
                    f
                );
            }
            f = message.getCpproto_asU8();
            if (f.length > 0) {
                writer.writeBytes(
                    4,
                    f
                );
            }
        };


        /**
         * optional uint64 roomID = 1;
         * @return {string}
         */
        proto.stream.Publish.prototype.getRoomid = function () {
            return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, "0"));
        };


        /** @param {string} value */
        proto.stream.Publish.prototype.setRoomid = function (value) {
            jspb.Message.setProto3StringIntField(this, 1, value);
        };


        /**
         * optional uint32 priority = 2;
         * @return {number}
         */
        proto.stream.Publish.prototype.getPriority = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
        };


        /** @param {number} value */
        proto.stream.Publish.prototype.setPriority = function (value) {
            jspb.Message.setProto3IntField(this, 2, value);
        };


        /**
         * repeated string groups = 3;
         * @return {!Array.<string>}
         */
        proto.stream.Publish.prototype.getGroupsList = function () {
            return /** @type {!Array.<string>} */ (jspb.Message.getRepeatedField(this, 3));
        };


        /** @param {!Array.<string>} value */
        proto.stream.Publish.prototype.setGroupsList = function (value) {
            jspb.Message.setField(this, 3, value || []);
        };


        /**
         * @param {!string} value
         * @param {number=} opt_index
         */
        proto.stream.Publish.prototype.addGroups = function (value, opt_index) {
            jspb.Message.addToRepeatedField(this, 3, value, opt_index);
        };


        proto.stream.Publish.prototype.clearGroupsList = function () {
            this.setGroupsList([]);
        };


        /**
         * optional bytes cpProto = 4;
         * @return {!(string|Uint8Array)}
         */
        proto.stream.Publish.prototype.getCpproto = function () {
            return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
        };


        /**
         * optional bytes cpProto = 4;
         * This is a type-conversion wrapper around `getCpproto()`
         * @return {string}
         */
        proto.stream.Publish.prototype.getCpproto_asB64 = function () {
            return /** @type {string} */ (jspb.Message.bytesAsB64(
                this.getCpproto()));
        };


        /**
         * optional bytes cpProto = 4;
         * Note that Uint8Array is not supported on all browsers.
         * @see http://caniuse.com/Uint8Array
         * This is a type-conversion wrapper around `getCpproto()`
         * @return {!Uint8Array}
         */
        proto.stream.Publish.prototype.getCpproto_asU8 = function () {
            return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
                this.getCpproto()));
        };


        /** @param {!(string|Uint8Array)} value */
        proto.stream.Publish.prototype.setCpproto = function (value) {
            jspb.Message.setProto3BytesField(this, 4, value);
        };


        /**
         * Generated by JsPbCodeGenerator.
         * @param {Array=} opt_data Optional initial data array, typically from a
         * server response, or constructed directly in Javascript. The array is used
         * in place and becomes part of the constructed object. It is not cloned.
         * If no data is provided, the constructed object will be empty, but still
         * valid.
         * @extends {jspb.Message}
         * @constructor
         */
        proto.stream.PublishAck = function (opt_data) {
            jspb.Message.initialize(this, opt_data, 0, -1, null, null);
        };
        goog.inherits(proto.stream.PublishAck, jspb.Message);
        if (goog.DEBUG && !COMPILED) {
            proto.stream.PublishAck.displayName = "proto.stream.PublishAck";
        }


        if (jspb.Message.GENERATE_TO_OBJECT) {
            /**
             * Creates an object representation of this proto suitable for use in Soy templates.
             * Field names that are reserved in JavaScript and will be renamed to pb_name.
             * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
             * For the list of reserved names please see:
             *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
             * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
             *     for transitional soy proto support: http://goto/soy-param-migration
             * @return {!Object}
             */
            proto.stream.PublishAck.prototype.toObject = function (opt_includeInstance) {
                return proto.stream.PublishAck.toObject(opt_includeInstance, this);
            };


            /**
             * Static version of the {@see toObject} method.
             * @param {boolean|undefined} includeInstance Whether to include the JSPB
             *     instance for transitional soy proto support:
             *     http://goto/soy-param-migration
             * @param {!proto.stream.PublishAck} msg The msg instance to transform.
             * @return {!Object}
             * @suppress {unusedLocalVariables} f is only used for nested messages
             */
            proto.stream.PublishAck.toObject = function (includeInstance, msg) {
                var f, obj = {
                    status: jspb.Message.getFieldWithDefault(msg, 1, 0),
                    dstnum: jspb.Message.getFieldWithDefault(msg, 2, 0)
                };

                if (includeInstance) {
                    obj.$jspbMessageInstance = msg;
                }
                return obj;
            };
        }


        /**
         * Deserializes binary data (in protobuf wire format).
         * @param {jspb.ByteSource} bytes The bytes to deserialize.
         * @return {!proto.stream.PublishAck}
         */
        proto.stream.PublishAck.deserializeBinary = function (bytes) {
            var reader = new jspb.BinaryReader(bytes);
            var msg = new proto.stream.PublishAck;
            return proto.stream.PublishAck.deserializeBinaryFromReader(msg, reader);
        };


        /**
         * Deserializes binary data (in protobuf wire format) from the
         * given reader into the given message object.
         * @param {!proto.stream.PublishAck} msg The message object to deserialize into.
         * @param {!jspb.BinaryReader} reader The BinaryReader to use.
         * @return {!proto.stream.PublishAck}
         */
        proto.stream.PublishAck.deserializeBinaryFromReader = function (msg, reader) {
            while (reader.nextField()) {
                if (reader.isEndGroup()) {
                    break;
                }
                var field = reader.getFieldNumber();
                switch (field) {
                case 1:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setStatus(value);
                    break;
                case 2:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setDstnum(value);
                    break;
                default:
                    reader.skipField();
                    break;
                }
            }
            return msg;
        };


        /**
         * Serializes the message to binary data (in protobuf wire format).
         * @return {!Uint8Array}
         */
        proto.stream.PublishAck.prototype.serializeBinary = function () {
            var writer = new jspb.BinaryWriter();
            proto.stream.PublishAck.serializeBinaryToWriter(this, writer);
            return writer.getResultBuffer();
        };


        /**
         * Serializes the given message to binary data (in protobuf wire
         * format), writing to the given BinaryWriter.
         * @param {!proto.stream.PublishAck} message
         * @param {!jspb.BinaryWriter} writer
         * @suppress {unusedLocalVariables} f is only used for nested messages
         */
        proto.stream.PublishAck.serializeBinaryToWriter = function (message, writer) {
            var f = undefined;
            f = message.getStatus();
            if (f !== 0) {
                writer.writeUint32(
                    1,
                    f
                );
            }
            f = message.getDstnum();
            if (f !== 0) {
                writer.writeUint32(
                    2,
                    f
                );
            }
        };


        /**
         * optional uint32 status = 1;
         * @return {number}
         */
        proto.stream.PublishAck.prototype.getStatus = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
        };


        /** @param {number} value */
        proto.stream.PublishAck.prototype.setStatus = function (value) {
            jspb.Message.setProto3IntField(this, 1, value);
        };


        /**
         * optional uint32 dstNum = 2;
         * @return {number}
         */
        proto.stream.PublishAck.prototype.getDstnum = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
        };


        /** @param {number} value */
        proto.stream.PublishAck.prototype.setDstnum = function (value) {
            jspb.Message.setProto3IntField(this, 2, value);
        };


        /**
         * Generated by JsPbCodeGenerator.
         * @param {Array=} opt_data Optional initial data array, typically from a
         * server response, or constructed directly in Javascript. The array is used
         * in place and becomes part of the constructed object. It is not cloned.
         * If no data is provided, the constructed object will be empty, but still
         * valid.
         * @extends {jspb.Message}
         * @constructor
         */
        proto.stream.PublishNotify = function (opt_data) {
            jspb.Message.initialize(this, opt_data, 0, -1, proto.stream.PublishNotify.repeatedFields_, null);
        };
        goog.inherits(proto.stream.PublishNotify, jspb.Message);
        if (goog.DEBUG && !COMPILED) {
            proto.stream.PublishNotify.displayName = "proto.stream.PublishNotify";
        }
        /**
         * List of repeated fields within this message type.
         * @private {!Array<number>}
         * @const
         */
        proto.stream.PublishNotify.repeatedFields_ = [3];


        if (jspb.Message.GENERATE_TO_OBJECT) {
            /**
             * Creates an object representation of this proto suitable for use in Soy templates.
             * Field names that are reserved in JavaScript and will be renamed to pb_name.
             * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
             * For the list of reserved names please see:
             *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
             * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
             *     for transitional soy proto support: http://goto/soy-param-migration
             * @return {!Object}
             */
            proto.stream.PublishNotify.prototype.toObject = function (opt_includeInstance) {
                return proto.stream.PublishNotify.toObject(opt_includeInstance, this);
            };


            /**
             * Static version of the {@see toObject} method.
             * @param {boolean|undefined} includeInstance Whether to include the JSPB
             *     instance for transitional soy proto support:
             *     http://goto/soy-param-migration
             * @param {!proto.stream.PublishNotify} msg The msg instance to transform.
             * @return {!Object}
             * @suppress {unusedLocalVariables} f is only used for nested messages
             */
            proto.stream.PublishNotify.toObject = function (includeInstance, msg) {
                var f, obj = {
                    srcuid: jspb.Message.getFieldWithDefault(msg, 1, 0),
                    priority: jspb.Message.getFieldWithDefault(msg, 2, 0),
                    groupsList: jspb.Message.getRepeatedField(msg, 3),
                    cpproto: msg.getCpproto_asB64()
                };

                if (includeInstance) {
                    obj.$jspbMessageInstance = msg;
                }
                return obj;
            };
        }


        /**
         * Deserializes binary data (in protobuf wire format).
         * @param {jspb.ByteSource} bytes The bytes to deserialize.
         * @return {!proto.stream.PublishNotify}
         */
        proto.stream.PublishNotify.deserializeBinary = function (bytes) {
            var reader = new jspb.BinaryReader(bytes);
            var msg = new proto.stream.PublishNotify;
            return proto.stream.PublishNotify.deserializeBinaryFromReader(msg, reader);
        };


        /**
         * Deserializes binary data (in protobuf wire format) from the
         * given reader into the given message object.
         * @param {!proto.stream.PublishNotify} msg The message object to deserialize into.
         * @param {!jspb.BinaryReader} reader The BinaryReader to use.
         * @return {!proto.stream.PublishNotify}
         */
        proto.stream.PublishNotify.deserializeBinaryFromReader = function (msg, reader) {
            while (reader.nextField()) {
                if (reader.isEndGroup()) {
                    break;
                }
                var field = reader.getFieldNumber();
                switch (field) {
                case 1:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setSrcuid(value);
                    break;
                case 2:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setPriority(value);
                    break;
                case 3:
                    var value = /** @type {string} */ (reader.readString());
                    msg.addGroups(value);
                    break;
                case 4:
                    var value = /** @type {!Uint8Array} */ (reader.readBytes());
                    msg.setCpproto(value);
                    break;
                default:
                    reader.skipField();
                    break;
                }
            }
            return msg;
        };


        /**
         * Serializes the message to binary data (in protobuf wire format).
         * @return {!Uint8Array}
         */
        proto.stream.PublishNotify.prototype.serializeBinary = function () {
            var writer = new jspb.BinaryWriter();
            proto.stream.PublishNotify.serializeBinaryToWriter(this, writer);
            return writer.getResultBuffer();
        };


        /**
         * Serializes the given message to binary data (in protobuf wire
         * format), writing to the given BinaryWriter.
         * @param {!proto.stream.PublishNotify} message
         * @param {!jspb.BinaryWriter} writer
         * @suppress {unusedLocalVariables} f is only used for nested messages
         */
        proto.stream.PublishNotify.serializeBinaryToWriter = function (message, writer) {
            var f = undefined;
            f = message.getSrcuid();
            if (f !== 0) {
                writer.writeUint32(
                    1,
                    f
                );
            }
            f = message.getPriority();
            if (f !== 0) {
                writer.writeUint32(
                    2,
                    f
                );
            }
            f = message.getGroupsList();
            if (f.length > 0) {
                writer.writeRepeatedString(
                    3,
                    f
                );
            }
            f = message.getCpproto_asU8();
            if (f.length > 0) {
                writer.writeBytes(
                    4,
                    f
                );
            }
        };


        /**
         * optional uint32 srcUid = 1;
         * @return {number}
         */
        proto.stream.PublishNotify.prototype.getSrcuid = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
        };


        /** @param {number} value */
        proto.stream.PublishNotify.prototype.setSrcuid = function (value) {
            jspb.Message.setProto3IntField(this, 1, value);
        };


        /**
         * optional uint32 priority = 2;
         * @return {number}
         */
        proto.stream.PublishNotify.prototype.getPriority = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
        };


        /** @param {number} value */
        proto.stream.PublishNotify.prototype.setPriority = function (value) {
            jspb.Message.setProto3IntField(this, 2, value);
        };


        /**
         * repeated string groups = 3;
         * @return {!Array.<string>}
         */
        proto.stream.PublishNotify.prototype.getGroupsList = function () {
            return /** @type {!Array.<string>} */ (jspb.Message.getRepeatedField(this, 3));
        };


        /** @param {!Array.<string>} value */
        proto.stream.PublishNotify.prototype.setGroupsList = function (value) {
            jspb.Message.setField(this, 3, value || []);
        };


        /**
         * @param {!string} value
         * @param {number=} opt_index
         */
        proto.stream.PublishNotify.prototype.addGroups = function (value, opt_index) {
            jspb.Message.addToRepeatedField(this, 3, value, opt_index);
        };


        proto.stream.PublishNotify.prototype.clearGroupsList = function () {
            this.setGroupsList([]);
        };


        /**
         * optional bytes cpProto = 4;
         * @return {!(string|Uint8Array)}
         */
        proto.stream.PublishNotify.prototype.getCpproto = function () {
            return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
        };


        /**
         * optional bytes cpProto = 4;
         * This is a type-conversion wrapper around `getCpproto()`
         * @return {string}
         */
        proto.stream.PublishNotify.prototype.getCpproto_asB64 = function () {
            return /** @type {string} */ (jspb.Message.bytesAsB64(
                this.getCpproto()));
        };


        /**
         * optional bytes cpProto = 4;
         * Note that Uint8Array is not supported on all browsers.
         * @see http://caniuse.com/Uint8Array
         * This is a type-conversion wrapper around `getCpproto()`
         * @return {!Uint8Array}
         */
        proto.stream.PublishNotify.prototype.getCpproto_asU8 = function () {
            return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
                this.getCpproto()));
        };


        /** @param {!(string|Uint8Array)} value */
        proto.stream.PublishNotify.prototype.setCpproto = function (value) {
            jspb.Message.setProto3BytesField(this, 4, value);
        };


        /**
         * Generated by JsPbCodeGenerator.
         * @param {Array=} opt_data Optional initial data array, typically from a
         * server response, or constructed directly in Javascript. The array is used
         * in place and becomes part of the constructed object. It is not cloned.
         * If no data is provided, the constructed object will be empty, but still
         * valid.
         * @extends {jspb.Message}
         * @constructor
         */
        proto.stream.SetUseTimeStamp = function (opt_data) {
            jspb.Message.initialize(this, opt_data, 0, -1, null, null);
        };
        goog.inherits(proto.stream.SetUseTimeStamp, jspb.Message);
        if (goog.DEBUG && !COMPILED) {
            proto.stream.SetUseTimeStamp.displayName = "proto.stream.SetUseTimeStamp";
        }


        if (jspb.Message.GENERATE_TO_OBJECT) {
            /**
             * Creates an object representation of this proto suitable for use in Soy templates.
             * Field names that are reserved in JavaScript and will be renamed to pb_name.
             * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
             * For the list of reserved names please see:
             *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
             * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
             *     for transitional soy proto support: http://goto/soy-param-migration
             * @return {!Object}
             */
            proto.stream.SetUseTimeStamp.prototype.toObject = function (opt_includeInstance) {
                return proto.stream.SetUseTimeStamp.toObject(opt_includeInstance, this);
            };


            /**
             * Static version of the {@see toObject} method.
             * @param {boolean|undefined} includeInstance Whether to include the JSPB
             *     instance for transitional soy proto support:
             *     http://goto/soy-param-migration
             * @param {!proto.stream.SetUseTimeStamp} msg The msg instance to transform.
             * @return {!Object}
             * @suppress {unusedLocalVariables} f is only used for nested messages
             */
            proto.stream.SetUseTimeStamp.toObject = function (includeInstance, msg) {
                var f, obj = {
                    gameid: jspb.Message.getFieldWithDefault(msg, 1, 0),
                    roomid: jspb.Message.getFieldWithDefault(msg, 2, "0"),
                    priority: jspb.Message.getFieldWithDefault(msg, 3, 0),
                    usetimestamp: jspb.Message.getFieldWithDefault(msg, 4, false)
                };

                if (includeInstance) {
                    obj.$jspbMessageInstance = msg;
                }
                return obj;
            };
        }


        /**
         * Deserializes binary data (in protobuf wire format).
         * @param {jspb.ByteSource} bytes The bytes to deserialize.
         * @return {!proto.stream.SetUseTimeStamp}
         */
        proto.stream.SetUseTimeStamp.deserializeBinary = function (bytes) {
            var reader = new jspb.BinaryReader(bytes);
            var msg = new proto.stream.SetUseTimeStamp;
            return proto.stream.SetUseTimeStamp.deserializeBinaryFromReader(msg, reader);
        };


        /**
         * Deserializes binary data (in protobuf wire format) from the
         * given reader into the given message object.
         * @param {!proto.stream.SetUseTimeStamp} msg The message object to deserialize into.
         * @param {!jspb.BinaryReader} reader The BinaryReader to use.
         * @return {!proto.stream.SetUseTimeStamp}
         */
        proto.stream.SetUseTimeStamp.deserializeBinaryFromReader = function (msg, reader) {
            while (reader.nextField()) {
                if (reader.isEndGroup()) {
                    break;
                }
                var field = reader.getFieldNumber();
                switch (field) {
                case 1:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setGameid(value);
                    break;
                case 2:
                    var value = /** @type {string} */ (reader.readUint64String());
                    msg.setRoomid(value);
                    break;
                case 3:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setPriority(value);
                    break;
                case 4:
                    var value = /** @type {boolean} */ (reader.readBool());
                    msg.setUsetimestamp(value);
                    break;
                default:
                    reader.skipField();
                    break;
                }
            }
            return msg;
        };


        /**
         * Serializes the message to binary data (in protobuf wire format).
         * @return {!Uint8Array}
         */
        proto.stream.SetUseTimeStamp.prototype.serializeBinary = function () {
            var writer = new jspb.BinaryWriter();
            proto.stream.SetUseTimeStamp.serializeBinaryToWriter(this, writer);
            return writer.getResultBuffer();
        };


        /**
         * Serializes the given message to binary data (in protobuf wire
         * format), writing to the given BinaryWriter.
         * @param {!proto.stream.SetUseTimeStamp} message
         * @param {!jspb.BinaryWriter} writer
         * @suppress {unusedLocalVariables} f is only used for nested messages
         */
        proto.stream.SetUseTimeStamp.serializeBinaryToWriter = function (message, writer) {
            var f = undefined;
            f = message.getGameid();
            if (f !== 0) {
                writer.writeUint32(
                    1,
                    f
                );
            }
            f = message.getRoomid();
            if (parseInt(f, 10) !== 0) {
                writer.writeUint64String(
                    2,
                    f
                );
            }
            f = message.getPriority();
            if (f !== 0) {
                writer.writeUint32(
                    3,
                    f
                );
            }
            f = message.getUsetimestamp();
            if (f) {
                writer.writeBool(
                    4,
                    f
                );
            }
        };


        /**
         * optional uint32 gameID = 1;
         * @return {number}
         */
        proto.stream.SetUseTimeStamp.prototype.getGameid = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
        };


        /** @param {number} value */
        proto.stream.SetUseTimeStamp.prototype.setGameid = function (value) {
            jspb.Message.setProto3IntField(this, 1, value);
        };


        /**
         * optional uint64 roomID = 2;
         * @return {string}
         */
        proto.stream.SetUseTimeStamp.prototype.getRoomid = function () {
            return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, "0"));
        };


        /** @param {string} value */
        proto.stream.SetUseTimeStamp.prototype.setRoomid = function (value) {
            jspb.Message.setProto3StringIntField(this, 2, value);
        };


        /**
         * optional uint32 priority = 3;
         * @return {number}
         */
        proto.stream.SetUseTimeStamp.prototype.getPriority = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
        };


        /** @param {number} value */
        proto.stream.SetUseTimeStamp.prototype.setPriority = function (value) {
            jspb.Message.setProto3IntField(this, 3, value);
        };


        /**
         * optional bool useTimeStamp = 4;
         * Note that Boolean fields may be set to 0/1 when serialized from a Java server.
         * You should avoid comparisons like {@code val === true/false} in those cases.
         * @return {boolean}
         */
        proto.stream.SetUseTimeStamp.prototype.getUsetimestamp = function () {
            return /** @type {boolean} */ (jspb.Message.getFieldWithDefault(this, 4, false));
        };


        /** @param {boolean} value */
        proto.stream.SetUseTimeStamp.prototype.setUsetimestamp = function (value) {
            jspb.Message.setProto3BooleanField(this, 4, value);
        };


        /**
         * Generated by JsPbCodeGenerator.
         * @param {Array=} opt_data Optional initial data array, typically from a
         * server response, or constructed directly in Javascript. The array is used
         * in place and becomes part of the constructed object. It is not cloned.
         * If no data is provided, the constructed object will be empty, but still
         * valid.
         * @extends {jspb.Message}
         * @constructor
         */
        proto.stream.SetUseTimeStampAck = function (opt_data) {
            jspb.Message.initialize(this, opt_data, 0, -1, null, null);
        };
        goog.inherits(proto.stream.SetUseTimeStampAck, jspb.Message);
        if (goog.DEBUG && !COMPILED) {
            proto.stream.SetUseTimeStampAck.displayName = "proto.stream.SetUseTimeStampAck";
        }


        if (jspb.Message.GENERATE_TO_OBJECT) {
            /**
             * Creates an object representation of this proto suitable for use in Soy templates.
             * Field names that are reserved in JavaScript and will be renamed to pb_name.
             * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
             * For the list of reserved names please see:
             *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
             * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
             *     for transitional soy proto support: http://goto/soy-param-migration
             * @return {!Object}
             */
            proto.stream.SetUseTimeStampAck.prototype.toObject = function (opt_includeInstance) {
                return proto.stream.SetUseTimeStampAck.toObject(opt_includeInstance, this);
            };


            /**
             * Static version of the {@see toObject} method.
             * @param {boolean|undefined} includeInstance Whether to include the JSPB
             *     instance for transitional soy proto support:
             *     http://goto/soy-param-migration
             * @param {!proto.stream.SetUseTimeStampAck} msg The msg instance to transform.
             * @return {!Object}
             * @suppress {unusedLocalVariables} f is only used for nested messages
             */
            proto.stream.SetUseTimeStampAck.toObject = function (includeInstance, msg) {
                var f, obj = {
                    status: jspb.Message.getFieldWithDefault(msg, 1, 0),
                    timestamp: jspb.Message.getFieldWithDefault(msg, 2, 0)
                };

                if (includeInstance) {
                    obj.$jspbMessageInstance = msg;
                }
                return obj;
            };
        }


        /**
         * Deserializes binary data (in protobuf wire format).
         * @param {jspb.ByteSource} bytes The bytes to deserialize.
         * @return {!proto.stream.SetUseTimeStampAck}
         */
        proto.stream.SetUseTimeStampAck.deserializeBinary = function (bytes) {
            var reader = new jspb.BinaryReader(bytes);
            var msg = new proto.stream.SetUseTimeStampAck;
            return proto.stream.SetUseTimeStampAck.deserializeBinaryFromReader(msg, reader);
        };


        /**
         * Deserializes binary data (in protobuf wire format) from the
         * given reader into the given message object.
         * @param {!proto.stream.SetUseTimeStampAck} msg The message object to deserialize into.
         * @param {!jspb.BinaryReader} reader The BinaryReader to use.
         * @return {!proto.stream.SetUseTimeStampAck}
         */
        proto.stream.SetUseTimeStampAck.deserializeBinaryFromReader = function (msg, reader) {
            while (reader.nextField()) {
                if (reader.isEndGroup()) {
                    break;
                }
                var field = reader.getFieldNumber();
                switch (field) {
                case 1:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setStatus(value);
                    break;
                case 2:
                    var value = /** @type {number} */ (reader.readUint64());
                    msg.setTimestamp(value);
                    break;
                default:
                    reader.skipField();
                    break;
                }
            }
            return msg;
        };


        /**
         * Serializes the message to binary data (in protobuf wire format).
         * @return {!Uint8Array}
         */
        proto.stream.SetUseTimeStampAck.prototype.serializeBinary = function () {
            var writer = new jspb.BinaryWriter();
            proto.stream.SetUseTimeStampAck.serializeBinaryToWriter(this, writer);
            return writer.getResultBuffer();
        };


        /**
         * Serializes the given message to binary data (in protobuf wire
         * format), writing to the given BinaryWriter.
         * @param {!proto.stream.SetUseTimeStampAck} message
         * @param {!jspb.BinaryWriter} writer
         * @suppress {unusedLocalVariables} f is only used for nested messages
         */
        proto.stream.SetUseTimeStampAck.serializeBinaryToWriter = function (message, writer) {
            var f = undefined;
            f = message.getStatus();
            if (f !== 0) {
                writer.writeUint32(
                    1,
                    f
                );
            }
            f = message.getTimestamp();
            if (f !== 0) {
                writer.writeUint64(
                    2,
                    f
                );
            }
        };


        /**
         * optional uint32 status = 1;
         * @return {number}
         */
        proto.stream.SetUseTimeStampAck.prototype.getStatus = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
        };


        /** @param {number} value */
        proto.stream.SetUseTimeStampAck.prototype.setStatus = function (value) {
            jspb.Message.setProto3IntField(this, 1, value);
        };


        /**
         * optional uint64 timeStamp = 2;
         * @return {number}
         */
        proto.stream.SetUseTimeStampAck.prototype.getTimestamp = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
        };


        /** @param {number} value */
        proto.stream.SetUseTimeStampAck.prototype.setTimestamp = function (value) {
            jspb.Message.setProto3IntField(this, 2, value);
        };


        /**
         * Generated by JsPbCodeGenerator.
         * @param {Array=} opt_data Optional initial data array, typically from a
         * server response, or constructed directly in Javascript. The array is used
         * in place and becomes part of the constructed object. It is not cloned.
         * If no data is provided, the constructed object will be empty, but still
         * valid.
         * @extends {jspb.Message}
         * @constructor
         */
        proto.stream.SetFrameSyncRate = function (opt_data) {
            jspb.Message.initialize(this, opt_data, 0, -1, null, null);
        };
        goog.inherits(proto.stream.SetFrameSyncRate, jspb.Message);
        if (goog.DEBUG && !COMPILED) {
            proto.stream.SetFrameSyncRate.displayName = "proto.stream.SetFrameSyncRate";
        }


        if (jspb.Message.GENERATE_TO_OBJECT) {
            /**
             * Creates an object representation of this proto suitable for use in Soy templates.
             * Field names that are reserved in JavaScript and will be renamed to pb_name.
             * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
             * For the list of reserved names please see:
             *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
             * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
             *     for transitional soy proto support: http://goto/soy-param-migration
             * @return {!Object}
             */
            proto.stream.SetFrameSyncRate.prototype.toObject = function (opt_includeInstance) {
                return proto.stream.SetFrameSyncRate.toObject(opt_includeInstance, this);
            };


            /**
             * Static version of the {@see toObject} method.
             * @param {boolean|undefined} includeInstance Whether to include the JSPB
             *     instance for transitional soy proto support:
             *     http://goto/soy-param-migration
             * @param {!proto.stream.SetFrameSyncRate} msg The msg instance to transform.
             * @return {!Object}
             * @suppress {unusedLocalVariables} f is only used for nested messages
             */
            proto.stream.SetFrameSyncRate.toObject = function (includeInstance, msg) {
                var f, obj = {
                    gameid: jspb.Message.getFieldWithDefault(msg, 1, 0),
                    roomid: jspb.Message.getFieldWithDefault(msg, 2, "0"),
                    priority: jspb.Message.getFieldWithDefault(msg, 3, 0),
                    framerate: jspb.Message.getFieldWithDefault(msg, 4, 0),
                    frameidx: jspb.Message.getFieldWithDefault(msg, 5, 0)
                };

                if (includeInstance) {
                    obj.$jspbMessageInstance = msg;
                }
                return obj;
            };
        }


        /**
         * Deserializes binary data (in protobuf wire format).
         * @param {jspb.ByteSource} bytes The bytes to deserialize.
         * @return {!proto.stream.SetFrameSyncRate}
         */
        proto.stream.SetFrameSyncRate.deserializeBinary = function (bytes) {
            var reader = new jspb.BinaryReader(bytes);
            var msg = new proto.stream.SetFrameSyncRate;
            return proto.stream.SetFrameSyncRate.deserializeBinaryFromReader(msg, reader);
        };


        /**
         * Deserializes binary data (in protobuf wire format) from the
         * given reader into the given message object.
         * @param {!proto.stream.SetFrameSyncRate} msg The message object to deserialize into.
         * @param {!jspb.BinaryReader} reader The BinaryReader to use.
         * @return {!proto.stream.SetFrameSyncRate}
         */
        proto.stream.SetFrameSyncRate.deserializeBinaryFromReader = function (msg, reader) {
            while (reader.nextField()) {
                if (reader.isEndGroup()) {
                    break;
                }
                var field = reader.getFieldNumber();
                switch (field) {
                case 1:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setGameid(value);
                    break;
                case 2:
                    var value = /** @type {string} */ (reader.readUint64String());
                    msg.setRoomid(value);
                    break;
                case 3:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setPriority(value);
                    break;
                case 4:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setFramerate(value);
                    break;
                case 5:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setFrameidx(value);
                    break;
                default:
                    reader.skipField();
                    break;
                }
            }
            return msg;
        };


        /**
         * Serializes the message to binary data (in protobuf wire format).
         * @return {!Uint8Array}
         */
        proto.stream.SetFrameSyncRate.prototype.serializeBinary = function () {
            var writer = new jspb.BinaryWriter();
            proto.stream.SetFrameSyncRate.serializeBinaryToWriter(this, writer);
            return writer.getResultBuffer();
        };


        /**
         * Serializes the given message to binary data (in protobuf wire
         * format), writing to the given BinaryWriter.
         * @param {!proto.stream.SetFrameSyncRate} message
         * @param {!jspb.BinaryWriter} writer
         * @suppress {unusedLocalVariables} f is only used for nested messages
         */
        proto.stream.SetFrameSyncRate.serializeBinaryToWriter = function (message, writer) {
            var f = undefined;
            f = message.getGameid();
            if (f !== 0) {
                writer.writeUint32(
                    1,
                    f
                );
            }
            f = message.getRoomid();
            if (parseInt(f, 10) !== 0) {
                writer.writeUint64String(
                    2,
                    f
                );
            }
            f = message.getPriority();
            if (f !== 0) {
                writer.writeUint32(
                    3,
                    f
                );
            }
            f = message.getFramerate();
            if (f !== 0) {
                writer.writeUint32(
                    4,
                    f
                );
            }
            f = message.getFrameidx();
            if (f !== 0) {
                writer.writeUint32(
                    5,
                    f
                );
            }
        };


        /**
         * optional uint32 gameID = 1;
         * @return {number}
         */
        proto.stream.SetFrameSyncRate.prototype.getGameid = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
        };


        /** @param {number} value */
        proto.stream.SetFrameSyncRate.prototype.setGameid = function (value) {
            jspb.Message.setProto3IntField(this, 1, value);
        };


        /**
         * optional uint64 roomID = 2;
         * @return {string}
         */
        proto.stream.SetFrameSyncRate.prototype.getRoomid = function () {
            return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, "0"));
        };


        /** @param {string} value */
        proto.stream.SetFrameSyncRate.prototype.setRoomid = function (value) {
            jspb.Message.setProto3StringIntField(this, 2, value);
        };


        /**
         * optional uint32 priority = 3;
         * @return {number}
         */
        proto.stream.SetFrameSyncRate.prototype.getPriority = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
        };


        /** @param {number} value */
        proto.stream.SetFrameSyncRate.prototype.setPriority = function (value) {
            jspb.Message.setProto3IntField(this, 3, value);
        };


        /**
         * optional uint32 frameRate = 4;
         * @return {number}
         */
        proto.stream.SetFrameSyncRate.prototype.getFramerate = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
        };


        /** @param {number} value */
        proto.stream.SetFrameSyncRate.prototype.setFramerate = function (value) {
            jspb.Message.setProto3IntField(this, 4, value);
        };


        /**
         * optional uint32 frameIdx = 5;
         * @return {number}
         */
        proto.stream.SetFrameSyncRate.prototype.getFrameidx = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
        };


        /** @param {number} value */
        proto.stream.SetFrameSyncRate.prototype.setFrameidx = function (value) {
            jspb.Message.setProto3IntField(this, 5, value);
        };


        /**
         * Generated by JsPbCodeGenerator.
         * @param {Array=} opt_data Optional initial data array, typically from a
         * server response, or constructed directly in Javascript. The array is used
         * in place and becomes part of the constructed object. It is not cloned.
         * If no data is provided, the constructed object will be empty, but still
         * valid.
         * @extends {jspb.Message}
         * @constructor
         */
        proto.stream.SetFrameSyncRateAck = function (opt_data) {
            jspb.Message.initialize(this, opt_data, 0, -1, null, null);
        };
        goog.inherits(proto.stream.SetFrameSyncRateAck, jspb.Message);
        if (goog.DEBUG && !COMPILED) {
            proto.stream.SetFrameSyncRateAck.displayName = "proto.stream.SetFrameSyncRateAck";
        }


        if (jspb.Message.GENERATE_TO_OBJECT) {
            /**
             * Creates an object representation of this proto suitable for use in Soy templates.
             * Field names that are reserved in JavaScript and will be renamed to pb_name.
             * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
             * For the list of reserved names please see:
             *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
             * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
             *     for transitional soy proto support: http://goto/soy-param-migration
             * @return {!Object}
             */
            proto.stream.SetFrameSyncRateAck.prototype.toObject = function (opt_includeInstance) {
                return proto.stream.SetFrameSyncRateAck.toObject(opt_includeInstance, this);
            };


            /**
             * Static version of the {@see toObject} method.
             * @param {boolean|undefined} includeInstance Whether to include the JSPB
             *     instance for transitional soy proto support:
             *     http://goto/soy-param-migration
             * @param {!proto.stream.SetFrameSyncRateAck} msg The msg instance to transform.
             * @return {!Object}
             * @suppress {unusedLocalVariables} f is only used for nested messages
             */
            proto.stream.SetFrameSyncRateAck.toObject = function (includeInstance, msg) {
                var f, obj = {
                    status: jspb.Message.getFieldWithDefault(msg, 1, 0)
                };

                if (includeInstance) {
                    obj.$jspbMessageInstance = msg;
                }
                return obj;
            };
        }


        /**
         * Deserializes binary data (in protobuf wire format).
         * @param {jspb.ByteSource} bytes The bytes to deserialize.
         * @return {!proto.stream.SetFrameSyncRateAck}
         */
        proto.stream.SetFrameSyncRateAck.deserializeBinary = function (bytes) {
            var reader = new jspb.BinaryReader(bytes);
            var msg = new proto.stream.SetFrameSyncRateAck;
            return proto.stream.SetFrameSyncRateAck.deserializeBinaryFromReader(msg, reader);
        };


        /**
         * Deserializes binary data (in protobuf wire format) from the
         * given reader into the given message object.
         * @param {!proto.stream.SetFrameSyncRateAck} msg The message object to deserialize into.
         * @param {!jspb.BinaryReader} reader The BinaryReader to use.
         * @return {!proto.stream.SetFrameSyncRateAck}
         */
        proto.stream.SetFrameSyncRateAck.deserializeBinaryFromReader = function (msg, reader) {
            while (reader.nextField()) {
                if (reader.isEndGroup()) {
                    break;
                }
                var field = reader.getFieldNumber();
                switch (field) {
                case 1:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setStatus(value);
                    break;
                default:
                    reader.skipField();
                    break;
                }
            }
            return msg;
        };


        /**
         * Serializes the message to binary data (in protobuf wire format).
         * @return {!Uint8Array}
         */
        proto.stream.SetFrameSyncRateAck.prototype.serializeBinary = function () {
            var writer = new jspb.BinaryWriter();
            proto.stream.SetFrameSyncRateAck.serializeBinaryToWriter(this, writer);
            return writer.getResultBuffer();
        };


        /**
         * Serializes the given message to binary data (in protobuf wire
         * format), writing to the given BinaryWriter.
         * @param {!proto.stream.SetFrameSyncRateAck} message
         * @param {!jspb.BinaryWriter} writer
         * @suppress {unusedLocalVariables} f is only used for nested messages
         */
        proto.stream.SetFrameSyncRateAck.serializeBinaryToWriter = function (message, writer) {
            var f = undefined;
            f = message.getStatus();
            if (f !== 0) {
                writer.writeUint32(
                    1,
                    f
                );
            }
        };


        /**
         * optional uint32 status = 1;
         * @return {number}
         */
        proto.stream.SetFrameSyncRateAck.prototype.getStatus = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
        };


        /** @param {number} value */
        proto.stream.SetFrameSyncRateAck.prototype.setStatus = function (value) {
            jspb.Message.setProto3IntField(this, 1, value);
        };


        /**
         * Generated by JsPbCodeGenerator.
         * @param {Array=} opt_data Optional initial data array, typically from a
         * server response, or constructed directly in Javascript. The array is used
         * in place and becomes part of the constructed object. It is not cloned.
         * If no data is provided, the constructed object will be empty, but still
         * valid.
         * @extends {jspb.Message}
         * @constructor
         */
        proto.stream.SetFrameSyncRateNotify = function (opt_data) {
            jspb.Message.initialize(this, opt_data, 0, -1, null, null);
        };
        goog.inherits(proto.stream.SetFrameSyncRateNotify, jspb.Message);
        if (goog.DEBUG && !COMPILED) {
            proto.stream.SetFrameSyncRateNotify.displayName = "proto.stream.SetFrameSyncRateNotify";
        }


        if (jspb.Message.GENERATE_TO_OBJECT) {
            /**
             * Creates an object representation of this proto suitable for use in Soy templates.
             * Field names that are reserved in JavaScript and will be renamed to pb_name.
             * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
             * For the list of reserved names please see:
             *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
             * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
             *     for transitional soy proto support: http://goto/soy-param-migration
             * @return {!Object}
             */
            proto.stream.SetFrameSyncRateNotify.prototype.toObject = function (opt_includeInstance) {
                return proto.stream.SetFrameSyncRateNotify.toObject(opt_includeInstance, this);
            };


            /**
             * Static version of the {@see toObject} method.
             * @param {boolean|undefined} includeInstance Whether to include the JSPB
             *     instance for transitional soy proto support:
             *     http://goto/soy-param-migration
             * @param {!proto.stream.SetFrameSyncRateNotify} msg The msg instance to transform.
             * @return {!Object}
             * @suppress {unusedLocalVariables} f is only used for nested messages
             */
            proto.stream.SetFrameSyncRateNotify.toObject = function (includeInstance, msg) {
                var f, obj = {
                    priority: jspb.Message.getFieldWithDefault(msg, 1, 0),
                    framerate: jspb.Message.getFieldWithDefault(msg, 2, 0),
                    frameidx: jspb.Message.getFieldWithDefault(msg, 3, 0),
                    timestamp: jspb.Message.getFieldWithDefault(msg, 4, "0")
                };

                if (includeInstance) {
                    obj.$jspbMessageInstance = msg;
                }
                return obj;
            };
        }


        /**
         * Deserializes binary data (in protobuf wire format).
         * @param {jspb.ByteSource} bytes The bytes to deserialize.
         * @return {!proto.stream.SetFrameSyncRateNotify}
         */
        proto.stream.SetFrameSyncRateNotify.deserializeBinary = function (bytes) {
            var reader = new jspb.BinaryReader(bytes);
            var msg = new proto.stream.SetFrameSyncRateNotify;
            return proto.stream.SetFrameSyncRateNotify.deserializeBinaryFromReader(msg, reader);
        };


        /**
         * Deserializes binary data (in protobuf wire format) from the
         * given reader into the given message object.
         * @param {!proto.stream.SetFrameSyncRateNotify} msg The message object to deserialize into.
         * @param {!jspb.BinaryReader} reader The BinaryReader to use.
         * @return {!proto.stream.SetFrameSyncRateNotify}
         */
        proto.stream.SetFrameSyncRateNotify.deserializeBinaryFromReader = function (msg, reader) {
            while (reader.nextField()) {
                if (reader.isEndGroup()) {
                    break;
                }
                var field = reader.getFieldNumber();
                switch (field) {
                case 1:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setPriority(value);
                    break;
                case 2:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setFramerate(value);
                    break;
                case 3:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setFrameidx(value);
                    break;
                case 4:
                    var value = /** @type {string} */ (reader.readUint64String());
                    msg.setTimestamp(value);
                    break;
                default:
                    reader.skipField();
                    break;
                }
            }
            return msg;
        };


        /**
         * Serializes the message to binary data (in protobuf wire format).
         * @return {!Uint8Array}
         */
        proto.stream.SetFrameSyncRateNotify.prototype.serializeBinary = function () {
            var writer = new jspb.BinaryWriter();
            proto.stream.SetFrameSyncRateNotify.serializeBinaryToWriter(this, writer);
            return writer.getResultBuffer();
        };


        /**
         * Serializes the given message to binary data (in protobuf wire
         * format), writing to the given BinaryWriter.
         * @param {!proto.stream.SetFrameSyncRateNotify} message
         * @param {!jspb.BinaryWriter} writer
         * @suppress {unusedLocalVariables} f is only used for nested messages
         */
        proto.stream.SetFrameSyncRateNotify.serializeBinaryToWriter = function (message, writer) {
            var f = undefined;
            f = message.getPriority();
            if (f !== 0) {
                writer.writeUint32(
                    1,
                    f
                );
            }
            f = message.getFramerate();
            if (f !== 0) {
                writer.writeUint32(
                    2,
                    f
                );
            }
            f = message.getFrameidx();
            if (f !== 0) {
                writer.writeUint32(
                    3,
                    f
                );
            }
            f = message.getTimestamp();
            if (parseInt(f, 10) !== 0) {
                writer.writeUint64String(
                    4,
                    f
                );
            }
        };


        /**
         * optional uint32 priority = 1;
         * @return {number}
         */
        proto.stream.SetFrameSyncRateNotify.prototype.getPriority = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
        };


        /** @param {number} value */
        proto.stream.SetFrameSyncRateNotify.prototype.setPriority = function (value) {
            jspb.Message.setProto3IntField(this, 1, value);
        };


        /**
         * optional uint32 frameRate = 2;
         * @return {number}
         */
        proto.stream.SetFrameSyncRateNotify.prototype.getFramerate = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
        };


        /** @param {number} value */
        proto.stream.SetFrameSyncRateNotify.prototype.setFramerate = function (value) {
            jspb.Message.setProto3IntField(this, 2, value);
        };


        /**
         * optional uint32 frameIdx = 3;
         * @return {number}
         */
        proto.stream.SetFrameSyncRateNotify.prototype.getFrameidx = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
        };


        /** @param {number} value */
        proto.stream.SetFrameSyncRateNotify.prototype.setFrameidx = function (value) {
            jspb.Message.setProto3IntField(this, 3, value);
        };


        /**
         * optional uint64 timeStamp = 4;
         * @return {string}
         */
        proto.stream.SetFrameSyncRateNotify.prototype.getTimestamp = function () {
            return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, "0"));
        };


        /** @param {string} value */
        proto.stream.SetFrameSyncRateNotify.prototype.setTimestamp = function (value) {
            jspb.Message.setProto3StringIntField(this, 4, value);
        };


        /**
         * Generated by JsPbCodeGenerator.
         * @param {Array=} opt_data Optional initial data array, typically from a
         * server response, or constructed directly in Javascript. The array is used
         * in place and becomes part of the constructed object. It is not cloned.
         * If no data is provided, the constructed object will be empty, but still
         * valid.
         * @extends {jspb.Message}
         * @constructor
         */
        proto.stream.FrameBroadcast = function (opt_data) {
            jspb.Message.initialize(this, opt_data, 0, -1, null, null);
        };
        goog.inherits(proto.stream.FrameBroadcast, jspb.Message);
        if (goog.DEBUG && !COMPILED) {
            proto.stream.FrameBroadcast.displayName = "proto.stream.FrameBroadcast";
        }


        if (jspb.Message.GENERATE_TO_OBJECT) {
            /**
             * Creates an object representation of this proto suitable for use in Soy templates.
             * Field names that are reserved in JavaScript and will be renamed to pb_name.
             * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
             * For the list of reserved names please see:
             *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
             * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
             *     for transitional soy proto support: http://goto/soy-param-migration
             * @return {!Object}
             */
            proto.stream.FrameBroadcast.prototype.toObject = function (opt_includeInstance) {
                return proto.stream.FrameBroadcast.toObject(opt_includeInstance, this);
            };


            /**
             * Static version of the {@see toObject} method.
             * @param {boolean|undefined} includeInstance Whether to include the JSPB
             *     instance for transitional soy proto support:
             *     http://goto/soy-param-migration
             * @param {!proto.stream.FrameBroadcast} msg The msg instance to transform.
             * @return {!Object}
             * @suppress {unusedLocalVariables} f is only used for nested messages
             */
            proto.stream.FrameBroadcast.toObject = function (includeInstance, msg) {
                var f, obj = {
                    roomid: jspb.Message.getFieldWithDefault(msg, 1, "0"),
                    priority: jspb.Message.getFieldWithDefault(msg, 2, 0),
                    cpproto: msg.getCpproto_asB64()
                };

                if (includeInstance) {
                    obj.$jspbMessageInstance = msg;
                }
                return obj;
            };
        }


        /**
         * Deserializes binary data (in protobuf wire format).
         * @param {jspb.ByteSource} bytes The bytes to deserialize.
         * @return {!proto.stream.FrameBroadcast}
         */
        proto.stream.FrameBroadcast.deserializeBinary = function (bytes) {
            var reader = new jspb.BinaryReader(bytes);
            var msg = new proto.stream.FrameBroadcast;
            return proto.stream.FrameBroadcast.deserializeBinaryFromReader(msg, reader);
        };


        /**
         * Deserializes binary data (in protobuf wire format) from the
         * given reader into the given message object.
         * @param {!proto.stream.FrameBroadcast} msg The message object to deserialize into.
         * @param {!jspb.BinaryReader} reader The BinaryReader to use.
         * @return {!proto.stream.FrameBroadcast}
         */
        proto.stream.FrameBroadcast.deserializeBinaryFromReader = function (msg, reader) {
            while (reader.nextField()) {
                if (reader.isEndGroup()) {
                    break;
                }
                var field = reader.getFieldNumber();
                switch (field) {
                case 1:
                    var value = /** @type {string} */ (reader.readUint64String());
                    msg.setRoomid(value);
                    break;
                case 2:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setPriority(value);
                    break;
                case 3:
                    var value = /** @type {!Uint8Array} */ (reader.readBytes());
                    msg.setCpproto(value);
                    break;
                default:
                    reader.skipField();
                    break;
                }
            }
            return msg;
        };


        /**
         * Serializes the message to binary data (in protobuf wire format).
         * @return {!Uint8Array}
         */
        proto.stream.FrameBroadcast.prototype.serializeBinary = function () {
            var writer = new jspb.BinaryWriter();
            proto.stream.FrameBroadcast.serializeBinaryToWriter(this, writer);
            return writer.getResultBuffer();
        };


        /**
         * Serializes the given message to binary data (in protobuf wire
         * format), writing to the given BinaryWriter.
         * @param {!proto.stream.FrameBroadcast} message
         * @param {!jspb.BinaryWriter} writer
         * @suppress {unusedLocalVariables} f is only used for nested messages
         */
        proto.stream.FrameBroadcast.serializeBinaryToWriter = function (message, writer) {
            var f = undefined;
            f = message.getRoomid();
            if (parseInt(f, 10) !== 0) {
                writer.writeUint64String(
                    1,
                    f
                );
            }
            f = message.getPriority();
            if (f !== 0) {
                writer.writeUint32(
                    2,
                    f
                );
            }
            f = message.getCpproto_asU8();
            if (f.length > 0) {
                writer.writeBytes(
                    3,
                    f
                );
            }
        };


        /**
         * optional uint64 roomID = 1;
         * @return {string}
         */
        proto.stream.FrameBroadcast.prototype.getRoomid = function () {
            return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, "0"));
        };


        /** @param {string} value */
        proto.stream.FrameBroadcast.prototype.setRoomid = function (value) {
            jspb.Message.setProto3StringIntField(this, 1, value);
        };


        /**
         * optional uint32 priority = 2;
         * @return {number}
         */
        proto.stream.FrameBroadcast.prototype.getPriority = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
        };


        /** @param {number} value */
        proto.stream.FrameBroadcast.prototype.setPriority = function (value) {
            jspb.Message.setProto3IntField(this, 2, value);
        };


        /**
         * optional bytes cpProto = 3;
         * @return {!(string|Uint8Array)}
         */
        proto.stream.FrameBroadcast.prototype.getCpproto = function () {
            return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
        };


        /**
         * optional bytes cpProto = 3;
         * This is a type-conversion wrapper around `getCpproto()`
         * @return {string}
         */
        proto.stream.FrameBroadcast.prototype.getCpproto_asB64 = function () {
            return /** @type {string} */ (jspb.Message.bytesAsB64(
                this.getCpproto()));
        };


        /**
         * optional bytes cpProto = 3;
         * Note that Uint8Array is not supported on all browsers.
         * @see http://caniuse.com/Uint8Array
         * This is a type-conversion wrapper around `getCpproto()`
         * @return {!Uint8Array}
         */
        proto.stream.FrameBroadcast.prototype.getCpproto_asU8 = function () {
            return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
                this.getCpproto()));
        };


        /** @param {!(string|Uint8Array)} value */
        proto.stream.FrameBroadcast.prototype.setCpproto = function (value) {
            jspb.Message.setProto3BytesField(this, 3, value);
        };


        /**
         * Generated by JsPbCodeGenerator.
         * @param {Array=} opt_data Optional initial data array, typically from a
         * server response, or constructed directly in Javascript. The array is used
         * in place and becomes part of the constructed object. It is not cloned.
         * If no data is provided, the constructed object will be empty, but still
         * valid.
         * @extends {jspb.Message}
         * @constructor
         */
        proto.stream.FrameBroadcastAck = function (opt_data) {
            jspb.Message.initialize(this, opt_data, 0, -1, null, null);
        };
        goog.inherits(proto.stream.FrameBroadcastAck, jspb.Message);
        if (goog.DEBUG && !COMPILED) {
            proto.stream.FrameBroadcastAck.displayName = "proto.stream.FrameBroadcastAck";
        }


        if (jspb.Message.GENERATE_TO_OBJECT) {
            /**
             * Creates an object representation of this proto suitable for use in Soy templates.
             * Field names that are reserved in JavaScript and will be renamed to pb_name.
             * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
             * For the list of reserved names please see:
             *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
             * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
             *     for transitional soy proto support: http://goto/soy-param-migration
             * @return {!Object}
             */
            proto.stream.FrameBroadcastAck.prototype.toObject = function (opt_includeInstance) {
                return proto.stream.FrameBroadcastAck.toObject(opt_includeInstance, this);
            };


            /**
             * Static version of the {@see toObject} method.
             * @param {boolean|undefined} includeInstance Whether to include the JSPB
             *     instance for transitional soy proto support:
             *     http://goto/soy-param-migration
             * @param {!proto.stream.FrameBroadcastAck} msg The msg instance to transform.
             * @return {!Object}
             * @suppress {unusedLocalVariables} f is only used for nested messages
             */
            proto.stream.FrameBroadcastAck.toObject = function (includeInstance, msg) {
                var f, obj = {
                    status: jspb.Message.getFieldWithDefault(msg, 1, 0)
                };

                if (includeInstance) {
                    obj.$jspbMessageInstance = msg;
                }
                return obj;
            };
        }


        /**
         * Deserializes binary data (in protobuf wire format).
         * @param {jspb.ByteSource} bytes The bytes to deserialize.
         * @return {!proto.stream.FrameBroadcastAck}
         */
        proto.stream.FrameBroadcastAck.deserializeBinary = function (bytes) {
            var reader = new jspb.BinaryReader(bytes);
            var msg = new proto.stream.FrameBroadcastAck;
            return proto.stream.FrameBroadcastAck.deserializeBinaryFromReader(msg, reader);
        };


        /**
         * Deserializes binary data (in protobuf wire format) from the
         * given reader into the given message object.
         * @param {!proto.stream.FrameBroadcastAck} msg The message object to deserialize into.
         * @param {!jspb.BinaryReader} reader The BinaryReader to use.
         * @return {!proto.stream.FrameBroadcastAck}
         */
        proto.stream.FrameBroadcastAck.deserializeBinaryFromReader = function (msg, reader) {
            while (reader.nextField()) {
                if (reader.isEndGroup()) {
                    break;
                }
                var field = reader.getFieldNumber();
                switch (field) {
                case 1:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setStatus(value);
                    break;
                default:
                    reader.skipField();
                    break;
                }
            }
            return msg;
        };


        /**
         * Serializes the message to binary data (in protobuf wire format).
         * @return {!Uint8Array}
         */
        proto.stream.FrameBroadcastAck.prototype.serializeBinary = function () {
            var writer = new jspb.BinaryWriter();
            proto.stream.FrameBroadcastAck.serializeBinaryToWriter(this, writer);
            return writer.getResultBuffer();
        };


        /**
         * Serializes the given message to binary data (in protobuf wire
         * format), writing to the given BinaryWriter.
         * @param {!proto.stream.FrameBroadcastAck} message
         * @param {!jspb.BinaryWriter} writer
         * @suppress {unusedLocalVariables} f is only used for nested messages
         */
        proto.stream.FrameBroadcastAck.serializeBinaryToWriter = function (message, writer) {
            var f = undefined;
            f = message.getStatus();
            if (f !== 0) {
                writer.writeUint32(
                    1,
                    f
                );
            }
        };


        /**
         * optional uint32 status = 1;
         * @return {number}
         */
        proto.stream.FrameBroadcastAck.prototype.getStatus = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
        };


        /** @param {number} value */
        proto.stream.FrameBroadcastAck.prototype.setStatus = function (value) {
            jspb.Message.setProto3IntField(this, 1, value);
        };


        /**
         * Generated by JsPbCodeGenerator.
         * @param {Array=} opt_data Optional initial data array, typically from a
         * server response, or constructed directly in Javascript. The array is used
         * in place and becomes part of the constructed object. It is not cloned.
         * If no data is provided, the constructed object will be empty, but still
         * valid.
         * @extends {jspb.Message}
         * @constructor
         */
        proto.stream.FrameDataNotify = function (opt_data) {
            jspb.Message.initialize(this, opt_data, 0, -1, null, null);
        };
        goog.inherits(proto.stream.FrameDataNotify, jspb.Message);
        if (goog.DEBUG && !COMPILED) {
            proto.stream.FrameDataNotify.displayName = "proto.stream.FrameDataNotify";
        }


        if (jspb.Message.GENERATE_TO_OBJECT) {
            /**
             * Creates an object representation of this proto suitable for use in Soy templates.
             * Field names that are reserved in JavaScript and will be renamed to pb_name.
             * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
             * For the list of reserved names please see:
             *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
             * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
             *     for transitional soy proto support: http://goto/soy-param-migration
             * @return {!Object}
             */
            proto.stream.FrameDataNotify.prototype.toObject = function (opt_includeInstance) {
                return proto.stream.FrameDataNotify.toObject(opt_includeInstance, this);
            };


            /**
             * Static version of the {@see toObject} method.
             * @param {boolean|undefined} includeInstance Whether to include the JSPB
             *     instance for transitional soy proto support:
             *     http://goto/soy-param-migration
             * @param {!proto.stream.FrameDataNotify} msg The msg instance to transform.
             * @return {!Object}
             * @suppress {unusedLocalVariables} f is only used for nested messages
             */
            proto.stream.FrameDataNotify.toObject = function (includeInstance, msg) {
                var f, obj = {
                    srcuid: jspb.Message.getFieldWithDefault(msg, 1, 0),
                    priority: jspb.Message.getFieldWithDefault(msg, 2, 0),
                    cpproto: msg.getCpproto_asB64(),
                    timestamp: jspb.Message.getFieldWithDefault(msg, 4, "0"),
                    frameidx: jspb.Message.getFieldWithDefault(msg, 5, 0)
                };

                if (includeInstance) {
                    obj.$jspbMessageInstance = msg;
                }
                return obj;
            };
        }


        /**
         * Deserializes binary data (in protobuf wire format).
         * @param {jspb.ByteSource} bytes The bytes to deserialize.
         * @return {!proto.stream.FrameDataNotify}
         */
        proto.stream.FrameDataNotify.deserializeBinary = function (bytes) {
            var reader = new jspb.BinaryReader(bytes);
            var msg = new proto.stream.FrameDataNotify;
            return proto.stream.FrameDataNotify.deserializeBinaryFromReader(msg, reader);
        };


        /**
         * Deserializes binary data (in protobuf wire format) from the
         * given reader into the given message object.
         * @param {!proto.stream.FrameDataNotify} msg The message object to deserialize into.
         * @param {!jspb.BinaryReader} reader The BinaryReader to use.
         * @return {!proto.stream.FrameDataNotify}
         */
        proto.stream.FrameDataNotify.deserializeBinaryFromReader = function (msg, reader) {
            while (reader.nextField()) {
                if (reader.isEndGroup()) {
                    break;
                }
                var field = reader.getFieldNumber();
                switch (field) {
                case 1:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setSrcuid(value);
                    break;
                case 2:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setPriority(value);
                    break;
                case 3:
                    var value = /** @type {!Uint8Array} */ (reader.readBytes());
                    msg.setCpproto(value);
                    break;
                case 4:
                    var value = /** @type {string} */ (reader.readUint64String());
                    msg.setTimestamp(value);
                    break;
                case 5:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setFrameidx(value);
                    break;
                default:
                    reader.skipField();
                    break;
                }
            }
            return msg;
        };


        /**
         * Serializes the message to binary data (in protobuf wire format).
         * @return {!Uint8Array}
         */
        proto.stream.FrameDataNotify.prototype.serializeBinary = function () {
            var writer = new jspb.BinaryWriter();
            proto.stream.FrameDataNotify.serializeBinaryToWriter(this, writer);
            return writer.getResultBuffer();
        };


        /**
         * Serializes the given message to binary data (in protobuf wire
         * format), writing to the given BinaryWriter.
         * @param {!proto.stream.FrameDataNotify} message
         * @param {!jspb.BinaryWriter} writer
         * @suppress {unusedLocalVariables} f is only used for nested messages
         */
        proto.stream.FrameDataNotify.serializeBinaryToWriter = function (message, writer) {
            var f = undefined;
            f = message.getSrcuid();
            if (f !== 0) {
                writer.writeUint32(
                    1,
                    f
                );
            }
            f = message.getPriority();
            if (f !== 0) {
                writer.writeUint32(
                    2,
                    f
                );
            }
            f = message.getCpproto_asU8();
            if (f.length > 0) {
                writer.writeBytes(
                    3,
                    f
                );
            }
            f = message.getTimestamp();
            if (parseInt(f, 10) !== 0) {
                writer.writeUint64String(
                    4,
                    f
                );
            }
            f = message.getFrameidx();
            if (f !== 0) {
                writer.writeUint32(
                    5,
                    f
                );
            }
        };


        /**
         * optional uint32 srcUid = 1;
         * @return {number}
         */
        proto.stream.FrameDataNotify.prototype.getSrcuid = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
        };


        /** @param {number} value */
        proto.stream.FrameDataNotify.prototype.setSrcuid = function (value) {
            jspb.Message.setProto3IntField(this, 1, value);
        };


        /**
         * optional uint32 priority = 2;
         * @return {number}
         */
        proto.stream.FrameDataNotify.prototype.getPriority = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
        };


        /** @param {number} value */
        proto.stream.FrameDataNotify.prototype.setPriority = function (value) {
            jspb.Message.setProto3IntField(this, 2, value);
        };


        /**
         * optional bytes cpProto = 3;
         * @return {!(string|Uint8Array)}
         */
        proto.stream.FrameDataNotify.prototype.getCpproto = function () {
            return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
        };


        /**
         * optional bytes cpProto = 3;
         * This is a type-conversion wrapper around `getCpproto()`
         * @return {string}
         */
        proto.stream.FrameDataNotify.prototype.getCpproto_asB64 = function () {
            return /** @type {string} */ (jspb.Message.bytesAsB64(
                this.getCpproto()));
        };


        /**
         * optional bytes cpProto = 3;
         * Note that Uint8Array is not supported on all browsers.
         * @see http://caniuse.com/Uint8Array
         * This is a type-conversion wrapper around `getCpproto()`
         * @return {!Uint8Array}
         */
        proto.stream.FrameDataNotify.prototype.getCpproto_asU8 = function () {
            return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
                this.getCpproto()));
        };


        /** @param {!(string|Uint8Array)} value */
        proto.stream.FrameDataNotify.prototype.setCpproto = function (value) {
            jspb.Message.setProto3BytesField(this, 3, value);
        };


        /**
         * optional uint64 timeStamp = 4;
         * @return {string}
         */
        proto.stream.FrameDataNotify.prototype.getTimestamp = function () {
            return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, "0"));
        };


        /** @param {string} value */
        proto.stream.FrameDataNotify.prototype.setTimestamp = function (value) {
            jspb.Message.setProto3StringIntField(this, 4, value);
        };


        /**
         * optional uint32 frameIdx = 5;
         * @return {number}
         */
        proto.stream.FrameDataNotify.prototype.getFrameidx = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
        };


        /** @param {number} value */
        proto.stream.FrameDataNotify.prototype.setFrameidx = function (value) {
            jspb.Message.setProto3IntField(this, 5, value);
        };


        /**
         * Generated by JsPbCodeGenerator.
         * @param {Array=} opt_data Optional initial data array, typically from a
         * server response, or constructed directly in Javascript. The array is used
         * in place and becomes part of the constructed object. It is not cloned.
         * If no data is provided, the constructed object will be empty, but still
         * valid.
         * @extends {jspb.Message}
         * @constructor
         */
        proto.stream.FrameSyncNotify = function (opt_data) {
            jspb.Message.initialize(this, opt_data, 0, -1, null, null);
        };
        goog.inherits(proto.stream.FrameSyncNotify, jspb.Message);
        if (goog.DEBUG && !COMPILED) {
            proto.stream.FrameSyncNotify.displayName = "proto.stream.FrameSyncNotify";
        }


        if (jspb.Message.GENERATE_TO_OBJECT) {
            /**
             * Creates an object representation of this proto suitable for use in Soy templates.
             * Field names that are reserved in JavaScript and will be renamed to pb_name.
             * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
             * For the list of reserved names please see:
             *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
             * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
             *     for transitional soy proto support: http://goto/soy-param-migration
             * @return {!Object}
             */
            proto.stream.FrameSyncNotify.prototype.toObject = function (opt_includeInstance) {
                return proto.stream.FrameSyncNotify.toObject(opt_includeInstance, this);
            };


            /**
             * Static version of the {@see toObject} method.
             * @param {boolean|undefined} includeInstance Whether to include the JSPB
             *     instance for transitional soy proto support:
             *     http://goto/soy-param-migration
             * @param {!proto.stream.FrameSyncNotify} msg The msg instance to transform.
             * @return {!Object}
             * @suppress {unusedLocalVariables} f is only used for nested messages
             */
            proto.stream.FrameSyncNotify.toObject = function (includeInstance, msg) {
                var f, obj = {
                    priority: jspb.Message.getFieldWithDefault(msg, 1, 0),
                    lastidx: jspb.Message.getFieldWithDefault(msg, 2, 0),
                    nextidx: jspb.Message.getFieldWithDefault(msg, 3, 0),
                    startts: jspb.Message.getFieldWithDefault(msg, 4, "0"),
                    endts: jspb.Message.getFieldWithDefault(msg, 5, "0"),
                    timestamp: jspb.Message.getFieldWithDefault(msg, 6, "0")
                };

                if (includeInstance) {
                    obj.$jspbMessageInstance = msg;
                }
                return obj;
            };
        }


        /**
         * Deserializes binary data (in protobuf wire format).
         * @param {jspb.ByteSource} bytes The bytes to deserialize.
         * @return {!proto.stream.FrameSyncNotify}
         */
        proto.stream.FrameSyncNotify.deserializeBinary = function (bytes) {
            var reader = new jspb.BinaryReader(bytes);
            var msg = new proto.stream.FrameSyncNotify;
            return proto.stream.FrameSyncNotify.deserializeBinaryFromReader(msg, reader);
        };


        /**
         * Deserializes binary data (in protobuf wire format) from the
         * given reader into the given message object.
         * @param {!proto.stream.FrameSyncNotify} msg The message object to deserialize into.
         * @param {!jspb.BinaryReader} reader The BinaryReader to use.
         * @return {!proto.stream.FrameSyncNotify}
         */
        proto.stream.FrameSyncNotify.deserializeBinaryFromReader = function (msg, reader) {
            while (reader.nextField()) {
                if (reader.isEndGroup()) {
                    break;
                }
                var field = reader.getFieldNumber();
                switch (field) {
                case 1:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setPriority(value);
                    break;
                case 2:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setLastidx(value);
                    break;
                case 3:
                    var value = /** @type {number} */ (reader.readUint32());
                    msg.setNextidx(value);
                    break;
                case 4:
                    var value = /** @type {string} */ (reader.readUint64String());
                    msg.setStartts(value);
                    break;
                case 5:
                    var value = /** @type {string} */ (reader.readUint64String());
                    msg.setEndts(value);
                    break;
                case 6:
                    var value = /** @type {string} */ (reader.readUint64String());
                    msg.setTimestamp(value);
                    break;
                default:
                    reader.skipField();
                    break;
                }
            }
            return msg;
        };


        /**
         * Serializes the message to binary data (in protobuf wire format).
         * @return {!Uint8Array}
         */
        proto.stream.FrameSyncNotify.prototype.serializeBinary = function () {
            var writer = new jspb.BinaryWriter();
            proto.stream.FrameSyncNotify.serializeBinaryToWriter(this, writer);
            return writer.getResultBuffer();
        };


        /**
         * Serializes the given message to binary data (in protobuf wire
         * format), writing to the given BinaryWriter.
         * @param {!proto.stream.FrameSyncNotify} message
         * @param {!jspb.BinaryWriter} writer
         * @suppress {unusedLocalVariables} f is only used for nested messages
         */
        proto.stream.FrameSyncNotify.serializeBinaryToWriter = function (message, writer) {
            var f = undefined;
            f = message.getPriority();
            if (f !== 0) {
                writer.writeUint32(
                    1,
                    f
                );
            }
            f = message.getLastidx();
            if (f !== 0) {
                writer.writeUint32(
                    2,
                    f
                );
            }
            f = message.getNextidx();
            if (f !== 0) {
                writer.writeUint32(
                    3,
                    f
                );
            }
            f = message.getStartts();
            if (parseInt(f, 10) !== 0) {
                writer.writeUint64String(
                    4,
                    f
                );
            }
            f = message.getEndts();
            if (parseInt(f, 10) !== 0) {
                writer.writeUint64String(
                    5,
                    f
                );
            }
            f = message.getTimestamp();
            if (parseInt(f, 10) !== 0) {
                writer.writeUint64String(
                    6,
                    f
                );
            }
        };


        /**
         * optional uint32 priority = 1;
         * @return {number}
         */
        proto.stream.FrameSyncNotify.prototype.getPriority = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
        };


        /** @param {number} value */
        proto.stream.FrameSyncNotify.prototype.setPriority = function (value) {
            jspb.Message.setProto3IntField(this, 1, value);
        };


        /**
         * optional uint32 lastIdx = 2;
         * @return {number}
         */
        proto.stream.FrameSyncNotify.prototype.getLastidx = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
        };


        /** @param {number} value */
        proto.stream.FrameSyncNotify.prototype.setLastidx = function (value) {
            jspb.Message.setProto3IntField(this, 2, value);
        };


        /**
         * optional uint32 nextIdx = 3;
         * @return {number}
         */
        proto.stream.FrameSyncNotify.prototype.getNextidx = function () {
            return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
        };


        /** @param {number} value */
        proto.stream.FrameSyncNotify.prototype.setNextidx = function (value) {
            jspb.Message.setProto3IntField(this, 3, value);
        };


        /**
         * optional uint64 startTS = 4;
         * @return {string}
         */
        proto.stream.FrameSyncNotify.prototype.getStartts = function () {
            return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, "0"));
        };


        /** @param {string} value */
        proto.stream.FrameSyncNotify.prototype.setStartts = function (value) {
            jspb.Message.setProto3StringIntField(this, 4, value);
        };


        /**
         * optional uint64 endTS = 5;
         * @return {string}
         */
        proto.stream.FrameSyncNotify.prototype.getEndts = function () {
            return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, "0"));
        };


        /** @param {string} value */
        proto.stream.FrameSyncNotify.prototype.setEndts = function (value) {
            jspb.Message.setProto3StringIntField(this, 5, value);
        };


        /**
         * optional uint64 timeStamp = 6;
         * @return {string}
         */
        proto.stream.FrameSyncNotify.prototype.getTimestamp = function () {
            return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, "0"));
        };


        /** @param {string} value */
        proto.stream.FrameSyncNotify.prototype.setTimestamp = function (value) {
            jspb.Message.setProto3StringIntField(this, 6, value);
        };


        /**
         * @enum {number}
         */
        proto.stream.SDKHotelCmdID = {
            INVALIDSDKCMD: 0,
            CHECKINCMDID: 1401,
            CHECKINACKCMDID: 1402,
            HEARTBEATCMDID: 1403,
            HEARTBEATACKCMDID: 1404,
            BROADCASTCMDID: 1405,
            BROADCASTACKCMDID: 1406,
            NOTIFYCMDID: 1408,
            CHECKINNOTIFYCMDID: 1410,
            SUBSCRIBECMDID: 1411,
            SUBSCRIBEACKCMDID: 1412,
            PUBLISHCMDID: 1413,
            PUBLISHACKCMDID: 1414,
            PUBLISHNOTIFYCMDID: 1416
        };

        goog.object.extend(exports, proto.stream);

    }, {"google-protobuf": 1}]
}, {}, [3]);
/* ================ matchvsdefine.js ================= */
function MsCreateRoomInfo(roomName, maxPlayer, mode, canWatch, visibility, roomProperty) {
    this.roomName     =roomName ;
    this.maxPlayer    =maxPlayer ;
    this.mode         =mode ;
    this.canWatch     =canWatch ;
    this.visibility   =visibility ;
    this.roomProperty =roomProperty ;
    this.toString = function () {
        return"roomName:"+this.roomName
        +" maxPlayer:"+this.maxPlayer
        +" mode:"+this.mode
        +" canWatch:"+this.canWatch
        +" visibility:"+this.visibility
        +" roomProperty:"+this.roomProperty;

    };
    MatchvsLog.logI(this+" MsCreateRoomInfo:"+JSON.stringify(this));
}
function MsEnum() {}
/**
 *      joinSpecialRoom = 1;		//扩展接口,param(roomID, userProfile)
 *      joinRoomWithProperty = 2;	//扩展接口,param(roomProperty, userProfil
 *      joinRandomRoom = 3;			//基本接口,param(maxPlayer, userProfile)
 * @type {{NoJoin: number, joinSpecialRoom: number, joinRoomWithProperty: number, joinRandomRoom: number}}
 */
MsEnum.JoinRoomType = {NoJoin:0, joinSpecialRoom:1, joinRoomWithProperty:2,joinRandomRoom:3,reconnect:4};


function  MsRoomJoin(joinType, userID, roomID, gameID, maxPlayer, mode, canWatch,userProfile,tags)
{
    this.joinType    =joinType;
    this.userID      =userID;
    this.roomID      =roomID;
    this.gameID      =gameID;
    this.maxPlayer   =maxPlayer;
    this.mode        =mode;
    this.canWatch    =canWatch;
    this.tags        =tags ;//k-v map as json object  ex:[{dd:'SB',AA:'dd',re1:123},{cc:'dd',lk:'1qw'}];
    this.userProfile =userProfile;
    MatchvsLog.logI(this+" MsRoomJoin:"+JSON.stringify(this));
}

function MsJoinOverRsp(status, cpProto) {
    this.status = status;
    this.cpProto = cpProto;
    MatchvsLog.logI(this+" MsJoinOverRsp:"+JSON.stringify(this));
}

/**
 *
 * @param roomID    {string}
 * @param srcUserID {number}
 * @param cpProto   {string}
 * @constructor
 */
function MsJoinOverNotifyInfo(roomID, srcUserID, cpProto) {
    this.roomID = roomID;
    this.srcUserID = srcUserID;
    this.cpProto = cpProto;
    MatchvsLog.logI(this+" MsJoinOverNotifyInfo:"+JSON.stringify(this));
}


/**
 *
 * @param status
 * @param roomID
 * @param owner
 * @constructor
 */
function MsCreateRoomRsp(status, roomID, owner) {
    this.status = status;
    this.roomID = roomID;
    this.owner = owner;
    MatchvsLog.logI(this+" MsCreateRoomRsp:"+JSON.stringify(this));
}

/**
 *
 * @param gameID {number}
 * @param roomID {string}
 * @param userID {number}
 * @param bookID {string}
 * @param book_key {string}
 * @param hotelInfo {string}
 * @constructor
 */
function MsCheckIn(gameID,roomID,userID,bookID,book_key,hotelInfo) {
    this.gameID = gameID;
    this.roomID = roomID;
    this.userID = userID;
    this.bookID = bookID;
    this.book_key = book_key;
    this.hotelInfo = hotelInfo;
}

/**
 *
 * @param maxplayer {number}
 * @param mode {number}
 * @param canWatch {number}
 * @param tags {object}
 * @constructor
 */
function MsMatchInfo(maxplayer, mode, canWatch, tags) {
    this.maxPlayer = maxplayer;
    this.mode = mode ;
    this.canWatch = canWatch;
    this.tags = {};
    this.tags = tags;
    MatchvsLog.logI(this+" MsMatchInfo:"+JSON.stringify(this));
}

/**
 *  房间信息
 * @param roomID
 * @param roomProperty
 * @param ownerID
 * @constructor
 */
function MsRoomInfo(roomID, roomProperty, ownerID) {
    this.roomID = roomID;       // string
    this.roomProperty = roomProperty; //
    this.ownerId = ownerID;
    MatchvsLog.logI(this+" MsRoomInfo:"+JSON.stringify(this));
}

/**
 * 房间用户信息
 * @param userID
 * @param userProfile
 * @constructor
 */
function MsRoomUserInfo(userID, userProfile) {
    this.userId = userID;
    this.userProfile = userProfile;
    MatchvsLog.logI(this+" MsRoomUserInfo:"+JSON.stringify(this));
}

/**
 * 离开房间返回信息
 * @param status
 * @param roomId
 * @param userId
 * @param cpProto
 * @constructor
 */
function MsLeaveRoomRsp(status, roomId, userId, cpProto) {
    this.status = status;
    this.roomID = roomId;
    this.userId = userId;
    this.cpProto = cpProto;
    MatchvsLog.logI(this+" MsLeaveRoomRsp:"+JSON.stringify(this));
}

/**
 *
 * @param userID {number}
 * @param roomID {string}
 * @param owner  {number}
 * @param cpProto{string}
 * @constructor
 */
function MsLeaveRoomNotify(roomID,userID, owner, cpProto) {
    this.userId = userID;
    this.roomID = roomID;
    this.owner = owner;
    this.cpProto = cpProto;
    MatchvsLog.logI(this+" MsLeaveRoomNotify:"+JSON.stringify(this));
}


/**
 *
 * @param status
 * @param groups
 * @constructor
 */
function MsSubscribeEventGroupRsp(status, groups) {
    this.status = status;  //number
    this.groups = groups; // array<string>
}

/**
 *
 */
function MsSendEventGroupNotify(srcUid, groups, cpProto) {
    this.srcUid = srcUid;       // number
    this.groups = groups;       // array<string>
    this.cpProto = cpProto;     // string
}

/**
 *
 * @param status
 * @param userID
 * @param token
 * @param name
 * @param avatar
 * @constructor
 */
function MsRegistRsp(status, userID, token, name, avatar) {
    this.status = status;
    this.id = userID;
    this.token = token;
    this.name = name;
    this.avatar = avatar;
    MatchvsLog.logI("MsRegistRsp"+":"+JSON.stringify(this));
}

function MsLoginRsp(status, roomID) {
    this.status = status;//int
    this.roomID = roomID;//unsigned long long
    MatchvsLog.logI("MsLoginRsp:"
        +":"+JSON.stringify(this));
}

function MsPublicMemberArgs(channle, platform,userID, token, gameID, gameVersion, appkey, secretKey, deviceID, gatewayID) {
    this.userID = userID;
    this.token = token;
    this.gameID = gameID;
    this.gameVersion = gameVersion;
    this.appKey = appkey;
    this.secretKey = secretKey;
    this.deviceID = deviceID;
    this.gatewayID = gatewayID;
    this.channel = channle;
    this.platform = platform;
    MatchvsLog.logI(this+":"+JSON.stringify(this));
}

/**
 *
 * @param userID {number}
 * @param checkins {array<number>}
 * @param players {array<number>}
 * @param maxPlayers {number}
 * @constructor
 */
function MsCheckInNotify(userID, checkins, players, maxPlayers) {
    this.userID = userID;
    this.checkins = checkins;
    this.players = players;
    this.maxPlayers = maxPlayers;
    MatchvsLog.logI(this+":"+JSON.stringify(this));
}

/**
 *
 * @param srcUserID {number}
 * @param cpProto {string}
 * @constructor
 */
function MsSendEventNotify(srcUserID, cpProto) {
    this.srcUserId = srcUserID;
    this.cpProto = cpProto;
}

/**
 *
 * @param srcUserID {number}
 * @param cpProto {string}
 * @constructor
 */
function MsGameServerNotifyInfo(srcUserID, cpProto) {
    this.srcUserId = srcUserID;
    this.cpProto = cpProto;
}

/**
 *
 * @param status {number}
 * @param sequence {number}
 * @constructor
 */
function MsSendEventRsp(status, sequence) {
    this.status = status;
    this.sequence = sequence;
}

/**
 * 房间信息列表
 * @param roomID {string}
 * @param roomName {string}
 * @param maxplayer {number}
 * @param mode {number}
 * @param canWatch {number}
 * @param roomProperty {string}
 * @constructor
 */
function MsRoomInfoEx(roomID, roomName, maxplayer, mode, canWatch, roomProperty) {
    this.roomID = roomID;
    this.roomName = roomName;
    this.maxPlayer = maxplayer;
    this.mode = mode;
    this.canWatch = canWatch;
    this.roomProperty = roomProperty;
    MatchvsLog.logI(" MsRoomInfoEx"+":"+JSON.stringify(this));
}

/**
 * 获取房间信息列表返回
 * @param status {number}
 * @param roomInfos {Array<MsRoomInfoEx>}
 * @constructor
 */
function MsRoomListRsp(status, roomInfos) {
    this.status = status;
    this.roomInfos = roomInfos;
    MatchvsLog.logI(this+" MsRoomListRsp:"+JSON.stringify(this));
}

/**
 *
 * @param userId {number}
 * @param srcUserId {number}
 * @param data {string}
 * @param owner {number}
 * @constructor
 */
function MsKickPlayerNotify(userId, srcUserId, data,owner) {
    this.userId = userId;
    this.srcUserId = srcUserId;
    this.cpProto = data;
    this.owner = owner;
    MatchvsLog.logI(this+" MsKickPlayerNotify:"+JSON.stringify(this));
}

function MsKickPlayerRsp(status, owner, userID) {
    this.status = status;
    this.owner = owner;
    this.userID = userID;
    MatchvsLog.logI(this+" MsKickPlayerRsp:"+JSON.stringify(this));
}

/**
 *
 * @param mStatus {Number} 200 is ok
 * @constructor
 */
function MsSetChannelFrameSyncRsp(mStatus) {
    this.mStatus = mStatus;
}


/**
 *
 * @param mStatus {Number} 200 is ok
 * @constructor
 */
function MsSendFrameEventRsp(mStatus) {
    this.mStatus = mStatus;
}


/**
 * message RoomFilter
 *{
 *    uint32 maxPlayer = 1;
 *    int32 mode = 2;
 *    int32 canWatch = 3;
 *    bytes roomProperty = 4;
 *}
 * @param maxPlayer {int}
 * @param mode {int}
 * @param canWatch {int}
 * @param roomProperty {String}
 * @constructor
 */
function MsRoomFilter(maxPlayer,mode,canWatch,roomProperty) {
    this.maxPlayer = maxPlayer;
    this.mode = mode;
    this.canWatch = canWatch;
    this.roomProperty = roomProperty;
    MatchvsLog.logI(this+" MsRoomFilter:"+JSON.stringify(this));
}

/**
 *
 * @param maxPlayer {number}
 * @param mode {number}
 * @param canWatch {number}
 * @param roomProperty {string}
 * @param full {number} 0-全部 1-满 2-未满
 * @param state {number} 0-StateNil 1-StateOpen 2-StateClosed
 * @param sort  {number} 0-RoomSortNil 1-RoomSortCreateTime 2-SortPlayerNum 3-SortState
 * @param order {number} 0-SortAsc 1-SortDesc
 * @param pageNo {number}
 * @param pageSize {number}
 * @constructor
 */
function MsRoomFilterEx(maxPlayer, mode, canWatch, roomProperty, full, state, sort, order, pageNo, pageSize) {
    this.maxPlayer = maxPlayer;
    this.mode = mode;
    this.canWatch = canWatch;
    this.roomProperty = roomProperty;
    this.full = full;
    this.state = state;
    this.sort = sort;
    this.order = order;
    this.pageNo = pageNo;
    this.pageSize = pageSize ? pageSize : 10;
    MatchvsLog.logI(this+" MsRoomFilterEx:"+JSON.stringify(this));
}

/**
 *
 * @param status
 * @param state
 * @param maxPlayer
 * @param mode
 * @param canWatch
 * @param roomProperty
 * @param owner
 * @param createFlag
 * @param userInfos {Array<MsRoomUserInfo>}
 * @constructor
 */
function MsGetRoomDetailRsp(status, state, maxPlayer, mode, canWatch, roomProperty, owner, createFlag, userInfos) {
    this.status = status;
    this.state = state;
    this.maxPlayer = maxPlayer;
    this.mode = mode;
    this.canWatch = canWatch;
    this.roomProperty = roomProperty;
    this.owner = owner;
    this.createFlag = createFlag;
    this.userInfos = [];
    this.userInfos = userInfos;
    MatchvsLog.logI(this+" MsGetRoomDetailRsp:"+JSON.stringify(this));
}

/**
 *
 * @param roomID        {string}
 * @param roomName      {string}
 * @param maxPlayer     {number}
 * @param gamePlayer    {number}
 * @param watchPlaer    {number}
 * @param mode          {number}
 * @param canWatch      {number}
 * @param roomProperty  {string}
 * @param owner         {number}
 * @param state         {number}
 * @param createTime    {string}
 * @constructor
 */
function MsRoomAttribute(roomID, roomName, maxPlayer, gamePlayer, watchPlaer, mode, canWatch, roomProperty, owner, state, createTime) {
    this.roomID = roomID;
    this.roomName = roomName;
    this.maxPlayer = maxPlayer;
    this.gamePlayer = gamePlayer;
    this.watchPlayer = watchPlaer;
    this.mode = mode;
    this.canWatch = canWatch;
    this.roomProperty = roomProperty;
    this.owner = owner;
    this.state = state;
    this.createTime = createTime;
    MatchvsLog.logI(this+" MsRoomAttribute:"+JSON.stringify(this));
}

/**
 *
 * @param status {number}
 * @param total {number}
 * @param roomAttrs {Array<MsRoomAttribute>}
 * @constructor
 */
function MsGetRoomListExRsp(status, total, roomAttrs) {
    this.status = status;
    this.total = total;
    this.roomAttrs = [];
    this.roomAttrs = roomAttrs;
    MatchvsLog.logI(this+" MsGetRoomListExRsp:"+JSON.stringify(this));
}

/**
 *
 * @param srcUserID {Number}
 * @param cpProto {String}
 * @param timestamp {String} ms
 * @constructor
 */
function MsFrameItem (srcUserID,cpProto,timestamp) {
    this.srcUserID = srcUserID;
    this.cpProto =cpProto;
    this.timestamp =timestamp;
}

/**
 *
 * @param frameIndex {Number}
 * @param frameItems {MsFrameItem[]}
 * @param frameWaitCount {Number}
 * @constructor
 */
function MsFrameData (frameIndex,frameItems,frameWaitCount) {
    this.frameIndex = frameIndex;
    this.frameItems =frameItems;
    this.frameWaitCount =frameWaitCount;
}

/**
 *
 * @param roomID {string}
 * @param userID {number}
 * @param state {number} 1-网络异常，正在重连  2-重连成功 3-重连失败，退出房间
 * @param owner {number}
 * @constructor {number}
 */
function MsNetworkStateNotify(roomID, userID, state, owner) {
    this.roomID = roomID;
    this.userID = userID;
    this.state = state;
    this.owner = owner;
}

/**
 * 设置房间属性返回值
 * @param status {number}
 * @param roomID {string}
 * @param userID {number}
 * @param roomProperty {string}
 * @constructor
 */
function MsSetRoomPropertyRspInfo(status, roomID, userID, roomProperty) {
    this.status = status;
    this.roomID = roomID;
    this.userID = userID;
    this.roomProperty = roomProperty;
    MatchvsLog.logI(this+" MsSetRoomPropertyRspInfo:"+JSON.stringify(this));
}

/**
 *
 * @param roomID {string}
 * @param userID {number}
 * @param roomProperty {string}
 * @constructor
 */
function MsRoomPropertyNotifyInfo( roomID, userID, roomProperty) {
    this.roomID = roomID;
    this.userID = userID;
    this.roomProperty = roomProperty;
    MatchvsLog.logI(this+" MsRoomPropertyNotifyInfo:"+JSON.stringify(this));
}

function MsHeartBeatResponse(gameID,gsExist) {
    this.gameID = gameID;
    this.gsExist = gsExist;
}

function MsGatewaySpeedResponse(Status, Seq) {
    this.status = Status;
    this.seq = Seq;
}
function MsReopenRoomResponse(Status, cpProto) {
    this.status = Status;
    this.cpProto = cpProto;
    MatchvsLog.logI(this+" MsReopenRoomResponse:"+JSON.stringify(this));
}
function MsReopenRoomNotify(roomID, userID, cpProto) {
    this.roomID = roomID;
    this.userID = userID;
    this.cpProto = cpProto;
    MatchvsLog.logI(this+" MsReopenRoomNotify:"+JSON.stringify(this));
}/* ================ matchvsnetwork.js ================= */
//adapter weixin

function MatchvsNetWorkCallBack() {
    /**
     *
     * @param buf DataView
     */
    this.onMsg = function (buf) {

    };
    /**
     *
     * @param errCode int
     * @param errMsg String
     */
    this.onErr = function (errCode, errMsg) {

    };
}

var MatchvsNetWork;
var MatchvsHttp;
try {
    if (typeof (wx) !== "undefined") {
        MatchvsNetWork = function MatchvsNetWork(host, callback) {
            /**
             * WebSocket 任务，可通过 wx.connectSocket() 接口创建返回。
             * @type {socket}
             */
            var socket = null;
            var socketOpen = false;
            var socketMsgQueue = [];
            var mCallBack = callback;
            var mHost = host;
            var that = this;
            this.close = function () {
                if (socket) {
                    socket.close();
                }
            };
            /**
             * msg {DataView}
             */
            this.send = function (msg) {

                if (socketOpen) {
                    socket.send({
                        data: msg.buffer
                    });
                } else {

                    //只缓存一百
                    if (socketMsgQueue.length < 100) {
                        socketMsgQueue.push(msg);
                    }
                }
            };


            function connect() {
                socket = wx.connectSocket({
                    url: host,
                    header: {
                        "engine": "WeiXinGame"
                    }
                });
            }

            connect();
            socket.onOpen(function (res) {
                MatchvsLog.logI("[wx.WebSocket][connect]:" + res);
                socketOpen = true;
                while (socketMsgQueue.length > 0) {
                    that.send(socketMsgQueue.pop());
                }

                mCallBack.onConnect && mCallBack.onConnect(mHost);
            });

            socket.onClose(function (e) {
                socketOpen = false;
                mCallBack.onDisConnect && mCallBack.onDisConnect(mHost,e);
                MatchvsLog.logI("[wx.WebSocket] [onClose] case:"+JSON.stringify(e));
            });

            socket.onMessage(function (res) {
                var dataView = new DataView(res.data);
                mCallBack.onMsg(dataView);
            });
            socket.onError(function(event) {
                mCallBack.onDisConnect && mCallBack.onDisConnect(mHost,event);
                MatchvsLog.logI("[wx.WebSocket] [onError] case:" + JSON.stringify(event));
            }) ;
        };
        MatchvsHttp = function MatchvsHttp(callback) {
            this.mCallback = callback;


            function send(url, callback, isPost, params) {
                wx.request({
                    url: url,
                    data: {
                        x: "",
                        y: ""
                    },
                    header: {
                        "content-type": "application/json"
                    },
                    success: function (res) {
                        var rsp = JSON.stringify(res.data);
                        MatchvsLog.logI("http success:" + rsp);
                        callback.onMsg(rsp);
                    },
                    fail: function (res) {
                        MatchvsLog.logI("http fail:" + res.errMsg);
                        callback.onErr(0, res.errMsg);
                    }
                });
            }

            /**
             * HTTP GET
             * @param url {String} ex:"http://testpay.matchvs.com/wc3/submitOrder.do?key=fa"
             */
            this.get = function (url) {
                send(url, this.mCallback, false, null);
            };
            /**
             * HTTP POST
             * @param url {String} ex:"http://testpay.matchvs.com/wc3/submitOrder.do"
             * @param params {String} ex:"lorem=ipsum&name=binny";
             */
            this.post = function (url, params) {
                send(url, this.mCallback, true, params);
            };
        };
    }
    else {
        MatchvsNetWork = function MatchvsNetWork(host, callback) {
            var socket;
            var mCallBack = callback;
            var mHost = host;
            var bufQueue = [];
            this.send = function (message) {

                if (!window.WebSocket) {
                    return;
                }
                if (isIE()) {
                    var uint8A = new Uint8Array(message.buffer.byteLength);
                    for (var i = 0; i < uint8A.length; i++) {
                        uint8A[i] = (message.getUint8(i));
                    }
                    message = uint8A;
                }
                if (socket.readyState === WebSocket.OPEN) {
                    //log(message);
                    socket.send(message);
                } else {
                    bufQueue.push(message);
                }
            };
            this.close = function () {
                if (socket) {
                    socket.close();
                }
            };
            if (!window.WebSocket) {
                window.WebSocket = window.MozWebSocket;
            }

            if (window.WebSocket) {
                socket = new WebSocket(host);
                socket.hashcode = new Date().getMilliseconds();
                MatchvsLog.logI("try to create a socket:"+mHost +" socket is "+socket.hashcode );
                socket.onmessage = function (event) {
                    var reader = new FileReader();
                    reader.readAsArrayBuffer(event.data);
                    //  当读取操作成功完成时调用.
                    reader.onload = function (evt) {
                        if (evt.target.readyState === FileReader.DONE) {
                            var dataView = new DataView(reader.result);
                            mCallBack.onMsg(dataView);
                        } else {
                            mCallBack.onErr(1606, "[err]parse fail");
                        }

                    };

                };
                socket.onopen = function (event) {
                    MatchvsLog.logI("Create the socket is success :"+mHost+" socket is "+socket.hashcode );
                    while (bufQueue.length > 0) {
                        socket.send(bufQueue.pop());
                    }
                    mCallBack.onConnect && mCallBack.onConnect(mHost);

                };
                socket.onclose = function (e) {
                    mCallBack.onDisConnect && mCallBack.onDisConnect(mHost,e);
                    MatchvsLog.logI("socket on closed ,code:"+e.code+"(1000:NORMAL,1005:CLOSE_NO_STATUS,1006:RESET,1009:CLOSE_TOO_LARGE) msg:"+e.reason);
                };
                socket.onerror = function (event) {
                    MatchvsLog.logI("socket on error ,event:"+JSON.stringify(event));
                    mCallBack.onDisConnect && mCallBack.onDisConnect(mHost,event);
                };
            } else {
                alert("Not Support the WebSocket！");
            }

        };
        MatchvsHttp = function MatchvsHttp(callback) {
            this.mCallback = callback;

            function send(url, callback, isPost, params) {
                var http = new XMLHttpRequest();
                http.open(isPost ? "POST" : "GET", url, true);
                http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                http.onreadystatechange = function () {//Call a function when the state changes.
                    if (http.readyState === 4) {
                        if (http.status === 200) {
                            callback.onMsg(http.responseText);
                            MatchvsLog.logI("[HTTP:](" + url + ")+" + http.responseText);
                        } else {
                            callback.onErr(http.status, http.statusText);
                        }
                    }
                };
                if (isPost) {
                    http.send(params);
                } else {
                    http.send(null);
                }
            }

            /**
             * HTTP GET
             * @param url {String} ex:"http://testpay.matchvs.com/wc3/submitOrder.do?key=fa"
             */
            this.get = function (url) {
                send(url, this.mCallback, false, null);
            };
            /**
             * HTTP POST
             * @param url {String} ex:"http://testpay.matchvs.com/wc3/submitOrder.do"
             * @param params {String} ex:"lorem=ipsum&name=binny";
             */
            this.post = function (url, params) {
                send(url, this.mCallback, true, params);
            };
        };
    }
} catch (e) {
    console.warn("network adapter warning:"+e.message);
}



/* ================ matchvsprotocol.js ================= */
//================== CMD =======================
var MATCHVS_USER_GATEWAY_SPEED_REQ = 1001;
var MATCHVS_USER_GATEWAY_SPEED_RSP = 1002;
var MATCHVS_USER_LOGIN_REQ = 1101;
var MATCHVS_USER_LOGIN_RSP = 1102;
var MATCHVS_USER_HEARTBEAT_REQ = 1103;
var MATCHVS_USER_HEARTBEAT_RSP = 1103;
var MATCHVS_NOTICE_USER_RELOGIN = 1104;
var MATCHVS_USER_LOGOUT_REQ = 1105;
var MATCHVS_USER_LOGOUT_RSP = 1106;
var MATCHVS_NETWORK_STATE_NOTIFY = 1122;
var MATCHVS_ROOM_CREATE_REQ = 1203;
var MATCHVS_ROOM_CREATE_RSP = 1204;
var MATCHVS_ROOM_JOIN_REQ = 1201;
var MATCHVS_ROOM_JOIN_RSP = 1202;
var MATCHVS_ROOM_JOIN_OVER_REQ = 1213;
var MATCHVS_ROOM_JOIN_OVER_RSP = 1214;
var MATCHVS_ROOM_JOIN_OVER_NOTIFY = 1306;

var MATCHVS_ROOM_LEAVE_REQ = 1205;
var MATCHVS_ROOM_LEAVE_RSP = 1206;
var MATCHVS_ROOM_NOTICE_USER_JOIN = 1301;
var MATCHVS_ROOM_NOTICE_USER_LEAVE = 1302;



var MATCHVS_ROOM_CHECK_IN_REQ = 1401;
var MATCHVS_ROOM_CHECK_IN_RSP = 1402;
var MATCHVS_HEARTBEAT_HOTEL_REQ = 1403;
var MATCHVS_HEARTBEAT_HOTEL_RSP = 1404;
var MATCHVS_BROADCAST_HOTEL_REQ = 1405;
var MATCHVS_BROADCAST_HOTEL_RSP = 1406;
var MATCHVS_HOTEL_NOTIFY = 1408;
var MATCHVS_ROOM_CHECKIN_NOTIFY = 1410;


var CMD_GET_ROOM_LIST_REQ = 1207;
var CMD_GET_ROOM_LIST_RSP = 1208;

var CMD_GET_ROOM_DETAIL_REQ = 1209;
var CMD_GET_ROOM_DETAIL_RSP = 1210;

var CMD_GET_ROOM_LIST_EX_REQ = 1215;
var CMD_GET_ROOM_LIST_EX_RSP = 1216;

var CMD_SET_ROOM_PROPERTY_REQ = 1219;
var CMD_SET_ROOM_PROPERTY_RSP = 1220;
var CMD_SET_ROOM_PROPERTY_NOTIFY= 1307;


var CMD_DISCONNECT_REQ = 1107;
var CMD_DISCONNECT_RSP = 1108;
var CMD_KICK_PLAYER_REQ = 1303;
var CMD_KICK_PLAYER_RSP = 1304;
var CMD_KICK_PLAYER_NOTIFY = 1305;
var CMD_SUBSCRIBE_CMDID = 1411;
var CMD_SUBSCRIBE_ACK_CMDID = 1412;
var CMD_PUBLISH_CMDID = 1413;
var CMD_PUBLISH_ACKCMDID = 1414;
var CMD_PUBLISH_NOTIFYCMDID = 1416;

var CMD_SET_USE_TIMESTAMP_CMDID    = 1417;
var CMD_SET_USE_TIMESTAMPACK_CMDID = 1418;
var CMD_SET_FRAME_SYNCRATE_CMDID    = 1419;
var CMD_SET_FRAME_SYNCRATEACK_CMDID = 1420;
var CMD_SET_FRAME_SYNCRATENOTIFY_CMDID = 1422;
var CMD_FRAME_BROADCAST_CMDID    = 1423;
var CMD_FRAME_BROADCASTACK_CMDID = 1424;
var CMD_FRAME_DATANOTIFY_CMDID = 1426;
var CMD_FRAME_SYNCNOTIFY_CMDID = 1428;

var CMD_ROOM_JOIN_OPEN_REQ = 1221;
var CMD_ROOM_JOIN_OPEN_RSP = 1222;
var CMD_ROOM_JOIN_OPEN_NOT = 1308;



//================== CMD =======================
var FIXED_HEAD_SIZE = 16;
var VERSION = 2;


function Packet() {
    var header;//{MatchvsHeader}
    var payload;//*
    var buf;//{DataView}
}

function MatchvsHeader() {
    this.size = 0;
    this.seq = 0;
    this.cmd = 0;
    this.version = 0;
    this.userID = 0;
    this.toString = function () {
        return " this.size   " + this.size
            + " this.seq    " + this.seq
            + " this.cmd    " + this.cmd
            + " this.version" + this.version
            + " this.userID " + this.userID;
    };
}


function MatchvsProtoMap(){
    return MatchvsProtoMap.prototype;
}
var MsProtoMapDesc = new MatchvsProtoMap();
MsProtoMapDesc[MATCHVS_USER_LOGIN_RSP              ] = proto.stream.LoginRsp;
MsProtoMapDesc[MATCHVS_USER_LOGIN_RSP              ] = proto.stream.LoginRsp;
MsProtoMapDesc[MATCHVS_ROOM_JOIN_RSP               ] = proto.stream.JoinRoomRsp;
MsProtoMapDesc[MATCHVS_ROOM_CREATE_RSP             ] = proto.stream.CreateRoomRsp;
MsProtoMapDesc[MATCHVS_ROOM_CHECK_IN_RSP           ] = proto.stream.CheckInAck;
MsProtoMapDesc[MATCHVS_ROOM_CHECKIN_NOTIFY         ] = proto.stream.CheckInNotify;
MsProtoMapDesc[MATCHVS_ROOM_LEAVE_RSP              ] = proto.stream.LeaveRoomRsp;
MsProtoMapDesc[MATCHVS_ROOM_JOIN_OVER_RSP          ] = proto.stream.JoinOverRsp;
MsProtoMapDesc[MATCHVS_ROOM_NOTICE_USER_JOIN       ] = proto.stream.NoticeJoin;
MsProtoMapDesc[MATCHVS_ROOM_NOTICE_USER_LEAVE      ] = proto.stream.NoticeLeave;
MsProtoMapDesc[MATCHVS_HEARTBEAT_HOTEL_RSP         ] = proto.stream.HeartbeatAck;
MsProtoMapDesc[MATCHVS_BROADCAST_HOTEL_RSP         ] = proto.stream.BroadcastAck;
MsProtoMapDesc[MATCHVS_HOTEL_NOTIFY                ] = proto.stream.Notify;
MsProtoMapDesc[CMD_SUBSCRIBE_ACK_CMDID             ] = proto.stream.SubscribeAck;
MsProtoMapDesc[CMD_PUBLISH_ACKCMDID                ] = proto.stream.PublishAck;
MsProtoMapDesc[CMD_PUBLISH_NOTIFYCMDID             ] = proto.stream.PublishNotify;
//MsProtoMapDesc[MATCHVS_USER_GATEWAY_SPEED_RSP      ] = dataView;
MsProtoMapDesc[MATCHVS_USER_HEARTBEAT_RSP          ] = proto.stream.HeartbeatRsp;
MsProtoMapDesc[MATCHVS_USER_LOGOUT_RSP             ] = proto.stream.LogoutRsp;
MsProtoMapDesc[CMD_GET_ROOM_LIST_RSP               ] = proto.stream.GetRoomListRsp;
MsProtoMapDesc[CMD_DISCONNECT_RSP                  ] = proto.stream.DisconnectRsp;
MsProtoMapDesc[CMD_KICK_PLAYER_RSP                 ] = proto.stream.KickPlayerRsp;
MsProtoMapDesc[CMD_KICK_PLAYER_NOTIFY              ] = proto.stream.KickPlayerNotify;
MsProtoMapDesc[CMD_SET_FRAME_SYNCRATEACK_CMDID     ] = proto.stream.SetFrameSyncRateAck;
MsProtoMapDesc[CMD_SET_FRAME_SYNCRATENOTIFY_CMDID  ] = proto.stream.SetFrameSyncRateNotify;
MsProtoMapDesc[CMD_FRAME_BROADCASTACK_CMDID        ] = proto.stream.FrameBroadcastAck;
MsProtoMapDesc[CMD_FRAME_DATANOTIFY_CMDID          ] = proto.stream.FrameDataNotify;
MsProtoMapDesc[CMD_FRAME_SYNCNOTIFY_CMDID          ] = proto.stream.FrameSyncNotify;
MsProtoMapDesc[MATCHVS_NETWORK_STATE_NOTIFY        ] = proto.stream.NetworkStateNotify;
MsProtoMapDesc[CMD_GET_ROOM_LIST_EX_RSP            ] = proto.stream.GetRoomListExRsp;
MsProtoMapDesc[CMD_GET_ROOM_DETAIL_RSP             ] = proto.stream.GetRoomDetailRsp;
MsProtoMapDesc[MATCHVS_ROOM_JOIN_OVER_NOTIFY       ] = proto.stream.JoinOverNotify;
MsProtoMapDesc[CMD_SET_ROOM_PROPERTY_RSP           ] = proto.stream.SetRoomPropertyRsp;
MsProtoMapDesc[CMD_SET_ROOM_PROPERTY_NOTIFY        ] = proto.stream.NoticeRoomProperty;
MsProtoMapDesc[CMD_ROOM_JOIN_OPEN_RSP              ] = proto.stream.JoinOpenRsp;
MsProtoMapDesc[CMD_ROOM_JOIN_OPEN_NOT              ] = proto.stream.JoinOpenNotify;


/**
 * Encoder && Decoder
 * @constructor
 */
function MatchvsProtocol() {

    this.seq = 1;
    var mUserID = 0;
    this.msProtoMap = new MatchvsProtoMap();

    /**
     *
     * @param dataArray uint array
     * @param cmd int
     * @returns {DataView}
     */
    this.fillHeader = function (dataArray, cmd) {
        var buffer = new ArrayBuffer(FIXED_HEAD_SIZE + dataArray.length);
        var dataView = new DataView(buffer);
        dataView.setInt32(0, buffer.byteLength, true);//size; +4
        dataView.setInt32(4, this.seq++, true);//seq +4
        dataView.setInt16(8, cmd, true);//cmd; +2
        dataView.setInt16(10, VERSION, true);//version +2
        dataView.setInt32(12, Number(mUserID), true);//userID +4

        var length = dataArray.length;
        //append unsigned int Array to end
        for (var i = 0; i < length; i++) {
            dataView.setUint8(i + FIXED_HEAD_SIZE, dataArray[i]);
        }
        return dataView;
    };
    /**
     *
     * @param msg {DataView}
     * @returns {MatchvsHeader}
     */
    this.parseHeader = function (msg) {
        var dataView = msg;
        var head = new MatchvsHeader();
        head.size = dataView.getInt32(0, true);//size; +4
        head.seq = dataView.getInt32(4, true);//seq +4
        head.cmd = dataView.getInt16(8, true);//cmd; +2
        head.version = dataView.getInt16(10, true);//version +2
        head.userID = dataView.getInt32(12, true);//userID +4
        return head;
    };
    /**
     *
     * @param msg {DataView}
     * @returns {*}
     */
    this.handleMsg = function (msg) {

        var dataView = msg;
        var header = this.parseHeader(msg);
        var ext = new Uint8Array(header.size - FIXED_HEAD_SIZE);
        for (var i = 0; i < ext.length; i++) {
            ext[i] = msg.getUint8(FIXED_HEAD_SIZE + i);
        }
        // var protoMap = this.msProtoMap.getValue(header.cmd);
        var protoMap = MsProtoMapDesc[header.cmd];
        var packet = new Packet();
        packet.header = header;
        packet.buf = dataView;
        if (protoMap){
            packet.payload = protoMap.deserializeBinary && protoMap.deserializeBinary(msg.buffer.slice(FIXED_HEAD_SIZE,msg.buffer.byteLength));
        }else{
            MatchvsLog.logI("[WARN]unknown msg,Head:" + header);
        }
        return packet;
    };
    this.init = function () {

    };

    /**
     * 登录
     * @userID {uint32} value 用户ID
     * @userToken {uint64} value 用户的token值
     * @gameID {uint32} value 游戏ID
     * @gameVersion {uint16} value  游戏版本
     * @app_key { !Array.<string> } app_key 游戏key,通过官网注册获得
     * @app_secret { !Array.<string>  app_secret 游戏secret，通过官网注册获得
     * @deviceID { !Array.<string> } deviceID 设备ID
     * @gateway_id gateway_id
     * @returns {DataView}
     */
    this.login = function (userID, userToken, gameID, gameVersion,
        app_key, app_secret, deviceID, gateway_id) {
        var toMd5 = format("%s&UserID=%s&GameID=%s&VersionSdk=%d&%s",
            app_key, userID, gameID, VERSION, app_secret);
        mUserID = userID;
        var md5 = hex_md5(toMd5);
        MatchvsLog.logI("[Sign]" + toMd5 + "->" + md5);
        var message = new proto.stream.LoginReq();
        message.setGameid(Number(gameID));
        message.setAppkey(app_key);
        message.setDeviceid(deviceID);
        message.setSign(md5);
        var dataArray =message.serializeBinary();
        //append binary head and proto buffer;
        MatchvsLog.logI("[REQ]login...userID:" + userID);
        return this.fillHeader(dataArray, MATCHVS_USER_LOGIN_REQ);
    };
    /**
     * 用户网关速度暂时不使用
     * @userID {uint32} value 用户ID
     * @gameID {uint32} value 游戏ID
     * @userToken {uint64} value 用户的token值
     * @versionSDK {uint16} value sdk版本号
     * @gameVersion {uint16} value  游戏版本
     * @returns {DataView}
     */
    this.speed = function (userID, gameID, userToken, versionSDK, gameVersion) {

        var buffer = new ArrayBuffer(48 + 1);
        var dataView = new DataView(buffer);
        var _user = Number(userID);
        var _gameID = Number(gameID);
        dataView.setUint32(0, _user, true);//userID
        dataView.setUint32(4, _gameID, true);//gameID
        for (var i = 0; i < 32; i++) {
            dataView.setUint8(8 + i, userToken.charCodeAt(i));//token
        }
        dataView.setUint16(8 + 32, versionSDK, true);//version sdk
        dataView.setUint16(8 + 32 + 2, gameVersion, true);//game version
        dataView.setUint32(8 + 32 + 2 + 2, 1, true);//echo size
        dataView.setUint8(8 + 32 + 2 + 2 + 4, 0x01);//echo

        var array = new Uint8Array(dataView.byteLength);
        for (var j = 0; j < dataView.byteLength; j++) {
            array[j] = dataView.getUint8(j);
        }
        //append binary head and proto buffer;
        return this.fillHeader(array, MATCHVS_USER_GATEWAY_SPEED_REQ);
    };
    this.roomCreate = function (maxUser, flag, gameID, pRoomInfo, pPlayInfo) {

        var message = new proto.stream.CreateRoom();
        message.setGameid(Number(gameID));


        var pi = new proto.stream.PlayerInfo();
        pi.setUserid(pPlayInfo.userID);
        pi.setUserprofile(stringToUtf8ByteArray(pPlayInfo.userProfile));
        message.setPlayerinfo(pi);

        var roomInfo = new proto.stream.RoomInfo();
        roomInfo.setMaxplayer(Number(pRoomInfo.maxPlayer));
        roomInfo.setCanwatch(pRoomInfo.canWatch);
        roomInfo.setMode(pRoomInfo.mode);
        roomInfo.setVisibility(pRoomInfo.visibility);
        roomInfo.setRoomname(pRoomInfo.roomName);
        roomInfo.setRoomproperty(stringToUtf8ByteArray(pRoomInfo.roomProperty));
        message.setRoominfo(roomInfo);

        var bytes = message.serializeBinary();
        return this.fillHeader(bytes, MATCHVS_ROOM_CREATE_REQ);
    };

    this.joinRandomRoom = function (roomJoin) {
        var message = new proto.stream.JoinRoomReq();
        message.setGameid(Number(roomJoin.gameID));
        message.setJointype(proto.stream.JoinRoomType.JOINRANDOMROOM);
        message.setCpproto(stringToUtf8ByteArray(roomJoin.userProfile));

        var playInfo = new proto.stream.PlayerInfo();
        playInfo.setUserid(roomJoin.userID);
        playInfo.setUserprofile(stringToUtf8ByteArray(roomJoin.userProfile));
        message.setPlayerinfo(playInfo);

        var roomInfo = new proto.stream.RoomInfo();
        roomInfo.setMaxplayer(roomJoin.maxPlayer);
        roomInfo.setCanwatch(roomJoin.canWatch);
        roomInfo.setMode(roomJoin.mode);
        roomInfo.setVisibility(0);
        message.setRoominfo(roomInfo);

        var bytes = message.serializeBinary();
        return this.fillHeader(bytes, MATCHVS_ROOM_JOIN_REQ);

    };

    /**
     * 加入指定房间roomID
     * @param roomJoin
     * @returns {DataView}
     */
    this.joinRoomSpecial = function (roomJoin) {
        var message = new proto.stream.JoinRoomReq();
        message.setGameid(Number(roomJoin.gameID));
        message.setJointype(roomJoin.joinType);
        message.setCpproto(stringToUtf8ByteArray(roomJoin.userProfile));

        var playInfo = new proto.stream.PlayerInfo();
        playInfo.setUserid(roomJoin.userID);
        playInfo.setUserprofile(stringToUtf8ByteArray(roomJoin.userProfile));
        message.setPlayerinfo(playInfo);

        var roomInfo = new proto.stream.RoomInfo();
        roomInfo.setMaxplayer(roomJoin.maxPlayer);
        roomInfo.setCanwatch(roomJoin.canWatch);
        roomInfo.setMode(roomJoin.mode);
        roomInfo.setVisibility(0);
        roomInfo.setRoomid(roomJoin.roomID);
        message.setRoominfo(roomInfo);

        var bytes = message.serializeBinary();
        return this.fillHeader(bytes, MATCHVS_ROOM_JOIN_REQ);

    };

    /**
     * 属性加入房间
     * @param roomJoin {MsRoomJoin}
     * @returns {DataView}
     */
    this.joinRoomWithProperties = function (roomJoin) {
        var message = new proto.stream.JoinRoomReq();
        var kvtags = [];
        var temp = roomJoin.tags;
        var num = 0;
        for(var k in temp){
            var tag = new proto.stream.keyValue();
            tag.setKey(k);
            tag.setValue(temp[k]);
            kvtags[num++] = tag;
        }
        message.setTagsList(kvtags);
        message.setGameid(roomJoin.gameID);
        message.setJointype(proto.stream.JoinRoomType.JOINROOMWITHPROPERTY);
        message.setCpproto(stringToUtf8ByteArray(roomJoin.userProfile));

        var playInfo = new proto.stream.PlayerInfo();
        playInfo.setUserid(roomJoin.userID);
        playInfo.setUserprofile(stringToUtf8ByteArray(roomJoin.userProfile));
        message.setPlayerinfo(playInfo);

        var roomInfo = new proto.stream.RoomInfo();
        roomInfo.setMaxplayer(roomJoin.maxPlayer);
        roomInfo.setCanwatch(roomJoin.canWatch);
        roomInfo.setMode(roomJoin.mode);
        roomInfo.setVisibility(0);
        roomInfo.setRoomid(roomJoin.roomID);
        message.setRoominfo(roomInfo);

        var bytes = message.serializeBinary();
        return this.fillHeader(bytes, MATCHVS_ROOM_JOIN_REQ);

    };

    this.roomCheckIn = function (bookInfo,roomInfo,userID,gameID) {
        var pkg = new proto.stream.CheckIn();
        pkg.setGameid(Number(gameID));
        pkg.setRoomid(roomInfo.getRoomid());
        pkg.setUserid(Number(userID));
        pkg.setBookid(bookInfo.getBookid());
        pkg.setKey(bookInfo.getBookkey());
        var bytes = pkg.serializeBinary();
        return this.fillHeader(bytes, MATCHVS_ROOM_CHECK_IN_REQ);

    };
    this.getRoomList = function (gameID,filter) {
        var pkg = new proto.stream.GetRoomList();
        var roomFilter = new proto.stream.RoomFilter();
        roomFilter.setCanwatch(filter.canWatch);
        roomFilter.setMaxplayer(filter.maxPlayer);
        roomFilter.setMode(Number(filter.mode));
        roomFilter.setRoomproperty(stringToUtf8ByteArray(filter.roomProperty));
        pkg.setGameid(gameID);
        pkg.setRoomfilter(roomFilter);
        var bytes = pkg.serializeBinary();
        return this.fillHeader(bytes, CMD_GET_ROOM_LIST_REQ);

    };

    /**
     * 获取房间信息扩展接口
     * @param gameID {number}
     * @param filter {MsRoomFilterEx}
     */
    this.getRoomListEx = function (gameID,filter) {
        var pkg = new proto.stream.GetRoomListExReq();
        var roomFilter = new proto.stream.RoomFilter();
        roomFilter.setMaxplayer(filter.maxPlayer);
        roomFilter.setMode(Number(filter.mode));
        roomFilter.setFull(filter.full);
        roomFilter.setCanwatch(filter.canWatch);
        roomFilter.setRoomproperty(stringToUtf8ByteArray(filter.roomProperty));
        roomFilter.setState(filter.state);

        pkg.setGameid(gameID);
        pkg.setRoomfilter(roomFilter);
        pkg.setSort(filter.sort);
        pkg.setOrder(filter.order);
        pkg.setPageno(filter.pageNo);
        pkg.setPagesize(filter.pageSize);

        var bytes = pkg.serializeBinary();
        return this.fillHeader(bytes, CMD_GET_ROOM_LIST_EX_REQ);
    };

    /**
     *
     * @param gameID {number}
     * @param roomID {string}
     */
    this.getRoomDetail = function (gameID, roomID) {
        var pkg = new proto.stream.GetRoomDetailReq();

        pkg.setGameid(gameID);
        pkg.setRoomid(roomID);

        var bytes = pkg.serializeBinary();
        return this.fillHeader(bytes,CMD_GET_ROOM_DETAIL_REQ);
    };

    this.joinOver = function (gameID,roomID,cpproto,userID) {

        var pkg = new proto.stream.JoinOverReq();
        pkg.setGameid(gameID);
        pkg.setRoomid(roomID);
        pkg.setCpproto(cpproto);
        pkg.setUserid(userID);
        var bytes = pkg.serializeBinary();
        return this.fillHeader(bytes, MATCHVS_ROOM_JOIN_OVER_REQ);
    };
    this.leaveRoom = function (gameID,userID,roomID,cpproto) {

        var pkg = new proto.stream.LeaveRoomReq();
        pkg.setGameid(gameID);
        pkg.setUserid(userID);
        pkg.setRoomid(roomID);
        pkg.setCpproto(stringToUtf8ByteArray(cpproto));
        var bytes = pkg.serializeBinary();
        return this.fillHeader(bytes, MATCHVS_ROOM_LEAVE_REQ);
    };

}


/**
 * message PlayerInfo
 *{
 *    uint32 userID = 1;
 *    bytes userProfile = 2;
 *}
 * @param userID uint32
 * @param userProfile bytes
 * @constructor
 */
function PlayerInfo(userID, userProfile) {
    this.userID = userID;
    this.userProfile = userProfile;
}

/**
 * message RoomInfo
 *{
 *    uint64 roomID = 1;
 *    string roomName = 2;
 *    uint32 maxPlayer = 3;
 *    int32 mode = 4;
 *    int32 canWatch = 5;
 *    int32 visibility = 6;
 *    bytes roomProperty = 7;
 *    uint32 owner = 8;
 *}
 * @param roomID
 * @param roomName
 * @param maxPlayer
 * @param mode
 * @param canWatch
 * @param visibility
 * @param roomProperty
 * @param owner
 * @constructor
 */
function RoomInfo(roomID, roomName, maxPlayer, mode, canWatch, visibility, roomProperty, owner) {
    this.roomID = roomID;
    this.roomName = roomName;
    this.maxPlayer = maxPlayer;
    this.mode = mode;
    this.canWatch = canWatch;
    this.visibility = visibility;
    this.roomProperty = roomProperty;
    this.owner = owner;
}
/**
 * 心跳
 * @gameID {uint32} value 游戏ID
 * @roomID {string} value 房间ID
 * @returns {DataView}
 */
MatchvsProtocol.prototype.heartBeat = function (gameID,roomID) {
    var pkg = new proto.stream.HeartbeatReq();
    pkg.setGameid(gameID);
    pkg.setRoomid(roomID);
    var dataArray = pkg.serializeBinary();
    return this.fillHeader(dataArray, MATCHVS_USER_HEARTBEAT_REQ);
};


/**
 * 注销账号
 * @param  cpProto {string}
 * @returns {DataView}
 */
MatchvsProtocol.prototype.logout = function (cpProto) {
    var buf = stringToUtf8ByteArray(cpProto);
    return this.fillHeader(buf, MATCHVS_USER_LOGOUT_REQ);
};
/**
 * file describe : this file include some Submodule control of MatchvsProtocol in matchvsprotocol.js
 */

/**
 * 发送数据
 * @destType   { number } value : number 0-包含destUids  1-排除destUids
 * @destUids   {!Array<number>} value : 玩家ID集合 [1,2,3,4,5]
 * @roomID     { number } value : 房间号
 * @msgType    { number } value : 0-客户端+not CPS  1-not客户端+ CPS   2-客户端 + CPS
 * @data       { string } value : cp 数据
 */
MatchvsProtocol.prototype.broadCast = function (roomID, destUids, destType, msgType, data) {
    var broadcast = new proto.stream.Broadcast();
    broadcast.setRoomid(roomID);
    broadcast.setDstuidsList(destUids);
    broadcast.setCpproto(data); //cp 数据

    // 低8位 由 0-3  | destType |msgType 组合 0000|00|00
    var priority = 2;
    var flag =  ((priority&0x0F)<<4 )+ ((destType&0x03)<<2) + (msgType&0x03);
    broadcast.setFlag(flag);
    var bytes = broadcast.serializeBinary();
    return this.fillHeader(bytes, MATCHVS_BROADCAST_HOTEL_REQ);
};

/**
 * 玩家订阅或取消订阅一批groups，（支持批量和同时订阅和取消），支持同事订阅和取消订阅，
 * 是因为游戏角色从一个区域跨越到另一个区域时需要这种原子切换
 * @gameID {uint32} value 游戏ID
 * @roomID {uint64} value 房间号
 * @confirms {!Array.<string>} value  要订阅的分组集合
 * @cancels {!Array.<string>} value  要取消的分组集合
 */
MatchvsProtocol.prototype.subscribeEventGroup = function (gameID, roomID, confirms, cancels) {
    var subscribe = new proto.stream.Subscribe();
    subscribe.setRoomid(roomID);
    subscribe.setGameid(gameID);
    subscribe.setCancelsList(cancels);
    subscribe.setConfirmsList(confirms);
    var bytes = subscribe.serializeBinary();
    return this.fillHeader(bytes, CMD_SUBSCRIBE_CMDID);
};


/**
 *
 * @userID { number } value 用户ID
 * @roomID { number } value 房间号
 * @priority { number } value
 * @groups { !Array.<string> } value
 * @cpproto { !Array.<string> } value
 */
MatchvsProtocol.prototype.sendEventGroup = function (userID, roomID, priority, groups, cpproto) {
    var sendevnt = new proto.stream.Publish();
    sendevnt.setRoomid(roomID);
    sendevnt.setPriority(priority);
    sendevnt.setCpproto(stringToUtf8ByteArray(cpproto));
    sendevnt.setGroupsList(groups);

    var bytes = sendevnt.serializeBinary();
    return this.fillHeader(bytes, CMD_PUBLISH_CMDID);
};



/**
 *
 * @userID { number } value 游戏ID
 * @gameID { number } value 房间号
 * @roomID { number } value  要订阅的分组集合
 * @userID { !Array.<string> } value
 */
MatchvsProtocol.prototype.hotelHeartBeat = function (gameID, roomID, userID) {
    var heartbeat = new proto.stream.Heartbeat();
    heartbeat.setGameid(gameID);
    heartbeat.setRoomid(roomID);
    heartbeat.setUserid(userID);

    var bytes = heartbeat.serializeBinary();
    return this.fillHeader(bytes, MATCHVS_HEARTBEAT_HOTEL_REQ);
};


MatchvsProtocol.prototype.disConnect = function (userID,gameID,roomId) {
    var paker = new proto.stream.DisconnectReq;
    paker.setGameid(gameID);
    paker.setRoomid(roomId);
    paker.setUserid(userID);
    var bytes = paker.serializeBinary();
    return this.fillHeader(bytes, CMD_DISCONNECT_REQ);
    //TODO 扩展接口
};

/**
 * 剔除用户
 * @param userid {number} 发起踢人操作者
 * @param srcUserId {number} 被踢除者
 * @param roomid {string} 房间号
 * @param data {string} 附带的消息
 */
MatchvsProtocol.prototype.kickPlayer =  function (userid, srcUserId, roomid, data) {
    var kick = new proto.stream.KickPlayer;
    kick.setRoomid(roomid);
    kick.setSrcuserid(srcUserId);
    kick.setUserid(userid);
    kick.setCpproto(stringToUtf8ByteArray(data));
    var bytes = kick.serializeBinary();
    return this.fillHeader(bytes,CMD_KICK_PLAYER_REQ);
};
/**
 *
 * @param frameRate {number} 同步帧速率
 * @param roomID {String} 房间ID
 * @param gameID {number}
 * @param priority {number} default is 0
 * @param frameidx {number} must > 0
 * @returns {DataView}
 */
MatchvsProtocol.prototype.setFrameSync =  function (frameRate,roomID,gameID,priority,frameidx) {
    var reqEx = new proto.stream.SetFrameSyncRate();
    reqEx.setGameid(gameID);
    reqEx.setRoomid(roomID);
    reqEx.setPriority(priority);
    reqEx.setFramerate(frameRate);
    reqEx.setFrameidx(frameidx);
    var bytes = reqEx.serializeBinary();
    return this.fillHeader(bytes,CMD_SET_FRAME_SYNCRATE_CMDID);
};
/**
 *
 * @param roomID {String} 房间ID
 * @param priority {number} default is 0
 * @param cpProto {String} Payload
 * @returns {DataView}
 */
MatchvsProtocol.prototype.sendFrameEvent =  function (roomID,priority,cpProto) {
    var reqEx = new proto.stream.FrameBroadcast();
    reqEx.setRoomid(roomID);
    reqEx.setPriority(priority);
    reqEx.setCpproto(stringToUtf8ByteArray(cpProto));
    var bytes = reqEx.serializeBinary();
    return this.fillHeader(bytes,CMD_FRAME_BROADCAST_CMDID);
};

MatchvsProtocol.prototype.setRoomProperty = function (gameID, userID, roomID, roomProperty) {
    var reqEx = new proto.stream.SetRoomPropertyReq();
    reqEx.setGameid(gameID);
    reqEx.setRoomid(roomID);
    reqEx.setUserid(userID);
    reqEx.setRoomproperty(stringToUtf8ByteArray(roomProperty));
    var bytes = reqEx.serializeBinary();
    return this.fillHeader(bytes,CMD_SET_ROOM_PROPERTY_REQ);
};

MatchvsProtocol.prototype.joinOpen = function (gameID, userID, roomID, cpProto) {
    var reqEx = new proto.stream.JoinOpenReq();
    reqEx.setRoomid(roomID);
    reqEx.setGameid(gameID);
    reqEx.setUserid(userID);
    reqEx.setCpproto(stringToUtf8ByteArray(cpProto));
    var bytes = reqEx.serializeBinary();
    return this.fillHeader(bytes,CMD_ROOM_JOIN_OPEN_REQ);
};/* ================ matchvs.js ================= */
var M_ENGINE;

function MatchvsEngine() {
    M_ENGINE = this;
    this.mChannel = "MatchVS";
    this.mPlatform = "release";
    this.mMsPubArgs = new MsPublicMemberArgs();
    this.mEngineState = ENGE_STATE.NONE;
    this.mAllPlayers = [];
    this.mRecntRoomID = 0;
    this.mUserListForJoinRoomRsp = [];  //加入房间收到回调，等checkin成后作为调用joinRoomResponse参数
    this.joinRoomNotifyInfo = null;     //加入房间收到回调，等checkinNotify成后作为调用joinRoomNotify参数

    this.mNetWork = null;
    this.mHotelNetWork = null;
    this.mBookInfo = null;
    this.mHotelHeartBeatTimer = null;
    this.mProtocol = new MatchvsProtocol();

    var NetWorkCallBackImp = function (engine) {
        MSExtend(this, MatchvsNetWork);
        var lastTime = new Date().getTime();
        var timer;
        var frameCache = [];
        this.onMsg = function (dataView) {
            var time = new Date().getTime();
            var message = time - lastTime;
            if (message > 10) {
            }
            lastTime = time;

            var packet = engine.mProtocol.handleMsg(dataView);
            var roomInfo = new proto.stream.RoomInfo();
            if (packet && packet.header) {
            }
            switch (packet.header.cmd) {
            case MATCHVS_USER_LOGIN_RSP:
                if (packet.payload.getStatus() === 200) {
                    engine.mEngineState |= ENGE_STATE.HAVE_LOGIN;
                } else {
                    engine.mEngineState &= ~ENGE_STATE.LOGINING;
                    engine.mEngineState &= ~ENGE_STATE.RECONNECTING;
                    engine.mRsp.errorResponse && engine.mRsp.errorResponse(packet.payload.getStatus(), "Login is fail,Server Response Error");
                }
                engine.mEngineState &= ~ENGE_STATE.LOGINING;
                engine.mRecntRoomID = packet.payload.getRoomid();
                if (((engine.mEngineState & ENGE_STATE.RECONNECTING) === ENGE_STATE.RECONNECTING)) {
                    if (engine.mRecntRoomID !== "0") {
                        var roomJoin = new MsRoomJoin(MsEnum.JoinRoomType.reconnect, engine.mMsPubArgs.userID,
                            engine.mRecntRoomID, engine.mMsPubArgs.gameID, 0, 0, 0, "reconnect", [{name: "MatchVS"}]);
                        var reconbuf = engine.mProtocol && engine.mProtocol.joinRoomSpecial(roomJoin);
                        engine.mNetWork && engine.mNetWork.send(reconbuf);
                    } else {
                        engine.mEngineState &= ~ENGE_STATE.RECONNECTING;
                        //201 重连成功但是不在房间
                        engine.mRsp.reconnectResponse && engine.mRsp.reconnectResponse(201, null, null);
                    }

                } else {
                    engine.mRsp.loginResponse(new MsLoginRsp(packet.payload.getStatus(), engine.mRecntRoomID));
                }
                break;
            case MATCHVS_ROOM_JOIN_RSP:
                if (packet.payload.getStatus() === 200) {
                    engine.mEngineState |= ENGE_STATE.IN_ROOM;
                    engine.mBookInfo = packet.payload.getBookinfo();
                    engine.mRoomInfo = packet.payload.getRoominfo();
                    engine.mUserListForJoinRoomRsp = packet.payload.getUsersList();
                    HttpConf.HOST_HOTEL_ADDR = getHotelUrl(engine);
                    engine.mHotelNetWork = new MatchvsNetWork(HttpConf.HOST_HOTEL_ADDR, engine.mNetWorkCallBackImp);
                    engine.mNetWorkCallBackImp.onConnect = function (host) {
                        engine.roomCheckIn(engine.mHotelNetWork, engine.mBookInfo, engine.mRoomInfo);
                        engine.mRsp.onConnect && engine.mRsp.onConnect(host);
                    };
                    if (engine.mHotelHeartBeatTimer == null) {
                        engine.mHotelHeartBeatTimer = setInterval(engine.hotelHeartBeat, HEART_BEAT_INTERVAL);
                    }
                } else {
                    engine.mEngineState &= ~ENGE_STATE.JOIN_ROOMING;
                    engine.mEngineState &= ~ENGE_STATE.RECONNECTING;
                    engine.mRsp.errorResponse && engine.mRsp.errorResponse(packet.payload.getStatus(), "Server Response Error");
                    engine.mRsp.joinRoomResponse && engine.mRsp.joinRoomResponse(packet.payload.getStatus(), null, null);
                }
                break;
            case MATCHVS_ROOM_CREATE_RSP:
                if (packet.payload.getStatus() === 200) {
                    engine.mEngineState |= ENGE_STATE.IN_ROOM;
                    engine.mBookInfo = packet.payload.getBookinfo();
                    var roomid = packet.payload.getRoomid();
                    roomInfo.setRoomid(roomid);
                    roomInfo.setOwner(packet.payload.getOwner());
                    engine.mRoomInfo = roomInfo;
                    HttpConf.HOST_HOTEL_ADDR = getHotelUrl(engine);
                    engine.mHotelNetWork = new MatchvsNetWork(HttpConf.HOST_HOTEL_ADDR, engine.mNetWorkCallBackImp);
                    engine.mNetWorkCallBackImp.onConnect = function (host) {
                        engine.roomCheckIn(engine.mHotelNetWork, engine.mBookInfo, engine.mRoomInfo);
                        engine.mRsp.onConnect && engine.mRsp.onConnect(host);
                    };
                    if (engine.mHotelHeartBeatTimer == null) {
                        engine.mHotelHeartBeatTimer = setInterval(engine.hotelHeartBeat, HEART_BEAT_INTERVAL);
                    }
                } else {
                    engine.mEngineState &= ~ENGE_STATE.CREATEROOM;
                    engine.mRsp.errorResponse && engine.mRsp.errorResponse(packet.payload.getStatus(), "Server Response Error");
                }
                break;
            case MATCHVS_ROOM_CHECK_IN_RSP: {
                if (packet.payload.getStatus() !== 200) {
                    engine.mRsp.errorResponse && engine.mRsp.errorResponse(packet.payload.getStatus(), "Server Response Error");
                }
                engine.mAllPlayers = packet.payload.getCheckinsList();//checkins;
                var roomUserList = [];
                engine.mUserListForJoinRoomRsp.forEach(function (user) {
                    var roomuser = new MsRoomUserInfo(user.getUserid(), utf8ByteArrayToString(user.getUserprofile()));
                    roomUserList.push(roomuser);
                });
                //房间信息
                var roominfo = new MsRoomInfo(engine.mRoomInfo.getRoomid(), utf8ByteArrayToString(engine.mRoomInfo.getRoomproperty()), engine.mRoomInfo.getOwner());

                if ((engine.mEngineState & ENGE_STATE.CREATEROOM) === ENGE_STATE.CREATEROOM) {
                    //创建房间
                    engine.mEngineState &= ~ENGE_STATE.CREATEROOM;
                    engine.mRsp.createRoomResponse && engine.mRsp.createRoomResponse(new MsCreateRoomRsp(packet.payload.getStatus(), engine.mRoomInfo.getRoomid(), engine.mRoomInfo.getOwner()));
                } else if ((engine.mEngineState & ENGE_STATE.JOIN_ROOMING) === ENGE_STATE.JOIN_ROOMING) {
                    //加入房间
                    engine.mEngineState &= ~ENGE_STATE.JOIN_ROOMING;
                    engine.mRsp.joinRoomResponse && engine.mRsp.joinRoomResponse(packet.payload.getStatus(), roomUserList, roominfo);
                } else if ((engine.mEngineState & ENGE_STATE.RECONNECTING) === ENGE_STATE.RECONNECTING) {
                    engine.mEngineState &= ~ENGE_STATE.RECONNECTING;
                    engine.mRsp.reconnectResponse && engine.mRsp.reconnectResponse(packet.payload.getStatus(), roomUserList, roominfo);
                }
            }
                break;
            case MATCHVS_ROOM_CHECKIN_NOTIFY:
                if (engine.joinRoomNotifyInfo) {
                    engine.mRsp.joinRoomNotify && engine.mRsp.joinRoomNotify(engine.joinRoomNotifyInfo);
                }
                engine.mAllPlayers = packet.payload.getCheckinsList();
                engine.mRsp.roomCheckInNotify && engine.mRsp.roomCheckInNotify(new MsCheckInNotify(packet.payload.getUserid(), packet.payload.getCheckinsList(), packet.payload.getPlayersList(), packet.payload.getMaxplayers()));
                engine.joinRoomNotifyInfo = null;
                break;
            case MATCHVS_ROOM_LEAVE_RSP:
                //退出房间状态取消
                engine.mEngineState &= ~ENGE_STATE.LEAVE_ROOMING;
                if (packet.payload.getStatus() !== 200) {
                    engine.mRsp.errorResponse && engine.mRsp.errorResponse(packet.payload.getStatus(), "Server Response Error");
                }
                roomInfo.setRoomid("0");
                engine.mRoomInfo = roomInfo;
                var leaveRoomRsp = new MsLeaveRoomRsp(packet.payload.getStatus(), packet.payload.getRoomid(), packet.payload.getUserid(), packet.payload.getCpproto());
                engine.mRsp.leaveRoomResponse && engine.mRsp.leaveRoomResponse(leaveRoomRsp);
                engine.mEngineState &= ~ENGE_STATE.IN_ROOM;
                break;
            case MATCHVS_ROOM_JOIN_OVER_RSP:
                if (packet.payload.getStatus() !== 200) {
                    engine.mRsp.errorResponse && engine.mRsp.errorResponse(packet.payload.getStatus(), "Server Response Error");
                }
                engine.mRsp.joinOverResponse && engine.mRsp.joinOverResponse(new MsJoinOverRsp(packet.payload.getStatus(), utf8ByteArrayToString(packet.payload.getCpproto())));
                break;
            case MATCHVS_ROOM_NOTICE_USER_JOIN:
                engine.joinRoomNotifyInfo = new MsRoomUserInfo(packet.payload.getUser().getUserid(), utf8ByteArrayToString(packet.payload.getUser().getUserprofile()));
                break;
            case MATCHVS_ROOM_NOTICE_USER_LEAVE:
                var leaveRoomInfo = new MsLeaveRoomNotify(packet.payload.getRoomid(), packet.payload.getUserid(), packet.payload.getOwner(), utf8ByteArrayToString(packet.payload.getCpproto()));
                engine.mRsp.leaveRoomNotify && engine.mRsp.leaveRoomNotify(leaveRoomInfo);
                break;
            case MATCHVS_HEARTBEAT_HOTEL_RSP:
                //房间的心跳返回
                engine.mRsp.hotelHeartBeatRsp && engine.mRsp.hotelHeartBeatRsp(packet.payload.getStatus());
                MatchvsLog.logI("hotelHeartBeatRsp");
                break;
            case MATCHVS_BROADCAST_HOTEL_RSP:
                if (packet.payload.getStatus() !== 200) {
                    engine.mRsp.errorResponse && engine.mRsp.errorResponse(packet.payload.getStatus(), "Server Response Error");
                }
                engine.mRsp.sendEventResponse && engine.mRsp.sendEventResponse(new MsSendEventRsp(packet.payload.getStatus(), packet.header.seq));
                break;
            case MATCHVS_HOTEL_NOTIFY:
                var srcUserID = packet.payload.getSrcuid();
                if (srcUserID === 0) {
                    engine.mRsp.gameServerNotify && engine.mRsp.gameServerNotify(new MsGameServerNotifyInfo(packet.payload.getSrcuid(), utf8ByteArrayToString(packet.payload.getCpproto())));
                } else {
                    engine.mRsp.sendEventNotify && engine.mRsp.sendEventNotify(new MsSendEventNotify(packet.payload.getSrcuid(), utf8ByteArrayToString(packet.payload.getCpproto())));
                }
                break;
            case CMD_SUBSCRIBE_ACK_CMDID://MATCHVS_SUBSCRIBE_EVENT_GROUP_RSP:
                engine.mRsp.subscribeEventGroupResponse && engine.mRsp.subscribeEventGroupResponse(packet.payload.getStatus(), packet.payload.getGroupsList());
                break;
            case CMD_PUBLISH_ACKCMDID://MATCHVS_SEND_EVENT_GROUP_RSP:
                engine.mRsp.sendEventGroupResponse && engine.mRsp.sendEventGroupResponse(packet.payload.getStatus(), packet.payload.getDstnum());
                break;
            case CMD_PUBLISH_NOTIFYCMDID://SEND_EVENT_GROUP_NOTIFY:
                engine.mRsp.sendEventGroupNotify && engine.mRsp.sendEventGroupNotify(packet.payload.getSrcuid(), packet.payload.getGroupsList(), utf8ByteArrayToString(packet.payload.getCpproto()));
                break;
            case MATCHVS_USER_GATEWAY_SPEED_RSP:
                var status = packet.payload.getStatus();
                var seq = packet.payload.getSeq();
                engine.mRsp.gatewaySpeedResponse && engine.mRsp.gatewaySpeedResponse(new MsGatewaySpeedResponse(status, seq));
                break;
            case MATCHVS_USER_HEARTBEAT_RSP:
                var gameid = packet.payload.getGameid();
                var gsExist = packet.payload.getGsexist();
                //如果心跳存在视为已登录状态
                engine.mEngineState |= ENGE_STATE.HAVE_LOGIN;
                engine.mRsp.heartBeatResponse && engine.mRsp.heartBeatResponse(new MsHeartBeatResponse(gameid, gsExist));
                MatchvsLog.logI("gatewayHeartBeatResponse");
                break;
            case MATCHVS_USER_LOGOUT_RSP:
                engine.mNetWork.close();
                engine.mRsp.logoutResponse && engine.mRsp.logoutResponse(packet.payload.getStatus());
                break;
            case MATCHVS_NETWORK_STATE_NOTIFY:
                engine.mRsp.networkStateNotify && engine.mRsp.networkStateNotify(new MsNetworkStateNotify(
                    packet.payload.getRoomid(),
                    packet.payload.getUserid(),
                    packet.payload.getState(),
                    packet.payload.getOwner()
                ));
                break;
            case CMD_GET_ROOM_LIST_RSP:
                var roominfolist = packet.payload.getRoominfoList();
                var roomList = [];
                for (var i = 0; i < roominfolist.length; i++) {
                    roomList[i] = new MsRoomInfoEx(roominfolist[i].getRoomid(),
                        roominfolist[i].getRoomname(),
                        roominfolist[i].getMaxplayer(),
                        roominfolist[i].getMode(),
                        roominfolist[i].getCanwatch(),
                        utf8ByteArrayToString(roominfolist[i].getRoomproperty()));
                }
                engine.mRsp.getRoomListResponse && engine.mRsp.getRoomListResponse(packet.payload.getStatus(), roomList);
                break;
            case CMD_DISCONNECT_RSP:
                engine.mRsp.disConnectResponse && engine.mRsp.disConnectResponse(packet.payload.getStatus());
                break;
            case CMD_KICK_PLAYER_RSP:
                engine.mRsp.kickPlayerResponse && engine.mRsp.kickPlayerResponse(new MsKickPlayerRsp(packet.payload.getStatus(), packet.payload.getOwner(), packet.payload.getUserid()));
                break;
            case CMD_KICK_PLAYER_NOTIFY:
                if (packet.payload.getUserid().toString() === (""+engine.mUserID) && engine.mHotelHeartBeatTimer != null) {
                    clearInterval(engine.mHotelHeartBeatTimer);
                    engine.mHotelHeartBeatTimer = null;
                    engine.mEngineState &= ~ENGE_STATE.IN_ROOM;
                    engine.mEngineState |= ENGE_STATE.HAVE_LOGIN;
                    engine.mHotelNetWork.close();
                }
                engine.mRsp.kickPlayerNotify && engine.mRsp.kickPlayerNotify(
                    new MsKickPlayerNotify(packet.payload.getUserid(),
                        packet.payload.getSrcuserid(),
                        utf8ByteArrayToString(packet.payload.getCpproto()),
                        packet.payload.getOwner()
                    ));
                break;
            case CMD_SET_FRAME_SYNCRATEACK_CMDID:
                MatchvsLog.logI("SetFrameSyncRateAck:" + packet.payload);
                engine.mRsp.setFrameSyncResponse && engine.mRsp.setFrameSyncResponse(
                    new MsSetChannelFrameSyncRsp(packet.payload.getStatus()));
                break;
            case CMD_SET_FRAME_SYNCRATENOTIFY_CMDID:
                //MatchvsLog.logI("SetFrameSyncRateNotify:"+packet.payload);
                break;
            case CMD_FRAME_BROADCASTACK_CMDID:
                //MatchvsLog.logI("FrameBroadcastAck:"+packet.payload);
                engine.mRsp.sendFrameEventResponse && engine.mRsp.sendFrameEventResponse(
                    new MsSendFrameEventRsp(packet.payload.getStatus())
                );
                break;
            case CMD_FRAME_DATANOTIFY_CMDID:
                //MatchvsLog.logI("FrameDataNotify:"+packet.payload);
                frameCache.push(new MsFrameItem(packet.payload.getSrcuid(), utf8ByteArrayToString(packet.payload.getCpproto()), packet.payload.getTimestamp()));
                break;
            case CMD_FRAME_SYNCNOTIFY_CMDID:
                //MatchvsLog.logI("FrameSyncNotify:"+packet.payload);
                var frameData = [];
                while (frameCache.length > 0) {
                    frameData.push(frameCache.pop());
                }
                var msFrameData = new MsFrameData(packet.payload.getLastidx(), frameData, frameData.length);
                engine.mRsp.frameUpdate && engine.mRsp.frameUpdate(msFrameData);
                break;
            case CMD_GET_ROOM_LIST_EX_RSP:
                var roomInfoList = packet.payload.getRoominfoexList();
                var roomAttrs = [];
                roomInfoList.forEach(function (roominfo) {
                    var roomAttr = new MsRoomAttribute(
                        roominfo.getRoomid(),
                        roominfo.getRoomname(),
                        roominfo.getMaxplayer(),
                        roominfo.getGameplayer(),
                        roominfo.getWatchplayer(),
                        roominfo.getMode(),
                        roominfo.getCanwatch(),
                        utf8ByteArrayToString(roominfo.getRoomproperty()),
                        roominfo.getOwner(),
                        roominfo.getState(),
                        roominfo.getCreatetime().toString()
                    );
                    roomAttrs.push(roomAttr);
                });

                var roomListExInfo = new MsGetRoomListExRsp(
                    packet.payload.getStatus(),
                    packet.payload.getTotal(),
                    roomAttrs
                );
                engine.mRsp.getRoomListExResponse && engine.mRsp.getRoomListExResponse(roomListExInfo);
                break;
            case CMD_GET_ROOM_DETAIL_RSP:
                if (packet.payload.getStatus() !== 200) {
                    engine.mRsp.getRoomDetailResponse && engine.mRsp.getRoomDetailResponse(new MsGetRoomDetailRsp(packet.payload.getStatus()));
                    engine.mRsp.errorResponse && engine.mRsp.errorResponse(packet.payload.getStatus(), "Server error");
                }
                var roomDetail = packet.payload.getRoomdetail();
                var userInfos = [];
                var playerlist = roomDetail.getPlayerinfosList();
                playerlist.forEach(function (player) {
                    var userinfo = new MsRoomUserInfo(player.getUserid(), utf8ByteArrayToString(player.getUserprofile()));
                    userInfos.push(userinfo);
                });
                var roomDetailRsp = new MsGetRoomDetailRsp(
                    packet.payload.getStatus(),
                    roomDetail.getState(),
                    roomDetail.getMaxplayer(),
                    roomDetail.getMode(),
                    roomDetail.getCanwatch(),
                    utf8ByteArrayToString(roomDetail.getRoomproperty()),
                    roomDetail.getOwner(),
                    roomDetail.getCreateflag(),
                    userInfos
                );
                engine.mRsp.getRoomDetailResponse && engine.mRsp.getRoomDetailResponse(roomDetailRsp);
                break;
            case MATCHVS_ROOM_JOIN_OVER_NOTIFY:
                var joinoverNotifyInfo = new MsJoinOverNotifyInfo(
                    packet.payload.getRoomid(),
                    packet.payload.getSrcuserid(),
                    utf8ByteArrayToString(packet.payload.getCpproto())
                );
                engine.mRsp.joinOverNotify && engine.mRsp.joinOverNotify(joinoverNotifyInfo);
                break;
            case CMD_SET_ROOM_PROPERTY_RSP:
                if (packet.payload.getStatus() !== 200) {
                    engine.errorResponse && engine.errorResponse(packet.payload.getStatus(), "Server response error");
                }
                engine.mRsp.setRoomPropertyResponse && engine.mRsp.setRoomPropertyResponse(new MsSetRoomPropertyRspInfo(
                    packet.payload.getStatus(),
                    packet.payload.getRoomid(),
                    packet.payload.getUserid(),
                    utf8ByteArrayToString(packet.payload.getRoomproperty())
                ));
                break;
            case CMD_SET_ROOM_PROPERTY_NOTIFY:
                engine.mRsp.setRoomPropertyNotify && engine.mRsp.setRoomPropertyNotify(new MsRoomPropertyNotifyInfo(
                    packet.payload.getRoomid(),
                    packet.payload.getUserid(),
                    utf8ByteArrayToString(packet.payload.getRoomproperty())
                ));
                break;
            case CMD_ROOM_JOIN_OPEN_RSP:
                engine.mRsp.joinOpenResponse && engine.mRsp.joinOpenResponse(new MsReopenRoomResponse(
                    packet.payload.getStatus(),
                    utf8ByteArrayToString(packet.payload.getCpproto())
                ));
                break;
            case CMD_ROOM_JOIN_OPEN_NOT:
                engine.mRsp.joinOpenNotify && engine.mRsp.joinOpenNotify(new MsReopenRoomNotify(
                    packet.payload.getRoomid(),
                    packet.payload.getUserid(),
                    utf8ByteArrayToString(packet.payload.getCpproto())
                ));
                break;
            default:
                break;
            }

        };
        this.onErr = function (errCode, errMsg) {
            engine.mRsp.errorResponse && engine.mRsp.errorResponse(errCode, errMsg);
        };
        this.onConnect = function (host) {
            engine.mRsp.onConnect && engine.mRsp.onConnect(host);
            timer = setInterval(engine.heartBeat, HEART_BEAT_INTERVAL);

        };
        this.onDisConnect = function (host,event) {
            engine.mRsp.onDisConnect && engine.mRsp.onDisConnect(host);
            if (host.endsWith(HttpConf.HOST_GATWAY_ADDR)) {
                if ((engine.mEngineState & ENGE_STATE.LOGOUTING) !== ENGE_STATE.LOGOUTING) {
                    //如果gateway 异常断开连接了就返回错误消息
                    if (event&&event.code&&(event.code===1000||event.code===1005)){
                        MatchvsLog.logI("gateway close is friend");
                    } else{
                        engine.mRsp.errorResponse && engine.mRsp.errorResponse(1001, "gateway network error");
                    }
                }
                engine.mEngineState = ENGE_STATE.NONE;
                engine.mEngineState |= ENGE_STATE.HAVE_INIT;
                MatchvsLog.logI("EngineState",engine.mEngineState);
                clearInterval(timer);
            } else if (host.endsWith(HttpConf.HOST_HOTEL_ADDR)) {
                MatchvsLog.logI("hotel disconnect");
                if ((engine.mEngineState & ENGE_STATE.LEAVE_ROOMING) !== ENGE_STATE.LEAVE_ROOMING) {
                    //针对，如果直接退出房间，没有调用 leaveRoom接口
                    if (event&&event.code&&(event.code===1000||event.code===1005)){
                        MatchvsLog.logI("hotel close is friend");
                    } else{
                        engine.mRsp.errorResponse && engine.mRsp.errorResponse(1001, "hotel network error");
                    }
                }
                //如果房间服务器断开了(包括异常断开情况)就把定时器关掉
                if (engine.mHotelHeartBeatTimer != null) {
                    clearInterval(engine.mHotelHeartBeatTimer);
                    engine.mHotelHeartBeatTimer = null;
                }
                //退出房间状态取消
                engine.mEngineState &= ~ENGE_STATE.LEAVE_ROOMING;
                engine.mEngineState &= ~ENGE_STATE.IN_ROOM;
            }
        };
    };
    this.init = function (response, channel, platform, gameID) {
        this.mRsp = response;
        this.mChannel = channel;
        this.mPlatform = platform;
        this.mGameID = gameID;
        this.mMsPubArgs.channel = channel;
        this.mMsPubArgs.platform = platform;
        this.mEngineState = ENGE_STATE.INITING;
        this.mProtocol.init();
        this.getHostList();
        return 0;
    };


    this.reconnect = function () {
        if ((this.mEngineState & ENGE_STATE.HAVE_INIT) !== ENGE_STATE.HAVE_INIT) return -2;
        if ((this.mEngineState & ENGE_STATE.RECONNECTING) === ENGE_STATE.RECONNECTING) return -9;

        if (this.mRecntRoomID !== "0" && (this.mEngineState & ENGE_STATE.HAVE_LOGIN) === ENGE_STATE.HAVE_LOGIN) {
            this.mEngineState |= ENGE_STATE.RECONNECTING;
            var roomJoin = new MsRoomJoin(MsEnum.JoinRoomType.reconnect, this.mMsPubArgs.userID,
                this.mRecntRoomID, this.mMsPubArgs.gameID, 0, 0, 0, "reconnect", [{name: "MatchVS"}]);
            var buf = this.mProtocol.joinRoomSpecial(roomJoin);
            this.mNetWork.send(buf);
            this.mRecntRoomID = "0";
            return 0;
        }

        if (undefined === this.mMsPubArgs.gameID || undefined === this.mMsPubArgs.secretKey || undefined === this.mMsPubArgs.appKey) {
            return -1;
        }
        if ((this.mEngineState & ENGE_STATE.HAVE_LOGIN) === ENGE_STATE.HAVE_LOGIN) return -6;
        if (!(undefined === this.mNetWork || null === this.mNetWork)) {
            this.mNetWork.close();
        }
        //登录状态
        this.mEngineState |= ENGE_STATE.LOGINING;
        //重连状态
        this.mEngineState |= ENGE_STATE.RECONNECTING;
        this.mNetWorkCallBackImp = new NetWorkCallBackImp(this);
        this.mNetWork = new MatchvsNetWork(HttpConf.HOST_GATWAY_ADDR, this.mNetWorkCallBackImp);
        var loginbuf = this.mProtocol.login(this.mMsPubArgs.userID, this.mMsPubArgs.token, this.mMsPubArgs.gameID,
            this.mMsPubArgs.gameVersion, this.mMsPubArgs.appKey, this.mMsPubArgs.secretKey,
            this.mMsPubArgs.deviceID, this.mMsPubArgs.gatewayID);
        this.mNetWork.send(loginbuf);

        return 0;
    };

    /**
     * 登录
     * @pUserID {uint32} value 用户ID
     * @pToken {uint64} value 用户的token值
     * @pGameID {uint32} pGameID 游戏ID
     * @pGameVersion {uint16} value  游戏版本
     * @pAppKey { !Array.<string> } app_key 游戏key,通过官网注册获得
     * @pSecretKey pSecretKey 游戏secret，通过官网注册获得
     * @pDeviceID { !Array.<string> } deviceID 设备ID
     * @pGatewayID pGatewayID
     */
    this.login = function (userID, token, pGameID, pGameVersion, pAppKey, pSecretKey, deviceID, gatewayID) {
        if ((this.mEngineState & ENGE_STATE.HAVE_INIT) !== ENGE_STATE.HAVE_INIT) return -2;       //未初始化
        if ((this.mEngineState & ENGE_STATE.INITING) === ENGE_STATE.INITING) return -3;           //正在初始化
        if ((this.mEngineState & ENGE_STATE.LOGINING) === ENGE_STATE.LOGINING) return -5;           //正在登录
        if ((this.mEngineState & ENGE_STATE.HAVE_LOGIN) === ENGE_STATE.HAVE_LOGIN) return -6;     // 已经登录，请勿重复登录
        if ((this.mEngineState & ENGE_STATE.LOGOUTING) === ENGE_STATE.LOGOUTING) return -11;       // 正在登出

        if (!(undefined === this.mNetWork || null === this.mNetWork)) {
            this.mNetWork.close();
        }
        this.mNetWorkCallBackImp = new NetWorkCallBackImp(this);
        this.mNetWork = new MatchvsNetWork(HttpConf.HOST_GATWAY_ADDR, this.mNetWorkCallBackImp);
        this.mUserID = userID;
        this.mToken = token;
        this.mGameID = pGameID;
        this.mGameVersion = pGameVersion;
        this.mAppKey = pAppKey;
        this.mMsPubArgs.userID = userID;
        this.mMsPubArgs.token = token;
        this.mMsPubArgs.gameID = pGameID;
        this.mMsPubArgs.gameVersion = pGameVersion;
        this.mMsPubArgs.appKey = pAppKey;
        this.mMsPubArgs.deviceID = deviceID;
        this.mMsPubArgs.gatewayID = gatewayID;
        this.mMsPubArgs.secretKey = pSecretKey;
        var buf = this.mProtocol.login(userID, token, pGameID, pGameVersion, pAppKey, pSecretKey, deviceID, gatewayID);
        this.mEngineState |= ENGE_STATE.LOGINING;
        this.mNetWork.send(buf);
        MatchvsLog.logI("login,userID"+userID+", token:"+token);
        return 0;
    };
    /**
     * 用户网关速度，暂时先不使用
     */

    this.speed = function () {
        if ((this.mEngineState & ENGE_STATE.HAVE_LOGIN) !== ENGE_STATE.HAVE_LOGIN) {
            return -4;//未登录
        }
        var buf = this.mProtocol.speed(this.mUserID, this.mGameID,
            this.mToken, VERSION, this.mGameVersion);
        this.mNetWork.send(buf);
        return 0;
    };

    /**
     *
     * @param createRoomInfo {MsCreateRoomInfo}
     * @param userProfile
     * @returns {number}
     */
    this.createRoom = function (createRoomInfo, userProfile) {
        var ret = commEngineStateCheck(this.mEngineState, this.mEngineState, 2);
        if (ret !== 0) return ret;
        if (userProfile.length > 512) return -21;
        var roomInfo = new RoomInfo(0
            , createRoomInfo.roomName
            , createRoomInfo.maxPlayer
            , createRoomInfo.mode
            , createRoomInfo.canWatch
            , createRoomInfo.visibility
            , createRoomInfo.roomProperty
            , 0);
        var playInfo = new PlayerInfo(this.mUserID, userProfile);
        var buf = this.mProtocol.roomCreate(createRoomInfo.maxPlayer, 0, this.mGameID, roomInfo, playInfo);
        if (buf.byteLength > 1024 || userProfile.length > 512) return -21;
        this.mEngineState |= ENGE_STATE.CREATEROOM;//设置用户正在创建房间
        this.mNetWork.send(buf);
        MatchvsLog.logI("create room");
        return 0;
    };
    this.getVersion = function () {
        return "MatchVS-SDK-JS_v1.3.0.beta.201805016";
    };

    this.uninit = function () {
        this.mEngineState = ENGE_STATE.NONE;
        MatchvsLog.logI("unInit ");
        return 0;
    };

    /**
     * getRoomList
     * @param filter {MsRoomFilter}
     */
    this.getRoomList = function (filter) {
        var ret = commEngineStateCheck(this.mEngineState, this.mEngineState, 2);
        if (ret !== 0) return ret;
        var buf = this.mProtocol.getRoomList(this.mGameID, filter);
        if (buf.byteLength > 1024) return -21;
        this.mNetWork.send(buf);
        return 0;
    };
    /**
     * create a connect to room service and check in
     * @param hotelNetWork {MatchvsNetWork} a connection for Hotel
     * @param bookInfo {Object}bookInfo
     * @param roomInfo {Object}roomInfo
     */
    this.roomCheckIn = function (hotelNetWork, bookInfo, roomInfo) {
        var buf = this.mProtocol.roomCheckIn(bookInfo, roomInfo, this.mUserID, this.mGameID);
        hotelNetWork.send(buf);
        return 0;
    };
    /**
     * int joinRandomRoom(int iMaxPlayer, const MsString userProfile);
     */
    this.joinRandomRoom = function (maxPlayer, userProfile) {
        var ret = commEngineStateCheck(this.mEngineState, this.mEngineState, 2);
        if (ret !== 0) return ret;
        if (maxPlayer > MVSCONFIG.MAXPLAYER_LIMIT || maxPlayer <= 0) return -20;
        if (userProfile.length > 512) return -21;
        var roomJoin = new MsRoomJoin(MsEnum.JoinRoomType.joinRandomRoom, this.mUserID,
            0, this.mGameID, maxPlayer, 0, 0,
            userProfile, [{name: "matchvs"}]);
        var buf = this.mProtocol.joinRandomRoom(roomJoin);
        this.mEngineState |= ENGE_STATE.JOIN_ROOMING;
        this.mNetWork.send(buf);
        return 0;
    };

    /**
     *
     * @param matchinfo {MsMatchInfo}
     * @param userProfile {string}
     * @returns {number}
     */
    this.joinRoomWithProperties = function (matchinfo, userProfile) {
        var ret = commEngineStateCheck(this.mEngineState, this.mEngineState, 2);
        if (ret !== 0) return ret;
        if (userProfile.length > 512) return -21;
        if (typeof matchinfo !== "object") return -1;
        if (typeof userProfile !== "string") return -1;
        var roomJoin = new MsRoomJoin(MsEnum.JoinRoomType.joinRoomWithProperty, this.mUserID,
            1, this.mGameID, matchinfo.maxPlayer, matchinfo.mode, matchinfo.canWatch, userProfile, matchinfo.tags);
        var buf = this.mProtocol.joinRoomWithProperties(roomJoin);
        this.mEngineState |= ENGE_STATE.JOIN_ROOMING;
        this.mNetWork.send(buf);
        return 0;
    };

    /**
     *
     * @param roomID {string}
     * @param userProfile {string}
     * @returns {number}
     */
    this.joinRoom = function (roomID, userProfile) {
        var ret = commEngineStateCheck(this.mEngineState, this.mEngineState, 2);
        if (ret !== 0) return ret;
        if (!(/^[0-9]+$/.test(roomID))) return -1;//判断必须是全为数字
        var roomId = String(roomID).trim();
        if (0 === roomId || roomId === "") return -1;
        var roomJoin = new MsRoomJoin(MsEnum.JoinRoomType.joinSpecialRoom, this.mUserID,
            roomID, this.mGameID, 0, 0, 0, userProfile, [{name: "MatchVS"}]);
        var buf = this.mProtocol.joinRoomSpecial(roomJoin);
        this.mEngineState |= ENGE_STATE.JOIN_ROOMING;
        this.mNetWork.send(buf);
        MatchvsLog.logI("join room");
        return 0;
    };

    /**
     *
     * @param cpProto {string}
     * @returns {number}
     */
    this.joinOver = function (cpProto) {
        var ret = commEngineStateCheck(this.mEngineState, this.mEngineState, 1);
        if (ret !== 0) return ret;
        var buf = this.mProtocol.joinOver(this.mGameID, this.mRoomInfo.getRoomid(), stringToUtf8ByteArray(cpProto), this.mUserID);
        if (buf.byteLength > 1024) return -21;
        this.mNetWork.send(buf);
        return 0;
    };

    /**
     *
     * @param cpProto {string}
     * @returns {number}
     */
    this.leaveRoom = function (cpProto) {
        var ret = commEngineStateCheck(this.mEngineState, this.mEngineState, 3);
        if (ret !== 0) return ret;
        var roomid = this.mRecntRoomID;
        if (this.mRoomInfo && this.mRoomInfo.getRoomid) {
            roomid = this.mRoomInfo.getRoomid();
        }
        var buf = this.mProtocol.leaveRoom(this.mGameID, this.mUserID, roomid, cpProto);
        this.mNetWork.send(buf);
        //设置为正在退出房间
        this.mEngineState |= ENGE_STATE.LEAVE_ROOMING;
        if (this.mHotelNetWork) {
            this.mHotelNetWork.close();
        }
        MatchvsLog.logI("leaveRoom");
        return 0;
    };
    /**
     *
     * @param userID {number} 被剔除者userID
     * @param cpProto {string}
     * @returns {number} 0 成功，1失败
     */
    this.kickPlayer = function (userID, cpProto) {
        var ret = commEngineStateCheck(this.mEngineState, this.mEngineState, 1);
        if (ret !== 0) return ret;
        var buf = this.mProtocol.kickPlayer(userID, this.mUserID, this.mRoomInfo.getRoomid(), cpProto);
        if (buf.byteLength > 1024) return -21;
        this.mNetWork.send(buf);
        return 0;
    };

    /**
     *
     * @param frameRate ex:10/s . = 0 is off,>0 is on.
     * @returns {number}
     */
    this.setFrameSync = function (frameRate) {
        var ret = commEngineStateCheck(this.mEngineState, this.mEngineState, 1);
        if (ret !== 0) return ret;
        if (frameRate > 20 || frameRate < 0) return -20;
        var buf = this.mProtocol.setFrameSync(Number(frameRate), this.mRoomInfo.getRoomid(), this.mGameID, 0, 1);
        this.mHotelNetWork.send(buf);
        return 0;
    };

    /**
     *
     * @param cpProto {String} payload
     * @returns {number}
     */
    this.sendFrameEvent = function (cpProto) {
        var ret = commEngineStateCheck(this.mEngineState, this.mEngineState, 1);
        if (ret !== 0) return ret;
        if (cpProto.length > 1024) return -21;
        var buf = this.mProtocol.sendFrameEvent(this.mRoomInfo.getRoomid(), 0, cpProto);
        this.mHotelNetWork.send(buf);
        return 0;
    };

    this.joinOpen = function (cpProto) {
        var ret = commEngineStateCheck(this.mEngineState, this.mEngineState, 1);
        if (ret !== 0) return ret;
        var buf = this.mProtocol.joinOpen(this.mGameID, this.mUserID, this.mRoomInfo.getRoomid(), cpProto);
        this.mNetWork.send(buf);
        return 0;
    };

}

function MatchvsResponse() {

    /**
     *
     * @param userInfo {MsRegistRsp}
     */
    this.registerUserResponse = function (userInfo) {

    };
    /**
     *
     * @param loginRsp {MsLoginRsp}
     */
    this.loginResponse = function (loginRsp) {

    };
    /**
     * MsLogoutRsp
     * @param status {number}
     */
    this.logoutResponse = function (status) {

    };
    /**
     *
     * @param rsp {MsCreateRoomRsp}
     */
    this.createRoomResponse = function (rsp) {

    };

    /**
     *
     * @param status {number}
     * @param roomInfos {Array<MsRoomInfoEx>}
     */
    this.getRoomListResponse = function (status, roomInfos) {

    };
    /**
     *
     * @param status
     * @param roomUserInfoList
     * @param roomInfo
     */
    this.joinRoomResponse = function (status, roomUserInfoList, roomInfo) {

    };
    /**
     * message NoticeJoin
     *{
     *    PlayerInfo user = 1;
     *}
     * message PlayerInfo
     *{
     *    uint32 userID = 1;
     *    bytes userProfile = 2;
     *}
     * @param roomUserInfo {MsRoomUserInfo}
     */
    this.joinRoomNotify = function (roomUserInfo) {

    };
    /**
     * message NoticeLeave
     *{
     *    uint32 userID = 1;
     *    uint64 roomID = 2;
     *    uint32 owner = 3;
     *}
     * @type rsp {NoticeLeave}
     */
    this.joinOverResponse = function (rsp) {

    };

    /**
     *
     * @param notifyInfo {MsJoinOverNotifyInfo}
     */
    this.joinOverNotify = function (notifyInfo) {

    };


    /**
     * message LeaveRoomRsp
     *{
     *    ErrorCode status = 1;//200.成功 | 403.房间关闭 | 404.房间不存在 | 500.服务器错误
     *    uint64 roomID = 2;
     *    uint32 userID = 3;
     *    bytes cpProto = 4;
     *}
     * @param rsp {LeaveRoomRsp}
     */
    this.leaveRoomResponse = function (rsp) {

    };
    /**
     *
     * @param leaveRoomInfo {MsLeaveRoomNotify}
     */
    this.leaveRoomNotify = function (leaveRoomInfo) {

    };
    /**
     * MsKickPlayerRsp
     * @param rsp {MsKickPlayerRsp}
     */
    this.kickPlayerResponse = function (rsp) {

    };
    /**
     *
     * @param notify {MsKickPlayerNotify}
     */
    this.kickPlayerNotify = function (notify) {

    };
    /**
     *
     * @param rsp {MsSendEventRsp}
     */
    this.sendEventResponse = function (rsp) {

    };
    /**
     *
     * @param tRsp {MsSendEventNotify}
     */
    this.sendEventNotify = function (tRsp) {

    };
    /**
     *
     * @param tRsp {MsGameServerNotifyInfo}
     */
    this.gameServerNotify = function (tRsp) {

    };
    /**
     *
     * @param errCode {Number}
     * @param errMsg {string}
     */
    this.errorResponse = function (errCode, errMsg) {

    };
    /**
     * status==200 is success.other is fail;
     * @param status {int}
     */
    this.initResponse = function (status) {

    };
    /**
     *
     * @param int
     */
    // this.networkDelay = function (delay) {
    //
    // };
    /**
     *
     * @param notify{MsNetworkStateNotify}
     */
    this.networkStateNotify = function (notify) {

    };
    /**
     *
     * @param status {number}
     * @param groups {Array<string>}
     */
    this.subscribeEventGroupResponse = function (status, groups) {

    };

    /**
     *
     * @param status {number}
     * @param dstNum {number}
     */
    this.sendEventGroupResponse = function (status, dstNum) {

    };
    /**
     *
     * @param srcUid {number}
     * @param groups {Array<string>}
     * @param cpProto {string}
     */
    this.sendEventGroupNotify = function (srcUid, groups, cpProto) {

    };
    /**
     *
     * @param rsp {MsSetChannelFrameSyncRsp}
     */
    this.setFrameSyncResponse = function (rsp) {

    };
    /**
     *
     * @param rsp {MsSendFrameEventRsp}
     */
    this.sendFrameEventResponse = function (rsp) {

    };
    /**
     *
     * @param data {MsFrameData}
     */
    this.frameUpdate = function (data) {

    };
    /**
     *
     * @param data {number}
     */
    this.hotelHeartBeatRsp = function (data) {

    };

    /**
     *
     * @param rsp {MsGatewaySpeedResponse}
     */
    this.gatewaySpeedResponse = function (rsp) {

    };

    /**
     *
     * @param rsp
     */
    this.heartBeatResponse = function (rsp) {

    };

    /**
     *
     * @param rsp
     */
    this.roomCheckInNotify = function (rsp) {

    };

    /**
     * 主动断开网络接口回调
     * @param rep
     */
    this.disConnectResponse = function (rep) {

    };

    /**
     * 获取房间详细信息回调
     * @param rsp {MsGetRoomDetailRsp}
     */
    this.getRoomDetailResponse = function (rsp) {
    };

    /**
     * 获取房间扩展信息返回
     * @param rsp {MsGetRoomListExRsp}
     */
    this.getRoomListExResponse = function (rsp) {

    };

    /**
     *
     * @param rsp {MsSetRoomPropertyRspInfo}
     */
    this.setRoomPropertyResponse = function (rsp) {

    };

    /**
     *
     * @param notify
     */
    this.setRoomPropertyNotify = function (notify) {

    };


    /**
     *
     * @param status
     * @param roomUserInfoList
     * @param roomInfo
     */
    this.reconnectResponse = function (status, roomUserInfoList, roomInfo) {
    };

    this.joinOpenNotify = function (rsp) {
    };
    this.joinOpenResponse = function (notify) {
    };
}

/**
 * 注销登录
 * @param cpProto {string}
 * @returns {number}
 */
MatchvsEngine.prototype.logout = function (cpProto) {

    if ((this.mEngineState & ENGE_STATE.HAVE_LOGIN) !== ENGE_STATE.HAVE_LOGIN) return -4;
    if ((this.mEngineState & ENGE_STATE.IN_ROOM) === ENGE_STATE.IN_ROOM) {
        this.mEngineState |= ENGE_STATE.LEAVE_ROOMING;
        this.leaveRoom("user logout");
        this.mHotelNetWork && this.mHotelNetWork.close();
    }
    var buf = this.mProtocol.logout(cpProto);
    this.mEngineState |= ENGE_STATE.LOGOUTING;
    this.mNetWork.send(buf);
    return 0;
};

/**
 * 心跳
 */
MatchvsEngine.prototype.heartBeat = function () {
    var Instance = M_ENGINE;
    if (Instance.mGameID === undefined || Instance.mGameID === "" || Instance.mGameID === 0) {
        return;
    }
    var roomID;
    if (Instance.mRoomInfo === undefined) {
        roomID = 0;
    } else {
        roomID = Instance.mRoomInfo.getRoomid();
    }
    var buf = Instance.mProtocol.heartBeat(Instance.mGameID, roomID);
    Instance.mNetWork.send(buf);
    MatchvsLog.logI("gateway heartBeat");
};


/**
 * 发送数据
 * @destType    : number 0-包含destUids  1-排除destUids
 * @destUids    : 玩家ID集合 [1,2,3,4,5]
 * @roomID      : 房间号
 * @msgType     : 0-客户端+not CPS  1-not客户端+ CPS   2-客户端 + CPS
 * @data        : cp 数据
 */
MatchvsEngine.prototype.sendEvent = function (data) {
    if ((this.mEngineState & ENGE_STATE.HAVE_INIT) !== ENGE_STATE.HAVE_INIT) return {
        sequence: this.mProtocol.seq - 1,
        result: -2
    };//未初始化
    if ((this.mEngineState & ENGE_STATE.HAVE_LOGIN) !== ENGE_STATE.HAVE_LOGIN) return {
        sequence: this.mProtocol.seq - 1,
        result: -4
    };//未登录
    if ((this.mEngineState & ENGE_STATE.IN_ROOM) !== ENGE_STATE.IN_ROOM) return {
        sequence: this.mProtocol.seq - 1,
        result: -6
    };   //没有进入房间
    if ((this.mEngineState & ENGE_STATE.INITING) === ENGE_STATE.INITING) return {
        sequence: this.mProtocol.seq - 1,
        result: -3
    };//正在初始化
    if ((this.mEngineState & ENGE_STATE.CREATEROOM) === ENGE_STATE.CREATEROOM) return {
        sequence: this.mProtocol.seq - 1,
        result: -7
    };//在创建房间
    if ((this.mEngineState & ENGE_STATE.JOIN_ROOMING) === ENGE_STATE.JOIN_ROOMING) return {
        sequence: this.mProtocol.seq - 1,
        result: -7
    };//正在加入房间
    if (typeof data !== "string") return {sequence: this.mProtocol.seq - 1, result: -1};

    var destType = 0;
    var msgType = 0;
    var userids = [];
    var num = 0;
    for (var i = 0; i < this.mAllPlayers.length; i++) {
        if (this.mAllPlayers[i] !== parseInt(this.mUserID)) {
            userids[num++] = this.mAllPlayers[i];
        }
    }
    if (userids.length > MVSCONFIG.MAXPLAYER_LIMIT) return -20;
    var buf = this.mProtocol.broadCast(this.mRoomInfo.getRoomid(), userids, destType, msgType, stringToUtf8ByteArray(data));
    if (buf.byteLength > 1024) return -21;
    this.mHotelNetWork.send(buf);
    // this.mProtocol.seq-1 因为发送后会加1所以需要减1
    return {sequence: this.mProtocol.seq - 1, result: 0};
};

/**
 * 扩展消息发送
 * @param msgType
 * @param data
 * @param desttype
 * @param userids
 * @returns {*}
 */
MatchvsEngine.prototype.sendEventEx = function (msgType, data, desttype, userids) {
    if ((this.mEngineState & ENGE_STATE.HAVE_INIT) !== ENGE_STATE.HAVE_INIT) return {
        sequence: this.mProtocol.seq - 1,
        result: -2
    };//未初始化
    if ((this.mEngineState & ENGE_STATE.HAVE_LOGIN) !== ENGE_STATE.HAVE_LOGIN) return {
        sequence: this.mProtocol.seq - 1,
        result: -4
    };//未登录
    if ((this.mEngineState & ENGE_STATE.IN_ROOM) !== ENGE_STATE.IN_ROOM) return {
        sequence: this.mProtocol.seq - 1,
        result: -6
    };   //没有进入房间
    if ((this.mEngineState & ENGE_STATE.INITING) === ENGE_STATE.INITING) return {
        sequence: this.mProtocol.seq - 1,
        result: -3
    };//正在初始化
    if ((this.mEngineState & ENGE_STATE.CREATEROOM) === ENGE_STATE.CREATEROOM) return {
        sequence: this.mProtocol.seq - 1,
        result: -7
    };//在创建房间
    if ((this.mEngineState & ENGE_STATE.JOIN_ROOMING) === ENGE_STATE.JOIN_ROOMING) return {
        sequence: this.mProtocol.seq - 1,
        result: -7
    };//正在加入房间
    if (typeof data !== "string") return {sequence: this.mProtocol.seq - 1, result: -1};
    if (!(msgType === 0 || msgType === 1 || msgType === 2)) return {sequence: this.mProtocol.seq - 1, result: -23};
    if (!(desttype === 0 || desttype === 1)) return {sequence: this.mProtocol.seq - 1, result: -24};

    var buf = this.mProtocol.broadCast(this.mRoomInfo.getRoomid(), userids, desttype, msgType, stringToUtf8ByteArray(data));
    if (data.length > 1024) return -21;
    this.mHotelNetWork.send(buf);
    // this.mProtocol.seq-1 因为发送后会加1所以需要减1
    return {sequence: this.mProtocol.seq - 1, result: 0};
};


/**
 * 玩家订阅或取消订阅一批groups，（支持批量和同时订阅和取消），支持同事订阅和取消订阅，
 * 是因为游戏角色从一个区域跨越到另一个区域时需要这种原子切换
 * @param confirms {!Array.<string>} value  要订阅的分组集合
 * @param cancels {!Array.<string>} value  要取消的分组集合
 */
MatchvsEngine.prototype.subscribeEventGroup = function (confirms, cancels) {
    var ret = commEngineStateCheck(this.mEngineState, this.mEngineState, 1);
    if (ret !== 0) return ret;
    if (confirms.length === 0 && cancels.length === 0) return -20;
    var buf = this.mProtocol.subscribeEventGroup(this.mGameID, this.mRoomInfo.getRoomid(), confirms, cancels);
    this.mHotelNetWork.send(buf);
    return 0;
};

/**
 * @groups { !Array.<string> } value 调用subscribeEventGroup 设置的分组
 * @cpproto { !Array.<string> } value 发送的信息
 */
MatchvsEngine.prototype.sendEventGroup = function (data, groups) {
    var ret = commEngineStateCheck(this.mEngineState, this.mEngineState, 1);
    if (ret !== 0) return ret;
    if (groups.length <= 0) return -20;
    if (data.length > 1024) return -21;
    var priority = 1; // 要设置的消息通道优先级
    var buf = this.mProtocol.sendEventGroup(this.mGameID, this.mRoomInfo.getRoomid(), priority, groups, data);
    this.mHotelNetWork.send(buf);
    return 0;
};

/**
 * @gameID { number } value 游戏ID
 * @roomID { string } value 房间号
 * @userID { number } value  要订阅的分组集合
 */
MatchvsEngine.prototype.hotelHeartBeat = function () {
    var _engine = M_ENGINE;
    this.mEngineState |= ENGE_STATE.IN_ROOM;
    this.mEngineState |= ENGE_STATE.HAVE_LOGIN;
    var buf = _engine.mProtocol.hotelHeartBeat(_engine.mGameID, _engine.mRoomInfo.getRoomid(), _engine.mUserID);
    _engine.mHotelNetWork.send(buf);
    MatchvsLog.logI("hotel heartBeat");
};

/**
 * 注册用户
 * @returns {number}
 */
MatchvsEngine.prototype.registerUser = function () {
    if ((this.mEngineState & ENGE_STATE.HAVE_INIT) !== ENGE_STATE.HAVE_INIT) return -2;//未初始化
    var deviceid = "javascript";
    var channel = this.mChannel;
    var cacheKey = "regUserInfo" + channel + this.mPlatform;
    var gameVersion = this.mGameVersion;
    var cacheUserInfo = LocalStore_Load(cacheKey);
    if (cacheUserInfo) {
        var obj = JSON.parse(cacheUserInfo);
        this.mRsp.registerUserResponse(new MsRegistRsp(obj.status, obj.data.userid, obj.data.token, obj.data.nickname, obj.data.avatar));
        MatchvsLog.logI("load user info from cache:" + obj);
        return 0;
    }
    var uri = "/wc3/regit.do";
    var url = HttpConf.REGISTER_USER_URL + uri + "?mac=0" + "&deviceid=" + deviceid + "&channel=" + channel + "&pid=13" + "&version=" + gameVersion;
    var rep = new MatchvsNetWorkCallBack();
    new MatchvsHttp(rep).get(url);
    rep.rsp = this.mRsp.registerUserResponse;
    rep.onMsg = function (buf) {
        var obj = JSON.parse(buf);
        if (obj.status === 0) {
            LocalStore_Save(cacheKey, buf);
            this.rsp(new MsRegistRsp(obj.status, obj.data.userid, obj.data.token, obj.data.nickname, obj.data.avatar));
        } else {
            this.rsp(new MsRegistRsp(obj.status, 0, "0", buf, ""));
        }

    };
    rep.onErr = function (errCode, errMsg) {
        this.rsp(new MsRegistRsp(errCode, 0, "0", errMsg, ""));
    };
    return 0;
};

/**
 * 获取域名列表
 * @returns {number}
 */
MatchvsEngine.prototype.getHostList = function () {
    var gameId = this.mGameID;
    var channel = this.mChannel;
    var platform = this.mPlatform;
    var uri = "/v1/gateway/query";
    var url = "https://sdk.matchvs.com" + uri + "?mac=0" + "&gameid=" + gameId + "&channel=" + channel + "&platform=" + platform + "&useWSSProxy=1";
    var rep = new MatchvsNetWorkCallBack();
    var engine = this;
    new MatchvsHttp(rep).get(url);
    rep.onMsg = function (buf) {
        var obj = JSON.parse(buf);
        if (obj.status === 200) {
            engine.mEngineState |= ENGE_STATE.HAVE_INIT;
            engine.mEngineState &= ~ENGE_STATE.INITING;
            var http = "https://";
            var port = "";
            HttpConf.REGISTER_USER_URL = http + obj.data.vsuser;
            var websocket = "wss://";
            // var wss = (obj.data.wssProxy == "192.168.8.7")?"ws://":"wss://";
            HttpConf.HOST_GATWAY_ADDR = websocket + obj.data.wssProxy;
            HttpConf.CMSNS_URL = http + obj.data.cmsns;
            HttpConf.VS_OPEN_URL = http + obj.data.vsopen;
            HttpConf.VS_PAY_URL = http + obj.data.vspay;
            HttpConf.VS_PRODUCT_URL = http + obj.data.VS_PRODUCT_URL;
        }
        engine.mRsp.initResponse(obj.status);
    };
    rep.onErr = function (errCode, errMsg) {
        console.error("getHostListErrCode" + errCode + " getHostListErrMsg" + errMsg);
        engine.mRsp.errorResponse(errCode, errMsg);
    };
    return 0;
};

/**
 * 获取房间列表扩展接口
 * @param filter {MsRoomFilterEx}
 */
MatchvsEngine.prototype.getRoomListEx = function (filter) {
    var ret = commEngineStateCheck(this.mEngineState, this.mEngineState, 0);
    if (ret !== 0) return ret;
    var buf = this.mProtocol.getRoomListEx(this.mGameID, filter);
    this.mNetWork.send(buf);
    return 0;
};

/**
 * 获取房间详细信息
 * @param roomID {string}
 * @returns {number}
 */
MatchvsEngine.prototype.getRoomDetail = function (roomID) {
    var ret = commEngineStateCheck(this.mEngineState, this.mEngineState, 0);
    if (ret !== 0) return ret;
    var buf = this.mProtocol.getRoomDetail(this.mGameID, roomID);
    this.mNetWork.send(buf);
    return 0;
};

/**
 *
 * @param roomID {string}
 * @param roomProperty {Array<string>}
 * @returns {*}
 */
MatchvsEngine.prototype.setRoomProperty = function (roomID, roomProperty) {
    if (roomProperty.length === 0) return -1;
    if (roomProperty.length > 1024) return -21;
    var ret = commEngineStateCheck(this.mEngineState, this.mEngineState, 1);
    if (ret !== 0) return ret;
    var buf = this.mProtocol.setRoomProperty(this.mGameID, this.mUserID, roomID, roomProperty);
    this.mNetWork.send(buf);
    return 0;
};


/**
 * 断开网络连接
 * @param roomID 房间号
 */
MatchvsEngine.prototype.disConnect = function (roomID) {
    var buf = engine.mProtocol.disConnect(this.mUserID, this.mGameID, roomID);
    this.mNetWork.send(buf);
};

MatchvsEngine.prototype.hashSet = function (gameID, userID, key, value) {
    //参数组合是安装首字母排序的
    var params = "gameID=" + gameID + "&key=" + key + "&userID=" + userID + "&value=" + value;
    //加上 appkey 和 token 进行MD5签名
    var sign = hex_md5(this.mAppKey + "&" + params + "&" + this.mToken);
    //组合请求链接
    var url = HttpConf.VS_OPEN_URL + "/wc5/hashSet.do?" + params + "&sign=" + sign;
    //设置请求回调
    var callback = new MatchvsNetWorkCallBack();
    var httpReq = new MatchvsHttp(callback);
    //请求成功回调
    callback.onMsg = function (rsp) {
        MatchvsLog.logI("hashSetRsp:", rsp);
    };
    //请求失败回调
    callback.onErr = function (errCode, errMsg) {
        MatchvsLog.logI("hashSetRsp:errCode=" + errCode + " errMsg=" + errMsg);
    };
    //执行请求
    httpReq.get(url);
};

MatchvsEngine.prototype.hashGet = function (gameID, userID, key) {
    //参数组合是安装首字母排序的
    var params = "gameID=" + gameID + "&key=" + key + "&userID=" + userID;
    //加上 appkey 和 token 进行MD5签名
    var sign = hex_md5(this.mAppKey + "&" + params + "&" + this.mToken);
    //组合请求链接
    var url = HttpConf.VS_OPEN_URL + "/wc5/hashGet.do?" + params + "&sign=" + sign;
    //设置请求回调
    var callback = new MatchvsNetWorkCallBack();
    var httpReq = new MatchvsHttp(callback);
    //请求成功回调
    callback.onMsg = function (rsp) {
        MatchvsLog.logI("hashGetRsp:", rsp);
    };
    //请求失败回调
    callback.onErr = function (errCode, errMsg) {
        MatchvsLog.logI("hashGetRsp:errCode=" + errCode + " errMsg=" + errMsg);
    };
    //执行请求
    httpReq.get(url);
};
/* ================ base64.js ================= */
function Base64() {

    // private property
    _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    // public method for encoding
    this.encode = function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = _utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
        }
        return output;
    };

    // public method for decoding
    this.decode = function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = _keyStr.indexOf(input.charAt(i++));
            enc2 = _keyStr.indexOf(input.charAt(i++));
            enc3 = _keyStr.indexOf(input.charAt(i++));
            enc4 = _keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = _utf8_decode(output);
        return output;
    };

    // private method for UTF-8 encoding
    _utf8_encode = function (string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }
        return utftext;
    };

    // private method for UTF-8 decoding
    _utf8_decode = function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;
        while ( i < utftext.length ) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i+1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i+1);
                c3 = utftext.charCodeAt(i+2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    };
}

try {
  if (module && module.exports) {
     module.exports = {
     MatchvsLog:MatchvsLog,
     MatchvsEngine: MatchvsEngine,
     MatchvsResponse: MatchvsResponse,
     MsMatchInfo: MsMatchInfo,
     MsCreateRoomInfo: MsCreateRoomInfo, 
     MsRoomFilter: MsRoomFilter,
     MsRoomFilterEx: MsRoomFilterEx, 
     LocalStore_Clear: LocalStore_Clear,
     MsReopenRoomResponse:MsReopenRoomResponse,
     MsReopenRoomNotify:MsReopenRoomNotify,
     MatchvsHttp:MatchvsHttp
	 
     };
    }  
} catch (error) {
    console.log(error);
}

window.MatchvsLog=MatchvsLog;
window.MatchvsEngine= MatchvsEngine;
window.MatchvsResponse= MatchvsResponse;
window.MsMatchInfo= MsMatchInfo;
window.MsCreateRoomInfo= MsCreateRoomInfo; 
window.MsRoomFilter= MsRoomFilter;
window.MsRoomFilterEx= MsRoomFilterEx; 
window.LocalStore_Clear= LocalStore_Clear;
window.MsReopenRoomResponse=MsReopenRoomResponse;
window.MsReopenRoomNotify=MsReopenRoomNotify;
window.MatchvsHttp = MatchvsHttp;
     
    
