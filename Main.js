
 class Main {

     start() {
        var blud = new Bludiste();
        var prazdnaCesta = new Array();
        blud.Nakresli(prazdnaCesta);
        var cesta = blud.NajdiCestu();
        blud.Nakresli(cesta);
    }

}