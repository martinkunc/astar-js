


class Bludiste {
    prekazky = new Array();
    zacX = 0;
    zacY = 0;
    konX = 0;
    konY = 0;
    velikostX = 0;
    velikostY = 0;

    constructor() {
        var b =  [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 2, 1, 0, 0, 1, 1, 1, 1, 1],
            [1, 0, 1, 0, 0, 0, 1, 0, 0, 1],
            [1, 0, 1, 0, 1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 1, 0, 1, 0, 1],
            [1, 0, 1, 1, 1, 0, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
            [1, 0, 0, 0, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 3, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        this.velikostY = b.length;
        this.velikostX = b[0].length;
        this.prekazky = new Array();
        for (var i = 0; i < this.velikostY; i++) {
            for (var j = 0; j < this.velikostX; j++) {
                if (b[i][j] == 2) {
                    // 2 je kde zacnu
                    this.zacX = j;
                    this.zacY = i;
                }
                if (b[i][j] == 3) {
                    // 3 je kde skoncim
                    this.konX = j;
                    this.konY = i;
                }
                if (b[i][j] == 1) {
                    this.prekazky.push(new Souradnice(j, i));
                }
            }
        }
    }

    Nakresli(cesta) {
        var b = new Array(this.velikostY);
        for(var i = 0;i<this.velikostY;i++) {
            b[i] = new Array(this.velikostX);
        }
        
        b[this.zacY][this.zacX] = 2;
        b[this.konY][this.konX] = 3;

        for (var i = 0; i < this.prekazky.length; i++) {
            b[this.prekazky[i].y][this.prekazky[i].x] = 1;
        }
        for (var i = 0; i < cesta.length; i++) {
            b[cesta[i].y][cesta[i].x] = 4;
        }

        for (var i = 0; i < this.velikostY; i++) {
            var s = '';
            for (var j = 0; j < this.velikostX; j++) {
                s += b[i][j] || ' ';
            }
            console.log(s);
        }
    }

    NajdiCestu() {
        var start = new Souradnice(this.zacX, this.zacY);
        var end = new Souradnice(this.konX, this.konY);

        var startNode = new BunkaBludiste(null, start);
        startNode.G = 0;
        startNode.H = 0;
        startNode.F = 0;
        var endNode = new BunkaBludiste(null, end);
        endNode.G = 0;
        endNode.H = 0;
        endNode.F = 0;

        var openList = new Array();
        var closedList = new Array();

        openList.push(startNode);

        while (openList.length > 0) {
            var currentNode = openList[0];
            var currentIndex = 0;
            for (var i = 0; i < openList.length; i++) {
                var item = openList[i];
                if (item.F < currentNode.F) {
                    currentNode = item;
                    currentIndex = i;
                }
            }

            openList.splice(currentIndex, 1);
            closedList.push(currentNode);

            if (currentNode.Pozice.x == endNode.Pozice.x && currentNode.Pozice.y == endNode.Pozice.y) {
                var path = new Array();
                var current = currentNode;
                while (current != null) {
                    path.push(current.Pozice);
                    current = current.RodicovskaBunka;
                }
                return path.reverse();
            }
            var children = new Array();
            var prilehle = [[0, -1], [0, 1], [-1, 0], [1, 0], [-1, -1], [-1, 1], [1, -1], [1, 1]];
            for (var p = 0; p < prilehle.length; p++) {

                var nodePosition = new Souradnice(currentNode.Pozice.x + prilehle[p][0], currentNode.Pozice.y + prilehle[p][1]);

                // Zkontroluj hranice bludiste
                if ((nodePosition.x > this.velikostX - 1) || (nodePosition.x < 0) || (nodePosition.y > this.velikostY - 1) || (nodePosition.y < 0))
                    continue;

                // zkontroluj ze zde neni prekazka
                var skipPrilehly = false;
                for (var k = 0; k < this.prekazky.length; k++) {
                    var prekazka = this.prekazky[k];
                    if (prekazka.x == nodePosition.x && prekazka.y == nodePosition.y) {
                        skipPrilehly = true;
                        break;
                    }
                }
                if (skipPrilehly) {
                    continue;
                }

                var newNode = new BunkaBludiste(currentNode, nodePosition);
                children.push(newNode);
            }

            // Projdi deti
            for (var p = 0; p < children.length; p++) {
                var child = children[p];

                // Pokud je dite v zavrenem listu
                var skipChild = false;
                for (var c = 0; c < closedList.length; c++) {
                    if (child.Pozice.x == closedList[c].Pozice.x && child.Pozice.y == closedList[c].Pozice.y) {
                        skipChild = true;
                        break;
                    }
                }
                if (skipChild) {
                    continue;
                }

                child.G = currentNode.G + 1;
                child.H = Math.floor(Math.pow(child.Pozice.x - endNode.Pozice.x, 2) + Math.pow(child.Pozice.y - endNode.Pozice.y, 2));
                child.F = child.G + child.H;

                // pokud je dite uz v otevrenem listu
                skipChild = false;
                for (var c = 0; c < openList.length; c++) {
                    if (child.Pozice.x == openList[c].Pozice.x && child.Pozice.y == openList[c].Pozice.y && child.G > openList[c].G) {
                        skipChild = true;
                        break;
                    }
                }
                if (skipChild) {
                    continue;
                }
                openList.push(child);
            }
        }
        return null;
    }
}
