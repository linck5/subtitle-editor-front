export function cloneObject<T>(obj:T):T {
    return JSON.parse(JSON.stringify(obj))
}

export function arrDiff<T> (a1:T[], a2:T[], customEq: (i1:T, i2:T) => boolean = null) {

    if(!customEq)
        customEq = (a:T,b:T) => a===b;

    function customIndexOf(arr, o) {    
        for (var i = 0; i < arr.length; i++) {
            if(customEq(arr[i],o))
                return i;
        }
        return -1;
    }

    return a1.filter(i => customIndexOf(a2,i) < 0 ).concat(a2.filter(i => customIndexOf(a1,i) < 0));
}