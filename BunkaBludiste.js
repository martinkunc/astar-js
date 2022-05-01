
 
 class BunkaBludiste {
     RodicovskaBunka;
     Pozice;
    
    // Cena od zacatku do tehle bunky
    G = 0;
    
    // Cena od tehle bunky do konce
    H = 0;

    // Soucet ceny od zacatku a ceny do konce
    F = 0;

    constructor(aBunkaBludiste, aPozice) {
        this.RodicovskaBunka = aBunkaBludiste;
        this.Pozice = aPozice;
        this.G = 0;
        this.H = 0;
        this.F = 0;
    }
}