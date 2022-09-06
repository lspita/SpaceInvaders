export default class Ministage {

    static elaboraInput(tastoPremuto) {
        /*
        Il movimento viene rappresentato nel seguente modo
        y            -1
        |            |
        |       -1 - 🚀 - +1
        |            |
        |           +1
        |
        ---------------------- x
        */
        let valoreX = 0, valoreY = 0

        let spara = false

        switch (tastoPremuto) {
            case 'ArrowRight':
                valoreX = 1
                break;
            case 'ArrowLeft':
                valoreX = -1
                break;
            case 'ArrowUp':
                valoreY = -1
                break;
            case 'ArrowDown':
                valoreY = 1
                break;
            case ' ': //tasto spazio
                //se viene premuto il tasto, mettiamo lo sparo a true
                spara = true
                break;
        }

        // rimandiamo al gioco il moviment in base all'input (x e y) e se sparare o meno (true/false)
        return { 'x': valoreX, 'y': valoreY, 'spara': spara }
    }

    static avanzaDiLivello(statistiche) {
        /*
        statistiche contiene i dati correnti, li modifichiamo a piacimento e li rimandiamo indietro per essere applicati
        x += 5 => x = x + 5
        vale anche per:
        -=, *=, /=
        */

        statistiche.rateoDiFuoco += 1
        statistiche.vitaMassima += 1
        statistiche.velocità += 100

        return statistiche
    }

    static vittoria(elemento) {
        /*
        innerText = testo all'interno dell'elemento
        style.color = colore del testo
        */
        elemento.innerText = 'Vittoria'
        elemento.style.color = 'lime'
    }

    static gameover(elemento) {
        elemento.innerText = 'Game Over'
        elemento.style.color = 'red'
    }
}