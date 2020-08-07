import React from 'react';

const ViewItem = (props) => {
    const itemSpecs = props.selectedItem !== 0 ? props.data.vals
    .filter(item => {return item._id===props.selectedItem})[0] : props.data.vals
    let item =""
    if(itemSpecs){
        item =
        <div>
            <p> Description: {itemSpecs.description} </p>
        </div>
    }
    if (props.selectedItem !== 0){
        return item
    }
    else{
    return (
        <div>
            <p>
                {' '}
                <i>Click on a name to view more information</i>
            </p>
        </div>
    );}
};
export default ViewItem;
