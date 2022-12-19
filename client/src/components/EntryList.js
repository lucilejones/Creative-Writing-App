import React from 'react'
import Entry from './Entry.js'

export default function EntryList(props) {
    const { entries } = props
    // console.log(entries)

    const sortedList = [].concat(entries)
        .sort((a,b) => b.timestamp > a.timestamp ? 1 : -1)
        .map((entry) => 
            <Entry key={entry._id} {...entry}/>
        )

    return (
        <div>
            { sortedList }
        </div>
    )
    // const displayList = entries.map(entry => 
    //         <Entry key={entry._id} {...entry}/>)

    // return (
    //     <div>
    //         {displayList}
    //     </div>
    // )
}
