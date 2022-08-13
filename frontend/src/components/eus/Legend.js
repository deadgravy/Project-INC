import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Legend = ({ equipmentFrequencyData, colorScheme, name }) => {
  const equipments = [];
  for (let i = 0; i < equipmentFrequencyData.length; i++) {
    equipments.push(
      <span style={{display: 'flex', verticalAlign: 'middle'}} key={i}>
        <i className='fas fa-circle mt-1' style={{ color: colorScheme[i] }}></i>
        <p className='ml-1'>{equipmentFrequencyData[i].equipmentName}</p>
      </span>
    );
  }
  return (
    <div className='mt-4'>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Typography>{name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {equipments}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Legend;
