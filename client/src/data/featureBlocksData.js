// Une liste avec les data (titre/icone) de chaques boutons de fonctionnalités, pour remplir directement le front !
const featureBlocksDataConnected = {
  featureBlock1: {
    title: 'Mes recettes',
    icon: '',
    route: '/mes-recettes',
    isAnonym: false,
  },
  featureBlock2: {
    title: 'Mes recettes favorites',
    icon: '',
    route: '/mes-recettes-favorites',
    isAnonym: false,
  },
  featureBlock3: {
    title: 'Mes annonces',
    icon: '',
    route: '/mes-annonces',
    isAnonym: false,
  },
  featureBlock4: {
      title: 'Publier une recette',
      icon: 'add-recipe.svg',
      route: '/register',
      isAnonym: false,
    },
    featureBlock5: {
      title: 'Déposer une annonce',
      icon: 'add-ad.svg',
      route: '/ajouter-annonce',
      isAnonym: false,
    },
    featureBlock3: {
      title: 'Mes recettes',
      icon: '',
      route: '/register',
      isAnonym: false,
    },
    featureBlock4: {
      title: 'Mes annonces',
      icon: '',
      route: '/ajouter-annonce',
      isAnonym: false,
    },
    featureBlock5: {
      title: 'Trouver une recette',
      icon: 'search-recipe.svg',
      route: '/register',
      isAnonym: true,
    },
    featureBlock6: {
      title: 'Mes recettes favorites',
      icon: 'favorites.svg',
      route: '/register',
      isAnonym: false,
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