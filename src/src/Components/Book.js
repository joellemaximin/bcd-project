import React, { useState, useEffect, useRef } from 'react'
import { Form, ListGroup, Jumbotron } from 'react-bootstrap'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSearch,
} from '@fortawesome/free-solid-svg-icons'


const Book = ()=> {

  // // const [data ,setData] = useState([]);
  // // const [filtered ,setFilterd] = useState([]);
  // // const [result , setResult] = useState("");
  //   const [loading, setLoading] = useState(false)
  // //   const [error, setError] = useState('')
  
  // const [datas ,setData] = useState([]);
  // const [error ,setError] = useState([]);

  // const [searchTerm, setSearchTerm] = useState('');
  
  
  // const onInputChange = (e) => {
  //   setSearchTerm(e.currentTarget.value);
  //   console.log({searchTerm})
  // }
  //   // useEffect(()=>{
  //   //   fetchTitle()
	// 	// },[]);
  
  //   // const fetchTitle = async (query) => {
  //   //   const results = await fetch(`/api/bookrouter/search/?${query}`, {
  //   //     headers: {'accept': 'application/json'}
  //   //   })
  //   //   const titlesData = await results.json()
  //   //   return titlesData.results
  //   // }
  //   let API_URL = `/api/bookrouter/sasa`
    
  //   const fetchTitle = async (searchTerm) => {
  //       const results = await fetch(`${API_URL}?q=${searchTerm}`, {
  //         headers: {'accept': 'application/json'}
  //       })
  //       const titleData = await results.json()
  //       setData(titleData.results)

  //       return titleData.results
  //       // console.log(result.data)
  //       // // const res = axios.get(`/api/bookrouter/search?/`)
  //       // .then(response => response.json())
  //       // .then(responseData => {
  //       // this.setState({
  //       //   results: responseData.results,
  //       //   loading: false
  //       // })
  //     }

  //   // useEffect(()=> {
  //   //   const results = filtered.filter(res=> res.title.toLowerCase().includes(result)); 
  //   //   setData(results)
  //   // } ,[result])
  
   

  //   const onSubmitHandler = (e) => {
  //     // Prevent browser refreshing after form submission
  //     e.preventDefault();
  //     // Call fetch books async function
  //     fetchTitle();
  //   }

  //   return (
    
	// 		<div>
	// 		 <form onSubmit={onSubmitHandler}>
  //       <label>
  //         <span>Search for books</span>
  //       <input
  //         type="text"
  //         placeholder="Les oiseaux ..,"
  //         // title={searchTerm}
  //         value={searchTerm}
  //         onChange={onInputChange}
  //       />
  //         <i className="fas fa-search"></i>
  //       {/* <button type="submit">Search</button> */}
  //       </label>
        
  //     </form>
  //     <section className="section">
  //       <ul>
  //         {/* {
  //           datas.map((key, book) => {
  //           <li key={key}>
  //             <p>{book.title}</p>
  //           </li>
            
  //         })
  //       } */}
  //       </ul>
  //     </section>
  
  //     <hr />
    

	// 				{/* type="text"
	// 				placeholder="serch here .."
  //         value={result}
  //         // titles={titles}
  //         // onChange={onChange}
  //         // handleSubmit={handleSubmit}
  //         onChange={handleSearchChange}
	// 			/> </form>
	// 			{data.map((r,i)=> (   
	// 				<ul key={i}>
	// 					<li>{r.title}</li>
	// 				</ul>)
	// 			)
	// 			} */}
       
  // 	</div> 
  const [data ,setData] = useState([]);
  const [filtered ,setFilterd] = useState([]);
  const [result , setResult] = useState("");

  useEffect(()=>{
		const fetchData = async ()=> {
						try{
							const res = await axios.get(`/api/bookrouter`);
							setData(res.data);
							setFilterd(res.data);
						}catch(err){
								throw new Error(err);
						}
							};
					fetchData(); 
      },[]);

      useEffect(()=> {
          const results = filtered.filter(res=> res.title.toLowerCase().includes(result)

          ); 
          setData(results)
      } ,[result])
      //console.log(data)

    const onChange =(e)=> {
          setResult(e.target.value);
      }

  return (
      <div>
      <input 
          type="text"
          placeholder="serch here .."
          value={result}
          onChange={onChange}
      />
      {data.map((r,i)=> (   
				<ul key={i}>
					<li>{r.title}</li>
				</ul>)
        )
      }
  </div>
  )
  
}
export default Book;

