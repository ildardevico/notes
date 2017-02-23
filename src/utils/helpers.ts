//Do not see on this shet
export const toMMSS = (secs) => {
    const sec_num = parseInt(secs, 10)
    const minutes = Math.floor(sec_num / 60) % 60
    const seconds = sec_num % 60
    return [ minutes, seconds ]
        .map(v => v < 10 ? "0" + v : v)
        .filter((v,i) => v !== "00" || i > 0)
        .join(":")
};
