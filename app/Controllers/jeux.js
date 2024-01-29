import BaseController from "./baseController.js";

class JeuxController extends BaseController{
    constructor() {
        super()
        this.afficherLaGrille()
        document.getElementById("showNomDuJoueur").textContent = `${this.jeux.name}`
    }

    afficherLaGrille(){
        console.log("afficherLaGrille : test")
        console.log(`afficherLaGrille : difficulte : ${this.jeux.difficulte}`)
        console.log(`afficherLaGrille : grille : ${this.jeux.grille}`)
        let grille = document.getElementById("grille")
        grille.innerHTML = "";
        console.log(grille);
        grille.appendChild(this.jeux.grille);
    }

    tirer(){
        let colonne = document.getElementById("colonne").value
        let ligne = document.getElementById("ligne").value
        console.log(`colonne : ${colonne}`)
        console.log(`ligne : ${ligne}`)
        this.verifierSiTouche(colonne, ligne)
    }

    verifierSiTouche(colonne, ligne){
        console.log(colonne, ligne)
        var cellule = document.querySelector('.cellule[data-row="' + ligne + '"][data-col="' + colonne + '"]');
        let nombreDeCoup = document.getElementById("nombreDeCoup");
        let valeurCellule =  cellule.textContent.trim();
        if(this.jeux.matriceGrille[ligne - 1][colonne - 1] !== "?"){
            console.log("verifierSiTouche : touché")
            document.getElementById('success').style.display = '';
            document.getElementById('success').textContent = "Touché";
            document.getElementById('danger').style.display = 'none';

            if (valeurCellule === "?") {
                cellule.textContent = "T";
                this.jeux.nombreDeCoup += 1
                this.verifierSiCoulee(this.jeux.matriceGrille[ligne - 1][colonne - 1]);
                nombreDeCoup.textContent = this.jeux.nombreDeCoup;
            } else {
                document.getElementById('success').textContent = "Vous avez déjà tiré ici !";
            }

        }
        else {
            console.log("verifierSiTouche : pas touché")
            document.getElementById('danger').style.display = '';
            document.getElementById('success').style.display = 'none';
            document.getElementById('danger').textContent = "Loupée";
            let valeurCellule =  cellule.textContent.trim();

            if (valeurCellule === "?") {
                cellule.textContent = "X";
                this.jeux.nombreDeCoup += 1
                nombreDeCoup.textContent = this.jeux.nombreDeCoup;
            } else {
                document.getElementById('danger').textContent = "Vous avez déjà tiré ici !";
            }
        }
    }

    verifierSiCoulee(valeur){
        switch (valeur){
            case "T" :
                this.jeux.nombreDeCaseTorpilleurTouche += 1
                if (this.jeux.nombreDeCaseTorpilleurTouche === this.jeux.TAILLE_TORPILLEUR){
                    this.jeux.tropilleurCoule = true
                    document.getElementById('danger').style.display = 'none';
                    document.getElementById('success').textContent = "Vous avez coulé le torpilleur";
                }
                this.verifierSiFinit()
                break
            case "CT" :
                this.jeux.nombreDeCaseContreTorpilleurTouche += 1
                if (this.jeux.nombreDeCaseContreTorpilleurTouche === this.jeux.TAILLE_CONTRE_TORPILLEURS){
                    this.jeux.contreTorpilleurCoule = true
                    document.getElementById('danger').style.display = 'none';
                    document.getElementById('success').textContent = "Vous avez coulé le contre tropilleur";
                }
                this.verifierSiFinit()
                break
            case "PA" :
                this.jeux.nombreDeCasePorteAvionTouche += 1
                if (this.jeux.nombreDeCasePorteAvionTouche === this.jeux.TAILLE_PORTE_AVION){
                    this.jeux.porteAvionCoule = true
                    document.getElementById('danger').style.display = 'none';
                    document.getElementById('success').textContent = "Vous avez coulé le contre porte avion";
                }
                this.verifierSiFinit()
                break
            case "C" :
                this.jeux.nombreDeCaseCroiseurTouche += 1
                if (this.jeux.nombreDeCaseCroiseurTouche === this.jeux.TAILLE_CROISEUR){
                    this.jeux.croiseurCoule = true
                    document.getElementById('danger').style.display = 'none';
                    document.getElementById('success').textContent = "Vous avez coulé le croiseur";
                }
                this.verifierSiFinit()
                break
        }
    }

    verifierSiFinit(){
        if(this.jeux.verifierSiPartieFinit()){
            document.getElementById('danger').style.display = 'none';
            this.jeux.score = this.jeux.tailleGrille * this.jeux.tailleGrille - this.jeux.nombreDeCoup
            document.getElementById('success').textContent = `Vous avez finit en ${this.jeux.nombreDeCoup} coups \n votre score est de ${this.jeux.score}`;
            this.jeux.dateHeure = this.jeux.recupererLaDateHeure();
            var nombreItems = localStorage.length;
            localStorage.setItem(`partie${nombreItems}`, JSON.stringify(this.jeux));
            document.getElementById("showScore").style.display = "block"
            document.getElementById("btn-abandon").style.display = "none"
            document.getElementById("pause").style.display = "none"
        }
    }

    abandonner(){
        navigate("index")
        this.jeux.dateHeure = this.jeux.recupererLaDateHeure();
        this.jeux.estAbandonnee = true
        var nombreItems = localStorage.length;
        localStorage.setItem(`partie${nombreItems}`, JSON.stringify(this.jeux));
        console.log(`abandonner date/heure : ${this.jeux.dateHeure}`)
        this.jeux.reset()
    }

    mettreEnpause(){
        this.jeux.estEnPause = true
        this.jeux.dateHeure = this.jeux.recupererLaDateHeure();
        document.getElementById("showScore").style.display = "block"
        document.getElementById("btn-abandon").style.display = "none"
        document.getElementById("pause").style.display = "none"
        document.getElementById("tire").style.display = "none"

        var nombreItems = localStorage.length;
        localStorage.setItem(`partie${nombreItems}`, JSON.stringify(this.jeux));
        this.jeux.reset()
    }
    showPageScore(){
        navigate("score");
    }
}

export default () => window.jeuxController = new JeuxController()