import "../style/TripCountry.css";
import { RxCrossCircled } from "react-icons/rx";

const SelectedState = ({ id, state, setSelectedStates, selectedStates }) => {
    const handleChange=(e)=>{
        const _id = Number(e.target.id);
        setSelectedStates(new Set(Array.from(selectedStates).filter((_,id)=> _id !== id)));
    }
  return (
    <div className="ech-st-box">
      <p className="ech-st">{state}</p> 
      <RxCrossCircled  id={id} className="cross" onClick={handleChange}/>
    </div>
  );
};

export default SelectedState;
