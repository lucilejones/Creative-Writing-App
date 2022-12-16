import React from 'react'
import Entry from './Entry.js'

export default function EntryList(props) {
    const { entries } = props

    // const sortedList = [].concat(entries)
    //     .sort((a,b) => a.timestamp - b.timestamp)
    //     .map((entry) => 
    //         <Entry key={entry._id} {...entry}/>
    //     )

    // return (
    //     <div>
    //         { sortedList }
    //     </div>
    // )
    const displayList = entries.map(entry => 
            <Entry key={entry._id} {...entry}/>)

    return (
        <div>
            {displayList}
        </div>
    )
}


// myList.sort(function(x, y){
//     return x.timestamp - y.timestamp;
// })