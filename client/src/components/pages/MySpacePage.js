import React, {Component, Fragment} from 'react'
import FavRecipes from '../FavRecipes'
import MyRecipes from '../MyRecipes'
import MyAds from '../MyAds'

import { recipes, adverts } from '../../data/recipesData'


class MySpacePage extends Component {
  state = {
    recipes: recipes,
    adverts: adverts
  }
  render () {
    const { recipes } = this.state
    return (
        <Fragment>
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


export default MySpacePage;