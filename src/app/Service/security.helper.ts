import * as CryptoJS from 'crypto-js';
import { Injectable } from '@angular/core';

@Injectable()
export class SecurityHelper {
    private _pass = 'U2FsdGVkX18ZUVvShFS_)*&qHsQEqZXMxQ9zgHy+bu0=';

    encryptText(text: string) {
        return CryptoJS.AES.encrypt(text, this._pass).toString();
    }
    decryptText(text) {
        return CryptoJS.AES.decrypt(text, this._pass).toString(CryptoJS.enc.Utf8);
    }

    /** provides the simplest encryption */
    simpleCipher(str: string) {
        const key = 'c3e15317-163b-4859-bed8-677ca3e258d5';
        const ord = [];
        let res = '';

        let i;
        for (i = 1; i <= 255; i++) { ord[String.fromCharCode(i)] = i; }

        for (i = 0; i < str.length; i++) {
            res += String.fromCharCode(ord[str.substr(i, 1)] ^ ord[key.substr(i % key.length, 1)]);
        }
        return (res);
    }
}
