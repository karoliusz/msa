require('./../css/msa.css');

import * as MSA from './index';

const msa = MSA.default;

// workaround against es6 exports
// we want to expose the MSA constructor by default
for (var key in MSA) {
    if (MSA.hasOwnProperty(key)) {
        msa[key] = MSA[key];
    }
}

if (!!window) {
    console.log('MSA!', msa);
    window.msa = msa;
}

export default msa;
