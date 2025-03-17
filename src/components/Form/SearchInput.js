import React from 'react'
import { useSearch } from '../context/search'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SearchInput.css'

const SearchInput = () => {
    const{values,setValues}  = useSearch();
    
    const navigate = useNavigate();
    const handleSubmit = async(e)=>{
            e.preventDefault();
        try{
            const {data} = await axios.get(`/api/v1/products/search/${values.keyword}`);
            setValues({...values,result:data});
            navigate('/search');
        }catch(error){
            console.log(error);
        }
    }
  return (
    <div>
      <form onSubmit={handleSubmit} className="navsearch">
        <input
          type="search"
          placeholder="search products"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
          z
          className="navinp"
        />
        <button className="navsub">Search</button>
      </form>
    </div>
  );
}

export default SearchInput