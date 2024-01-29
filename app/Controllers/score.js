import BaseController from "./baseController.js";

class TableauDesScoresController extends BaseController{
    constructor() {
        super()
        this.recupererParties()
    }

    afficherPageCreationJeu(){
        navigate("InitialisationJeux");
    }

    recupererParties(){
        let tableauScore = document.getElementById("tableauScore");

        let tableau = document.createElement("table");
        tableau.classList.add("table", "table-striped");

        let entete = document.createElement("tr");
        entete.innerHTML = "<th>#</th><th>Nom</th><th>Difficulté</th><th>Score</th><th>Date-Heure</th><th>Reprendre</th>";
        tableau.appendChild(entete);

        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            var value = JSON.parse(localStorage.getItem(key));
            console.log(`Clé: ${key}, Valeur: ${JSON.stringify(value)}`);

            let ligne = document.createElement("tr");

            let celluleNumero = document.createElement("td");
            celluleNumero.textContent = i + 1;
            ligne.appendChild(celluleNumero);

            let celluleNom = document.createElement("td");
            celluleNom.textContent = value.name;
            ligne.appendChild(celluleNom);

            let celluleDifficulte = document.createElement("td");
            celluleDifficulte.textContent = value.difficulte;
            ligne.appendChild(celluleDifficulte);

            let celluleEtat = document.createElement("td");
            if (value.score !== undefined){
                celluleEtat.textContent = value.score;
            }
            else if(value.estAbandonnee === true) {
                celluleEtat.textContent = "Abandonner";

            }
            else if(value.estEnPause === true){
                celluleEtat.textContent = "En pause";
            }
            ligne.appendChild(celluleEtat);


            let celluleDate = document.createElement("td");
            console.log(`value date : ${value.dateHeure}`)
            celluleDate.textContent = JSON.stringify(value.dateHeure);
            ligne.appendChild(celluleDate);
            tableau.appendChild(ligne);

            let celluleReprendre = document.createElement("button");
            celluleReprendre.textContent = "Reprendre";
            celluleReprendre.classList.add("btn", "btn-primary");
            celluleReprendre.onclick = ((value) => {
                return () => {
                };
            })(value);
            if(value.estEnPause === true){
                ligne.appendChild(celluleReprendre);
            }
        }
        tableauScore.appendChild(tableau);
    }
}

export default () => window.tableauDesScoresController = new TableauDesScoresController()