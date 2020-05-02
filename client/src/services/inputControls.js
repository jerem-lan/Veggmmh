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

export default {
    truncString,
    spaceVerif
};

