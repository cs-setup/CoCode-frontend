import React, {useEffect} from "react";
import TwoColumn from "../../components/Layout/TwoColumn";

const LeftColumn = () => {
  return <div>111</div>;
};
const RightColumn = () => {
  return <div>111</div>;
};

const NoteDetail = () => {
    useEffect(() => { 
        
     },[])
  return <TwoColumn left={<LeftColumn />} right={<RightColumn />} />;
};

export default NoteDetail;
