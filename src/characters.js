import md5 from "md5"
import { useEffect, useState } from "react"


const CharacterData = ({characters}) => {
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
                const data = await fetch(`https://gateway.marvel.com:443/v1/public/characters?ts=${timeStamp}&apikey=${publickey}&hash=${hash}&name=${characters}`)

                const response = await data.json()

                if(!data.ok) {
                    console.log(data)
                    throw new Error("Response is not ok")
                }
                setCharData(response.data)
            } 
            
            catch(error) {
                console.log(error)
            }
    }
    fetchData()
    },[characters])

    return (
        <div className="data">
        <h1>{charData.offset}</h1>
        <p>{charData.limit}</p>
        </div>
    )
}

export default CharacterData