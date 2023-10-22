import { useDispatch } from "react-redux"
import { filterChange } from "../reducers/filterReducer"
const Filter = () => {
  const dispatch = useDispatch()
  
    const handleChange = (event) => {
      const filterValue = event.target.value
      dispatch(filterChange(filterValue))
      
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input name="filter" onChange={handleChange} />
      </div>
    )
  }
  
  export default Filter