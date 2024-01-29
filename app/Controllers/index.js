
class IndexController{
    constructor() {
    }

    afficherPageCreationJeu(){
        console.log("afficherPageCreationJeu : test");
        navigate("InitialisationJeux");
    }
    afficherPageScore(){
        console.log("afficherPageScore : test");
        navigate("score");
    }

}

export default () => window.indexController = new IndexController()

