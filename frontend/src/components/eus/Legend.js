import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Legend = ({ allEquipmentData, colorScheme }) => {
  console.log(allEquipmentData.length);
  const equipments = [];
  for (let i = 0; i < allEquipmentData.length; i++) {
    equipments.push(
      <span style={{display: 'flex', verticalAlign: 'middle'}} key={i}>
        <i className='fas fa-circle mt-1' style={{ color: colorScheme[i] }}></i>
        <p className='ml-1'>{allEquipmentData[i].equipment_name}</p>
      </span>
    );
  }
  return (
    <div className='mt-4'>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Typography>Legend</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {equipments}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Legend;
