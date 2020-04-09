import React, {Component, Fragment} from 'react'
import FavRecipes from '../FavRecipes'
import MyRecipes from '../MyRecipes'
import MyAds from '../MyAds'
import axios from 'axios';
import jwtDecode from 'jwt-decode';



class MySpacePage extends Component {
  state = {
    favRecipes: []
  }

  // componentDidMount() {
  //   const token = window.localStorage.getItem("authToken")
  //   const decoded = jwtDecode(token)
  //   const id = decoded.id

  //   axios
  //     .get("http://localhost:8000/api/users/"+id+"/bookmarks/")
  //     .then(res => {
  //             const favRecipes = res.data['hydra:member'];
  //             console.log(favRecipes)
  //             this.setState({ favRecipes })
  //           })
      
  // }

  render () {

    return (
        <Fragment>
            <div className="container">
              <FavRecipes />
            </div>
        </Fragment>
    );
  }
}


export default MySpacePage;