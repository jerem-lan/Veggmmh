// Une liste avec les data (titre/icone) de chaques boutons de fonctionnalités, pour remplir directement le front !
const featureBlocksDataAdmin = {
    featureBlock1: {
      title: 'Gestion des recettes',
      icon: 'recipe-submitted.svg',
      route: '/admin/gerer-recettes',
      isAnonym: false,
    },
    featureBlock2: {
      title: 'Gestion des annonces',
      icon: 'ad-submitted.svg',
      route: '/admin/gerer-annonces',
      isAnonym: false,
    },
    featureBlock3: {
      title: 'Gestion des utilisateurs',
      icon: 'users.svg',
      route: '/admin/gerer-utilisateurs',
      isAnonym: false,
    },
    featureBlock4: {
      title: 'Gestion des aliments',
      icon: 'add-ingredient.svg',
      route: '/admin/gerer-ingredients',
      isAnonym: false,
    }
}
  
  export default featureBlocksDataAdmin