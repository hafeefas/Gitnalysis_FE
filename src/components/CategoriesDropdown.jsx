import React, { useState, useEffect } from 'react'
import axios from 'axios';


function CategoriesDropdown() {
    const [categories, setCategories] = useState([]);
    let [OWNER, setOwner] = useState("");
    let [REPO, setRepo] = useState("");
    //dummy data:
    OWNER = 'hafeefas'
    REPO = 'Gitnalysis_FE'

    useEffect(() => {
        async function getCategories(OWNER, REPO) {
            try {
                if (OWNER.length > 0 && REPO.length > 0) {
                    const language = await axios.get(`https://api.github.com/repos/${OWNER}/${REPO}/languages`)
                    console.log(Object.keys(language.data), "language data in dropdown")
                    setCategories(Object.keys(language.data))
                }
            } catch (error) {
                console.log("error in getting languages in dropdown")
            }
        }

        getCategories();
    }, [OWNER, REPO])

    return (
        <div>
            <select onChange={(e) => e.target.value} className='bg-black'>
                {categories.map((categoryName, index) => {
                    return (<option key={index} > {categoryName} </option>)
                })}
            </select>
        </div>
    )
}

export default CategoriesDropdown;