import BaseController from "./baseController.js";

class InitialisationJeuxController extends BaseController{
    constructor() {
        super()
    }

    traiterLesInfos(value = null){
        console.log("traiterLesInfos : test")
        let nomJoueur = document.getElementById("nomJoueur").value;
        let choixDifficulte = document.getElementById("choixDifficulte").value;
        console.log(`nomJoueur : ${nomJoueur}, difficulte : ${choixDifficulte}`)
        if (value !== null){
            console.log(`traiterLesInfos : ${value}`)
        }
        else{
            if ( nomJoueur === '') {
                console.log("Erreur : Veuillez rentrer un nom");
                document.getElementById('danger').style.display = '';
                document.getElementById('danger').textContent = "Veuillez rentrer un nom";
            }
            else {
                document.getElementById('danger').style.display = 'none';
                this.jeux.name = nomJoueur
                this.jeux.difficulte = choixDifficulte
                this.jeux.nombreDeCoup = 0
                console.log(`traiterLesInfos : difficulte : ${this.jeux.difficulte}`)
                this.jeux.choixDifficulte();
            }
        }
    }
}

export default () => window.initialisationJeuxController = new InitialisationJeuxController()