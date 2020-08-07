import React from 'react';

const Search = (props) => {
    let currValue = ""
    const filterUpdate = () => {
        //Here you will need to update the value of the filter with the value from the textbox
        const val = currValue.value
        props.filterUpdate(val)
    };
    //You will need to save the value from the textbox and update it as it changes
    //You will need the onChange value for the input tag to capture the textbox value

    return (
        <form>
            <input type="text" placeholder="Type to Filter" ref={(value) => currValue = value} onChange={filterUpdate.bind(this)}/>
        </form>
    );

};

export default Search;
