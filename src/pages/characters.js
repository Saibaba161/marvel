import md5 from "md5"
import { useState } from "react"


const CharacterData = () => {
    const publickey = process.env.REACT_APP_PUBLIC_KEY
    const privatekey = process.env.REACT_APP_PRIVATE_KEY

    const [charData, setCharData] = useState({})
    const [searchQuery, setSearchQuery] = useState('')

    const genHash = (ts) => {
        return md5(ts+privatekey+publickey)
    }

    const fetchData = async () => {
        const timeStamp = new Date().getTime()
        const hash = genHash(timeStamp)

        try {
            const data = await fetch(`https://gateway.marvel.com:443/v1/public/characters?ts=${timeStamp}&apikey=${publickey}&hash=${hash}&nameStartsWith=${searchQuery}`)

            const response = await data.json()

            if(!data.ok) {
                console.log(data)
                throw new Error("Response is not ok")
            }
                setCharData(response.data)
                console.log(response)
            } 
            
            catch(error) {
                console.log(error)
            }
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()

        fetchData()
    }

    return (
      <div className="main-content">
      <form onSubmit={handleSubmit} className="search-form">
        <input 
          placeholder="Who's your fav character"
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>
    
      {searchQuery && (
        <div className="character-grid">
          {charData.results && charData.results.map((character) => (
            <div key={character.id} className="character-card">
              <div className="character-image-container">
                <img 
                  src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                  alt={character.name}
                  className="character-image"
                />
                {character.description && (
                  <div className="character-description">
                    <p>{character.description}</p>
                  </div>
                )}
              </div>
              <h2 className="character-name">{character.name}</h2>
            </div>
          ))}
        </div>
      )}
    </div>
      );
}

export default CharacterData