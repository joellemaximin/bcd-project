import React, { useState, useEffect, useRef } from 'react'
import { Form, ListGroup, Jumbotron } from 'react-bootstrap'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSearch,
} from '@fortawesome/free-solid-svg-icons'


const Book = ()=> {

		const [query ,setQuery] = useState('');
		const [titles ,setTitle] = useState([]);
    const [loading, setShowLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(()=>{
      fetchTitle()
		},[query]);
  
    // const fetchTitle = async (query) => {
    //   const results = await fetch(`/api/bookrouter/search/?${query}`, {
    //     headers: {'accept': 'application/json'}
    //   })
    //   const titlesData = await results.json()
    //   return titlesData.results
    // }

    const fetchTitle = async () => {
      try {
        const titleContent = await fetch(`/api/bookrouter/search?/${query}`)
        const { titles } = await titleContent.json()
        setTitle(titles)
        setShowLoading(false)
  
      } catch (e) {
        if (e) {
          setError(e.message)
          console.log(error)
        }
      }
    }

    // const handleSubmit = async (e) => {
    //   e.preventDefault()
    //     setShowLoading(true)
    //     fetch(`/api/bookrouter/search?/:title&q=${query}`)
    //       .then(res => res.json())
    //       .then(data => {
    //       setShowLoading(false)
    //       setTitle(data)
    //   })
		// 	.catch(err => {
		// 		console.log(err)
		// 	})
    // }

    const handleSearchChange = (e) => {
      setTitle(e.currentTarget.value);
    }
  
    // let titleContent = titles.map((title, index) => {
    //   return (
    //     <ListGroup.Item key={index} action variant="secondary">
    //       {title.title}
    //     </ListGroup.Item>
    //   )
    // })

    return (
      // <>
      // <Jumbotron fluid>
      //     <Form id="search-form">
      //       {loading ? <h1 className="text-center">...recherche {title} Nom du livre</h1> :
      //         <Form.Control 
      //             type="text" 
      //             placeholder="Rechercher un livre..." 
      //             ref={focusSearch}
      //             onChange={(e) => setQuery(e.target.value)}
      //             value={query} 
      //         />
      //     </Form>     

      //     <ListGroup>
      //         {titleContent}
      //     </ListGroup>
      // </Jumbotron>
      // </>

		// 	useEffect(()=> {
      // const fetchData = async ()=> {
      //   try{
      //     const res = await axios.get(`/api/bookrouter/`);
      //     setData(res.data);
      //     setFilterd(res.data);
      //   }catch(err){
      //     throw new Error(err);
      //   }
      //     };
      //   fetchData(); 

		// 		const results = filtered.filter(res=> res.title.toLowerCase().includes(result)
	
		// 		); 
		// 		setData(results)
		// 	} ,[result])
		// 	//console.log(data)
	
		// 	const onChange =(e)=> {
		// 		setResult(e.target.value);
		// 	}
	
		// return (
			<div>
				<input 
					type="text"
					placeholder="serch here .."
          value={query}
          titles={titles}
          // onChange={onChange}
          // handleSubmit={handleSubmit}
          handleSearchChange={handleSearchChange}
				/>
				{titles.map((r,i)=> (   
					<ul key={i}>
						<li>{r.title}</li>
					</ul>)
				)
				}
		</div> 
  )
  
}
export default Book;

