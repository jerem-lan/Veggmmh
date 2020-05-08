function truncString(str)
    {
        str = str.replace(/[\s]{2,}/g," "); // Enlève les espaces doubles, triples, etc.
        str = str.replace(/^[\s]/, ""); // Enlève les espaces au début
        str = str.replace(/[\s]$/,""); // Enlève les espaces à la fin
        return str;    
    }

function spaceVerif(str){
    return str.replace(/\s/g, '').length
}

function specialVerif(str) {
    const verify = str.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>{}[\]\\/]/gi,''); 
    return verify;
}

function passwordVerif(str) {
    const verify = str.replace(/[`~#^&()|=?;:'",<>{}[\]\\/]/gi,''); 
    return verify;
}

function inputVerif(str) {
    const verify = str.replace(/[`~#()|=<>{}[\]\\/]/gi,''); 
    return verify;
}

export default {
    truncString,
    spaceVerif,
    specialVerif,
    passwordVerif,
    inputVerif
};

