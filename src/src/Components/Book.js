import React, { useState, useEffect, useRef } from 'react'
import { Form, ListGroup, Jumbotron } from 'react-bootstrap'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSearch,
} from '@fortawesome/free-solid-svg-icons'


const Book = ()=> {

  // const [data ,setData] = useState([]);
  // const [filtered ,setFilterd] = useState([]);
  // const [result , setResult] = useState("");
    const [loading, setLoading] = useState(false)
  //   const [error, setError] = useState('')
  
  const [datas ,setData] = useState({ items: [] });
  const [error ,setError] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  
  
  const onInputChange = (e) => {
    setSearchTerm(e.target.value);
  }
    // useEffect(()=>{
    //   fetchTitle()
		// },[]);
  
    // const fetchTitle = async (query) => {
    //   const results = await fetch(`/api/bookrouter/search/?${query}`, {
    //     headers: {'accept': 'application/json'}
    //   })
    //   const titlesData = await results.json()
    //   return titlesData.results
    // }
    let API_URL = `/api/bookrouter/sasa`
    
    const fetchTitle = async () => {
      try {
        const result = await axios.get(`${API_URL}?q=${searchTerm}`);
        console.log(result.data)
        // const res = axios.get(`/api/bookrouter/search?/`)
        // setData(result.data)
        // setFilterd(result.data)
        // // const { titles } = await titleContent.json()
        // setFilterd(titles)
        // setShowLoading(false)
        setSearchTerm(result.data);
      } catch (error) {
        setError(true);
      }
      setLoading(false);
    };

    // useEffect(()=> {
    //   const results = filtered.filter(res=> res.title.toLowerCase().includes(result)); 
    //   setData(results)
    // } ,[result])
  
    // const handleSubmit = async (e) => {
    //   e.preventDefault()
    //     setShowLoading(true)
    //     fetch(`/api/bookrouter/search?/:title&q=${query}`)
    //       .then(res => res.json())
    //       .then(data => {
    //       setShowLoading(false)
    //       setFilterd(data)
    //   })
		// 	.catch(err => {
		// 		console.log(err)
		// 	})
    // }

    // const handleSearchChange = (e) => {
    //   setResult(e.target.value);
    // }

    const onSubmitHandler = (e) => {
      // Prevent browser refreshing after form submission
      e.preventDefault();
      // Call fetch books async function
      fetchTitle();
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
      //             onChange={(e) => setData(e.target.value)}
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
			 <form onSubmit={onSubmitHandler}>
        <label>
          <span>Search for books</span>
          <input
            type="search"
            placeholder="Les oiseaux ..,"
            value={searchTerm}
            onChange={onInputChange}
          />

          <button type="submit">Search</button>
        </label>
      </form>

      <ul>
        {
          datas.items.map((data, index) => {
            return (
              <li key={index}>
                <div>
                  <div>
                    <h3>{data.title}</h3>
                    <p>{data.author}</p>
                  </div>
                </div>
                <hr />
              </li>
            );
          })
        }
      </ul>

					{/* type="text"
					placeholder="serch here .."
          value={result}
          // titles={titles}
          // onChange={onChange}
          // handleSubmit={handleSubmit}
          onChange={handleSearchChange}
				/> </form>
				{data.map((r,i)=> (   
					<ul key={i}>
						<li>{r.title}</li>
					</ul>)
				)
				} */}
       
		</div> 
  )
  
}
export default Book;

