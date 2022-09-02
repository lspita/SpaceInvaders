export default class Ministage {

    /**
     * @param {string} tastoPremuto 
     * @returns 
     */
    static muoviGiocatore(tastoPremuto) {
        /*
        Le coordinate vengono rappresentate nel seguente modo
        x:0, y:0------------------------|
        |                               |
        |                               |
        |                               |
        |                               |
        |________________________x:1, y:1
        */
        let x = 0, y = 0
        let spara = false
        switch (tastoPremuto) {
            case 'ArrowRight':
                x = 1
                break;
            case 'ArrowLeft':
                x = -1
                break;
            case 'ArrowUp':
                y = -1
                break;
            case 'ArrowDown':
                y = 1
                break;
            case ' ': //tasto spazio
                spara = true
                break;
        }

        return { 'x': x, 'y': y, 'spara': spara }
    }

    /**
     * @param {{
     *  rateoDiFuoco: number,
     *  velocità: number,
     *  vitaMassima: number
     * }} statistiche 
     * @returns {{
     *  rateoDiFuoco: number,
     *  velocità: number,
     *  vitaMassima: number
     * }}
     */
    static avanzaDiLivello(statistiche) {
        //statistiche contiene i dati correnti, li modifichiamo a piacimento e li rimandiamo indietro per essere applicati
        statistiche.rateoDiFuoco += 1
        statistiche.vitaMassima += 1
        statistiche.velocità += 100
        return statistiche
    }
}