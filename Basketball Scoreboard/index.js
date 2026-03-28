let h = 0
let a = 0
let hs = document.getElementById("left-score")
let as = document.getElementById("right-score")
console.log(hs)
console.log(as)

function reset(){
    h = 0
    a = 0
    hs.textContent = h
    as.textContent = a
}

function oneHome() {
    h += 1
    hs.textContent = h
}

function twoHome() {
    h += 2
    hs.textContent = h
}

function threeHome() {
    h += 3
    hs.textContent = h
}

function oneGuest() {
    a += 1
    as.textContent = a
}

function twoGuest() {
    a += 2
    as.textContent = a
}

function threeGuest() {
    a += 3
    as.textContent = a
}
