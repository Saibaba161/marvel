import md5 from "md5"
import { useEffect, useState } from "react"


const CharacterData = ({searchQuery}) => {
    const publickey = process.env.REACT_APP_PUBLIC_KEY
    const privatekey = process.env.REACT_APP_PRIVATE_KEY

    const [charData, setCharData] = useState({})

    const genHash = (ts) => {
        return md5(ts+privatekey+publickey)
    }

    useEffect(() => {
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
    fetchData()
    },[searchQuery])

    return (
        <div className="data">
        {charData.results && charData.results.map((res) => (
            <div key={res.id}>
            <p>
                <strong>{res.name}</strong>
            </p>
            <div>
                {res.description}
            </div>
            <div>
                <img 
                    src={`${res.thumbnail.path}/portrait_medium.${res.thumbnail.extension}`}
                    alt={res.name}
                    style={{maxWidth: '100%', height: 'auto'}}
                />
            </div>
            </div>
        ))
        }
        </div>
    )
}

export default CharacterData