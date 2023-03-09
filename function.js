const getPlayTime = (n) => {
    let res = "";
    res += Math.floor(n / 86400).toLocaleString() + "d ";
    n %= 86400;
    res += Math.floor(n / 3600).toLocaleString() + "h ";
    n %= 3600;
    res += Math.floor(n / 60).toLocaleString() + "m";
    return res;
}

const getMods = (n) => {
    const mod = new Array(0);
    const mods = ["nf", "ez", "", "hd", "hr", "sd", "dt", "", "ht", "nc", "fl"];
    if (n >= 16416) {
        mod.push("pf");
        n -= 16416;
    }
    for (let i = 10; n !== 0; i--) {
        if (i !== 2 && i !== 7 && n >= Math.pow(2, i)) {
            if (i === 9) {
                n -= Math.pow(2, 6);
            }
            mod.push(mods[i]);
            n -= Math.pow(2, i);
        }
    }
    return mod;
}

const getDiff = (file) => {
    let diff = "", i = 0;
    while (file[i] !== "[") {
        i++;
    }
    for (i += 1; file[i] !== "]"; i++) {
        diff += file[i];
    }
    return diff;
}

console.log(getMods(0).length);