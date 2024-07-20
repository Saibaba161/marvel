import { useState } from "react"
import CharacterData from "./characters"

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('')

    return(
        <div>
        <form className="input-field">
            <input 
                type="text"
                placeholder="Who's that character?"
                onChange={(e) => setSearchQuery(e.target.value)}
                value={searchQuery}
            />
            <button type="submit">Search</button>
        </form>
        {searchQuery && <CharacterData searchQuery={searchQuery}/>}
        </div>
    )
}

export default Search