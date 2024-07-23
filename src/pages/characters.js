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
            const data = await fetch(`https://gateway.marvel.com:443/v1/public/characters?ts=${timeStamp}&apikey=${publickey}&hash=${hash}&name=${searchQuery}`)

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
      
          <div className="character-grid">
            {charData.results && charData.results.map((character) => (
              <div key={character.id} className="character-card">
                <img 
                  src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                  alt={character.name}
                  className="character-image"
                />

                <h2 className="character-name">{character.name}</h2>
                <p className="character-description">{character.description}</p>
                
                <div className="character-details">
                <h3>Comics:</h3>
                <p>Available: {character.comics.available}</p>
                
                <h3>Series:</h3>
                <p>Available: {character.series.available}</p>
                
                <h3>Stories:</h3>
                <p>Available: {character.stories.available}</p>
                
                
                <h3>Events:</h3>
                <p>Available: {character.events.available}</p>
              </div>
              </div>
            ))}
          </div>
        </div>
      );
}

export default CharacterData