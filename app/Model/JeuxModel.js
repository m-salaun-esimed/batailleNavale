class JeuxModel {
    constructor() {
        this.name = ""
        this.difficulte = ""
        this.nombreDeCoup = 0
        this.NBR_GRILLE_FACILE = 7;
        this.NBR_GRILLE_NORMAL = 8;
        this.NBR_GRILLE_DIFFICILE = 10;
        this.TAILLE_TORPILLEUR = 2
        this.TAILLE_CROISEUR =  4
        this.TAILLE_CONTRE_TORPILLEURS = 3
        this.TAILLE_PORTE_AVION = 5
        this.estAbandonnee = false
        this.estEnPause = false
        this.tropilleurCoule = false
        this.croiseurCoule = false
        this.contreTorpilleurCoule = false
        this.porteAvionCoule = false
        this.nombreDeCaseTorpilleurTouche = 0
        this.nombreDeCaseCroiseurTouche = 0
        this.nombreDeCaseContreTorpilleurTouche = 0
        this.nombreDeCasePorteAvionTouche = 0
    }

    choixDifficulte(){
         switch (this.difficulte) {
                case "facile":
                    this.creerGrille(this.NBR_GRILLE_FACILE);
                    break;
                case "normal":
                    this.creerGrille(this.NBR_GRILLE_NORMAL);
                    break;
                case "difficile":
                    this.creerGrille(this.NBR_GRILLE_DIFFICILE);
                    break;
            }
            this.placerLesBateaux()
            navigate("jeux");
    }
    creerGrille(taille) {
                this.tailleGrille = taille
                console.log(`Création de la grille de taille ${taille}`);
                const grilleElement = document.createElement("div");
                grilleElement.classList.add("grille");
                const ligneIndicesColonnes = document.createElement("div");
                ligneIndicesColonnes.classList.add("row");

                for (let i = 0; i <= taille; i++) {
                    const indiceColonne = document.createElement("div");
                    indiceColonne.classList.add("col-md-1", "cellule", "indice-colonne", "text-center");
                    indiceColonne.textContent = (i > 0) ? i.toString() : '';
                    ligneIndicesColonnes.appendChild(indiceColonne);
        }
        grilleElement.appendChild(ligneIndicesColonnes);

        for (let i = 1; i <= taille; i++) {
            const ligneElement = document.createElement("div");
            ligneElement.classList.add("row");
            const indiceLigne = document.createElement("div");
            indiceLigne.classList.add("col-md-1", "cellule", "indice-ligne", "text-center");
            indiceLigne.textContent = i;
            ligneElement.appendChild(indiceLigne);
            for (let j = 1; j <= taille; j++) {
                const celluleElement = document.createElement("div");
                celluleElement.classList.add("col-md-1", "cellule", "border");
                celluleElement.dataset.row = i;
                celluleElement.dataset.col = j;
                celluleElement.textContent = "?";
                ligneElement.appendChild(celluleElement);
            }

            grilleElement.appendChild(ligneElement);
        }

        this.grille = grilleElement;
        const centredContainer = document.createElement("div");
        centredContainer.classList.add("text-center", "mx-auto");
        centredContainer.appendChild(this.grille);
        document.body.appendChild(centredContainer);
        console.log(`grille : ${this.grille}`);
    }

    placerLesBateaux(){
        switch (this.tailleGrille){
            case 7 :
                const matrice7 = [];
                for (let i = 0; i < 7; i++) {
                    const ligne = [];
                    for (let j = 0; j < 7; j++) {
                        ligne.push('?');
                    }
                    matrice7.push(ligne);
                }
                this.matriceGrille = matrice7
                break
            case 8:
                const matrice8 = [];
                for (let i = 0; i < 8; i++) {
                    const ligne = [];
                    for (let j = 0; j < 8; j++) {
                        ligne.push('?');
                    }
                    matrice8.push(ligne);
                }
                this.matriceGrille = matrice8
                break
            case 10 :
                const matrice10 = [];
                for (let i = 0; i < 10; i++) {
                    const ligne = [];
                    for (let j = 0; j < 10; j++) {
                        ligne.push('?');
                    }
                    matrice10.push(ligne);
                }
                this.matriceGrille = matrice10
                break
        }
        this.placerTorpilleur()
        this.placerContreTorpilleur()
        this.placerPorteAvion()
        this.placerCroiseur()
        console.log(this.matriceGrille)

    }

    placerTorpilleur(){
        const positionInitiale = {
            row: Math.floor(Math.random() * this.tailleGrille),
            col: Math.floor(Math.random() * this.tailleGrille),
        };
        const orientation = Math.random() < 0.5 ? 'horizontal' : 'vertical';
        if (
            (orientation === 'horizontal' && positionInitiale.col + this.TAILLE_TORPILLEUR <= this.tailleGrille) ||
            (orientation === 'vertical' && positionInitiale.row + this.TAILLE_TORPILLEUR <= this.tailleGrille)
        ) {
            for (let i = 0; i < this.TAILLE_TORPILLEUR; i++) {
                if (orientation === 'horizontal') {
                    this.matriceGrille[positionInitiale.row][positionInitiale.col + i] = 'T';
                    console.log(`row : ${positionInitiale.row}, col : ${positionInitiale.col + i}`)
                } else {
                    this.matriceGrille[positionInitiale.row + i][positionInitiale.col] = 'T';
                    console.log(`row : ${positionInitiale.row + i}, col : ${positionInitiale.col}`)
                    console.log(this.matriceGrille)
                }
            }
        } else {
            return this.placerTorpilleur();
        }
    }

    placerContreTorpilleur() {
        const positionInitiale = {
            row: Math.floor(Math.random() * this.tailleGrille),
            col: Math.floor(Math.random() * this.tailleGrille),
        };

        const orientation = Math.random() < 0.5 ? 'horizontal' : 'vertical';

        if (!this.positionChevauche(positionInitiale, orientation, this.TAILLE_CONTRE_TORPILLEURS)) {
            for (let i = 0; i < this.TAILLE_CONTRE_TORPILLEURS; i++) {
                if (orientation === 'horizontal') {
                    this.matriceGrille[positionInitiale.row][positionInitiale.col + i] = 'CT';
                } else {
                    this.matriceGrille[positionInitiale.row + i][positionInitiale.col] = 'CT';
                }
            }
        } else {
            return this.placerContreTorpilleur();
        }
    }

    placerPorteAvion() {
        const positionInitiale = {
            row: Math.floor(Math.random() * this.tailleGrille),
            col: Math.floor(Math.random() * this.tailleGrille),
        };

        const orientation = Math.random() < 0.5 ? 'horizontal' : 'vertical';

        if (!this.positionChevauche(positionInitiale, orientation, this.TAILLE_PORTE_AVION)) {
            for (let i = 0; i < this.TAILLE_PORTE_AVION; i++) {
                if (orientation === 'horizontal') {
                    this.matriceGrille[positionInitiale.row][positionInitiale.col + i] = 'PA';
                } else {
                    this.matriceGrille[positionInitiale.row + i][positionInitiale.col] = 'PA';
                }
            }
        } else {
            return this.placerPorteAvion();
        }
    }

    placerCroiseur() {
        const positionInitiale = {
            row: Math.floor(Math.random() * this.tailleGrille),
            col: Math.floor(Math.random() * this.tailleGrille),
        };

        const orientation = Math.random() < 0.5 ? 'horizontal' : 'vertical';

        if (!this.positionChevauche(positionInitiale, orientation, this.TAILLE_CROISEUR)) {
            for (let i = 0; i < this.TAILLE_CROISEUR; i++) {
                if (orientation === 'horizontal') {
                    this.matriceGrille[positionInitiale.row][positionInitiale.col + i] = 'C';
                } else {
                    this.matriceGrille[positionInitiale.row + i][positionInitiale.col] = 'C';
                }
            }
        } else {
            return this.placerCroiseur();
        }
    }
    positionChevauche(positionInitiale, orientation, tailleBateau) {
        for (let i = 0; i < tailleBateau; i++) {
            if (orientation === 'horizontal' &&
                (positionInitiale.col + i >= this.tailleGrille || this.matriceGrille[positionInitiale.row][positionInitiale.col + i] !== '?')) {
                return true;
            } else if (orientation === 'vertical' &&
                (positionInitiale.row + i >= this.tailleGrille || this.matriceGrille[positionInitiale.row + i][positionInitiale.col] !== '?')) {
                return true;
            }
        }
        return false;
    }

    verifierSiPartieFinit(){
        if (this.tropilleurCoule && this.contreTorpilleurCoule && this.porteAvionCoule && this.croiseurCoule){
            return true;
        }
        else {
            return false;
        }
    }

    recupererLaDateHeure(){
        const d = new Date();
        return d.toLocaleString();
    }

    reset(){
        this.name = ""
        this.difficulte = ""
        this.nombreDeCoup = 0
        this.NBR_GRILLE_FACILE = 7;
        this.NBR_GRILLE_NORMAL = 8;
        this.NBR_GRILLE_DIFFICILE = 10;
        this.TAILLE_TORPILLEUR = 2
        this.TAILLE_CROISEUR =  4
        this.TAILLE_CONTRE_TORPILLEURS = 3
        this.TAILLE_PORTE_AVION = 5
        this.estAbandonnee = false
        this.estEnPause = false
        this.tropilleurCoule = false
        this.croiseurCoule = false
        this.contreTorpilleurCoule = false
        this.porteAvionCoule = false
        this.nombreDeCaseTorpilleurTouche = 0
        this.nombreDeCaseCroiseurTouche = 0
        this.nombreDeCaseContreTorpilleurTouche = 0
        this.nombreDeCasePorteAvionTouche = 0
        this.grille = null
        this.matriceGrille = null
    }
}

var jeuxModel = new JeuxModel()