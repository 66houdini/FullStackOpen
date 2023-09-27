const Filter =({search, handleClick}) => {
    return (
      <p>filter shown with <input value={search} onChange={handleClick} /></p>
    )
  }

export default Filter;