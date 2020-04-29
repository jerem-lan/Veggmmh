// Une liste avec les data (titre/icone) de chaques boutons de fonctionnalités, pour remplir directement le front !
const featureBlocksDataConnected = {
    featureBlock1: {
      title: 'Publier une recette',
      icon: 'add-recipe.svg',
      route: '/ajouter-recette',
      isAnonym: false,
    },
    featureBlock2: {
      title: 'Déposer une annonce',
      icon: 'add-ad.svg',
      route: '/ajouter-annonce',
      isAnonym: false,
    },
    featureBlock3: {
      title: 'Mes recettes',
      icon: 'user-recipes.svg',
      route: '/mes-recettes',
      isAnonym: false,
    },
    featureBlock4: {
      title: 'Mes annonces',
      icon: 'user-ads.svg',
      route: '/mes-annonces',
      isAnonym: false,
    },
    featureBlock5: {
      title: 'Mes favoris',
      icon: 'favorites.svg',
      route: '/mes-recettes-favorites',
      isAnonym: false,
    },
    featureBlock6: {
      title: 'Trouver une recette',
      icon: 'search-recipe.svg',
      route: '/trouver-recette',
      isAnonym: true,
    },
    featureBlock7: {
      title: 'Aliments de saison',
      icon: 'food-calendar.svg',
      route: '/calendrier-des-saisons',
      isAnonym: true,
    },
    featureBlock8: {
      title: 'Trocs & dons',
      icon: 'ads.svg',
      route: '/liste-annonces',
      isAnonym: true,
    }
}
  
  export default featureBlocksDataConnected