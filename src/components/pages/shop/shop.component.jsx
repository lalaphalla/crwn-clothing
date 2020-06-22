import React from 'react';
import SHOP_DATA from './shop.data.js'
import CollectioinPreview from '../../preview-collection/colleciton-preview.component.jsx';

class ShopPage extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            collections: SHOP_DATA
        }
    }
    render(){
        const {collections} = this.state
        return(
            <div className='shop-page'>
            {
            collections.map(({id, ...otherCollectionProps}) =>(
                <CollectioinPreview key={id} {...otherCollectionProps}/> 

            ))
            }
            </div>
        )
    }
}
export default ShopPage;