import md5 from "md5"
import { useEffect, useState } from "react"


const CharacterData = ({characters}) => {
    const PUBLIC_KEY = '87acf0916b872ee5375c2211e2628b4e'
    const PRIVATE_KEY = 'cf8e690eeadd2301f2810ad2ecdf663cdd20268d'

    const [charData, setCharData] = useState({})

    const genHash = (ts) => {
        return md5(ts+PRIVATE_KEY+PUBLIC_KEY)
    }

    useEffect(() => {
        const fetchData = async () => {
            const timeStamp = new Date().getTime()
            const hash = genHash(timeStamp)

            try {
                const data = await fetch(`https://gateway.marvel.com:443/v1/public/characters?ts=${timeStamp}&apikey=${PUBLIC_KEY}&hash=${hash}&name=${characters}`)

                const response = await data.json()

                if(!response.ok) {
                    throw new Error("Response is not ok")
                }
                setCharData(response.data.results[0])
            } 
            
            catch(error) {
                console.log(error)
            }
    }
    fetchData()
    },[characters])

    return (
        <div className="data">
        <h1>{charData.attributionHTML}</h1>
        <p>{charData.status}</p>
        </div>
    )
}

export default CharacterData