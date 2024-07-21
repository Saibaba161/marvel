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
        <div className="input-field">
          <form onSubmit={handleSubmit}>
            <input 
              placeholder="Who's your fav character"
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
            />
            <button type="submit">Search</button>
          </form>
      
          <div className="data">
            {charData.results && charData.results.map((character) => (
              <div key={character.id}>
                <h2>{character.name}</h2>
                <p>Description: {character.description}</p>

                <img 
                  src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                  alt={character.name}
                  style={{maxWidth: '300px', height: 'auto'}}
                />
                
                <h3>Comics:</h3>
                <p>Collection URI: {character.comics.collectionURI}</p>
                <ul>
                  {character.comics.items.map((comic, index) => (
                    <li key={index}>
                      {comic.name} - {comic.resourceURI}
                    </li>
                  ))}
                </ul>
                
                <h3>Series:</h3>
                <p>Available: {character.series.available}</p>
                <p>Collection URI: {character.series.collectionURI}</p>
                <ul>
                  {character.series.items.map((series, index) => (
                    <li key={index}>
                      {series.name} - {series.resourceURI}
                    </li>
                  ))}
                </ul>
                
                <h3>Stories:</h3>
                <p>Available: {character.stories.available}</p>
                <p>Collection URI: {character.stories.collectionURI}</p>
                <ul>
                  {character.stories.items.map((story, index) => (
                    <li key={index}>
                      {story.name} - Type: {story.type} - {story.resourceURI}
                    </li>
                  ))}
                </ul>
                
                <h3>Events:</h3>
                <p>Available: {character.events.available}</p>
                <p>Collection URI: {character.events.collectionURI}</p>
                <ul>
                  {character.events.items.map((event, index) => (
                    <li key={index}>
                      {event.name} - {event.resourceURI}
                    </li>
                  ))}
                </ul>
                
                <h3>URLs:</h3>
                <ul>
                  {character.urls.map((url, index) => (
                    <li key={index}>
                      <a href={url.url} target="_blank" rel="noopener noreferrer">
                        {url.type}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      );
}

export default CharacterData