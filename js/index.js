function cpy(obj) {
    return JSON.parse(JSON.stringify(obj))
}

function setIncludes(A, B) {
    let An = 0;
    let Bn = 0;
    while (An < A.length && Bn < B.length) {
        if (A[An] < B[Bn]) {
            return false;
        } else if (A[An] > B[Bn]) {
            Bn++;
        } else {
            An++;
            Bn++;
        }
    }

    if (An >= A.length) return true;
    
    return false;
}

function setUnion(A, B) {
    let An = 0;
    let Bn = 0;
    let C = [];

    while (An < A.length && Bn < B.length) {
        if (A[An] < B[Bn]) {
            d = A[An];
            An++;
        } else if (A[An] > B[Bn]) {
            d = B[Bn];
            Bn++;
        } else {
            d = A[An];

            An++;
            Bn++;
        }
        C.push(d);
    }

    while (An < A.length) {
        C.push(A[An]);
        An++;
    }

    while (Bn < B.length) {
        C.push(B[Bn]);
        Bn++;
    }

    return C;
}

function setIntersection(A, B) {
    let bothInclude = []
    let An = 0;
    let Bn = 0;
    while (An < A.length && Bn < B.length) {
        if (A[An] < B[Bn]) {
            An++;
        } else if (A[An] > B[Bn]) {
            Bn++;
        } else {
            bothInclude.push(A[An]);
            An++;
            Bn++;
        }
    }

    return bothInclude;
}

function diff(A, B) {
    let onlyA = []
    let An = 0;
    let Bn = 0;
    while (An < A.length && Bn < B.length) {
        if (A[An] < B[Bn]) {
            onlyA.push(A[An])
            An++;
        } else if (A[An] > B[Bn]) {
            Bn++;
        } else {
            An++;
            Bn++;
        }
    }

    while (An < A.length) {
        onlyA.push(A[An]);
        An++;
    }

    return onlyA;
}


function symmetrical(A, B) {
    let bothInclude = []
    let An = 0;
    let Bn = 0;
    while (An < A.length && Bn < B.length) {
        if (A[An] < B[Bn]) {
            bothInclude.push(A[An]);
            An++;
        } else if (A[An] > B[Bn]) {
            bothInclude.push(B[Bn]);
            Bn++;
        } else {
            
            An++;
            Bn++;
        }
    }

    while (An < A.length) {
        bothInclude.push(A[An]);
        An++;
    }

    while (Bn < B.length) {
        bothInclude.push(B[Bn]);
        Bn++;
    }

    return bothInclude;
}

function prepare(stringA, stringB) {
    let A = [... new Set(stringA.replace( /[^\sA-Z]/g, '').split(" "))].sort().filter(function (el) {
        return el != "" && el.length == 1;
    });
    let B = [... new Set(stringB.replace( /[^\sA-Z]/g, '').split(" "))].sort().filter(function (el) {
        return el != "" && el.length == 1;
    });

    return [A, B]
}

function generateOutput(data) {
    let answ = document.createElement('input');
    answ.value = data.join(" ")
    answ.disabled = true;

    return answ;
}


function compute() {
    document.getElementById("result").innerHTML = "";

    let sets = prepare(document.getElementById('A').value, document.getElementById('B').value);

    let A = sets[0];
    let B = sets[1];
    document.getElementById('A').value = A.join(" ")
    document.getElementById('B').value = B.join(" ")
    
    let answ;
    
    switch (parseInt(document.getElementById('op').value)) {
        case 1:
            answ = document.createElement('p');
            if (setIncludes(A, B)) {
                answ.innerHTML = "A&#8838;B"
            } else {
                answ.innerHTML = "A&#8840;B"
            }
            break;
        case 2:
            answ = generateOutput(setUnion(A, B));
            break;
        case 3:
            answ = generateOutput(setIntersection(A, B));
            break;
        case 4:
            answ = generateOutput(diff(A, B));
            break;
        case 5:
            answ = generateOutput(diff(B, A));
            break;
        case 6:
            answ = generateOutput(symmetrical(A, B));
            break;
        case 7:
            answ = document.createElement('p');
            if (setIncludes(B, A)) {
                answ.innerHTML = "B&#8838;A"
            } else {
                answ.innerHTML = "B&#8840;A"
            }
            break;
        default:
            break;
    }

    document.getElementById("result").appendChild(answ);
}