import React, {Component, Fragment} from 'react'
import Header from '../Header'
import FavRecipes from '../FavRecipes'
import MyRecipes from '../MyRecipes'
import MyAds from '../MyAds'

import { recipes, adverts } from '../../data/recipesData'


class DashboardFavPage extends Component {
  state = {
    recipes: recipes,
    adverts: adverts
  }
  render () {
    const { recipes } = this.state
    return (
        <Fragment>
            <Header/>
            <div className="container">
                <FavRecipes 
                    recipes={recipes} />
                <MyRecipes 
                    recipes={recipes} />
                <MyAds 
                    recipes={recipes} />
            </div>
        </Fragment>
    );
  }
}


export default DashboardFavPage;