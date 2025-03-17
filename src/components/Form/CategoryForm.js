import React from 'react'
import './CategoryForm.css'

const CategoryForm = ({handleSubmit,value,setValue}) => {
  return (
    <>
      <div onSubmit={handleSubmit}>
        <form>
          <label htmlFor="product"></label>
          <input
            type="text"
            placeholder="enter new category"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            style={{height:"40px"}}
          />
          <button type="submit" className='SubmitBtn' style={{height:"40px",padding:"2px 5px",marginLeft:"10px"}}>Submit</button>
        </form>
      </div>
    </>
  );
}

export default CategoryForm